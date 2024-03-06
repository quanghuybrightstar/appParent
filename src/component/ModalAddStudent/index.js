import React, { Component } from 'react';
import {
    Text,
    View,
    FlatList,
    Dimensions,
    Button,
    StyleSheet,
    TouchableOpacity,
    Image, Modal, ScrollView, ImageBackground, TextInput, Alert
} from 'react-native';
import SmartScreenBase from "../../base/SmartScreenBase";
SmartScreenBase.baseSetup();
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible:false,
            StudentName:'',
            ParentEmail:''
        };
    }

    onShowAlert = () => {
        this.setState({ visible: true });
    };
    _onCloseAlert = () => {
        const {StudentName,ParentEmail} = this.state;
        if (StudentName == '' || ParentEmail ==''){
            Alert.alert('Thông báo', 'Vui lòng nhập đủ thông tin', [
                {text: 'Đồng ý', style: 'cancel'}
            ]);
        }else {
            this.props.AddNewStudent(StudentName,ParentEmail);
            this.setState({ visible: false,StudentName:'',ParentEmail:'' });
        }
    };
    render() {
        return (
            <Modal transparent visible={this.state.visible}
            >
                    <ScrollView contentContainerStyle={{flex: 1}}>
                        <ImageBackground source={{uri: 'imagebackground'}} style={{flex: 1}}>
                            <View style={{
                                justifyContent: "space-between",
                                alignItems: "center" ,
                                flex:1,
                                backgroundColor:"rgba(0,0,0,0.3)",
                                flexDirection:"row"
                            }}>
                                <View style={{ marginLeft: SmartScreenBase.smPercenWidth * 2 ,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                                    <TouchableOpacity style={{
                                        width: SmartScreenBase.smPercenWidth * 5,
                                        height: SmartScreenBase.smPercenWidth * 5,}}
                                                      onPress={()=>this.setState({ visible: false})}
                                    >
                                        <Image style={{
                                            width: SmartScreenBase.smPercenWidth * 5,
                                            height: SmartScreenBase.smPercenWidth * 5,}}
                                               resizeMode={'contain'}
                                               source={{uri:"imageback"}}/>
                                    </TouchableOpacity>

                                    <Text style={{
                                        color: 'white' ,
                                        marginLeft: SmartScreenBase.smPercenWidth * 5,
                                        fontWeight:"800",
                                        fontSize:SmartScreenBase.smPercenWidth*5
                                    }}>{this.props.title}</Text>
                                </View>
                            </View>
                            <ImageBackground source={{uri: 'gv_34'}} style={{flex: 5}}/>
                            <View style={{flex: 7, alignItems: 'center',backgroundColor:'#fff'}}>
                                <View style={{
                                    width: SmartScreenBase.smPercenWidth * 90,
                                    height: 50,
                                    borderRadius: SmartScreenBase.smPercenWidth * 7,
                                    borderWidth: 1,
                                    flexDirection: 'row',
                                    borderColor: '#4bf7ff',
                                    marginTop: 30,
                                }}>
                                    <View style={{
                                        width: 70,
                                        height: '100%',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <Image style={{
                                            width: 30,
                                            height: 30,
                                        }}
                                               resizeMode={'contain'}
                                               source={{uri: 'gv_93'}}/>
                                    </View>

                                    <TextInput style={{
                                        flex: 1,
                                        fontWeight: '400',
                                        fontSize: SmartScreenBase.smPercenWidth * 5,
                                        color: '#000',
                                        padding: 0,
                                    }}
                                               placeholder="Nhập tên học viên .."
                                               underlineColorAndroid='transparent'
                                               placeholderTextColor="gray"
                                               onChangeText={(StudentName)=>{this.setState({StudentName})}}
                                    />
                                </View>
                                <View style={{
                                    width: SmartScreenBase.smPercenWidth * 90,
                                    height: 50,
                                    borderRadius: SmartScreenBase.smPercenWidth * 7,
                                    borderWidth: 1,
                                    flexDirection: 'row',
                                    borderColor: '#4bf7ff',
                                    marginTop: 30,
                                }}>
                                    <View style={{
                                        width: 70,
                                        height: '100%',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <Image style={{
                                            width: 30,
                                            height: 30,
                                        }}
                                               resizeMode={'contain'}
                                               source={{uri: 'gv_114'}}/>
                                    </View>

                                    <TextInput style={{
                                        flex: 1,
                                        fontWeight: '400',
                                        fontSize: SmartScreenBase.smPercenWidth * 5,
                                        color: '#000',
                                        padding: 0,
                                    }}
                                               placeholder="Nhập email phụ hynh .."
                                               underlineColorAndroid='transparent'
                                               placeholderTextColor="gray"
                                               onChangeText={(ParentEmail)=>{this.setState({ParentEmail})}}
                                    />
                                </View>
                                <TouchableOpacity style={{
                                    height: 50,
                                    width: 200,
                                    backgroundColor: 'blue',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 25,
                                    position: 'absolute',
                                    bottom: 25,
                                }}
                                                  onPress={()=>{this._onCloseAlert()}}
                                >
                                    <Text style={{
                                        color: 'white',
                                        fontWeight: '800',
                                        fontSize: SmartScreenBase.smPercenWidth * 5,
                                    }}>Thêm học viên</Text>
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>
                    </ScrollView>
            </Modal>
        );
    }
}



export default  index ;
