import { Text, View, Image, TouchableOpacity, TextInput, TouchableWithoutFeedback } from "react-native";
import React, { Component } from "react";
import SmartScreenBase from "../../../../base/SmartScreenBase";
import ButtonCheck from "../../../../items/ButtonCheck";
import stylesApp from "../../../../styleApp/stylesApp";
import StyleLesson from "../../StyleLesson";
import ItemReadingD1 from "./ItemReadingD1";

export default class ShowEachQuestion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refresh: false,
            ShowCheck: false,
            checkresuilt: null,
            NumberCheck: 0,
            choosehint: 0,
            data: this.props.data,
            text: "",
            index: 0,
            STT_Incorrect:0
        }
        this.RefTextInput = null;
        this.ListAnswerIncorrect = this.props.ListIncorrect;
        this.CheckFinish = false;
        this.ListChooseHint = this.props.choosehint;
        this.state.index=this.ListAnswerIncorrect[this.state.STT_Incorrect];
        console.log("----------------index-------------------",this.state.index)
        console.log("----------------list hint-------------------",this.ListChooseHint)
        console.log("----------------list incorrect-------------------",this.ListAnswerIncorrect)
    }
    _OnTextChange(text, index) {
        this.state.text = text;
        this.setState({ ShowCheck: true })
    }
    _CheckResuilt() {
        let { NumberCheck, text, index } = this.state;
        if (this.state.checkresuilt == null) {
            if (this.state.data[index].answer[0].toLowerCase() == text.toLowerCase()) {
                this.setState({ checkresuilt: true });
            } else {
                this.setState({ checkresuilt: false });
            }
        } else if (this.state.checkresuilt == false) {
            if (this.state.STT_Incorrect >= this.ListAnswerIncorrect.length) {
                console.log("false")
                this.props.screen.ShowResuilt();
            } else {
                console.log("sass", NumberCheck, this.ListChooseHint[index])
                if (NumberCheck >= 2 && this.ListChooseHint[index] == true || NumberCheck >= 3 && this.ListChooseHint[index] == false) {
                    this.props.screen._OnTextChange(text, index);
                    if (this.state.index >= this.state.data.length-1) {
                        console.log("false")
                        this.props.screen.ShowResuilt();
                    }else{
                        this.state.STT_Incorrect +=1;
                        this.state.index=this.ListAnswerIncorrect[this.state.STT_Incorrect];
                    }
                    console.log("Finish false", this.state.index, this.state.data.length)
                    this.setState({
                        refresh: !this.state.refresh,
                        NumberCheck: 0,
                        checkresuilt: null,
                        ShowCheck: false,
                        text: '',
                    })
                } else {
                    this.setState({
                        NumberCheck: this.state.NumberCheck + 1,
                        ShowCheck: false,
                        text: '',
                        checkresuilt: null,
                    })
                }
            }
        } else {
            if (this.state.STT_Incorrect >= this.ListAnswerIncorrect.length) {
                console.log("true")
                this.props.screen.ShowResuilt();
            } else {
                console.log("Finish true", this.state.index, this.state.data.length)
                this.props.screen._OnTextChange(text, index);
                this.state.STT_Incorrect += 1;
                this.state.index=this.ListAnswerIncorrect[this.state.STT_Incorrect];
                this.setState({
                    refresh: !this.state.refresh,
                    ShowCheck: false,
                    text: '',
                    checkresuilt: null,
                    NumberCheck: 0,
                })
            }
        }
        console.log("index",this.state.index)
    }
    render() {
        let { choosehint, index } = this.state;
        let item = this.state.data[index];
        return (
            <View style={{ height: SmartScreenBase.smPercenHeight * 87, alignSelf: "center" }}>
                <View style={{ marginTop: SmartScreenBase.smPercenHeight * 3 }}>
                    <Text style={[stylesApp.txt_Title, { color: "white", marginVertical: SmartScreenBase.smPercenHeight * 4 }]} >GỢI Ý :</Text>
                    <View style={[StyleLesson.Sty_View_Border, {
                        borderWidth: SmartScreenBase.smPercenWidth * 2 / 3,
                        borderColor: "#f7ac16",
                        alignItems: "flex-start",
                        alignSelf: "center"
                    }]}>
                        <Text style={[stylesApp.txt_Title, {
                            margin: SmartScreenBase.smPercenHeight,

                        }]} >{item.hint}</Text>
                    </View>
                    <View style={{ marginTop: SmartScreenBase.smPercenHeight * 5 }}>
                        {this.state.NumberCheck == 0 && this.ListChooseHint[this.state.index] == false ? (
                            <View>
                                {this.state.checkresuilt == null ? (
                                    <ItemReadingD1
                                        screen={this}
                                        index={this.state.index}
                                        question={item.question}
                                    />
                                ) : (
                                        <View>
                                            <View style={{ marginVertical: SmartScreenBase.smPercenHeight * 2 }}>
                                                <Text style={[stylesApp.txt_Title, { color: 'white' }]} >{item.question}</Text>
                                            </View>
                                            <View style={[StyleLesson.Sty_View_Border, {
                                                backgroundColor: "rgba(0,0,0,0.4)"
                                            }]}>
                                                <View style={{
                                                    width: SmartScreenBase.smPercenWidth * 85, alignSelf: "center",
                                                    flexDirection: "row", alignItems: "center", justifyContent: "center", flexWrap: "wrap",
                                                    marginVertical: SmartScreenBase.smPercenHeight * 3
                                                }}>
                                                    {this.state.text.split(" ").map((e, k) => {
                                                        return (
                                                            <View key={k} style={[StyleLesson.Border_View, {
                                                                marginHorizontal: SmartScreenBase.smPercenWidth * 2,
                                                                marginTop: SmartScreenBase.smPercenHeight,
                                                                backgroundColor: "rgba(255,255,255,0.9)",
                                                                borderColor: this.state.text.split(" ")[k].toLowerCase() == item.answer[0].split(' ')[k].toLowerCase() ? "#c6e50e" : "#e21010"
                                                            }]} >
                                                                <Text style={[stylesApp.txt, {
                                                                    paddingHorizontal: SmartScreenBase.smPercenWidth * 3, paddingVertical: 5
                                                                }]} > {e} </Text>
                                                            </View>
                                                        )
                                                    })}
                                                </View>
                                            </View>
                                        </View>

                                    )}
                            </View>
                        ) : (
                                <View style={{ marginTop: SmartScreenBase.smPercenHeight * 2 }}>
                                    <View style={{ width: SmartScreenBase.smPercenWidth * 90, flexDirection: "row", flexWrap: "wrap", alignItems: "center", justifyContent: "center" }} >
                                        {item.answer[0].split(" ").map((word, key) => {
                                            return (
                                                <View key={key}
                                                    style={[StyleLesson.Border_View, {
                                                        backgroundColor: "#f7ac16",
                                                        borderColor: 'white',
                                                        paddingVertical:SmartScreenBase.smPercenHeight/2
                                                    }]}>
                                                    {key < this._DataSuggest() ? (
                                                        <Text style={[stylesApp.txt, { marginHorizontal: SmartScreenBase.smPercenWidth * 3.5 }]} >{word}</Text>
                                                    ) : (
                                                            <Text style={[stylesApp.txt, { width: SmartScreenBase.smPercenWidth * 5 }]} ></Text>
                                                        )}
                                                </View>
                                            )
                                        })}
                                    </View>
                                    <View style={{ marginVertical: SmartScreenBase.smPercenHeight * 2 }}>
                                        <Text style={[stylesApp.txt_Title, { color: 'white' }]} >{item.question}</Text>
                                    </View>
                                    <View>
                                        <View style={[StyleLesson.Sty_View_Border, {
                                            backgroundColor: "rgba(0,0,0,0.4)"
                                        }]}>
                                            {this.state.checkresuilt == null ? (
                                                <View style={{ width: SmartScreenBase.smPercenWidth * 80, alignSelf: "center" }} >
                                                    <Text style={[stylesApp.txt_Title, { color: 'white' }]} >Trả lời</Text>
                                                    <TouchableWithoutFeedback onPress={() => { this.RefTextInput.focus() }}>
                                                        <View style={[StyleLesson.Sty_View_Border, {
                                                            width: SmartScreenBase.smPercenWidth * 80,
                                                            height: SmartScreenBase.smPercenHeight * 10,
                                                            borderWidth: SmartScreenBase.smPercenWidth * 2 / 3,
                                                            borderColor: "#f7ac16"
                                                        }]}>
                                                            <TextInput ref={(e) => { this.RefTextInput = e }}
                                                                multiline={true}
                                                                placeholder={"Trả lời ..."}
                                                                onChangeText={(text) => { this._OnTextChange(text) }}
                                                                style={[stylesApp.txt, { width: SmartScreenBase.smPercenWidth * 75 }]}
                                                            />
                                                        </View>
                                                    </TouchableWithoutFeedback>
                                                </View>
                                            ) : (
                                                    <View style={{
                                                        width: SmartScreenBase.smPercenWidth * 85, alignSelf: "center",
                                                        flexDirection: "row", alignItems: "center", justifyContent: "center", flexWrap: "wrap",
                                                        marginVertical: SmartScreenBase.smPercenHeight * 3
                                                    }}>
                                                        {console.log(" Numbercheck  ",this.state.NumberCheck,"choice hint",this.ListChooseHint[this.state.STT_Incorrect])}
                                                        {this.state.text.split(" ").map((e, k) => {
                                                            return (
                                                                <View key={k} style={[StyleLesson.Border_View, {
                                                                    marginHorizontal: SmartScreenBase.smPercenWidth * 2,
                                                                    marginTop: SmartScreenBase.smPercenHeight,
                                                                    backgroundColor: "rgba(255,255,255,0.9)",
                                                                    borderColor: this.state.text.split(" ")[k].toLowerCase() == item.answer[0].split(' ')[k].toLowerCase() ? "#c6e50e" : "#e21010"
                                                                }]} >
                                                                    <Text style={[stylesApp.txt, {
                                                                        paddingHorizontal: SmartScreenBase.smPercenWidth * 3, paddingVertical: 5
                                                                    }]} > {e} </Text>
                                                                </View>
                                                            )
                                                        })}
                                                    </View>
                                                )}
                                        </View>
                                    </View>
                                </View>
                            )}
                    </View>

                </View>
                <View style={{ position: "absolute", bottom: SmartScreenBase.smPercenHeight * 2, alignSelf: "center" }}>
                    {this.state.ShowCheck == true ? (
                        <TouchableOpacity onPress={() => {
                            this._CheckResuilt()
                        }}>
                            <ButtonCheck TextButton={this.state.checkresuilt == null ? "Xong" : this.state.checkresuilt == false ? "Làm lại" : "Tiếp tục"} />
                        </TouchableOpacity>
                    ) : null}
                </View>
            </View>
        )
    }
    _DataSuggest() {
        let data = this.state.data[this.state.index].answer[0].split(" ");
        let num = data.length;
        let showword = 0;
        if (this.ListChooseHint[this.state.index] == true) {
            if (this.state.NumberCheck == 0) {
                let a = num * 30;
                showword = Math.round(a / 100);
                return showword;
            } else if (this.state.NumberCheck == 1) {
                showword = Math.round((num * 50) / 100);
                return showword;
            } else {
                showword = Math.round(num);
                return showword;
            }
        } else {
            if (this.state.NumberCheck == 1) {
                let a = num * 30;
                showword = Math.round(a / 100);
                return showword;
            } else if (this.state.NumberCheck == 2) {
                showword = Math.round((num * 50) / 100);
                return showword;
            } else {
                showword = Math.round(num);
                return showword;
            }
        }
    }
}