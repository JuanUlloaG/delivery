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
    value: string,
    error: boolean
}

class Shop extends React.Component<ShopProps, State> {

    constructor(props: ShopProps) {
        super(props)
        this.state = {
            value: "",
            error: false,
        }
    }

    componentDidMount() {
        this.props.fetchData()
    }

    setShop() {
        if (this.state.value) {
            this.props.setShop(this.state.value)
            this.props.navigation.navigate("AppTab")
        } else {
            this.setState({ error: true })
        }
    }

    onChangeValue(value: string) {
        this.setState({ value, error: false })
    }


    render() {
        const data = this.props.shop.data
        return (
            <Center>
                <ScrollView contentContainerStyle={styles.scrollView} >
                    <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={styles.title}>Ahora selecciona el local</Text>
                        <CustomPicker value={this.state.value} options={data} onValueChange={this.onChangeValue.bind(this)} />
                        <View style={{ width: wp(100), marginTop: 30, justifyContent: 'center', alignItems: 'center' }}>
                            <CustomButton onPress={this.setShop.bind(this)} size={"l"}>
                                <Text style={{
                                    fontFamily: "AvenirNextBold",
                                    fontSize: RFValue(Size(56)),
                                    color: "rgba(0, 0, 0, 255)"
                                }}>Iniciar Sesión</Text>
                            </CustomButton>
                        </View>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        {
                            this.state.error &&
                            <View style={{ width: wp(95), backgroundColor: colors.mediumRed, justifyContent: 'center', alignItems: 'center', borderRadius: 4 }}>
                                <Text style={{
                                    fontFamily: fonts.primaryFont,
                                    fontSize: RFValue(21)
                                }}>Debes seleccionar un local</Text>
                            </View>
                        }
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