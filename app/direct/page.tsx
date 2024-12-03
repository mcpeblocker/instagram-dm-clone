import Inbox from "@/components/Inbox";
import { Metadata } from "next";

type GenerateMetadataProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};
export async function generateMetadata({
  searchParams,
}: GenerateMetadataProps): Promise<Metadata> {
  const chatId = (await searchParams).chat;
  return {
    title: chatId ? "Chats • Instagram" : "Inbox • Chats",
  };
}

export default function Direct() {
  return <Inbox />;
}
