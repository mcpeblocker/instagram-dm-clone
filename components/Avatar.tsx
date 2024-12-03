import { getOtherMembers } from "@/utils/helpers";
import { Chat, ThumbnailChat, User } from "@/utils/types";
import Image from "next/image";

type AvatarProps = {
  chat: Chat | ThumbnailChat;
  me: User;
};

export default function Avatar(props: AvatarProps) {
  const {
    chat: { members },
    me,
  } = props;
  const otherMembers = getOtherMembers(members, me);
  if (members.length > 2) {
    const user1 = otherMembers[0];
    const user2 = otherMembers[1];
    return (
      <div className="relative" style={{ width: "48px", height: "48px" }}>
        <Image
          src={user2.avatar}
          alt={user2.name}
          width={44}
          height={44}
          className="rounded-full border-black border-2 absolute -top-1.5 -left-1.5 z-10"
        />
        <Image
          src={user1.avatar}
          alt={user1.name}
          width={44}
          height={44}
          className="rounded-full border-black border-2 absolute -bottom-1.5 -right-1.5 z-10"
        />
      </div>
    );
  } else {
    const otherUser = otherMembers[0];
    return (
      <Image
        src={otherUser.avatar}
        alt={otherUser.name}
        width={48}
        height={48}
        className="rounded-full"
      />
    );
  }
}
