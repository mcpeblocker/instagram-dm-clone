import { description, title } from "@/utils/constants";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center h-screen text-center p-4">
      <h1 className="text-xl font-bold text-contrast">{title}</h1>
      <p className="text-md text-secondary">{description}</p>
      <Link
        href="/direct"
        className="bg-contrast text-default rounded-md p-3 text-xl font-bold hover:bg-secondary transition-all"
      >
        Go to Inbox
      </Link>
    </div>
  );
}
