import { FetchList, FetchListFail, FetchListSuccess } from "../types/HomeParamaList";

type HomeAction =
    | FetchList
    | FetchListFail
    | FetchListSuccess


interface State {
    data: [];
    isFetching: Boolean;
    error: Boolean
}


const defaultState: State = {
    data: [],
    isFetching: false,
    error: false,
};

const homeReducer = (state: State = defaultState, action: HomeAction): State => {
    switch (action.type) {
        case 'FETCHING_LIST':
            return {
                ...state,
                data: [],
                isFetching: true,
                error: false
            }
        case 'FETCH_LIST_SUCCESS':
            return {
                ...state,
                data: action.data,
                isFetching: false,
                error: false
            }
        case 'FETCHING_LIST_FAIL':
            return {
                ...state,
                data: action.data,
                isFetching: false,
                error: true
            }
        default:
            return state
    }
};

export default homeReducer