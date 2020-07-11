import { FetchListFail, FetchListSuccess, FetchList, FetchDetail, FetchDetailFail, FetchDetailSuccess } from "../types/HomeParamaList";
import { HomeList, takeOrder, leaveOrder } from "../services/Api";
import { Dispatch, Action } from "redux";
import AsyncStorage from "@react-native-community/async-storage";



export const getHomeItems = () => {
    return (dispatch: Dispatch<Action>) => {
        dispatch(getHomeList());
        // dispatch(fetchItemsSuccess([]));
        HomeList().then((response: any) => {
            if (response.length) dispatch(fetchItemsSuccess(response));
            else { dispatch(fetchItemsFail()); }
        })
    }
}

export const takeOrderAction = (id: string) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch(setOrderDetail());
        // dispatch(fetchItemsSuccess([]));
        takeOrder(id).then((response: any) => {
            if (response.length) dispatch(setOrderDetailSuccess());
            else { dispatch(setOrderDetailFail()); }
        })
    }
}

export const leaveOrderAction = (id: string) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch(setOrderDetail());
        leaveOrder(id).then((response: any) => {
            if (response.length) dispatch(setOrderDetailSuccess());
            else { dispatch(setOrderDetailFail()); }
        })
    }
}

export const getHomeList = (): FetchList => ({
    type: 'FETCHING_LIST',
});

export const setOrderDetail = (): FetchDetail => ({
    type: 'FETCHING_ORDER_DETAIL',
});

export const setOrderDetailFail = (): FetchDetailFail => ({
    type: 'FETCHING_ORDER_DETAIL_FAIL',
});

export const setOrderDetailSuccess = (): FetchDetailSuccess => ({
    type: 'FETCHING_ORDER_DETAIL_SUCCESS',
});



export const fetchItemsSuccess = (products: []): FetchListSuccess => ({
    type: 'FETCH_LIST_SUCCESS',
    data: products
});

export const fetchItemsFail = (): FetchListFail => ({
    type: 'FETCHING_LIST_FAIL',
    data: []
});