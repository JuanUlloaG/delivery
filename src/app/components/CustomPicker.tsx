import React from 'react'
import { View, Text, Dimensions, TextInput, Picker, StyleSheet } from 'react-native';
import { Size } from '../services/Service';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import colors from '../assets/Colors';

interface CustomPickerProps {
    options: [],
    onValueChange: (itemValue: string, itemIndex: number) => any,
}

export const CustomPicker: React.FC<CustomPickerProps> = (props) => {
    return (
        <View style={styles.pickerContainer}>
            <MaterialCommunityIcons name={"map-marker"} size={24} color={colors.lightgray} />
            <Picker
                mode='dropdown'
                itemStyle={{ color: 'red' }}
                selectedValue={""}
                style={styles.pickerStyle}

                onValueChange={(itemValue, itemIndex) => { props.onValueChange(itemValue, itemIndex) }}
            >
                <Picker.Item label="Seleccione" value="" />
                <Picker.Item label="Java" value="java" />
                <Picker.Item label="JavaScript" value="js" />
            </Picker>
        </View>
    );
}


const styles = StyleSheet.create({
    pickerContainer: {
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
    pickerStyle: {
        height: Size(117),
        width: Dimensions.get('screen').width * 0.95
    }
});