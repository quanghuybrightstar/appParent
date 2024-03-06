import React, { Component } from "react";
import { Text, View, Dimensions, TouchableOpacity, ScrollView,TextInput,Image, ActivityIndicator, Animated, Alert, Platform } from "react-native";
import StyleLesson from "../StyleLesson";
import SmartScreenBase from "../../../../base/SmartScreenBase";
import FileSound from "../FileSound";
import SoundQuestion from '../../../SoundQuestion'
import { connect } from 'react-redux';
import stylesButton from '../../../../styleApp/stylesApp';
import stringUtils from '../../../../utils/stringUtils';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const { width, height } = Dimensions.get('window')
let Sound = require('react-native-sound');
Sound.setCategory('Playback');
let Audio;
let interval;

class VocabB5Screen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkResuilt: null,
            textAnswer: '',
            check: false,
            dataQuestion: [],
            LongQuestion: [],
            questionHint: [],
            dataAnswerCheck: '',
            Loadding: false,
            valueY: new Animated.Value(0),
            checkBoard: true,
            textButton: 'kiểm tra',
            numberAgain: 0,
            numberHint: 0,
            hint: false,
            audioLongQuestion: 0,
            play: 'pause',
            runSlider: 0,
            show: true,
            title: 'Listening and write',
            vi: false,
            valueAnser: '',
            loadAudio: false,
            score: 0,
            bottomShow:30,
            showKeyBoard:false,
        }
        this.isHintMod = false
    };

    componentWillMount() {
        this._getData()
        this.props.setVietNam('Nghe và chép chính tả.');
        this.props.setEnglish('Listen and write what you hear.');
    };

    _getData = async () => {
        try {
            const ressponse = await this.props.Vocab;
            let data = await this.convertData(ressponse.data.data_question);
            await this.setState({
                dataQuestion: data,
                Loadding: true,
                LongQuestion: data.question,
                questionHint: data.question,
            })
            Audio = new Sound(`${data.audio}`, null, (error) => {
                if (error) {
                    console.log('failed to load the sound', error);
                    return false;
                } else {
                    console.log('asdasdasda');
                    this.setState({ loadAudio: true })
                }
                this.setState({ audioLongQuestion: Audio.getDuration() })
            });
        } catch (error) {
            console.log(error);
            if (error.message === 'Network Error') {
                Alert.alert('Thông Báo', 'Vui lòng kiểm tra kết nối Internet');
            };
        };
        // await console.log(this.state.dataQuestion)
    };

    convertData = async (data) => {
        let dataConvert = [];
        let dataPush;
        data.map(async (item, index) => {
            dataPush = []
            let oj = {};
            let array = []
            let dataQ = item.en_vi_sentence.split(' ');
            for (let i = 0; i < dataQ.length; i++) {
                if (dataQ[i] != "") {
                    array.push(dataQ[i])
                }
            }
            oj.question = array;
            oj.questionVi = JSON.parse(item.en_vi_sentence_mean)[0];
            oj.audio = item.en_vi_sentence_audio,
                oj.image = JSON.parse(item.image)[0]
            dataConvert[index] = oj;
        })
        return dataConvert[this.props.index];
    };

    _renderItem = (item, index) => {
        return (
            <View style={{ paddingHorizontal: item.value && item.value != "" ? 20 : 30, borderWidth: 3, borderColor: '#fff', backgroundColor: '#F7AC16', marginBottom: 15, paddingVertical: item.value != "" ? 5 : 7, borderRadius: 25, marginRight: 5 }}>
                <Text style={{ fontSize: 16, fontWeight: '500' }}>{item.value}</Text>
            </View>
        )
    };

    _onChangeText = (text) => {
        this.setState({ dataAnswerCheck: text, valueAnser: text });
    };

    _OnPressCheckResuilt = async () => {
        const { textButton } = this.state;

        if (textButton == "kiểm tra") {
            await this._checkData()
        } else if (textButton == 'làm lại') {
            await this._again()
        } else {
            await this.props.SaveData(this.state.valueAnser, 5, this.state.score);
            this._next();
        }
    };
    _next=()=>{
        // this.props.methodScreen('5');
        this.props.setIndexQuestion(this.props.index + 1);
        this.props.plusindex()
        this.props.methodScreen('1')
    }
    _trimChar = (string) => {
        // string = string.replace('‘', '\'').replace(/[\u2018\u2019]/g, '\'');
        // while (string.charAt(string.length - 1) === '.' || string.charAt(string.length - 1) === ',') {
        //     string = string.substring(0, string.length - 1).trim();
        // }
        // return string;
        return stringUtils.validWord(string);
    };

    // Check đúng sai
    _checkData = async () => {
        // this.scrollView.scrollTo(0)
        const { dataAnswerCheck, LongQuestion, questionHint, numberHint } = this.state;
        const convertData = []
        // let dataC = this._trimChar(dataAnswerCheck.trim());
        
        console.log("====questionHint",LongQuestion)
        var cachedataAnswer = []
        dataAnswerCheck.split(' ').forEach(element => {
            cachedataAnswer.push({
                value: element
            })
        });
        var removeNode = dataAnswerCheck.replace(".","");
        var removeFull = stringUtils.validWord(removeNode);

        var kqFull = []

        LongQuestion.forEach(element => {
            kqFull.push(stringUtils.validWord(element))
        });

        console.log("====ans",dataAnswerCheck)
        console.log("====ansNode",removeFull)
        console.log("====kqFull",kqFull)

        await removeFull.split(' ').map((item, index) => {
            convertData.push(item)
        })
        console.log('cvData',convertData);
        await convertData.map((item, index) => {
            let oj = {}
            oj.value = item;
            oj.color = "red";
            convertData[index] = oj
            if (kqFull[index]) {
                if (this._trimChar(kqFull[index]) == this._trimChar(item)) {
                    oj.value = item;
                    oj.color = "green";
                    convertData[index] = oj
                }
            }
        })
        if (convertData.length != kqFull.length) {
            if (numberHint < 2) {
                // this.scrollView.scrollToEnd({ animated: true })
                await this.setState({ dataAnswerCheck: cachedataAnswer, check: true, checkResuilt: false, textButton: 'làm lại' })

            } else {
                await this.setState({ hint: false, dataAnswerCheck: questionHint, check: false, checkResuilt: false, textButton: 'tiếp tục' })
            }
        } else {
            let check = convertData.findIndex(e => e.color == 'red');
            if (check > -1) {
                if (numberHint < 2) {
                    // this.scrollView.scrollToEnd({ animated: true })
                    await this.setState({ dataAnswerCheck: cachedataAnswer, check: true, checkResuilt: false, textButton: 'làm lại' })
                } else {
                    console.log(check)
                    await this.setState({ hint: false, dataAnswerCheck: questionHint, check: false, checkResuilt: false, textButton: 'tiếp tục' })
                }
            } else {

                await this.setState({ score: 1, dataAnswerCheck: cachedataAnswer, check: true, checkResuilt: true, textButton: 'tiếp tục' })
            }
        }
    };

    _again = async () => {
        // this.scrollView.scrollTo(0)
        const { numberAgain, hint, numberHint } = this.state
        if (!hint) {
            if (numberAgain < 1) {
                await this.setState({ dataAnswerCheck: "", check: false, checkResuilt: false, textButton: 'kiểm tra', numberAgain: numberAgain + 1 })
            } else {
                this.props.hideTypeExercise()
                this.isHintMod = true
                let dataHint = await this._hint()
                await this.setState({
                    questionHint: dataHint,
                    dataAnswerCheck: "",
                    check: false,
                    checkResuilt: false, textButton: 'kiểm tra',
                    numberAgain: numberAgain + 1,
                    hint: true,
                    numberHint: numberHint + 1
                })
            }
        } else {
            let dataHint = await this._hint()
            await this.setState({
                questionHint: dataHint,
                dataAnswerCheck: "", check: false,
                checkResuilt: false, textButton: 'kiểm tra',
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
            backgroundColor: 'red'
        })
    }
    _hint = async () => {
        const { LongQuestion, questionHint, dataAnswerCheck, numberHint } = this.state;
        let check = true;
        let data = [...questionHint];
        let dataCheck = [...dataAnswerCheck];
        LongQuestion.forEach((Element, index) => {
            if (dataCheck[index]) {
                if (dataCheck[index].color == 'green') {
                    data[index] = {
                        value: Element,
                        color: 'green'
                    }
                }
            }
        })
        let setnumberHint = await this._setNumberHint(data);
        if (numberHint < 2) {
            let number = 0;
            console.log(setnumberHint)
            LongQuestion.forEach((e, i) => {
                if (number < setnumberHint) {
                    if (!data[i].value) {
                        data[i] = {
                            value: e,
                            color: 'green'
                        }
                        number++
                    }
                }
            })

        } else {
            LongQuestion.map((dataAll, indexAll) => {
                let oj = {};
                oj.value = dataAll;
                oj.color = "green"
                data[indexAll] = oj
            })
        }
        return data
    }
    _setNumberHint = (data) => {
        const { LongQuestion, questionHint, dataAnswerCheck, numberHint } = this.state;
        let number = 0
        data.forEach((Element) => {
            if (Element.value) {
                number++
            }
        })
        let numberH;
        if (numberHint == 0) {
            numberH = (LongQuestion.length - number) / 100 * 50
        } else {
            numberH = (LongQuestion.length - number) / 100 * 100
        }
        return Math.round(numberH);
    }
    setTime = () => {
        const { play, runSlider, audioLongQuestion } = this.state
        interval = setInterval(() => {
            let time;
            if (play == 'play') {
                Audio.getCurrentTime(async (seconds, isPlaying) => {
                    this.setState({ runSlider: seconds })
                    time = seconds + 0.15
                    if (time > audioLongQuestion) {
                        await this.setState({ play: 'pause', runSlider: 0 })
                        Audio.pause();
                        Audio.setCurrentTime(0);
                    }
                });
            } else {
                clearInterval(interval)
            }
        }, 200);
    };

    play = async () => {
        await this.setState({ play: 'pause' });
        Audio.pause();
        await this.setTime()
    };

    pause = async () => {
        await this.setState({ play: 'play' });
        Audio.play()
        this.setTime()
    };
    _changeValue = async (value) => {
        await Audio.setCurrentTime(value)
        await this.setState({ runSlider: value, play: 'pause' })
        await Audio.pause()

    }
    _changeTitle = () => {
        if (!this.state.vi) {
            this.setState({ title: 'Nghe và chép chính tả', vi: true })
        } else {
            this.setState({ title: 'Listening and write', vi: false })
        }
    }
    
    showQuestion = () => {
        const { check, checkResuilt, bottomShow, Loadding, numberAgain, valueY, play, hint, numberHint, runSlider, dataQuestion, textButton, questionHint, dataAnswerCheck } = this.state
        return(
            <KeyboardAwareScrollView enableOnAndroid={true}>
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
                                            <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#fff' }}>Viết lại câu sau</Text>
                                            <View style={{
                                                backgroundColor: "#fff",
                                                height: '80%',
                                                width: '100%',
                                                padding: 20,
                                                borderRadius: 25,
                                                marginTop: 5
                                            }}>
                                                {
                                                    textButton == 'kiểm tra' ?
                                                        <TextInput
                                                            placeholder="Gõ lại câu nghe được..."
                                                            style={{ fontSize: 17, fontWeight: '700', color: '#8E1C76', height: '100%' }}
                                                            placeholderTextColor="gray"
                                                            multiline={true}
                                                            keyboardType={'default'}
                                                            returnKeyType="done"
                                                            blurOnSubmit={true}
                                                            autoCorrect={false}
                                                            onChangeText={(text) => { this._onChangeText(text) }}
                                                        />
                                                        :
                                                        <Text style={{ width: '100%',color:checkResuilt?'green':'red' }}>
                                                            {
                                                                dataAnswerCheck.map((item, index) => {
                                                                    return (
                                                                        <Text 
                                                                        style={{ 
                                                                            //color: item.color, 
                                                                            fontSize: 17, 
                                                                            fontWeight: '700' }}
                                                                        >
                                                                            {index == 0 ? item.value.substr(0,1).toUpperCase() + item.value.substr(1) : ' ' + item.value}
                                                                        </Text>
                                                                    )
                                                                })
                                                            }
                                                        </Text>
                                                }
                                            </View>
                                        </View>
                                    </View>
                                    :
                                    <View style={{ marginTop: 30 }}>
                                        {
                                            numberHint == 2 &&
                                            <Text style={{ fontSize: 24, color: '#fff', marginBottom: 20, fontFamily: 'iCielSoupofJustice' }}>ĐÁP ÁN ĐÚNG LÀ: </Text>
                                        }
                                        <View style={{ backgroundColor: "#fff", height: height / 5, width: '100%', padding: 20, borderRadius: 25, }}>
                                            {
                                                textButton == 'kiểm tra' ?
                                                    <TextInput
                                                        ref={refs => this.input = refs}
                                                        placeholder="Gõ lại câu nghe được..."
                                                        style={{ 
                                                            fontSize: 17, 
                                                            fontWeight: '700', 
                                                            color: '#8E1C76', 
                                                            height: '100%' 
                                                        }}
                                                        placeholderTextColor="gray"
                                                        multiline={true}
                                                        keyboardType={'default'}
                                                        returnKeyType="done"
                                                        blurOnSubmit={true}
                                                        autoCorrect={false}
                                                        onChangeText={(text) => { this._onChangeText(text) }}
                                                    />
                                                    :
                                                    <Text style={{ width: '100%',color:(numberHint == 2||checkResuilt)?'green':'red'  }}>
                                                        {
                                                            dataAnswerCheck.map((item, index) => {
                                                                return (
                                                                    <Text style={{ 
                                                                        //color: item.color, 
                                                                        fontSize: 17, 
                                                                        fontWeight: '700' 
                                                                    }}>
                                                                        {index == 0 ? item.value.substr(0,1).toUpperCase() + item.value.substr(1) : ' ' + item.value}
                                                                    </Text>
                                                                )
                                                            })
                                                        }
                                                    </Text>
                                            }
                                        </View>
                                    </View>
                            }
                <View style={{ justifyContent: "flex-end", alignSelf: "center", alignItems: "center", margin: height / 19,marginBottom:height/8 }}>
                    <View style={{ alignItems: "center", width: SmartScreenBase.smPercenWidth * 40 }}>
                        {check && (
                            <FileSound showIcon={"none"} showImage={checkResuilt ? "true" : "false"} />
                        )}
                    </View>
                </View>
            </KeyboardAwareScrollView>
        )
    }

    render() {
        const { check, checkResuilt, bottomShow, Loadding, numberAgain, valueY, play, hint, numberHint, runSlider, dataQuestion, textButton, questionHint, dataAnswerCheck } = this.state
        return (
            Loadding ?
                <View style={[StyleLesson.HeightExercise,{
                    flex:1,
                }]}>
                    <View style={{marginLeft: -SmartScreenBase.smPercenWidth*5}}>
                    <SoundQuestion Audio={dataQuestion.audio}/></View>
                    <View style={{height: hint? (SmartScreenBase.ratio > 1.95 ? SmartScreenBase.smPercenHeight*75 : SmartScreenBase.smPercenHeight*70) 
                        : textButton == 'tiếp tục' && !this.state.checkResuilt ? (SmartScreenBase.ratio > 1.95 ? SmartScreenBase.smPercenHeight*75 : SmartScreenBase.smPercenHeight*70)
                        : (SmartScreenBase.ratio > 1.95 ? SmartScreenBase.smPercenHeight*60 : SmartScreenBase.smPercenHeight*55)}}>
                        {this.showQuestion()}
                    </View>
                <View style={{ 
                            justifyContent: 'center', 
                            alignItems: 'center', 
                        }}>
                            <TouchableOpacity 
                            disabled={dataAnswerCheck.length == 0}
                            style={[dataAnswerCheck.length == 0?stylesButton.Sty_Button_disable:stylesButton.Sty_Button]}
                            onPress={() => { this._OnPressCheckResuilt() }}
                        >
                            <Text style={stylesButton.Sty_Text_Button}>{textButton.toUpperCase()}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                :
                <View style={{width: width, height: height, justifyContent: 'center', alignItems: 'center', position: 'absolute' }}>
                    <ActivityIndicator size="small" color="#ffffff" />
                    <Text style={{ fontSize: 17, color: '#ffffff' }}>Vui lòng đợi trong giây lát...</Text>
                </View>
        )
    }
}
function mapStateToProps(state) {
    return {
        Vocab: state.vocabularyReducers.vocabulary
    }
}
export default connect(mapStateToProps)(VocabB5Screen);
