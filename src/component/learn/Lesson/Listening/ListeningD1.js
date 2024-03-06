import React, {Component} from 'react';
import {
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Image,
    Alert,
    Platform,
    ActivityIndicator,
} from 'react-native';
import style from '../Listening/styleD1';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import FileSound from '../FileSound';
import FileSound4 from '../FileSound4';
import StyleLesson from '../StyleLesson';
import stylesApp from '../../../styleApp/stylesApp';
import {connect} from 'react-redux';
import SoundQestion from '../../../SoundQuestion';
import ModalScript from '../../../modalScript'
import LessonBase from '../../../../base/LessonBase';
import FontBase from '../../../../base/FontBase';
import { Colors } from '../../../../styleApp/color';

var Sound = require('react-native-sound');
Sound.setCategory('Playback');
let DataObject1 = new Object();
let DataObject2 = new Object();
let whoosh = [1, 3, 0, 1];
let ans = [];
let dataNew = [];
let a = [];

class ListeningD1 extends Component {
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
            isloading: false,
            title_ENG: '',
            title_VI: '',
            titlePress: false,
            arrayPost: [],
            logid: '',
            data_lesson: {},
            SaveArrayAns: [],
            audio: '', numberAgain: 0,
            checkData: [],

        };
        this.ArrAnswer = [];
        this.CheckResound = [];
        this.sliderEditing = false;
    }

    _Onpress = () => {
        this.setState({titlePress: !this.state.titlePress});
    };

    componentDidMount() {
        //console.log(this.state.data);
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

    _Submit = async () => {
        let arrr = [];

        for (let i = 0; i < this.state.data.length; i++) {
            let ob = new Object();
            (ob.question_id = this.state.dataFirt.data_question[i].question_id),
                (ob.exercise_type = 'listening'),
                (ob.question_type = 1);
            ob.question_score = 0;
            ob.final_user_choice = this.state.data[i].option[this.ArrAnswer[i]];
            let a = [];
            for (let j = 0; j < this.state.arrayPost.length; j++) {
                let obj = new Object();
                obj.num_turn = j;
                // console.log('this.state.arrayPost',this.state.arrayPost)
                //console.log('this.state.arrayPost[i]', this.state.arrayPost[j].ans[i]);
                obj.user_choice = this.state.data[i].option[this.state.arrayPost[j].ans[i]];
                obj.score = this.state.data[i].option[this.ArrAnswer[i]] === this.state.data[i].answer ? 1 : 0;
                a.push(obj);
            }
            ob.detail_user_turn = a;
            arrr.push(ob);
        }
        if (this.state.checkType === 'Testing') {
            //console.log(this.ArrAnswer)
            //this.props.setDataAnswer(arrr);
        } else {
            this.props.saveLogLearning(arrr);
        }
    };

    componentWillMount() {
        //alert(this.props.checkType);
        let arraycheckData = [...this.state.checkData];
        let array = [];
        this.setState({isloading: true});
        this.setState({checkType: this.props.checkType});
        dataNew = [];
        let response = {};
        response['data'] = this.props.dataContent;
        this.setState({data_lesson: response});
        // this._postDataFirt(response.data);
        this.setState({dataFirt: response.data});
        try{
        for (let i = 0; i < response.data.data_question.length; i += 1) {
            array.push(null);
            DataObject1 = new Object();
            DataObject1.question_id = response.data.data_question[i].question_id;
            ans = [];
            for (
                let j = 0;
                j < response.data.data_question[i].list_option.length;
                j += 1
            ) {
                DataObject2 = new Object();
                if (response.data.data_question[i].list_option[j].score == '1') {
                    DataObject1.answer =
                        response.data.data_question[i].list_option[j].match_option_text[0];
                }
                DataObject1.question =
                    response.data.data_question[i].list_option[j].question_content;
                ans.push(
                    response.data.data_question[i].list_option[j].match_option_text[0],
                );
                DataObject1.score =
                    response.data.data_question[i].list_option[j].score;
                DataObject1.option = ans;
                this.setState({
                    title_ENG:
                    response.data.data_question[i].list_option[j].group_content,
                });
                this.setState({
                    title_VI:
                    response.data.data_question[i].list_option[j].group_content_vi,
                });
                this.setState({audio: response.data.lesson.lesson_audio});
                DataObject1.explain = response.data.data_question[i].list_option[j].explain_parse.content_question_text;
            }
            dataNew.push(DataObject1);


            for (let index = 0; index < dataNew.length; index++) {
                this.ArrAnswer.push(-1);
                this.CheckResound.push(false);

            }
        }
    }catch(er){console.log("=====loi",er); Alert.alert("Bài tập này đang bị lỗi dữ liệu, vui lòng chọn bài khác")}
        for (let i = 0; i < array.length; i++) {
            let oj = {
                value: '',
                disabled: false,
            };
            arraycheckData.push(oj);
        }
        this.setState({data: dataNew, checkData: arraycheckData});
        this.ArrAnswer = array;
        if (this.props.checkType === 'afterTest') {
            whoosh = this.props.data_answer;
            this.ArrAnswer = whoosh;

            let check = 0;
            for (let index = 0; index < dataNew.length; index++) {
                if (
                    dataNew[index].option[this.ArrAnswer[index]] ==
                    dataNew[index].answer
                ) {
                    check += 1;
                    //console.log(check);
                }
            }
            if (check == this.state.data.length) {
                this.setState({showImage: true});
            }
            this.setState({NumberTrue: check});
            this.setState({checkResuilt: 'ahihi'});
        } else {
            //this.play(response.data.lesson.lesson_audio);
        }
        this.setState({isloading: false});
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

    _SubmitTeting = async () => {
        this.setState({numberAgain: this.state.numberAgain + 1});
        let dataHistory = [];
        let copySaveArrayAns = [...this.state.SaveArrayAns];
        let resual = [...this.ArrAnswer];
        let newObject = new Object();
        newObject.ans = resual;
        copySaveArrayAns.push(newObject);

        //console.log('this.state.SaveArrayAns',this.ArrAnswer);
        //console.log('this.props.modeF',this.props.modeF);

        for (let i = 0; i < this.state.dataFirt.data_question.length; i++) {
            let ar = [];
            for (let j = 0; j < copySaveArrayAns.length; j++) {
                let Ob1 = new Object();
                Ob1.num_turn = j;
                Ob1.score = this.state.data[i].option[this.ArrAnswer[i]] === this.state.data[i].answer ? 1 : 0;
                Ob1.user_choice = this.state.data[i].option[this.ArrAnswer[i]];
                ar.push(Ob1);
            }
            let Ob = new Object();
            Ob.question_id = this.state.dataFirt.data_question[i].question_id;
            Ob.exercise_type = 'Listening';
            Ob.question_type = this.state.dataFirt.data_question[i].list_option[0].question_type;
            Ob.question_score = '0';
            Ob.final_user_choice = this.ArrAnswer[i];
            Ob.detail_user_turn = ar;
            dataHistory.push(Ob);
        }

        if (this.state.checkType === 'Testing') {
            this.props.setDataAnswer(dataHistory);
        }

    };
    play = async (link) => {
        if (this.sound) {
            this.sound.play(this.playComplete);
            this.setState({playState: 'playing'});
        } else {
            this.sound = new Sound(link, null, (error) => {
                if (error) {
                    console.log('failed to load the sound', error);
                    //Alert.alert('Notice', 'audio file error. (Error code : 1)');
                    this.setState({playState: 'paused'});
                } else {
                    this.setState({
                        playState: 'playing',
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
                //Alert.alert('Notice', 'audio file error. (Error code : 2)');
            }
            this.setState({playState: 'paused', playSeconds: 0});
            this.sound.setCurrentTime(0);
        }
    };

    pause = () => {
        if (this.sound) {
            this.sound.pause();
        }

        this.setState({playState: 'paused'});
    };

    _ChooseAnswer(index, id) {
        let array = [...this.state.checkData];
        this.setState({ShowCheck: false});
        let number = 0;
        // this.ArrAnswer[index] = id;
        // console.log(this.state.data[index].option[id]);
        array[index].value = this.state.data[index].option[id];

        array.forEach((item, ind) => {
            let a = this.state.data[ind].option.findIndex((string) => string == item.value);
            if (item.value != '') {
                number++;
                this.ArrAnswer[ind] = a;
            }
        });
        if (number == array.length) {
            this.setState({ShowCheck: true});
        }
        let CheckShowButton = this.ArrAnswer.filter(function (e) {
            return e == -1;
        });
        let status = this.ArrAnswer.find(element => element === null);
        if (status === undefined) {
            this.state.ShowCheck = false;
        }
        console.log('array', array);
        this.setState({refresh: !this.state.refresh, checkData: array});
    }

    checkNumber = 0;

    _CheckResuilt() {
        //console.log(this.ArrAnswer);
        this.pause();
        if (this.state.checkType === 'Testing') {
            this._SubmitTeting();
            //this._Submit();
            // this.props.nextReviewResult();
        } else if (this.state.checkType === 'afterTest') {

            if (this.state.checkResuilt == null) {
                let check = 0;
                for (let index = 0; index < this.state.data.length; index++) {
                    if (
                        this.state.data[index].option[this.ArrAnswer[index]] ==
                        this.state.data[index].answer
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
                let array = [...this.state.checkData];

                this.props.hideTypeExercise();
                let check = 0;
                for (let index = 0; index < this.state.data.length; index++) {
                    array[index].value = '';
                    array[index].disabled = false;
                    if (
                        this.state.data[index].option[this.ArrAnswer[index]] ==
                        this.state.data[index].answer
                    ) {
                        array[index].value = this.state.data[index].option[this.ArrAnswer[index]];
                        array[index].disabled = true;
                        check++;
                    }
                }
                this.setState({checkData: array, numberAgain: this.state.numberAgain + 1});
                // console.log('arrayPost', array)
                this.setState({NumberTrue :check});
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
                this.setState({arrayPost: a});
                if (this.checkNumber >= 2) {
                    this.props.showFeedback();
                }
            } else if (this.state.checkResuilt == false) {
                if (this.checkNumber < 2) {
                    this.props.showTypeExercise();
                    this.setState({checkResuilt: null});
                    this.setState({ShowCheck: false});
                    let array = [];
                    for (let index = 0; index < this.state.data.length; index++) {
                        array.push(null);

                    }
                    this.ArrAnswer = array;
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

    _OnHideScript() {
        this.setState({showScript: false});
    }

    render() {
        return (
            <View
                style={style.ViewRender}>
                {this.state.isloading === true ? (
                    <View
                        style={style.ViewLoading}>
                        <ActivityIndicator size="large" color="#0000ff"/>
                    </View>
                ) : null}
                {console.log("=====showScript", this.state.showScript)}
                {this.state.checkResuilt == null ? (
                    <View style={{flex: 1}}>
                        <SoundQestion Audio={this.state.audio}/>
                        <View
                            style={style.ViewFlatlist}>
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
                <View
                    style={style.ViewBaoButton}>
                    {
                            <View>
                                {this.state.checkResuilt == null ? (
                                    this.state.ShowCheck == true ?
                                        <TouchableOpacity
                                            disabled={false}
                                            onPress={() => {
                                                this._CheckResuilt();
                                            }}
                                            style={stylesApp.Sty_Button}>
                                            <Text style={stylesApp.Sty_Text_Button}>KIỂM TRA</Text>
                                        </TouchableOpacity>
                                        :
                                        <TouchableOpacity
                                            style={stylesApp.Sty_Button_disable}>
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
                                        <Text style={stylesApp.Sty_Text_Button}>LÀM LẠI</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <View style={{flexDirection: 'row'}}>
                                        {this.state.checkResuilt == null ? null : this.state
                                            .checkResuilt == false && this.checkNumber < 2 ? null : (
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
                                                                this.checkNumber < 2
                                                                ? 0
                                                                : SmartScreenBase.smPercenWidth * 5,
                                                    },
                                                ]}>
                                                <Text style={stylesApp.Sty_Text_Button}>SCRIPT</Text>
                                            </TouchableOpacity>
                                        )}
                                        <TouchableOpacity
                                            onPress={() => {
                                                this._CheckResuilt();
                                            }}
                                            style={[
                                                stylesApp.Sty_Button,
                                                {
                                                    width:
                                                        this.state.checkResuilt == null
                                                            ? SmartScreenBase.smPercenWidth * 90
                                                            : this.state.checkResuilt == false &&
                                                            this.checkNumber < 2
                                                            ? SmartScreenBase.smPercenWidth * 90
                                                            : SmartScreenBase.smPercenWidth * 40,
                                                },
                                            ]}>
                                            <Text style={stylesApp.Sty_Text_Button}>TIẾP TỤC</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </View>
                    }

                </View>
                {this.state.showScript && <ModalScript
                    audio={this.state.audio}
                    title={this.state.dataFirt.lesson.lesson_text_audio}
                    visible={this.state.showScript}
                    close={()=>this._OnHideScript()}
                />}
            </View>
        );
    }

    moveWedView = (str) => {
        this.setState({showWeb: true});
        this.setState({String: str});
    };
    closeWebView = () => {
        this.setState({showWeb: false});
    };
    RenderItem = ({item, index}) => {
        let arr = item.question.split(' ');
        return (
            <View
                style={style.ViewRenderItem}>
                <View
                    style={style.styleViewQues}>
                    <View
                        style={style.styleViewQuesText}>
                        <Text style={style.styleNumberQues}>
                            {index + 1}.{' '}
                        </Text>
                        {arr.map((e, index) => {
                            return (
                                <View key={index} style={{}}>
                                    <TouchableOpacity
                                        onLongPress={() => LessonBase.goTranslate(e)}
                                        style={[stylesApp.txt, {zIndex: 0}]}>
                                        <Text style={style.styleNumberQues}>{e} </Text>
                                    </TouchableOpacity>
                                </View>
                            );
                        })}
                    </View>
                    <View
                        style={style.styleListOption}>
                        {item.option.map((e, key) => {
                            return (
                                this.state.numberAgain > 0 ?
                                    <TouchableOpacity
                                        onPress={() => {
                                            this._ChooseAnswer(index, key);
                                        }}
                                        disabled={this.state.checkData[index].disabled}
                                    >
                                        <View
                                            style={[
                                                StyleLesson.Sty_View_Border,
                                                style.styleTexxtQues,
                                                {
                                                    borderColor:
                                                        this.state.checkData[index].value == e
                                                            ? 'rgba(255,255,255,0.95)'
                                                            : '#F9E815',
                                                    backgroundColor:
                                                        this.state.checkData[index].value == e
                                                            ? '#F9E815'
                                                            : 'rgba(255,255,255,0.95)',
                                                },
                                            ]}>
                                            <Text
                                                style={[
                                                    stylesApp.txt,
                                                    {fontSize: SmartScreenBase.smFontSize * 45},
                                                ]}>
                                                {this.option[key] + '. ' + e}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity
                                        onPress={() => {
                                            this._ChooseAnswer(index, key);
                                        }}>
                                        <View
                                            style={[
                                                StyleLesson.Sty_View_Border,
                                                style.styleTexxtQues,
                                                {
                                                    borderColor:
                                                        this.state.checkData[index].value == e
                                                            ? 'rgba(255,255,255,0.95)'
                                                            : '#F9E815',
                                                    backgroundColor:
                                                        this.state.checkData[index].value == e
                                                            ? '#F9E815'
                                                            : 'rgba(255,255,255,0.95)',
                                                },
                                            ]}>
                                            <Text
                                                style={[
                                                    stylesApp.txt,
                                                    {fontSize: SmartScreenBase.smPercenWidth * 4},
                                                ]}>
                                                {this.option[key] + '. ' + e}
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                            );
                        })}
                    </View>
                </View>
            </View>
        );
    };

    _ShowResuilt() {
        return (
            <View style={style.styleViewShowResuilt}>
                <View style={{
                    ...style.styleViewText,
                    minHeight: SmartScreenBase.smBaseWidth * 250,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    {this.state.checkResuilt == true || this.checkNumber >= 2 ? (
                        <View style={style.styleViewSound}>
                            <FileSound showImage={this.state.showImage == true ? 'true' : 'false'}/>
                        </View>
                    ) : <FileSound4 showImage={this.state.showImage == true ? 'true' : 'false'}/>}
                    <Text
                        style={style.styleText}>
                        BẠN ĐÃ TRẢ LỜI ĐÚNG {this.state.NumberTrue}/{this.state.data.length}
                    </Text>
                </View>
                <View
                    style={style.styleViewFlat}>
                    <View
                        style={style.styleViewFlaResuilt}>
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

    RenderItemResuilt = ({item, index}) => {
        //A, B, C, D
        const valueOption = this.option[
            this.state.data[index].option.indexOf(
                this.state.data[index].option.find(
                    (answer) =>
                        answer === this.state.data[index].option[this.ArrAnswer[index]],
                ),
            )
            ];
        const resultOption = this.option[
            this.state.data[index].option.indexOf(this.state.data[index].answer)
            ];
        const resultOption1 = this.option[
            this.state.data[index].option.indexOf(this.state.data[index].option[this.ArrAnswer[index]])
            ];
        if (this.checkNumber < 2 && this.state.checkResuilt == false) {
            return (
                <View
                    style={[
                        StyleLesson.Sty_View_Border,
                        style.styleRenderItemResuilt,
                        {
                            borderColor:
                                this.state.checkData[index].value ==
                                this.state.data[index].answer
                                    ? 'rgba(198,229,14,0.95)'
                                    : '#e21010',
                        },
                    ]}>
                    <View
                        style={style.styleTextIndexQues}>
                        <Text
                            style={{...StyleLesson.question_text, fontFamily: FontBase.MyriadPro_Bold, color: Colors.Black}}>
                            {index + 1}.{' '}
                        </Text>
                        <Text
                            style={{...StyleLesson.question_text, fontFamily: FontBase.MyriadPro_Bold, color: Colors.Black, width: SmartScreenBase.smPercenWidth*78}}>
                            {item.question}
                        </Text>
                    </View>

                    <View
                        style={style.styleImageView}>
                        {this.state.checkData[index].value ==
                        this.state.data[index].answer ? (
                            <Image
                                source={{uri: 'lesson_grammar_image3'}}
                                style={StyleLesson.Image_Explain}
                            />
                        ) : null}

                        <Text
                            style={[
                                StyleLesson.question_text,
                                {
                                    color:
                                        this.state.checkData[index].value ==
                                        this.state.data[index].answer
                                            ? 'rgba(198,229,14,0.95)'
                                            : '#e21010',
                                    fontWeight: 'bold',
                                    width: SmartScreenBase.smPercenWidth*77,
                                    marginLeft: SmartScreenBase.smPercenWidth*2.5
                                },
                            ]}>
                            {valueOption +
                            '. ' +
                            this.state.data[index].option[this.ArrAnswer[index]]}
                        </Text>
                    </View>
                    <View
                        style={style.styleImage}>
                        <Image
                            source={{
                                uri:
                                    this.state.checkData[index].value ==
                                    this.state.data[index].answer
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
                        style.styleViewelse,
                        {
                            borderColor:
                                this.state.checkData[index].value ==
                                this.state.data[index].answer
                                    ? 'rgba(198,229,14,0.95)'
                                    : '#e8425a',
                        },
                    ]}>
                    <View
                        style={style.styleViewTextindex}>
                        <Text
                            style={{
                                    fontSize: SmartScreenBase.smFontSize * 45,
                                    fontFamily: FontBase.MyriadPro_Bold,
                                    color: Colors.Black
                                }}>
                            {index + 1}.{' '}
                        </Text>
                        <Text
                            style={{
                                fontSize: SmartScreenBase.smFontSize * 45,
                                fontFamily: FontBase.MyriadPro_Bold,
                                color: Colors.Black
                            }}>
                            {item.question}
                        </Text>
                    </View>
                    {this.state.checkData[index].value ==
                    this.state.data[index].answer ? null : (
                        <View
                            style={style.styleView}>
                            <View
                                style={style.styleView1}
                            />
                            <Text
                                style={[
                                    stylesApp.txt,
                                    style.styleTxtIndex,
                                ]}>
                                {resultOption1 +
                                '. ' +
                                this.state.data[index].option[this.ArrAnswer[index]]}
                            </Text>
                        </View>
                    )}

                    <View
                        style={style.styleViewans}>
                        <Image
                            source={{uri: 'lesson_grammar_image3'}}
                            style={StyleLesson.Image_Explain}
                        />
                        <Text
                            style={[
                                stylesApp.txt,
                                style.styleTextAns,
                            ]}>
                            {resultOption + '. ' + this.state.data[index].answer}
                        </Text>
                    </View>
                        <View
                            style={style.styleViewGTelse}>
                            <Text style={stylesApp.txt}>
                                <Text
                                    style={style.styleTextGT}>
                                    GIẢI THÍCH:
                                </Text>
                            </Text>
                            <Text style={[
                                stylesApp.txt,
                                {
                                    marginLeft: SmartScreenBase.smPercenWidth * 5,
                                    fontSize: SmartScreenBase.smPercenWidth * 4,
                                },
                            ]}>
                                {item.explain}
                            </Text>
                        </View>
                    <View
                        style={style.styleViewImageAns}>
                        <Image
                            source={{
                                uri:
                                    this.state.checkData[index].value ==
                                    this.state.data[index].answer
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
        data_answer: state.ListeningD3Reducer.data_answer,
        data_login: state.AuthStackReducer.dataLogin,
    };
}

export default connect(mapStateToProps)(ListeningD1);
