import { TUser } from "@/utils/types";
import Image from "next/image";

type AvatarProps = {
  user: TUser;
};

// Assumption: There are no group chats like instagram's
export default function Avatar(props: AvatarProps) {
  return (
    <Image
      src={props.user.avatar}
      alt={props.user.name}
      width={52}
      height={52}
      className="rounded-full"
    />
  );
}
