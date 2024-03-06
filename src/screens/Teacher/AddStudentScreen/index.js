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
    Modal,
} from 'react-native';
import LoadingScreen from '../../../component/Loading';

const {width, height} = Dimensions.get('window');
import Styles from '../workDeliveredTeacherScreen/workDeliveredTeacherScreenStyles';
import SmartScreenBase from '../../../base/SmartScreenBase';
import API from '../../../API/APIConstant';
import axios from 'axios';
import {connect} from 'react-redux';
import Header from '../../../component/Header/Header';

class AddStudentScreen extends PureComponent {
    state = {
        StudentEmail: '',
        visible: false,
        error: false,
        isLoading: false,
    };
    _onSubmit = () => {
        this.setState({isLoading: true});
        const {StudentEmail} = this.state;
        const url = API.baseurl + API.addStudentOnline;
        const header = {
            'jwt_token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImFkbWluIiwidGltZV9sb2dpbiI6MTU3ODkwNzQyM30.CFZyO9a-qBmyI8Q25AqGNd1nxWn1SO5TMC_yBxjgWCA',
            'X-API-KEY': '8c3a30506d9633a8b202cb5a91873efa',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
        };
        var details = {
            'class_id': '1',
            'email': StudentEmail,
        };
        let formBody = [];
        for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');

        fetch(url, {
            method: 'POST',
            headers: header,
            body: formBody,
        }).then((response) => response.json())
            .then((responseData) => {
                console.log(responseData.status);
                if (responseData.status == true) {
                    alert('Thêm học sinh thành công');
                } else {
                    this.setState({error: true});
                }
            }).catch(e => {
            alert('Thêm học sinh thất bại');
            console.log(e);
        }).finally(() => {
            this.setState({isLoading: false});
        });
    };

    render() {
        return (
            <ScrollView contentContainerStyle={{
                flex: 1,
            }}>
                <ImageBackground source={{uri: 'imagebackground'}} style={Styles.container}>
                    {
                        this.state.isLoading ?
                            <LoadingScreen/>
                            :
                            <View style={{flex: 1}}>
                                <Header navigation={this.props.navigation} title={'Thêm học viên'}/>
                                <View style={{
                                    flex: 12,
                                    backgroundColor: '#ffffff',
                                }}>
                                    <ImageBackground source={{uri: 'gv_34'}} style={{flex: 0.8}}/>
                                    <View style={{
                                        marginTop: SmartScreenBase.smPercenHeight * 3,
                                        paddingHorizontal: SmartScreenBase.smPercenWidth * 20,
                                        alignItems: 'center',
                                    }}>
                                        <Text style={{textAlign: 'center'}}>
                                            Nhập email của học viên muốn thêm và nhấn "Mời vào lớp" để chuyển lời mời
                                            đến học
                                            viên
                                        </Text>
                                    </View>

                                    <View style={{flex: 1, alignItems: 'center'}}>
                                        <View style={{
                                            width: SmartScreenBase.smPercenWidth * 90,
                                            height: 50,
                                            borderRadius: SmartScreenBase.smPercenWidth * 7,
                                            borderWidth: 1,
                                            flexDirection: 'row',
                                            borderColor: '#4bf7ff',
                                            marginTop: 30,
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
                                                fontSize: 16,
                                                color: '#000',
                                                padding: 0,
                                            }}
                                                       placeholder="Nhập email học viên..."
                                                       underlineColorAndroid='transparent'
                                                       placeholderTextColor="gray"
                                                       onChangeText={(StudentEmail) => {
                                                           this.setState({StudentEmail});
                                                       }}
                                                       onFocus={() => {
                                                           this.setState({error: false});
                                                       }}
                                            />
                                            <View style={{
                                                width: 70,
                                                height: '100%',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                            }}>
                                                {this.state.error &&
                                                <Image style={{
                                                    width: 30,
                                                    height: 30,
                                                    tintColor: 'red',
                                                }}
                                                       resizeMode={'contain'}
                                                       source={{uri: 'mhchung_icon_11'}}
                                                />
                                                }
                                            </View>
                                        </View>
                                        {this.state.error && <View style={{
                                            alignItems: 'center',
                                            marginTop: 30,
                                        }}>
                                            <Text style={{
                                                color: 'red',
                                                fontWeight: '400',
                                                fontSize: 14,
                                                marginLeft: 20,
                                                textAlign: 'center',
                                            }}>{'Email vừa nhập không đúng, \nxin hãy nhập lại'}</Text>
                                        </View>}

                                        <TouchableOpacity style={{
                                            position: 'absolute',
                                            bottom: 20,
                                            backgroundColor: '#00283A',
                                            height: 40,
                                            width: SmartScreenBase.smPercenWidth * 50,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: 20,
                                        }}
                                                          onPress={() => {
                                                              this._onSubmit();
                                                          }}
                                        >
                                            <Text style={{
                                                color: '#fff',
                                                fontWeight: 'bold',
                                                fontSize: 16,
                                            }}>Mời vào lớp</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                    }
                </ImageBackground>
            </ScrollView>

        );
    }
}

export default AddStudentScreen;
