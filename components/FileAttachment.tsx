import { formatFileSize, trimContent } from "@/utils/helpers";
import File from "./icons/File";

interface FileAttachmentProps {
  file: File;
}

export default function FileAttachment(props: FileAttachmentProps) {
  const handleClick = () => {
    const url = URL.createObjectURL(props.file);
    window.open(url, "_blank");
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-1 w-36 p-1 rounded-lg cursor-pointer hover:text-highlight transition-all border-plain"
      style={{ borderWidth: "1px" }}
    >
      <div>
        <File />
      </div>
      <div className="flex flex-col">
        <span className="text-xs">{trimContent(props.file.name)}</span>
        <span className="text-xs text-secondary">
          {formatFileSize(props.file.size)}
        </span>
      </div>
    </div>
  );
}
