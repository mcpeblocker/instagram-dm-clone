"use client";

import React, { useEffect, useMemo } from "react";
import ChatsList from "@/components/ChatsList";
import { Chat, User } from "@/utils/types";
import api from "@/utils/api";
import { ThumbnailChat } from "@/utils/types";
import { useRouter, useSearchParams } from "next/navigation";
import ChatRoom from "@/components/ChatRoom";
import Messenger from "@/components/icons/Messenger";
import Head from "next/head";

export default function Direct() {
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
    // Load last message for each chat
    const promises = chats.map((chat) =>
      api.getLastMessage(chat).then((m) => ({ ...chat, me, lastMessage: m }))
    );
    Promise.all(promises).then(setThumbnailChats);
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

  const handleChatRoomSelection = (index: number) => {
    setSelectedChatIndex(index);
    const chat = chats[index];
    if (!chat) return;
    router.replace(`/direct?chat=${chat.id}`, { scroll: false });
  };

  const handleChatRoomBack = () => {
    setSelectedChatIndex(null);
    router.replace("/direct", { scroll: false });
  };

  return (
    <>
      <Head>
        <title>Inbox • Chats</title>
      </Head>
      <div className="flex h-screen">
        {/* Sidebar list of chats */}
        <div
          className={
            "w-full md:w-1/3 flex flex-col border-r-plain" +
            (isInbox ? "" : " hidden md:block")
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
            />
          ) : (
            <NoChatRoomSelected />
          )}
        </div>
      </div>
    </>
  );
}

function NoChatRoomSelected() {
  return (
    <div className="flex flex-col gap-1 justify-center items-center h-full">
      <div className="my-2 border-2 border-contrast rounded-full p-5">
        <Messenger />
      </div>
      <span className="text-xl">Your messages</span>
      <span className="text-sm text-secondary">
        Send a message to start a chat.
      </span>
    </div>
  );
}
