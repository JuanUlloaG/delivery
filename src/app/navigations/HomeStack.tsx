import React, { useContext } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Icon from "react-native-vector-icons/MaterialIcons";
import { Text, TouchableOpacity, FlatList, Button, View } from 'react-native';
import { AuthContext } from '../providers/AuthProvider';
import { HomeParamList, HomeNavProps } from '../types/HomeParamaList';
import Home from '../scenes/Home/Home';
import { DetailStack } from './DetailStack';
import { Size } from '../services/Service';
import colors from '../assets/Colors';


interface HomeStackProps {

}

const Stack = createStackNavigator<HomeParamList>()
const Stack2 = createStackNavigator<HomeParamList>()

function HomeNavigator({ navigation, route }) {
    const { logout } = useContext(AuthContext)
    return (
        <Stack2.Navigator initialRouteName="Home">
            <Stack2.Screen name="Home" component={Home} options={(navigation) => ({
                headerTitle: route.name,
                headerStyle: {
                    backgroundColor: colors.darkBlue,
                },
                headerTitleStyle: {
                    textAlign: 'center',
                    flexGrow: 1,
                    alignSelf: 'center',
                    color: 'white',
                    fontFamily: 'BogleWeb-Bold',
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
            <Stack.Screen name='Home' component={HomeNavigator} options={{ title: "poto", headerStyle: { backgroundColor: "blue", } }} />
            <Stack.Screen name="Detail" component={DetailStack} />
        </Stack.Navigator>
    );
}