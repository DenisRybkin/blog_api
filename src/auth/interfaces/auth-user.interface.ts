import {User} from "../../users/users.model";
import {IJwtTokens} from "./jwt-tokens.interface";

export interface IAuthUser {
    user: User;
    tokens: IJwtTokens;
}