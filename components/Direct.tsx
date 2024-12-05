"use client";

import React, { useEffect, useMemo } from "react";
import ChatsList from "@/components/ChatsList";
import { TChat, TUser } from "@/utils/types";
import api from "@/utils/api";
import { TChatThumbnail } from "@/utils/types";
import { useRouter, useSearchParams } from "next/navigation";
import ChatRoom from "@/components/ChatRoom";
import { NoChatRoom } from "./NoChatRoom";
import LeftArrow from "./icons/LeftArrow";
import TextButton from "./TextButton";
import ChatsListLoader from "./loaders/ChatsList.loader";
import { loadChatThumbnails } from "@/utils/helpers";
import Inbox from "./Inbox";
import Search from "./Search";

export default function Direct() {
  // States
  const [isLoading, setIsLoading] = React.useState(true);
  const [me, setMe] = React.useState<TUser | null>(null);
  const [chats, setChats] = React.useState<TChat[]>([]);
  const [chatThumbnails, setChatThumbnails] = React.useState<TChatThumbnail[]>(
    []
  );
  const [selectedChat, setSelectedChat] = React.useState<TChat | null>(null);
  const [isSearching, setIsSearching] = React.useState(false);

  // Hooks
  const router = useRouter();
  const searchParams = useSearchParams();
  const isInbox = useMemo(() => !searchParams.get("chat"), [searchParams]);

  // Effects
  useEffect(() => {
    // Load user info from API
    api.getMe().then(setMe);
  }, []);

  useEffect(() => {
    if (!me) return;
    // Load chats from API
    api.getChats(me).then((data) => {
      setChats(data);
      setIsLoading(false);
    });
  }, [me]);

  useEffect(() => {
    // Load chat thumbnails (includes last messages from API)
    if (!me) return;
    if (!chats.length) return;
    loadChatThumbnails(me, chats).then(setChatThumbnails);
  }, [me, chats]);

  useEffect(() => {
    // Check if specific chat is selected
    if (isInbox) return;
    const chatId = searchParams.get("chat");
    const chat = chats.find((chat) => chat.id === chatId);
    if (chat) {
      setSelectedChat(chat);
    } else {
      router.replace("/direct");
    }
  }, [router, searchParams, chats, isInbox]);

  const handleChatSelection = async (chatThumbnail: TChatThumbnail) => {
    const chat = chats.find((chat) => chat.id === chatThumbnail.id);
    if (!chat) return;
    setSelectedChat(chat);
    try {
      if (
        chatThumbnail.lastMessage && // If there is a last message on the chat
        me && // If the user is logged in
        chatThumbnail.lastMessage.authorId !== me.id && // If the last message is received (not sent)
        chatThumbnail.lastMessage.status !== "read" // If the last message is not read
      ) {
        await api.markAsRead(chatThumbnail.lastMessage);
      }
    } finally {
      router.push(`/direct?chat=${chat.id}`, { scroll: false });
    }
  };

  const handleBackFromSearch = () => {
    setIsSearching(false);
  };

  const handleBackFromChat = () => {
    setSelectedChat(null);
    router.replace("/direct", { scroll: false });
  };

  const handleNewMessage = () => {
    if (!chatThumbnails.length) return;
    if (!me) return;
    // Reload chat thumbnails to show the new message
    loadChatThumbnails(me, chats);
  };

  const showSearch = () => {
    setIsSearching(true);
  };

  const handleNewChat = (user: TUser) => {};

  return (
    <div className="flex h-screen overflow-hidden">
      {/* List of chats (sidebar on desktop) */}
      <div
        className={
          "w-full md:w-1/3 flex flex-col border-r-bg-secondary" +
          (isInbox ? "" : " hidden md:flex")
        }
        style={{ borderRightWidth: 1 }}
      >
        {me && isSearching ? (
          <Search
            me={me}
            onBack={handleBackFromSearch}
            onConfirm={handleNewChat}
          />
        ) : (
          <Inbox
            isLoading={isLoading}
            chatThumbnails={chatThumbnails}
            onChatSelect={handleChatSelection}
            onNewChat={showSearch}
          />
        )}
      </div>
      {/* Chatroom */}
      <div
        className={
          "flex-grow " + (isInbox ? " hidden md:block" : "")
        }
      >
        {selectedChat !== null && me ? (
          <ChatRoom
            chat={selectedChat}
            me={me}
            onBack={handleBackFromChat}
            onNewMessage={handleNewMessage}
          />
        ) : (
          <NoChatRoom />
        )}
      </div>
    </div>
  );
}
