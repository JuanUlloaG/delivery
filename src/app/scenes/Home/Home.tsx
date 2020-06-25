import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


import { HomeNavProps } from 'src/types/HomeParamaList'
import { Center } from '../../components/Center'
import { FlatList, Button, Platform, View, Text } from 'react-native'
import faker from "faker";
import { getHomeItems } from '../../actions/HomeListAction'
import Loading from '../Loading/Loading'
import { Size } from '../../services/Service'
import colors from '../../assets/Assets'


colors

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

    render() {
        return (
            <Center>
                <View style={{ flex: 1, justifyContent: 'center' }}>
                    <Text style={{ fontSize: Size(56), fontFamily: 'BogleWeb-Bold' }}>Selecciona tu pedido</Text>
                </View>
                <View style={{ flex: 8 }}>
                    {
                        !this.props.home.isFetching &&
                        <FlatList
                            contentContainerStyle={{ flex: 0 }}
                            style={{ width: "100%" }}
                            data={this.getData()}
                            extraData={this.props}
                            renderItem={({ item }) => {
                                return (
                                    <View key={item.id}>
                                        <Text>{item.name}</Text>
                                    </View>
                                )
                            }}
                            keyExtractor={(item, index) => item + index}
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