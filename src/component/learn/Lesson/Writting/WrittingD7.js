import React, { Component, useEffect, useState } from "react";
import {
    Text,
    View,
    NativeModules,
    ScrollView,
    TouchableWithoutFeedback,
    TextInput,
    TouchableOpacity,
    Image, ImageBackground,
    InputAccessoryView,
    Platform,
    LayoutAnimation,
    ActivityIndicator,
    Alert, Animated, Keyboard, BackHandler, Dimensions,
} from 'react-native';
import Modal from "react-native-modal";
import SmartScreenBase from "../../../base/SmartScreenBase";
import styles from '../Writting/Style/styleD6/style';
import EventBus from 'react-native-event-bus';
import StyleLesson from "../Writting/Style/styleD7/StyleLesson";
import stylesApp from "../Writting/Style/styleD7/stylesApp";
import RNFetchBlob from 'rn-fetch-blob';
import axios from 'axios';
import { connect } from "react-redux";
import styleButton from '../../../../../src/styleApp/stylesApp';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import API from '../../../../../src/API/APIConstant';
import APIBase from '../../../../base/APIBase'
import FontBase from "../../../../base/FontBase";
import MyData from "../../../MyData";

const { height, width } = Dimensions.get('window');
const smartScreen = SmartScreenBase.smPercenHeight;
const smartFont = SmartScreenBase.smFontSize;
const inputAccessoryViewID = 'uniqueID'
const { UIManager } = NativeModules;
UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);
let i = 0;

class WrittingD7 extends Component {
    //data = ["Giáo viên", "Phụ huynh", "AMICA"];
    constructor(props) {
        super(props);
        this.state = {
            titleEn: '',
            titleVi: '',
            title: true,
            refresh: false,
            visible: false,
            articleName: "",
            text: "",
            ShowCheck: true,
            visibleModalSend: false,
            checkSent: false,
            heightViewSendTo: 0,
            checkShowViewSendTo: false,
            checkTouable: true,
            dataSuppor: '',
            dataQuestion: [],
            loading: true,
            suggestions: false,
            postsuggestions: '',
            setTitle: '',
            dataAssign_to_id: '',
            stateContent: '',
            scoreListoption: null,
            datalisson: [],
            questionType: '',
            lessonId: '',
            idLog: [],
            stateShowimage: true,
            dataContact: [],
            fadeAnim: new Animated.Value(0),
            file_id: '',
            isShow: true,
            topic: '',

        }
        this.TextForcus = null;
        this._onNextdataQuettion = this._onNextdataQuettion.bind(this);
        this._onSenpostsLS = this._onSenpostsLS.bind(this);
        this._onSenposts = this._onSenposts.bind(this);
        // this._onSenpostsScore = this._onSenpostsScore.bind(this);
        this._onSeveWrittingsave = this._onSeveWrittingsave.bind(this);
        this.checkToSend = this.checkToSend.bind(this);

        MyData.isCanExit = false
    }

    async componentDidMount() {
        await this.getDataquetion();
        Keyboard.addListener("keyboardDidShow", this._keyboardDidShow);
        Keyboard.addListener("keyboardDidHide", this._keyboardDidHide);
    }

    _keyboardDidShow = () => {
        Animated.timing(this.state.fadeAnim, {
            toValue: height / 4.5,
            duration: 500
        }).start();
    };

    _keyboardDidHide = () => {
        Animated.timing(this.state.fadeAnim, {
            toValue: 0,
            duration: 500
        }).start();
    };

    getDataquetion = async () => {
        try{
        let res = {};
        res['data'] = this.props.dataContent;
        let data = res.data;
        // console.log('0000000000', data.lesson.topic);
        this.setState({topic: data.lesson.topic,setTitle:data.lesson.topic});
        this.setState({ datalisson: res.data });
        //this._postDataFirt(data);
        // this._Datacontact(data);
        if (data.status) {
            this.setState({ lessonId: data.lesson.id });
            this.setState({ loading: false });
            this.setState({ titleEn: data.data_question[i].list_option[0].group_content })
            this.setState({ titleVi: data.data_question[i].list_option[0].group_content_vi })
            this.setState({ dataSuppor: data.data_question[i].list_option[0].option_text });
            this.setState({ postsuggestions: data.data_question[i].list_option[0].match_option_text[0]});
            this.setState({ questionType: data.data_question[i].list_option[0].question_type });
            this.setState({ scoreListoption: data.data_question[i].list_option[0].score });
            this.setState({ dataQuestion: data.data_question });
        }
    }catch(er){console.log("=====loi",er); Alert.alert("Bài tập này đang bị lỗi dữ liệu, vui lòng chọn bài khác")}
    };

