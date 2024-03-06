import React, { Component } from 'react';
import {
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Image,
    ScrollView,
    StyleSheet,
    Platform
} from 'react-native';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import Carousel from 'react-native-snap-carousel';
import FileSound from '../FileSound';
import FileSound4 from '../FileSound4';
import ItemReadingD4 from './Component/ItemReadingD4';
import TypeExercise from '../Component/TypeExercise2';
import ButtonCheck from '../../../items/ButtonCheck';
import StyleLesson from '../StyleLesson';
import stylesApp from '../../../styleApp/stylesApp';
import API from '../../../../API/APIConstant';
import axios from 'axios';
import { connect } from 'react-redux';
import { ReadingF4Action } from '../../../../redux/actions/ReadingF4Action';
import EventBus from 'react-native-event-bus';
import LoadingScreen from '../../../../screens/LoadingScreen';
import StyleApp from '../../../../styleApp/stylesApp';
import TextDownLine from '../../../../componentBase/TextDownLine/TextDownLine'

class ReadingF1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refresh: false,
            ShowCheck: true,
            checkResuilt: null,
            NumberTrue: 0,
            data: {},
            answer: [],
            minitest: false,
            explain: false,
            check: false,
            webview: '',
            isLoading: true,
            vietnam: '',
            english: '',
            firstItem: 0,
            logLearning: {
                'class_id': 1,
                'unit_id': 1,
                'curriculum_id': 1,
            },
            dataLog: {},
            dataAnswer: [],
            disableBtnCheck: true,
            statusSound: '',
            causeIndex: 0
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
            let saveLog = { ...this.state.logLearning };
            saveLog['data_lesson'] = JSON.stringify(dataReturn);
            saveLog['lesson_id'] = dataReturn.lesson.id;
            this.setState({ logLearning: saveLog });
            let dataText = { ...this.state.data };
            // console.log('dataReturn.lesson.lesson_paragraph', dataReturn.lesson);
            dataText['text'] = dataReturn.lesson.lesson_paragraph;
            let question = dataReturn.data_question;
            dataText['ques'] = [];
            question.forEach(element => {
                this.setState({ vietnam: element.list_option[0].group_content_vi });
                this.setState({ english: element.list_option[0].group_content });
                let datac = {};
                datac['question'] = element.list_option[0].question_content;
                datac['option'] = [];
                datac['script'] = 'yes !';
                datac['explain'] = '';
                if (element.list_option[0].option_explain) {
                    datac['explain'] = element.list_option[0].option_explain;
                } else {
                    let ex = element.list_option[0].explain_parse;
                    datac['explain'] = ex ? ex['content_question_text'] : '';
                }
                element.list_option.forEach(e => {
                    datac['option'].push(e.match_option_text[0]);
                    if (e.score === '1') {
                        datac['answer'] = e.match_option_text[0];
                    }
                });
                dataText['ques'].push(datac);
            });
            this.setState({ data: dataText });
            let dataQue = this.props.data_question.data_question;
            if (this.props.modeF === 'review_result') {
                this.props.hideTypeExercise();
                this.setState({ minitest: true });
                let dataAnswer = [];
                if (dataQue) {
                    dataAnswer = dataQue['list_answer'];
                }
                this.ListAnswer = dataAnswer;
                let check = 0;
                for (let index = 0; index < dataText.ques.length; index++) {
                    if (this.ListAnswer[index] === dataText.ques[index].answer) {
                        check += 1;
                    }
                }
                if (check === this.ListAnswer.length) {
                    this.setState({ checkResuilt: true });
                } else {
                    this.setState({ checkResuilt: false });
                }
                this.setState({ NumberTrue: check });
            }
            // this._saveStartLogLearning();
            this.setState({ isLoading: false });
        }
        }catch(er){console.log("=====loi",er); Alert.alert("Bài tập này đang bị lỗi dữ liệu, vui lòng chọn bài khác")}
    }

    async _OnpressAnswer(answer, index) {

        this.ListAnswer[index] = this.state.data.ques[index].option[answer];
        let c = 0;
        this.ListAnswer.forEach((item) => {
            if (item) {
                c++;
            }
        });
        if (c === this.state.data.ques.length) {
            this.setState({ refresh: !this.state.refresh, disableBtnCheck: false });
        } else {
            this.setState({ refresh: !this.state.refresh, disableBtnCheck: true });
        }
        let data = {};
        let listA = [];
        listA[index] = answer;
        data['answer'] = listA;
        data['question'] = this.state.data.ques;
        // console.log(this.ListAnswer, "-----------------lsA")

        await this.props.dispatch(data);
    }

    NumberCheck = 0;

    async _OnPressCheckResuilt() {
        let dataDp = {};
        dataDp['list_answer'] = this.ListAnswer;
        dataDp['question'] = this.state.data.ques;
        await this.props.dispatch(ReadingF4Action(dataDp));
        for (let index = 0; index < this.state.data.ques.length; index++) {
            if (this.state.data.ques[index].show == false) {
                this.state.data.ques.splice(index, 1);
            }
        }
        // console.log(this.state.checkResuilt, "----------------------chck")
        if (this.state.checkResuilt == null) {
            let dataLesson = this.state.logLearning.data_lesson;
            dataLesson = JSON.parse(dataLesson);
            let dataAns = [...this.state.dataAnswer];
            // this.setState({ explain: true });
            let check = 0;
            for (let index = 0; index < this.state.data.ques.length; index++) {
                let data = {};
                data['question_id'] = dataLesson.data_question[index].question_id;
                data['exercise_type'] = 'reading';
                data['question_type'] = dataLesson.data_question[index].list_option[0].question_type;
                data['question_score'] = 0;
                data['final_user_choice'] = this.ListAnswer[index];
                let dataDetails = {};
                dataDetails['num_turn'] = this.NumberCheck + 1;
                dataDetails['score'] = 0;
                dataDetails['user_choice'] = this.ListAnswer[index];
                data['detail_user_turn'] = [];
                if (this.ListAnswer[index] == this.state.data.ques[index].answer) {
                    data['question_score'] = 1;
                    dataDetails['score'] = 1;
                    check += 1;
                }
                if (this.NumberCheck === 0) {
                    data['detail_user_turn'].push(dataDetails);
                    dataAns.push(data);
                } else {
                    dataAns[index]['final_user_choice'] = this.ListAnswer[index];
                    dataAns[index]['question_score'] = this.ListAnswer[index] === this.state.data.ques[index].answer ? 1 : 0;
                    dataAns[index]['detail_user_turn'].push(dataDetails);
                }
            }
            if (this.props.modeF === 'exam' || this.props.modeF === 'mini_test') {
                this.props.setDataAnswer(dataAns);
                // _saveLogExam(dataAns);
            } else {
                if (check === this.ListAnswer.length) {
                    // this.props.showFeedback();
                    this.props.hideTypeExercise();
                    this.setState({ checkResuilt: true });
                    this.setState({ check: true });
                } else {
                    this.NumberCheck += 1;
                    this.props.hideTypeExercise();
                    this.setState({ checkResuilt: false });
                    this.setState({ check: false });
                }
                this.setState({ dataAnswer: dataAns, NumberTrue: check });
                if (this.NumberCheck >= 2) {
                    this.props.hideTypeExercise();
                    this.setState({ explain: true });
                    this.setState({ checkResuilt: true });
                    this.props.showFeedback();
                }
                // if (this.NumberCheck >= 2) {
                //     this.props.showFeedback();
                // }
            }
            this.setState({causeIndex : 0});
        } else if (this.state.checkResuilt == false) {
            if (this.NumberCheck < 2) {
                this.props.showTypeExercise();
                this.ListAnswer = [];
                this.state.dataAnswer.forEach((e, i) => {
                    if (e.question_score > 0) {
                        this.ListAnswer[i] = e.final_user_choice;
                    }
                })

                this.setState({
                    checkResuilt: null,
                    disableBtnCheck: true
                });
                
                this._carousel?.current && this._carousel?.current.snapToItem(0, false)
            } else {
                this.props.hideTypeExercise();
                // this.setState({isLoading: true});
                // this._saveLogLearning();
                this.setState({ checkResuilt: true });
                this.props.showFeedback();
                // this.props.methodScreen();
            }
        } else {
            this.props.hideTypeExercise();
            this.props.hideFeedback();
            this._saveLogLearning();
            // this.setState({ explain: true });
            // this.props.methodScreen();
        }
    }

    render() {
        // console.log(this.state.dataAnswer, "----------------------data ans")
        return (
            this.state.isLoading ?
                <LoadingScreen />
                :
                <View
                    style={{
                        flex: 1,
                        alignItems: 'center',
                        alignSelf: 'center',
                    }}>
                    <View style={{
                        flex: 1, alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {
                            this.state.checkResuilt == null
                                ? this._ShowQuestion()
                                : this._ShowResuilt()
                        }
                    </View>
                    <View
                        style={{
                            marginBottom: SmartScreenBase.smPercenHeight * 3
                        }}>
                        {
                                        this.state.ShowCheck == true ? (
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
                                                            : this.state.checkResuilt == false && this.NumberCheck < 2
                                                                ? 'LÀM LẠI'
                                                                : 'TIẾP TỤC'
                                                    }
                                                </Text>
                                            </TouchableOpacity>
                                        ) : null
                        }
                    </View>
                </View>
        );
    }

    _prevCarousel() {
        this._carousel?.current && this._carousel.current.snapToPrev()
    }

    _nextCarousel() {
        this._carousel?.current && this._carousel.current.snapToNext()
    }

    onChangeIndex(curIndex) {
        this.setState({causeIndex: curIndex})
    }

    _ShowQuestion() {

        return (
            <View style={{ alignItems: 'center', alignSelf: 'center' }}>
                {/*<TypeExercise vietnam={this.state.vietnam} english={this.state.english}/>*/}
                <View
                    style={[
                        StyleLesson.Sty_View_Border,
                        {
                            alignItems: 'flex-start',
                            height: Platform.OS === 'ios' ? SmartScreenBase.smPercenHeight * 30 : SmartScreenBase.smPercenHeight * 27,
                            padding: SmartScreenBase.smPercenHeight * 2,
                        },
                    ]}>
                    <ScrollView persistentScrollbar={true}>
                        <View style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'flex-start',
                        }}>
                            {
                                this.state.data.text ?
                                <TextDownLine textBody={this.state.data.text}/>
                                :
                                null
                            }

                        </View>
                        {/* <Text style={stylesApp.txt}>{this.state.data.text}</Text> */}
                    </ScrollView>
                </View>
                <View
                    style={{
                        marginTop: SmartScreenBase.smPercenHeight * 2,
                        height: SmartScreenBase.smPercenHeight * 30,
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
                        {this.state.causeIndex > 0 && <Image
                            source={{ uri: 'previous' }}
                            style={{
                                width: SmartScreenBase.smBaseWidth * 100,
                                height: SmartScreenBase.smBaseWidth * 100,
                                resizeMode: 'contain',
                            }}
                        />}
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
                        {this.state.causeIndex < this.state.data.ques.length-1 && <Image
                            source={{ uri: 'next' }}
                            style={{
                                width: SmartScreenBase.smBaseWidth * 100,
                                height: SmartScreenBase.smBaseWidth * 100,
                                resizeMode: 'contain',
                            }}
                        />}
                    </TouchableOpacity>
                    <Carousel
                        ref={this._carousel}
                        data={this.state.data.ques}
                        renderItem={this._renderItemCarousel}
                        sliderWidth={SmartScreenBase.smPercenWidth * 100}
                        itemWidth={SmartScreenBase.smPercenWidth * 85}
                        layout={'default'}
                        onBeforeSnapToItem={(slideIndex) => this.onChangeIndex(slideIndex)}
                    />
                </View>
            </View>
        );
    }

    _renderItemCarousel = ({ item, index }) => {
        // console.log(this.state.data,"----------------------state data")
        let { answer } = this.state;
        return (
            <ItemReadingD4
                item={item}
                index={index}
                screen={this}
                total={this.state.data.ques.length}
                answer={answer[index]}

                dataAnswer={this.state.dataAnswer}
            />
        );
    };

    _ShowResuilt() {
        // console.log('NumberCheck',this.NumberCheck)
        const hideIcon = this.NumberCheck<2 &&this.state.NumberTrue != this.state.data.ques.length
        return (
            <View style={{ alignItems: 'center', alignSelf: 'center'}}>
                <View style={{
                    width: "100%",
                    height: SmartScreenBase.smPercenHeight * (hideIcon?1:12),
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <FileSound 
                        showIcon={hideIcon ?'none':null}
                        showImage={this.state.NumberTrue === this.state.data.ques.length ? 'true':'false'} 
                    />
                </View>
                <Text
                    style={{
                        ...StyleLesson.text_answer
                    }}>
                    BẠN ĐÃ TRẢ LỜI ĐÚNG {this.state.NumberTrue}/{this.state.data.ques.length}
                </Text>
                <View
                    style={{
                        width: '100%',
                        alignItems: 'center',
                    }}>
                    <View
                        style={{ height:SmartScreenBase.smPercenHeight * (hideIcon?65:55) }}>
                        <FlatList
                            data={this.state.data.ques}
                            extraData={this.state.refresh}
                            keyExtractor={(item, index) => 'item' + index}
                            renderItem={this.RenderItemResuilt.bind(this)}
                            contentContainerStyle={{ alignItems: 'center' }}
                        />
                    </View>
                </View>
            </View>
        );
    }

    RenderItemResuilt = ({ item, index }) => {
        // console.log('loggg', item)
        const hideIcon = this.NumberCheck<2 &&this.state.NumberTrue != this.state.data.ques.length
        const isWrong = this.ListAnswer[index] !== this.state.data.ques[index].answer;
        return (
            <View
                style={[
                    StyleLesson.Sty_View_Border,
                    {
                        alignItems: 'flex-start',
                        borderWidth: SmartScreenBase.smPercenWidth / 2,
                        marginTop: SmartScreenBase.smBaseWidth * 120,
                        marginBottom:
                            index == this.state.data.ques.length - 1
                                ? SmartScreenBase.smPercenHeight * 15
                                : 0,
                        borderColor:
                        isWrong
                                ? 'rgba(232,66,90,0.95)'
                                : 'rgba(198,229,14,0.95)',
                    },
                ]}>
                <View style={{
                    position: 'absolute',
                    top: -SmartScreenBase.smPercenHeight * 3,
                    left: SmartScreenBase.smPercenWidth * 40,
                }}>
                    <Image source={{ uri: isWrong?'grammar1_3':'grammar1_4' }} style={{
                        width: SmartScreenBase.smPercenHeight * 6,
                        height: SmartScreenBase.smPercenHeight * 6,
                    }} />
                </View>
                <Text style={{
                    ...StyleLesson.question_text,
                    paddingTop: SmartScreenBase.smPercenHeight * 3,
                    marginLeft: SmartScreenBase.smPercenHeight
                }}>
                    <Text style={{ fontWeight: 'bold' }}>{index + 1}. {item.question}</Text>
                </Text>
                <View style={{ margin: SmartScreenBase.smPercenHeight,width:'100%' }}>
                    <Text
                        style={[
                            StyleLesson.answer_text,
                            {
                                fontWeight: 'bold',
                                color: isWrong? 'rgba(232,66,90,0.95)': 'rgba(198,229,14,0.95)',
                                marginLeft: SmartScreenBase.smPercenWidth * 2,
                            },
                        ]}>
                        {this.ListAnswer[index]}
                    </Text>
                    {
                        isWrong&&this.NumberCheck>=2&&<View style={{
                                flexDirection: 'row',
                                flex:1
                            }}>
                                <Image
                                    source={{ uri: 'lesson_grammar_image3' }}
                                    style={[
                                        StyleLesson.Image_Explain,
                                        { marginLeft: SmartScreenBase.smPercenWidth * 2 },
                                    ]}
                                />
                                <Text
                                    style={{
                                        fontSize: SmartScreenBase.smFontSize * 50,
                                        fontWeight: 'bold',
                                        color: 'rgba(198,229,14,0.95)',
                                        marginLeft: SmartScreenBase.smPercenWidth * 2,
                                        flex:1
                                    }}>
                                    {this.state.data.ques[index].answer}
                                </Text>
                            </View>
                    }
                    {
                        !hideIcon&&<View style={{ marginTop: SmartScreenBase.smPercenWidth * 3 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: SmartScreenBase.smFontSize * 55 }}>GIẢI THÍCH :</Text>
                            <Text style={{ fontStyle: 'italic',fontSize: SmartScreenBase.smFontSize * 45 }}>
                                {this.state.data.ques[index].explain}</Text>
                        </View>
                    }
                </View>
            </View>
        );
    };
}

function mapStateToProps(state) {
    return {
        data_question: state.readingF4Reducer,
        data_login: state.AuthStackReducer.dataLogin,
    };
}

export default connect(mapStateToProps)(ReadingF1);
