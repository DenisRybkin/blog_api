import {User} from "../../modules/users/users.model";
import {IJwtTokens} from "./jwt-tokens.interface";

export interface IAuthUser {
    user: User;
    tokens: IJwtTokens;
}