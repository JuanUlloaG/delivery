import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Icon from "react-native-vector-icons/MaterialIcons";

import { HomeNavProps } from '../../types/HomeParamaList'
import { Center } from '../../components/Center'
import { FlatList, Button, Platform, View, Text, Dimensions } from 'react-native'
import { getHomeItems } from '../../actions/HomeListAction'
import Loading from '../Loading/Loading'
import { Size } from '../../services/Service'
import colors from '../../assets/Colors'
import fonts from '../../assets/Fonts'
import CountDown from '../../components/CountDown';
import { CustomButtonList } from "../../components/CustomButtonList";

interface HomeProps {
    navigation: any,
    auth: object,
    home: { isFetching: boolean, data: [any] },
    fetchData: () => {}
}

interface State {

}

class Home extends React.Component<HomeProps, State> {

    componentDidMount() {
        this.props.fetchData()
    }

    getData = () => {
        let data = this.props.home.data ? this.props.home.data : []
        return data
    }

    navigate(name: string) {
        this.props.navigation.navigate('Detail', {
            screen: 'Detail',
            params: { name: name },
        });
    }

    render() {
        return (
            <Center>
                <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: colors.ultraLightgray }}>
                    <View style={{ flex: 8, justifyContent: 'center', alignItems: 'center', marginLeft: 50 }}>
                        <Text style={{ fontSize: Size(56), fontFamily: fonts.primaryFont }}>Selecciona tu Nº de pedido</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', height: Size(76) }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: colors.ultraLightBlue, width: Size(84), height: Size(66), marginTop: 18, borderRadius: 4 }}>
                            <Icon name='swap-vert' size={24} color={colors.darkBlue} />
                        </View>
                    </View>
                </View>
                <View style={{ flex: 10 }}>
                    {
                        !this.props.home.isFetching &&
                        <FlatList
                            contentContainerStyle={{ flex: 0 }}
                            style={{ width: "100%" }}
                            data={this.getData()}
                            extraData={this.props}
                            keyExtractor={(item, index) => item.id.toString()}
                            renderItem={({ item }) => {
                                return (
                                    <View key={item.id} style={{ justifyContent: 'center', flexDirection: 'row', width: Dimensions.get('screen').width, height: Size(234), borderBottomWidth: 1, borderBottomColor: colors.ultraLightgray }}>
                                        <View style={{ flex: 2, justifyContent: 'center' }}>
                                            <View style={{ marginLeft: Size(94) }}>
                                                <Text style={{ fontSize: Size(56), fontFamily: fonts.primaryFontTitle }}>{"Pedido Nº " + item.id}</Text>
                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                    <View style={{ width: 10, height: 10, borderRadius: 10 / 2, backgroundColor: colors.lightYellow, marginRight: 5 }} />
                                                    <CountDown date={item.date} />
                                                    {/* <Text style={{ fontSize: Size(40), fontFamily: fonts.primaryFont }}>{item.name}</Text> */}
                                                    {/* {console.log(item.date)} */}
                                                </View>
                                            </View>
                                        </View>
                                        <View style={{ flex: 1, justifyContent: 'center' }}>
                                            <CustomButtonList onPress={() => { this.navigate(item.id) }} />
                                        </View>
                                    </View>
                                )
                            }}
                        />
                    }
                </View>
                {
                    this.props.home.isFetching &&
                    <Loading />
                }

            </Center>
        );
    }
}

const mapStateToProps = (state: any) => ({
    auth: state.auth,
    home: state.home
})

const mapDispatchToProps = (dispatch: any) => ({

    fetchData: () => dispatch(getHomeItems())
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)


 // <Button title={item.name} onPress={() => {
                                //     this.props.navigation.navigate('Detail', { name: item.name })
                                // }
                                // } />