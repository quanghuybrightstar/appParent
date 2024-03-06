import React, { Component } from "react";
import { Text, View, TouchableOpacity, Alert, Dimensions, StyleSheet, Image, ImageBackground, StatusBar, TouchableWithoutFeedback, SafeAreaView } from "react-native";
import HeaderScreen from "../../../component/HeaderScreen";
import StyleStudent from "../StyleStudent";
import { ScrollView } from "react-native-gesture-handler";
import SmartScreenBase from "../../../base/SmartScreenBase";
import ViewImage from "../../../component/ViewImage";
import DataAPI from "../../../component/DataAPI";
import MyData from "../../../component/MyData";
import base64 from "react-native-base64";
import Loading from "../../../component/LoadingScreen";
import * as actions from '../../../ReduxStudent/actions/Student';
import { connect } from "react-redux";
import axios from "axios";
import ImageSetting from "./ImageSetting";
import Header from '../../../component/Header';
import API from "../../../API/APIConstant";
import LogBase from "../../../base/LogBase";
import APIBase from "../../../base/APIBase";
const ArrayImage = [
    'student_Setting_image4',
    'student_Setting_image3',
    'student_Setting_image5',
    'student_Setting_image6',
    'student_Setting_image7',
    'student_Setting_image8',
    'student_setting_image9',
    'student_Setting_image10',
]
class Setting extends Component {
    listSettingNotify = [
        {
            id: 0, title: 'Thông báo', listnotify: [
                { type: "AntDesign", name: 'inbox', title: "Khi bài tập được chữa.", status: 0 },
                { type: "AntDesign", name: 'inbox', title: "Khi được giao bài tập mới", status: 0 },
                { type: "AntDesign", name: 'inbox', title: "Khi được thêm vào lớp mới", status: 0 },
                { type: "AntDesign", name: 'inbox', title: "Khi có tin nhắn", status: 0 },

            ]
        },
        {
            id: 0, title: 'Tổng quan', listnotify: [
                { type: "AntDesign", name: 'inbox', title: "Hiệu ứng âm thanh", status: 0 },
            ]
        },
    ]
    constructor(props) {
        super(props);
        this.state = {
            refresh: false,
            isLoading: true,
            changeSetting: false,
        }
    }
    componentDidMount() {
        this.props.loadapiSetting();
    }
    _ChangeSettingTB(index) {
        if (this.listSettingNotify[0].listnotify[index].status == 0) {
            this.listSettingNotify[0].listnotify[index].status = 1;
        } else {
            this.listSettingNotify[0].listnotify[index].status = 0;
        }
        this.state.changeSetting = true;
    }
    render() {
        if (this.props.data.isLoading == false) {
            if (this.props.data.DataSetting.data_setting_notify != null) {
                let DataRes = eval(this.props.data.DataSetting.data_setting_notify);
                this.listSettingNotify[0].listnotify[0].status = DataRes[0].exercise_cured;
                this.listSettingNotify[0].listnotify[1].status = DataRes[1].exercise_new;
                this.listSettingNotify[0].listnotify[2].status = DataRes[2].add_to_class;
                this.listSettingNotify[0].listnotify[3].status = DataRes[3].student_inbox;
                this.listSettingNotify[1].listnotify[0].status = DataRes[4].background_sound;
            }
        }
        return (
            <ImageBackground source={{ uri: 'imagebackground' }}
                             imageStyle={StyleStudent.Sty_ImageBackground}
                             style={StyleStudent.Sty_ImageBackground} >
                <Header showBack={true} title={'Cài đặt'} goBack={() => this.props.navigation.goBack()}/>
                {/*<HeaderScreen navigation={this.props.navigation} title='Cài đặt' />*/}
                <ScrollView contentContainerStyle={{ alignItems: "center" }}>
                    <View style={[StyleStudent.ViewComponent, {
                        marginTop: SmartScreenBase.smPercenHeight * 3
                    }]}>
                        <Text style={StyleStudent.txt_title}>Thông báo</Text>
                        {this.listSettingNotify[0].listnotify.map((item, key) => {
                            return (
                                <View key={key} style={{
                                    flexDirection: "row",
                                    alignItems: "center", justifyContent: "space-between",
                                    marginVertical: SmartScreenBase.smPercenHeight
                                }}>
                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                        <ViewImage Width={100} Height={90} Name={'phu_huynh_68'} />
                                        <Text style={[StyleStudent.text,
                                            { marginLeft: SmartScreenBase.smPercenWidth * 3 }]}>{item.title}</Text>
                                    </View>
                                    <View style={{ marginRight: SmartScreenBase.smPercenWidth * 5 }}>
                                        <ImageSetting
                                            _onPress={() => { this._ChangeSettingTB(key) }}
                                            DataSetting={this.listSettingNotify[0].listnotify[key].status}
                                        />
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                    <View style={[StyleStudent.ViewComponent, {
                        marginTop: SmartScreenBase.smPercenHeight * 3
                    }]}>
                        <Text style={StyleStudent.txt_title}>Tổng quan</Text>
                        {this.listSettingNotify[1].listnotify.map((item, key) => {
                            return (
                                <View key={key} style={{
                                    flexDirection: "row",
                                    alignItems: "center", justifyContent: "space-between",
                                    marginVertical: SmartScreenBase.smPercenHeight
                                }}>
                                    <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                                        <ViewImage Width={100} Height={90} Name={'student_setting_image9'} />
                                        <Text style={[StyleStudent.text, { marginLeft: SmartScreenBase.smPercenWidth * 3 }]}>{item.title}</Text>
                                    </View>
                                    <View style={{ marginRight: SmartScreenBase.smPercenWidth * 5 }}>
                                        <ImageSetting
                                            _onPress={() => {
                                                if (this.listSettingNotify[1].listnotify[0].status == 0) {
                                                    this.listSettingNotify[1].listnotify[0].status = 1;
                                                } else {
                                                    this.listSettingNotify[1].listnotify[0].status = 0;
                                                }
                                                this.state.changeSetting = true;
                                            }}
                                            DataSetting={this.listSettingNotify[1].listnotify[0].status}
                                        />
                                    </View>
                                </View>
                            )
                        })}
                    </View>
                    <View style={{ marginTop: SmartScreenBase.smPercenHeight * 5, alignSelf: "center" }}>
                        <TouchableOpacity onPress={() => {
                            if (this.state.changeSetting == true) {
                                this._SaveSetting();
                                this.state.changeSetting = false;
                            } else {
                                this.props.navigation.goBack();
                            }

                        }}>
                            <View style={StyleStudent.ViewButton}>
                                <Text style={StyleStudent.txt_title}>Lưu thay đổi</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
                {this.props.data.isLoading == true ? <Loading /> : null}
            </ImageBackground>
        )
    }
    async _SaveSetting() {
        const url = API.baseurl+'api_user/save_setting_notify';
        const headers = {
            'Content-Type': 'application/json',
            'jwt_token': '' + APIBase.jwt_token,
            //'jwt_token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImFkbWluIiwidGltZV9sb2dpbiI6MTU3ODkwNzQyM30.CFZyO9a-qBmyI8Q25AqGNd1nxWn1SO5TMC_yBxjgWCA',
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            'Authorization': 'Basic ' + base64.encode('gek_admin:gek_admin_password'),
        };
        try {
            let data = {};
            data['can_notify'] = 1;
            data['user_id'] = MyData.UserLogin.id;
            let arraySetting = [
                {
                    'exercise_cured': this.listSettingNotify[0].listnotify[0].status
                },
                {
                    'exercise_new': this.listSettingNotify[0].listnotify[1].status
                },
                {
                    'add_to_class': this.listSettingNotify[0].listnotify[2].status
                },
                {
                    'student_inbox': this.listSettingNotify[0].listnotify[3].status
                },
                {
                    'background_sound': this.listSettingNotify[1].listnotify[0].status
                }
            ];
            console.log(arraySetting)
            data['data_setting_notify'] = JSON.stringify(arraySetting);
            LogBase.log("=====API",url)
            const res = await axios({ method: 'put', url, headers, data });
            console.log(res.data)
            Alert.alert('luu thanh cong');
            this.props.loadapiSetting();
        } catch (error) {
            console.log(error);
        }
    }

}
const mapStatetoProps = state => ({
    data: state.LoadAPIFunctionHV.Setting
})
export default connect(mapStatetoProps, actions)(Setting)
