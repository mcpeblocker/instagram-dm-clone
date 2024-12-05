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

export type TChatThumbnail = {
    chat: TChat;
    me: TUser;
    lastMessage?: TMessage;
};

export type TMessageStatus = "delivered" | "read";

export type TAttachment = {
    file: File;
    isImage: boolean;
}

export type TMessage = {
    id: number;
    authorId: number;
    chatId: string;
    content: string | null;
    createdAt: Date;
    status: TMessageStatus;
    attachments: TAttachment[];
}

export type TIncomingMessage = Pick<TMessage, "content" | "attachments">;

export type TChatEntity = { message: TMessage, lastOfAuthor: boolean } | Date;