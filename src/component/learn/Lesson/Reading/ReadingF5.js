import React, {Component} from 'react';
import {Text, View, FlatList, TouchableOpacity, Image, ScrollView} from 'react-native';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import Carousel from 'react-native-snap-carousel';
import ItemReadingD7 from './Component/ItemReadingD7';
import ButtonCheck from '../../../items/ButtonCheck';
import TypeExercise from '../Component/TypeExercise2';
import StyleLesson from '../StyleLesson';
import FileSound from '../FileSound';
import stylesApp from '../../../styleApp/stylesApp';
import API from '../../../../API/APIConstant';
import axios from 'axios';
import {connect} from 'react-redux';
import {ReadingF7Action} from '../../../../redux/actions/ReadingF7Action';
import EventBus from 'react-native-event-bus';
import LoadingScreen from '../../../../screens/LoadingScreen';
import FileSound4 from "../FileSound4";
import StyleApp from '../../../../styleApp/stylesApp';
import FontBase from '../../../../base/FontBase';
import cloneDeep from 'lodash/cloneDeep';
import TextDownLine from '../../../../componentBase/TextDownLine/TextDownLine';

class ReadingF5 extends Component {
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
            // firstItem: 0,
            btnEx: false,
            disabledBtn: false,
            logLearning: {
                'class_id': 1,
                'unit_id': 1,
                'curriculum_id': 1,
            },
            dataLog: {},
            dataAnswer: [],
            disableBtnCheck: true,
            causeIndex: 0
        };
        this.ListAnswer = [];
        this.showListAnswer = [];
        this._OnPressCheckResuilt = this._OnPressCheckResuilt.bind(this);
        this._carousel = React.createRef();
    }

    componentDidMount() {
        this._getQuestion();
        this.props.saveLogLearning([]);
    }

    _saveStartLogLearning = async () => {
        const url = API.baseurl + API.saveLogLearning;
        const header = {
            'Content-Type': 'application/json',
            'jwt_token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImFkbWluIiwidGltZV9sb2dpbiI6MTU3ODkwNzQyM30.CFZyO9a-qBmyI8Q25AqGNd1nxWn1SO5TMC_yBxjgWCA',
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
        };
        try {
            const res = await axios({method: 'post', url: url, headers: header, data: this.state.logLearning});
            let data = res.data;
            this.setState({isLoading: false});
            this.setState({dataLog: data});
        } catch (error) {
            this.setState({isLoading: false});
            console.log(error);
        }
    };

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
                dataText['text'] = dataReturn.lesson.lesson_paragraph;
                let question = dataReturn.data_question;
                this.setState({vietnam: question[0].list_option[0].group_content_vi});
                this.setState({english: question[0].list_option[0].group_content});
                dataText['ques'] = [];
                question.forEach(element => {
                    let datac = {};
                    datac['question'] = element.list_option[0].question_content;
                    datac['explain'] = '';
                    if (element.list_option[0].option_explain) {
                        datac['explain'] = element.list_option[0].option_explain;
                    } else {
                        let ex = element.list_option[0].explain_parse;
                        datac['explain'] = ex['content_question_text'];
                    }
                    // datac['explain'] = element.list_option[0].option_explain;
                    datac['answer'] = element.list_option[0].match_option_text[0] ?? '';
                    datac.disabled = false;
                    dataText['ques'].push(datac);
                });

                this.setState({data: dataText});

                let dataQue = this.props.data_answer.data_answer;
                if (this.props.modeF === 'review_result') {
                    this.props.hideTypeExercise();
                    this.setState({minitest: true, mode: 'afterTest'});
                    this.ListAnswer = dataQue;
                    let check = 0;
                    for (let index = 0; index < dataText.ques.length; index++) {
                        if (this.ListAnswer[index] === dataText.ques[index].answer) {
                            check += 1;
                        }
                    }
                    if (check === dataQue.length) {
                        this.setState({checkResuilt: true});
                        this.setState({btnEx: false});
                    } else {
                        this.setState({checkResuilt: false});
                        this.setState({btnEx: true});
                    }
                    this.setState({NumberTrue: check});
                }
                // console.log('lsAns',this.ListAnswer);
                this.setState({isLoading: false});
            }
        }
        }catch(er){console.log("=====loi",er); Alert.alert("Bài tập này đang bị lỗi dữ liệu, vui lòng chọn bài khác")}
    }

    clearOldFailAns() {
        var mList = [...this.ListAnswer]
        this.ListAnswer.forEach((element, index) => {
            if(!this.state.data.ques[index].currentAnswer){
                mList[index] = null
            }
        });
        this.ListAnswer = mList
    }

    _OnpressAnswer(answer, index) {
        this.ListAnswer[index] = answer;
        // let check = this.ListAnswer.filter(function (e) { return e == null });
        var c = 0;
        this.ListAnswer.forEach((item) => {
            c += item ? 1 : 0;
        });
        if (c === this.state.data.ques.length) {
            this.setState({refresh: !this.state.refresh, disableBtnCheck: false});
        }
    }

    NumberCheck = 0;
    _OnPressCheckResuilt = () => {
        console.log("_OnPressCheckResuilt",this.ListAnswer,this.state.data.ques)
        this.props.dispatch(ReadingF7Action(this.ListAnswer));
        if (this.state.checkResuilt == null) {
            let check = 0;
            let dataLesson = this.state.logLearning.data_lesson;
            dataLesson = JSON.parse(dataLesson);
            let dataAns = [...this.state.dataAnswer];
            let data = {};
            // console.log('state',this.state);
            let currData = {...this.state.data};
            data['question_id'] = dataLesson.data_question[0].question_id;
            data['exercise_type'] = 'reading';
            data['question_type'] = dataLesson.data_question[0].list_option[0].question_type;
            data['question_score'] = 0;
            let dataDetails = {};
            dataDetails['num_turn'] = this.NumberCheck + 1;
            dataDetails['score'] = 0;
            data['final_user_choice'] = [];
            dataDetails['user_choice'] = [];
            this.showListAnswer = cloneDeep(this.ListAnswer)
            for (let index = 0; index < this.state.data.ques.length; index++) {
                data['final_user_choice'].push(this.ListAnswer[index]);
                dataDetails['user_choice'].push(this.ListAnswer[index]);
                data['detail_user_turn'] = [];
                if (this.ListAnswer[index] == this.state.data.ques[index].answer) {
                    check += 1;
                }else{
                   // this.ListAnswer[index] = ''
                }
            }

            console.log("_OnPressCheckResuilt after",check)

            data['question_score'] = 1/this.state.data.ques.length * check;
            dataDetails['score'] = 1/this.state.data.ques.length * check;
            if (this.NumberCheck === 0) {
                data['detail_user_turn'].push(dataDetails);
                dataAns.push(data);
            } else {
                dataAns[0]['question_score'] = data['question_score'];
                dataAns[0]['final_user_choice'] = data['final_user_choice'];
                dataAns[0]['detail_user_turn'].push(dataDetails);
                this.props.hideTypeExercise();
                this.props.showFeedback();
            }
            if (this.props.modeF === 'exam' || this.props.modeF === 'mini_test') {
                this.props.setDataAnswer(dataAns);
                // _saveLogExam(dataAns);
            } else {
                if (check == this.ListAnswer.length) {
                    this.props.hideTypeExercise();
                    this.props.showFeedback();
                    this.setState({checkResuilt: true});
                } else {
                    this.props.hideTypeExercise();
                    this.NumberCheck += 1;
                    this.setState({checkResuilt: false});
                }
                console.log('crD',currData);
                console.log('this.ListAnswer',this.ListAnswer);
                currData.ques.forEach((e,i)=>{
                    if(e.answer == this.ListAnswer[i]){
                        e.currentAnswer = this.ListAnswer[i];
                        e.disabled = true;
                    }
                })
                this.setState({dataAnswer: dataAns,data:currData});
                this.state.NumberTrue = check;
                // this.setState({firstItem: 0});
            }
            this.setState({causeIndex: 0});
        } else if (this.state.checkResuilt == false) {
            if (this.NumberCheck < 2) {
                this.props.showTypeExercise();
                this.setState({checkResuilt: null, disableBtnCheck: true});
                this.clearOldFailAns()
            } else {
                // this.props.methodScreen();
                this.props.hideFeedback();
                // this.setState({isLoading: true});
                this._saveLogLearning();
            }
        } else {
            // this.props.methodScreen();
            this.props.hideFeedback();
            // this.setState({isLoading: true});
            this._saveLogLearning();
        }


    };

    _renderBtn() {
        return (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
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
                    onPress={() => this.props.navigation.navigate('Reading')}
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
        this.NumberCheck = 3;
        let num2 = 0;
        // console.log("=====_explain",this.showListAnswer,this.state.data.ques)
        for (let index = 0; index < this.ListAnswer.length; index++) {
            if (this.ListAnswer[index] === this.state.data.ques[index].answer) {
                
                num2 += 1;
            }
        }
        if (num2 >= this.state.data.ques.length) {
            this.setState({checkResuilt: true});
        } else {
            this.setState({checkResuilt: false});
        }
        console.log("=====check 3",check)
        this.setState({btnEx: false});
        this.setState({NumberTrue: num2});
    }

    _backAfterTest() {
        if (this.props.modeF === 'review_result') {
            this.props.prevReviewResult();
        } else {
            if (!this.state.btnEx) {
                this.NumberCheck = 1;
                this.state.disableTouch = true;
                this.setState({checkResuilt: false});
                this.setState({btnEx: true});
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
                width: SmartScreenBase.smPercenWidth * 100
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
        //console.log('this.ListAnswer',this.ListAnswer)
        //console.log('state',this.state)
        return (
            this.state.isLoading
                ?
                <LoadingScreen/>
                :
                <View>
                    <View style={{
                        height: this.state.checkResuilt === null ? SmartScreenBase.smPercenHeight * 70 : SmartScreenBase.smPercenHeight * 84,
                        alignItems: 'center',
                        alignSelf: 'center',
                    }}>
                        <View>
                            {this.state.checkResuilt == null ? this._ShowQuestion() : this._ShowResuilt()}
                        </View>
                        <View style={{
                            position: 'absolute',
                            bottom: SmartScreenBase.smPercenHeight,
                            alignSelf: 'center',
                        }}>
                            {
                                this.state.minitest && this.state.checkResuilt == null ?
                                    this._renderBtn()
                                    :
                                    this.state.minitest && !this.state.explain
                                        ?
                                        this._renderBtnEx()
                                        :
                                        this.state.minitest && this.state.explain
                                            ?
                                            this._renderBtnExplain()
                                            :
                                            this.state.ShowCheck ? (
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
                        {
                            this.state.checkResuilt === true && this.NumberCheck < 2 ?
                                <FileSound4 showImage={"true"} />
                                :
                                this.state.checkResuilt === false && this.NumberCheck < 2 ?
                                    <FileSound4 showImage={"false"}/>
                                    :
                                    null
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
            <View style={{alignItems: 'center', alignSelf: 'center'}}>
                {/*<TypeExercise vietnam={this.state.vietnam} english={this.state.english}/>*/}
                <View style={[StyleLesson.Sty_View_Border, {
                    alignItems: 'flex-start',
                    height: SmartScreenBase.smPercenHeight * 30,
                     padding: SmartScreenBase.smPercenHeight * 2,
                }]}>
                    <ScrollView>
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
                    </ScrollView>
                </View>
                <View style={{
                    marginTop: SmartScreenBase.smPercenHeight * 2,
                    // height: SmartScreenBase.smPercenHeight * 25,
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
                            source={{uri: 'previous'}}
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
                            source={{uri: 'next'}}
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
                        // firstItem={this.state.firstItem}
                        layout={'default'}
                        onBeforeSnapToItem={(slideIndex) => this.onChangeIndex(slideIndex)}
                        // inactiveSlideShift={-35}
                    />

                </View>
            </View>
        );
    }

    _renderItemCarousel = ({item, index}) => {
        return (
            <View>
                <ItemReadingD7
                    ref='Ref_ItemReadingD7'
                    item={item}
                    index={index}
                    screen={this}
                    total={this.state.data.ques.length}
                    disabledBtn={item.disabled}
                    answer={item.currentAnswer}
                />
            </View>
        );
    };

    _ShowResuilt() {
        // console.log('numC',this.NumberCheck);
        return (
            <View style={{alignItems: 'center', alignSelf: 'center', marginTop: SmartScreenBase.smPercenHeight * 3}}>
                {this.NumberCheck >= 2 || this.state.checkResuilt == true ? (
                    <View style={{
                        height: SmartScreenBase.smBaseWidth * 200,
                        width:"100%",
                        justifyContent:'center',
                        alignItems:'center',
                    }}>
                        <FileSound showImage={this.state.NumberTrue == this.state.data.ques.length ?'true': 'false'}/>
                    </View>
                ) : (
                    <View style={{height: SmartScreenBase.smPercenHeight}}/>
                )}
                <Text style={{
                    ...StyleLesson.text_answer
                }}>BẠN ĐÃ TRẢ LỜI ĐÚNG {this.state.NumberTrue}/{this.state.data.ques.length}</Text>
                <View style={{width: SmartScreenBase.smPercenWidth * 100, alignItems: 'center'}}>
                    <View style={{position: 'absolute', top: 0}}>
                        {/* <Image source={{uri: 'student_home_image13'}}
                               style={[StyleLesson.Sty_ImageList, {transform: [{rotate: '180deg'}]}]}
                        /> */}
                    </View>
                    <View style={{
                        marginTop: SmartScreenBase.smPercenHeight * 3,
                        height: this.NumberCheck >= 2 || this.state.checkResuilt == true ? SmartScreenBase.smPercenHeight * 52 : SmartScreenBase.smPercenHeight * 60,
                    }}>
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
                borderWidth: SmartScreenBase.smPercenWidth / 2,
                marginBottom: SmartScreenBase.smPercenHeight * 2,
                borderColor: this.ListAnswer[index] != this.state.data.ques[index].answer ? 'rgba(232,66,90,0.95)' : 'rgba(198,229,14,0.95)',
                marginTop: SmartScreenBase.smBaseWidth * 120,
            }]}>
                <View style={{position: 'absolute', alignSelf: 'center', top: -SmartScreenBase.smBaseWidth * 56}}>
                    <Image
                        source={{uri: this.ListAnswer[index].toString() == this.state.data.ques[index].answer.toString() ? 'grammar1_4' : 'grammar1_3'}}
                        style={StyleLesson.Sty_Image_Small_Answer}
                    />
                </View>
                <Text style={{
                    ...stylesApp.txt,
                    marginTop: SmartScreenBase.smPercenHeight * 1.5,
                    fontSize: SmartScreenBase.smFontSize * 45,
                }}>
                    <Text style={{fontFamily: FontBase.MyriadPro_Regular, fontSize: SmartScreenBase.smFontSize*50}}>{index + 1}. {item.question}</Text>
                </Text>
                <View style={{margin: SmartScreenBase.smPercenHeight, flexDirection: 'row', alignItems: 'center'}}>
                    {/* <Image source={{ uri: "lesson_grammar_image2" }}
						style={StyleLesson.Image_Explain}
					/> */}
                    <Text style={[stylesApp.txt, {
                        fontFamily: FontBase.MyriadPro_Bold,
                        marginLeft: SmartScreenBase.smPercenWidth * 5,
                        textTransform: 'uppercase',
                        color: item.answer == this.ListAnswer[index] ? '#BBD54E' :  '#EE5555',
                        fontSize: SmartScreenBase.smFontSize * 50,
                    }]}>
                        {this.ListAnswer[index] == 'T' ? 'TRUE' : this.ListAnswer[index] == 'F' ? 'FALSE' : 'NOT GIVEN'}
                    </Text>
                    {
                        item.answer != this.ListAnswer[index] &&
                        this.NumberCheck >= 2 ? (
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginLeft: SmartScreenBase.smPercenWidth * 2,
                                }}>
                                    <Image source={{uri: 'lesson_grammar_image3'}}
                                           style={[StyleLesson.Image_Explain]}
                                    />
                                    <Text style={[stylesApp.txt, {
                                        fontWeight: 'bold',
                                        color: '#BBD54E',
                                        marginLeft: SmartScreenBase.smPercenWidth * 2,
                                        fontSize: SmartScreenBase.smFontSize * 50,
                                    }]}>
                                        {item.answer == 'T' ? 'TRUE' : item.answer == 'F' ? 'FALSE' : 'NOT GIVEN'}
                                    </Text>
                                </View>
                            )
                            : null
                    }
                </View>
                {
                    this.NumberCheck >= 2 ? (
                            <View style={{
                                marginTop: SmartScreenBase.smPercenHeight,
                                marginBottom: SmartScreenBase.smPercenHeight,
                            }}>
                                <Text style={{...stylesApp.txt, fontSize: SmartScreenBase.smFontSize * 40}}>
                                    <Text style={{fontWeight: 'bold', fontSize: SmartScreenBase.smPercenWidth * 4}}>GIẢI
                                        THÍCH:</Text>
                                </Text>
                                <Text style={{fontSize: SmartScreenBase.smFontSize * 45, fontStyle: 'italic', paddingLeft: SmartScreenBase.smPercenWidth * 3}}>{item.explain}</Text>
                            </View>
                        )
                        : null
                }
            </View>
        );
    };
}

function mapStateToProps(state) {
    return {
        data_answer: state.readingD7Reducer,
        data_login:state.AuthStackReducer.dataLogin
    };
}

export default connect(mapStateToProps)(ReadingF5);