    // _Datacontact = async (data) => {
    //     let dataLogin = this.props.data_login;
    //     const url = API.baseurl + API.list_contact +  dataLogin.role+ '&class_id=' + this.props.dataLesson?.class_id
    //     console.log('ur',url)
    //     const header = {
    //         'Content-Type': 'application/json',
    //         jwt_token: dataLogin.jwt_token,
    //         'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
    //         Authorization: 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
    //     };
    //     try {
    //         const res = await axios({ method: 'get', url: url, headers: header });
    //         if (res.data.status) {
    //             console.log('data contact', res.data);
    //             this.setState({
    //                 dataContact: res.data.data_contact
    //             })
    //         }
    //     } catch (error) {
    //         this.setState({ loading: false });
    //         console.log(error.message);
    //         if (error.message === 'Network Error') {
    //             Alert.alert('Thông Báo', 'Vui lòng kiểm tra kết nối Internet');
    //         }
    //     }
    // };

    _OnTextChange(stateContent) {
        this.setState({ stateContent: stateContent });
    }

    _OnPressSendTo() {
        this.setState({ stateShowimage: !this.state.stateShowimage });
        LayoutAnimation.spring();
        if (this.state.checkShowViewSendTo == false) {
            this.setState({
                checkTouable: false,
                checkShowViewSendTo: true,
                heightViewSendTo: SmartScreenBase.smPercenHeight * 6 * 2
            })
        } else {
            this.setState({
                checkTouable: true,
                checkShowViewSendTo: false,
                heightViewSendTo: 0

            })

        }
    }

    checkToSend() {
        var str  = this.state.stateContent.trim()
        return str.length > 0
    }

    _ChooseSendTo(id) {
        // console.log('chose',id)
        // let choose = this.state.dataContact[id];
        // this.setState({ dataAssign_to_id: choose });
        // this.state.dataContact.splice(id, 1, this.state.dataContact[0]);
        // this.state.dataContact.splice(0, 1, choose)
        
        // LayoutAnimation.configureNext(
        //     {
        //         duration: 700,
        //         create: { type: 'linear', property: 'opacity' },
        //         update: { type: 'spring', springDamping: 0.9 },
        //         delete: { type: 'linear', property: 'opacity' }
        //     }
        // );
        // if (this.state.checkShowViewSendTo == false) {
        //     this.setState({
        //         checkTouable: false,
        //         checkShowViewSendTo: true,
        //         heightViewSendTo: SmartScreenBase.smPercenHeight * 6 * 2
        //     })
        // } else {
        //     this.setState({
        //         checkTouable: true,
        //         checkShowViewSendTo: false,
        //         heightViewSendTo: 0
        //     })
        // }
    }

    _onNextdataQuettion = () => {
        //this._onSenpostsScore();
        if (i < this.state.dataQuestion.length - 1) {
            i = i + 1
            this.setState({ titleEn: data_question[i].list_option[0].group_content });
            this.setState({ titleVi: data_question[i].list_option[0].group_content_vi });
            this.setState({ postsuggestions: data.data_question[i].list_option[0].match_option_text[0]});
            this.setState({ dataQuestion: data_question });
            this.setState({ dataSuppor: data_question[i].list_option[0].option_text });
            this.setState({ suggestions: false });
        } else {
            this.savewritting();
        }
    }

