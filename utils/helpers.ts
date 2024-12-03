import { User } from "./types";

const MAX_LENGTH = 35;

export const trimMessage = (message: string) => {
    return message.length > MAX_LENGTH
        ? message.slice(0, MAX_LENGTH) + "..."
        : message;
};

export const getOtherMembers = (members: User[], me: User) => members.filter((member) => member.id !== me.id);

export const getChatTitle = (members: User[], me: User) => {
    const otherMembers = getOtherMembers(members, me);
    return members.length > 2
        ? trimMessage(otherMembers.map((member) => member.name).join(" & "))
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

export const formatTime = (date: Date) => {
    return date.toLocaleString([], { hour: "numeric", minute: "2-digit" });
}