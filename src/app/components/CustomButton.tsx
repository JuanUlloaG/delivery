import React from 'react'
import { Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Size } from '../services/Service';
import colors from '../assets/Colors';
import { RFValue } from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


interface CustomButtonProps {
    login: () => any
}

export const CustomButton: React.FC<CustomButtonProps> = (props) => {
    return (
        <TouchableOpacity style={styles.buttonContainer}>
            <Text onPress={() => { props.login() }} style={styles.buttonText}> Iniciar sesión </Text>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 36,
        alignItems: 'center',
        justifyContent: 'center',
        width: wp(100) - Size(95),
        height: hp(8),
        borderRadius: Size(32),
        backgroundColor: colors.lightBlue
    },
    buttonText: {
        fontFamily: "AvenirNextBold",
        fontSize: RFValue(Size(56)),
        color: "rgba(0, 0, 0, 255)"
    }
});