import React, { useContext, useState } from 'react'
import { AuthNavProps } from '../../types/AuthParamLIst'
import { AuthContext } from '../../providers/AuthProvider'
import { Center } from '../../components/Center'
import { Text, Button, StyleSheet, View, Dimensions, TouchableOpacity } from 'react-native'
import colors from '../../assets/Colors';
import { Size } from '../../services/Service';
import { CustomInput } from "../../components/TextInput";
import { CustomPicker } from "../../components/CustomPicker";
import { CustomButton } from '../../components/CustomButton';
import fonts from '../../assets/Fonts'
import { RFValue } from "react-native-responsive-fontsize";

interface LoginProps {

}

export function Login({ navigation, route }: AuthNavProps<'Login'>) {
    const { login } = useContext(AuthContext)
    const [rut, setrut] = useState("");
    const [password, setPassword] = useState("");
    const [local, setlocal] = useState("");

    const onChangeRut = (text: string) => {
        setrut(text)
    }
    const onChangePassword = (text: string) => {
        setPassword(text)
    }
    const onChangePicker = (itemValue: string, itemIndex: number) => {

    }

    const loginAction = () => {
        login()
    }
    return (
        <Center>
            <Text style={styles.title}>Te damos la bienvenida</Text>
            <CustomInput value={rut} onChangeText={onChangeRut} placeholder="Ingresa Rut" type={false} />
            <CustomInput value={password} onChangeText={onChangePassword} placeholder="Ingresa tu contraseña" type={true} />
            <CustomPicker options={[]} onValueChange={onChangePicker} />
            <CustomButton login={loginAction} />
            <TouchableOpacity style={{ marginTop: 11 }}>
                <Text style={styles.passwordForget}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
        </Center>
    )
}


const styles = StyleSheet.create({
    title: {
        fontFamily: fonts.primaryFontTitle,
        fontSize: RFValue(25),
        color: colors.black
    },
    passwordForget: {
        fontFamily: 'AvenirNextRegular',
        fontSize: RFValue(22)
    }
});


{/* <Button title="log me in" onPress={() => {
                login()
            }} /> */}
