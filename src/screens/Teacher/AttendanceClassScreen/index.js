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
    FlatList,
    ImageBackground,
    Image,
} from 'react-native';

const {width, height} = Dimensions.get('window');
import SmartScreenBase from '../../../base/SmartScreenBase';
import API from '../../../API/APIConstant';
import axios from 'axios';
import Header from '../../../component/Header/Header';
import {connect} from 'react-redux';
import Carousel from 'react-native-snap-carousel';
import styles from '../FunctionTeacherScreen/Catagory.Style';
import LoadingScreen from '../../LoadingScreen';

class index extends PureComponent {
    state = {
        Data: [],
        item: this.props.navigation.getParam('item'),
        DataPush: [],
        DataClass: this.props.navigation.getParam('DataClass'),
        index: this.props.navigation.getParam('index'),
        isLoading: true,
    };

    async componentDidMount() {
        await this._get_getAttendance();
        this.props.navigation.addListener('willFocus', payload => {
            this._get_getAttendance();
        });
    }

    _get_getAttendance = async () => {
        this.setState({isLoading:true});
        console.log(this.state.index);
        const url = API.baseurl + API.getClassOffline + this.state.DataClass[this.state.index].id;
        const header = {
            'Content-Type': 'application/json',
            'jwt_token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImFkbWluIiwidGltZV9sb2dpbiI6MTU3ODkwNzQyM30.CFZyO9a-qBmyI8Q25AqGNd1nxWn1SO5TMC_yBxjgWCA',
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
        };
        axios({method: 'get', url: url, headers: header})
            .then((response) => {
                const DataPush = [];
                const DataRes = response.data.class_info.list_student;
                DataRes.map((e) => {
                    DataPush.push({id: e.id, fullname: e.user_name, parent_id: e.parent_id});
                });
                // this.props.dispatch({type: 'DIEMDANH', DataDiemDanh: this.state.DataPush});
                this.setState({DataPush});
                console.log(response.data.class_info);
                this.setState({
                    Data: response.data.class_info.list_student,
                });
            })
            .catch((error) => {
                console.log(error.message);
                if (error.message === 'Network Error') {
                    Alert.alert('Thông Báo', 'Vui lòng kiểm tra kết nối Internet', [
                        {text: 'Đồng ý', style: 'cancel'}
                    ]);
                }
                this.setState({isLoading: false});
            }).finally(() => {
            this.setState({isLoading: false});
        });
    };
    _onDelete = (id) => {
        const copied = [...this.state.Data];
        Alert.alert(
            'Thong báo',
            'Bạn có chắc chắn muốn xóa không?',
            [
                {
                    text: 'Hủy',
                    style: 'cancel',
                },
                {
                    text: 'Đồng ý', onPress: () => {
                        this.setState({
                            Data: copied.filter((e) => {
                                return e.id !== id;
                            }),
                        });
                    },
                },
            ],
            {cancelable: false},
        );
    };
    _renderItem = ({item, index}) => {
        return (
            <View style={{
                flex: 1,
                height: width / 5,
                borderBottomWidth: 1,
                borderBottomColor: 'gray',
                flexDirection: 'row',
                paddingHorizontal: SmartScreenBase.smPercenWidth * 5,
            }}>
                <View style={{flex: 4, flexDirection: 'row', alignItems: 'center'}}>
                    <Image style={{
                        width: width / 7,
                        height: width / 7,
                    }}
                           resizeMode={'contain'}
                           source={{uri: 'gv_liststudent_07'}}/>
                    <Text style={{
                        fontWeight: '800',
                        color: 'gray',
                        marginLeft: SmartScreenBase.smPercenWidth * 2,
                        fontSize: SmartScreenBase.smPercenWidth * 5,
                    }}>{item.user_name}</Text>
                </View>
                <TouchableOpacity style={{
                    flex: 1,
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                }}
                                  onPress={() => {
                                      this._onDelete(item.id);
                                  }}
                >
                    <Image
                        source={{uri: 'gv_108'}}
                        style={{
                            width: width / 15,
                            height: width / 15,
                        }}
                    />
                </TouchableOpacity>
            </View>
        );
    };
    _renderItemSnap = ({item, index}) => {
        return (
            <View style={styles.ViewBodyHeader}>
                <View style={styles.ViewImageHeader}>
                    <Image style={styles.ImageHeader}
                           resizeMode={'contain'}
                           source={{uri: 'ngv_64'}}/>
                </View>
                <View style={styles.ViewClass}>
                    <Text style={styles.TextClassName}>{item.class_name}</Text>
                    <Text style={styles.TextTime}>25/05/2020 - 25/02/2020</Text>
                    <Text style={styles.TextClass}>Tiếng anh lớp 12</Text>
                </View>

            </View>
        );
    };
    SnapToItem = async (index) => {
        await this.setState({index});
        await this._get_getAttendance();
    };

