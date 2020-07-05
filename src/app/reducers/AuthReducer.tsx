import { AuthUnverifiedUserAction, AuthUnapprovedUserAction, AuthVerifyUserAction, AuthLogOutUserAction, AuthLoginUserAction, AuthLoginAction, AuthLoginActionSuccess, AuthLoginActionFail } from "../types/AuthParamLIst";

type AuthAction =
    | AuthUnverifiedUserAction
    | AuthVerifyUserAction
    | AuthUnapprovedUserAction
    | AuthLogOutUserAction
    | AuthLoginAction
    | AuthLoginActionSuccess
    | AuthLoginActionFail
    | AuthLoginUserAction;


interface State {
    name: string;
    email: string;
    token: string;
    profile: string;
    isFetching: boolean;
    error: boolean
}


const defaultState: State = {
    name: '',
    email: '',
    token: '',
    profile: '',
    isFetching: false,
    error: false
};

const authReducer = (state: State = defaultState, action: AuthAction): State => {
    switch (action.type) {
        case 'VERIFY_USER':
            return state
        case 'LOGIN_USER':
            return {
                ...state,
                name: action.data.name,
                email: action.data.email,
                token: action.data.token,
                profile: action.data.profile,
                isFetching: true,
                error: false
            }
        case 'LOGOUT_USER':
            return {
                ...state,
                name: action.data.name,
                email: action.data.email,
                token: action.data.token,
                profile: action.data.profile,
                isFetching: false,
                error: false
            }
        case 'UNAPPROVED_USER':
            return state;
        case 'UNVERIFIED_USER':
            return state;
        case 'FETCHING_LOGIN':
            return {
                ...state,
                name: "",
                email: "",
                token: "",
                profile: "",
                isFetching: true,
                error: false
            }
        case 'FETCHING_LOGIN_SUCCESS':
            return {
                ...state,
                name: action.data.name,
                isFetching: false,
                email: action.data.email,
                token: action.data.token,
                profile: action.data.profile,
                error: false
            }
        case 'FETCHING_LOGIN_FAIL':
            return {
                ...state,
                name: action.data.name,
                isFetching: false,
                email: action.data.email,
                token: action.data.token,
                profile: action.data.profile,
                error: true
            }
        default:
            return state;
    }
};

export default authReducer