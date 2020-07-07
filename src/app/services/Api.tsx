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
    let request = { profile: store.getState().auth.profile, company: store.getState().auth.company }
    return axios.post('http://192.168.1.100:3000/orders', request, config).then((response: AxiosResponse) => {
        console.log("Ordenes", response);
        if (response.status == 200) {
            return response.data.data;
        }
        else {
            return [];
        }
    });
}

export const ShopList = async () => {
    config.headers["access-token"] = store.getState().auth.token
    let route = "orders"
    route = getRoute(store.getState().auth.profile)
    let query = { profile: store.getState().auth.profile, userCompany: store.getState().auth.company }
    return axios.post('http://192.168.1.100:3000/shop/user', query, config).then((response: AxiosResponse) => {
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
        "user": user,
        "password": password
    }
    config.headers["access-token"] = store.getState().auth.token
    const fakeuser = { name: user, email: user, token: "", profile: "", company: "", message: "" }
    return axios.post('http://192.168.1.100:3000/users/auth', params).then((response: AxiosResponse) => {
        if (response.status == 200) {
            if (response.data.success) {
                fakeuser.name = ""
                fakeuser.email = ""
                fakeuser.token = response.data.token
                fakeuser.profile = response.data.profile
                fakeuser.company = response.data.company
                fakeuser.message = response.data.message
                return { fakeuser: fakeuser, success: true };
            } else {
                fakeuser.message = response.data.message
                return { fakeuser: fakeuser, success: false };
            }
        }
        else {
            fakeuser.message = response.data.message
            return { fakeuser: fakeuser, success: false };
        }
    });
}



