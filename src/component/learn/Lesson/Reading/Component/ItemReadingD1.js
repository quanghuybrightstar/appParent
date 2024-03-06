import React, { Component } from "react";
import { Text, View, TouchableOpacity, TextInput, Image } from "react-native";
import StyleLesson from "../../StyleLesson";
import SmartScreenBase from "../../../../base/SmartScreenBase";
import stylesApp from "../../../../styleApp/stylesApp";

export default class ItemReadingD1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            refresh: false,
            text: this.props.text,
            choosehint: false
        }
    }
    _OntextChange(text, index) {
        let choicehint = this.state.choosehint;
        this.props.screen._OnTextChange(text, index, choicehint );
    }

    render() {
        let { question, index, NumberCheck, showhint, hint, editable } = this.props;
        return (
            <View style={[StyleLesson.Sty_View_Border, {
                margin: SmartScreenBase.smPercenWidth * 0,
                width: SmartScreenBase.smPercenWidth * 84,
                marginTop: SmartScreenBase.smPercenHeight * 5,
                paddingBottom: SmartScreenBase.smPercenHeight * 3,
            }]}>
                <Text style={[stylesApp.txt, {
                    marginTop: SmartScreenBase.smPercenHeight * 2,
                    width: SmartScreenBase.smPercenWidth * 80, textAlign: "center"
                }]}>{question}</Text>
                {this.state.choosehint == true ? (
                    <View style={[StyleLesson.Sty_View_Border, {
                        backgroundColor: "rgba(255,255,255,0.85)",
                        // borderWidth: SmartScreenBase.smPercenWidth / 3,
                        // borderColor: "#FFCC00",
                        width: SmartScreenBase.smPercenWidth * 70,
                        alignSelf: "center",
                        flexDirection: "row", alignItems: "center",
                        padding: 0
                    }]}>
                        <Image source={{ uri: "lesson_grammar_image5" }}
                            style={{
                                width: SmartScreenBase.smBaseWidth * 110,
                                height: SmartScreenBase.smBaseWidth * 110,
                                resizeMode: "contain"
                            }}
                        />
                        <Text style={stylesApp.txt}>{"\t \t"} {hint}</Text>
                    </View>
                ) : null}
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: SmartScreenBase.smPercenHeight }}>
                    <Image source={{ uri: "lesson_grammar_image1" }}
                        style={{ width: SmartScreenBase.smBaseWidth * 112, height: SmartScreenBase.smBaseWidth * 113, resizeMode: "contain" }}
                    />
                    <View>
                        <TextInput
                            editable={editable}
                            text={this.state.text}
                            style={[stylesApp.txt, {
                                width: SmartScreenBase.smPercenWidth * 65,
                                marginLeft: SmartScreenBase.smPercenWidth * 2,
                                marginVertical: 0, paddingVertical: 0,
                                borderBottomWidth: 1
                            }]}
                            onChangeText={(text) => { this._OntextChange(text, index) }}
                            placeholder={"Trả lời..."}
                        />
                    </View>
                </View>
                <View style={{
                    position: "absolute", top: -SmartScreenBase.smBaseWidth * 100,
                    alignItems: "center", justifyContent: "center",
                }}>
                    <Image source={{ uri: "lesson_reading_image1" }}
                        style={{ width: SmartScreenBase.smBaseWidth * 140, height: SmartScreenBase.smBaseWidth * 147, resizeMode: "contain" }}
                    />
                    <Text style={[stylesApp.txt_Title, {
                        position: "absolute", paddingBottom: SmartScreenBase.smPercenWidth,
                        paddingRight: SmartScreenBase.smPercenWidth / 2,
                        fontSize: SmartScreenBase.smPercenWidth * 5
                    }]}>{index + 1}</Text>
                </View>
                {NumberCheck >= 2 && showhint == false && this.state.choosehint == false ? (
                    <View style={{ position: "absolute", top: -SmartScreenBase.smBaseWidth * 40, right: -SmartScreenBase.smBaseWidth * 20, }}>
                        <TouchableOpacity onPress={() => {
                            this.setState({
                                choosehint: true,
                            });
                            this.props.screen.ChooseHint(index);
                        }}>
                            <Image source={{ uri: "lesson_grammar_image5" }}
                                style={StyleLesson.ImageHint}
                            />
                        </TouchableOpacity>
                    </View>
                ) : null}
            </View>
        );
    }
}