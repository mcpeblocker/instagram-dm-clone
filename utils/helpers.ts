import api from "./api";
import { TChat, TChatThumbnail, TUser } from "./types";

const MAX_LENGTH = 25;

export const trimContent = (message: string, maxLength = MAX_LENGTH) => {
    return message.length > maxLength
        ? message.slice(0, maxLength) + "..."
        : message;
};

export const getOtherMembers = (members: TUser[], me: TUser) => members.filter((member) => member.id !== me.id);

export const getChatTitle = (members: TUser[], me: TUser) => {
    const otherMembers = getOtherMembers(members, me);
    return members.length > 2
        ? trimContent(otherMembers.map((member) => member.name).join(" & "))
        : otherMembers[0].name;
}

export const isInSameDay = (date1: Date, date2: Date) => {
    return date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear();
}

export const formatDate = (date: Date) => {
    return date.toLocaleString([], { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" });
}

export const formatSinceDate = (date: Date) => {
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    if (seconds < 3600) {
        return `${Math.floor(seconds / 60)}m`;
    }
    if (seconds < 86400) {
        return `${Math.floor(seconds / 3600)}h`;
    }
    return `${Math.floor(seconds / 86400)}d`;
}

export const formatTime = (date: Date) => {
    return date.toLocaleString([], { hour: "numeric", minute: "2-digit" });
}

export const formatFileSize = (size: number) => {
    if (size < 1024) {
        return `${size} B`;
    }
    if (size < 1024 * 1024) {
        return `${(size / 1024).toFixed(1)} KB`;
    }
    return `${(size / 1024 / 1024).toFixed(1)} MB`;
}

export const loadChatThumbnails = async (me: TUser, chats: TChat[]): Promise<TChatThumbnail[]> => {
    const promises = chats.map((chat) =>
        api.getLastMessage(chat).then((m) => ({ chat, me, lastMessage: m }))
    );
    const thumbnails = await Promise.all(promises);
    thumbnails.sort((a, b) => {
        if (!a.lastMessage) return 1;
        if (!b.lastMessage) return -1;
        return (
            b.lastMessage.createdAt.getTime() -
            a.lastMessage.createdAt.getTime()
        );
    })
    return thumbnails;
}

export const isFileImage = (file: File) => {
    return file.type.startsWith("image/");
}