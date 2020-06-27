import React, { Component } from 'react'
import { View, Text, Button, Dimensions, Image, ScrollView } from 'react-native';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Center } from '../../components/Center';
import colors from '../../assets/Colors';
import { Size } from '../../services/Service';
import fonts from '../../assets/Fonts';
import Icon from "react-native-vector-icons/MaterialIcons";
import IconChange from "react-native-vector-icons/AntDesign";
import { CustomButtonList } from '../../components/CustomButtonList';
import { RFValue } from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


interface Props {
    navigation: any,
    auth: object,
    route: any,
    home: { isFetching: boolean, data: [any] },
}

interface State {
    items: [],
    index: 0
}

class Detail extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)
        this.state = {
            items: [],
            index: 0
        }
    }

    componentDidMount() {
    }

    filterData() {
        let result = this.props.home.data.filter((row) => {
            return row.id === this.props.route.params.ordernumber
        })
        if (result.length) return result[0]
        return {}
    }


    render() {

        this.props.navigation.setOptions({
            // headerTitle: "Orden Nº " + this.props.route.params.name
        });



        const order = this.filterData()
        let pickedProductArray
        pickedProductArray = Array.from(Array(order.products[this.state.index].quantity).keys())

        if (Object.keys(order).length) {
            return (
                <Center>
                    <View style={{ flex: 1, justifyContent: 'center', flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: colors.ultraLightgray }}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-start', marginLeft: Size(98) }}>
                            <Text style={{ fontSize: RFValue(21), fontFamily: fonts.primaryFont }}>Pedido Nº {order.id} </Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end', marginRight: Size(39) }}>
                            <View style={
                                {
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: wp(45),
                                    height: hp(6),
                                    borderRadius: Size(16),
                                    backgroundColor: colors.ultraLightgray
                                }
                            } >
                                <Text style={
                                    {
                                        fontFamily: fonts.primaryFontTitle,
                                        fontSize: RFValue(19),
                                        color: 'rgba(51, 51, 51, 255)'
                                    }
                                } > Producto 1 de {order.products.length} </Text>
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 8, width: wp(100) }}>

                        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                            <View style={{ flex: 1 }}>
                                <View style={{ flex: 3, justifyContent: 'center', borderBottomWidth: 1, borderBottomColor: colors.higLightgray, borderStyle: 'dashed', }}>
                                    <View style={{ marginLeft: Size(98), marginBottom: 10 }}>
                                        <Text style={{ fontSize: RFValue(18), fontFamily: fonts.primaryFont }}>
                                            Nombre: <Text style={{ fontSize: RFValue(18), fontFamily: fonts.primaryFont }}> {order.products[this.state.index].name} </Text>
                                        </Text>
                                        <Text style={{ fontSize: RFValue(18), fontFamily: fonts.primaryFont }}>
                                            Descripción: <Text style={{ fontSize: order.products[this.state.index].description.length < 30 ? RFValue(18) : RFValue(16), fontFamily: fonts.primaryFont }}> {order.products[this.state.index].description} </Text>
                                        </Text>
                                        <Text style={{ fontSize: RFValue(18), fontFamily: fonts.primaryFont }}>
                                            SKU: <Text style={{ fontSize: RFValue(18), fontFamily: fonts.primaryFont }}> {order.products[this.state.index].sku} </Text>
                                        </Text>
                                        <Text style={{ fontSize: RFValue(18), fontFamily: fonts.primaryFont }}>
                                            Barra: <Text style={{ fontSize: RFValue(18), fontFamily: fonts.primaryFont }}> {order.products[this.state.index].barcode} </Text>
                                        </Text>
                                        <Text style={{ fontSize: RFValue(18), fontFamily: fonts.primaryFont }}>Cantidad Pickeada: 0</Text>
                                    </View>
                                </View>

                                <View style={{ flex: 1, borderBottomWidth: 1, borderBottomColor: colors.higLightgray, borderStyle: 'dashed' }}>
                                    {
                                        pickedProductArray.map((product: any) => {
                                            return (
                                                <View style={{ flex: 1, flexDirection: 'row', marginBottom: 5 }}>
                                                    <View style={{ flex: 1, justifyContent: 'center', marginLeft: Size(103) }}>
                                                        <Text>Producto A</Text>
                                                    </View>
                                                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around' }}>
                                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                            <View style={
                                                                {
                                                                    alignItems: "center",
                                                                    justifyContent: 'center',
                                                                    width: wp(14),
                                                                    height: hp(6),
                                                                    borderRadius: Size(15),
                                                                    marginLeft: 45,
                                                                    backgroundColor: colors.lightgrayDisabled
                                                                }
                                                            } >
                                                                <Icon name="clear" color={colors.black} size={Size(68)} />

                                                            </View>
                                                        </View>
                                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                                            <View style={
                                                                {
                                                                    alignItems: "center",
                                                                    justifyContent: 'center',
                                                                    width: wp(14),
                                                                    height: hp(6),
                                                                    borderRadius: Size(15),
                                                                    backgroundColor: colors.darkBlue
                                                                }
                                                            } >
                                                                <Icon name="check" color={colors.white} size={Size(68)} />

                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                            )
                                        })
                                    }
                                </View>

                                <View style={{ flex: 1, height: hp(7) }}>
                                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginRight: Size(75) }}>
                                        <Text style={{ fontSize: RFValue(19), fontFamily: fonts.primaryFont, marginRight: 5, color: colors.mediumGray }}>Posicion</Text>
                                        <Icon name="check" color={colors.darkBlue} size={Size(68)} />
                                    </View>
                                </View>

                                <View style={{ flex: 4, paddingHorizontal: Size(64), height: hp(25) }}>
                                    <View style={{ flex: 1 }}>
                                        <View style={{ flex: 1 }}>
                                            <Text style={{ fontSize: RFValue(13), fontFamily: fonts.primaryFont, color: colors.mediumGray }}>Imagen del producto</Text>
                                        </View>
                                        <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: colors.higLightgray, borderRadius: 4 }}>
                                            <Image
                                                style={{ width: Size(608), height: Size(288) }}
                                                source={{
                                                    uri: order.products[this.state.index].image,
                                                }}
                                            />
                                        </View>
                                    </View>
                                </View>
                                <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
                                    <View style={{ flex: 1, flexDirection: 'row', width: wp(100), justifyContent: 'flex-end', alignItems: 'center', marginRight: Size(103) }}>
                                        <View style={
                                            {
                                                alignItems: "center",
                                                justifyContent: 'center',
                                                width: wp(14),
                                                height: hp(6),
                                                borderRadius: Size(15),
                                                backgroundColor: colors.ultraLightgray
                                            }
                                        } >
                                            <IconChange name="retweet" color={colors.white} size={Size(68)} />

                                        </View>
                                        <View style={
                                            {
                                                marginLeft: 10,
                                                alignItems: "center",
                                                justifyContent: 'center',
                                                width: wp(14),
                                                height: hp(6),
                                                borderRadius: Size(15),
                                                backgroundColor: colors.ultraLightgray
                                            }
                                        } >
                                            <Icon name="add" color={colors.white} size={Size(68)} />

                                        </View>
                                        <View style={
                                            {
                                                marginLeft: 10,
                                                alignItems: "center",
                                                justifyContent: 'center',
                                                width: wp(14),
                                                height: hp(6),
                                                borderRadius: Size(15),
                                                backgroundColor: colors.ultraLightgray
                                            }
                                        } >
                                            <Icon name="phone" color={colors.white} size={Size(68)} />

                                        </View>
                                    </View>
                                    <View style={{ flex: 1, marginTop: 30, marginBottom: 20 }}>
                                        <CustomButtonList onPress={() => { }} title="Siguiente" disable={false} size={"L"} />
                                    </View>
                                </View>


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

const mapStateToProps = (state: any) => ({
    auth: state.auth,
    home: state.home
})

// const mapDispatchToProps = {

// }

export default connect(mapStateToProps)(Detail)


// <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            //     <Text>Detail Screen</Text>

            //     <Button title="Press me" onPress={() => {
            //         this.props.navigation.navigate("Edit")
            //     }} />
            // </View>