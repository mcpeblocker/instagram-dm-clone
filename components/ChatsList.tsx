import ChatThumbnail from "./ChatThumbnail";
import { ThumbnailChat } from "@/utils/types";
import { LoadingThumbnail } from "./LoadingThumbnail";

interface ChatsListProps {
  chats: ThumbnailChat[];
  isLoading: boolean;
  onSelect: (index: number) => void;
}

export default function ChatsList(props: ChatsListProps) {
  return (
    <div className="h-full overflow-y-auto flex flex-col gap-4 p-4">
      <div className="w-full">
        <span className="font-bold">Messages</span>
      </div>
      {props.isLoading && (
        <>
          <LoadingThumbnail />
          <LoadingThumbnail />
          <LoadingThumbnail />
          <LoadingThumbnail />
          <LoadingThumbnail />
        </>
      )}
      {props.chats.map((chat, i) => (
        <ChatThumbnail
          key={chat.id}
          chat={chat}
          onClick={() => props.onSelect(i)}
        />
      ))}
    </div>
  );
}
