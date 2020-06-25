import AsyncStorage from "@react-native-community/async-storage";
import axios, { AxiosResponse } from "axios";
import store from "../store/Store";

let config = {
    headers: {
        'access-token': ''
    }
}

export const HomeList = async () => {
    config.headers["access-token"] = store.getState().auth.token
    return axios.get('http://192.168.1.100:3001/users', config).then((response: AxiosResponse) => {
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
    const fakeuser = { name: 'carlos', email: "carlangas@elmejor.com", token: "" }
    return axios.post('http://192.168.1.100:3001/users/auth', params).then((response: AxiosResponse) => {
    console.log(response);    
    if (response.status == 200) {
            fakeuser.name = "carlos"
            fakeuser.email = "carlangas@elmejor.com"
            fakeuser.token = response.data.token
            return { fakeuser: fakeuser, success: true };
        }
        else {
            return { fakeuser: fakeuser, success: false };
        }
    });
}



