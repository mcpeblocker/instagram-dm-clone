import ChatThumbnail from "./ChatThumbnail";
import { ThumbnailChat } from "@/utils/types";

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

function LoadingThumbnail() {
  return (
    <div className="flex items-center gap-4 p-2 bg-secondary opacity-20 rounded-md animate-pulse">
      <div className="w-12 h-12 bg-primary rounded-full"></div>
      <div className="flex-1 flex flex-col gap-2">
        <div className="bg-primary h-4 rounded w-1/3"></div>
        <div className="bg-primary h-4 rounded"></div>
      </div>
    </div>
  );
}
