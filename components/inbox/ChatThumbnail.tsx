import { TChatThumbnail } from "@/utils/types";
import { formatSinceDate, trimContent } from "@/utils/helpers";
import Avatar from "@/components/common/Avatar";
import UnreadIndicator from "@/components/icons/UnreadIndicator";

interface ChatThumbnailProps {
  thumbnail: TChatThumbnail;
  onClick: () => void;
}

export default function ChatThumbnail(props: ChatThumbnailProps) {
  const {
    lastMessage,
    me,
    chat: { otherUser },
  } = props.thumbnail;
  const isUnread =
    lastMessage &&
    lastMessage.authorId !== me.id &&
    lastMessage.status !== "read";
  const chatTitle = trimContent(otherUser.name);
  const chatSubtitle = trimContent(otherUser.department);

  const messagePreview =
    lastMessage && lastMessage.content
      ? trimContent(lastMessage.content)
      : "대화를 시작하세요"; // en: Start a conversation

  const timeSinceLastMessage = lastMessage
    ? formatSinceDate(lastMessage.createdAt)
    : "";

  return (
    <div
      className="w-full flex items-center gap-3 p-2 rounded-md cursor-pointer"
      onClick={props.onClick}
    >
      {/* User avatar */}
      <Avatar user={otherUser} />
      {/* Chat details */}
      <div
        className={
          "flex-grow flex flex-col justify-between gap-1" +
          (isUnread ? " font-semibold" : "")
        }
      >
        {/* First Row */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1">
            {/* Name */}
            <p className="text-md font-semibold">{chatTitle}</p>
            {/* Department */}
            <p className="text-xs font-normal text-secondary">{chatSubtitle}</p>
          </div>
          {/* Time since last message date */}
          <span className="text-secondary text-xs">{timeSinceLastMessage}</span>
        </div>
        {/* Second Row */}
        <div className="flex justify-between items-center">
          {/* Latest message text */}
          <p className="text-sm">{messagePreview}</p>
          {/* Unread indicator */}
          {isUnread && <UnreadIndicator />}
        </div>
      </div>
    </div>
  );
}
