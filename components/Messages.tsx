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
    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];
      // lastOfAuthor is used to determine if the message is the last one from the same author
      let lastOfAuthor = false;
      if (messages[i + 1] && messages[i + 1].authorId !== message.authorId) {
        // If the next message is from a different author
        lastOfAuthor = true;
      }
      if (i === messages.length - 1) {
        // If it's the last message in the list
        lastOfAuthor = true;
      }
      if (!lastDate || !isInSameDay(lastDate, message.createdAt)) {
        entities.push(message.createdAt);
        lastDate = message.createdAt;
      }
      entities.push({ message, lastOfAuthor });
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
        entity instanceof Date ? (
          <div
            key={i}
            className="text-xs text-secondary font-semibold text-center py-1"
          >
            {formatDate(entity)}
          </div>
        ) : (
          <MessageBox
            isLastOfAuthor={entity.lastOfAuthor}
            key={i}
            message={entity.message}
            chat={chat}
            me={me}
            onDelete={() => onDelete(entity.message)}
          />
        )
      )}
      <div ref={messagesEndRef}></div>
    </div>
  );
}

interface MessageBoxProps {
  isLastOfAuthor: boolean;
  message: TMessage;
  chat: TChat;
  me: TUser;
  onDelete: () => void;
}

function MessageBox(props: MessageBoxProps) {
  const { isLastOfAuthor, message, me, onDelete } = props;
  const isMine = message.authorId === me.id;
  const isRead = message.status === "read";
  const hasAttachments = message.attachments.length > 0;
  const files = message.attachments.filter((attachment) => !attachment.isImage);
  const images = message.attachments.filter((attachment) => attachment.isImage);
  const hasContent = message.content !== "";
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = () => {
    if (!message.content) return;
    navigator.clipboard.writeText(message.content).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 1000);
    });
  };

  return (
    <div
      className={
        "group/container w-full flex flex-col" +
        (isMine ? " items-end" : "") +
        (isLastOfAuthor ? " mb-2" : "")
      }
    >
      <div
        className={`group/container w-full flex justify-start items-end gap-1 ${
          isMine ? "flex-row-reverse" : ""
        }`}
      >
        <div
          className={
            "group/content flex flex-col relative " +
            (isMine ? "items-end" : "items-start")
          }
        >
          {hasAttachments && (
            <div className="flex flex-col items-end gap-1">
              {files.map((fileAttachment, i) => (
                <FileAttachment file={fileAttachment.file} key={i} />
              ))}
              <div className="flex justify-end flex-wrap gap-0.5">
                {images.map((imageAttachment, i) => (
                  <ImageAttachment image={imageAttachment.file} key={i} />
                ))}
              </div>
            </div>
          )}
          {/* Message text */}
          {hasContent && (
            <p
              className={`max-w-2xl text-wrap break-words py-1.5 px-3 rounded-md ${
                isMine ? "bg-primary-bg" : "bg-secondary-bg"
              } text-contrast`}
            >
              {message.content}
            </p>
          )}
          {/* Actions: Copy / Delete */}
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
        <div
          className={
            isLastOfAuthor ? "flex" : "hidden group-hover/container:flex"
          }
        >
          {/* Read status */}
          {isMine && (
            <div className={"self-center mr-0.5 text-secondary group-hover/container:flex" + (isRead ? " hidden" : "")}>
              {isRead ? <CheckDouble /> : <Check />}
            </div>
          )}
          {/* Sent time */}
          <div className="text-xs text-secondary">
            {formatTime(message.createdAt)}
          </div>
        </div>
      </div>
    </div>
  );
}
