import React, { Component } from 'react'
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
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
                    <View style={styles.headerContainer}>
                        <View style={styles.headerContainerTitle}>
                            <Text style={styles.headerContainerTitleText}>Pedido Nº {order.id} </Text>
                        </View>
                        <View style={styles.headerContainerCount}>
                            <View style={styles.headerContainerCountContainer} >
                                <Text style={styles.headerContainerCountContainerText}> Producto 1 de {order.products.length} </Text>
                            </View>
                        </View>
                    </View>
                    <View style={styles.bodyContainer}>
                        <ScrollView contentContainerStyle={styles.bodyContainerScrollView}>
                            <View style={styles.bodyContainerScrollViewContainer}>
                                <View style={styles.bodyContainerScrollViewContainerInfo}>
                                    <View style={styles.bodyContainerScrollViewContainerInfoSection}>
                                        <Text style={styles.bodyContainerScrollViewContainerInfoSectionText}>
                                            Nombre: <Text style={styles.bodyContainerScrollViewContainerInfoSectionText}> {order.products[this.state.index].name} </Text>
                                        </Text>
                                        <Text style={styles.bodyContainerScrollViewContainerInfoSectionText}>
                                            Descripción: <Text style={{ fontSize: order.products[this.state.index].description.length < 30 ? RFValue(18) : RFValue(16), fontFamily: fonts.primaryFont }}> {order.products[this.state.index].description} </Text>
                                        </Text>
                                        <Text style={styles.bodyContainerScrollViewContainerInfoSectionText}>
                                            SKU: <Text style={styles.bodyContainerScrollViewContainerInfoSectionText}> {order.products[this.state.index].sku} </Text>
                                        </Text>
                                        <Text style={styles.bodyContainerScrollViewContainerInfoSectionText}>
                                            Barra: <Text style={styles.bodyContainerScrollViewContainerInfoSectionText}> {order.products[this.state.index].barcode} </Text>
                                        </Text>
                                        <Text style={styles.bodyContainerScrollViewContainerInfoSectionText}>Cantidad Pickeada: 0</Text>
                                    </View>
                                </View>

                                <View style={styles.bodyContainerScrollViewContainerPicked}>
                                    {
                                        pickedProductArray.map((product: any) => {
                                            return (
                                                <View style={styles.bodyContainerScrollViewContainerPickedSection}>
                                                    <View style={styles.bodyContainerScrollViewContainerPickedSectionTitle}>
                                                        <Text style={styles.bodyContainerScrollViewContainerPickedSectionTitleText}>Producto A</Text>
                                                    </View>
                                                    <View style={styles.bodyContainerScrollViewContainerPickedSectionButtons}>
                                                        <View style={styles.bodyContainerScrollViewContainerPickedSectionButtonsCont}>
                                                            <View style={styles.bodyContainerScrollViewContainerPickedSectionButtonsClearCont} >
                                                                <Icon name="clear" color={colors.black} size={Size(68)} />
                                                            </View>
                                                        </View>
                                                        <View style={styles.bodyContainerScrollViewContainerPickedSectionButtonsCont}>
                                                            <View style={styles.bodyContainerScrollViewContainerPickedSectionButtonsOkCont} >
                                                                <Icon name="check" color={colors.white} size={Size(68)} />
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                            )
                                        })
                                    }
                                </View>

                                <View style={styles.bodyContainerScrollViewContainerPosition}>
                                    <View style={styles.bodyContainerScrollViewContainerPositionSection}>
                                        <Text style={styles.bodyContainerScrollViewContainerPositionSectionText}>Posicion</Text>
                                        <Icon name="check" color={colors.darkBlue} size={Size(68)} />
                                    </View>
                                </View>

                                <View style={styles.bodyContainerScrollViewContainerImage}>
                                    <View style={styles.baseFlex}>
                                        <View style={styles.baseFlex}>
                                            <Text style={styles.bodyContainerScrollViewContainerImageText}>Imagen del producto</Text>
                                        </View>
                                        <View style={styles.bodyContainerScrollViewContainerImageContainer}>
                                            <Image
                                                style={styles.bodyContainerScrollViewContainerImageContainerImage}
                                                source={{ uri: order.products[this.state.index].image }}
                                            />
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.bodyContainerScrollViewContainerButtons}>
                                    <View style={styles.bodyContainerScrollViewContainerButtonsSection}>
                                        <View style={styles.bodyContainerScrollViewContainerButtonsSectionButton}>
                                            <IconChange name="retweet" color={colors.white} size={Size(68)} />
                                        </View>
                                        <View style={styles.bodyContainerScrollViewContainerButtonsSectionButton}>
                                            <Icon name="add" color={colors.white} size={Size(68)} />
                                        </View>
                                        <View style={styles.bodyContainerScrollViewContainerButtonsSectionButton}>
                                            <Icon name="phone" color={colors.white} size={Size(68)} />
                                        </View>
                                    </View>
                                    <View style={styles.bodyContainerScrollViewContainerButtonsSectionButtonNext}>
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

