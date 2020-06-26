import React from 'react'
import { View, Text, Dimensions, TextInput, Picker, StyleSheet, TouchableOpacity } from 'react-native';
import { Size } from '../services/Service';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import colors from '../assets/Colors';
import fonts from '../assets/Fonts';

interface CustomButtonLisProps {
    onPress: () => any
}

export const CustomButtonList: React.FC<CustomButtonLisProps> = (props) => {
    return (
        <TouchableOpacity style={
            {
                alignItems: 'center',
                justifyContent: 'center',
                width: Size(324),
                height: Size(117),
                borderRadius: Size(32),
                backgroundColor: colors.lightBlue
            }
        } >
            <Text onPress={() => { props.onPress() }} style={
                {
                    fontFamily: fonts.primaryFontTitle,
                    fontSize: Size(51),
                    color: colors.mediumGray
                }
            } > Seleccionar </Text>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({

});