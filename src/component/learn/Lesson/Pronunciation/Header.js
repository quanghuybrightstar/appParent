import React, { useState, useEffect } from 'react';
import { View, Text, Alert, Animated, TouchableOpacity, Image } from 'react-native';
import styles from './style';
import StyleLesson from '../StyleLesson';
import stylesApp from '../../../styleApp/stylesApp';
import SmartScreenBase from '../../../../base/SmartScreenBase';

const Header = (props) => {

	const { navigation } = props;

	let width = props.total ? ((props.index + 1) * SmartScreenBase.smPercenWidth * 80 / props.total) : 0;

	const _exit = () => {
		Alert.alert(
			'Thông báo',
			'Bạn có chắc muốn thoát bài học không ?',
			[
				{
					text: 'Cancel',
					onPress: () => console.log('Cancel Pressed'),
					style: 'cancel',
				},
				{
					text: 'Yes',
					onPress: () => _goBack(),
					style: 'cancel',
				},
			],
			{ cancelable: false },
		);
	}

	const _goBack = () => {
		props.stopSound();
		props.goBack();
	}

	return (
		<View style={{ alignSelf: 'center', alignItems: 'center', marginTop: SmartScreenBase.smPercenHeight * 2 }}>
			<View
				style={[
					StyleLesson.Sty_Width_Screen,
					{ marginTop: SmartScreenBase.smPercenHeight * 3 },
				]}>
				<View style={StyleLesson.View_Process}>
					<Animated.View
						style={[StyleLesson.Process, { width: width ?? 0 }]}
					/>
				</View>
				<View
					style={{
						width: SmartScreenBase.smPercenWidth * 10,
						alignItems: 'center',
					}}>
					<TouchableOpacity
						onPress={() => _exit()}
					>
						<View>
							<Image
								source={{ uri: 'lesson_image3' }}
								style={StyleLesson.ImageExit}
							/>
						</View>
					</TouchableOpacity>
				</View>
			</View>
			<View style={{ marginRight: SmartScreenBase.smPercenWidth * 2 }}>
				<Text
					style={{
						fontSize: SmartScreenBase.smPercenWidth * 4,
						fontWeight: '700',
						color: 'white',
					}}>
					{props.index + 1}/{props.total}
				</Text>
			</View>
		</View>
	);
};

export default Header;
