export interface Message {
  id: number;
  content: string;
  author: string;
  authorImageUrl: string;
  sentGraphic: boolean;
  createdAt: Date;
}
