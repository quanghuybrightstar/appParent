import React, {PureComponent} from 'react';
import {Image, Text, TouchableOpacity, View, ScrollView, ImageBackground} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import SmartScreenBase from '../../../base/SmartScreenBase';
import Calendar from 'react-native-calendars/src/calendar';
import {LocaleConfig} from 'react-native-calendars';
import moment from 'moment';
import SelectPicker from '../../../component/SelectPicker';

const nameOfDay = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];

LocaleConfig.locales['fr'] = {
    monthNames: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
    monthNamesShort: ['Janv.', 'Févr.', 'Mars', 'Avril', 'Mai', 'Juin', 'Juil.', 'Août', 'Sept.', 'Oct.', 'Nov.', 'Déc.'],
    dayNames: ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'],
    dayNamesShort: ['CN', 'T.2', 'T.3', 'T.4', 'T.5', 'T.6', 'T.7'],
    today: 'Aujourd\'hui',
};
LocaleConfig.defaultLocale = 'fr';
let date = moment();
let convertHour = date.hour() % 12 === 0 ? 12 : date.hour() % 12;
let timeNow = {
    day: nameOfDay[date.day()],
    date: date.date().toString().length === 1 ? '0' + date.date() : date.date(),
    month: date.month() + 1,
    year: date.year(),
    hours: convertHour.toString().length === 1 ? '0' + convertHour : convertHour,
    minutes: date.minute().toString().length === 1 ? '0' + date.minute() : date.minute(),
    timeOfDay: date.hour() >= 12 ? 'PM' : 'AM',
};

