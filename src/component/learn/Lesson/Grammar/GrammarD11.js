import React, {Component} from 'react';
import {Alert, Dimensions, FlatList, Image, Text, TextInput, TouchableOpacity, View} from 'react-native';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import TypeExercise from '../Component/TypeExercise';
import StyleLesson from '../StyleLesson';
import stylesApp from '../../../styleApp/stylesApp';
import EventBus from 'react-native-event-bus';
import axios from 'axios';
import FileSound from '../FileSound';
import API from '../../../../API/APIConstant';
import {connect} from 'react-redux';
import FileSound4 from '../FileSound4';
import {ActionGrammarD11} from '../../../../redux/actions/ActionGrammarD11';
import Utils from '../../../../utils/stringUtils';
import font from '../../../../base/FontBase';
import LogBase from '../../../../base/LogBase';
import LessonBase from '../../../../base/LessonBase';
import FontBase from '../../../../base/FontBase';
import { Platform } from 'react-native';

const {width, height} = Dimensions.get('window');
var Sound = require('react-native-sound');
Sound.setCategory('Playback');
let DataObject1 = new Object();
let DataObject2 = new Object();
let whoosh = [1, 3, 0, 1];
let ans = [];
let dataNew = [];
let a = [];

const AdjustLabel = ({
    fontSize, text, style, numberOfLines
  }) => {
    const [currentFont, setCurrentFont] = React.useState(fontSize);
  
    return (
      <Text
        numberOfLines={ numberOfLines }
        adjustsFontSizeToFit
        style={ [style, { fontSize: currentFont }] }
        onTextLayout={ (e) => {
          const { lines } = e.nativeEvent;
          if (lines.length > numberOfLines) {
            setCurrentFont(currentFont - 1);
          }
        } }
      >
        { text }
      </Text>
    );
  };

class GrammarD11 extends Component {
    option = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

    constructor(props) {
        super(props);
        this.state = {
            checkType: '',
            data: [],
            checkPlay: false,
            refresh: false,
            ShowCheck: false,
            checkResuilt: null,
            NumberTrue: 0,
            Replay: false,
            timecurent: 0,
            timeduration: 0,
            playState: 'paused', //playing, paused
            playSeconds: 0,
            duration: 0,
            dataFirt: {},
            showScript: false,
            showImage: false,
            dicription: false,
            showWeb: false,
            String: '',
            arrayPost: [],
            title_ENG: '',
            title_VI: '',
            titlePress: false,
            logid: '',
            data_lesson: {},
        };
        this.ArrAnswer = [];
        this.CheckResound = [];
        this.sliderEditing = false;
    }

    _SubmitTeting = async () => {
        this.props.dispatch(ActionGrammarD11(this.ArrAnswer));
        let arrr = [];
        for (let i = 0; i < this.ArrAnswer.length; i++) {
            let ob = new Object();

            ob.question_id = parseInt(this.state.data_lesson.data.data_question[i].question_id),
                ob.exercise_type = 'grammar' ,
                ob.question_type = parseInt(this.state.data_lesson.data.data_question[i].list_option[0].question_type);
            ob.final_user_choice = this.state.data[i].option[this.ArrAnswer[i]];
            let a = [];
            for (let j = 0; j < this.state.arrayPost.length; j++) {
                let obj = new Object();
                obj.num_turn = j;
                obj.score = this.state.data[i].option[this.state.arrayPost[j].ans[i]] === this.state.data[i].answer ? 1 : 0;
                obj.user_choice = this.state.data[i].option[this.state.arrayPost[j].ans[i]];
                a.push(obj);
            }
            ob.detail_user_turn = a;
            arrr.push(ob);
        }
        if (this.state.checkType === 'Testing') {
            this.props.setDataAnswer(arrr);
        }
    };

