import React, {Component} from 'react';
import {
    Text,
    View,
    FlatList,
    Dimensions,
    Button,
    StyleSheet,
    TouchableOpacity,
    Image,
    Platform, ImageBackground, Alert
} from 'react-native';

const {width, height} = Dimensions.get('window');
import timePicker from '../../../src/screens/Parent/ConnectedAccount/TimePicker/timePicker';
import SmartScreenBase from '../../base/SmartScreenBase';
import API from '../../API/APIConstant';
import axios from 'axios';
import {connect} from 'react-redux';
import {hoanthanh} from '../../redux/actions/hoanthanh';
import hoanthanhReducer from '../../redux/reducers/hoanthanhReducer';
import {TimeGiaoBai} from '../../redux/actions/TimeGiaoBai';
import ItemListWorkDelivered from '../ItemListWorkDelivered';
import StyleTeacher from '../ModalAlam/StyleTeacher';
import stylesApp from '../styleApp/stylesApp';
import {Calendar} from 'react-native-calendars';
import IconNext from 'react-native-vector-icons/MaterialIcons';
import {clearHT} from '../../redux/actions/clearHT';
import LoadingScreen from '../../screens/LoadingScreen';
import moment from 'moment';
import MyData from '../MyData';
import Header from '../Header';
import APIBase from '../../base/APIBase';

SmartScreenBase.baseSetup();
let lenght = 0;
let date = moment();

