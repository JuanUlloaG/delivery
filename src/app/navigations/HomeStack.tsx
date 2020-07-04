import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Icon from "react-native-vector-icons/MaterialIcons";
import { Text, TouchableOpacity, FlatList, Button, View } from 'react-native';
import { AuthContext } from '../providers/AuthProvider';
import { HomeParamList, HomeNavProps } from '../types/HomeParamaList';
import Home from '../scenes/Home/Home';
import HomeAddres from '../scenes/Home/HomeAddres';
import { DetailStack } from './DetailStack';
import { Size } from '../services/Service';
import colors from '../assets/Colors';
import fonts from '../assets/Fonts';


interface HomeStackProps {

}

const Stack = createStackNavigator<HomeParamList>()
const Stack2 = createStackNavigator<HomeParamList>()

function HomeNavigator({ navigation, route }) {
    const { logout, getProfile } = useContext(AuthContext)

    const getComponent = () => {
        console.log("aqui", getProfile());
        switch (getProfile()) {
            case 2:
                return Home
            case 3:
                return Home
            case 4:
                return HomeAddres
            default:
                return Home
        }
    }
    const getTitle = () => {
        switch (getProfile()) {
            case 2:
                return "Lista de pedidos"
            case 3:
                return "Recepcion de pedidos"
            case 4:
                return "Pedidos Pendientes de entrega"
            default:
                return "Lista de pedidos"
        }
    }
    const getName = () => {
        switch (getProfile()) {
            case 2:
                return "Home"
            case 3:
                return "HomeAddres"
            case 4:
                return "Home"
            default:
                return "Home"
        }
    }
    const component = getComponent()
    const title = getTitle()
    const name = getName()

    return (
        <Stack2.Navigator initialRouteName="HomeAddres">
            <Stack2.Screen name={name} component={component} options={(navigation) => ({
                headerTitle: title,
                headerStyle: {
                    backgroundColor: colors.darkBlue,
                },
                headerTitleStyle: {
                    textAlign: 'center',
                    flexGrow: 1,
                    alignSelf: 'center',
                    color: colors.white,
                    fontFamily: fonts.primaryFontTitle,
                    fontSize: Size(77),
                },
                headerStatusBarHeight: Size(35)
                // headerRight: () => (
                //     <TouchableOpacity onPress={() => { null }}>
                //         <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginRight: 15 }}>
                //             <Icon name='location-on' size={24} color="tomato" />
                //         </View>
                //     </TouchableOpacity>
                // ),
                // headerLeft: () => (

                //     <TouchableOpacity onPress={() => { logout() }}>
                //         <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: 15 }}>
                //             <Icon name='camera' size={24} color="tomato" />
                //         </View>
                //     </TouchableOpacity>
                // )
            })
            } />
        </Stack2.Navigator>
    )
}


export const HomeStack: React.FC<HomeStackProps> = ({ }) => {
    const { logout } = useContext(AuthContext)
    return (
        <Stack.Navigator initialRouteName='Home' headerMode='none'>
            <Stack.Screen name='Home' component={HomeNavigator} />
            <Stack.Screen name="Detail" component={DetailStack} />
        </Stack.Navigator>
    );
}