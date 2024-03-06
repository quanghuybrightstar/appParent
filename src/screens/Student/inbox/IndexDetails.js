import React, { Component } from 'react';
import {
    SafeAreaView, ImageBackground,
    View, Text, FlatList, TextInput, TouchableOpacity,
    Platform, Keyboard,
    Animated,
    Alert
} from 'react-native';
import HeaderScreen from '../../../component/HeaderScreen';
import SmartScreenBase from '../../../base/SmartScreenBase';
import StyleStudent from '../StyleStudent';
import ViewImage from '../../../component/ViewImage';
import MyData from '../../../component/MyData';
import * as action from '../../../ReduxStudent/actions/Student';
import { connect } from "react-redux";
import DataAPI from '../../../component/DataAPI';
import base64 from 'react-native-base64';
import moment from 'moment';
import ViewImageShadow from '../../../component/ViewImageShadow';
import APIBase from '../../../base/APIBase';
class InboxDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            TextInbox: '',
            refresh: false,
            fadeAnim: new Animated.Value(SmartScreenBase.smPercenHeight * 68)
        }
        this.RefInput = null;
        this.RefFlatlist = null;
        Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }
    componentDidMount() {
        let id = this.props.navigation.getParam('id');
        this.props.GetInboxDetail(id);

    }
    _keyboardDidShow = (e) => {
        Animated.timing(this.state.fadeAnim, {
            ...Platform.select({
                ios: {
                    toValue: SmartScreenBase.smPercenHeight * 70 - e.endCoordinates.height
                },
                android: {
                    toValue: SmartScreenBase.smPercenHeight * 70 - e.endCoordinates.height
                }
            }),
            duration: 400
        }).start();
    };
    _keyboardDidHide = () => {
        Animated.timing(this.state.fadeAnim, {
            toValue: SmartScreenBase.smPercenHeight * 68,
            duration: 400
        }).start();
    };
    SendAPIIbox() {
        let id = this.props.navigation.getParam('id');
        try {
            let data = JSON.stringify({
                to_user_id: this.props.data.InboxDetail.data.inbox_detail.from_user_id,
                reply_for_id: this.props.data.InboxDetail.data.inbox_detail.reply_for_id,
                inbox_parent_id: this.props.data.InboxDetail.data.inbox_detail.inbox_parent_id,
                content: this.state.TextInbox
            })
            APIBase.postDataJson('POST',DataAPI.UrlLoadSendInbox,data).then(responseJson=>{
                if(responseJson.data.status==true){
                    this.props.GetInboxDetail(id);
                }else{
                    Alert.alert(responseJson.data.msg)
                }
            });
        } catch (error) {
            console.log(error);
        }

    }
    render() {
        return (
            <SafeAreaView >
                <ImageBackground source={{ uri: 'imagebackground' }}
                    imageStyle={StyleStudent.Sty_ImageBackground}
                    style={StyleStudent.Sty_ImageBackground}>
                    <HeaderScreen title={this.props.navigation.getParam('name')} navigation={this.props.navigation} />
                    {this.props.data.isLoading == false ? (
                        <View>
                            {/* {console.log(this.props.data.InboxDetail)} */}
                            <View style={{
                                width: SmartScreenBase.smPercenWidth * 100,
                                padding: SmartScreenBase.smPercenHeight * 1.5,
                                backgroundColor: "rgba(255,255,255,0.55)"
                            }}>
                                <Text style={[StyleStudent.text, { fontWeight: "bold", textAlign: "left" }]}>
                                    {this.props.data.InboxDetail.data.inbox_detail.subject}
                                </Text>
                            </View>
                            <Animated.View style={{
                                height: this.state.fadeAnim
                            }}>
                                <FlatList
                                    ref={(e) => this.RefFlatlist = e}
                                    data={this.props.data.InboxDetail.data.inbox_reply}
                                    extraData={this.state.refresh}
                                    keyExtractor={(item, index) => 'item' + index}
                                    renderItem={this.Render_Item}
                                    contentContainerStyle={{
                                        alignItems: "center",
                                        paddingBottom: SmartScreenBase.smPercenHeight * 5
                                    }}
                                    onContentSizeChange={() => this.RefFlatlist.scrollToEnd({ animated: false })}
                                    onLayout={() => this.RefFlatlist.scrollToEnd({ animated: false })}
                                />
                            </Animated.View>
                        </View>

                    ) : null}
                    <View style={{
                        width: SmartScreenBase.smPercenWidth * 90,
                        backgroundColor: "rgba(255,255,255,0.95)",
                        padding: SmartScreenBase.smPercenHeight,
                        borderRadius: SmartScreenBase.smPercenWidth * 3,
                        alignSelf: "center",

                    }}>
                        <View style={{
                            borderBottomWidth: 1,
                            borderBottomColor: 'lightgray',
                            maxHeight: SmartScreenBase.smPercenHeight * 20,
                        }}>
                            <TextInput multiline={true}
                                placeholder={'Nhập thông tin ...'}
                                ref={(input) => { this.RefInput = input }}
                                onChangeText={(text) => {
                                    this.state.TextInbox = text;
                                }}
                            />
                        </View>
                        <View style={{
                            alignSelf: "flex-end",
                            flexDirection: "row", alignItems: "center",
                            paddingVertical: SmartScreenBase.smPercenHeight
                        }}>
                            <View style={{ width: SmartScreenBase.smPercenWidth * 5 }} />
                            <TouchableOpacity onPress={() => {
                                if (this.state.TextInbox.length != 0) {
                                    this.SendAPIIbox();
                                    this.setState({
                                        refresh: !this.state.refresh,
                                        TextInbox: ''
                                    });
                                    this.RefInput.setNativeProps({ text: '' })
                                    Keyboard.dismiss();
                                }
                            }}>
                                <ViewImage Width={66} Height={44} Name={'student_inbox_image1'} />
                            </TouchableOpacity>
                            <View style={{ width: SmartScreenBase.smPercenWidth * 2 }} />
                        </View>
                    </View>
                </ImageBackground>
            </SafeAreaView>
        )
    }
    Render_Item = ({ item, index }) => {
        if (item.ifrom_user_id == MyData.TokenUser.id) {
            return (
                <View style={{
                    flexDirection: "row", justifyContent: "flex-start", alignItems: "center",
                    width: SmartScreenBase.smPercenWidth * 90, marginTop: SmartScreenBase.smPercenHeight
                }}>
                    <ViewImageShadow Width={100} Height={100} BorderRadius={1000}
                     Name={this.props.data.InboxDetail.base_url+this.props.data.InboxDetail.data.inbox_detail.to_avatar} />
                    <View style={{ alignItems: "flex-end" }}>
                        <View style={{
                            backgroundColor: "rgba(255,255,255,0.8)",
                            maxWidth: SmartScreenBase.smPercenWidth * 70,
                            padding: SmartScreenBase.smPercenHeight,
                            borderRadius: SmartScreenBase.smPercenWidth * 3,
                            marginLeft: SmartScreenBase.smPercenWidth * 3,
                        }}>
                            <Text style={StyleStudent.text}>{item.content}</Text>
                        </View>
                        <Text style={{ color: "white", fontSize: SmartScreenBase.smPercenWidth * 3 }} >{moment(item.created_at).format('HH:MM')}</Text>
                    </View>
                </View>
            )
        } else {
            return (
                <View style={{
                    flexDirection: "row", justifyContent: "flex-end", alignItems: "center",
                    width: SmartScreenBase.smPercenWidth * 90, marginTop: SmartScreenBase.smPercenHeight
                }}>
                    <View>
                        <View style={{
                            backgroundColor: "rgba(174,240,255,0.9)",
                            padding: SmartScreenBase.smPercenHeight,
                            borderRadius: SmartScreenBase.smPercenWidth * 3,
                            marginRight: SmartScreenBase.smPercenWidth * 3,
                            maxWidth: SmartScreenBase.smPercenWidth * 70

                        }}>
                            <Text style={StyleStudent.text}>{item.content}</Text>
                        </View>
                        <Text style={{ color: "white", fontSize: SmartScreenBase.smPercenWidth * 3 }} >{moment(item.created_at).format('HH:MM')}</Text>
                    </View>
                    <ViewImageShadow Width={100} Height={100} BorderRadius={100} 
                    Name={this.props.data.InboxDetail.base_url+this.props.data.InboxDetail.data.inbox_detail.to_avatar} />
                </View>
            )
        }
    }
}
const mapStateToProps = state => ({
    data: state.LoadAPIInboxDetailHV
});
export default connect(mapStateToProps, action)(InboxDetails);