class hoanthanh1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Data: [],
            day: {},
            showCalander: false,
            time: '',
            checkday: 'from',
            markedDates: {},
            markedDatesFrom: [],
            markedDatesTo: [],
            dateSelectFrom: date.year().toString() + '-' + (date.month() + 1).toString() + '-' + date.date().toString(),
            dateSelectTo: date.year().toString() + '-' + (date.month() + 1).toString() + '-' + date.date().toString(),
            isCalendaTo: false,
            corlorTextfrom: '#fff',
            corlorTextTo: '#a5a5a5ff',
            ShowAlert: false,
            Message: '',
            ShowCheck: false,
            indexne: '',
            typeScreen: 'GV',
            data_answer: '',
            indexCalendar: 0,
            isLoading: false,
        };
    }

    componentDidMount(): void {
        const {data_answer, time} = this.props;
        this.setState({data_answer: data_answer});
        this.setState({day: time, dateSelectFrom: time.start, dateSelectTo: time.end});
        let arr = [];
        let markedDatesFr = [...this.state.markedDatesFrom];
        let markedDatesT = [...this.state.markedDatesTo];
        for (let i = 0; i < data_answer.length; i++) {
            let ob = {};
            ob.item = data_answer[i].item;
            ob.status = data_answer[i].status;
            ob.start = time.start;
            ob.end = time.end;
            ob.file = data_answer[i].file;
            let dateFrom = {};
            dateFrom[`${time.start}`] = {selected: true, selectedColor: '#000'};
            let dateTo = {};
            dateTo[`${time.end}`] = {selected: true, selectedColor: '#000'};
            markedDatesFr[i] = dateFrom;
            markedDatesT[i] = dateTo;
            arr.push(ob);
        }
        this.setState({markedDatesFrom: markedDatesFr});
        this.setState({markedDatesTo: markedDatesT});
        this.setState({Data: data_answer});
    }

    _onDayPress = day => {
        let date = {};
        date[`${day.dateString}`] = {selected: true, selectedColor: '#000'};
        let copyAr = [...this.state.Data];
        if (this.state.checkday === 'from') {
            copyAr[this.state.indexne].start = day.dateString;
            let markedDatesFr = [...this.state.markedDatesFrom];
            markedDatesFr[this.state.indexne] = date;
            this.setState({
                markedDatesFrom: markedDatesFr,
                dateSelectFrom: day.dateString,
            });
        } else {
            copyAr[this.state.indexne].end = day.dateString;
            let markedDatesT = [...this.state.markedDatesTo];
            markedDatesT[this.state.indexne] = date;
            this.setState({
                markedDatesTo: markedDatesT,
                dateSelectTo: day.dateString,
            });
        }
        this.setState({Data: copyAr});
        this.props.dispatch(hoanthanh(copyAr));
    };
    _onCheckDateFrom = () => {
        this.setState({
            checkday: 'from',
            isCalendaTo: false,
            markedDates: {},
            corlorTextfrom: '#fff',
            corlorTextTo: '#a5a5a5ff',
        });
    };
    _onCheckDateTo = () => {
        this.setState({
            checkday: 'to',
            isCalendaTo: true,
            markedDates: {},
            corlorTextTo: '#fff',
            corlorTextfrom: '#a5a5a5ff',
        });
    };
    _renderItem = ({item, index}) => {
        let dayFrom = '', dayTo = '';
        if (item.start) {
            dayFrom = item.start.split('-');
            dayFrom = dayFrom[2] + '/' + dayFrom[1] + '/' + dayFrom[0];
        }
        if (item.end) {
            dayTo = item.end.split('-');
            dayTo = dayTo[2] + '/' + dayTo[1] + '/' + dayTo[0];
        }
        return (
            item.status === true ?
                <View
                    style={{
                        flex: 1,
                    }}>
                    <View
                        style={{
                            width: '100%',
                            zIndex: 1,
                            height: SmartScreenBase.smPercenHeight * 15,
                            backgroundColor: '#fff',
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginVertical: SmartScreenBase.smPercenWidth * 2,
                            paddingHorizontal: SmartScreenBase.smPercenWidth * 2,
                            borderRadius: SmartScreenBase.smPercenWidth * 3,
                            justifyContent: 'center',
                        }}>
                        <View
                            style={{
                                width: '65%',
                                height: '100%',
                                marginLeft: 10,
                            }}>
                            <View
                                style={{
                                    width: '100%',
                                    height: '50%',
                                    justifyContent: 'space-around',
                                }}>
                                <Text
                                    style={{
                                        color: '#000',
                                        fontWeight: 'bold',
                                        fontSize: SmartScreenBase.smPercenWidth * 5,
                                        paddingTop: SmartScreenBase.smPercenHeight,
                                    }}>
                                    {item.item.lesson_name.length > 20 ? item.item.lesson_name.slice(0, 20) + '...' : item.item.lesson_name}
                                </Text>
                                <Text
                                    style={{
                                        color: '#000',
                                        fontWeight: '400',
                                        fontSize: SmartScreenBase.smPercenWidth * 4,
                                    }}>
                                    {item.item.unit_name.length > 20 ? item.item.unit_name.slice(0, 20) + '...' : item.item.unit_name}
                                </Text>
                            </View>
                            {
                                this.props.dataLogin.role === 'parent'
                                    ?
                                    null
                                    :
                                    <View style={{
                                        width: '100%',
                                        height: '20%',
                                    }}>
                                        {
                                            item.file === '' ?
                                                <Text style={{fontStyle: 'italic', color: '#FF6600'}}>chưa có nội dung
                                                    đính kèm</Text>
                                                :
                                                <Text style={{
                                                    fontStyle: 'italic',
                                                    color: '#008800',
                                                }}>{item.file.title.length < 30 ? item.file.title : item.file.title.slice(0, 30) + '...'}</Text>
                                        }

                                    </View>
                            }
                            <View
                                style={{
                                    width: '100%',
                                    height: '30%',
                                    alignItems: 'center',
                                    flexDirection: 'row',
                                }}>
                                <Text
                                    style={{
                                        color: '#113254',
                                        fontWeight: 'bold',
                                        fontSize: SmartScreenBase.smPercenWidth * 3.5,
                                    }}>
                                    {dayFrom}
                                </Text>
                                <Image
                                    source={{uri: 'gv_51'}}
                                    style={{
                                        width: SmartScreenBase.smBaseWidth * 38,
                                        height: SmartScreenBase.smBaseWidth * 40,
                                        resizeMode: 'contain',
                                        marginHorizontal: SmartScreenBase.smPercenWidth * 2,
                                    }}
                                />
                                <Text
                                    style={{
                                        color: '#113254',
                                        fontWeight: 'bold',
                                        fontSize: SmartScreenBase.smPercenWidth * 3.5,
                                    }}>
                                    {dayTo}
                                </Text>
                            </View>
                        </View>
                        {
                            this.props.dataLogin.role === 'parent'
                                ?
                                <View style={{
                                    width: '30%',
                                    height: '100%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({showCalander: !this.state.showCalander});
                                            this.setState({indexne: index});
                                        }}
                                        style={{
                                            width: '100%',
                                            height: '50%',
                                            alignItems: 'center',
                                            //paddingVertical: SmartScreenBase.smPercenWidth * 2,
                                            justifyContent: 'center',
                                        }}>
                                        <Image
                                            source={{uri: 'gv_29'}}
                                            style={{
                                                width: '30%',
                                                height: '100%',
                                                resizeMode: 'contain',
                                            }}
                                        />
                                    </TouchableOpacity>
                                </View>
                                :
                                <View style={{
                                    width: '30%',
                                    height: '100%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.props.navigation.navigate('lishAttach', {
                                                id: index,
                                            });
                                        }}
                                        style={{
                                            width: '100%',
                                            height: '50%',
                                            alignItems: 'center',
                                            //paddingVertical: SmartScreenBase.smPercenWidth * 2,
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <Image
                                            source={{uri: 'dinhkem'}}
                                            style={{
                                                width: '30%',
                                                height: '100%',
                                                resizeMode: 'contain',
                                            }}
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({showCalander: !this.state.showCalander});
                                            this.setState({indexne: index});
                                        }}
                                        style={{
                                            width: '100%',
                                            height: '50%',
                                            alignItems: 'center',
                                            //paddingVertical: SmartScreenBase.smPercenWidth * 2,
                                            justifyContent: 'center',
                                        }}>
                                        <Image
                                            source={{uri: 'gv_29'}}
                                            style={{
                                                width: '30%',
                                                height: '100%',
                                                resizeMode: 'contain',
                                            }}
                                        />
                                    </TouchableOpacity>
                                </View>
                        }

                    </View>
                </View>
                : null
        );

    };

    _complete = async () => {
        this.setState({isLoading: true});
        const url = API.baseurl + API.giveHomework;
        const headers = {
            'Content-Type': 'application/json',
            'jwt_token': APIBase.jwt_token,
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
        };
        let data = {};
        const {data_answer, time} = this.props;
        let data_exercise = [];
        data_answer.forEach((item) => {
            let dataV = {};
            dataV['exercise_id'] = item.item.lesson_id;
            dataV['resources_id'] = item.file.id;
            dataV['exercise_type'] = item.item.lesson_type;
            dataV['start_time'] = item.start;
            dataV['end_time'] = item.end;
            data_exercise.push(dataV);
        });
        if (this.props.dataLogin.role === 'parent') {
            data['students'] = JSON.stringify([this.props.student.id]);
        } else {
            if (time.student) {
                data['students'] = JSON.stringify(time.student);
            } else {
                data['students'] = JSON.stringify([MyData.UserLogin.id]);
            }
        }
        data['data_exercise'] = JSON.stringify(data_exercise);
        data['start_time'] = time.start;
        data['end_time'] = time.end;
        data['before_start_time'] = time.before_start_time ?? 0;
        data['class_id'] = this.props.dataLogin.role === 'parent' ? '' : APIBase.jwt_token;
        try {
            const res = await axios({method: 'post', url, headers, data});
            let dataReturn = res.data;
            if (dataReturn.status) {
                await this.props.dispatch(hoanthanh([]));
                Alert.alert('Thông báo', 'Giao bài tập thành công', [
                    {text: 'Đồng ý', style: 'cancel'}
                ]);
                if (this.props.dataLogin.role === 'parent') {
                    this.props.navigation.navigate('BottomParents');
                } else {
                    this.props.navigation.navigate('BottomTeacher');
                }
            } else {
                Alert.alert('Thông báo', dataReturn.msg, [
                    {text: 'Đồng ý', style: 'cancel'}
                ]);
            }
            this.setState({isLoading: false});
        } catch (error) {
            console.log('error.response.data', error.response.data);
            this.setState({isLoading: false});
            Alert.alert('Thông báo', error.response.data.msg, [
                {text: 'Đồng ý', style: 'cancel'}
            ]);
        }
    };

    render() {
        return (
            <ImageBackground source={{uri: 'imagebackground'}} style={{
                flex: 1,
                resizeMode: 'stretch',
            }}>
                {
                    this.state.isLoading
                        ?
                        <LoadingScreen/>
                        :
                        null
                }
                {/*<View*/}
                {/*    style={[*/}
                {/*        StyleTeacher.ViewHeader,*/}
                {/*        {justifyContent: 'space-between', alignItems: 'center'},*/}
                {/*    ]}>*/}
                {/*    <View*/}
                {/*        style={{*/}
                {/*            marginLeft: SmartScreenBase.smPercenWidth * 2,*/}
                {/*            flexDirection: 'row',*/}
                {/*            alignItems: 'center',*/}
                {/*            justifyContent: 'center',*/}
                {/*        }}*/}
                {/*    >*/}
                {/*        <TouchableOpacity*/}
                {/*            onPress={() => this.props.navigation.goBack()}*/}
                {/*            style={{*/}
                {/*                width: SmartScreenBase.smPercenWidth * 5,*/}
                {/*                height: SmartScreenBase.smPercenWidth * 5,*/}
                {/*            }}*/}
                {/*        >*/}
                {/*            <Image*/}
                {/*                style={{*/}
                {/*                    width: '100%',*/}
                {/*                    height: '100%',*/}
                {/*                }}*/}
                {/*                resizeMode={'contain'}*/}
                {/*                source={{uri: 'imageback'}}*/}
                {/*            />*/}
                {/*        </TouchableOpacity>*/}
                {/*        <Text*/}
                {/*            style={[*/}
                {/*                StyleTeacher.txt_Title,*/}
                {/*                {color: 'white', marginLeft: SmartScreenBase.smPercenWidth * 5},*/}
                {/*            ]}>*/}
                {/*            Giao bài*/}
                {/*        </Text>*/}
                {/*    </View>*/}
                {/*</View>*/}
                <Header showBack={true} title={'Giao bài'} goBack={() => this.props.navigation.goBack()}/>
                <View style={{
                    width: '100%',
                    height: '75%',
                    justifyContent: 'center',
                    paddingHorizontal: SmartScreenBase.smPercenWidth * 5,
                    marginTop: SmartScreenBase.smPercenHeight * 3,
                }}>
                    <FlatList
                        data={this.state.Data}
                        renderItem={this._renderItem}
                        keyExtractor={(item, index) => {
                            return item.toString() + index.toString();
                        }}
                        showsVerticalScrollIndicator={false}
                        extraData={this.state}
                    />
                </View>
                <View style={{
                    width: '100%',
                    height: '15%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                }}>
                    <View style={{width: '50%', justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity
                            onPress={() => {
                                this.props.navigation.goBack();
                            }}
                            style={[
                                stylesApp.Sty_Button,
                                {width: SmartScreenBase.smPercenWidth * 40},
                            ]}>
                            <Text style={stylesApp.Sty_Text_Button}>THÊM BÀI</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{width: '50%', justifyContent: 'center', alignItems: 'center'}}>
                        <TouchableOpacity
                            onPress={() => {
                                this._complete();
                            }}
                            style={[
                                stylesApp.Sty_Button,
                                {width: SmartScreenBase.smPercenWidth * 40},
                            ]}>
                            <Text style={stylesApp.Sty_Text_Button}>HOÀN TẤT</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {
                    this.state.showCalander === true ?
                        <View style={{
                            width: '100%',
                            height: '100%',
                            backgroundColor: '#00000060',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'absolute',
                            zIndex: 100,
                        }}>
                            <View
                                style={{
                                    width: '90%',
                                    height: '68%',
                                    alignItems: 'center',
                                    backgroundColor: '#fff',
                                    borderRadius: SmartScreenBase.smPercenWidth * 3,
                                }}>
                                <View
                                    style={{
                                        width: '100%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginTop: '10%',
                                        position: 'absolute',
                                        bottom: SmartScreenBase.smPercenHeight * 5,
                                    }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this.setState({showCalander: false});
                                        }}
                                        style={{
                                            height: SmartScreenBase.smPercenHeight * 5,
                                            width: SmartScreenBase.smPercenWidth * 50,
                                            paddingHorizontal: 20,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: '#000022',
                                            borderRadius: width * 35,
                                        }}>
                                        <Text style={{fontSize: 20, color: '#FFF', fontWeight: 'bold'}}>
                                            Đóng
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                <View
                                    style={{
                                        width: '90%',
                                        height: '8%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginTop: SmartScreenBase.smPercenHeight * 3,
                                    }}>
                                    <View
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            backgroundColor: '#017CA4',
                                            flexDirection: 'row',
                                            borderRadius: 10,
                                        }}>
                                        <TouchableOpacity
                                            style={{
                                                height: '100%',
                                                width: '45%',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                            onPress={this._onCheckDateFrom}>
                                            <Text style={{color: this.state.corlorTextfrom, fontSize: 20}}>
                                                BẮT ĐẦU
                                            </Text>
                                        </TouchableOpacity>
                                        <View
                                            style={{
                                                height: '100%',
                                                width: '10%',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                            onPress={this._onCheckDateTo}>
                                            <IconNext name="navigate-next" color="#a5a5a5ff" size={30}/>
                                        </View>
                                        <TouchableOpacity
                                            style={{
                                                height: '100%',
                                                width: '45%',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                            onPress={this._onCheckDateTo}>
                                            <Text style={{color: this.state.corlorTextTo, fontSize: 20}}>
                                                KẾT THÚC
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View
                                    style={{
                                        width: '90%',
                                        height: '60%',
                                        backgroundColor: '#FFF',
                                        alignItems: 'center',
                                    }}>
                                    <View style={{width: '90%', height: '70%', paddingTop: '5%'}}>
                                        <Calendar
                                            markedDates={this.state.checkday === 'from' ? this.state.markedDatesFrom[this.state.indexne] : this.state.markedDatesTo[this.state.indexne]}
                                            theme={{
                                                arrowColor: '#000',
                                                todayTextColor: 'blue',
                                                selectedDayTextColor: '#FFF',
                                                monthTextColor: '#000',
                                                textMonthFontSize: 14,
                                                textDayFontSize: 15,
                                                textDayHeaderFontSize: 18,
                                            }}
                                            onDayPress={this._onDayPress}
                                        />
                                    </View>
                                </View>
                            </View>
                        </View>
                        : null
                }
            </ImageBackground>
        );
    }
}

function mapStateToProps(state) {
    return {
        data_answer: state.hoanthanhReducer.data_answer,
        time: state.timegiaobai.data_answer,
        dataLogin: state.AuthStackReducer.dataLogin,
        student: state.ListStudentReducer.currentStudent,
    };
}

export default connect(mapStateToProps)(hoanthanh1);

