import React, { Component } from 'react'
import { connect } from 'react-redux'
import Icon from "react-native-vector-icons/MaterialIcons";
import { HomeNavProps } from '../../types/HomeParamaList'
import { Center } from '../../components/Center'
import { FlatList, View, Text, StyleSheet } from 'react-native'
import { getHomeItems } from '../../actions/HomeListAction'
import { getHomeBagItemsForDelivery, updateBagAction, updateBagActionFinish } from '../../actions/HomeListBagAction'
import Loading from '../Loading/Loading'
import { Size } from '../../services/Service'
import colors from '../../assets/Colors'
import fonts from '../../assets/Fonts'
import CountDown from '../../components/CountDown';
import { CustomButtonList } from "../../components/CustomButtonList";
import { RFValue } from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { CustomButton } from '../../components/CustomButton';





interface HomeAddresProps {
    navigation: any,
    auth: object,
    bags: { isFetching: boolean, data: [any], success: boolean, error: boolean, message: string },
    home: { isFetching: boolean, data: [any] },
    fetchDataBagsReady: () => {}
}

interface State {

}

class Home extends React.Component<HomeAddresProps, State> {

    componentDidMount() {
        // this.props.fetchData()
        const unsubscribe = this.props.navigation.addListener('focus', () => {
            this.props.fetchDataBagsReady()
        });

    }

    getData = () => {
        let data = this.props.bags.data ? this.props.bags.data : []
        return data
    }

    navigate(id: string) {
        this.props.navigation.navigate('DetailAddres', { ordernumber: id });
    }
    render() {
        if (this.props.bags.data.length > 0) {
            return (
                <Center>
                    <View style={styles.header}>
                        <View style={styles.headerSectionTitle}>

                        </View>
                        <View style={styles.headerSectionButton}>
                            <View style={{ width: wp(26), marginTop: 15 }}>
                                <Text style={styles.headerSectionTitleText}>Ordernar</Text>
                            </View>
                            <View style={styles.headerSectionButtonContainer}>
                                <Icon name='swap-vert' size={RFValue(21)} color={colors.darkBlue} />
                            </View>
                        </View>
                    </View>
                    <View style={styles.body}>
                        {
                            (!this.props.home.isFetching && this.props.bags.data.length > 0) &&
                            <FlatList
                                style={styles.bodyList}
                                data={this.getData()}
                                extraData={this.props}
                                keyExtractor={(item, index) => item._id.toString()}
                                renderItem={({ item }) => {
                                    return (
                                        <TouchableWithoutFeedback onPress={() => { this.navigate(item._id) }} key={item._id} style={styles.bodyListContainer}>
                                            <View style={styles.bodyListContainerSectionInfo}>
                                                <View style={styles.bodyListContainerSectionInfoContainer}>
                                                    <Text style={styles.bodyListContainerSectionInfoContainerTitle}>{"Pedido Nº " + item.orderNumber.orderNumber}</Text>
                                                    <View style={styles.bodyListContainerSectionInfoContainerDetail}>
                                                        <Icon name="location-on" color={colors.darkYellow} size={Size(55)} />
                                                        {
                                                            item.orderNumber.client &&
                                                            <Text style={[styles.bodyDirectionText, { marginLeft: 5 }]}>{item.orderNumber.client.address}</Text>
                                                        }

                                                    </View>
                                                </View>
                                            </View>
                                            <View style={styles.bodyListContainerButton}>
                                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginRight: 15 }}>
                                                    <CustomButton onPress={() => { this.navigate(item._id) }} size={"s"}>
                                                        <Text style={{
                                                            fontFamily: "AvenirNextBold",
                                                            fontSize: RFValue(Size(46)),
                                                            color: "rgba(0, 0, 0, 255)"
                                                        }}>Seleccionar</Text>
                                                    </CustomButton>
                                                </View>
                                                {/* <CustomButtonList onPress={() => { this.navigate(item._id) }} title="Seleccionar" disable={false} size={"M"} /> */}
                                            </View>
                                        </TouchableWithoutFeedback>
                                    )
                                }}
                            />
                        }
                    </View>

                </Center>
            );
        }
        return (
            <Center>
                {
                    this.props.bags.isFetching &&
                    <Loading />
                }
            </Center>
        )

    }
}

const styles = StyleSheet.create({
    header: {
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: colors.ultraLightgray
    },
    headerSectionTitle: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 50
    },
    headerSectionTitleText: {
        fontSize: RFValue(25),
        fontFamily: fonts.primaryFont
    },
    bodyDirectionText: {
        fontSize: RFValue(19),
        fontFamily: fonts.primaryFont
    },
    headerSectionButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: Size(76),
        flexDirection: 'row'
    },
    headerSectionButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.ultraLightBlue,
        width: Size(84),
        height: Size(66),
        marginTop: 18,
        borderRadius: 4,
    },
    body: {
        flex: 10
    },
    bodyList: {
        width: wp(100)
    },
    bodyListContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        width: wp(100),
        height: Size(234),
        borderBottomWidth: 1,
        borderBottomColor: colors.ultraLightgray
    },
    bodyListContainerSectionInfo: {
        flex: 2,
        justifyContent: 'center'
    },
    bodyListContainerSectionInfoContainer: {
        marginHorizontal: Size(94)
    },
    bodyListContainerSectionInfoContainerTitle: {
        fontSize: RFValue(20),
        fontFamily: fonts.primaryFontTitle
    },
    bodyListContainerSectionInfoContainerDetail: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    bodyListContainerSectionInfoContainerPoint: {
        width: 10,
        height: 10,
        borderRadius: 10 / 2,
        backgroundColor: colors.lightYellow,
        marginRight: 5
    },
    bodyListContainerButton: {
        flex: 1,
        justifyContent: 'center'
    }
})

const mapStateToProps = (state: any) => ({
    auth: state.auth,
    home: state.home,
    bags: state.bags
})

const mapDispatchToProps = (dispatch: any) => ({

    fetchDataBagsReady: () => dispatch(getHomeBagItemsForDelivery())
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)


 // <Button title={item.name} onPress={() => {
                                //     this.props.navigation.navigate('Detail', { name: item.name })
                                // }
                                // } />