import AsyncStorage from "@react-native-community/async-storage";
import axios, { AxiosResponse } from "axios";
import store from "../store/Store";

let config = {
    headers: {
        'access-token': ''
    }
}

const getRoute = (profile: string) => {
    switch (profile) {
        case 2:
            return "/orders"
        case 3:
            return "/orders/delivery"
        case 4:
            return "/orders/delivery"

        default:
            return "/orders"
    }
}

export const HomeList = async () => {
    config.headers["access-token"] = store.getState().auth.token
    let route = "orders"
    route = getRoute(store.getState().auth.profile)
    console.log(route);
    return axios.get('http://192.168.1.100:3001' + route, config).then((response: AxiosResponse) => {
        if (response.status == 200) {
            return response.data.data;
        }
        else {
            return [];
        }
    });
}


export const login = async (user: string, password: string) => {
    let params: {} = {
        "usuario": user,
        "contrasena": password
    }
    config.headers["access-token"] = store.getState().auth.token
    const fakeuser = { name: user, email: user, token: "", profile: "" }
    return axios.post('http://192.168.1.100:3001/users/auth', params).then((response: AxiosResponse) => {
        if (response.status == 200) {
            console.log(response.data.profile);
            fakeuser.name = ""
            fakeuser.email = ""
            fakeuser.token = response.data.token
            fakeuser.profile = response.data.profile
            return { fakeuser: fakeuser, success: true };
        }
        else {
            return { fakeuser: fakeuser, success: false };
        }
    });
}



