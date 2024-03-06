import React, { Component } from "react";
import { Text, View, FlatList, TouchableOpacity, Image, ScrollView, Dimensions, Alert } from "react-native";
import SmartScreenBase from "../../../base/SmartScreenBase";
import Carousel from 'react-native-snap-carousel';
import ItemReadingD9 from "./Component/ItemReadingD9";
import ButtonCheck from "../../../items/ButtonCheck";
import FileSound from '../FileSound';
import TypeExercise from "../Component/TypeExercise";
import stylesApp from "../../../styleApp/stylesApp";
import StyleLesson from "../StyleLesson";
import LoadingScreen from '../../../../screens/LoadingScreen';
import { ReadingD9Aciton } from '../../../../redux/actions/readingD9Action';
import API from '../../../../API/APIConstant';
import stylesButton from '../../../../styleApp/stylesApp'
import { connect } from 'react-redux';
import stringUtils from '../../../../utils/stringUtils';

const { width, height } = Dimensions.get('window')
import axios from 'axios';
import FileSound4 from "../FileSound4";
import FontBase from "../../../../base/FontBase";
class ReadingD9 extends Component {
    option = "abcdefghijklmnopqrstuvwxyz".split('');
    constructor(props) {
        super(props);
        this.state = {
            refresh: false,
            ShowCheck: false,
            checkResuilt: null,
            Choose: 0,
            data: [],
            loadding: true,
            dataTotal: [],
            title: '',
            vi: false,
            testing: this.props.checkType,
            bodyPost: [],
            dataPost: {},
            idLog: {},
            numberAgain: 0,
            disabled: true
        }
        this.ListAnswer = [];
    };

    componentDidMount() {
        if (this.state.testing == "aftertest") {
            const { readingD9 } = this.props;
            this.setState({ data: readingD9.data, NumberTrue: readingD9.NumberTrue, checkResuilt: false, loadding: false });
            this.ListAnswer = readingD9.ListAnswer;
        } else {
            this._getData();
        }
        this.props.saveLogLearning([]);
    };

    _getData = async () => {
        let ressponse = {};
        ressponse['data'] = this.props.dataContent;
        //console.log('ressponse',ressponse)
        let dataConvert = await this.convertData(ressponse.data.data_question[0].list_option);
        // this._postDataFirt(ressponse.data)
        this._convertDataPost(ressponse.data);
        await this.setState({
            data: dataConvert,
            dataTotal: ressponse.data.data_question[0].list_option[0],
            dataPost: ressponse.data,
            title: ressponse.data.data_question[0].list_option[0].group_content,
            loadding: false,
        });
        for (let index = 0; index < this.state.data.length; index++) {
            this.ListAnswer.push(null);
        }
    };

    _convertDataPost = (data) => {
        const { bodyPost } = this.state;
        let body = [...bodyPost];
        let dataP = { ...data };
        dataP.data_question.map((item, index) => {
            let oj = {}
            oj.question_id = item.question_id;
            oj.question_type = item.list_option[0].question_type;
            oj.question_score = 0;
            oj.final_user_choice = [];
            oj.exercise_type = 'reading';
            oj.detail_user_turn = []
            body.push(oj);
        });
        this.setState({ bodyPost: body })
    }
    convertData = (value) => {
        let dataConvert = [];
        let option = [];
        let trimQuestion = this.trimQuestion(value[0].question_content)
        let jamming_answer = value[0].jamming_answer?.split(',');
        jamming_answer?.forEach((item, index) => {
            option.push(item)
        })
        
        trimQuestion.data.forEach((element, number) => {
            option.push(element.text)
        })
        option = stringUtils.shuffleArray(option);
        console.log('value',value)
        console.log('trimQuestion',trimQuestion)
        value.forEach((item, index) => {
            if(!trimQuestion.data[index]) return;
            let oj = {};
            oj.question = trimQuestion.data[index].text2;
            oj.option = option;
            oj.key = null;
            oj.answer = trimQuestion.data[index].text;
            oj.script = item.option_explain;
            oj.disable = false;
            dataConvert[index] = oj;
            
        });
        return dataConvert
    };
    extractData=(s)=>{
        const match = s.match(/{.*?}/g)
        var res = {
            text:'',
            text2:s,
        }
        if(match){
            match.forEach(e=>{
                res.text = `${res.text}/${e.replace('{','').replace('}','')}`
                res.text2 = res.text2.replace(e,'_______');
            })
            res.text = res.text.substr(1)
        }
        return res;
    }
    trimQuestion = (str) => {
        var sens = str?.split('/');
        let indices = {
            data:sens.map(e=>{
                return this.extractData(e)
            })
        };
        // indices['data'] = [];
        // str.split('/\n').forEach(element => {
        //     let searchStr = '}';
        //     let searchStrLen = '}'.length;
        //     let startIndex = 0, index;
        //     while ((index = element.indexOf(searchStr, startIndex)) > -1) {
        //         let str1 = element.slice(startIndex, index + 1).match(/\{([^}]+)\}/)[1];
        //         let data = {};
        //         data['text2'] = element.slice(str1.length + 2, element.length)
        //         data['text'] = str1;
        //         indices['data'].push(data);
        //         startIndex = index + searchStrLen;
        //     }
        // });
        return indices
    };

