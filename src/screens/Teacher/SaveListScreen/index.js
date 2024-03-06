import React, {PureComponent} from 'react';
import {
    FlatList,
    Image,
    ImageBackground,
    SafeAreaView,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import SmartScreenBase from '../../../base/SmartScreenBase';
import API from '../../../API/APIConstant';
import axios from 'axios';
import ImageSkill from '../../../assets/ImageSkill';
import LoadingScreen from '../../LoadingScreen';
import {connect} from 'react-redux';
import Header from '../../../component/Header';
import APIBase from '../../../base/APIBase';

class SaveListScreen extends PureComponent {
    constructor() {
        super();
        this.state = {
            data: [],
            erase: false,
            loading: true,
        };
    }

    componentDidMount() {
        this.props.navigation.addListener(
            'willFocus',
            () => {
                this._getWistList();
            },
        );

    }

    _getWistList = async () => {
        const url = API.baseurl + API.getWishList;
        const headers = {...API.header, jwt_token: APIBase.jwt_token};
        try {
            const res = await axios({method: 'get', url, headers});
            if (res.data.status) {
                this.setState({
                    data: res.data.data,
                });
            }
            this.setState({
                loading: false,
                erase: false,
            });
        } catch (e) {
            this.setState({
                loading: false,
                erase: false,
            });
            console.log('get wish list', e);
        }
    };

    _deleteWistList = async () => {
        this.setState({loading: true});
        const url = API.baseurl + API.getWishList;
        const headers = {
            ...API.header,
            'Content-Type': 'application/x-www-form-urlencoded',
            jwt_token: APIBase.jwt_token,
        };
        const qs = require('qs');
        const data = qs.stringify({
            user_wish_id: JSON.stringify(this.state.data.filter(item => item.checked).map(item => item.id)),
        });
        try {
            const res = await axios({method: 'DELETE', url, headers, data});
            if (res.data.status) {
                this._getWistList();
            } else {
                this.setState({loading: false});
            }
        } catch (e) {
            this.setState({loading: false});
            console.log('delete wist list', e);
        }
    };

    _cancelErase = () => {
        if (!this.state.erase) {
            this.props.navigation.goBack();
        } else {
            const {data} = this.state;
            this.setState({
                erase: false,
                data: data.map(item => {
                    delete item.checked;
                    return item;
                }),
            });
        }

    };

    _chooseAll = () => {
        const {data} = this.state;
        if (data.find(item => !item.checked)) {
            this.setState({
                data: data.map(item => {
                    item.checked = true;
                    return item;
                }),
            });
        } else {
            this.setState({
                data: data.map(item => {
                    item.checked = false;
                    return item;
                }),
            });
        }
    };

    _chooseItem = (index) => {
        const data = [...this.state.data];
        data[index].checked = !data[index].checked;
        this.setState({data});
    };

    _renderData = ({item, index}) => {
        const {erase} = this.state;
        const time = item.updated_at ? item.updated_at.split(' ') : item.created_at ? item.created_at.split(' ') : '';
        const date = new Date(time[0] + 'T' + time[1]);
        return (
            <TouchableWithoutFeedback
                onPress={() => erase && this._chooseItem(index)}
            >
                <View style={{
                    backgroundColor: '#fff',
                    marginTop: SmartScreenBase.smPercenHeight * 2,
                    marginHorizontal: SmartScreenBase.smPercenWidth * 3,
                    flexDirection: 'row',
                    borderRadius: SmartScreenBase.smPercenWidth * 3,
                }}>
                    <View style={{
                        paddingHorizontal: SmartScreenBase.smPercenWidth * 2,
                        paddingTop: SmartScreenBase.smPercenHeight * 2,
                    }}>
                        <Image
                            source={{uri: ImageSkill[`${item.lesson_type}`]}}
                            resizeMode={'contain'}
                            style={{
                                width: SmartScreenBase.smPercenWidth * 30,
                                height: SmartScreenBase.smPercenWidth * 26,
                            }}
                        />
                    </View>

                    <View
                        style={{flex: 1, padding: SmartScreenBase.smPercenWidth * 2, justifyContent: 'space-between'}}>
                        <View>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <Text style={{
                                    fontWeight: '700',
                                    fontSize: SmartScreenBase.smPercenWidth * 5,
                                    flex: 1,
                                }}>{item.curriculum_name}</Text>
                                {
                                    erase &&
                                    <View>
                                        <Image
                                            source={{uri: 'gv_55'}}
                                            resizeMode={'contain'}
                                            style={{
                                                width: SmartScreenBase.smPercenWidth * 5,
                                                height: SmartScreenBase.smPercenWidth * 5,
                                            }}
                                        />
                                        {
                                            item.checked &&
                                            <Image
                                                source={{uri: 'gv_56'}}
                                                resizeMode={'contain'}
                                                style={{
                                                    position: 'absolute',
                                                    top: -3,
                                                    right: 0,
                                                    width: SmartScreenBase.smPercenWidth * 5,
                                                    height: SmartScreenBase.smPercenWidth * 5,
                                                }}
                                            />
                                        }
                                    </View>
                                }
                            </View>
                            <Text style={{
                                color: 'rgba(0,0,0,0.72)',
                                fontSize: SmartScreenBase.smPercenWidth * 4,
                            }}>{item.unit_name}</Text>
                        </View>

                        <Text style={{
                            color: '#113254',
                            fontWeight: '700',
                            fontSize: SmartScreenBase.smPercenWidth * 3.8,
                        }}>Đã
                            thêm {`${date.getHours()}h${date.getMinutes()}' - ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    };

    _changeToDelete = () => {
        this.setState({erase: true});
    };

    _moveLibrary = () => {
        this.props.navigation.navigate('LibraryScreen', {status: true});
    };

    render() {
        const {data, erase, loading} = this.state;
        return (
            <ImageBackground source={{uri: 'imagebackground'}} style={{
                flex: 1,
                resizeMode: 'stretch',
            }}>
                {
                    loading ?
                        <LoadingScreen/>
                        :
                        <View style={{flex: 1}}>
                            {/*<View style={{*/}
                            {/*    width: SmartScreenBase.smPercenWidth * 100,*/}
                            {/*    backgroundColor: 'rgba(0,0,0,0.3)',*/}
                            {/*    flexDirection: 'row',*/}
                            {/*    alignItems: 'center',*/}
                            {/*    paddingTop: SmartScreenBase.smPercenHeight * 2,*/}
                            {/*    paddingBottom: SmartScreenBase.smPercenHeight,*/}
                            {/*}}>*/}

                            {/*    <TouchableOpacity*/}
                            {/*        onPress={this._cancelErase}*/}
                            {/*    >*/}
                            {/*        <Image style={{*/}
                            {/*            width: SmartScreenBase.smPercenWidth * 6,*/}
                            {/*            height: SmartScreenBase.smPercenWidth * 6,*/}
                            {/*            marginLeft: SmartScreenBase.smPercenWidth * 5,*/}
                            {/*        }}*/}
                            {/*               resizeMode={'contain'}*/}
                            {/*               source={{uri: 'imageback'}}*/}
                            {/*        />*/}
                            {/*    </TouchableOpacity>*/}
                            {/*    <Text style={{*/}
                            {/*        color: '#d7d7d7',*/}
                            {/*        marginLeft: SmartScreenBase.smPercenWidth * 5,*/}
                            {/*        fontSize: SmartScreenBase.smPercenWidth * 5.2,*/}
                            {/*    }}>*/}
                            {/*        {*/}
                            {/*            erase ?*/}
                            {/*                'Chọn mục cần xóa' :*/}
                            {/*                'Danh sách yêu thích'*/}
                            {/*        }*/}
                            {/*    </Text>*/}
                            {/*</View>*/}
                            <Header showBack={true} title={erase ?
                                'Chọn mục cần xóa' :
                                'Danh sách yêu thích'}
                                    goBack={() => this.props.navigation.goBack()}/>

                            <View style={{
                                paddingHorizontal: SmartScreenBase.smPercenWidth * 3,
                                height: SmartScreenBase.smPercenHeight * 5,
                            }}>
                                {
                                    erase &&
                                    <TouchableWithoutFeedback
                                        onPress={this._chooseAll}
                                    >
                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'flex-end',
                                            marginTop: SmartScreenBase.smPercenWidth * 3,
                                        }}>
                                            <View>
                                                <Image
                                                    source={{uri: 'gv_55'}}
                                                    resizeMode={'contain'}
                                                    style={{
                                                        width: SmartScreenBase.smPercenWidth * 5,
                                                        height: SmartScreenBase.smPercenWidth * 5,
                                                        tintColor: '#fff',
                                                    }}
                                                />
                                                {
                                                    !data.find(item => {
                                                        return !item.checked;
                                                    }) &&
                                                    <Image
                                                        source={{uri: 'gv_56'}}
                                                        resizeMode={'contain'}
                                                        style={{
                                                            position: 'absolute',
                                                            top: -3,
                                                            right: 0,
                                                            width: SmartScreenBase.smPercenWidth * 5,
                                                            height: SmartScreenBase.smPercenWidth * 5,
                                                        }}
                                                    />
                                                }
                                            </View>
                                            <Text
                                                style={{
                                                    color: '#fff',
                                                    marginLeft: SmartScreenBase.smPercenWidth * 2,
                                                }}>Gửi tất cả</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                }
                            </View>

                            <FlatList
                                data={data}
                                renderItem={this._renderData}
                                keyExtractor={(item, index) => {
                                    return item.toString() + index.toString();
                                }}
                            />

                            <View style={{padding: SmartScreenBase.smPercenHeight * 2, alignItems: 'center'}}>
                                {
                                    erase ?
                                        <TouchableOpacity style={{
                                            width: '44%',
                                            paddingVertical: SmartScreenBase.smPercenWidth * 3,
                                            backgroundColor: '#00283a',
                                            borderRadius: SmartScreenBase.smPercenWidth * 8,
                                            alignItems: 'center',
                                        }}
                                                          onPress={this._deleteWistList}
                                        >
                                            <Text style={{
                                                color: '#fff',
                                                fontWeight: 'bold',
                                                fontSize: SmartScreenBase.smPercenWidth * 5,
                                            }}>Chấp nhận</Text>
                                        </TouchableOpacity>
                                        :
                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            width: '100%',
                                        }}>
                                            <TouchableOpacity style={{
                                                width: '48%',
                                                paddingVertical: SmartScreenBase.smPercenWidth * 3,
                                                backgroundColor: '#00283a',
                                                borderRadius: SmartScreenBase.smPercenWidth * 8,
                                                alignItems: 'center',
                                            }} onPress={this._moveLibrary}>
                                                <Text style={{
                                                    color: '#fff',
                                                    fontWeight: 'bold',
                                                    fontSize: SmartScreenBase.smPercenWidth * 5,
                                                }}>Đến thư viện</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={this._changeToDelete}
                                                style={{
                                                    width: '48%',
                                                    paddingVertical: SmartScreenBase.smPercenWidth * 3,
                                                    backgroundColor: '#00283a',
                                                    borderRadius: SmartScreenBase.smPercenWidth * 8,
                                                    alignItems: 'center',
                                                }}>
                                                <Text style={{
                                                    color: '#fff',
                                                    fontWeight: 'bold',
                                                    fontSize: SmartScreenBase.smPercenWidth * 5,
                                                }}>Xóa</Text>
                                            </TouchableOpacity>
                                        </View>
                                }
                            </View>
                        </View>
                }
            </ImageBackground>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        dataClass: state.AuthStackReducer.dataClass,
    };
};

export default connect(mapStateToProps)(SaveListScreen);
