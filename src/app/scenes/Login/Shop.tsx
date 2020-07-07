import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ShopNavProps } from '../../types/ShopParamList'
import { Center } from '../../components/Center'
import { FlatList, View, Text, StyleSheet, ScrollView, TouchableWithoutFeedback, TouchableOpacity, Keyboard } from 'react-native'
import { getShopItems } from '../../actions/ShopAction'
import { updateShop } from '../../actions/AuthActions'
import Loading from '../Loading/Loading'
import store from '../../store/Store';
import { Size } from '../../services/Service'
import colors from '../../assets/Colors'
import fonts from '../../assets/Fonts'
import { RFValue } from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CustomButton } from '../../components/CustomButton';
import { CustomPicker } from '../../components/CustomPicker';

interface ShopProps {
    navigation: any,
    auth: object,
    home: { isFetching: boolean, data: [any] },
    shop: { isFetching: boolean, data: [{ _id: string, address: string, number: string }] },
    fetchData: () => {}
    setShop: (shop: string) => {}
}

interface State {
    value: string
}

class Shop extends React.Component<ShopProps, State> {

    constructor(props: ShopProps) {
        super(props)
        this.state = {
            value: "",
        }
    }

    componentDidMount() {
        this.props.fetchData()
    }

    setShop() {
        this.props.setShop(this.state.value)
    }

    onChangeValue(value: string) {
        this.setState({ value })
    }


    render() {
        const data = this.props.shop.data
        return (
            <Center>
                <ScrollView contentContainerStyle={styles.scrollView} >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.title}>Ahora selecciona el local</Text>
                        <CustomPicker value={this.state.value} options={data} onValueChange={this.onChangeValue.bind(this)} />
                        <CustomButton onPress={this.setShop.bind(this)} size={"l"}>
                            <Text style={{
                                fontFamily: "AvenirNextBold",
                                fontSize: RFValue(Size(56)),
                                color: "rgba(0, 0, 0, 255)"
                            }}>Iniciar Sesión</Text>
                        </CustomButton>
                    </View>

                </ScrollView>
            </Center>
        );
    }
}









const styles = StyleSheet.create({
    title: {
        fontFamily: fonts.primaryFontTitle,
        fontSize: RFValue(25),
        color: colors.black
    },
    passwordForget: {
        fontFamily: 'AvenirNextRegular',
        fontSize: RFValue(22)
    },
    scrollView: {
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});



const mapStateToProps = (state: any) => ({
    auth: state.auth,
    home: state.home,
    shop: state.shop
})

const mapDispatchToProps = (dispatch: any) => ({
    fetchData: () => dispatch(getShopItems()),
    setShop: (shop: string) => dispatch(updateShop(shop))
})

export default connect(mapStateToProps, mapDispatchToProps)(Shop)