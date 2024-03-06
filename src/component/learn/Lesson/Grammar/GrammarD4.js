import React, {Component} from 'react';
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
import {connect} from 'react-redux';
import FileSound from '../FileSound';
import API from '../../../../API/APIConstant';
import FileSound4 from '../FileSound4';
import Font from '../../../../base/FontBase';
import LogBase from '../../../../base/LogBase';

let dataAnsFake = [
    {
        Ans: ['Question 1. They', ' construct', ' The One Pillar Pagoda', ' 1049.'],
    },
    {
        Ans: [
            'Question 2. I',
            ' am',
            ' afraid',
            ' there',
            ' not',
            ' any flour left',
            '  in the refrigerator.',
        ],
    },
    {
        Ans: [
            'Question 3. What ingredients',
            ' I',
            ' need',
            ' make',
            ' omelette?',
        ],
    },
    {
        Ans: [
            'Question 4. We',
            ' not',
            ' have',
            ' any',
            ' beef left',
            ' but',
            ' we',
            ' have',
            ' some pork.',
        ],
    },
    {
        Ans: [
            'Question 5. How many',
            ' eggs',
            'we',
            'need',
            ' make',
            'ten',
            ' spring rolls?',
        ],
    },
];
let DataObject1 = new Object();

class GrammarD4 extends Component {
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
                    answercheck: '',
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
        };
        this.Answer = [];
        this.KeyWordInAnswer = [];
        this.ListCheckAnswer = [];
    }

    componentWillMount(): void {
        this.setState({isloading: true});
        let data = [];
        let dataLogin = this.props.data_login;
        let response = {};
        response['data'] = this.props.dataContent;
        this.setState({checkType: this.props.checkType});
        //console.log(response);
        this.setState({dataFirt: response.data});
        // this._postDataFirt(response.data);
        this.setState({data_lesson: response});
        for (let i = 0; i < response.data.data_question.length; i++) {
            DataObject1 = new Object();
            let text = ' ' + response.data.data_question[i].list_option[0].question_content;
            DataObject1.question = this.shuffle(text.split('/'));
            DataObject1.sttWord = [];
            for(var j=0; j < DataObject1.question.length; j++){
                DataObject1.sttWord.push(j)
            }
            DataObject1.answer = text;
            DataObject1.explain = response.data.data_question[i].list_option[0].explain_parse.content_question_text || "";
            this.setState({
                title_ENG:
                response.data.data_question[i].list_option[0].group_content,
            });

            this.setState({
                title_VI:
                response.data.data_question[i].list_option[0].group_content_vi,
            });
            data.push(DataObject1);
            console.log("=====match_option_text",response.data.data_question[i].list_option[0].match_option_text)
        }
        //console.log(data)
        this.setState({data: data, isloading: false});
    }

    componentDidMount(){
        this.props.saveLogLearning([]);
    }

    shuffle(a) {
        let arr = [...a];
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
        this.setState({titlePress: !this.state.titlePress});
    };

    _Submit = async () => {
        let dataHistory = [];
        // console.log(this.state.dataFirt)
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
            // if (this.state.ArrAnswer[i].status === true) {
            //     Ob.question_score = this.state.dataFirt.data_question[
            //         i
            //         ].list_option[0].score;
            // } else {
            //     Ob.question_score = '0';
            // }
            Ob.final_user_choice = this.state.arrayScore[i];
            Ob.detail_user_turn = ar;
            dataHistory.push(Ob);
        }
        this.props.saveLogLearning(dataHistory);
    };

    render() {
        return (
            <View
                style={{
                    height: SmartScreenBase.smPercenHeight * 87,
                    alignSelf: 'center',
                    alignItems: 'center',
                    marginTop: SmartScreenBase.smPercenHeight * 3,
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
                        <ActivityIndicator size="large" color="#00ff00"/>
                    </View>
                ) : null}
                <View>{this.render_Question()}</View>
                <View
                    style={{
                        position: 'absolute',
                        bottom: SmartScreenBase.smPercenHeight * 20,
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
                                    source={{uri: 'lesson_vocab_image15'}}
                                    style={{
                                        width: SmartScreenBase.smBaseWidth * 903,
                                        height: SmartScreenBase.smBaseWidth * 306,
                                        resizeMode: 'contain',
                                    }}
                                />
                            </View>
                        </View>
                    ) : null}
                    {this.state.checkType === 'afterTest' ? (
                        <TouchableOpacity
                            style={{alignSelf: 'center'}}
                            onPress={() => {
                                this._OnPressCheckResuilt();
                            }}>
                            <ButtonCheck TextButton={'Tiếp tục'}/>
                        </TouchableOpacity>
                    ) : this.state.ShowCheck == true ? (
                            <TouchableOpacity
                                style={{alignSelf: 'center'}}
                                onPress={() => {
                                    this._OnPressCheckResuilt();
                                }}>
                                <ButtonCheck
                                    TextButton={
                                        this.state.checkResuilt == null
                                            ? 'Kiểm tra'
                                            : this.state.checkResuilt == false &&
                                            this.state.CheckTimeFalse < 2
                                            ? 'Làm lại'
                                            : 'Tiếp tục'
                                    }
                                />
                            </TouchableOpacity>
                        ) :
                        <TouchableOpacity
                            style={[
                                stylesApp.Sty_Button_disable,
                            ]}>
                            <Text style={stylesApp.Sty_Text_Button}>{this.state.checkResuilt == null
                                ? 'Kiểm tra'
                                : this.state.checkResuilt == false &&
                                this.state.CheckTimeFalse < 2
                                    ? 'Làm lại'
                                    : 'Tiếp tục'}</Text>
                        </TouchableOpacity>
                    }
                </View>
            </View>
        );
    }

    find_dimesions(layout) {
        const {x, y, width, height} = layout;
        this.setState({lenghtline: this.state.lenghtline + width});
        this.setState({heightlinew: height});
    }

    find_dimesions1(layout) {
        const {x, y, width, height} = layout;
        this.setState({lenghtView: width});
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
                        }}>
                        <View
                            style={[StyleLesson.Sty_View_Border, {
                                alignItems: 'flex-start',
                            }]}>
                            <ScrollView
                                style={{
                                    height: SmartScreenBase.smPercenHeight * 20,
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
                                    }}>
                                    {this.Answer.map((item, key) => {
                                        return (
                                            <TouchableOpacity
                                                disabled={this.state.checkResuilt === null ? false : true}
                                                onLayout={event => {
                                                    this.find_dimesions(event.nativeEvent.layout);
                                                }}
                                                onPress={() => {
                                                    if (this.state.checkResuilt == null) {

                                                        LogBase.log("=====","++++++++++++++++++++++++++put down")
                                                        var keyDele = this.KeyWordInAnswer[key]
                                                        this.KeyWordInAnswer.splice(key, 1);
                                                        this.Answer.splice(key, 1);
                                                        this.ListCheckAnswer[keyDele] = false;
                                                        this.setState({ refresh: true });
                                                        if (this.Answer.length < this.state.data[this.state.indexQuestion].question.length){
                                                            this.setState({ ShowCheck: false });
                                                        }
                                                    }
                                                }}>
                                                <View>
                                                    <View
                                                        style={{
                                                            padding: SmartScreenBase.smPercenHeight / 2,
                                                            marginRight: SmartScreenBase.smPercenWidth * 3,
                                                            backgroundColor:
                                                                this.state.checkResuilt != null ?
                                                                    this.Answer[key] !==
                                                                    this.state.data[this.state.indexQuestion].answer.split('/')[key] ? 'rgba(232,66,90,0.95)' :
                                                                        'rgba(198,229,14,0.95)'
                                                                    : 'yellow',
                                                            borderWidth: 2,
                                                            borderColor: 'white',
                                                            paddingHorizontal:
                                                                SmartScreenBase.smPercenWidth * 2,
                                                            borderRadius: SmartScreenBase.smPercenWidth * 4,
                                                            marginTop: SmartScreenBase.smPercenHeight,
                                                            minWidth: SmartScreenBase.smPercenWidth * 20,
                                                            alignItems: 'center',
                                                        }}>
                                                        <Text
                                                            style={StyleLesson.question_text}>
                                                            {item}
                                                        </Text>
                                                    </View>
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
                                    //console.log(this.state.data[this.state.indexQuestion].question1)
                                    return (
                                        <TouchableOpacity
                                            disabled={this.ListCheckAnswer[key]}
                                            onPress={() => {

                                                LogBase.log("=====","+++++++++++++++++put up")
                                                this.KeyWordInAnswer.push(this.state.data[this.state.indexQuestion].sttWord[key])
                                                this.Answer.push(
                                                    this.state.data[this.state.indexQuestion].question[
                                                        key
                                                        ],
                                                );
                                                if (
                                                    this.Answer.length ==
                                                    this.state.data[this.state.indexQuestion].question.length
                                                ) {
                                                    this.state.ShowCheck = true;
                                                }
                                                this.ListCheckAnswer[key] = true;
                                                this.setState({refresh: true});
                                                if (this.Answer.length == this.state.data[this.state.indexQuestion].question.length){
                                                    this.setState({ ShowCheck: true });
                                                }
                                                //console.log(this.Answer);
                                            }}
                                            style={{
                                                opacity: this.ListCheckAnswer[key] == true ? 0 : 1,
                                            }}>
                                            <View
                                                style={{
                                                    padding: SmartScreenBase.smPercenHeight / 4,
                                                    marginRight: SmartScreenBase.smPercenWidth * 3,
                                                    backgroundColor: 'yellow',
                                                    borderWidth: 2,
                                                    borderColor: 'white',
                                                    paddingHorizontal: SmartScreenBase.smPercenWidth * 2,
                                                    borderRadius: SmartScreenBase.smPercenWidth * 4,
                                                    marginTop: SmartScreenBase.smPercenHeight,
                                                    minWidth: SmartScreenBase.smPercenWidth * 20,
                                                    alignItems: 'center',
                                                }}>
                                                <Text
                                                    style={StyleLesson.question_text}>
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
                                        // justifyContent: 'flex-end',
                                    }}>
                                    <View
                                        style={{
                                            position: 'absolute',
                                            alignSelf: 'center',
                                            top: SmartScreenBase.smPercenHeight * -3.5,
                                        }}>
                                        <FileSound
                                            showImage={this.Answer.join('') === this.state.data[this.state.indexQuestion].answer.split('/').join('') ? 'true' : 'false'}/>
                                    </View>
                                    <View style={{
                                        paddingHorizontal: SmartScreenBase.smPercenHeight * 2,
                                        marginTop: SmartScreenBase.smPercenHeight * 8,
                                    }}>
                                        <Text style={{fontSize: SmartScreenBase.smFontSize * 50, color: 'white', fontFamily: 'iCielSoupofJustice',}}>ĐÁP ÁN</Text>
                                    </View>
                                    <View
                                        style={[
                                            StyleLesson.Sty_View_Border,
                                            {
                                                alignSelf: 'center',
                                                alignItems: 'flex-start',
                                                marginTop: SmartScreenBase.smPercenHeight * 1,
                                                paddingHorizontal: SmartScreenBase.smPercenHeight * 3
                                            },
                                        ]}>
                                        <Text
                                            style={{
                                                ...StyleLesson.explain_text,
                                                fontStyle: 'normal',
                                                fontFamily: Font.MyriadPro_Bold,
                                                fontSize: SmartScreenBase.smFontSize * 50
                                            }}>
                                            {this.state.data[this.state.indexQuestion].answer.split('/').join('').trim()}
                                        </Text>
                                        <View
                                            style={{
                                                flexDirection: 'row',
                                                justifyContent: 'flex-start',
                                                marginTop: SmartScreenBase.smPercenHeight
                                            }}>
                                            <Image
                                                source={{uri: 'lesson_listen_image2'}}
                                                style={{
                                                    width: SmartScreenBase.smPercenWidth * 4,
                                                    height: SmartScreenBase.smPercenWidth * 4,
                                                    resizeMode: 'contain',
                                                }}
                                            />
                                            <Text
                                                style={{
                                                    ...StyleLesson.explain_text,
                                                    paddingLeft: SmartScreenBase.smPercenWidth * 2,
                                                    fontFamily: Font.MyriadPro_LightIt,
                                                    fontSize: SmartScreenBase.smFontSize * 50
                                                }}>
                                                {this.state.data[this.state.indexQuestion].explain}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            ) : (
                                <View>
                                    {this.state.checkType === 'afterTest' ? (
                                        <View
                                            style={{
                                                position: 'absolute',
                                                justifyContent: 'center',
                                                top: 0,
                                            }}>
                                            <View style={{alignSelf: 'center'}}>
                                                <Image
                                                    source={{
                                                        uri:
                                                            dataAnsFake[1].Ans.join() ==
                                                            this.state.data[1].question.join()
                                                                ? 'lesson_grammar_image7-1'
                                                                : 'lesson_grammar_image8-1',
                                                    }}
                                                    style={{
                                                        width: SmartScreenBase.smPercenWidth * 30,
                                                        height: SmartScreenBase.smPercenWidth * 30,
                                                        resizeMode: 'contain',
                                                    }}
                                                />
                                            </View>
                                            <View style={{width: SmartScreenBase.smPercenWidth * 90}}>
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
                                                            source={{uri: 'lesson_grammar_image2'}}
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
                                                            {this.state.data[this.state.indexAfter].explain}
                                                        </Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    ) : this.state.CheckTimeFalse < 2 ? (
                                        <View
                                            style={{
                                                position: 'absolute',
                                                alignSelf: 'center',
                                                top: SmartScreenBase.smPercenHeight * - 3.5,
                                            }}>
                                            <FileSound4 showImage={'false'}/>
                                        </View>
                                    ) : (
                                        <View
                                            style={{
                                                position: 'absolute',
                                                justifyContent: 'center',
                                                top: 0,
                                            }}>
                                            <View style={{alignSelf: 'center'}}>
                                                <FileSound showImage={'false'}/>
                                            </View>
                                            <View style={{width: SmartScreenBase.smPercenWidth * 90}}>
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
                                                            source={{uri: 'lesson_grammar_image2'}}
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
        console.log("=====_OnPressCheckResuilt",this.state.checkType,this.state.checkResuilt)
        if (this.state.checkType === 'exam') {
            if (this.state.checkResuilt == null) {
                if (
                    this.Answer.join('') ===
                    this.state.data[this.state.indexQuestion].answer.split('/').join('')
                ) {
                    let arr = [...this.state.arrayScore];
                    arr[this.state.indexQuestion] = true;
                    this.setState({arrayScore: arr});
                    this.setState({
                        checkResuilt: true,
                        CheckTimeFalse: 0,
                        allright: true,
                    });
                } else {
                    if (this.state.CheckTimeFalse >= 1) {
                        this.setState({CheckTimeFalse: 0});
                        this.setState({
                            checkResuilt: true,
                        });
                    } else {
                        let arr = [...this.state.arrayScore];
                        arr[this.state.indexQuestion] = false;
                        this.setState({arrayScore: arr});
                        this.setState({CheckTimeFalse: this.state.CheckTimeFalse + 1});
                        this.setState({
                            checkResuilt: false,
                        });
                    }
                }
            } else if (this.state.checkResuilt == false) {
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
                if (this.state.indexQuestion < this.state.data.length - 1) {
                    this.props.setIndexQuestion(this.state.indexQuestion + 1);
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
                    this.setState({indexQuestion: this.state.indexQuestion + 1});
                    this.setState({CheckTimeFalse: 0});
                } else {
                    this._Submit();
                }
            }
        } else if (this.state.checkType === 'Testing') {
            if (this.state.indexQuestion < this.state.data.length - 1) {
                for (
                    let index = 0;
                    index < this.state.data[this.state.indexQuestion].question.length;
                    index++
                ) {
                    this.ListCheckAnswer[index] = false;
                    this.Answer.pop();
                }
                this.setState({indexQuestion: this.state.indexQuestion + 1});
            } else {
                this.props.nextReviewResult();
            }
        } else if (this.state.checkType === 'afterTest') {
            if (this.state.indexAfter <= dataAnsFake.length - 2) {
                this.setState({indexAfter: this.state.indexAfter + 1});
                this.Answer = dataAnsFake[this.state.indexAfter + 1].Ans;
                if (
                    dataAnsFake[this.state.indexAfter + 1].Ans.join() ==
                    this.state.data[this.state.indexAfter + 1].question.join()
                ) {
                    this.setState({
                        checkResuilt: true,
                    });
                } else {
                    this.setState({CheckTimeFalse: this.state.CheckTimeFalse + 1});
                    this.setState({
                        checkResuilt: false,
                    });
                }
                this.setState({
                    checkResuilt: false,
                });
            } else {
                this.props.nextReviewResult();
            }
        }
    }
}

function mapStateToProps(state) {
    return {
        data_answer: state.readingD11Reducer,
        data_login: state.AuthStackReducer.dataLogin,
    };
}

export default connect(mapStateToProps)(GrammarD4);
