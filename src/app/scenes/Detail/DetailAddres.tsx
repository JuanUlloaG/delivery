import React, { Component } from 'react'
import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity, Animated, Dimensions, KeyboardAvoidingView, PermissionsAndroid } from 'react-native';
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
import MapView, { Marker, PROVIDER_GOOGLE, MapViewProps, Polyline } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';


const SCREEN_HEIGHT = height
const SCREEN_WIDTH = width
const ASPECT_RATIO = width / hp(35)
const LATITUDE_DELTA = 0.0922
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO

interface Props {
    navigation: any,
    auth: object,
    route: any,
    bags: { isFetching: boolean, data: [any], success: boolean, error: boolean, message: string },
    home: { isFetching: boolean, data: [any] },
    mapView: any
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
    region: {
        latitude: number,
        longitude: number,
        latitudeDelta: number,
        longitudeDelta: number,
    },
    region2: {
        latitude: number,
        longitude: number,
        latitudeDelta: number,
        longitudeDelta: number,
    },
    coords: [{
        latitude: number,
        longitude: number,
    }]
}

class DetailAddres extends React.Component<Props, State> {

    private mapView: MapView
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
            region: {
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0,
                longitudeDelta: 0,
            },
            region2: {
                latitude: -33.4614786,
                longitude: -70.6514591,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            coords: [{
                latitude: 0,
                longitude: 0
            }],
        }
        this.getPosition()
    }

    filterData() {
        // console.log("aers", this.props);
        let result = this.props.bags.data.filter((row) => {
            return row._id === this.props.route.params.ordernumber
        })
        if (result.length) return result[0]
        return {}
    }

    async getPosition() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: "Acces to location",
                    message:
                        "Cool Photo App needs access to your camera " +
                        "so you can take awesome pictures.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                Geolocation.getCurrentPosition((info) => {
                    // console.log(info)
                    var initialRegion = {
                        latitude: info.coords.latitude,
                        longitude: info.coords.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                    }
                    this.setState({ region: initialRegion })
                });
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    }

    decode = function (t: any, e: any) { for (var n, o, u = 0, l = 0, r = 0, d = [], h = 0, i = 0, a = null, c = Math.pow(10, e || 5); u < t.length;) { a = null, h = 0, i = 0; do a = t.charCodeAt(u++) - 63, i |= (31 & a) << h, h += 5; while (a >= 32); n = 1 & i ? ~(i >> 1) : i >> 1, h = i = 0; do a = t.charCodeAt(u++) - 63, i |= (31 & a) << h, h += 5; while (a >= 32); o = 1 & i ? ~(i >> 1) : i >> 1, l += n, r += o, d.push([l / c, r / c]) } return d = d.map(function (t) { return { latitude: t[0], longitude: t[1] } }) }

    componentDidMount() {
        this.getPosition()
        // const mode = 'driving'; // 'walking';
        // const origin = '-33.4614786, ';
        // const destination = 'coords or address';
        // const APIKEY = 'AIzaSyBCVpGQaaEZFKNjk5OeqCaCSWLxWalHFjs';
        // const url = 'https://maps.googleapis.com/maps/api/directions/json?origin=metro+Toesca&destination=metro+rondizzoni&key=' + APIKEY
        // // const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${APIKEY}&mode=${mode}`;

        // fetch(url)
        //     .then(response => response.json())
        //     .then(responseJson => {
        //         if (responseJson.routes.length) {
        //             console.log(responseJson.routes);
        //             this.setState({
        //                 coords: this.decode(responseJson.routes[0].overview_polyline.points) // definition below
        //             });
        //         }
        //     }).catch(e => { console.warn(e) });
    }

    goToDetail() {
        const order = this.filterData()
        this.props.navigation.navigate('Delivery', { order })
    }

    toggleModal() {

    }

    dissmissModal() {

    }

    productQuantity() {
        const order = this.filterData();
        let count = 0;
        order.bags.map((bag: any) => {
            count = count + bag.products.length
        })

        return count
    }

    onRegionChange(region: any) {
        this.setState({ region });
    }

    showMap() {
        const order = this.filterData()
        this.props.navigation.navigate('DetailMap', { order })
    }

    async goToInitialLocation() {
        await this.getPosition()
        let initialRegion = Object.assign({}, this.state.region);
        initialRegion["latitudeDelta"] = 0.005;
        initialRegion["longitudeDelta"] = 0.005;
        this.mapView.animateToRegion(initialRegion, 2000);
    }


    render() {

        const order = this.filterData()
        if (Object.keys(order).length) {
            this.props.navigation.setOptions({
                headerTitle: "Pedido Nº " + order.orderNumber.orderNumber,
                headerTitleStyle: {
                    textAlign: 'center',
                    flexGrow: 1,
                    marginRight: 50,
                    alignSelf: 'center',
                    color: colors.white,
                    fontFamily: fonts.primaryFontTitle,
                    fontSize: Size(65),
                },
            });

            const animatedStyle = {
                height: this.state.animationValue
            }


            return (
                <Center>
                    <View style={{ flex: 1 }}>
                        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                            <View style={{ width: wp(100), height: hp(35) }}>
                                <View style={{ flex: 1, margin: 15 }}>
                                    <MapView
                                        ref={(ref: MapView) => { this.mapView = ref }}
                                        provider={PROVIDER_GOOGLE}
                                        followsUserLocation={true}
                                        zoomEnabled={true}
                                        showsUserLocation={true}
                                        initialRegion={this.state.region}
                                        onMapReady={this.goToInitialLocation.bind(this)}
                                        style={[StyleSheet.absoluteFillObject, { height: hp(30) }]}>
                                        {/* {this.state.markers.map(marker => ( */}
                                        {/* <Marker
                                            coordinate={this.state.region}
                                            title={"marker.title"}
                                            description={"marker.description"}
                                        /> */}
                                        {/* ))} */}

                                        {/* <Polyline
                                            coordinates={[
                                                { latitude: -33.4614786, longitude: -70.6514591 }, // optional
                                                ...this.state.coords,
                                                // { latitude: final.latitude, longitude: final.longitude }, // optional
                                            ]}
                                            strokeWidth={4}
                                        /> */}
                                    </MapView>
                                    {/* <Image style={{ width: wp(92), height: hp(30) }} source={{ uri: "https://storage.googleapis.com/support-forums-api/attachment/thread-9014924-11470506657998028469.JPG" }} /> */}
                                </View>
                                <TouchableOpacity onPress={() => this.showMap()} style={{ flex: 1, marginVertical: -5, justifyContent: 'flex-end', width: wp(96), alignItems: 'flex-end', flexDirection: 'row' }}>
                                    <Text>Ver mapa</Text>
                                    <Icon name="location-on" color={colors.darkYellow} size={Size(55)} />
                                </TouchableOpacity>
                            </View>
                            <View style={{ width: wp(100), height: hp(20) }}>
                                <View style={{ flex: 1, marginLeft: 20, justifyContent: 'center' }}>
                                    <Text style={styles.bodyContainerScrollViewContainerInfoSectionText}>
                                        Cliente: <Text style={styles.bodyContainerScrollViewContainerInfoSectionText}>{order.orderNumber.client.name} </Text>
                                    </Text>
                                    <Text style={styles.bodyContainerScrollViewContainerInfoSectionText}>
                                        Nº de Bultos: <Text style={{ fontSize: RFValue(18), fontFamily: fonts.primaryFont }}> {order.bags.length} </Text>
                                    </Text>
                                    <Text style={styles.bodyContainerScrollViewContainerInfoSectionText}>
                                        Dirección: <Text style={styles.bodyContainerScrollViewContainerInfoSectionText}> {order.orderNumber.client.address} </Text>
                                    </Text>
                                    <Text style={styles.bodyContainerScrollViewContainerInfoSectionText}>
                                        Recibe un Tercero: <Text style={styles.bodyContainerScrollViewContainerInfoSectionText}></Text>
                                    </Text>
                                    <Text style={styles.bodyContainerScrollViewContainerInfoSectionText}>
                                        Comentarios: {"Comentario del cliente"}
                                    </Text>
                                </View>
                            </View>
                            <View style={{ width: wp(100), flex: 1 }}>
                                <View style={{ flex: 1, marginLeft: 20 }}>
                                    <Text>Bultos</Text>
                                    {
                                        order.bags.map((bag: any, index: number) => {
                                            return (
                                                <View key={index} style={{ height: hp(4), flexDirection: 'row', marginTop: 2 }}>
                                                    <Text key={index} style={styles.resumeBodyInfoText}>Nº {bag.bagNumber} </Text>
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
                                            }}>Entregar Bultos</Text>
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
                <Text>No hay data para mostrar 👨🏾‍💻</Text>
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
    home: state.home,
    bags: state.bags
})

// const mapDispatchToProps = {

// }

export default connect(mapStateToProps)(DetailAddres)