    saverData = async (rs) => {
        let dataFake = [{
            question_id: this.state.dataQuestion[0].question_id,
            exercise_type: 'writing',
            question_type: 7,
            resource_id: rs?.file_id,
            question_score: 1,
            final_user_choice: '',
            detail_user_turn: [

            ],
        }];
        // if(rs){
            await this.props.saveLogLearning(dataFake);
        // }
        this.setState({
            stateTest: rs?.status,
            file_id: rs?.file_id,
            checkSent: true,
            visibleModalSend: true
        })
    };

    _onSenposts = async () => {
        RNFetchBlob.fetch('POST', API.baseurl+'api_resources/upload', {
            'Content-Type': 'application/x-www-form-urlencoded',
            jwt_token: this.props.data_login.jwt_token,
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            Authorization: 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
        }, [
            { name: 'title', data: this.state.setTitle },
            { name: 'content_writing', data: this.state.stateContent },
        ]).then((resp) => {
            let rs = JSON.parse(resp.data);
            console.log("Gửi bài viết: ", rs);
            if(rs.status){
                this.saverData(rs)
            }
        }).catch((err) => {
            console.log("err: ", err)
        })
    }

    // _onSenpostsScore = async () => {
    //     let dataFake = [{
    //         question_id: this.state.dataQuestion[0].question_id,
    //         exercise_type: 'writing',
    //         question_type: this.state.questionType,
    //         question_score: 0,
    //         final_user_choice: this.state.stateContent,
    //         detail_user_turn: [
    //             {
    //                 num_turn: '1',
    //                 score: 0,
    //                 user_choice: this.state.stateContent,
    //             },
    //         ]
    //     }]
    //     const body = {
    //         data_exercise: JSON.stringify({}),
    //         user_choice: JSON.stringify(dataFake),
    //         exercise_id: this.props.user_received_id,
    //         resource_id: this.state.file_id,
    //         exercise_type: 'writing',
    //         duration: '100',
    //     };
    //     const header = {
    //         'Content-Type': 'application/json',
    //         jwt_token: this.props.data_login.jwt_token,
    //         'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
    //         Authorization: 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
    //     };
    //     const url = API.baseurl+'student/api_homework/save_homework';
    //     try {
    //         const res = await axios({ method: 'post', headers: header, url, data: body });
    //         this.setState({ checkSent: true });
    //         console.log('res.data', res.data)
    //     } catch (e) {
    //         console.log('e', e.response.data)
    //     }
    // }

    _onSenpostsLS = async () => {
        console.log("=====_onSenpostsLS",this.props)
        const {dataLesson} = this.props
        var body = {
            question_type : '7',
            skill: 'writting',
            lesson_id: dataLesson?.lesson_id,
            content_writing: this.state.stateContent,
            title: this.state.setTitle,
            unit_id: dataLesson?.unit_id,
            class_id: dataLesson?.class_id,
            assign_to_id: "" }
        

        console.log('=====body',body)

        var res = await APIBase.postDataJson('POST',API.baseurl+"student/api_student_lesson/assign_lesson",body)

        console.log('=====ResNop',res.data)

        if(res.data.status){
            this.saverData()
            this.setState({ checkSent: true , visibleModalSend: true});
        }else{
            Alert.alert(res.msg)
        }

        // RNFetchBlob.fetch('POST', 'https://setest.gkcorp.com.vn/index.php/api/student/api_student_lesson/assign_lesson', {
        //     'Content-Type': 'application/x-www-form-urlencoded',
        //     jwt_token: this.props.data_login.jwt_token,
        //     'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
        //     Authorization: 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
        // }, body).then((resp) => {
        //     let rs = JSON.parse(resp.data);
        //     console.log("Gửi bài viết: ", rs)
        //     this.setState({ stateTest: rs.status })
        //     this.setState({ checkSent: true });
        // }).catch((err) => {
        //     console.log("err: ", err)
        // })
    }

    // _onSeveWritting = async () => {
    //    this.setState({visible: true,})
    //     Alert.alert('Thông báo', 'Lưu bài thành công');
    // }

    savewritting = () => {
        // Alert.alert('Thông báo', 'Đã hoàn thành');
        this.props.go_back.goBack();
    }

