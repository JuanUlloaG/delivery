import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Antdesing from "react-native-vector-icons/AntDesign";
import { DetailParamList } from 'src/types/DetailParamList';
import { Button, View, Text, Platform } from 'react-native';
import Detail from '../scenes/Detail/Detail';
import { Edit } from '../scenes/Edit/Edit';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface DetailStackProps {

}

const Stack = createStackNavigator<DetailParamList>()

export const DetailStack: React.FC<DetailStackProps> = ({ navigation, route }) => {
    const platform = Platform.OS
    const mode = platform === "ios" ? "modal" : "card"
    const scOptions = platform === "ios" ? {
        ...TransitionPresets.ModalPresentationIOS,
        gestureEnabled: true,
        cardOverlayEnabled: true,
    } : {}
    return (
        <Stack.Navigator mode={mode} screenOptions={scOptions}>
            <Stack.Screen name="Detail" component={Detail} options={(navigation) => ({
                headerTitle: route.name,
                headerRight: () => (
                    <Button
                        onPress={() => null}
                        title="Info"
                        color="red"
                    />
                ),
                headerLeft: () => (
                    platform == "ios" &&
                    <TouchableOpacity onPress={() => navigation.navigation.goBack()}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Antdesing name='left' size={24} />
                            <Text>Volver</Text>
                        </View>
                    </TouchableOpacity>
                )
            })
            } />
            <Stack.Screen name="Edit" component={Edit} />
        </Stack.Navigator>
    );
}