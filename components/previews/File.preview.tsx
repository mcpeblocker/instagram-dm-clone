import { trimContent } from "@/utils/helpers";
import File from "@/components/icons/File";
import Cross from "@/components/icons/Cross";

interface FilePreviewProps {
  file: File;
  onDelete: () => void;
}

export default function FilePreview(props: FilePreviewProps) {
  const handleClick = () => {
    const url = URL.createObjectURL(props.file);
    window.open(url, "_blank");
  };

  return (
    <div className="relative rounded-md text-contrast">
      <div
        className="flex flex-col items-center gap-2 p-2 cursor-pointer opacity-60 hover:opacity-100"
        onClick={handleClick}
      >
        <div className="w-16 h-16 flex justify-center items-center">
          <File />
        </div>
        <span className="text-xs">{trimContent(props.file.name, 10)}</span>
      </div>
      <button
        type="button"
        title="Remove file"
        onClick={props.onDelete}
        className="absolute right-1 top-0 text-secondary hover:text-contrast"
      >
        <Cross />
      </button>
    </div>
  );
}
