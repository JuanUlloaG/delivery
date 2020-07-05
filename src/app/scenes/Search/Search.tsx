import React, { useContext } from 'react'
import { Center } from '../../components/Center';
import { Text } from "react-native";
import { AuthContext } from '../../providers/AuthProvider';
import { CustomButtonList } from '../../components/CustomButtonList';

interface SearchProps {

}

export const Search: React.FC<SearchProps> = ({ }) => {
    const { login, logout } = useContext(AuthContext)
    return (
        <Center>
            <Text>Pantalla de busqueda </Text>
            {/* <CustomButtonList onPress={() => { logout() }} title="Cerra Sesión" disable={false} size={"XL"} /> */}
        </Center>
    );
}