    _onSeveWrittingsave = () => {
        //this.setState({ visibleModalSend: true });
        console.log("=====lesson_homework",this.props.lesson_homework)
        if (this.props.lesson_homework) {this._onSenposts()} else {this._onSenpostsLS()}
    }
    _moveWebView = async (value) => {
        let title = value.split('.').join().split('“').join().split('”').join().replace(/(,)/g, '')
        EventBus.getInstance().fireEvent("modalTranslate", {
            modal: title.toLowerCase(),
            url: 'https://glosbe.com/en/vi/'
        });
    }

    render() {
        return (
            <View
                style={{ flex: 1 }}>
                    <View style={{ height: SmartScreenBase.smPercenHeight * 70, alignSelf: "center", }}>
                        <KeyboardAwareScrollView
                        enableOnAndroid={true}
                        // nestedScrollEnabled={true}
                        onKeyboardDidShow={()=>{
                            this.props.hideTypeExercise()
                        }}
                        onKeyboardDidHide={()=>{
                            this.props.showTypeExercise()
                        }}
                        >
                        {
                            this.state.loading == false ?
                                <View>
                                    {this.state.suggestions == false && !this.props.isTeacher ?
                                        <View style={{ flex: 1 }}>
                                            <View>
                                                {this.render_Question()}
                                            </View>
                                            <View style={{
                                                marginTop: SmartScreenBase.smPercenHeight*3,
                                                alignSelf: "center"
                                            }}>
                                                    {/* this.state.ShowCheck == true && this.checkToSend() ? ( */}
                                                        <View style={{
                                                            width: width,
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                        }}>

                                                            <TouchableOpacity disabled={this.state.ShowCheck == false || !this.checkToSend()}
                                                             onPress={this._onSeveWrittingsave}>
                                                                <View
                                                                    style={(this.state.ShowCheck == false || !this.checkToSend()) ? styleButton.Sty_Button_disable : styleButton.Sty_Button}>
                                                                    <Text style={styleButton.Sty_Text_Button}>GỬI</Text>
                                                                </View>
                                                            </TouchableOpacity>
                                                        </View>
                                            </View>

                                        </View>
                                        :
                                        <View>
                                            <View style={{
                                                marginHorizontal: SmartScreenBase.smPercenWidth * 5,
                                                marginTop: SmartScreenBase.smPercenHeight,
                                            }}>
                                            {this.props.isTeacher && 
                                            <View style={{marginBottom: SmartScreenBase.smPercenWidth}}>
                                               {this.render_GoiY(true)}
                                            </View>
                                            }    

                                                <Text style={{
                                                    color: '#fff',
                                                    fontSize: SmartScreenBase.smFontSize*50,
                                                    fontFamily: 'iCielSoupofJustice'
                                                }}>
                                                    BÀI MẪU
                                                </Text>
                                            </View>

                                            <View style={[StyleLesson.Sty_View_Border, {
                                                alignItems: "flex-start",
                                                height: this.props.isTeacher ? SmartScreenBase.smPercenHeight * 38 : SmartScreenBase.smPercenHeight * 45,
                                                marginHorizontal: SmartScreenBase.smPercenWidth * 5,
                                                marginTop: SmartScreenBase.smPercenHeight * 2,
                                                paddingHorizontal: SmartScreenBase.smPercenWidth * 5,
                                            }]}>
                                                <ScrollView>
                                                    {
                                                        this.state.postsuggestions.split('\n').map((e, k) => {
                                                            return (
                                                                <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                                                    {
                                                                        e.split(' ').map((element, key) => {
                                                                            return (
                                                                                <TouchableOpacity key={key}
                                                                                    onLongPress={() => this._moveWebView(element.toLocaleLowerCase())}>
                                                                                    <Text style={{ fontSize: 16, textAlign: 'justify' }}>{element}{' '}</Text>
                                                                                </TouchableOpacity>
                                                                            )
                                                                        })
                                                                    }
                                                                </View>
                                                            )
                                                        })
                                                    }
                                                </ScrollView>
                                            </View>
                                            <View style={{
                                                marginTop: SmartScreenBase.smPercenHeight * 10,
                                                width: '100%',
                                                alignItems: "center",
                                                justifyContent: "space-evenly",
                                                flexDirection: "row",
                                                zIndex: 10
                                            }}>
                                                <TouchableOpacity onPress={this._onNextdataQuettion}>
                                                    <View style={styleButton.Sty_Button}>
                                                        <Text style={styleButton.Sty_Text_Button}>TIẾP TỤC</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    }
                                </View>
                                :
                                <ActivityIndicator size="large" color="#0000ff" marginTop='30%' />
                        }
                        </KeyboardAwareScrollView>
                    </View>
            </View>
        )
    }

