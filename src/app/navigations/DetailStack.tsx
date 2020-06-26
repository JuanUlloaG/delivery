import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import Antdesing from "react-native-vector-icons/AntDesign";
import { DetailParamList } from 'src/types/DetailParamList';
import { Button, View, Text, Platform } from 'react-native';
import Detail from '../scenes/Detail/Detail';
import { Edit } from '../scenes/Edit/Edit';
import { TouchableOpacity } from 'react-native-gesture-handler';
import colors from '../assets/Colors';
import fonts from '../assets/Fonts';
import { Size } from '../services/Service';

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
                headerStyle: {
                    backgroundColor: colors.darkBlue,
                },
                headerTitleStyle: {
                    textAlign: 'center',
                    flexGrow: 1,
                    marginRight: 50,
                    alignSelf: 'center',
                    color: colors.white,
                    fontFamily: fonts.primaryFontTitle,
                    fontSize: Size(77),
                },
                headerStatusBarHeight: Size(35),
                // headerTitle: route.name,
                // headerRight: () => (

                // ),
                headerLeft: () => (
                    // platform == "ios" &&
                    <TouchableOpacity onPress={() => navigation.navigation.goBack()}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <Antdesing name='left' size={24} color={colors.white} />
                            <Text style={{ color: colors.white }}>Volver</Text>
                        </View>
                    </TouchableOpacity>
                )
            })
            } />
            <Stack.Screen name="Edit" component={Edit} />
        </Stack.Navigator>
    );
}