import React from 'react'
import { View, Text, Dimensions, TextInput, Picker, StyleSheet, TouchableOpacity } from 'react-native';
import { Size } from '../services/Service';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import colors from '../assets/Colors';
import { RFValue } from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


interface CustomButtonProps {
    login: () => any
}

export const CustomButton: React.FC<CustomButtonProps> = (props) => {
    return (
        <TouchableOpacity style={
            {
                marginTop: 36,
                alignItems: 'center',
                justifyContent: 'center',
                width: wp(100) - Size(95),
                height: hp(8),
                borderRadius: Size(32),
                backgroundColor: colors.lightBlue
            }
        } >
            <Text onPress={() => { props.login() }} style={
                {
                    fontFamily: "AvenirNextBold",
                    fontSize: RFValue(Size(56)),
                    color: "rgba(0, 0, 0, 255)"
                }
            } > Iniciar sesión </Text>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({

});