import { FetchListFail, FetchListSuccess, FetchList, UpdateBag, UpdateBagFail, UpdateBagSuccess, UpdateBagClear } from "../types/HomeParamaListBag";
import { HomeListBag, UpdateBag as updateBagCall, UpdateBagReceived } from "../services/Api";
import { Dispatch, Action } from "redux";
import AsyncStorage from "@react-native-community/async-storage";



export const getHomeBagItems = () => {
    return (dispatch: Dispatch<Action>) => {
        dispatch(getHomeListBag());
        HomeListBag().then((response: any) => {
            if (response.length) dispatch(fetchItemsBagSuccess(response));
            else { dispatch(fetchItemsBagFail()); }
        })
    }
}

export const updateBagAction = (id: string) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch(updateBag());
        updateBagCall(id).then((response: any) => {
            if (response) dispatch(updateBagSuccess());
            else { dispatch(updateBagFail()); }
        })
    }
}

export const updateBagReceivedAction = (id: string, comment: string, received: string) => {
    return (dispatch: Dispatch<Action>) => {
        dispatch(updateBag());
        UpdateBagReceived(id, comment, received).then((response: any) => {
            if (response) dispatch(updateBagSuccess());
            else { dispatch(updateBagFail()); }
        })
    }
}

export const updateBagActionFinish = (): UpdateBagClear => ({
    type: 'FETCH_BAG_CLEAR',
});
export const getHomeListBag = (): FetchList => ({
    type: 'FETCHING_LIST',
});

export const updateBag = (): UpdateBag => ({
    type: 'FETCH_BAG_UPDATE',
});

export const updateBagFail = (): UpdateBagFail => ({
    type: 'FETCH_UPDATE_FAIL',
});

export const updateBagSuccess = (): UpdateBagSuccess => ({
    type: 'FETCH_UPDATE_SUCCESS',
});



export const fetchItemsBagSuccess = (products: []): FetchListSuccess => ({
    type: 'FETCH_LIST_SUCCESS',
    data: products
});

export const fetchItemsBagFail = (): FetchListFail => ({
    type: 'FETCHING_LIST_FAIL',
    data: []
});