import React, {Component} from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    View,
    TouchableWithoutFeedback,
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import TypeExercise from '../Component/TypeExercise';
import StyleLesson from '../StyleLesson';
import stylesApp from '../../../styleApp/stylesApp';
import axios from 'axios';
import EventBus from 'react-native-event-bus';
import API from '../../../../API/APIConstant';
import FileSound from '../FileSound';
import {connect} from 'react-redux';
import ModalChooseAnswer from "../Component/ModalChooseAnswer";
import font from '../../../../base/FontBase';
import stringUtils from '../../../../utils/stringUtils';
import TextDownLine from '../../../../componentBase/TextDownLine/TextDownLine';
import FontBase from '../../../../base/FontBase';
import { Colors } from '../../../../styleApp/color';

let DataObject1 = new Object();
let dataNew = [];
let dataAns = [];
let a = [];
let dataObject = [];
let fakedata = ['0', '2', '0', '1', '1'];

class GrammarD2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkResuilt: null,
            refresh: false,
            checkDisableDropdown: false,
            ShowCheck: false,
            NumberCorrect: 0,
            data: [
                {
                    question: '',
                    answer: '',
                    explain: '',
                },
            ],
            ArrAnswer: ['is', 'are', 'am'],
            isloading: false,
            showWeb: false,
            String: '',
            checkType: '',
            dicription: false,
            dataFirt: {},
            showScript: false,
            number: 0,
            title_ENG: '',
            title_VI: '',
            arrayPost: [],
            titlePress: false,
            logid: '',
            data_lesson: {},
            showModalChooseAnswer: -1,
            history:[],
        };
        this.AnswerChoose = [];
        this.explain = [];
    }

    _FunctionToReplaceQuestion = (Text) => {
        // if (Text !== '' && Text !== null && Text !== undefined) {
        //     Text = Text.toLowerCase();
        //     let ApplyText = Text.trim();
        //     while (ApplyText.substr(ApplyText.length - 1) === '.' || ApplyText.substr(ApplyText.length - 1) === ',') {
        //         ApplyText = ApplyText.substring(0, ApplyText.length - 1);
        //         ApplyText = ApplyText.trim();
        //     }
        //     let findReplaceQuestionStatus = ApplyText.indexOf('‘');
        //     let findReplaceQuestionStatus1 = ApplyText.indexOf('\'');
        //     //console.log(findReplaceQuestionStatus);
        //     if (findReplaceQuestionStatus !== -1 || findReplaceQuestionStatus1 !== -1) {
        //         ApplyText = ApplyText.toLowerCase().replace('‘', '’').replace('\'', '’');
        //     }
        //     //console.log(ApplyText);
        //     return (ApplyText);
        // } else {
        //     return ('');
        // }
        return stringUtils.validWord(Text);
    };

    //this.AnswerChoose
    CheckTimes = 0;
    _Submit = async () => {
        var dataAns = this.state.data.map((q,i)=>{
            return {
                exercise_type:'Grammar',
                question_type:4,
                question_id: q.id,
                final_user_choice:q.chose==null?'':this.state.ArrAnswer[q.chose],
                detail_user_turn: this.state.history.map((h,ii)=>{
                    return {
                        num_turn: i+1,
                        score: h[i]?.status?1:0,
                        user_choice:q.chose==null?'':this.state.ArrAnswer[q.chose],
                    }
                })
            }
        })

        // let arrr = [];
        // for (let i = 0; i < this.AnswerChoose.length; i++) {
        //     let ob = new Object();
        //     (ob.question_id = this.state.data[i].id),
        //         (ob.exercise_type = 'Grammar'),
        //         (ob.question_type = 4);
        //     ob.final_user_choice = this._FunctionToReplaceQuestion(this.AnswerChoose[i]);
        //     let a = [];
        //     for (let j = 0; j < this.state.arrayPost.length; j++) {
        //         let obj = new Object();
        //         obj.num_turn = j;
        //         obj.score =
        //             this._FunctionToReplaceQuestion(this.state.ArrAnswer[parseInt(this.state.arrayPost[j].ans[i])]) === this._FunctionToReplaceQuestion(this.state.data[i].answer.join())
        //                 ? 1
        //                 : 0;
        //         obj.user_choice = this._FunctionToReplaceQuestion(this.state.ArrAnswer[parseInt(this.state.arrayPost[j].ans[i])]);
        //         a.push(obj);
        //     }
        //     ob.detail_user_turn = a;
        //     arrr.push(ob);
        // }
        //console.log('dataAns',dataAns)
        this.props.saveLogLearning(dataAns);
    };

    componentWillMount() {
        this.setState({isloading: true});
        this.setState({checkType: this.props.checkType});
        dataObject = [];
        dataNew = [];
        dataAns = [];
        let array = [];
        var ListText = [];
        let response = {};
        response.data = this.props.dataContent;
        this.setState({dataFirt: response.data});
        this.setState({data_lesson: response});
        // this._postDataFirt(response.data);
        try{
        for (var j = 0; j < response.data.data_question.length; j++) {
            for (
                let i = 0;
                i < response.data.data_question[j].list_option.length;
                i += 1
            ) {
                this.AnswerChoose.push('');
                dataAns = [];
                DataObject1 = new Object();
                var text =
                    '}' + response.data.data_question[j].list_option[i].question_content;
                ListText = text.split('{')[0].split('}')[1];
                for (let j = 1; j < text.split('{').length; j++) {
                    ListText = ListText + '________' + text.split('{')[j].split('}')[1];
                    dataAns.push(text.split('{')[j].split('}')[0]);
                }
                DataObject1.question = ListText;
                DataObject1.answer = dataAns;
                DataObject1.type = response.data.data_question[j].list_option[i].question_type;
                DataObject1.id = response.data.data_question[j].question_id;
                dataObject.push(DataObject1);
                // console.log('response.data.data_question',i,j, response.data.data_question[j].list_option[i].match_option_text)
                if (
                    array.find(
                        (element) =>
                            element.toLowerCase() ===
                            response.data.data_question[j].list_option[i].match_option_text[0].toLowerCase(),
                    )
                ) {
                } else {
                    array.push(
                        response.data.data_question[j].list_option[i].match_option_text[0].toLowerCase(),
                    );
                }
                //console.log('arrayyyyy:', array);
            }
        }
        this.explain = [];
        response.data.data_question.forEach((item) => {
            let ex = item.list_option[0].explain_parse;
            // ex = JSON.parse(ex);
            this.explain.push(ex.content_question_text);
        });

    }catch(er){console.log("=====loi",er); Alert.alert("Bài tập này đang bị lỗi dữ liệu, vui lòng chọn bài khác")}

        if (this.props.checkType === 'afterTest') {
            this.AnswerChoose = fakedata;
            this.setState({
                checkResuilt: true,
            });
        }
        //console.log('data', dataObject);
        // console.log('ArrAnswer', array);
        this.setState({data: dataObject});
        this.setState({ArrAnswer: array});
        this.setState({isloading: false});
    }

    componentDidMount(){
        this.props.saveLogLearning([]);
    }

    _onPressDicription = () => {
        this.setState({dicription: !this.state.dicription});
    };

    _OnPressCheckResuilt() {
        if (this.state.checkType === 'exam') {
            this.props.hideTypeExercise();
            let check = 0;
            if (this.state.checkResuilt == null) {

                for (let index = 0; index < this.state.data.length; index++) {
                    if (
                        this._FunctionToReplaceQuestion(this.state.ArrAnswer[this.AnswerChoose[index]]) ==
                        this._FunctionToReplaceQuestion(this.state.data[index].answer.join())
                    ) {
                        check += 1;
                        this.state.data[index].status = true;
                    }
                }

                this.state.NumberCorrect = check;
                if (check == this.state.data.length) {
                    this.props.showFeedback();
                    this.setState({
                        checkResuilt: true,
                    });
                } else {
                    this.CheckTimes += 1;
                    this.setState({
                        checkResuilt: false,
                    });
                }
                if (this.CheckTimes >= 2) {
                    this.props.showFeedback();
                }
                let ob = new Object();
                ob.ans = this.AnswerChoose.slice('');
                a.push(ob);
                this.setState({arrayPost: a,history:[
                    ...this.state.history,JSON.parse(JSON.stringify(this.state.data))
                ]});
            } else if (this.state.checkResuilt == false) {
                if (this.CheckTimes < 2) {
                    this.props.showTypeExercise();
                    //this.AnswerChoose = [];
                    //reset fail
                    this.state.data.forEach((e,i)=>{
                        if(!e.status){
                            e.chose = null;
                            this.AnswerChoose[i] = ''
                        }
                    })
                    this.setState({
                        checkResuilt: null,
                        ShowCheck: false,
                    });
                } else {
                    this.props.hideTypeExercise();
                    this._Submit();
                    //this.props.methodScreen(3);
                }
            } else {
                this.props.hideTypeExercise();
                this._Submit();
                //this.props.methodScreen(3);
            }
            this.setState({number: this.CheckTimes});
        } else {
            this.props.nextReviewResult();
        }
    }

    _OnShowScript() {
        this.setState({showScript: !this.state.showScript});
    }

    render() {
        //console.log(this.state)
        //console.log('this.AnswerChoose',this.AnswerChoose)
        return (
            <View
                style={{
                    height: SmartScreenBase.smPercenHeight * 87,
                    alignSelf: 'center',
                    alignItems: 'center',
                }}>
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
                        }}>
                        <ActivityIndicator size="large" color="#00ff00"/>
                    </View>
                ) : null}
                <View style={{
                    width: '100%',
                    height: this.state.checkResuilt == null ? SmartScreenBase.smPercenHeight * 58 : SmartScreenBase.smPercenHeight * 73, ...StyleLesson.question_content,
                }}>
                    {this.state.checkResuilt == null
                        ? this._ShowQuestion()
                        : this._ShowResuiltCorrect()}
                </View>
                <View
                    style={{
                        width: '100%',
                        height: SmartScreenBase.smPercenHeight * 10,
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
                                <Text style={stylesApp.Sty_Text_Button}>Giải thích</Text>
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
                    ) : (
                        <View>
                            {this.state.checkType === 'Testing' ? (
                                this.state.ShowCheck == true ?
                                    <View style={{flexDirection: 'row'}}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                this._OnPressBack();
                                            }}
                                            style={[
                                                stylesApp.Sty_Button,
                                                {
                                                    width: SmartScreenBase.smPercenWidth * 40,
                                                    marginRight: SmartScreenBase.smPercenWidth * 10,
                                                },
                                            ]}>
                                            <Text style={stylesApp.Sty_Text_Button}>BACK</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {
                                                this._OnPressCheckResuilt();
                                            }}
                                            style={[
                                                stylesApp.Sty_Button,
                                                {width: SmartScreenBase.smPercenWidth * 40},
                                            ]}>
                                            <Text style={stylesApp.Sty_Text_Button}>NEXT</Text>
                                        </TouchableOpacity>
                                    </View>
                                    : null
                            ) : this.state.checkResuilt == null ? (
                                this.state.ShowCheck == true ?
                                    <TouchableOpacity
                                        onPress={() => {
                                            this._OnPressCheckResuilt();
                                        }}
                                        style={[
                                            stylesApp.Sty_Button,
                                        ]}>
                                        <Text style={stylesApp.Sty_Text_Button}>KIỂM TRA</Text>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity
                                        disabled={true}
                                        style={[
                                            stylesApp.Sty_Button_disable,
                                        ]}>
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
                                    <TouchableOpacity
                                        onPress={() => {
                                            this._OnPressCheckResuilt();
                                        }}
                                        style={[
                                            stylesApp.Sty_Button,
                                        ]}>
                                        <Text style={stylesApp.Sty_Text_Button}>TIẾP TỤC</Text>
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>)}
                </View>
                {this.state.showModalChooseAnswer >= 0 &&
                    <ModalChooseAnswer 
                        data={this.state.ArrAnswer} 
                        _cancelChooseAnswer={this._cancelChooseAnswer}
                        _onSelect={this._onSelect} 
                        indexChooseAnswer={this.state.showModalChooseAnswer}/>
                    }
            </View>
        );
    }

    _cancelChooseAnswer = () => {
        this.setState({showModalChooseAnswer: -1})
    };

    _Onpress = () => {
        this.setState({titlePress: !this.state.titlePress});
    };

    _ShowQuestion() {
        return (
            <FlatList
                data={this.state.data}
                extraData={this.state.refresh}
                keyExtractor={(item, index) => 'item' + index}
                renderItem={this._Render_Item}
            />
        );
    }

    _onSelect = (index, IDItem) => {
        //console.log(index,IDItem)
        this.state.data[IDItem].chose = index;
        this.setState({showModalChooseAnswer: -1});
        this.AnswerChoose[IDItem] = index;
        let c = 0;
        this.AnswerChoose.forEach((item) => {
            c += item.toString() ? 1 : 0;
        });
        if (c === this.state.data.length) {
            this.setState({ShowCheck: true});
        } else {
            this.setState({ShowCheck: false});
        }
    };

    placeFill = (mItem, index, indexQ, isResult, lineKey) => {

        // LogBase.log("=====item",mItem)
        // LogBase.log("=====index",index)
        // LogBase.log("=====indexQ",indexQ)
        // console.log("=====lineKey",lineKey)

        return (                
            <TouchableWithoutFeedback 
            disabled={mItem.status}
            key={indexQ}
            onPress={() => {
                this.setState({showModalChooseAnswer: indexQ})
            }}>
                <View
                    style={{
                        marginTop: SmartScreenBase.smPercenWidth*0.7,
                        flexDirection: 'row',
                        alignItems: 'center',
                        backgroundColor: this._ColorAnswer(indexQ),
                        // backgroundColor: 'rgba(249,232,21,0.95)',
                        borderRadius: SmartScreenBase.smPercenWidth * 2,
                        minWidth: SmartScreenBase.smPercenWidth * 25,
                        // paddingVertical: SmartScreenBase.smBaseWidth*14 ,
                        height: SmartScreenBase.smPercenWidth*6,
                        paddingHorizontal:SmartScreenBase.smPercenWidth * 2,
                        marginRight: SmartScreenBase.smPercenWidth,
                        marginVertical: SmartScreenBase.smPercenHeight,
                    }}>
                    <Image source={{uri: 'muitenxuongluyenthi'}}
                           style={{
                               width: SmartScreenBase.smPercenWidth * 3,
                               height: SmartScreenBase.smPercenWidth * 3,
                               resizeMode: 'contain',
                               tintColor: '#000',
                               marginRight: SmartScreenBase.smPercenWidth,
                           }}/>
                    <Text>|</Text>
                    <Text style={{
                        fontFamily: FontBase.MyriadPro_Bold,
                        fontSize:SmartScreenBase.smFontSize*45,
                        marginLeft:SmartScreenBase.smPercenWidth,
                        color: Colors.Black
                    }}>{
                        mItem.chose==null ? '' : (lineKey == 0 ? stringUtils.upCaseFirstChar(this.state.ArrAnswer[mItem.chose]) : this.state.ArrAnswer[mItem.chose])
        }</Text>
                </View>
            </TouchableWithoutFeedback>)
    }

    _Render_Item = ({item, index}) => {
        // console.log("=====_Render_Item",item)
        var myanswer = []
        this.state.data.forEach(element => {
            myanswer.push({
                chose: item.chose,
                status: item.status
            })
        });
        let ArrQuestion = item.question.split(' ');
        return (
            <View
                style={[
                    StyleLesson.Sty_View_Border,
                    {
                        alignItems: 'flex-start',
                        paddingVertical: SmartScreenBase.smPercenHeight * 2,
                        marginBottom: SmartScreenBase.smPercenHeight * 2,
                        paddingLeft: SmartScreenBase.smPercenWidth*3
                    },
                ]}>
                <View
                    style={{
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                    }}>
                    <TextDownLine
                            textDL={stringUtils.toListDownLine(item.question)}
                            placeToFill={(mItem, mIndex, mIndexQ, isResu, keyLine) => this.placeFill(mItem, mIndex, mIndexQ, isResu, keyLine)}
                            indexQ={index}
                            statusFillList={myanswer}
                            isResult={false}
                            showNumber={true}
                            lineSpace={SmartScreenBase.smPercenWidth}
                        /> 
                    {/* <Text style={[StyleLesson.question_text, {
                        fontWeight: 'bold',
                        lineHeight: SmartScreenBase.smPercenHeight * 3,
                    }]}>
                        {index + 1}.{' '}
                    </Text>
                    {ArrQuestion.map((word, key) => {
                        return stringUtils.removeSpecialWord(word) == '_____'?<TouchableWithoutFeedback 
                        disabled={item.status}
                        key={key}
                        onPress={() => {
                            this.setState({showModalChooseAnswer: index})
                        }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    backgroundColor: 'rgba(249,232,21,0.95)',
                                    borderRadius: SmartScreenBase.smPercenWidth * 2,
                                    minWidth: SmartScreenBase.smPercenWidth * 25,
                                    paddingVertical: SmartScreenBase.smBaseWidth*14 ,
                                    paddingHorizontal:SmartScreenBase.smPercenWidth * 2,
                                    marginLeft: SmartScreenBase.smPercenWidth * 2,
                                    marginVertical: SmartScreenBase.smPercenHeight,
                                }}>
                                <Image source={{uri: 'muitenxuongluyenthi'}}
                                       style={{
                                           width: SmartScreenBase.smPercenWidth * 3,
                                           height: SmartScreenBase.smPercenWidth * 3,
                                           resizeMode: 'contain',
                                           tintColor: '#000',
                                           marginRight: SmartScreenBase.smPercenWidth,
                                       }}/>
                                <Text>|</Text>
                                <Text style={{
                                    fontWeight:'bold',
                                    fontSize:SmartScreenBase.smFontSize*45,
                                    marginLeft:SmartScreenBase.smPercenWidth
                                }}>{
                                    item.chose==null ? '' : (key == 0 ? stringUtils.upCaseFirstChar(this.state.ArrAnswer[item.chose]) : this.state.ArrAnswer[item.chose])
                    }</Text>
                            </View>
                        </TouchableWithoutFeedback>:<TouchableOpacity
                            onLongPress={() => this._moveWebView(word.toLowerCase())}
                            key={key}>
                            <Text style={StyleLesson.question_text}> {word}</Text>
                        </TouchableOpacity>
                    })} */}
                </View>
            </View>
        );
    };

    _ShowResuiltCorrect() {
        return (
            <View style={{alignItems: 'center'}}>
                <View
                    style={{
                        alignSelf: 'center',
                        alignItems: 'center',
                        marginTop: SmartScreenBase.smPercenHeight * 2,

                    }}>
                    {
                        this.state.checkResuilt == false && this.state.number < 2
                            ?
                            <FileSound
                                showIcon={'none'}
                                showImage={this.state.NumberCorrect === this.state.data.length ? 'true' : 'false'}/>
                            :
                            <View style={{height: SmartScreenBase.smPercenHeight * 10}}>
                                <FileSound
                                    showImage={this.state.NumberCorrect === this.state.data.length ? 'true' : 'false'}/>
                            </View>

                    }
                    <Text
                        style={{
                            fontSize: SmartScreenBase.smFontSize * 60,
                            marginVertical: SmartScreenBase.smPercenHeight,
                            color: 'white',
                            fontWeight: '600',
                            fontFamily: 'iCielSoupofJustice',
                        }}>
                        Bạn đã trả lời đúng {this.state.NumberCorrect}/
                        {this.state.data.length}
                    </Text>
                </View>
                <View style={[StyleLesson.Sty_Width_Screen, {flexDirection: 'column'}]}>
                    <View
                        style={{
                            height: this.state.checkResuilt == false && this.state.number < 2 ? SmartScreenBase.smPercenHeight * 65 : SmartScreenBase.smPercenHeight * 57,
                        }}>
                        <FlatList
                            data={this.state.data}
                            keyExtractor={(item, index) => 'item' + index}
                            renderItem={this.RenderItemCorrect}
                        />
                    </View>
                </View>
            </View>
        );
    }

    _renderFirst = (item, index) => {

        var myanswer = []
        this.state.data.forEach(element => {
            myanswer.push({
                chose: item.chose,
                status: item.status
            })
        });

        return (
            <TextDownLine
                textDL={stringUtils.toListDownLine(item.question)}
                placeToFill={(mItem, mIndex, mIndexQ, isResu, keyLine) => this.placeFill(mItem, mIndex, mIndexQ, isResu, keyLine)}
                indexQ={index}
                statusFillList={myanswer}
                isResult={true}
                showNumber={true}
                lineSpace={SmartScreenBase.smPercenWidth}
            /> 
            // ArrQuestion.map((word, key) => {
            //     if (stringUtils.removeSpecialWord(word) == '_____') {
            //         return (
            //             <View
            //                 key={key}
            //                 style={{
            //                     width:
            //                         this.NumberMax().length *
            //                         SmartScreenBase.smPercenWidth *
            //                         2,
            //                     backgroundColor: this._ColorAnswer(index),
            //                     borderRadius: SmartScreenBase.smPercenWidth * 2,
            //                     borderWidth: 2,
            //                     borderColor: 'white',
            //                     alignItems: 'center',
            //                     justifyContent: 'center',
            //                 }}>
            //                 <Text
            //                     style={{
            //                         ...StyleLesson.question_text,
            //                         fontWeight: '500',
            //                     }}>
            //                     {this.state.ArrAnswer[this.AnswerChoose[index]]}
            //                 </Text>
            //             </View>
            //         );
            //     } else {
            //         return (
            //             <Text key={key} style={StyleLesson.question_text}>
            //                 {word}{' '}
            //             </Text>
            //         );
            //     }
            // })
        );
    };

    _renderLast = (item, index) => {

        var myanswer = []
        this.state.data.forEach(element => {
            myanswer.push({
                chose: item.chose,
                status: item.status
            })
        });

        return (
            <>
                <TextDownLine
                    textDL={stringUtils.toListDownLine(item.question)}
                    placeToFill={(mItem, mIndex, mIndexQ, isResu, keyLine) => this.placeFill(mItem, mIndex, mIndexQ, isResu, keyLine)}
                    indexQ={index}
                    statusFillList={myanswer}
                    isResult={true}
                    showNumber={true}
                    lineSpace={SmartScreenBase.smPercenWidth}
                />
                {!this.isAnsRight(index) &&         
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Image
                                    style={{
                                        width: SmartScreenBase.smPercenWidth * 4,
                                        height: SmartScreenBase.smPercenWidth * 4,
                                        marginHorizontal: SmartScreenBase.smPercenWidth
                                    }}
                                    source={{uri: 'lesson_grammar_image3'}}
                                />
                                <View
                                    style={{
                                        marginTop: SmartScreenBase.smPercenWidth*2,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                    <Text
                                        style={{
                                            ...StyleLesson.question_text,
                                            fontFamily: FontBase.MyriadPro_Bold,
                                            color: Colors.TrueGreen
                                        }}>
                                        {this.state.data[index].answer.join()}
                                    </Text>
                                </View>
                            </View>}
            </> 

        // return (
        //     ArrQuestion.map((word, key) => {
        //         if (stringUtils.removeSpecialWord(word) == '_____') {
        //             return (
        //                 this._FunctionToReplaceQuestion(this.state.ArrAnswer[this.AnswerChoose[index]])
        //                 === this._FunctionToReplaceQuestion(this.state.data[index].answer.join())
        //                     ?
        //                     <View
        //                         key={key}
        //                         style={{
        //                             width:
        //                                 this.NumberMax().length *
        //                                 SmartScreenBase.smPercenWidth *
        //                                 2,
        //                             backgroundColor: this._ColorAnswer(index),
        //                             borderRadius: SmartScreenBase.smPercenWidth * 2,
        //                             borderWidth: 2,
        //                             borderColor: 'white',
        //                             alignItems: 'center',
        //                             justifyContent: 'center',
        //                         }}>
        //                         <Text
        //                             style={{
        //                                 ...StyleLesson.question_text,
        //                                 fontWeight: '500',
        //                             }}>
        //                             {this.state.ArrAnswer[this.AnswerChoose[index]]}
        //                         </Text>
        //                     </View>
        //                     :
        //                     <View style={{flexDirection: 'row', alignItems: 'center'}}>
        //                         <View
        //                             style={{
        //                                 width:
        //                                     this.NumberMax().length *
        //                                     SmartScreenBase.smPercenWidth *
        //                                     2,
        //                                 backgroundColor: '#e94b62',
        //                                 borderRadius: SmartScreenBase.smPercenWidth * 2,
        //                                 borderWidth: 2,
        //                                 borderColor: 'white',
        //                                 alignItems: 'center',
        //                                 justifyContent: 'center',
        //                             }}>
        //                             <Text
        //                                 style={{
        //                                     ...StyleLesson.question_text,
        //                                     fontWeight: '500',
        //                                 }}>
        //                                 {this.state.ArrAnswer[this.AnswerChoose[index]]}
        //                             </Text>
        //                         </View>
        //                         <Image
        //                             style={{
        //                                 width: SmartScreenBase.smPercenWidth * 4,
        //                                 height: SmartScreenBase.smPercenWidth * 4,
        //                                 marginHorizontal: SmartScreenBase.smPercenWidth
        //                             }}
        //                             source={{uri: 'lesson_grammar_image3'}}
        //                         />
        //                         <View
        //                             style={{
        //                                 width:
        //                                     this.NumberMax().length *
        //                                     SmartScreenBase.smPercenWidth *
        //                                     2,
        //                                 backgroundColor: '#c8e61a',
        //                                 borderRadius: SmartScreenBase.smPercenWidth * 2,
        //                                 borderWidth: 2,
        //                                 borderColor: 'white',
        //                                 alignItems: 'center',
        //                                 justifyContent: 'center',
        //                             }}>
        //                             <Text
        //                                 style={{
        //                                     ...StyleLesson.question_text,
        //                                     fontWeight: '500',
        //                                 }}>
        //                                 {this.state.data[index].answer.join()}
        //                             </Text>
        //                         </View>
        //                     </View>
        //             );
        //         } else {
        //             return (
        //                 <Text key={key} style={StyleLesson.question_text}>
        //                     {word}{' '}
        //                 </Text>
        //             );
        //         }
        //     })
        );
    };

    _renderExplain = (index) => {
        return (
            <View style={{marginTop: SmartScreenBase.smPercenHeight * 2}}>
                <Text style={StyleLesson.text_explain}>GIẢI THÍCH</Text>
                <Text style={{...StyleLesson.explain_text}}>{this.explain[index]}</Text>
            </View>
        )
    };

    RenderItemCorrect = ({item, index}) => {
        let ArrQuestion = item.question.split(' ');
        return (
            <View
                style={[
                    StyleLesson.Sty_View_Border,
                    {
                        alignItems: 'flex-start',
                        marginTop: SmartScreenBase.smPercenHeight * 5,
                        paddingVertical: SmartScreenBase.smPercenHeight * 2,
                        borderWidth: 2,
                        borderColor: this._ColorAnswer(index),
                    },
                ]}>
                <View style={{
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    paddingTop: SmartScreenBase.smBaseWidth * 65,
                    alignItems: 'center',
                }}>
                    {
                        this.state.checkResuilt === false && this.state.number < 2
                            ?
                            this._renderFirst(item, index)
                            :
                            this._renderLast(item, index)
                    }
                </View>
                {
                    this.state.checkResuilt === false && this.state.number < 2
                        ?
                        null
                        :
                        this._renderExplain(index)
                }
                <View
                    style={{
                        position: 'absolute',
                        alignSelf: 'center',
                        top: -SmartScreenBase.smBaseWidth * 65,
                    }}>
                    <Image
                        source={{
                            uri:
                                this._FunctionToReplaceQuestion(this.state.ArrAnswer[this.AnswerChoose[index]]) ==
                                this._FunctionToReplaceQuestion(this.state.data[index].answer.join())
                                    ? 'grammar1_4'
                                    : 'grammar1_3',
                        }}
                        style={StyleLesson.Image_reuilt}
                    />
                </View>
            </View>
        );
    };

    _ColorAnswer(index) {
        if (this.state.checkResuilt == null) {
            return 'rgba(249,232,21,0.95)';
        }else{
            if(this.isAnsRight(index)){
                return '#c8e61a';
            }else{
                return '#e94b62';
            }
        }
    }

    isAnsRight(index) {
        return this._FunctionToReplaceQuestion(this.state.ArrAnswer[this.AnswerChoose[index]]) == this._FunctionToReplaceQuestion(this.state.data[index].answer.join())
    }

    NumberMax() {
        let Arr = [];
        let text = [];
        for (let index = 0; index < this.state.ArrAnswer.length; index++) {
            Arr.push(this.state.ArrAnswer[index].length);
        }
        let num = Math.max.apply(Math, Arr);
        if (num < 10) {
            num = 10;
        } else {
            num = num;
        }
        for (let index = 0; index < num; index++) {
            text = text + '_';
        }

        return text;
    }
}

function mapStateToProps(state) {
    return {
        data_answer: state.readingD11Reducer,
        data_login: state.AuthStackReducer.dataLogin,
    };
}

export default connect(mapStateToProps)(GrammarD2);
