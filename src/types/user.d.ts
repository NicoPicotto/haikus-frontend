export interface User {
   _id: string;
   firstName: string;
   lastName: string;
   email: string;
   createdAt: string;
   bio?: string;
   city?: string;
   socialLinks?: {
      twitter?: string;
      facebook?: string;
      instagram?: string;
   };
}

export interface UpdateUserPayload {
   firstName?: string;
   lastName?: string;
   email?: string;
   bio?: string;
   city?: string;
   socialLinks?: object;
}
