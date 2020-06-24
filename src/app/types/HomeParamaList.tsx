import { StackNavigationProp } from "@react-navigation/stack"
import { RouteProp } from "@react-navigation/native"

export type HomeParamList = {
    Home: undefined;
    Detail: {
        name: string
    };
    Edit: {
        name: string,
        submit?: React.MutableRefObject<() => void>
    };
}

export type FetchListSuccess = {
    type: 'FETCH_LIST_SUCCESS';
    data: [];
}

export type FetchListFail = {
    type: 'FETCHING_LIST_FAIL';
    data: [];
}

export type FetchList = {
    type: 'FETCHING_LIST';
}






export type HomeNavProps<T extends keyof HomeParamList> = {
    navigation: StackNavigationProp<HomeParamList, T>;
    route: RouteProp<HomeParamList, T>;
}