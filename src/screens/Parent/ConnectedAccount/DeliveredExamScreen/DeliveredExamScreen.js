import React, {Component} from 'react';
import {
    View,
    StyleSheet,
    Dimensions,
    Text,
    ScrollView,
    Image,
    TouchableOpacity,
    ImageBackground,
    Alert,
    FlatList,
    Modal,
    Platform,
} from 'react-native';

var ScrollableTabView = require('react-native-scrollable-tab-view');
import StyleTeacher from '../../../../component/ModalAlam/StyleTeacher';
import DaChua from '../DaChua/DaChua';
import NotDoneExam from '../NotDoneExam/NotDoneExam';
import ModalAlam from '../../../../component/ModalAlam/index';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import moment from 'moment';
import MyData from '../../../../component/MyData';

SmartScreenBase.baseSetup();
import ExerciseNotDoneYet from '../ChuaLam/ExerciseNotDoneYet';
import Styles from '../../workDeliveredTeacherScreen/workDeliveredTeacherScreenStyles';
import ItemFilterExercises from '../../../../component/ItemListFilterExercises';
import ItemFilter from '../../../../component/ItemFilter';
import {Calendar} from 'react-native-calendars';
import {connect} from 'react-redux';
import LoadingScreen from '../../../LoadingScreen';
import API from '../../../../API/APIConstant';
import axios from 'axios';
import APIBase from '../../../../base/APIBase';

let copied;
let Array = [];
const dataProfuct = [];

class DeliveredExamScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            KeyClickInbox: false,
            refresh: false,
            visibleModal: false,
            ClickID: 0,
            data: [],
            visibleModalFilter: false,
            dataFilter: [
                {
                    id: 0,
                    name: 'Ngày',
                    isChecked: false,
                },
                {
                    id: 1,
                    name: 'Kỹ Năng',
                    isChecked: false,
                },
            ],
            dataFilterEx: [
                {
                    id: 0,
                    name: 'Speaking',
                    isChecked: false,
                },
                {
                    id: 1,
                    name: 'Writting',
                    isChecked: false,
                },
                {
                    id: 2,
                    name: 'Listening',
                    isChecked: false,
                },
                {
                    id: 3,
                    name: 'Reading',
                    isChecked: false,
                },
                {
                    id: 4,
                    name: 'Vocabulary',
                    isChecked: false,
                },
                {
                    id: 5,
                    name: 'Grammar',
                    isChecked: false,
                },
                {
                    id: 6,
                    name: 'Test',
                    isChecked: false,
                },
            ],
            dataProfuct: [],
            dataMarked: [],
            dataWaiting: [],
            titleFilter: 'Ngày',
            indexSelected: 0,
            calander: false,
            dateSelectFrom: '',
            dateSelectTo: '',
            dateSelectFrom1: '',
            dateSelectTo1: '',
            titleCalender: '',
            markedDates: {},
            corlorTextfrom: '#fff',
            corlorTextTo: '#a5a5a5ff',
            isLoading: false,
            markedDatesFrom: {},
            markedDatesTo: {},
        };
    }

    componentWillMount(): void {
        this.setState({isLoading: true});
        const myHeaders = new Headers();
        myHeaders.append(
            'jwt_token',
            APIBase.jwt_token,
        );
        myHeaders.append('X-API-KEY', '8c3a30506d9633a8b202cb5a91873efa');
        myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');
        myHeaders.append(
            'Authorization',
            'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
        );

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow',
        };

        fetch(
            API.baseurl+'api_user_exercise/parent_give_homework?student_id=' + MyData.UserLogin.id + '&teacher_id=' + this.props.dataLogin.id,
            requestOptions,
        )
            .then(response => response.text())
            .then(result => {
                this.setState({data: JSON.parse(result).data.not_mark});
                this.setState({dataMarked: JSON.parse(result).data.marked});
                this.setState({dataWaiting: JSON.parse(result).data.waiting});
                this.setState({isLoading: false});
            })
            .catch(error => {
                this.setState({isLoading: false});
                console.log('error', error);
            });
    }

    _onShowAlert = () => {
        this.ModalAlert.onShowAlert();
    };
    _isAlam = index => {
        this._onShowAlert();
        this.setState({ClickID: index});
    };
    _isOK = async () => {
        this.setState({isLoading: true});
        const url = API.baseurl + API.remind;
        const headers = {
            'Content-Type': 'application/json',
            'jwt_token': APIBase.jwt_token,
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
        };
        let data = {};
        data['user_id'] = MyData.UserLogin.id;
        data['exercise_id'] = this.state.ClickID;
        try {
            const res = await axios({method: 'post', url, headers, data});
            let dataReturn = res.data;
            this.setState({isLoading: false});
            if (dataReturn.status) {
                copied = [...this.state.data];
                copied.forEach((item, index) => {
                    if (item.id === this.state.ClickID) {
                        copied[index].remind = true;
                        return false;
                    }
                });
                this.setState({data: copied});
            } else {
                Alert.alert('Thông báo', dataReturn.msg, [
                    {text: 'Đồng ý', style: 'cancel'}
                ]);
            }
        } catch (error) {
            Alert.alert('Thông báo', error.response.data.msg, [
                {text: 'Đồng ý', style: 'cancel'}
            ]);
            console.log(error);
        }
    };

    _renderItemListFilterExercises = ({item, index}) => {
        return (
            <ItemFilterExercises
                indexSelected={this.state.indexSelected}
                Data={item}
                _onChangeExercises={() => this._onChangeExercises(index)}
                index={index}
            />
        );
    };
    _onChangeExercises = index => {
        const copied = [...this.state.dataFilterEx];
        copied[index].isChecked = !copied[index].isChecked;
        this.setState({dataFilterEx: copied});
        //this._Filter(this.state.dataFilterEx);
    };

    _Filter = async (object) => {
        this.setState({isLoading: true});
        let url = API.baseurl+'api_user_exercise/parent_give_homework?student_id=' + MyData.UserLogin.id + '&teacher_id=' + this.props.dataLogin.id + '?';
        if (this.state.titleFilter === 'Ngày') {
            let fromDate = this.state.dateSelectFrom1;
            let toDate = this.state.dateSelectTo1;
            if (!fromDate || !toDate) {
                Alert.alert('Thông báo', 'Vui lòng chọn đủ ngày bắt đầu và kết thúc', [
                    {text: 'Đồng ý', style: 'cancel'}
                ]);
                this.setState({isLoading: false});
                return false;
            }
            if (fromDate) {
                url += `from_date=${fromDate}&`;
            }
            if (toDate) {
                url += `to_date=${toDate}&`;
            }
        } else {
            for (let i = 0; i < object.length; i++) {
                if (object[i].isChecked) {
                    url += `skill[]=${object[i].name.toLowerCase()}&`;
                }
            }
        }
        const headers = {
            'Content-Type': 'application/json',
            'jwt_token': APIBase.jwt_token,
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
        };
        try {
            const res = await axios({method: 'get', url, headers});
            let result = res.data;
            if (result.status) {
                let dataNotMark = [...this.state.data];
                let dataMarked = [...this.state.dataMarked];
                let dataWaiting = [...this.state.dataWaiting];
                dataNotMark = result.data.not_mark;
                dataMarked = result.data.marked;
                dataWaiting = result.data.waiting;
                this.setState({data: dataNotMark});
                this.setState({dataMarked: dataMarked});
                this.setState({dataWaiting: dataWaiting});
                this.setState({
                    isLoading: false,
                    visibleModalFilter: false,
                });
            } else {
                Alert.alert('Thông báo', result.msg, [
                    {text: 'Đồng ý', style: 'cancel'}
                ]);
                this.setState({
                    isLoading: false,
                });
            }

        } catch (error) {
            Alert.alert('Thông báo', error.response.data.msg, [
                {text: 'Đồng ý', style: 'cancel'}
            ]);
            console.log(error);
        }
    };

    _renderItemListFilter = ({item, index}) => {
        return (
            <ItemFilter
                indexSelected={this.state.indexSelected}
                Data={item}
                _onChangeRadioButton={() => this._onChangeRadioButton(index, item)}
                index={index}
            />
        );
    };
    _onChangeRadioButton = (index, item) => {
        this.setState({
            dataFilter: [...this.state.dataFilter],
            indexSelected: index,
            titleFilter: item.name,
        });
    };
    _onDayPress = day => {
        let date = {};
        date[`${day.dateString}`] = {selected: true, selectedColor: '#000'};
        if (this.state.titleCalender === 'start') {
            if (this.state.dateSelectTo) {
                if (moment(day.dateString).format('YY-MM-DD') < this.state.dateSelectTo) {
                    Alert.alert('Thông báo', 'Ngày bắt đầu phải nhỏ hơn ngày kết thúc! Vui lòng thử lại!', [
                        {text: 'Đồng ý', style: 'cancel'}
                    ]);
                    return false;
                }
            }
            this.setState({
                markedDatesFrom: date,
                dateSelectFrom: moment(day.dateString).format('YY-MM-DD'),
                corlorTextfrom: '#a5a5a5ff',
                dateSelectFrom1: moment(day.dateString).format('YYYY-MM-DD'),
            });
        } else {
            if (this.state.dateSelectFrom) {
                if (moment(day.dateString).format('YY-MM-DD') < this.state.dateSelectFrom) {
                    Alert.alert('Thông báo', 'Ngày kết thúc phải lớn hơn ngày bắt đầu! Vui lòng thử lại!', [
                        {text: 'Đồng ý', style: 'cancel'}
                    ]);
                    return false;
                }
            }
            this.setState({
                markedDatesTo: date,
                dateSelectTo: moment(day.dateString).format('YY-MM-DD'),
                dateSelectTo1: moment(day.dateString).format('YYYY-MM-DD'),
                corlorTextTo: '#a5a5a5ff',
            });
        }
    };

    _renderModal = () => {
        let arFrom = this.state.dateSelectFrom.split('-');
        let arTo = this.state.dateSelectTo.split('-');
        return (
            <Modal
                visible={this.state.visibleModalFilter}
                animated={true}
                transparent={true}>
                <View style={{
                    flex: 1,
                    backgroundColor: 'rgba(52, 52, 52, 0.8)',
                }}>
                    {
                        this.state.calander === true ?
                            <View style={{
                                width: '100%',
                                height: '100%',
                                zIndex: 1000,
                                position: 'absolute',
                                backgroundColor: '#00000070',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                                <View style={{
                                    backgroundColor: '#FFF',
                                    width: '90%',
                                    borderRadius: SmartScreenBase.smPercenWidth * 5,
                                    justifyContent: 'center',
                                }}>
                                    <Calendar
                                        markedDates={this.state.titleCalender === 'start' ? this.state.markedDatesFrom : this.state.markedDatesTo}
                                        theme={{
                                            arrowColor: '#000',
                                            todayTextColor: 'blue',
                                            selectedDayTextColor: '#FFF',
                                            monthTextColor: '#000',
                                            textMonthFontSize: 14,
                                            textDayFontSize: 15,
                                            textDayHeaderFontSize: 18,
                                        }}
                                        style={{marginTop: SmartScreenBase.smPercenHeight * 3}}
                                        onDayPress={this._onDayPress}
                                    />
                                    <View style={{
                                        width: '100%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        marginTop: SmartScreenBase.smPercenHeight,
                                        marginBottom: SmartScreenBase.smPercenHeight * 3,
                                    }}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                this.setState({calander: false});
                                            }}
                                            style={{
                                                width: SmartScreenBase.smPercenWidth * 30,
                                                height: SmartScreenBase.smPercenHeight * 5,
                                                backgroundColor: '#01283A',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                borderRadius: SmartScreenBase.smPercenWidth * 15,
                                                fontWeight: 'bold',
                                                marginTop: SmartScreenBase.smPercenHeight,
                                            }}>
                                            <Text style={{color: '#FFF'}}>Đóng</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            : null
                    }
                    <View style={{
                        position: 'absolute',
                        bottom: 0,
                        width: SmartScreenBase.smPercenWidth * 100,
                        height: SmartScreenBase.smPercenHeight * 40,
                        flexDirection: 'row',
                        backgroundColor: '#fff',
                        opacity: 1,
                    }}>
                        <View style={Styles.ViewFlatListLeft}>
                            <View style={Styles.ViewTextFlatListLeft}>
                                <Text style={{
                                    ...Styles.TextFlatListLeft,
                                    fontSize: SmartScreenBase.smFontSize * 50,
                                    paddingLeft: SmartScreenBase.smPercenWidth * 5,
                                }}>Lọc Theo</Text>
                            </View>
                            <FlatList
                                data={this.state.dataFilter}
                                renderItem={this._renderItemListFilter}
                                keyExtractor={(item, index) => {
                                    return item.toString() + index.toString();
                                }}
                                showsVerticalScrollIndicator={false}
                                extraData={this.state}
                            />
                            <View style={{
                                height: '20%',
                                alignItems: 'center',
                                flexDirection: 'row',
                                justifyContent: 'space-around',
                                width: '100%',
                                marginBottom: SmartScreenBase.smPercenHeight * 3,
                            }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this._Filter(this.state.dataFilterEx);
                                    }}
                                    style={{
                                        ...Styles.ButtonFilter,
                                        height: '60%',
                                        borderRadius: SmartScreenBase.smPercenWidth,
                                    }}>
                                    <Text style={{
                                        fontWeight: 'bold',
                                        fontSize: SmartScreenBase.smPercenWidth * 4,
                                        color: '#fff',
                                    }}>Lọc</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        ...Styles.ButtonCancel,
                                        height: '60%',
                                        borderRadius: SmartScreenBase.smPercenWidth,
                                    }}
                                    onPress={() => {
                                        this.setState({visibleModalFilter: false});
                                    }}>
                                    <Text style={{
                                        fontWeight: 'bold',
                                        fontSize: SmartScreenBase.smPercenWidth * 4, color: '#fff',
                                    }}>Hủy</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View
                            style={{
                                flex: 1,
                                paddingVertical: SmartScreenBase.smPercenWidth * 4,
                            }}>
                            {
                                this.state.titleFilter === 'Ngày' ?
                                    <View style={{justifyContent: 'center', flex: 1}}>
                                        <Text style={{
                                            fontSize: SmartScreenBase.smFontSize * 45,
                                            color: '#000',
                                            marginLeft: SmartScreenBase.smPercenWidth * 7,
                                        }}>Ngày bắt đầu</Text>
                                        <View style={{width: '100%', alignItems: 'center'}}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    this.setState({
                                                        calander: true,
                                                        titleCalender: 'start',
                                                    });

                                                }}
                                                style={{flexDirection: 'row', marginTop: 10}}>
                                                <View style={{
                                                    backgroundColor: '#007BA4',
                                                    width: SmartScreenBase.smPercenWidth * 12,
                                                    height: SmartScreenBase.smPercenHeight * 8,
                                                    borderRadius: 10,
                                                    marginRight: 5,
                                                    marginLeft: 5,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}>
                                                    <Text style={{
                                                        fontSize: 25,
                                                        color: '#FFFFFF',
                                                        fontWeight: 'bold',
                                                    }}>{arFrom[2] ?? '--'}</Text>
                                                </View>
                                                <View style={{
                                                    backgroundColor: '#007BA4',
                                                    width: SmartScreenBase.smPercenWidth * 12,
                                                    height: SmartScreenBase.smPercenHeight * 8,
                                                    borderRadius: 10,
                                                    marginRight: 5,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}>
                                                    <Text style={{
                                                        fontSize: 25,
                                                        color: '#FFFFFF',
                                                        fontWeight: 'bold',
                                                    }}>{arFrom[1] ?? '--'}</Text>
                                                </View>
                                                <View style={{
                                                    backgroundColor: '#007BA4',
                                                    width: SmartScreenBase.smPercenWidth * 12,
                                                    height: SmartScreenBase.smPercenHeight * 8,
                                                    borderRadius: 10,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}>
                                                    <Text style={{
                                                        fontSize: 25,
                                                        color: '#FFFFFF',
                                                        fontWeight: 'bold',
                                                    }}>{arFrom[0] !== '' ? arFrom[0] : '--'}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                        <Text style={{
                                            fontSize: SmartScreenBase.smFontSize * 45,
                                            color: '#000',
                                            marginLeft: SmartScreenBase.smPercenWidth * 7,
                                            paddingTop: SmartScreenBase.smPercenHeight,
                                        }}>Ngày kết thúc</Text>
                                        <View style={{width: '100%', alignItems: 'center'}}>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    this.setState({calander: true, titleCalender: 'end'});
                                                }}
                                                style={{flexDirection: 'row', marginTop: 10}}>
                                                <View style={{
                                                    backgroundColor: '#007BA4',
                                                    width: SmartScreenBase.smPercenWidth * 12,
                                                    height: SmartScreenBase.smPercenHeight * 8,
                                                    borderRadius: 10,
                                                    marginRight: 5,
                                                    marginLeft: 5,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}>
                                                    <Text style={{
                                                        fontSize: 25,
                                                        color: '#FFFFFF',
                                                        fontWeight: 'bold',
                                                    }}>{arTo[2] ?? '--'}</Text>
                                                </View>
                                                <View style={{
                                                    backgroundColor: '#007BA4',
                                                    width: SmartScreenBase.smPercenWidth * 12,
                                                    height: SmartScreenBase.smPercenHeight * 8,
                                                    borderRadius: 10,
                                                    marginRight: 5,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}>
                                                    <Text style={{
                                                        fontSize: 25,
                                                        color: '#FFFFFF',
                                                        fontWeight: 'bold',
                                                    }}>{arTo[1] ?? '--'}</Text>
                                                </View>
                                                <View style={{
                                                    backgroundColor: '#007BA4',
                                                    width: SmartScreenBase.smPercenWidth * 12,
                                                    height: SmartScreenBase.smPercenHeight * 8,
                                                    borderRadius: 10,
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}>
                                                    <Text style={{
                                                        fontSize: 25,
                                                        color: '#FFFFFF',
                                                        fontWeight: 'bold',
                                                    }}>{arTo[0] !== '' ? arTo[0] : '--'}</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                    :
                                    <FlatList
                                        data={this.state.dataFilterEx}
                                        renderItem={this._renderItemListFilterExercises}
                                        keyExtractor={(item, index) => {
                                            return item.toString() + index.toString();
                                        }}
                                        showsVerticalScrollIndicator={false}
                                        extraData={this.state}
                                    />
                            }
                        </View>
                    </View>
                </View>
            </Modal>
        );
    };

    _renderHeader = () => {
        return (
            <View
                style={[
                    StyleTeacher.ViewHeader,
                    {justifyContent: 'space-between', alignItems: 'center'},
                ]}>
                <View
                    style={{
                        marginLeft: SmartScreenBase.smPercenWidth * 2,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%',
                    }}>
                    <TouchableOpacity
                        style={{height: '100%', justifyContent: 'center'}}
                        onPress={() => this.props.navigation.goBack()}
                    >
                        <Image
                            style={{
                                width: SmartScreenBase.smPercenWidth * 5,
                                height: SmartScreenBase.smPercenWidth * 5,
                            }}
                            resizeMode={'contain'}
                            source={{uri: 'imageback'}}
                        />
                    </TouchableOpacity>

                    <Text
                        style={[
                            StyleTeacher.txt_Title,
                            {color: 'white', marginLeft: SmartScreenBase.smPercenWidth * 5},
                        ]}>
                        Bài tập đã giao
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={() => this.setState({visibleModalFilter: true})}>
                    <View style={{marginRight: SmartScreenBase.smPercenWidth * 2}}>
                        <Text style={[StyleTeacher.txt_Title, {color: 'white'}]}>
                            Lọc
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    render() {
        return (
            <ImageBackground
                source={{uri: 'imagebackground'}}
                style={[
                    StyleTeacher.ImageBackGround,
                    {flex: 1},
                ]}>
                {this._renderHeader()}
                {
                    this.state.isLoading
                        ?
                        <LoadingScreen/>
                        :
                        null
                }
                <ScrollableTabView
                    style={{justifyContent: 'center'}}
                    tabBarActiveTextColor={'#fff'}
                    tabBarInactiveTextColor={'#ffffff30'}
                    tabBarUnderlineStyle={{backgroundColor: 'yellow'}}>
                    <ExerciseNotDoneYet
                        tabLabel="CHƯA LÀM"
                        Data={this.state.data}
                        Alam={this._isAlam}
                    />
                    <NotDoneExam tabLabel="ĐÃ LÀM" Data={this.state.dataMarked}/>
                    <DaChua tabLabel="ĐÃ CHỮA" Data={this.state.dataWaiting}/>
                </ScrollableTabView>
                <ModalAlam
                    ref={refs => (this.ModalAlert = refs)}
                    title={this.state.title}
                    _isOK={() => this._isOK()}
                />
                {this._renderModal()}
            </ImageBackground>
        );
    }
}

function mapStateToProps(state) {
    return {
        dataLogin: state.AuthStackReducer.dataLogin,
    };
}

export default connect(mapStateToProps)(DeliveredExamScreen);
