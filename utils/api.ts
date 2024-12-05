import data from "./data";
import { TChat, TUser, TMessage, TIncomingMessage, TSearchResult } from "./types";

// All api calls return hard-coded data
// Assuming all calls result in success
// No actual fetch error handling is implemented

async function getMe(): Promise<TUser> {
    // await wait(5);
    return data.me;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function getChats(_me: TUser): Promise<TChat[]> {
    // await wait(5);
    return data.chats;
}

async function getLastMessage(chat: TChat): Promise<TMessage | undefined> {
    // await wait();
    return data.messages
        .filter((m) => m.chatId === chat.id)
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0];
}

async function getMessages(chat: TChat): Promise<TMessage[]> {
    // await wait();
    return data.messages.filter((m) => m.chatId === chat.id);
}

function getLatestMessageId(messages: TMessage[]): number {
    return Math.max(...messages.map((m) => m.id));
}

async function sendMessage({ content, attachments }: TIncomingMessage, chat: TChat, me: TUser): Promise<TMessage> {
    // await wait();
    const newMessage: TMessage = {
        id: getLatestMessageId(data.messages) + 1,
        authorId: me.id,
        chatId: chat.id,
        content,
        createdAt: new Date(),
        status: "delivered",
        attachments
    };
    data.messages.push(newMessage);
    return newMessage;
}

async function deleteMessage(message: TMessage): Promise<void> {
    // await wait();
    data.messages = data.messages.filter((m) => m.id !== message.id);
}

async function markAsRead(message: TMessage): Promise<void> {
    // await wait();
    const index = data.messages.findIndex((m) => m.id === message.id);
    if (index !== -1) {
        data.messages[index].status = "read";
    }
}

async function searchUsers(query: string, me: TUser): Promise<TSearchResult[]> {
    // await wait();
    query = query.trim().toLowerCase();
    return data.users.filter((u) => u.id !== me.id && (u.name.toLowerCase().includes(query) || u.department.toLowerCase().includes(query))).map((u) => ({ user: u, connectionLevel: 1 }));
}

async function newChat(otherUser: TUser, me: TUser): Promise<TChat> {
    // await wait();
    // Check if chat already exists
    const existingChat = data.chats.find((c) => c.otherUser.id === otherUser.id);
    if (existingChat) {
        return existingChat;
    }
    // Create new chat
    const chat: TChat = {
        id: `${me.id}-${otherUser.id}`,
        otherUser,
    };
    data.chats.push(chat);
    return chat;
}

async function leaveChat(chat: TChat): Promise<void> {
    // await wait();
    data.chats = data.chats.filter((c) => c.id !== chat.id);
    data.messages = data.messages.filter((m) => m.chatId !== chat.id);
}

// Utility function to simulate time delay
async function wait(seconds: number = 1) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
}

const api = {
    getMe,
    getChats,
    getLastMessage,
    getMessages,
    sendMessage,
    deleteMessage,
    markAsRead,
    searchUsers,
    newChat,
    leaveChat
};

export default api;