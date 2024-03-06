import React, { Component } from 'react';
import { Text, View, SafeAreaView, ImageBackground, TextInput, TouchableWithoutFeedback, TouchableOpacity, Image } from 'react-native';
import SmartScreenBase from '../../../base/SmartScreenBase';
import ViewImage from '../../../component/ViewImage';
import HeaderScreen from '../../../component/HeaderScreen';
import StyleStudent from '../StyleStudent';
import MyData from '../../../component/MyData';
import base64 from 'react-native-base64';
import DataAPI from '../../../component/DataAPI';
import * as action from '../../../ReduxStudent/actions/Student';
import { connect } from "react-redux";
import ModalDropdown from 'react-native-modal-dropdown';
import ViewImageShadow from '../../../component/ViewImageShadow';
import APIBase from '../../../base/APIBase';

class CreateInbox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            select: 0,
            NameTitle: '',
            TextContent: '',
            listContact: [],
        }
        this.RefTextInput = null;
    }
    componentDidMount() {
        this.GetListContact();
    }
    SendAPIIbox = (subject, content) => {
        const data = JSON.stringify({
            to_user_id: this.state.listContact[this.state.select].user_id,
            subject: subject,
            content: content
        });
        APIBase.postDataJson("POST", DataAPI.UrlLoadSendInbox, data).then((responseJson) => {
            this.props.loadapiinboxhv();
            this.props.navigation.goBack();
        })
    }
    GetListContact = () => {
        try {
            APIBase.postDataJson('GET',`${DataAPI.UrlLoadListContact}?user_role=${MyData.UserLogin.role}`)
            .then(responseJson=>{
                if(responseJson.data.status==true){
                    this.setState({listContact: responseJson.data.data_contact});
                }else{
                    Alert.alert(responseJson.data.msg)
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
    _dropdown_2_renderRow(rowData, rowID, highlighted) {
        let icon = highlighted ? 'home' : 'home';
        let evenRow = rowID % 2;
        return (
            <TouchableOpacity underlayColor='cornflowerblue'>
                <View style={{
                    padding: SmartScreenBase.smPercenWidth * 2,
                    flexDirection: "row"
                }}>
                    <ViewImageShadow Width={70} Height={70} BorderRadius={1000}
                        Name={this.props.data.ListInbox.base_url + rowData.avatar} />
                    <Text style={[StyleStudent.text, { color: 'black', marginLeft: SmartScreenBase.smPercenWidth * 2 }]}>
                        {`${rowData.fullname}`}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    }
    render() {
        return (
            <SafeAreaView>
                <ImageBackground source={{ uri: 'imagebackground' }} style={{ width: '100%', height: '100%' }}>
                    <HeaderScreen navigation={this.props.navigation} title={'Gửi tin nhắn'} />
                    <View style={{
                        width: SmartScreenBase.smPercenWidth * 100,
                        alignItems: "center",
                        marginTop: SmartScreenBase.smPercenHeight * 2
                    }}>
                        <View style={{
                            width: SmartScreenBase.smPercenWidth * 90,
                            borderRadius: SmartScreenBase.smPercenWidth * 3,
                            backgroundColor: "rgba(255,255,255,0.9)",
                            flexDirection: "row",
                            alignItems: "center"
                        }}>
                            <View style={{ marginHorizontal: SmartScreenBase.smPercenWidth * 3 }}>
                                <Text style={StyleStudent.text}>Tới:</Text>
                            </View>
                            <ModalDropdown ref="dropdown_2"
                                options={this.state.listContact}
                                renderRow={this._dropdown_2_renderRow.bind(this)}
                                onSelect={(index) => { this.setState({ select: index }) }}
                                dropdownStyle={{
                                    width: SmartScreenBase.smPercenWidth * 75,
                                    borderBottomLeftRadius: 10, borderBottomRightRadius: 10
                                }}
                            >
                                {this.state.listContact.length !== 0 ? (
                                    <View style={{ width: SmartScreenBase.smPercenWidth * 80, paddingVertical: SmartScreenBase.smPercenHeight }}>
                                        <Text>{this.state.listContact[this.state.select].fullname}</Text>
                                    </View>
                                ) : null}
                            </ModalDropdown>
                        </View>
                        <View style={{ marginVertical: SmartScreenBase.smPercenHeight * 2, justifyContent: "center" }}>
                            <TextInput placeholder={'Tiêu đề Inbox'}
                                onChangeText={(text) => {
                                    this.state.NameTitle = text;
                                }}
                                style={{
                                    width: SmartScreenBase.smPercenWidth * 90,
                                    borderRadius: SmartScreenBase.smPercenWidth * 3,
                                    backgroundColor: "rgba(255,255,255,0.9)",
                                    fontSize: SmartScreenBase.smPercenWidth * 4,
                                    paddingVertical: SmartScreenBase.smPercenHeight,
                                    paddingHorizontal: SmartScreenBase.smPercenWidth * 2
                                }}
                            />
                        </View>
                        <View style={{
                            borderRadius: SmartScreenBase.smPercenWidth * 3,
                            backgroundColor: "rgba(255,255,255,0.9)",
                        }}>
                            <TouchableWithoutFeedback onPress={() => {
                                this.RefTextInput.focus();
                            }}>
                                <View style={{
                                    width: SmartScreenBase.smPercenWidth * 90,
                                    height: SmartScreenBase.smPercenHeight * 30,

                                }}>
                                    <TextInput
                                        ref={(input) => { this.RefTextInput = input }}
                                        multiline={true}
                                        placeholder={'Nhập nội dung ...'}
                                        onChangeText={(text) => {
                                            this.state.TextContent = text;
                                        }}
                                        style={{
                                            textAlignVertical: "top",
                                            paddingHorizontal: SmartScreenBase.smPercenWidth * 2
                                        }}
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                            <View style={{
                                width: SmartScreenBase.smPercenWidth * 90,
                                paddingVertical: SmartScreenBase.smPercenWidth * 2,
                                flexDirection: "row", alignItems: "center",
                                justifyContent: "flex-end",
                                borderTopWidth: 1,
                                borderTopColor: 'lightgray'
                            }}>
                                {/* <TouchableOpacity>
                                    <ViewImage Width={50} Height={50} Name={'student_inbox_image2'} />
                                </TouchableOpacity> */}
                                <View style={{ width: SmartScreenBase.smPercenWidth * 5 }} />
                                <TouchableOpacity onPress={() => {
                                    if (this.state.NameTitle != '' && this.state.TextContent != '') {
                                        this.SendAPIIbox(this.state.NameTitle, this.state.TextContent);
                                    }
                                }}>
                                    <ViewImage Width={66} Height={44} Name={'student_inbox_image1'} />
                                </TouchableOpacity>
                                <View style={{ width: SmartScreenBase.smPercenWidth * 2 }} />
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            </SafeAreaView>
        )
    }
}
const mapStateToProps = state => ({
    data: state.LoadAPIInboxHV
});
export default connect(mapStateToProps, action)(CreateInbox);