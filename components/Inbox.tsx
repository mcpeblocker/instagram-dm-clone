"use client";

import React, { useEffect, useMemo } from "react";
import ChatsList from "@/components/ChatsList";
import { Chat, User } from "@/utils/types";
import api from "@/utils/api";
import { ThumbnailChat } from "@/utils/types";
import { useRouter, useSearchParams } from "next/navigation";
import ChatRoom from "@/components/ChatRoom";
import { NoChatRoom } from "./NoChatRoom";

export default function Inbox() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [me, setMe] = React.useState<User | null>(null);
  const [chats, setChats] = React.useState<Chat[]>([]);
  const [thumbnailChats, setThumbnailChats] = React.useState<ThumbnailChat[]>(
    []
  );
  const [selectedChatIndex, setSelectedChatIndex] = React.useState<
    number | null
  >(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const isInbox = useMemo(() => !searchParams.get("chat"), [searchParams]);

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
    if (!me) return;
    if (!chats.length) return;
    loadThumbnailChats(me, chats);
  }, [me, chats]);

  useEffect(() => {
    // Check if specific chat is selected
    const chatId = searchParams.get("chat");
    if (chatId) {
      const index = chats.findIndex((chat) => chat.id === chatId);
      if (index !== -1) {
        setSelectedChatIndex(index);
      } else {
        router.replace("/direct");
      }
    }
  }, [router, searchParams, chats]);

  const loadThumbnailChats = (me: User, chats: Chat[]) => {
    const promises = chats.map((chat) =>
      api.getLastMessage(chat).then((m) => ({ ...chat, me, lastMessage: m }))
    );
    Promise.all(promises).then((data) => {
      setThumbnailChats(
        data.sort((a, b) => {
          if (!a.lastMessage) return 1;
          if (!b.lastMessage) return -1;
          return (
            b.lastMessage.createdAt.getTime() -
            a.lastMessage.createdAt.getTime()
          );
        })
      );
    });
  };

  const handleChatRoomSelection = async (index: number) => {
    setSelectedChatIndex(index);
    const chat = thumbnailChats[index];
    if (!chat) return;
    try {
      if (
        chat.lastMessage &&
        me &&
        chat.lastMessage.authorId !== me.id &&
        chat.lastMessage.status === "delivered"
      ) {
        await api.markAsRead(chat.lastMessage);
      }
    } finally {
      router.replace(`/direct?chat=${chat.id}`, { scroll: false });
    }
  };

  const handleChatRoomBack = () => {
    setSelectedChatIndex(null);
    router.replace("/direct", { scroll: false });
  };

  const handleNewChatMessage = () => {
    if (!thumbnailChats.length) return;
    if (!me) return;
    loadThumbnailChats(me, chats);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar list of chats */}
      <div
        className={
          "w-full md:w-1/3 flex flex-col border-r-plain" +
          (isInbox ? "" : " hidden md:flex")
        }
        style={{ borderRightWidth: 1 }}
      >
        <div className="p-4 mt-4 w-full">
          {me ? (
            <span className="font-bold text-xl">{me.name}</span>
          ) : (
            // Skeleton loader
            <div className="animate-pulse h-2 w-1/2 my-2.5 bg-secondary rounded"></div>
          )}
        </div>
        <ChatsList
          chats={thumbnailChats}
          isLoading={isLoading}
          onSelect={handleChatRoomSelection}
        />
      </div>
      {/* Chatroom */}
      <div
        className={
          "flex-grow py-4 md:py-2" + (isInbox ? " hidden md:block" : "")
        }
      >
        {selectedChatIndex !== null && me ? (
          <ChatRoom
            chat={chats[selectedChatIndex]}
            me={me}
            onBack={handleChatRoomBack}
            onNewMessage={handleNewChatMessage}
          />
        ) : (
          <NoChatRoom />
        )}
      </div>
    </div>
  );
}
