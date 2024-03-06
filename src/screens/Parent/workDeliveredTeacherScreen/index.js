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
    Modal,
    ImageBackground,
} from 'react-native';
import SmartScreenBase from '../../../base/SmartScreenBase';
import ItemFilter from '../../../component/ItemFilter/index';
import ItemFilterExercises from '../../../component/ItemListFilterExercises/index';
import ItemListWorkDelivered from '../../../component/ItemListWorkDelivered';
import Styles from './workDeliveredTeacherScreenStyles';
import API from '../../../API/APIConstant';
import axios from 'axios';
import StyleTeacher from '../../../component/ModalAlam/StyleTeacher';
import moment from 'moment';
import {connect} from 'react-redux';

SmartScreenBase.baseSetup();
import {Calendar, LocaleConfig} from 'react-native-calendars';
import LoadingScreen from '../../LoadingScreen';
import LoginFirstComponentTeacher from '../../../component/LoginFirstComponent/Teacher';
import LoginFirstComponentParent from '../../../component/LoginFirstComponent/Parent';
import APIBase from '../../../base/APIBase';

LocaleConfig.locales.en = LocaleConfig.locales[''];
LocaleConfig.defaultLocale = 'en';

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            Data: [],
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
            indexSelected: 0,
            visibleModalFilter: false,
            dataRender: [],
            titleFilter: 'Ngày',
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

    componentDidMount() {
        this.props.navigation.addListener('didFocus', () => {
            this._getExercisesDelivered();
        });
        // this._getExercisesDelivered();
    }

    _onChangeRadioButton = (index, item) => {
        this.setState({
            dataFilter: [...this.state.dataFilter],
            indexSelected: index,
            titleFilter: item.name,
        });
    };
    _getExercisesDelivered = () => {
        let object = this.state.dataFilterEx;
        this.setState({isLoading: true});
        let url = API.baseurl + API.getMyGiveHomework;
        let bUrl = '';
        if (this.state.titleFilter === 'Ngày') {
            let fromDate = this.state.dateSelectFrom1;
            let toDate = this.state.dateSelectTo1;
            if (fromDate) {
                bUrl += `from_date=${fromDate}&`;
            }
            if (toDate) {
                bUrl += `to_date=${toDate}&`;
            }
        } else {
            for (let i = 0; i < object.length; i++) {
                if (object[i].isChecked) {
                    bUrl += `skill[]=${object[i].name.toLowerCase()}&`;
                }
            }
        }
        url = bUrl ? url + '?' + bUrl : url;
        const headers = {
            'Content-Type': 'application/json',
            'jwt_token': APIBase.jwt_token,
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
        };
        axios({method: 'get', url, headers})
            .then(response => {
                this.setState({
                    isLoading: false,
                    Data: response.data.data,
                    dataRender: response.data.data,
                });
            })
            .catch(error => {
                if (error.message === 'Network Error') {
                    Alert.alert('Thông Báo', 'Vui lòng kiểm tra kết nối Internet');
                }
                this.setState({isLoading: false});
            });
    };
    _renderItem = ({item, index}) => {
        return <ItemListWorkDelivered Data={item} navigation={this.props.navigation}/>;
    };
    _onChangeExercises = index => {
        const copied = [...this.state.dataFilterEx];
        copied[index].isChecked = !copied[index].isChecked;
        this.setState({dataFilterEx: copied});
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
    _onDayPress = day => {
        let date = {};
        date[`${day.dateString}`] = {selected: true, selectedColor: '#000'};
        if (this.state.titleCalender === 'start') {
            if (this.state.dateSelectTo) {
                if (moment(day.dateString).format('YY-MM-DD') > this.state.dateSelectTo) {
                    alert('Ngày bắt đầu phải nhỏ hơn ngày kết thúc! Vui lòng thử lại!');
                    return false;
                }
            }
            this.setState({
                markedDatesFrom: date,
                dateSelectFrom: moment(day.dateString).format('YY-MM-DD'),
                dateSelectFrom1: moment(day.dateString).format('YYYY-MM-DD'),
                corlorTextfrom: '#a5a5a5ff',
            });
        } else {
            if (this.state.dateSelectFrom) {
                if (moment(day.dateString).format('YY-MM-DD') < this.state.dateSelectFrom) {
                    alert('Ngày kết thúc phải lớn hơn ngày bắt đầu! Vui lòng thử lại!');
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

    _Filter = async (object) => {
        this.setState({isLoading: true});
        let url = API.baseurl + API.getMyGiveHomework + '?';
        if (this.state.titleFilter === 'Ngày') {
            let fromDate = this.state.dateSelectFrom1;
            let toDate = this.state.dateSelectTo1;
            if (!fromDate || !toDate) {
                alert('Vui lòng chọn đủ ngày bắt đầu và kết thúc');
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
            let data = res.data;
            if (data.status) {
                this.setState({
                    isLoading: false,
                    Data: data.data,
                    dataRender: data.data,
                    visibleModalFilter: false,
                });
            } else {
                alert(data.msg);
            }

        } catch (error) {
            alert(error.response.data.msg);
            console.log(error);
        }
    };

    _nextGiveHomework() {
        if (this.props.dataLogin.role === 'parent') {
            
        } else {
            this.props.navigation.navigate('listStudent', {class_id: this.props.dataClass.id_Class});
        }
    }

    render() {
        let arFrom = this.state.dateSelectFrom.split('-');
        let arTo = this.state.dateSelectTo.split('-');
        return (
            !this.props.itemClass.length && this.props.dataLogin.role === 'teacher'
                ?
                <LoginFirstComponentTeacher/>
                :
                !this.props.dataStudent.length && this.props.dataLogin.role === 'parent'
                    ?
                    <LoginFirstComponentParent />
                    :
            <ImageBackground
                source={{uri: 'imagebackground'}}
                style={{flex: 1}}
            >
                {
                    this.state.isLoading
                        ?
                        <LoadingScreen/>
                        :
                        null
                }
                <View style={{flex: 1, marginBottom: SmartScreenBase.smPercenHeight * 12}}>
                    <View
                        style={[
                            StyleTeacher.ViewHeader,
                            {justifyContent: 'space-between', alignItems: 'center', height: SmartScreenBase.smPercenHeight * 8},
                        ]}>
                        <View
                            style={{
                                marginLeft: SmartScreenBase.smPercenWidth * 2,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: SmartScreenBase.smPercenHeight * 3
                            }}
                        >
                            <Text
                                style={[
                                    StyleTeacher.txt_Title,
                                    {color: 'white', marginLeft: SmartScreenBase.smPercenWidth * 5},
                                ]}>
                                Giao bài
                            </Text>
                        </View>
                        <TouchableOpacity
                            onPress={() => this.setState({visibleModalFilter: true})}>

                            <View style={{marginRight: SmartScreenBase.smPercenWidth * 2, marginTop: SmartScreenBase.smPercenHeight * 3}}>
                                <Text style={[StyleTeacher.txt_Title, {color: 'white'}]}>
                                    Lọc
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Text style={[Styles.TextBody, {
                        marginTop: SmartScreenBase.smPercenHeight * 2,
                        marginHorizontal: SmartScreenBase.smPercenHeight * 3,
                    }]}>BÀI ĐÃ GIAO</Text>
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        paddingHorizontal: SmartScreenBase.smPercenWidth * 5,
                    }}>
                        <FlatList
                            data={this.state.dataRender}
                            renderItem={this._renderItem}
                            keyExtractor={(item, index) => {
                                return item.toString() + index.toString();
                            }}
                            showsVerticalScrollIndicator={false}
                            extraData={this.state}
                        />
                    </View>
                    <View
                        style={{
                            width: SmartScreenBase.smPercenWidth * 100,
                            height: '10%',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <TouchableOpacity
                            onPress={() => {
                                this._nextGiveHomework();
                            }}
                            style={{
                                backgroundColor: '#00283A',
                                width: SmartScreenBase.smPercenWidth * 50,
                                height: SmartScreenBase.smPercenWidth * 10,
                                borderRadius: SmartScreenBase.smPercenWidth * 10,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Text
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: SmartScreenBase.smPercenWidth * 5,
                                    textAlign: 'center',
                                    textAlignVertical: 'center',
                                    color: '#fff',
                                }}>
                                Giao Bài
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
            </ImageBackground>
        );
    }
}

function mapStateToProps(state) {
    return {
        dataClass: state.AuthStackReducer.dataClass,
        dataLogin: state.AuthStackReducer.dataLogin,
        itemClass: state.AuthStackReducer.itemClass,
        dataStudent: state.ListStudentReducer.dataStudent
    };
}

export default connect(mapStateToProps)(index);
