import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image, ScrollView } from "react-native";
import StyleLesson from "../../StyleLesson";
import SmartScreenBase from "../../../../base/SmartScreenBase";
import stylesApp from "../../../../styleApp/stylesApp";
import TextDownLine from "../../../../../componentBase/TextDownLine/TextDownLine";
import EventBus from "react-native-event-bus";
export default class CarouselTruFalse extends Component {


	option = ["A", "B", "C", "D", "E", "F", "G", "H"];
	constructor(props) {
		super(props);
		this.state = {
			refresh: false,
			keyChoose: -1
		}
		this._ChooseAnswer = this._ChooseAnswer.bind(this);
	}
	_ChooseAnswer(key, index) {
		this.setState({ keyChoose: key });
		this.props.screen._OnpressAnswer(key, index)
	}

	componentDidMount() {
		let { answer } = this.props;
		if (answer) {
			this.setState({ keyChoose: answer });
		}
	}

	render() {
		let { index, item, total,dataAnswer } = this.props;
		// console.log(item,"item-------------------------")	
		// console.log(this.props.dataAnswer,"")
		// console.log(index)
		let rightAnswer = {correct : false,value : ""};
		if(dataAnswer.length > 0){
			rightAnswer.correct = dataAnswer[index].question_score > 0 ? true : false;
			rightAnswer.value = rightAnswer.correct ?  dataAnswer[index].final_user_choice : "";
		}
		return (
			<View style={[StyleLesson.Sty_View_Border, {
				width: SmartScreenBase.smPercenWidth * 84,
				alignItems: "center",
				marginTop: SmartScreenBase.smPercenHeight * 5.2,
				height: SmartScreenBase.smPercenHeight * 25,
			}]}>
				{/* <View style={{height: SmartScreenBase.smPercenWidth*15}}> */}
				<TextDownLine textBody={item.question}/>
				{/* </View> */}
				{/* <Text style={[stylesApp.txt, {
					...StyleLesson.question_text,
					marginTop: SmartScreenBase.smPercenHeight * 2,
					width: SmartScreenBase.smPercenWidth * 80,
					textAlign: "center",
					paddingBottom: SmartScreenBase.smPercenHeight * 2
				}]}>{item.question}</Text> */}
				<ScrollView>
					<View style={{ marginBottom: SmartScreenBase.smPercenHeight * 5}}>
						{
							item.option.map((option, key) => {
								let k = option.slice(0, 3);
								let v = option.slice(3, option.length);
								let rightAns = false;
								console.log(option, "---")
								if(rightAnswer.correct){
									rightAns = rightAnswer.value.trim().toLowerCase() == option.trim().toLowerCase() ? true : false;
								}
								return (
									<TouchableOpacity key={key} onPress={() => { this._ChooseAnswer(key, index) }}
										disabled={rightAnswer.correct}
									>
										<View style={{
											width: SmartScreenBase.smPercenWidth * 75,
											backgroundColor: rightAns ? "#f8e920" :  (this.state.keyChoose == key ? "#f8e920" : "lightgray"),
											marginTop: SmartScreenBase.smPercenHeight,
											borderRadius: SmartScreenBase.smPercenWidth * 4,
											marginLeft: SmartScreenBase.smPercenHeight,
										}} >
											<Text style={[StyleLesson.question_text, { padding: SmartScreenBase.smPercenHeight}]} >
												{option}</Text>
										</View>
									</TouchableOpacity>
								)
							})
						}
					</View>
				</ScrollView>
				<View style={{
					position: "absolute", top: -SmartScreenBase.smBaseWidth * 98,
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
