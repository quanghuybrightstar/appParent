import React, { useEffect, useState } from 'react';
import {
    Modal,
    View,
    TouchableOpacity,
    Text,
    Dimensions,
} from 'react-native';
import { Calendar, CalendarList, LocaleConfig, Agenda } from 'react-native-calendars';
import styles from './style';
import SmartScreenBase from '../../base/SmartScreenBase';
const { width, height } = Dimensions.get('window')
const modalCalendars = (props) => {
    const [string, setSting] = useState('');
    const [html, setHtml] = useState(false);
    const [baseUrl, setBaseUrl] = useState('');
    const [visible, setVisible] = useState(props.visible);
    const [selectDate, setSelectDate] = useState('2020-09-21')
    // const [selectDay, setSelectDay] = useState(props.day)
    const [day, setDay] = useState(props.day)
    LocaleConfig.locales['fr'] = {
        monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
        monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
        dayNames: ['Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.', 'Sun.'],
        dayNamesShort: ['Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.', 'Sun.'],
        // today: 'hai\'hai'
    };
    // const {day} = props;
    // // console.log(day)
    useEffect(() => {
        let oj = {};
        oj[props.day] = { selected: true, }
        setSelectDate(oj);
        setDay(props.day)
    }, [props.day])
    LocaleConfig.defaultLocale = 'fr';
    const _changeDay = (time) => {
        let oj = {}
        oj[time.dateString] = { selected: true, }
        setSelectDate(oj)
        setDay(time.dateString)
    }
    _save = () => {
        if (props.status == "start") {
            props.saveDayStart(day)
        } else {
            props.saveDayEnd(day)
        }
    }
    _onClose = () => {
        props.onClose(false)
    }
    return (
        <Modal visible={props.visible} animationType={'slide'} transparent={true}>
            <View style={styles.container}>
                <View style={{ width: '100%', height: height / 1.5, backgroundColor: '#fff', borderRadius: 25, justifyContent: 'center', alignItems: 'center' }}>
                    <Calendar
                        style={{ width: width / 1.5 }}
                        current={props.day}
                        minDate={'1989-05-30'}
                        maxDate={'2090-05-30'}
                        onDayPress={(day) => { _changeDay(day) }}
                        onDayLongPress={(day) => { _changeDay(day) }}
                        monthFormat={'yyyy MM'}
                        // enableSwipeMonths={true}
                        // onMonthChange={(month) => { console.log('month changed', month) }}
                        markedDates={selectDate}
                    />
                    <View style={{ width: '100%', paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
                        <TouchableOpacity style={{
                            width: '45%',
                            height: SmartScreenBase.smPercenWidth * 10,
                            backgroundColor: '#00283A',
                            borderRadius: SmartScreenBase.smPercenWidth * 5,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                            onPress={_onClose}
                        >
                            <Text style={{
                                fontWeight: 'bold',
                                color: '#fff',
                                marginLeft: SmartScreenBase.smPercenWidth * 2,
                                fontSize: SmartScreenBase.smPercenWidth * 4,
                            }}>Huỷ bỏ</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            width: '45%',
                            height: SmartScreenBase.smPercenWidth * 10,
                            backgroundColor: '#00283A',
                            borderRadius: SmartScreenBase.smPercenWidth * 5,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                            onPress={_save}
                        >
                            <Text style={{
                                fontWeight: 'bold',
                                color: '#fff',
                                marginLeft: SmartScreenBase.smPercenWidth * 2,
                                fontSize: SmartScreenBase.smPercenWidth * 4,
                            }}>Lưu thay đổi</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal >
    )
}
export default modalCalendars