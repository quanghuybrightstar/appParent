import React, { Component } from "react";
import { Text, View ,TouchableOpacity,Image} from "react-native";
import SmartScreenBase from "../../../../base/SmartScreenBase";
import StyleLesson from "../../StyleLesson";
import stylesApp from "../../../../styleApp/stylesApp";
export default class CarouselTrueFalseAt extends Component {
    constructor(props) {
        super(props);
    }
    render() {
		let { index,item, total, answer } = this.props;
        return (
            <View style={[StyleLesson.Sty_View_Border, {
                margin: SmartScreenBase.smPercenWidth * 0,
                width: SmartScreenBase.smPercenWidth * 84,
                alignItems: "center",
                marginTop: SmartScreenBase.smPercenHeight * 5,
                paddingBottom: SmartScreenBase.smPercenHeight * 0,
            }]}>
                <Text style={[stylesApp.txt, {
                    marginTop: SmartScreenBase.smPercenHeight * 2,
					width: SmartScreenBase.smPercenWidth * 80, textAlign: "center",
					fontSize: SmartScreenBase.smFontSize * 40
                }]}>{item.question}</Text>
                <View style={{ marginTop: SmartScreenBase.smPercenHeight * 4, flexDirection: "row" }}>
                    <TouchableOpacity disabled={true} >
                        <View style={{
                            width: SmartScreenBase.smPercenWidth * 42,
                            backgroundColor: answer[index] === true && answer[index] === item.answer ? '#72B228' : answer[index] === true && answer[index] !== item.answer ? '#D80B0B' : 'rgba(216,216,216,0.95)',
                            borderRightWidth: 2, borderColor: "white",
                            borderBottomLeftRadius: SmartScreenBase.smPercenWidth * 3,
                            alignItems: "center", justifyContent: "center",
                            height: SmartScreenBase.smPercenHeight * 5
                        }}>
                            <Text style={stylesApp.txt_Title}>TRUE</Text>
                        </View>
                    </TouchableOpacity>
					<TouchableOpacity disabled={true}>
                        <View style={{
                            width: SmartScreenBase.smPercenWidth * 42,
                            backgroundColor: answer[index] === false && answer[index] === item.answer ? '#72B228' : answer[index] === false && answer[index] !== item.answer ? '#D80B0B' : 'rgba(216,216,216,0.95)',
                            borderBottomRightRadius: SmartScreenBase.smPercenWidth * 3,
                            alignItems: "center", justifyContent: "center",
                            height: SmartScreenBase.smPercenHeight * 5
                        }}>
                            <Text style={stylesApp.txt_Title}>FALSE</Text>
                        </View>
                    </TouchableOpacity>
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
                    }]}>{index + 1}/{total}</Text>
                </View>
            </View>
        )
    }
}
