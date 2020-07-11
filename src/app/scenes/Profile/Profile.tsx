import React, { useContext } from 'react'
import { Center } from '../../components/Center';
import { Text } from "react-native";
import { AuthContext } from '../../providers/AuthProvider';
import { CustomButtonList } from '../../components/CustomButtonList';
import { StackActions } from '@react-navigation/native';

interface ProfileProps {

}

export const Profile: React.FC<ProfileProps> = ({ navigation }) => {
    console.log();
    const { login, logout } = useContext(AuthContext)
    const out = () => {
        logout()
        navigation.navigate("Pickear")
    }

    return (
        <Center>
            <Text>Perfil del Usuario </Text>
            <CustomButtonList onPress={() => { logout() }} title="Cerra Sesión" disable={false} size={"XL"} />
        </Center>
    );
}