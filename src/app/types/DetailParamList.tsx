import { StackNavigationProp } from "@react-navigation/stack"
import { RouteProp } from "@react-navigation/native"

export type DetailParamList = {
    Detail: undefined;
    Edit: {
        name: string,
        submit?: React.MutableRefObject<() => void>
    };
}

export type DetailNavProps<T extends keyof DetailParamList> = {
    navigation: StackNavigationProp<DetailParamList, T>;
    route: RouteProp<DetailParamList, T>;
}