import React from 'react'
import { View, Text, Dimensions, TextInput, StyleSheet } from 'react-native';
import { Size } from '../services/Service';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import colors from '../assets/Colors';


interface CustomInputProps {
    value: string,
    onChangeText: (text: string) => any,
    placeholder: string,
    type: boolean
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
                secureTextEntry={props.type} />
        </View>
    );
}


const styles = StyleSheet.create({
    intputContainer: {
        alignItems: 'center',
        paddingStart: Size(95),
        width: Dimensions.get('screen').width - Size(95),
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
        width: Dimensions.get('screen').width - Size(95),
        height: Size(117),
        justifyContent: 'center',
        alignItems: 'center'
    }
});