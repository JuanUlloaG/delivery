import React from 'react'
import { View, TextInput, StyleSheet } from 'react-native';
import { Size } from '../services/Service';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import colors from '../assets/Colors';
import { RFValue } from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

type keyType = "phone-pad" | "default" | "numeric"

interface CustomInputProps {
    onChangeText: (text: string) => any,
    onBlur?: () => void
    value: string,
    placeholder: string,
    type?: boolean,
    editable: boolean,
    icon?: boolean,
    keyType?: keyType
}

const defaultProps: CustomInputProps = {
    onChangeText: (text: string) => { },
    onBlur: () => { },
    value: "",
    placeholder: "",
    type: false,
    editable: true,
    icon: false,
    keyType: 'default'
}

export const CustomInput: React.FC<CustomInputProps> = (props) => {
    const propss = Object.assign({}, defaultProps, props);
    return (
        <View style={styles.intputContainer} >
            {
                propss.icon &&
                <MaterialCommunityIcons name={propss.type ? "lock" : "rectangle"} size={24} color={colors.lightgray} />
            }

            <TextInput
                style={styles.InputTextStyle}
                keyboardType={propss.keyType}
                onChangeText={(text: string) => propss.onChangeText(text)}
                value={propss.value}
                placeholder={propss.placeholder}
                editable={propss.editable}
                onBlur={() => propss.onBlur()}
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