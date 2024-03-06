import React, { Component } from "react";
import { Text, View, Dimensions, FlatList, TouchableOpacity, Image, TextInput, ScrollView } from "react-native";
import styles from "./styles";
import Slider from '@react-native-community/slider';
import SmartScreenBase from "../../../base/SmartScreenBase";
import ViewInput from "../../../items/ViewInput";
import ViewItem7 from "./ComponentListening/InputListeningD7";
import FileSound from '../FileSound';
const BaseWidth = Dimensions.get('screen').width / 100;
const BaseHeight = Dimensions.get('window').height / 100;
const NaviBar = Dimensions.get('screen').height - Dimensions.get('window').height;

export default class ListeningD7 extends Component {
    data = [
        {
            question: "Why couldn't Ba Duc attract more tourists to his old house before 2000 ?",
            answer: "Ba Duc attract more tourists to his old house before 2000",
            script: "yes !"
        },
        {
            question: "Why couldn't Ba Duc attract more tourists to his old house before 2000 ?",
            answer: "Ba Duc attract more tourists to his old house before 2000",
            script: "yes !"
        },
        // {
        //     question: "Why couldn't Ba Duc attract more tourists to his old house before 2000 ?",
        //     answer: "Why",
        //     script: "yes !"
        // },
        // {
        //     question: "Why couldn't Ba Duc attract more tourists to his old house before 2000 ?",
        //     answer: "Why",
        //     script: "yes !"
        // },
        // {
        //     question: "Why couldn't Ba Duc attract more tourists to his old house before 2000 ?",
        //     answer: "Why",
        //     script: "yes !"
        // },
    ]
    constructor(props) {
        super(props);
        this.state = {
            checkPlay: false,
            ShowCheck: false,
            checkResuilt: null,
            refresh: false,
            NumberTrue: 0,
        }
        this.CheckResound = [];
        this.ListAnswer = [];
        this.ListHint = [];
        this.ListEditInput = [];
    }

