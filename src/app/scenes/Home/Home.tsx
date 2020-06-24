import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


import { HomeNavProps } from 'src/types/HomeParamaList'
import { Center } from '../../components/Center'
import { FlatList, Button, Platform } from 'react-native'
import faker from "faker";
import { getHomeItems } from '../../actions/HomeListAction'
import Loading from '../Loading/Loading'



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
                {
                    !this.props.home.isFetching &&
                    <FlatList
                        contentContainerStyle={{}}
                        style={{ width: "100%" }}
                        data={this.getData()}
                        extraData={this.props}
                        renderItem={({ item }) => {
                            return (
                                <Button title={item.name} onPress={() => {
                                    this.props.navigation.navigate('Detail', { name: item.name })
                                }
                                } />
                            )
                        }}
                        keyExtractor={(item, index) => item + index}
                    />
                }
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
