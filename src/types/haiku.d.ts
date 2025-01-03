export type Author = {
   firstName: string;
   lastName: string;
   email: string;
};

export interface Haiku {
   text: string;
   date: string;
   author: Author;
   likes: number;
   comments: number;
   _id: string;
}
