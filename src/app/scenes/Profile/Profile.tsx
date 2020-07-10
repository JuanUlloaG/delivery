import React, { useContext } from 'react'
import { Center } from '../../components/Center';
import { Text } from "react-native";
import { AuthContext } from '../../providers/AuthProvider';
import { CustomButtonList } from '../../components/CustomButtonList';

interface ProfileProps {

}

export const Profile: React.FC<ProfileProps> = ({ navigation }) => {
    console.log();
    const { login, logout } = useContext(AuthContext)
    // const logouts = () => {
    //     navigation
    // }

    return (
        <Center>
            <Text>Perfil del Usuario </Text>
            <CustomButtonList onPress={() => { logout() }} title="Cerra Sesión" disable={false} size={"XL"} />
        </Center>
    );
}