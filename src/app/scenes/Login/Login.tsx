import React, { useContext, useState } from 'react'
import { AuthNavProps } from '../../types/AuthParamLIst'
import { AuthContext } from '../../providers/AuthProvider'
import { Center } from '../../components/Center'
import { Text, Button, StyleSheet, View, Dimensions, TouchableOpacity, Alert, Keyboard } from 'react-native'
import colors from '../../assets/Colors';
import { Size } from '../../services/Service';
import { CustomInput } from "../../components/TextInput";
import { CustomPicker } from "../../components/CustomPicker";
import { CustomButton } from '../../components/CustomButton';
import fonts from '../../assets/Fonts'
import store from '../../store/Store';
import { RFValue } from "react-native-responsive-fontsize";
import { TouchableWithoutFeedback, ScrollView } from 'react-native-gesture-handler'


interface LoginProps {

}

export function Login({ navigation, route }: AuthNavProps<'Login'>) {
    const { login } = useContext(AuthContext)
    const [rut, setrut] = useState("");
    const [password, setPassword] = useState("");
    const [local, setlocal] = useState("");

    const onChangeRut = (text: string) => {
        //aqui añadir reglas de negocio en cuanto a la validacion del rut
        setrut(text)
    }
    const onChangePassword = (text: string) => {
        setPassword(text)
    }
    const onChangePicker = (itemValue: string, itemIndex: number) => {

    }

    const focusLose = () => {
        if (rut.indexOf("-") < 0) {
            let formatRut = [rut.slice(0, rut.length - 1), "-", rut.slice(rut.length - 1)].join('');
            setrut(formatRut)
        }
    }

    const loginAction = () => {
        if (rut && password) login(rut, password)
        else { Alert.alert("Información", "Debes completar todos los datos para iniciar sesión") }
    }
    return (
        <Center>
            <ScrollView contentContainerStyle={styles.scrollView} >
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.title}>Te damos la bienvenida</Text>
                    <CustomInput value={rut} onBlur={focusLose} onChangeText={onChangeRut} placeholder="Ingresa Rut" type={false} editable={true} />
                    <CustomInput value={password} onBlur={() => { }} onChangeText={onChangePassword} placeholder="Ingresa tu contraseña" type={true} editable={true} />
                    <CustomPicker options={[]} onValueChange={onChangePicker} />
                    <CustomButton login={loginAction} />
                    <TouchableOpacity style={{ marginTop: 11 }}>
                        <Text style={styles.passwordForget}>¿Olvidaste tu contraseña?</Text>
                    </TouchableOpacity>
                </TouchableWithoutFeedback>

            </ScrollView>
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
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