    _Submit = async () => {
        let arrr = [];
        for (let i = 0; i < this.ArrAnswer.length; i++) {
            let ob = new Object();

            ob.question_id = parseInt(this.state.data_lesson.data.data_question[i].question_id),
                ob.exercise_type = 'grammar' ,
                ob.question_type = parseInt(this.state.data_lesson.data.data_question[i].list_option[0].question_type);
            ob.final_user_choice = this.state.data[i].option[this.ArrAnswer[i]];
            let a = [];
            for (let j = 0; j < this.state.arrayPost.length; j++) {
                let obj = new Object();
                obj.num_turn = j;
                obj.score = Utils.validWord(this.state.data[i].option[this.state.arrayPost[j].ans[i]]) === Utils.validWord(this.state.data[i].answer) ? 1 : 0;
                obj.user_choice = this.state.data[i].option[this.state.arrayPost[j].ans[i]];
                a.push(obj);
            }
            ob.detail_user_turn = a;
            arrr.push(ob);
        }
        this.props.saveLogLearning(arrr);
    };
    trimArrAns = str => {
        let index = 0;
        let ques = '';
        let arrayOption = [];
        while ((index = str.indexOf('[')) !== -1) {
            let arr = str.split('[');
            for (let i = 1; i < arr.length; i++) {
                ques = ques + ' __ ' + arr[i].split(']')[1];
                let text = arr[i].split(']')[0];
                arrayOption.push(text);
                str = arr[0] + ques;
            }
        }
        return arrayOption;
    };
    trimQuestion = str => {
        LogBase.log("=====trươc",str)
        let index = 0;
        let ques = '';
        let arrayOption = [];
        while ((index = str.indexOf('[')) !== -1) {
            let arr = str.split('[');
            for (let i = 1; i < arr.length; i++) {
                ques = ques + '__ ' + arr[i].split(']')[1];
                let text = arr[i].split(']')[0];
                arrayOption.push(text);
                str = arr[0] + ques;
            }
        }
        LogBase.log("=====sau",str)
        return str;
    };

    componentDidMount() {
        for (let index = 0; index < this.state.data.length; index++) {
            //this.ArrAnswer.push(-1);
            this.CheckResound.push(false);
        }
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
        this.props.saveLogLearning([]);
    }

    _onPressDicription = () => {
        this.setState({dicription: !this.state.dicription});
    };

