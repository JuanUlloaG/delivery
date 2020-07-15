import React, { useContext, useState, useEffect } from 'react'
import { AuthNavProps } from '../../types/AuthParamLIst'
import { AuthContext } from '../../providers/AuthProvider'
import { Center } from '../../components/Center'
import { Text, Button, StyleSheet, View, Dimensions, TouchableOpacity, Alert, Keyboard, ActivityIndicator } from 'react-native'
import colors from '../../assets/Colors';
import { Size } from '../../services/Service';
import { CustomInput } from "../../components/TextInput";
import { CustomPicker } from "../../components/CustomPicker";
import { CustomButton } from '../../components/CustomButton';
import fonts from '../../assets/Fonts'
import store from '../../store/Store';
import { RFValue } from "react-native-responsive-fontsize";
import { TouchableWithoutFeedback, ScrollView } from 'react-native-gesture-handler'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { RNNotificationBanner } from 'react-native-notification-banner';
import Icon from 'react-native-vector-icons/FontAwesome'
let copy = <Icon name="close" size={24} color="red" family={"FontAwesome"} />;


interface LoginProps {

}

export function Login({ navigation, route }: AuthNavProps<'Login'>) {
    const { login, clear } = useContext(AuthContext)
    const [rut, setrut] = useState("");
    const [password, setPassword] = useState("");
    const { error, message, isFetching } = store.getState().auth

    const onChangeRut = (text: string) => {
        //aqui añadir reglas de negocio en cuanto a la validacion del rut
        setrut(text)
    }

    const onChangePassword = (text: string) => {
        setPassword(text)
    }

    const clearInput = () => {
        setPassword("")
        setrut("")
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


    if (error) RNNotificationBanner.Show({
        title: "Error", subTitle: message, withIcon: true, icon: copy, tintColor: colors.highLightRed, onHide: () => {
            clear()
            clearInput()
        }
    })

    if (store.getState().auth.isFetching) {
        return (
            <Center>
                <ActivityIndicator size='large' />
            </Center>
        )
    }

    return (
        <Center>
            <ScrollView contentContainerStyle={styles.scrollView} >
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.title}>Te damos la bienvenida</Text>
                    <View style={{ marginTop: Size(66), }}>
                        <CustomInput size='l' value={rut} onBlur={focusLose} onChangeText={onChangeRut} placeholder="Ingresa Rut" type={false} editable={true} />
                    </View>
                    <View style={{ marginTop: Size(66) }}>
                        <CustomInput size='l' value={password} onBlur={() => { }} onChangeText={onChangePassword} placeholder="Ingresa tu contraseña" type={true} editable={true} />
                    </View>
                    <View style={{ width: wp(100), marginTop: 30, justifyContent: 'center', alignItems: 'center' }}>
                        <CustomButton onPress={loginAction} size={"l"}>
                            <Text style={{
                                fontFamily: "AvenirNextBold",
                                fontSize: RFValue(Size(56)),
                                color: "rgba(0, 0, 0, 255)"
                            }}>Iniciar Sesión</Text>
                        </CustomButton>
                    </View>
                    <TouchableOpacity style={{ paddingTop: 50 }}>
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
        // fontSize: RFValue(22)
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

