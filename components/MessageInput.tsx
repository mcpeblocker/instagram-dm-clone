import { ChangeEvent, FormEvent, useState } from "react";
import AddPhoto from "./icons/AddPhoto";
import AddFile from "./icons/AddFile";

interface MessageInputProps {
  onSubmit: (message: string) => void;
}

export default function MessageInput(props: MessageInputProps) {
  const [text, setText] = useState("");
  const handleText = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSend = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text) return;
    props.onSubmit(text);
    setText("");
  };

  return (
    <form className="py-2 px-4" onSubmit={handleSend}>
      <div
        className="w-full flex gap-1 py-2 px-4 rounded-full bg-primary border-2 border-plain"
        style={{ borderWidth: 1 }}
      >
        <input
          className="flex-1 bg-transparent outline-none border-none"
          value={text}
          type="text"
          name="text"
          placeholder="Message..."
          onChange={handleText}
        />
        {text === "" ? (
          <div className="flex justify-center items-center gap-2">
            <div className="cursor-pointer hover:opacity-60" title="Add File">
              <AddFile />
            </div>
            <div className="cursor-pointer hover:opacity-60" title="Add Photo">
              <AddPhoto />
            </div>
          </div>
        ) : (
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
