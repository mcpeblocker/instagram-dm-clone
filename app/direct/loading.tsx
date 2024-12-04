import { LoadingThumbnail } from "@/components/LoadingThumbnail";
import { NoChatRoom } from "@/components/NoChatRoom";

export default function LoadingDirect() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar list of chats */}
      <div
        className="w-full md:w-1/3 flex flex-col border-r-plain"
        style={{ borderRightWidth: 1 }}
      >
        <div className="p-4 mt-4 w-full">
          <div className="animate-pulse h-2 w-1/2 my-2.5 bg-secondary rounded"></div>
        </div>
        <div className="h-full overflow-y-auto flex flex-col gap-4 p-4">
          <div className="w-full">
            <span className="font-bold">Messages</span>
          </div>
          <LoadingThumbnail />
          <LoadingThumbnail />
          <LoadingThumbnail />
          <LoadingThumbnail />
          <LoadingThumbnail />
        </div>
      </div>
      {/* Chatroom */}
      <div className="flex-grow py-4 md:py-2">
        <NoChatRoom />
      </div>
    </div>
  );
}
