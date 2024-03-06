import React, { Component } from 'react';
import { Text, View, SafeAreaView, ImageBackground, TextInput, TouchableOpacity } from 'react-native';
import HeaderScreen from '../../../component/HeaderScreen';
import StyleStudent from '../StyleStudent';
import TabViewFile from './Component/TabViewFile';
import MyData from '../../../component/MyData';
import Modal from 'react-native-modal';
import SmartScreenBase from '../../../base/SmartScreenBase';
import ViewImage from '../../../component/ViewImage';
import DataAPI from '../../../component/DataAPI';
import base64 from 'react-native-base64';
import Loading from '../../../component/LoadingScreen';
import API from '../../../API/APIConstant';
import APIBase from '../../../base/APIBase';
export default class ManagerFileScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refresh: false,
            visible: false,
            isloading: false,
            result: null
        }
    }
    componentDidMount() {
        return fetch(API.baseurl + DataAPI.UrlManagerFile, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-API-KEY': '8c3a30506d9633a8b202cb5a91873efa',
                'jwt_token': '' + APIBase.jwt_token,
                'Authorization': 'Basic ' + base64.encode('gek_admin:gek_admin_password'),
            }
        }).then(response => response.json()).then((responseJson) => {
            this.setState({
                isloading: true,
                result: responseJson
            })
        }).catch((err) => {
            console.log('err', err)
        });
    }
    render() {
        MyData.SendProps = this;
        return (
            <SafeAreaView>
                <ImageBackground source={{ uri: 'imagebackground' }}
                    imageStyle={StyleStudent.Sty_ImageBackground}
                    style={StyleStudent.Sty_ImageBackground} >
                    <HeaderScreen navigation={this.props.navigation} title='Quản lý File ' />
                    {this.state.isloading == false ? (
                        <Loading />
                    ) : (
                            <TabViewFile data={this.state.result} />
                        )}
                </ImageBackground>
            </SafeAreaView>
        )
    }
}