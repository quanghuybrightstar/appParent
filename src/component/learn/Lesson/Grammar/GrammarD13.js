import React, {Component} from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
    TextInput,
    Keyboard,
    Alert,
    Platform,
    ActivityIndicator,
    ScrollView,
    Animated,
    Dimensions,
} from 'react-native';
import FileSound from '../FileSound';
import FileSound4 from '../FileSound4';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import TypeExercise from '../Component/TypeExercise';
import StyleLesson from '../StyleLesson';
import stylesApp from '../../../styleApp/stylesApp';
import axios from 'axios';
import EventBus from 'react-native-event-bus';
import {connect} from 'react-redux';
import API from '../../../../API/APIConstant';
import style from '../Listening/StyleD7';
import stringUtils from '../../../../utils/stringUtils';
import { Colors } from '../../../../styleApp/color';
import LessonBase from '../../../../base/LessonBase';
import LogBase from '../../../../base/LogBase';

var Sound = require('react-native-sound');
Sound.setCategory('Playback');
let DataObject1 = new Object();
let DataObject2 = new Object();
let DataObject = new Object();
let newObject = new Object();
const {width, height} = Dimensions.get('window');
let ans = [];
let answeraaaa = [
    {ans: 'Why didn’t Thomas go to the festival?', status: false, statusHint: false},
    {ans: 'Q', status: false, statusHint: false},
    {ans: '', status: false, statusHint: false},
    {ans: 'Q', status: false, statusHint: false},
    {ans: 'Q', status: false, statusHint: false},
    {ans: 'Q', status: false, statusHint: false},
];

let dataHistory = [], listSuccess;

