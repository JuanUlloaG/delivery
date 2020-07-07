import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { AuthParamList } from '../types/AuthParamLIst';
import { Login } from '../scenes/Login/Login';
import Shop from '../scenes/Login/Shop';
import { Register } from '../scenes/Register/Register';
import { AuthContext } from '../providers/AuthProvider';

interface AuthStackProps {

}

const Stack = createStackNavigator<AuthParamList>()

export const AuthStack: React.FC<AuthStackProps> = ({ }) => {
    const { logout, getProfile, getShop, getToken } = useContext(AuthContext)

    const getComponent = () => {
        if (getShop() == "" && getToken()) return Shop
        return Login
    }
    const getTitle = () => {
        if (getShop() == "" && getToken()) return 'Login'
        return 'Login'
    }
    const getName = () => {
        if (getShop() == "" && getToken()) return 'Shop'
        return 'Login'
    }
    const component = getComponent()
    const title = getTitle()
    const name = getName()

    return (
        <Stack.Navigator initialRouteName={name}>
            <Stack.Screen options={{ headerTitle: "" }} name={title} component={component} />
            <Stack.Screen options={{ headerTitle: "Register" }} name="Register" component={Register} />
        </Stack.Navigator>
    );
}