import { TSearchResult } from "@/utils/types";
import Avatar from "@/components/common/Avatar";

interface UserInfoProps {
  result: TSearchResult;
}

export default function UserInfo(props: UserInfoProps) {
  const { user, connectionLevel } = props.result;
  return (
    <div className="w-full flex gap-2 p-3">
      {/* Avatar */}
      <div className="py-2">
        <Avatar user={user} />
      </div>
      <div className="flex-grow flex flex-col">
        {/* Name ㆍ Connection level */}
        <div className="flex items-center">
          <p className="text-lg font-semibold">{user.name}</p>
          {/* ㆍ2nd */}
          <p className="text-sm text-secondary">ㆍ{connectionLevel}촌</p>
        </div>
        <div className="text-md flex flex-col">
          {/* University | Program | Admission year */}
          <span>
            {user.school} | {user.program} | {user.admissionYear}
          </span>
          {/* Department */}
          <span>{user.department}</span>
        </div>
        {/* Interests */}
        <span className="text-md text-secondary">
          {user.interests.join(" / ")}
        </span>
      </div>
    </div>
  );
}
