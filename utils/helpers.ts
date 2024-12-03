import { User } from "./types";

const MAX_LENGTH = 25;

export const trimContent = (message: string, maxLength = MAX_LENGTH) => {
    return message.length > maxLength
        ? message.slice(0, maxLength) + "..."
        : message;
};

export const getOtherMembers = (members: User[], me: User) => members.filter((member) => member.id !== me.id);

export const getChatTitle = (members: User[], me: User) => {
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
    if (seconds < 60) {
        return "Just now";
    }
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