import { StackNavigationProp } from "@react-navigation/stack"
import { RouteProp } from "@react-navigation/native"

export type DeliveryParamList = {
    HomeAddres: undefined;
    DetailAddres: undefined;
    HomeAdDetailMapdres: undefined;
    Edit: {
        name: string,
        submit?: React.MutableRefObject<() => void>
    };
}

export type SendBagToOrder = {
    type: 'REQUEST_BAG';
}

export type SendBagToOrderFail = {
    type: 'REQUEST_BAG_FAIL';
    data: { message: string, error: boolean };
}

export type SendBagToOrderSuccess = {
    type: 'REQUEST_BAG_SUCCESS';
    data: { message: string, error: boolean };
}

export type Restart = {
    type: 'REQUEST_BAG_RESTART';
}

export type DetailNavProps<T extends keyof DeliveryParamList> = {
    navigation: StackNavigationProp<DeliveryParamList, T>;
    route: RouteProp<DeliveryParamList, T>;
}