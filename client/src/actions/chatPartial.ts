/*
  Chat Partials are smaller data versions
  of the Chat Model structure. Mainly used
  for presenting in long lists.

  The normal Chat Models contain additional information,
  like all its messages and members for example
*/
export interface ChatPartial {
  id: number;
  name: string;
  imageUrl: string;
  lastUpdated: Date;
  lastMessage: string;
}
