import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    ImageBackground,
    Image, Alert, FlatList, TouchableWithoutFeedback,
} from 'react-native';

const {width, height} = Dimensions.get('window');
import SmartScreenBase from '../../../../base/SmartScreenBase';
import axios from 'axios';
import {useSelector} from 'react-redux';
import stylesApp from "../../../../component/styleApp/stylesApp";
import style from "./style";
import styleButton from "../../../../../src/styleApp/stylesApp";
import API from "../../../../API/APIConstant";
import Header from '../../../../component/Header';
import APIBase from '../../../../base/APIBase';

let arrayskill = [];
const applyFor_class = ({navigation}) => {
    const [loading, setloading] = useState(true);
    const [isChecked, setisChecked] = useState(false);
    const storeRedux = useSelector(state => state.AuthStackReducer.dataClass);
    const [dataFilterEx, setdataFilterEx] = useState(
        [
            {
                id: 0,
                name: 'Đặng Minh Hiếu',
            },
            {
                id: 1,
                name: 'Đặng Minh Hiếu',
            },
            {
                id: 2,
                name: 'Đặng Minh Hiếu',
            },
            {
                id: 3,
                name: 'Đặng Minh Hiếu',
            },
            {
                id: 4,
                name: 'Đặng Minh Hiếu',
            },
            {
                id: 5,
                name: 'Đặng Minh Hiếu',
            },
            {
                id: 6,
                name: 'Đặng Minh Hiếu',
            },
            {
                id: 7,
                name: 'Đặng Minh Hiếu',
            },
        ]);

    useEffect(() => {
        getListstudent();
    }, [storeRedux.id_Class])

    const getListstudent = async () => {
        const url = API.baseurl +API.Data_request + storeRedux.id_Class;
        const header = {
            'Content-Type': 'application/json',
            'jwt_token': APIBase.jwt_token,
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA=='
        }
        try {
            setloading(false);
            const res = await axios({method: 'get', url: url, headers: header});
            let data = res.data;
            setdataFilterEx(data.list_request);
        } catch (error) {
            setloading(false);
            if (error.message === 'Network Error') {
                Alert.alert('Thông Báo', 'Vui lòng kiểm tra kết nối Internet');
            }
        }
    };

    const _onGoBack = () => {
        navigation.goBack();
    }

    const  _onRefuse = async  () =>{
        dataFilterEx.map(data => {
            if (data.isChecked) {
                arrayskill.push(data.id);
            }
        });
        const url = API.baseurl + API.Reject_member_request;
        const headers = {
            'Content-Type': 'application/json',
            'jwt_token': APIBase.jwt_token,
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA=='
        };
        const data = {
            class_id: storeRedux.id_Class,
            list_request_id:  JSON.stringify(arrayskill),
        };
        try {
            const res = await axios({ method: 'PUT', url, headers, data });
            Alert.alert('Thông báo', 'Từ chối học sinh xin vào lớp thành công');
            arrayskill = [];
            getListstudent();
        }
        catch (error) {
            console.log(error)
        }
    }
    const _onBrowser = async () => {
            dataFilterEx.map(data => {
                if (data.isChecked) {
                    arrayskill.push(data.id);
                }
            });
        const url = API.baseurl + API.Rccept_member_request;
        const headers = {
            'Content-Type': 'application/json',
            'jwt_token': APIBase.jwt_token,
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA=='
        };
        const data = {
            class_id: storeRedux.id_Class,
            list_request_id:  JSON.stringify(arrayskill),
        };
        try {
            const res = await axios({ method: 'PUT', url, headers, data });
            Alert.alert('Thông báo', 'Duyệt học sinh xin vào lớp thành công');
            arrayskill = [];
            getListstudent();
        }
        catch (error) {
            console.log(error)
        }
    }

    const FilterExercise = (item, index) => {
        setdataFilterEx(
            dataFilterEx.map(data => {
                if (data === item) {
                    if (!data.isChecked) {
                        data.isChecked = true;
                        arrayskill.push(data.name)
                    } else {
                        delete data.isChecked;
                    }
                }
                return data;
            }),
        );
    };
    const _renderApplyforclass = ({item, index}) => {
        return (
            <View style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: SmartScreenBase.smPercenWidth * 3,
            }}>
                <View style={{
                    justifyContent: "center",
                    alignItems: "center",
                    height: SmartScreenBase.smPercenWidth * 13,
                    width: SmartScreenBase.smPercenWidth * 10,
                }}>
                    <Text style={{fontWeight: 'bold'}}>
                        {index + 1}
                    </Text>
                </View>
                <View style={{
                    height: SmartScreenBase.smPercenWidth * 13,
                    marginHorizontal: '1.5%',
                }}>
                    <ImageBackground source={{uri: 'gv_liststudent_11'}}
                                     imageStyle={{
                                         borderRadius: SmartScreenBase.smPercenWidth * 20 / 2,
                                         borderWidth: 1,
                                         borderColor: '#E5B007',
                                         resizeMode: 'cover'
                                     }}
                                     style={style.styleAvatar}
                    />
                </View>
                <View style={{
                    width: SmartScreenBase.smPercenWidth * 50,
                    height: SmartScreenBase.smPercenWidth * 13,
                    justifyContent: 'center'
                }}>
                    <View style={{
                        width: SmartScreenBase.smPercenWidth * 55,
                        flexDirection: "row",
                        alignItems: "center",
                    }}>
                        <View style={{
                            width: SmartScreenBase.smPercenWidth * 45,
                        }}>
                            <Text>
                                {item.name}
                            </Text>
                        </View>
                        <TouchableOpacity
                            style={{
                                alignItems: 'center'
                            }}
                            onPress={() => {
                                FilterExercise(item);
                            }}
                        >
                            <View style={{
                                alignItems: 'center',
                                justifyContent: "center",
                                width: SmartScreenBase.smBaseWidth * 70,
                                height: SmartScreenBase.smBaseWidth * 70,
                            }}>
                                <ImageBackground source={{uri: 'gv_55'}} style={{
                                    width: SmartScreenBase.smBaseWidth * 60,
                                    height: SmartScreenBase.smBaseWidth * 60,
                                    resizeMode: 'contain',
                                    marginHorizontal: SmartScreenBase.smPercenWidth,
                                }}>
                                    {item.isChecked && <Image source={{uri: 'gv_56'}} style={{
                                        position: 'absolute',
                                        bottom: 5,
                                        width: SmartScreenBase.smBaseWidth * 60,
                                        height: SmartScreenBase.smBaseWidth * 60,
                                        resizeMode: 'contain',
                                        marginHorizontal: SmartScreenBase.smPercenWidth,
                                    }}/>
                                    }
                                </ImageBackground>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
    return (
        <ImageBackground
            source={{uri: 'imagebackgroundlesson'}}
            imageStyle={stylesApp.ImageBackGround}
            style={{flex: 1}}>
            {/*<View style={{*/}
            {/*    justifyContent: "space-between",*/}
            {/*    alignItems: "center",*/}
            {/*    height: SmartScreenBase.smPercenHeight * 6,*/}
            {/*    width: width,*/}
            {/*    backgroundColor: "#0B0B6195",*/}
            {/*    flexDirection: "row"*/}
            {/*}}>*/}
            {/*    <View style={{*/}
            {/*        marginLeft: SmartScreenBase.smPercenWidth * 2,*/}
            {/*        flexDirection: 'row',*/}
            {/*        alignItems: 'center',*/}
            {/*        justifyContent: 'center'*/}
            {/*    }}>*/}
            {/*        <TouchableOpacity style={{*/}
            {/*            width: SmartScreenBase.smPercenWidth * 5,*/}
            {/*            height: SmartScreenBase.smPercenWidth * 5,*/}
            {/*        }}*/}
            {/*                          onPress={_onGoBack}*/}
            {/*        >*/}
            {/*            <Image style={{*/}
            {/*                width: SmartScreenBase.smPercenWidth * 5,*/}
            {/*                height: SmartScreenBase.smPercenWidth * 5,*/}
            {/*            }}*/}
            {/*                   resizeMode={'contain'}*/}
            {/*                   source={{uri: "imageback"}}/>*/}
            {/*        </TouchableOpacity>*/}

            {/*        <Text style={{*/}
            {/*            color: 'white',*/}
            {/*            marginLeft: SmartScreenBase.smPercenWidth * 2,*/}
            {/*            fontWeight: "800",*/}
            {/*            fontSize: SmartScreenBase.smPercenWidth * 5*/}
            {/*        }}>{storeRedux.className}</Text>*/}
            {/*    </View>*/}
            {/*</View>*/}
            <Header showBack={true} title={storeRedux.className} goBack={() => navigation.goBack()}/>
            <View style={{
                height: SmartScreenBase.smPercenHeight * 5,
                marginHorizontal: SmartScreenBase.smPercenWidth * 3,
                justifyContent: 'space-around',
                alignItems: 'center',
                flexDirection: 'row',
            }}>
                <Text style={{
                    color: '#FFFFFF',
                    fontSize: SmartScreenBase.smPercenHeight * 3,
                    fontFamily: 'iCielSoupofJustice',
                    marginLeft: SmartScreenBase.smPercenHeight * 2,
                }}>
                    Danh sách xin vào lớp
                </Text>
                <TouchableWithoutFeedback style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}
                                          onPress={() => {
                                              setisChecked(!isChecked);
                                              if (isChecked !== true) {
                                                  setdataFilterEx(
                                                      dataFilterEx.map(data => {
                                                          data.isChecked = true;
                                                          return data;
                                                      }),
                                                  );
                                              } else {
                                                  setdataFilterEx(
                                                      dataFilterEx.map(data => {
                                                          data.isChecked = false;
                                                          return data;
                                                      }),
                                                  );
                                              }
                                          }}
                >
                    <View style={{
                        width: SmartScreenBase.smBaseWidth * 60,
                        height: SmartScreenBase.smBaseWidth * 60,
                    }}>
                        <ImageBackground source={{uri: 'gv_55'}} style={{
                            width: SmartScreenBase.smBaseWidth * 60,
                            height: SmartScreenBase.smBaseWidth * 60,
                            resizeMode: 'contain',
                            marginHorizontal: SmartScreenBase.smPercenWidth,

                        }}>
                            {
                                isChecked && <Image source={{uri: 'gv_56'}} style={{
                                    position: 'absolute',
                                    bottom: 5,
                                    width: SmartScreenBase.smBaseWidth * 60,
                                    height: SmartScreenBase.smBaseWidth * 60,
                                    resizeMode: 'contain',
                                    marginHorizontal: SmartScreenBase.smPercenWidth,
                                }}/>}
                        </ImageBackground>
                    </View>
                </TouchableWithoutFeedback>
            </View>
            <View style={{
                backgroundColor: '#fff',
                borderRadius: 10,
                marginTop: SmartScreenBase.smPercenHeight * 2,
                height: '70%',
                marginHorizontal: width * 0.05
            }}>
                <View style={{
                    height: '100%',
                    alignItems: 'center',
                    marginTop: '6%',
                    paddingBottom: '3%',
                }}>
                    <FlatList
                        data={dataFilterEx}
                        width='95%'
                        renderItem={_renderApplyforclass}
                        keyExtractor={(index) => index.toString()}
                        scrollEnabled={true}
                    />
                </View>
            </View>
            <View style={{
                height: SmartScreenBase.smPercenWidth * 20,
                justifyContent: "space-around",
                flexDirection: "row",
                alignItems: "center",
            }}>
                <TouchableOpacity
                    onPress={() => _onBrowser()}
                    style={styleButton.Sty_ShortButton}>
                    <Text style={styleButton.Sty_Text_Button}>
                        Duyệt
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => _onRefuse()}
                    style={styleButton.Sty_ShortButton}>
                    <Text style={styleButton.Sty_Text_Button}>
                        Từ chối
                    </Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
}

export default applyFor_class;
