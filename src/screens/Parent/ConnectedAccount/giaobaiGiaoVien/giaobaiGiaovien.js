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
SmartScreenBase.baseSetup();
import {Calendar} from 'react-native-calendars';
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
                    name: 'speaking',
                    isChecked: false,
                },
                {
                    id: 1,
                    name: 'writting',
                    isChecked: false,
                },
                {
                    id: 2,
                    name: 'listening',
                    isChecked: false,
                },
                {
                    id: 3,
                    name: 'reading',
                    isChecked: false,
                },
                {
                    id: 4,
                    name: 'vocabulary',
                    isChecked: false,
                },
                {
                    id: 5,
                    name: 'grammar',
                    isChecked: false,
                },
                {
                    id: 6,
                    name: 'Test',
                    isChecked: false,
                },
            ],
            indexSelected: 0,
            visibleModalFilter:false,
            dataRender:[],
            titleFilter:'Ngày',
            calander:false,
            dateSelectFrom: moment().format("YY-MM-DD"),
            dateSelectTo: moment().format("YY-MM-DD"),
            dateSelectFrom1: moment().format("YYYY-MM-DD"),
            dateSelectTo1: moment().format("YYYY-MM-DD"),
            titleCalender:'',
            markedDates: {},
            corlorTextfrom: '#fff',
            corlorTextTo: '#a5a5a5ff',

        };
    }

    componentDidMount(): void {
        this._getExercisesDelivered();
    }
    _onChangeRadioButton = (index,item) => {
        this.setState({
            dataFilter: [...this.state.dataFilter],
            indexSelected: index,
            titleFilter:item.name
        });
    };
    _getExercisesDelivered = () => {
        const url = API.baseurl + API.getExercisesDelivered;
        const header = {
            'Content-Type': 'application/json',
            jwt_token:
                'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImFkbWluIiwidGltZV9sb2dpbiI6MTU3ODkwNzQyM30.CFZyO9a-qBmyI8Q25AqGNd1nxWn1SO5TMC_yBxjgWCA',
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            Authorization: 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
        };
        axios({method: 'get', url: url, headers: header})
            .then(response => {
                console.log(response.data.data.not_mark);
                this.setState({
                    isLoading: false,
                    Data: response.data.data.not_mark,
                    dataRender:response.data.data.not_mark
                });
            })
            .catch(error => {
                console.log(error.message);
                if (error.message === 'Network Error') {
                    Alert.alert('Thông Báo', 'Vui lòng kiểm tra kết nối Internet');
                }
                this.setState({isLoading: false});
            });
    };
    _renderItem = ({item, index}) => {
        return <ItemListWorkDelivered Data={item}/>;
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
                _onChangeRadioButton={() => this._onChangeRadioButton(index,item)}
                index={index}
            />
        );
    };
    _onDayPress = day => {
        debugger;
        let date = {};
        date[`${day.dateString}`] = {selected: true, selectedColor: '#000'};
        if (this.state.titleCalender === 'start') {
            this.setState({
                markedDates: date,
                dateSelectFrom: moment(day.dateString).format("YY-MM-DD"),
                dateSelectFrom1:moment(day.dateString).format("YYYY-MM-DD"),
                corlorTextfrom: '#a5a5a5ff',
            });
        } else {
            if (moment(day.dateString).format("YY-MM-DD") < this.state.dateSelectFrom) {
                alert('Vui lòng chọn lại ngày');
            }else{
                this.setState({
                    markedDates: date,
                    dateSelectTo: moment(day.dateString).format("YY-MM-DD"),
                    dateSelectTo1:moment(day.dateString).format("YYYY-MM-DD"),
                    corlorTextTo: '#a5a5a5ff',
                });
            }
        }
    };
    _Filter(object) {
        console.log(this.state.Data);
        if(this.state.titleFilter === 'Ngày'){
            let Array = [];
            for (var j = 0; j < this.state.Data.length; j++) {
                // console.log(this.state.Data[j].start_time.slice(0, 10).split('-'))
                // console.log(parseInt(this.state.Data[j].start_time.slice(0, 10).split('-').join('')));
                console.log(parseInt(this.state.dateSelectFrom1.split('-').join('')))
                if(this.state.Data[j].end_time !== null && this.state.Data[j].start_time !== null){
                    if(
                        parseInt(this.state.Data[j].start_time.slice(0, 10).split('-').join('')) >= parseInt(this.state.dateSelectFrom1.split('-').join(''))
                        && parseInt(this.state.Data[j].end_time.slice(0, 10).split('-').join('')) <= parseInt(this.state.dateSelectTo1.split('-').join(''))
                    // && Date.parse(this.state.Data[j].end_time.slice(0, 10)) >= Date.parse(moment(this.state.dateSelectTo.dateString).format("YYYY-MM-DD"))
                    ){
                        Array.push(this.state.Data[j]);
                    }
                }
            }
            this.setState({dataRender: Array});
        } else{
            let Array = [];
            console.log('object',object);
            for (var i = 0; i < object.length; i++) {
                if (object[i].isChecked == true) {
                    for (var j = 0; j < this.state.Data.length; j++) {
                        if (this.state.Data[j].skill == object[i].name) {
                            Array.push(this.state.Data[j]);
                        }
                    }
                }
            }
            console.log('Array',Array)
            this.setState({dataRender: Array});
        }

        //console.log('hello' + Array);
    }
    render() {
        let arFrom = this.state.dateSelectFrom.split('-');
        let arTo = this.state.dateSelectTo.split('-')
        return (
            <ImageBackground
                source={{uri:'imagebackground'}}
                style={Styles.container}
            >
                <View style={{flex: 1, marginBottom: SmartScreenBase.smPercenHeight * 12}}>
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
                            }}
                        >
                            <TouchableOpacity
                                onPress={() => this.props.navigation.goBack()}
                                style={{
                                    width: SmartScreenBase.smPercenWidth * 5,
                                    height: SmartScreenBase.smPercenWidth * 5,
                                }}
                            >
                                <Image
                                    style={{
                                        width: '100%',
                                        height: '100%',
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
                                Giao bài
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
                    <View style={Styles.ViewModal}>
                        {
                            this.state.calander === true?
                                <View style={{width: '100%', height: '70%', zIndex:1000, position:'absolute', backgroundColor:'#00000030'}}>
                                    <View style={{backgroundColor:'#FFF'}}>
                                        <Calendar
                                            markedDates={this.state.markedDates}
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
                                        <View style={{width:'100%', justifyContent:'center', alignItems:'center'}}>
                                            <TouchableOpacity
                                                onPress={()=>{
                                                    this.setState({calander:false})
                                                }}
                                                style={{width:100, height:30, backgroundColor:'#01283A',justifyContent:'center', alignItems:'center', borderRadius:15 }}>
                                                <Text style={{color:'#FFF'}}>Đóng</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                :null
                        }
                        <View style={Styles.ViewBodyModal}>
                            <View style={Styles.ViewFlatListLeft}>
                                <View style={Styles.ViewTextFlatListLeft}>
                                    <Text style={Styles.TextFlatListLeft}>Lọc Theo</Text>
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
                                <View style={Styles.ViewButton}>
                                    <TouchableOpacity
                                        onPress={()=>{
                                            this._Filter(this.state.dataFilterEx)
                                        }}
                                        style={Styles.ButtonFilter}>
                                        <Text style={Styles.TextFilterModal}>Lọc</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={Styles.ButtonCancel}
                                        onPress={() => {
                                            this.setState({visibleModalFilter: false});
                                        }}>
                                        <Text style={Styles.TextFilterModal}>Hủy</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View
                                style={{
                                    flex: 1,
                                    paddingVertical: SmartScreenBase.smPercenWidth * 4,
                                }}>
                                {
                                    this.state.titleFilter === 'Ngày'?
                                        <View>
                                            <Text  style={{fontSize:20, color:'#000', marginLeft:20}}>Ngày bắt đầu</Text>
                                            <TouchableOpacity
                                                onPress={()=>{
                                                    this.setState({
                                                        calander:true,
                                                        titleCalender:'start'
                                                    })

                                                }}
                                                style={{flexDirection:'row', marginTop:10}}>
                                                <View style={{backgroundColor:'#007BA4', width:SmartScreenBase.smPercenWidth * 15, height:SmartScreenBase.smPercenHeight*8, borderRadius:10, marginRight:5, marginLeft:5, justifyContent:'center', alignItems:'center'}}>
                                                    <Text style={{fontSize:25, color:'#FFFFFF', fontWeight: 'bold'}}>{arFrom[2]}</Text>
                                                </View>
                                                <View style={{backgroundColor:'#007BA4', width:SmartScreenBase.smPercenWidth * 15, height:SmartScreenBase.smPercenHeight*8, borderRadius:10,marginRight:5,justifyContent:'center', alignItems:'center'}}>
                                                    <Text style={{fontSize:25, color:'#FFFFFF', fontWeight: 'bold'}}>{arFrom[1]}</Text>
                                                </View>
                                                <View style={{backgroundColor:'#007BA4', width:SmartScreenBase.smPercenWidth * 15, height:SmartScreenBase.smPercenHeight*8, borderRadius:10,justifyContent:'center', alignItems:'center'}}>
                                                    <Text style={{fontSize:25, color:'#FFFFFF', fontWeight: 'bold'}}>{arFrom[0]}</Text>
                                                </View>
                                            </TouchableOpacity>
                                            <Text style={{marginTop:10, fontSize:20, color:'#000', marginLeft:20}}>Ngày kết thúc</Text>
                                            <TouchableOpacity
                                                onPress={()=>{
                                                    this.setState({calander:true,  titleCalender:'end'})
                                                }}
                                                style={{flexDirection:'row', marginTop:10}}>
                                                <View style={{backgroundColor:'#007BA4', width:SmartScreenBase.smPercenWidth * 15, height:SmartScreenBase.smPercenHeight*8, borderRadius:10, marginRight:5,marginLeft:5,justifyContent:'center', alignItems:'center'}}>
                                                    <Text style={{fontSize:25, color:'#FFFFFF', fontWeight: 'bold'}}>{arTo[2]}</Text>
                                                </View>
                                                <View style={{backgroundColor:'#007BA4', width:SmartScreenBase.smPercenWidth * 15, height:SmartScreenBase.smPercenHeight*8, borderRadius:10,marginRight:5,justifyContent:'center', alignItems:'center'}}>
                                                    <Text style={{fontSize:25, color:'#FFFFFF', fontWeight: 'bold'}}>{arTo[1]}</Text>
                                                </View>
                                                <View style={{backgroundColor:'#007BA4', width:SmartScreenBase.smPercenWidth * 15, height:SmartScreenBase.smPercenHeight*8, borderRadius:10,justifyContent:'center', alignItems:'center'}}>
                                                    <Text style={{fontSize:25, color:'#FFFFFF', fontWeight: 'bold'}}>{arTo[0]}</Text>
                                                </View>
                                            </TouchableOpacity>
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

export default index;
