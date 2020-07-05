import React, { Component } from 'react'
import { connect } from 'react-redux'
import Icon from "react-native-vector-icons/MaterialIcons";
import { HomeNavProps } from '../../types/HomeParamaList'
import { Center } from '../../components/Center'
import { FlatList, View, Text, StyleSheet } from 'react-native'
import { getHomeItems } from '../../actions/HomeListAction'
import Loading from '../Loading/Loading'
import { Size } from '../../services/Service'
import colors from '../../assets/Colors'
import fonts from '../../assets/Fonts'
import CountDown from '../../components/CountDown';
import { CustomButtonList } from "../../components/CustomButtonList";
import { RFValue } from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { CustomButton } from '../../components/CustomButton';





interface HomeAddresProps {
    navigation: any,
    auth: object,
    home: { isFetching: boolean, data: [any] },
    fetchData: () => {}
}

interface State {

}

class HomeDelivery extends React.Component<HomeAddresProps, State> {

    componentDidMount() {
        this.props.fetchData()
    }



    navigate(id: number) {
        if (id) {
            this.props.navigation.navigate('Detail', {
                screen: 'HomeAddres',
            });
        }
        else {
            this.props.navigation.navigate('Detail', {
                screen: 'DeliveryDetail',
            });
        }
    }

    render() {
        return (
            <Center>
                <View style={{ marginBottom: 25 }}>
                    <CustomButton onPress={() => this.navigate(0)} size={"l"} color={colors.darkYellow}>
                        <Text style={{
                            fontFamily: fonts.primaryFont,
                            fontSize: RFValue(Size(56)),
                            color: "rgba(0, 0, 0, 255)"
                        }}>Recepción</Text>
                    </CustomButton>
                </View>
                <View>
                    <CustomButton onPress={() => this.navigate(1)} size={"l"} color={colors.darkYellow}>
                        <Text style={{
                            fontFamily: fonts.primaryFont,
                            fontSize: RFValue(Size(56)),
                            color: "rgba(0, 0, 0, 255)"
                        }}>Entrega de pedido</Text>
                    </CustomButton>
                </View>
                {
                    this.props.home.isFetching &&
                    <Loading />
                }
            </Center>
        );
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
        fontSize: RFValue(25),
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
    home: state.home
})

const mapDispatchToProps = (dispatch: any) => ({

    fetchData: () => dispatch(getHomeItems())
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeDelivery)


 // <Button title={item.name} onPress={() => {
                                //     this.props.navigation.navigate('Detail', { name: item.name })
                                // }
                                // } />