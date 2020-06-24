import React, { Component } from 'react'
import { View, Text, Button } from 'react-native';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

interface Props {
    navigation: any,
    auth: object
}

interface State {

}

class Detail extends React.Component<Props, State> {
    render() {
        console.log(this.props.auth);
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
