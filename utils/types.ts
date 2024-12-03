export type User = {
    id: number;
    // URL to the picture
    avatar: string;
    name: string;
}

export type Chat = {
    id: string;
    members: User[];
}

export type ThumbnailChat = Chat & {
    me: User;
    lastMessage?: Message;
};

export type MessageStatus = "delivered" | "read";

export type Message = {
    id: number;
    authorId: number;
    chatId: string;
    content: string;
    createdAt: Date;
    status: MessageStatus;
    file: File | null;
    images: File[] | null;
}

export type IncomingMessage = Pick<Message, "content" | "file" | "images">;

export type ChatEntity = Message | Date;