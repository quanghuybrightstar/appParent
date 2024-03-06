import React, { useEffect, useState } from 'react';
import {
    Modal,
    View,
    TouchableOpacity,
    Text,
    Dimensions,
} from 'react-native';
import styles from './styles';
import DatePicker from 'react-native-date-picker'
const { width, height } = Dimensions.get('window')
const modalTimePicker = (props) => {
    const [date, setDate] = useState()
    useEffect(() => {
        if (props.day.length) {
            _changeDate(props.day)
        }
    }, [props.day])
    const _changeDate = (value) => {
        let dateC = new Date();
        let dataDay = value.split(' ')
        let convertDay = dataDay[0].split('-');
        let convertTime = dataDay[1].split(':')
        dateC.setDate(convertDay[2])
        dateC.setMonth(convertDay[1] - 1);
        dateC.setFullYear(convertDay[0]);
        dateC.setHours(convertTime[0]);
        dateC.setMinutes(convertTime[1]);
        dateC.setSeconds(convertTime[2]);
        console.log('dateC', convertDay)
        setDate(dateC)

    }

    const _saveData = () => {
        if (props.status == 'start') {
            props.saveDayStart(date);
        } else {
            props.saveDayEnd(date);
        }
        props.onClose(false)
    }
    return (
        <Modal visible={props.visible} animationType={'slide'} transparent={true}>
            <View style={styles.container}>
                <View style={{ backgroundColor: '#fff', width: '100%', borderRadius: 15 }}>
                    <View style={{ height: height / 3, justifyContent: 'center', marginTop: height / 20, paddingHorizontal: 20 }}>
                        <Text style={{ fontWeight: '700', fontSize: 24, width: '100%' }}>Chọn ngày</Text>
                        <DatePicker
                            date={date}
                            onDateChange={setDate}
                            mode={'date'}
                            locale={'vi'}
                            style={{ width: width / 1.5 }}
                        />
                    </View>
                    <View style={{ height: height / 3, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20 }}>
                        <Text style={{ fontWeight: '700', fontSize: 24, width: '100%' }}>Chọn giờ</Text>
                        <DatePicker
                            date={date}
                            onDateChange={setDate}
                            mode={'time'}
                            is24hourSource={'locale'}
                            locale={'en'}
                            // value={time}
                            style={{ height: 150, }}
                        />
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 50 }}>
                        <TouchableOpacity style={{
                            width: '40%',
                            height: height / 15,
                            backgroundColor: '#00283A',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 25
                        }}
                            onPress={() => { props.onClose(false) }}
                        >
                            <Text style={{
                                fontWeight: 'bold',
                                color: '#fff',
                                fontSize: 16
                            }}>HUỶ BỎ</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{
                            width: '40%',
                            height: height / 15,
                            backgroundColor: '#00283A',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 25
                        }}
                            onPress={_saveData}
                        >
                            <Text style={{
                                fontWeight: 'bold',
                                color: '#fff',
                                fontSize: 16
                            }}>LƯU THAY ĐỔI</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal >
    )
}
export default modalTimePicker