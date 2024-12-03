// This file contains hardcoded data that is used in the application.

import { Chat, Message, User } from "./types";

const AVATAR_URL = "https://i.pravatar.cc/300";

const steve: User = {
    id: 1,
    avatar: `${AVATAR_URL}?img=53`,
    name: "Steve",
}
const john: User = {
    id: 2,
    avatar: `${AVATAR_URL}?img=8`,
    name: "John",
}
const jane: User = {
    id: 3,
    avatar: `${AVATAR_URL}?img=44`,
    name: "Jane",
}
const mary: User = {
    id: 4,
    avatar: `${AVATAR_URL}?img=41`,
    name: "Mary",
}
const kate: User = {
    id: 5,
    avatar: `${AVATAR_URL}?img=47`,
    name: "Kate",
}
const tom: User = {
    id: 6,
    avatar: `${AVATAR_URL}?img=58`,
    name: "Tom",
}
const jerry: User = {
    id: 7,
    avatar: `${AVATAR_URL}?img=59`,
    name: "Jerry",
}
const alice: User = {
    id: 8,
    avatar: `${AVATAR_URL}?img=45`,
    name: "Alice",
}

const me = steve;

const chat1: Chat = {
    id: "roguohrymmd3",
    members: [john, steve]
};
const chat1Messages: Message[] = [
    {
        id: 1,
        authorId: john.id,
        chatId: chat1.id,
        content: "Hello, Steve!",
        createdAt: new Date("2024-12-03T12:00:00"),
        status: "read",
        file: null,
        images: null,
    },
    {
        id: 2,
        authorId: steve.id,
        chatId: chat1.id,
        content: "Hi, John!",
        createdAt: new Date("2024-12-03T12:01:00"),
        status: "read",
        file: null,
        images: null,
    },
    {
        id: 3,
        authorId: john.id,
        chatId: chat1.id,
        content: "How are you?",
        createdAt: new Date("2024-12-03T12:02:00"),
        status: "read",
        file: null,
        images: null,
    },
    {
        id: 4,
        authorId: steve.id,
        chatId: chat1.id,
        content: "I'm good, thanks!",
        createdAt: new Date("2024-12-03T12:02:25"),
        status: "read",
        file: null,
        images: null,
    },
    {
        id: 5,
        authorId: steve.id,
        chatId: chat1.id,
        content: "How about you?",
        createdAt: new Date("2024-12-03T12:02:40"),
        status: "read",
        file: null,
        images: null,
    },
    {
        id: 6,
        authorId: john.id,
        chatId: chat1.id,
        content: "I'm good too!",
        createdAt: new Date("2024-12-03T12:03:00"),
        status: "read",
        file: null,
        images: null,
    },
    {
        id: 7,
        authorId: john.id,
        chatId: chat1.id,
        content: "Great!",
        createdAt: new Date("2024-12-03T12:03:30"),
        status: "delivered",
        file: null,
        images: null,
    }
]

const chat2: Chat = {
    id: "6ows52ixe96e",
    members: [john, alice, tom, steve]
};
const chat2Messages: Message[] = [
    {
        id: 8,
        authorId: john.id,
        chatId: chat2.id,
        content: "Hello, everyone!",
        createdAt: new Date("2024-12-03T12:05:00"),
        status: "read",
        file: null,
        images: null,
    },
    {
        id: 9,
        authorId: alice.id,
        chatId: chat2.id,
        content: "Hi, John!",
        createdAt: new Date("2024-12-03T12:05:30"),
        status: "read",
        file: null,
        images: null,
    },
    {
        id: 10,
        authorId: tom.id,
        chatId: chat2.id,
        content: "Hello!",
        createdAt: new Date("2024-12-03T12:06:00"),
        status: "read",
        file: null,
        images: null,
    },
    {
        id: 11,
        authorId: steve.id,
        chatId: chat2.id,
        content: "Hi, everyone!",
        createdAt: new Date("2024-12-03T12:06:30"),
        status: "read",
        file: null,
        images: null,
    },
    {
        id: 12,
        authorId: john.id,
        chatId: chat2.id,
        content: "How are you?",
        createdAt: new Date("2024-12-03T12:07:00"),
        status: "read",
        file: null,
        images: null,
    },
    {
        id: 13,
        authorId: alice.id,
        chatId: chat2.id,
        content: "I'm good, thanks!",
        createdAt: new Date("2024-12-03T12:07:30"),
        status: "read",
        file: null,
        images: null,
    },
    {
        id: 14,
        authorId: tom.id,
        chatId: chat2.id,
        content: "I'm good too!",
        createdAt: new Date("2024-12-03T12:08:00"),
        status: "read",
        file: null,
        images: null,
    },
    {
        id: 15,
        authorId: steve.id,
        chatId: chat2.id,
        content: "Doing amazing!",
        createdAt: new Date("2024-12-03T12:08:30"),
        status: "read",
        file: null,
        images: null,
    },
    {
        id: 16,
        authorId: john.id,
        chatId: chat2.id,
        content: "Great!",
        createdAt: new Date("2024-12-03T12:09:00"),
        status: "delivered",
        file: null,
        images: null,
    }
]

