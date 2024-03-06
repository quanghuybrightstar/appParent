import React, { Component, useState } from "react";
import {
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    Image,
    Alert,
    Keyboard,
    Animated,
    ActivityIndicator,
    TextInput,
    ScrollView,
    Platform
} from "react-native";
import TypeExercise from "../Component/TypeExercise";
import StyleLesson from "../StyleLesson";
import SmartScreenBase from "../../../../base/SmartScreenBase";
import stylesApp from "../../../styleApp/stylesApp";
import ButtonCheck from "../../../items/ButtonCheck";
// import { TextInput, FlatList, ScrollView } from "react-native-gesture-handler";
import { connect } from 'react-redux';
import axios from 'axios';
import FileSound from "../FileSound";
import Sound from "react-native-sound";
import stylesButton from '../../../../styleApp/stylesApp';
import stringUtils from '../../../../utils/stringUtils';
import LogBase from "../../../../base/LogBase";

Sound.setCategory('Playback');

const { width, height } = Dimensions.get('window')
let titleNumber;

class VocabB4Screen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkResuilt: null,
            textAnswer: '',
            check: false,
            dataQuestion: [],
            LongQuestion: [],
            questionHint: [],
            dataAnswerCheck: [],
            Loadding: false,
            valueY: new Animated.Value(0),
            checkBoard: true,
            textButton: 'kiểm tra',
            numberAgain: 0,
            numberHint: 0,
            hint: false,
            title: '',
            vi: true,
            show: true,
            showKey: false,
            valueAnser: '',
            score: 0,
            numberCheck: 0,
            finalHint: [],
            textError: ''
        }
    };

    componentWillMount() {
        this._getData()
        Keyboard.addListener('keyboardDidShow', () => this._showKeyBoad());
        Keyboard.addListener('keyboardDidHide', () => this._HideKeyBoad())
    };

    componentWillUnmount(){
        Keyboard.removeListener('keyboardDidShow', this._showKeyBoad);
        Keyboard.removeListener('keyboardDidHide', this._HideKeyBoad);
    }

    _getData = async () => {
        try {
            const ressponse = await this.props.Vocab;
            let data = await this.convertData(ressponse.data.data_question);
            await this.setState({
                dataQuestion: data,
                Loadding: true,
                LongQuestion: data.question,
            })
        } catch (error) {
            console.log(error);
            if (error.message === 'Network Error') {
                Alert.alert('Thông Báo', 'Vui lòng kiểm tra kết nối Internet');
            }
        }
    };

    convertData = async (data) => {
        let dataConvert = [];
        let dataPush;
        let ramdom = [0, 1]
        let numberRandom = ramdom[Math.floor(Math.random() * ramdom.length)]
        titleNumber = numberRandom;
        let array = [];
        // console.log(data);
        data.map(async (item, index) => {
            let oj = {};
            let questionVi = [];
            let hint = []
            for (let i = 0; i < 4; i++) {
                questionVi.push(item.en_vi_sentence);
                array = JSON.parse(item.en_vi_sentence_mean);
                if (numberRandom / 2 != 0) {
                    array = JSON.parse(item.vi_en_sentence_mean);
                    questionVi[i] = item.vi_en_sentence;
                }
            }
            oj.question = array;
            oj.questionVi = questionVi[numberRandom];
            oj.image = JSON.parse(item.image)[0]
            dataConvert[index] = oj;
        })
        if (titleNumber > 0) {
            this.props.setVietNam('Dịch câu tiếng Việt sang tiếng Anh.');
            this.props.setEnglish('Translate the sentence into English.');
        } else {
            this.props.setVietNam('Dịch câu tiếng Anh sang tiếng Việt.');
            this.props.setEnglish('Translate the sentence into Vietnamese.');
        }
        return dataConvert[this.props.index];
    };

    _showKeyBoad = () => {
        if (this.state.hint) {
            this.props.hideTypeExercise()
            Animated.timing(this.state.valueY, {
                toValue: height / 8.5,
                duration: 500
            }).start();
        }
        // this.setState({ showKey: true })
    };

    _HideKeyBoad = () => {

        if (this.state.hint) {
            this.props.showTypeExercise()
            Animated.timing(this.state.valueY, {
                toValue: 0,
                duration: 500
            }).start();
        }
        // this.setState({ showKey: false })
    };

    _renderItem = (item, index) => {
        return (
            <View style={{
                paddingHorizontal: item.value && item.value != "" ? 20 : 30,
                borderWidth: 2,
                borderColor: '#fff',
                backgroundColor: '#F7AC16',
                marginBottom: 15,
                paddingVertical: item.value != "" ? 5 : 7,
                borderRadius: 25,
                marginRight: 5
            }}>
                <Text style={{ fontSize: 16, fontWeight: '500' }}>{this.state.checkResuilt?(item.value||item):item.value}</Text>
            </View>
        )
    };

    _onChangeText = (text) => {
        this.setState({ dataAnswerCheck: text, valueAnser: text });
        this.setState({textError: text});
    };
    _next = async (valueAnser)=>{
        if(this.props.index == this.props.dataContent.data_question.length - 1){
            await this.props.SaveDataEnd(this.state.valueAnser, 4, this.state.score)
        }else{
            await this.props.SaveData(this.state.valueAnser, 4, this.state.score);
            this.props.setIndexQuestion(this.props.index + 1);
            this.props.plusindex()
            this.props.methodScreen('1')
        }
    }
    async _OnPressCheckResuilt() {
        // console.log(this.state.numberHint);
        const { textButton, valueAnser, hint } = this.state;
        if (textButton == "kiểm tra") {
            this._checkLengthQuestion()
        } else if (textButton == 'làm lại') {
            this._again()
        } else if (textButton == 'tiếp tục') {
            if(this.state.checkResuilt){
                this._next();
                return;
            }

            if (hint == false) {
                this._next();
            } else {
                if (this.state.numberHint > 2) {
                    this._next();
                } else {
                    this.setState({ hint: false,})
                }
            }
        } else {
            if (!hint) {
                alert(4)
                this._next();
            } else {
                alert(3)
                this.setState({ hint: false, checkResuilt: true })
            }
        }
    };

    _trimChar = (string) => {
        return stringUtils.validWord(string);
    };
    _checkLengthQuestion = async () => {
        console.log(this.state)
        this._checkData()
    };

    _checkData = async () => {
        this.scrollView.scrollTo(0)
        const { dataAnswerCheck, LongQuestion, finalHint, questionHint, numberHint,valueAnser } = this.state;
        const convertData = [];
        var isRight = false
        LongQuestion.forEach(element => {
            var dapan = stringUtils.validWord(stringUtils.compareComma(stringUtils.ConvertVNtoEN(element)))
            var traloi = stringUtils.validWord(stringUtils.compareComma(stringUtils.ConvertVNtoEN(valueAnser)))
            if(dapan == traloi){
                isRight = true
            }
        });

        if (!isRight) {
            this.scrollView.scrollToEnd({ animated: true })
            if (numberHint < 2) {
                //let dataHint = await this._hint()
                await this.setState({
                    //dataAnswerCheck: convertData,
                    check: true,
                    checkResuilt: false,
                    textButton: 'làm lại',
                    //questionHint: dataHint,
                })
            } else {
                await this.setState({
                    //dataAnswerCheck: questionHint,
                    check: true,
                    checkResuilt: false,
                    textButton: 'tiếp tục'
                })
            }
        } else {
            await this.setState({
                score: 1,
                // dataAnswerCheck: convertData,
                check: true,
                checkResuilt: true,
                textButton: 'tiếp tục'
            })
        }
    };

    _again = async () => {
        this.scrollView.scrollTo(0)
        const { numberAgain, hint, numberHint } = this.state
        if (!hint) {
            if (numberAgain < 1) {
                await this.setState({
                    dataAnswerCheck: "",
                    check: false,
                    checkResuilt: false,
                    textButton: 'kiểm tra',
                    numberAgain: numberAgain + 1
                })
            } else {
                let dataHint = await this._hint()
                await this.setState({
                    questionHint: dataHint,
                    dataAnswerCheck: "",
                    check: false,
                    checkResuilt: false,
                    textButton: 'kiểm tra',
                    numberAgain: numberAgain + 1,
                    hint: true,
                    numberHint: numberHint + 1,
                })
            }
        } else {
            let dataHint = await this._hint()
            await this.setState({
                questionHint: dataHint,
                dataAnswerCheck: "",
                check: false,
                checkResuilt: false, 
                textButton: 'kiểm tra',
                numberAgain: numberAgain + 1,
                numberHint: numberHint + 1
            })
        }
    };

    random = () => {
        const { LongQuestion } = this.state
        return LongQuestion[Math.floor(Math.random() * LongQuestion.length)]
    };

    _openHint = async () => {
        const { numberHint } = this.state
        let dataHint = await this._hint()
        this.setState({
            questionHint: dataHint,
            hint: true,
            numberHint: numberHint + 1,
            numberAgain: 3,
            backgroundColor: 'red'
        })
    }
    _hint = async () => {
        console.log('this.state',this.state)
        const { finalHint, questionHint, valueAnser, numberHint,LongQuestion } = this.state;
        let data = [];
        const myAns = [];
        valueAnser.trim().split(' ').forEach(e=>{
            if(!!e)
                myAns.push(e)
        })

        LongQuestion.forEach((e,i)=>{
            const tmp = [];
            const quests  = [];
            e.trim().split(' ').forEach(e=>{
                if(!!e)
                    quests.push(e)
            })

            quests.forEach((ee,ii)=>{
                if(!!myAns[ii] && stringUtils.validWord(ee) == stringUtils.validWord(myAns[ii])){
                    tmp.push({
                        value:ee,
                        color:'green'
                    })
                }else{
                    tmp.push(ee)
                }
            })

            if(data.length == 0 || tmp.filter(c=>!!c.color).length > data.filter(c=>!!c.color).length){
                data = tmp;
            }
        })
        console.log('numberHint',numberHint)
        if(numberHint<1){
            const notRight = data.filter(c=>!c.color).length/2;
            let iiii = 0;
            for(let i =0 ; i< data.length; i++){
                if(!data[i].value && iiii < notRight) {
                    iiii++;
                    data[i]= {
                        color:'green',
                        value:data[i]
                    }
                }
            }

            console.log('notRight',notRight)
        }else{
            for(let i =0 ; i< data.length; i++){
                if(!data[i].value) {
                    data[i]= {
                        color:'green',
                        value:data[i]
                    }
                }
            }
        }
        

        console.log('_hint',data)
        return data
    }
    _setNumberHint = (data) => {
        const { finalHint, questionHint, dataAnswerCheck, numberHint } = this.state;
        let number = 0
        data.forEach((Element) => {
            if (Element.value) {
                number++
            }
        })
        let numberH;
        if (numberHint == 0) {
            numberH = (finalHint.length - number) / 100 * 50
        } else {
            numberH = (finalHint.length - number) / 100 * 100
        }
        return Math.round(numberH);
    }
    _changeTitle = () => {
        if (!this.state.vi) {
            if (titleNumber > 0) {
                this.setState({ title: 'Dịch các câu sau đây sang tiếng Anh', vi: true })
            } else {
                this.setState({ title: 'Dịch các câu sau đây sang tiếng Việt', vi: true })
            }
        } else {
            if (titleNumber > 0) {
                this.setState({ title: 'Translate the following sentences into English', vi: false })
            } else {
                this.setState({ title: 'Translate the following sentences into VietNamese', vi: false })
            }
        }
    }

    render() {
        const { check, checkResuilt,LongQuestion, numberAgain, Loadding, valueY, hint, numberHint, dataQuestion, textButton, questionHint, dataAnswerCheck, showKey } = this.state

        return (
            Loadding ?
                <View style={[StyleLesson.HeightExercise, { flex: 1}]}
                    onStartShouldSetResponder={() => Keyboard.dismiss()}>
                    <View style={{ zIndex: 0, height: SmartScreenBase.ratio > 1.95 ? SmartScreenBase.smPercenHeight*65 : SmartScreenBase.smPercenHeight*62}}>
                        <ScrollView ref={refs => this.scrollView = refs}>
                            <View style={[StyleLesson.Sty_View_Border, {
                                flexDirection: "row",
                                marginTop: 20,
                                paddingLeft: SmartScreenBase.smPercenWidth * 3,
                                justifyContent: 'center',
                                minHeight: SmartScreenBase.smPercenWidth * 15,
                                width:'100%'
                            }]}>
                                <Text style={{
                                    fontSize: SmartScreenBase.smPercenWidth * 4,
                                    fontWeight: "400",
                                    color: "black"
                                }}>{dataQuestion.questionVi}</Text>
                            </View>
                            {
                                hint ?
                                    <View style={{
                                        width: '100%',
                                        paddingVertical: 20,
                                        borderRadius: 25,
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}>
                                        <View style={{ width: '100%', }}>
                                            <View style={{
                                                width: '100%',
                                                flexDirection: 'row',
                                                flexWrap: 'wrap',
                                                justifyContent: 'flex-start'
                                            }}>
                                                {
                                                    questionHint.map((item, index) => {
                                                        return this._renderItem(item, index)
                                                    })
                                                }
                                            </View>
                                        </View>
                                        <View style={{
                                            width: '100%',
                                            height: height / 3.5,
                                            backgroundColor: '#22222260',
                                            borderRadius: 20,
                                            paddingTop: 15,
                                            paddingHorizontal: 10
                                        }}>
                                            <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#fff' }}>Viết lại câu
                                                sau</Text>
                                            <View style={{
                                                backgroundColor: "#fff",
                                                height: '80%',
                                                width: '100%',
                                                padding: 20,
                                                borderRadius: 25,
                                                marginTop: 5
                                            }}>
                                                {
                                                    textButton === 'kiểm tra' ?
                                                        <TextInput
                                                            placeholder="Gõ câu dịch..."
                                                            style={{
                                                                fontSize: 17,
                                                                fontWeight: '700',
                                                                color: '#8E1C76',
                                                                height: '100%'
                                                            }}
                                                            autoCorrect={false}
                                                            placeholderTextColor="gray"
                                                            multiline={true}
                                                            keyboardType={'default'}
                                                            returnKeyType="done"
                                                            blurOnSubmit={true}
                                                            onChangeText={(text) => {
                                                                this._onChangeText(text)
                                                            }}
                                                        />
                                                        :
                                                        <Text style={{ width: '100%',color:checkResuilt?'green':'red' }}>
                                                            {checkResuilt ? 
                                                            <>
                                                                {
                                                                    <Text style={{
                                                                        fontSize: 17,
                                                                        fontWeight: '700'
                                                                    }}>
                                                                        {dataAnswerCheck}
                                                                    </Text>
                                                                }
                                                            </> 
                                                            : 
                                                            <Text style={{fontSize: 17, fontWeight: '700'}}>{this.state.textError}</Text>}
                                                        </Text>
                                                }
                                            </View>
                                        </View>
                                    </View>
                                    :
                                    <View style={{ marginTop: 30, flex: 1 }}>
                                        {
                                            numberHint == 2 &&
                                            <Text style={{
                                                // fontWeight: '700',
                                                fontSize: 20,
                                                color: '#fff',
                                                marginBottom: 20,
                                                fontFamily: 'iCielSoupofJustice'
                                            }}>ĐÁP ÁN ĐÚNG LÀ: </Text>
                                        }
                                        <View style={{
                                            backgroundColor: "#fff",
                                            height: height / 5,
                                            width: '100%',
                                            padding: 20,
                                            borderRadius: SmartScreenBase.smPercenWidth * 3,
                                        }}>
                                            {
                                                textButton == 'kiểm tra' ?
                                                    <TextInput
                                                        placeholder="Gõ câu dịch..."
                                                        style={{
                                                            fontSize: 17,
                                                            fontWeight: '700',
                                                            color: '#8E1C76',
                                                            height: '100%'
                                                        }}
                                                        autoCorrect={false}
                                                        placeholderTextColor="gray"
                                                        multiline={true}
                                                        keyboardType={'default'}
                                                        returnKeyType="done"
                                                        blurOnSubmit={true}
                                                        onChangeText={(text) => {
                                                            this._onChangeText(text)
                                                        }}
                                                    />
                                                    :
                                                    <Text style={{ width: '100%',color:(numberHint == 2||checkResuilt)?'green':'red' }}>
                                                        {
                                                            <Text style={{
                                                                fontSize: 17,
                                                                fontWeight: '700'
                                                            }}>
                                                            {numberHint == 2?LongQuestion[0]:dataAnswerCheck}
                                                            </Text>
                                                        }
                                                    </Text>
                                            }
                                        </View>
                                    </View>
                            }
                        </ScrollView>
                    </View>
                    <View style={{
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        paddingVertical:SmartScreenBase.smPercenHeight*2,
                        // backgroundColor: '#f00'
                    }}>
                        <View style={{ alignItems: "center", position: 'absolute', bottom: SmartScreenBase.smPercenHeight*6.5}}>
                            {check && (
                            <>
                                <FileSound showImage={checkResuilt ? "true" : "false"} />
                                <View style={{height: Platform.select({
                                    ios: !hint ? (SmartScreenBase.ratio > 1.95 ? SmartScreenBase.smPercenHeight*10 : SmartScreenBase.smPercenHeight*7) : 0,
                                    android: !hint ? (SmartScreenBase.ratio > 1.95 ? SmartScreenBase.smPercenHeight*10 : SmartScreenBase.smPercenHeight*7) : 0
                                })}}/>
                            </>
                            )}
                        </View>
                        {
                            !showKey &&
                            <TouchableOpacity onPress={() => this._OnPressCheckResuilt()}
                                style={dataAnswerCheck.length !== 0 ? stylesButton.Sty_Button : stylesButton.Sty_Button_disable}
                                disabled={dataAnswerCheck.length === 0}
                            >
                                <Text style={stylesButton.Sty_Text_Button}>{textButton.toUpperCase()}</Text>
                            </TouchableOpacity>
                        }
                    </View>
                </View>
                :
                <View style={{
                    backgroundColor: '#ffffff50',
                    width: width,
                    height: height,
                    justifyContent: 'center',
                    alignItems: 'center',
                    position: 'absolute'
                }}>
                    <ActivityIndicator size="small" color="blue" />
                    <Text style={{ fontSize: 17, color: 'blue' }}>Vui lòng đợi trong giây lát...</Text>
                </View>
        )
    }
}

function mapStateToProps(state) {
    return {

        Vocab: state.vocabularyReducers.vocabulary
    }
}

export default connect(mapStateToProps)(VocabB4Screen);
