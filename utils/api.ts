import data from "./data";
import { Chat, User, Message } from "./types";

// All api calls return hard-coded data
// Assuming all calls result in success
// No actual fetch error handling is implemented

async function getMe(): Promise<User> {
    // await wait();
    return data.me;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function getChats(_me: User): Promise<Chat[]> {
    // await wait();
    return data.chats;
}

async function getLastMessage(chat: Chat): Promise<Message | undefined> {
    // await wait();
    return data.messages
        .filter((m) => m.chatId === chat.id)
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0];
}

async function getMessages(chat: Chat): Promise<Message[]> {
    // await wait();
    return data.messages.filter((m) => m.chatId === chat.id);
}

function getLatestMessageId(messages: Message[]): number {
    return Math.max(...messages.map((m) => m.id));
}

async function sendMessage(content: string, chat: Chat, me: User): Promise<Message> {
    // await wait();
    const newMessage: Message = {
        id: getLatestMessageId(data.messages) + 1,
        authorId: me.id,
        chatId: chat.id,
        content,
        createdAt: new Date(),
        status: "delivered",
    };
    data.messages.push(newMessage);
    return newMessage;
}

async function deleteMessage(message: Message): Promise<void> {
    // await wait();
    data.messages = data.messages.filter((m) => m.id !== message.id);
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
    deleteMessage
};

export default api;