    _postDataAnswer = async () => {
        this.props.saveLogLearning(this.state.bodyPost);
    };

    _OnpressAnswer(answer, index) {
        let array = [...this.state.data];
        array[index].key = answer;
        let oj = {}
        oj.value = this.state.data[index].option[answer];
        oj.key = answer;;
        oj.alpha = this.option[answer]
        this.ListAnswer[index] = oj;
        let check = this.ListAnswer.filter(function (e) { return e == null });
        if (check.length == 0) {
            this.setState({ refresh: !this.state.refresh, disabled: false })
        }
    };

    NumberCheck = 0;
    CheckSnap = false;
    async _OnPressCheckResuilt() {
        //this.props.showFeedback()
        const { testing } = this.state
        if (this.state.checkResuilt == null) {
            this.props.hideTypeExercise();
            let check = 0;
            let array = [...this.state.data]
            for (let index = 0; index < this.state.data.length; index++) {
                if (this.ListAnswer[index].value == this.state.data[index].answer) {
                    check += 1;
                    this.state.data[index].disable = true
                }
            }
            this.setState({data:array})
            if (check == this.ListAnswer.length) {
                if (this.props.modeF === 'exam' || this.props.modeF === 'mini_test') {
                    await this._saveData()
                    this.props.setDataAnswer(this.state.bodyPost)
                } else {
                    this.props.showFeedback();
                    this.setState({ checkResuilt: true })
                }
            } else {
                this.NumberCheck += 1;
                if(this.NumberCheck > 1){
                    this.props.showFeedback()
                }
                this.setState({ checkResuilt: false })
            }
            this.state.NumberTrue = check;
            await this._pushDataPost()
            if (this.props.modeF === 'exam' || this.props.modeF === 'mini_test') {
                await this._saveData()
                this.props.setDataAnswer(this.state.bodyPost)
            }
        } else if (this.state.checkResuilt == false) {
            let array = [...this.state.data];
            if (this.NumberCheck < 2) {
                this.props.hideFeedback()
                this.props.showTypeExercise();
                for (let index = 0; index < this.ListAnswer.length; index++) {
                    if (this.ListAnswer[index].value != this.state.data[index].answer) {
                        this.ListAnswer[index] = null;
                       array[index].key = null
                    }
                }
                this.setState({ checkResuilt: null, disabled: true, Choose: 0 });
            } else {
                this.props.hideTypeExercise();
                this.props.showFeedback();
                if (testing == 'homeword') {
                    this._postDataAnswer()
                } else {
                    this.props.methodScreen(9);
                }
            }
        } else {
            this.props.hideTypeExercise();
            if (testing == 'homeword') {
                this._postDataAnswer()
            } else {
                this.props.methodScreen(9);
            }
        }
    };
    _pushDataPost = () => {
        const { bodyPost, data, dataPost, numberAgain } = this.state;
        let bodyConvert = [...bodyPost];
        let oj = {};
        let array = [];
        let score = 0;
        let number = 0;
        this.ListAnswer.forEach((Element) => {
            array.push(Element.value)
        })
        for (let index = 0; index < this.state.data.length; index++) {
            if (this.ListAnswer[index].value == this.state.data[index].answer) {
                number++
            }
        }
        score = number / this.state.data.length
        bodyConvert[0].final_user_choice = array;
        bodyConvert[0].question_score = score
        oj.num_turn = numberAgain + 1;
        oj.score = score;
        oj.user_choice = array;
        bodyConvert[0].detail_user_turn.push(oj);
        this.setState({ bodyPost: bodyConvert, numberAgain: numberAgain + 1 })
    }
    _saveData = async () => {
        let check = 0;
        let oj = {};
        for (let index = 0; index < this.state.data.length; index++) {
            if (this.ListAnswer[index].value == this.state.data[index].answer) {
                check += 1;
            }
        }
        oj.data = await this.state.data;
        oj.ListAnswer = await this.ListAnswer;
        oj.NumberTrue = await check
        await this._endgame(oj)

    };
    _endgame = async (data) => {
        await this.props.dispatch(ReadingD9Aciton(data));
    }

