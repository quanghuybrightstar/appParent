import React, { Component } from "react";
import { Text, View, Platform, TouchableOpacity, ImageBackground, Dimensions, StatusBar, Image } from "react-native";
import styles from "./styles";
import SmartScreenBase from '../../../base/SmartScreenBase';
import HeaderScreen from '../../../component/HeaderScreen';
export default class LinkAccount extends Component {
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
            })

        }
    }
    render() {
        return (
            <View style={styles.fullMHSty}>
                <ImageBackground style={[styles.fullMHSty]} source={{ uri: 'base_bg' }}>
                    <View>
                        <HeaderScreen navigation={this.props.navigation} title={'Liên kết'} />
                        <TouchableOpacity style={[styles.formChungSty, {
                            height: SmartScreenBase.smPercenWidth * 21, marginTop: SmartScreenBase.smPercenHeight * 24,
                            borderRadius: SmartScreenBase.smPercenWidth * 3, borderWidth: SmartScreenBase.smPercenWidth * 0.2, borderColor: '#ffff00', flexDirection: 'column',
                            alignItems: 'center', justifyContent: 'center', padding: SmartScreenBase.smPercenWidth * 5,
                            alignSelf:"center"
                        }]}>
                            <Text style={{ fontSize: styles.textSSize, color: styles.textColor, textAlign: 'center' }}>Bạn nhận được một liên kết và muốn kết nối với người gửi</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.formChungSty, {
                            height: SmartScreenBase.smPercenWidth * 21, marginTop: SmartScreenBase.smPercenHeight * 8,
                            borderRadius: SmartScreenBase.smPercenWidth * 3, borderWidth: SmartScreenBase.smPercenWidth * 0.2, borderColor: '#ffff00', flexDirection: 'column',
                            alignItems: 'center', justifyContent: 'center', padding: SmartScreenBase.smPercenWidth * 5,
                            alignSelf:"center"
                        }]}>
                            <Text style={{ fontSize: styles.textSSize, color: styles.textColor, textAlign: 'center' }}>Bạn kết nối với người khác bằng cách gửi một mã liên kết</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}
