import {Text, View, Image, TouchableOpacity, Animated, Alert, ScrollView} from 'react-native';
import React, {useState, useEffect, useMemo} from 'react';
import StyleLesson from '../StyleLesson';
import SmartScreenBase from '../../../../base/SmartScreenBase';

let interval;

const TypeExercise = (props) => {

	const [translate, setTranslate] = useState(false);
	const [miniTest, setMiniTest] = useState(true);
	const [time, setTime] = useState('15:00');
	const {vietnam, english, typeExercise} = props;
	let duration = 60 * 15;

	useEffect(() => {
		let timer = duration, minutes, seconds;
		setInterval(function () {
			minutes = parseInt(timer / 60, 10);
			seconds = parseInt(timer % 60, 10);

			minutes = minutes < 10 ? '0' + minutes : minutes;
			seconds = seconds < 10 ? '0' + seconds : seconds;

			setTime(minutes + ':' + seconds);
			if (--timer < 0) {
				timer = duration;
			}
		}, 1000);
	}, []);

	const _onPressOut = () => {
		Alert.alert(
			'Thông báo',
			'Bạn có chắc muốn thoát bài học không ?',
			[
				{text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
				{
					text: 'OK',
					onPress: () => props.goBack(),
					style: 'cancel',
				},
			],
			{cancelable: false},
		);
	};

	const timeCountDown = useMemo(() => <Text
		style={{fontSize: SmartScreenBase.smFontSize * 45, color: '#f7931e'}}>{time}</Text>, [time]);

	return (
		<View>
			<View style={{alignSelf: 'center', alignItems: 'center', marginTop: SmartScreenBase.smPercenHeight * 2}}>
				<View style={[StyleLesson.Sty_Width_Screen, {marginTop: SmartScreenBase.smPercenHeight * 3}]}>
					<View style={StyleLesson.View_Process}>
						<Animated.View style={[StyleLesson.Process, {width: SmartScreenBase.smPercenWidth * 80}]}/>
					</View>
					<View style={{width: SmartScreenBase.smPercenWidth * 10, alignItems: 'center'}}>
						<TouchableOpacity onPress={() => _onPressOut()}>
							<View>
								<Image source={{uri: 'lesson_image3'}}
									   style={StyleLesson.ImageExit}
								/>
							</View>
						</TouchableOpacity>
					</View>
				</View>
				<View style={{marginRight: SmartScreenBase.smPercenWidth * 2}}>
					<Text style={{fontSize: SmartScreenBase.smPercenWidth * 4, fontWeight: '700', color: 'white'}}>
						1/1
					</Text>
				</View>
			</View>
			{
				typeExercise
					?
					<View style={{
						height: SmartScreenBase.smPercenHeight * 15,
						justifyContent: 'center',
						alignItems: 'center',
					}}>
						<View style={{
							...StyleLesson.Position_ImageType1,
							top: SmartScreenBase.smPercenWidth,
							left: SmartScreenBase.smPercenWidth * 3,
							zIndex: 100,
						}}>
							{
								miniTest
									?
									<View style={{justifyContent: 'center', alignItems: 'center'}}>
										<Image source={{uri: 'donghominitest'}}
											   style={{
												   ...StyleLesson.Sty_ImageTyle_1,
												   width: SmartScreenBase.smPercenWidth * 25,
												   height: SmartScreenBase.smPercenWidth * 25,
											   }}
											   resizeMode={'contain'}
										/>
										<View style={{position: 'absolute'}}>
											{timeCountDown}
										</View>
									</View>
									:
									<Image source={{uri: 'lesson_image1'}}
										   style={StyleLesson.Sty_ImageTyle_1}
									/>
							}
						</View>
						<ScrollView contentContainerStyle={{
							...StyleLesson.Sty_Tyle_Lesson,
							height: SmartScreenBase.smPercenHeight * 10,
							paddingHorizontal: SmartScreenBase.smPercenWidth * 3,
						}}>
							<Text style={StyleLesson.Sty_Text_Type_Lesson}>
								{
									translate ?
										vietnam
										:
										english
								}
							</Text>
						</ScrollView>
						<View style={{
							...StyleLesson.Position_ImageType2,
							right: SmartScreenBase.smPercenWidth * 5,
							bottom: SmartScreenBase.smPercenWidth * 3,
						}}>
							<TouchableOpacity
								onPress={() => setTranslate(!translate)}
							>
								<Image source={{uri: 'lesson_image2'}}
									   style={StyleLesson.Sty_ImageTyle_2}
								/>
							</TouchableOpacity>
						</View>
					</View>
					:
					null
			}
		</View>
	);
};

export default TypeExercise;
