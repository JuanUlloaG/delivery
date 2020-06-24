import React, { useState, useEffect, useContext } from 'react';
import { NavigationContainer } from "@react-navigation/native";
import { ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Center } from '../components/Center';
import { AuthContext } from "../providers/AuthProvider";
import { AppTab } from './AppTab';
import { AuthStack } from './AuthStack';

interface RoutesProps {

}


export const Routes: React.FC<RoutesProps> = ({ }) => {
    const { user, login, getToken } = useContext(AuthContext)
    const [loading, setloading] = useState(true);
    useEffect(() => {
        AsyncStorage.getItem('user').then(userString => {
            if (getToken()) {
                // work with them
                login()
            }
            setloading(false)

        }).catch(error => {
            console.log(error);
            setloading(false)
        })
    }, [])
    if (loading) {
        return (
            <Center>
                <ActivityIndicator size='large' />
            </Center>
        )
    }

    return (
        <NavigationContainer>
            {getToken() ? <AppTab /> : <AuthStack />}
        </NavigationContainer>
    );
}