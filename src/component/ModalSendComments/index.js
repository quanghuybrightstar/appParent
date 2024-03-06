import React, { Component } from 'react';
import {
    Text,
    View,
    TextInput,
    TouchableOpacity,
    Image, Modal,
} from 'react-native';
import SmartScreenBase from "../../base/SmartScreenBase";
SmartScreenBase.baseSetup();
import base64 from 'react-native-base64';
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible:false,
            comments:''
        };
    }

    _onSend = (comments) =>{
        this.props._onCloseAlert(comments);

    }
    render() {
        return (
            <Modal transparent visible={this.props.visible}
            >
                <View style={{alignItems:'center',justifyContent:'center',flex:1 ,paddingHorizontal:SmartScreenBase.smPercenWidth * 5,backgroundColor: 'rgba(30,29,37,1)'}}>
                    <View style={{
                        width:SmartScreenBase.smPercenWidth * 90,
                        height:SmartScreenBase.smPercenHeight * 50,
                        backgroundColor:'#fff',
                        paddingHorizontal:SmartScreenBase.smPercenWidth * 2,
                        borderRadius:SmartScreenBase.smPercenWidth * 2,
                    }}>
                        <Text style={{
                            flex:0.8,
                            color: 'black',
                            fontWeight: '800',
                            fontSize: SmartScreenBase.smPercenWidth * 5,
                            textAlignVertical:'center',
                            textAlign:'center'
                        }}>{this.props.title}</Text>
                        <View style={{
                            flex:2,
                            borderRadius:10,
                            borderWidth:1,
                            borderColor:'gray'
                        }}>
                            <TextInput style={{
                                fontStyle:'italic',
                                fontSize: SmartScreenBase.smPercenWidth * 4,
                            }}
                                       placeholder="Viết nhận xét"
                                       underlineColorAndroid='transparent'
                                       placeholderTextColor="Gray"
                                       multiline={true}
                                       onChangeText={(comments)=>{this.setState({comments})}}
                                       autoFocus = {true}
                            />
                        </View>
                        <View style={{
                            flex:1,
                            alignItems:'center',
                            justifyContent:'center'
                        }}>
                            <TouchableOpacity
                                style={{
                                    width:SmartScreenBase.smPercenWidth * 40,
                                    height:SmartScreenBase.smPercenWidth * 10,
                                    backgroundColor:'#ED8A22',
                                    alignItems:'center',
                                    justifyContent:'center',
                                    borderRadius:SmartScreenBase.smPercenWidth * 2,
                                }}
                                onPress={() => {
                                this._onSend(this.state.comments)
                            }}>
                                <Text style={{
                                    color: 'white',
                                    fontWeight: '800',
                                    fontSize: SmartScreenBase.smPercenWidth * 5,
                                }}>Xong</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

            </Modal>
        );
    }
}



export default  index ;
