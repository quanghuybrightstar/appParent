import React, { Component } from "react";
import { Text, View, TouchableOpacity, Image } from "react-native";
import SmartScreenBase from "../../../../base/SmartScreenBase";
import StyleLesson from "../../StyleLesson";
import stylesApp from "../../../../styleApp/stylesApp";
import TextDownLine from "../../../../../componentBase/TextDownLine/TextDownLine";
import EventBus from "react-native-event-bus";
export default class CarouselTruFalse extends Component {
	constructor(props) {
		super(props);
		this.state = {
			refresh: false,
			Choose: null
		}
	}

	render() {
		let { index, item, total, answer, disableTouch } = this.props;
		return (
			<View style={[StyleLesson.Sty_View_Border, {
				margin: SmartScreenBase.smPercenWidth * 0,
				width: SmartScreenBase.smPercenWidth * 84,
				alignItems: "center",
				marginTop: SmartScreenBase.smPercenHeight * 5,
				paddingBottom: SmartScreenBase.smPercenHeight * 0,
			}]}>
				{/* <Text style={[stylesApp.txt, {
					marginTop: SmartScreenBase.smPercenHeight * 2,
					width: SmartScreenBase.smPercenWidth * 80, textAlign: "center",
					fontSize: SmartScreenBase.smFontSize * 45
				}]}>{item.question}</Text> */}
				<TextDownLine textBody={item.question}/>
				<View style={{ marginTop: SmartScreenBase.smPercenHeight * 2, flexDirection: "row" }}>
					<TouchableOpacity
						disabled={disableTouch}
						onPress={() => {
							this.state.Choose = true;
							this.setState({ refresh: !this.state.refresh });
							this.props.screen._OnpressAnswer(true, index);
						}}>
						<View style={{
							width: SmartScreenBase.smPercenWidth * 42,
							backgroundColor: answer[index] === true ? '#F9E815' : "rgba(216,216,216,0.95)",
							borderRightWidth: 2, borderColor: "white",
							borderBottomLeftRadius: SmartScreenBase.smPercenWidth * 3,
							alignItems: "center", justifyContent: "center",
							height: SmartScreenBase.smPercenHeight * 5
						}}>
							<Text style={stylesApp.txt_Title}>TRUE</Text>
						</View>
					</TouchableOpacity>
					<TouchableOpacity
						disabled={disableTouch}
						onPress={() => {
							this.state.Choose = false;
							this.setState({ refresh: !this.state.refresh });
							this.props.screen._OnpressAnswer(false, index);
						}}>
						<View style={{
							width: SmartScreenBase.smPercenWidth * 42,
							backgroundColor: answer[index] === false ? '#F9E815' : "rgba(216,216,216,0.95)",
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
