import { StackNavigationProp } from "@react-navigation/stack"
import { RouteProp } from "@react-navigation/native"

export type SearchParamList = {
    Search: undefined;
    Detail: {
        name: string
    };
    Edit: {
        name: string,
        submit?: React.MutableRefObject<() => void>
    };
}

export type SearchNavProps<T extends keyof SearchParamList> = {
    navigation: StackNavigationProp<SearchParamList, T>;
    route: RouteProp<SearchParamList, T>;
}