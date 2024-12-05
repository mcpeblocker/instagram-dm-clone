import { ChatThumbnailLoader } from "./ChatThumbnail.loader";

export default function ChatsListLoader() {
  return (
    <div className="h-full overflow-y-auto flex flex-col gap-4 p-4">
      <ChatThumbnailLoader />
      <ChatThumbnailLoader />
      <ChatThumbnailLoader />
      <ChatThumbnailLoader />
      <ChatThumbnailLoader />
    </div>
  );
}
