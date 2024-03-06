import React, {Component} from 'react';
import {Text, View, TouchableOpacity, Image, FlatList, TextInput, Keyboard, ScrollView, Platform, Alert} from 'react-native';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import ButtonCheck from '../../../items/ButtonCheck';
import TypeExercise from '../Component/TypeExercise2';
import FileSound from '../FileSound';
import FileSound4 from '../FileSound4';
import StyleLesson from '../StyleLesson';
import stylesApp from '../../../styleApp/stylesApp';
import API from '../../../../API/APIConstant';
import {connect} from 'react-redux';
import {ReadingD12Action} from '../../../../redux/actions/ReadingD12Action';
import axios from 'axios';
import EventBus from 'react-native-event-bus';
import LoadingScreen from '../../../../screens/LoadingScreen';
import StyleApp from '../../../../styleApp/stylesApp';
import Utils from '../../../../utils/stringUtils';
import {KeyboardAwareScrollView,KeyboardAwareFlatList} from 'react-native-keyboard-aware-scroll-view';
import stringUtils from '../../../../utils/stringUtils';
import lessonMath from '../../../../utils/lessonMath';
import LessonBase from '../../../../base/LessonBase';
import FontBase from '../../../../base/FontBase';
import LogBase from '../../../../base/LogBase';

