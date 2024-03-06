import React, { Component } from "react";
import { Text, View, Dimensions, TouchableOpacity, Alert, SafeAreaView, Image, ImageBackground, ScrollView, StyleSheet } from "react-native";
import ViewImage from "../../../component/ViewImage";
import StyleStudent from "../StyleStudent";
import SmartScreenBase from "../../../base/SmartScreenBase";
import * as Animatable from 'react-native-animatable';
import { ActionLogin } from '../../../redux/actions/ActionLogin';
import { connect } from 'react-redux';
import styleApp from "../../../styleApp/stylesApp";
import { Colors } from "../../../styleApp/color";
import { TextBox } from "../../../componentBase/TextBox";
import { MyButton } from "../../../componentBase/Button";
import { CommonJson } from "../../../stringJSON";
import { FontSize, FontWeight } from "../../../styleApp/font";
import { MyLongMainButton } from "../../../componentBase/LongMainButton";
import { SmPopup} from '../../../componentBase/SmPopup/SmPopup'
import API from "../../../API/APIConstant";
import APIBase from "../../../base/APIBase";
import deviceContr from '../../../utils/device';
import LogBase from "../../../base/LogBase";
import MyData from "../../../component/MyData";
const ArrayImage = [
    'student_function_image1',
    'student_11',
    'student_function_image3',
    'student_function_image6',
    'student_12',
    'student_13',
    'student_function_image5',
    'student_function_image5',
    // 'student_function_image5',
]

const AllFunction = [
    { id: 1, name: "Lớp học", image: 'classes_icon', screen: "ClassScreen" },
    { id: 2, name: "Hồ sơ", image: 'profile_icon', screen: "NewProfileScreen" },
    { id: 3, name: "Tin nhắn", image: 'message_icon', screen: "InBoxScreen" },
    { id: 4, name: "Kế hoạch học tập", image: 'study_plan_icon', screen: "StudyPlan" },
    { id: 5, name: "Kích hoạt\ntài khoản", image: 'upgrade_account', screen: "" },
    // { id: 5, name: "Liên kết", image: 'link_icon', screen: "" },
    { id: 6, name: "Cài đặt", image: 'setting', screen: "CommonSetting" }
]

class AddElement extends Component {
    static options() {
        return {
            topBar: {
                drawBehind: true,
                visible: false,
                animate: false,
                background: {
                    color: "rgba(0,0,0,0.3)"
                },
            },
            bottomTabs: {
                visible: true,
                drawBehind: true
            }
        }

    }
    constructor(props) {
        super(props);
        this.state = {
            isShowLogout: false
        }
    }

    render() {
        return (
            <View >
                <ImageBackground source={{ uri: "bg_them" }}
                    style={StyleStudent.Sty_ImageBackground}
                    imageStyle={StyleStudent.Sty_ImageBackground}>
                    <ScrollView bounces={false} style={{ flex: 1 }}>
                        <View style={styles.btnContainer}>
                            {AllFunction.map((item, key) => {
                                return (
                                    this.render_item(item, key)
                                )
                            })}
                        </View>
                        <MyButton
                            hasBackground style={styles.btnOut} text={CommonJson.LogOut} onPress={() => {
                                this._OnPressFunctions(8);
                            }} />
                    </ScrollView>
                
                    <SmPopup visible={this.state.isShowLogout}
                    contentStyles={{height: SmartScreenBase.smPercenWidth*50}}
                    cancelText={"Hủy"}
                    confirmText={"Đồng ý"}
                    message={"Bạn có muốn đăng xuất tài khoản không ?"}
                    cancelOnpress={() => {
                        this.setState({isShowLogout: false})
                    }}
                    confirmOnpress={() => {
                        this._logOut()
                    }}/>

                </ImageBackground>
            </View>
        )
    }

    render_item(item, index) {
        return (
            <MyLongMainButton imageStyle={styles.imageStyle} style={styles.funcBtn} onPress={() => {
                this._OnPressFunctions(item.id)
            }} text={item.name} image={item.image} />
        )
    }
    _logOut = async () => {
        LogBase.log("=====Logout")
        var url = API.baseurl + API.logout
        let form = new URLSearchParams();
        form.append("device_id", String(deviceContr.getDeviceID()));
        var data = {
            device_id: deviceContr.getDeviceID()
        }
        var res = APIBase.tokenAPI("post", url, form ,{
            'Content-Type': 'application/x-www-form-urlencoded'
        })
        LogBase.log("=====deviceID",deviceContr.getDeviceID())
        LogBase.log("=====bye bye",res.data)
        await this.props.dispatch(ActionLogin({}))
        MyData.curCurriID = -1
        this.props.navigation.navigate('LoginApp');
    }

    _OnPressFunctions(id) {
        switch (id) {
            case 1:
                this.props.navigation.navigate('ClassScreen');
                break;
            case 2:
                this.props.navigation.navigate('NewProfileScreen');
                break;
            case 3:
                this.props.navigation.navigate('InBoxScreen',{
                    student : true
                });
                break;
            case 4:
                this.props.navigation.navigate('StudyPlan');
                break;
            case 5:
                this.props.navigation.navigate('EnterPurchasedPackage');
                break;
            case 6:
                this.props.navigation.navigate('CommonSetting');
                break;
            case 8:
                this.setState({isShowLogout: true})
                // Alert.alert(
                //     'Đăng xuất',
                //     'Bạn có muốn đăng xuất tài khoản không?',
                //     [
                //         { text: 'Hủy', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                //         {
                //             text: 'Đồng ý', onPress: () => this._logOut()
                //         },
                //     ],
                //     { cancelable: false }
                // );
                break;
            default:
                break;
        }
    }
}
function mapStateToProps(state) {
    return {
        dataLogin: state.AuthStackReducer.dataLogin
    }
}


const styles = StyleSheet.create({
    btnContainer: { flexDirection: 'row', marginTop: SmartScreenBase.smPercenHeight * 12, paddingHorizontal: SmartScreenBase.smPercenWidth * 5, flexWrap: 'wrap', alignItems: "center", justifyContent: "center" },
    btnOut: {
        paddingHorizontal: SmartScreenBase.smPercenWidth * 12,
        marginTop: SmartScreenBase.smPercenHeight * 5,
        alignSelf: 'center',
        paddingVertical: SmartScreenBase.smPercenHeight * 1.5,
        height: 'auto',
        width: 'auto',
        borderRadius: SmartScreenBase.smPercenWidth * 15,
        fontSize: FontSize.size60Font,
        ...FontWeight.Bold
    },
    funcBtn: {
        marginLeft: SmartScreenBase.smPercenWidth * 3,
        marginRight: SmartScreenBase.smPercenWidth * 3,
        marginTop: SmartScreenBase.smPercenHeight * 3,
        width: SmartScreenBase.smPercenHeight * 16,
        height: SmartScreenBase.smPercenHeight * 16,
        borderRadius: SmartScreenBase.smPercenHeight * 2,
        paddingHorizontal: SmartScreenBase.smPercenWidth * 3,
    },
    imageStyle: {
        width: SmartScreenBase.smPercenHeight * 7,
        height: SmartScreenBase.smPercenHeight * 7,
    }
})

export default connect(mapStateToProps)(AddElement);

