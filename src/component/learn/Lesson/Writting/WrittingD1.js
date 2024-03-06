import React, { Component } from 'react';
import {
    Text,
    View,
    Dimensions,
    Image,
    TouchableOpacity,
    ScrollView,
    Alert, ActivityIndicator,
} from 'react-native';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import ButtonCheck from '../../../items/ButtonCheck';
import TypeExercise from '../Component/TypeExercise';
import StyleLesson from '../StyleLesson';
import axios from 'axios';
import stylesApp from '../../../styleApp/stylesApp';
import { connect } from 'react-redux';
import FileSound from '../FileSound';
import API from '../../../../API/APIConstant';
import { ActionWrittingD1 } from '../../../../redux/actions/ActionWrittingD1';
import Utils from '../../../../utils/stringUtils';
import FontBase from '../../../../base/FontBase';
import stylesButton from '../../../../styleApp/stylesApp';
import LogBase from '../../../../base/LogBase';

let DataObject1 = new Object();

class WrittingD1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ShowCheck: false,
            heightView: 0,
            refresh: false,
            checkResuilt: null,
            data: [
                {
                    question: [],
                    answer: '',
                    explain: '',
                    answercheck: ''
                },
            ],
            lenghtline: 0,
            lenghtView: 0,
            heightlinew: 0,
            linew: 0,
            indexQuestion: 0,
            title_ENG: '',
            title_VI: '',
            titlePress: false,
            checkType: '',
            indexAfter: 0,
            isloading: false,
            CheckTimeFalse: 0,
            allright: false,
            arrayScore: [],
            logid: '',
            data_lesson: {},
            dataFirt: {},
            indexAns: 0,
            listAns: [],
            Answerr: [],
            answerTrue: null
        };
        this.Answer = [];
        this.ListCheckAnswer = [];
        this.KeyWordInAnswer = [];
        this.isRight = false
    }
    componentWillMount() {
        this.setState({ isloading: true });
        let data = [];
        let dataLogin = this.props.data_login;
        let response = {};
        response['data'] = this.props.dataContent;
        this.setState({ checkType: this.props.checkType });
        this.setState({ dataFirt: response.data });
        this.setState({ data_lesson: response });
        for (let i = 0; i < response.data.data_question.length; i++) {
            var DataObject1 = new Object();
            let text = ' ' + response.data.data_question[i].list_option[0].question_content
            DataObject1.question = this.shuffle(text.split('/'));
            DataObject1.sttWord = [];
            for(var j=0; j < DataObject1.question.length; j++){
                DataObject1.sttWord.push(j)
            }
            DataObject1.answer = text;
            DataObject1.explain = response.data.data_question[i].list_option[0].explain_parse.content_question_text;
            DataObject1.data_answer = []
            response.data.data_question[i].list_option[0].match_option_text.forEach(element => {
                var listWordM = element.split(' ');
                DataObject1.data_answer.push(listWordM)
            });
            
            data.push(DataObject1);
            console.log("=====list_option_text",response.data.data_question[i].list_option[0].match_option_text)
        }
        this.setState({ data: data });
        this.setState({ isloading: false });
    }
    shuffle(a) {
        let arr = [...a]
        var j, x, i;
        for (i = arr.length - 1; i > 0; i--) {
            j = Math.floor(Math.random() * (i + 1));
            x = arr[i];
            arr[i] = arr[j];
            arr[j] = x;
        }
        return arr;
    }
    _Onpress = () => {
        this.setState({ titlePress: !this.state.titlePress });
    };
 
    _SubmitTeting = async () => {
        let dataHistory = [];
        console.log(this.state.dataFirt)
        for (let i = 0; i < this.state.dataFirt.data_question.length; i++) {
            //console.log(this.state.dataFirt.data_question[i].question_id)
            let ar = [];
            for (let j = 0; j < 1; j++) {
                let Ob1 = new Object();
                Ob1.num_turn = 1;
                Ob1.score = this.state.arrayScore[i] === true ? 1 : 0;
                Ob1.user_choice = this.state.arrayScore[i];
                ar.push(Ob1);
            }
            let Ob = new Object();
            Ob.question_id = this.state.dataFirt.data_question[i].question_id;
            Ob.exercise_type = 'grammar';
            Ob.question_type = '5';
            Ob.final_user_choice = this.state.arrayScore[i];
            Ob.detail_user_turn = ar;
            dataHistory.push(Ob);
        }
        this.props.setDataAnswer(dataHistory)
    };
    _Submit = async () => {
        let dataHistory = [];
        for (let i = 0; i < this.state.dataFirt.data_question.length; i++) {
            let ar = [];
            for (let j = 0; j < 1; j++) {
                let Ob1 = new Object();
                Ob1.num_turn = 1;
                Ob1.score = this.state.arrayScore[i] === true ? 1 : 0;
                Ob1.user_choice = this.state.arrayScore[i];
                ar.push(Ob1);
            }
            let Ob = new Object();
            Ob.question_id = this.state.dataFirt.data_question[i].question_id;
            Ob.exercise_type = 'grammar';
            Ob.question_type = '5';
            Ob.final_user_choice = this.state.arrayScore[i];
            Ob.detail_user_turn = ar;
            dataHistory.push(Ob);
        }
        this.props.saveLogLearning(dataHistory);
    };
    componentDidMount() {
        for (
            let index = 0;
            index < this.state.data[this.state.indexQuestion].question.length;
            index++
        ) {
            this.ListCheckAnswer.push(false);
        }
        this.props.saveLogLearning([]);
    }
    render() {
        return (
            <View
                style={{
                    height: this.state.checkResuilt === null || (!this.state.checkResuilt && this.state.CheckTimeFalse <= 1) ? SmartScreenBase.smPercenHeight * 75 : SmartScreenBase.smPercenHeight * 85,
                    alignSelf: 'center',
                    alignItems: 'center',
                    marginTop: this.state.checkResuilt === null || (!this.state.checkResuilt && this.state.CheckTimeFalse <= 1) ? 0 : SmartScreenBase.smPercenHeight * 5,
                }}>
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
                        <ActivityIndicator size="large" color="#00ff00" />
                    </View>
                ) : null}
                <View>{this.render_Question()}</View>
                <View
                    style={{
                        position: 'absolute',
                        bottom: SmartScreenBase.smPercenHeight * 5,
                        alignSelf: 'center',
                    }}>
                    {this.state.ShowNotify == true ? (
                        <View
                            style={{
                                width: SmartScreenBase.smPercenWidth * 100,
                                backgroundColor: 'rgba(0,0,0,0.5)',
                                marginBottom: SmartScreenBase.smPercenHeight * 2,
                            }}>
                            <View
                                style={{
                                    alignSelf: 'center',
                                    marginVertical: SmartScreenBase.smPercenHeight * 2,
                                }}>
                                <Image
                                    source={{ uri: 'lesson_vocab_image15' }}
                                    style={{
                                        width: SmartScreenBase.smBaseWidth * 903,
                                        height: SmartScreenBase.smBaseWidth * 306,
                                        resizeMode: 'contain',
                                    }}
                                />
                            </View>
                        </View>
                    ) : null}
                    <TouchableOpacity
                        disabled={this.state.checkType === 'afterTest' || this.state.ShowCheck == true ? false : true}
                        style={this.state.checkType === 'afterTest' || this.state.ShowCheck == true ? stylesButton.Sty_Button : stylesButton.Sty_Button_disable}
                        onPress={() => {
                            this._OnPressCheckResuilt();
                        }}>
                        <Text style={stylesButton.Sty_Text_Button}>
                            {
                                this.state.checkType === 'afterTest' ? 'TIẾP TỤC' :
                                    this.state.checkResuilt == null
                                        ? 'KIỂM TRA'
                                        : this.state.checkResuilt == false &&
                                            this.state.CheckTimeFalse < 2
                                            ? 'LÀM LẠI'
                                            : 'TIẾP TỤC'
                            }
                        </Text>
                    </TouchableOpacity>

                </View>
            </View>
        );
    }

    find_dimesions(layout) {
        const { x, y, width, height } = layout;
        this.setState({ lenghtline: this.state.lenghtline + width });
        this.setState({ heightlinew: height });
    }

    find_dimesions1(layout) {
        const { x, y, width, height } = layout;
        this.setState({ lenghtView: width });
    }

    render_Question() {
        return (
            <View>
                <View>
                    <View
                        style={{
                            width: SmartScreenBase.smPercenWidth * 94,
                            borderRadius: SmartScreenBase.smPercenWidth * 3,
                            backgroundColor: '#FFF',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginTop: SmartScreenBase.smPercenHeight * 4
                        }}>
                        <View
                            style={[StyleLesson.Sty_View_Border, {
                                alignItems: 'flex-start',
                                paddingTop: 0,
                            }]}>
                            <ScrollView
                                style={{
                                    height: SmartScreenBase.smPercenHeight * 22,
                                    width: SmartScreenBase.smPercenWidth * 90,
                                    alignSelf: 'center',
                                }}>
                                <View
                                    onLayout={event => {
                                        this.find_dimesions1(event.nativeEvent.layout);
                                    }}
                                    style={{
                                        flexDirection: 'row',
                                        flexWrap: 'wrap',
                                        // marginTop: SmartScreenBase.smPercenHeight * 1,
                                        alignItems: 'center',
                                    }}>
                                    {this.Answer.map((item, key) => {
                                        // console.log(this.Answer[key]);
                                        // console.log(this.state.data[this.state.indexQuestion].answer.split('/')[key]);
                                        return (
                                            <TouchableOpacity key={key}
                                                disabled={this.state.checkResuilt === null ? false : true}
                                                onLayout={event => {
                                                    this.find_dimesions(event.nativeEvent.layout);
                                                }}
                                                onPress={() => {
                                                    LogBase.log("=====","++++++++++++++++++++++++++put down")
                                                    var keyDele = this.KeyWordInAnswer[key]
                                                    this.KeyWordInAnswer.splice(key, 1);
                                                    this.Answer.splice(key, 1);
                                                    this.ListCheckAnswer[keyDele] = false;
                                                    this.setState({ refresh: true });
                                                    if (this.Answer.length < this.state.data[this.state.indexQuestion].question.length){
                                                        this.setState({ ShowCheck: false });
                                                    }

                                                    LogBase.log("=====keyDele",keyDele)
                                                    LogBase.log("=====this.Answer",this.Answer)
                                                    LogBase.log("=====KeyWordInAnswer",this.KeyWordInAnswer)
                                                    LogBase.log("=====ListCheckAnswer",this.ListCheckAnswer)
                                                }}>
                                                <View
                                                    style={{
                                                        padding: SmartScreenBase.smPercenHeight / 2,
                                                        marginRight: SmartScreenBase.smPercenWidth * 3,
                                                        backgroundColor:
                                                            this.state.checkResuilt != null ?
                                                                (this.Answer[key] ==
                                                                    this.state.data[this.state.indexQuestion].answer.split('/')[key]) || this.isRight ? 'rgba(198,229,14,0.95)'
                                                                    :'rgba(232,66,90,0.95)'
                                                                : 'yellow',
                                                        borderWidth: 2,
                                                        borderColor: 'white',
                                                        paddingHorizontal:
                                                            SmartScreenBase.smPercenWidth * 4,
                                                        borderRadius: SmartScreenBase.smPercenWidth * 4,
                                                        marginTop: SmartScreenBase.smPercenHeight,
                                                    }}>
                                                    <Text
                                                        style={{
                                                            fontWeight: '500',
                                                            fontSize: SmartScreenBase.smFontSize * 45,
                                                        }}>
                                                        {item}
                                                    </Text>
                                                </View>
                                                {this.state.lenghtline > this.state.lenghtView ? (
                                                    <View
                                                        style={{
                                                            width: this.state.lenghtView,
                                                            backgroundColor: '#C0C0C0',
                                                            height: 1,
                                                            position: 'absolute',
                                                            marginTop: this.state.heightlinew + 2,
                                                        }}
                                                    />
                                                ) : null}
                                            </TouchableOpacity>
                                        );
                                    })}
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                    {this.state.checkResuilt === null ? (
                        <View
                            style={{
                                alignSelf: 'center',
                                flexDirection: 'row',
                                flexWrap: 'wrap',
                                padding: SmartScreenBase.smPercenHeight,
                                width: SmartScreenBase.smPercenWidth * 90,
                                alignItems: 'center',
                                marginTop: SmartScreenBase.smPercenHeight * 5,
                            }}>
                            {this.state.data[this.state.indexQuestion].question.map(
                                (item, key) => {
                                    return (
                                        <TouchableOpacity key={key}
                                            disabled={this.ListCheckAnswer[key]}
                                            onPress={() => {
                                                LogBase.log("=====","+++++++++++++++++put up")
                                                this.Answer.push(
                                                    this.state.data[this.state.indexQuestion].question[
                                                    key
                                                    ],
                                                );
                                                this.KeyWordInAnswer.push(this.state.data[this.state.indexQuestion].sttWord[key])
                                                this.ListCheckAnswer[key] = true;
                                                this.setState({ refresh: true });
                                                if (this.Answer.length == this.state.data[this.state.indexQuestion].question.length){
                                                    this.setState({ ShowCheck: true });
                                                }
                                                LogBase.log("=====key",key)
                                                LogBase.log("=====KeyWordInAnswer",this.KeyWordInAnswer)
                                                LogBase.log("=====ListCheckAnswer",this.ListCheckAnswer)
                                            }}
                                            style={{
                                                opacity: this.ListCheckAnswer[key] == true ? 0 : 1,
                                            }}>
                                            <View
                                                style={{
                                                    padding: SmartScreenBase.smPercenHeight / 2,
                                                    marginRight: SmartScreenBase.smPercenWidth * 3,
                                                    backgroundColor: 'yellow',
                                                    borderWidth: 2,
                                                    borderColor: 'white',
                                                    paddingHorizontal: SmartScreenBase.smPercenWidth * 4,
                                                    borderRadius: SmartScreenBase.smPercenWidth * 4,
                                                    marginTop: SmartScreenBase.smPercenHeight,
                                                }}>
                                                <Text
                                                    style={{
                                                        fontWeight: '500',
                                                        fontSize: SmartScreenBase.smFontSize * 45,
                                                    }}>
                                                    {item}
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    );
                                },
                            )}
                        </View>
                    ) : (
                            <View>
                                {this.state.checkResuilt == true ? (
                                    <View
                                        style={{
                                            height: SmartScreenBase.smPercenHeight * 30,
                                            justifyContent: 'flex-end',
                                        }}>
                                        <View
                                            style={{ alignSelf: 'center', position: 'absolute', top: SmartScreenBase.smPercenHeight*1}}>
                                            <FileSound showImage={this.isRight ? "true" : "false"} />
                                        </View>
                                        <View style={{marginLeft: SmartScreenBase.smBaseHeight * 7}}>
                                            <Text style={{
                                                fontFamily: 'iCielSoupofJustice',
                                                fontSize: SmartScreenBase.smFontSize * 50,
                                                color: 'white'
                                            }}>ĐÁP ÁN:</Text>
                                        </View>
                                        <View
                                            style={[
                                                StyleLesson.Sty_View_Border, { marginTop: 15 }
                                            ]}>
                                            <View>
                                                <Text
                                                    style={{
                                                        fontWeight: 'bold',
                                                        fontSize: SmartScreenBase.smFontSize * 50,
                                                        fontFamily: FontBase.MyriadPro_Bold,
                                                    }}>
                                                    {this.state.answerTrue}
                                                </Text>
                                            </View>

                                            <View
                                                style={{
                                                    marginTop: SmartScreenBase.smPercenHeight,
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    marginHorizontal: SmartScreenBase.smPercenWidth * 3,
                                                }}>
                                                <Image
                                                    source={{ uri: 'lesson_listen_image2' }}
                                                    style={{
                                                        width: SmartScreenBase.smBaseWidth * 39,
                                                        height: SmartScreenBase.smBaseWidth * 39,
                                                        resizeMode: 'contain',
                                                    }}
                                                />
                                                <Text
                                                    style={{
                                                        marginLeft: SmartScreenBase.smPercenWidth * 3,
                                                        fontSize: SmartScreenBase.smFontSize * 50,
                                                        fontFamily: FontBase.MyriadPro_Light,
                                                        fontStyle: 'italic'
                                                    }}>
                                                    {this.state.data[this.state.indexQuestion].explain}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                ) : (
                                        <View>
                                            {this.state.CheckTimeFalse < 2 ? (
                                                <View
                                                    style={{
                                                        position: 'absolute',
                                                        alignSelf: 'center',
                                                        top: SmartScreenBase.smPercenHeight * 12 
                                                    }}>
                                                    <FileSound showImage={"false"} />
                                                </View>
                                            ) : (
                                                        <View
                                                            style={{
                                                                position: 'absolute',
                                                                justifyContent: 'center',
                                                                top: 0
                                                            }}>
                                                            <View style={{ alignSelf: 'center' }}>
                                                                <FileSound showImage={"false"} />
                                                            </View>
                                                            <View style={{ width: SmartScreenBase.smPercenWidth * 90 }}>
                                                                <View
                                                                    style={{
                                                                        marginLeft: SmartScreenBase.smPercenWidth * 5,
                                                                    }}>
                                                                    <Text
                                                                        style={{
                                                                            fontWeight: '800',
                                                                            fontSize: SmartScreenBase.smPercenWidth * 5,
                                                                            color: 'white',
                                                                        }}>
                                                                        ĐÁP ÁN:
                                                    </Text>
                                                                </View>
                                                                <View
                                                                    style={[
                                                                        StyleLesson.Sty_View_Border,
                                                                        {
                                                                            alignItems: 'flex-start',
                                                                            marginTop: SmartScreenBase.smPercenHeight * 2,
                                                                        },
                                                                    ]}>
                                                                    <Text
                                                                        style={{
                                                                            fontWeight: '500',
                                                                            fontSize: SmartScreenBase.smPercenWidth * 3.5,
                                                                        }}>
                                                                        {this.state.data[this.state.indexQuestion].answer.split('/').join('')}
                                                                    </Text>
                                                                    <View
                                                                        style={{
                                                                            flexDirection: 'row',
                                                                            alignItems: 'center',
                                                                            marginTop: SmartScreenBase.smPercenHeight * 2,
                                                                        }}>
                                                                        <Image
                                                                            source={{ uri: 'lesson_grammar_image2' }}
                                                                            style={{
                                                                                width: SmartScreenBase.smPercenWidth * 5,
                                                                                height: SmartScreenBase.smPercenWidth * 5,
                                                                                resizeMode: 'contain',
                                                                            }}
                                                                        />
                                                                        <Text
                                                                            style={{
                                                                                marginLeft: SmartScreenBase.smPercenWidth * 3,
                                                                            }}>
                                                                            {
                                                                                this.state.data[this.state.indexQuestion].explain
                                                                            }
                                                                        </Text>
                                                                    </View>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    )}
                                        </View>
                                    )}
                            </View>
                        )}
                </View>
            </View>
        );
    }

    _OnPressCheckResuilt() {
        if (this.state.checkType === 'exam') {
            if (this.state.checkResuilt == null) {
                let userAns = this.Answer.map(c => Utils.validWord(c).replace(',','')).join(' ');
                // var dataAns = []
                this.isRight = false
                var sttRight = 0
                this.state.data[this.state.indexQuestion].data_answer.forEach((element, index) => {
                    console.log('=====localeCompare',userAns,element.map(c => Utils.validWord(c)).join(' '));
                    if(userAns.localeCompare(element.map(c => Utils.validWord(c)).join(' ')) == 0){
                        this.isRight = true
                        sttRight = index
                    }
                });

                // let dataAns = this.state.data[this.state.indexQuestion].data_answer.map(c => Utils.validWord(c)).join(' ');
                this.setState({answerTrue: this.state.data[this.state.indexQuestion].data_answer[sttRight].map(e => e).join(' ')});
                
                if (this.isRight) {
                    console.log('dunghetlan1');
                    this.props.hideTypeExercise();
                    this.props.showFeedback();
                    let arr = [...this.state.arrayScore];
                    arr[this.state.indexQuestion] = true;
                    this.setState({ arrayScore: arr });
                    this.setState({
                        checkResuilt: true,
                        CheckTimeFalse: 0,
                    });
                } else {
                    console.log('CheckTimeFalse', this.state.CheckTimeFalse);
                    if (this.state.CheckTimeFalse >= 1) {
                        this.props.hideTypeExercise();
                        this.props.showFeedback();
                        this.setState({ CheckTimeFalse: 0 });
                        this.setState({
                            checkResuilt: true,
                        });
                    } else {
                        let arr = [...this.state.arrayScore];
                        arr[this.state.indexQuestion] = false;
                        this.setState({ arrayScore: arr });
                        this.setState({ CheckTimeFalse: this.state.CheckTimeFalse + 1 });
                        this.setState({
                            checkResuilt: false,
                        });
                    }
                }
            } else if (this.state.checkResuilt == false) {
                this.props.showTypeExercise();
                this.props.hideFeedback();
                for (
                    let index = 0;
                    index < this.state.data[this.state.indexQuestion].question.length;
                    index++
                ) {
                    this.ListCheckAnswer[index] = false;
                    this.Answer.pop();
                }
                this.KeyWordInAnswer = [];
                this.setState({
                    checkResuilt: null,
                    ShowCheck: false,
                });
            } else {
                this.props.showTypeExercise();
                this.props.hideFeedback();
                if (this.state.indexQuestion < this.state.data.length - 1) {
                    for (
                        let index = 0;
                        index < this.state.data[this.state.indexQuestion].question.length;
                        index++
                    ) {
                        this.ListCheckAnswer[index] = false;
                        this.Answer.pop();
                    }
                    this.KeyWordInAnswer = [];
                    this.setState({
                        checkResuilt: null,
                        ShowCheck: false,
                    });
                    this.props.setIndexQuestion(this.state.indexQuestion + 1);
                    this.setState({ indexQuestion: this.state.indexQuestion + 1 });
                    this.setState({ CheckTimeFalse: 0 });
                } else {
                    this._Submit()
                }
            }
        } 
    }
}

function mapStateToProps(state) {
    return {
        data_answer: state.WrittingD1Reducer.data_answer,
        data_login: state.AuthStackReducer.dataLogin,
    };
}

export default connect(mapStateToProps)(WrittingD1);
