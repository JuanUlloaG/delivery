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
import { RNCamera } from "react-native-camera";


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
    bags: Array<any>,
    resume: boolean,
    torchOn: boolean
}

class DetailDelivery extends React.Component<Props, State> {

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
            torchOn: false,
            bags: []
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
        let data = this.filterData()
        this.loadItems(0)
    }

    loadItems(index: number) {
        // let order = this.filterData()
        // let pickedProductArray = Array.from(Array(order.products[index].quantity).keys())

        // let pick = pickedProductArray.map((row) => {
        //     let item = JSON.parse(JSON.stringify(order.products[index]))
        //     item["picked"] = false
        //     return item
        // })
        // this.setState({ pickedProductArray: pick })
    }


    // add intems to bag 
    nextItem = () => {
        // let order = this.filterData()
        // let bagContainer = [...this.state.bagContainer]
        // let bag = { bag: this.state.bagNumber, bagItems: [...this.state.pickedProductArray], order: order.sku }
        // bagContainer.push(bag)
        // if (this.state.index < order.products.length - 1) {
        //     this.loadItems(this.state.index + 1)
        //     this.setState({ index: this.state.index + 1, bagContainer: bagContainer })
        //     this.dissmissModal()
        // } else {
        //     this.setState({ bagContainer: bagContainer, resume: true })
        //     this.dissmissModal()
        // }


    }

    addProductPicked(index: number) {
        // let pickedProductArray = [...this.state.pickedProductArray]
        // pickedProductArray[index].picked = true
        // this.setState({ pickedProductArray })
    }

    removeProductPicked(index: number) {
        // let pickedProductArray = [...this.state.pickedProductArray]
        // pickedProductArray[index].picked = false
        // this.setState({ pickedProductArray })
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
        // let pickedProductArray = [...this.state.pickedProductArray]
        // let picked = true
        // pickedProductArray.map((product) => {
        //     if (product.picked === false) picked = false
        // })
        // return picked
    }

    dissmissModal() {
        Animated.parallel([
            Animated.timing(this.state.opacity, {
                toValue: 0,
                delay: 10,
                useNativeDriver: false,
                duration: 50
            }),
            Animated.spring(this.state.animationValue, {
                toValue: 0,
                velocity: 6,
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

    captureBagNumber() {
        this.setState({ torchOn: true })
    }

    disableCamera() {
        this.setState({ torchOn: false })
    }

    onBarCodeRead = (e) => {
        let bags = [...this.state.bags]
        console.log(e.data);
        bags.push(e.data)
        this.setState({ bags, bagNumber: e.data, torchOn: false })
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

                    <View style={styles.bodyContainer}>
                        <View style={{ flex: 2 }}>
                            <View style={styles.modalSectionBodyTitle}>
                                <Text style={styles.modalSectionBodyTitleText}>Pickea el bulto</Text>
                            </View>
                            <View style={styles.modalSectionBodyInput}>
                                <CustomInput value={this.state.bagNumber} onChangeText={() => { }} placeholder="Numero de bolsa" type={false} editable={false} />
                            </View>
                            <TouchableOpacity onPress={() => this.captureBagNumber()} style={styles.modalSectionBodyScanBar}>
                                <IconBar name={"barcode-scan"} size={RFValue(120)} color={colors.black} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ flex: 2 }}>
                            <View style={styles.modalSectionBodyTitle}>
                                <Text style={styles.modalSectionBodyTitleText}>Lista de todos los bultos asociados </Text>
                            </View>
                            <View style={{ flex: 5 }}>
                                <ScrollView contentContainerStyle={styles.bodyContainerScrollView}>
                                    {
                                        <View style={styles.resumeBody}>
                                            <View style={styles.resumeBodyInfo}>
                                                {
                                                    order.bags.map((bag: any, index: number) => {
                                                        return (
                                                            <View key={index} style={{ height: hp(7), flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                                                <Text key={index} style={[styles.resumeBodyInfoText, { color: this.state.bags.includes(bag.bag)? colors.darkGreen:colors.black }]}>Nº {bag.bag} </Text>
                                                                {
                                                                    this.state.bags.includes(bag.bag) &&
                                                                    <IconBar name="check-circle" color={colors.darkGreen} size={RFValue(30)} />
                                                                }

                                                            </View>
                                                        )
                                                    })
                                                }
                                            </View>
                                        </View>
                                    }
                                </ScrollView>
                            </View>
                        </View>
                        <View style={styles.headerContainer}>
                            {
                                <View style={styles.resumeHeaderInfo}>
                                    <View style={styles.bodyContainerScrollViewContainerButtonsSectionButtonNext}>
                                        <CustomButtonList onPress={() => { }} title="Siguiente" disable={false} size={"L"} />
                                    </View>
                                </View>
                            }
                        </View>
                        {
                            (this.state.torchOn) &&
                            <View style={{
                                width: wp(100),
                                height: hp(76),
                                flexDirection: 'column',
                                position: 'absolute',
                                zIndex: 1000,
                                backgroundColor: 'black',
                                justifyContent: 'flex-start',
                                alignItems: 'center'
                            }}>
                                <RNCamera

                                    style={{ width: wp(100), height: hp(50) }}
                                    onBarCodeRead={this.onBarCodeRead}
                                    ref={cam => this.camera = cam}
                                    // aspect={RNCamera.Constants}
                                    autoFocus={RNCamera.Constants.AutoFocus.on}
                                    captureAudio={false}
                                    onGoogleVisionBarcodesDetected={({ barcodes }) => {
                                    }}
                                />
                                <View style={{ position: 'absolute', bottom: 0 }}>
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
        flex: 1
    },
    modalSectionBodyTitle: {
        flex: 1,
        justifyContent: 'center',
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
        flex: 4,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 20
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
        alignItems: 'center'
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

export default connect(mapStateToProps)(DetailDelivery)


// <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            //     <Text>Detail Screen</Text>

            //     <Button title="Press me" onPress={() => {
            //         this.props.navigation.navigate("Edit")
            //     }} />
            // </View>