    render() {
        return (
            !this.state.loadding ?
                <View style={{ flex: 1 }}>
                    <View style={{ 
                        flex: 1, 
                        alignItems: "center", 
                        alignSelf: "center"
                    }}>
                        <View style={{flex:1}}>
                            {this.state.checkResuilt == null ? this._ShowQuestion() : this._ShowResuilt()}
                        </View>
                        <View style={{ 
                            alignItems:'center',
                            paddingTop:SmartScreenBase.smPercenHeight*2,
                            paddingBottom:SmartScreenBase.smPercenHeight*3,
                        }}>
                            {
                                this.state.testing == 'homeword' && (
                                    <TouchableOpacity onPress={() => { this._OnPressCheckResuilt() }} style={this.state.disabled ? stylesButton.Sty_Button_disable : stylesButton.Sty_Button} disabled={this.state.disabled}>
                                        <Text style={stylesButton.Sty_Text_Button}>
                                            {this.state.checkResuilt == null ? "KIỂM TRA" :
                                                this.state.checkResuilt == false && this.NumberCheck < 2 ? "LÀM LẠI" : "TIẾP TỤC"}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            {
                                this.state.testing == 'testing' &&
                                <TouchableOpacity onPress={() => { this._saveData() }} style={this.state.disabled ? stylesButton.Sty_Button_disable : stylesButton.Sty_Button} disabled={this.state.disabled}>
                                    <Text style={stylesButton.Sty_Text_Button}>
                                        {this.state.checkResuilt == null ? "KIỂM TRA" :
                                            this.state.checkResuilt == false && this.NumberCheck < 2 ? "LÀM LẠI" : "TIẾP TỤC"}
                                    </Text>
                                </TouchableOpacity>
                            }
                            {
                                this.state.testing == 'aftertest' &&
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: width, paddingHorizontal: 10 }}>
                                    <TouchableOpacity onPress={() => { this._goback(); }} style={stylesButton.Sty_ShortButton}>
                                        <Text style={stylesButton.Sty_Text_Button}>QUAY LẠI</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => { this.setState({ data: this.state.data }), this.NumberCheck == 2 ? this.NumberCheck = 1 : this.NumberCheck = 2 }} style={stylesButton.Sty_ShortButton}>
                                        <Text style={stylesButton.Sty_Text_Button}>GIẢI THÍCH</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => { this._afterTest(); }} style={stylesButton.Sty_ShortButton}>
                                        <Text style={stylesButton.Sty_Text_Button}>TIẾP TỤC</Text>
                                    </TouchableOpacity>
                                </View>
                            }
                        </View>
                    </View>
                    {
                        this.state.checkResuilt == false && this.NumberCheck < 2 ?
                            <View>
                                <FileSound4 showImage={"false"} />
                            </View>
                            :
                            null
                    }
                </View>
                :
                <LoadingScreen />
        )
    }
    _afterTest = () => {
        if (this.props.modeF === 'review_result') {
            this.props.nextReviewResult();
        }
    }
    _goback = () => {
        if (this.props.modeF === 'review_result') {
            this.props.prevReviewResult();
        }
    }
    _changeTitle = () => {
        const { dataTotal } = this.state;
        if (!this.state.vi) {
            this.setState({ title: dataTotal.group_content_vi, vi: true })
        } else {
            this.setState({ title: dataTotal.group_content, vi: false })
        }
    }
    _ShowQuestion() {
        return (
            <View>
                <View style={{ 
                    marginTop: SmartScreenBase.smPercenHeight * 2, 
                    flexDirection: "row", 
                    alignSelf: "center", 
                    alignItems: "center", 
                    justifyContent: "center",
                }}>
                    {this.state.data.map((item, key) => {
                        if (this.state.Choose !== key) {
                            return (
                                <View key={key} style={{ margin: SmartScreenBase.smPercenWidth * 3, opacity: 0.8 }}>
                                    <TouchableOpacity onPress={() => {
                                        this.setState({ Choose: key });
                                        this.CheckSnap = true;
                                        this._carousel.snapToItem(key, animated = true, fireCallback = true);
                                    }}>
                                        <View style={{
                                            height: SmartScreenBase.smPercenWidth * 9,
                                            width: SmartScreenBase.smPercenWidth * 9,
                                            borderRadius: SmartScreenBase.smPercenWidth * 9 / 2,
                                            backgroundColor: "white",
                                            alignItems: "center", justifyContent: "center"
                                        }}>
                                            <Text style={[stylesApp.txt, { fontWeight: 'bold' }]}>{key + 1}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )
                        } else {
                            return (
                                <View key={key} style={{ alignItems: "center", justifyContent: "center" }}>
                                    <Image source={{ uri: 'lesson_reading_image1' }}
                                        style={{
                                            width: SmartScreenBase.smBaseWidth * 130,
                                            height: SmartScreenBase.smBaseWidth * 130, resizeMode: "contain"
                                        }}

                                    />
                                    <View style={{ position: "absolute" }}>
                                        <Text style={[stylesApp.txt, {
                                            paddingBottom: SmartScreenBase.smPercenWidth,
                                            paddingRight: SmartScreenBase.smPercenWidth / 2,
                                            fontWeight: 'bold'
                                        }]}>{key + 1}</Text>
                                    </View>
                                </View>
                            )
                        }
                    })}
                </View>
                <View style={{flex:1}}>
                    <Carousel
                        ref={(c) => { this._carousel = c; }}
                        data={this.state.data}
                        renderItem={this._renderItemCarousel}
                        sliderWidth={SmartScreenBase.smPercenWidth * 100}
                        itemWidth={SmartScreenBase.smPercenWidth * 100}
                        firstItem={0}
                        layout={'default'}
                        onSnapToItem={(index) => { this.setState({ Choose: index }) }}
                        onScrollBeginDrag={() => { this.CheckSnap = false; }}
                    />
                </View>
            </View>
        )
    }
    _renderItemCarousel = ({ item, index }) => {
        return (
            <ScrollView style={{ alignSelf: "center" }} showsVerticalScrollIndicator={true}>
                <ItemReadingD9
                    index={index}
                    item={item}
                    screen={this}
                />
            </ScrollView>
        )
    }
    _ShowResuilt() {
        return (
            <View style={{ alignItems: "center", alignSelf: "center",flex:1 }}>
                {this.NumberCheck >= 2 || this.state.checkResuilt == true ? (
                    <View style={{
                        height: SmartScreenBase.smPercenHeight * 12,
                        width: "100%",
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <FileSound showImage={this.state.NumberTrue == this.state.data.length ? 'true' : 'false'} />
                    </View>
                ) : (
                        <View style={{ height: SmartScreenBase.smPercenHeight * 2, }} />
                    )}
                <Text style={{
                    marginVertical: SmartScreenBase.smPercenHeight,
                    color: "white", fontWeight: "600",
                    fontFamily: 'iCielSoupofJustice',
                    fontSize: 20
                }}>BẠN ĐÃ TRẢ LỜI ĐÚNG {this.state.NumberTrue}/{this.state.data.length}</Text>
                <FlatList
                    data={this.state.data}
                    extraData={this.state.refresh}
                    keyExtractor={(item, index) => "item" + index}
                    renderItem={this.RenderItemResuilt.bind(this)}
                    contentContainerStyle={{ alignItems: "center" }}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        )
    }
    RenderItemResuilt = ({ item, index }) => {
        return (
            <View style={[StyleLesson.Sty_View_Border, {
                alignItems: "flex-start",
                borderWidth: SmartScreenBase.smPercenWidth / 2,
                marginBottom: index == this.state.data.length - 1 ? SmartScreenBase.smPercenHeight * 15 : 0,
                borderColor: this.ListAnswer[index].value !== this.state.data[index].answer ? "#D80B0B" : "#388C02",
                marginTop: SmartScreenBase.smBaseWidth * 120,
            }]}>
                <View style={{ margin: SmartScreenBase.smPercenHeight, justifyContent: 'center', }}>
                    <View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
                        <View style={{ height: '100%', alignItems: 'center' }}>
                            <Text style={{ fontSize: SmartScreenBase.smPercenWidth * 4, fontWeight: "900" }}>{index + 1}. </Text>
                        </View>
                        <Text style={[stylesApp.txt, {
                            fontFamily: FontBase.MyriadPro_Bold,
                            color: this.ListAnswer[index].value !== this.state.data[index].answer ? "#D80B0B" : "#388C02",
                            fontSize: SmartScreenBase.smFontSize*45,
                            paddingRight:10,
                        }]} >
                            {this.ListAnswer[index].alpha.toUpperCase()}. {this.ListAnswer[index].value.toString()}
                        </Text>
                    </View>
                    {
                        this.ListAnswer[index].value !== this.state.data[index].answer &&
                        <View>
                            {
                                this.state.data[index].option.map((string, number) => {
                                    if (string.toString() == this.state.data[index].answer.toString()) {
                                        return (
                                            this.NumberCheck >= 2 &&
                                            <View style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center' }}>
                                                <View style={{ height: '100%', alignItems: 'center' }}>
                                                    <Image source={{ uri: "lesson_grammar_image3", marginTop: SmartScreenBase.smPercenHeight }}
                                                        style={[StyleLesson.Image_Explain, { marginLeft: 10 }]}
                                                    />
                                                </View>
                                                <Text style={[stylesApp.txt, {
                                                    fontFamily: FontBase.MyriadPro_Bold,
                                                    // textTransform: "uppercase",
                                                    width: SmartScreenBase.smPercenWidth*75,
                                                    color: "#388C02",
                                                    fontSize: SmartScreenBase.smFontSize*45,
                                                }]}>{this.option[number].toUpperCase()}. <Text>{string}</Text></Text>
                                            </View>
                                        )
                                    }
                                })
                            }
                        </View>
                    }
                </View>
                <View style={{ position: "absolute", alignSelf: "center", top: -SmartScreenBase.smBaseWidth * 110 }}>
                    <Image
                        source={{ uri: this.ListAnswer[index].value.toString() == this.state.data[index].answer.toString() ? "grammar1_4" : "grammar1_3" }}
                        style={{ width: width / 10, height: height / 10, resizeMode: 'contain' }}
                    />
                </View>
            </View>
        )
    }
}
function mapStateToProps(state) {
    return {
        readingD9: state.reading9Reducer.reading,
        dataLogin: state.AuthStackReducer.dataLogin,
        checkType: state.TesttingReducer.testing
    }
}
export default connect(mapStateToProps)(ReadingD9);
