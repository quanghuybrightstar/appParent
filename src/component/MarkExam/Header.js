import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, Animated, TouchableOpacity, Image, FlatList, Slider, Modal } from 'react-native';
import stylesApp from '../styleApp/stylesApp';
import SmartScreenBase from '../base/SmartScreenBase';
import API from '../../API/APIConstant';
import axios from "axios";
import LoadingScreen from '../../screens/LoadingScreen';
import StyleLesson from '../learn/Lesson/StyleLesson';

const smartScreenHeight = SmartScreenBase.smPercenHeight;
const smartScreenWidth = SmartScreenBase.smPercenWidth;
const smartFont = SmartScreenBase.smFontSize;

const Header = (props) => {

	const { exercise_name, name_exercise } = props;

	return (
		<View>
			<View style={{
				justifyContent: "space-between",
				alignItems: "center",
				backgroundColor: "rgba(0,0,0,0.3)",
				flexDirection: "row",
			}}>
				<View style={{
					marginLeft: SmartScreenBase.smPercenWidth * 2,
					flexDirection: 'row',
					alignItems: 'center',
					justifyContent: 'center',
					marginTop: SmartScreenBase.smPercenHeight * 3
				}}>
					<TouchableOpacity style={{
						width: SmartScreenBase.smPercenWidth * 5,
						height: SmartScreenBase.smPercenWidth * 5,
						// backgroundColor: '#fff',
					}}
						onPress={() => props.goBack()}
					>
						<Image style={{
							width: SmartScreenBase.smPercenWidth * 5,
							height: SmartScreenBase.smPercenWidth * 5,
						}}
							resizeMode={'contain'}
							source={{ uri: "imageback" }} />
					</TouchableOpacity>

					<Text style={{
						color: 'white',
						marginLeft: SmartScreenBase.smPercenWidth * 5,
						fontSize: SmartScreenBase.smPercenWidth * 5,
						padding: smartScreenHeight,
					}}>{exercise_name}</Text>
				</View>
			</View>
			<View style={{ ...StyleLesson.Sty_Tyle_Lesson }}>
				<View style={StyleLesson.Position_ImageType1}>
					<Image source={{ uri: 'lesson_image1' }} style={StyleLesson.Sty_ImageTyle_1} />
				</View>
				<Text style={[StyleLesson.Sty_Text_Type_Lesson, { textAlign: 'left', zIndex: 1 }]}>
					{name_exercise}
				</Text>
			</View>
		</View>
	);
};

export default Header;