    componentWillMount(){
        dataNew = [];
        a = [];
        this.setState({checkType: this.props.checkType});
        let response = {};
        response['data'] = this.props.dataContent;
        
        this.setState({data_lesson: response});
        
        // console.log(response);
        this.setState({dataFirt: response.data});
        for (let i = 0; i < response.data.data_question.length; i += 1) {
            DataObject1 = new Object();
            DataObject1.question_id = response.data.data_question[i].question_id;
            for (
                let j = 0;
                j < response.data.data_question[i].list_option.length;
                j += 1
            ) {
                this.setState({
                    title_ENG:
                    response.data.data_question[i].list_option[j].group_content,
                });
                this.setState({
                    title_VI:
                    response.data.data_question[i].list_option[j].group_content_vi,
                });
                let Quesiton = this.trimQuestion(
                    response.data.data_question[i].list_option[j].question_content,
                );
                let AnsArr = this.trimArrAns(
                    response.data.data_question[i].list_option[j].question_content,
                );
                DataObject2 = new Object();
                if (response.data.data_question[i].list_option[j].score == '1') {
                    DataObject1.answer =
                        response.data.data_question[i].list_option[j].match_option_text[0];
                }
                DataObject1.question = Quesiton;
                DataObject1.option = AnsArr;
                DataObject1.explain = response.data.data_question[i].list_option[j].explain_parse.content_question_text;
            }

            dataNew.push(DataObject1);
        }
        this.setState({data: dataNew});
        if (this.props.checkType === 'afterTest') {
            this.ArrAnswer = this.props.data_answer;
            let check = 0;
            for (let index = 0; index < dataNew.length; index++) {
                if (
                    dataNew[index].option[this.ArrAnswer[index]] ==
                    dataNew[index].answer
                ) {
                    check += 1;
                }
            }
            if (check == dataNew.length) {
                this.setState({showImage: true});
            }
            this.setState({NumberTrue: check});
            this.setState({checkResuilt: true});
        }
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

    _ChooseAnswer(index, id) {
        this.ArrAnswer[index] = id;
        this.setState({
            ShowCheck: this.ArrAnswer.filter(c=>c != null).length == this.state.data.length
        })
        this.setState({refresh: !this.state.refresh});
    }

    checkNumber = 0;

    _CheckResuilt() {
        //console.log('this.state.checkType',this.state.checkType);
        if (this.state.checkType === 'Testing') {
            this._SubmitTeting();
            // if (this.state.checkResuilt == null) {
            //     let check = 0;
            //     for (let index = 0; index < this.state.data.length; index++) {
            //         if (
            //             this.state.data[index].option[this.ArrAnswer[index]] ==
            //             this.state.data[index].answer
            //         ) {
            //             check += 1;
            //         }
            //     }
            //     //this.setState({NumberTrue: check});
            //     if (check == this.state.data.length) {
            //         //this.props.showFeedback();
            //         this.setState({checkResuilt: true});
            //         this.setState({showImage: true});
            //     } else {
            //         this.props.nextReviewResult();
            //     }
            // } else {
            //     this.props.nextReviewResult();
            // }
        } else if (this.state.checkType === 'afterTest') {
            if (this.state.checkResuilt == null) {
                let check = 0;
                for (let index = 0; index < this.state.data.length; index++) {
                    if (
                        Utils.validWord(this.state.data[index].option[this.ArrAnswer[index]])
                         ==
                         Utils.validWord(this.state.data[index].answer)
                    ) {
                        check += 1;
                    }
                }
                this.setState({NumberTrue: check});
                if (check == this.state.data.length) {
                    this.setState({checkResuilt: true});
                    this.setState({showImage: true});
                } else {
                    this.checkNumber += 1;
                    this.setState({checkResuilt: true});
                }
            } else if (this.state.checkResuilt == true) {
                this.props.nextReviewResult();
            }
        } else {
            if (this.state.checkResuilt == null) {
                this.props.hideTypeExercise();
                let check = 0;
                this.state.data.forEach((e,i)=>{
                    if(this.ArrAnswer[i] != null && Utils.validWord(e.answer) === Utils.validWord(e.option[this.ArrAnswer[i]])){
                        check += 1;
                        e.status = true;
                    }
                })
                this.state.NumberTrue = check;
                if (check == this.state.data.length) {
                    this.props.showFeedback();
                    this.setState({checkResuilt: true});
                    this.setState({showImage: true});
                } else {
                    this.checkNumber += 1;
                    this.setState({checkResuilt: false});
                }
                let ob = new Object();
                ob.ans = this.ArrAnswer;
                a.push(ob);
                if (this.checkNumber >= 2) {
                    this.props.showFeedback();
                }
                this.setState({arrayPost: a});
            } else if (this.state.checkResuilt == false) {
                if (this.checkNumber < 2) {
                    this.props.showTypeExercise();
                    this.setState({checkResuilt: null});
                    this.setState({ShowCheck: false});
                    this.state.data.forEach((e,i)=>{
                        if(!e.status){
                            this.ArrAnswer[i] = null;
                        }
                    })
                } else {
                    this.props.hideTypeExercise();
                    this._Submit();
                }
            } else {
                this.props.hideTypeExercise();
                this._Submit();
            }
        }
        this.setState({
            refresh: !this.state.refresh,
        });
    }

    _OnShowScript() {
        this.setState({showScript: !this.state.showScript});
    }

    _Onpress = () => {
        this.setState({titlePress: !this.state.titlePress});
    };

    render() {
        return (
            <View
                style={{
                    // listA: SmartScreenBase.smPercenHeight * 87,
                    alignSelf: 'center',
                    width: '100%',
                    height: '100%',
                }}>
                {this.state.checkResuilt == null ? (
                    <View style={{width: '100%'}}>
                        <View
                            style={{
                                alignSelf: 'center',
                                height: SmartScreenBase.smPercenHeight * 55,
                                ...StyleLesson.question_content,
                            }}>
                            <FlatList
                                data={this.state.data}
                                extraData={this.state.refresh}
                                keyExtractor={(item, index) => 'item' + index}
                                renderItem={this.RenderItem.bind(this)}
                                showsVerticalScrollIndicator={false}
                            />
                        </View>
                    </View>
                ) : (
                    this._ShowResuilt()
                )}
                {this.state.showScript === true ? (
                    <View
                        style={{
                            width: SmartScreenBase.smBaseWidth * 1080,
                            height: SmartScreenBase.smBaseHeight * 1080,
                            backgroundColor: '#00000030',
                            position: 'absolute',
                            zIndex: 100,
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
                                }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this._OnShowScript();
                                    }}
                                    style={[
                                        stylesApp.Sty_Button,
                                        {
                                            width: SmartScreenBase.smPercenWidth * 40,
                                            marginRight: SmartScreenBase.smPercenWidth * 5,
                                        },
                                    ]}>
                                    <Text style={stylesApp.Sty_Text_Button}>Đóng</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ) : null}
                <View
                    style={{
                        alignItems: 'center',
                        height: '10%',
                        justifyContent: 'center',
                        // marginBottom: '10%',
                    }}>
                    {this.state.checkType === 'afterTest' ? (
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity
                                onPress={() => {
                                    this._CheckResuilt();
                                }}
                                style={[
                                    stylesApp.Sty_Button,
                                    {
                                        width: SmartScreenBase.smPercenWidth * 10,
                                        marginRight: SmartScreenBase.smPercenWidth * 5,
                                    },
                                ]}>
                                <Text style={stylesApp.Sty_Text_Button}>Back</Text>
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
                                <Text style={stylesApp.Sty_Text_Button}>Giải thích</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    this._CheckResuilt();
                                }}
                                style={[
                                    stylesApp.Sty_Button,
                                    {width: SmartScreenBase.smPercenWidth * 10},
                                ]}>
                                <Text style={stylesApp.Sty_Text_Button}>TIẾP TỤC</Text>
                            </TouchableOpacity>
                        </View>
                    ) : <View style={{alignItems: 'center', justifyContent: 'center'}}>
                        {this.state.checkType === 'Testing' ? (
                            this.state.ShowCheck == true ?
                                <TouchableOpacity
                                    onPress={() => {
                                        this._CheckResuilt();
                                    }}
                                    style={[
                                        stylesApp.Sty_Button,
                                    ]}>
                                    <Text style={stylesApp.Sty_Text_Button}>TIẾP TỤC</Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity
                                    style={[
                                        stylesApp.Sty_Button_disable,
                                    ]}>
                                    <Text style={stylesApp.Sty_Text_Button}>TIẾP TỤC</Text>
                                </TouchableOpacity>
                        ) : this.state.checkResuilt == null ? (
                            this.state.ShowCheck == true ?
                                <TouchableOpacity
                                    onPress={() => {
                                        this._CheckResuilt();
                                    }}
                                    style={stylesApp.Sty_Button}>
                                    <Text style={stylesApp.Sty_Text_Button}>KIỂM TRA</Text>
                                </TouchableOpacity>
                                :
                                <TouchableOpacity
                                    style={
                                        stylesApp.Sty_Button_disable
                                    }>
                                    <Text style={stylesApp.Sty_Text_Button}>KIỂM TRA</Text>
                                </TouchableOpacity>
                        ) : this.state.checkResuilt == false && this.checkNumber < 2 ? (
                            <TouchableOpacity
                                onPress={() => {
                                    this._CheckResuilt();
                                }}
                                style={[
                                    stylesApp.Sty_Button,
                                ]}>
                                <FileSound4 showImage={'false'}/>
                                <Text style={stylesApp.Sty_Text_Button}>LÀM LẠI</Text>
                            </TouchableOpacity>
                        ) : (
                            <View style={{flexDirection: 'row'}}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this._CheckResuilt();
                                    }}
                                    style={[
                                        stylesApp.Sty_Button,
                                    ]}>
                                    <Text style={stylesApp.Sty_Text_Button}>TIẾP TỤC</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </View>
                    }
                </View>
            </View>
        );
    }

    RenderItem = ({item, index}) => {
        let IndexQue = index;
        let indexInArr = [];
        let arr = item.question.split(' ');
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == '__') {
                indexInArr.push(i);
            }
        }
        return (
            <View
                style={{
                    width: SmartScreenBase.smPercenWidth * 100,
                    marginBottom: SmartScreenBase.smPercenHeight * 2,
                    //backgroundColor:'red'
                }}>
                <View
                    style={{
                        marginTop: SmartScreenBase.smPercenHeight * 2,
                        width: SmartScreenBase.smPercenWidth * 90,
                        alignSelf: 'center',
                    }}>
                    <View
                        style={
                            {
                                alignItems: 'flex-start',
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                zIndex: 0,
                                width: SmartScreenBase.smPercenWidth * 90,
                                borderRadius: SmartScreenBase.smPercenWidth * 3,
                                padding: SmartScreenBase.smPercenHeight,
                                alignSelf: 'center',
                            }}>
                        <Text style={{
                            ...StyleLesson.question_text,
                            fontFamily: FontBase.MyriadPro_Bold,
                            marginTop: Platform.OS == 'ios' ? SmartScreenBase.smPercenWidth*0.25 : SmartScreenBase.smPercenWidth*0.6,
                            color: '#FFF',
                        }}>{index + 1}. </Text>
                        {arr.map((e, index, key) => {
                            let indexFind = indexInArr.findIndex(el => el === index);
                            return (
                                <View style={{}}>
                                    {e == '__' ? (
                                        indexFind !== -1 ? (
                                            <TouchableOpacity
                                                onLongPress={() => LessonBase.goTranslate(this.state.data[IndexQue].option[indexFind])}
                                                style={{
                                                    zIndex: 10,
                                                    borderBottomWidth: 1,
                                                    borderBottomColor: '#FFF',
                                                }}>
                                                <Text style={{...StyleLesson.question_text, color: '#FFF'}}>
                                                    {this.state.data[IndexQue].option[indexFind]}
                                                </Text>
                                            </TouchableOpacity>
                                        ) : (
                                            <TouchableOpacity
                                                onLongPress={() => LessonBase.goTranslate(e)}
                                                style={{zIndex: 10, color: '#FFF'}}>
                                                <Text style={{...StyleLesson.question_text}}>{e} </Text>
                                            </TouchableOpacity>
                                        )
                                    ) : (
                                        <TouchableOpacity
                                            onLongPress={() => LessonBase.goTranslate(e)}
                                            style={[stylesApp.txt, {zIndex: 0}]}>
                                            <Text style={{...StyleLesson.question_text, color: '#FFF'}}>{e} </Text>
                                        </TouchableOpacity>
                                    )}
                                </View>
                            );
                        })}
                    </View>
                    <View
                        style={{
                            alignItems: 'center',
                            flexDirection: 'row',
                        }}>
                        <View style={{width: '50%', justifyContent: 'center', alignItems: 'center'}}>
                            {item.option.map((e, key) => {
                                if (key === 0 || key === 2) {
                                    return (
                                        <TouchableOpacity
                                            key={key}
                                            disabled={item.status}
                                            onPress={() => {
                                                this._ChooseAnswer(IndexQue, key);
                                            }}
                                            style={{
                                                borderWidth: SmartScreenBase.smPercenWidth / 2,
                                                borderColor:
                                                    this.ArrAnswer[index] == key
                                                        ? 'rgba(255,255,255,0.95)'
                                                        : 'rgba(198,229,14,0.95)',
                                                backgroundColor:
                                                    this.ArrAnswer[index] == key
                                                        ? '#EEE51C'
                                                        : 'rgba(255,255,255,0.95)',
                                                width: SmartScreenBase.smPercenWidth * 40,
                                                borderRadius: SmartScreenBase.smPercenWidth * 3,
                                                justifyContent:'center',
                                                paddingHorizontal:SmartScreenBase.smPercenWidth,
                                                marginTop: SmartScreenBase.smPercenHeight * 2,
                                                height:SmartScreenBase.smPercenHeight * 6,
                                            }}
                                            >
                                                <AdjustLabel 
                                                    numberOfLines={2}
                                                    fontSize={SmartScreenBase.smFontSize * 45} 
                                                    text={this.option[key] + '. ' + e.replace(/\n/g, '')} />
                                        </TouchableOpacity>
                                    );
                                } else {
                                    return null;
                                }

                            })}
                        </View>
                        <View style={{width: '50%'}}>
                            {item.option.map((e, key) => {
                                if (key === 1 || key === 3) {
                                    return (
                                        <TouchableOpacity
                                            key={key}
                                            disabled={item.status}
                                            style={{
                                                borderWidth: SmartScreenBase.smPercenWidth / 2,
                                                borderColor:
                                                    this.ArrAnswer[index] == key
                                                        ? 'rgba(255,255,255,0.95)'
                                                        : 'rgba(198,229,14,0.95)',
                                                backgroundColor:
                                                    this.ArrAnswer[index] == key
                                                        ? '#EEE51C'
                                                        : 'rgba(255,255,255,0.95)',
                                                width: SmartScreenBase.smPercenWidth * 40,
                                                borderRadius: SmartScreenBase.smPercenWidth * 3,
                                                justifyContent:'center',
                                                paddingHorizontal:SmartScreenBase.smPercenWidth,
                                                marginTop: SmartScreenBase.smPercenHeight * 2,
                                                height:SmartScreenBase.smPercenHeight * 6,
                                            }}
                                            onPress={() => {
                                                this._ChooseAnswer(IndexQue, key);
                                            }}>
                                                <AdjustLabel 
                                                fontSize={SmartScreenBase.smFontSize * 45}
                                                text={this.option[key] + '. ' + e.replace(/\n/g, '')}
                                                numberOfLines={2}
                                            />
                                        </TouchableOpacity>
                                    );
                                } else {
                                    return null;
                                }

                            })}
                        </View>

                    </View>
                </View>
            </View>
        );
    };

    _ShowResuilt() {
        return (
            <View style={{height: SmartScreenBase.smPercenHeight * 70, ...StyleLesson.question_content}}>
                <View style={{alignSelf: 'center', alignItems: 'center'}}>
                    {this.state.checkResuilt == true || this.checkNumber >= 2 ? (
                        <View style={{
                            height: SmartScreenBase.smPercenHeight * 15,
                            width: '100%',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                            <FileSound showImage={this.state.showImage == true ? 'true' : 'false'}/>
                        </View>

                    ) : null}
                    <Text
                        style={StyleLesson.text_answer}>
                        BẠN ĐÃ TRẢ LỜI ĐÚNG {this.state.NumberTrue}/{this.state.data.length}
                    </Text>
                </View>
                <View
                    style={{
                        width: SmartScreenBase.smPercenWidth * 100,
                        alignItems: 'center',
                        flex: 1,
                    }}>
                    <View
                        style={{
                            height: this.state.checkResuilt == true || this.checkNumber >= 2 ? SmartScreenBase.smPercenHeight * 50 : SmartScreenBase.smPercenHeight * 65,
                        }}>
                        <FlatList
                            data={this.state.data}
                            extraData={this.state.refresh}
                            keyExtractor={(item, index) => 'item' + index}
                            renderItem={this.RenderItemResuilt.bind(this)}
                            showsVerticalScrollIndicator={false}
                        />
                    </View>
                </View>
            </View>
        );
    }

    _FunctionToReplaceQuestion = (Text) => {
        if (Text !== '' && Text !== null && Text !== undefined) {
            Text = Text.toLowerCase();
            let ApplyText = Text.trim();
            while (ApplyText.substr(ApplyText.length - 1) === '.' || ApplyText.substr(ApplyText.length - 1) === ',') {
                ApplyText = ApplyText.substring(0, ApplyText.length - 1);
                ApplyText = ApplyText.trim();
            }
            let findReplaceQuestionStatus = ApplyText.indexOf('‘');
            let findReplaceQuestionStatus1 = ApplyText.indexOf('\'');
            //console.log(findReplaceQuestionStatus);
            if (findReplaceQuestionStatus !== -1 || findReplaceQuestionStatus1 !== -1) {
                ApplyText = ApplyText.toLowerCase().replace('‘', '’').replace('\'', '’');
            }
            //console.log(ApplyText);
            return (ApplyText);
        } else {
            return ('');
        }
    };
    RenderItemResuilt = ({item, index}) => {
        //A, B, C, D

        console.log("=====RenderItemResuilt",item,this.option)
        console.log("=====RenderItemResuilt 2",this.ArrAnswer,index)
        console.log("=====RenderItemResuilt 3",item.option)

        let IndexQue = index;
        let indexInArr = [];
        let arr = item.question.split(' ');
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] == '__') {
                indexInArr.push(i);
            }
        }

        const valueOptionText = this.ArrAnswer[index]==null?'':this.option[this.ArrAnswer[index]]  + '.'
        const resultOption1 = this.option[
            item.option.indexOf(item.option.find(c=> Utils.validWord(c) == Utils.validWord(item.answer) ))
            ];
        const resultOption1Text = resultOption1 + '.'


        if (this.checkNumber < 2 && this.state.checkResuilt == false) {
            return (
                <View
                    style={[
                        StyleLesson.Sty_View_Border,
                        {
                            alignItems: 'flex-start',
                            borderWidth: 2,
                            marginTop: SmartScreenBase.smBaseWidth * 80,
                            borderColor:
                                Utils.validWord(this.state.data[index].option[this.ArrAnswer[index]]) ==
                                Utils.validWord(this.state.data[index].answer)
                                    ? 'rgba(198,229,14,0.95)'
                                    : '#e21010',
                        },
                    ]}>
                    <View
                        style={{
                            flexDirection: 'row',
                            marginTop: SmartScreenBase.smPercenHeight * 2,
                            paddingRight: SmartScreenBase.smPercenWidth,
                            width: width * 0.8,
                            flexWrap: 'wrap',
                        }}>
                        <Text
                            style={[
                                {
                                    marginTop: SmartScreenBase.smPercenWidth*1,
                                    fontFamily: FontBase.MyriadPro_Bold,
                                    ...StyleLesson.question_text,
                                },
                            ]}>
                            {index + 1}.{' '}
                        </Text>
                        {arr.map((e, index, key) => {
                            let indexFind = indexInArr.findIndex(el => el === index);
                            return (
                                <View style={{}}>
                                    {e == '__' ? (
                                        indexFind !== -1 ? (
                                            <View style={{borderBottomWidth:1,marginTop:SmartScreenBase.smPercenWidth}}>
                                                <Text style={{...StyleLesson.question_text,fontFamily:font.MyriadPro_Bold}}>
                                                    {this.state.data[IndexQue].option[indexFind]}
                                                </Text>
                                            </View>
                                        ) : (
                                            <View style={{zIndex: 10,borderBottomWidth:1,marginTop:SmartScreenBase.smPercenWidth}}>
                                                <Text style={{...StyleLesson.question_text,fontFamily:font.MyriadPro_Bold}}>{e} </Text>
                                            </View>
                                        )
                                    ) : (
                                        <View style={[stylesApp.txt, {zIndex: 0,marginTop:SmartScreenBase.smPercenWidth}]}>
                                            <Text style={{...StyleLesson.question_text,fontFamily:font.MyriadPro_Bold}}>{e} </Text>
                                        </View>
                                    )}
                                </View>
                            );
                        })}
                    </View>

                    <View
                        style={{
                            margin: SmartScreenBase.smPercenHeight,
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                        {/* {
                            this.state.data[index].option[this.ArrAnswer[index]] ==
                            this.state.data[index].answer ?
                                <Image
                                    source={{uri: 'lesson_grammar_image3'}}
                                    style={StyleLesson.Image_Explain}
                                />
                                : null
                        } */}

                        <Text
                            style={[
                                {
                                    marginLeft: SmartScreenBase.smPercenWidth * 5,
                                    ...StyleLesson.answer_text,
                                    color: Utils.validWord(this.state.data[index].option[this.ArrAnswer[index]]) ==
                                    Utils.validWord(this.state.data[index].answer)
                                        ? 'rgba(198,229,14,0.95)'
                                        : '#e21010',
                                    fontWeight: 'bold',
                                },
                            ]}>
                            {valueOptionText + ' ' +
                            this._FunctionToReplaceQuestion(this.state.data[index].option[this.ArrAnswer[index]])}
                        </Text>
                    </View>
                    <View
                        style={{
                            position: 'absolute',
                            top: -SmartScreenBase.smBaseWidth * 56,
                            alignSelf: 'center',
                        }}>
                        <Image
                            source={{
                                uri:
                                    Utils.validWord(this.state.data[index].option[this.ArrAnswer[index]])
                                     ==
                                    Utils.validWord(this.state.data[index].answer) 
                                        ? 'grammar1_4'
                                        : 'grammar1_3',
                            }}
                            style={StyleLesson.Sty_Image_Small_Answer}
                        />
                    </View>
                </View>
            );
        } else {
            return (
                <View
                    style={[
                        StyleLesson.Sty_View_Border,
                        {
                            alignItems: 'flex-start',
                            marginTop: SmartScreenBase.smBaseWidth * 80,
                            borderWidth: SmartScreenBase.smPercenWidth / 2,
                            borderColor:
                            Utils.validWord(this.state.data[index].option[this.ArrAnswer[index]]) ==
                            Utils.validWord(this.state.data[index].answer)    
                                    ? 'rgba(198,229,14,0.95)'
                                    : '#e8425a',
                        },
                    ]}>
                    <View
                        style={{
                            flexDirection: 'row',
                            marginTop: SmartScreenBase.smPercenHeight * 2,
                            paddingRight: SmartScreenBase.smPercenWidth,
                            flexWrap: 'wrap',
                        }}>
                            <Text
                            style={[
                                {
                                    marginTop: SmartScreenBase.smPercenWidth*1,
                                    fontFamily: FontBase.MyriadPro_Bold,
                                    ...StyleLesson.question_text,
                                },
                            ]}>
                            {index + 1}.{' '}
                        </Text>
                        {arr.map((e, index, key) => {
                            let indexFind = indexInArr.findIndex(el => el === index);
                            return (
                                <View style={{}}>
                                    {e == '__' ? (
                                        indexFind !== -1 ? (
                                            <View style={{borderBottomWidth:1,marginTop:SmartScreenBase.smPercenWidth}}>
                                                <Text style={{...StyleLesson.question_text,fontFamily:font.MyriadPro_Bold}}>
                                                    {this.state.data[IndexQue].option[indexFind]}
                                                </Text>
                                            </View>
                                        ) : (
                                            <View style={{zIndex: 10,borderBottomWidth:1,marginTop:SmartScreenBase.smPercenWidth}}>
                                                <Text style={{...StyleLesson.question_text,fontFamily:font.MyriadPro_Bold}}>{e} </Text>
                                            </View>
                                        )
                                    ) : (
                                        <View style={[stylesApp.txt, {zIndex: 0,marginTop:SmartScreenBase.smPercenWidth}]}>
                                            <Text style={{...StyleLesson.question_text,fontFamily:font.MyriadPro_Bold}}>{e} </Text>
                                        </View>
                                    )}
                                </View>
                            );
                        })}
                    </View>
                    <View
                        style={{
                            margin: SmartScreenBase.smPercenHeight,
                            flexDirection: 'row',
                            alignItems: 'center',
                        }}>
                        {
                            Utils.validWord(this.state.data[index].option[this.ArrAnswer[index]])
                             !==
                             Utils.validWord(this.state.data[index].answer)
                             ?<>
                             <Text
                                    style={[
                                        {
                                            marginRight: SmartScreenBase.smPercenWidth * 5,
                                            fontFamily:font.MyriadPro_Bold,
                                            fontSize: SmartScreenBase.smFontSize * 50,
                                            fontWeight:'700',
                                            color: '#e21010',
                                            marginTop: SmartScreenBase.smPercenWidth * 2,
                                        },
                                    ]}>
                                    {valueOptionText + ' ' +
                                    this._FunctionToReplaceQuestion(this.state.data[index].option[this.ArrAnswer[index]])}
                                </Text>
                             <Image
                                    source={{uri: 'lesson_grammar_image3'}}
                                    style={StyleLesson.Image_Explain}
                                />
                             </>
                                : null
                        }
                        <Text
                            style={[
                                {
                                    marginLeft: SmartScreenBase.smPercenWidth * 5,
                                    fontFamily:font.MyriadPro_Bold,
                                    fontSize: SmartScreenBase.smFontSize * 50,
                                    color: 'rgba(198,229,14,0.95)',
                                    fontWeight:'700',
                                    marginTop: SmartScreenBase.smPercenWidth * 2,
                                },
                            ]}>
                            {resultOption1Text + ' ' + this.state.data[index].answer}
                        </Text>
                    </View>
                    {this.state.checkType === 'afterTest' ? (
                        this.state.dicription === true ? (
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
                                        GIẢI THÍCH
                                    </Text>
                                </Text>
                                <Text style={[stylesApp.txt, {fontStyle: 'italic'}]}>
                                    {item.explain}
                                </Text>
                            </View>
                        ) : null
                    ) : (
                        <View
                            style={{
                                marginTop: SmartScreenBase.smPercenHeight,
                                marginBottom: SmartScreenBase.smPercenHeight
                            }}>
                            <Text>
                                <Text style={StyleLesson.text_explain}>GIẢI THÍCH</Text>
                            </Text>
                            <Text style={[StyleLesson.explain_text, {fontStyle: 'italic', paddingTop: SmartScreenBase.smPercenHeight}]}>
                                {item.explain}
                            </Text>
                        </View>
                    )}
                    <View
                        style={{
                            position: 'absolute',
                            top: -SmartScreenBase.smBaseWidth * 56,
                            alignSelf: 'center',
                        }}>
                        <Image
                            source={{
                                uri:
                                    Utils.validWord(this.state.data[index].option[this.ArrAnswer[index]]) ==
                                    Utils.validWord(this.state.data[index].answer)
                                        ? 'grammar1_4'
                                        : 'grammar1_3',
                            }}
                            style={StyleLesson.Sty_Image_Small_Answer}
                        />
                    </View>
                </View>
            );
        }
    };
}

function mapStateToProps(state) {
    return {
        data_answer: state.GrammarD11Reducer.data_answer,
        data_login: state.AuthStackReducer.dataLogin,
    };
}

export default connect(mapStateToProps)(GrammarD11);
