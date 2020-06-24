import { FetchListFail, FetchListSuccess, FetchList } from "../types/HomeParamaList";
import { HomeList } from "../services/Api";
import { Dispatch, Action } from "redux";
import AsyncStorage from "@react-native-community/async-storage";



export const getHomeItems = () => {
    return (dispatch: Dispatch<Action>) => {
        dispatch(getHomeList());
        dispatch(fetchItemsSuccess([]));
        // HomeList().then((response: any) => {
        //     if (response.length) dispatch(fetchItemsSuccess(response));
        //     else { dispatch(fetchItemsFail()); }
        // })
    }
}

export const getHomeList = (): FetchList => ({
    type: 'FETCHING_LIST',
});



export const fetchItemsSuccess = (products: []): FetchListSuccess => ({
    type: 'FETCH_LIST_SUCCESS',
    data: products
});

export const fetchItemsFail = (): FetchListFail => ({
    type: 'FETCHING_LIST_FAIL',
    data: []
});