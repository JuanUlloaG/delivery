import { StackNavigationProp } from "@react-navigation/stack"
import { RouteProp } from "@react-navigation/native"

export type AuthParamList = {
    Login: undefined
    Register: undefined,
    Started: undefined,
    Shop: undefined,
}

export interface AuthUnverifiedUserAction {
    type: 'UNVERIFIED_USER';
    email: string;
}
export interface UpdateShop {
    type: 'UPDATE_SHOP';
    shop: string;
}

export interface AuthPass {
    user: { uuser: string, password: string }
}

export interface AuthVerifyUserAction {
    type: 'VERIFY_USER';
    name: string;
}

export interface AuthLoginUserAction {
    type: 'LOGIN_USER';
    data: { name: string, email: string, token: string, profile: string, company: string, shop: string, message: string };
}
export interface AuthLogOutUserAction {
    type: 'LOGOUT_USER';
    data: { name: string, email: string, token: string, profile: string, company: string, shop: string, message: string };
}


export interface AuthLoginAction {
    type: 'FETCHING_LOGIN';
}

export interface AuthLoginActionSuccess {
    type: 'FETCHING_LOGIN_SUCCESS';
    data: { name: string, email: string, token: string, profile: string, company: string, shop: string, message: string };
}

export interface AuthLoginActionFail {
    type: 'FETCHING_LOGIN_FAIL';
    data: { name: string, email: string, token: string, profile: string, company: string, shop: string, message: string, error: boolean };
}

export type AuthNavProps<T extends keyof AuthParamList> = {
    navigation: StackNavigationProp<AuthParamList, T>;
    route: RouteProp<AuthParamList, T>;
}