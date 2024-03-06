import React, {PureComponent} from 'react';
import {
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Dimensions,
    ImageBackground,
    Image, Alert,
    Modal
} from 'react-native';

const {width, height} = Dimensions.get('window');
import Styles from '../workDeliveredTeacherScreen/workDeliveredTeacherScreenStyles';
import SmartScreenBase from '../../../base/SmartScreenBase';
import API from '../../../API/APIConstant';
import axios from 'axios';
import {connect} from "react-redux";
import Header from '../../../component/Header/Header';
import APIBase from "../../../base/APIBase";

class index extends PureComponent {
    state = {
        StudentName: '',
        ParentEmail: '',
        visible: false,
        item: this.props.navigation.getParam('item'),
    };
    _onSubmit = () => {
        const {StudentName, ParentEmail} = this.state;
        if (StudentName == '' || ParentEmail == '') {
            alert('Vui lòng nhập đủ thông tin')
        } else {
            const url = API.baseurl + API.addStudent;
            const header = {
                "jwt_token": APIBase.jwt_token,
                "X-API-KEY": "8c3a30506d9633a8b202cb5a91873efa",
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA=="
            };
            var details = {
                'fullname': StudentName,
                'class_id': this.state.item.id,
                'email_parent': ParentEmail
            };
            let formBody = [];
            for (let property in details) {
                let encodedKey = encodeURIComponent(property);
                let encodedValue = encodeURIComponent(details[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
            fetch(url, {
                method: 'POST',
                headers: header,
                body: formBody
            }).then((response) => response.json())
                .then((responseData) => {
                    console.log(responseData);
                    Alert.alert('Thông báo', "Thêm học sinh thành công.", [
                        {text: 'Đồng ý', style: 'cancel'}
                    ]);
                    this.props.navigation.goBack()
                }).catch(e => {
                Alert.alert('Thông báo', "Thêm học sinh thất bại.", [
                    {text: 'Đồng ý', style: 'cancel'}
                ]);
                console.log(e)
            })
        }

    };

    render() {
        return (
            <ImageBackground source={{uri: 'imagebackground'}} style={Styles.container}>
                <ScrollView contentContainerStyle={{flex: 1}}>
                    <Header navigation={this.props.navigation} title={'Thêm học viên'}/>
                    <View style={{
                        flex: 12,
                        backgroundColor: '#ffffff',
                    }}>
                        <ImageBackground source={{uri: 'gv_34'}} style={{flex: 0.8}}/>
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <View style={{
                                width: SmartScreenBase.smPercenWidth * 90,
                                height: SmartScreenBase.smPercenWidth * 12,
                                borderRadius: SmartScreenBase.smPercenWidth * 6,
                                borderWidth: 1,
                                flexDirection: 'row',
                                borderColor: '#4bf7ff',
                                marginTop: 20,
                            }}>
                                <View style={{
                                    width: 70,
                                    height: '100%',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <Image style={{
                                        width: 30,
                                        height: 30,
                                    }}
                                           resizeMode={'contain'}
                                           source={{uri: 'gv_93'}}/>
                                </View>

                                <TextInput style={{
                                    flex: 1,
                                    fontWeight: '400',
                                    fontSize: SmartScreenBase.smPercenWidth * 5,
                                    color: '#000',
                                    padding: 0,
                                }}
                                           placeholder="Nhập tên học viên .."
                                           underlineColorAndroid='transparent'
                                           placeholderTextColor="gray"
                                           onChangeText={(StudentName) => {
                                               this.setState({StudentName})
                                           }}
                                />
                            </View>
                            <View style={{
                                width: SmartScreenBase.smPercenWidth * 90,
                                height: SmartScreenBase.smPercenWidth * 12,
                                borderRadius: SmartScreenBase.smPercenWidth * 6,
                                borderWidth: 1,
                                flexDirection: 'row',
                                borderColor: '#4bf7ff',
                                marginTop: 20,
                            }}>
                                <View style={{
                                    width: 70,
                                    height: '100%',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <Image style={{
                                        width: 30,
                                        height: 30,
                                    }}
                                           resizeMode={'contain'}
                                           source={{uri: 'gv_114'}}/>
                                </View>

                                <TextInput style={{
                                    flex: 1,
                                    fontWeight: '400',
                                    fontSize: SmartScreenBase.smPercenWidth * 5,
                                    color: '#000',
                                    padding: 0,
                                }}
                                           placeholder="Nhập email phụ hynh .."
                                           underlineColorAndroid='transparent'
                                           placeholderTextColor="gray"
                                           onChangeText={(ParentEmail) => {
                                               this.setState({ParentEmail})
                                           }}
                                />
                            </View>
                            <TouchableOpacity style={{
                                height: 40,
                                width: 200,
                                backgroundColor: 'blue',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: 20,
                                position: 'absolute',
                                bottom: 25,
                            }}
                                              onPress={() => {
                                                  this._onSubmit()
                                              }}
                            >
                                <Text style={{
                                    color: 'white',
                                    fontWeight: '800',
                                    fontSize: SmartScreenBase.smPercenWidth * 5,
                                }}>Thêm học viên</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
        );
    }
}

function mapStateToProps(state) {
    return {
        Student: state.Student
    };
}

export default connect(mapStateToProps)(index);
