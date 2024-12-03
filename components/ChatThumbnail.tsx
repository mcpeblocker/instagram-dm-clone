import { ThumbnailChat } from "@/utils/types";
import Avatar from "./Avatar";
import { getChatTitle, trimMessage } from "@/utils/helpers";

interface ChatThumbnailProps {
  chat: ThumbnailChat;
  onClick: () => void;
}

export default function ChatThumbnail(props: ChatThumbnailProps) {
  const { lastMessage, me, members } = props.chat;
  const isUnread = lastMessage && lastMessage.status !== "read";
  const chatTitle = getChatTitle(members, me);

  const messagePreview = lastMessage
    ? trimMessage(lastMessage.content)
    : "Start a conversation";

  return (
    <div
      className="flex items-center gap-4 p-2 bg-primary rounded-md cursor-pointer"
      onClick={props.onClick}
    >
      <Avatar chat={props.chat} me={props.chat.me} />
      <div className="flex-1 text-contrast flex flex-col gap-1">
        <p className={`text-md ${isUnread ? "font-semibold" : ""}`}>
          {chatTitle}
        </p>
        <p className={`${isUnread ? "font-bold text-sm" : "text-xs"}`}>
          {messagePreview}
        </p>
      </div>
      <span
        className={`w-2 h-2 bg-highlight rounded-full ${
          isUnread ? "" : "hidden"
        }`}
      ></span>
    </div>
  );
}
