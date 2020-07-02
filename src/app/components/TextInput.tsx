import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native';
import { Size } from '../services/Service';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import colors from '../assets/Colors';
import { RFValue } from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


interface CustomInputProps {
    value: string,
    onChangeText: (text: string) => any,
    placeholder: string,
    type: boolean,
    editable: boolean,
    onBlur: () => void
}

export const CustomInput: React.FC<CustomInputProps> = (props) => {
    return (
        <View style={styles.intputContainer} >
            <MaterialCommunityIcons name={props.type ? "lock" : "rectangle"} size={24} color={colors.lightgray} />
            <TextInput
                style={styles.InputTextStyle}
                onChangeText={(text: string) => props.onChangeText(text)}
                value={props.value}
                placeholder={props.placeholder}
                editable={props.editable}
                onBlur={() => props.onBlur()}
                secureTextEntry={props.type} />
        </View>
    );
}


const styles = StyleSheet.create({
    intputContainer: {
        alignItems: 'center',
        paddingStart: Size(95),
        width: wp(100) - Size(95),
        height: Size(117),
        borderRadius: Size(27),
        borderWidth: Size(1),
        borderColor: "rgba(117, 117, 117, 255)",
        justifyContent: 'center',
        alignContent: 'center',
        marginTop: Size(66),
        flexDirection: 'row'
    },
    InputTextStyle: {
        width: wp(100) - Size(95),
        // height: Size(117),
        justifyContent: 'center',
        alignItems: 'center'
    }
});