export interface User {
   _id: string;
   firstName: string;
   lastName: string;
   email: string;
}

export interface UpdateUserPayload {
   firstName?: string;
   lastName?: string;
   email?: string;
}
