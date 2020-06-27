import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import moment from 'moment';
import { RFValue } from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import fonts from '../assets/Fonts';




interface CountDownProps {
    date: string,
}


export default function CountDown(props: CountDownProps) {
    // let date = moment(props.date, "YYYY-MM-DD HH:mm:ss")
    // let initMinute = date.minutes()
    // let finishMinute = date.add(15, "minute").minute()
    // let minute = (initMinute - initMinute)
    // console.log(date.add(15, "minute").minute());
    const [minutes, setMinutes] = useState(14)
    const [seconds, setSeconds] = useState(59)

    useEffect(() => {
        let timer = 0
        if (seconds > 0 && minutes >= 0) {
            timer = setInterval(() => setSeconds(seconds - 1), 1000);
        }
        if (timer == 0 && minutes >= 0) {
            setSeconds(60)
            setMinutes(minutes - 1)
        }

        return () => clearInterval(timer);
    }, [seconds]);

    return (
        <View>
            <Text style={{ fontSize: RFValue(15), fontFamily: fonts.primaryFont }}>{"Tiempo restante: " + minutes + " : " + seconds + "s"}</Text>
        </View>
    )
}
