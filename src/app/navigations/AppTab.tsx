import React, { useContext } from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AppParamList } from '../types/AppParamList';
import Ionicons from "react-native-vector-icons/Ionicons";
import Antdesing from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { HomeStack } from './HomeStack';

import colors from '../assets/Colors';
import { AuthContext } from "../providers/AuthProvider";
import { Profile } from '../scenes/Profile/Profile';
import { Search } from '../scenes/Search/Search';

interface AppTabProps {

}

const Tabs = createBottomTabNavigator<AppParamList>()

export const AppTab: React.FC<AppTabProps> = ({ }) => {

    return (
        <Tabs.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Pickear') {
                        iconName = focused
                            ? 'shopping-basket'
                            : 'shopping-basket';
                        return <FontAwesome name={iconName} size={size} color={color} />;
                    } else if (route.name === 'Search') {
                        iconName = focused ? 'search1' : 'search1';
                        return <Antdesing name={iconName} size={size} color={color} />;
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'user' : 'user';
                        return <Antdesing name={iconName} size={size} color={color} />;
                    }
                    // You can return any component that you like here!
                },
            })}
            tabBarOptions={{
                activeTintColor: colors.darkYellow,
                inactiveTintColor: colors.gray,
                keyboardHidesTabBar: true,

            }}
        >
            <Tabs.Screen name='Pickear' component={HomeStack} />
            <Tabs.Screen name='Search' component={Search} />
            <Tabs.Screen name='Profile' component={Profile} />
            {/* <Tabs.Screen name='Profile' component={HomeStack} /> */}
            {/* <Tabs.Screen name='Search' component={SearchStack} /> */}
        </Tabs.Navigator>
    );
}