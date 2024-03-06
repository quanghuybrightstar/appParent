import React from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';
import SmartScreenBase from '../../../../base/SmartScreenBase';

const { width, height } = Dimensions.get('window');

const smartScreenHeight = SmartScreenBase.smPercenHeight;
const smartScreenWidth = SmartScreenBase.smPercenWidth;
const smartFont = SmartScreenBase.smFontSize;

export default StyleSheet.create({
	viewQueF14: {
		width: smartScreenWidth * 100,
		alignItems: 'center',
		alignSelf: 'center',
		// flex: 1,
		justifyContent: "space-around"
	},
	viewCheck: {
		// bottom: smartScreenHeight,
		marginTop: smartScreenHeight * 2,
		justifyContent: 'center',
		alignItems: 'center',
	},
	viewCheckBtn: {
		position: 'absolute',
		...Platform.select({
			android: {
				bottom: smartScreenHeight * 3.5,
			},
			ios: {
				bottom: smartScreenHeight * 3.5,
			},
			default: {
				bottom: smartScreenHeight * 3.5,
			}
		}),
		// bottom: smartScreenHeight,
		// marginTop: - smartScreenHeight * 7,
		// ...Platform.select({
		// 	android: {
		// 		marginBottom: smartScreenHeight * 4,
		// 	},
		// 	ios: {
		// 		marginBottom: smartScreenHeight * 2,
		// 	}
		// }),
		justifyContent: 'center',
		alignItems: 'center',
	},
	viewEx: {
		marginTop: smartScreenHeight * 2,
		justifyContent: 'center',
		alignItems: 'center',
	},
	container: {
		flex: 1
	},
	inner: {
		flex: 1,
		width: smartScreenWidth * 100,
		alignItems: 'center',
		alignSelf: 'center',
	},
	header: {
		fontSize: 36,
		marginBottom: 48
	},
	textInput: {
		height: 40,
		borderColor: "#000000",
		borderBottomWidth: 1,
		marginBottom: 36
	},
	btnContainer: {
		backgroundColor: "white",
		marginTop: 12
	},
	containerF14: {
		flex: 1,
		// height: smartScreenHeight * 87,
		width: smartScreenWidth * 100,
		alignItems: 'center',
		alignSelf: 'center',
	},
	contentQuestion: {
		flex: 3,
		marginTop: smartScreenHeight * 5,
		width: smartScreenWidth * 85,
		height: smartScreenHeight * 30,
		backgroundColor: '#fff',
		borderRadius: smartScreenWidth * 3
	},
	textInput: {
		...Platform.select({
			ios: {
				padding: 0
			},
			android: {
				height: smartScreenHeight * 2.5
			}
		})
	},
	textInput2: {
		...Platform.select({
			android: {
				marginBottom: smartScreenHeight ,
				padding: 0,
				marginBottom: -1,
			}
		})
	}
})