    render_GoiY(isTeacher) {
        return (
            <View>
                {this.state.isShow && (
                    <TouchableOpacity 
                    onPress={() => this.setState({isShow: false})}
                    style={{
                        backgroundColor: 'white',
                        marginHorizontal: isTeacher ? 0 : SmartScreenBase.smPercenWidth * 5,
                        width: SmartScreenBase.smPercenWidth * 23.5,
                        paddingHorizontal: SmartScreenBase.smPercenWidth * 3,
                        paddingVertical: SmartScreenBase.smPercenWidth * 2,
                        borderRadius: 25,
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                    }}>
                        <Text style={{ fontSize: SmartScreenBase.smFontSize * 40 }}>Gợi ý</Text>
                        <Image source={{ uri: 'muitenxuong' }} style={{ width: 30, height: 30, resizeMode: 'contain', tintColor: '#39bc9e' }} />
                    </TouchableOpacity>
                )}
                    {!this.state.isShow && (
                    <View style={[StyleLesson.Sty_View_Border, {
                        alignItems: "flex-start",
                        height: SmartScreenBase.smPercenHeight * 20,
                        marginHorizontal: SmartScreenBase.smPercenWidth * 5,
                        marginTop: SmartScreenBase.smPercenHeight * 1,
                        padding: SmartScreenBase.smPercenWidth * 0,
                    }]}>
                        <ScrollView nestedScrollEnabled={true} style={{marginLeft: SmartScreenBase.smPercenWidth * 5, width: SmartScreenBase.smPercenWidth*80.5}}>
                            {
                                this.state.dataSuppor.split('\n').map((e, k) => {
                                    return (
                                        <View  key={k} style={{ flexDirection: "row", flexWrap: 'wrap', marginBottom:SmartScreenBase.smPercenWidth }}>
                                            {
                                                e.split(' ').map((element, key) => {
                                                    return (
                                                        <View key={key}>
                                                            <TouchableOpacity
                                                                onLongPress={() => this._moveWebView(element.toLowerCase())}
                                                                style={{ zIndex: 1 }}>
                                                                <Text style={[styles.textHeaderD6, {fontWeight: 'normal'}]}>
                                                                    {element}{' '}
                                                                </Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    )
                                                })
                                            }
                                        </View>
                                    )
                                })
                            }
                        </ScrollView>
                        <View style={{
                            alignSelf: 'center',
                            marginBottom: -20,
                            backgroundColor: 'white',
                            marginTop: 5,
                            padding: 3,
                            borderRadius: 25
                        }}>
                            <TouchableOpacity onPress={() => this.setState({isShow: true})}>
                                <Image source={{ uri: 'muitenlen' }} style={{ width: 30, height: 30, resizeMode: 'contain', tintColor: '#39bc9e' }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                </View>
        )
    }

    render_Question() {
        return (
            <View>
                {this.render_GoiY()}
                    <View style={{
                            alignItems: "flex-start",
                            height: SmartScreenBase.smPercenHeight * 35,
                            marginHorizontal: SmartScreenBase.smPercenWidth * 5,
                            marginTop: SmartScreenBase.smPercenHeight * 2,
                            width: SmartScreenBase.smPercenWidth * 90,
                            borderRadius: SmartScreenBase.smPercenWidth * 3,
                            backgroundColor: 'rgba(255,255,255,0.95)',
                            padding: SmartScreenBase.smPercenHeight,
                            marginTop: SmartScreenBase.smPercenHeight * 4,
                            flex:1,
                        }}>
                            <TextInput
                                ref={(e) => {
                                    this.TextForcus = e                                    
                                }}
                                onChangeText={(stateContent) => {
                                    this._OnTextChange(stateContent)
                                }}
                                multiline={true}
                                placeholder={" Nội dung bài viết ..."}
                                style={{
                                    fontWeight: '400',
                                    fontSize: SmartScreenBase.smPercenWidth * 4,
                                    color: 'black',
                                    width:'100%',
                                    height:'100%',
                                    textAlignVertical:'top'
                                }}
                            />
                    </View>

                <Modal isVisible={this.state.visibleModalSend}
                    onBackdropPress={() => {
                        if (this.state.checkSent == false) {
                            this.setState({ visibleModalSend: false })
                        }
                    }}
                >
                    {
                        this.state.checkSent == false ? (
                            <View style={[stylesApp.containerModal]}>
                                <View style={{
                                    width: SmartScreenBase.smPercenWidth * 80,
                                    alignSelf: "center",
                                    height: SmartScreenBase.smPercenWidth * 50,
                                    marginTop: SmartScreenBase.smPercenWidth * 8,
                                    zIndex:99999
                                }}>
                                    <Text style={{ fontWeight: '700', fontSize: SmartScreenBase.smFontSize * 40 }}>
                                        Tiêu đề:
                                    </Text>
                                    <View style={{
                                        height: SmartScreenBase.smPercenHeight * 6,
                                        zIndex: 10,
                                        marginTop: SmartScreenBase.smPercenWidth,
                                        marginBottom: 15
                                    }}>
                                        <TextInput style={{
                                            borderRadius: 10,
                                            borderColor: '#D8D8D8',
                                            borderWidth: 1,
                                            paddingHorizontal: 15,
                                            color: 'black',
                                            height: Platform.OS === 'ios' ? SmartScreenBase.smPercenHeight * 6 : SmartScreenBase.smPercenHeight * 6
                                        }}
                                            value={this.state.setTitle}
                                            onChangeText={(value) => {
                                                this.setState({ setTitle: value })
                                            }}
                                            placeholder='Nhập tiêu đề...'
                                        />
                                    </View>
                                    <Text style={{ fontWeight: '700', fontSize: SmartScreenBase.smFontSize * 40, }}>Gửi cho :</Text>
                                    <View style={{
                                        height: SmartScreenBase.smPercenWidth * 20,
                                        zIndex: 10,
                                        marginTop: SmartScreenBase.smPercenWidth
                                    }}>
                                        {
                                            this.state.dataContact.length <= 1 ?
                                                <View style={{
                                                    borderWidth: 1, 
                                                    paddingHorizontal:SmartScreenBase.smPercenWidth*5,
                                                    borderRadius: 10, 
                                                    borderColor: '#D8D8D8',
                                                    paddingVertical:10
                                                    
                                                }}>
                                                    {
                                                        this.state.dataContact.map((item, key) => {
                                                            return (
                                                                <TextInput value={item.username}
                                                                style={{ 
                                                                    color: 'black',
                                                                    fontSize:SmartScreenBase.smFontSize*40
                                                                }} 
                                                                editable={false} />
                                                            )
                                                        })
                                                    }
                                                </View>
                                                :
                                                <TouchableWithoutFeedback style={{ position: "absolute", zIndex: 0 }}
                                                    onPress={() => this._OnPressSendTo()}>
                                                    <View
                                                        style={[StyleLesson.Sty_ViewChooseSendTo, 
                                                            { height: SmartScreenBase.smPercenHeight * 6 + this.state.heightViewSendTo }]}>
                                                        <ScrollView showsVerticalScrollIndicator={false} scrollEnabled={false}>
                                                            <View style={{ flexDirection: "row", justifyContent: "flex-start" }}>
                                                                <View>
                                                                    {
                                                                        this.state.dataContact.map((item, key) => {
                                                                            return (
                                                                                <TouchableWithoutFeedback key={key}
                                                                                    onPress={() => {
                                                                                        this._ChooseSendTo(key)
                                                                                    }}>
                                                                                    <View style={{
                                                                                        left: SmartScreenBase.smPercenWidth * 1.5,
                                                                                        width: SmartScreenBase.smPercenWidth * 67,
                                                                                        height: SmartScreenBase.smPercenHeight * 6,
                                                                                        padding: SmartScreenBase.smPercenWidth,
                                                                                        borderBottomWidth: 1,
                                                                                        borderColor: '#D8D8D8',
                                                                                    }}>
                                                                                        <Text style={{
                                                                                            fontWeight: "600",
                                                                                            fontSize: SmartScreenBase.smPercenWidth * 4.5,
                                                                                            paddingVertical: SmartScreenBase.smPercenWidth,
                                                                                        }}>
                                                                                            {item.username}
                                                                                        </Text>
                                                                                    </View>
                                                                                </TouchableWithoutFeedback>
                                                                            )
                                                                        })}
                                                                </View>
                                                                <View style={{
                                                                    borderLeftWidth: 1,
                                                                    borderColor: '#D8D8D8',
                                                                    margin: SmartScreenBase.smPercenWidth,
                                                                    width: SmartScreenBase.smPercenWidth * 10,
                                                                    alignItems: "center",
                                                                    justifyContent: "center",
                                                                    height: SmartScreenBase.smPercenWidth * 10
                                                                }}>
                                                                    <Image
                                                                        source={{ uri: 'lesson_speaking_image2' }}
                                                                        style={{
                                                                            width: SmartScreenBase.smBaseWidth * 38,
                                                                            height: SmartScreenBase.smBaseWidth * 29,
                                                                            resizeMode: "contain"
                                                                        }}
                                                                    />
                                                                </View>
                                                            </View>
                                                        </ScrollView>
                                                    </View>
                                                </TouchableWithoutFeedback>
                                        }

                                    </View>
                                </View>
                                <View style={{
                                    width: SmartScreenBase.smPercenWidth * 80,
                                    alignItems: "flex-end",
                                    marginVertical: SmartScreenBase.smPercenHeight * 2,
                                    bottom: SmartScreenBase.smPercenHeight * 2,
                                    flexDirection: 'row',
                                }}>
                                    <View style={{
                                        width: SmartScreenBase.smPercenWidth * 40,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <TouchableOpacity
                                            disabled={!this.state.stateShowimage}
                                            onPress={() => {
                                                this.setState({ visibleModalSend: false })
                                            }}
                                        >
                                            <View style={stylesApp.Sty_Buttoncenten}>
                                                <Text style={stylesApp.Sty_Text_Button}>Hủy</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{
                                        width: SmartScreenBase.smPercenWidth * 40,
                                        justifyContent: 'center',
                                        alignItems: 'center'
                                    }}>
                                        <TouchableOpacity onPress={this.props.lesson_homework ? this._onSenposts : this._onSenpostsLS}
                                            disabled={!this.state.stateShowimage}>
                                            <View style={stylesApp.Sty_ButtonSen}>
                                                <Text style={stylesApp.Sty_Text_Button}>Gửi</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        ) : (
                                <View style={{ alignSelf: "center", alignItems: "center" }}>
                                    <Image
                                        source={{ uri: "lesson_speaking_image3" }}
                                        style={{
                                            width: SmartScreenBase.smPercenWidth * 50,
                                            height: SmartScreenBase.smPercenWidth * 50,
                                            resizeMode: "contain"
                                        }}
                                    />
                                    <Text style={{
                                        fontWeight: "800",
                                        textAlign: 'center',
                                        color: "white",
                                        fontFamily: FontBase.MyriadPro_Regular,
                                        fontSize: SmartScreenBase.smFontSize * 65,
                                        marginTop: SmartScreenBase.smPercenHeight * 4,
                                        marginBottom: SmartScreenBase.smPercenHeight * 4
                                    }}>{"Đã gửi cho giáo viên\nBạn chờ kết quả chấm nhé!"}</Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            MyData.isCanExit = true
                                            this.setState({ suggestions: true });
                                        }}>
                                        <View style={styleButton.Sty_Button}>
                                            <Text style={styleButton.Sty_Text_Button}>TIẾP TỤC</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )}
                </Modal>
            </View>
        )
    }
}

function mapStateToProps(state) {
    return {
        data_login: state.AuthStackReducer.dataLogin,
    };
}

export default connect(mapStateToProps)(WrittingD7);
