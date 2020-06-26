import React, { Component } from 'react'
import { View, Text, Button } from 'react-native';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

interface Props {
    navigation: any,
    auth: object,
    route: any
}

interface State {

}

class Detail extends React.Component<Props, State> {
    render() {
        this.props.navigation.setOptions({
            headerTitle: "Orden Nº " + this.props.route.params.name
        });
        
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Detail Screen</Text>

                <Button title="Press me" onPress={() => {
                    this.props.navigation.navigate("Edit")
                }} />
            </View>
        );
    }
}

const mapStateToProps = (state: any) => ({
    auth: state.auth
})

// const mapDispatchToProps = {

// }

export default connect(mapStateToProps)(Detail)
