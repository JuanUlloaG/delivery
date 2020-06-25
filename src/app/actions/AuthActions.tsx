import { AuthUnapprovedUserAction, AuthUnverifiedUserAction, AuthVerifyUserAction, AuthLogOutUserAction, AuthLoginUserAction, AuthLoginAction, AuthLoginActionSuccess, AuthLoginActionFail } from "../types/AuthParamLIst";
import { login } from "../services/Api";
import { Dispatch, Action } from "redux";
import AsyncStorage from "@react-native-community/async-storage";

export type AuthType = AuthUnverifiedUserAction | AuthUnapprovedUserAction | AuthVerifyUserAction | AuthLogOutUserAction | AuthLoginUserAction | AuthLoginAction | AuthLoginActionSuccess | AuthLoginActionFail;

export const loginAction = (user: { user: string, password: string }) => {
    return (dispatch: Dispatch<Action>) => {
        let fakeUser = {name:"carlangas", email:"elmejor@carlangas.com", token:"token-1"}
        // dispatch(loginUserSuccess(fakeUser.name, fakeUser.email, fakeUser.token));
        login(user.user, user.password).then((response: any) => {
            if (response.success) dispatch(loginUserSuccess(response.fakeuser.name, response.fakeuser.email, response.fakeuser.token));
            else { dispatch(loginUserFail()); }
        })
    }
}

export const unverifiedUser = (email: string): AuthUnverifiedUserAction => ({
    type: 'UNVERIFIED_USER',
    email: email
});

export const unapprovedUser = (name: string): AuthUnapprovedUserAction => ({
    type: 'UNAPPROVED_USER',
    name: name
});

export const verifyUser = (name: string): AuthVerifyUserAction => ({
    type: 'VERIFY_USER',
    name: name
});

export const loginUser = (name: string, email: string, token: string): AuthLoginUserAction => ({
    type: 'LOGIN_USER',
    data: { name: name, email: email, token: token }
});

export const logOutUser = (): AuthLogOutUserAction => ({
    type: 'LOGOUT_USER',
    data: { name: "", email: "", token: "" }
});

export const loginFetch = (): AuthLoginAction => ({
    type: 'FETCHING_LOGIN',
});

export const loginUserSuccess = (name: string, email: string, token: string): AuthLoginActionSuccess => ({
    type: 'FETCHING_LOGIN_SUCCESS',
    data: { name: name, email: email, token: token }
});

export const loginUserFail = (): AuthLoginActionFail => ({
    type: 'FETCHING_LOGIN_FAIL',
    data: { name: "", email: "", token: "" }
});