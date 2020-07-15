import { AuthUnverifiedUserAction, UpdateShop, AuthVerifyUserAction, AuthLogOutUserAction, AuthLoginUserAction, AuthLoginAction, AuthLoginActionSuccess, AuthLoginActionFail, AuthClearError } from "../types/AuthParamLIst";

type AuthAction =
    | AuthUnverifiedUserAction
    | AuthVerifyUserAction
    | UpdateShop
    | AuthLogOutUserAction
    | AuthLoginAction
    | AuthLoginActionSuccess
    | AuthLoginActionFail
    | AuthClearError
    | AuthLoginUserAction;


export interface State {
    name: string;
    id: string
    email: string;
    token: string;
    profile: string;
    isFetching: boolean;
    error: boolean,
    shop: string,
    company: string,
    message: string
}


const defaultState: State = {
    name: '',
    id: '',
    email: '',
    token: '',
    profile: '',
    shop: '',
    company: '',
    isFetching: false,
    error: false,
    message: ''
};

const authReducer = (state: State = defaultState, action: AuthAction): State => {
    switch (action.type) {
        case 'VERIFY_USER':
            return state
        case 'LOGIN_USER':
            return {
                ...state,
                name: action.data.name,
                id: action.data.id,
                email: action.data.email,
                token: action.data.token,
                profile: action.data.profile,
                company: action.data.company,
                shop: "",
                message: "",
                isFetching: true,
                error: false
            }
        case 'LOGOUT_USER':
            return {
                ...state,
                name: action.data.name,
                id: action.data.id,
                email: action.data.email,
                token: action.data.token,
                profile: action.data.profile,
                company: action.data.company,
                shop: action.data.shop,
                message: action.data.message,
                isFetching: false,
                error: false
            }
        case 'UPDATE_SHOP':
            return {
                ...state,
                shop: action.shop
            }
        case 'CLEAR_ERROR':
            return {
                ...state,
                error: false
            }
        case 'UNVERIFIED_USER':
            return state;
        case 'FETCHING_LOGIN':
            return {
                ...state,
                name: "",
                id: "",
                email: "",
                token: "",
                profile: "",
                company: "",
                shop: "",
                message: "",
                isFetching: true,
                error: false
            }
        case 'FETCHING_LOGIN_SUCCESS':
            return {
                ...state,
                name: action.data.name,
                id: action.data.id,
                isFetching: false,
                email: action.data.email,
                token: action.data.token,
                profile: action.data.profile,
                company: action.data.company,
                shop: "",
                message: action.data.message,
                error: false
            }
        case 'FETCHING_LOGIN_FAIL':
            return {
                ...state,
                name: action.data.name,
                id: action.data.id,
                isFetching: false,
                email: action.data.email,
                token: action.data.token,
                profile: action.data.profile,
                company: action.data.company,
                shop: action.data.shop,
                message: action.data.message,
                error: action.data.error
            }
        default:
            return state;
    }
};

export default authReducer