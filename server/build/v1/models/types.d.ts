export declare type uuid = string;
export interface DataBase {
    chats: Map<uuid, Chat>;
    users: Map<string, User>;
    messages: Map<uuid, Map<uuid, Message>>;
    members: Map<uuid, Map<string, string>>;
}
export interface Chat {
    id: uuid;
    name: string;
    imageUrl: string;
    lastUpdated: number;
    lastMessage: string;
}
export interface User {
    id: uuid;
    userName: string;
    password: string;
    imageUrl: string;
    createdAt: number;
}
export interface Message {
    id: uuid;
    author: string;
    content: string;
    authorImageUrl: string;
    sentGraphic: boolean;
    graphicUrls: string[];
    createdAt: number;
}
