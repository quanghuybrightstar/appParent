import React, { Component } from "react";
import { Text, View, ImageBackground, Image } from "react-native";
import styles from "./styles";
import base64 from 'react-native-base64';
import { Navigation } from "react-native-navigation";
import SmartScreenBase from '../../../base/SmartScreenBase';
import MInput from '../../../items/MInput';
import MButton from '../../../items/MButton';
import MDialog from '../../../layouts/MDialog'
export default class CheckLinkAcc extends Component {
    static options() {
        return {
            topBar: {
                title: {
                    text: 'My Screen'
                },
                drawBehind: true,
                visible: false,
                animate: false
            }
        };
    }
    constructor(props) {
        super(props);
        this.state = {
            isloading: false,
            Email: "@gmail.com",
            DataResuilt: null
        }

    }
    componentDidMount() {
        this.state.Email = "";
    }
    _onpressSendEmail() {

        if (this.state.Email.length != 0) {
            this.setState({
                isloading: true
            })
            return fetch('http://gekadmin.gkcorp.com.vn/api/api_login/forget_password', {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + base64.encode('gek_admin:gek_admin_password'),
                    'X-API-KEY': '8c3a30506d9633a8b202cb5a91873efa'
                },
                body: JSON.stringify({
                    email: this.state.Email
                })
            }).then((response) => response.json()).then((responseJson) => {
                this.setState({
                    DataResuilt: responseJson,
                    isloading: false,
                })
                console.log(responseJson)
                Navigation.push(this.props.componentId, {
                    component: {
                        name: "ForgetPassNext"
                    }
                })

            })

        }
    }

    LinkBtnAct = () => {
        this.dialog.show();
    }

    DialogBtnAct = () => {
        this.dialog.hide();
    }

    render() {
        return (
            <View style={styles.fullMHSty}>
                <ImageBackground style={[styles.fullMHSty]} source={{uri: 'base_bg'}}>
                     <View style={[styles.formChungSty, {height: SmartScreenBase.smPercenWidth*55, marginTop: SmartScreenBase.smPercenHeight*24}]}>
                        <Text style={{fontSize: styles.textSSize, color: styles.textColorTran, width: SmartScreenBase.smPercenWidth*68, marginTop: SmartScreenBase.smPercenWidth*11}}>Nếu bạn được người khác gửi mã liên kết, hãy nhập vào đây để liên kết tài khoản với người đó</Text>
                        <View style={{marginTop: SmartScreenBase.smPercenWidth*10}}>
                        <MInput mWidth={styles.longInputWidth} mPlaceHolder={'Mã liên kết'} isWarn
                        iconRender={
                            <Image style={{width: SmartScreenBase.smBaseWidth*47, height: SmartScreenBase.smBaseWidth*50, resizeMode: 'contain'}} source={{uri:'mhchung_icon_02'}}></Image>
                        }/>
                        </View>
                    </View>
                    <View style={[styles.btnViewChungSty,{marginTop: SmartScreenBase.smPercenWidth*5}]}>
                        <MButton mText={'Liên kết'} mBgColor={styles.btnBgColor1} mTextColor={styles.btnTextColor1}  onPress={this.LinkBtnAct}/>
                    </View>
                    <View style={[styles.btnViewChungSty,{marginTop: SmartScreenBase.smPercenWidth*3}]}>
                        <MButton mText={'Quay về'} mBgColor={styles.btnBgColor2} mTextColor={styles.btnTextColor2}/>
                    </View>
                    <Text style={{fontSize: styles.textSSize, color: styles.textColor, width: SmartScreenBase.smPercenWidth*78, marginTop: SmartScreenBase.smPercenHeight*5, textAlign: 'center'}}>Mã liên kết không chính xác hoặc hết hiệu lực, xin vui lòng kiểm tra lại nhé</Text>
                    <MDialog ref={(c) => this.dialog=c} callbackFromParent={this.LinkBtnAct} mWidth={SmartScreenBase.smPercenWidth*78} mHeight={SmartScreenBase.smPercenWidth*80}
                    bgColor={'#fff3fa'} textColor={'#000000'} tittle={'Thông báo'} textBody={'Chúc mừng bạn đã liên kết thành công với Lan Nguyễn'}
                    render={
                        <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                            <Image style={{width: SmartScreenBase.smBaseWidth*242, height: SmartScreenBase.smBaseWidth*242, resizeMode: "contain", marginTop: SmartScreenBase.smPercenWidth*5}} source={{uri: 'mhchung_image_1'}}></Image>
                            <View style={[styles.btnViewChungSty,{marginTop: SmartScreenBase.smPercenWidth*7}]}>
                                <MButton mText={'Đồng ý'} mBgColor={styles.btnBgColor1} mTextColor={styles.btnTextColor1}  onPress={this.DialogBtnAct}></MButton>
                            </View>
                        </View>   
                    }> 
                    </MDialog>
                </ImageBackground>
            </View>
        )
    }
}