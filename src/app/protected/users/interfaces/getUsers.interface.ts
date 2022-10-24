import { User } from "src/app/interfaces/user.interface";

export interface GetUser {
    total: number,
    users?: User[]
}