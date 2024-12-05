export default function ChatsListBlank() {
  return (
    <div className="h-full flex flex-col justify-center items-center text-secondary">
      {/* en: There are no messages */}
      <span className="text-sm font-semibold">메시지가 없습니다.</span>
      {/* en: Send a message to your connection */}
      <span className="text-xs">일촌에게 메시지를 보내보세요.</span>
      <span className="h-20"></span>
    </div>
  );
}
