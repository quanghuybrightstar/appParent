import React, {Component} from 'react';
import {
    ActivityIndicator,
    Alert,
    Animated,
    Dimensions,
    FlatList,
    Image,
    Keyboard,
    LayoutAnimation,
    NativeModules,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Platform,
} from 'react-native';
import FileSound from '../FileSound';
import TypeExercise from '../Component/TypeExercise';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import ButtonCheck from '../../../items/ButtonCheck';
import stylesApp from '../../../styleApp/stylesApp';
import StyleLesson from '../StyleLesson';
import axios from 'axios';
import EventBus from 'react-native-event-bus';
import {connect} from 'react-redux';
import API from '../../../../API/APIConstant';
import {ActionGrammarD2} from '../../../../redux/actions/ActionGrammarD2';
import stringUtils from '../../../../utils/stringUtils';
import LessonBase from '../../../../base/LessonBase';

const {UIManager} = NativeModules;
let DataObject1 = {};
let DataObject2 = {};
let ans = [];

let dataNew = [];
let a = [];
let fakeAns = [true, true, true];
//const {width, height} = Dimensions.get('window');
UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true);

class GrammarD1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refresh: false,
            heightInput: 0,
            chooseItem: -1,
            text: '',
            checkResuilt: null,
            data: [],
            numberTrue: 0,
            numberAgain: 0,
            showWeb: false,
            dataFirt: {},
            String: '',
            checkType: '',
            title_ENG: '',
            title_VI: '',
            titlePress: false,
            arrayPost: [],
            isloading: false,
            valueY: new Animated.Value(0),
            logid: '',
            data_lesson: {},
            begin: [],
            history:[],
            showExplain:false
        };
        this.CheckShowCheck = false;
        this.LayoutInput = null;
        this.ListTextExplant = [];
        this.ListAnswer = [];
    }

    _FunctionToReplaceQuestion = (Text) => {
        // if (Text !== '' && Text !== null && Text !== undefined) {
        //     Text = Text.toLowerCase();
        //     let ApplyText = Text.trim();
        //     while (ApplyText.substr(ApplyText.length - 1) === '.' || ApplyText.substr(ApplyText.length - 1) === ',') {
        //         ApplyText = ApplyText.substring(0, ApplyText.length - 1);
        //         ApplyText = ApplyText.trim();
        //     }
        //     let findReplaceQuestionStatus = ApplyText.indexOf('‘');
        //     let findReplaceQuestionStatus1 = ApplyText.indexOf('\'');
        //     //console.log(findReplaceQuestionStatus);
        //     if (findReplaceQuestionStatus !== -1 || findReplaceQuestionStatus1 !== -1) {
        //         ApplyText = ApplyText.toLowerCase().replace('‘', '’').replace('\'', '’');
        //     }
        //     //console.log(ApplyText);
        //     return (ApplyText);
        // } else {
        //     return ('');
        // }
        return stringUtils.validWord(Text);
    };

    componentDidMount(){
        this.props.saveLogLearning([]);
    }

    componentWillMount() {
        this.setState({isloading: true});
        Keyboard.addListener('keyboardDidShow', (e) => this._showKeyBoad(e));
        Keyboard.addListener('keyboardDidHide', () => this._HideKeyBoad());
        dataNew = [];
        let ar = [];
        let arbegin = [];
        this.setState({checkType: this.props.checkType});
        let response = {};
        response['data'] = this.props.dataContent;
        this.setState({data_lesson: response});
        // this._postDataFirt(response.data);
        this.setState({dataFirt: response.data});
        try{
        for (let i = 0; i < response.data.data_question.length; i += 1) {
            DataObject1 = {};
            DataObject1.question_id = response.data.data_question[i].question_id;
            ans = [];
            for (
                let j = 0;
                j < response.data.data_question[i].list_option.length;
                j += 1
            ) {
                this.setState({
                    title_ENG:
                    response.data.data_question[i].list_option[j].group_content,
                });
                this.setState({
                    title_VI:
                    response.data.data_question[i].list_option[j].group_content_vi,
                });
                DataObject2 = {};
                arbegin.push(null);
                ar.push(null);
                let explain = response.data.data_question[i].list_option[j].explain_parse;
                // explain = JSON.parse(explain);
                if (
                    response.data.data_question[i].list_option[j].match_option_text ==
                    response.data.data_question[i].list_option[j].option_text
                ) {
                    DataObject1.answer = true;
                    DataObject1.explain = '';
                } else if (
                    response.data.data_question[i].list_option[j].match_option_text !=
                    response.data.data_question[i].list_option[j].option_text
                ) {
                    DataObject1.answer = false;
                    DataObject1.explain = explain ? explain.content_question_text : '';
                }
                DataObject1.explain1 = explain ? explain.content_question_text : '';
                DataObject1.question = response.data.data_question[i].list_option[j].option_text;

                DataObject1.answers = response.data.data_question[i].list_option[j].match_option_text
                if(!!response.data.data_question[i].list_option[j].list_option_same){
                        var samps = JSON.parse(response.data.data_question[i].list_option[j].list_option_same)
                        DataObject1.answers.push(...samps);
                }
            }

            DataObject1.TextAnswer = '';
            dataNew.push(DataObject1);
            this.setState({data: dataNew, begin: arbegin});
            this.ListAnswer = ar;
            if (this.props.checkType == 'afterTest') {
                let NumberTrue = 0;
                this.ListAnswer = fakeAns;
                this.setState({data: dataNew});
                for (let i = 0; i < this.state.data.length; i++) {
                    if (dataNew[i].answer == this.ListAnswer[i]) {
                        if (this._FunctionToReplaceQuestion(dataNew[i].TextAnswer.toLowerCase()) == this._FunctionToReplaceQuestion(dataNew[i].explain.toLowerCase())) {
                            NumberTrue++;
                        }
                    }
                }
                if (NumberTrue == dataNew.length) {
                    this.setState({
                        checkResuilt: true,
                        numberTrue: NumberTrue,
                    });
                } else {
                    this.setState({
                        numberAgain: 2,
                        checkResuilt: false,
                        numberTrue: NumberTrue,
                    });
                }
            }
        }
    }catch(er){console.log("=====loi",er); Alert.alert("Bài tập này đang bị lỗi dữ liệu, vui lòng chọn bài khác")}
    this.checkout(this.state.data);
        //console.log(dataNew);
        this.setState({isloading: false});
    }

    _showKeyBoad = (e) => {
        this.props.handleKeyboardShow(-(e.endCoordinates.height - SmartScreenBase.smPercenHeight * 15));
    };

    _HideKeyBoad = () => {
        this.props.handleKeyboardHide();
    };

    _enableButton=()=>{
        const isAllChosen = this.ListAnswer.filter(c=>c == null).length == 0
        if(!isAllChosen){
            this.CheckShowCheck = false;
            this.forceUpdate();
            return;
        }
        this.CheckShowCheck = !this.state.data.find(c=>
                c.chosen == null ||
                (c.chosen == 0 && !c.TextAnswer)
            )
        this.forceUpdate();
    }

    _Submit = async () => {
        var dataAns = this.state.data.map((q,i)=>{
            return {
                exercise_type:'grammar',
                question_type:2,
                question_id: q.question_id,
                final_user_choice:q.TextAnswer,
                detail_user_turn: this.state.history.map((h,ii)=>{
                    return {
                        num_turn: i+1,
                        score: h[i].status?1:0,
                        user_choice:h[i].TextAnswer,
                    }
                })
            }
        })
        this.props.saveLogLearning(dataAns);
    };

    _Onpress = () => {
        this.setState({titlePress: !this.state.titlePress});
    };

    checkout() {
        for (let index = 0; index < this.state.data.length; index++) {
            this.ListAnswer.push(null);
            this > this.ListTextExplant.push(this.state.text);
        }
    }

    render() {
        //console.log(this.state)

        if (this.state.checkResuilt == null) {
            return (
                <Animated.View
                    onStartShouldSetResponder={() => Keyboard.dismiss()}
                    style={{
                        height: SmartScreenBase.smPercenHeight * 87,
                        alignSelf: 'center',
                        alignItems: 'center',
                        bottom: this.state.valueY,
                    }}>
                    <View
                        style={{
                            height: SmartScreenBase.smPercenHeight * 58,
                            borderRadius: SmartScreenBase.smPercenWidth * 3,
                        }}>
                        <FlatList
                            data={this.state.data}
                            extraData={this.state.refresh}
                            keyExtractor={(item, index) => 'item' + index}
                            renderItem={this._Render_Item}
                            contentContainerStyle={{
                                alignItems: 'center',
                                borderRadius: SmartScreenBase.smPercenWidth * 3,
                            }}
                        />
                    </View>
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
                    <View
                        style={{
                            marginTop: SmartScreenBase.smPercenHeight * 5,
                        }}>
                        {this.state.checkType === 'afterTest' ? (
                            <View style={{flexDirection: 'row'}}>
                                <TouchableOpacity
                                    onPress={() => {
                                        this._CheckResuilt();
                                    }}
                                    style={[
                                        stylesApp.Sty_Button,
                                        {
                                            width: SmartScreenBase.smPercenWidth * 10,
                                            marginRight: SmartScreenBase.smPercenWidth * 5,
                                        },
                                    ]}>
                                    <Text style={stylesApp.Sty_Text_Button}>Back</Text>
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
                                        this._CheckResuilt();
                                    }}
                                    style={[
                                        stylesApp.Sty_Button,
                                        {width: SmartScreenBase.smPercenWidth * 10},
                                    ]}>
                                    <Text style={stylesApp.Sty_Text_Button}>TIẾP TỤC</Text>
                                </TouchableOpacity>
                            </View>
                        ) : this.state.checkType == 'exam' ? (
                            <TouchableOpacity
                                disabled={!this.CheckShowCheck}
                                onPress={() => {
                                    this.checkResuilt();
                                }}
                                style={this.CheckShowCheck?stylesApp.Sty_Button:stylesApp.Sty_Button_disable}>
                                <Text style={stylesApp.Sty_Text_Button}>{
                                    this.state.checkResuilt == null
                                        ? 'KIỂM TRA'
                                        : this.state.checkResuilt == false &&
                                        this.state.numberAgain < 2
                                        ? 'LÀM LẠI'
                                        : 'TIẾP TỤC'}</Text>
                            </TouchableOpacity>
                        ) : this.state.checkType == 'Testing' ? (
                            <TouchableOpacity
                                disabled={!this.CheckShowCheck}
                                style={this.CheckShowCheck?stylesApp.Sty_Button:stylesApp.Sty_Button_disable}
                                onPress={() => {
                                    this.checkResuilt();
                                }}
                                >
                                <Text style={stylesApp.Sty_Text_Button}>TIẾP TỤC</Text>
                            </TouchableOpacity>
                        ) : null}
                    </View>
                </Animated.View>
            );
        } else {
            if(this.state.showExplain)
                return this._ShowLastResuilt();
            return this._ShowResuilt();
        }
    }
    
    _Render_Item = ({item, index}) => {
        let arr = item.question.split(' ');
        return (
            <View
                style={[
                    StyleLesson.Sty_View_Border,
                    {padding: 0, alignItems: 'flex-start', marginTop: SmartScreenBase.smPercenHeight * 2},
                ]}>
                <View style={{width: '100%'}}>
                    <View
                        style={{
                            alignItems: 'flex-start',
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            zIndex: 0,
                            width: SmartScreenBase.smPercenWidth * 90,
                            padding: SmartScreenBase.smPercenHeight,
                            alignSelf: 'center',
                        }}>
                        <Text style={{...StyleLesson.question_text, fontWeight: 'bold'}}>{index + 1}. </Text>
                        {arr.map((e, index) => {
                            return (
                                <TouchableOpacity
                                    key={index}
                                    onLongPress={() => LessonBase.goTranslate(e)}
                                    style={[StyleLesson.question_text, {zIndex: 0}]}>
                                    <Text style={StyleLesson.question_text}>{e} </Text>
                                </TouchableOpacity>
                            );
                        })}
                    </View>
                    <View style={{flexDirection: 'row', width: '100%'}}>
                        <TouchableOpacity
                            disabled={item.status}
                            onPress={() => {
                                this._OnPressChooseResuilt(index, 1);
                            }}>
                            <View
                                style={{
                                    width: SmartScreenBase.smPercenWidth * 45,
                                    borderRightWidth: 1,
                                    backgroundColor:this.ListAnswer[index] == true? '#F9E815': 'rgba(206,206,206,1)',
                                    borderBottomLeftRadius:
                                        this.ListAnswer[index] == false? 0: SmartScreenBase.smPercenWidth * 3,
                                }}>
                                <Text
                                    style={[
                                        StyleLesson.question_text,
                                        {
                                            margin: SmartScreenBase.smPercenHeight,
                                            alignSelf: 'center',
                                            fontWeight: 'bold',
                                        },
                                    ]}>
                                    TRUE
                                </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            disabled={item.status}
                            onPress={() => {
                                this._OnPressChooseResuilt(index, 0);
                            }}>
                            <View
                                style={{
                                    width: SmartScreenBase.smPercenWidth * 45,
                                    backgroundColor:
                                        this.ListAnswer[index] == false
                                            ? '#F9E815'
                                            : 'rgba(206,206,206,1)',
                                    borderBottomRightRadius:
                                        this.ListAnswer[index] == false
                                            ? 0
                                            : SmartScreenBase.smPercenWidth * 3,
                                }}>
                                <Text
                                    style={[
                                        StyleLesson.question_text,
                                        {
                                            margin: SmartScreenBase.smPercenHeight,
                                            alignSelf: 'center',
                                            fontWeight: 'bold',
                                        },
                                    ]}>
                                    FALSE
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View
                    style={{
                        backgroundColor: '#f3fc9a',
                        height:
                            this.ListAnswer[index] == false ? Platform.OS === 'ios' ? this.state.heightInput * 3 : this.state.heightInput * 2 : 0,
                        borderBottomLeftRadius: SmartScreenBase.smPercenWidth * 3,
                        borderBottomRightRadius: SmartScreenBase.smPercenWidth * 3,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: SmartScreenBase.smPercenWidth * 90,
                    }}>
                    <ScrollView scrollEnabled={false}>
                        <View
                            onLayout={(event) => {
                                this.LayoutInput = event.nativeEvent.layout;
                            }}
                            style={{
                                marginTop: Platform.OS === 'ios' ? this.state.heightInput/1.5 : this.state.heightInput / 3,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: '100%',
                            }}>
                            <Image
                                source={{uri: 'lesson_grammar_image1'}}
                                style={{
                                    width: SmartScreenBase.smPercenWidth * 10,
                                    height: SmartScreenBase.smPercenWidth * 10,
                                    resizeMode: 'contain',
                                    marginRight: 2,
                                }}
                            />
                            {
                                item.status?<Text style={{
                                    marginLeft: SmartScreenBase.smPercenWidth * 3,
                                    width: SmartScreenBase.smPercenWidth * 65,
                                    color: '#c14f02',
                                    borderBottomWidth: 1,
                                    borderBottomColor: 'black',
                                    ...StyleLesson.question_text
                                }}>
                                    {item.TextAnswer}
                                </Text>:<TextInput
                                    numberOfLines={3}
                                    multiline={true}
                                    placeholder={'Nhập câu đúng ...'}
                                    placeholderTextColor={'black'}
                                    autoCorrect={false}
                                    style={{
                                        marginLeft: SmartScreenBase.smPercenWidth * 3,
                                        maxHeight: SmartScreenBase.smPercenWidth * 20,
                                        width: SmartScreenBase.smPercenWidth * 65,
                                        color: '#c14f02',
                                        borderBottomWidth: 1,
                                        borderBottomColor: 'black',
                                        ...StyleLesson.question_text
                                    }}
                                    onChangeText={(text) => {
                                        this.state.data[index].TextAnswer = text;
                                        this._enableButton();
                                    }}
                                />
                            }
                        </View>
                    </ScrollView>
                </View>
            </View>
        );
    };

    _OnPressChooseResuilt(index, id) {
        //console.log('_OnPressChooseResuilt',id)
        this.state.data[index].chosen = id;
        if (id == 0) {
            this.ListAnswer[index] = false;
            LayoutAnimation.spring();
            this.setState({
                heightInput: this.LayoutInput.height,
                refresh: !this.state.refresh,
                chooseItem: index,
            });
        } else {
            this.ListAnswer[index] = true;
            LayoutAnimation.configureNext({
                duration: 500,
                create: {type: 'linear', property: 'opacity'},
                update: {type: 'spring', springDamping: 1},
                delete: {type: 'linear', property: 'opacity'},
            });
            this.setState({
                refresh: !this.state.refresh,
                chooseItem: index,
            });
        }
        // let checkChoose = this.ListAnswer.filter(function (e) {
        //     return e == null;
        // });
        // if (checkChoose.length == 0) {
        //     this.CheckShowCheck = true;
        // }
        //console.log(this.ListAnswer);
        this._enableButton();
    }

    _SubmitTeting = async () => {
        this.props.dispatch(ActionGrammarD2(this.ListAnswer));
        let arrr = [];
        for (let i = 0; i < this.ListAnswer.length; i++) {
            let ob = {};
            (ob.question_id = this.state.dataFirt.data_question[i].question_id),
                (ob.exercise_type = 'Grammar'),
                (ob.question_type = 1);
            ob.final_user_choice = this.ListAnswer[i];
            let a = [];
            for (let j = 0; j < this.state.arrayPost.length; j++) {
                let obj = {};
                obj.num_turn = j;
                obj.user_choice = this.state.arrayPost[j].ans[i];
                obj.score = this.state.arrayPost[j].ans[i] == this.ListAnswer[i] ?
                    this._FunctionToReplaceQuestion(this.state.data[i].TextAnswer.toLowerCase()) === this._FunctionToReplaceQuestion(this.state.data[i].explain.toLowerCase()) ?
                        1 : 0 : 0;
                a.push(obj);
            }
            ob.detail_user_turn = a;
            arrr.push(ob);
        }
        if (this.state.checkType === 'Testing') {
            this.props.setDataAnswer(arrr);
        }
    };

    checkResuilt() {
        if (this.state.checkType == 'exam') {
            let NumberTrue = 0;
            if (this.state.checkResuilt == null) {
                this.props.hideTypeExercise();
                this.state.data.forEach((e)=>{
                    if(e.chosen==1 && e.answer){
                        e.status = true;
                        NumberTrue++;
                    }else if(e.chosen ==0 && !e.answer){
                        if(!!e.TextAnswer && 
                            e.answers.find(c=>stringUtils.validWord(c)===stringUtils.validWord(e.TextAnswer)) !=null){
                            NumberTrue++;
                            e.status = true;
                        }
                    }
                })
                //console.log('checkResuilt',NumberTrue)
                this.state.history.push(JSON.parse(JSON.stringify(this.state.data)))

                if (NumberTrue == this.state.data.length) {
                    // this.props.showFeedback();
                    this.setState({
                        checkResuilt: true,
                        numberTrue: NumberTrue,
                    });
                } else {
                    this.setState({
                        numberAgain: this.state.numberAgain + 1,
                        checkResuilt: false,
                        numberTrue: NumberTrue,
                    });
                }
                // if (this.state.numberAgain >= 1) {
                //     this.props.showFeedback();
                // }
                let ob = {};
                ob.ans = this.ListAnswer.slice('');
                a.push(ob);
                this.setState({arrayPost: a});

            } else if (this.state.checkResuilt == false) {
                if (this.state.numberAgain < 2) {
                    this.props.showTypeExercise();
                    //reset data
                    this.state.data.forEach((e,i)=>{
                        if(!e.status){
                            this.ListAnswer[i] = null;
                        }
                    })

                    this.CheckShowCheck = false;
                    this.setState({checkResuilt: null});
                } else {
                    //show explain
                    if(!this.state.showExplain){
                        this.props.showFeedback();
                        this.setState({
                            showExplain:true
                        })
                    }else{
                        this.props.hideTypeExercise();
                        this._Submit();
                    }
                }
            } else {
                this.props.hideTypeExercise();
                this._Submit();
            }
        } else if (this.state.checkType == 'Testing') {
            this._SubmitTeting();
        } else if (this.state.checkType == 'afterTest') {
            this.props.nextReviewResult();
        }
    }

    _ShowResuilt() {
        const showIcon = this.state.numberAgain>=2 || this.state.numberTrue === this.state.data.length
        return (
            <View
                style={{
                    height: SmartScreenBase.smPercenHeight * 88,
                    alignItems: 'center',
                    width: SmartScreenBase.smPercenWidth * 100,
                }}>
                <View style={{
                        height: SmartScreenBase.smPercenHeight * (showIcon?13:5),
                        width: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                }}>
                    <FileSound 
                        showIcon={showIcon?null:'none'}
                        showImage={this.state.numberTrue === this.state.data.length ? 'true' : 'false'}/>
                </View>
                <View>
                    <Text
                        style={{
                            fontSize: SmartScreenBase.smPercenWidth * 5,
                            fontWeight: '800',
                            color: 'white',
                            fontFamily: 'iCielSoupofJustice',
                        }}>
                        {' '}
                        BẠN ĐÃ TRẢ LỜI ĐÚNG {this.state.numberTrue}/{this.state.data.length}
                    </Text>
                </View>
                <View style={{width: SmartScreenBase.smPercenWidth * 100}}>
                    <View
                        style={{
                            marginTop: SmartScreenBase.smPercenHeight * 3,
                            height: SmartScreenBase.smPercenHeight * (showIcon?52:60),
                            borderRadius: SmartScreenBase.smPercenWidth * 3,
                            marginBottom: SmartScreenBase.smPercenHeight * 3,
                        }}>
                        <FlatList
                            data={this.state.data}
                            keyExtractor={(item, index) => 'item' + index}
                            renderItem={this._Render_Item_Resuilt}
                            contentContainerStyle={{
                                alignItems: 'center',
                                borderRadius: SmartScreenBase.smPercenWidth * 3,
                            }}
                        />
                    </View>
                </View>
                <View
                    style={{
                        alignSelf: 'center',
                        marginTop: 10,
                    }}>
                    {this.state.checkType === 'afterTest' ? (
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity
                                onPress={() => {
                                    this._CheckResuilt();
                                }}
                                style={[
                                    stylesApp.Sty_Button,
                                    {
                                        width: SmartScreenBase.smPercenWidth * 10,
                                        marginRight: SmartScreenBase.smPercenWidth * 5,
                                    },
                                ]}>
                                <Text style={stylesApp.Sty_Text_Button}>Back</Text>
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
                                    this.checkResuilt();
                                }}
                                style={[
                                    stylesApp.Sty_Button,
                                    {width: SmartScreenBase.smPercenWidth * 10},
                                ]}>
                                <Text style={stylesApp.Sty_Text_Button}>TIẾP TỤC</Text>
                            </TouchableOpacity>
                        </View>
                    ) : this.state.checkType == 'exam' ? (
                            <TouchableOpacity
                                onPress={() => {
                                    this.checkResuilt();
                                }}
                                disabled={!this.CheckShowCheck}
                                style={
                                    this.CheckShowCheck?stylesApp.Sty_Button:stylesApp.Sty_Button_disable
                                }>
                                <Text style={stylesApp.Sty_Text_Button}>{
                                    this.state.checkResuilt == null
                                        ? 'KIỂM TRA'
                                        : this.state.checkResuilt == false &&
                                        this.state.numberAgain < 2
                                        ? 'LÀM LẠI'
                                        : 'TIẾP TỤC'}</Text>
                            </TouchableOpacity>
                    ) : this.state.checkType == 'Testing' ? (
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity
                                onPress={() => {
                                    this._OnPressBack();
                                }}
                                style={[
                                    stylesApp.Sty_Button,
                                    {
                                        width: SmartScreenBase.smPercenWidth * 40,
                                        marginRight: SmartScreenBase.smPercenWidth * 10,
                                    },
                                ]}>
                                <Text style={stylesApp.Sty_Text_Button}>BACK</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    this.checkResuilt();
                                }}
                                style={[
                                    stylesApp.Sty_Button,
                                    {width: SmartScreenBase.smPercenWidth * 40},
                                ]}>
                                <Text style={stylesApp.Sty_Text_Button}>NEXT</Text>
                            </TouchableOpacity>
                        </View>
                    ) : null
                    }
                </View>
            </View>
        );
    }


    _ShowLastResuilt() {
        return (
            <View
                style={{
                    height: SmartScreenBase.smPercenHeight * 88,
                    alignItems: 'center',
                    width: SmartScreenBase.smPercenWidth * 100,
                }}>
                <View style={{width:'100%',paddingLeft:SmartScreenBase.smPercenWidth*10}}>
                    <Text
                        style={{
                            fontSize: SmartScreenBase.smPercenWidth * 5,
                            color: 'white',
                            fontFamily: 'iCielSoupofJustice',

                        }}>
                        ĐÁP ÁN ĐÚNG LÀ:
                    </Text>
                </View>
                <View style={{width: SmartScreenBase.smPercenWidth * 100}}>
                    <View
                        style={{
                            marginTop: SmartScreenBase.smPercenHeight * 3,
                            height: SmartScreenBase.smPercenHeight * 70,
                            borderRadius: SmartScreenBase.smPercenWidth * 3,
                            marginBottom: SmartScreenBase.smPercenHeight * 3,
                        }}>
                        <FlatList
                            data={this.state.data}
                            keyExtractor={(item, index) => String(index)}
                            renderItem={this._rendLastItem}
                            contentContainerStyle={{
                                alignItems: 'center',
                                borderRadius: SmartScreenBase.smPercenWidth * 3,
                            }}
                        />
                    </View>
                </View>
                <View
                    style={{
                        alignSelf: 'center',
                        marginTop: 10,
                    }}>
                    <TouchableOpacity
                            onPress={() => {
                                this.checkResuilt();
                            }}
                            style={[
                                stylesApp.Sty_Button,
                            ]}>
                            <Text style={stylesApp.Sty_Text_Button}>TIẾP TỤC</Text>
                        </TouchableOpacity>
                </View>
            </View>
        );
    }
    _rendLastItem=({item,index})=>{
        return  <View
                style={[
                    StyleLesson.Sty_View_Border,
                    {
                        marginTop: SmartScreenBase.smPercenWidth*2,
                        alignItems: 'flex-start',
                        borderWidth: SmartScreenBase.smPercenWidth,
                        borderColor:'#c6e50e',
                        paddingLeft: SmartScreenBase.smBaseWidth * 50,
                        paddingTop: SmartScreenBase.smBaseWidth * 50,
                        paddingBottom: SmartScreenBase.smBaseWidth * 40,
                    },
                ]}>
                <View>
                    <View style={{
                    }}>
                        <Text style={[StyleLesson.question_text, {fontWeight: 'bold'}]}>
                            {index + 1}. {item.question}
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        marginVertical: SmartScreenBase.smBaseWidth * 50,
                    }}>
                    <View style={{}}>
                        <Text
                            style={{
                                ...StyleLesson.question_text,
                                fontWeight: 'bold',
                                color:'#c6e50e',
                            }}>
                            {item.answer.toString().toUpperCase()}
                        </Text>
                    </View>
                    {
                        !item.answer && <View
                            style={{marginTop:SmartScreenBase.smBaseWidth*20,}}
                        >
                            <Text style={{fontStyle:'italic',
                                color:'#c6e50e',
                                fontSize:SmartScreenBase.smFontSize*45}}>
                                <Text style={{fontWeight:'bold'}}>Sửa: </Text>{item.answers[0]}
                            </Text>
                        </View>
                    }
                </View>
                {
                    !!item.explain1&&<View style={{}}>
                        <Text style={{fontSize: SmartScreenBase.smFontSize * 50, fontWeight: 'bold'}}>
                            Giải thích:
                        </Text>
                        <Text style={StyleLesson.explain_text}>
                            {item.explain1}
                        </Text>
                    </View>
                }
            </View>

    }
    _Render_Item_Resuilt = ({item, index}) => {
        return (
            <View
                style={[
                    StyleLesson.Sty_View_Border,
                    {
                        marginTop: 30,
                        alignItems: 'flex-start',
                        borderWidth: SmartScreenBase.smPercenWidth,
                        borderColor:!item.status? '#e21010': '#c6e50e',
                    },
                ]}>
                <View
                    style={{
                        alignSelf: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        top: -SmartScreenBase.smBaseWidth * 56,
                    }}>
                    <Image source={{uri:item.status?'grammar1_4':'grammar1_3'}}
                        style={StyleLesson.Sty_Image_Small_Answer}
                    />
                </View>
                <View>
                    <View style={{
                        paddingLeft: SmartScreenBase.smBaseWidth * 60,
                        paddingTop: SmartScreenBase.smBaseWidth * 60,
                        paddingBottom: SmartScreenBase.smBaseWidth * 50,
                    }}>
                        <Text style={[StyleLesson.question_text, {fontWeight: 'bold'}]}>
                            {index + 1}. {item.question}
                        </Text>
                    </View>
                </View>
                <View
                    style={{
                        marginBottom: SmartScreenBase.smBaseWidth * 60,
                    }}>
                    <View style={{marginLeft: SmartScreenBase.smBaseWidth * 60}}>
                        <Text
                            style={{
                                ...StyleLesson.question_text,
                                fontWeight: 'bold',
                                color:!item.status? '#e21010': '#c6e50e',
                            }}>
                            {this.ListAnswer[index].toString().toUpperCase()}
                        </Text>
                    </View>
                    {
                        item.chosen ==0 && <View
                            style={{marginVertical:SmartScreenBase.smBaseWidth*20,marginLeft: SmartScreenBase.smBaseWidth * 60}}
                        >
                            <Text style={{fontStyle:'italic',
                                color:!item.status? '#e21010': '#c6e50e',
                                fontSize:SmartScreenBase.smFontSize*40}}>
                                <Text style={{fontWeight:'bold'}}>Sửa: </Text>{item.TextAnswer}
                            </Text>
                        </View>
                    }
                </View>
            </View>
        );
    };
}

function mapStateToProps(state) {
    return {
        data_answer: state.GrammarD2Reducer,
        data_login: state.AuthStackReducer.dataLogin,
    };
}

export default connect(mapStateToProps)(GrammarD1);
