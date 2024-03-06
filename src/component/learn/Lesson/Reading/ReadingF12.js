import React, {Component} from 'react';
import {Text, View, FlatList, TouchableOpacity, Image, ScrollView, Alert} from 'react-native';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import Carousel from 'react-native-snap-carousel';
import CarouselTrueFalse from './Component/CarouselTrueFalse';
import CarouselTrueFalseAt from './Component/CarouselTrueFalseAt';
import TypeExercise from '../Component/TypeExercise2';
import TypeExercise3 from '../Component/TypeExercise3';
import StyleLesson from '../StyleLesson';
import stylesApp from '../../../styleApp/stylesApp';
import FileSound from '../FileSound';
import API from '../../../../API/APIConstant';
import {connect} from 'react-redux';
import {ReadingD12Action} from '../../../../redux/actions/ReadingD12Action';
import axios from 'axios';
import WebView from 'react-native-webview';
import LoadingScreen from '../../../../screens/LoadingScreen';
import EventBus from 'react-native-event-bus';
import FileSound4 from '../FileSound4';
import StyleApp from '../../../../styleApp/stylesApp';
import stringUtils from '../../../../utils/stringUtils';
import TextDownLine from '../../../../componentBase/TextDownLine/TextDownLine'

class ReadingF12 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refresh: false,
            ShowCheck: true,
            checkResuilt: null,
            NumberTrue: 0,
            data: {},
            btnEx: false,
            webview: '',
            vietnam: '',
            english: '',
            isLoading: true,
            checkRes: false,
            disableTouch: false,
            logLearning: {
                'class_id': 1,
                'unit_id': 1,
                'curriculum_id': 1,
            },
            dataLog: {},
            dataAnswer: [],
            disableBtnCheck: true,
            // firstItem: 0
        };
        this.ListAnswer = [];
        this._carousel = React.createRef();
    }

    componentDidMount() {
        this._getQuestion();
        this.props.saveLogLearning([]);

    }

    _saveLogLearning = async () => {
        this.props.saveLogLearning(this.state.dataAnswer);
    };

    async _getQuestion() {
        try{
        if (this.props.dataContent) {
            let dataReturn = this.props.dataContent;
            if (dataReturn.status) {
                let saveLog = {...this.state.logLearning};
                saveLog['data_lesson'] = JSON.stringify(dataReturn);
                saveLog['lesson_id'] = dataReturn.lesson.id;
                this.setState({logLearning: saveLog});
                let dataText = {...this.state.data};
                let question = dataReturn.data_question;
                dataText['text'] = dataReturn.lesson.lesson_paragraph
                dataText['ques'] = [];
                this.setState({vietnam: question[0].list_option[0].group_content_vi});
                this.setState({english: question[0].list_option[0].group_content});
                question.forEach(element => {
                    let dataQues = {};
                    dataQues['question'] = element.list_option[0].question_content;
                    dataQues['explain'] = '';
                    if (element.list_option[0].option_explain) {
                        dataQues['explain'] = element.list_option[0].option_explain;
                    } else {
                        let ex = element.list_option[0].explain_parse;
                        dataQues['explain'] = ex['content_question_text'];
                    }
                    dataQues['answer'] = element.list_option[0].match_option_text[0] == 'T' ? true : false;
                    dataText['ques'].push(dataQues);
                });
                this.setState({data: dataText});
                if (this.props.modeF === 'review_result') {
                    this.setState({minitest: true, mode: 'afterTest'});
                    let dataQue = this.props.data_answer.data_answer;
                    this.ListAnswer = dataQue;
                    this.setState({checkResuilt: null, checkRes: true, disableTouch: true, btnEx: true});
                }
                // this._saveStartLogLearning();
                this.setState({isLoading: false});
            }
        }
        }catch(er){console.log("=====loi",er); Alert.alert("Bài tập này đang bị lỗi dữ liệu, vui lòng chọn bài khác")}
    }

    _OnpressAnswer(answer, index) {
        this.ListAnswer[index] = answer;
        let c = 0;
        this.ListAnswer.forEach((item) => {
            c += item === true || item === false ? 1 : 0;
        });
        if (c === this.state.data.ques.length) {
            this.setState({refresh: !this.state.refresh, disableBtnCheck: false});
        }
    }

    NumberCheck = 0;

    async _OnPressCheckResuilt() {
        await this.props.dispatch(ReadingD12Action(this.ListAnswer));
        for (let index = 0; index < this.state.data.ques.length; index++) {
            if (this.state.data.ques[index].show == false) {
                this.state.data.ques.splice(index, 1);
            }
        }
        let check = 0;
        let dataLesson = this.state.logLearning.data_lesson;
        dataLesson = JSON.parse(dataLesson);
        let dataAns = [...this.state.dataAnswer];
        for (let index = 0; index < this.state.data.ques.length; index++) {
            let data = {};
            data['question_id'] = dataLesson.data_question[index].question_id;
            data['exercise_type'] = 'reading';
            data['question_type'] = dataLesson.data_question[index].list_option[0].question_type;
            data['question_score'] = 0;
            let dataDetails = {};
            dataDetails['num_turn'] = 1;
            dataDetails['score'] = 0;
            data['detail_user_turn'] = [];
            if (this.ListAnswer[index] == this.state.data.ques[index].answer) {
                data['final_user_choice'] = this.ListAnswer[index];
                dataDetails['user_choice'] = this.ListAnswer[index];
                data['question_score'] = 1;
                dataDetails['score'] = 1;
                check += 1;
            }
            data['detail_user_turn'].push(dataDetails);
            dataAns.push(data);
        }
        if (this.props.modeF === 'exam' || this.props.modeF === 'mini_test') {
            this.props.setDataAnswer(dataAns);
            // _saveLogExam(dataAns);
        }
        if (this.state.checkResuilt == null) {
            if (check === this.ListAnswer.length) {
                this.props.hideTypeExercise();
                this.props.showFeedback();
                this.setState({checkResuilt: true});
            } else {
                this.props.hideTypeExercise();
                this.props.showFeedback();
                this.setState({checkResuilt: false});
            }
            this.setState({dataAnswer: dataAns, NumberTrue: check});
        } else {
            this.props.hideTypeExercise();
            this.props.hideFeedback();
            this._saveLogLearning();
            // this.props.methodScreen();
        }
    }

    _renderBtn() {
        return (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <TouchableOpacity
                    style={{
                        width: SmartScreenBase.smPercenWidth * 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingVertical: SmartScreenBase.smPercenHeight * 1.4,
                        borderRadius: SmartScreenBase.smPercenWidth * 5,
                        backgroundColor: '#01283A',
                    }}
                    // onPress={() => this.props.navigation.navigate("Reading")}
                >
                    <Text style={{color: '#fff'}}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    width: SmartScreenBase.smPercenWidth * 40,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: SmartScreenBase.smPercenHeight * 1.4,
                    borderRadius: SmartScreenBase.smPercenWidth * 5,
                    backgroundColor: '#01283A',
                }}>
                    <Text style={{color: '#fff'}}>Next</Text>
                </TouchableOpacity>
            </View>
        );
    }

    _explain() {
        this.props.hideTypeExercise();
        let check = 0;
        for (let index = 0; index < this.state.data.ques.length; index++) {
            if (this.ListAnswer[index] == this.state.data.ques[index].answer) {
                check += 1;
            }
        }
        if (check === this.ListAnswer.length) {
            this.setState({checkResuilt: true});
        } else {
            this.setState({checkResuilt: false});
        }
        this.setState({btnEx: false});
        this.setState({NumberTrue: check});
    }

    _backAfterTest() {
        if (this.props.modeF === 'review_result') {
            this.props.prevReviewResult();
        } else {
            if (!this.state.btnEx) {
                this.setState({checkResuilt: null});
                this.setState({btnEx: true});
                this.setState({checkRes: true});
            }
        }
    }

    _nextQuestion() {
        if (this.props.modeF === 'review_result') {
            this.props.nextReviewResult();
        }
    }

    _renderBtnEx() {
        return (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                width: SmartScreenBase.smPercenWidth * 100,
            }}>
                <TouchableOpacity
                    style={{
                        width: SmartScreenBase.smPercenWidth * 30,
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingVertical: SmartScreenBase.smPercenHeight * 1.4,
                        borderRadius: SmartScreenBase.smPercenWidth * 5,
                        backgroundColor: '#01283A',
                    }}
                    onPress={() => this._backAfterTest()}
                >
                    <Text style={{color: '#fff'}}>Back</Text>
                </TouchableOpacity>
                {
                    this.state.btnEx ?
                        <TouchableOpacity
                            style={{
                                width: SmartScreenBase.smPercenWidth * 30,
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingVertical: SmartScreenBase.smPercenHeight * 1.4,
                                borderRadius: SmartScreenBase.smPercenWidth * 5,
                                backgroundColor: '#01283A',
                            }}
                            onPress={() => this._explain()}
                        >
                            <Text style={{color: '#fff'}}>Giải thích</Text>
                        </TouchableOpacity>
                        : null
                }
                <TouchableOpacity
                    style={{
                        width: SmartScreenBase.smPercenWidth * 30,
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingVertical: SmartScreenBase.smPercenHeight * 1.4,
                        borderRadius: SmartScreenBase.smPercenWidth * 5,
                        backgroundColor: '#01283A',
                    }}
                    onPress={() => this._nextQuestion()}
                >
                    <Text style={{color: '#fff'}}>Next</Text>
                </TouchableOpacity>
            </View>
        );
    }

    _renderBtnExplain() {
        return (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
            }}>
                <TouchableOpacity
                    style={{
                        width: SmartScreenBase.smPercenWidth * 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingVertical: SmartScreenBase.smPercenHeight * 1.4,
                        borderRadius: SmartScreenBase.smPercenWidth * 5,
                        backgroundColor: '#01283A',
                    }}
                    onPress={() => this._backAfterTest()}
                >
                    <Text style={{color: '#fff'}}>Back</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={{
                        width: SmartScreenBase.smPercenWidth * 40,
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingVertical: SmartScreenBase.smPercenHeight * 1.4,
                        borderRadius: SmartScreenBase.smPercenWidth * 5,
                        backgroundColor: '#01283A',
                    }}
                    onPress={() => this._nextQuestion()}
                >
                    <Text style={{color: '#fff'}}>Next</Text>
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        return (
            this.state.isLoading ?
                <LoadingScreen/>
                :
                <View>
                    <View style={{
                        height: this.state.mode === 'afterTest' || this.state.checkResuilt !== null ? SmartScreenBase.smPercenHeight * 87 : SmartScreenBase.smPercenHeight * 72,
                        alignItems: 'center',
                        alignSelf: 'center',
                    }}>
                        <View>
                            {this.state.checkResuilt === null ? this._ShowQuestion() : this._ShowResuilt()}
                        </View>
                        <View style={{
                            position: 'absolute',
                            bottom: SmartScreenBase.smPercenHeight * 2,
                            alignSelf: 'center',
                        }}>
                            {
                                this.state.ShowCheck && !this.state.mode ? (
                                    <TouchableOpacity
                                        disabled={this.state.disableBtnCheck}
                                        style={this.state.disableBtnCheck ? StyleApp.Sty_Button_disable : StyleApp.Sty_Button}
                                        onPress={() => {
                                            this._OnPressCheckResuilt();
                                        }}>
                                        <Text style={StyleApp.Sty_Text_Button}>
                                            {
                                                this.state.checkResuilt == null
                                                    ? 'KIỂM TRA'
                                                    : 'TIẾP TỤC'
                                            }
                                        </Text>
                                    </TouchableOpacity>
                                ) : this.state.mode === 'testing' ?
                                    this._renderBtn()
                                    : this.state.mode === 'afterTest' ?
                                        this._renderBtnEx()
                                        : this.state.mode === 'explain' ?
                                            this._renderBtnExplain()
                                            : null
                            }
                        </View>
                    </View>
                    {
                        this.state.checkResuilt == false && this.NumberCheck < 2 ?
                            <FileSound4 showImage={'false'}/>
                            :
                            null
                    }
                </View>
        );
    }

    // _prevCarousel() {
    //     let item = this._carousel._activeItem;
    //     if (item !== 0) {
    //         this.setState({firstItem: item - 1});
    //     }
    // }

    // _nextCarousel() {
    //     let item = this._carousel._activeItem;
    //     if (item !== this.state.data.ques.length - 1) {
    //         this.setState({firstItem: item + 1});
    //     }
    // }

    _prevCarousel() {
        this._carousel?.current && this._carousel.current.snapToPrev()
    }

    _nextCarousel() {
        this._carousel?.current && this._carousel.current.snapToNext()
    }

    _ShowQuestion() {
        return (
            <View style={{alignItems: 'center', alignSelf: 'center'}}>
                <View style={[StyleLesson.Sty_View_Border, {
                    alignItems: 'flex-start',
                    height: SmartScreenBase.smPercenHeight * 35,
                    padding: SmartScreenBase.smPercenHeight * 2,
                }]}>
                    <ScrollView>
                        <TextDownLine textBody={this.state.data.text}/>
                    </ScrollView>
                </View>
                <View style={{
                    marginTop: SmartScreenBase.smPercenHeight * 2,
                    height: SmartScreenBase.smPercenHeight * 25,
                }}>
                    <TouchableOpacity
                        onPress={() => this._prevCarousel()}
                        style={{
                            position: 'absolute',
                            top: -SmartScreenBase.smPercenHeight,
                            left: SmartScreenBase.smBaseWidth * 50,
                            zIndex: 100,
                        }}
                    >
                        <Image
                            source={{uri: 'previous'}}
                            style={{
                                width: SmartScreenBase.smBaseWidth * 100,
                                height: SmartScreenBase.smBaseWidth * 100,
                                resizeMode: 'contain',
                            }}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => this._nextCarousel()}
                        style={{
                            position: 'absolute',
                            top: -SmartScreenBase.smPercenHeight,
                            right: SmartScreenBase.smBaseWidth * 50,
                            zIndex: 100,
                        }}
                    >
                        <Image
                            source={{uri: 'next'}}
                            style={{
                                width: SmartScreenBase.smBaseWidth * 100,
                                height: SmartScreenBase.smBaseWidth * 100,
                                resizeMode: 'contain',
                            }}
                        />
                    </TouchableOpacity>
                            <Carousel
                                ref={this._carousel}
                                data={this.state.data.ques}
                                renderItem={this.state.checkRes ? this._renderItemCarouselAt : this._renderItemCarousel}
                                sliderWidth={SmartScreenBase.smPercenWidth * 100}
                                itemWidth={SmartScreenBase.smPercenWidth * 85}
                                layout={'default'}
                            />
                </View>
            </View>
        );
    }

    _renderItemCarousel = ({item, index}) => {
        return (
            <View>
                <CarouselTrueFalse
                    item={item}
                    index={index}
                    screen={this}
                    total={this.state.data.ques.length}
                    answer={this.ListAnswer}
                    disableTouch={this.state.disableTouch}
                />
            </View>
        );
    };

    _renderItemCarouselAt = ({item, index}) => {
        return (
            <CarouselTrueFalseAt
                item={item}
                index={index}
                screen={this}
                total={this.state.data.ques.length}
                answer={this.ListAnswer}
            />
        );
    };

    _ShowResuilt() {
        return (
            <View style={{alignItems: 'center', alignSelf: 'center'}}>
                <View style={{
                    height: SmartScreenBase.smPercenHeight * 14,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <FileSound showImage={this.state.NumberTrue == this.state.data.ques.length ? 'true' : 'false'}/>
                </View>
                <Text style={{
                    ...StyleLesson.text_answer
                }}>BẠN ĐÃ TRẢ LỜI ĐÚNG {this.state.NumberTrue}/{this.state.data.ques.length}</Text>
                <View style={{width: SmartScreenBase.smPercenWidth * 100, alignItems: 'center'}}>
                    <View style={{height: SmartScreenBase.smPercenHeight * 55}}>
                        <FlatList
                            data={this.state.data.ques}
                            extraData={this.state.refresh}
                            keyExtractor={(item, index) => 'item' + index}
                            renderItem={this.RenderItemResuilt.bind(this)}
                            contentContainerStyle={{alignItems: 'center'}}
                        />
                    </View>
                </View>
            </View>
        );
    }

    RenderItemResuilt = ({item, index}) => {
        return (
            <View style={[StyleLesson.Sty_View_Border, {
                alignItems: 'flex-start',
                marginTop: SmartScreenBase.smBaseWidth * 125,
                borderWidth: SmartScreenBase.smPercenWidth / 2,
                marginBottom: SmartScreenBase.smPercenHeight,
                borderColor: this.ListAnswer[index] !== this.state.data.ques[index].answer ? '#D80B0B' : '#72B228',
            }]}>
                <Text style={{
                    ...stylesApp.txt,
                    paddingTop: SmartScreenBase.smPercenHeight * 2,
                    fontSize: SmartScreenBase.smFontSize * 45,
                }}>
                    <Text style={{fontSize: SmartScreenBase.smPercenWidth * 4, fontWeight: '900'}}>{index + 1}. </Text>
                    <Text style={{fontWeight: 'bold'}}>{item.question}</Text>
                </Text>
                <View style={{margin: SmartScreenBase.smPercenHeight, flexDirection: 'row', alignItems: 'center'}}>
                    <Text style={[stylesApp.txt, {
                        color: this.ListAnswer[index] !== this.state.data.ques[index].answer ? '#D80B0B' : '#72B228',
                        marginLeft: SmartScreenBase.smPercenWidth * 5,
                        textTransform: 'uppercase',
                        fontWeight: 'bold',
                        fontSize: SmartScreenBase.smFontSize * 50,
                    }]}>
                        {this.ListAnswer[index].toString()}</Text>
                    {this.ListAnswer[index] != this.state.data.ques[index].answer ? (
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginLeft: SmartScreenBase.smPercenWidth * 2,
                        }}>
                            <Image source={{uri: 'lesson_grammar_image3'}}
                                   style={[StyleLesson.Image_Explain]}
                            />
                            <Text style={[stylesApp.txt, {
                                color: '#72B228',
                                marginLeft: SmartScreenBase.smPercenWidth * 2,
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                                fontSize: SmartScreenBase.smFontSize * 50,
                            }]}>
                                {item.answer.toString()}</Text>
                        </View>
                    ) : null}
                </View>
                <View style={{marginTop: SmartScreenBase.smPercenHeight, marginBottom: SmartScreenBase.smPercenHeight}}>
                    <Text style={stylesApp.txt}>
                        <Text style={{fontWeight: 'bold', fontSize: SmartScreenBase.smFontSize * 55}}>GIẢI THÍCH
                            :</Text>
                    </Text>
                    <Text style={{
                        fontStyle: 'italic',
                        paddingLeft: SmartScreenBase.smPercenWidth * 5,
                        fontSize: SmartScreenBase.smFontSize * 45
                    }}>{item.explain}</Text>
                </View>
                <View style={{position: 'absolute', alignSelf: 'center', top: -SmartScreenBase.smBaseWidth * 70}}>
                    <Image
                        source={{uri: this.ListAnswer[index] !== this.state.data.ques[index].answer ? 'grammar1_3' : 'grammar1_4'}}
                        style={StyleLesson.Sty_Image_Small_Answer}
                    />
                </View>
            </View>
        );
    };
}

function mapStateToProps(state) {
    return {
        data_answer: state.readingD12Reducer,
        data_login: state.AuthStackReducer.dataLogin,
    };
}

export default connect(mapStateToProps)(ReadingF12);
