import React, { Component } from 'react'
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Animated, Dimensions, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux'
import { Center } from '../../components/Center';
import colors from '../../assets/Colors';
import { Size } from '../../services/Service';
import fonts from '../../assets/Fonts';
import Icon from "react-native-vector-icons/MaterialIcons";
import { CustomButton } from '../../components/CustomButton';
import { RFValue } from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
var { width, height } = Dimensions.get('window');
const HEIGHT_MODAL = Dimensions.get('window').height * 0.78;
type Animation = any | Animated.Value;

interface Props {
    navigation: any,
    auth: object,
    route: any,
    home: { isFetching: boolean, data: [any] },
}

interface State {
    pickeditems: Array<any>,
    index: number,
    animationValue: Animation,
    opacity: Animation,
    bagNumber: string,
    bagContainer: Array<any>,
    pickedProductArray: Array<any>,
    resume: boolean
}

class DetailAddres extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)
        this.state = {
            pickeditems: [],
            index: 0,
            animationValue: new Animated.Value(0),
            opacity: new Animated.Value(0),
            bagNumber: "123265467646546",
            bagContainer: [],
            pickedProductArray: [],
            resume: false
        }
    }

    filterData() {
        let result = this.props.home.data.filter((row) => {
            return row.id === this.props.route.params.ordernumber
        })
        if (result.length) return result[0]
        return {}
    }

    componentDidMount() {

    }

    goToDetail() {
        const order = this.filterData()
        this.props.navigation.navigate('Delivery', { order })
    }

    toggleModal() {

    }

    dissmissModal() {

    }


    render() {

        const order = this.filterData()
        this.props.navigation.setOptions({
            headerTitle: "Detalle pedido Nº " + order.id
        });

        const animatedStyle = {
            height: this.state.animationValue
        }

        if (Object.keys(order).length) {

            return (
                <Center>
                    <View style={{ flex: 1 }}>
                        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                            <View style={{ width: wp(100), height: hp(35) }}>
                                <View style={{ flex: 1, margin: 15 }}>
                                    <Image style={{ width: wp(92), height: hp(30) }} source={{ uri: "https://storage.googleapis.com/support-forums-api/attachment/thread-9014924-11470506657998028469.JPG" }} />
                                </View>
                                <View style={{ flex: 1, marginVertical: -5, justifyContent: 'flex-end', width: wp(96), alignItems: 'flex-end', flexDirection: 'row' }}>
                                    <Text>Ver mapa</Text>
                                    <Icon name="location-on" color={colors.darkYellow} size={Size(55)} />
                                </View>
                            </View>
                            <View style={{ width: wp(100), height: hp(20) }}>
                                <View style={{ flex: 1, marginLeft: 20, justifyContent: 'center' }}>
                                    <Text style={styles.bodyContainerScrollViewContainerInfoSectionText}>
                                        Cliente: <Text style={styles.bodyContainerScrollViewContainerInfoSectionText}> {order.products[this.state.index].name} </Text>
                                    </Text>
                                    <Text style={styles.bodyContainerScrollViewContainerInfoSectionText}>
                                        Nº de Bolsas: <Text style={{ fontSize: order.products[this.state.index].description.length < 30 ? RFValue(18) : RFValue(16), fontFamily: fonts.primaryFont }}> {order.products[this.state.index].description} </Text>
                                    </Text>
                                    <Text style={styles.bodyContainerScrollViewContainerInfoSectionText}>
                                        Cantidad de productos: <Text style={styles.bodyContainerScrollViewContainerInfoSectionText}> {order.products[this.state.index].sku} </Text>
                                    </Text>
                                    <Text style={styles.bodyContainerScrollViewContainerInfoSectionText}>
                                        Recibe un Tercero: <Text style={styles.bodyContainerScrollViewContainerInfoSectionText}> {order.products[this.state.index].barcode} </Text>
                                    </Text>
                                    <Text style={styles.bodyContainerScrollViewContainerInfoSectionText}>
                                        Comentarios: {"this.state.pickeditems.length"}</Text>
                                </View>
                            </View>
                            <View style={{ width: wp(100), flex: 1 }}>
                                <View style={{ flex: 1, marginLeft: 20 }}>
                                    <Text>Barra de bolsas</Text>
                                    {
                                        order.bags.map((bag: any, index: number) => {
                                            return (
                                                <View key={index} style={{ height: hp(4), flexDirection: 'row', marginTop: 2 }}>
                                                    <Text key={index} style={styles.resumeBodyInfoText}>Nº {bag.bag} </Text>
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                            </View>
                            <View style={{ width: wp(100), height: hp(15) }}>
                                {
                                    <View style={styles.resumeHeaderInfo}>
                                        <CustomButton onPress={() => this.goToDetail()} size={"m"}>
                                            <Text style={{
                                                fontFamily: fonts.primaryFont,
                                                fontSize: RFValue(Size(56)),
                                                color: "rgba(0, 0, 0, 255)"
                                            }}>Pedido Entregado</Text>
                                        </CustomButton>
                                        <View style={styles.bodyContainerScrollViewContainerButtonsSectionButtonNext} />
                                    </View>
                                }
                            </View>
                        </ScrollView>
                    </View>
                </Center>
            );
        }
        return (
            <Center>
                <Text>No hay data para mostrar 😰</Text>
            </Center>
        )


    }
}

const styles = StyleSheet.create({
    bodyContainerScrollViewContainerInfoSectionText: {
        fontSize: RFValue(18),
        fontFamily: fonts.primaryFont
    },
    resumeBodyInfoText: {
        fontFamily: fonts.primaryFont,
        fontSize: RFValue(21)
    },
    resumeHeaderInfo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bodyContainerScrollViewContainerButtonsSectionButtonNext: {
        flex: 1,
        marginTop: 30,
        marginBottom: 20
    },
});

const mapStateToProps = (state: any) => ({
    auth: state.auth,
    home: state.home
})

// const mapDispatchToProps = {

// }

export default connect(mapStateToProps)(DetailAddres)


