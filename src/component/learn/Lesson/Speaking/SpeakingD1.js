import React, {Component} from 'react';
import {
    Text,
    View,
    Animated,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Image,
    PanResponder,
    FlatList,
    Alert,
    ActivityIndicator,
    ImageBackground, Dimensions,
} from 'react-native';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import styleButton from '../../../../../src/styleApp/stylesApp';
import StyleLesson from '../StyleLesson';
import stylesApp from '../../../styleApp/stylesApp';
import axios from 'axios';
import Header from './Header';
import {connect} from 'react-redux';
import FileSound from '../FileSound';
import Sound from 'react-native-sound';
import LogBase from '../../../../base/LogBase';
import FontBase from '../../../../base/FontBase';
Sound.setCategory('Playback');

const {width, height} = Dimensions.get('window');
let DataObject1 = new Object();
let dataNew = [];
let dataNewoptiontext = [];
var safeComparison = 0;
var numberofRework = 0;
var totalScore = 0;

class SpeakingD1 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            refresh: false,
            checkPanresponder: false,
            keyGrant: -1,
            checkTouchable: false,
            keycheck: -1,
            checkResuilt: null,
            showCheck: false,
            heightType: 0,
            Answer: [],
            stateTitelVi: '',
            transletNe_Vid: false,
            stateTitelEn: '',
            dataIndexQuestion: 0,
            dataReturn: {},
            loading: true,
            data_question: [],
            questionType: '',
            lessonId: '',
            idLog: [],
            stateboder: null,
            showAnswer: false,
            manList: []
        };
        this.ListDropZone = [];
        this.ListCheckAnswer = [];
        this.ListCheck = [];
        this.ListAnswer = [];
        this._transletNe_Vi = this._transletNe_Vi.bind(this);

    }

    componentDidMount() {
        safeComparison = 0;
        totalScore = 0;
        let response = {};
        response['data'] = this.props.dataContent;
        let data = response.data;
        this.setState({lessonId: data.lesson.id});
        // this._postDataFirt(data);
        this.setState({data_question: response.data.data_question});
        dataNewoptiontext = [];
        for (let i = 0; i < response.data.data_question[this.state.dataIndexQuestion].list_option.length; i += 1) {
            dataNewoptiontext.push(response.data.data_question[this.state.dataIndexQuestion].list_option[i].option_text);
        }
        dataNew = [];
        for (let i = 0; i < response.data.data_question[this.state.dataIndexQuestion].list_option.length; i += 1) {
            dataNew.push(response.data.data_question[this.state.dataIndexQuestion].list_option[i].conversation_index);
            if(i==0){
                var mlist = []
                mlist.push(response.data.data_question[this.state.dataIndexQuestion].list_option[i].person_a)
                mlist.push(response.data.data_question[this.state.dataIndexQuestion].list_option[i].person_b)
                this.setState({manList: mlist})
            }
        }
        let Vidata = response.data.data_question[this.state.dataIndexQuestion].list_option[0].group_content_vi;
        let Endata = response.data.data_question[this.state.dataIndexQuestion].list_option[0].group_content;
        this.setState({stateTitelVi: Vidata});
        this.setState({stateTitelEn: Endata});
        let dataOption = [...this.state.data];
        dataOption = [];
        for (let i = 0; i < dataNew.length; i++) {
            let oj1 = {};
            oj1.Question = dataNew[i];
            oj1.Answerk = dataNewoptiontext[i];
            oj1.position = i;
            dataOption.push(oj1);
        }
        this.setState({data: dataOption});
        let answer_c = [...this.state.Answer];
        answer_c = this._randomAnswer(dataNew, dataNewoptiontext);
        this.setState({Answer: answer_c});
        this.setState({loading: false});
        this.props.saveLogLearning([]);
    }

    saverData = () => {
        let dataFake = [{
            question_id: this.state.data_question[0].question_id,
            exercise_type: 'speaking',
            question_type: this.state.questionType,
            question_score: totalScore,
            final_user_choice: 'harmful to your eyes',
            detail_user_turn: [
                {
                    num_turn: '1',
                    score: totalScore,
                    user_choice: 'harmful to your eyes',
                },
            ],
        }];
        LogBase.log("=====saverData",dataFake)
        this.props.saveLogLearning(dataFake);
    };

    _randomAnswer(dataNew, dataNewoptiontext) {
        let random = [];
        for (let i = 0; i < dataNew.length; i++) {
            let oj1 = {};
            oj1.Question = dataNew[i];
            oj1.Answerk = dataNewoptiontext[i];
            oj1.position = i;
            random.push(oj1);
        }

        let j, x, i;
        for (i = random.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = random[i];
            random[i] = random[j];
            random[j] = x;
        }
        return random;
    }

    SetDropZone(event, key) {
        this.ListDropZone[key] = event.nativeEvent.layout;
    }

    DropZone(gesture, key) {
        let dz = this.ListDropZone[key];
        return gesture.moveY > SmartScreenBase.smPercenHeight * 12 + this.state.heightType + (SmartScreenBase.smPercenHeight + dz.height) * key
            && gesture.moveY < SmartScreenBase.smPercenHeight * 12 + this.state.heightType + (SmartScreenBase.smPercenHeight + dz.height) * (key + 1)
            && gesture.moveX > SmartScreenBase.smPercenWidth * 55;
    }

    _BorderColor(index) {
        if (this.state.stateboder === index) {
            return '#E5B007';
        } else {
            return 'rgba(255,255,255,0.9)';
        }
    }

    _backgroundColor(index) {
        if (this.state.checkResuilt == null) {
            if (this.state.keycheck == index) {
                return '#E5B007';
            } else {
                return 'rgba(255,255,255,0.9)';
            }
        } else {
            if (!this.state.checkResuilt && this.NumberCheck < 3) {
                if (this.state.Answer[index].position === index) {
                    return '#BDE015';
                } else {
                    return '#E45659';
                }
            } else {
                return '#BDE015';
            }
        }
    }

    renMan(index) {
        var str = ""
        if(index > 0) str = this.state.manList[index-1] + ": "
        return str
    }

    _tintColor(item, index) {
        if (this.state.checkResuilt == null) {
            if (this.state.keycheck == index) {
                return '#E5B007';
            } else {
                return 'rgba(255,255,255,0.9)';
            }
        } else {
            if (!this.state.checkResuilt && this.NumberCheck < 3) {
                if (this.state.Answer[index].position === index) {
                    return '#BDE015';
                } else {
                    return '#E45659';
                }
            } else {
                return '#BDE015';
            }
        }
    }

    _transletNe_Vi = () => {
        this.setState({transletNe_Vid: !this.setState.transletNe_Vid});
    };

    _renderLast = () => {
        return (
            <View style={{flex: 1}}>
                <View style={{justifyContent: 'center', width: '90%'}}>
                    <Text
                        style={{
                            fontSize: SmartScreenBase.smFontSize * 60,
                            fontFamily: 'iCielSoupofJustice',
                            color: '#fff',
                            marginTop: SmartScreenBase.smPercenHeight * 4,
                            marginBottom: SmartScreenBase.smPercenHeight * 2,
                            marginLeft: SmartScreenBase.smPercenWidth * 2,
                        }}>
                        Đáp án đúng là:
                    </Text>
                </View>
                <FlatList
                    data={this.state.data}
                    keyExtractor={(item, index) => 'item' + index}
                    renderItem={this._Render_Item.bind(this)}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        );
    };

    _renderResult = () => {
        console.log('this.NumberCheck',this.NumberCheck)
        const showIcon = this.state.checkResuilt  === true || this.NumberCheck >= 2
        return (
            <View style={{flex: 1, marginTop: SmartScreenBase.smPercenHeight * 2}}>
                <View style={{
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: width,
                    height: SmartScreenBase.smBaseWidth * (showIcon?350:10),
                }}>
                    <FileSound
                    showIcon={showIcon?null:'none'}
                    showImage={this.state.checkResuilt?'true':'false'}/>
                </View>
                <View style={{
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: width,
                    marginBottom: SmartScreenBase.smPercenHeight * 2,
                }}>
                    <Text
                        style={{
                            fontSize: SmartScreenBase.smFontSize * 60,
                            color: 'white',
                            fontFamily: 'iCielSoupofJustice',
                        }}>
                        BẠN ĐÃ TRẢ LỜI ĐÚNG {safeComparison}/{this.state.data.length}
                    </Text>
                </View>
                <FlatList
                    data={this.state.Answer}
                    extraData={this.state}
                    keyExtractor={(item, index) => 'item' + index}
                    renderItem={this._Render_Item.bind(this)}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        );
    };

    _renderAnswer = () => {
        return (
            <View style={{flex: 1}}>
                <FlatList
                    data={this.state.Answer}
                    extraData={this.state}
                    keyExtractor={(item, index) => 'item' + index}
                    renderItem={this._Render_Item.bind(this)}
                />
            </View>
        );
    };

    render() {
        return (
            <View
                style={{flex: 1}}>
                <View style={{height: '95%', alignItems: 'center'}}>
                    {
                        this.state.loading &&
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <ActivityIndicator size="large" color="#0000ff"/>
                            <View>
                                <Text style={{color: '#fff'}}>
                                    Vui lòng chờ trong giây lát...
                                </Text>
                            </View>
                        </View>
                    }
                    {
                        (this.state.checkResuilt  === null &&this.NumberCheck < 3)?this._renderAnswer()
                            :
                            this.state.checkResuilt===true?this._renderResult()
                            :
                            !this.state.checkResuilt && this.NumberCheck < 3
                                ?
                                this._renderResult()
                                :
                                this._renderLast()
                    }

                    <View style={{
                        alignItems: 'center',
                        height: SmartScreenBase.smPercenHeight * 10,
                        justifyContent: 'center',
                    }}>
                        <TouchableOpacity
                            disabled={this.state.showCheck == true ? false : true}
                            onPress={() => {
                                this.checkResuilt();
                            }}
                            style={this.state.showCheck == true ? styleButton.Sty_Button : styleButton.Sty_Button_disable}
                        >
                            <Text
                                style={styleButton.Sty_Text_Button}>{
                                (this.state.checkResuilt == null &&this.NumberCheck < 3) ? 'KIỂM TRA' : 
                                    (!this.state.checkResuilt && this.NumberCheck < 2) ? 'LÀM LẠI' : 'TIẾP TỤC'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }

    _Render_Item = ({item, index}) => {
        return (
            <TouchableWithoutFeedback 
            style={{
                width: SmartScreenBase.smPercenWidth * 90,
                alignSelf: 'center',
                marginTop: SmartScreenBase.smPercenHeight * 2,
            }}>
                <View onLayout={(event) => {
                    this.SetDropZone(event, index);
                }}>

                    <View style={{
                        flexDirection: 'row', 
                        alignItems: 'center', 
                        justifyContent: 'center'}}>
                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginRight: SmartScreenBase.smPercenWidth * 4,
                        }}>
                            <Image source={{uri: 'lesson_speaking_image1'}}
                                   style={{
                                       tintColor: this._tintColor(item, index),
                                       width: SmartScreenBase.smBaseWidth * 108,
                                       height: SmartScreenBase.smBaseWidth * 108,
                                       resizeMode: 'contain',
                                   }}
                            />
                            <Text style={{
                                fontWeight: 'bold',
                                position: 'absolute',
                                fontSize: SmartScreenBase.smPercenWidth * 5,
                            }}>{index + 1}</Text>
                        </View>
                        <TouchableOpacity disabled={this.state.checkTouchable||item.isRight} 
                        onPress={() => {
                            this._OnPressAnswer(index);
                        }}>
                            <Animated.View
                                style={[StyleLesson.Sty_View_Border, {
                                    flexDirection: 'row',
                                    zIndex: this.state.keyGrant == index ? 1 : 0,
                                    borderWidth: 3,
                                    borderColor: this.state.checkResuilt === null ? this._BorderColor(index) : '#fff',
                                    backgroundColor:(this.state.checkResuilt === null&&item.isRight)?'#dcdcdc':this._backgroundColor(index),
                                    width: SmartScreenBase.smPercenWidth * 80,
                                }]}>
                                <View style={{
                                    marginLeft: SmartScreenBase.smPercenWidth * 3,
                                    width: '90%',
                                }}>
                                    <Text style={{
                                        ...stylesApp.txt,
                                        fontSize: SmartScreenBase.smFontSize * 45,
                                        fontFamily: FontBase.MyriadPro_Regular
                                    }}><Text style={{fontFamily: FontBase.MyriadPro_Bold}}>{this.renMan(item.Question)}</Text>{item.Answerk}</Text>
                                </View>
                            </Animated.View>
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    };
    checkPress = true;

    _OnPressAnswer(index) {
        if (this.checkPress) {
            this.setState({stateboder: index});
            this.setState({
                keyGrant: index,
                refresh: true,
                keycheck: index,
            });
            this.state.Answer[index].changePosition = true;
            this.checkPress = false;
        } else {
            if (this.state.stateboder === index) {
                this.setState({keycheck: -1, stateboder: -1});
            } else {
                this.setState({checkTouchable: true, refresh: false, keycheck: -1, showCheck: true, stateboder: index});
            }
            let dataOp = [...this.state.Answer];
            let wordChoose = dataOp[this.state.keyGrant];
            dataOp.splice(this.state.keyGrant, 1, dataOp[index]);
            dataOp.splice(index, 1, wordChoose);
            this.setState({Answer: dataOp});
            setTimeout(() => {
                this.checkPress = true;
                this.setState({checkTouchable: false});
            }, 500);
        }
    }

    NumberCheck = 0;

    checkResuilt() {
        if (this.state.checkResuilt == null) {
            this.props.hideTypeExercise();
            let count = 0;
            this.state.Answer.forEach((element, index) => {
                if (element.position === index) {
                    element.isRight = true;
                    safeComparison = safeComparison + 1;
                    count++;
                }
            });
            if(this.NumberCheck < 2){
                totalScore = safeComparison / this.state.data.length;
            }
            if (count === this.state.data.length) {
                this.setState({
                    checkResuilt: true,
                    checkTouchable: true,
                    stateboder:-1,
                });
            } else {
                this.setState({
                    checkResuilt: false,
                    checkTouchable: true,
                    stateboder:-1,
                });
            }
        } else if (this.state.checkResuilt === false) {
            this.NumberCheck += 1;
            if (this.NumberCheck < 3) {
                this.props.showTypeExercise();
                safeComparison = 0;
                this.setState({
                    checkTouchable: false,
                    showCheck: false,
                    checkResuilt: null,
                    stateboder:-1,
                });
            } else if(this.NumberCheck ===3){
                this.setState({
                    checkTouchable: false,
                    showCheck: true,
                    stateboder:-1,
                });
            }
             else {
                this.saverData();
            }
        } else {
            this.saverData();
        }
    }
}

function mapStateToProps(state) {
    return {
        dataLogin: state.AuthStackReducer.dataLogin,
    };
}

export default connect(mapStateToProps)(SpeakingD1);