const chat3: Chat = {
    id: "m2bk8kadvmlg",
    members: [jane, steve]
};
const chat3Messages: Message[] = [
    {
        id: 17,
        authorId: jane.id,
        chatId: chat3.id,
        content: "Hi, Steve!",
        createdAt: new Date("2024-12-03T12:10:00"),
        status: "read",
        file: null,
        images: null,
    },
    {
        id: 18,
        authorId: steve.id,
        chatId: chat3.id,
        content: "Hello, Jane!",
        createdAt: new Date("2024-12-03T12:10:30"),
        status: "read",
        file: null,
        images: null,
    },
    {
        id: 19,
        authorId: jane.id,
        chatId: chat3.id,
        content: "How are you?",
        createdAt: new Date("2024-12-03T12:11:00"),
        status: "read",
        file: null,
        images: null,
    },
    {
        id: 20,
        authorId: steve.id,
        chatId: chat3.id,
        content: "I'm good, thanks!",
        createdAt: new Date("2024-12-03T12:11:30"),
        status: "read",
        file: null,
        images: null,
    },
    {
        id: 21,
        authorId: jane.id,
        chatId: chat3.id,
        content: "Did you finish the assignment?",
        createdAt: new Date("2024-12-03T12:12:00"),
        status: "delivered",
        file: null,
        images: null,
    }
]

const chat4: Chat = {
    id: "tr7m374cfp45",
    members: [mary, steve]
};
const chat4Messages: Message[] = [
    {
        id: 22,
        authorId: mary.id,
        chatId: chat4.id,
        content: "Hi, Steve!",
        createdAt: new Date("2024-12-03T12:15:00"),
        status: "read",
        file: null,
        images: null,
    },
    {
        id: 23,
        authorId: steve.id,
        chatId: chat4.id,
        content: "Hello, Mary!",
        createdAt: new Date("2024-12-03T12:15:30"),
        status: "read",
        file: null,
        images: null,
    },
    {
        id: 24,
        authorId: mary.id,
        chatId: chat4.id,
        content: "How are you?",
        createdAt: new Date("2024-12-03T12:16:00"),
        status: "read",
        file: null,
        images: null,
    },
    {
        id: 25,
        authorId: steve.id,
        chatId: chat4.id,
        content: "I'm good, thanks!",
        createdAt: new Date("2024-12-03T12:16:30"),
        status: "read",
        file: null,
        images: null,
    },
    {
        id: 26,
        authorId: mary.id,
        chatId: chat4.id,
        content: "Did you finish the report?",
        createdAt: new Date("2024-12-03T12:17:00"),
        status: "delivered",
        file: null,
        images: null,
    }
]

const chat5: Chat = {
    id: "bifzan1ea3pv",
    members: [kate, steve]
};
const chat5Messages: Message[] = [
    {
        id: 27,
        authorId: kate.id,
        chatId: chat5.id,
        content: "Hi, Steve!",
        createdAt: new Date("2024-12-03T12:20:00"),
        status: "read",
        file: null,
        images: null,
    },
    {
        id: 28,
        authorId: steve.id,
        chatId: chat5.id,
        content: "Hello, Kate!",
        createdAt: new Date("2024-12-03T12:20:30"),
        status: "read",
        file: null,
        images: null,
    },
    {
        id: 29,
        authorId: kate.id,
        chatId: chat5.id,
        content: "How are you?",
        createdAt: new Date("2024-12-03T12:21:00"),
        status: "read",
        file: null,
        images: null,
    },
    {
        id: 30,
        authorId: steve.id,
        chatId: chat5.id,
        content: "I'm good, thanks!",
        createdAt: new Date("2024-12-03T12:21:30"),
        status: "read",
        file: null,
        images: null,
    },
    {
        id: 31,
        authorId: kate.id,
        chatId: chat5.id,
        content: "Did you finish the presentation?",
        createdAt: new Date("2024-12-03T12:22:00"),
        status: "delivered",
        file: null,
        images: null,
    }
]

