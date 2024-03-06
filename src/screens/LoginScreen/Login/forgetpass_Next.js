import React, { Component } from "react";
import { Text, View, ImageBackground, TouchableOpacity, Dimensions, StatusBar } from "react-native";
import styles from "./styles";
import base64 from 'react-native-base64';
// import { Navigation } from "react-native-navigation";
const BaseHeight = Dimensions.get("screen").height / 100;
const BaseWidth = Dimensions.get("screen").width / 100;
export default class forgetpass_Next extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: "123456!S",
            isloading: false,
            re_password: 'cssdadasdas',
            token: '',
            DataResuilt: null
        }
    }
    componentDidMount() {
        this.state.password = "";
        this.state.re_password = "";
    }
    _OnPressCheck() {
        this.setState({
            isloading: true
        })
        if (this.state.re_password.length >= 6 && this.state.re_password.length >= 6 && this.state.password == this.state.re_password) {
            return fetch('http://gekadmin.gkcorp.com.vn/api/api_login/reset_password', {
                method: "PUT",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Basic ' + base64.encode('gek_admin:gek_admin_password'),
                    'X-API-KEY': '8c3a30506d9633a8b202cb5a91873efa'
                },
                body: JSON.stringify({
                    token: this.state.token,
                    password: this.state.password,
                    re_password: this.state.re_password
                })
            }).then((response) => response.json()).then((responseJson) => {
                this.setState({
                    DataResuilt: responseJson,
                    isloading: false,
                })
                console.log('resetPassWord', this.state.DataResuilt);
                if (this.state.DataResuilt.status == true) {
                    Navigation.pop(this.props.componentId, {
                        component: {
                            name: "Login"
                        }
                    })
                }
            })
        }
    }
    render() {
        return (
                <ImageBackground source={{uri: 'base_bg'}} style={styles.imageContainer}>
                    <View style={{ height: BaseHeight * 20 }} >
                        <View style={{ height: BaseHeight * 6, width: BaseWidth * 100, justifyContent: "center", marginTop: BaseHeight * 2 }} >
                            <TouchableOpacity onPress={() => {
                                Navigation.pop(this.props.componentId, {
                                    component: {
                                        name: "FogetPass"
                                    }
                                })
                            }}>
                                <View style={{ marginTop: StatusBar.currentHeight, marginLeft: BaseWidth * 2 }}>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
        )
    }
}