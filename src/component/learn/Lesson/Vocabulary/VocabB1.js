import React, { Component } from "react";
import { Text, View, PanResponder, Animated, ActivityIndicator, TouchableOpacity, Image, StyleSheet, Alert, TouchableWithoutFeedback, Dimensions } from "react-native";
import StyleLesson from "../StyleLesson";
import TypeExercise from "../Component/TypeExercise";
import SmartScreenBase from "../../../../base/SmartScreenBase";
import Video from 'react-native-video';
import stylesApp from "../../../styleApp/stylesApp";
import ButtonCheck from "../../../items/ButtonCheck";
import axios from "axios";
import { connect } from 'react-redux'
import { vocabulary } from "../../../../redux/actions/vocabulary";
import API from '../../../../API/APIConstant';
import FileSound from "../FileSound";
import stylesButton from '../../../../styleApp/stylesApp';
import MarqueeText from 'react-native-marquee';
import FontBase from "../../../../base/FontBase";
import LogBase from "../../../../base/LogBase";
const { width, height } = Dimensions.get('window');
let L;
let Sound = require('react-native-sound');
Sound.setCategory('Playback');
class VocabularyScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            DropZoneValues_1: null,
            DropZoneValues_2: null,
            DropZoneValues_3: null,
            DropZoneValues_4: null,
            PanRes: new Animated.ValueXY(),
            checkAnswer: false,
            showPan: true,
            checkResuilt: null,
            index: -1,
            check: false,
            title: 'Drag and drop words into pictures.',
            dataQuestion: [],
            Loading: true,
            name: "",
            vi: false,
            bodyPost: [],
            dataPost: {},
            idLog: {},
            playQuestion: true
        }
        this.Sound = null;
        this.PanResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: Animated.event([null, {
                dx: this.state.PanRes.x,
                dy: this.state.PanRes.y,
            }]),
            onPanResponderRelease: (e, gesture) => {
                if (this.DropZone_1(gesture)) {
                    // console.log('gesture1', gesture)
                    this.state.name = this.state.dataQuestion.name[0].answer;
                    this.state.dataQuestion.name[0].answer = this.state.dataQuestion.vocabulary;
                    this.state.dataQuestion.name[0].check = true;
                    this.setState({ checkAnswer: true, showPan: false, index: 0, });
                }
                else if (this.DropZone_2(gesture)) {
                    // console.log('gesture2', gesture)
                    this.state.name = this.state.dataQuestion.name[1].answer;
                    this.state.dataQuestion.name[1].answer = this.state.dataQuestion.vocabulary;
                    this.state.dataQuestion.name[1].check = true;
                    this.setState({ checkAnswer: true, showPan: false, index: 1, });
                }
                else if (this.DropZone_3(gesture)) {
                    // console.log('gesture3', gesture)
                    this.state.name = this.state.dataQuestion.name[2].answer;
                    this.state.dataQuestion.name[2].answer = this.state.dataQuestion.vocabulary;
                    this.state.dataQuestion.name[2].check = true;
                    this.setState({ checkAnswer: true, showPan: false, index: 2, });
                }
                else if (this.DropZone_4(gesture)) {
                    // console.log('gesture4', gesture)
                    this.state.name = this.state.dataQuestion.name[3].answer;
                    this.state.dataQuestion.name[3].answer = this.state.dataQuestion.vocabulary;
                    this.state.dataQuestion.name[3].check = true;
                    this.setState({ checkAnswer: true, showPan: false, index: 3, });
                }
                else {
                    Animated.spring(this.state.PanRes, {
                        toValue: { y: 0, x: 0 }
                    }).start();
                };
            },

        });
    };
    componentDidMount = async () => {
        this.props.setVietNam('Kéo và thả từ vào tranh thích hợp.');
        this.props.setEnglish('Drag and drop words into pictures.');
        this._getData();
    };
    _postDataFirt = async (data) => {
        const url = API.baseurl + API.saveLogLearning;
        const body = {
            class_id: 1,
            curriculum_id: 1,
            unit_id: 1,
            lesson_id: data.lesson.id,
            data_lesson: JSON.stringify(data)
        }
        const header = {
            'Content-Type': 'application/json',
            jwt_token:
                'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImFkbWluIiwidGltZV9sb2dpbiI6MTU3ODkwNzQyM30.CFZyO9a-qBmyI8Q25AqGNd1nxWn1SO5TMC_yBxjgWCA',
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            Authorization: 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
        };
        try {
            console.log("=========_saveStartLogLearning VocabB1");
            const res = await axios({ method: 'post', url, data: body, headers: header });
            this.setState({ idLog: res.data })
        } catch (error) {
            console.log(error)
            if (error.message === 'Network Error') {
                Alert.alert('Thông Báo', 'Vui lòng kiểm tra kết nối Internet');
            }
        }
        this._convertDataPost(data)
    }
    _convertDataPost = (data) => {
        const { bodyPost } = this.state
        let body = [...bodyPost];
    }

    _getData = async () => {
        this.props.showTypeExercise()
        let ressponse = {};
        ressponse['data'] = this.props.dataContent;
        await this.setState({ data: ressponse.data })
        await this.props.dispatch(vocabulary(ressponse))
        try{
            let data = await this.convertData(ressponse.data.data_question);
            var ranData = this.randomPA(data)
            this.setState({
                dataQuestion: ranData,
                dataPost: ressponse.data,
                Loading: false,
            });
            await this.props.SaveDataTotal(data.id)
        }catch(er){console.log("=====loi",er); Alert.alert("Bài tập này đang bị lỗi dữ liệu, vui lòng chọn bài khác");             
        }
    };

    randomPA = (mData) => {

        var mResult = {
            name: [],
            image: [],
            word_type: mData.word_type,
            id: mData.id,
            audio: mData.audio,
            vocabulary: mData.vocabulary,
            spell: mData.spell,
            nameCheck: mData.nameCheck,
        }
        var listSttR = []
        for(var i=0;i<mData.name.length;i++){
            listSttR.push(i)
        }

        for(var i=0;i<listSttR.length;i++){
            var index = Math.floor(Math.random() * listSttR.length)
            var swi = listSttR[index]
            listSttR[index] = listSttR[i]
            listSttR[i] = swi
        }

        for(var i=0;i<listSttR.length;i++){
            mResult.name[i] = mData.name[listSttR[i]]
            mResult.image[i] = mData.image[listSttR[i]]
          }

        return mResult
    }

    convertData = (data) => {
        let dataConvert = [];
        data.map((item, index) => {
            
            let dataQ = {};
            dataConvert[index] = dataQ;
            dataQ.name = []
            dataQ.image = []
            data.map((itm, int) => {
                let ojName = {};
                let dataimg = {};
                let nameQestion = JSON.parse(itm.vi_mean)[0];
                let imageQuestion = JSON.parse(itm.image)[0];
                JSON.parse(itm.vi_mean).map(Element => {
                    return nameQestion = Element
                });
                dataQ.name[int] = ojName;
                ojName.answer = nameQestion;
                ojName.id = int;
                ojName.check = false;
                dataQ.image[int] = imageQuestion;
            });
            dataQ.word_type = item.word_type
            dataQ.id = item.id
            dataQ.audio = item.audio;
            dataQ.vocabulary = item.vocabulary;
            dataQ.spell = item.spell;
            dataQ.nameCheck = JSON.parse(item.vi_mean)[0];
          
        });
        return dataConvert[this.props.index]
    };
    async AnswerAgain(id) {
        if (this.state.index == id) {
            if (this.state.checkResuilt != true) {
                Animated.spring(this.state.PanRes, {
                    toValue: { y: 0, x: 0 }
                }).start();
                this.state.dataQuestion.name[id].answer = this.state.name
                this.state.dataQuestion.name[id].check = false;
                await this.setState({ checkAnswer: false, showPan: true, checkResuilt: null, index: -1 });
            }
        }
    }
    async checkResuilt() {
        const { dataQuestion, name } = this.state;
        if (dataQuestion.nameCheck == name) {
            if (this.state.checkResuilt == true) {
                await this.props.SaveData(dataQuestion.nameCheck, 1, 1)
                await this.props.methodScreen('2');
            } else {
                this.setState({ checkResuilt: true });
            }
        } else {
            if (this.state.checkResuilt == false) {
                this.AnswerAgain(this.state.index);
                this.setState({ animatedValue: new Animated.Value(0) });
            } else {
                this.setState({ checkResuilt: false });
            }
        }
    }
    ColorAnswer(id) {
        if (id == this.state.index) {
            if (this.state.checkResuilt == true) {
                return '#72B228';
            } else if (this.state.checkResuilt == false) {
                return '#AF2839'
            } else {
                return '#E5B007'
            }
        } else {
            return '#E5B007'
        }
    }
    _OnpressAudio() {
        this.setState({ playQuestion: false })

    }
    _changeTitle = () => {
        if (!this.state.vi) {
            this.setState({ title: 'Kéo và thả từ vào tranh thích hợp.', vi: true })
        } else {
            this.setState({ title: 'Drag and drop words into pictures.', vi: false })
        }
    }
    _end = async () => {
        await this.setState({ playQuestion: true })
        this.AudioQuestion.seek(0)
    }
    GetLayout = (event) => {
        L = event.nativeEvent.layout
    }
    render() {
        const { dataQuestion, Loading } = this.state;
        return (
            !Loading ?
                <View style={{ flex: 1, }} onLayout={this.GetLayout}>
                    {/* <TypeExercise title={this.state.title} onPress={this._changeTitle} /> */}
                    <View style={{
                        height: SmartScreenBase.smPercenHeight * 70, justifyContent: "center",
                        alignItems: "center",
                    }}>
                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                            <View style={[StyleLesson.Sty_Width_Screen, { justifyContent: "space-evenly", }]}>
                                <TouchableWithoutFeedback onPress={() => { this.AnswerAgain(0) }}>
                                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                                        <View style={{ borderWidth: 4, borderColor: '#fff', borderRadius: 15 }}
                                            onLayout={this.setDropZoneValues_1.bind(this)}
                                        >
                                            {LogBase.log("=====vào trong rồi nè")}
                                            {LogBase.log("=====image0",`${dataQuestion.image[0]}`)}
                                            <Image source={{ uri: `${dataQuestion.image[0]}` }}
                                                style={{
                                                    borderTopLeftRadius: 7,
                                                    borderTopRightRadius: 7,
                                                    width: SmartScreenBase.smBaseWidth * 486,
                                                    height: SmartScreenBase.smBaseWidth * 384,
                                                    resizeMode: "cover"
                                                }}
                                            />
                                            {dataQuestion.name[0].check == true ? (
                                                <View style={[styless.Answer, { backgroundColor: this.ColorAnswer(0), flexDirection: "row", justifyContent: 'space-around' }]}>
                                                    <View style={{ width: width / 3.5 }}>
                                                        <MarqueeText
                                                            duration={3000}
                                                            marqueeOnStart
                                                            loop
                                                            marqueeDelay={1000}
                                                            marqueeResetDelay={1000}
                                                        >
                                                            <Text
                                                                style={[stylesApp.txt_Title, { color: this.state.checkResuilt == null ? "black" : "white", backgroundColor: this.ColorAnswer(0)}]}>
                                                                {dataQuestion.name[0].answer}
                                                                <Text style={{ ...stylesApp.txt_Title, color: '#fff', fontWeight: 'normal' }}>{this.ColorAnswer(0) == "#72B228" ? `${"/" + dataQuestion.word_type + "/"}` : ''}</Text>
                                                            </Text>
                                                        </MarqueeText>
                                                    </View>
                                                    <TouchableOpacity onPress={() => { this._OnpressAudio() }}>
                                                        <Image source={{ uri: 'loa' }}
                                                            style={{
                                                                width: SmartScreenBase.smPercenWidth * 7,
                                                                height: SmartScreenBase.smPercenWidth * 7, resizeMode: "contain"
                                                            }}
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                            ) : (<View style={{ ...styless.Answer, paddingHorizontal: 5 }}>
                                                <MarqueeText
                                                    duration={3000}
                                                    marqueeOnStart
                                                    loop
                                                    marqueeDelay={1000}
                                                    marqueeResetDelay={1000}
                                                >
                                                    <Text style={[stylesApp.txt_Title, {backgroundColor: "#C6C6C2"}]}>{dataQuestion.name[0].answer}</Text>
                                                </MarqueeText>
                                                {/* <Text style={[stylesApp.txt_Title, { color: "black", fontWeight: "400" }]}>{dataQuestion.name[0].answer}</Text> */}
                                            </View>)}

                                        </View>
                                        <View style={{ position: "absolute", alignSelf: "center" }}>
                                            {this._Show_Icon_Answer(0)}
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                                <TouchableWithoutFeedback onPress={() => { this.AnswerAgain(1) }}>
                                    <View style={{ alignItems: "center", justifyContent: "center" }} onLayout={this.setDropZoneValues_2.bind(this)}>
                                        <View style={{ borderWidth: 4, borderColor: '#fff', borderRadius: 15 }}>
                                        {LogBase.log("=====image1",`${dataQuestion.image[1]}`)}
                                            <Image source={{ uri: `${dataQuestion.image[1]}` }}
                                                style={{
                                                    borderTopLeftRadius: 7,
                                                    borderTopRightRadius: 7,
                                                    width: SmartScreenBase.smBaseWidth * 486,
                                                    height: SmartScreenBase.smBaseWidth * 384,
                                                    resizeMode: "cover"
                                                }}
                                            />
                                            {dataQuestion.name[1].check == true ? (
                                                <View style={[styless.Answer, { backgroundColor: this.ColorAnswer(1), flexDirection: "row", justifyContent: 'space-around' }]}>
                                                    <View style={{ width: width / 3.5 }}>
                                                        <MarqueeText
                                                            duration={3000}
                                                            marqueeOnStart
                                                            loop
                                                            marqueeDelay={1000}
                                                            marqueeResetDelay={1000}
                                                        >
                                                            <Text
                                                                style={[stylesApp.txt_Title, { color: this.state.checkResuilt == null ? "black" : "white", backgroundColor: this.ColorAnswer(1)}]}>
                                                                {dataQuestion.name[1].answer}
                                                                <Text style={{ ...stylesApp.txt_Title, color: '#fff', fontWeight: 'normal' }}>{this.ColorAnswer(1) == "#72B228" ? `${"/" + dataQuestion.word_type + "/"}` : ''}</Text>
                                                            </Text>
                                                        </MarqueeText>
                                                    </View>
                                                    <TouchableOpacity onPress={() => { this._OnpressAudio() }}>
                                                        <Image source={{ uri: 'loa' }}
                                                            style={{
                                                                width: SmartScreenBase.smPercenWidth * 7,
                                                                height: SmartScreenBase.smPercenWidth * 7, resizeMode: "contain"
                                                            }}
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                            ) : (<View style={{ ...styless.Answer, paddingHorizontal: 5 }}>
                                                <MarqueeText
                                                    duration={3000}
                                                    marqueeOnStart
                                                    loop
                                                    marqueeDelay={1000}
                                                    marqueeResetDelay={1000}
                                                >
                                                    <Text style={[stylesApp.txt_Title, {backgroundColor: "#C6C6C2"}]}>{dataQuestion.name[1].answer}</Text>
                                                </MarqueeText>
                                            </View>)}
                                        </View>
                                        <View style={{ position: "absolute", alignSelf: "center" }}>
                                            {this._Show_Icon_Answer(1)}
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>
                            <View style={{ height: SmartScreenBase.smPercenHeight * 16, zIndex: 1000, justifyContent: 'center', alignItems: 'center', width: '100%' }} >
                                <View style={{}}>
                                    <Animated.View
                                        {...this.PanResponder.panHandlers}
                                        style={[this.state.PanRes.getLayout()]}
                                    >
                                        {this.state.showPan == true ? (
                                            <View style={{ ...styless.Sty_Answer, width: width / 2.5 }}>
                                                <View style={{ flexDirection: "row", justifyContent: 'space-around', alignItems: 'center', }}>
                                                    <View style={{ marginRight: SmartScreenBase.smPercenWidth * 3, alignItems: "center" }}>
                                                        <MarqueeText

                                                            duration={3000}
                                                            marqueeOnStart
                                                            loop
                                                            marqueeDelay={1000}
                                                            marqueeResetDelay={1000}
                                                        >
                                                            <Text style={[stylesApp.txt_Title,{backgroundColor: "#E5B007"}]}>{dataQuestion.vocabulary}</Text>
                                                        </MarqueeText>

                                                        <Text style={[stylesApp.txt_Title, {color: "gray", fontFamily: FontBase.MyriadPro_It}]}>{dataQuestion.spell}</Text>
                                                    </View>
                                                    <TouchableOpacity style={{
                                                        width: SmartScreenBase.smPercenWidth * 7,
                                                        height: SmartScreenBase.smPercenWidth * 7,
                                                    }} onPress={() => { this._OnpressAudio() }}>
                                                        <Image source={{ uri: 'loa' }}
                                                            style={{
                                                                width: SmartScreenBase.smPercenWidth * 7,
                                                                height: SmartScreenBase.smPercenWidth * 7, resizeMode: "contain"
                                                            }} />
                                                    </TouchableOpacity>
                                                </View>

                                            </View>
                                        ) : null}
                                    </Animated.View>
                                </View>
                            </View>
                            <View style={[StyleLesson.Sty_Width_Screen, { justifyContent: "space-evenly" }]}>
                                <TouchableWithoutFeedback onPress={() => { this.AnswerAgain(2) }}>
                                    <View style={{ alignItems: "center", justifyContent: "center" }}>
                                        <View style={{ borderWidth: 4, borderColor: '#fff', borderRadius: 15 }}
                                            onLayout={this.setDropZoneValues_3.bind(this)}
                                        >
                                            {LogBase.log("=====image 2",`${dataQuestion.image[2]}`)}
                                            <Image source={{ uri: `${dataQuestion.image[2]}` }}
                                                style={{
                                                    borderTopLeftRadius: 7,
                                                    borderTopRightRadius: 7,
                                                    width: SmartScreenBase.smBaseWidth * 486,
                                                    height: SmartScreenBase.smBaseWidth * 384,
                                                    resizeMode: "cover"
                                                }}
                                            />
                                            {dataQuestion.name[2].check == true == true ? (
                                                <View style={[styless.Answer, { backgroundColor: this.ColorAnswer(2), flexDirection: "row", justifyContent: 'space-around' }]}>
                                                    <View style={{ width: width / 3.5 }}>
                                                        <MarqueeText
                                                            duration={3000}
                                                            marqueeOnStart
                                                            loop
                                                            marqueeDelay={1000}
                                                            marqueeResetDelay={1000}
                                                        >
                                                            <Text
                                                                style={[stylesApp.txt_Title, { color: this.state.checkResuilt == null ? "black" : "white", backgroundColor: this.ColorAnswer(2)}]}>
                                                                {dataQuestion.name[2].answer}
                                                                <Text style={{ ...stylesApp.txt_Title, color: '#fff', fontWeight: 'normal' }}>{this.ColorAnswer(2) == "#72B228" ? `${"/" + dataQuestion.word_type + "/"}` : ''}</Text>
                                                            </Text>
                                                        </MarqueeText>
                                                    </View>
                                                    <TouchableOpacity onPress={() => { this._OnpressAudio() }}>
                                                        <Image source={{ uri: 'loa' }}
                                                            style={{
                                                                width: SmartScreenBase.smPercenWidth * 7,
                                                                height: SmartScreenBase.smPercenWidth * 7, resizeMode: "contain"
                                                            }}
                                                        />
                                                    </TouchableOpacity>
                                                </View>
                                            ) : (<View style={{ ...styless.Answer, paddingHorizontal: 5 }}>
                                                <MarqueeText
                                                    duration={3000}
                                                    marqueeOnStart
                                                    loop
                                                    marqueeDelay={1000}
                                                    marqueeResetDelay={1000}
                                                >
                                                    <Text style={[stylesApp.txt_Title, {backgroundColor: "#C6C6C2"}]}>{dataQuestion.name[2].answer}</Text>
                                                </MarqueeText>
                                            </View>)}
                                        </View>
                                        <View style={{ position: "absolute", alignSelf: "center" }}>
                                            {this._Show_Icon_Answer(2)}
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>

                                <TouchableWithoutFeedback onPress={() => { this.AnswerAgain(3) }}>
                                    <View style={{ alignItems: "center", justifyContent: "center" }} onLayout={this.setDropZoneValues_4.bind(this)}>
                                        <View style={{ borderWidth: 4, borderColor: '#fff', borderRadius: 15 }}>
                                        {LogBase.log("=====image3",`${dataQuestion.image[3]}`)}
                                            <Image source={{ uri: `${dataQuestion.image[3]}` }}
                                                style={{
                                                    borderTopLeftRadius: 7,
                                                    borderTopRightRadius: 7,
                                                    width: SmartScreenBase.smBaseWidth * 486,
                                                    height: SmartScreenBase.smBaseWidth * 384,
                                                    resizeMode: "cover"
                                                }}
                                            />
                                            {dataQuestion.name[3].check == true == true ? (
                                                <View style={[styless.Answer, { backgroundColor: this.ColorAnswer(3), flexDirection: "row", justifyContent: 'space-around' }]}>
                                                    <View style={{ width: width / 3.5 }}>
                                                        <MarqueeText
                                                            duration={3000}
                                                            marqueeOnStart
                                                            loop
                                                            marqueeDelay={1000}
                                                            marqueeResetDelay={1000}
                                                        >
                                                            <Text
                                                                style={[stylesApp.txt_Title, { color: this.state.checkResuilt == null ? "black" : "white", backgroundColor: this.ColorAnswer(3)}]}>
                                                                {dataQuestion.name[3].answer}
                                                                <Text style={{ ...stylesApp.txt_Title, color: '#fff', fontWeight: 'normal' }}>{this.ColorAnswer(3) == "#72B228" ? `${"/" + dataQuestion.word_type + "/"}` : ''}</Text>
                                                            </Text>
                                                        </MarqueeText>
                                                    </View>
                                                    <TouchableOpacity onPress={() => { this._OnpressAudio() }}>
                                                        <Image source={{ uri: 'loa' }}
                                                            style={{
                                                                width: SmartScreenBase.smPercenWidth * 7,
                                                                height: SmartScreenBase.smPercenWidth * 7, resizeMode: "contain"
                                                            }} />
                                                    </TouchableOpacity>
                                                </View>
                                            ) : (<View style={{ ...styless.Answer, paddingHorizontal: 5 }}>
                                                <View style={{width:'100%',alignItems:'center',justifyContent:'center'}}>
                                                    <MarqueeText
                                                        duration={3000}
                                                        marqueeOnStart
                                                        loop
                                                        marqueeDelay={1000}
                                                        marqueeResetDelay={1000}
                                                       
                                                    >
                                                        <Text style={[stylesApp.txt_Title, {backgroundColor: "#C6C6C2"}]}>{dataQuestion.name[3].answer}</Text>
                                                    </MarqueeText>
                                                </View>
                                            </View>)}
                                        </View>
                                        <View style={{ position: "absolute", alignSelf: "center" }}>
                                            {this._Show_Icon_Answer(3)}
                                        </View>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>


                        </View>
                        <View style={{ height: SmartScreenBase.smPercenHeight * 2 }} />

                        <View style={{ position: "absolute", }}>
                            {this.state.checkAnswer == true ? (
                                <TouchableOpacity onPress={() => { this.checkResuilt() }} style={stylesButton.Sty_Button}>
                                    <Text style={stylesButton.Sty_Text_Button}>{this.state.checkResuilt == null ? 'KIỂM TRA' : this.state.checkResuilt == false ? "LÀM LẠI" : "TIẾP TỤC"}</Text>
                                </TouchableOpacity>
                            ) : null}
                        </View>
                    </View>

                    <Video source={{ uri: dataQuestion.audio }}
                        ref={refs => this.AudioQuestion = refs}
                        onEnd={this._end}  // Can be a URL or a local file.
                        paused={this.state.playQuestion}                                // Store reference
                    />
                </View>
                :
                <View style={{ width: width, 
                        height: SmartScreenBase.smPercenHeight*80 , 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        position: 'absolute',
                        top:0,left:0 }}>
                    <Image source={require('../../../../assets/eloading.gif')}
                    style={{
                        width: 100,
                        height: 100,
                        resizeMode: "contain",
                    }} />
                </View>
        )
    }
    _Show_Icon_Answer(id) {
        if (id == this.state.index) {
            if (this.state.checkResuilt == true) {
                return (
                    <FileSound showImage={"true"} />
                )
            } else if (this.state.checkResuilt == false) {
                return (
                    <FileSound showImage={"false"} />
                )
            }
        } else {
            return null
        }
    }
    setDropZoneValues_1(event) {
        this.state.DropZoneValues_1 = event.nativeEvent.layout;

    }
    setDropZoneValues_2(event) {

        this.state.DropZoneValues_2 = event.nativeEvent.layout;
    }
    setDropZoneValues_3(event) {
        this.state.DropZoneValues_3 = event.nativeEvent.layout;
    }
    setDropZoneValues_4(event) {
        this.state.DropZoneValues_4 = event.nativeEvent.layout;
    }
    DropZone_1(gesture) {
        let dz = this.state.DropZoneValues_1;
        return gesture.moveY > (SmartScreenBase.ratio > 1.9 ? SmartScreenBase.smPercenHeight * 27 : SmartScreenBase.smPercenHeight * 23)
            && gesture.moveY < dz.height + (SmartScreenBase.ratio > 1.9 ? SmartScreenBase.smPercenHeight * 30 : SmartScreenBase.smPercenHeight * 27)
            && gesture.moveX > dz.x + SmartScreenBase.smPercenWidth
            && gesture.moveX <= dz.x + dz.width + SmartScreenBase.smPercenWidth*2
            // && gesture.moveX < 125 && gesture.moveY < 380
    }
    DropZone_2(gesture) {
        let dz = this.state.DropZoneValues_2;
       
        return gesture.moveY > (SmartScreenBase.ratio > 1.9 ? SmartScreenBase.smPercenHeight * 27 : SmartScreenBase.smPercenHeight * 23)
            && gesture.moveY < dz.height + (SmartScreenBase.ratio > 1.9 ? SmartScreenBase.smPercenHeight * 30 : SmartScreenBase.smPercenHeight * 27)
            && gesture.moveX > dz.x 
            && gesture.moveX <= dz.x + dz.width
            // && gesture.moveY < 415
            // && gesture.moveX > 250
    }
    DropZone_3(gesture) {
        let dz = this.state.DropZoneValues_3;
        return gesture.moveY > (SmartScreenBase.ratio > 1.9 ? SmartScreenBase.smPercenHeight * 43 : SmartScreenBase.smPercenHeight * 40) + dz.height
            && gesture.moveY < dz.height * 2 + (SmartScreenBase.ratio > 1.9 ? SmartScreenBase.smPercenHeight * 46 : SmartScreenBase.smPercenHeight * 43)
            && gesture.moveX > dz.x + SmartScreenBase.smPercenWidth
            && gesture.moveX <= dz.x + dz.width + SmartScreenBase.smPercenWidth*2
            // && gesture.moveX < 125 && gesture.moveY > 470
    }
    DropZone_4(gesture) {
        let dz = this.state.DropZoneValues_4;
        return gesture.moveY > (SmartScreenBase.ratio > 1.9 ? SmartScreenBase.smPercenHeight * 43 : SmartScreenBase.smPercenHeight * 40) + dz.height
            && gesture.moveY < dz.height * 2 + (SmartScreenBase.ratio > 1.9 ? SmartScreenBase.smPercenHeight * 46 : SmartScreenBase.smPercenHeight * 43)
            && gesture.moveX > dz.x 
            && gesture.moveX <= dz.x + dz.width
            // && gesture.moveY > 470 && gesture.moveX > 250
    }

}
const styless = StyleSheet.create({
    Sty_Image: {
        width: SmartScreenBase.smPercenWidth * 40,
        height: SmartScreenBase.smPercenWidth * 40,
    },
    Answer: {
        backgroundColor: '#C6C6C2',
        width: SmartScreenBase.smPercenWidth * 45,
        alignItems: "center",
        justifyContent: "center",
        height: SmartScreenBase.smPercenHeight * 5,
        borderBottomLeftRadius: SmartScreenBase.smPercenWidth * 4 - 5,
        borderBottomRightRadius: SmartScreenBase.smPercenWidth * 4 - 5,
    },
    Sty_Answer: {
        borderRadius: SmartScreenBase.smPercenWidth * 3,
        minWidth: SmartScreenBase.smPercenWidth * 40,
        height: SmartScreenBase.smPercenWidth * 16.5,
        backgroundColor: "#E5B007",
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 2,
        borderColor: 'white',
        paddingHorizontal: 10
    },
    Sty_Text_Answer: {
        //fontSize: SmartScreenBase.smPercenHeight * 2.5,
        paddingRight: SmartScreenBase.smPercenWidth * 2,
        fontWeight: "700",
        fontSize: 16
    },
    Sty_Icon_Answe: {
        fontSize: SmartScreenBase.smPercenHeight * 3.5,
        color: 'blue', marginLeft: SmartScreenBase.smPercenWidth * 2
    }
});
function mapStateToProps(state) {
    return {

        Vocab: state.vocabularyReducers.vocabulary,
        dataLogin: state.AuthStackReducer.dataLogin,
    }
}
export default connect(mapStateToProps)(VocabularyScreen);
