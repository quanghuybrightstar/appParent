import React, { Component } from 'react';
import {
    Text,
    View,
    FlatList,
    Dimensions,
    Button,
    StyleSheet,
    TouchableOpacity,
    Image, Modal,
} from 'react-native';
import SmartScreenBase from "../../../../base/SmartScreenBase";
SmartScreenBase.baseSetup();
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible:false
        };
    }

    onShowAlert = () => {
        this.setState({ visible: true });
    };
    _onCloseAlert = () => {
            this.setState({ visible: false });
    }
    render() {
        return (
                <Modal transparent visible={this.state.visible}
                >
                    <View style={{alignItems:'center',justifyContent:'center',flex:1 ,paddingHorizontal:SmartScreenBase.smPercenWidth * 5,backgroundColor: 'rgba(30,29,37,1)'}}>
                        <View style={[{
                            height: SmartScreenBase.smPercenWidth * 60,
                            justifyContent: "space-evenly"
                        }]}>
                            <Text>Gửi nhắc nhở</Text>
                            <Text>Bạn có muốn gửi nhắc nhở làm bài đến học viên không ?</Text>
                            <View style={{
                                flexDirection: "row",
                                width: SmartScreenBase.smPercenWidth * 80,
                                justifyContent: "space-evenly"
                            }}>
                                <TouchableOpacity onPress={() => {
                                    this.setState({ visible: false });
                                    this.props._isOK()
                                }}
                                >
                                    <View>
                                        <Text>Có</Text>
                                    </View>
                                </TouchableOpacity>
                                {/*  */}
                                <TouchableOpacity onPress={() => {
                                    this.setState({ visible: false })
                                }}>
                                    <View>
                                        <Text>Không</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                </Modal>
        );
    }
}



export default  index ;
