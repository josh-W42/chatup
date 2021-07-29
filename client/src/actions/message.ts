export interface Message {
  id: string;
  content: string;
  author: string;
  authorId: string;
  authorImageUrl: string;
  sentGraphic: boolean;
  graphicUrls: string[];
  createdAt: number;
}
