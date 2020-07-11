import React, { Component } from 'react'
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Animated, Dimensions, KeyboardAvoidingView, Alert, TouchableWithoutFeedback } from 'react-native';
import { State as AuthState } from "../../reducers/AuthReducer";
import { connect } from 'react-redux'
import { Center } from '../../components/Center';
import colors from '../../assets/Colors';
import { Size } from '../../services/Service';
import fonts from '../../assets/Fonts';
import { CustomButtonList } from '../../components/CustomButtonList';
import Icon from "react-native-vector-icons/MaterialIcons";
import IconChange from "react-native-vector-icons/AntDesign";
import IconBar from "react-native-vector-icons/MaterialCommunityIcons";
import { postBagsAction, RestartAction } from '../../actions/DetailActions';
import { RFValue } from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CustomButton } from '../../components/CustomButton';
var { width, height } = Dimensions.get('window');
type Animation = any | Animated.Value;


postBagsAction


interface Props {
    navigation: any,
    auth: AuthState,
    route: any,
    detail: any,
    home: { isFetching: boolean, data: [any] },
    postData: (bag: any) => {},
    restart: () => {}
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
    torchOn: boolean,
    toggleModal: boolean,
    bagSend: boolean
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
            torchOn: false,
            toggleModal: false,
            bagSend: false
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
        this.props.restart()
        this.loadItems(0)
    }

    loadItems(index: number) {
        let order = this.filterData()
        let pickedProductArray = Array.from(Array(order.products[index].units).keys())

        let pick = pickedProductArray.map((row) => {
            let item = JSON.parse(JSON.stringify(order.products[index]))
            item["picked"] = false
            item["broken"] = false
            item["replace"] = false
            item["substituted"] = false
            return item
        })
        this.setState({ pickedProductArray: pick })
    }


    // add intems to bag 
    nextItem = () => {
        let order = this.filterData()
        let bagContainer = [...this.state.bagContainer]
        let index = 0

        let result = bagContainer.filter((bag, ind) => {
            index = ind
            return bag.bagNumber == this.state.bagNumber
        })

        let bag
        if (result.length) {
            let prod = [...this.state.pickedProductArray]
            prod[0].units = this.state.pickedProductArray.length
            prod[0].unitsPicked = this.countPicked()
            prod[0].unitsBroken = this.countBroken()
            bagContainer[index].products.push(prod[0])
        } else {
            //new bag 
            let prod = [...this.state.pickedProductArray]
            prod[0].units = this.state.pickedProductArray.length
            prod[0].unitsPicked = this.countPicked()
            prod[0].unitsBroken = this.countBroken()
            let product = []
            product.push(prod[0])
            bag = { bagNumber: this.state.bagNumber, products: [...product] }
            bagContainer.push(bag)
        }

        if (this.state.index < order.products.length - 1) {
            this.loadItems(this.state.index + 1)
            this.setState({ index: this.state.index + 1, bagContainer: bagContainer })
        } else {
            this.setState({ bagContainer: bagContainer, resume: true })
        }


    }

    ProductPicked(index: number) {
        let pickedProductArray = [...this.state.pickedProductArray]

        if (pickedProductArray[index].picked) {
            pickedProductArray[index].picked = false
        } else {
            pickedProductArray[index].picked = true
            if (pickedProductArray[index].broken) pickedProductArray[index].broken = false
        }

        this.setState({ pickedProductArray })
    }

    ProductBroken(index: number) {
        let pickedProductArray = [...this.state.pickedProductArray]

        if (pickedProductArray[index].broken) {
            pickedProductArray[index].broken = false
        } else {
            pickedProductArray[index].broken = true
            if (pickedProductArray[index].picked) pickedProductArray[index].picked = false
        }
        this.setState({ pickedProductArray })
    }

    addBag(bag: string) {
        this.setState({ bagNumber: bag }, () => {
            this.nextItem()
        })
    }

    toggleModal() {
        this.props.navigation.navigate('DetailAddToBag', {
            onGoBack: (bag: string) => this.addBag(bag),
        });
    }

    updateBagSend() {
        this.setState({ bagSend: true })
    }

    validatePickedItems() {
        let pickedProductArray = [...this.state.pickedProductArray]
        let picked = 0
        let broken = 0
        pickedProductArray.map((product) => {
            if (product.picked === true) picked = picked + 1
        })
        pickedProductArray.map((product) => {
            if (product.broken === true) broken = broken + 1
        })
        return (picked == pickedProductArray.length || broken == pickedProductArray.length || (broken + picked) == pickedProductArray.length)
    }

    countPicked() {
        let count = 0
        let pickedProductArray = [...this.state.pickedProductArray]
        pickedProductArray.map((row) => {
            if (row.picked) count = count + 1
        })

        return count
    }

    countBroken() {
        let count = 0
        let pickedProductArray = [...this.state.pickedProductArray]
        pickedProductArray.map((row) => {
            if (row.broken) count = count + 1
        })

        return count
    }

    /*
      orderNumber: database id order
      shopId: database id order
      pickerId: database id picker user
    */
    finishPacking = () => {
        const order = this.filterData()

        let bag = {
            orderNumber: order._id,
            shopId: this.props.auth.shop,
            pickerId: this.props.auth.id,
            bags: [...this.state.bagContainer]
        }

        this.props.postData(bag)

    }

    finishProcess() {
        this.props.restart()
        this.props.navigation.goBack()
    }

    resumeAction() {
        const order = this.filterData()
        this.props.navigation.navigate('ResumeDetail', {
            bagContainer: [...this.state.bagContainer],
            order: order.orderNumber,
            orderNumber: order.orderNumber,
            pickerId: this.props.auth.id,
            updateBagSend: () => this.updateBagSend(),
            finishPacking: () => this.finishPacking(),
        });
    }


    render() {

        // if (this.state.resume) this.resumeAction();
        const order = this.filterData();


        if (Object.keys(order).length) {
            return (
                <Center>
                    <View style={styles.headerContainer}>
                        {
                            <>
                                <View style={styles.headerContainerTitle}>
                                    <Text style={styles.headerContainerTitleText}>Pedido Nº {order.orderNumber} </Text>
                                </View>
                                <View style={styles.headerContainerCount}>
                                    <View style={styles.headerContainerCountContainer} >
                                        <Text style={styles.headerContainerCountContainerText}> Producto {this.state.index + 1} de {order.products.length} </Text>
                                    </View>
                                </View>
                            </>
                        }
                    </View>
                    <View style={styles.bodyContainer}>
                        <ScrollView contentContainerStyle={styles.bodyContainerScrollView}>
                            {
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

                                        </View>
                                    </View>

                                    <View style={styles.bodyContainerScrollViewContainerPicked}>
                                        <Text style={[styles.bodyContainerScrollViewContainerInfoSectionText, { alignSelf: 'flex-end', marginRight: 20 }]}>Cantidad Pickeada: {this.countPicked()}</Text>
                                        {
                                            this.state.pickedProductArray.map((product: any, index: number) => {
                                                return (
                                                    <View style={styles.bodyContainerScrollViewContainerPickedSection} key={index}>
                                                        <View style={styles.bodyContainerScrollViewContainerPickedSectionTitle}>
                                                            <Text style={styles.bodyContainerScrollViewContainerPickedSectionTitleText}>Unidad {index + 1}</Text>
                                                        </View>
                                                        <View style={styles.bodyContainerScrollViewContainerPickedSectionButtons}>
                                                            <TouchableWithoutFeedback disabled={this.state.bagSend} onPress={() => { this.ProductBroken(index) }} style={styles.bodyContainerScrollViewContainerPickedSectionButtonsCont}>
                                                                <View style={[styles.bodyContainerScrollViewContainerPickedSectionButtonsClearCont, product.broken && { backgroundColor: colors.mediumRed }]}>
                                                                    <Icon name="clear" color={colors.black} size={Size(68)} />
                                                                </View>
                                                            </TouchableWithoutFeedback>
                                                            <TouchableWithoutFeedback disabled={this.state.bagSend} onPress={() => { this.ProductPicked(index) }} style={styles.bodyContainerScrollViewContainerPickedSectionButtonsCont}>
                                                                <View style={[styles.bodyContainerScrollViewContainerPickedSectionButtonsOkCont, product.picked && { backgroundColor: colors.darkBlue }]}>
                                                                    <Icon name="check" color={product.picked ? colors.white : colors.black} size={Size(68)} />
                                                                </View>
                                                            </TouchableWithoutFeedback>
                                                        </View>
                                                    </View>
                                                )
                                            })
                                        }
                                    </View>

                                    <View style={styles.bodyContainerScrollViewContainerPosition}>
                                        <View style={styles.bodyContainerScrollViewContainerPositionSection}>
                                            <Text style={styles.bodyContainerScrollViewContainerPositionSectionText}>Categoria</Text>
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
                                                    resizeMode={"contain"}
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
                                        {
                                            !this.state.bagSend ?
                                                !this.state.resume ?
                                                    <View style={styles.bodyContainerScrollViewContainerButtonsSectionButtonNext}>
                                                        <View style={{ flex: 1, marginTop: 30, justifyContent: 'center', alignItems: 'center' }}>
                                                            <CustomButton onPress={() => this.validatePickedItems() && this.toggleModal()} color={this.validatePickedItems() ? colors.lightBlue : colors.lightgrayDisabled} size={"m"} disable={!this.validatePickedItems()} >
                                                                <Text style={{
                                                                    fontFamily: fonts.buttonFont,
                                                                    fontSize: RFValue(Size(56)),
                                                                    color: "#333333"
                                                                }}>Siguiente</Text>
                                                            </CustomButton>
                                                        </View>

                                                        {/* <CustomButtonList onPress={() => this.validatePickedItems() && this.toggleModal()} title="Siguiente" disable={!this.validatePickedItems()} size={"L"} /> */}
                                                    </View> :
                                                    <View style={styles.bodyContainerScrollViewContainerButtonsSectionButtonNext}>
                                                        <CustomButtonList onPress={() => this.resumeAction()} title="Listo" disable={false} size={"L"} />
                                                    </View> :
                                                // <View style={styles.bodyContainerScrollViewContainerButtonsSectionButtonNext}>
                                                //     <CustomButtonList onPress={() => this.resumeAction()} title="Finalizar" disable={true} size={"L"} />
                                                // </View>
                                                null
                                        }
                                    </View>
                                </View>
                            }

                        </ScrollView>
                    </View>
                </Center >
            );
        }
        return (
            <Center>
                <Text>No hay data para mostrar 👨🏾‍💻</Text>
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
        marginLeft: Size(98),

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
        backgroundColor: colors.ultraLightgray,
        shadowColor: "#676767",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 2.65,
        elevation: 3,
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
        borderStyle: 'dashed',
        paddingVertical: 10
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
        backgroundColor: colors.lightgrayDisabled,
        shadowColor: "#676767",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 2.65,
        elevation: 3,
    },
    bodyContainerScrollViewContainerPickedSectionButtonsOkCont: {
        alignItems: "center",
        justifyContent: 'center',
        width: wp(14),
        height: hp(6),
        borderRadius: Size(15),
        backgroundColor: colors.lightgrayDisabled,
        shadowColor: "#676767",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 2.65,
        elevation: 3,
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
        backgroundColor: colors.ultraLightgray,
        shadowColor: "#676767",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 2.65,
        elevation: 3,
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
    home: state.home,
    detail: state.detail
})

const mapDispatchToProps = (dispatch: any) => ({

    postData: (bag: any) => dispatch(postBagsAction(bag)),
    restart: () => dispatch(RestartAction())
})

export default connect(mapStateToProps, mapDispatchToProps)(Detail)