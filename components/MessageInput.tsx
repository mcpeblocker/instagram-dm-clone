import { ChangeEvent, FormEvent, useState } from "react";
import Photo from "./icons/Photo";
import File from "./icons/File";
import { TAttachment, TIncomingMessage } from "@/utils/types";
import FilePreview from "./FilePreview";
import ImagePreview from "./ImagePreview";
import Plus from "./icons/Plus";
import Send from "./icons/Send";
import { isFileImage } from "@/utils/helpers";

interface MessageInputProps {
  onSubmit: (incomingMessage: TIncomingMessage) => void;
}

export default function MessageInput(props: MessageInputProps) {
  const [text, setText] = useState("");
  const [attachedFiles, setAttachedFiles] = useState<TAttachment[]>([]);

  const handleText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length == 0) return;
    if (files.length > 5) {
      alert("You can only send up to 5 images at once.");
    }
    const updatedFiles = [
      ...Array.from(files).map((file) => ({
        file,
        isImage: isFileImage(file),
      })),
      ...attachedFiles,
    ].slice(0, 5);
    setAttachedFiles(updatedFiles);
  };

  const handleFileDelete = (file: TAttachment) => {
    setAttachedFiles(attachedFiles.filter((f) => f !== file));
  };

  const handleSend = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!(text || attachedFiles.length > 0)) return;
    props.onSubmit({
      content: text,
      attachments: attachedFiles,
    });
    setText("");
    setAttachedFiles([]);
  };

  return (
    <form className="p-2" onSubmit={handleSend}>
      {/* Attachments (optionally displayed) */}
      <div className="w-full">
        {/* Attachments */}
        {attachedFiles.length > 0 && (
          <span className="text-sm text-secondary px-4">Attachments:</span>
        )}
        <div className="flex justify-around flex-wrap gap-2">
          {attachedFiles.map((attachment, i) =>
            attachment.isImage ? (
              <ImagePreview
                key={i}
                image={attachment.file}
                onDelete={handleFileDelete.bind(null, attachment)}
              />
            ) : (
              <FilePreview
                key={i}
                file={attachment.file}
                onDelete={handleFileDelete.bind(null, attachment)}
              />
            )
          )}
        </div>
      </div>
      {/* Input (always displayed) */}
      <div className="w-full flex items-center gap-2 p-2">
        <div
          className="bg-secondary-bg p-2 rounded-full cursor-pointer hover:opacity-60"
          title="Add File"
        >
          <label className="cursor-pointer" htmlFor="upload-file">
            <Plus />
          </label>
          <input
            type="file"
            id="upload-file"
            accept=".doc,.docx,.pdf,.txt,image/*"
            multiple
            className="hidden"
            onChange={handleFile}
          />
        </div>
        <input
          className="flex-grow outline-none border-none rounded-md bg-secondary-bg p-2 text-sm"
          value={text}
          type="text"
          name="text"
          // en: Send message
          placeholder="메세지 보내기"
          onChange={handleText}
        />
        <button
          className="flex items-center justify-center p-2 pr-2.5 pt-2.5 rounded-full bg-primary hover:opacity-75 disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
          disabled={!(text || attachedFiles.length > 0)}
        >
          <Send />
        </button>
      </div>
    </form>
  );
}