const chat6: Chat = {
    id: "vuynin8hhsvw",
    members: [tom, steve]
};
const chat6Messages: Message[] = [
    {
        id: 32,
        authorId: tom.id,
        chatId: chat6.id,
        content: "Hi, Steve!",
        createdAt: new Date("2024-12-03T12:25:00"),
        status: "read",
        file: null,
        images: null,
    },
    {
        id: 33,
        authorId: steve.id,
        chatId: chat6.id,
        content: "Hello, Tom!",
        createdAt: new Date("2024-12-03T12:25:30"),
        status: "read",
        file: null,
        images: null,
    },
    {
        id: 34,
        authorId: tom.id,
        chatId: chat6.id,
        content: "I need your help with something.",
        createdAt: new Date("2024-12-03T12:26:00"),
        status: "read",
        file: null,
        images: null,
    },
    {
        id: 35,
        authorId: steve.id,
        chatId: chat6.id,
        content: "Sure, what is it?",
        createdAt: new Date("2024-12-03T12:26:30"),
        status: "read",
        file: null,
        images: null,
    },
    {
        id: 36,
        authorId: tom.id,
        chatId: chat6.id,
        content: "I will tell you later when we meet.",
        createdAt: new Date("2024-12-03T12:27:00"),
        status: "read",
        file: null,
        images: null,
    }
]

const chat7: Chat = {
    id: "r8id2qr6pt29",
    members: [jerry, steve]
};
const chat7Messages: Message[] = [
    {
        id: 37,
        authorId: jerry.id,
        chatId: chat7.id,
        content: "Hi, Steve!",
        createdAt: new Date("2024-12-03T12:30:00"),
        status: "read",
        file: null,
        images: null,
    },
    {
        id: 38,
        authorId: steve.id,
        chatId: chat7.id,
        content: "Oh, look who's here!",
        createdAt: new Date("2024-12-03T12:30:30"),
        status: "read",
        file: null,
        images: null,
    },
    {
        id: 39,
        authorId: jerry.id,
        chatId: chat7.id,
        content: "How are you?",
        createdAt: new Date("2024-12-03T12:31:00"),
        status: "read",
        file: null,
        images: null,
    },
    {
        id: 40,
        authorId: steve.id,
        chatId: chat7.id,
        content: "All good, thanks!",
        createdAt: new Date("2024-12-03T12:31:30"),
        status: "read",
        file: null,
        images: null,
    }
]

const chat8: Chat = {
    id: "oxofydcwjvlo",
    members: [alice, steve]
};
const chat8Messages: Message[] = [
    {
        id: 41,
        authorId: alice.id,
        chatId: chat8.id,
        content: "Let's meet tomorrow.",
        createdAt: new Date("2024-12-03T12:35:00"),
        status: "read",
        file: null,
        images: null,
    },
    {
        id: 42,
        authorId: steve.id,
        chatId: chat8.id,
        content: "Do I know you?",
        createdAt: new Date("2024-12-03T12:35:30"),
        status: "read",
        file: null,
        images: null,
    },
    {
        id: 43,
        authorId: alice.id,
        chatId: chat8.id,
        content: "You forgot already?",
        createdAt: new Date("2024-12-03T12:36:00"),
        status: "read",
        file: null,
        images: null,
    },
    {
        id: 44,
        authorId: steve.id,
        chatId: chat8.id,
        content: "I don't think I'm supposed to know you.",
        createdAt: new Date("2024-12-03T12:36:30"),
        status: "read",
        file: null,
        images: null,
    },
    {
        id: 45,
        authorId: alice.id,
        chatId: chat8.id,
        content: "We'll see about that...",
        createdAt: new Date("2024-12-03T12:37:00"),
        status: "delivered",
        file: null,
        images: null,
    },
    {
        id: 46,
        authorId: alice.id,
        chatId: chat8.id,
        content: "You'll remember soon.",
        createdAt: new Date("2024-12-03T12:37:30"),
        status: "delivered",
        file: null,
        images: null,
    }
]

const chats: Chat[] = [chat1, chat2, chat3, chat4, chat5, chat6, chat7, chat8];
const messages: Message[] = [
    ...chat1Messages,
    ...chat2Messages,
    ...chat3Messages,
    ...chat4Messages,
    ...chat5Messages,
    ...chat6Messages,
    ...chat7Messages,
    ...chat8Messages,
];

const data = {
    chats,
    me,
    messages,
};

export default data;