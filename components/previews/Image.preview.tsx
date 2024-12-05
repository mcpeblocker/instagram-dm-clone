import { trimContent } from "@/utils/helpers";
import Cross from "@/components/icons/Cross";
import Image from "next/image";

interface ImagePreviewProps {
  image: File;
  onDelete: () => void;
}

export default function ImagePreview(props: ImagePreviewProps) {
  const handleClick = () => {
    const url = URL.createObjectURL(props.image);
    window.open(url, "_blank");
  };

  return (
    <div className="relative rounded-md text-contrast">
      {/* Preview */}
      <div
        className="flex flex-col items-center gap-2 p-2 cursor-pointer opacity-60 hover:opacity-100"
        onClick={handleClick}
      >
        <div className="w-16 h-16 flex justify-center items-center">
          <Image
            src={URL.createObjectURL(props.image)}
            alt="Preview"
            width={64}
            height={64}
            className="w-16 h-16 object-cover rounded-md"
          />
        </div>
        <span className="text-xs">{trimContent(props.image.name, 10)}</span>
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