    componentDidMount() {
        for (let index = 0; index < this.data.length; index++) {
            this.CheckResound.push(false);
            this.ListAnswer.push('');
            this.ListHint.push(false);
            this.ListEditInput.push(true);
        }
    }
    NumberCheck = 3;
    _OnPressCheckResuilt() {
        if (this.state.checkResuilt == null) {
            let check = 0;
            for (let index = 0; index < this.data.length; index++) {
                if (this.ListAnswer[index].toLocaleLowerCase() == this.data[index].answer.toLocaleLowerCase()) {
                    check += 1;
                }
            }
            if (check == this.data.length) {
                this.setState({
                    checkResuilt: true
                })
            } else {
                this.NumberCheck += 1;
                this.setState({
                    checkResuilt: false
                })
            }
            this.state.NumberTrue = check;
        } else if (this.state.checkResuilt == false) {
            if (this.NumberCheck >= 3) {
                for (let index = 0; index < this.data.length; index++) {
                    if (this.ListAnswer[index].toLocaleLowerCase() !== this.data[index].answer.toLocaleLowerCase()) {
                        this.ListAnswer[index] = '';
                    } else {
                        this.ListEditInput[index] = false;

                    }
                }

            } else {
                for (let index = 0; index < this.data.length; index++) {
                    this.ListAnswer[index] = '';
                }
            }
            this.setState({
                checkResuilt: null
            })
            console.log(this.NumberCheck, this.ListAnswer)
        } else {
            this.props.methodScreen(9);
        }
    }
    _OnTextChange(text, index) {
        this.ListAnswer[index] = text;
        let check = this.ListAnswer.filter(function (e) { return e == '' })
        if (check.length == 0) {
            this.setState({
                ShowCheck: true
            })
        }
    }
    render() {
        return (
            <View style={{ height: SmartScreenBase.smPercenHeight * 87 }}>
                {this.state.checkResuilt == null ? this._ShowQuestion() : this._ShowAnswer()}
                <View style={{ position: "absolute", bottom: SmartScreenBase.smPercenHeight * 2, alignSelf: "center" }}>
                    {this.state.ShowCheck == true ? (
                        <TouchableOpacity onPress={() => { this._OnPressCheckResuilt() }}>
                            <View style={styles.Sty_But_Check}>
                                {this.state.checkResuilt == null ? (
                                    <Text style={styles.Sty_Text_Check}>Kiểm tra</Text>
                                ) : (
                                        <Text style={styles.Sty_Text_Check}>{this.state.checkResuilt == true ? "Tiếp tục" : (
                                            <Text>{this.NumberCheck < 7 ? "Làm lại" : "Tiếp tục"}</Text>
                                        )}</Text>
                                    )}
                            </View>
                        </TouchableOpacity>
                    ) : null}
                </View>
            </View>
        )
    }
    _ShowQuestion() {
        return (
            <View>
                <View style={styles.Sty_Tyle_Lesson}>
                    <Text style={styles.Sty_Text_Type_Lesson}>
                        Listen and answer the following question</Text>
                    <View style={{ position: "absolute", left: - SmartScreenBase.smPercenWidth * 5, top: -SmartScreenBase.smPercenHeight }}>
                        <Image source={{ uri: 'lesson_image1' }}
                            style={styles.Sty_ImageTyle_1}
                        />
                    </View>
                    <View style={{ position: "absolute", right: -SmartScreenBase.smPercenWidth * 3, bottom: -SmartScreenBase.smPercenWidth * 5 }}>
                        <TouchableOpacity>
                            <Image source={{ uri: 'lesson_image2' }}
                                style={[styles.Sty_ImageTyle_2]}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ flexDirection: "row", alignItems: "center", alignSelf: "center", marginTop: SmartScreenBase.smPercenHeight * 3 }}>
                    <TouchableOpacity onPress={() => { this.setState({ checkPlay: !this.state.checkPlay }) }}>
                        <Image
                            source={{ uri: this.state.checkPlay == false ? 'lesson_speaking_image12' : 'lesson_speaking_image13' }}
                            style={StyleLesson.Image_Sound}
                        />
                    </TouchableOpacity>
                    <Slider
                        style={{ width: SmartScreenBase.smPercenWidth * 70, height: SmartScreenBase.smPercenHeight * 5 }}
                        minimumValue={0}
                        maximumValue={1}
                        minimumTrackTintColor="#FFFFFF"
                        maximumTrackTintColor="#000000"
                        thumbTintColor="#FFFFFF"
                        value={0.5}
                    />
                </View>
                <View style={{ width: SmartScreenBase.smPercenWidth * 100 }}>
                    <View style={{ position: "absolute", top: 0 }}>
                        <Image source={{ uri: "student_home_image13" }}
                            style={{ width: SmartScreenBase.smBaseWidth * 1081, height: SmartScreenBase.smBaseHeight * 80, resizeMode: "contain", transform: [{ rotate: "180deg" }] }}
                        />
                    </View>
                    <View style={{ marginTop: SmartScreenBase.smPercenHeight * 3, height: SmartScreenBase.smPercenHeight * 75 }}>
                        <FlatList
                            data={this.data}
                            extraData={this.state.refresh}
                            keyExtractor={(item, key) => 'item' + key}
                            // renderItem={this._render_Item_Question}
                            renderItem={this._ShowHindAnswer}
                            contentContainerStyle={{ alignItems: "center" }}
                        />
                    </View>
                </View>
            </View>
        )
    }
    _render_Item_Question = ({ item, index }) => {
        return (
            <View style={[styles.Sty_BorderD1, {
                padding: BaseHeight * 2,
                marginBottom: index == this.data.length - 1 ? SmartScreenBase.smPercenHeight * 15 : 0
            }]}>
                <Text style={[styles.txt, { paddingRight: SmartScreenBase.smPercenWidth * 4 }]}>
                    <Text style={{ fontWeight: "bold" }}>{index + 1}. </Text>
                    <Text>{item.question}</Text>
                </Text>
                {this._ShowHintAudio(index)}
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Image source={{ uri: 'lesson_grammar_image1' }}
                        style={{ width: SmartScreenBase.smBaseWidth * 112, height: SmartScreenBase.smBaseHeight * 113, resizeMode: "contain",marginRight:2 }}
                    />
                    <ViewInput
                        Editable={this.ListEditInput[index]}
                        screen={this}
                        index={index}
                        text={this.ListAnswer[index]}
                        placeholder={'Trả lời'}
                        style={{
                            marginLeft: SmartScreenBase.smBaseWidth * 3,
                            borderBottomWidth: 1, borderColor: "lightgray",
                            width: BaseWidth * 70, color: "#dd5e00",
                            fontSize: SmartScreenBase.smPercenWidth * 3.5
                        }}
                    />
                    {/* <TextInput placeholder={'Trả lời'} onChangeText={(text) => { this._OnTextChange(text, index) }}
                        style={{ marginLeft: SmartScreenBase.smBaseWidth * 3, borderBottomWidth: 1, borderColor: "lightgray", width: BaseWidth * 70, color: "#dd5e00" }}
                    /> */}
                </View>
                {this.NumberCheck == 3 ? (
                    <View style={{ position: "absolute", top: -SmartScreenBase.smPercenWidth, right: -SmartScreenBase.smPercenWidth * 3 }}>
                        {this.ListEditInput[index] == true ? (
                            <View>
                                {this.ListHint[index] == false ? (
                                    <TouchableOpacity onPress={() => { this.ListHint[index] = true; this.setState({ refresh: !this.state.refresh }) }}>
                                        <Image source={{ uri: "lesson_grammar_image5" }}
                                            style={{ width: SmartScreenBase.smBaseWidth * 144, height: SmartScreenBase.smBaseWidth * 143, resizeMode: "contain" }}
                                        />
                                    </TouchableOpacity>
                                ) : null}
                            </View>
                        ) : null}
                    </View>
                ) : null}
            </View>
        )
    }
    _ShowAnswer() {
        if (this.state.checkResuilt == true) {
            return (
                <View>
                    <View style={{ alignItems: "center",height:SmartScreenBase.smBaseWidth * 300}}>
                        <FileSound showImage={this.state.NumberTrue == this.state.data.length ?'true': 'false'}/>
                    </View>
                    <Text style={{
                        marginTop: 0,
                        color: "white", fontWeight: "600",
                        fontSize: SmartScreenBase.smPercenWidth * 4
                    }}>BẠN ĐÃ TRẢ LỜI ĐÚNG {this.state.NumberTrue}/{this.data.length}</Text>
                    <View style={{ width: SmartScreenBase.smPercenWidth * 100 }}>
                        <View style={{ position: "absolute", top: 0 }}>
                            <Image source={{ uri: "student_home_image13" }}
                                style={{ width: SmartScreenBase.smBaseWidth * 1081, height: SmartScreenBase.smBaseHeight * 80, resizeMode: "contain", transform: [{ rotate: "180deg" }] }}
                            />
                        </View>
                        <View style={{ marginTop: SmartScreenBase.smPercenHeight * 3, height: SmartScreenBase.smPercenHeight * 70 }}>
                            <FlatList
                                data={this.data}
                                extraData={this.state.refresh}
                                keyExtractor={(item, key) => 'item' + key}
                                renderItem={this._render_Item_Answer}
                                contentContainerStyle={{ alignItems: "center" }}
                            />
                        </View>
                    </View>
                </View>
            )
        } else {
            return (
                <View style={{ marginTop: SmartScreenBase.smPercenHeight * 5, alignItems: "center" }}>
                    <View>
                        <Text style={{
                            marginTop: 0,
                            color: "white", fontWeight: "600",
                            fontSize: SmartScreenBase.smPercenWidth * 4
                        }}>BẠN ĐÃ TRẢ LỜI ĐÚNG {this.state.NumberTrue}/{this.data.length}</Text>
                    </View>
                    <View style={{ width: SmartScreenBase.smPercenWidth * 100 }}>
                        <View style={{ position: "absolute", top: 0 }}>
                            <Image source={{ uri: "student_home_image13" }}
                                style={{ width: SmartScreenBase.smBaseWidth * 1081, height: SmartScreenBase.smBaseHeight * 80, resizeMode: "contain", transform: [{ rotate: "180deg" }] }}
                            />
                        </View>
                        <View style={{ marginTop: SmartScreenBase.smPercenHeight * 3, height: SmartScreenBase.smPercenHeight * 80 }}>
                            <FlatList
                                data={this.data}
                                extraData={this.state.refresh}
                                keyExtractor={(item, key) => 'item' + key}
                                renderItem={this._render_Item_Answer}
                                contentContainerStyle={{ alignItems: "center" }}
                            />
                        </View>
                    </View>
                </View>
            )
        }
    }
    _render_Item_Answer = ({ item, index }) => {
        if (this.state.checkResuilt == true) {
            return (
                <View style={[styles.Sty_BorderD1, {
                    marginBottom: index == this.data.length - 1 ? SmartScreenBase.smPercenHeight * 15 : 0
                }]} >
                    <Text style={styles.txt}>
                        <Text style={{ fontWeight: "bold" }}>{index + 1}. </Text>
                        <Text>{item.question}</Text>
                    </Text>
                    <View style={{ margin: SmartScreenBase.smPercenHeight, flexDirection: "row", alignItems: "center" }}>
                        <Image style={styles.Sty_Image_Small}
                            source={{ uri: "lesson_listen_image2" }}
                        />
                        <Text style={[styles.txt, { marginLeft: SmartScreenBase.smPercenWidth * 4 }]}>{this.ListAnswer[index]}</Text>
                    </View>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <TouchableOpacity onPress={() => { this.CheckResound[index] = !this.CheckResound[index], this.setState({ refresh: !this.state.refresh }) }}>
                            <Image source={{ uri: this.CheckResound[index] == false ? "lesson_listen_image3" : "lesson_listen_image1" }}
                                style={{ width: SmartScreenBase.smBaseWidth * 97, height: SmartScreenBase.smBaseWidth * 97, resizeMode: "contain" }}
                            />
                        </TouchableOpacity>
                        <Slider
                            style={{ width: SmartScreenBase.smPercenWidth * 70, height: SmartScreenBase.smPercenHeight * 5 }}
                            minimumValue={0}
                            maximumValue={1}
                            // minimumTrackTintColor="#FFFFFF"
                            // maximumTrackTintColor="#000000"
                            // thumbTintColor="#FFFFFF"
                            value={0.5}
                        />
                    </View>
                    <View style={{ marginTop: SmartScreenBase.smPercenHeight, marginBottom: SmartScreenBase.smPercenHeight }}>
                        <Text style={styles.txt}>
                            <Text style={{ fontWeight: "bold", fontSize: SmartScreenBase.smPercenWidth * 4 }}>SCRIPT: </Text>
                            <Text style={styles.txt}> {item.script}</Text>
                        </Text>
                    </View>
                </View>
            )
        } else {
            return (
                <View style={[styles.Sty_BorderD1, {
                    marginTop: SmartScreenBase.smPercenWidth * 15,
                    borderColor: this.ListAnswer[index].toLocaleLowerCase() == item.answer.toLocaleLowerCase() ? "rgba(198,229,14,0.95)" : "#e8425a",
                    //
                    borderWidth: SmartScreenBase.smPercenWidth / 2,
                    marginBottom: index == this.data.length - 1 ? SmartScreenBase.smPercenHeight * 15 : 0
                }]} >
                    <Text style={styles.txt}>
                        <Text style={{ fontWeight: "bold" }}>{index + 1}. </Text>
                        <Text>{item.question}</Text>
                    </Text>
                    <View style={{ flexDirection: "row", alignItems: "center", marginTop: SmartScreenBase.smPercenHeight, marginBottom: SmartScreenBase.smPercenHeight }}>
                        <Image source={{ uri: 'lesson_grammar_image1' }}
                            style={{ width: SmartScreenBase.smBaseWidth * 112, height: SmartScreenBase.smBaseWidth * 113, resizeMode: "contain" }}
                        />
                        <Text style={[styles.txt, { color: "#dd5e00", marginLeft: SmartScreenBase.smPercenWidth * 3, width: SmartScreenBase.smPercenWidth * 70 }]}>
                            {this.ListAnswer[index]}
                        </Text>
                    </View>
                    <View style={{ position: "absolute", top: -SmartScreenBase.smPercenWidth * 16, alignSelf: "center" }}>
                        <Image
                            source={{ uri: this.ListAnswer[index].toLocaleLowerCase() == item.answer.toLocaleLowerCase() ? 'grammar1-4' : 'lesson_grammar_image8' }}
                            style={{ width: SmartScreenBase.smBaseWidth * 250, height: SmartScreenBase.smBaseWidth * 250, resizeMode: "contain" }}
                        />
                    </View>
                </View>
            )
        }
    }
    _ShowHintAudio(index) {
        if (this.NumberCheck >= 4 || this.ListHint[index] == true) {
            if (this.ListEditInput[index] == true) {
                return (
                    <View>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <TouchableOpacity onPress={() => { this.CheckResound[index] = !this.CheckResound[index], this.setState({ refresh: !this.state.refresh }) }}>
                                <Image source={{ uri: this.CheckResound[index] == false ? "lesson_listen_image3" : "lesson_listen_image1" }}
                                    style={{ width: SmartScreenBase.smBaseWidth * 97, height: SmartScreenBase.smBaseWidth * 97, resizeMode: "contain" }}
                                />
                            </TouchableOpacity>
                            <Slider
                                style={{ width: SmartScreenBase.smPercenWidth * 70, height: SmartScreenBase.smPercenHeight * 5 }}
                                minimumValue={0}
                                maximumValue={1}
                                // minimumTrackTintColor="#FFFFFF"
                                // maximumTrackTintColor="#000000"
                                // thumbTintColor="#FFFFFF"
                                value={0.5}
                            />
                        </View>
                    </View>
                )
            }
        } else {
            return null;
        }
    }
    _ShowHindAnswer = ({ item, index }) => {
        return (
            <View style={{ marginBottom: index == this.data.length - 1 ? SmartScreenBase.smPercenHeight * 15 : 0 }}>
                {console.log("Setstate Parents")}
                <ViewItem7 screen={this}
                    index={index}
                    item={item}
                    data={this.data.length}
                    CheckNumber={this.NumberCheck}
                />
            </View>
        )
    }
}
