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





interface HomeProps {
    navigation: any,
    auth: object,
    home: { isFetching: boolean, data: [any] },
    fetchData: () => {}
}

interface State {

}

class Home extends React.Component<HomeProps, State> {

    componentDidMount() {
        this.props.fetchData()
    }

    getData = () => {
        let data = this.props.home.data ? this.props.home.data : []
        return data
    }

    navigate(id: string) {
        this.props.navigation.navigate('Detail', {
            screen: 'Detail',
            params: { ordernumber: id },
        });
    }

    render() {
        return (
            <Center>
                <View style={styles.header}>
                    <View style={styles.headerSectionTitle}>
                        <Text style={styles.headerSectionTitleText}>Selecciona tu Nº de pedido</Text>
                    </View>
                    <View style={styles.headerSectionButton}>
                        <View style={styles.headerSectionButtonContainer}>
                            <Icon name='swap-vert' size={RFValue(21)} color={colors.darkBlue} />
                        </View>
                    </View>
                </View>
                <View style={styles.body}>
                    {
                        !this.props.home.isFetching &&
                        <FlatList
                            style={styles.bodyList}
                            data={this.getData()}
                            extraData={this.props}
                            keyExtractor={(item, index) => item._id.toString()}
                            renderItem={({ item }) => {
                                return (
                                    <View key={item._id} style={styles.bodyListContainer}>
                                        <View style={styles.bodyListContainerSectionInfo}>
                                            <View style={styles.bodyListContainerSectionInfoContainer}>
                                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                                    <Text style={styles.bodyListContainerSectionInfoContainerTitle}>{"Pedido Nº "}</Text>
                                                    <Text style={[styles.bodyListContainerSectionInfoContainerTitle, { fontSize: item.orderNumber.length > 7 ? RFValue(19) : RFValue(25) }]}>{item.orderNumber}</Text>
                                                </View>
                                                <View style={styles.bodyListContainerSectionInfoContainerDetail}>
                                                    <View style={styles.bodyListContainerSectionInfoContainerPoint} />
                                                    <CountDown date={item.startPickingDate} />
                                                </View>
                                            </View>
                                        </View>
                                        <View style={styles.bodyListContainerButton}>
                                            <CustomButtonList onPress={() => { this.navigate(item._id) }} title="Seleccionar" disable={false} size={"M"} />
                                        </View>
                                    </View>
                                )
                            }}
                        />
                    }
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
        flex: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 50
    },
    headerSectionTitleText: {
        fontSize: RFValue(25),
        fontFamily: fonts.primaryFont
    },
    headerSectionButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        height: Size(76)
    },
    headerSectionButtonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.ultraLightBlue,
        width: Size(84),
        height: Size(66),
        marginTop: 18,
        borderRadius: 4
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
        fontSize: RFValue(23),
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

export default connect(mapStateToProps, mapDispatchToProps)(Home)


 // <Button title={item.name} onPress={() => {
                                //     this.props.navigation.navigate('Detail', { name: item.name })
                                // }
                                // } />