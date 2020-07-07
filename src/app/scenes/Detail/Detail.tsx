import React, { Component } from 'react'
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Animated, Dimensions, KeyboardAvoidingView, Alert } from 'react-native';
import { connect } from 'react-redux'
import { Center } from '../../components/Center';
import colors from '../../assets/Colors';
import { Size } from '../../services/Service';
import fonts from '../../assets/Fonts';
import Icon from "react-native-vector-icons/MaterialIcons";
import IconChange from "react-native-vector-icons/AntDesign";
import IconBar from "react-native-vector-icons/MaterialCommunityIcons";
import Iconprinter from "react-native-vector-icons/Feather";
import { CustomButtonList } from '../../components/CustomButtonList';
import { RFValue } from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CustomInput } from '../../components/TextInput';
var { width, height } = Dimensions.get('window');
import { RNCamera } from "react-native-camera";
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
    resume: boolean,
    torchOn: boolean
}

class Detail extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props)
        this.state = {
            pickeditems: [],
            index: 0,
            animationValue: new Animated.Value(0),
            opacity: new Animated.Value(0),
            bagNumber: "",
            bagContainer: [],
            pickedProductArray: [],
            resume: false,
            torchOn: false
        }
    }

    filterData() {
        let result = this.props.home.data.filter((row) => {
            return row._id === this.props.route.params.ordernumber
        })
        if (result.length) return result[0]
        return {}
    }

    componentDidMount() {
        this.loadItems(0)
    }

    loadItems(index: number) {
        let order = this.filterData()
        let pickedProductArray = Array.from(Array(order.products[index].quantity).keys())

        let pick = pickedProductArray.map((row) => {
            let item = JSON.parse(JSON.stringify(order.products[index]))
            item["picked"] = false
            return item
        })
        this.setState({ pickedProductArray: pick })
    }


    // add intems to bag 
    nextItem = () => {
        let order = this.filterData()
        let bagContainer = [...this.state.bagContainer]
        let bag = { bag: this.state.bagNumber, bagItems: [...this.state.pickedProductArray], order: order.sku }
        bagContainer.push(bag)
        if (this.state.index < order.products.length - 1) {
            this.loadItems(this.state.index + 1)
            this.setState({ index: this.state.index + 1, bagContainer: bagContainer })
            this.dissmissModal()
        } else {
            this.setState({ bagContainer: bagContainer, resume: true })
            this.dissmissModal()
        }


    }

    captureBagNumber() {
        this.setState({ torchOn: true })
    }

    disableCamera() {
        this.setState({ torchOn: false })
    }

    addProductPicked(index: number) {
        let pickedProductArray = [...this.state.pickedProductArray]
        pickedProductArray[index].picked = true
        this.setState({ pickedProductArray })
    }

    removeProductPicked(index: number) {
        let pickedProductArray = [...this.state.pickedProductArray]
        pickedProductArray[index].picked = false
        this.setState({ pickedProductArray })
    }

    toggleModal() {
        Animated.parallel([
            Animated.timing(this.state.opacity, {
                toValue: 1,
                useNativeDriver: false,
                duration: 300
            }),
            Animated.spring(this.state.animationValue, {
                toValue: HEIGHT_MODAL,
                velocity: 7,
                tension: 2,
                friction: 8,
                useNativeDriver: false
            })
        ]).start(() => {
            // console.log("object");
        });
    }

    validatePickedItems() {
        let pickedProductArray = [...this.state.pickedProductArray]
        let picked = true
        pickedProductArray.map((product) => {
            if (product.picked === false) picked = false
        })
        return picked
    }

    dissmissModal() {
        Animated.parallel([
            Animated.timing(this.state.opacity, {
                toValue: 0,
                useNativeDriver: false,
                duration: 100
            }),
            Animated.spring(this.state.animationValue, {
                toValue: 0,
                velocity: 7,
                tension: 2,
                friction: 8,
                useNativeDriver: false
            })
        ]).start(() => {
            // console.log("dismiss");
        });
    }

    handleTourch(value: boolean) {
        if (value === true) {
            this.setState({ torchOn: false });
        } else {
            this.setState({ torchOn: true });
        }
    }

    onBarCodeRead = (e: any) => {

        this.setState({ bagNumber: e.data, torchOn: false })
        // Alert.alert("Barcode value is" + e.data, "Barcode type is" + e.type);
    }


    render() {
        const title = !this.state.resume ? "Detalle" : "Resumen"
        this.props.navigation.setOptions({
            headerTitle: title
        });
        const order = this.filterData()

        const animatedStyle = {
            height: this.state.animationValue
        }

        if (Object.keys(order).length) {

            return (
                <Center>


                    <View style={styles.headerContainer}>
                        {
                            !this.state.resume ?
                                <>
                                    <View style={styles.headerContainerTitle}>
                                        <Text style={styles.headerContainerTitleText}>Pedido Nº {order.orderNumber} </Text>
                                    </View>
                                    <View style={styles.headerContainerCount}>
                                        <View style={styles.headerContainerCountContainer} >
                                            <Text style={styles.headerContainerCountContainerText}> Producto {this.state.index + 1} de {order.products.length} </Text>
                                        </View>
                                    </View>
                                </> :
                                <View style={styles.resumeHeaderInfo}>
                                    <Text style={styles.headerContainerTitleText}>El Pedido Nº {order.id} tiene {this.state.bagContainer.length} bolsa(s): </Text>
                                </View>
                        }
                    </View>
                    <View style={styles.bodyContainer}>
                        <ScrollView contentContainerStyle={styles.bodyContainerScrollView}>
                            {
                                !this.state.resume ?
                                    <View style={styles.bodyContainerScrollViewContainer}>
                                        <View style={styles.bodyContainerScrollViewContainerInfo}>
                                            <View style={styles.bodyContainerScrollViewContainerInfoSection}>
                                                <Text style={styles.bodyContainerScrollViewContainerInfoSectionText}>
                                                    Nombre: <Text style={styles.bodyContainerScrollViewContainerInfoSectionText}> {order.products[this.state.index].product} </Text>
                                                </Text>
                                                <Text style={styles.bodyContainerScrollViewContainerInfoSectionText}>
                                                    Descripción: <Text style={{ fontSize: order.products[this.state.index].description.length < 30 ? RFValue(18) : RFValue(16), fontFamily: fonts.primaryFont }}> {order.products[this.state.index].description} </Text>
                                                </Text>
                                                <Text style={styles.bodyContainerScrollViewContainerInfoSectionText}>
                                                    SKU: <Text style={styles.bodyContainerScrollViewContainerInfoSectionText}> {order.products[this.state.index].id} </Text>
                                                </Text>
                                                <Text style={styles.bodyContainerScrollViewContainerInfoSectionText}>
                                                    Barra: <Text style={styles.bodyContainerScrollViewContainerInfoSectionText}> {order.products[this.state.index].barcode} </Text>
                                                </Text>
                                                <Text style={styles.bodyContainerScrollViewContainerInfoSectionText}>Cantidad Pickeada: {this.state.pickeditems.length}</Text>
                                            </View>
                                        </View>

                                        <View style={styles.bodyContainerScrollViewContainerPicked}>
                                            {
                                                this.state.pickedProductArray.map((product: any, index: number) => {
                                                    return (
                                                        <View style={styles.bodyContainerScrollViewContainerPickedSection} key={index}>
                                                            <View style={styles.bodyContainerScrollViewContainerPickedSectionTitle}>
                                                                <Text style={styles.bodyContainerScrollViewContainerPickedSectionTitleText}>Unidad {index + 1}</Text>
                                                            </View>
                                                            <View style={styles.bodyContainerScrollViewContainerPickedSectionButtons}>
                                                                <TouchableOpacity onPress={() => { this.removeProductPicked(index) }} style={styles.bodyContainerScrollViewContainerPickedSectionButtonsCont}>
                                                                    <View style={[styles.bodyContainerScrollViewContainerPickedSectionButtonsClearCont, product.picked && { backgroundColor: colors.mediumRed }]}>
                                                                        <Icon name="clear" color={colors.black} size={Size(68)} />
                                                                    </View>
                                                                </TouchableOpacity>
                                                                <TouchableOpacity onPress={() => { this.addProductPicked(index) }} style={styles.bodyContainerScrollViewContainerPickedSectionButtonsCont}>
                                                                    <View style={[styles.bodyContainerScrollViewContainerPickedSectionButtonsOkCont, product.picked && { backgroundColor: colors.lightgrayDisabled }]}>
                                                                        <Icon name="check" color={colors.white} size={Size(68)} />
                                                                    </View>
                                                                </TouchableOpacity>
                                                            </View>
                                                        </View>
                                                    )
                                                })
                                            }
                                        </View>

                                        <View style={styles.bodyContainerScrollViewContainerPosition}>
                                            <View style={styles.bodyContainerScrollViewContainerPositionSection}>
                                                <Text style={styles.bodyContainerScrollViewContainerPositionSectionText}>Posicion</Text>
                                                {
                                                    order.products[this.state.index].location ?
                                                        <IconChange name="isv" color={colors.darkBlue} size={Size(68)} /> :
                                                        <IconBar name="library-shelves" color={colors.darkBlue} size={Size(68)} />
                                                }
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
                                                <CustomButtonList onPress={() => this.validatePickedItems() && this.toggleModal()} title="Siguiente" disable={!this.validatePickedItems()} size={"L"} />
                                            </View>
                                        </View>
                                    </View> :
                                    <View style={styles.resumeBody}>
                                        <View style={styles.resumeBodyInfo}>
                                            {
                                                this.state.bagContainer.map((bag, index) => {
                                                    return (
                                                        <Text key={index} style={styles.resumeBodyInfoText}>Nº {bag.bag}</Text>
                                                    )
                                                })
                                            }
                                        </View>
                                        <View style={styles.resumeBodyInfoIcon}>
                                            <IconBar name="checkbox-marked-circle-outline" color={colors.darkGreen} size={RFValue(190)} />
                                        </View>
                                    </View>
                            }

                        </ScrollView>
                    </View>
                    <Animated.View style={[styles.modalAnimated, { zIndex: 0, }, animatedStyle]}>
                        <Animated.View style={{ flex: 1, opacity: this.state.opacity }}>
                            <View style={styles.modalSectionInfo}>
                                <TouchableOpacity onPress={() => { this.dissmissModal() }} style={styles.modalSectionInfoCancelButton}>
                                    <Text style={styles.modalSectionInfoCancelButtonText}>Cancelar</Text>
                                </TouchableOpacity>
                                <View style={styles.modalSectionInfoTitle}>
                                    <Text style={styles.modalSectionInfoTitleText}>Numero de Bolsa</Text>
                                </View>
                                <TouchableOpacity onPress={() => { this.nextItem() }} style={styles.modalSectionInfoButtonNext}>
                                    <Text style={styles.modalSectionInfoButtonNextText}>Siguiente</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.modalSectionBody}>
                                <View style={styles.modalSectionBodyTitle}>
                                    <Text style={styles.modalSectionBodyTitleText}>Ingrese Numero de Bolsa</Text>
                                </View>
                                <View style={styles.modalSectionBodyInput}>
                                    <CustomInput value={this.state.bagNumber} onChangeText={() => { }} placeholder="Numero de bolsa" type={false} editable={false} />
                                </View>
                                <TouchableOpacity onPress={() => { this.captureBagNumber() }} style={styles.modalSectionBodyScanBar}>
                                    <IconBar name={"barcode-scan"} size={RFValue(150)} color={colors.black} />
                                </TouchableOpacity>
                                <View style={styles.modalSectionBodyPrinter}>
                                    <Iconprinter name={"printer"} size={RFValue(45)} color={colors.darkYellow} />
                                </View>
                            </View>
                        </Animated.View>
                        {
                            (this.state.torchOn && !this.state.bagNumber) &&
                            <View style={{
                                width: wp(100),
                                height: hp(100),
                                flexDirection: 'column',
                                position: 'absolute',
                                zIndex: 1000,
                                backgroundColor: 'black'
                            }}>
                                <RNCamera

                                    style={{ width: wp(100), height: hp(55), justifyContent: 'center', alignItems: 'center' }}
                                    onBarCodeRead={this.onBarCodeRead}
                                    ref={cam => this.camera = cam}
                                    // aspect={RNCamera.Constants}
                                    captureAudio={false}
                                    onGoogleVisionBarcodesDetected={({ barcodes }) => {
                                        console.log(barcodes);
                                    }}
                                />
                                <View style={{ position: 'absolute', bottom: 0, marginBottom: 120, marginLeft: 100 }}>
                                    <TouchableOpacity onPress={() => this.disableCamera()} style={{
                                        flex: 1,
                                        backgroundColor: '#fff',
                                        borderRadius: 5,
                                        padding: 15,
                                        paddingHorizontal: 20,
                                        alignSelf: 'center',
                                        margin: 20,
                                    }}>
                                        <Text style={{ fontSize: 14 }}> Terminar </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }
                    </Animated.View>
                </Center >
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
    },
    modalAnimated: {
        width: width,
        height: hp(100) * 0.77,
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        backgroundColor: colors.white,
        shadowColor: "#000",
        shadowOffset:
        {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 20,
    },
    modalSectionInfo: {
        flex: 1,
        borderBottomColor: colors.ultraLightgray,
        borderBottomWidth: 1,
        borderTopLeftRadius: 35,
        borderTopRightRadius: 35,
        flexDirection: 'row'
    },
    modalSectionInfoCancelButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: 20
    },
    modalSectionInfoCancelButtonText: {
        fontSize: RFValue(18),
        fontFamily: fonts.primaryFont,
        color: colors.mediumBlack
    },
    modalSectionInfoTitle: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalSectionInfoTitleText: {
        fontSize: RFValue(18),
        fontFamily: fonts.primaryFontTitle
    },
    modalSectionInfoButtonNext: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginRight: 20
    },
    modalSectionInfoButtonNextText: {
        fontSize: RFValue(18),
        fontFamily: fonts.primaryFontTitle,
        color: colors.higthLightBlue
    },
    modalSectionBody: {
        flex: 6
    },
    modalSectionBodyTitle: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    modalSectionBodyTitleText: {
        fontSize: RFValue(18),
        fontFamily: fonts.primaryFontTitle
    },
    modalSectionBodyInput: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalSectionBodyScanBar: {
        flex: 2,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    modalSectionBodyPrinter: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    resumeHeaderInfo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    resumeBody: {
        flex: 1
    },
    resumeBodyInfo: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    resumeBodyInfoText: {
        fontFamily: fonts.primaryFont,
        fontSize: RFValue(21)
    },
    resumeBodyInfoIcon: {
        flex: 1,
        alignItems: 'center'
    },
    preview: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cameraIcon: {
        margin: 5,
        height: 40,
        width: 40
    },
    bottomOverlay: {
        position: "absolute",
        width: "100%",
        flex: 20,
        flexDirection: "row",
        justifyContent: "space-between"
    },

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