import { useRouter } from "next/navigation";
import { TChatThumbnail } from "@/utils/types";
import LeftArrow from "@/components/icons/LeftArrow";
import TextButton from "@/components/common/TextButton";
import ChatsListLoader from "@/components/loaders/ChatsList.loader";
import ChatsList from "@/components/inbox/ChatsList";

interface InboxProps {
  onNewChat: () => void;
  onChatSelect: (chatThumbnail: TChatThumbnail) => void;
  chatThumbnails: TChatThumbnail[];
  isLoading: boolean;
}

export default function Inbox(props: InboxProps) {
  const router = useRouter();

  const handleBack = () => router.push("/");

  return (
    <>
      {/* Header */}
      <div className="w-full flex p-2 pt-4 gap-4 items-center text-contrast">
        {/* Back button */}
        <div
          onClick={handleBack}
          className="cursor-pointer hover:opacity-60 transition-all"
        >
          <LeftArrow />
        </div>
        {/* Title */}
        <span className="text-md font-semibold flex-grow">
          {/* en: Messages */}
          메시지
        </span>
        {/* Search button */}
        <TextButton
          // en: New chat
          text="새 메시지"
          onClick={props.onNewChat}
        />
      </div>
      {props.isLoading ? (
        <ChatsListLoader />
      ) : (
        <ChatsList
          chatThumbnails={props.chatThumbnails}
          onSelect={props.onChatSelect}
        />
      )}
    </>
  );
}
