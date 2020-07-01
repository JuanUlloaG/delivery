import React, { useState } from 'react'
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import store from '../store/Store';
import { loginUser, logOutUser, loginAction } from '../actions';
import axios, { AxiosResponse } from "axios";
import { AuthUnverifiedUserAction, AuthVerifyUserAction, AuthUnapprovedUserAction, AuthLogOutUserAction, AuthLoginAction, AuthLoginActionSuccess, AuthLoginActionFail, AuthLoginUserAction } from '../types/AuthParamLIst';
type AuthAction =
    | AuthUnverifiedUserAction
    | AuthVerifyUserAction
    | AuthUnapprovedUserAction
    | AuthLogOutUserAction
    | AuthLoginAction
    | AuthLoginActionSuccess
    | AuthLoginActionFail
    | AuthLoginUserAction;



type User = null | { name: String, email: String, token: String }


export const AuthContext = React.createContext<{
    user: User,
    login: (user: string, password: string) => void,
    logout: () => void,
    getToken: () => Boolean,
    getProfile: () => String
}>({
    user: { name: "", email: "", token: "" },
    login: (user: string, password: string) => { },
    logout: () => { },
    getToken: Boolean,
    getProfile: String
});

interface AuthProviderProps {
}




const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User>({ name: store.getState().auth.name, email: store.getState().auth.email, token: store.getState().auth.token })

    const login = (user: string, password: string) => {
        if (!store.getState().auth.token) {
            let params: {} = {
                "usuario": user,
                "contrasena": password
            }
            store.dispatch(loginAction({ user: params.usuario, password: params.contrasena }))

        }
    }

    const logout = () => {
        store.dispatch(logOutUser())
        setUser({ name: "", email: "", token: "" })
        AsyncStorage.removeItem('user')
    }

    function getToken(): Boolean {
        if (store.getState().auth.token) return true
        return false
    }

    function getProfile(): String {
        console.log(store.getState());
        if (store.getState().auth.token) return store.getState().auth.profile
        return ""
    }

    return (
        <AuthContext.Provider value={{
            user,
            login: login,
            logout: logout,
            getToken: getToken,
            getProfile: getProfile
        }}>
            {children}
        </AuthContext.Provider>
    );
}

function mapStateToProps(state: any) {
    return { auth: state.auth }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        // dispatching plain actions
        login: (name: string, password: string, token: string) => dispatch(loginUser(name, password, token)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthProvider)