class GrammarD13 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            title_ENG: '',
            title_VI: '',
            playState: 'pause',
            isloading: '',
            showWeb: false,
            String: '',
            ArrAnswer: [],
            statusScreen: 'question',
            showButton: false,
            numberDoExam: 0,
            numberRightEx: 0,
            statusCheckRightOrFalse: '',
            valueY: new Animated.Value(0),
            showScript: false,
            playSeconds: 0,
            PlayAudioHint: false,
            sliderEditing: false,
            playSecondsHint: 0,
            selectAudio: 0,
            fileAudioEx: '',
            playIconEx: '',
            SaveArrayAns: [],
            dataFirt: {},
            checktype: 'exam',
            indexOfQuestionHint: 0,
            countPressDetailHint: 0,
            countPressDetailHint1: 0,
            statusDetailHint: '',
            TextButtonDetainQuestionHint: 'Kiểm Tra',
            arrayWrong: [],
            arrayWrong1: [],
            titlePress: false,
            logid: '',
            data_lesson: {},
            locationY: 0,
            valueX: new Animated.Value(0),
            show: 0,
            showFullHint:false,
        };
        this.dataHint = [];
        this.hintData = [];
    }



    _Submit = async () => {
        this.props.hideFeedback();
        var ans = this.state.data.map((e,i)=>{
            return {
                exercise_type : 'grammar',
                question_type: '10',
                question_id: e.id,
                final_user_choice :this.state.ArrAnswer[i].ans,
                detail_user_turn: this.state.SaveArrayAns.map((a,ii)=>{
                    return {
                        num_turn:ii+1,
                        score: a.ans[i].status?1:0,
                        user_choice: a.ans[i].ans
                    }
                })
            }
        });
        this.props.saveLogLearning(ans);
    };

    _SaveArrayAns = () => {
        this.setState({
            SaveArrayAns:[...this.state.SaveArrayAns,{
                ans:JSON.parse(JSON.stringify(this.state.ArrAnswer))
            }]
        })
    };

    componentDidMount() {
        let dataNew = [];
        this.setState({isloading: true});
        this.setState({checktype: this.props.checkType});
        Keyboard.addListener('keyboardDidShow', () => this._showKeyBoad());
        Keyboard.addListener('keyboardDidHide', () => this._HideKeyBoad());
        let response = {};
        response['data'] = this.props.dataContent;
        this.setState({data_lesson: response});
        // this._postDataFirt(response.data);
        //console.log(response);
        this.setState({dataFirt: response.data});
        let arrayAnsBegin = [];
        this.dataHint = [];
        for (let i = 0; i < response.data.data_question.length; i += 1) {
            DataObject1 = new Object();
            this.setState({fileAudioEx: response.data.lesson.lesson_audio});
            DataObject1.question_id = response.data.data_question[i].question_id;
            ans = [];
            for (
                let j = 0;
                j < response.data.data_question[i].list_option.length;
                j += 1
            ) {
                console.log("=====match_option_text check",i,j)
                DataObject = new Object();
                DataObject.ans = '';
                DataObject.status = null;
                DataObject.statusHint = false;
                arrayAnsBegin.push(DataObject);
                DataObject2 = new Object();
                DataObject2.fileAudio = "";
                DataObject2.question =
                    response.data.data_question[i].list_option[j].question_content;
                DataObject2.answer = response.data.data_question[i].list_option[j].match_option_text[0];

                let ar = response.data.data_question[i].list_option[j].list_option_same === '' ? [] : JSON.parse(response.data.data_question[i].list_option[j].list_option_same);
                ar.push(response.data.data_question[i].list_option[j].match_option_text[0]);
                DataObject2.Listanswer = ar;
                console.log("=====match_option_text",response.data.data_question[i].list_option[j].match_option_text)
                DataObject2.explain = "";
                DataObject2.id = response.data.data_question[i].question_id
            }
            dataNew.push(DataObject2);
            this.dataHint.push(DataObject2.answer);
            this.hintData.push(response.data.data_question[i].list_option[0].question_content);
        }
        this.setState({ArrAnswer: arrayAnsBegin});
        this.setState({data: dataNew});
        //console.log('dataNew', dataNew);
        this.setState({isloading: false});
        this.props.saveLogLearning([]);
    }

    _showKeyBoad = () => {
        this.props.handleKeyboardShow(-(height / 4 - SmartScreenBase.smPercenHeight * 2));
    };
    _HideKeyBoad = () => {
        this.props.handleKeyboardHide();
    };

    _Loadding = () => {
        return (
            <View style={style.Loading}>
                <ActivityIndicator size="large" color="#0000ff"/>
            </View>
        );
    };

    _Onpress = () => {
        this.setState({titlePress: !this.state.titlePress});
    };
    _ListHint = () => {
        let index = this.state.ArrAnswer.findIndex(x => x.statusHint === false || x.statusHint === null);
        if (index === -1) {
            alert('ahihi');
        } else {
            this.setState({indexOfQuestionHint: index, statusScreen: 'ShowListDetailHind'});
        }

    };
    _ShowListDetailHind = () => {
        let arr = this.state.data[this.state.indexOfQuestionHint].question.split(' ');
        return (
            <View style={{width: width}}>
                <ScrollView style={{
                    height: SmartScreenBase.smPercenHeight * 55,
                    ...StyleLesson.question_content,
                    width: width * 0.9,
                    backgroundColor: '#FFF',
                    marginLeft: width * 0.05,
                    borderRadius: SmartScreenBase.smPercenWidth * 5,
                }}>
                    <View
                        style={{
                            alignItems: 'flex-start',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            zIndex: 0,
                            padding: SmartScreenBase.smPercenHeight,
                            width: width * 0.9,
                            marginTop: 10,
                        }}>
                        <Text
                            style={{fontWeight: 'bold', ...StyleLesson.question_text}}>{this.state.indexOfQuestionHint + 1}. </Text>
                        {arr.map((e, index, key) => {
                            return (
                                <View style={{}}>
                                    <TouchableOpacity
                                        onLongPress={() => LessonBase.goTranslate(e)}
                                        style={[stylesApp.txt, {zIndex: 0}]}>
                                        <Text style={{...StyleLesson.question_text}}>
                                            {e}{' '}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            );
                        })}
                        <View>
                            {this._OnShowWordHintDetail()}
                        </View>
                        <Text style={{fontWeight: 'bold', fontSize: 18}}>
                            TRẢ LỜI
                        </Text>
                        {
                            this.state.statusDetailHint === 'right' ?
                                <View
                                    style={
                                        (StyleLesson.Sty_View_Border,
                                            {
                                                borderWidth: SmartScreenBase.smPercenWidth / 2,
                                                borderColor: '#FF9933',
                                                width: width * 0.9 - 2 * SmartScreenBase.smPercenHeight,
                                                alignSelf: 'center',
                                                borderRadius: SmartScreenBase.smPercenWidth * 3,
                                                marginTop: SmartScreenBase.smPercenHeight * 2,
                                                height: SmartScreenBase.smPercenHeight * 15,
                                                padding: 2 * SmartScreenBase.smPercenHeight,
                                            })
                                    }>
                                    <ScrollView>
                                        <View style={{
                                            alignItems: 'flex-start',
                                            flexDirection: 'row',
                                            flexWrap: 'wrap',
                                            zIndex: 0,
                                            width: width * 0.9 - 6 * SmartScreenBase.smPercenHeight,
                                        }}>
                                            {this.state.ArrAnswer[this.state.indexOfQuestionHint].ans.split(' ').map((e, index, key) => {
                                                return (
                                                    <View style={{}}>
                                                        <View
                                                            style={[stylesApp.txt, {zIndex: 0}]}>
                                                            <Text style={{
                                                                ...StyleLesson.question_text,
                                                                color: '#72B228',
                                                            }}>
                                                                {e}{' '}
                                                            </Text>
                                                        </View>
                                                    </View>
                                                );
                                            })}
                                        </View>
                                    </ScrollView>
                                </View>
                                :
                                this.state.statusDetailHint === 'wrong' ?
                                    <View
                                        style={
                                            (StyleLesson.Sty_View_Border,
                                                {
                                                    borderWidth: SmartScreenBase.smPercenWidth / 2,
                                                    borderColor: '#FF9933',
                                                    width: width * 0.9 - 2 * SmartScreenBase.smPercenHeight,
                                                    alignSelf: 'center',
                                                    borderRadius: SmartScreenBase.smPercenWidth * 3,
                                                    marginTop: SmartScreenBase.smPercenHeight * 2,
                                                    height: SmartScreenBase.smPercenHeight * 15,
                                                    padding: 2 * SmartScreenBase.smPercenHeight,
                                                })
                                        }>
                                        <ScrollView>
                                            <View style={{
                                                alignItems: 'flex-start',
                                                flexDirection: 'row',
                                                flexWrap: 'wrap',
                                                zIndex: 0,
                                                width: width * 0.9 - 6 * SmartScreenBase.smPercenHeight,
                                            }}>
                                                {this.state.ArrAnswer[this.state.indexOfQuestionHint].ans.split(' ').map((e, index, key) => {
                                                    return (
                                                        <View style={{}}>
                                                            <TouchableOpacity
                                                                onLongPress={() => LessonBase.goTranslate(e)}
                                                                style={[stylesApp.txt, {zIndex: 0}]}>
                                                                <Text style={{
                                                                    ...StyleLesson.question_text,
                                                                    color: e === this.state.data[this.state.indexOfQuestionHint].answer.split(' ')[index] ? '#72B228' : '#D80B0B',
                                                                }}>
                                                                    {e}{' '}
                                                                </Text>
                                                            </TouchableOpacity>
                                                        </View>
                                                    );
                                                })}
                                            </View>
                                        </ScrollView>
                                    </View>
                                    :
                                    <View
                                        style={
                                            (StyleLesson.Sty_View_Border,
                                                {
                                                    borderWidth: SmartScreenBase.smPercenWidth / 2,
                                                    borderColor: '#FF9933',
                                                    width: width * 0.9 - 2 * SmartScreenBase.smPercenHeight,
                                                    alignSelf: 'center',
                                                    borderRadius: SmartScreenBase.smPercenWidth * 3,
                                                    marginTop: SmartScreenBase.smPercenHeight * 2,
                                                    height: SmartScreenBase.smPercenHeight * 15,
                                                })
                                        }>
                                        <TextInput
                                            style={[
                                                StyleLesson.question_text,
                                                {
                                                    margin: SmartScreenBase.smPercenHeight,
                                                    justifyContent: 'flex-start',
                                                },
                                            ]}
                                            placeholder={'Viết câu đúng ...'}
                                            multiline={true}
                                            onChangeText={text => {
                                                this._OnTextChange(text, this.state.indexOfQuestionHint);
                                            }}
                                        />
                                    </View>
                        }

                    </View>
                </ScrollView>
            </View>
        );
    };

    _ShowQuestion() {
        //console.log('_ShowQuestion',this.state.ArrAnswer)
        return (
            <View style={{width: width}}>
                <View
                    style={{
                        height: SmartScreenBase.smPercenHeight * 55,
                        width: width,
                        ...StyleLesson.question_content,
                    }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={this.state.data}
                        extraData={this.state.refresh}
                        keyExtractor={(item, index) => 'item' + index}
                        renderItem={this._RenderQuestion.bind(this)}
                    />
                </View>
            </View>
        );
    }

    _RenderQuestion = ({item, index}) => {
        //console.log(this.state.ArrAnswer)
        let arr = item.question.split(' ');
        return (
            <View style={style.RenderQuestionView}>
                <View
                    style={{
                        alignItems: 'flex-start',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        zIndex: 0,
                        padding: SmartScreenBase.smPercenHeight,
                        width: width * 0.9,
                    }}>
                    <Text style={{fontWeight: 'bold', fontSize: 15}}>{index + 1}. </Text>
                    {arr.map((e, index) => {
                        return (
                            <View style={{}} key={index}>
                                <TouchableOpacity
                                    onLongPress={() => LessonBase.goTranslate(e)}
                                    style={[stylesApp.txt, {zIndex: 0}]}>
                                    <Text style={{fontSize: SmartScreenBase.smPercenWidth * 4}}>
                                        {e}{' '}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </View>
                <View style={{marginBottom: SmartScreenBase.smPercenWidth*5,
                     flexDirection: 'row', alignItems: 'center',}}>
                    <Image
                        source={{uri: 'lesson_grammar_image1'}}
                        style={{
                            width: SmartScreenBase.smBaseWidth * 112,
                            height: SmartScreenBase.smBaseWidth * 112,
                            marginLeft: SmartScreenBase.smPercenHeight,
                            resizeMode: 'contain', marginRight: 2,
                        }}
                    />
                    <View style={{
                        flex:1,
                        flexDirection:'row',
                        alignItems:'center',
                        flexWrap:'wrap',
                        paddingLeft:SmartScreenBase.smPercenWidth
                    }}>
                        {/* <Text style={{fontWeight:'600',fontSize:SmartScreenBase.smFontSize*45}}>
                            {this.dataHint[index]}</Text> */}
                        {this.state.ArrAnswer[index].status === true ? (
                            <Text style={{fontStyle: 'italic',
                            color: '#8E1C76',
                            marginLeft:SmartScreenBase.smPercenWidth*2,
                            fontSize:SmartScreenBase.smFontSize*40}}>
                                {this.state.ArrAnswer[index].ans}
                            </Text>
                        ) : (
                            <TextInput
                                autoCorrect={false}
                                style={{
                                    borderBottomColor: '#00000050',
                                    borderBottomWidth: 0.5,
                                    fontStyle: 'italic',
                                    color: '#8E1C76',
                                    fontSize: SmartScreenBase.smFontSize * 45,
                                    marginLeft:SmartScreenBase.smPercenWidth*2,
                                    minWidth:SmartScreenBase.smPercenWidth*20
                                }}
                                placeholder={'Trả lời...'}
                                autoCapitalize={'sentences'}
                                multiline={true}
                                onChangeText={(text) => {
                                    this._OnTextChange(text, index);
                                }}
                            />
                        )}
                    </View>
                </View>
            </View>
        );
    };
    _onCheckAns = () => {
        let array = [...this.state.ArrAnswer];
        let checkListOp = this.state.data[this.state.indexOfQuestionHint].Listanswer.findIndex(items1 =>
            this._FunctionToReplaceQuestion(array[this.state.indexOfQuestionHint].ans.toLowerCase()) ===
            this._FunctionToReplaceQuestion(items1.toLowerCase()));
        if (
            checkListOp !== -1
        ) {
            array[this.state.indexOfQuestionHint].status = true;
        } else {
            array[this.state.indexOfQuestionHint].status = false;
        }
        this.setState({ArrAnswer: array});
    };

    _OnTextChange(text, index) {
        this.state.ArrAnswer[index].ans = text;
        this.forceUpdate();
        this._OnCheckNotNull(this.state.ArrAnswer);
        if (text != '') {
            this.setState({ showButton: true })
        }
        else {
            this.setState({ showButton: false })
        }
    }

    _OnCheckNotNull = (array) => {
        
        this.setState({showButton: 
            this.state.ArrAnswer.find(c=>!c.status&&!!c.ans ) != null
        });
    };
    _onCheckNumberRight = () => {
        let number = 0;
        const {data} = this.state;
        LogBase.log("=====this.state.ArrAnswer", this.state.ArrAnswer)
        this.state.ArrAnswer.forEach((e, i) => {
            if(!e.ans){
                e.ans = '';
            }
            const mAns = stringUtils.validWord(e.ans);
            LogBase.log("=====_onCheckNumberRight" +i, data[i])
            e.status = data[i].Listanswer.find(c => 
                stringUtils.validWord(c) === mAns) != null;
            if(e.status){
                number++;
            }
            else{
                e.rights = [];
                const arrAns = mAns.split(' ');
                let hints = [];
                for(let r of data[i].Listanswer){
                    hints = [];
                    e.rights = [];
                    const arrQ = stringUtils.validWord(r).split(' ');
                    const rr = r.split(' ');
                    arrQ.forEach((qq,ii)=>{
                        if(arrAns[ii]&&arrAns[ii]===qq){
                            e.rights.push({
                                text:qq,
                                show:true,
                                org: rr[ii]
                            })
                        }else{
                            hints.push(rr[ii]);
                        }
                    })
                    if(e.rights.length >0){
                        break;
                    }
                }
                for(let j =0; j < hints.length ; j++){
                    e.rights.push({
                        text:hints[j],
                        show : j<hints.length/2
                    })
                }
            }
        })
        this.setState({
            statusCheckRightOrFalse:number === data.length?'allRight':'NoAllRight',
            numberRightEx: number
        },()=>{
            if(number === data.length || this.state.numberDoExam>3)
                this.props.showFeedback();
        });
    };
    _reSetAns = () => {
        this.state.ArrAnswer.forEach((e, i) => {
            if(!e.status){
                e.ans = '';
            }
        })
        this.setState({ArrAnswer: [...this.state.ArrAnswer]});
    };
    _OnPressKT = () => {
        this.props.hideTypeExercise();
        this.setState({numberDoExam: this.state.numberDoExam + 1});
        if(this.state.statusScreen==='ShowHintDetailQuestion'){
            this.setState({
                showFullHint:true,
            });
        }
        this._onCheckNumberRight();
        this.setState({statusScreen: 'resultNotDone', showButton:false});
    };
    _OnPressLL = () => {
        if (this.state.numberDoExam < 2) {
            this.props.showTypeExercise();
            this._reSetAns();
            this.setState({statusScreen: 'question'});
        }  else if (this.state.numberDoExam < 4)  {
            this.props.showTypeExercise();
            this.setState({statusScreen: 'ShowHintDetailQuestion', showButton: false,});
        }else{
            //show last with answer
            // this.setState({
            //     statusScreen:'ShowHind'
            // })
            this._Submit()
        }
    };

    _ShowHintQuestion() {
        return (
            <View style={{width: width}}>
                <View
                    style={{
                        height: SmartScreenBase.smPercenHeight * 55,
                        width: width,
                        ...StyleLesson.question_content,
                    }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={this.state.data}
                        extraData={this.state.refresh}
                        keyExtractor={(item, index) => 'item' + index}
                        renderItem={this._ItemHintQuestion.bind(this)}
                    />
                </View>
            </View>
        );
    }

    _onPress = (index) => {
        this._ProcessWordHintDetailBegin(index);
        this.setState({indexOfQuestionHint: index});
        this.setState({statusScreen: 'ShowHintDetailQuestion'});
    };
    _ItemHintQuestion = ({item, index}) => {
        let arr = item.question.split(' ');
        return (
            <View style={style.RenderQuestionView}>
                <View
                    style={{
                        alignItems: 'flex-start',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        zIndex: 0,
                        padding: SmartScreenBase.smPercenHeight,
                        width: width * 0.9,
                        marginTop: 10,
                    }}>
                    <Text style={{fontWeight: 'bold', ...StyleLesson.question_text}}>{index + 1}. </Text>
                    {arr.map((e, index, key) => {
                        return (
                            <View style={{}}>
                                <TouchableOpacity
                                    onLongPress={() => LessonBase.goTranslate(e)}
                                    style={[stylesApp.txt, {zIndex: 0}]}>
                                    <Text style={{...StyleLesson.question_text}}>
                                        {e}{' '}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </View>
                <View style={{marginBottom: 5, flexDirection: 'row', alignItems: 'center'}}>
                    <Image
                        source={{uri: 'lesson_grammar_image1'}}
                        style={{
                            width: SmartScreenBase.smBaseWidth * 112,
                            height: SmartScreenBase.smBaseWidth * 112,
                            marginLeft: SmartScreenBase.smPercenHeight,
                            resizeMode: 'contain',
                            marginRight: 2,
                        }}
                    />
                    <View style={{width: width * 0.7, marginBottom: Platform.OS === 'ios' ? 20 : 0}}>
                        {this.state.ArrAnswer[index].status === true || this.state.ArrAnswer[index].status === false ? (
                            <View
                                style={{
                                    height: SmartScreenBase.smBaseWidth * 112,
                                    justifyContent: 'center',
                                    //alignItems: 'center',
                                }}>
                                <Text style={{fontStyle: 'italic', color: '#8E1C76', ...StyleLesson.question_text}}>
                                    {this.state.ArrAnswer[index].ans}
                                </Text>
                            </View>
                        ) : (
                            <TextInput
                                style={[
                                    {
                                        margin: SmartScreenBase.smPercenHeight,
                                        justifyContent: 'flex-start',
                                        borderBottomColor: '#00000050',
                                        borderBottomWidth: 0.5,
                                        fontStyle: 'italic',
                                        color: '#8E1C76',
                                        ...StyleLesson.question_text,
                                    },
                                ]}
                                placeholder={'Viết câu đúng ...'}
                                multiline={true}
                                onChangeText={(text) => {
                                    this._OnTextChange(text, index);
                                }}
                            />
                        )}
                    </View>
                </View>
                <View
                    style={{
                        position: 'absolute',
                        top: -SmartScreenBase.smBaseWidth * 30,
                        right: -SmartScreenBase.smBaseWidth * 5,
                    }}>
                    <TouchableOpacity
                        onPress={() => {
                            this.state.ArrAnswer[index].status === true || this.state.ArrAnswer[index].status === false ? null :
                                this._onPress(index);
                        }}>
                        <Image
                            source={{
                                uri:
                                    this.state.ArrAnswer[index].status === true
                                        ? 'grammar1_4'
                                        :
                                        this.state.ArrAnswer[index].status === false ?
                                            'lesson_grammar_image6' :
                                            'lesson_grammar_image5',
                            }}
                            style={StyleLesson.ImageHint}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    };
    _ProcessWordHintDetail = () => {
        let array = [];
        let arrayWrong = [...this.state.arrayWrong];
        arrayWrong = [];
        if (this.state.countPressDetailHint <= 1) {
            let answ = this.state.ArrAnswer[this.state.indexOfQuestionHint].ans.split(' ');
            this.state.data[this.state.indexOfQuestionHint].answer.split(' ').map((e, index, key) => {
                if (this.state.ArrAnswer[this.state.indexOfQuestionHint].ans) {
                    if (
                        !answ[index] ||
                        (this._FunctionToReplaceQuestion(e.toLowerCase()) !==
                            this._FunctionToReplaceQuestion(answ[index].toLowerCase()))
                    ) {
                        array.push(index);
                    }
                } else {
                    array.push(index);
                }
            });
            for (let i = 0; i < Math.ceil(array.length / 2); i++) {
                arrayWrong.unshift(array[i]);
            }
            this.state.data[this.state.indexOfQuestionHint].answer.split(' ').map((e, index, key) => {
                if (this.state.ArrAnswer[this.state.indexOfQuestionHint].ans) {
                    if (
                        answ[index] &&
                        (this._FunctionToReplaceQuestion(e.toLowerCase()) ===
                            this._FunctionToReplaceQuestion(answ[index].toLowerCase()))
                    ) {
                        arrayWrong.push(index);
                    }
                }
            });
            arrayWrong.sort();
        }
        // console.log('arrayWrong',arrayWrong);
        this.setState({arrayWrong: arrayWrong});
    };
    _ProcessWordHintDetail1 = () => {
        let array = [];
        let arrayWrong = [];
        this.state.data[this.state.indexOfQuestionHint].answer.split(' ').map((e, index, key) => {
            if (e !== this.state.ArrAnswer[this.state.indexOfQuestionHint].ans.split(' ')[index]) {
                array.push(index);
            }
        });
        if (this.state.countPressDetailHint1 === 0) {
            for (let i = Math.ceil(array.length / 2); i < array.length; i++) {
                arrayWrong.push(array[i]);
            }
        } else {
            arrayWrong = [];
        }
        this.setState({arrayWrong: arrayWrong});
    };
    _ProcessWordHintDetailBegin = (item) => {
        let array = [];
        let arrayWrong = [];
        this.state.data[item].answer.split(' ').map((e, index, key) => {
            if (e !== this.state.ArrAnswer[item].ans.split(' ')[index]) {
                array.push(index);
            }
        });
        if (this.state.countPressDetailHint === 0) {
            for (let i = Math.ceil(array.length / 2); i < array.length; i++) {
                arrayWrong.push(array[i]);
            }
        } else {
            arrayWrong = [];
        }
        this.setState({arrayWrong: arrayWrong});
    };
    _ProcessWordHintDetailBegin1 = (item) => {
        let array = [];
        let arrayWrong = [];
        this.state.data[item].answer.split(' ').map((e, index, key) => {
            if (e !== this.state.ArrAnswer[item].ans.split(' ')[index]) {
                array.push(index);
            }
        });
        if (this.state.countPressDetailHint1 === 0) {
            for (let i = Math.ceil(array.length / 2); i < array.length; i++) {
                arrayWrong.push(array[i]);
            }
        } else {
            arrayWrong = [];
        }
        this.setState({arrayWrong: arrayWrong});
    };
    _OnShowWordHintDetail = () => {
        let dataAnswer = this.state.data[this.state.indexOfQuestionHint].answer.split(' ');
        return (
            <View
                style={style.OnShowWordHintDetailView}>
                {
                    dataAnswer.map((e, index) => {
                        return (
                            this.state.arrayWrong.length
                                ?
                                this.state.arrayWrong.indexOf(index) !== -1 ?
                                    <View key={index}>
                                        <TouchableOpacity
                                            onLongPress={() => LessonBase.goTranslate(e)}
                                            style={[
                                                stylesApp.txt,
                                                style.Stylee,
                                            ]}>
                                            <Text style={{color: '#000', ...StyleLesson.question_text}}>{e}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    <View key={index}>
                                        <TouchableOpacity
                                            onLongPress={() => LessonBase.goTranslate(e)}
                                            style={[
                                                stylesApp.txt,
                                                style.Stylee,
                                            ]}>
                                            <Text style={{color: '#000', ...StyleLesson.question_text}}></Text>
                                        </TouchableOpacity>
                                    </View>
                                :
                                <View key={index}>
                                    <TouchableOpacity
                                        onLongPress={() => LessonBase.goTranslate(e)}
                                        style={[
                                            stylesApp.txt,
                                            style.Stylee,
                                        ]}>
                                        <Text style={{color: '#000',  ...StyleLesson.question_text}}>{e}</Text>
                                    </TouchableOpacity>
                                </View>
                        );
                    })
                }
            </View>
        );
    };
    _ShowHintDetailQuestion = () => {
        let arr = this.state.data[this.state.indexOfQuestionHint].question.split(' ');
        return (
            <View style={style.styleShowHintDetailQuestion}>
                <ScrollView style={{
                    width: width * 0.9,
                    backgroundColor: '#FFF',
                    marginLeft: width * 0.05,
                    borderRadius: 10,
                    marginTop: 30,
                }}>
                    <View style={{
                        alignItems: 'flex-start',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        zIndex: 0,
                        padding: SmartScreenBase.smPercenHeight,
                        width: width * 0.9,
                        marginTop: 10,
                    }}>
                        <Text style={{fontWeight: 'bold', fontSize: 15}}>{this.state.indexOfQuestionHint + 1}. </Text>
                        {arr.map((e, index, key) => {
                            return (
                                <View style={{}} key={key}>
                                    <TouchableOpacity
                                        onLongPress={() => LessonBase.goTranslate(e)}
                                        style={[stylesApp.txt, {zIndex: 0}]}>
                                        <Text style={{fontSize: SmartScreenBase.smPercenWidth * 4}}>
                                            {e}{' '}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            );
                        })}
                    </View>
                    <Text style={{fontWeight: 'bold', fontSize: 18, paddingLeft: SmartScreenBase.smPercenWidth * 3}}>
                        TRẢ LỜI
                    </Text>
                    {
                        this.state.show > 1 ?
                            <View>
                                {this._OnShowWordHintDetail()}
                            </View>
                            : null
                    }
                    <View
                        style={
                            (StyleLesson.Sty_View_Border,
                                {
                                    borderWidth: SmartScreenBase.smPercenWidth / 2,
                                    borderColor: '#FF9933',
                                    width: SmartScreenBase.smPercenWidth * 85,
                                    alignSelf: 'center',
                                    borderRadius: SmartScreenBase.smPercenWidth * 3,
                                    marginTop: SmartScreenBase.smPercenHeight * 2,
                                    height: SmartScreenBase.smPercenHeight * 15,
                                    padding: 10,
                                })
                        }>
                        <View
                            style={{
                                position: 'absolute',
                                top: -SmartScreenBase.smBaseWidth * 80,
                                right: 0,
                            }}>
                            <Image
                                source={{
                                    uri:
                                        this.state.statusDetailHint === 'right'
                                            ? 'grammar1_4'
                                            : this.state.statusDetailHint === 'wrong'
                                            ? 'grammar1_3'
                                            : '',
                                }}
                                style={{
                                    width: SmartScreenBase.smBaseWidth * 120,
                                    height: SmartScreenBase.smBaseWidth * 120,
                                    resizeMode: 'contain',
                                }}
                            />
                        </View>
                        {
                            this.state.statusDetailHint === 'right' || this.state.statusDetailHint === 'wrong'
                                ?
                                <View style={{
                                    flexDirection: 'row',
                                    flexWrap: 'wrap',
                                    zIndex: 0,
                                    // width: width * 0.7,
                                    flex: 1
                                }}>
                                    <View>
                                        {this.state.statusDetailHint === 'right' && <FileSound4 showImage={'true'}/>}
                                    </View>
                                    <View>
                                        {this.state.statusDetailHint === 'wrong' && <FileSound4 showImage={'false'}/>}
                                    </View>
                                    {this.state.ArrAnswer[this.state.indexOfQuestionHint].ans.split(' ').map((e, index, key) => {
                                        return (
                                            <View style={{}}>
                                                <TouchableOpacity
                                                    onLongPress={() => LessonBase.goTranslate(e)}
                                                    style={{zIndex: 0}}>
                                                    <Text style={{
                                                        color: '#000',
                                                        ...StyleLesson.question_text,
                                                    }}>
                                                        {e}{' '}
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        );
                                    })}
                                </View>
                                :
                                <TextInput
                                    ref={refs => this.input = refs}
                                    style={{
                                        ...StyleLesson.question_text,
                                    }}
                                    placeholder={'Trả lời  ...'}
                                    multiline={true}
                                    onChangeText={text => {
                                        this._OnTextChange(text, this.state.indexOfQuestionHint);
                                    }}
                                />
                        }
                    </View>
                </ScrollView>
            </View>
        );
    };

    _ShowHintDetailQuestion2 = () => {
        return (
            <View style={{ width: width }}>
                <View style={{
                    height: SmartScreenBase.smPercenHeight * 55,
                    width: width,
                    ...StyleLesson.question_content
                }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={this.state.data}
                        extraData={this.state.refresh}
                        keyExtractor={(item, index) => 'item' + index}
                        renderItem={this._ItemHintQuestion2.bind(this)}
                    />
                </View>
            </View>
        )
    };

    _ItemHintQuestion2 = ({ item, index }) => {
        let arr = item.question.split(' ');
        const my_ans = this.state.ArrAnswer[index];

        return (
            <View style={{
                width: width * 0.9,
                backgroundColor: '#FFF',
                borderRadius: 10,
                marginLeft: width * 0.05,
                marginTop: 10,
                position: 'relative'
            }}>
                {
                    my_ans.status&&<Image
                    source={{
                        uri:'grammar1_4'
                    }}
                    style={{
                        width: SmartScreenBase.smBaseWidth * 120,
                        height: SmartScreenBase.smBaseWidth * 120,
                        resizeMode: 'contain',
                        position:'absolute',
                        right:-SmartScreenBase.smBaseWidth * 30,
                        top:-SmartScreenBase.smBaseWidth * 30,
                        zIndex:99
                    }}
                    />
                }
                <View
                    style={{
                        alignItems: 'flex-start',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        zIndex: 0,
                        padding: SmartScreenBase.smPercenHeight,
                        width: SmartScreenBase.smPercenWidth*80,
                    }}>
                    <Text style={{fontWeight: 'bold', fontSize: 15}}>{index + 1}. </Text>
                    {arr.map((e, index) => {
                        return (
                            <View style={{}} key={index}>
                                <TouchableOpacity
                                    onLongPress={() => LessonBase.goTranslate(e)}
                                    style={[stylesApp.txt, {zIndex: 0}]}>
                                    <Text style={{fontSize: SmartScreenBase.smPercenWidth * 4}}>
                                        {e}{' '}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </View>
                {
                    !my_ans.status&&!!my_ans.rights&&my_ans.rights.length>0&&<View 
                    style={{flexDirection:'row',flexWrap:'wrap',marginBottom:SmartScreenBase.smPercenWidth*3}}>
                            {
                                my_ans.rights.map((c,i)=><TouchableOpacity
                                    style={{backgroundColor:'#FF9933',
                                    paddingVertical:SmartScreenBase.smPercenWidth*2,
                                    paddingHorizontal:SmartScreenBase.smPercenWidth*4,
                                    marginHorizontal:SmartScreenBase.smPercenWidth*1,
                                    marginTop:SmartScreenBase.smPercenWidth*2,
                                    borderRadius:SmartScreenBase.smPercenWidth*3,
                                }}
                                key={i}>
                                <Text style={{ color: (c.show || this.state.showFullHint) ? Colors.Black : Colors.Transparent, fontSize: SmartScreenBase.smFontSize * 40 }}>{c.text}</Text>
                            </TouchableOpacity>)
                        }
                    </View>
                }
                <View style={{marginBottom: SmartScreenBase.smPercenWidth*5,
                     flexDirection: 'row', alignItems: 'center',}}>
                    <Image
                        source={{ uri: 'lesson_grammar_image1' }}
                        style={{
                            width: SmartScreenBase.smBaseWidth * 112,
                            height: SmartScreenBase.smBaseWidth * 112,
                            marginLeft: SmartScreenBase.smPercenHeight,
                            resizeMode: 'contain', marginRight: 2,
                        }}
                    />
                    <View style={{
                        flex: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        flexWrap: 'wrap',
                        paddingLeft: SmartScreenBase.smPercenWidth
                    }}>
                        {/* <Text style={{fontWeight:'600',fontSize:SmartScreenBase.smFontSize*45}}>
                            {this.dataHint[index]}</Text> */}
                        {this.state.ArrAnswer[index].status === true ? (
                            <Text style={{fontStyle: 'italic',
                            color: '#8E1C76',
                            marginLeft:SmartScreenBase.smPercenWidth*2,
                            fontSize:SmartScreenBase.smFontSize*40}}>
                                {this.state.ArrAnswer[index].ans}
                            </Text>
                        ) : (
                            <TextInput
                                autoCorrect={false}
                                style={{
                                    borderBottomColor: '#00000050',
                                    borderBottomWidth: 0.5,
                                    fontStyle: 'italic',
                                    color: '#8E1C76',
                                    fontSize: SmartScreenBase.smFontSize * 45,
                                    marginLeft:SmartScreenBase.smPercenWidth*2,
                                    minWidth:SmartScreenBase.smPercenWidth*20
                                }}
                                placeholder={'Trả lời...'}
                                autoCapitalize={'sentences'}
                                multiline={true}
                                onChangeText={(text) => {
                                    this._OnTextChange(text, index);
                                }}
                            />
                        )}
                    </View>
                </View>
            </View>
        )
    }

    _ShowResultNotDone = () => {
        const isRight = this.state.numberRightEx === this.state.data.length;
        const isIcon = isRight || this.state.numberDoExam > 3;
        return (
            <View style={{width: width}}>
                <View style={{
                    height: SmartScreenBase.smPercenHeight * (isIcon?13:1),
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: SmartScreenBase.smPercenHeight * 2,
                }}>
                    <FileSound 
                        showIcon={!isIcon?'none':null}
                        showImage={isRight ? 'true' : 'false'}/>
                </View>
                <View style={{width, alignItems: 'center'}}>
                    <Text style={StyleLesson.text_answer}>
                        BẠN ĐÃ TRẢ LỜI ĐÚNG {this.state.numberRightEx}/
                        {this.state.data.length}
                    </Text>
                </View>
                <View
                    style={{
                        height: SmartScreenBase.smPercenHeight * (isIcon?50:62),
                        width: width,
                        marginBottom: SmartScreenBase.smPercenHeight * 3,
                        //backgroundColor:'green'
                    }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={this.state.data}
                        extraData={this.state.refresh}
                        keyExtractor={(item, index) => 'item' + index}
                        renderItem={this.state.statusCheckRightOrFalse !== 'allRight' ? this._ItemResultNotDone.bind(this) : this._ItemResultNotDoneAllRight.bind(this)}
                    />
                </View>
            </View>
        );
    };
    _ItemResultNotDone = ({item, index}) => {
        let arr = item.question.split(' ');
        const myAns = this.state.ArrAnswer[index];
        return (
            <View
                style={{
                    width: width * 0.9,
                    backgroundColor: '#FFF',
                    borderRadius: 10,
                    marginLeft: width * 0.05,
                    marginTop: 50,
                    borderColor: myAns.status?'#72B228':'#D80B0B',
                    borderWidth: 3,
                    paddingBottom:SmartScreenBase.smPercenWidth*2
                }}>
                <View
                    style={{
                        alignSelf: 'center',
                        position: 'absolute',
                        top: -SmartScreenBase.smBaseWidth * 80,
                    }}>
                    <Image
                        source={{
                            uri:myAns.status?'grammar1_4':'grammar1_3'
                        }}
                        style={{
                            width: SmartScreenBase.smBaseWidth * 120,
                            height: SmartScreenBase.smBaseWidth * 120,
                            resizeMode: 'contain',
                        }}
                    />
                </View>
                <View
                    style={{
                        alignItems: 'flex-start',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        zIndex: 0,
                        padding: SmartScreenBase.smPercenHeight,
                        width: width * 0.9,
                        marginTop: 10,
                    }}>
                    <Text style={{fontWeight: 'bold', ...StyleLesson.question_text}}>{index + 1}. </Text>
                    {arr.map((e, index) => {
                        return (
                            <View style={{}} key={index}>
                                <TouchableOpacity
                                    onLongPress={() => LessonBase.goTranslate(e)}
                                    style={[stylesApp.txt, {zIndex: 0}]}>
                                    <Text
                                        style={{
                                            ...StyleLesson.question_text,
                                            fontWeight: 'bold',
                                        }}>
                                        {e}{' '}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </View>
                <View style={{flexDirection: 'row'}}>
                    <Image
                        source={{uri: 'lesson_grammar_image1'}}
                        style={{
                            width: SmartScreenBase.smBaseWidth * 112,
                            height: SmartScreenBase.smBaseWidth * 112,
                            marginLeft: SmartScreenBase.smPercenHeight,
                            resizeMode: 'contain',
                            marginRight: 2,
                        }}
                    />
                    <View style={{width: width * 0.7, marginBottom: 20}}>
                        <View
                            style={{
                                height: SmartScreenBase.smBaseWidth * 112,
                                justifyContent: 'center',
                                // alignItems: 'center',
                            }}>
                            <Text style={{
                                fontStyle: 'italic',
                                color: myAns.status?'#72B228':'#D80B0B',...StyleLesson.question_text,
                            }}>
                                {`${myAns.ans.replace(/\n/g, ' ')}`}
                            </Text>
                        </View>
                    </View>
                </View>
                {
                        !myAns.status&&this.state.numberDoExam>3&&<View
                        style={{
                                //height: SmartScreenBase.smBaseWidth * 112,
                                width: width * 0.75,
                                flexDirection: 'row',
                                alignItems: 'center',
                                paddingHorizontal:SmartScreenBase.smPercenWidth*2,
                                paddingBottom:SmartScreenBase.smPercenWidth*2,
                            }}>
                            <Image
                                source={{uri: 'lesson_grammar_image3'}}
                                style={{
                                    width: SmartScreenBase.smBaseWidth * 112,
                                    height: SmartScreenBase.smBaseWidth * 112,
                                    resizeMode: 'contain',
                                }}
                            />
                            <Text style={{marginLeft: 5, color: '#72B228', ...StyleLesson.answer_text}}>
                                {`${this.dataHint[index]}`}
                            </Text>
                        </View>
                    }
            </View>
        );
    };
    _ItemResultNotDoneAllRight = ({item, index}) => {
        let arr = item.question.split(' ');
        const my_ans = this.state.ArrAnswer[index];

        return (
            <View
                style={{
                    width: width * 0.9,
                    backgroundColor: '#FFF',
                    borderRadius: 10,
                    marginLeft: width * 0.05,
                    marginTop: 50,
                    borderColor: my_ans.status?'#72B228':'#D80B0B',
                    borderWidth: 3,
                }}>
                <View
                    style={{
                        alignSelf: 'center',
                        position: 'absolute',
                        top: -SmartScreenBase.smBaseWidth * 80,
                    }}>
                    <Image
                        source={{
                            uri:my_ans.status?'grammar1_4':'grammar1_3'
                        }}
                        style={{
                            width: SmartScreenBase.smBaseWidth * 120,
                            height: SmartScreenBase.smBaseWidth * 120,
                            resizeMode: 'contain',
                        }}
                    />
                </View>
                <View
                    style={{
                        alignItems: 'flex-start',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        zIndex: 0,
                        padding: SmartScreenBase.smPercenHeight,
                        width: width * 0.9,
                        marginTop: 10,
                    }}>
                    <Text style={{fontWeight: 'bold', ...StyleLesson.question_text}}>{index + 1}. </Text>
                    {arr.map((e, index, key) => {
                        return (
                            <View style={{}}>
                                <TouchableOpacity
                                    onLongPress={() => LessonBase.goTranslate(e)}
                                    style={[stylesApp.txt, {zIndex: 0}]}>
                                    <Text
                                        style={{
                                            ...StyleLesson.question_text,
                                            fontWeight: 'bold',
                                        }}>
                                        {e}{' '}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </View>
                {this._ShowScriptItem(index)}
            </View>
        );
    };
    _ShowResultDone = () => {
        const isRight = this.state.numberRightEx === this.state.data.length;
        return (
            <View style={{
                width: width,
            }}>
                <View style={{
                    height: SmartScreenBase.smPercenHeight * (isRight?15:1),
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: SmartScreenBase.smPercenHeight * 5,
                    marginBottom: SmartScreenBase.smPercenHeight * 4,
                }}>
                    <FileSound 
                        // showIcon={!isRight?'none':null}
                        showImage={isRight ? 'true' : 'false'}/>
                </View>
                <View style={{width, alignItems: 'center'}}>
                    <Text style={StyleLesson.text_answer}>
                        BẠN ĐÃ TRẢ LỜI ĐÚNG {this.state.numberRightEx}/
                        {this.state.data.length}
                    </Text>
                </View>
                <View
                    style={{
                        height: SmartScreenBase.smPercenHeight * (isRight?40:54),
                        width: width,
                        marginBottom: SmartScreenBase.smPercenHeight * 3,
                    }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        data={this.state.data}
                        extraData={this.state.refresh}
                        keyExtractor={(item, index) => 'item' + index}
                        renderItem={this._ItemResultDone.bind(this)}
                    />
                </View>
            </View>
        );
    };
    _ShowScriptItem = (index) => {
        let checkListOp = this.state.data[index].Listanswer.findIndex(items1 =>
            this._FunctionToReplaceQuestion(this.state.ArrAnswer[index].ans.toLowerCase()) ===
            this._FunctionToReplaceQuestion(items1.toLowerCase()));
        return (
            <View
                style={{
                    width,
                    marginLeft: SmartScreenBase.smPercenHeight,
                    flexDirection: 'row',
                    marginBottom: 10,
                }}>
                {
                    this.state.ArrAnswer[index] === ''
                        ?
                        <View
                            style={{
                                margin: SmartScreenBase.smPercenHeight,
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                            <Image
                                source={{uri: 'lesson_grammar_image3'}}
                                style={{
                                    width: SmartScreenBase.smBaseWidth * 50,
                                    height: SmartScreenBase.smBaseWidth * 50,
                                    resizeMode: 'contain',
                                }}
                            />
                            <Text
                                style={[
                                    ...StyleLesson.answer_text,
                                    {
                                        marginLeft: SmartScreenBase.smPercenWidth * 5,
                                        fontStyle: 'italic',
                                        color: '#72B228',
                                        fontSize: SmartScreenBase.smPercenWidth * 4,
                                    },
                                ]}>
                                {this.state.ArrAnswer[index].ans}
                            </Text>
                        </View>
                        : checkListOp !== -1
                        ?
                        <View style={{flexDirection: 'row'}}>
                            <Image
                                source={{
                                    uri: 'lesson_grammar_image1',
                                }}
                                style={{
                                    width: SmartScreenBase.smBaseWidth * 112,
                                    height: SmartScreenBase.smBaseWidth * 112,
                                    resizeMode: 'contain',
                                    marginRight: 2,
                                }}
                            />
                            <View
                                style={{
                                    //height: SmartScreenBase.smBaseWidth * 112,
                                    width: width * 0.75,
                                    flexWrap: 'wrap',
                                    alignItems: 'flex-start',
                                    justifyContent: 'center',
                                }}>
                                <Text style={{marginLeft: 5, color: '#72B228', ...StyleLesson.answer_text}}>
                                    {this.state.ArrAnswer[index].ans}
                                </Text>
                            </View>
                        </View>
                        :
                        <View>
                            <View
                                style={{
                                    width: width * 0.75,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                <View style={{
                                    width: SmartScreenBase.smBaseWidth * 112,
                                    height: SmartScreenBase.smBaseWidth * 112,
                                }}>

                                </View>

                                <Text style={{marginLeft: 5, color: '#D80B0B', ...StyleLesson.answer_text}}>
                                    {this.state.ArrAnswer[index].ans}
                                </Text>
                            </View>
                            <View
                                style={{
                                    //height: SmartScreenBase.smBaseWidth * 112,
                                    width: width * 0.75,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                <Image
                                    source={{uri: 'lesson_grammar_image3'}}
                                    style={{
                                        width: SmartScreenBase.smBaseWidth * 112,
                                        height: SmartScreenBase.smBaseWidth * 112,
                                        resizeMode: 'contain',
                                    }}
                                />
                                <Text style={{marginLeft: 5, color: '#72B228', ...StyleLesson.answer_text}}>
                                    {this.state.data[index].answer}
                                </Text>
                            </View>

                        </View>
                }

            </View>
        );
    };
    _ItemResultDone = ({item, index}) => {
        
        const myAns = this.state.ArrAnswer[index]; 
        return (
            <View
                style={{
                    width: width * 0.9,
                    backgroundColor: '#FFF',
                    borderWidth: 2,
                    borderColor:myAns.status?'#72B228':'#D80B0B',
                    borderRadius: 10,
                    marginLeft: width * 0.05,
                    marginTop: 50,
                }}>
                <View
                    style={{
                        alignSelf: 'center',
                        position: 'absolute',
                        top: -SmartScreenBase.smBaseWidth * 80,
                    }}>
                    <Image
                        source={{
                            uri:myAns.status?'grammar1_4':'grammar1_3'
                        }}
                        style={{
                            width: SmartScreenBase.smBaseWidth * 120,
                            height: SmartScreenBase.smBaseWidth * 120,
                            resizeMode: 'contain',
                        }}
                    />
                </View>
                <View
                    style={{
                        alignItems: 'flex-start',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        zIndex: 0,
                        padding: SmartScreenBase.smPercenHeight,
                        width: width * 0.9,
                        marginTop: SmartScreenBase.smPercenHeight,
                    }}>
                    <Text style={{...StyleLesson.question_text}}>
                        <Text style={{fontWeight: 'bold', ...StyleLesson.question_text}}>{index + 1}. </Text>
                        {this.state.data[index].question === ''
                            ? ''
                            : this.state.data[index].question}
                    </Text>
                </View>
                {this._ShowScriptItem(index)}
            </View>
        );
    };

    _OnShowScript() {
        this.setState({showScript: !this.state.showScript});
    }

    _OnPressBack() {
        this.props.prevReviewResult();
    }

    _OnPressCheckDetailHintQuesstion = () => {
        this.setState({show: this.state.show + 1});
        if (this.state.TextButtonDetainQuestionHint === 'Kiểm Tra') {
            // this._onCheckAns();
            let checkListOp = false;
            this.state.data[this.state.indexOfQuestionHint].Listanswer.forEach((item, index) => {
                if (this._FunctionToReplaceQuestion(this.state.ArrAnswer[this.state.indexOfQuestionHint].ans.toLowerCase()) ===
                    this._FunctionToReplaceQuestion(item.toLowerCase())) {
                    checkListOp = true;
                    return false;
                }
            });
            // let checkListOp = this.state.data[this.state.indexOfQuestionHint].Listanswer.findIndex(items1 =>
            //     this._FunctionToReplaceQuestion(this.state.ArrAnswer[this.state.indexOfQuestionHint].ans.toLowerCase()) ===
            //     this._FunctionToReplaceQuestion(items1.toLowerCase()));
            if (checkListOp) {
                let arr = [...this.state.ArrAnswer];
                this.setState({ countPressDetailHint: 0 });
                arr[this.state.indexOfQuestionHint].statusHint = true;
                this.setState({ArrAnswer: arr});
                this.setState({ statusDetailHint: 'right' });
                this.setState({ TextButtonDetainQuestionHint: 'Tiếp Tục', showButton: true });

                let number = 0;
                for(let i = 0; i < this.state.ArrAnswer.length; i++){
                    if(this.state.ArrAnswer[i] !== ''){
                        let check = this.state.data[i].Listanswer.findIndex(item => 
                            this._FunctionToReplaceQuestion(this.state.ArrAnswer[i].ans.toLowerCase()) ===
                            this._FunctionToReplaceQuestion(item.toLowerCase()));
                        if(check !== -1){
                            number++
                            arr[i].status = true;
                            arr[i].statusHint = true;
                        }
                    }
                }
                this.setState({ArrAnswer: arr});
                if (number === this.state.data.length) {
                    this.setState({ statusCheckRightOrFalse: 'allRight' });
                } else {
                    this.setState({ statusCheckRightOrFalse: 'NoAllRight' });
                }
                
                this.setState({numberRightEx: number});
            } else {
                if (this.state.countPressDetailHint === 1 && this.state.data[this.state.indexOfQuestionHint].answer.split(' ').length <= 1) {
                    let arr = [...this.state.ArrAnswer];
                    arr[this.state.indexOfQuestionHint].statusHint = true;
                    this.setState({countPressDetailHint: 0});
                    this.setState({ArrAnswer: arr});
                    this.setState({statusDetailHint: 'wrong'});
                    this.setState({TextButtonDetainQuestionHint: 'Tiếp Tục', showButton: true});
                } else if (this.state.countPressDetailHint < 2) {
                    this.setState({countPressDetailHint: this.state.countPressDetailHint + 1});
                    this.setState({statusDetailHint: 'wrong'});
                    this.setState({TextButtonDetainQuestionHint: 'Làm Lại', showButton: true});
                } else {
                    let arr = [...this.state.ArrAnswer];
                    arr[this.state.indexOfQuestionHint].statusHint = true;
                    this.setState({countPressDetailHint: 0});
                    this.setState({ArrAnswer: arr});
                    this.setState({statusDetailHint: 'wrong'});
                    this.setState({TextButtonDetainQuestionHint: 'Tiếp Tục', showButton: true});
                }
            }
        } else if (this.state.TextButtonDetainQuestionHint === 'Tiếp Tục') {
            let arr = [...this.state.ArrAnswer];
            arr[this.state.indexOfQuestionHint].statusHint = true;
            this.setState({ArrAnswer: arr});
            let indexOf = this.state.indexOfQuestionHint + 1;
            let c = true;
            while (c) {
                if (listSuccess.indexOf(indexOf) === -1) {
                    c = false;
                } else {
                    indexOf++;
                }
                if (indexOf > this.state.data.length) {
                    c = false;
                }
            }
            if (indexOf < this.state.data.length) {
                this.setState({show: 0});
                this.setState({statusDetailHint: ''});
                this.setState({countPressDetailHint: 0});
                this.setState({
                    TextButtonDetainQuestionHint: 'Kiểm Tra',
                    showButton: false,
                    indexOfQuestionHint: indexOf,
                });
            } else {
                this.props.hideTypeExercise();
                this.setState({statusScreen: 'resultDone', showButton: true});
            }
        } else if (this.state.TextButtonDetainQuestionHint === 'Làm Lại') {
            if (this.state.countPressDetailHint <= 2) {
                this._ProcessWordHintDetail();
                this.setState({TextButtonDetainQuestionHint: 'Kiểm Tra', showButton: false});
                this.setState({statusDetailHint: ''});
                let arr = [...this.state.ArrAnswer];
                arr[this.state.indexOfQuestionHint].ans = '';
                this.setState({ArrAnswer: arr});
            }
        }
    };
    _FunctionToReplaceQuestion = (Text) => {
        if (Text !== '' && Text !== null && Text !== undefined) {
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
    _OnPressCheckDetailHintQuesstion1 = () => {
        let index = this.state.ArrAnswer.findIndex(x => x.statusHint === null || x.statusHint === false);
        this.setState({indexOfQuestionHint: index});
        if (this.state.TextButtonDetainQuestionHint === 'Kiểm Tra') {
            this._onCheckAns();
            if (this._FunctionToReplaceQuestion(this.state.ArrAnswer[this.state.indexOfQuestionHint].ans.toLowerCase()) === this._FunctionToReplaceQuestion(this.state.data[index].answer.toLowerCase())) {
                let arr = [...this.state.ArrAnswer];
                this.setState({countPressDetailHint1: 0});
                arr[this.state.indexOfQuestionHint].statusHint = true;
                this.setState({ArrAnswer: arr});
                this.setState({statusDetailHint: 'right'});
                this.setState({TextButtonDetainQuestionHint: 'Tiếp Tục'});
            } else {
                if (this.state.countPressDetailHint1 < 1) {
                    this.setState({countPressDetailHint1: this.state.countPressDetailHint1 + 1});
                    this.setState({statusDetailHint: 'wrong'});
                    this.setState({TextButtonDetainQuestionHint: 'Làm Lại'});
                } else {
                    let arr = [...this.state.ArrAnswer];
                    arr[this.state.indexOfQuestionHint].statusHint = true;
                    this.setState({countPressDetailHint1: 0});
                    this.setState({ArrAnswer: arr});
                    this.setState({statusDetailHint: 'wrong'});
                    this.setState({TextButtonDetainQuestionHint: 'Tiếp Tục'});
                }
            }
        } else if (this.state.TextButtonDetainQuestionHint === 'Tiếp Tục') {
            let index1 = this.state.ArrAnswer.findIndex(x => x.statusHint === null || x.statusHint === false);
            if (index1 === -1) {
                this.setState({statusScreen: 'ShowHind'});
            } else {
                this._ProcessWordHintDetailBegin1(index);
                this.setState({statusDetailHint: ''});
                this.setState({TextButtonDetainQuestionHint: 'Kiểm Tra'});
            }
        } else if (this.state.TextButtonDetainQuestionHint === 'Làm Lại') {
            if (this.state.countPressDetailHint1 <= 1) {
                this._ProcessWordHintDetail1();
                //this.setState({countPressDetailHint:this.state.countPressDetailHint+1});
                this.setState({TextButtonDetainQuestionHint: 'Kiểm Tra'});
                this.setState({statusDetailHint: ''});
                let arr = [...this.state.ArrAnswer];
                arr[this.state.indexOfQuestionHint].ans = '';
                this.setState({ArrAnswer: arr});
            } else {
            }
        }
    };
    _onPressCheckListHint = (index) => {
        this._OnPressKT();
        this._SaveArrayAns();
        //this._onCheckAns();
        this.props.showFeedback();
        this.setState({statusScreen: 'resultDone'});
    };

    render() {
        return (
            <Animated.View
                onStartShouldSetResponder={() => Keyboard.dismiss()}
                style={{bottom: this.state.locationY < 2 ? this.state.valueX : this.state.valueY}}>
                {this.state.isloading === true ? this._Loadding() : null}
                {/* {this.state.showWeb === true ? this._showWebView() : null} */}
                {this.state.statusScreen === 'question'
                    ? this._ShowQuestion()
                    : this.state.statusScreen === 'resultNotDone'
                        ? this._ShowResultNotDone()
                        : this.state.statusScreen === 'ShowHind'
                            ? this._ShowHintQuestion()
                            : this.state.statusScreen === 'resultDone'
                                ? this._ShowResultDone() :
                                this.state.statusScreen === 'ShowHintDetailQuestion' ?
                                    this._ShowHintDetailQuestion2()
                                    : this.state.statusScreen === 'ShowListDetailHind' ?
                                    this._ShowListDetailHind()
                                    : null}
                {
                    this.state.checktype === 'afterTest' ?
                        <View
                            style={{
                                width: width,
                                height: height * 0.1,
                                justifyContent: 'center',
                                alignItems: 'center',
                                flexDirection: 'row',
                            }}>
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
                                <Text style={stylesApp.Sty_Text_Button}>Back</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    this._ShowScript();
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
                                    this.props.nextReviewResult();
                                    //this._OnPressCheckResuilt();
                                }}
                                style={[
                                    stylesApp.Sty_Button,
                                    {
                                        width: SmartScreenBase.smPercenWidth * 10,
                                        marginRight: SmartScreenBase.smPercenWidth * 5,
                                    },
                                ]}>
                                <Text style={stylesApp.Sty_Text_Button}>TIẾP TỤC</Text>
                            </TouchableOpacity>
                        </View>
                        : null
                }
                {
                    this.state.checktype === 'exam' ? (
                        <View
                            style={{
                                width: width,
                                height: height * 0.1,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            {this.state.statusScreen === 'question' ? (
                                this.state.showButton === true ?
                                    <TouchableOpacity
                                        onPress={() => {
                                            this._OnPressKT();
                                            this._SaveArrayAns();
                                        }}
                                        style={stylesApp.Sty_Button}>
                                        <Text style={stylesApp.Sty_Text_Button}>KIỂM TRA</Text>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity
                                        style={stylesApp.Sty_Button_disable}>
                                        <Text style={stylesApp.Sty_Text_Button}>KIỂM TRA</Text>
                                    </TouchableOpacity>
                            ) : this.state.statusScreen === 'resultNotDone' ? (
                                this.state.statusCheckRightOrFalse === 'allRight' ? (
                                    <View style={{flexDirection: 'row'}}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                this._Submit();
                                                //this._OnPressToCheck();
                                            }}
                                            style={stylesApp.Sty_Button}>
                                            <Text style={stylesApp.Sty_Text_Button}>TIẾP TỤC</Text>
                                        </TouchableOpacity>
                                    </View>
                                ) : (
                                    <TouchableOpacity
                                        onPress={() => {
                                            this._OnPressLL();
                                            // console.log(this.state.ArrAnswer)
                                        }}
                                        style={stylesApp.Sty_Button}>
                                        <Text style={stylesApp.Sty_Text_Button}>{this.state.numberDoExam>3 ?'TIẾP TỤC': 'LÀM LẠI'}</Text>
                                    </TouchableOpacity>
                                )
                            ) : this.state.statusScreen === 'ShowHind' ? (
                                <TouchableOpacity
                                    onPress={() => {
                                        let number = 0;
                                        let copyArray = [...this.state.ArrAnswer];
                                        for (let i = 0; i < this.state.ArrAnswer.length; i++) {
                                            let checkListOp = this.state.data[i].Listanswer.findIndex(items =>
                                                this._FunctionToReplaceQuestion(this.state.ArrAnswer[i].ans.toLowerCase()) ===
                                                this._FunctionToReplaceQuestion(items.toLowerCase()));
                                            if (this.state.ArrAnswer[i] !== '') {
                                                if (
                                                    checkListOp !== -1
                                                ) {
                                                    number++;
                                                    copyArray[i].status = true;
                                                    copyArray[i].statusHint = true;
                                                }
                                            }
                                        }
                                        this.setState({ArrAnswer: copyArray});
                                        if (number === this.state.data.length) {
                                            this.setState({statusCheckRightOrFalse: 'allRight'});
                                            this.setState({statusScreen: 'resultDone'});
                                        } else {
                                            let index = copyArray.findIndex(x => x.statusHint === false || x.statusHint === null);
                                            if (index === -1) {
                                                this._onPressCheckListHint(index);
                                            } else {
                                                this.setState({indexOfQuestionHint: index});
                                                this._ProcessWordHintDetailBegin1(index);
                                                this._ListHint();
                                            }
                                        }
                                        this.setState({numberRightEx: number});
                                        this.setState({ArrAnswer: copyArray});
                                    }}
                                    style={[stylesApp.Sty_Button, {marginBottom: 10}]}>
                                    <Text style={stylesApp.Sty_Text_Button}>TIẾP TỤC</Text>
                                </TouchableOpacity>
                            ) : this.state.statusScreen === 'resultDone' ? (
                                    <View style={{flexDirection: 'row'}}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                this._Submit();
                                                //console.log(this.state.SaveArrayAns)
                                            }}
                                            style={stylesApp.Sty_Button}>
                                            <Text style={stylesApp.Sty_Text_Button}>TIẾP TỤC</Text>
                                        </TouchableOpacity>
                                    </View>
                                ) :
                                this.state.statusScreen === 'ShowHintDetailQuestion' ?
                                    <TouchableOpacity
                                    onPress={() => {
                                        this._OnPressKT();
                                        this._SaveArrayAns();
                                    }}
                                    disabled={!this.state.showButton}
                                    style={this.state.showButton? stylesApp.Sty_Button:stylesApp.Sty_Button_disable}>
                                        <Text
                                            style={stylesApp.Sty_Text_Button}>{this.state.TextButtonDetainQuestionHint}</Text>
                                    </TouchableOpacity>
                                    : this.state.statusScreen === 'ShowListDetailHind' ?
                                    <View>
                                        <TouchableOpacity
                                            onPress={() => {
                                                //console.log(this.state.ArrAnswer)
                                                this._OnPressCheckDetailHintQuesstion1();
                                            }}
                                            style={stylesApp.Sty_Button}>
                                            <Text
                                                style={stylesApp.Sty_Text_Button}>{this.state.TextButtonDetainQuestionHint}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    : null}
                        </View>
                    ) : this.state.checktype === 'Testing' ? (
                        <View
                            style={{
                                width: width,
                                height: height * 0.1,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.nextReviewResult();
                                }}
                                style={{
                                    width: width * 0.55,
                                    height: height * 0.05,
                                    backgroundColor: '#01283A',
                                    borderRadius: height * 0.025,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: height * 0.02,
                                }}>
                                <Text style={stylesApp.Sty_Text_Button}>TIẾP TỤC</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        null
                    )
                }
            </Animated.View>
        );
    }
}

function mapStateToProps(state) {
    return {
        data_answer: state.readingD11Reducer,
        data_login: state.AuthStackReducer.dataLogin,
    };
}

export default connect(mapStateToProps)(GrammarD13);
