import { TChatThumbnail } from "@/utils/types";
import ChatsListBlank from "@/components/blanks/ChatsList.blank";
import ChatThumbnail from "@/components/ChatThumbnail";

interface ChatsListProps {
  chatThumbnails: TChatThumbnail[];
  onSelect: (chatThumbnail: TChatThumbnail) => void;
}

export default function ChatsList(props: ChatsListProps) {
  if (!props.chatThumbnails.length) {
    return <ChatsListBlank />;
  }

  return (
    <div className="h-full overflow-y-auto flex flex-col gap-2 py-1 px-3">
      {props.chatThumbnails.map((chatThumbnail, i) => (
        <ChatThumbnail
          key={i}
          thumbnail={chatThumbnail}
          onClick={() => props.onSelect(chatThumbnail)}
        />
      ))}
    </div>
  );
}
