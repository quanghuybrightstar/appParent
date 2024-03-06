import React, { Component } from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList,
    TextInput,
    Keyboard,
    LayoutAnimation,
    KeyboardAvoidingView,
    Alert,
    Platform,
    ActivityIndicator,
    ScrollView,
    SafeAreaView,
    Animated,
    Dimensions,
} from 'react-native';
import FileSound from '../FileSound';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import StyleLesson from '../StyleLesson';
import stylesApp from '../../../styleApp/stylesApp';
import stylesApps from '../../../../styleApp/stylesApp';
import style from '../Listening/StyleD7';
import ModalScript from '../../../modalScript'
import strUtils from '../../../../utils/stringUtils';

var Sound = require('react-native-sound');
Sound.setCategory('Playback');
let DataObject1 = new Object();
let DataObject2 = new Object();
let DataObject = new Object();
const { width, height } = Dimensions.get('window');
import SoundQestion from '../../../SoundQuestion/sound2';
import {KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view'
import lessonMath from '../../../../utils/lessonMath';
import LessonBase from '../../../../base/LessonBase';
import TextDownLine from '../../../../componentBase/TextDownLine/TextDownLine';

let listSuccess = [];
let dataHistory = [];

class ListeningD7 extends Component {
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
            PlayAudioHint: true,
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
            animatedValue: new Animated.Value(0),
            logid: '',
            data_lesson: {},
            show: 0,
            showkey: false,
            isShow: true,
        };
        this.sliderEditing = false;
        this.kqList = [];
        this.audioHide = React.createRef();
    }

    play = async (link) => {
        if (this.sound) {
            this.sound.play(this.playComplete);
            this.setState({ playState: 'playing' });
        } else {
            this.sound = new Sound(link, null, (error) => {
                if (error) {
                    this.setState({ playState: 'paused' });
                } else {
                    this.setState({
                        playState: 'playing',
                        selectAudio: 'audio',
                        duration: this.sound.getDuration(),
                    });
                    this.sound.play(this.playComplete);
                }
            });
        }
    };

    playComplete = (success) => {
        if (this.sound) {
            if (success) {
                console.log('successfully finished playing');
            } else {
                console.log('playback failed due to audio decoding errors');
            }
            this.setState({
                playState: 'paused',
                playSeconds: 0,
                playSecondsHint: 0,
            });

            this.sound.setCurrentTime(0);
        }
    };
    playComplete1 = (success) => {
        if (this.sound) {
            if (success) {
                console.log('successfully finished playing');
            } else {
                console.log('playback failed due to audio decoding errors');
            }
            this.setState({
                playState: 'paused',
                playSeconds: 0,
                playSecondsHint: 0,
            });

            this.sound.setCurrentTime(0);
        }
    };

    _submitLog = () => {
        for (let i = 0; i < this.state.dataFirt.data_question.length; i++) {
            let ar = [];
            for (let j = 0; j < this.state.SaveArrayAns.length; j++) {
                // let checkListOp = this.state.data[i].Listanswer.findIndex(items1 =>
                //     this._FunctionToReplaceQuestion(this.state.SaveArrayAns[j].ans[i].ans.toLowerCase()) ===
                //     this._FunctionToReplaceQuestion(items1.toLowerCase()));
                let Ob1 = new Object();
                Ob1.num_turn = j;
                Ob1.score = lessonMath.CheckAnswer(this.state.data[i].answer, this.state.SaveArrayAns[j].ans[i].ans) ? 1 : 0;
                Ob1.user_choice = this.state.SaveArrayAns[j].ans[i].ans;
                ar.push(Ob1);
            }
            let Ob = new Object();
            Ob.question_id = this.state.dataFirt.data_question[i].question_id;
            Ob.exercise_type = 'Listening';
            Ob.question_type = this.state.dataFirt.data_question[i].list_option[0].question_type;
            if (this.state.ArrAnswer[i].status === true) {
                Ob.question_score = this.state.dataFirt.data_question[
                    i
                ].list_option[0].score;
            } else {
                Ob.question_score = '0';
            }
            Ob.final_user_choice = this.state.ArrAnswer[i];
            Ob.detail_user_turn = ar;
            dataHistory.push(Ob);
        }
    };

    _Submit = async () => {
        const submitData = [];

        this.state.dataFirt.data_question.forEach((ques,i)=>{
            let ar = this.state.SaveArrayAns.map((e,j)=>{
                return {
                    num_turn:j,
                    score: e.ans[i].status?1:0,
                    user_choice:e.ans[i].ans
                }
            });
            let obj = {
                question_id: ques.question_id,
                exercise_type:'Listening',
                question_type:ques.list_option[0].question_type,
                question_score: this.state.ArrAnswer[i].status?ques.list_option[0].score:'0',
                final_user_choice : this.state.ArrAnswer[i],
                detail_user_turn : ar,
            }
            submitData.push(obj);
        })
        //console.log('dataHistory',submitData)
        this.props.saveLogLearning(submitData);

    };

    _SaveArrayAns = () => {
        let copySaveArrayAns = [...this.state.SaveArrayAns];
        let resual = [...this.state.ArrAnswer];
        let newObject = new Object();
        newObject.ans = resual;
        copySaveArrayAns.push(newObject);
        //console.log(copySaveArrayAns);
        this.setState({ SaveArrayAns: copySaveArrayAns });
    };
    pause = () => {
        if (this.sound) {
            this.sound.pause();
        }
        this.setState({ playState: 'paused', selectAudio: '' });
    };


    componentWillUnmount() {
        if (this.sound) {
            this.sound.release();
            this.sound = null;
        }
        if (this.timeout) {
            clearInterval(this.timeout);
        }
    }

    componentDidMount() {
        let dataNew = [];
        answeraaaa = [];
        listSuccess = [];
        dataHistory = [];
        //console.log(this.props.checkType);
        this.setState({ isloading: true });
        //console.log(this.props.checkType)
        this.setState({ checktype: this.props.checkType });
        Keyboard.addListener('keyboardDidShow', () => this._showKeyBoad());
        Keyboard.addListener('keyboardDidHide', () => this._HideKeyBoad());
        let response = {};
        response['data'] = this.props.dataContent;
        this.setState({ data_lesson: response });
        
        // this._postDataFirt(response.data)
        this.setState({ dataFirt: response.data });
        let arrayAnsBegin = [];
        for (let i = 0; i < response.data.data_question.length; i += 1) {
            DataObject1 = new Object();
            this.setState({ fileAudioEx: response.data.lesson.lesson_audio });
            DataObject1.question_id = response.data.data_question[i].question_id;
            ans = [];
            for (
                let j = 0;
                j < response.data.data_question[i].list_option.length;
                j += 1
            ) {
                const opts = response.data.data_question[i].list_option[j];
                DataObject = new Object();
                DataObject.ans = '';
                DataObject.status = false;
                DataObject.statusHint = false;
                DataObject.typeHind = true;
                arrayAnsBegin.push(DataObject);
                DataObject2 = new Object();
                if(!!opts.content_question){
                    const qc = JSON.parse(
                        opts.content_question,
                    )
                    DataObject2.fileAudio = qc?.content_question_audio;
                    // DataObject2.explain = opts.explain_parse.content_question_text || "";
                    DataObject2.explain = opts.explain_parse ? (opts.explain_parse.content_question_text || "") : (JSON.parse(opts.explain).content_question_text || "");
                }
                DataObject2.Listanswer = [opts.match_option_text];
                DataObject2.question = opts.question_content;
                DataObject2.answer = opts.match_option_text;

                this.setState({ 
                    audio: response.data.lesson.lesson_audio,
                    title_ENG:opts.group_content,
                    title_VI:opts.group_content_vi,
                });
               
            }
            if (this.props.checkType !== 'afterTest' && this.props.checkType !== 'Testing') {
            }
            dataNew.push(DataObject2);
        }
        this.setState({ ArrAnswer: arrayAnsBegin });
        this.setState({ data: dataNew });

        this.setState({ isloading: false });

        this.timeout = setInterval(() => {
            if (
                this.sound &&
                this.sound.isLoaded() &&
                this.state.playState == 'playing' &&
                !this.state.sliderEditing
            ) {
                this.sound.getCurrentTime((seconds, isPlaying) => {
                    this.setState({ playSeconds: seconds, playSecondsHint: seconds });
                });
            }
        }, 100);
        this.props.saveLogLearning([]);
    }

    _showKeyBoad = () => {
        this.props.hideTypeExercise()
        this.setState({ showkey: true });
    };
    _HideKeyBoad = () => {
        this.setState({ showkey: false });
        this.props.showTypeExercise()
    };
    _Loadding = () => {
        return (
            <View style={style.Loading}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    };
    _FunctionToReplaceQuestion = (Text) => {
        return strUtils.validWord(Text)
    };

    _Onpress = () => {
        this.setState({ titlePress: !this.state.titlePress });
    };
    _ListHint = () => {
        let index = this.state.ArrAnswer.findIndex(x => x.statusHint === false || x.statusHint === null);
        if (index === -1) {
        } else {
            this.setState({ indexOfQuestionHint: index, statusScreen: 'ShowListDetailHind', showButton: false });
        }

    };
    _ShowListDetailHind = () => {
        let arr = this.state.data[this.state.indexOfQuestionHint].question.split(' ');
        return (
            <View style={{ width: width, height: Platform.OS === 'ios' ? height * 0.62 : height * 0.56 }}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        alignSelf: 'center',
                        width: width * 0.9,
                        height: height * 0.1,
                        marginTop: 30
                    }}>
                    <Image
                        source={{
                            uri: 'lesson_grammar_image5',
                        }}
                        style={StyleLesson.ImageHint}
                    />
                    <View style={{ width: width * 0.78 }}>
                        <Text style={{ color: '#FFF', fontSize: 14 }}>
                            Gần chính xác rồi. Hãy xem các từ gợi ý cho câu trả lời
                        </Text>
                    </View>
                </View>
                <ScrollView style={{
                    width: width * 0.9,
                    height: height * 0.5,
                    backgroundColor: '#FFF',
                    marginLeft: width * 0.05,
                    borderRadius: 10,
                    marginTop: 10,
                }}>
                    <View
                        style={{
                            alignItems: 'flex-start',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            zIndex: 0,
                            padding: SmartScreenBase.smPercenHeight,
                            width: width * 0.9,
                        }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{this.state.indexOfQuestionHint + 1}. </Text>
                        {arr.map((e, index, key) => {
                            return (
                                <View style={{}}>
                                    <TouchableOpacity
                                        onLongPress={() => LessonBase.goTranslate(e)}
                                        style={[stylesApp.txt, { zIndex: 0 }]}>
                                        <Text style={{ fontSize: SmartScreenBase.smPercenWidth * 4 }}>
                                            {e}{' '}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            );
                        })}
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            {this._showAudioHint(this.state.indexOfQuestionHint)}
                        </View>
                        {
                            this.state.show > 1 ?
                                <View>
                                    {this._OnShowWordHintDetail()}
                                </View>
                                : null
                        }
                        {
                            this.state.statusDetailHint === 'right' ?

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
                                    <View style={{
                                        alignItems: 'flex-start',
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                        zIndex: 0,
                                        padding: SmartScreenBase.smPercenHeight,
                                        width: width * 0.9,
                                        marginTop: 10,
                                    }}>
                                        {this.state.ArrAnswer[this.state.indexOfQuestionHint].ans.split(' ').map((e, index, key) => {
                                            return (
                                                <View style={{}}>
                                                    <TouchableOpacity
                                                        onLongPress={() => LessonBase.goTranslate(e)}
                                                        style={[stylesApp.txt, { zIndex: 0 }]}>
                                                        <Text style={{
                                                            fontSize: SmartScreenBase.smPercenWidth * 4,
                                                            color: '#72B228',
                                                        }}>
                                                            {e}{' '}
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                            );
                                        })}
                                    </View>
                                </View>
                                :
                                this.state.statusDetailHint === 'wrong' ?
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
                                        <View style={{
                                            alignItems: 'flex-start',
                                            flexDirection: 'row',
                                            flexWrap: 'wrap',
                                            zIndex: 0,
                                            padding: SmartScreenBase.smPercenHeight,
                                            width: width * 0.9,
                                            marginTop: 10,
                                        }}>
                                            {this.state.ArrAnswer[this.state.indexOfQuestionHint].ans.split(' ').map((e, index, key) => {
                                                return (
                                                    <View style={{}}>
                                                        <TouchableOpacity
                                                            onLongPress={() => {LessonBase.goTranslate(e)}}
                                                            style={[stylesApp.txt, { zIndex: 0 }]}>
                                                            <Text style={{
                                                                fontSize: SmartScreenBase.smPercenWidth * 4,
                                                                color: e === this.state.data[this.state.indexOfQuestionHint].answer[0].split(' ')[index] ? '#72B228' : '#D80B0B',
                                                            }}>
                                                                {e}{' '}
                                                            </Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                );
                                            })}
                                        </View>
                                    </View>
                                    :
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
                                            })
                                        } onStartShouldSetResponder={() => this.inputRef.focus()}>
                                        <TextInput
                                            autoCorrect={false}
                                            ref={refs => this.inputRef = refs}
                                            style={[
                                                stylesApp.txt,
                                                {
                                                    margin: SmartScreenBase.smPercenHeight,
                                                    textAlignVertical:'top',
                                                    width: SmartScreenBase.smPercenWidth*79
                                                },
                                            ]}
                                            placeholder={'Trả lời'}
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
        return (
            <View style={{ 
                width: width, 
                height:SmartScreenBase.smPercenHeight*(Platform.OS === 'ios'?62:60),
                marginTop:this.state.showkey?SmartScreenBase.smPercenHeight*4:0,
            }}>
                <View style={{ 
                    width, 
                    justifyContent: 'center', 
                    alignItems: 'center',
                 }}>
                    <SoundQestion
                        Audio={this.state.audio}
                    />
                </View>
                <View
                    style={{
                        flex:1,
                        marginTop: SmartScreenBase.smPercenHeight,
                    }}>
                    <KeyboardAwareFlatList
                        enableOnAndroid={true}
                        showsVerticalScrollIndicator={false}
                        extraScrollHeight={80}
                        data={this.state.data}
                        extraData={this.state.refresh}
                        keyExtractor={(item, index) => 'item' + index}
                        renderItem={this._RenderQuestion.bind(this)}
                        style={{ marginBottom: this.state.showkey ? SmartScreenBase.smPercenHeight*5 : 0 }}
                    />
                </View>
            </View>
        );
    }

    _RenderQuestion = ({ item, index }) => {
        //console.log(this.state.ArrAnswer)
        let arr = item.question.split(' ');
        return (
            <View style={{
                ...style.RenderQuestionView, ...Platform.select({
                    android: {
                        marginBottom: this.state.showkey && index == this.state.data.length - 1 ? height / 9 : 0,
                    },
                }),
            }}>
                <View
                    style={style.RenderQuestionView1}>
                    <Text style={style.StyleText}>{index + 1}. </Text>
                    {arr.map((e, index, key) => {
                        return (
                            <View style={{}}>
                                <TouchableOpacity
                                    onLongPress={() => {console.log("openWeb super") ,LessonBase.goTranslate(e)}}
                                    style={[stylesApp.txt, { zIndex: 0 }]}>
                                    <Text style={{ fontSize: SmartScreenBase.smPercenWidth * 4 }}>
                                        {e}{' '}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </View>
                <View style={style.RenderQuestionView2}>
                    <Image
                        source={{ uri: 'lesson_grammar_image1' }}
                        style={style.styleImage}
                    />
                    <View style={style.stylePlat}>

                        {this.state.ArrAnswer[index].status === true ? (
                            <View
                                style={style.styleViewAns}>
                                <Text style={style.styleTexxt1}>
                                    {this.state.ArrAnswer[index].ans}
                                </Text>
                            </View>
                        ) : (
                                <TextInput
                                    autoCorrect={false}
                                    style={[
                                        stylesApp.txt,
                                        style.styleInput, { fontSize: 15 },
                                    ]}
                                    returnKeyType="done"
                                    blurOnSubmit={true}
                                    placeholder={'Trả lời'}
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
    
    _onCheckAns1 = () => {
        let array = [...this.state.ArrAnswer];
        if (this.state.countPressDetailHint1 < 1) {
            array[this.state.indexOfQuestionHint].typeHind = true;
            if (lessonMath.CheckAnswer(this.state.data[this.state.indexOfQuestionHint].answer, array[this.state.indexOfQuestionHint].ans)) {
                array[this.state.indexOfQuestionHint].status = true;
            } else {
                array[this.state.indexOfQuestionHint].status = false;
            }
            this.setState({ ArrAnswer: array });
        } else {
            array[this.state.indexOfQuestionHint].typeHind = false;
            if (lessonMath.CheckAnswer(this.state.data[this.state.indexOfQuestionHint].answer, array[this.state.indexOfQuestionHint].ans)
            ) {
                array[this.state.indexOfQuestionHint].status = true;
            } else {
                array[this.state.indexOfQuestionHint].status = false;
            }
            this.setState({ ArrAnswer: array });
        }
    };

    _OnTextChange(text, index) {
        let array = this.state.ArrAnswer.slice('');
        array[index].ans = text;
        this.setState({ ArrAnswer: array });
        this._OnCheckNotNull(array);
    }

    _OnCheckNotNull = (array) => {
        let check = false;
        array.forEach((item) => {
            if (item.ans != "" && item.status != true) {
                check = true;
                return false;
            }
        });
        if (check) {
            this.setState({ showButton: true });
        } else {
            this.setState({ showButton: false });
        }
    };
    _onCheckNumberRight = () => {
        console.log('_onCheckNumberRight')
        let number = 0;
        let copyArray = [...this.state.ArrAnswer];
        for (let i = 0; i < this.state.ArrAnswer.length; i++) {
            this.kqList[i] = false
            if (this.state.ArrAnswer[i].typeHind === true) {
                if (this.state.ArrAnswer[i] !== '') {
                    // let checkListOp = this.state.data[i].Listanswer.findIndex(items =>
                    //     this._FunctionToReplaceQuestion(this.state.ArrAnswer[i].ans.toLowerCase()) ===
                    //     this._FunctionToReplaceQuestion(items.toLowerCase()));
                    // if (
                    //     checkListOp !== -1
                    // ) {
                    if(lessonMath.CheckAnswer(this.state.data[i].answer, this.state.ArrAnswer[i].ans)){
                        number++;
                        copyArray[i].status = true;
                        copyArray[i].statusHint = true;
                        //copyArray[i].typeHind = true;
                        this.kqList[i] = true
                    }
                }
            } else if (this.state.ArrAnswer[i].typeHind === false) {
                if (this.state.ArrAnswer[i] !== '') {
                    if (lessonMath.CheckAnswer(this.state.data[i].answer, this.state.ArrAnswer[i].ans)
                    ) {
                        number++;
                        copyArray[i].status = true;
                        copyArray[i].statusHint = true;
                    }
                }
            }
        }
        this.setState({ ArrAnswer: copyArray });
        if (number === this.state.data.length) {
            this.setState({ statusCheckRightOrFalse: 'allRight' });
            this.setState({ statusScreen: 'resultDone' });
            this.props.showFeedback();
        } else {
            this.setState({ statusCheckRightOrFalse: 'NoAllRight' });
            this.setState({ statusScreen: 'resultNotDone' });
        }
        this.setState({ numberRightEx: number });
    };
    _reSetAns = () => {
        let arrayAnsBegin = [];
        let arr = [...this.state.ArrAnswer];
        for (let i = 0; i < this.state.data.length; i++) {

            let DataObject = new Object();
            if (lessonMath.CheckAnswer(this.state.data[i].answer, arr[i].ans)) {
                DataObject.status = true;
                DataObject.statusHint = true;
                DataObject.typeHind = true;
                DataObject.ans = arr[i].ans;
            } else {
                DataObject.status = null;
                DataObject.statusHint = null;
                DataObject.typeHind = true;
                DataObject.ans = '';
            }
            arrayAnsBegin.push(DataObject);
        }
        this.setState({ ArrAnswer: arrayAnsBegin });
    };
    _OnPressKT = () => {
        this.props.hideTypeExercise();
        this.setState({ numberDoExam: this.state.numberDoExam + 1 });
        this._onCheckNumberRight();
        // console.log('trueeeee', this.state.statusCheckRightOrFalse);
    };
    _OnPressLL = () => {
        this.props.showTypeExercise();
        if (this.state.numberDoExam < 2) {
            this._reSetAns();
            this.setState({ statusScreen: 'question', showButton: false });
        } else {
            this._submitLog();
            // this._reSetAns();
            listSuccess = [];
            this.state.data.forEach((item, index) => {
                item.Listanswer.forEach((value, j) => {
                    if (lessonMath.CheckAnswer(value, this.state.ArrAnswer[index].ans)) {
                        listSuccess.push(index);
                        return false;
                    }
                });
            });
            let i = 0;
            this.state.data.every((item, index) => {
                if (listSuccess.indexOf(index) === -1) {
                    i = index;
                    return false;
                }
                return true;
            });
            let arr = [...this.state.ArrAnswer];
            this.state.data.forEach((item, index) => {
                let c = false;
                item.Listanswer.forEach((value, j) => {
                    if (lessonMath.CheckAnswer(value, this.state.ArrAnswer[index].ans)) {
                        c = true;
                        return false;
                    }
                });
                if (!c) {
                    arr[index].status = null;
                    arr[index].statusHint = null;
                    arr[index].typeHind = true;
                    arr[index].ans = '';
                } else {
                    arr[index].status = true;
                    arr[index].statusHint = true;
                    arr[index].typeHind = true;
                }
            });
            this.setState({ ArrAnswer: arr });
            this.setState({ statusScreen: 'ShowHintDetailQuestion', showButton: false, indexOfQuestionHint: i });
            // this.state.statusDetailHint === 'wrong';
        }

    };

    _ShowHintQuestion() {
        return (
            <View style={style.styleShowHintQuestion}>
                <View
                    style={style.styleViewFlat}>
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
        this.setState({ indexOfQuestionHint: index, showButton: false });
        this.setState({ statusScreen: 'ShowHintDetailQuestion' });
    };

    _ItemHintQuestion = ({ item, index }) => {
        let arr = item.question.split(' ');
        return (
            <View style={style.RenderQuestionView}>
                <View
                    style={style.styleItemHintQuestion}>
                    <Text style={style.styleTexxt2}>{index + 1}. </Text>
                    {arr.map((e, index, key) => {
                        return (
                            <View style={{}}>
                                <TouchableOpacity
                                    onLongPress={() => LessonBase.goTranslate(e)}
                                    style={[stylesApp.txt, { zIndex: 0 }]}>
                                    <Text style={{ fontSize: SmartScreenBase.smPercenWidth * 4 }}>
                                        {e}{' '}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </View>
                <View style={style.styleViewImage}>
                    <Image
                        source={{ uri: 'lesson_grammar_image1' }}
                        style={style.styleImage2}
                    />
                    <View style={style.styleView}>
                        {this.state.ArrAnswer[index].status === true || this.state.ArrAnswer[index].status === false ? (
                            <View
                                style={style.styleTexView}>
                                <Text style={style.styleArr}>
                                    {this.state.ArrAnswer[index].ans}
                                </Text>
                            </View>
                        ) : (
                                <TextInput
                                    style={[
                                        stylesApp.txt,
                                        style.styleInput,
                                    ]}
                                    returnKeyType="done"
                                    blurOnSubmit={true}
                                    autoCorrect={false}
                                    placeholder={'Trả lời'}
                                    multiline={true}
                                    onChangeText={(text) => {
                                        this._OnTextChange(text, index);
                                    }}
                                />
                            )}
                    </View>
                </View>
                <View
                    style={style.styleView4}>
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
            this.state.data[this.state.indexOfQuestionHint].answer[0].split(' ').map((e, index, key) => {
                if (this.state.ArrAnswer[this.state.indexOfQuestionHint].ans) {
                    if (
                        !answ[index] ||
                        (this._FunctionToReplaceQuestion(e.toLowerCase()) !==
                            this._FunctionToReplaceQuestion(answ[index].toLowerCase()))
                    ) {
                        array.push(index);
                    }
                }
            });
            for (let i = 0; i < Math.ceil(array.length / 2); i++) {
                arrayWrong.unshift(array[i]);
            }
            this.state.data[this.state.indexOfQuestionHint].answer[0].split(' ').map((e, index, key) => {
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
        console.log('arrayWrong', arrayWrong);
        this.setState({ arrayWrong: arrayWrong });
    };
    _ProcessWordHintDetail1 = () => {
        let array = [];
        let arrayWrong = [];
        this.state.data[this.state.indexOfQuestionHint].answer[0].split(' ').map((e, index, key) => {
            if (this.state.ArrAnswer[this.state.indexOfQuestionHint].ans) {
                if (
                    this._FunctionToReplaceQuestion(e.toLowerCase()) !==
                    this._FunctionToReplaceQuestion(this.state.ArrAnswer[this.state.indexOfQuestionHint].ans.split(' ')[index])
                ) {
                    array.unshift(index);
                }
            }
        });
        console.log('array', array);
        if (this.state.countPressDetailHint1 <= 1) {
            for (let i = 0; i < Math.ceil(array.length / 2); i++) {
                arrayWrong.unshift(array[i]);
            }
        } else if (this.state.countPressDetailHint1 > 1) {
            arrayWrong = [];
        }
        console.log('arrayWrong', arrayWrong);
        this.setState({ arrayWrong: arrayWrong });
    };
    _ProcessWordHintDetailBegin = (item) => {
        let array = [];
        let arrayWrong = [];
        //console.log('this.state.ArrAnswer[index]',[this.state.countPressDetailHint])
        this.state.data[item].answer[0].split(' ').map((e, index, key) => {
            if (this.state.ArrAnswer[this.state.indexOfQuestionHint].ans !== '') {
                if (e !== this.state.ArrAnswer[item].ans.split(' ')[index]) {
                    array.unshift(index);
                }
            }
        });
        console.log('array', array);
        if (this.state.countPressDetailHint === 1) {
            for (let i = 0; i < Math.ceil(array.length / 2); i++) {
                arrayWrong.unshift(array[i]);
            }
        } else if (this.state.countPressDetailHint > 1) {
            arrayWrong = [];
        }
        console.log('arrayWrong', arrayWrong);
        //console.log('arrayWrong',arrayWrong);
        this.setState({ arrayWrong: arrayWrong });
    };
    _ProcessWordHintDetailBegin1 = (item) => {
        let array = [];
        let arrayWrong = [];
        //console.log('this.state.ArrAnswer[index]',[this.state.countPressDetailHint1])
        this.state.data[item].answer[0].split(' ').map((e, index, key) => {
            if (this.state.ArrAnswer[this.state.indexOfQuestionHint].ans !== '') {
                if (e !== this.state.ArrAnswer[item].ans.split(' ')[index]) {
                    array.push(index);
                }
            }
        });
        if (this.state.countPressDetailHint1 === 1) {
            for (let i = Math.ceil(array.length / 2); i < array.length; i++) {
                arrayWrong.push(array[i]);
            }
        } else if (this.state.countPressDetailHint1 > 1) {
            arrayWrong = [];
        }
        //console.log('arrayWrong',arrayWrong);
        this.setState({ arrayWrong: arrayWrong });
    };
    _OnShowWordHintDetail = () => {
        let dataAnswer = this.state.data[this.state.indexOfQuestionHint].answer[0].split(' ');
        return (
            <View
                style={style.OnShowWordHintDetailView}>
                {
                    dataAnswer.map((e, index) => {
                        return (
                            this.state.arrayWrong.length
                                ?
                                this.state.arrayWrong.indexOf(index) !== -1 ?
                                    <View>
                                        <TouchableOpacity
                                            onLongPress={() => LessonBase.goTranslate(e)}
                                            style={[
                                                stylesApp.txt,
                                                style.Stylee,
                                            ]}>
                                            <Text style={{ color: '#000' }}>{e}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    <View>
                                        <TouchableOpacity
                                            onLongPress={() => LessonBase.goTranslate(e)}
                                            style={[
                                                stylesApp.txt,
                                                style.Stylee,
                                            ]}>
                                            <Text style={{ color: '#000' }}></Text>
                                        </TouchableOpacity>
                                    </View>
                                :
                                <View>
                                    <TouchableOpacity
                                        onLongPress={() => LessonBase.goTranslate(e)}
                                        style={[
                                            stylesApp.txt,
                                            style.Stylee,
                                        ]}>
                                        <Text style={{ color: '#000' }}>{e}</Text>
                                    </TouchableOpacity>
                                </View>
                        );
                    })
                }
            </View>
        );
    };

    _showAudioHint = (index) => {
        //console.log(this.state.data[index]);
        console.log("=====_showAudioHint")
        return (
            <View style={[style.styleAudioHint,{
                alignItems:'center'
            }]}>
                <SoundQestion
                    ref={this.audioHide}
                    style={{maxWidth:'96%'}}
                    sliderStyles={{maxWidth:'86%'}}
                    Audio={this.state.data[index].fileAudio}
                    status={'hint'}/>

            </View>
        );
    };

    _ShowHintDetailQuestion = () => {
        let arr = this.state.data[this.state.indexOfQuestionHint].question.split(' ');
        return (
            <View style={style.styleShowHintDetailQuestion}>
                {
                    !this.state.showkey&&<View
                    style={[style.styleShowHintDetailQuestion1, { 
                            marginTop: SmartScreenBase.smPercenHeight*2 
                        }]}>
                    <Image
                        source={{
                            uri: 'lesson_grammar_image5',
                        }}
                        style={StyleLesson.ImageHint}
                    />
                    <View style={{ width: width * 0.78 }}>
                        <Text style={{ color: '#fff' }}>
                            {this.state.isShow && ('Hãy nghe đoạn nghe có chứa thông tin để trả lời câu hỏi:')}
                            {!this.state.isShow && ('Gần chính xác rồi. Hãy xem các từ gợi ý cho câu trả lời')}
                        </Text>
                    </View>
                </View>
                }
                <ScrollView style={[{
                    width: width * 0.9,
                    backgroundColor: '#FFF',
                    marginLeft: width * 0.05,
                    borderRadius: 10,
                    marginTop: SmartScreenBase.smPercenHeight,
                },this.state.showkey&&Platform.OS==='android'&&{
                    marginBottom:SmartScreenBase.smPercenHeight*10,
                    marginTop: SmartScreenBase.smPercenHeight*8,
                }]}>
                    <View style={{
                        padding: SmartScreenBase.smPercenHeight,
                        width: width * 0.9
                    }}>
                        <View style={style.styleShowHintDetailQuestion2}>
                            <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{this.state.indexOfQuestionHint + 1}. </Text>
                                {arr.map((e, index, key) => {
                                    return (
                                        <View style={{}}>
                                            <TouchableOpacity
                                                onLongPress={() => LessonBase.goTranslate(e)}
                                                style={[stylesApp.txt, { zIndex: 0 }]}>
                                                <Text style={{ fontSize: SmartScreenBase.smPercenWidth * 4 }}>
                                                    {e}{' '}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                    );
                                })}
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            {this._showAudioHint(this.state.indexOfQuestionHint)}
                        </View>
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
                                    minHeight: SmartScreenBase.smPercenHeight * 15,
                                    padding: 10,
                                })
                            }>
                            {this.state.statusDetailHint === 'right' && (
                                <FileSound showIcon={'none'} showImage={'true'} />
                            )}
                            {this.state.statusDetailHint === 'wrong' && (
                                <FileSound showIcon={'none'} showImage={'false'} />
                            )}
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
                                        width: width * 0.8,
                                    }}>
                                        {this.state.ArrAnswer[this.state.indexOfQuestionHint].ans.split(' ').map((e, index, key) => {
                                            return (
                                                <View style={{}}>
                                                    <TouchableOpacity
                                                        onLongPress={() => {LessonBase.goTranslate(e)}}
                                                        style={{ zIndex: 0 }}>
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
                                        autoCorrect={false}
                                        ref={refs => this.input = refs}
                                        style={{
                                            fontSize:SmartScreenBase.smFontSize*45,
                                            color:'black',
                                            flex:1,
                                            textAlignVertical:'top',
                                            width: SmartScreenBase.smPercenWidth*79
                                        }}
                                        placeholder={'Trả lời'}
                                        multiline={true}
                                        onChangeText={text => {
                                            this._OnTextChange(text, this.state.indexOfQuestionHint);
                                        }}
                                    />
                            }
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    };

    _ShowResultNotDone = () => {
        return (
            <View style={{
                width: width,
                height: SmartScreenBase.smPercenHeight* (Platform.OS === 'ios' ? 77.5:77.5 ),
                marginBottom: SmartScreenBase.smPercenHeight,
            }}>
                <View style={{
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: SmartScreenBase.smPercenHeight * 3,
                }}>
                    <FileSound 
                        showIcon={'none'}
                        showImage={this.state.ArrAnswer.filter(c=>c.status || c.answerHint).length === this.state.data.length ? 'true' : 'false'} />
                </View>
                <View style={{ width, alignItems: 'center' }}>
                    <Text style={StyleLesson.text_answer}>
                        BẠN ĐÃ TRẢ LỜI ĐÚNG {this.state.ArrAnswer.filter(c=>c.status || c.answerHint).length}/
                        {this.state.data.length}
                    </Text>
                </View>
                <View
                    style={{
                        flex:1,
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
    _ItemResultNotDone = ({ item, index }) => {
        let arr = item.question.split(' ');
        let checkListOp = lessonMath.CheckAnswer(this.state.data[index].answer, this.state.ArrAnswer[index].ans)
        return (
            <View
                style={{
                    width: width * 0.9,
                    backgroundColor: '#FFF',
                    borderRadius: 10,
                    marginLeft: width * 0.05,
                    marginTop: 50,
                    borderColor:
                        this.state.ArrAnswer[index] === ''
                            ? '#D80B0B'
                            : checkListOp
                                ? '#72B228'
                                : '#D80B0B',
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
                            uri:
                                this.state.ArrAnswer[index] === ''
                                    ? 'grammar1_3'
                                    : checkListOp
                                        ? 'grammar1_4'
                                        : 'grammar1_3',
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
                    <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{index + 1}. </Text>
                    {arr.map((e, index, key) => {
                        return (
                            <View style={{}}>
                                <TouchableOpacity
                                    onLongPress={() => LessonBase.goTranslate(e)}
                                    style={[stylesApp.txt, { zIndex: 0 }]}>
                                    <Text
                                        style={{
                                            fontSize: SmartScreenBase.smPercenWidth * 4,
                                            fontWeight: 'bold',
                                        }}>
                                        {e}{' '}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </View>
                <View style={{ marginBottom: 5, flexDirection: 'row' }}>
                    <Image
                        source={{ uri: 'lesson_grammar_image1' }}
                        style={{
                            width: SmartScreenBase.smBaseWidth * 112,
                            height: SmartScreenBase.smBaseWidth * 112,
                            marginLeft: SmartScreenBase.smPercenHeight,
                            resizeMode: 'contain',
                            marginRight: 2,
                        }}
                    />
                    <View style={{ width: width * 0.7, marginBottom: 20 }}>
                        <View
                            style={{
                                height: SmartScreenBase.smBaseWidth * 112,
                                justifyContent: 'center',
                                // alignItems: 'center',
                            }}>
                            <Text style={{ fontStyle: 'italic', color: checkListOp ? '#72B228' : '#D80B0B' }}>
                                {this.state.ArrAnswer[index].ans}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
        );
    };
    _ItemResultNotDoneAllRight = ({ item, index }) => {
        let arr = item.question.split(' ');
        let checkListOp = lessonMath.CheckAnswer(this.state.data[index].answer, this.state.ArrAnswer[index].ans)
        return (
            <View
                style={{
                    width: width * 0.9,
                    backgroundColor: '#FFF',
                    borderRadius: 10,
                    marginLeft: width * 0.05,
                    marginTop: 50,
                    borderColor:
                        this.state.ArrAnswer[index] === ''
                            ? '#D80B0B'
                            : checkListOp
                                ? '#72B228'
                                : '#D80B0B',
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
                            uri:
                                this.state.ArrAnswer[index] === ''
                                    ? 'grammar1_3'
                                    : checkListOp
                                        ? 'grammar1_4'
                                        : 'grammar1_3',
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
                    <Text style={{ fontWeight: 'bold', fontSize: 15 }}>{index + 1}. </Text>
                    {arr.map((e, index, key) => {
                        return (
                            <View style={{}}>
                                <TouchableOpacity
                                    onLongPress={() => LessonBase.goTranslate(e)}
                                    style={[stylesApp.txt, { zIndex: 0 }]}>
                                    <Text
                                        style={{
                                            fontSize: SmartScreenBase.smPercenWidth * 4,
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
                <View style={{ marginBottom: 5 }}>
                    <Text
                        style={{
                            marginLeft: SmartScreenBase.smPercenHeight,
                            fontWeight: 'bold',
                        }}>
                        GIẢI THÍCH
                    </Text>
                    <View
                        style={{
                            width: width * 0.6,
                            marginBottom: 12,
                            justifyContent: 'center',
                            marginLeft: 30,
                        }}>
                        <Text style={{ fontStyle: 'italic', color: '#00000070' }}>
                            {this.state.data[index].explain}
                        </Text>
                    </View>
                </View>
            </View>
        );
    };
    _ShowResultDone = () => {
        console.log('showdone', this.state.ArrAnswer);
        const allRIght = this.state.ArrAnswer.filter(c=>c.status || c.answerHint).length === this.state.data.length;
        return (
            <View style={{ width: width, height: height * 0.73, marginBottom: 30 }}>
                <View
                    style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        alignSelf: 'center',
                        width,
                        height: height * 0.15,
                        justifyContent: 'center',
                    }}>
                    <Image
                        source={{
                            uri: allRIght?'grammar2_1':'grammar2_2'
                        }}
                        style={StyleLesson.Sty_Image_Large_Answer}
                    />
                    {/* <FileSound showIcon={'none'} showImage={'true'} /> */}
                    <FileSound showIcon={'none'}
                        showImage={allRIght ? 'true' : 'false'} />
                </View>

                <View style={{ width, alignItems: 'center' }}>
                    <Text style={{ color: '#FFF', fontSize: 20, fontFamily: 'iCielSoupofJustice', fontWeight: '600' }}>
                        BẠN ĐÃ TRẢ LỜI ĐÚNG {this.state.ArrAnswer.filter(c=>c.status || c.answerHint).length}/
                        {this.state.data.length}
                    </Text>
                </View>
                <View
                    style={{
                        height: height * 0.52,
                        width: width,
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
        let checkListOp = lessonMath.CheckAnswer(this.state.data[index].answer, this.state.ArrAnswer[index].ans)
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
                        <View>
                            <View
                                style={{
                                    margin: SmartScreenBase.smPercenHeight,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                <Image
                                    source={{ uri: 'lesson_grammar_image3' }}
                                    style={{
                                        width: SmartScreenBase.smBaseWidth * 50,
                                        height: SmartScreenBase.smBaseWidth * 50,
                                        resizeMode: 'contain',
                                    }}
                                />
                                <Text
                                    style={[
                                        stylesApp.txt,
                                        {
                                            marginLeft: SmartScreenBase.smPercenWidth * 5,
                                            fontStyle: 'italic',
                                            color: '#72B228',
                                        },
                                    ]}>
                                    {this.state.data[index].answer[0]}
                                </Text>
                            </View>

                            <View style={{ marginBottom: 5, marginTop: 5 }}>
                                <Text
                                    style={{
                                        // marginLeft: SmartScreenBase.smPercenHeight,
                                        fontWeight: 'bold',
                                    }}>GIẢI THÍCH:
                                        </Text>
                                <View
                                    style={{
                                        width: width * 0.7,
                                        marginBottom: 12,
                                        justifyContent: 'center',
                                        marginLeft: 20,
                                    }}>
                                    <Text style={{
                                        fontStyle: 'italic',
                                        color: '#000',
                                        fontSize: SmartScreenBase.smPercenWidth * 4,
                                    }}>
                                        {this.state.data[index].explain}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        : this.state.ArrAnswer[index].typeHind === true ?
                            checkListOp ?
                                <View>
                                    <View style={{ flexDirection: 'row' }}>
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
                                            <Text style={{ marginLeft: 5, color: '#72B228',fontSize:SmartScreenBase.smFontSize*45 }}>
                                                {this.state.ArrAnswer[index].ans}
                                                {/* {this.state.ArrAnswer[index].ans.toLowerCase()} */}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ marginBottom: 5, marginTop: 5 }}>
                                        <Text
                                            style={{
                                                // marginLeft: SmartScreenBase.smPercenHeight,
                                                fontWeight: 'bold',
                                            }}>GIẢI THÍCH:
                                        </Text>
                                        <View
                                            style={{
                                                width: width * 0.7,
                                                marginBottom: 12,
                                                justifyContent: 'center',
                                                marginLeft: 20,
                                            }}>
                                            <Text style={{
                                                fontStyle: 'italic',
                                                color: '#000',
                                                fontSize: SmartScreenBase.smPercenWidth * 4,
                                            }}>
                                                {this.state.data[index].explain}
                                            </Text>
                                        </View>
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

                                        <Text style={{ marginLeft: 5, color: '#D80B0B',fontSize:SmartScreenBase.smFontSize*45 }}>
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
                                            source={{ uri: 'lesson_grammar_image3' }}
                                            style={{
                                                width: SmartScreenBase.smBaseWidth * 112,
                                                height: SmartScreenBase.smBaseWidth * 112,
                                                resizeMode: 'contain',
                                            }}
                                        />
                                        <Text style={{ marginLeft: 5, color: '#72B228',fontSize:SmartScreenBase.smFontSize*45 }}>
                                            {this.state.data[index].answer[0]}
                                        </Text>
                                    </View>
                                    <View style={{ marginBottom: 5, marginTop: 5 }}>
                                        <Text
                                            style={{
                                                // marginLeft: SmartScreenBase.smPercenHeight,
                                                fontWeight: 'bold',
                                            }}>GIẢI THÍCH:
                                        </Text>
                                        <View
                                            style={{
                                                width: width * 0.7,
                                                marginBottom: 12,
                                                justifyContent: 'center',
                                                marginLeft: 20,
                                            }}>
                                            <Text style={{
                                                fontStyle: 'italic',
                                                color: '#000',
                                                fontSize: SmartScreenBase.smPercenWidth * 4,
                                            }}>
                                                {this.state.data[index].explain}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            : lessonMath.CheckAnswer(this.state.data[index].answer, this.state.ArrAnswer[index].ans) ?
                                <View style={{ flexDirection: 'row' }}>
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
                                        <Text style={{ marginLeft: 5, color: '#72B228',fontSize:SmartScreenBase.smFontSize*45 }}>
                                            {this.state.data[index].answer[0]}
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

                                        <Text style={{ marginLeft: 5, color: '#D80B0B' }}>
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
                                            source={{ uri: 'lesson_grammar_image3' }}
                                            style={{
                                                width: SmartScreenBase.smBaseWidth * 112,
                                                height: SmartScreenBase.smBaseWidth * 112,
                                                resizeMode: 'contain',
                                            }}
                                        />
                                        <Text style={{ marginLeft: 5, color: '#72B228',fontSize:SmartScreenBase.smFontSize*45 }}>
                                            {this.state.data[index].answer[0]}
                                        </Text>
                                    </View>

                                    <View style={{ marginBottom: 5, marginTop: 5 }}>
                                        <Text
                                            style={{
                                                // marginLeft: SmartScreenBase.smPercenHeight,
                                                fontWeight: 'bold',
                                            }}>GIẢI THÍCH:
                                        </Text>
                                        <View
                                            style={{
                                                width: width * 0.7,
                                                marginBottom: 12,
                                                justifyContent: 'center',
                                                marginLeft: 20,
                                            }}>
                                            <Text style={{
                                                fontStyle: 'italic',
                                                color: '#000',
                                                fontSize: SmartScreenBase.smPercenWidth * 4,
                                            }}>
                                                {this.state.data[index].explain}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                }

            </View>
        );
    };
    _ItemResultDone = ({ item, index }) => {
        let arr = item.question.split(' ');
        let checkListOp = lessonMath.CheckAnswer(this.state.data[index].answer, this.state.ArrAnswer[index].ans)
        return (
            <View
                style={{
                    width: width * 0.9,
                    backgroundColor: '#FFF',
                    borderWidth: 2,
                    borderColor:
                        this.state.ArrAnswer[index] === ''
                            ? '#D80B0B'
                            : this.state.ArrAnswer[index].typeHind === true ?
                                checkListOp ? '#72B228' : '#D80B0B'
                                : checkListOp
                                    ? '#72B228'
                                    : '#D80B0B',
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
                            uri:
                                this.state.ArrAnswer[index] === ''
                                    ? 'grammar1_3'
                                    : this.state.ArrAnswer[index].typeHind === true ?
                                        checkListOp ? 'grammar1_4' : 'grammar1_3'
                                        : checkListOp
                                            ? 'grammar1_4'
                                            : 'grammar1_3',
                        }}
                        style={{
                            width: SmartScreenBase.smBaseWidth * 120,
                            height: SmartScreenBase.smBaseWidth * 120,
                            resizeMode: 'contain',
                        }}
                    />
                </View>
                <View style={{marginTop: SmartScreenBase.smPercenWidth*2, paddingHorizontal: SmartScreenBase.smPercenWidth*2}}>
                    <TextDownLine textBody={(index + 1)+". "+this.state.data[index].question}/>
                </View>
                {/* <View
                    style={{
                        alignItems: 'flex-start',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                        zIndex: 0,
                        padding: SmartScreenBase.smPercenHeight,
                        width: width * 0.9,
                        marginTop: 10,
                    }}>
                    <Text style={{ fontWeight: 'bold', fontSize: SmartScreenBase.smFontSize * 50 }}>
                        <Text>{index + 1}. </Text>
                        {this.state.data[index].question === ''
                            ? ''
                            : this._FunctionToReplaceQuestion(this.state.data[index].question.toLowerCase())}
                    </Text>
                </View> */}
                {this._ShowScriptItem(index)}
            </View>
        );
    };

    _OnShowScript() {
        this.setState({ showScript: !this.state.showScript });
    }

    _ShowScript = () => {
        return (
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
                                { color: '#000', marginLeft: '85%' },
                            ]}>
                            X
                        </Text>
                    </TouchableOpacity>
                    <View style={{ width: '100%', height: '80%' }}>
                        <Text style={{ marginTop: 20, marginLeft: 20 }}>
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
        );
    };

    _OnPressBack() {
        this.props.prevReviewResult();
    }

    _OnPressCheckDetailHintQuesstion = () => {
        console.log('=====_OnPressCheckDetailHintQuesstion',this.audioHide);
        this.audioHide.current && this.audioHide.current._endAudio()
        this.setState({ showButton: false });
        this.setState({ show: this.state.show + 1 });
        if (this.state.TextButtonDetainQuestionHint === 'Kiểm Tra') {
            let checkListOp = lessonMath.CheckAnswer(this.state.data[this.state.indexOfQuestionHint].answer, this.state.ArrAnswer[this.state.indexOfQuestionHint].ans);
 
            if (checkListOp) {
                let arr = [...this.state.ArrAnswer];
                this.setState({ countPressDetailHint: 0 });
                arr[this.state.indexOfQuestionHint].statusHint = true;
                arr[this.state.indexOfQuestionHint].answerHint = true;
                this.setState({ ArrAnswer: arr });
                this.setState({ statusDetailHint: 'right' });
                this.setState({ TextButtonDetainQuestionHint: 'Tiếp Tục', showButton: true });
            } else {
                if (this.state.countPressDetailHint === 1 && this.state.data[this.state.indexOfQuestionHint].answer[0].split(' ').length <= 1) {
                    let arr = [...this.state.ArrAnswer];
                    arr[this.state.indexOfQuestionHint].statusHint = true;
                    this.setState({ countPressDetailHint: 0 });
                    this.setState({ ArrAnswer: arr });
                    this.setState({ statusDetailHint: 'wrong' });
                    this.setState({ TextButtonDetainQuestionHint: 'Tiếp Tục', showButton: true });
                } else if (this.state.countPressDetailHint < 2) {
                    this.setState({ countPressDetailHint: this.state.countPressDetailHint + 1 });
                    this.setState({ statusDetailHint: 'wrong' });
                    this.setState({ TextButtonDetainQuestionHint: 'Làm Lại', showButton: true });
                } else {
                    let arr = [...this.state.ArrAnswer];
                    arr[this.state.indexOfQuestionHint].statusHint = true;
                    this.setState({ countPressDetailHint: 0 });
                    this.setState({ ArrAnswer: arr });
                    this.setState({ statusDetailHint: 'wrong' });
                    this.setState({ TextButtonDetainQuestionHint: 'Tiếp Tục', showButton: true });
                }
            }
        } else if (this.state.TextButtonDetainQuestionHint === 'Tiếp Tục') {
            this.setState({ isShow: true })
            let arr = [...this.state.ArrAnswer];
            arr[this.state.indexOfQuestionHint].statusHint = true;
            this.setState({ ArrAnswer: arr });
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
                this.setState({ show: 0 });
                this.setState({ statusDetailHint: '' });
                this.setState({ countPressDetailHint: 0 });
                this.setState({
                    TextButtonDetainQuestionHint: 'Kiểm Tra',
                    showButton: false,
                    indexOfQuestionHint: indexOf,
                });
            } else {
                this.props.hideTypeExercise();
                this.props.showFeedback();
                this.setState({ statusScreen: 'resultDone', showButton: true });
            }
        } else if (this.state.TextButtonDetainQuestionHint === 'Làm Lại') {
            if (this.state.countPressDetailHint <= 2) {
                this._ProcessWordHintDetail();
                this.setState({ TextButtonDetainQuestionHint: 'Kiểm Tra', showButton: false });
                this.setState({ statusDetailHint: '' });
                let arr = [...this.state.ArrAnswer];
                arr[this.state.indexOfQuestionHint].ans = '';
                this.setState({ ArrAnswer: arr });
                console.log('v1111');
                this.setState({ isShow: false });
            }
        }
    };
    _OnPressCheckDetailHintQuesstion1 = () => {
        console.log('=====_OnPressCheckDetailHintQuesstion1');
        this.audioHide.current && this.audioHide.current._endAudio()
        this.setState({ showButton: false });
        if (this.state.countPressDetailHint1 < 1) {
            this.setState({ show: this.state.show + 1 });
            let index = this.state.ArrAnswer.findIndex(x => x.statusHint === null || x.statusHint === false);
            this.setState({ indexOfQuestionHint: index });
            if (this.state.TextButtonDetainQuestionHint === 'Kiểm Tra') {
                let checkListOp = lessonMath.CheckAnswer(this.state.data[this.state.indexOfQuestionHint].answer, this.state.ArrAnswer[this.state.indexOfQuestionHint].ans)

                this._onCheckAns1();
                if (checkListOp !== -1) {
                    let arr = [...this.state.ArrAnswer];
                    this.setState({ countPressDetailHint1: 0 });
                    arr[this.state.indexOfQuestionHint].statusHint = true;
                    this.setState({ ArrAnswer: arr });
                    this.setState({ statusDetailHint: 'right' });
                    this.setState({ TextButtonDetainQuestionHint: 'Tiếp Tục', showButton: true });
                } else {
                    if (this.state.countPressDetailHint1 < 2) {
                        this.setState({ countPressDetailHint1: this.state.countPressDetailHint1 + 1 });
                        this.setState({ statusDetailHint: 'wrong' });
                        this.setState({ TextButtonDetainQuestionHint: 'Làm Lại', showButton: true });
                    } else {
                        let arr = [...this.state.ArrAnswer];
                        arr[this.state.indexOfQuestionHint].statusHint = true;
                        this.setState({ countPressDetailHint1: 0 });
                        this.setState({ ArrAnswer: arr });
                        this.setState({ statusDetailHint: 'wrong' });
                        this.setState({ TextButtonDetainQuestionHint: 'Tiếp Tục', showButton: true });
                    }
                }
            } else if (this.state.TextButtonDetainQuestionHint === 'Tiếp Tục') {
                this.setState({ show: 0 });
                let index1 = this.state.ArrAnswer.findIndex(x => x.statusHint === null || x.statusHint === false);
                if (index1 === -1) {
                    this.setState({ statusScreen: 'ShowHind', showButton: true });
                } else {
                    this._ProcessWordHintDetailBegin1(index);
                    this.setState({ statusDetailHint: '' });
                    this.setState({ TextButtonDetainQuestionHint: 'Kiểm Tra', showButton: false });
                }
            } else if (this.state.TextButtonDetainQuestionHint === 'Làm Lại') {
                if (this.state.countPressDetailHint1 <= 2) {
                    this._ProcessWordHintDetail1();
                    this.setState({ TextButtonDetainQuestionHint: 'Kiểm Tra', showButton: false });
                    this.setState({ statusDetailHint: '' });
                    let arr = [...this.state.ArrAnswer];
                    arr[this.state.indexOfQuestionHint].ans = '';
                    this.setState({ ArrAnswer: arr });
                } else {
                }
            }
        } else {
            this.setState({ show: this.state.show + 1 });
            let index = this.state.ArrAnswer.findIndex(x => x.statusHint === null || x.statusHint === false);
            this.setState({ indexOfQuestionHint: index });
            if (this.state.TextButtonDetainQuestionHint === 'Kiểm Tra') {
                this._onCheckAns1();
                if (lessonMath.CheckAnswer(this.state.data[index].answer ,this.state.ArrAnswer[this.state.indexOfQuestionHint].ans)) {
                    let arr = [...this.state.ArrAnswer];
                    this.setState({ countPressDetailHint1: 0 });
                    arr[this.state.indexOfQuestionHint].statusHint = true;
                    this.setState({ ArrAnswer: arr });
                    this.setState({ statusDetailHint: 'right' });
                    this.setState({ TextButtonDetainQuestionHint: 'Tiếp Tục', showButton: true });
                } else {
                    if (this.state.countPressDetailHint1 < 2) {
                        this.setState({ countPressDetailHint1: this.state.countPressDetailHint1 + 1 });
                        this.setState({ statusDetailHint: 'wrong' });
                        this.setState({ TextButtonDetainQuestionHint: 'Làm Lại', showButton: true });
                    } else {
                        let arr = [...this.state.ArrAnswer];
                        arr[this.state.indexOfQuestionHint].statusHint = true;
                        this.setState({ countPressDetailHint1: 0 });
                        this.setState({ ArrAnswer: arr });
                        this.setState({ statusDetailHint: 'wrong' });
                        this.setState({ TextButtonDetainQuestionHint: 'Tiếp Tục', showButton: true });
                    }
                }
            } else if (this.state.TextButtonDetainQuestionHint === 'Tiếp Tục') {
                this.setState({ show: 0 });
                let index1 = this.state.ArrAnswer.findIndex(x => x.statusHint === null || x.statusHint === false);
                if (index1 === -1) {
                    this.setState({ statusScreen: 'ShowHind', showButton: true });
                } else {
                    this._ProcessWordHintDetailBegin1(index);
                    this.setState({ statusDetailHint: '' });
                    this.setState({ TextButtonDetainQuestionHint: 'Kiểm Tra', showButton: false });
                }
            } else if (this.state.TextButtonDetainQuestionHint === 'Làm Lại') {
                if (this.state.countPressDetailHint1 <= 2) {
                    this._ProcessWordHintDetail1();
                    //this.setState({countPressDetailHint:this.state.countPressDetailHint+1});
                    this.setState({ TextButtonDetainQuestionHint: 'Kiểm Tra', showButton: false });
                    this.setState({ statusDetailHint: '' });
                    let arr = [...this.state.ArrAnswer];
                    arr[this.state.indexOfQuestionHint].ans = '';
                    this.setState({ ArrAnswer: arr });
                } else {
                }
            }
        }

    };
    _onPressCheckListHint = () => {
        this._OnPressKT();
        this._SaveArrayAns();
        this.setState({ statusScreen: 'resultDone' });
    };

    render() {
        // console.log(this.state)
        
        return (
            <View>
                {this.state.isloading === true ? this._Loadding() : null}
                {this.state.statusScreen === 'question'
                    ? this._ShowQuestion()
                    : this.state.statusScreen === 'resultNotDone'
                        ? this._ShowResultNotDone()
                        : this.state.statusScreen === 'ShowHind'
                            ? this._ShowHintQuestion()
                            : this.state.statusScreen === 'resultDone'
                                ? this._ShowResultDone() :
                                this.state.statusScreen === 'ShowHintDetailQuestion' ?
                                    this._ShowHintDetailQuestion()
                                    : this.state.statusScreen === 'ShowListDetailHind' ?
                                        this._ShowListDetailHind()
                                        : null}

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
                                        disabled={false}
                                        onPress={() => {
                                            this.pause();
                                            this._OnPressKT();
                                            this._SaveArrayAns();
                                            //this.props.showFeedback();
                                        }}
                                        style={{ ...stylesApp.Sty_Button, marginTop: 15 }}>
                                        <Text style={stylesApp.Sty_Text_Button}>KIỂM TRA</Text>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity
                                        disabled={true}
                                        onPress={() => {
                                            this.pause();
                                            this._OnPressKT();
                                            this._SaveArrayAns();
                                            // this.props.showFeedback();
                                        }}
                                        style={{ ...stylesApp.Sty_Button_disable, marginTop: 15 }}>
                                        <Text style={stylesApp.Sty_Text_Button}>KIỂM TRA</Text>
                                    </TouchableOpacity>
                            ) : this.state.statusScreen === 'resultNotDone' ? (
                                this.state.statusCheckRightOrFalse === 'allRight' ? (
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: '100%' }}>
                                        <TouchableOpacity
                                            onPress={() => {
                                                this._OnShowScript();
                                            }}
                                            style={stylesApps.Sty_ShortButton}>
                                            <Text style={stylesApp.Sty_Text_Button}>SCRIPT</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => {
                                                this._Submit();
                                            }}
                                            style={stylesApps.Sty_ShortButton}>
                                            <Text style={stylesApp.Sty_Text_Button}>TIẾP TỤC</Text>
                                        </TouchableOpacity>
                                    </View>
                                ) : (
                                        <TouchableOpacity
                                            onPress={() => {
                                                this._OnPressLL();
                                            this.props.hideFeedback();

                                                //console.log(this.state.ArrAnswer)
                                            }}
                                            style={stylesApp.Sty_Button}>
                                            <Text style={stylesApp.Sty_Text_Button}>LÀM LẠI</Text>
                                        </TouchableOpacity>
                                    )
                            ) : this.state.statusScreen === 'ShowHind' ? (
                                <TouchableOpacity
                                    onPress={() => {
                                        let number = 0;
                                        let copyArray = [...this.state.ArrAnswer];
                                        for (let i = 0; i < this.state.ArrAnswer.length; i++) {
                                            if (this.state.ArrAnswer[i].typeHind === true) {
                                                if (this.state.ArrAnswer[i] !== '') {
                                                    if (lessonMath.CheckAnswer(this.state.data[i].answer, this.state.ArrAnswer[i].ans)) {
                                                        number++;
                                                        copyArray[i].status = true;
                                                        copyArray[i].statusHint = true;
                                                        //copyArray[i].typeHind = true;
                                                    }
                                                }
                                            } else if (this.state.ArrAnswer[i].typeHind === false) {
                                                if (this.state.ArrAnswer[i] !== '') {
                                                    if (lessonMath.CheckAnswer(this.state.data[i].answer, this.state.ArrAnswer[i].ans)) {
                                                        number++;
                                                        copyArray[i].status = true;
                                                        copyArray[i].statusHint = true;
                                                    }
                                                }
                                            }
                                        }
                                        this.setState({ ArrAnswer: copyArray });
                                        if (number === this.state.data.length) {
                                            this.setState({ statusCheckRightOrFalse: 'allRight' });
                                            this.setState({ statusScreen: 'resultDone' });
                                        } else {
                                            let index = copyArray.findIndex(x => x.statusHint === false || x.statusHint === null);
                                            if (index === -1) {
                                                this._onPressCheckListHint(index);
                                            } else {
                                                this.setState({ indexOfQuestionHint: index });
                                                this._ProcessWordHintDetailBegin1(index);
                                                this._ListHint();
                                            }
                                        }
                                        this.setState({ numberRightEx: number, showButton: false });
                                    }}
                                    style={this.state.showButton ? stylesApp.Sty_Button : stylesApp.Sty_Button_disable}
                                    disabled={!this.state.showButton}>
                                    <Text style={stylesApp.Sty_Text_Button}>TIẾP TỤC</Text>
                                </TouchableOpacity>
                            ) : this.state.statusScreen === 'resultDone' ? (
                                <View style={{ flexDirection: 'row',
                                    justifyContent: 'space-around', 
                                    width: '100%',
                                    marginBottom:SmartScreenBase.smPercenHeight*3
                                }}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this._OnShowScript();
                                        }}
                                        style={stylesApps.Sty_ShortButton}>
                                        <Text style={stylesApp.Sty_Text_Button}>SCRIPT</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this._Submit();
                                        }}
                                        style={stylesApps.Sty_ShortButton}>
                                        <Text style={stylesApp.Sty_Text_Button}>TIẾP TỤC</Text>
                                    </TouchableOpacity>
                                </View>
                            ) :
                                            this.state.statusScreen === 'ShowHintDetailQuestion' ?
                                                <TouchableOpacity
                                                    onPress={() => {
                                                        this._OnPressCheckDetailHintQuesstion();
                                                    }}
                                                    style={this.state.showButton ? stylesApp.Sty_Button : stylesApp.Sty_Button_disable}
                                                    disabled={!this.state.showButton}>
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
                                                            style={this.state.showButton ? stylesApp.Sty_Button : stylesApp.Sty_Button_disable}
                                                            disabled={!this.state.showButton}>
                                                            <Text
                                                                style={stylesApp.Sty_Text_Button}>{this.state.TextButtonDetainQuestionHint}</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                    : null}
                        </View>
                    ) : null}
                {this.state.showScript && <ModalScript
                    audio={this.state.audio}
                    title={this.state.dataFirt?.lesson?.lesson_text_audio}
                    visible={this.state.showScript}
                    close={() => this.setState({ showScript: false })}
                />}
            </View>
        );
    }
}

export default ListeningD7;
