import * as React from 'react';
import {View, Alert, Dimensions, TouchableOpacity, Image, Text, ImageBackground, FlatList} from 'react-native';
import Styles from "../workDeliveredTeacherScreen/workDeliveredTeacherScreenStyles";
import SmartScreenBase from "../../../base/SmartScreenBase";
import API from '../../../API/APIConstant';
import axios from 'axios';
import AttendanceClassScreen from '../AttendanceClassScreen';
import Header from '../../../component/Header/Header';
import {connect} from "react-redux";

class index extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            Data:[]
        }
    }
    componentDidMount(): void {
        this._getExercisesDelivered();
    }

    _getExercisesDelivered =  () => {
        let dataLogin = this.props.data_login;
        const url = API.baseurl + API.getAttendance;
        const header = {
            'Content-Type': 'application/json',
            'jwt_token': dataLogin.jwt_token,
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA=='
        };
        axios({method: 'get', url: url, headers: header})
            .then((response) => {
                console.log(response.data.data);
                this.setState({
                    isLoading: false,
                    Data:response.data.data
                });
            })
            .catch((error) => {
                console.log(error.message);
                if (error.message === "Network Error") {
                    Alert.alert('Thông Báo', 'Vui lòng kiểm tra kết nối Internet', [
                        {text: 'Đồng ý', style: 'cancel'}
                    ]);
                }
                this.setState({isLoading: false});
            });
    };
    _renderItem =({item,index})=>{
        return(
            <View style={{
                flex:1,
                height:SmartScreenBase.smPercenWidth*28,
                padding:SmartScreenBase.smPercenWidth*2,
                paddingHorizontal:SmartScreenBase.smPercenWidth*3,
                backgroundColor:"white",
                borderRadius:SmartScreenBase.smPercenWidth*3,
                marginTop:SmartScreenBase.smPercenHeight
            }}>
                <TouchableOpacity style={{
                    flex:1,
                }}
                                  onPress={()=>{this.props.navigation.navigate('AttendanceClassScreen',{item:item,DataClass:this.state.Data,index:index})}}
                >
                    <View style={{flex:1,justifyContent:'center'}}>
                        <Text style={{
                            fontWeight:"600",
                            color:"black",
                            fontSize:SmartScreenBase.smPercenWidth*5
                        }}>{item.class_name}</Text>
                    </View>
                    <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                        <Image style={{
                            width: SmartScreenBase.smPercenWidth * 6,
                            height: SmartScreenBase.smPercenWidth * 6,}}
                               resizeMode={'contain'}
                               source={{uri:"student_managerfile_image1"}}/>
                        <Text style={{
                            fontWeight:"400",
                            color:"black",
                            marginLeft: SmartScreenBase.smPercenWidth * 2,
                            fontSize:SmartScreenBase.smPercenWidth*4
                        }}>Ngày bắt đầu: {item.created_at}</Text>
                    </View>
                    <View style={{flex:1,flexDirection:'row',alignItems:'center'}}>
                        <Image style={{
                            width: SmartScreenBase.smPercenWidth * 6,
                            height: SmartScreenBase.smPercenWidth * 6,}}
                               resizeMode={'contain'}
                               source={{uri:"gv_46"}}/>
                        <Text style={{
                            fontWeight:"400",
                            color:"black",
                            marginLeft: SmartScreenBase.smPercenWidth * 2,
                            fontSize:SmartScreenBase.smPercenWidth*4
                        }}>Số lượng học viên : {item.count_student}</Text>
                    </View>
                </TouchableOpacity>

            </View >
        )
    }
    render (){
        return (
            <ImageBackground source={{ uri: 'imagebackground' }} style={Styles.container}>
                <Header navigation={this.props.navigation} title={'Quản lý điểm danh'}/>
                <View style={{flex:10,paddingHorizontal:SmartScreenBase.smPercenWidth * 3,}}>
                    <FlatList data={this.state.Data} renderItem={this._renderItem}
                              keyExtractor={(item, index) => {
                                  return item.toString() + index.toString();
                              }}
                              showsVerticalScrollIndicator={false}
                              extraData={this.state}/>
                </View>
                <View style={{flex:2,alignItems:'center',justifyContent:'center'}}>
                    <TouchableOpacity style={{
                        width:'50%',
                        height:40,
                        backgroundColor:'#00283A',
                        borderRadius:20,
                        alignItems:'center',
                        justifyContent:'center'
                    }}
                                      onPress={()=>{this.props.navigation.navigate('AttendanceCreateClassScreen')}}
                    >
                        <Text style={{
                            color: 'white' ,
                            fontWeight:"800",
                            fontSize:SmartScreenBase.smPercenWidth*5
                        }}>Tạo lớp</Text>
                    </TouchableOpacity>
                </View>
            </ImageBackground>

        );
    }

}

function mapStateToProps(state) {
    return {
        data_login: state.AuthStackReducer.dataLogin,
    };
}

export default connect(mapStateToProps)(index);

