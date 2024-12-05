export function ChatThumbnailLoader() {
  return (
    <div className="flex items-center gap-4 p-2 bg-secondary opacity-20 rounded-md animate-pulse">
      <div className="w-12 h-12 bg-default rounded-full"></div>
      <div className="flex-1 flex flex-col gap-2">
        <div className="bg-default h-4 rounded w-1/3"></div>
        <div className="bg-default h-4 rounded"></div>
      </div>
    </div>
  );
}