export interface Message {
  id: number;
  content: string;
  author: string;
  authorId: number;
  authorImageUrl: string;
  sentGraphic: boolean;
  createdAt: Date;
}
