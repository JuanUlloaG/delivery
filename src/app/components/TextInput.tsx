import React from 'react'
import { View, Text, Dimensions } from 'react-native';
import { Size } from '../services/Service';

interface TextInputProps {
    value: string,
    onChangeText: (text: string) => any
}

export const TextInput: React.FC<TextInputProps> = ( props ) => {
    return (
        <View style={
            {
                alignItems: 'flex-start',
                paddingStart: Size(95),
                width: Dimensions.get('screen').width - Size(95),
                height: Size(117),
                borderRadius: Size(27),
                borderWidth: Size(1),
                borderColor: "rgba(117, 117, 117, 255)",
                justifyContent: 'center',
                alignContent: 'center',
                marginTop: Size(66)
            }
        } >
            <TextInput
                style={{ width: Dimensions.get('screen').width - Size(95), height: Size(117), justifyContent: 'center', alignItems: 'center' }}
                onChangeText={(text: string) => props.onChangeText(text)}
                value={props.value}
                placeholder="Ingresa Rut" />
        </View>
    );
}