import { Document } from "mongoose";

export class User extends Document{
    [x: string]: any;
    username: string;
    email: string;
    password: string;
}
