import { LoginResponseUserModel } from "./login-response-user";

export interface LoginResponseModel {
    token: string;
    refreshToken: string;
    user: LoginResponseUserModel;
}