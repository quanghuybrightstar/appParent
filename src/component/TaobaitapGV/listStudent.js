import React, {PureComponent} from 'react';
import {
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Alert,
    Keyboard,
    Dimensions,
    FlatList, Image, ImageBackground
} from 'react-native';
import Iconcheck1 from 'react-native-vector-icons/AntDesign';
import {connect} from 'react-redux';
import SmartScreenBase from '../base/SmartScreenBase';
import StyleLesson from '../learn/Lesson/StyleLesson';
import stylesApp from '../styleApp/stylesApp';
import Icon from 'react-native-vector-icons/FontAwesome';
import API from '../../API/APIConstant';
import axios from 'axios';
import IconNext from 'react-native-vector-icons/MaterialIcons';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import {TimeGiaoBai} from '../../redux/actions/TimeGiaoBai';
import Header from '../Header';
import moment from 'moment';
import {hoanthanh} from '../../redux/actions/hoanthanh';

const {width, height} = Dimensions.get('window');
let date = moment();
const smartScreenWidth = SmartScreenBase.smPercenWidth;
let c = 0;
LocaleConfig.locales.en = LocaleConfig.locales[''];
LocaleConfig.defaultLocale = 'en';

class listStudent extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            time: '',
            checkday: 'from',
            showCalander: false,
            markedDates: {},
            markedDatesFrom: {},
            markedDatesTo: {},
            dateSelectFrom: '',
            dateSelectTo: '',
            isCalendaTo: false,
            corlorTextfrom: '#fff',
            corlorTextTo: '#000',
            ShowAlert: false,
            Message: '',
            choose: true,
            ShowCheck: false,
            data: [],
            Data: [],
            day: {},
            indexne: '',
            allCheck: false,
        };
    }

    componentDidMount() {
        const {data_answer} = this.props;
        this.props.dispatch(hoanthanh([]));
        const classID = this.props.navigation.getParam('class_id');
        const url = API.baseurl+'api_class/students?class_id=' + classID;
        const header = {
            'Content-Type': 'application/json',
            jwt_token:
                'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImFkbWluIiwidGltZV9sb2dpbiI6MTU3ODkwNzQyM30.CFZyO9a-qBmyI8Q25AqGNd1nxWn1SO5TMC_yBxjgWCA',
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            Authorization: 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
        };
        axios({method: 'get', url: url, headers: header})
            .then((response) => {
                let copy = response.data.data.splice('');
                for (let i = 0; i < copy.length; i++) {
                    copy[i].typeCheck = false;
                }
                this.setState({data: copy});
            })
            .catch((error) => {
                console.log(error);
                if (error.message === 'Network Error') {
                    Alert.alert('Thông Báo', 'Vui lòng kiểm tra kết nối Internet', [
                        {text: 'Đồng ý', style: 'cancel'}
                    ]);
                }
                this.setState({isLoading: false});
            });
    }

    _chooseStudent = (index) => {
        let copy = [...this.state.data];
        copy[index].typeCheck = !copy[index].typeCheck;
        if (copy[index].typeCheck) {
            c++;
        } else {
            c--;
        }
        if (c === copy.length) {
            this.setState({allCheck: true});
        } else {
            this.setState({allCheck: false});
        }
        this.setState({data: copy});
    };

    _onShow = () => {
        this.setState({ShowCheck: !this.state.ShowCheck});
    };
    _Render_Item = ({item, index}) => {
        return (
            <View style={{marginBottom: 10, flexDirection: 'row', padding: SmartScreenBase.smPercenWidth}}>
                <View style={{width: '80%', height: '100%'}}>
                    <Text style={{color: '#FFF'}}>{item.fullname}</Text>
                </View>
                <View style={{width: '20%', height: '100%', alignItems: 'flex-end'}}>
                    <TouchableOpacity
                        onPress={() => this._chooseStudent(index)}
                        style={{
                            width: SmartScreenBase.smPercenHeight * 3,
                            height: SmartScreenBase.smPercenHeight * 3,
                            borderRadius: 3,
                            borderWidth: 1,
                            borderColor: '#F08B01',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        {item.typeCheck === true ? (
                            <Iconcheck1 name="check" color="#fff" size={SmartScreenBase.smPercenHeight * 3}/>
                        ) : null}
                    </TouchableOpacity>
                </View>
            </View>
        );

    };
    _onCheckDateFrom = () => {
        this.setState({
            checkday: 'from',
            isCalendaTo: false,
            corlorTextfrom: '#fff',
            corlorTextTo: '#000',
            choose: true,
        });
    };
    _onCheckDateTo = () => {
        this.setState({
            checkday: 'to',
            isCalendaTo: true,
            corlorTextTo: '#fff',
            corlorTextfrom: '#000',
            choose: false,
        });
    };
    _onDayPress = (day) => {
        // console.log('day', day);
        // let date = {};
        // date[`${day.dateString}`] = {selected: true, selectedColor: '#000'};
        // if (this.state.choose) {
        //     this.setState({dateSelectFrom: day.dateString});
        //     this.setState({markedDatesFrom: date});
        // } else {
        //     this.setState({markedDatesTo: date});
        //     this.setState({dateSelectTo: day.dateString});
        // }
        let date = {};
        date[`${day.dateString}`] = {selected: true, selectedColor: '#000'};
        if (!this.state.choose) {
            if (this.state.dateSelectFrom) {
                if (day.dateString < this.state.dateSelectFrom) {
                    Alert.alert('Thông báo', 'Ngày kết thúc không được nhỏ hơn ngày bắt đầu! Vui lòng chọn lại.', [
                        {text: 'Đồng ý', style: 'cancel'}
                    ]);
                    return false;
                }
            }
            this.setState({markedDatesTo: date});
            this.setState({dateSelectTo: day.dateString});
        } else {
            if (this.state.dateSelectTo) {
                if (day.dateString > this.state.dateSelectTo) {
                    Alert.alert('Thông báo', 'Ngày bắt đầu không được lớn hơn ngày kết thúc! Vui lòng chọn lại.', [
                        {text: 'Đồng ý', style: 'cancel'}
                    ]);
                    return false;
                }
            }
            this.setState({
                markedDatesFrom: date,
                dateSelectFrom: day.dateString,
                checkday: 'to',
                corlorTextTo: '#fff',
                corlorTextfrom: '#000',
                isCalendaTo: true,
                choose: false
            });
        }
        // this.setState({showCalander:false})
    };
    _onCheckall = () => {
        let copy = [...this.state.data];
        for (let i = 0; i < copy.length; i++) {
            copy[i].typeCheck = this.state.allCheck ? false : true;
        }
        c = this.state.allCheck ? 0 : copy.length;
        this.setState({allCheck: !this.state.allCheck});
        this.setState({data: copy});
    };

    _convertDateTime = (time) => {
        let timeS = time.split('-');
        let date = new Date();
        date.setDate(timeS[2]);
        date.setMonth(timeS[1] - 1);
        date.setFullYear(timeS[0]);
        let day = date.getDay() === 0 ? 'CN' : `T${date.getDay() + 1}`;
        let dateN = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
        let mouth = `TH${date.getMonth() + 1}`;
        let year = date.getFullYear();
        return `${day}, ${dateN} ${mouth} ${year}`;
    };

    _renderTimeCalender = (time) => {
        let timeS = time.split('-');
        let date = new Date();
        date.setDate(timeS[2]);
        date.setMonth(timeS[1] - 1);
        date.setFullYear(timeS[0]);
        let day = date.getDay() === 0 ? 'CN' : `T${date.getDay() + 1}`;
        let dateN = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
        let mouth = `TH${date.getMonth() + 1}`;
        let year = date.getFullYear();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; //
        minutes = minutes < 10 ? '0' + minutes : minutes;
        let strTime = hours + ':' + minutes + ' ' + ampm;
        return `${day}, ${dateN} ${mouth} ${year} ${strTime}`;
    };

    _continue = () => {
        if (!this.state.dateSelectFrom) {
            Alert.alert('Thông báo', 'Vui lòng chọn ngày bắt đầu', [
                {text: 'Đồng ý', style: 'cancel'}
            ]);
            return false;
        } else if (!this.state.dateSelectTo) {
            Alert.alert('Thông báo', 'Vui lòng chọn ngày kết thúc', [
                {text: 'Đồng ý', style: 'cancel'}
            ]);
            return false;
        }
        let dataStudent = [];
        this.state.data.forEach((item) => {
            if (item.typeCheck) {
                dataStudent.push(item.id);
            }
        });
        if (dataStudent.length) {
            let ob = {};
            ob.start = this.state.dateSelectFrom;
            ob.end = this.state.dateSelectTo;
            ob.student = dataStudent;
            ob.before_start_time = this.state.ShowCheck ? 1 : 0;
            this.props.dispatch(TimeGiaoBai(ob));
        } else {
            Alert.alert('Thông báo', 'Vui lòng chọn ít nhất 1 học sinh', [
                {text: 'Đồng ý', style: 'cancel'}
            ]);
        }
    };

    render() {
        let dayStart = this.state.dateSelectFrom;
        let dayEnd = this.state.dateSelectTo;
        return (
            <ImageBackground source={{uri: 'imagebackgroundlesson'}}
                             imageStyle={stylesApp.ImageBackGround}
                             style={{flex: 1}}>
                <Header showBack={true} title={'Giao bài'} goBack={() => this.props.navigation.goBack()}/>
                {/*<Header title='Giao bài' navigation={this.props.navigation}/>*/}
                {
                    this.state.showCalander === true ?
                        <View style={{
                            width: SmartScreenBase.smPercenWidth * 100,
                            height: SmartScreenBase.smPercenHeight * 100,
                            backgroundColor: '#00000070',
                            position: 'absolute',
                            top: 0,
                            zIndex: 99,
                        }}></View>
                        : null
                }
                {
                    this.state.showCalander ?
                        <View
                            style={{
                                width: '100%',
                                height: '80%',
                                marginTop: '30%',
                                position: 'absolute',
                                zIndex: 100,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                        >
                            <View
                                style={{
                                    width: '95%',
                                    height: '100%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    backgroundColor: '#FFF',
                                    borderRadius: SmartScreenBase.smPercenWidth * 3,
                                }}>
                                <View
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    <View
                                        style={{
                                            width: '90%',
                                            height: '10%',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginTop: SmartScreenBase.smPercenHeight * 2,
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
                                            width: '100%',
                                            height: '80%',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                        <View
                                            style={{
                                                height: '6%',
                                                width: '100%',

                                            }}>
                                            <Text style={{
                                                fontWeight: 'bold',
                                                paddingLeft: SmartScreenBase.smPercenWidth * 5,
                                            }}>
                                                {
                                                    this.state.choose
                                                        ?
                                                        this._renderTimeCalender(this.state.dateSelectFrom)
                                                        :
                                                        this._renderTimeCalender(this.state.dateSelectTo)
                                                }
                                            </Text>
                                        </View>
                                        <View style={{width: '100%', height: '80%'}}>
                                            <Calendar
                                                markedDates={this.state.choose ? this.state.markedDatesFrom : this.state.markedDatesTo}
                                                theme={{
                                                    arrowColor: '#000',
                                                    todayTextColor: 'blue',
                                                    selectedDayTextColor: '#FFF',
                                                    monthTextColor: '#000',
                                                    textMonthFontSize: SmartScreenBase.smFontSize * 50,
                                                    textDayFontSize: SmartScreenBase.smFontSize * 40,
                                                    textDayHeaderFontSize: SmartScreenBase.smFontSize * 40,
                                                    'stylesheet.day.basic': {
                                                        base: {
                                                            // marginTop: -SmartScreenBase.smPercenHeight / 2,
                                                            justifyContent: 'center',
                                                            alignItems: 'center',
                                                            width: SmartScreenBase.smPercenHeight * 3,
                                                            height: SmartScreenBase.smPercenHeight * 3,
                                                            paddingTop: SmartScreenBase.smPercenHeight / 2,
                                                        },
                                                        text: {
                                                            textAlign: 'center',
                                                        },
                                                    },
                                                }}
                                                onDayPress={this._onDayPress}
                                            />
                                        </View>
                                    </View>
                                    <View
                                        style={{
                                            width: '90%',
                                            height: '10%',
                                            //backgroundColor: '#FFF',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            marginTop: -SmartScreenBase.smPercenHeight * 4,
                                        }}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.setState({showCalander: false});
                                            }}
                                            style={{
                                                width: '60%',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                backgroundColor: '#000022',
                                                borderRadius: width * 35,
                                            }}>
                                            <Text style={{
                                                fontSize: 20,
                                                color: '#FFF',
                                                fontWeight: 'bold',
                                                padding: SmartScreenBase.smPercenHeight,
                                            }}>
                                                Đóng
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                        : null
                }
                {/*<View style={{width: '100%', height: '5%'}}/>*/}
                <View style={{width: '100%', height: '50%'}}>
                    <View style={{width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center'}}>
                        <View style={{
                            width: '90%',
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderTopRightRadius: 10,
                            borderTopLeftRadius: 10,
                            backgroundColor: '#00000030',
                            borderBottomColor: '#FFFFFF50',
                            borderBottomWidth: 1,
                        }}>
                            <View style={{
                                width: '95%',
                                flexDirection: 'row',
                                margin: SmartScreenBase.smPercenWidth * 2,
                                padding: SmartScreenBase.smPercenWidth,
                            }}>
                                <View style={{width: '80%'}}>
                                    <Text style={{color: '#FFF', fontWeight: 'bold'}}>Chọn học viên</Text>
                                </View>
                                <View style={{width: '19.5%', flexDirection: 'row', justifyContent: 'flex-end'}}>
                                    <Text
                                        style={{color: '#FFF', fontWeight: 'bold', paddingRight: smartScreenWidth * 2}}>
                                        All
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this._onCheckall();
                                        }}
                                        style={{
                                            width: SmartScreenBase.smPercenHeight * 3,
                                            height: SmartScreenBase.smPercenHeight * 3,
                                            borderRadius: 3,
                                            borderWidth: 1,
                                            borderColor: '#F08B01',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                        {this.state.allCheck === true ? (
                                            <Iconcheck1 name="check" color="#FFF"
                                                        size={SmartScreenBase.smPercenHeight * 3}/>
                                        ) : null}
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View
                            style={{
                                width: '90%',
                                height: '85%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#00000030',
                                paddingHorizontal: 10,
                                paddingVertical: 10,
                                borderBottomRightRadius: 10,
                                borderBottomLeftRadius: 10,
                            }}>
                            <FlatList
                                data={this.state.data}
                                renderItem={(item, index) => this._Render_Item(item, index)}
                                extraData={this.state.data}
                                keyExtractor={(item, index) => index.toString()}
                                showsVerticalScrollIndicator={false}
                            />
                        </View>
                    </View>
                </View>
                <View
                    style={{
                        width: '100%',
                        height: '45%',
                        alignItems: 'center',
                    }}>
                    <View style={{
                        width: '90%',
                        height: '20%',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                this._onShow();
                            }}
                            style={{
                                width: SmartScreenBase.smPercenHeight * 3,
                                height: SmartScreenBase.smPercenHeight * 3,
                                borderRadius: 3,
                                borderWidth: 1,
                                borderColor: '#F08B01',
                            }}>
                            {this.state.ShowCheck === true ? (
                                <Iconcheck1 name="check" color="#fff" size={SmartScreenBase.smPercenHeight * 3}/>
                            ) : null}
                        </TouchableOpacity>
                        <View
                            style={{
                                width: '80%',
                                height: '100%',
                                borderRadius: 3,
                                marginLeft: '5%',
                                justifyContent: 'center',
                            }}>
                            <Text style={{fontSize: 15, color: '#FFF'}}>
                                Cho phép học viên làm trước ngày
                            </Text>
                            <Text style={{fontSize: 15, color: '#FFF'}}>bắt đầu</Text>
                        </View>
                    </View>
                    <View style={{width: '90%', height: '40%', marginTop: SmartScreenBase.smPercenHeight}}>
                        <Text style={{fontSize: SmartScreenBase.smFontSize * 40, color: '#FFF'}}>
                            Đặt ngày bắt đầu, ngày kết thúc cho
                        </Text>
                        <Text style={{fontSize: SmartScreenBase.smFontSize * 40, color: '#FFF'}}>
                            cả nhóm bài tập(tuỳ chọn):
                        </Text>
                        <View style={{
                            width: '100%',
                            height: '52%',
                            backgroundColor: '#FFFFFF50',
                            marginTop: SmartScreenBase.smPercenHeight * 3,
                            borderRadius: 10,
                            flexDirection: 'row',
                        }}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({
                                        choose: true,
                                        showCalander: true,
                                        checkday: 'from',
                                        isCalendaTo: false,
                                        corlorTextfrom: '#fff',
                                        corlorTextTo: '#000',
                                    });
                                }}
                                style={{
                                    width: '48%',
                                    height: '100%',
                                    backgroundColor: this.state.choose === true ? '#FFFFFF80' : null,
                                    borderRadius: 10,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <Text style={{
                                    fontSize: SmartScreenBase.smFontSize * 50,
                                    color: '#FFF',
                                }}>{this._convertDateTime(dayStart)}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({
                                        choose: false,
                                        showCalander: true,
                                        checkday: 'to',
                                        isCalendaTo: true,
                                        corlorTextTo: '#fff',
                                        corlorTextfrom: '#000',
                                    });
                                }}
                                style={{
                                    width: '52%',
                                    height: '100%',
                                    backgroundColor: this.state.choose === false ? '#FFFFFF80' : null,
                                    borderRadius: 10,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <Text style={{
                                    fontSize: SmartScreenBase.smFontSize * 50,
                                    color: '#FFF',
                                }}>{this._convertDateTime(dayEnd)}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View
                        style={{
                            height: '20%',
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: SmartScreenBase.smPercenHeight * 2,
                        }}>
                        <TouchableOpacity
                            onPress={() => {
                                this._continue();
                            }}
                            style={{
                                height: '70%',
                                width: '60%',
                                paddingHorizontal: 20,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: '#000022',
                                borderRadius: width * 35,
                            }}>
                            <Text
                                style={{fontSize: SmartScreenBase.smFontSize * 60, color: '#FFF', fontWeight: 'bold'}}>
                                Tiếp tục
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

function mapStateToProps(state) {
    return {
        data_answer: state.timegiaobai.data_answer,
    };
}

export default connect(mapStateToProps)(listStudent);
