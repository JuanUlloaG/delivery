import React, { useContext } from 'react';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AppParamList } from '../types/AppParamList';
import Ionicons from "react-native-vector-icons/Ionicons";
import Antdesing from "react-native-vector-icons/AntDesign";
import { HomeStack } from './HomeStack';
import colors from '../assets/Colors';

interface AppTabProps {

}

const Tabs = createBottomTabNavigator<AppParamList>()

export const AppTab: React.FC<AppTabProps> = ({ }) => {
    return (
        <Tabs.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused
                            ? 'home'
                            : 'home';
                        return <Antdesing name={iconName} size={size} color={color} />;
                    } else if (route.name === 'Search') {
                        iconName = focused ? 'ios-search' : 'ios-search';
                        return <Ionicons name={iconName} size={size} color={color} />;
                    }
                    // You can return any component that you like here!
                },
            })}
            tabBarOptions={{
                activeTintColor: colors.darkYellow,
                inactiveTintColor: 'gray',
            }}
        >
            <Tabs.Screen name='Home' component={HomeStack} />
            <Tabs.Screen name='Search' component={HomeStack} />
            <Tabs.Screen name='Likes' component={HomeStack} />
            {/* <Tabs.Screen name='Profile' component={HomeStack} /> */}
            {/* <Tabs.Screen name='Search' component={SearchStack} /> */}
        </Tabs.Navigator>
    );
}