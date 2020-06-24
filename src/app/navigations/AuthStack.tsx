import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { AuthParamList } from '../types/AuthParamLIst';
import { Login } from '../scenes/Login/Login';
import { Register } from '../scenes/Register/Register';
interface AuthStackProps {

}

const Stack = createStackNavigator<AuthParamList>()

export const AuthStack: React.FC<AuthStackProps> = ({ }) => {
    return (
        <Stack.Navigator initialRouteName="Login">
            <Stack.Screen options={{ headerTitle: "" }} name="Login" component={Login} />
            <Stack.Screen options={{ headerTitle: "Register" }} name="Register" component={Register} />
        </Stack.Navigator>
    );
}