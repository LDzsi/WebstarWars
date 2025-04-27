import { UserData } from "./user-data";

export interface LoginResponseModel {
    token: string;
    refreshToken: string;
    user: UserData;
}