    render() {
        return (
            <ImageBackground source={{uri: 'imagebackground'}} style={{flex: 1}}>
                <Header navigation={this.props.navigation} title={this.state.item.class_name}/>
                <View style={{
                    flex: 3,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: SmartScreenBase.smPercenWidth * 5,
                    flexDirection: 'row',
                }}>
                    <View style={styles.ViewSlide}>
                        <View style={styles.Slide}/>
                    </View>
                    <View style={{
                        alignItems: 'center',
                        height: SmartScreenBase.smPercenHeight * 20,
                    }}>
                        <Carousel
                            ref={ref => this.carousel = ref}
                            data={this.state.DataClass}
                            sliderWidth={SmartScreenBase.smPercenWidth * 88}
                            itemWidth={SmartScreenBase.smPercenWidth * 88}
                            renderItem={this._renderItemSnap}
                            onSnapToItem={(index) => {
                                this.SnapToItem(index);
                            }}
                            firstItem={this.state.index}
                            useScrollView
                        />
                    </View>
                    <View style={styles.ViewSlideRight}>
                        <View style={styles.Slide}/>
                    </View>

                </View>
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    paddingHorizontal: SmartScreenBase.smPercenWidth * 7,
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>
                    <Text style={{
                        color: 'white',
                        fontWeight: '800',
                        fontSize: SmartScreenBase.smPercenWidth * 5,
                    }}>Danh sách lớp</Text>
                    <TouchableOpacity style={{
                        width: SmartScreenBase.smPercenWidth * 7,
                        height: SmartScreenBase.smPercenWidth * 7,
                    }}
                                      onPress={() => {
                                          this.props.navigation.navigate('AddToAttendanceScreen', {item: this.state.item});
                                      }}
                    >
                        <Image style={{
                            width: SmartScreenBase.smPercenWidth * 7,
                            height: SmartScreenBase.smPercenWidth * 7,
                        }}
                               resizeMode={'contain'}
                               source={{uri: 'gv_113'}}/>
                    </TouchableOpacity>

                </View>
                <View style={{
                    flex: 5.5,
                }}>
                    {this.state.isLoading ? <LoadingScreen/>
                        :
                        <View style={{
                            flex: 1,
                            marginHorizontal: SmartScreenBase.smPercenWidth * 3,
                            backgroundColor: '#ffffff',
                            borderRadius: 10,
                        }}>
                            <FlatList data={this.state.Data} renderItem={this._renderItem}
                                      keyExtractor={(item, index) => {
                                          return item.toString() + index.toString();
                                      }}
                                      showsVerticalScrollIndicator={false}
                                      extraData={this.state}/>
                        </View>
                    }

                </View>

                <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
                    <TouchableOpacity style={{
                        width: '50%',
                        height: 40,
                        backgroundColor: '#00283A',
                        borderRadius: 20,
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                                      onPress={() => {
                                          this.props.navigation.navigate('AttendanceScreen', {
                                              item: this.state.item,
                                              DataPush: this.state.DataPush,
                                          });
                                      }}
                    >
                        <Text style={{
                            color: 'white',
                            fontWeight: '800',
                            fontSize: SmartScreenBase.smPercenWidth * 5,
                        }}>Điểm danh</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        );
    }
}

export default connect()(index);
