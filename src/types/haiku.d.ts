export type Author = {
   id: string;
   firstName: string;
   lastName: string;
   email: string;
};

export interface Haiku {
   text: string;
   date: string;
   author: Author;
   likes: string[];
   _id: string;
   likesCount?: number;
   liked?: boolean;
   savedBy: string[];
   isSaved?: boolean;
}
