export interface DataBase {
    chats: Map<number, Chat>;
    users: Map<string, User>;
    messages: Map<number, Map<number, Message>>;
    members: Map<number, Map<string, boolean>>;
}
export interface Chat {
    name: string;
    imageUrl: string;
    lastUpdated: number;
    lastMessage: string;
}
export interface User {
    userName: string;
    password: string;
    imageUrl: string;
    createdAt: number;
}
export interface Message {
    author: string;
    content: string;
    authorImageUrl: string;
    sentGraphic: boolean;
    graphicUrls: string[];
    createdAt: number;
}
