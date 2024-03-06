import React, {PureComponent} from 'react';
import {Image, ImageBackground, Text, TouchableOpacity, View, FlatList, TouchableWithoutFeedback} from 'react-native';
import API from "../../../API/APIConstant";
import axios from 'axios';
import SmartScreenBase from '../../../base/SmartScreenBase';
import ImageSkill from "../../../assets/ImageSkill";
import LoadingScreen from "../../LoadingScreen";
import {hoanthanh} from '../../../redux/actions/hoanthanh';
import {connect} from 'react-redux';
import Header from '../../../component/Header';

class ChooseFromSaveScreen extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: true,
            arChoose: []
        };
    }

    componentDidMount(): void {
        this._getWistList();
    }

    _getWistList = async () => {
        const url = API.baseurl + API.getWishList;
        const headers = API.header;
        try {
            const res = await axios({method: 'get', url, headers});
            if (res.data.status) {
                this.setState({
                    data: res.data.data
                })
            }
            this.setState({loading: false});
        } catch (e) {
            this.setState({loading: false});
            console.log('get wish list', e)
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
        const {time} = this.props;
        const data = [...this.state.data];
        let dataC = [...this.state.arChoose];
        data[index].checked = !data[index].checked;
        if (data[index].checked) {
            data[index]['lesson_id'] = data[index]['exercise_id'];
            data[index]['lesson_name'] = data[index]['exercise_name'];
            let ob = {};
            ob.item = data[index];
            ob.status = true;
            ob.start = time.start;
            ob.end = time.end;
            ob.file = '';
            dataC.push(ob);
        }
        this.setState({arChoose: dataC});
        this.setState({data});
    };

    _renderData = ({item, index}) => {
        const time = item.updated_at ? item.updated_at.split(' ') : item.created_at ? item.created_at.split(' ') : '';
        const date = new Date(time[0] + 'T' + time[1]);
        return (
            <TouchableWithoutFeedback onPress={() => this._chooseItem(index)}>
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
                        <Image source={{uri: ImageSkill[`${item.lesson_type}`]}}
                               resizeMode={'contain'}
                               style={{
                                   width: SmartScreenBase.smPercenWidth * 30,
                                   height: SmartScreenBase.smPercenWidth * 26,
                               }}
                        />
                    </View>
                    <View style={{flex: 1, padding: SmartScreenBase.smPercenWidth * 2, justifyContent: 'space-between'}}>
                        <View style={{flex: 1}}>
                            <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                <View style={{flex: 8}}>
                                    <Text style={{
                                        fontWeight: '700',
                                        fontSize: SmartScreenBase.smPercenWidth * 5,
                                    }}>{item.curriculum_name}</Text>
                                </View>
                                <View style={{flex: 1}}>
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
                            </View>
                            <Text style={{
                                color: 'rgba(0,0,0,0.72)',
                                fontSize: SmartScreenBase.smPercenWidth * 4,
                            }}>{item.unit_name}</Text>
                        </View>
                        {
                            (item.updated_at || item.created_at) &&
                            <Text style={{
                                color: '#113254',
                                fontWeight: '700',
                                fontSize: SmartScreenBase.smPercenWidth * 3.8,
                            }}>Đã
                                thêm {`${date.getHours()}h${date.getMinutes()}' - ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}</Text>
                        }
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    };

    _continue = () => {
        if (this.state.arChoose.length) {
            this.props.dispatch(hoanthanh(this.state.arChoose));
            this.props.navigation.navigate('hoanthanh1');
        } else {
        }
    }

    render() {
        const {data, loading} = this.state;
        return (
            <ImageBackground source={{uri: 'imagebackground'}} style={{
                flex: 1,
                resizeMode: 'stretch',
            }}>
                {
                    loading ?
                        <LoadingScreen/> :
                        <View style={{flex: 1}}>
                            {/*<View style={{*/}
                            {/*    width: SmartScreenBase.smPercenWidth * 100,*/}
                            {/*    backgroundColor: "rgba(0,0,0,0.3)",*/}
                            {/*    flexDirection: "row",*/}
                            {/*    alignItems: 'center',*/}
                            {/*    paddingTop: SmartScreenBase.smPercenHeight * 2,*/}
                            {/*    paddingBottom: SmartScreenBase.smPercenHeight*/}
                            {/*}}>*/}
                            {/*    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>*/}
                            {/*        <Image style={{*/}
                            {/*            width: SmartScreenBase.smPercenWidth * 6,*/}
                            {/*            height: SmartScreenBase.smPercenWidth * 6,*/}
                            {/*            marginLeft: SmartScreenBase.smPercenWidth * 5*/}
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
                            {/*        Chọn từ danh sách yêu thích*/}
                            {/*    </Text>*/}

                            {/*</View>*/}
                            <Header showBack={true} title={'Chọn từ danh sách yêu thích'} goBack={() => this.props.navigation.goBack()}/>

                            <View style={{
                                paddingHorizontal: SmartScreenBase.smPercenWidth * 3,
                                height: SmartScreenBase.smPercenHeight * 5,
                            }}>

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
                                        <Text style={{color: '#fff', marginLeft: SmartScreenBase.smPercenWidth * 2}}>Gửi
                                            tất
                                            cả</Text>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>

                            <FlatList
                                data={data}
                                renderItem={this._renderData}
                                keyExtractor={(item, index) => {
                                    return item.toString() + index.toString();
                                }}
                            />

                            <View style={{padding: SmartScreenBase.smPercenHeight * 2, alignItems: 'center'}}>
                                <TouchableOpacity style={{
                                    width: '44%',
                                    paddingVertical: SmartScreenBase.smPercenWidth * 3,
                                    backgroundColor: '#00283a',
                                    borderRadius: 20,
                                    alignItems: 'center',
                                    height: 40,
                                    justifyContent: 'center'
                                }}
                                                  onPress={() => this._continue()}
                                >
                                    <Text style={{
                                        color: '#fff',
                                        fontWeight: 'bold',
                                        fontSize: SmartScreenBase.smPercenWidth * 5,
                                    }}>Chọn</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                }
            </ImageBackground>
        );
    }
}


function mapStateToProps(state) {
    return {
        data_answer: state.timegiaobai.data_answer,
        time: state.timegiaobai.data_answer,
    };
}

export default connect(mapStateToProps)(ChooseFromSaveScreen);