class ReadingF2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ShowCheck: false,
            HeightLayoutTitle: 0,
            refresh: false,
            enableEdit: true,
            checkResuilt: null,
            NumberTrue: 0,
            data: {},
            // listN: [],
            minitest: false,
            // arrAs: [],
            mode: '',
            heightScrool: Platform.OS === 'ios' ? SmartScreenBase.smPercenHeight * 60 : SmartScreenBase.smPercenHeight * 57,
            btnEx: true,
            webview: '',
            isLoading: true,
            vietnam: '',
            english: '',
            logLearning: {
                'class_id': 1,
                'unit_id': 1,
                'curriculum_id': 1,
            },
            dataLog: {},
            dataAnswer: [],
            dataAns:[],
            widthInput: [],
            disableBtnCheck: true
        };
        this.ArrAnswer = [];
        this.ListNumber = [];
        this.ListIdAnswer = [];
        this.contentHeight = null;
        this.scrollHeight = null;
        this.scrollY = null;
        this.dataP = [];
        // [
        //     'handleKeyboardShow', 'handleKeyboardHide',
        //     'handleLayout', 'handleContentChange', 'handleScroll',
        // ].forEach((method) => {
        //     this[method] = this[method].bind(this);
        // });

    }

    componentDidMount() {
        this._getQuestion();
        // this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.handleKeyboardShow);
        // this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.handleKeyboardHide);
        this.props.saveLogLearning([]);
    }

    componentWillUnmount() {
        // this.keyboardDidShowListener.remove();
        // this.keyboardDidHideListener.remove();
    };


    // todo: handle layout instead of keyboard
    handleKeyboardShow = (e) => {
        this.setState({scrollEnabled: true});
        this.setState({heightScrool: SmartScreenBase.smPercenHeight * 60 - e.endCoordinates.height * 0.6});
        this.scrollToBottom();
    };

    handleKeyboardHide() {
        let height = Platform.OS === 'ios' ? SmartScreenBase.smPercenHeight * 60 : SmartScreenBase.smPercenHeight * 57;
        this.setState({heightScrool: height});
        this.setState({scrollEnabled: false});
    }

    handleScroll(e) {
        this.scrollY = e.nativeEvent.contentOffset.y;
    }

    handleLayout(e) {
        this.scrollHeight = e.nativeEvent.layout.height;
        this.scrollToBottom();
    }

    handleContentChange(w, h) {
        // repeated called on Android
        // should do diff
        if (h === this.contentHeight) {
            return;
        }
        this.contentHeight = h;

        if (this.scrollHeight == null) {
            setTimeout(() => {
                this.scrollToBottomIfNecessary();
            }, 500);
        } else {
            this.scrollToBottomIfNecessary();
        }
    }

    scrollToBottomIfNecessary() {
        // todo: range detection
        this.scrollToBottom();
    }

    scrollToBottom() {
        const {scrollHeight, contentHeight} = this;
        // console.log('123233')
        if (scrollHeight == null) {
            return;
        }

        if (contentHeight > scrollHeight) {
            this.refs.scroller.scrollTo({y: this.layoutX[this.indexFocus]});
        }
        if (contentHeight === scrollHeight) {
            this.refs.scroller.scrollTo({y: 100});
        }
    }

    _saveLogLearning = async () => {
        this.props.saveLogLearning(this.state.dataAnswer);
    };

    async _getQuestion() {
        if (this.props.dataContent) {
            let dataReturn = this.props.dataContent;
            try{
            if (dataReturn.status) {
                let saveLog = {...this.state.logLearning};
                saveLog['data_lesson'] = JSON.stringify(dataReturn);
                saveLog['lesson_id'] = dataReturn.lesson.id;
                this.setState({logLearning: saveLog});
                let dataText = {...this.state.data};
                let question = dataReturn.data_question;
                dataText['answer'] = [];
                dataText['explain'] = [];
                question.forEach(element => {
                    dataText['question'] = element.list_option[0].question_content.replace(/\n/g,' \n');
                    this.setState({vietnam: element.list_option[0].group_content_vi});
                    this.setState({english: element.list_option[0].group_content});
                    element.list_option.forEach(e => {
                        dataText['answer'].push(e.match_option_text);
                        dataText['explain'].push(e.option_explain);
                    });
                });
                dataText.status = [];
                dataText['question'] = stringUtils.filterTextInNgoac(dataText.question)
                this.setState({data: dataText});
                let dataQ = dataText.question.split(' ');
                dataQ.forEach((element, index) => {
                    let indexOf = element.search((/\{([^}]+)\}/));
                    if (indexOf !== -1) {
                        this.ListNumber.push(index);
                    }
                });

                for (let index = 0; index < dataText.answer.length; index++) {
                    this.ArrAnswer.push('');
                    this.ListIdAnswer.push(-1);
                }
                let dataQue = this.props.data_answer.data_answer;
                if (this.props.modeF === 'review_result') {
                    this.props.showTypeExercise();
                    this.setState({minitest: true, mode: 'afterTest'});
                    this.ArrAnswer = dataQue;
                    let num = 0;
                    console.log("=====check 1")
                    for (let index = 0; index < dataText.answer.length; index++) {
                        if (this.dataAnswer[index].toLowerCase().trim().trim().replace(/[^a-zA-Z ]/g, '') === dataText.answer[index].toLowerCase().trim().trim().replace(/[^a-zA-Z ]/g, '')) {
                            num += 1;
                        }
                    }
                    this.setState({NumberTrue: num, disableTouch: true, enableEdit: false,dataAns:dataQue});
                    if (num >= dataQue.length) {
                        this.setState({checkResuilt: true});
                    } else {
                        this.setState({checkResuilt: false});
                    }
                    this.setState({refresh: !this.state.refresh});
                }
                // this._saveStartLogLearning();
                this.setState({isLoading: false});
            }
            }catch(er){console.log("=====loi",er); Alert.alert("Bài tập này đang bị lỗi dữ liệu, vui lòng chọn bài khác")}
        }
    }

    _trimChar = (string) => {
        string = string.replace('‘', '\'').replace(/[\u2018\u2019]/g, '\'');
        while (string.charAt(string.length - 1) === '.' || string.charAt(string.length - 1) === ',') {
            string = string.substring(0, string.length - 1).trim();
        }
        return string;
    };

    _ColorAnswer(key) {
        let id = this.ListNumber.indexOf(key);
        if (this.state.mode === 'testing') {
            console.log("=====_ColorAnswer",1)
            return '#f8e920';
        }
        if (this.state.checkResuilt == null) {
            console.log("=====_ColorAnswer",2)
            if(this.state.data.status[id]){
                return '#C7E519';
            }
            return '#f8e920';
        } else {
            if (this.ArrAnswer.length) {
                if (this.ArrAnswer[id]) {
                    console.log("=====check 2")
                    let trimChar = this._trimChar(this.ArrAnswer[id].toLowerCase().trim());
                    var isTrue = false
                    this.state.data.answer[id].forEach(elm => {
                        if (trimChar.trim() === elm.toLowerCase().trim().replace(/[^a-zA-Z ]/g, '')) {
                            isTrue = true
                        }
                    });

                    if (isTrue) {
                        return '#C7E519';
                    } else {
                        return '#EE5555';
                    }
                } else {
                    return '#EE5555';
                }
            } else {
                console.log("=====_ColorAnswer",3)
                return '#f8e920';
            }
        }
    }

    async _OnChangeText(text, key) {
        // console.log('txt',text);
        // console.log('key',key);
        let id = this.ListNumber.indexOf(key);
        this.ArrAnswer[id] = text;
        if (Platform.OS === 'android') {
            let widthIn = [...this.state.widthInput];
            widthIn[id] = SmartScreenBase.smPercenWidth * text.length * 2 + SmartScreenBase.smPercenWidth * 15;
            this.setState({widthInput: widthIn});
        }
        let dataAn = [...this.state.dataAns];
        // console.log('this.dataAn',dataAn);

        dataAn[id] = text;
        this.setState({dataAns:dataAn});
        this.setState({ShowCheck: true});
        // await this.props.dispatch(ReadingD12Action(this.ArrAnswer));
        let c = 0;
        this.ArrAnswer.forEach((item) => {
            c += item ? 1 : 0;
        });
        if (c) {
            this.setState({ disableBtnCheck: false });
        } else {
            this.setState({ disableBtnCheck: true });
        }
    }

    NumberCheck = 0;

    async _OnPressCheckResuilt() {
        await this.props.dispatch(ReadingD12Action(this.ArrAnswer));
        if (this.state.checkResuilt == null) {
            this.props.hideTypeExercise();
            let num = 0;
            let dataLesson = this.state.logLearning.data_lesson;
            dataLesson = JSON.parse(dataLesson);
            let dataAns = this.state.dataAnswer;
            let data = {};
            data['question_id'] = dataLesson.data_question[0].question_id;
            data['exercise_type'] = 'reading';
            data['question_type'] = dataLesson.data_question[0].list_option[0].question_type;
            data['question_score'] = 0;
            let dataDetails = {};
            dataDetails['num_turn'] = this.NumberCheck;
            dataDetails['score'] = 0;
            data['final_user_choice'] = [];
            dataDetails['user_choice'] = [];
            //check đúng sai
            for (let index = 0; index < this.state.data.answer.length; index++) {
                data['final_user_choice'].push(this.ArrAnswer[index]?.toLowerCase());
                dataDetails['user_choice'].push(this.ArrAnswer[index]?.toLowerCase());
                data['detail_user_turn'] = [];
                console.log("=====checkKQ",this.ArrAnswer, this.state.data.answer)
                
                this.state.data.answer[index].forEach(elm => {
                    if ( Utils.validWord(this.ArrAnswer[index]) === Utils.validWord(elm)) {
                        this.state.data.status[index] = true;
                        data['question_score'] += 1/this.state.data.answer.length //parseFloat(dataLesson.data_question[0].list_option[index].score);
                        dataDetails['score'] += 1/this.state.data.answer.length //parseFloat(dataLesson.data_question[0].list_option[index].score);
                        num += 1;
                    }
                });
            }

            if (num === this.state.data.answer.length) {
                if (this.props.modeF === 'exam' || this.props.modeF === 'mini_test') {
                    this.props.setDataAnswer(dataAns);
                    // _saveLogExam(dataAns);
                } else {
                    this.props.hideTypeExercise();
                    this.props.showFeedback();
                    this.state.checkResuilt = true;
                }
            } else {
                this.NumberCheck += 1;
                this.state.checkResuilt = false;
            }
            // console.log('this.NumberCheck',this.NumberCheck)
            // console.log('dataAns',dataAns)
            if (this.NumberCheck < 2) {
                data['detail_user_turn'].push(dataDetails);
                dataAns.push(data);
            } else {
                dataAns[0]['question_score'] = data['question_score'];
                dataAns[0]['final_user_choice'] = data['final_user_choice'];
                dataAns[0]['detail_user_turn'].push(dataDetails);
                this.props.showFeedback();
                this.props.hideTypeExercise();
            }
            if (this.props.modeF === 'exam' || this.props.modeF === 'mini_test') {
                this.props.setDataAnswer(dataAns);
                // _saveLogExam(dataAns);
            } else {
                this.state.disableTouch = true;
                this.state.NumberTrue = num;
                this.state.enableEdit = false;
                this.setState({dataAnswer: dataAns});
            }
        } else if (this.state.checkResuilt == false) {
            this.props.showTypeExercise();
            if (this.NumberCheck < 2) {
                //this.props.showFeedback();
                let dataAn = [...this.state.dataAns];
                for(let i =0; i < dataAn.length; i ++){
                    if(this.state.data.status[i]){

                    }else{
                        this.ArrAnswer[i] = null;
                        dataAn[i] = null
                    }
                }
               
                this.setState({
                    dataAns: dataAn,
                    ShowCheck: false,
                    checkResuilt: null,
                    disableTouch: false,
                    enableEdit: true,
                    disableBtnCheck: true
                });
            } else {
                this.props.hideTypeExercise();
                this.props.hideFeedback();
                this._saveLogLearning();
            }
        } else {
            console.log("=====checkKQ gần done 4")
            this.props.hideFeedback();
            this._saveLogLearning();
        }
        this.setState({refresh: !this.state.refresh});
        console.log("=====checkKQ done")
    }

    _onChangeWidth = (width, key) => {
        if (Platform.OS === 'ios') {
            let id = this.ListNumber.indexOf(key);
            let widthIn = [...this.state.widthInput];
            widthIn[id] = width;
            this.setState({widthInput: widthIn});
        }
    };

    _withInput(key) {
        if (Platform.OS === 'ios') {
            return this.state.widthInput[this.ListNumber.indexOf(key)] && this.state.widthInput[this.ListNumber.indexOf(key)] > SmartScreenBase.smPercenWidth * 5 ? this.state.widthInput[this.ListNumber.indexOf(key)] + (SmartScreenBase.smPercenWidth * 12) : SmartScreenBase.smPercenWidth * 20;
        } else {
            return this.state.widthInput[this.ListNumber.indexOf(key)] && this.state.widthInput[this.ListNumber.indexOf(key)] > SmartScreenBase.smPercenWidth * 2 ? this.state.widthInput[this.ListNumber.indexOf(key)] : SmartScreenBase.smPercenWidth * 20;
        }
    }

    layoutX = [];
    indexFocus = -1;
    _onLayout = (layout, ques) => {
        if (ques !== -1) {
            this.layoutX.push(layout.y - SmartScreenBase.smPercenHeight);
        }
    };

    _ShowQuestion() {
        // console.log('lN',this.ListNumber);
        // console.log('arrAs',this.state.dataAns);
        
        return (
            <View style={{alignSelf: 'center', alignItems: 'center', marginBottom: SmartScreenBase.smPercenHeight * 3}}>
                <View style={{
                    alignSelf: 'center',
                    alignItems: 'center',
                    marginTop: SmartScreenBase.smPercenHeight * 2,
                    height: this.state.checkResuilt!=null?(Platform.OS === 'ios' ? SmartScreenBase.smPercenHeight*75 : SmartScreenBase.smPercenHeight*75): this.state.heightScrool,
                }}>
                    {
                        this.state.checkResuilt!=null&&<Text style={{
                            ...StyleLesson.text_answer
                        }}>BẠN ĐÃ TRẢ LỜI ĐÚNG {this.state.NumberTrue}/{this.state.data.answer.length}</Text>
                    }
                    <KeyboardAwareScrollView
                        onKeyboardDidShow={()=>{
                            this.props.hideTypeExercise();
                        }}
                        onKeyboardDidHide={()=>{
                            this.props.showTypeExercise();
                        }}
                        nestedScrollEnabled
                        enableOnAndroid={true}
                        ref="scroller"
                        // extraHeight={-200}
                        extraScrollHeight={Platform.OS === 'ios' ? -SmartScreenBase.smPercenHeight*26 : 0}
                        //scrollEnabled={true}
                        // contentContainerStyle={{ height: this.state.heightScrool }}
                        // keyboardShouldPersistTaps={'handled'}
                        // showsVerticalScrollIndicator={false}
                        // scrollEventThrottle={16}
                        // onScroll={this.handleScroll}
                        // onLayout={this.handleLayout}
                        //onContentSizeChange={this.handleContentChange}
                        //{...this.props}
                    >
                        <View style={[StyleLesson.Sty_View_Border, {
                            alignItems: 'center',
                            zIndex: 0,
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                        }]}>
                            {
                                this.state.data.question ?
                                    this.state.data.question.split(' ').map((ques, key) => {
                                        return (
                                            <>
                                            {
                                                ques.indexOf('\n')>=0&&<View style={{
                                                    width:'100%',
                                                    height:1,
                                            }}></View>
                                            }
                                            <View 
                                            style={{
                                                height:SmartScreenBase.smPercenWidth*7,
                                                justifyContent:'center'
                                            }}
                                            key={key}  
                                            //onLayout={(event) => this._onLayout(event.nativeEvent.layout, ques.search((/\{([^}]+)\}/)))}
                                        >
                                                {
                                                    ques.search((/\{([^}]+)\}/)) !== -1 ? (
                                                        <View>
                                                            <View style={{
                                                                backgroundColor: this._ColorAnswer(key),
                                                                flexDirection: 'row',
                                                                alignItems: 'center',
                                                                borderWidth: SmartScreenBase.smPercenWidth / 2,
                                                                borderColor: 'white',
                                                                borderRadius: SmartScreenBase.smPercenWidth * 2,
                                                            }}
                                                            >
                                                                <View style={{
                                                                    borderRightWidth: 1,
                                                                    paddingHorizontal: SmartScreenBase.smPercenWidth * 2
                                                                }}>
                                                                    <Text style={{
                                                                        ...StyleLesson.question_text,
                                                                        fontWeight: 'bold',
                                                                    }}>
                                                                        {this.ListNumber.indexOf(key) + 1}
                                                                    </Text>
                                                                </View>
                                                                <TextInput
                                                                    autoCorrect={false}
                                                                    editable={ !this.state.data.status[this.ListNumber.indexOf(key)] && this.state.enableEdit}
                                                                    style={[stylesApp.txt, {
                                                                        ...StyleLesson.question_text,
                                                                        paddingLeft: SmartScreenBase.smPercenWidth,
                                                                        marginVertical: 0,
                                                                        paddingVertical: 0,
                                                                        width: this._withInput(key),
                                                                        fontFamily: FontBase.MyriadPro_Bold,
                                                                    }]}
                                                                    autoCapitalize='none'
                                                                    // multiline={true}
                                                                    onChangeText={(text) => {
                                                                        this._OnChangeText(text, key);
                                                                    }}
                                                                    onContentSizeChange={(event) => {
                                                                        this._onChangeWidth(event.nativeEvent.contentSize.width, key);
                                                                    }}
                                                                    value={this.state.dataAns.length && this.state.dataAns[this.ListNumber.indexOf(key)] ? this.state.dataAns[this.ListNumber.indexOf(key)] : ''}
                                                                    onFocus={() => this.indexFocus = this.ListNumber.indexOf(key)}
                                                                />
                                                            </View>
                                                        </View>
                                                    ) : (
                                                        <TouchableOpacity
                                                            onLongPress={() => LessonBase.goTranslate(ques)}
                                                        >
                                                            <Text style={{
                                                                ...stylesApp.txt,
                                                                ...StyleLesson.question_text,
                                                                // lineHeight: SmartScreenBase.smPercenHeight * 4
                                                            }}> {ques.replace(/\n/g, '')}</Text>
                                                        </TouchableOpacity>
                                                    )}
                                            </View>
                                            </>
                                        );
                                    })
                                    : null
                            }
                        </View>
                    </KeyboardAwareScrollView>
                </View>
            </View>
        );
    }

    _ShowResuilt() {
        return (
            <View style={{alignItems: 'center', alignSelf: 'center', marginBottom: SmartScreenBase.smPercenHeight*2}}>
                <View style={{
                    height: SmartScreenBase.smBaseWidth * 250,
                    width: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <FileSound showImage={this.state.NumberTrue == this.state.data.answer.length ? "true" : "false"}/>
                </View>
                <Text style={{
                    ...StyleLesson.text_answer
                }}>BẠN ĐÃ TRẢ LỜI ĐÚNG {this.state.NumberTrue}/{this.state.data.answer.length}</Text>
                <View style={{width: SmartScreenBase.smPercenWidth * 100, alignItems: 'center'}}>
                    <View style={{position: 'absolute', top: 0}}>
                        {/* <Image source={{uri: 'student_home_image13'}}
                               style={[StyleLesson.Sty_ImageList, {transform: [{rotate: '180deg'}]}]}
                        /> */}
                    </View>
                    <View style={{height: SmartScreenBase.smPercenHeight * 55}}>
                        <FlatList
                            data={this.state.data.answer}
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
        console.log("=====check 4", item)
        let trimChar = this._trimChar(item[0].toLowerCase().trim());
        return (
            <View style={[StyleLesson.Sty_View_Border, {
                alignItems: 'flex-start',
                marginTop: SmartScreenBase.smBaseWidth * 130,
                borderWidth: SmartScreenBase.smPercenWidth / 2,
                borderColor: !this.state.dataAns[index] ? 'rgba(232,66,90,0.95)' : !this.state.data.status[index] ? 'rgba(232,66,90,0.95)' : 'rgba(198,229,14,0.95)',
            }]}>
                <View style={{flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end'}}>
                    <Text style={{...stylesApp.txt, fontSize: SmartScreenBase.smFontSize * 40}}><Text
                        style={stylesApp.txt_Title}>{index + 1}. </Text>
                        <Text
                            style={{color: !this.state.dataAns[index] ? 'rgba(232,66,90,0.95)' : !this.state.data.status[index] ? 'rgba(232,66,90,0.95)' : 'rgba(198,229,14,0.95)',
                                fontSize: SmartScreenBase.smFontSize * 50,
                                fontWeight: 'bold'
                            }}>
                            {this.ArrAnswer[index]?.toString()}
                        </Text>
                    </Text>
                    { !this.state.dataAns[index] || !this.state.data.status[index] ? (
                        <View style={{
                            flexDirection: 'row',
                            alignItems: 'center',
                            marginLeft: SmartScreenBase.smPercenWidth * 2,
                        }}>
                            <Image source={{uri: 'lesson_grammar_image3'}}
                                   style={[StyleLesson.Image_Explain, {marginBottom: SmartScreenBase.smPercenHeight / 2}]}
                            />
                            <Text style={[stylesApp.txt, {
                                fontWeight: 'bold',
                                color: 'rgba(198,229,14,0.95)',
                                marginLeft: SmartScreenBase.smPercenWidth * 2,
                                // textTransform: 'uppercase',
                                fontSize: SmartScreenBase.smFontSize * 45,
                            }]}>
                                {this.state.data.answer[index][0]}
                            </Text>
                        </View>
                    ) : null}
                </View>
                <View>
                    <Text style={[stylesApp.txt_Title, {padding: SmartScreenBase.smBaseHeight * 5}]}>GIẢI THÍCH :</Text>
                    <Text style={{
                        ...stylesApp.txt,
                        fontSize: SmartScreenBase.smFontSize * 45,
                        fontStyle: 'italic'
                    }}>{this.state.data['explain'][index]}</Text>
                </View>
                <View style={{position: 'absolute', alignSelf: 'center', top: -SmartScreenBase.smBaseWidth * 65}}>
                    <Image
                        source={{uri: !this.state.dataAns[index] ? 'grammar1_3' : !this.state.data.status[index] ? 'grammar1_3' : 'grammar1_4'}}
                        style={StyleLesson.Sty_Image_Small_Answer}
                    />
                </View>
            </View>
        );
    };

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
        this.props.hideTypeExercise();
        this.NumberCheck = 3;
        let num2 = 0;
        console.log("=====check 5")
        for (let index = 0; index < this.dataAnswer.length; index++) {
            if (this.dataAnswer[index].toLowerCase() === this.state.data['answer'][index].toLowerCase()) {
                num2 += 1;
            }
        }
        if (num2 >= this.state.data['answer'].length) {
            this.setState({checkResuilt: true});
        } else {
            this.setState({checkResuilt: false});
        }
        this.setState({btnEx: false});
        this.setState({NumberTrue: num2});
        this.setState({refresh: !this.state.refresh});
    }

    _backAfterTest() {
        if (this.props.modeF === 'review_result') {
            this.props.prevReviewResult();
        } else {
            if (!this.state.btnEx) {
                this.NumberCheck = 1;
                this.state.disableTouch = true;
                this.state.enableEdit = false;
                this.setState({checkResuilt: false});
                this.setState({refresh: !this.state.refresh});
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
                <View style={{flex: 1, alignItems: 'center', alignSelf: 'center'}}>
                    <View>
                        {this.state.checkResuilt == null || this.state.checkResuilt == false && this.NumberCheck < 2 ? this._ShowQuestion() : this._ShowResuilt()}
                    </View>
                    <View style={{alignSelf: 'center'}}>
                        {
                            !this.state.minitest? (
                                    <TouchableOpacity
                                        disabled={this.state.disableBtnCheck}
                                        style={this.state.disableBtnCheck ? StyleApp.Sty_Button_disable : StyleApp.Sty_Button}
                                        onPress={() => {
                                            this._OnPressCheckResuilt();
                                        }}
                                        >
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
                                )
                                : this.state.minitest && this.state.mode === 'testing' ?
                                this._renderBtn()
                                : this.state.minitest && this.state.mode === 'afterTest' ?
                                    this._renderBtnEx()
                                    : this.state.minitest && this.state.mode === 'explain' ?
                                        this._renderBtnExplain()
                                        : null
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
        );
    }
}

function mapStateToProps(state) {
    return {
        data_answer: state.readingD12Reducer,
        data_login: state.AuthStackReducer.dataLogin,
    };
}

export default connect(mapStateToProps)(ReadingF2);