const styles = StyleSheet.create({
    headerContainer: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: colors.ultraLightgray
    },
    headerContainerTitle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: Size(98)
    },
    headerContainerTitleText: {
        fontSize: RFValue(21),
        fontFamily: fonts.primaryFont
    },
    headerContainerCount: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginRight: Size(39)
    },
    headerContainerCountContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        width: wp(45),
        height: hp(6),
        borderRadius: Size(16),
        backgroundColor: colors.ultraLightgray
    },
    headerContainerCountContainerText: {
        fontFamily: fonts.primaryFontTitle,
        fontSize: RFValue(19),
        color: 'rgba(51, 51, 51, 255)'
    },
    bodyContainer: {
        flex: 8,
        width: wp(100)
    },
    bodyContainerScrollView: {
        flexGrow: 1
    },
    bodyContainerScrollViewContainer: {
        flex: 1
    },
    bodyContainerScrollViewContainerInfo: {
        flex: 3,
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: colors.higLightgray,
        borderStyle: 'dashed'
    },
    bodyContainerScrollViewContainerInfoSection: {
        marginLeft: Size(98),
        marginBottom: 10
    },
    bodyContainerScrollViewContainerInfoSectionText: {
        fontSize: RFValue(18),
        fontFamily: fonts.primaryFont
    },
    bodyContainerScrollViewContainerPicked: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: colors.higLightgray,
        borderStyle: 'dashed'
    },
    bodyContainerScrollViewContainerPickedSection: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 5,
        marginTop: 5
    },
    bodyContainerScrollViewContainerPickedSectionTitle: {
        flex: 1,
        justifyContent: 'center',
        marginLeft: Size(103)
    },
    bodyContainerScrollViewContainerPickedSectionTitleText: {

    },
    bodyContainerScrollViewContainerPickedSectionButtons: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    bodyContainerScrollViewContainerPickedSectionButtonsCont: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    bodyContainerScrollViewContainerPickedSectionButtonsClearCont: {
        alignItems: "center",
        justifyContent: 'center',
        width: wp(14),
        height: hp(6),
        borderRadius: Size(15),
        marginLeft: 45,
        backgroundColor: colors.lightgrayDisabled
    },
    bodyContainerScrollViewContainerPickedSectionButtonsOkCont: {
        alignItems: "center",
        justifyContent: 'center',
        width: wp(14),
        height: hp(6),
        borderRadius: Size(15),
        backgroundColor: colors.darkBlue
    },
    bodyContainerScrollViewContainerPosition: {
        flex: 1,
        height: hp(7)
    },
    bodyContainerScrollViewContainerPositionSection: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginRight: Size(75)
    },
    bodyContainerScrollViewContainerPositionSectionText: {
        fontSize: RFValue(19),
        fontFamily: fonts.primaryFont,
        marginRight: 5,
        color: colors.mediumGray
    },
    bodyContainerScrollViewContainerImage: {
        flex: 4,
        paddingHorizontal: Size(64),
        height: hp(25)
    },
    bodyContainerScrollViewContainerImageText: {
        fontSize: RFValue(13),
        fontFamily: fonts.primaryFont,
        color: colors.mediumGray
    },
    bodyContainerScrollViewContainerImageContainer: {
        flex: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: colors.higLightgray,
        borderRadius: 4
    },
    bodyContainerScrollViewContainerImageContainerImage: {
        width: Size(608),
        height: Size(288)
    },
    bodyContainerScrollViewContainerButtons: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    bodyContainerScrollViewContainerButtonsSection: {
        flex: 1,
        flexDirection: 'row',
        width: wp(100),
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginRight: Size(103)
    },
    bodyContainerScrollViewContainerButtonsSectionButton: {
        alignItems: "center",
        justifyContent: 'center',
        width: wp(14),
        height: hp(6),
        borderRadius: Size(15),
        marginLeft: 10,
        marginRight: 6,
        backgroundColor: colors.ultraLightgray
    },
    bodyContainerScrollViewContainerButtonsSectionButtonNext: {
        flex: 1,
        marginTop: 30,
        marginBottom: 20
    },
    baseFlex: {
        flex: 1
    }

});

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