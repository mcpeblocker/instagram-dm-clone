import Image from "next/image";

interface ImageAttachmentProps {
  image: File;
}

export default function ImageAttachment(props: ImageAttachmentProps) {
  const imageUrl = URL.createObjectURL(props.image);
  const handleClick = () => {
    window.open(imageUrl, "_blank");
  };

  return (
    <div
      onClick={handleClick}
      className="flex w-32 h-32 items-center justify-center rounded-lg cursor-pointer hover:opacity-60 transition-all"
    >
      <Image
        width={64}
        height={64}
        className="w-32 h-32 object-cover rounded-lg"
        src={imageUrl}
        alt="Image"
      />
    </div>
  );
}
