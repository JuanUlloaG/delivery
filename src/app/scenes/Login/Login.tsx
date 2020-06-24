import React, { useContext, useState } from 'react'
import { AuthNavProps } from '../../types/AuthParamLIst'
import { AuthContext } from '../../providers/AuthProvider'
import { Center } from '../../components/Center'
import { Text, Button, StyleSheet, View, Dimensions } from 'react-native'
import colors from '../../assets/Colors'
import { Size } from '../../services/Service'
import { TextInput } from "../../components/TextInput";


interface LoginProps {

}

export function Login({ navigation, route }: AuthNavProps<'Login'>) {
    const { login } = useContext(AuthContext)
    const [value, setvalue] = useState("");

    const onChangeText = (text: string) => {

    }
    return (
        <Center>
            <Text style={styles.title}>Te damos la bienvenida: {route.name}</Text>
            {/* <View style={
                {
                    alignItems: 'flex-start',
                    paddingStart: Size(95),
                    width: Dimensions.get('screen').width - Size(95),
                    height: Size(117),
                    borderRadius: Size(27),
                    borderWidth: Size(1),
                    borderColor: "rgba(117, 117, 117, 255)",
                    justifyContent: 'center',
                    alignContent: 'center',
                    marginTop: Size(66)
                }
            } >
                <TextInput
                    style={{ width: Dimensions.get('screen').width - Size(95), height: Size(117), justifyContent: 'center', alignItems: 'center' }}
                    //  onChangeText={text => onChangeText(text)}
                    value={""}
                    placeholder="Ingresa Rut" />
            </View> */}
            <TextInput value={value} onChangeText={onChangeText} />

        </Center>
    )
}


const styles = StyleSheet.create({
                title: {
                fontFamily: 'BogleWeb-Bold',
        fontSize: 19,
        color: colors.black
    }
});


            {/* <Button title="log me in" onPress={() => {
                login()
            }} /> */}
