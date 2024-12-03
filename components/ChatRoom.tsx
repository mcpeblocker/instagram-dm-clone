import { Chat, User, Message } from "@/utils/types";
import Avatar from "./Avatar";
import { getChatTitle } from "@/utils/helpers";
import { Messages } from "./Messages";
import { useEffect, useMemo, useState } from "react";
import api from "@/utils/api";
import MessageInput from "./MessageInput";
import LeftArrow from "./icons/LeftArrow";

interface ChatRoomProps {
  chat: Chat;
  me: User;
  onBack: () => void;
  onNewMessage: (message: Message) => void;
}

export default function ChatRoom(props: ChatRoomProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const sortedMessages = useMemo(
    () =>
      messages.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime()),
    [messages]
  );

  useEffect(() => {
    // Load messages from API
    api.getMessages(props.chat).then(setMessages);
  }, [props.chat]);

  const handleMessageSend = (content: string) => {
    api.sendMessage(content, props.chat, props.me).then((newMessage) => {
      setMessages([...messages, newMessage]);
      props.onNewMessage(newMessage);
    });
  };

  const handleMessageDelete = (message: Message) => {
    api.deleteMessage(message).then(() => {
      setMessages(messages.filter((m) => m.id !== message.id));
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div
        className="flex gap-4 py-2 px-4 items-center border-b-plain"
        style={{ borderBottomWidth: 1 }}
      >
        <div onClick={props.onBack} className="cursor-pointer">
          <LeftArrow />
        </div>
        <Avatar chat={props.chat} me={props.me} />
        <span className="font-semibold">
          {getChatTitle(props.chat.members, props.me)}
        </span>
      </div>
      {/* <div className="flex-1 overflow-y-hidden flex flex-col"> */}
      {/* Messages */}
      <div className="flex-1 overflow-y-auto flex flex-col justify-end">
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
