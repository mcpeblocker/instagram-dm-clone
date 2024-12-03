# Notes:

- Project uses NextJS as a framework being wrapped around React
- The codebase heavily depends on TailwindCSS for styling
- Client-side rendering (CSR) approach is used to render the UI
- Dark and light mode colors are supported depending on system theme
- The UI is mobile-responsive
- Message sending failure cases are not handled in this codebase.
- Each message can be either of the two below:
  - "delivered": Author pressed send button and the message has been delivered to the chat.
  - "read": Any other member of the chat (excluding author himself) has read the message by opening chat.

# Goal

- [x] Create a front-end UI that mimics Instagram DM capabilities by using React.
- [x] It aims to operate without a back-end using hard-coded data.

# Requirements

- [x] Message list
  - [x] Displays the profile picture, name, recent message, and readability of each contact.
  - [x] Click to go to the appropriate conversation.
- [x] Conversation Interface
  - [x] Displays messages in chronological order.
  - [x] Separate messages sent and received in different styles.
  - [x] Implement a message input window and include a message send button.
  - [x] Message Delete Features
  - [x] The message you entered at the time of sending will be added to the screen in real time.
  - [x] Implement read marks on each message.
- [x] Image/File
  - [x] Up to five images can be transmitted at a time.
  - [x] Documents such as PDF and WORD can be transmitted.
  - [x] Images or documents can be downloaded.
- [x] Library
  - Any license that can be used for commercial purposes can be used.
  - [x] Please record the library you used.
- [x] Design
  - Normally, designs are provided through Figma, but currently, there is nothing prepared.
  - [x] Therefore, for this task only, create the design by mimicking Instagram's DM.

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.
