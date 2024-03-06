import React, { Component } from "react";
import { Text, View, TouchableWithoutFeedback, Animated, TouchableOpacity, Image, Dimensions, ActivityIndicator, ScrollView, ImageBackground } from "react-native";
import TypeExercise from "../Component/TypeExercise";
import SmartScreenBase from "../../../base/SmartScreenBase";
import stylesApp from "../../../styleApp/stylesApp";
import ButtonCheck from "../../../items/ButtonCheck";
import { connect } from 'react-redux';
import stylesButton from '../../../../styleApp/stylesApp';
import FileSound from "../FileSound";
import FileSound4 from "../FileSound4";
import axios from 'axios'
import Sound from 'react-native-sound';
import LogBase from "../../../../base/LogBase";
import { FullScreenLoadingIndicator } from "../../../../componentBase/indicator/FullScreenLoadingIndicator";

Sound.setCategory('Playback')
const { width, height } = Dimensions.get('window')
class VocabB7Screen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refresh: false,
            DropZoneValue: null,
            checkResuilt: null,
            check: false,
            ShowCheck: false,
            CheckShowResuilt: false,
            checkDrag: true,
            keyGrant: -1,
            checkPanresponder: true,
            HeightType: 0,
            data: {
                word: ["", "", "", ""],
                mean: ["For direction", "A stick", "Use when you're hurt", "A weapon"]
            },
            Answer: ["For direction", "A stick", "Use when you're hurt", "A weapon"],
            mean2: [],
            Loading: true,
            title: 'Drag to match the meaning with the suitable word',
            vi: false,
            keyChose: null,
            disabled: false,
            showResult: false
        },
        this.ListDropZone = [];
        this.ListPanRes = [];
        this.ListPanResPonder = [];
        this.ListCheckAnswer = [];
        this.ListCheck = [];
        this.ListAnswer = [];
        this.Opacity = [];
        this.choose = []
    }
    componentWillMount() {
        for (let index = 0; index < this.state.data.word.length; index++) {
            let PanRes = new Animated.ValueXY();
            this.ListDropZone.push(this.state.DropZoneValue);
            this.ListPanRes.push(PanRes);
            this.ListCheckAnswer.push(false);
            this.Opacity.push(false);
            this.choose.push(false)
        };
    };
    componentDidMount = () => {
        this.props.setVietNam('Ghép từ với nghĩa thích hợp.');
        this.props.setEnglish('Match the word with its suitable meaning.');
        this._getData()
    }
    _getData = async () => {
        let data2 = []
        try {
            const ressponse = await this.props.Vocab
            let dataConvert = await this.convertData(ressponse.data.data_question);
            let random = await dataConvert.mean
            var j, x, i;
            for (i = random.length - 1; i > 0; i--) {
                j = Math.floor(Math.random() * (i + 1));
                x = random[i];
                random[i] = random[j];
                random[j] = x;
            }
            LogBase.log("=====vocabNguon",ressponse.data.data_question)
            LogBase.log("=====vocab7",dataConvert)
            await this.setState({
                data: dataConvert,
                Answer: dataConvert.Answer,
                mean2: random,
                Loading: true,
            })

        } catch (error) {
            console.log(error);
            if (error.message === 'Network Error') {
                Alert.alert('Thông Báo', 'Vui lòng kiểm tra kết nối Internet');
            };
        };

    };

    convertData = (data) => {
        let dataConvert = {};
        let word = [];
        let mean = [];
        let Answer = [];
        data.map((item, index) => {
            let dataQ = {};
            word.push(item.vocabulary)
            mean.push(JSON.parse(item.en_mean)[0])
            Answer.push(JSON.parse(item.en_mean)[0])
        });
        dataConvert.word = word;
        dataConvert.mean = mean;
        dataConvert.Answer = Answer;
        return dataConvert;
    };

    SetDropZone(event, key) {
        this.ListDropZone[key] = event.nativeEvent.layout;
    }
    DropZone(gesture, key) {
        dz = this.ListDropZone[key];
        return gesture.moveY > SmartScreenBase.smPercenHeight * 15 + this.state.HeightType + SmartScreenBase.smPercenHeight + (SmartScreenBase.smPercenHeight * 2.5 + dz.height) * key
            && gesture.moveY < SmartScreenBase.smPercenHeight * 15 + this.state.HeightType + SmartScreenBase.smPercenHeight + (SmartScreenBase.smPercenHeight * 2.5 + dz.height) * (key + 1)
        // && gesture.moveX > BaseWidth * 45
    }
    _changetitle = () => {
        if (!this.state.vi) {
            this.setState({ vi: true, title: 'Kéo để ghép nghĩa với từ phù hợp' })
        } else {
            this.setState({ vi: false, title: 'Drag to match the meaning with the suitable word' })
        }
    };
    _choseA = (key) => {
        console.log(key)
        if (this.state.keyChose != null) {
            let numberChose = 0;
            let Mean2 = [...this.state.mean2];
            let from = Mean2[this.state.keyChose];
            let to = Mean2[key]
            this.ListCheckAnswer[key] = true;
            console.log(this.ListCheckAnswer)
            for (let i = 0; i < this.ListCheckAnswer.length; i++) {
                this.Opacity[i] = false
                this.choose[i] = false
                if (this.ListCheckAnswer[i]) {
                    numberChose++
                }
                if (i == key) {
                    this.choose[i] = true
                }

            }
            if (numberChose == Mean2.length) {
                this.setState({ ShowCheck: true })
            }
            Mean2[key] = from
            Mean2[this.state.keyChose] = to
            this.setState({ mean2: Mean2, keyChose: null })
        }
    };

    _choseB = (key) => {
        console.log(key)
        for (let i = 0; i < this.Opacity.length; i++) {
            this.Opacity[i] = false
            this.choose[i] = false
            if (i == key) {
                this.choose[i] = true
                this.Opacity[i] = true
            }
        }
        this.setState({ keyChose: key })
    };
    _showRight = () => {
        let data;
        if (this.state.showResult) {
            data = this.state.Answer
        } else {
            data = this.state.mean2
        }
        return data.map((item, key) => {
            return (
                <TouchableWithoutFeedback onPress={() => this._choseB(key)} disabled={this.state.disabled}>
                    <View
                        style={[{
                            marginLeft: this.ListCheckAnswer[key] == true || this.state.ShowCheck ? -SmartScreenBase.smPercenWidth * 10 : SmartScreenBase.smPercenWidth * 8,
                            width: width / 2,
                            height: width / 4,
                            marginBottom: width / 100,
                            alignItems: "center",
                            justifyContent: "center",
                        },
                        ]}>
                        <Image source={{ uri: this.choose[key] ? 'matchingto' : 'matchingwhite' }}
                            style={{
                                width: '100%',
                                height: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                                resizeMode: 'contain',
                                tintColor: this.Opacity[key] && !this.state.disabled ? '#f3911e' : undefined,
                                position: 'absolute',
                                top: height / 200
                            }}
                        />
                        <Text style={[stylesApp.txt, { width: width / 2.8, left: width / 10, position: 'absolute', fontSize: SmartScreenBase.smFontSize * 40 }]}>{item}</Text>
                        {
                            !this.state.showResult &&
                            <View style={{ position: "absolute", right: -SmartScreenBase.smPercenWidth * 8,}}>
                                {
                                    this.NumberTrue == this.state.mean2.length ?
                                        <View >
                                            <Image source={{ uri: this._ShowIconResuilt(key) }}
                                                style={{ width: SmartScreenBase.smPercenWidth * 9, height: SmartScreenBase.smPercenWidth * 9, resizeMode: "contain" }}
                                            />
                                        </View>
                                        :

                                        <View>
                                            {
                                                this.state.checkResuilt == false && this.NumberCheck <= 2 ?
                                                    <Image source={{ uri: this._ShowIconResuilt(key) }}
                                                        style={{ width: SmartScreenBase.smPercenWidth * 9, height: SmartScreenBase.smPercenWidth * 9, resizeMode: "contain" }}
                                                    />
                                                    :
                                                    null
                                            }
                                        </View>
                                }
                            </View>
                        }
                    </View>

                </TouchableWithoutFeedback>
            )
        })

    }
    render() {
        const { Loading } = this.state
        return (
            Loading ?
                <View style={{ flex: 1, alignItems: "center"}}>
                    <View style={{ alignItems: "center" }}>
                        {
                            !this.state.showResult ?
                                <View style={{ marginTop: SmartScreenBase.smPercenWidth*1 }}>
                                    {this.state.checkResuilt == true || this.state.checkResuilt != null && this.NumberCheck > 1 ? (
                                        <View style={{ height: SmartScreenBase.smPercenHeight * 13, alignSelf: "center", alignItems: "center", }}>
                                            {/* <Image source={{ uri: this.state.checkResuilt == true ? 'grammar1_1' : 'grammar1_2' }}
                                                style={{ width: SmartScreenBase.smPercenWidth * 27, height: SmartScreenBase.smPercenWidth * 27, resizeMode: "contain" }}
                                            /> */}
                                            <FileSound showImage={this.state.checkResuilt == true ? 'true' : 'false'} />
                                        </View>
                                    ) : null}
                                    {this.state.checkResuilt != null &&
                                        <View>
                                            <FileSound4 showImage={this.state.checkResuilt == true ? 'true' : 'false'} />
                                            <Text style={{ 
                                                fontSize: 20, 
                                                // fontWeight: 'bold', 
                                                color: '#fff', 
                                                fontFamily: 'iCielSoupofJustice' }}>
                                                    Bạn đã trả lời đúng {this.NumberTrue}/{this.state.Answer.length}
                                            </Text>
                                        </View>

                                    }
                                </View>
                                :
                                <View style={{ width, margin: 20, paddingHorizontal: 20, alignItems: 'flex-start' }}>
                                    <Text style={{ fontSize: 22, marginTop: 3, color: '#fff', fontFamily: 'iCielSoupofJustice'}}>Đáp án đúng là: </Text>
                                </View>
                        }
                        <ScrollView style={{ flex: 1 }}>
                            <View style={{ width: SmartScreenBase.smPercenWidth * 100, flexDirection: "row", justifyContent: 'center', alignItems: "center", }} >

                                <View style={{ marginTop: SmartScreenBase.smPercenHeight, zIndex: 1 }}  >
                                    {this.state.data.word.map((item, key) => {
                                        if (this.state.checkDrag == true) {
                                            return (
                                                <View onStartShouldSetResponder={() => this._choseA(key)}
                                                    style={{
                                                        zIndex: this.state.keyGrant == key ? 1 : 0,

                                                        height: width / 4,
                                                        width: width / 2.5,
                                                        marginBottom: width / 90,
                                                        alignItems: "center",
                                                        justifyContent: "center"
                                                    }}>
                                                    <Image source={{ uri: this._ShowBackGroundResuilt(key) }}
                                                        style={{ width: '100%', height: width / 4, resizeMode: "contain" }}
                                                    />
                                                    <Text style={[stylesApp.txt, { width: width / 4, position: "absolute",fontSize: SmartScreenBase.smFontSize * 40 }]}>{item}</Text>
                                                </View>
                                            )
                                        } else {
                                            return (
                                                <View key={key}
                                                    style={
                                                        {
                                                            // marginTop: SmartScreenBase.smPercenHeight * 2.5,
                                                            height: SmartScreenBase.smPercenWidth * 20,
                                                            // width: SmartScreenBase.smPercenWidth * 35,
                                                            borderRadius: 20,
                                                            alignItems: "center",
                                                            justifyContent: "center"
                                                        }}>
                                                    <Text style={stylesApp.txt}>{item}</Text>
                                                </View>
                                            )
                                        }
                                    })}
                                </View>
                                <View style={{ zIndex: 0 }} >
                                    {this._showRight()}
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                    <View style={{ alignSelf: "center", bottom: height / 20, position: "absolute" }}>
                        {
                            this.NumberCheck == 2 ?
                                <TouchableOpacity onPress={() => { this._OnPressCheckResuilt() }}
                                    style={stylesButton.Sty_Button}>
                                    <Text style={stylesButton.Sty_Text_Button}>XEM ĐÁP ÁN</Text>
                                </TouchableOpacity>
                                :
                                <View>
                                    {
                                        this.state.ShowCheck == true ? (
                                            <TouchableOpacity onPress={() => { this._OnPressCheckResuilt() }}
                                                style={stylesButton.Sty_Button}>
                                                <Text style={stylesButton.Sty_Text_Button}>{this.state.checkResuilt == null ? 'KIỂM TRA' : this.state.checkResuilt == false && this.NumberCheck < 3 ? "LÀM LẠI" : "TIẾP TỤC"} </Text>
                                            </TouchableOpacity>
                                        ) :
                                            <TouchableOpacity disabled={true}
                                                style={stylesButton.Sty_Button_disable}>
                                                <Text style={stylesButton.Sty_Text_Button}>{this.state.checkResuilt == null ? 'KIỂM TRA' : this.state.checkResuilt == false && this.NumberCheck < 3 ? "LÀM LẠI" : "TIẾP TỤC"} </Text>
                                            </TouchableOpacity>
                                    }
                                </View>
                        }
                    </View>
                </View>
                :
                // <View style={{ backgroundColor: '#ffffff50', width: width, height: height, justifyContent: 'center', alignItems: 'center', position: 'absolute' }}>
                //     <ActivityIndicator size="small" color="blue" />
                //     <Text style={{ fontSize: 17, color: 'blue' }}>Vui lòng đợi trong giây lát...</Text>
                // </View>
                <FullScreenLoadingIndicator visible={true}></FullScreenLoadingIndicator>
        )
    }
    NextScreen() {
        this.props.methodScreen();
    }
    _ShowIconResuilt(id) {
        if (this.state.mean2[id] == this.state.Answer[id]) {
            return 'grammar1_4';
        } else {
            return 'grammar1_3';
        }
    }
    _ShowBackGroundResuilt(id) {
        if (this.state.showResult) {
            return 'matchinggreen';
        };

        if (this.state.checkResuilt != null || this.state.check == true) {
            if (this.state.mean2[id] == this.state.Answer[id]) {
                return 'matchinggreen';
            } else {
                return 'matchingred';
            }
        } else {
            return 'matchingyellow';
        };

    }
    _ShowBackResuilt(id) {
        if (this.state.checkResuilt != null || this.state.check == true) {
            if (this.state.mean2[id] == this.state.Answer[id]) {
                return 'lesson_vocab_image23';
            } else {
                return 'lesson_vocab_image22';
            }
        } else {
            return 'lesson_vocab_image20';
        }
    }
    NumberCheck = 0;
    NumberTrue = 0;
    //checkSS = false
    async _OnPressCheckResuilt() {
        this.setState({ disabled: true })
        this.props.hideTypeExercise()
        this.NumberTrue = 0
        if (this.state.checkResuilt == null) {
            this.state.checkPanresponder = false;
            for (let index = 0; index < this.state.data.word.length; index++) {
                this.choose[index] = false
                if (this.state.mean2[index] == this.state.Answer[index]) {
                    this.NumberTrue += 1;
                }

            }
            if (this.state.mean2.toString() == this.state.Answer.toString()) {
                this.setState({ checkResuilt: true })
                //checkSS = true
                // this.props.showTypeExercise()

            } else {
                this.NumberCheck += 1;
                this.setState({ checkResuilt: false })

            }
        } else if (this.state.checkResuilt == false) {
            this.props.showTypeExercise()

            if (this.NumberCheck < 2) {
                for (let index = 0; index < this.state.mean2.length; index++) {
                    this.ListCheckAnswer[index] = false;
                }
                this.ListCheck = [];
                this.setState({
                    checkResuilt: null,
                    ShowCheck: false,
                    check: false,
                    checkPanresponder: true,
                    disabled: false
                })
            } else {
                //console.log('this.NumberCheck', this.NumberCheck)
                if (this.NumberCheck >= 3) {
                    this.setState({ Loading: false, showResult: false })
                    await this.props.SaveDataEnd(this.state.Answer, 7, 0)
                } else {
                    this.NumberCheck += 1;
                    this.props.hideTypeExercise()
                    this.setState({ showResult: true, })
                }
            }
        } else {
            this.setState({ Loading: false })
            await this.props.SaveDataEnd(this.state.Answer, 7, 0)
        }
    }
};
function mapStateToProps(state) {
    return {
        Vocab: state.vocabularyReducers.vocabulary
    }
}
export default connect(mapStateToProps)(VocabB7Screen);
