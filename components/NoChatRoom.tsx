import Messenger from "./icons/Messenger";

export function NoChatRoom() {
  return (
    <div className="flex flex-col gap-1 justify-center items-center h-full">
      <div className="my-2 border-2 border-contrast rounded-full p-5">
        <Messenger />
      </div>
      <span className="text-xl">Your messages</span>
      <span className="text-sm text-secondary">
        Send a message to start a chat.
      </span>
    </div>
  );
}
