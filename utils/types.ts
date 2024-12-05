export type TUser = {
    id: number;
    // URL to the picture
    avatar: string;
    name: string;
    school: string;
    program: string;
    admissionYear: number;
    department: string;
    interests: string[];
}

export type TSearchResult = {
    user: TUser,
    connectionLevel: number;
}

export type TChat = {
    id: string;
    otherUser: TUser;
}

export type TChatThumbnail = TChat & {
    me: TUser;
    lastMessage?: TMessage;
};

export type TMessageStatus = "delivered" | "read";

export type TMessage = {
    id: number;
    authorId: number;
    chatId: string;
    content: string;
    createdAt: Date;
    status: TMessageStatus;
    file: File | null;
    images: File[] | null;
}

export type TIncomingMessage = Pick<TMessage, "content" | "file" | "images">;

export type TSenderSwitch = "SENDER_SWITCH";

export type TChatEntity = TMessage | Date | TSenderSwitch;