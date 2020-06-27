import React from 'react'
import { View, Text, Dimensions, TextInput, Picker, StyleSheet, TouchableOpacity } from 'react-native';
import { Size } from '../services/Service';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue } from "react-native-responsive-fontsize";
import colors from '../assets/Colors';
import fonts from '../assets/Fonts';

type size = "M" | "L" | "S"

interface CustomButtonLisProps {
    onPress: () => any,
    title: string,
    disable: boolean,
    size?: size
}

export const CustomButtonList: React.FC<CustomButtonLisProps> = (props) => {
    let width = 30
    width = props.size && props.size == "M" ? 30 : props.size == "L" ? 38 : 24
    let fontsize = Size(51)
    fontsize = props.size && props.size == "M" ? Size(51) : props.size == "L" ? Size(60) : Size(39)
    return (
        <TouchableOpacity style={
            {
                alignItems: 'center',
                justifyContent: 'center',
                width: wp(width),
                height: hp(6),
                borderRadius: Size(32),
                backgroundColor: !props.disable ? colors.lightBlue : colors.lightgrayDisabled
            }
        } >
            <Text onPress={() => { !props.disable && props.onPress() }} style={
                {
                    fontFamily: fonts.primaryFontTitle,
                    fontSize: RFValue(fontsize),
                    color: colors.mediumGray
                }
            } > {props.title} </Text>
        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({

});