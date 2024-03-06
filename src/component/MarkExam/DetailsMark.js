import React, {useEffect, useState} from 'react';
import {FlatList, Image, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View, Alert} from 'react-native';
import SmartScreenBase from '../base/SmartScreenBase';
import API from '../../API/APIConstant';
import axios from 'axios';
import LoadingScreen from '../../screens/LoadingScreen';
import {useSelector} from 'react-redux';
import APIBase from '../../base/APIBase';

const smartScreenHeight = SmartScreenBase.smPercenHeight;
const smartScreenWidth = SmartScreenBase.smPercenWidth;
const smartFont = SmartScreenBase.smFontSize;
let checkBox = [];
let avg_score = 0, min_score = 0, max_score = 0;

const MarkExam = (props) => {

    const dataClass = useSelector(state => state.AuthStackReducer.dataClass);
    const exercise_id = props.navigation.getParam('exercise_id');
    const exercise_name = props.navigation.getParam('exercise_name');
    const type = props.navigation.getParam('type');
    const count_done = props.navigation.getParam('count_done');
    const count_user = props.navigation.getParam('count_user');
    const [isLoading, setIsLoading] = useState(true);
    const [selected, setSelected] = useState(false);
    const [dataStudent, setDataStudent] = useState([]);

    useEffect(() => {
        _getExam();
    }, []);

    const _getExam = async () => {

        const url = API.baseurl + API.getDetailsExamClass(dataClass.id_Class, exercise_id);
        const header = {
            'Content-Type': 'application/json',
            'jwt_token': APIBase.jwt_token,
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
        };
        try {
            const res = await axios({method: 'get', url: url, headers: header});
            let data = res.data;
            if (data.status) {
                let dataS = [...dataStudent];
                dataS = data.data;
                avg_score = data.avg_score;
                min_score = data.avg_score;
                max_score = data.avg_score;
                setDataStudent(dataS);
                setIsLoading(false);
            }
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    };

    const _acceptAmicaResult = async () => {
        setIsLoading(true);
        const url = API.baseurl + API.acceptAmicaResult;
        const headers = {
            'Content-Type': 'application/json',
            'jwt_token': APIBase.jwt_token,
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
        };
        try {
            let data = {};
            data['user_exercise_id'] = JSON.stringify(checkBox);
            const res = await axios({method: 'put', url, headers, data});
            let dataRt = res.data;
            console.log('dataRt', dataRt);
            if (dataRt.status) {
                props.goBack();
            } else {
                Alert.alert('Thông báo', dataRt.msg, [
                    {text: 'Đồng ý', style: 'cancel'}
                ]);
            }
            // console.log(dataRt);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log(error.response.data);
        }
    };

    const _requestAmica = async () => {
        setIsLoading(true);
        const url = API.baseurl + API.requestAmica;
        const headers = {
            'Content-Type': 'application/json',
            'jwt_token': APIBase.jwt_token,
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
        };
        try {
            let data = {};
            data['user_exercise_id'] = JSON.stringify(checkBox);
            const res = await axios({method: 'put', url, headers, data});
            let dataRt = res.data;
            if (dataRt.status) {
                props.navigation.goBack();
            } else {
                Alert.alert('Thông báo', dataRt.msg, [
                    {text: 'Đồng ý', style: 'cancel'}
                ]);
            }
            // console.log(dataRt);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    };

    const _setSelectedItem = (sl, index) => {
        let dataS = [...dataStudent];
        if (sl) {
            let indexO = checkBox.indexOf(dataS[index]['exercise_id']);
            checkBox.splice(indexO, 1);
            dataS[index]['selected'] = false;
        } else {
            checkBox.push(dataS[index]['exercise_id']);
            dataS[index]['selected'] = true;
        }
        if (checkBox.length === dataS.length) {
            setSelected(true);
        } else {
            setSelected(false);
        }
        setDataStudent(dataS);
    };

    const _setSelectedAll = () => {
        let dataS = [...dataStudent];
        if (selected) {
            dataS.forEach((element, i) => {
                dataS[i]['selected'] = false;
            });
            checkBox = [];
        } else {
            dataS.forEach((element, i) => {
                dataS[i]['selected'] = true;
                checkBox.push(element.exercise_id);
            });
        }
        setSelected(!selected);
        setDataStudent(dataS);
    };

    const _detailsMark = async (typeF, id) => {
        if (typeF === 'writing') {
            await props.navigation.navigate('WritingNew', {
                id: id,
                exercise_name: exercise_name,
                type: type,
            });
        } else {
            await props.navigation.navigate('Speaking', {
                id: id,
                exercise_name: exercise_name,
                type: type,
            });
        }
    };

    const _renderItem = ({item, index}) => {
        return (
            <TouchableOpacity
                style={{flex: 1}}
                onPress={() => _detailsMark(item.exercise_type, item.id)}
            >
                <View style={{
                    flexDirection: 'row',
                    flex: 1,
                    marginBottom: smartScreenHeight * 2,
                    alignItems: 'center',
                    marginTop: smartScreenHeight * 2,
                }}>
                    <View style={{flex: 1}}>
                        <Text style={{color: '#fff', fontWeight: 'bold', fontSize: smartFont * 50}}>{index + 1}</Text>
                    </View>
                    <View style={{
                        flex: 6,
                        backgroundColor: '#e9f0f2',
                        flexDirection: 'row',
                        borderRadius: smartScreenWidth * 5,
                    }}>
                        <View style={{
                            position: 'absolute',
                            top: smartScreenHeight * 2,
                            left: -SmartScreenBase.smPercenWidth * 10,
                        }}>
                            <Image style={{
                                width: SmartScreenBase.smPercenWidth * 20,
                                height: SmartScreenBase.smPercenWidth * 20,
                                zIndex: 10,
                            }}
                                   resizeMode={'contain'}
                                   source={{uri: 'gv_liststudent_08'}}/>
                            <View style={{
                                width: SmartScreenBase.smPercenWidth * 20,
                                height: SmartScreenBase.smPercenWidth * 20,
                                backgroundColor: '#00000080',
                                position: 'absolute',
                                borderRadius: SmartScreenBase.smPercenWidth * 10,
                                top: smartScreenWidth * 1.5,
                                left: smartScreenWidth * 1.5,
                            }}>
                            </View>
                        </View>
                        <View style={{
                            width: smartScreenWidth * 20,
                            position: 'absolute',
                            top: -smartScreenWidth,
                            right: SmartScreenBase.smPercenWidth * 4,
                            backgroundColor: '#ed8a22',
                            borderRadius: smartScreenWidth,
                            zIndex: 100,
                        }}>
                            <Text style={{
                                textAlign: 'center',
                                padding: smartScreenWidth,
                                fontWeight: 'bold',
                                fontSize: smartFont * 50,
                                color: '#fff',
                            }}>{item.score} <Text
                                style={{fontWeight: 'normal', fontSize: smartFont * 25}}>ĐIỂM</Text></Text>
                        </View>
                        <View style={{
                            width: smartScreenWidth * 21,
                            position: 'absolute',
                            top: smartScreenWidth / 30,
                            right: smartScreenWidth * 3.5,
                            backgroundColor: '#00000060',
                            borderRadius: smartScreenWidth,
                            zIndex: 9,
                        }}>
                            <Text style={{
                                textAlign: 'center',
                                padding: smartScreenWidth,
                                fontWeight: 'bold',
                                fontSize: smartFont * 50,
                                color: '#fff',
                            }}>2 <Text style={{fontWeight: 'normal', fontSize: smartFont * 25}}>điểm</Text></Text>
                        </View>
                        <View style={{flex: 1.5}}></View>
                        <View style={{flex: 5}}>
                            <Text style={{
                                fontSize: smartFont * 50,
                                paddingTop: smartScreenHeight * 3,
                                paddingBottom: smartScreenHeight * 3,
                            }}>{item.to_fullname}</Text>
                            <View style={{
                                flexDirection: 'row',
                                marginBottom: smartScreenHeight * 3,
                                alignItems: 'center',
                            }}>
                                <Image style={{
                                    width: SmartScreenBase.smPercenWidth * 5,
                                    height: SmartScreenBase.smPercenWidth * 5,
                                }}
                                       resizeMode={'contain'}
                                       source={{uri: 'gv_45'}}/>
                                <Text
                                    style={{paddingLeft: smartScreenWidth * 3}}>{_renderTime(item.completed_datetime)}</Text>
                            </View>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            {
                                type !== 1
                                    ?
                                    <View style={{
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flex: 1,
                                    }}>
                                        <TouchableWithoutFeedback
                                            onPress={() => _setSelectedItem(item.selected, index)}>
                                            <View style={{
                                                width: SmartScreenBase.smPercenWidth * 6,
                                                height: SmartScreenBase.smPercenWidth * 6,
                                                marginRight: SmartScreenBase.smPercenWidth * 3,
                                            }}>
                                                <Image style={{
                                                    width: SmartScreenBase.smPercenWidth * 6,
                                                    height: SmartScreenBase.smPercenWidth * 6,
                                                }}
                                                       resizeMode={'contain'}
                                                       source={{uri: 'gv_55'}}/>
                                                {
                                                    item.selected
                                                        ?
                                                        <Image
                                                            style={{
                                                                width: SmartScreenBase.smPercenWidth * 6,
                                                                height: SmartScreenBase.smPercenWidth * 6,
                                                                position: 'absolute',
                                                                bottom: 3,
                                                            }}
                                                            resizeMode={'contain'}
                                                            source={{uri: 'gv_56'}}
                                                        />
                                                        :
                                                        null
                                                }
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </View>
                                    :
                                    null
                            }
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    const _renderTime = (time) => {
        let rt = '';
        if (time) {
            let t = time.split(' ');
            let date = t[0];
            let hour = t[1];
            date = date.split('-');
            hour = hour.split(':');
            rt = `${hour[0]}h${hour[1]}' - ${date[2]}/${date[1]}/${date[0]}`;
        }
        return rt;
    };

    const _renderBtnWait = () => {
        return (
            <View style={{width: smartScreenWidth * 100, justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity style={{
                    margin: smartScreenHeight * 3,
                    width: smartScreenWidth * 35,
                    backgroundColor: '#01283a',
                    borderRadius: smartScreenWidth * 15,
                }}
                                  onPress={() => _acceptAmicaResult()}
                >
                    <Text style={{
                        color: '#fff',
                        textAlign: 'center',
                        padding: smartScreenHeight * 2,
                        fontWeight: 'bold',
                    }}>Duyệt</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const _renderBtnNotMark = () => {
        return (
            <View style={{width: smartScreenWidth * 100, justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity style={{
                    margin: smartScreenHeight * 3,
                    width: smartScreenWidth * 60,
                    backgroundColor: '#01283a',
                    borderRadius: smartScreenWidth * 15,
                }}
                                  onPress={() => _requestAmica()}
                >
                    <Text style={{
                        color: '#fff',
                        textAlign: 'center',
                        padding: smartScreenHeight * 2,
                        fontWeight: 'bold',
                    }}>Nhờ Sunday chấm</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const _renderMarked = () => {
        return (
            <View style={{
                width: smartScreenWidth * 100,
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                paddingHorizontal: smartScreenWidth,
            }}>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: '#fff'}}>Điểm trung bình :</Text>
                        <Text style={{
                            color: '#c5f4ff',
                            fontWeight: 'bold',
                            fontSize: smartFont * 80,
                            padding: smartScreenHeight * 3,
                        }}>{parseInt(avg_score)}</Text>
                    </View>
                    <Image style={{
                        height: smartScreenHeight * 15, width: smartScreenWidth * 2,
                    }}
                           resizeMode={'contain'}
                           source={{uri: 'thanhtrang'}}/>
                </View>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row'}}>
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Text style={{color: '#fff'}}>Điểm cao nhất: </Text>
                        <Text style={{
                            color: '#c5f4ff',
                            fontWeight: 'bold',
                            fontSize: smartFont * 80,
                            padding: smartScreenHeight * 3,
                        }}>{parseInt(max_score)}</Text>
                    </View>
                    <Image style={{
                        height: smartScreenHeight * 15, width: smartScreenWidth * 2,
                    }}
                           resizeMode={'contain'}
                           source={{uri: 'thanhtrang'}}/>
                </View>
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <Text style={{color: '#fff'}}>Điểm thấp nhất: </Text>
                    <Text style={{
                        color: '#c5f4ff',
                        fontWeight: 'bold',
                        fontSize: smartFont * 80,
                        padding: smartScreenHeight * 3,
                    }}>{parseInt(min_score)}</Text>
                </View>
            </View>
        );
    };

    return (
        <View style={{flex: 1, backgroundColor: '#3279b9'}}>
            {
                isLoading
                    ?
                    <LoadingScreen/>
                    :
                    <View style={{flex: 1}}>
                        <View style={{
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            backgroundColor: 'rgba(0,0,0,0.3)',
                            flexDirection: 'row',
                        }}>
                            <View style={{
                                marginLeft: SmartScreenBase.smPercenWidth * 2,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                marginTop: SmartScreenBase.smPercenHeight * 3,
                            }}>
                                <TouchableOpacity style={{
                                    width: SmartScreenBase.smPercenWidth * 5,
                                    height: SmartScreenBase.smPercenWidth * 5,
                                    // backgroundColor: '#fff',
                                }}
                                                  onPress={() => props.navigation.goBack()}
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
                                    fontSize: SmartScreenBase.smPercenWidth * 5,
                                    padding: smartScreenHeight,
                                }}>{type === 1 ? 'Đã chấm' : type === 2 ? 'Chưa chấm' : 'Chờ duyệt'}</Text>
                            </View>
                        </View>
                        <View style={{paddingHorizontal: smartScreenWidth * 2.5, flex: 1}}>
                            <Text style={{
                                fontWeight: 'bold',
                                color: '#fff',
                                fontSize: smartFont * 50,
                                paddingTop: smartScreenHeight * 3,
                            }}>{exercise_name}</Text>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'flex-end',
                                width: smartScreenWidth * 95,
                                marginTop: smartScreenHeight * 2,
                            }}>
                                <View style={{flex: 1}}>
                                    <Text style={{color: '#fff', fontWeight: 'bold'}}>Các bài đã chấm
                                        ({count_done}/{count_user}):</Text>
                                </View>
                                {
                                    type === 1
                                        ?
                                        null
                                        :
                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'flex-end',
                                            alignItems: 'flex-end',
                                            flex: 1,
                                        }}>
                                            <Text style={{color: '#fff', paddingRight: smartScreenWidth * 3}}>All</Text>
                                            <TouchableWithoutFeedback onPress={() => _setSelectedAll()}>
                                                <View style={{
                                                    width: SmartScreenBase.smPercenWidth * 6,
                                                    height: SmartScreenBase.smPercenWidth * 6,
                                                    marginRight: SmartScreenBase.smPercenWidth * 3,
                                                }}>
                                                    <Image style={{
                                                        width: SmartScreenBase.smPercenWidth * 6,
                                                        height: SmartScreenBase.smPercenWidth * 6,
                                                        tintColor: '#fff',
                                                    }}
                                                           resizeMode={'contain'}
                                                           source={{uri: 'gv_55'}}/>
                                                    {
                                                        selected
                                                            ?
                                                            <Image
                                                                style={{
                                                                    width: SmartScreenBase.smPercenWidth * 6,
                                                                    height: SmartScreenBase.smPercenWidth * 6,
                                                                    position: 'absolute',
                                                                    bottom: 3,
                                                                }}
                                                                resizeMode={'contain'}
                                                                source={{uri: 'gv_56'}}
                                                            />
                                                            :
                                                            null
                                                    }
                                                </View>
                                            </TouchableWithoutFeedback>
                                        </View>
                                }
                            </View>
                        </View>
                        <View style={{flex: 5, paddingHorizontal: smartScreenWidth * 2.5}}>
                            <FlatList
                                data={dataStudent}
                                renderItem={_renderItem}
                                keyExtractor={(index) => index.toString()}
                                scrollEnabled={true}
                            />
                        </View>
                        {
                            type === 1
                                ?
                                _renderMarked()
                                :
                                type === 2
                                    ?
                                    _renderBtnNotMark()
                                    :
                                    _renderBtnWait()
                        }
                    </View>
            }
        </View>
    );
};

const styles = StyleSheet.create({
    scene: {
        flex: 1,
    },
    tabStyle: {
        fontSize: smartFont * 10,
        backgroundColor: 'red',
    },
});


export default MarkExam;
