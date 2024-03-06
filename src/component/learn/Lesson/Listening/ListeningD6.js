import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
    Alert,
    Platform,
    Dimensions,
    ActivityIndicator,
    ScrollView
} from 'react-native';
import FileSound from '../FileSound';
import FileSound4 from '../FileSound4';
const {width, height} = Dimensions.get('window');
import SmartScreenBase from '../../../../base/SmartScreenBase';
import TypeExercise from '../Component/TypeExercise';
import StyleLesson from '../StyleLesson';
import stylesApp from '../../../styleApp/stylesApp';
import axios from 'axios';
import EventBus from 'react-native-event-bus';
import API from '../../../../API/APIConstant';
import {connect} from 'react-redux';
import {ActionListeningD7} from '../../../../redux/actions/ActionListeningD7';
import ListeningD7Reducer from '../../../../redux/reducers/ListeningD7Reducer';
import SoundQestion from '../../../SoundQuestion';
import FontBase from '../../../../base/FontBase';
import ModalScript from '../../../modalScript'
import LessonBase from '../../../../base/LessonBase';

let a = [];
let DataObject1 = new Object();
let dataNew = [];
let dataquestion = [];
let dataanswer = [];
var Sound = require('react-native-sound');
Sound.setCategory('Playback');

class ListeningD6 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {
                question: [],
                answer: [],
            },
            ShowCheck: false,
            checkResuilt: null,
            refresh: false,
            checkPlay: false,
            NumberTrue: 0,
            playState: 'paused', //playing, paused
            playSeconds: 0,
            duration: 0,
            disableSelect: false,
            ArrChooseAnswer: [],
            ListAnswer: [],
            ListCheckPlayVoiceEeachQuestion: [],
            dataFirt: {},
            checkType: 'exam',
            showScript: false,
            number: 0,
            ArrayAns: [],
            showImage: false,
            dicription: false,
            showWeb: false,
            String: '',
            isloading: false,
            title_ENG: '',
            title_VI: '',
            titlePress: false,
            explain: [],
            arrayPost: [],
            logid: '',
            data_lesson: {},
            id:0,
            audio:'',
            countNumberPress:0
        };
        this.sliderEditing = false;
    }

    moveWedView = (str) => {
        this.setState({showWeb: true});
        this.setState({String: str});
    };
    _Onpress = () => {
        this.setState({titlePress: !this.state.titlePress});
    };
    closeWebView = () => {
        this.setState({showWeb: false});
    };

    _OnPressBack() {
        this.props.prevReviewResult();
    }

    componentWillMount() {
        this.setState({isloading: true});
        dataNew = [];
        dataquestion = [];
        dataanswer = [];
        let explain = [];
        this.setState({checkType: this.props.checkType});
        //this.setState({data: []});
        let response = {};
        response['data'] = this.props.dataContent;
        this.setState({data_lesson: response});
        // this._postDataFirt(response.data);
        this.setState({dataFirt: response.data});
        DataObject1 = new Object();
        try{
        for (let i = 0; i < response.data.data_question.length; i += 1) {
            console.log('ahihi',response.data.data_question[i]);
            for (
                let j = 0;
                j < response.data.data_question[i].list_option.length;
                j += 1
            ) {
                dataquestion.push(
                    response.data.data_question[i].list_option[j].match_option_text[0],
                );
                explain.push({
                   exp: response.data.data_question[i].list_option[j].option_explain,
                   key: response.data.data_question[i].list_option[j].match_option_text[0]});
                if (response.data.data_question[i].list_option[j].score !== '0') {
                    dataanswer.push(
                        response.data.data_question[i].list_option[j].match_option_text[0],
                    );
                }
                this.setState({
                    title_ENG:
                    response.data.data_question[i].list_option[j].group_content,
                });
                this.setState({audio: response.data.lesson.lesson_audio})
                this.setState({
                    title_VI:
                    response.data.data_question[i].list_option[j].group_content_vi,
                });
                this.setState({id: response.data.data_question[i].question_id})
            }
            //}
        }
    }catch(er){console.log("=====loi",er); Alert.alert("Bài tập này đang bị lỗi dữ liệu, vui lòng chọn bài khác")}
        this.setState({explain: explain});
        DataObject1.question = dataquestion;
        DataObject1.answer = dataanswer;
        if (this.props.checkType == 'afterTest') {
            let score = 0;
            this.setState({checkResuilt:true});

            let rerult = this._converAfterTest(DataObject1,DataObject1.answer);
            let myAns = this._converAfterTest(DataObject1,this.props.data_answer);
            console.log('this.props.data_answer',myAns);
            console.log('this.state.data.answer',rerult)
            for(let i = 0 ; i < myAns.length;i++ ){
                if(myAns[i] === rerult[i]){
                    score++
                }
            }
            if(score === myAns.length ){
                this.setState({showImage: true,} )
            }
            console.log('score',score)
        } else {
            //this.play(response.data.lesson.lesson_audio);
        }
        this.setState({data: DataObject1});
        let ArraythisArrChooseAnswer = [];
        let ArrayListCheckPlayVoiceEeachQuestion = [];
        for (let index = 0; index < DataObject1.question.length; index++) {
            this.state.ListCheckPlayVoiceEeachQuestion.push(false);
            ArrayListCheckPlayVoiceEeachQuestion.push(false);
            ArraythisArrChooseAnswer.push(false);
        }
        this.setState({
            ListCheckPlayVoiceEeachQuestion: ArrayListCheckPlayVoiceEeachQuestion,
        });
        this.setState({ArrChooseAnswer: ArraythisArrChooseAnswer});
        //console.log(this.state.ArrChooseAnswer);
        this.timeout = setInterval(() => {
            if (
                this.sound &&
                this.sound.isLoaded() &&
                this.state.playState == 'playing' &&
                !this.sliderEditing
            ) {
                this.sound.getCurrentTime((seconds, isPlaying) => {
                    this.setState({playSeconds: seconds});
                });
            }
        }, 100);
        this.setState({isloading: false});
    }
    _converAfterTest(data, array){
        let aarayAns = [...data.question];
        for( let j = 0 ; j< array.length; j++ ){
            let index = aarayAns.findIndex(num=> num === array[j]);
            if(index === -1){
            }else{
                aarayAns[index]=true
            }
        }
        for( let j = 0 ; j< aarayAns.length; j++ ){
            if( aarayAns[j] !== true){
                aarayAns[j]=false
            }
        }
        return aarayAns;
    }

    _coverToarray = (array) =>{
        let aarayAns = [...this.state.data.question];
        for( let j = 0 ; j< array.length; j++ ){
            let index = aarayAns.findIndex(num=> num === array[j]);
            if(index === -1){
            }else{
                aarayAns[index]=true
            }
        }
        for( let j = 0 ; j< aarayAns.length; j++ ){
            if( aarayAns[j] !== true){
                aarayAns[j]=false
            }
        }
        return aarayAns;
    }

    findExp = (str) =>{
        
        var result = ""

        this.state.explain.forEach(element => {
            if(element.key == str){
                result = element.exp
            }
        });
        return result;
    }

    _SubmitTeting = async () => {
        let check = 0;
        let ArrayListAnswer = [];
        let listId = new Array();
        for (
            let index = 0;
            index < this.state.ArrChooseAnswer.length;
            index++
        ) {
            if (this.state.ArrChooseAnswer[index] == true) {
                listId.push(index);
                ArrayListAnswer.push(this.state.data.question[index]);
            }
        }
        this.setState({ListAnswer: ArrayListAnswer});
        console.log('this.state.ListAnswer',ArrayListAnswer);


        let score=0;
        let arrr = [];
        let rerult = this._coverToarray(this.state.data.answer);
        let myAns = this._coverToarray(ArrayListAnswer);
        this.props.dispatch(ActionListeningD7(ArrayListAnswer));
        for(let i = 0 ; i < myAns.length;i++ ){
            if(myAns[i] === rerult[i]){
                score++
            }
        }
        let ob = new Object();
        ob.question_id = this.state.id;
        ob.exercise_type = 'listening';
        ob.question_type = '4';
        ob.question_score = 0;
        ob.final_user_choice = ArrayListAnswer.join().toString();
        let a = [];
        for (let j = 0; j < 2; j++) {
            let obj = new Object();
            obj.num_turn = j;
            obj.user_choice = "this.state.arPost[j].join().toString()";
            obj.score = score / this.state.data.question.length
            a.push(obj);
        }
        ob.detail_user_turn = a;
        arrr.push(ob);
        console.log(arrr);
        this.props.setDataAnswer(arrr)
    };
    _Submit = async () => {
        console.log(this.state.ListAnswer);
        let score=0;
        let arrr = [];
        let rerult = this._coverToarray(this.state.data.answer);
        console.log(this.state.data.answer)
        let myAns = this._coverToarray(this.state.ListAnswer);
        for(let i = 0 ; i < myAns.length;i++ ){
            if(myAns[i] === rerult[i] && myAns[i] === true){
                score++
            }
        }
        console.log(score)
        let ob = new Object();
        ob.question_id = this.state.id;
        ob.exercise_type = 'listening';
        ob.question_type = '4';
        ob.question_score = 0;
        ob.final_user_choice = this.state.ListAnswer.join().toString();
        let a = [];
        for (let j = 0; j < this.state.arrayPost.length; j++) {
            let obj = new Object();
            obj.num_turn = j;
            obj.user_choice = "this.state.arPost[j].join().toString()";
            obj.score = score / this.state.data.answer.length
            a.push(obj);
        }
        ob.detail_user_turn = a;
        arrr.push(ob);
        this.props.saveLogLearning(arrr);
        
    };

    componentDidMount() {
        this.props.saveLogLearning([]);
    }

    _OnShowScript() {
        this.setState({showScript: !this.state.showScript});
    }

    componentWillUnmount() {
        if (this.sound) {
            this.sound.release();
            this.sound = null;
        }
        if (this.timeout) {
            clearInterval(this.timeout);
        }
    }

    _OnpressChooseAnswer(index) {
        if(this.state.ArrChooseAnswer[index] === false){
            let myAns = 0 ;
            console.log(myAns)
            for(let i = 0 ; i < this.state.ArrChooseAnswer.length ; i++ ){
                if(this.state.ArrChooseAnswer[i] === true){
                    myAns ++;
                }
            }
            if(myAns < this.state.data.answer.length){
                this.state.ArrChooseAnswer[index] = !this.state.ArrChooseAnswer[index];
                //console.log(this.state.ArrChooseAnswer);
                if (this.state.ArrChooseAnswer.indexOf(true) == -1) {
                    this.setState({ShowCheck: false});
                } else {
                    this.setState({ShowCheck: true});
                }
                this.setState({refresh: !this.state.refresh});
            }else{
                Alert.alert("Thông báo","Bạn đã chọn đủ "+this.state.data.answer.length+" đáp án", [
                    { text: 'Đồng ý', style: 'cancel' }
                ]);
            }
        }
        else{
            this.state.ArrChooseAnswer[index] = !this.state.ArrChooseAnswer[index];
            //console.log(this.state.ArrChooseAnswer);
            if (this.state.ArrChooseAnswer.indexOf(true) == -1) {
                this.setState({ShowCheck: false});
            } else {
                this.setState({ShowCheck: true});
            }
            this.setState({refresh: !this.state.refresh});
        }
    }

    NumberCheck = 0;
    _OnPressCheckResuilt() {
        //console.log(this.state.ArrChooseAnswer);
        if (this.state.checkType === 'afterTest') {
            this.props.nextReviewResult();
        } else if (this.state.checkType === 'Testing') {
            this._SubmitTeting();
        } else if (this.state.checkType === 'exam') {
            let ArrayListAnswer = [];
            if (this.state.checkResuilt == null) {
                this.props.hideTypeExercise();
                let check = 0;
                let listId = new Array();
                for (
                    let index = 0;
                    index < this.state.ArrChooseAnswer.length;
                    index++
                ) {
                    if (this.state.ArrChooseAnswer[index] == true) {
                        listId.push(index);
                        ArrayListAnswer.push(this.state.data.question[index]);
                    }
                }
                this.setState({ListAnswer: ArrayListAnswer});
                //console.log(ArrayListAnswer);
                let ob = new Object();
                ob.ans = ArrayListAnswer;
                a.push(ob);
                this.setState({arrayPost: a});
                for (let index = 0; index < listId.length; index++) {
                    if (
                        this.state.data.answer.indexOf(
                            this.state.data.question[listId[index]],
                        ) != -1
                    ) {
                        check += 1;
                    }
                }
                if (
                    check == this.state.data.answer.length &&
                    listId.length == this.state.data.answer.length
                ) {
                    this.props.showFeedback();
                    this.setState({
                        checkResuilt: true,
                        showImage: true,
                    });
                } else {
                    this.NumberCheck += 1;
                    this.setState({
                        checkResuilt: false,
                        disableSelect: true,
                        showImage: false,
                    });
                }
                if (this.NumberCheck >= 2) {
                    this.props.showFeedback();
                }
                this.setState({number: this.NumberCheck});
            } else if (this.state.checkResuilt == false) {
                if (this.NumberCheck < 2) {
                    this.props.showTypeExercise();
                    for (
                        let index = 0;
                        index < this.state.ArrChooseAnswer.length;
                        index++
                    ) {
                        this.state.ArrChooseAnswer[index] = false;
                    }
                    this.setState({
                        ShowCheck: false,
                        checkResuilt: null,
                        checkPlay: false,
                        disableSelect: false,
                    });
                } else {
                    this.props.hideTypeExercise();
                    this._Submit();
                }
                this.setState({number: this.NumberCheck});
            } else {
                this.props.hideTypeExercise();
                this._Submit();
            }
        }
    }

    _onPressDicription = () => {
        this.setState({dicription: !this.state.dicription});
    };

    render() {
        return (
            <View
                style={{
                    height: this.state.checkResuilt == null ? SmartScreenBase.smPercenHeight * 72 : SmartScreenBase.smPercenHeight * 90,
                    alignItems: 'center',
                    alignSelf: 'center',
                }}>
                {/* {this.state.showScript === true ? (
                    <View
                        style={{
                            width: SmartScreenBase.smBaseWidth * 1080,
                            height: SmartScreenBase.smBaseHeight * 1080,
                            backgroundColor: '#00000030',
                            position: 'absolute',
                            zIndex: 1000,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <View
                            style={{
                                width: SmartScreenBase.smBaseWidth * 970,
                                height: SmartScreenBase.smBaseHeight * 600,
                                backgroundColor: '#FFF',
                                alignItems: 'center',
                                borderRadius: 20,
                            }}>
                            <TouchableOpacity
                                onPress={() => {
                                    this._OnShowScript();
                                }}>
                                <Text
                                    style={[
                                        stylesApp.Sty_Text_Button,
                                        {color: '#000', marginLeft: '85%'},
                                    ]}>
                                    X
                                </Text>
                            </TouchableOpacity>
                            <View style={{width: '100%', height: '80%'}}>
                                <Text style={{marginTop: 20, marginLeft: 20}}>
                                    {this.state.dataFirt.lesson.lesson_text_audio}
                                </Text>
                            </View>
                            <View
                                style={{
                                    width: '100%',
                                    height: '20%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            />
                        </View>
                    </View>
                ) : null} */}
                {this.state.isloading === true ? (
                    <View
                        style={{
                            width: '100%',
                            height: '100%',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            position: 'absolute',
                            zIndex: 1500,
                            //justifyContent: "space-around",
                            padding: 10,
                            backgroundColor: '#FFFFFF60',
                        }}>
                        <ActivityIndicator size="large" color="#0000ff"/>
                    </View>
                ) : null}
                <View>
                    {this.state.checkResuilt == null ||
                    (this.state.checkResuilt == false && this.NumberCheck < 2)
                        ? this._ShowQuestion()
                        : this._ShowResuilt()}
                </View>
                <View
                    style={{
                        width,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'absolute',
                        bottom: height / 20,
                    }}>
                    {this.state.checkType === 'afterTest' ? (
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity
                                onPress={() => {
                                    this._OnPressBack();
                                }}
                                style={[
                                    stylesApp.Sty_Button,
                                    {
                                        width: SmartScreenBase.smPercenWidth * 10,
                                        marginRight: SmartScreenBase.smPercenWidth * 5,
                                    },
                                ]}>
                                <Text style={stylesApp.Sty_Text_Button}>BACK</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    this._onPressDicription();
                                }}
                                style={[
                                    stylesApp.Sty_Button,
                                    {
                                        width: SmartScreenBase.smPercenWidth * 60,
                                        marginRight: SmartScreenBase.smPercenWidth * 5,
                                    },
                                ]}>
                                <Text style={stylesApp.Sty_Text_Button}>GIẢI THÍCH</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    this._OnPressCheckResuilt();
                                }}
                                style={[
                                    stylesApp.Sty_Button,
                                    {width: SmartScreenBase.smPercenWidth * 10},
                                ]}>
                                <Text style={stylesApp.Sty_Text_Button}>TIẾP TỤC</Text>
                            </TouchableOpacity>
                        </View>
                    ) :  <View>
                        {/*this.state.ShowCheck == true ? (*/}

                        {/*) : null*/}
                        {this.state.checkType === 'Testing' ? (
                            <View style={{flexDirection: 'row'}}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this._OnPressCheckResuilt();
                                    }}
                                    style={[
                                        stylesApp.Sty_Button,
                                        {
                                            width:
                                                SmartScreenBase.smPercenWidth * 90,
                                        },
                                    ]}>
                                    <Text style={stylesApp.Sty_Text_Button}>TIẾP TỤC</Text>
                                </TouchableOpacity>
                            </View>
                        ) : this.state.checkResuilt == null ? (
                            this.state.ShowCheck == true?
                            <TouchableOpacity
                                disabled={false}
                                onPress={() => {
                                    this._OnPressCheckResuilt();
                                }}
                                style={stylesApp.Sty_Button}>
                                <Text style={stylesApp.Sty_Text_Button}>KIỂM TRA</Text>
                            </TouchableOpacity>
                                :
                                <TouchableOpacity
                                    disabled={true}
                                    onPress={() => {
                                        this._OnPressCheckResuilt();
                                    }}
                                    style={stylesApp.Sty_Button_disable}>
                                    <Text style={stylesApp.Sty_Text_Button}>KIỂM TRA</Text>
                                </TouchableOpacity>
                        ) : this.state.checkResuilt == false && this.state.number < 2 ? (
                            <TouchableOpacity
                                onPress={() => {
                                    this._OnPressCheckResuilt();
                                }}
                                style={[
                                    stylesApp.Sty_Button,
                                ]}>
                                <Text style={stylesApp.Sty_Text_Button}>LÀM LẠI</Text>
                            </TouchableOpacity>
                        ) : (
                            <View style={{flexDirection: 'row'}}>
                                {this.state.checkResuilt == null ? null : this.state.checkResuilt == false && this.state.number < 2 ? null : (
                                    <TouchableOpacity
                                        onPress={() => {
                                            this._OnShowScript();
                                        }}
                                        style={[
                                            stylesApp.Sty_Button,
                                            {
                                                width: SmartScreenBase.smPercenWidth * 40,
                                                marginRight:
                                                    this.state.checkResuilt == null
                                                        ? 0
                                                        : this.state.checkResuilt == false &&
                                                        this.state.number < 2
                                                        ? 0
                                                        : SmartScreenBase.smPercenWidth * 5,
                                            },
                                        ]}>
                                        <Text style={stylesApp.Sty_Text_Button}>SCRIPT</Text>
                                    </TouchableOpacity>
                                )}
                                <TouchableOpacity
                                    onPress={() => {
                                        this._OnPressCheckResuilt();
                                    }}
                                    style={[
                                        stylesApp.Sty_Button,
                                        {
                                            width:
                                                this.state.checkResuilt == null
                                                    ? SmartScreenBase.smPercenWidth * 90
                                                    : this.state.checkResuilt == false &&
                                                    this.state.number < 2
                                                    ? SmartScreenBase.smPercenWidth * 90
                                                    : SmartScreenBase.smPercenWidth * 40,
                                        },
                                    ]}>
                                    <Text style={stylesApp.Sty_Text_Button}>TIẾP TỤC</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View> }
                </View>
                <ModalScript
                    audio={this.state.audio}
                    title={this.state.dataFirt.lesson.lesson_text_audio}
                    visible={this.state.showScript}
                    close={()=>this._OnShowScript()}
                />   
            </View>
        );
    }

    _ShowQuestion() {
        return (
            <View>
                {this.state.checkResuilt === null ? (
                    <View style={{width: '100%'}}>
                        <SoundQestion Audio={this.state.audio}/>
                    </View>
                ) : (
                    <View style={{marginTop:this.state.checkResuilt != null && '20%', height: SmartScreenBase.smPercenWidth*20}} >
                        <View
                            style={{
                                width: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Text
                                style={{
                                    marginVertical: SmartScreenBase.smPercenWidth,
                                    fontWeight: '600',
                                    color: '#fff',
                                    fontSize: 18,
                                    fontFamily: 'iCielSoupofJustice',
                                    margin: SmartScreenBase.smPercenHeight * 2,
                                }}>
                                BẠN ĐÃ TRẢ LỜI{' '}
                                {this.state.checkResuilt == true ? 'ĐÚNG' : 'CHƯA CHÍNH XÁC'}{' '}
                            </Text>
                            <FileSound4 showImage={this.state.showImage == true ?'true': 'false'}/>
                        </View>
                    </View>
                )}
                <ScrollView style={{width: '100%', maxHeight: SmartScreenBase.smPercenHeight*48}}>
                    {this.state.data.question.map((item, key) => {
                        let arr = item.split(' ');
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    this._OnpressChooseAnswer(key);
                                }}
                                disabled={this.state.disableSelect}
                                style={[
                                    StyleLesson.Sty_View_Border,
                                    {
                                        marginTop: SmartScreenBase.smPercenHeight * 2,
                                        flexDirection: 'row',
                                        justifyContent: 'space-between',
                                        backgroundColor:
                                            this.state.checkResuilt !== null &&
                                            this.state.data.answer.indexOf(
                                                this.state.data.question[key],
                                            ) == -1 &&
                                            this.state.ArrChooseAnswer[key] == true
                                                ? 'rgba(255,255,255,0.95)'
                                                : 'rgba(255,255,255,0.95)',
                                    },
                                ]}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                        zIndex: 0,
                                        width: '80%',
                                        borderRadius: SmartScreenBase.smPercenWidth * 3,
                                        // padding: SmartScreenBase.smPercenHeight,
                                        alignSelf: 'center',
                                    }}>
                                    {arr.map((e, index, key) => {
                                        return (
                                            <View style={{}}>
                                                <TouchableOpacity
                                                    onLongPress={() => LessonBase.goTranslate(e)}
                                                    style={[stylesApp.txt, {zIndex: 0}]}>
                                                    <Text>{e} </Text>
                                                </TouchableOpacity>
                                            </View>
                                        );
                                    })}
                                </View>
                                <View
                                    style={{
                                        width: SmartScreenBase.smPercenWidth * 7,
                                        height: SmartScreenBase.smPercenWidth * 7,
                                        borderRadius: SmartScreenBase.smPercenWidth * 3.5,
                                        borderWidth: (SmartScreenBase.smPercenWidth * 2) / 3,
                                        borderColor: 'rgba(198,229,14,0.95)',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                    {this.state.ArrChooseAnswer[key] == true && (
                                        <View
                                            style={{
                                                width: SmartScreenBase.smPercenWidth * 4,
                                                height: SmartScreenBase.smPercenWidth * 4,
                                                borderRadius: SmartScreenBase.smPercenWidth * 2,
                                                backgroundColor: '#F9E815',
                                            }}
                                        />
                                    )}
                                </View>
                            </TouchableOpacity>
                        );
                    })}
                </ScrollView>
            </View>
        );
    }

    _ShowResuilt() {
        return (
            <View>
                <View style={{alignItems: 'center', alignSelf: 'center'}}>
                    <View style={{
                        height: SmartScreenBase.smBaseWidth * 400,
                        width:"100%",
                        justifyContent:'center',
                        alignItems:'center',
                    }}>
                        <FileSound showImage={this.state.showImage == true ?'true': 'false'}/>
                    </View>
                    <Text
                        style={{
                            marginVertical: SmartScreenBase.smPercenWidth,
                            color: 'white',
                            fontWeight: '600',
                            fontSize: SmartScreenBase.smPercenWidth * 5,
                            fontFamily: 'iCielSoupofJustice',
                        }}>
                        BẠN ĐÃ TRẢ LỜI {this.state.showImage == true ? 'ĐÚNG' : 'SAI'}{' '}
                    </Text>
                    <View
                        style={{
                            width: SmartScreenBase.smPercenWidth * 100,
                            alignItems: 'center',
                        }}>
                        {/* <View style={{position: 'absolute', top: 0}}>
                            <Image
                                source={{uri: 'student_home_image13'}}
                                style={[
                                    StyleLesson.Sty_ImageList,
                                    {transform: [{rotate: '180deg'}]},
                                ]}
                            />
                        </View> */}
                        <View style={{height: SmartScreenBase.smPercenHeight * 50}}>
                            {this.state.checkResuilt == false && this.NumberCheck === 2 && (
                                <Text
                                    style={{
                                        color: '#ffffff',
                                        fontFamily: "iCielSoupofJustice",
                                        fontSize: SmartScreenBase.smPercenWidth * 5,
                                        // textAlign: 'center',
                                        marginTop: SmartScreenBase.smPercenWidth * 4,
                                    }}>
                                    ĐÁP ÁN ĐÚNG LÀ :
                                </Text>
                            )}
                            <FlatList
                                data={this.state.data.answer}
                                extraData={this.state.refresh}
                                keyExtractor={(item, index) => 'item' + index}
                                renderItem={this.RenderItemResuilt.bind(this)}
                                contentContainerStyle={{alignItems: 'center'}}
                            />
                        </View>
                    </View>
                </View>
            </View>
        );
    }

    RenderItemResuilt = ({item, index}) => {
        return (
            <View
                style={[
                    StyleLesson.Sty_View_Border,
                    {
                        alignItems: 'flex-start',
                        marginTop:
                            this.state.checkResuilt && this.NumberCheck < 2
                                ? SmartScreenBase.smBaseWidth * 120
                                : SmartScreenBase.smBaseWidth * 60,
                        borderWidth: SmartScreenBase.smPercenWidth / 2,
                        borderColor:
                            this.state.ListAnswer.indexOf(item) !== -1
                                ? 'rgba(198,229,14,0.95)'
                                : 'rgba(198,229,14,0.95)',
                    },
                ]}>

                {
                    this.state.checkType ==='afterTest'? null :
                    this.state.checkResuilt == true && this.NumberCheck < 2 && (
                    <View
                        style={{
                            position: 'absolute',
                            top: -SmartScreenBase.smBaseWidth * 56,
                            alignSelf: 'center',
                        }}>
                        <Image
                            source={{
                                uri:
                                    this.state.ListAnswer.indexOf(item) !== -1
                                        ? 'grammar1_4'
                                        : 'grammar1_3',
                            }}
                            style={StyleLesson.Sty_Image_Small_Answer}
                        />
                    </View>
                        // :null
                )}
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Text
                        style={[
                            stylesApp.txt_Title,
                            {
                                marginTop: SmartScreenBase.smPercenHeight * 2,
                                marginRight: SmartScreenBase.smPercenWidth,
                            },
                        ]}>
                        {index + 1}.{' '}
                        <Text
                            style={{
                                color:
                                    this.state.ListAnswer.indexOf(item) !== -1
                                        ? 'rgba(198,229,14,0.95)'
                                        : 'rgba(198,229,14,0.95)',
                            }}>
                            {item}{' '}
                        </Text>
                    </Text>
                    {item.toLowerCase() != this.state.data.answer[index].toLowerCase() ? (
                        <View
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginLeft: SmartScreenBase.smPercenWidth * 2,
                            }}>
                            <Image
                                source={{uri: 'lesson_grammar_image3'}}
                                style={StyleLesson.Image_Explain}
                            />
                            <Text
                                style={[
                                    stylesApp.txt,
                                    {
                                        fontWeight: 'bold',
                                        color: 'red',
                                        marginLeft: SmartScreenBase.smPercenWidth * 2,
                                        textTransform: 'uppercase',
                                    },
                                ]}>
                                {this.state.data.answer[index].toString()}
                            </Text>
                        </View>
                    ) : null}
                </View>
                {this.state.checkType === 'afterTest' ? (
                        <View
                            style={{
                                marginTop: SmartScreenBase.smPercenHeight,
                                marginBottom: SmartScreenBase.smPercenHeight,
                            }}>
                            <Text style={stylesApp.txt}>
                                <Text
                                    style={{
                                        fontWeight: 'bold',
                                        fontSize: SmartScreenBase.smPercenWidth * 4,
                                    }}>
                                    GIẢI THÍCH:
                                </Text>
                            </Text>
                            <Text >{this.state.explain[index]}</Text>
                        </View>
                ) : (
                    <View
                        style={{
                            marginTop: SmartScreenBase.smPercenHeight,
                            marginBottom: SmartScreenBase.smPercenHeight,
                        }}>
                        <Text
                            style={{
                                fontWeight: 'bold',
                                fontSize: SmartScreenBase.smPercenWidth * 4,
                                marginLeft: 10,
                            }}>
                            GIẢI THÍCH :
                        </Text>
                        <Text style={{marginLeft: 30, fontFamily: FontBase.MyriadPro_Regular,fontSize: SmartScreenBase.smFontSize*45}}>
                            {this.findExp(item)}
                        </Text>
                    </View>
                )}          
            </View>
        );
    };
}

function mapStateToProps(state) {
    return {
        data_answer: state.ListeningD7Reducer.data_answer,
        data_login: state.AuthStackReducer.dataLogin,
    };
}

export default connect(mapStateToProps)(ListeningD6);
