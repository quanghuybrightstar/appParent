import React, {Component} from 'react';
import {
    ActivityIndicator,
    Alert,
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';
import ModalDropdown from 'react-native-modal-dropdown';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import TypeExercise from '../Component/TypeExercise';
import StyleLesson from '../StyleLesson';
import stylesApp from '../../../styleApp/stylesApp';
import EventBus from 'react-native-event-bus';
import FileSound from '../FileSound';
import {connect} from 'react-redux';
import API from '../../../../API/APIConstant';
import axios from 'axios';
import {ActionGrammarD1} from '../../../../redux/actions/ActionGrammarD1';
import {ActionGrammarD2} from '../../../../redux/actions/ActionGrammarD2';
import {ActionGrammarD14} from '../../../../redux/actions/ActionGrammarD14';
import ModalChooseAnswer from "../Component/ModalChooseAnswer";
import font from '../../../../base/FontBase';
import stringUtis from '../../../../utils/stringUtils';
import LessonBase from '../../../../base/LessonBase';

let DataObject1 = new Object();
let dataNew = [];
let dataAns = [];
let dataObject = [];
let fakedata = ['0', '2', '0', '1', '1'];
let a = [];

class GrammarD14 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkResuilt: null,
            refresh: false,
            checkDisableDropdown: false,
            ShowCheck: false,
            NumberCorrect: 0,
            data: [
                {
                    question:
                        '',
                    answer: '',
                    explain: '',
                    optioni: [],
                },
            ],
            ArrAnswer: ['is', 'are', 'am'],
            isloading: false,
            showWeb: false,
            String: '',
            checkType: '',
            dicription: false,
            dataFirt: {},
            showScript: false,
            number: 0,
            title_ENG: '',
            title_VI: '',
            titlePress: false,
            logid: '',
            arrayPost: [],
            data_lesson: {},
            showModalChooseAnswer: -1,
        };
        this.AnswerChoose = [];
        this.History = []
        this.CheckTimes = 0;
    }

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
    _Submit = async () => {
        this.props.hideTypeExercise();
        // let arrr = [];
        // //console.log('this.state.arrayPost', this.state.arrayPost);
        // for (let i = 0; i < this.state.data.length; i++) {
        //     let ob = new Object();
        //     (ob.question_id = this.state.data[i].id),
        //         (ob.exercise_type = 'grammar'),
        //         (ob.question_type = parseInt(this.state.data[i].type));
        //     ob.final_user_choice = this._FunctionToReplaceQuestion(this.state.data[i].optioni[this.AnswerChoose[i]]);
        //     let a = [];
        //     for (let j = 0; j < this.state.arrayPost.length; j++) {
        //         let obj = new Object();
        //         //console.log('ahihi',this._FunctionToReplaceQuestion(this.state.arrayPost[j].ans[i].toLowerCase()));
        //         obj.num_turn = j;
        //         obj.score =
        //             this._FunctionToReplaceQuestion(this.state.arrayPost[j].ans[i]) === this._FunctionToReplaceQuestion(this.state.data[i].answer.join().toLowerCase())
        //                 ? 1
        //                 : 0;
        //         obj.user_choice = this._FunctionToReplaceQuestion(this.state.arrayPost[j].ans[i]) === '' ? '' : this._FunctionToReplaceQuestion(this.state.arrayPost[j].ans[i]);
        //         a.push(obj);
        //     }
        //     ob.detail_user_turn = a;
        //     arrr.push(ob);
        // }
        // this.props.saveLogLearning(arrr);
        var ans = this.state.data.map((q,i)=>{
            return {
                question_id: q.id,
                exercise_type:'grammar',
                question_type:q.type,
                detail_user_turn: this.History.map((h,ii)=>{
                    return {
                        num_turn:ii+1,
                        score: h[i].status?1:0,
                        user_choice: h[i].optioni[h[i].chosen]
                    }
                })
            }
        })
        //console.log('ans',ans)
        this.props.saveLogLearning(ans);
    };

    _SubmitTeting = async () => {
        let arrr = [];
        this.props.dispatch(ActionGrammarD14(this.AnswerChoose));
        //console.log('this.state.arrayPost', this.state.arrayPost);
        for (let i = 0; i < this.state.data.length; i++) {
            let ob = new Object();
            (ob.question_id = this.state.data[i].id),
                (ob.exercise_type = 'grammar'),
                (ob.question_type = parseInt(this.state.data[i].type));
            ob.final_user_choice = this._FunctionToReplaceQuestion(this.state.data[i].optioni[this.AnswerChoose[i]]);
            let a = [];
            for (let j = 0; j < this.state.arrayPost.length; j++) {
                let obj = new Object();
                //console.log('ahihi',this._FunctionToReplaceQuestion(this.state.arrayPost[j].ans[i].toLowerCase()));
                obj.num_turn = j;
                obj.score =
                    this._FunctionToReplaceQuestion(this.state.arrayPost[j].ans[i]) === this._FunctionToReplaceQuestion(this.state.data[i].answer.join().toLowerCase())
                        ? 1
                        : 0;
                obj.user_choice = this._FunctionToReplaceQuestion(this.state.arrayPost[j].ans[i]) === '' ? '' : this._FunctionToReplaceQuestion(this.state.arrayPost[j].ans[i]);
                a.push(obj);
            }
            ob.detail_user_turn = a;
            arrr.push(ob);
        }
        if (this.state.checkType === 'Testing') {
            this.props.setDataAnswer(arrr);
        }
    };

    componentWillMount(): void {
        this.setState({checkType: this.props.checkType});
        this.setState({isloading: true});
        dataObject = [];
        dataNew = [];
        dataAns = [];
        var ListText = [];
        let response = {};
        response['data'] = this.props.dataContent;
        this.setState({dataFirt: response.data});
        // console.log('ahihi', response);
        //console.log(response);
        // this._postDataFirt(response.data);
        this.setState({data_lesson: response});
        try{
        for (var j = 0; j < response.data.data_question.length; j++) {
            for (
                let i = 0;
                i < response.data.data_question[j].list_option.length;
                i += 1
            ) {
                dataAns = [];
                DataObject1 = new Object();
                var text =
                    '}' +
                    response.data.data_question[j].list_option[i].question_content;
                ListText = text.split('{')[0].split('}')[1];
                var aray = response.data.data_question[j].list_option[
                    i
                    ].group_content.split(' ');
                for (let j = 1; j < text.split('{').length; j++) {
                    ListText = ListText + '_____' + text.split('{')[j].split('}')[1];
                    dataAns.push(text.split('{')[j].split('}')[0]);
                }
                let arri = response.data.data_question[j].list_option[i].jamming_answer.split(',');
                arri.push(response.data.data_question[j].list_option[i].match_option_text[0]);
                DataObject1.question = ListText;
                this.AnswerChoose.push(null);
                DataObject1.id = response.data.data_question[j].question_id;
                DataObject1.type = response.data.data_question[j].list_option[0].question_type;
                DataObject1.answer = dataAns;
                DataObject1.optioni = stringUtis.shuffleArray(arri);
                DataObject1.explain =
                    response.data.data_question[j].list_option[i].explain_parse.content_question_text;
                dataObject.push(DataObject1);
                var ListAns = aray[aray.length - 1].split('.')[0].split('/');
                this.setState({
                    title_ENG:
                    response.data.data_question[j].list_option[i].group_content,
                });
                this.setState({
                    title_VI:
                    response.data.data_question[j].list_option[i].group_content_vi,
                });
            }
        }
    }catch(er){console.log("=====loi",er); Alert.alert("Bài tập này đang bị lỗi dữ liệu, vui lòng chọn bài khác")}
        if (this.props.checkType === 'afterTest') {
            let check = 0;
            //console.log('ArrAnswer', this.props.data_answer.data_answer);
            this.AnswerChoose = this.props.data_answer.data_answer;
            for (let index = 0; index < dataObject.length; index++) {
                if (
                    dataObject[index].optioni[this.props.data_answer.data_answer[index]] ==
                    dataObject[index].answer
                ) {
                    check += 1;
                }
            }
            this.setState({NumberCorrect: check});
            this.setState({
                checkResuilt: true,
            });
        }
        // console.log('data', dataObject);
        //console.log('ArrAnswer', this.AnswerChoose);
        this.setState({data: dataObject});
        this.setState({ArrAnswer: ListAns});
        this.setState({isloading: false});
    }

    componentDidMount(){
        this.props.saveLogLearning([]);
    }

    _onPressDicription = () => {
        this.setState({dicription: !this.state.dicription});
    };

    _OnPressCheckResuilt() {
        if (this.state.checkType === 'exam') {
            let check = 0;
            if (this.state.checkResuilt == null) {
                this.props.hideTypeExercise();
                this.state.data.forEach((e,i)=>{
                    e.chosen = this.AnswerChoose[i];
                    if(this.AnswerChoose[i] != null && e.optioni[this.AnswerChoose[i]] == e.answer[0] ){
                        check++;
                        e.status = true;
                    }
                })

                this.History.push(JSON.parse(JSON.stringify(this.state.data)))

                if (check == this.state.data.length) {
                    this.props.showFeedback();
                    this.setState({
                        checkResuilt: true,
                        NumberCorrect:check,
                    });
                } else {
                    this.CheckTimes += 1;
                    this.setState({
                        checkResuilt: false,
                        NumberCorrect:check,
                    });
                }
                if (this.CheckTimes >= 2) {
                    this.props.showFeedback();
                }

                

                let arrr = [];
                for (let i = 0; i < this.AnswerChoose.length; i++) {
                    arrr.push(this.state.data[i].optioni[this.AnswerChoose[i]]);
                }
                let ob = new Object();
                ob.ans = arrr;
                a.push(ob);
                this.setState({arrayPost: a});
            } else if (this.state.checkResuilt == false) {
                if (this.CheckTimes < 2) {
                    this.props.showTypeExercise();
                    this.state.data.forEach((e,i)=>{
                        if(!e.status){
                            this.AnswerChoose[i] = null;
                        }
                    })
                    
                    this.setState({
                        checkResuilt: null,
                        ShowCheck: false,
                    });
                } else {
                    this._Submit();
                }
            } else {
                this._Submit();
            }
            this.setState({number: this.CheckTimes});
        } else if (this.state.checkType === 'Testing') {
            this._SubmitTeting();
        } else {
            this.props.nextReviewResult();
        }
    }

    _OnShowScript() {
        this.setState({showScript: !this.state.showScript});
    }

    render() {
        return (
            <View
                style={{
                    alignSelf: 'center',
                    alignItems: 'center',
                }}>
                {this.state.showScript === true ? (
                    <View
                        style={{
                            width: SmartScreenBase.smBaseWidth * 1080,
                            height: SmartScreenBase.smBaseHeight * 1080,
                            backgroundColor: '#00000030',
                            position: 'absolute',
                            zIndex: 100,
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
                            <View style={{width: '100%', height: '80%'}}>
                                <Text style={{marginTop: 20, marginLeft: 20}}>
                                    {this.state.dataFirt.lesson.lesson_text_audio}
                                </Text>
                            </View>
                            <View
                                style={{
                                    width: '100%',
                                    height: '20%',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this._OnShowScript();
                                    }}
                                    style={[
                                        stylesApp.Sty_Button,
                                        {
                                            width: SmartScreenBase.smPercenWidth * 40,
                                            marginRight: SmartScreenBase.smPercenWidth * 5,
                                        },
                                    ]}>
                                    <Text style={stylesApp.Sty_Text_Button}>Đóng</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ) : null}
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
                {this.state.checkResuilt == null
                    ? this._ShowQuestion()
                    : this._ShowResuiltCorrect()}

                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        height: SmartScreenBase.smPercenHeight * 8,
                        marginTop: 10,
                    }}>
                    {this.state.checkType === 'afterTest' ? (
                            <View style={{flexDirection: 'row'}}>
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
                                    <Text style={stylesApp.Sty_Text_Button}>BACK</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        this._onPressDicription();
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
                                        this._OnPressCheckResuilt();
                                    }}
                                    style={[
                                        stylesApp.Sty_Button,
                                        {width: SmartScreenBase.smPercenWidth * 10},
                                    ]}>
                                    <Text style={stylesApp.Sty_Text_Button}>TIẾP TỤC</Text>
                                </TouchableOpacity>
                            </View>
                        ) :
                        <View>
                            {this.state.checkType === 'Testing' ? (
                                this.state.ShowCheck == true ?
                                    <TouchableOpacity
                                        onPress={() => {
                                            this._OnPressCheckResuilt();
                                        }}
                                        style={[
                                            stylesApp.Sty_Button,
                                        ]}>
                                        <Text style={stylesApp.Sty_Text_Button}>TIẾP TỤC</Text>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity
                                        style={[
                                            stylesApp.Sty_Button_disable,
                                        ]}>
                                        <Text style={stylesApp.Sty_Text_Button}>TIẾP TỤC</Text>
                                    </TouchableOpacity>
                            ) : this.state.checkResuilt == null ? (
                                this.state.ShowCheck == true ?
                                    <TouchableOpacity
                                        onPress={() => {
                                            this._OnPressCheckResuilt();
                                        }}
                                        style={[
                                            stylesApp.Sty_Button,
                                        ]}>
                                        <Text style={stylesApp.Sty_Text_Button}>KIỂM TRA</Text>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity
                                        style={[
                                            stylesApp.Sty_Button_disable,
                                        ]}>
                                        <Text style={stylesApp.Sty_Text_Button}>KIỂM TRA</Text>
                                    </TouchableOpacity>
                            ) : this.state.checkResuilt == false && this.state.number < 2 ? (
                                <TouchableOpacity
                                    onPress={() => {
                                        this._OnPressCheckResuilt();
                                    }}
                                    style={[
                                        stylesApp.Sty_Button,
                                    ]}>
                                    <Text style={stylesApp.Sty_Text_Button}>LÀM LẠI</Text>
                                </TouchableOpacity>
                            ) : (
                                <View style={{flexDirection: 'row'}}>
                                    <TouchableOpacity
                                        onPress={() => {
                                            this._OnPressCheckResuilt();
                                        }}
                                        style={[
                                            stylesApp.Sty_Button,
                                        ]}>
                                        <Text style={stylesApp.Sty_Text_Button}>TIẾP TỤC</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                            }
                        </View>
                    }
                </View>
                {this.state.showModalChooseAnswer >= 0 &&
                <ModalChooseAnswer data={this.state.data[this.state.showModalChooseAnswer].optioni}
                                   _cancelChooseAnswer={this._cancelChooseAnswer}
                                   _onSelect={this._onSelect} 
                                   indexChooseAnswer={this.state.showModalChooseAnswer}/>}
            </View>
        );
    }

    _onSelect = (index, IDItem) => {
        //console.log(this.state)
        //console.log(this.AnswerChoose)
        //console.log(this.AnswerChoose);
        this.setState({showModalChooseAnswer: -1});
        this.AnswerChoose[IDItem] = index;
        let c = 0;
        this.AnswerChoose.forEach((item) => {
            c += item !== null ? 1 : 0;
        });
        if (c === this.state.data.length) {
            this.setState({ShowCheck: true});
        }
    };

    _Onpress = () => {
        this.setState({titlePress: !this.state.titlePress});
    };

    _ShowQuestion() {
        return (
            <View
                style={{
                    height: SmartScreenBase.smPercenHeight * 55,
                    ...StyleLesson.question_content,
                }}>
                <FlatList
                    data={this.state.data}
                    extraData={this.state.refresh}
                    keyExtractor={(item, index) => 'item' + index}
                    renderItem={this._Render_Item}
                />
            </View>
        );
    }

    Removedauphai = (listSou) => {

        var ArrQuestionCu = [];
        listSou.split(' ').forEach(element => {
            var sttOTrong = element.search('_____');
            var slDau = 0
            if(sttOTrong >= 0){
                if(sttOTrong >0){
                    slDau = element.length - 5
                    ArrQuestionCu.push(element.substring(0,slDau))
                }
                ArrQuestionCu.push('_____')
                if(element.length > slDau+5){
                    ArrQuestionCu.push(element.substring(slDau+5,element.length))
                }
            }else{
                ArrQuestionCu.push(element)
            }
        });

        return ArrQuestionCu
    }

    _Render_Item = ({item, index}) => {
        console.log("=====_Render_Item",item)
        var ArrQuestion = this.Removedauphai(item.question);
        let IDItem = index;
        return (
            <View
                style={[
                    StyleLesson.Sty_View_Border,
                    {
                        alignItems: 'flex-start',
                        paddingVertical: SmartScreenBase.smPercenHeight * 2,
                        marginTop: SmartScreenBase.smPercenHeight * 2,
                    },
                ]}>
                <View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center'}}>
                    <Text style={[StyleLesson.question_text, {fontWeight: 'bold'}]}>
                        {index + 1}.{' '}
                    </Text>
                    {ArrQuestion.map((word, key) => {
                        if (word.search('_____') >= 0) {
                            return (
                                <TouchableWithoutFeedback
                                    style={{marginLeft:SmartScreenBase.smPercenWidth}}
                                    key={key}
                                    disabled={item.status}
                                     onPress={() => {
                                        this.setState({showModalChooseAnswer: index})
                                    }}>
                                        <View
                                            style={{
                                                alignItems: 'center',
                                                marginLeft: (SmartScreenBase.smPercenWidth * 2) / 5,
                                                marginVertical: SmartScreenBase.smPercenHeight/2,
                                                backgroundColor: 'rgba(249,232,21,0.95)',
                                                flexDirection: 'row',
                                                paddingHorizontal: SmartScreenBase.smPercenWidth * 2,
                                                borderRadius: SmartScreenBase.smPercenWidth * 2,
                                                minWidth: SmartScreenBase.smPercenWidth * 25,
                                            }}>
                                            <Image source={{uri: 'muitenxuongluyenthi'}}
                                                   style={{
                                                       width: SmartScreenBase.smPercenWidth * 3,
                                                       height: SmartScreenBase.smPercenWidth * 3,
                                                       resizeMode: 'contain',
                                                       tintColor: '#000',
                                                       marginRight: SmartScreenBase.smPercenWidth * 2,
                                                   }}/>
                                            <Text>|</Text>
                                            <Text
                                                style={{fontFamily: font.MyriadPro_Bold,
                                                fontSize:SmartScreenBase.smFontSize*45,
                                                marginTop:SmartScreenBase.smPercenHeight/2}}>{`  ${this.state.data[index].optioni[this.AnswerChoose[index]] || ''}`}</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                            );
                        } else {
                            return (
                                <TouchableOpacity key={key}
                                    onLongPress={() => LessonBase.goTranslate(word)}>
                                    <Text style={StyleLesson.question_text}> {word} </Text>
                                </TouchableOpacity>
                            );
                        }
                    })}
                </View>
            </View>
        );
    };

    _ShowResuiltCorrect() {

        const isIcon = this.state.checkResuilt || this.state.number>=2
        return (
            <View
                style={{
                    ...StyleLesson.question_content,
                    alignItems: 'center',
                }}>
                {
                    <View style={{
                        height: SmartScreenBase.smPercenHeight * (isIcon?12:1),
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <FileSound
                            showIcon={isIcon?null:'none'}
                            showImage={this.state.checkResuilt ? 'true' : 'false'}/>
                    </View>
                }
                <View
                    style={{
                        alignSelf: 'center',
                        alignItems: 'center',
                        marginVertical: SmartScreenBase.smPercenHeight * 0.5,
                    }}>
                    <Text style={StyleLesson.text_answer}>
                        BẠN ĐÃ TRẢ LỜI ĐÚNG {this.state.NumberCorrect}/
                        {this.state.data.length}
                    </Text>
                </View>
                <View style={[StyleLesson.Sty_Width_Screen, {flexDirection: 'column'}]}>
                    <View
                        style={{height: isIcon ? SmartScreenBase.smPercenHeight * 50 : SmartScreenBase.smPercenHeight * 60}}>
                        <FlatList
                            data={this.state.data}
                            keyExtractor={(item, index) => 'item' + index}
                            renderItem={this.RenderItemCorrect}
                        />
                    </View>
                </View>
            </View>
        );
    }

    _cancelChooseAnswer = () => {
        this.setState({showModalChooseAnswer: -1})
    };
    RenderItemCorrect = ({item, index}) => {
        console.log("=====SSitem",item)
        let ArrQuestion = this.Removedauphai(item.question);
        return (
            <View
                style={[
                    StyleLesson.Sty_View_Border,
                    {
                        alignItems: 'flex-start',
                        marginTop: SmartScreenBase.smBaseWidth * 130,
                        paddingVertical: SmartScreenBase.smBaseWidth * 75,
                        borderWidth:2,
                        borderColor:item.status?'#c6e50e':'#e8425a'
                    },
                ]}>
                {
                    (this.state.number < 2 && !this.state.checkResuilt ) ?
                        <View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center'}}>
                            <Text style={[StyleLesson.question_text, {fontWeight: 'bold'}]}>
                                {index + 1}.{' '}
                            </Text>
                            {ArrQuestion.map((word, key) => {
                                if (word == '_____') {
                                    return (
                                        <View key={key}
                                            style={{
                                                alignItems: 'center',
                                                backgroundColor:item.status?'#c6e50e':'#e8425a',
                                                paddingHorizontal:SmartScreenBase.smPercenWidth*3,
                                                borderRadius:SmartScreenBase.smPercenWidth,
                                                marginRight:SmartScreenBase.smPercenWidth
                                            }}>
                                            <Text
                                                style={{
                                                    fontWeight: '500',
                                                    ...StyleLesson.answer_text,
                                                }}>
                                                {this.state.data[index].optioni[this.AnswerChoose[index]]}{' '}
                                            </Text>
                                        </View>
                                    );
                                } else {
                                    return (
                                        <Text key={key} style={StyleLesson.question_text}>
                                            {word}{' '}
                                        </Text>
                                    );
                                }
                            })}
                        </View>
                        :
                        <View>
                            <View style={{flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center'}}>
                                <Text style={[StyleLesson.question_text, {fontWeight: 'bold'}]}>
                                    {index + 1}.{' '}
                                </Text>
                                {ArrQuestion.map((word, key) => {
                                    if (word == '_____') {
                                        if(item.status)
                                            return (
                                                <View key={key}
                                                    style={{
                                                        alignItems: 'center',
                                                        backgroundColor:item.status?'#c6e50e':'#e8425a',
                                                        paddingHorizontal:SmartScreenBase.smPercenWidth*2,
                                                        borderRadius:SmartScreenBase.smPercenWidth,
                                                        marginRight:SmartScreenBase.smPercenWidth
                                                    }}>
                                                    <Text
                                                        style={{
                                                            fontWeight: '500',
                                                            ...StyleLesson.answer_text,
                                                        }}>
                                                        {this.state.data[index].optioni[this.AnswerChoose[index]]}{' '}
                                                    </Text>
                                                </View>
                                            );
                                        return <>
                                        <View 
                                            style={{
                                                alignItems: 'center',
                                                backgroundColor:'#e8425a',
                                                paddingHorizontal:SmartScreenBase.smPercenWidth*2,
                                                borderRadius:SmartScreenBase.smPercenWidth,
                                                marginRight:SmartScreenBase.smPercenWidth
                                            }}>
                                            <Text
                                                style={{
                                                    fontWeight: '500',
                                                    ...StyleLesson.answer_text,
                                                }}>
                                                {this.state.data[index].optioni[this.AnswerChoose[index]]}
                                            </Text>
                                        </View>
                                        <Image
                                            source={{uri: 'lesson_grammar_image3'}}
                                            style={{
                                                ...StyleLesson.Image_Explain,
                                                marginHorizontal: SmartScreenBase.smPercenWidth * 2
                                            }}
                                        />
                                        <View 
                                            style={{
                                                alignItems: 'center',
                                                backgroundColor:'#c6e50e',
                                                paddingHorizontal:SmartScreenBase.smPercenWidth*2,
                                                borderRadius:SmartScreenBase.smPercenWidth,
                                                marginRight:SmartScreenBase.smPercenWidth
                                            }}>
                                            <Text
                                                style={{
                                                    fontWeight: '500',
                                                    ...StyleLesson.answer_text,
                                                }}>
                                                {this.state.data[index].answer}
                                            </Text>
                                        </View>
                                        </>
                                    } else {
                                        return (
                                            <Text key={key} style={StyleLesson.question_text}>
                                                {word}{' '}
                                            </Text>
                                        );
                                    }
                                })}
                            </View>
                            <Text
                                style={{fontWeight: 'bold',
                                fontSize:SmartScreenBase.smFontSize*50,
                                marginTop: SmartScreenBase.smPercenHeight,
                                }}>
                                GIẢI THÍCH
                            </Text>
                            <Text style={{fontStyle: 'italic', ...StyleLesson.explain_text}}>
                                {item.explain}
                            </Text>
                        </View>
                }

                <View
                    style={{
                        position: 'absolute',
                        alignSelf: 'center',
                        top: -SmartScreenBase.smBaseWidth * 65,
                    }}>
                    <Image
                        source={{
                            uri:item.status
                                    ? 'grammar1_4'
                                    : 'grammar1_3',
                        }}
                        style={StyleLesson.Image_reuilt}
                    />
                </View>
            </View>
        );
    };

    _ColorAnswer(index) {
        if (this.state.checkResuilt == null) {
            return 'rgba(249,232,21,0.95)';
        } else {
            if (
                this.state.data[index].optioni[this.AnswerChoose[index]] ==
                this.state.data[index].answer
            ) {
                return '#c6e50e';
            } else {
                return '#e8425a';
            }
        }
    }
}

function mapStateToProps(state) {
    return {
        data_answer: state.GrammarD14Reducer,
        data_login: state.AuthStackReducer.dataLogin,
    };
}

export default connect(mapStateToProps)(GrammarD14);
