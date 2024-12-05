import { TUser } from "@/utils/types";

interface MeProps {
  me: TUser;
}

export default function Me(props: MeProps) {
  return (
    <div className="p-4 mt-4 w-full">
      <span className="font-bold text-xl">{props.me.name}</span>
    </div>
  );
}
