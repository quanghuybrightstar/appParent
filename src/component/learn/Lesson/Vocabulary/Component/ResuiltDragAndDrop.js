import React, { Component } from "react";
import { Text, View, Image, FlatList ,TouchableOpacity} from "react-native";
import StyleLesson from "../../StyleLesson";
import SmartScreenBase from "../../../../base/SmartScreenBase";
import stylesApp from "../../../../styleApp/stylesApp";
import ButtonCheck from "../../../../items/ButtonCheck";

export default class ResuiltDragAndDrop extends Component {
    constructor(props) {
        super(props);

    }
    render() {
        let { checkResuilt, data, NumberTrue, total, } = this.props;
        return (
            <View style={StyleLesson.HeightExercise}>
                <View style={{ alignSelf: "center", alignItems: "center" }}>
                    <View>
                        <Image source={{ uri: checkResuilt == true ? "Grammar1-1" : "Grammar1-2" }}
                            style={StyleLesson.Sty_Image_Large_Answer} />
                    </View>
                    <Text style={{
                        marginTop: SmartScreenBase.smPercenHeight,
                        color: "white", fontWeight: "600",
                        fontSize: SmartScreenBase.smPercenWidth * 4
                    }}>BẠN ĐÃ TRẢ LỜI ĐÚNG {NumberTrue}/{total}</Text>
                </View>
                <View style={{ width: SmartScreenBase.smPercenWidth * 100, alignItems: "center", marginTop: SmartScreenBase.smPercenHeight * 2, }}>
                    <View style={{ position: "absolute", top: 0 }}>
                        <Image source={{ uri: "student_home_image13" }}
                            style={[StyleLesson.Sty_ImageList, { transform: [{ rotate: "180deg" }] }]}
                        />
                    </View>
                    <View style={{
                        marginTop: SmartScreenBase.smPercenHeight * 3,
                        width: SmartScreenBase.smPercenWidth * 100
                    }}>
                        <FlatList
                            data={data.word}
                            keyExtractor={(item, index) => "item" + index}
                            renderItem={this.RenderItemResuilt.bind(this)}
                            contentContainerStyle={{ alignItems: "center" }}
                        />
                    </View>
                </View>
                <View style={{ alignSelf: "center", bottom: SmartScreenBase.smPercenHeight * 2 ,position:"absolute"}}>
                        <TouchableOpacity onPress={() => { this.props.screen.NextScreen() }}>
                            <ButtonCheck TextButton={"Tiếp tục"} />
                        </TouchableOpacity>
                </View>
            </View>
        )
    }
    RenderItemResuilt = ({ item, index }) => {
        return (
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", width: SmartScreenBase.smPercenWidth * 100}}>
                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
                    <View style={{ alignItems: "flex-start", justifyContent: "center" }}>
                        <Image source={{ uri: this._ShowBackGroundResuilt(index) }}
                               style={{ width: SmartScreenBase.smPercenWidth * 33, height: SmartScreenBase.smPercenWidth * 20, resizeMode: "contain" }}
                        />
                        <Text style={[stylesApp.txt, { position: "absolute", left: SmartScreenBase.smPercenWidth * 3 }]}>{item}</Text>
                    </View>
                    <View style={{ alignItems: "flex-start", justifyContent: "center", translateX: -SmartScreenBase.smPercenWidth * 6 }}>
                        <Image source={{ uri: 'lesson_vocab_image21' }}
                               style={{ width: SmartScreenBase.smPercenWidth * 55, height: SmartScreenBase.smPercenWidth * 20, resizeMode: "contain" }}
                        />
                        <Text style={[stylesApp.txt, { position: "absolute", left: SmartScreenBase.smPercenWidth * 10, textAlign: "center" }]}>{this.props.data.mean[index]}</Text>
                    </View>

                </View>
                <View style={{ position: "absolute", right: -SmartScreenBase.smBaseWidth+5, }}>
                    <Image source={{ uri: this.props.data.mean[index] == this.props.Answer[index] ? "Grammar1-4" : "Grammar1-3" }}
                           style={StyleLesson.Sty_Image_Small_Answer} />
                </View>
            </View>

        )
    }
    _ShowBackGroundResuilt(id) {
        let { data, Answer } = this.props
        if (data.mean[id] == Answer[id]) {
            return 'lesson_vocab_image23';
        } else {
            return 'lesson_vocab_image22';
        }
    }
}
