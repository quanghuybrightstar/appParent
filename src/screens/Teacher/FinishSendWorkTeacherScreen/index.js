import * as React from 'react';
import {View, StyleSheet, Dimensions, TouchableOpacity, Image, Text, ImageBackground, FlatList, Alert} from 'react-native';
import SmartScreenBase from '../../../base/SmartScreenBase';
import ItemSendWork from '../../../component/ItemSendWork';
import API from '../../../API/APIConstant';
import axios from 'axios';
import base64 from 'react-native-base64';
import {connect} from 'react-redux';
import Header from '../../../component/Header/Header';

class index extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Data: [],
        };
    }

    async componentDidMount(): void {
        await this._getFile();
        console.log(this.props.Student);
    }

    _getFile = async () => {
        const url = API.baseurl + API.getFile;
        const header = {
            'Content-Type': 'application/json',
            'jwt_token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImFkbWluIiwidGltZV9sb2dpbiI6MTU3ODkwNzQyM30.CFZyO9a-qBmyI8Q25AqGNd1nxWn1SO5TMC_yBxjgWCA',
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
        };
        await axios({method: 'get', url: url, headers: header})
            .then((response) => {
                console.log(response.data.resources);
                this.setState({Data: response.data.resources});
            })
            .catch((error) => {
                console.log(error.message);
                if (error.message === 'Network Error') {
                    Alert.alert('Thông Báo', 'Vui lòng kiểm tra kết nối Internet', [
                        {text: 'Đồng ý', style: 'cancel'}
                    ]);
                }
                this.setState({isLoading: false});
            });
    };
    setTime = (timeStart, timeEnd) => {
        this.setState({timeStart, timeEnd});
    };
    _onGoAttachScreen = () => {
        this.props.navigation.navigate('AttachScreen');
    };
    _onChoiceTime = () =>{
        this.props.navigation.navigate('PickDateTimeScreen', {setTime: (timeStart, timeEnd) => this.setTime(timeStart, timeEnd)});
    }
    _renderItem = ({item, index}) => {
        return (
            <ItemSendWork Data={item} _onGoAttachScreen={() => this._onGoAttachScreen()} _onChoiceTime={()=>this._onChoiceTime()}/>
        );
    };
    _onSubmit = () => {
        Alert.alert('Thông Báo', 'Chưa có API get resources theo lesson_id', [
            {text: 'Đồng ý', style: 'cancel'}
        ]);
        // const DataEX = [];
        // this.state.Data.map((e)=>{
        //     return DataEX.push({resources_id:e.id})
        // });
        // console.log(DataEX);
        // let details = {
        //     'students': JSON.stringify(this.props.Student),
        //     'data_exercise':JSON.stringify(DataEX),
        //     'before_start_time': 1,
        //     'class_id': 1
        // };
        // let formBody = [];
        // for (let property in details) {
        //     let encodedKey = encodeURIComponent(property);
        //     let encodedValue = encodeURIComponent(details[property]);
        //     formBody.push(encodedKey + "=" + encodedValue);
        // }
        // formBody = formBody.join("&");
        // const url = API.baseurl + API.giveHomework;
        // return fetch(url, {
        //     method: "POST",
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/x-www-form-urlencoded',
        //         'Authorization': 'Basic ' + base64.encode('gek_admin:gek_admin_password'),
        //         'X-API-KEY': '8c3a30506d9633a8b202cb5a91873efa',
        //     },
        //     body: formBody
        // }).then((response) => response.json()).then((responseJson) => {
        //     if (responseJson.status == true){
        //         alert('Giao bài thành công');
        //         this.props.navigation.navigate('workDeliveredTeacherScreen')
        //     }else {
        //         alert('Giao bài thất bại');
        //         console.log(responseJson);
        //     }
        // }).catch((e)=>{
        //     console.log(e)
        // })
    };

    render() {
        return (
            <ImageBackground source={{uri: 'imagebackground'}} style={{
                flex: 1,
                resizeMode: 'stretch',
            }}>
                <Header navigation={this.props.navigation} title={'Quay lại'}/>
                <View style={{
                    flex: 10,
                    paddingTop: SmartScreenBase.smPercenWidth * 5,
                    paddingHorizontal: SmartScreenBase.smPercenWidth * 5,
                }}>
                    <FlatList data={this.state.Data} renderItem={this._renderItem}
                              keyExtractor={(item, index) => {
                                  return item.toString() + index.toString();
                              }}
                              showsVerticalScrollIndicator={false}
                              extraData={this.state}/>
                </View>
                <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: '#00283A',
                            width: SmartScreenBase.smPercenWidth * 50,
                            height: SmartScreenBase.smPercenWidth * 10,
                            borderRadius: 20,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        onPress={() => {
                            this._onSubmit();
                        }}
                    >
                        <Text>Xong</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>

        );
    }

}

function mapStateToProps(state) {
    return {Student: state.Student};
}

export default connect(mapStateToProps)(index);
