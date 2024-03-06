import React, { Component } from 'react';
import { TouchableOpacity, View, Text, TextInput, TouchableWithoutFeedback, Keyboard, Animated,Alert,Image} from 'react-native';
import Modal from 'react-native-modal';
import SmartScreenBase from '../../../base/SmartScreenBase';
import StyleStudent from '../StyleStudent';
import ViewImageShadow from "../../../component/ViewImageShadow";
import ViewImage from "../../../component/ViewImage";
import CalendarPicker from 'react-native-calendar-picker';
import ImagePicker from 'react-native-image-crop-picker';
import ModalPickerImage from '../../../component/modalPickerImage'
import RNFetchBlob from 'rn-fetch-blob';
import { ActionLogin } from '../../../redux/actions/ActionLogin'
import { connect } from "react-redux";
import MyData from "../../../component/MyData";
import API from '../../../API/APIConstant';
import APIBase from '../../../base/APIBase';
class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            isVisible: false,
            image: '',
            isVisibleDate: false,
            FullName: this.props.data.Data.user.fullname,
            LastName: this.props.data.Data.user.lastname,
            birth: this.props.data.Data.user.birthday,
            school: this.props.data.Data.user.school,
            email: this.props.data.Data.user.email,
            gender: this.props.data.Data.user.gender,
            class: this.props.data.Data.user.class,
            checkChange: false,
            valueY: new Animated.Value(0)
        }
    }
    componentDidMount = () => {
        Keyboard.addListener("keyboardDidShow", this._keyboardDidShow);
        Keyboard.addListener("keyboardDidHide", this._keyboardDidHide);
    }
    _keyboardDidShow = () => {
        Animated.timing(
            this.state.valueY
            , {
                toValue: SmartScreenBase.smPercenHeight * 20,
                duration: 500
            }).start()
    };

    _keyboardDidHide = () => {
        Animated.timing(
            this.state.valueY
            , {
                toValue: 0,
                duration: 500
            }).start()
    };
    _Onpress = () => {
        this.setState({
            checkChange: false
        })
        this.props.closeEdit()
    }

    _ChangeGender(gender) {
        this.setState({
            gender: gender,
            checkChange: true
        });
    }
    _UpdateProfile = async () => {
        if(this.state.image !== ''){
            await this._postData()
        }
        let data = {
            fullname: this.state.FullName,
            school: this.state.school,
            gender: this.state.gender,
            class: this.state.class
        }
        if (this.state.checkChange == true) {
            this.props._OnpressSaveUpdate(data)
            this.state.checkChange = false;
        }
        this.props.closeEdit()
    }
    _OpenCamera = () => {
        ImagePicker.openCamera({
            width: 500,
            height: 500,
            cropping: true,
            mediaType: 'photo'
        }).then(image => {
            this.setState({ visible: false, image: image.path })
        });
    }
    _openLibrary = () => {
        ImagePicker.openPicker({
            width: 500,
            height: 500,
            cropping: true
        }).then(image => {
            this.setState({ visible: false, image: image.path })
        })
    }
    _postData = () => {
        RNFetchBlob.fetch('POST', API.baseurl+'api_user/update_avatar', {
            'Content-Type': 'multipart/form-data',
            'jwt_token': APIBase.jwt_token,
            'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
        }, [
            { name: 'file', filename: 'avatar.png', data: RNFetchBlob.wrap(this.state.image) },
        ]).then(async (ressponse) => {
            let a = await JSON.parse(ressponse.data)
            let oj = { ...MyData.UserLogin }
            let ojDataLogin = { ...this.props.storeRedux}
            console.log(this.props.storeRedux);
            oj.avatar = a.base_url + a.avatar;
            this.props.dispatch(ActionLogin(oj))
            this.props.saveData(a.base_url + a.avatar)
        }).catch((error) => {
            console.log("err: ", error);
            Alert.alert('Thông báo', 'Cập nhật thất bại', [
                { text: 'Đồng ý', style: 'cancel' }
            ])
        })
    };
    render() {
        return (
            <Modal
                isVisible={this.props.isVisible}
                swipeDirection="up"
                onBackdropPress={() => { this._Onpress() }}
                deviceWidth={SmartScreenBase.smPercenWidth * 100}
                deviceHeight={SmartScreenBase.smPercenHeight * 100}
            >
                <Animated.View style={[StyleStudent.modalContent, { backgroundColor: "rgba(255,255,255,0.95)", bottom: this.state.valueY }]}>
                    <View style={{ width: '100%' }}>
                        <Text style={StyleStudent.txt_title}>Chỉnh sửa thông tin: </Text>
                    </View>
                    <TouchableOpacity onPress={() => { this.setState({ visible: true }) }}>
                        {
                            this.state.image?
                            <Image  source={{uri:this.state.image}} style={{width:SmartScreenBase.smBaseWidth*310,height:SmartScreenBase.smBaseWidth*308,borderRadius:SmartScreenBase.smBaseWidth*1000}}/>
                            :<ViewImageShadow Width={310} Height={308} BorderRadius={1000}
                            Name={this.props.storeRedux.avatar ? this.props.storeRedux.avatar : 'student_profile_image1'} />
                        }
                    </TouchableOpacity>
                    <View style={{
                        width: SmartScreenBase.smPercenWidth * 80,
                        flexDirection: 'row',
                        backgroundColor: 'lightgray', borderRadius: SmartScreenBase.smPercenWidth * 5,
                        height: SmartScreenBase.smPercenWidth * 8,
                        alignItems: "center",
                        paddingLeft: SmartScreenBase.smPercenWidth * 3, marginTop: SmartScreenBase.smPercenHeight * 2

                    }}>
                        <ViewImage Width={55} Height={55} Name={'mhchung_icon_01'} />
                        <TextInput onChangeText={(text) => { this.setState({ FullName: text, checkChange: true }) }}
                            placeholder={'Name'} value={this.state.FullName} style={{ width: '70%', margin: 0, padding: 0, paddingLeft: 10, }} />
                    </View>
                    <View style={{
                        width: SmartScreenBase.smPercenWidth * 80, flexDirection: 'row', justifyContent: "space-evenly",
                        borderRadius: SmartScreenBase.smPercenWidth * 5,
                        alignItems: "center", paddingLeft: SmartScreenBase.smPercenWidth * 2, marginTop: SmartScreenBase.smPercenHeight * 2
                    }}>
                        <TouchableWithoutFeedback onPress={() => { this._ChangeGender('male') }}>

                            <View style={{
                                flexDirection: "row", alignItems: "center",
                                backgroundColor: 'lightgray', borderRadius: SmartScreenBase.smPercenWidth * 3,
                                padding: SmartScreenBase.smPercenWidth, width: SmartScreenBase.smPercenWidth * 30
                            }}>
                                <ViewImage Width={46} Height={46} Name={this.state.gender == 'male' ? 'gv_liststudent_16' : 'gv_liststudent_17'} />
                                <Text style={[StyleStudent.text, { marginLeft: SmartScreenBase.smPercenWidth * 3 }]} >Nam</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={() => { this._ChangeGender('female') }}>
                            <View style={{
                                flexDirection: "row", alignItems: "center",
                                backgroundColor: 'lightgray', borderRadius: SmartScreenBase.smPercenWidth * 3,
                                padding: SmartScreenBase.smPercenWidth, width: SmartScreenBase.smPercenWidth * 30
                            }}>
                                <ViewImage Width={46} Height={46} Name={this.state.gender == 'female' ? 'gv_liststudent_16' : 'gv_liststudent_17'} />
                                <Text style={[StyleStudent.text, { marginLeft: SmartScreenBase.smPercenWidth * 3 }]} >Nữ</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>

                    <View style={{
                        width: SmartScreenBase.smPercenWidth * 80, flexDirection: 'row',
                        backgroundColor: 'lightgray', borderRadius: SmartScreenBase.smPercenWidth * 5,
                        height: SmartScreenBase.smPercenWidth * 8,
                        alignItems: "center", paddingLeft: SmartScreenBase.smPercenWidth * 3, marginTop: SmartScreenBase.smPercenHeight * 2
                    }}>
                        <ViewImage Width={55} Height={55} Name={'footer_sutdent_03'} />
                        <TextInput onChangeText={(text) => { this.setState({ class: text, checkChange: true }) }}
                            style={{ width: '70%', margin: 0, padding: 0, paddingLeft: 10, }}
                            placeholder={'Lớp'} value={this.state.class} />
                    </View>

                    <View style={{
                        width: SmartScreenBase.smPercenWidth * 80, flexDirection: 'row',
                        backgroundColor: 'lightgray', borderRadius: SmartScreenBase.smPercenWidth * 5,
                        height: SmartScreenBase.smPercenWidth * 8,
                        alignItems: "center", paddingLeft: SmartScreenBase.smPercenWidth * 2, marginTop: SmartScreenBase.smPercenHeight * 2
                    }}>
                        <ViewImage Width={55} Height={55} Name={'mhchung_icon_05'} />
                        <TextInput onChangeText={(text) => { this.setState({ school: text, checkChange: true }) }}
                            style={{ width: '70%', margin: 0, padding: 0, paddingLeft: 10, }}
                            placeholder={'Trường'} value={this.state.school} />
                    </View>
                    <View style={{
                        width: SmartScreenBase.smPercenWidth * 80, flexDirection: 'row',
                        backgroundColor: 'lightgray', borderRadius: SmartScreenBase.smPercenWidth * 5,
                        height: SmartScreenBase.smPercenWidth * 8,
                        alignItems: "center", paddingLeft: SmartScreenBase.smPercenWidth * 2, marginTop: SmartScreenBase.smPercenHeight * 2
                    }}>
                        <ViewImage Width={55} Height={55} Name={'student_16'} />
                        <TextInput editable={false} style={{ width: '70%', margin: 0, padding: 0, paddingLeft: 10 }}
                            placeholder={'Email'} value={this.state.email} />
                    </View>
                    <View style={{
                        width: SmartScreenBase.smPercenWidth * 90,
                        flexDirection: "row", justifyContent: "space-evenly",
                        marginTop: SmartScreenBase.smPercenHeight * 2
                    }}>
                        <TouchableOpacity onPress={() => { this._Onpress() }}>
                            <View style={[StyleStudent.Sty_Buttom, { backgroundColor: "#01283A" }]}>
                                <Text style={StyleStudent.Sty_txt_Buttom}>HỦY</Text>
                            </View>
                        </TouchableOpacity>
                        {/*  */}
                        <TouchableOpacity onPress={() => { this._UpdateProfile() }}>
                            <View style={[StyleStudent.Sty_Buttom]}>
                                <Text style={StyleStudent.Sty_txt_Buttom}>LƯU</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
                <ModalPickerImage
                    visible={this.state.visible}
                    close={() => this.setState({ visible: !this.state.visible })}
                    openCamera={this._OpenCamera}
                    openLibrary={this._openLibrary}

                />
            </Modal>
        )
    }
}
const mapStateToProps = (state) =>{
    return {
        data: state.LoadAPIProfileHV,
        storeRedux: state.AuthStackReducer.dataLogin
    }
}

export default connect(mapStateToProps)(EditProfile);