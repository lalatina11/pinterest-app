import type { Document } from "mongoose";

export interface UserType extends Document {
    username: string;
    name: string;
    email: string;
    password?: string;
    avatar?: string;
    createdAt: Date;
    updatedAt: Date;
}
