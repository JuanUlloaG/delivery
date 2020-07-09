import { UpdateShop, AuthUnverifiedUserAction, AuthVerifyUserAction, AuthLogOutUserAction, AuthLoginUserAction, AuthLoginAction, AuthLoginActionSuccess, AuthLoginActionFail } from "../types/AuthParamLIst";
import { login } from "../services/Api";
import { Dispatch, Action } from "redux";
import AsyncStorage from "@react-native-community/async-storage";

export type AuthType = AuthUnverifiedUserAction | UpdateShop | AuthVerifyUserAction | AuthLogOutUserAction | AuthLoginUserAction | AuthLoginAction | AuthLoginActionSuccess | AuthLoginActionFail;

export const loginAction = (user: { user: string, password: string }) => {
    return (dispatch: Dispatch<Action>) => {
        let fakeUser = { user: user.user, password: user.password };
        // dispatch(loginUserSuccess(fakeUser.name, fakeUser.email, fakeUser.token));
        login(user.user, user.password).then((response: any) => {
            if (response.success)
                dispatch(loginUserSuccess(response.fakeuser.name, response.fakeuser.id, response.fakeuser.email, response.fakeuser.token, response.fakeuser.profile, response.fakeuser.company, "", response.fakeuser.message));
            else {
                // console.log("aqui", response);
                dispatch(loginUserFail(response.fakeuser.message));
            }
        });
    };
}

export const unverifiedUser = (email: string): AuthUnverifiedUserAction => ({
    type: 'UNVERIFIED_USER',
    email: email
});


export const updateShop = (shop: string): UpdateShop => ({
    type: 'UPDATE_SHOP',
    shop: shop
});

export const verifyUser = (name: string): AuthVerifyUserAction => ({
    type: 'VERIFY_USER',
    name: name
});

export const loginUser = (name: string, id: string, email: string, token: string, profile: string, company: string, shop: string, message: string): AuthLoginUserAction => ({
    type: 'LOGIN_USER',
    data: { name: name, id: id, email: email, token: token, profile: profile, company: company, shop: shop, message: message }
});

export const logOutUser = (): AuthLogOutUserAction => ({
    type: 'LOGOUT_USER',
    data: { name: "", id: "", email: "", token: "", profile: "", company: "", shop: "", message: "" }
});

export const loginFetch = (): AuthLoginAction => ({
    type: 'FETCHING_LOGIN',
});

export const loginUserSuccess = (name: string, id: string, email: string, token: string, profile: string, company: string, shop: string, message: string): AuthLoginActionSuccess => ({
    type: 'FETCHING_LOGIN_SUCCESS',
    data: { name: name, id: id, email: email, token: token, profile: profile, company: company, shop: shop, message: message }
});

export const loginUserFail = (error: string): AuthLoginActionFail => ({
    type: 'FETCHING_LOGIN_FAIL',
    data: { name: "", id: "", email: "", token: "", profile: "", company: "", shop: "", error: true, message: error }
});