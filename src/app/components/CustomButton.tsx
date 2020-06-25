import React from 'react'
import { View, Text, Dimensions, TextInput, Picker, StyleSheet, TouchableOpacity } from 'react-native';
import { Size } from '../services/Service';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import colors from '../assets/Colors';

interface CustomButtonProps {
    login: () => any
}

export const CustomButton: React.FC<CustomButtonProps> = (props) => {
    console.log(props);
    return (
        <TouchableOpacity style={
            {
                marginTop: 36,
                alignItems: 'center',
                justifyContent: 'center',
                width: Dimensions.get('screen').width - Size(95),
                height: Size(142),
                borderRadius: Size(32),
                backgroundColor: colors.lightBlue
            }
        } >
            <Text onPress={() => { props.login() }} style={
                {
                    fontFamily: "AvenirNextBold",
                    fontSize: Size(56),
                    color: "rgba(0, 0, 0, 255)"
                }
            } > Iniciar sesión </Text>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({

});