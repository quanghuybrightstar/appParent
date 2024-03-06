import React, { Component } from "react";
import { Text, View, ImageBackground, FlatList, TouchableOpacity, Alert } from "react-native";
import MyData from "../../../component/MyData";
import base64 from 'react-native-base64';
import HeaderScreen from "../../../component/HeaderScreen";
import StyleStudent from "../StyleStudent";
import ViewImage from "../../../component/ViewImage";
import SmartScreenBase from "../../../base/SmartScreenBase";
import Loading from "../../../component/LoadingScreen";
import * as action from '../../../ReduxStudent/actions/Student';
import { connect } from "react-redux";
import ViewImageShadow from "../../../component/ViewImageShadow";
import EditProfile from './EditProfile';
import ImagePicker from 'react-native-image-crop-picker';
import ModalPickerImage from '../../../component/modalPickerImage'
import Intersex from 'react-native-vector-icons/FontAwesome';
import RNFetchBlob from 'rn-fetch-blob';
import { ActionLogin } from '../../../redux/actions/ActionLogin'
import { useSelector, useDispatch } from 'react-redux';
import moment from 'moment';
import Header from '../../../component/Header';
class ProfileScreen extends Component {
    listExercise = [];
    constructor(props) {
        super(props);
        this.state = {
            isloading: false,
            responseresult: null,
            visible: false,
            isVisible: false
        }
        this.props.loadapiprofilehv();
        this.RefEdit = null;
    }
    RenderData(data) {
        if (this.props.data.isLoading == true) {
            return "...";
        } else {
            let result = null;
            switch (data) {
                case 'username':
                    result = this.state.responseresult.username;
                    break;
                case 'email':
                    result = this.state.responseresult.email;
                    break;
                case 'fullname':
                    result = this.state.responseresult.fullname;
                    break;
                case 'school':
                    result = this.state.responseresult.school;
                    break;
                case 'class':
                    result = this.state.responseresult.class;
                    break;
                case 'birthday':
                    result = moment(this.state.responseresult.birthday).format('DD-MM-YYYY');
                    break;
                default:
                    result = null;
                    break;
            }
            if (result != null) {
                return result;
            } else {
                return data;
            }
        }
    }
    _SaveUpdate(data) {
        this.props.LoadapiUpdateInforUser(data);
    }
    LoadData = (avatar) => {
        let oj = { ...MyData.UserLogin }
        oj.avatar = avatar
        this.props.loadapiprofilehv();
    }
    render() {
        if (this.props.data.Data != null) {
            this.listExercise = this.listExercise.concat(this.props.data.Data.class_exercise, this.props.data.Data.parent_exercise, this.props.data.Data.teacher_exercise);
            this.state.responseresult = this.props.data.Data.user;
        }
        return (
            <ImageBackground source={{ uri: 'imagebackground' }}
                imageStyle={StyleStudent.Sty_ImageBackground}
                style={StyleStudent.Sty_ImageBackground} >
                <Header showBack={true} title={'Hồ sơ'} goBack={() => this.props.navigation.goBack()} />
                {/*<HeaderScreen navigation={this.props.navigation} title='Hồ sơ' />*/}

                {this.props.data.isLoading == false ? this.props.data.Data.status == true ? (
                    <View style={{ paddingHorizontal: SmartScreenBase.smPercenWidth * 2 }}>
                        <View style={{ flexDirection: "row", alignItems: "center" }} >
                            <View style={{ padding: SmartScreenBase.smPercenHeight }}>
                                {this.props.data.Data != null ? this.props.data.Data.status == true ? (
                                    <ViewImageShadow Width={310} Height={308} BorderRadius={1000}
                                        Name={this.props.data.Data.base_url + '' + this.props.data.Data.user.avatar} />
                                ) : (
                                        <ViewImage Width={310} Height={308} Name={'student_Profile_image1'} />
                                    ) : (<ViewImage Width={310} Height={308} Name={'student_Profile_image1'} />)}
                            </View>
                            <View style={{ alignItems: "flex-start" }}>
                                <Text style={StyleStudent.Sty_Text_Header}>{this.RenderData('fullname')}</Text>
                                <View style={{ flexDirection: "row", alignItems: "center", marginTop: SmartScreenBase.smPercenWidth * 3 }}>
                                    <ViewImage Width={33} Height={33} Name={'student_14'} />
                                    <Text style={{
                                        color: 'white', marginLeft: SmartScreenBase.smPercenWidth * 3,
                                        fontSize: SmartScreenBase.smPercenWidth * 3
                                    }}>{this.RenderData('birthday')}</Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <ViewImage Width={33} Height={33} Name={'student_15'} />
                                    <Text style={{
                                        color: 'white', marginLeft: SmartScreenBase.smPercenWidth * 3,
                                        fontSize: SmartScreenBase.smPercenWidth * 3
                                    }}>{this.RenderData('class')},{this.RenderData('school')}</Text>
                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <ViewImage Width={33} Height={24} Name={'student_16'} />
                                    <Text style={{
                                        color: 'white', marginLeft: SmartScreenBase.smPercenWidth * 3,
                                        fontSize: SmartScreenBase.smPercenWidth * 3
                                    }}>{this.RenderData('email')}</Text>
                                </View>
                            </View>

                        </View>
                        <View style={{
                            width: SmartScreenBase.smPercenWidth * 96,
                            borderTopColor: 'white',
                            borderTopWidth: 1,
                            height: SmartScreenBase.smPercenHeight * 70
                        }}>
                            <FlatList
                                data={this.listExercise}
                                keyExtractor={(item, index) => 'item' + index}
                                renderItem={this._render_Item}
                            />
                            {this.listExercise.length == 0 ? (
                                <View style={[StyleStudent.ViewComponent, {
                                    width: SmartScreenBase.smPercenWidth * 60,
                                    alignSelf: "center",
                                    paddingVertical: SmartScreenBase.smPercenHeight,
                                    position: 'absolute',
                                    top: 0
                                }]}>
                                    <Text style={[StyleStudent.text, { fontWeight: "900" }]}>Hiện chưa có bài tập nào</Text>
                                </View>
                            ) : null}
                        </View>
                        <EditProfile
                            isVisible={this.state.isVisible}
                            data={this.props.data.Data}
                            storeRedux={this.props.storeRedux}
                            _OnpressSaveUpdate={(data) => this._SaveUpdate(data)}
                            saveData={this.LoadData}
                            closeEdit={() => this.setState({ isVisible: false })}
                        />
                    </View>
                ) : <Text style={{ alignSelf: "center", color: "white" }}>{this.props.data.Data.msg}</Text> : <Loading />}
                <View style={{
                    position: "absolute",
                    right: SmartScreenBase.smPercenWidth * 2,
                    top: SmartScreenBase.smPercenHeight * 3.5,
                    zIndex: 1000
                }}>
                    <TouchableOpacity onPress={() => this.setState({ isVisible: true })} >
                        <View style={{
                            borderWidth: 1,
                            borderRadius: SmartScreenBase.smPercenWidth * 2,
                            borderColor: "#FFFF33",
                            height: SmartScreenBase.smPercenWidth * 9,
                            justifyContent: 'center',
                            alignItems: 'center',
                            width: SmartScreenBase.smPercenWidth * 25
                        }}>
                            <Text style={[StyleStudent.txt, {
                                color: "#FFFF33",
                                padding: SmartScreenBase.smPercenWidth,
                                fontSize: SmartScreenBase.smPercenWidth * 4
                            }]}>Chỉnh sửa</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {/* <ModalPickerImage
                    visible={this.state.visible}
                    close={() => this.setState({ visible: false })}
                    openCamera={this._OpenCamera}
                    openLibrary={this._openLibrary}
                /> */}
            </ImageBackground>
        )
    }
    _render_Item = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('CheckExserciseScreen', { title: item.curriculum_name != undefined ? "Khóa học " + item.curriculum_name : item.school != undefined ? 'Trường ' + item.school : ' Chưa xác định ' });
            }}>
                <View style={[StyleStudent.ViewComponent, {
                    flexDirection: "row", alignItems: "center",
                    marginTop: SmartScreenBase.smPercenHeight

                }]} >
                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                        <ViewImage Width={356} Height={274} Name={item.avatar != undefined ? this.props.data.Data.base_url + '' + item.avatar : 'student_profile_image2'} />
                    </View>
                    <View style={{ justifyContent: "space-between" }}>
                        <Text style={[StyleStudent.text, { textAlign: "left", fontWeight: "bold", maxWidth: SmartScreenBase.smPercenWidth * 60 }]}>
                            {item.curriculum_name != undefined ? "Khóa học " + item.curriculum_name : item.school != undefined ? 'Trường ' + item.school : ' Chưa xác định '}
                        </Text>
                        <View style={{ marginTop: SmartScreenBase.smPercenHeight * 3 }}>
                            <Text style={[StyleStudent.text, { textAlign: "left" }]}>Bài tập chưa làm :
                            <Text style={{ color: "red", fontWeight: "bold" }}>
                                    {item.number_not_done}</Text></Text>
                            <Text style={[StyleStudent.text, { textAlign: "left" }]}>Bài tập hết hạn :
                            <Text style={{ color: "red", fontWeight: "bold" }}>
                                    {item.number_expired}</Text></Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const mapStateToProps = state => ({
    data: state.LoadAPIProfileHV,
    storeRedux: state.AuthStackReducer.dataLogin
});
export default connect(mapStateToProps, action)(ProfileScreen);