class PickDateTime extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            timeStart: timeNow,
            timeEnd: {
                day: '',
                date: '',
                month: '',
                year: '',
                hours: '',
                minutes: '',
                timeOfDay: '',
            },
            startDate: '',
            endDate: '',
            month: date.month() + 1,
            year: date.year(),
            listYear: this.range(date.year() + 50, date.year() - 50, -1),
            chooseTimeStart: true,
        };
    }

    getDaysInMonth = (month, year) => {
        const date = new Date(year, month, 1);
        const days = [];
        while (date.getMonth() === month) {
            days.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        return days;
    };

    range = (start, stop, step) => Array.from({length: (stop - start) / step + 1}, (_, i) => start + (i * step));

    _checkTimeEnd = () => {
        let checkTimeEnd = true;
        const {timeEnd} = this.state;
        for (let x in timeEnd) {
            if (timeEnd[x] === '') {
                checkTimeEnd = false;
            }
        }
        return checkTimeEnd;
    };

    _toNextMonth = () => {
        const {month, year} = this.state;
        if (month === 12) {
            this.setState({
                month: 1,
                year: year + 1,
            });
        } else {
            this.setState({month: month + 1});
        }
    };

    _toPrevMonth = () => {
        const {month, year} = this.state;
        if (month === 1) {
            this.setState({
                month: 12,
                year: year - 1,
            });
        } else {
            this.setState({month: month - 1});
        }
    };

    setStartDate = (date) => {
        const {timeStart, chooseTimeStart, timeEnd} = this.state;
        if (chooseTimeStart) {
            this.setState({
                startDate: date.dateString,
                timeStart: {
                    ...timeStart,
                    date: date.day.toString().length === 1 ? '0' + date.day : date.day,
                    month: date.month,
                    year: date.year,
                    day: nameOfDay[this.getDaysInMonth(date.month - 1, date.year).find(item => {
                        return item.getDate() === date.day;
                    }).getDay()],
                },
            });
            if (timeEnd.year !== '' && timeEnd.month !== '' && timeEnd.date !== '') {
                if (new Date(timeEnd.year, timeEnd.month, timeEnd.date) < new Date(date.year, date.month, date.day)) {
                    this.setState({
                        endDate: '',
                        timeEnd: {
                            ...timeEnd,
                            date: '',
                            month: '',
                            year: '',
                            day: '',
                        },
                    });
                }
            }
        } else {
            this.setState({
                endDate: date.dateString,
                timeEnd: {
                    ...timeEnd,
                    date: date.day.toString().length === 1 ? '0' + date.day : date.day,
                    month: date.month,
                    year: date.year,
                    day: nameOfDay[this.getDaysInMonth(date.month - 1, date.year).find(item => {
                        return item.getDate() === date.day;
                    }).getDay()],
                },
            });
            this._checkTimeEnd();
        }
    };

    setHourStart = (hours) => {
        const {timeStart, chooseTimeStart, timeEnd} = this.state;
        if (chooseTimeStart) {
            this.setState({
                timeStart: {
                    ...timeStart,
                    time: null,
                    hours,
                },
            });
        } else {
            this.setState({
                timeEnd: {
                    ...timeEnd,
                    time: null,
                    hours,
                },
            });
            this._checkTimeEnd();
        }
    };

    setMinuteStart = (minutes) => {
        console.log(minutes);
        const {timeStart, chooseTimeStart, timeEnd} = this.state;
        if (chooseTimeStart) {
            this.setState({
                timeStart: {
                    ...timeStart,
                    time: null,
                    minutes,
                },
            });
        } else {
            this.setState({
                timeEnd: {
                    ...timeEnd,
                    time: null,
                    minutes,
                },
            });
            this._checkTimeEnd();
        }
    };

    setTimeOfDayStart = (timeOfDay) => {
        const {timeStart, chooseTimeStart, timeEnd} = this.state;
        if (chooseTimeStart) {
            this.setState({
                timeStart: {
                    ...timeStart,
                    time: null,
                    timeOfDay,
                },
            });
        } else {
            this.setState({
                timeEnd: {
                    ...timeEnd,
                    time: null,
                    timeOfDay,
                },
            });
            this._checkTimeEnd();
        }
    };

    chooseSetTimeStart = () => {
        const {timeStart} = this.state;
        this.setState({
            chooseTimeStart: true,
            month: timeStart.month,
            year: timeStart.year,
        });
    };

    chooseSetTimeEnd = () => {
        const {timeEnd, timeStart} = this.state;
        this.setState({
            chooseTimeStart: false,
            month: timeEnd.month ? timeEnd.month : timeStart.month,
            year: timeEnd.year ? timeEnd.year : timeStart.year,
        });
    };

    setMinDateCalendar = () => {
        const {chooseTimeStart, timeStart} = this.state;
        let minDate;
        if (chooseTimeStart) {
            if (timeNow.month.toString().length === 1) {
                minDate = `${timeNow.year}-0${timeNow.month}-${timeNow.date}`;
            } else {
                minDate = `${timeNow.year}-${timeNow.month}-${timeNow.date}`;
            }
        } else {
            if (timeStart.month.toString().length === 1) {
                minDate = `${timeStart.year}-0${timeStart.month}-${timeStart.date}`;
            } else {
                minDate = `${timeStart.year}-${timeStart.month}-${timeStart.date}`;
            }
        }
        return minDate;
    };

    _goBack = () => {
        const {params} = this.props.navigation.state;
        const {timeStart, timeEnd} = this.state;
        params.setTime(timeStart, timeEnd);
        this.props.navigation.goBack();
    };

    render() {
        console.log(timeNow.month);
        const {timeStart, listYear, month, year, startDate, chooseTimeStart, endDate, timeEnd} = this.state;
        return (
            <ImageBackground
                style={{backgroundColor: '#ffffff', flex: 1}}
                source={{uri: 'imagebackground'}}
            >
                <View style={{
                    width: SmartScreenBase.smPercenWidth * 100,
                    height: SmartScreenBase.smPercenWidth * 12,
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                    <TouchableOpacity
                        style={{
                            width: SmartScreenBase.smPercenWidth * 10,
                            height: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Image style={{
                            width: SmartScreenBase.smPercenWidth * 5,
                            height: SmartScreenBase.smPercenWidth * 5,
                        }}
                               resizeMode={'contain'}
                               source={{uri: 'imageback'}}/>
                    </TouchableOpacity>
                    <Text style={{
                        color: 'white',
                        marginLeft: SmartScreenBase.smPercenWidth * 5,
                        fontWeight: '800',
                        fontSize: SmartScreenBase.smPercenWidth * 5,
                    }}>Giao bài</Text>
                </View>

                <View style={{flex: 1, padding: SmartScreenBase.smPercenWidth * 5, backgroundColor: '#fff'}}>
                    <View style={{
                        backgroundColor: 'rgba(29,100,242,0.95)',
                        width: '100%',
                        flexDirection: 'row',
                        paddingVertical: SmartScreenBase.smPercenWidth * 3,
                        justifyContent: 'space-around',
                        borderRadius: SmartScreenBase.smPercenWidth * 3,
                    }}>
                        <TouchableOpacity
                            style={{flex: 1, alignItems: 'center'}}
                            onPress={this.chooseSetTimeStart}
                        >
                            <Text style={{
                                color: chooseTimeStart ? '#fff' : '#090519',
                                fontSize: SmartScreenBase.smPercenWidth * 4,
                            }}>B.ĐẦU</Text>
                        </TouchableOpacity>

                        <Image style={{
                            width: SmartScreenBase.smPercenWidth * 5,
                            height: SmartScreenBase.smPercenWidth * 5,
                            transform: [{rotate: '180deg'}],
                            tintColor: '#090519',
                        }}
                               resizeMode={'contain'}
                               source={{uri: 'imageback'}}/>
                        <TouchableOpacity
                            style={{flex: 1, alignItems: 'center'}}
                            onPress={this.chooseSetTimeEnd}
                        >
                            <Text style={{
                                color: chooseTimeStart ? '#090519' : '#fff',
                                fontSize: SmartScreenBase.smPercenWidth * 4,
                            }}>K.THÚC</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={{
                        marginTop: SmartScreenBase.smPercenWidth * 5,
                        fontWeight: '700',
                        fontSize: SmartScreenBase.smPercenWidth * 4,
                    }}>
                        {
                            chooseTimeStart ?
                                `${timeStart.day}, ${timeStart.date} TH${timeStart.month} ${timeStart.year}, ${timeStart.hours}:${timeStart.minutes} ${timeStart.timeOfDay}`
                                :
                                this._checkTimeEnd() ?
                                    `${timeEnd.day}, ${timeEnd.date} TH${timeEnd.month} ${timeEnd.year}, ${timeEnd.hours}:${timeEnd.minutes} ${timeEnd.timeOfDay}`
                                    :
                                    null
                        }
                    </Text>

                    <View style={{width: '100%', height: SmartScreenBase.smPercenHeight * 40}}>
                        <View style={{
                            position: 'absolute', flexDirection: 'row',
                            justifyContent: 'flex-end',
                            alignItems: 'center', top: 0, zIndex: 1000,
                            width: '100%',
                            marginTop: SmartScreenBase.smPercenWidth * 3,
                            paddingVertical: SmartScreenBase.smPercenWidth,
                        }}>
                            <TouchableOpacity
                                style={{
                                    width: SmartScreenBase.smPercenWidth * 4,
                                    height: SmartScreenBase.smPercenWidth * 10,
                                    justifyContent: 'center',
                                }}
                                onPress={this._toPrevMonth}
                            >
                                <Image style={{
                                    width: SmartScreenBase.smPercenWidth * 3,
                                    height: SmartScreenBase.smPercenWidth * 3,
                                    tintColor: '#949494',
                                }}
                                       resizeMode={'contain'}
                                       source={{uri: 'imageback'}}
                                />
                            </TouchableOpacity>
                            <View style={{
                                justifyContent: 'center',
                                marginLeft: SmartScreenBase.smPercenWidth * 5,
                                marginRight: SmartScreenBase.smPercenWidth * 5,
                                height: SmartScreenBase.smPercenWidth * 10,
                            }}>
                                <Text style={{
                                    color: '#7b7b7b',
                                }}>{`Th${month}`}</Text>
                            </View>


                            <TouchableOpacity
                                style={{
                                    width: SmartScreenBase.smPercenWidth * 4,
                                    height: SmartScreenBase.smPercenWidth * 10,
                                    justifyContent: 'center',
                                }}
                                onPress={this._toNextMonth}
                            >
                                <Image style={{
                                    width: SmartScreenBase.smPercenWidth * 3,
                                    height: SmartScreenBase.smPercenWidth * 3,
                                    transform: [{rotate: '180deg'}],
                                    tintColor: '#949494',
                                }}
                                       resizeMode={'contain'}
                                       source={{uri: 'imageback'}}
                                />
                            </TouchableOpacity>

                            <Picker
                                style={{
                                    height: SmartScreenBase.smPercenWidth * 10,
                                    width: SmartScreenBase.smPercenWidth * 25,
                                    color: '#7b7b7b',
                                    marginLeft: SmartScreenBase.smPercenWidth * 4,
                                }}
                                mode={'dropdown'}
                                selectedValue={year.toString()}
                                onValueChange={(year) => this.setState({year})}
                            >
                                {
                                    listYear.map(item => {
                                        return (
                                            <Picker.Item label={item.toString()} value={item.toString()}
                                                         color={'#7b7b7b'}
                                            />
                                        );
                                    })
                                }
                            </Picker>
                        </View>

                        <Calendar
                            current={
                                new Date((new Date().setMonth(month - 1))).setFullYear(year)
                            }
                            minDate={this.setMinDateCalendar()}
                            onDayPress={this.setStartDate}
                            onDayLongPress={this.setStartDate}
                            markedDates={{[chooseTimeStart ? startDate : endDate]: {selected: true}}}
                            firstDay={1}
                            hideArrows={true}
                            theme={{
                                backgroundColor: '#ffffff',
                                calendarBackground: '#ffffff',
                                selectedDayBackgroundColor: '#092534',
                                selectedDayTextColor: '#ffffff',
                                todayTextColor: '#00adf5',
                                dayTextColor: '#2d4150',
                                arrowColor: 'orange',
                                disabledArrowColor: '#d9e1e8',
                                monthTextColor: '#fff',
                                indicatorColor: 'blue',
                                textDayFontWeight: '300',
                                textDayHeaderFontSize: 16,
                                'stylesheet.calendar.main': {
                                    // monthView: {
                                    //     height: SmartScreenBase.smPercenHeight * 10
                                    //
                                    // },
                                    week: {
                                        marginTop: 0,
                                        marginBottom: 0,
                                        width: '100%',
                                        flexWrap: 'wrap',
                                        flexDirection: 'row',
                                        justifyContent: 'space-around',
                                        height: SmartScreenBase.smPercenHeight * 4.5,
                                    },
                                },
                            }}
                        />
                    </View>

                    <View style={{
                        borderWidth: 1,
                        borderColor: '#c2c2c2',
                        borderRadius: SmartScreenBase.smPercenWidth * 2,
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        alignItems: 'center',
                        marginTop: SmartScreenBase.smPercenHeight * 3
                    }}>
                        <SelectPicker
                            onValueChange={this.setHourStart}
                            data={
                                this.range(1, 12, 1).map(item => {
                                    return item.toString().length === 1 ? 0 + item.toString() : item.toString();
                                })
                            }
                            wrapHeight={SmartScreenBase.smPercenHeight * 20}
                            itemHeight={SmartScreenBase.smPercenHeight * 10}
                            fontColor={'#010E1C'}
                            fontSizeValue={SmartScreenBase.smPercenWidth * 19}
                            fontSize={SmartScreenBase.smPercenWidth * 10}
                            defaultValue={chooseTimeStart || !timeEnd.hours ? timeStart.hours.toString() : timeEnd.hours.toString()}
                        />
                        <Text style={{
                            color: '#010E1C',
                            fontWeight: 'bold',
                            fontSize: SmartScreenBase.smPercenWidth * 15,
                        }}>
                            :
                        </Text>

                        <SelectPicker
                            onValueChange={this.setMinuteStart}
                            data={
                                this.range(0, 59, 1).map(item => {
                                    return item.toString().length === 1 ? 0 + item.toString() : item.toString();
                                })
                            }
                            wrapHeight={SmartScreenBase.smPercenHeight * 20}
                            itemHeight={SmartScreenBase.smPercenHeight * 10}
                            fontColor={'#010E1C'}
                            fontSizeValue={SmartScreenBase.smPercenWidth * 19}
                            fontSize={SmartScreenBase.smPercenWidth * 10}
                            defaultValue={chooseTimeStart || !timeEnd.minutes ? timeStart.minutes.toString() : timeEnd.minutes.toString()}
                        />

                        <SelectPicker
                            onValueChange={this.setTimeOfDayStart}
                            data={['AM', 'PM']}
                            wrapHeight={SmartScreenBase.smPercenHeight * 20}
                            itemHeight={SmartScreenBase.smPercenHeight * 6.5}
                            fontColor={'#010E1C'}
                            fontSizeValue={SmartScreenBase.smPercenWidth * 6}
                            fontSize={SmartScreenBase.smPercenWidth * 6}
                            defaultValue={chooseTimeStart || !timeEnd.timeOfDay ? timeStart.timeOfDay.toString() : timeEnd.timeOfDay.toString()}
                        />
                    </View>

                    <View style={{alignItems: 'center', marginTop: SmartScreenBase.smPercenHeight * 4}}>
                        <TouchableOpacity
                            style={{
                                paddingHorizontal: SmartScreenBase.smPercenWidth * 15,
                                backgroundColor: '#00283A',
                                paddingVertical: SmartScreenBase.smPercenHeight,
                                borderRadius: SmartScreenBase.smPercenWidth * 8,
                            }}
                            disabled={!this._checkTimeEnd()}
                            onPress={this._goBack}
                        >
                            <Text style={{
                                color: '#fff',
                                fontWeight: 'bold',
                                fontSize: SmartScreenBase.smPercenWidth * 5,
                            }}>Tiếp tục</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

export default PickDateTime;
