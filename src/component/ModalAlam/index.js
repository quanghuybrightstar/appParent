import React, {Component} from 'react';
import {
    Text,
    View,
    FlatList,
    Dimensions,
    Button,
    StyleSheet,
    TouchableOpacity,
    Image,
    Modal,
} from 'react-native';
import SmartScreenBase from '../../base/SmartScreenBase';
import StyleTeacher from './StyleTeacher';

SmartScreenBase.baseSetup();

class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        };
    }

    onShowAlert = () => {
        this.setState({visible: true});
    };
    _onCloseAlert = () => {
        this.setState({visible: false});
    };

    render() {
        return (
            <Modal transparent visible={this.state.visible}>
                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1,
                        paddingHorizontal: SmartScreenBase.smPercenWidth * 10,
                        backgroundColor: '#00000080',
                    }}>
                    <View
                        style={{
                            height: SmartScreenBase.smPercenWidth * 50,
                            borderRadius: SmartScreenBase.smPercenWidth * 5,
                            backgroundColor: "#fdf1f6",
                            padding: SmartScreenBase.smPercenHeight,
                            justifyContent: "space-around",
                            alignItems: "center",
                        }}>
                        <Text style={{...StyleTeacher.txt_Title, fontSize: SmartScreenBase.smFontSize * 60}}>Gửi nhắc nhở</Text>
                        <Text style={{...StyleTeacher.txt, textAlign: 'center', fontSize: SmartScreenBase.smFontSize * 45}}>
                            Bạn có muốn gửi nhắc nhở làm bài đến học viên không ?
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                width: SmartScreenBase.smPercenWidth * 80,
                                justifyContent: 'space-evenly',
                            }}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({visible: false});
                                    this.props._isOK();
                                }}>
                                <View style={StyleTeacher.Sty_Button}>
                                    <Text style={{...StyleTeacher.Sty_TXT_Button, fontSize: SmartScreenBase.smFontSize * 45, fontWeight: 'bold'}}>Có</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    this.setState({visible: false});
                                }}>
                                <View style={StyleTeacher.Sty_Button}>
                                    <Text style={{...StyleTeacher.Sty_TXT_Button, fontSize: SmartScreenBase.smFontSize * 45, fontWeight: 'bold'}}>Không</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

export default index;
