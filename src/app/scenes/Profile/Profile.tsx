
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Icon from "react-native-vector-icons/Feather";
import { HomeNavProps } from '../../types/HomeParamaList'
import { Center } from '../../components/Center'
import { FlatList, View, Text, StyleSheet, Switch } from 'react-native'
import { logOutUser } from '../../actions/AuthActions'
import Loading from '../Loading/Loading'
import { Size } from '../../services/Service'
import colors from '../../assets/Colors'
import fonts from '../../assets/Fonts'
import CountDown from '../../components/CountDown';
import { CustomButtonList } from "../../components/CustomButtonList";
import { RFValue } from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { NavigationProp } from "@react-navigation/native";
import { CustomButton } from '../../components/CustomButton';
import { TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';




interface ProfileProps {
    navigation: NavigationProp<any, any>,
    auth: object,
    home: { isFetching: boolean, data: [any] },
    fetchData: () => {}
    logOut: () => {}
}

interface State {
    isEnabled: boolean
}

class Profile extends React.Component<ProfileProps, State> {

    constructor(props: ProfileProps) {
        super(props)
        this.state = {
            isEnabled: false
        }
    }

    componentDidMount() {
        console.log(this.props.auth);

    }

    componentWillUnmount() {

    }

    getData = () => {
        let data = this.props.home.data ? this.props.home.data : []
        return data
    }

    logOut = () => {
        this.props.logOut()
    };


    toggleSwitch = () => {
        this.setState({ isEnabled: !this.state.isEnabled })
        // this.props.logOut()
    };


    render() {
        const isfetch = this.props.home.isFetching
        return (
            <Center>
                <View style={styles.containerInfo}>
                    <View style={styles.containerInfoNames}>
                        <Text style={styles.containerInfoText}>Nombre</Text>
                        <Text style={styles.containerInfoText}>Rol</Text>
                    </View>
                    <View style={styles.containerInfoEstado}>
                        <Text style={styles.containerInfoText}>Estado: </Text>
                        <Text style={styles.containerInfoTextRol}>Activo</Text>
                        <Text style={[styles.containerIcon, { backgroundColor: '#5CAA6E' }]}></Text>
                    </View>
                </View>
                <View style={styles.containerConfig}>
                    <View style={styles.containerConfigHeader}>
                        <View style={styles.containerConfigHeaderView}>
                            <Text style={styles.containerInfoText}>Configuraciones</Text>
                        </View>
                    </View>
                    <View style={styles.containerConfigItemContent}>
                        <View style={styles.containerConfigItemContentAction}>
                            <Text style={styles.containeractionIntemText}>Cambiar Estado</Text>
                            <Text style={styles.containeractionIntemTextSub}>De Activo a Inactivo</Text>
                        </View>
                        <View style={styles.containerConfigItemContentButton}>
                            <Switch
                                trackColor={{ false: "#767577", true: "#9CDAAB" }}
                                thumbColor={this.state.isEnabled ? "#5CAA6E" : "#f4f3f4"}
                                ios_backgroundColor="#3e3e3e"
                                onValueChange={() => this.toggleSwitch()}
                                value={this.state.isEnabled}
                            />
                        </View>
                    </View>
                </View>
                <View style={styles.containerSesion}>
                    <View style={styles.containerSesionItem}>
                        <View style={styles.containerSesionItemAction}>
                            <Text style={styles.containeractionIntemText}>Cerrar Sesion</Text>
                        </View>
                        <View style={styles.containerSesionItemButton}>
                            <TouchableOpacity onPress={() => { this.logOut() }}>
                                <Icon name="log-out" color={colors.black2} size={Size(90)} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </Center >
        );
    }

}

const styles = StyleSheet.create({
    containerInfo: {
        flex: 1,
        width: wp(100),
        justifyContent: 'center',
        borderBottomColor: '#E0E0E0',
        borderBottomWidth: 1
    },
    containerInfoNames: {
        flex: 1,
        justifyContent: "flex-end",
        marginLeft: Size(111)
    },
    containerInfoText: {
        fontFamily: fonts.primaryFontTitle,
        fontSize: RFValue(20)
    },
    containeractionIntemText: {
        fontFamily: fonts.primaryFontTitle,
        fontSize: RFValue(17)
    },
    containeractionIntemTextSub: {
        fontFamily: fonts.primaryFont,
        fontSize: RFValue(14)
    },
    containerInfoTextRol: {
        fontFamily: fonts.primaryFont,
        fontSize: RFValue(20)
    },
    containerInfoEstado: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginLeft: Size(111)
    },
    containerConfig: {
        flex: 1,
        width: wp(100),
        borderBottomColor: '#E0E0E0',
        borderBottomWidth: 1
    },
    containerConfigHeader: {
        flex: 1,
        justifyContent: 'center'
    },
    containerConfigHeaderView: {
        flex: 1,
        marginLeft: Size(40),
        justifyContent: 'center'
    },
    containerConfigItemContent: {
        flex: 3,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    containerConfigItemContentAction: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: Size(111)
    },
    containerConfigItemContentButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginRight: Size(111)
    },
    containerSesion: {
        flex: 2,
        width: wp(100)
    },
    containerSesionItem: {
        flex: 1,
        flexDirection: 'row',
        marginTop: Size(45)
    },
    containerSesionItemAction: {
        flex: 1,
        marginLeft: Size(111)
    },
    containerSesionItemButton: {
        flex: 1,
        alignItems: 'flex-end',
        marginRight: Size(111)
    },
    containerIcon: {
        width: 10,
        height: 10,
        borderRadius: 10 / 2,
        marginTop: 5,
        marginLeft: 10,
        shadowColor: "#676767",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 2.65,
        elevation: 3,
    }
})

const mapStateToProps = (state: any) => ({
    auth: state.auth,
    home: state.home
})

const mapDispatchToProps = (dispatch: any) => ({

    // fetchData: () => dispatch(getHomeItems()),
    logOut: () => dispatch(logOutUser()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Profile)

