import { ChangeEvent, FormEvent, useState } from "react";
import Photo from "./icons/Photo";
import File from "./icons/File";
import { IncomingMessage } from "@/utils/types";
import FilePreview from "./FilePreview";
import ImagePreview from "./ImagePreview";

interface MessageInputProps {
  onSubmit: (incomingMessage: IncomingMessage) => void;
}

export default function MessageInput(props: MessageInputProps) {
  const [text, setText] = useState("");
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [attachedImages, setAttachedImages] = useState<File[] | null>(null);
  const handleText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAttachedFile(file);
  };

  const handleImage = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length == 0) return;
    if (files.length > 5) {
      alert("You can only send up to 5 images at once.");
      return;
    }
    const updatedImages = [
      ...Array.from(files),
      ...(attachedImages ?? []),
    ].slice(0, 5);
    setAttachedImages(updatedImages);
  };

  const handleFileDelete = () => {
    setAttachedFile(null);
  };

  const handleImageDelete = (index: number) => {
    if (!attachedImages) return;
    const newImages = attachedImages.filter((_, i) => i !== index);
    if (newImages.length === 0) {
      setAttachedImages(null);
    } else {
      setAttachedImages(newImages);
    }
  };

  const handleSend = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text) return;
    props.onSubmit({
      content: text,
      file: attachedFile,
      images: attachedImages,
    });
    setText("");
    setAttachedFile(null);
    setAttachedImages(null);
  };

  return (
    <form className="py-2 px-4" onSubmit={handleSend}>
      <div className="w-full">
        {/* Attachments */}
        {(attachedFile || attachedImages) && (
          <span className="text-sm">Attachments:</span>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2">
          {attachedFile && (
            <FilePreview file={attachedFile} onDelete={handleFileDelete} />
          )}
          {attachedImages &&
            attachedImages.map((image, i) => (
              <ImagePreview
                key={i}
                image={image}
                onDelete={handleImageDelete.bind(null, i)}
              />
            ))}
        </div>
      </div>
      <div
        className="w-full flex gap-1 py-2 px-4 rounded-3xl bg-primary border-2 border-plain"
        style={{ borderWidth: 1 }}
      >
        <div className="flex justify-center items-center gap-1 mr-2">
          <div className="cursor-pointer hover:opacity-60" title="Add File">
            <label className="cursor-pointer" htmlFor="upload-file">
              <File />
            </label>
            <input
              type="file"
              id="upload-file"
              accept=".doc,.docx,.pdf,.txt"
              className="hidden"
              onChange={handleFile}
            />
          </div>
          <div className="hover:opacity-60" title="Add Photo">
            <label className="cursor-pointer" htmlFor="upload-image">
              <Photo />
            </label>
            <input
              type="file"
              id="upload-image"
              className="hidden"
              accept="image/*"
              multiple
              onChange={handleImage}
            />
          </div>
        </div>
        <input
          className="flex-1 bg-transparent outline-none border-none"
          value={text}
          type="text"
          name="text"
          placeholder="Message..."
          onChange={handleText}
        />
        {text !== "" && (
          <button
            className="text-highlight font-semibold text-sm hover:opacity-60"
            type="submit"
          >
            Send
          </button>
        )}
      </div>
    </form>
  );
}
