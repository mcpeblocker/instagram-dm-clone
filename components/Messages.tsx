import { TChat, TChatEntity, TMessage, TUser } from "@/utils/types";
import { useEffect, useMemo, useRef, useState } from "react";
import Copy from "./icons/Copy";
import Remove from "./icons/Remove";
import Copied from "./icons/Copied";
import { formatDate, formatTime, isInSameDay } from "@/utils/helpers";
import Check from "./icons/Check";
import CheckDouble from "./icons/Check-Double";
import FileAttachment from "./FileAttachment";
import ImageAttachment from "./ImageAttachment";
import { SENDER_SWITCH } from "@/utils/constants";

interface MessagesProps {
  messages: TMessage[];
  chat: TChat;
  me: TUser;
  onDelete: (message: TMessage) => void;
}

export function Messages(props: MessagesProps) {
  const { messages, chat, me, onDelete } = props;
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const entities = useMemo<TChatEntity[]>(() => {
    const entities: TChatEntity[] = [];
    let lastDate: Date | null = null;
    let lastAuthorId: number | null = null;
    for (const message of messages) {
      if (lastAuthorId) {
        if (lastAuthorId !== message.authorId) {
          entities.push(SENDER_SWITCH);
        }
      }
      if (!lastDate || !isInSameDay(lastDate, message.createdAt)) {
        entities.push(message.createdAt);
        lastDate = message.createdAt;
      }
      entities.push(message);
      lastAuthorId = message.authorId;
    }
    return entities;
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col justify-end gap-1 px-4 py-1">
      {entities.length === 0 && (
        <div className="mt-8 text-xs text-secondary font-semibold text-center py-1">
          {/* No messages yet */}
          아직 메시지가 없습니다
        </div>
      )}
      {entities.map((entity, i) =>
        entity === SENDER_SWITCH ? (
          <span key={i}></span>
        ) : entity instanceof Date ? (
          <div
            key={i}
            className="text-xs text-secondary font-semibold text-center py-1"
          >
            {formatDate(entity)}
          </div>
        ) : (
          <MessageBox
            isLast={i === entities.length - 1}
            key={i}
            message={entity}
            chat={chat}
            me={me}
            onDelete={() => onDelete(entity)}
          />
        )
      )}
      <div ref={messagesEndRef}></div>
    </div>
  );
}

interface MessageBoxProps {
  isLast: boolean;
  message: TMessage;
  chat: TChat;
  me: TUser;
  onDelete: () => void;
}

function MessageBox(props: MessageBoxProps) {
  const { isLast, message, me, onDelete } = props;
  const isMine = message.authorId === me.id;
  const isRead = message.status === "read";
  const hasAttachments = message.file || message.images;
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1000);
    });
  };

  return (
    <div
      className={
        "group/container w-full flex flex-col " + (isMine ? "items-end" : "")
      }
    >
      {hasAttachments && (
        <div className="flex flex-col items-end gap-1">
          {message.file && <FileAttachment file={message.file} />}
          {message.images && (
            <div className="flex justify-end flex-wrap gap-0.5">
              {message.images.map((image, i) => (
                <ImageAttachment image={image} key={i} />
              ))}
            </div>
          )}
        </div>
      )}
      <div
        className={`w-full flex justify-start items-end gap-1 ${
          isMine ? "flex-row-reverse" : ""
        }`}
      >
        <div
          className={
            "group/content flex flex-col relative " +
            (isMine ? "items-end" : "items-start")
          }
        >
          <p
            className={`max-w-2xl text-wrap break-words py-1.5 px-3 rounded-md ${
              isMine ? "bg-primary text-white" : "bg-secondary-bg"
            } ${hasAttachments ? "rounded-tr-xs" : ""} text-contrast`}
          >
            {message.content}
          </p>
          <div className="hidden group-hover/content:flex absolute z-50 -bottom-4 bg-secondary-bg p-1.5 gap-1 rounded-xl">
            <div
              className="cursor-pointer opacity-50 hover:opacity-100"
              onClick={handleCopy}
            >
              {isCopied ? <Copied /> : <Copy />}
            </div>
            {isMine && (
              <div
                className="cursor-pointer opacity-50 hover:opacity-100 text-red-500"
                onClick={onDelete}
              >
                <Remove />
              </div>
            )}
          </div>
        </div>
        <div className={isLast ? "flex" : "hidden group-hover/container:flex"}>
          {isMine && (
            <div className="self-center mr-0.5 text-secondary">
              {isRead ? <CheckDouble /> : <Check />}
            </div>
          )}
          <div className="text-xs text-secondary">
            {formatTime(message.createdAt)}
          </div>
        </div>
      </div>
    </div>
  );
}
