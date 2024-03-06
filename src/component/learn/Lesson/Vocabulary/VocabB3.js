import React, { Component } from "react";
import {
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator,
    Image,
    Alert,
    Keyboard,
    Animated,
    Platform,
    TextInput, FlatList, ScrollView
} from "react-native";
import SmartScreenBase from "../../../base/SmartScreenBase";
// import TypeExercise from "../Component/TypeExercise";
import FileSound from "../FileSound";
import { connect } from 'react-redux';
// import Sound from 'react-native-sound';
import stylesButton from '../../../../styleApp/stylesApp';
import Sound from "react-native-sound";
import LogBase from "../../../../base/LogBase";
import stringUtils from "../../../../utils/stringUtils";
import { MonoTextInput } from "../../../../componentBase/MonoTextInput/MonoTextInput";

Sound.setCategory('Playback');
const { width, height } = Dimensions.get('window');

class VocabB3Screen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkResuilt: null,
            checkInput: false,
            textAnswer: '',
            check: false,
            indexSuggest: -1,
            ShowSuggest: false,
            dataQuestion: [],
            Loading: false,
            textQuestionLong: [],
            monoInputData: [],
            valueAnswer: [{ "value": '' }],
            turnAnswer: 0,
            checkQuestion: 0,
            textButton: 'KIỂM TRA',
            suggestions: false,
            numberAnswer: 0,
            hint: [{}],
            textValue: [{}],
            valueY: new Animated.Value(0),
            title: 'Write the word in English',
            vi: false,
            checkKey: false,
            spaceList: [],
            score: 0,
            animatedValue: new Animated.Value(0),
            bottomShowKey: 0,
            checkButton : false,
            indexSug : 0
        }
        this.monoInput = {};
        this.showKeyb = null
        this.hideKeyb = null
    };

    componentDidMount = () => {
        this._getData();
        this.props.setVietNam('Viết từ tiếng Anh tương ứng với tranh.');
        this.props.setEnglish('Write the English words for the picture.');
        this.showKeyb = Keyboard.addListener('keyboardDidShow', () => this._showKeyBoad());
        this.hideKeyb = Keyboard.addListener('keyboardDidHide', () => this._HideKeyBoad())
    };

    componentWillUnmount(){
        this.showKeyb.remove()
        this.hideKeyb.remove()
    }

    _showKeyBoad = () => {
        this.props.hideTypeExercise()
        this.setState({ checkKey: true, bottomShowKey: height / 5 })
        Animated.timing(
            this.state.valueY,
            {
                toValue: height / 50,
                duration: 200,
            }
        ).start();
    };
    _HideKeyBoad = () => {
        this.props.showTypeExercise()
        this.setState({ checkKey: false, bottomShowKey: 30 })
        Animated.timing(
            this.state.valueY,
            {
                toValue: 0,
                duration: 200,
            }
        ).start();
    };
   
    _getData = async () => {
        try {
            const ressponse = await this.props.Vocab;
            await this.setState({ data: ressponse.data })
            let data = await this.convertData(ressponse.data.data_question);
            let question = await this._convertQuestiton(data.vocabulary)
            LogBase.log("=====_convertQuestiton",data.vocabulary)
            let textValueFirst = [];
            question.forEach(e=>{
                let obj = {}
                obj.value = ""
                obj.color = "#fff"
                textValueFirst.push(obj)
            })

            await this.setState({
                dataQuestion: data,
                Loading: true,
                textQuestionLong: question,
                textValue : textValueFirst,
                monoInputData : data.vocabulary.trim().split('')
            });
            console.log(this.state.textValue,"first")
        } catch (error) {
            console.log(error);
            if (error.message === 'Network Error') {
                Alert.alert('Thông Báo', 'Vui lòng kiểm tra kết nối Internet');
            }
        }
    };

    convertData = (data) => {
        let dataConvert = [];
        data.map((item, index) => {
            let dataQ = {};
            dataConvert[index] = dataQ;
            var imgWord = JSON.parse(item.image).find(ele => ele.includes('944x554'));
            let imageQuestion = imgWord ? imgWord : JSON.parse(item.image)[0];
            dataQ.image = imageQuestion;
            dataQ.audio = item.audio;
            dataQ.vocabulary = item.vocabulary;
            dataQ.spell = item.spell;
        });
        return dataConvert[this.props.index];
    };

    _convertQuestiton = (data) => {
        let test = data;
        let string = test.split(' ');
        let textQuestion = [];
        string.map((item, index) => {
            let a = item.split('')
            for (let i = 0; i < a.length; i++) {
                textQuestion.push(a[i]);
            }
        });
        this.setState({ spaceList: this.getSpaceList(data) });
        console.log(data.indexOf(' ', 1));
        console.log(textQuestion);
        return textQuestion;
    };

    getSpaceList=(data)=>{
        data = data.trim();
        var mlist = []
        var sl = 0
        for (let index = 0; index < data.length; index++) {
            if(data[index] == " "){
                console.log(index,"index")
                mlist.push(index-sl);
                sl = sl + 1
            }
        }
        LogBase.log("=====getSpaceList",mlist)
        return mlist;
    }


    inputs = {};
    focusTheField = async (id) => {
        await this.inputs[id]?.focus();
    }
    // _renderItem = ({ item, index }) => {
    //     const { textValue, } = this.state;
    //     return (
    //         <View onStartShouldSetResponder={() => Keyboard.dismiss()}
    //             style={{
    //                 marginRight: SmartScreenBase.smPercenWidth * 2,
    //                 alignItems: "center",
    //                 width: SmartScreenBase.smPercenWidth * 8,
    //                 borderBottomWidth: 2,
    //                 borderColor: 'lightgray',
    //                 marginLeft: this.state.spaceList.length > 0 && this.state.spaceList.find(c => c == index) ? 30 : 0
    //             }}>
    //             {
    //                 this.state.textButton === 'KIỂM TRA' ?
    //                     <TextInput
    //                         ref={input => {
    //                             this.inputs[`${index}`] = input
    //                         }}
    //                         maxLength={1}
    //                         autoCorrect={false}
    //                         style={{
    //                             fontWeight: "bold",
    //                             fontSize: SmartScreenBase.smPercenHeight * 3,
    //                             marginBottom: SmartScreenBase.smPercenWidth,
    //                             color: textValue[index] && textValue[index].color ? textValue[index].color : '#fff',
    //                             ...Platform.select({
    //                                 android: {
    //                                     padding: 0
    //                                 }
    //                             })
    //                         }}
    //                         onKeyPress={({ nativeEvent }) => {
    //                             if (nativeEvent.key === 'Backspace'
    //                                 && (!textValue[index].value || textValue[index].value.length === 0)
    //                             ) {
    //                                 this._checkDelete(index)
    //                             }
    //                         }}
    //                         onChangeText={(text) => {
    //                             this._changeText(text, index);
    //                         }}
    //                         value={textValue[index] && textValue[index].value ? textValue[index].value.toUpperCase() : ''}
    //                     />
    //                     :
    //                     <Text style={{
    //                         fontWeight: "bold",
    //                         fontSize: SmartScreenBase.smPercenHeight * 3,
    //                         marginBottom: SmartScreenBase.smPercenWidth,
    //                         color: textValue[index] && textValue[index].color ? textValue[index].color : '#fff',
    //                         ...Platform.select({
    //                             android: {
    //                                 padding: 0
    //                             }
    //                         })
    //                     }}>{textValue[index] && textValue[index].value ? textValue[index].value.toUpperCase() : ''}</Text>
    //             }
    //         </View>
    //     )
    // }

    _checkDelete = async (index) => {
        this._checkButton(this.state.textValue);
        if (index > 0) {
            await this.focusTheField(index - 1);
        }

    }

    // _changeText = async (string, index) => {
    //     console.log("index:" + index);
    //     if (string.length == 1) {
    //         const { textQuestionLong, valueAnswer } = this.state;
    //         let data = await this._setText(string, index);
    //         await this.setState({ valueAnswer: data, textValue: data, textQuestionLong: this.state.textQuestionLong });
    //         await this.focusTheField(index + 1);
    //     } else {
    //         if (string.length > 1) {
    //             await this.focusTheField(index + 1)
    //         } else {
    //             console.log("xoa1");
    //             let data = await this._setText(string, index);
    //             await this.setState({
    //                 valueAnswer: data,
    //                 textValue: data,
    //                 textQuestionLong: this.state.textQuestionLong
    //             });
    //              await this.focusTheField(index - 1)
    //         }
    //     }
    //     this._checkButton(this.state.textValue)
    // }

    updateText = (data) => {
        // if (string.length == 1) {
        //     let data = await this._setText(string, index);
        //     await this.setState({ 
        //         valueAnswer: data, 
        //         textValue: data, 
        //         // textQuestionLong: this.state.textQuestionLong 
        //     });
        // } else {
        //     if (string.length > 1) {
        //     } else {
        //         let data = await this._setText(string, index);
        //         await this.setState({
        //             valueAnswer: data,
        //             textValue: data,
        //             // textQuestionLong: this.state.textQuestionLong
        //         });
        //     }
        // }
        // this._checkButton(this.state.textValue)
        var mList = []
        var isShowBT = true
        data.forEach(element => {
            if(element.status != 'Voice'){
                var mono = {
                    value: element.mChar,
                    color: '#fff'
                }
                mList.push(mono)

                if(element.mChar == '') isShowBT = false
            }
        });
        this._checkButton(mList, isShowBT)
    }

    _checkButton = (value, isShowBT)=>{
        LogBase.log("=====_checkButton",value)
        this.setState({
            checkButton: isShowBT,
            textValue: value,
            valueAnswer: value
        })

    }


    _setText = (string, index) => {

        var strSet = string
        if(strSet.toLowerCase() == 'ư') strSet = 'w'

        const { valueAnswer, textQuestionLong, textValue } = this.state
        let data = textValue;
        let array = [...this.state.hint]
        if (textValue.length < index + 1) {
            for (var i = 0; i < index + 1; i++) {
                data[i] = {};
            }

        }
        if (data.length < textQuestionLong.length) {
            data[index].value = strSet;
            data[index].color = '#fff'
            if (data[index + 1] == null) {
                data[index + 1] = {}
            }

        }
        if (array.length < textQuestionLong.length) {
            array[index + 1] = {}
        }
        if (textValue.length == textQuestionLong.length) {
            if (textValue[index].value) {
                data[index].value = strSet;
                data[index].color = '#fff'
            } else {
                data[index].value = strSet;
                data[index].color = '#fff'
            }
        }
        if (strSet == "") {
            if (textValue[index].value) {
                data[index].value = strSet;
            } else {
                data[index].value = strSet;
            }
        }
        if(this.state.indexSug != 1 && this.state.indexSug != 2){
             this.setState({ hint: array })
        }

        return data
    }

    _checkAnswer = async (value) => {
        const { valueAnswer, numberAnswer, textQuestionLong, suggestions, checkQuestion, turnAnswer, textValue, textButton } = this.state;
        let number = 0;
        if (value == "KIỂM TRA") {
            textValue.map(async (item, index) => {
                LogBase.log("_checkAnswer",stringUtils.compareComma(item.value.toLowerCase())+" vs "+stringUtils.compareComma(textQuestionLong[index].toLowerCase()))
                LogBase.log("=====kh",item.value.toLowerCase().charCodeAt(0))
                LogBase.log("=====khai",textQuestionLong[index].charCodeAt(0))
                if (stringUtils.compareComma(item.value.toLowerCase()) == stringUtils.compareComma(textQuestionLong[index].toLowerCase())) {
                    number = number + 1
                    textValue[index].color = "Right";
                    await this.setState({ checkQuestion: number, check: true })
                } else {
                    textValue[index].color = "Wrong"
                    if (checkQuestion != 0) {
                        this.setState({ checkQuestion: checkQuestion - 1 });
                    }
                }
            });
            this.monoInput.current?.showResult(textValue)
            this.setState({ turnAnswer: turnAnswer + 1, check: true });
            this.scroll.scrollToEnd();
            if (number !== textQuestionLong.length) {
                if (numberAnswer < 2) {
                    await this.setState({ textButton: 'LÀM LẠI' })
                    number = 0
                } else {
                    await this.setState({ textButton: 'TIẾP TỤC', })
                }
            } else {
                this.setState({ score: 1 });
                await this.setState({ textButton: 'TIẾP TỤC' })
            }
        } else if (value == 'LÀM LẠI') {
            this.monoInput.current?.createData()
            Keyboard.dismiss()
            this._answerAgain()
        } else {
            this._complete()
        }
    }

    _complete = async () => {
        let array = [...this.state.valueAnswer]
        let arrayValue = []
        array.forEach(element => {
            arrayValue.push(element.value)
        })
        await this.props.SaveData(arrayValue.join(''), 3, this.state.score)
        this.props.methodScreen('6');
    };

    _answerAgain = async () => {
        const { valueAnswer, textQuestionLong, turnAnswer, suggestions, numberAnswer } = this.state;
        this.setState({ check: false })
        let valueAgainAnswer = [{}]
        if (turnAnswer < 1) {
            await this.setState({ valueAnswer: [{ "value": '' }], textValue: [{ "value": '' }], textButton: 'KIỂM TRA' })
            await this.focusTheField(0)
        } else {
            if (1 == turnAnswer) {
                await this.setState({checkButton: false})
                await valueAnswer.map(async (item, index) => {
                    let a = item.value.toLowerCase()
                    if (valueAgainAnswer.length < textQuestionLong.length) {
                        if (a == textQuestionLong[index]) {
                            valueAgainAnswer[index].value = item.value;
                            valueAgainAnswer[index].color = "#388C02";
                            valueAgainAnswer[index + 1] = {}
                        } else {
                            valueAgainAnswer[index].value = "";
                            valueAgainAnswer[index].color = "#fff"
                            valueAgainAnswer[index + 1] = {}
                        }
                    }
                    if (valueAgainAnswer.length == textQuestionLong.length) {
                        if (a == textQuestionLong[index]) {
                            valueAgainAnswer[index].value = item.value;
                            valueAgainAnswer[index].color = "#388C02";
                        } else {
                            valueAgainAnswer[index].value = "";
                            valueAgainAnswer[index].color = "#fff";
                        }
                    }
                });
                if (suggestions) {
                    this._tunrN(this.state.hint)
                } else {
                    await this.setState({ textValue: [{}], valueAnswer: valueAgainAnswer, textButton: 'KIỂM TRA' });
                    await this.focusTheField(0)

                }
            } else {
                await this.setState({ suggestions: true,indexSug : this.state.indexSug +1, checkButton: false})
                if(this.state.indexSug == 1 || this.state.indexSug ==2){
                    this._setHint();
                }else{
                    await this._tunrN(this.state.hint)
                }

               
                
            }
        }
    }


    _setHint=()=>{
        console.log("herre")
        const {indexSug,textQuestionLong,numberAnswer,suggestions} = this.state;
        let numSet = 0;
        if(indexSug == 1){
            numSet = Math.round(textQuestionLong.length/2)
        }else if( indexSug == 2){
          numSet = textQuestionLong.length;
        }
        let creHint = [];
        for (let i = 0; i < numSet; i++) {
            let obj = {};
            obj.color = "#388C02";
            obj.value = textQuestionLong[i];
            creHint.push(obj);
        }
        this.setState({
            hint : creHint
        })
        if(suggestions){
            this.setState({
                numberAnswer: numberAnswer + 1
            })
        }
        if(numberAnswer< 2){
            this.setState({
                textValue: [{}],
                valueAnswer: creHint,
                textButton: 'KIỂM TRA',
            });
        }else{
            this.setState({ valueAnswer: creHint, textButton: 'TIẾP TỤC', });

        }

    }
  
    random = () => {
        const { textQuestionLong } = this.state
        return textQuestionLong[Math.floor(Math.random() * textQuestionLong.length)]
    }
    _tunrN = async (data) => {
        const { textQuestionLong, valueAnswer, suggestions, numberAnswer } = this.state;
        let dataSuggestions = data;
        let number = 0;
        let check = true;
        let count = 0;
        await valueAnswer.map(async (item, index) => {
            let a = item.value.toLowerCase()
            if (a == textQuestionLong[index].toLowerCase()) {
                dataSuggestions[index].value = item.value;
                dataSuggestions[index].color = "#388C02";
            }
        });


        if (suggestions) {
            this.setState({
                numberAnswer: numberAnswer + 1
            })
        }
        let numberHint = await this._numberHint(dataSuggestions, numberAnswer);
        if (numberAnswer < 2) {
            let number = 0;

            textQuestionLong.forEach((element, index) => {
                if (number < numberHint) {
                    if (!dataSuggestions[index].value) {
                        dataSuggestions[index].value = element;
                        dataSuggestions[index].color = "#388C02";
                        number++
                    }
                }
            })
            await this.setState({
                textValue: [{}],
                hint: dataSuggestions,
                valueAnswer: dataSuggestions,
                textButton: 'KIỂM TRA',
            });
            await this.focusTheField(0)
        } else {
            dataSuggestions.map((item, index) => {
                let oj = {};
                oj.color = "#388C02";
                oj.value = textQuestionLong[index].toUpperCase();
                dataSuggestions[index] = oj;
            });
            await this.setState({ valueAnswer: dataSuggestions, hint: dataSuggestions, textButton: 'TIẾP TỤC', });
        }
    }
    _numberHint = (data, turn) => {
        const { valueAnswer } = this.state;
        let number = 0
        data.forEach(element => {
            if (element.color == '#388C02') {
                number = number + 1
            }
        });
        let numberHint
        if (turn == 0) {
            numberHint = (valueAnswer.length - number) / 100 * 50
        } else {
            numberHint = (valueAnswer.length - number) / 100 * 100
        }
        return Math.round(numberHint)
    }
    _suggestions = () => {
        this.setState({
            suggestions: true,
            numberAnswer: 1,
            check: false
        });
        this._tunrN(this.state.hint);
    }
    _changeTitle = () => {
        if (!this.state.vi) {
            this.setState({ title: "Viết từ bằng tiếng Anh", vi: true })
        } else {
            this.setState({ title: 'Write the word in English', vi: false })
        }
    }
    formatUrl=(url)=>{
        if(!url) return url;
        return url.replace('\n','');
    }

    render() {
        const { turnAnswer, bottomShowKey, check, Loading, dataQuestion, valueY, suggestions, hint, textQuestionLong, valueAnswer, checkQuestion, textButton, textValue } = this.state;
        return (
            Loading ?
                <View style={{ 
                    height: SmartScreenBase.smPercenHeight * (Platform.OS==='android'?70:73),
                }}>
                    <View style={{ 
                        alignSelf: "center", 
                        flex: 1 
                    }}
                        onStartShouldSetResponder={() => Keyboard.dismiss()}>
                        <Animated.View onStartShouldSetResponder={() => Keyboard.dismiss()} 
                            style={{ 
                                flex:1,
                                marginTop: SmartScreenBase.smPercenHeight * 2, 
                            }}
                        >
                            <ScrollView style={{ flex: 1}} 
                                contentContainerStyle={{ paddingBottom: bottomShowKey}} 
                                ref={(scroll) => { this.scroll = scroll; }}
                            >
                                <View style={{
                                    alignItems:'center',
                                }}>
                                    {/* {console.log("=====formatUrl",this.formatUrl(dataQuestion.image),dataQuestion.image)} */}
                                    <Image style={{
                                        width: Math.floor(SmartScreenBase.smBaseWidth * 947),
                                        height: Math.floor(SmartScreenBase.smBaseWidth * 557),
                                        borderRadius:20,
                                        borderWidth:5,
                                        borderColor:'#fff',
                                        resizeMode: Platform.OS==='ios'?'stretch': 'cover'
                                    }}
                                        source={{ uri: `${this.formatUrl(dataQuestion.image)}` }} />
                                </View>
                                <View style={{ width }}>
                                    <View style={{ alignSelf: "center", }}
                                        onStartShouldSetResponder={() => Keyboard.dismiss()}>
                                        {/* {LogBase.log("=====textQuestionLong",textQuestionLong)} */}
                                        <MonoTextInput data={this.state.monoInputData} updateText={(mData)=>this.updateText(mData)} ref={this.monoInput}/>
                                        {/* <View style={{ flexDirection: "row", }}>
                                            <FlatList
                                                data={textQuestionLong}
                                                renderItem={this._renderItem}
                                                horizontal={false}
                                                extraData={valueAnswer}
                                                keyExtractor={(item, index) => index.toString()}
                                                numColumns={8}
                                                style={{ marginTop: 10, paddingVertical: 10, alignSelf: 'center' }}
                                            />
                                        </View> */}
                                    </View>
                                </View>
                                <View>
                                    {
                                        suggestions &&
                                        <View style={{
                                            flexDirection: 'row',
                                            width: '100%',
                                            justifyContent: 'center',
                                            paddingHorizontal: '8%'
                                        }} onStartShouldSetResponder={() => Keyboard.dismiss()}>
                                            <View style={{ flexDirection: 'row', flexWrap: 'wrap', width: '100%' }}>
                                                {
                                                    textQuestionLong.map((item, index) => {
                                                        return (
                                                            <View style={{
                                                                borderRadius: 7,
                                                                marginRight: SmartScreenBase.smPercenWidth * 2,
                                                                minHeight: SmartScreenBase.smPercenHeight * 4,
                                                                width: SmartScreenBase.smPercenWidth * 8,
                                                                backgroundColor: '#fff',
                                                                marginTop: 10,
                                                                marginLeft: this.state.spaceList.length > 0 && this.state.spaceList.find(c => c == index) ? 30 : 0
                                                            }}>
                                                                <Text style={{
                                                                    fontWeight: "bold",
                                                                    fontSize: SmartScreenBase.smPercenHeight * 3,
                                                                    marginBottom: SmartScreenBase.smPercenWidth,
                                                                    width: '100%',
                                                                    textAlign: 'center'
                                                                }}>
                                                                    {hint[index] && hint[index].color && hint[index].color == "#388C02" ? hint[index].value.toUpperCase() : ''}
                                                                </Text>
                                                            </View>
                                                        )
                                                    })
                                                }
                                            </View>
                                        </View>
                                    }
                                </View>
                                <View style={{ 
                                    height: SmartScreenBase.smPercenHeight * 13, 
                                    alignItems:'center',width:'100%',marginTop:5 
                                }}>
                                    {
                                        check && <FileSound 
                                            showImage={(checkQuestion == textQuestionLong.length).toString()} />
                                    }
                                </View>
                            </ScrollView>
                        </Animated.View>
                        <View style={{
                            alignSelf: "center",
                            justifyContent: 'center',
                            paddingVertical:SmartScreenBase.smPercenHeight*2
                        }}>
                            <TouchableOpacity
                                style={!this.state.checkButton ? stylesButton.Sty_Button_disable : stylesButton.Sty_Button}
                                disabled={!this.state.checkButton}
                                onPress={() => this._checkAnswer(textButton)}
                            >
                                <Text style={stylesButton.Sty_Text_Button}>{textButton}</Text>
                            </TouchableOpacity>
                        </View>
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

export default connect(mapStateToProps)(VocabB3Screen);
