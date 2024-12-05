import { TChat, TUser, TMessage, TIncomingMessage } from "@/utils/types";
import Avatar from "./Avatar";
import { getChatTitle } from "@/utils/helpers";
import { Messages } from "./Messages";
import { useEffect, useMemo, useState } from "react";
import api from "@/utils/api";
import MessageInput from "./MessageInput";
import LeftArrow from "./icons/LeftArrow";
import Logout from "./icons/Logout";

interface ChatRoomProps {
  chat: TChat;
  me: TUser;
  onBack: () => void;
  onNewMessage: (message: TMessage) => void;
}

export default function ChatRoom(props: ChatRoomProps) {
  const [messages, setMessages] = useState<TMessage[]>([]);
  const sortedMessages = useMemo(
    () =>
      messages.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime()),
    [messages]
  );

  useEffect(() => {
    // Load messages from API
    api.getMessages(props.chat).then(setMessages);
  }, [props.chat]);

  const handleMessageSend = (incomingMessage: TIncomingMessage) => {
    api
      .sendMessage(incomingMessage, props.chat, props.me)
      .then((newMessage) => {
        setMessages([...messages, newMessage]);
        props.onNewMessage(newMessage);
      });
  };

  const handleMessageDelete = (message: TMessage) => {
    api.deleteMessage(message).then(() => {
      setMessages(messages.filter((m) => m.id !== message.id));
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="w-full flex p-2 pt-4 gap-4 items-center text-contrast">
        {/* Back button */}
        <div
          onClick={props.onBack}
          className="cursor-pointer hover:opacity-60 transition-all"
        >
          <LeftArrow />
        </div>
        {/* Other persons' details */}
        <div className="flex-grow flex flex-col">
          <span className="font-semibold">{props.chat.otherUser.name}</span>
          <span className="text-sm text-secondary">
            {props.chat.otherUser.school}・{props.chat.otherUser.department}
          </span>
        </div>
        {/* Logout */}
        <div className="flex justify-center items-center px-2 cursor-pointer hover:opacity-60 transition-all">
          <Logout />
        </div>
      </div>
      {/* Messages */}
      <div className="flex-grow overflow-y-auto">
        <Messages
          messages={sortedMessages}
          chat={props.chat}
          me={props.me}
          onDelete={handleMessageDelete}
        />
      </div>
      {/* Message input */}
      <MessageInput onSubmit={handleMessageSend} />
      {/* </div> */}
    </div>
  );
}
