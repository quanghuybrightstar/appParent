import React from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';
import SmartScreenBase from '../../../../base/SmartScreenBase';

const { width, height } = Dimensions.get('window');

const smartScreenHeight = SmartScreenBase.smPercenHeight;
const smartScreenWidth = SmartScreenBase.smPercenWidth;
const smartFont = SmartScreenBase.smFontSize;

export default StyleSheet.create({
	container: {
		flex: 1
	},
	containerLq: {
		flex: 1,
		marginBottom: smartScreenHeight * 10,
	},
	containerF6: {
		width: smartScreenWidth * 100,
		alignItems: 'center',
		alignSelf: 'center',
	},
	containerF14: {
		flex: 1,
		// height: smartScreenHeight * 87,
		width: smartScreenWidth * 100,
		alignItems: 'center',
		alignSelf: 'center',
	},
	viewQueF6: {
		width: smartScreenWidth * 100,
		alignItems: 'center',
		alignSelf: 'center',
	},
	contentQuestion: {
		marginTop: smartScreenHeight * 5,
		width: smartScreenWidth * 85,
		height: smartScreenHeight * 30,
		backgroundColor: '#fff',
		borderRadius: smartScreenWidth * 3
	},
	contentQuestionF14: {
		flex: 2,
		marginTop: smartScreenHeight * 5,
		width: smartScreenWidth * 85,
		height: smartScreenHeight * 30,
		backgroundColor: '#fff',
		borderRadius: smartScreenWidth * 3
	},
	txtQt: {
		padding: smartScreenWidth * 4,
		flexDirection: 'row',
		flexWrap: 'wrap'
	},
	imgLesson: {
		width: SmartScreenBase.smBaseWidth * 254,
		height: SmartScreenBase.smBaseWidth * 168, resizeMode: "contain"
	},
	viewImgLes: {
		position: "absolute",
		top: smartScreenHeight * 27,
		right: 0,
	},
	carousel: {
		width: smartScreenWidth * 85,
		height: smartScreenHeight * 25,
		backgroundColor: '#fff',
		borderRadius: smartScreenWidth * 5,
		marginTop: smartScreenHeight * 5, zIndex: 1
	},
	viewCa: {
		marginTop: smartScreenHeight * 5,
		width: smartScreenWidth * 85,
	},
	btnF6: {
		width: smartScreenWidth * 40,
		padding: smartScreenWidth * 3,
		marginTop: smartScreenHeight * 2,
		borderRadius: smartScreenWidth * 4,
		marginLeft: smartScreenWidth * 1.5
	},
	viewFlat: {
		backgroundColor: '#fff',
		marginTop: smartScreenHeight * 8,
		height: smartScreenHeight * 22,
		borderRadius: smartScreenWidth * 5,
	},
	viewList: {
		position: "absolute",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: 'red',
		top: - smartScreenHeight * 2
	},
	viewF: {
		marginTop: smartScreenHeight * 5
	},
	viewImg: {
		position: "absolute",
		alignItems: "center",
		justifyContent: "center",
		width: '100%',
		top: - smartScreenHeight * 3.5
	},
	imgF: {
		width: smartScreenHeight * 7,
		height: smartScreenHeight * 7,
		resizeMode: "contain"
	},
	txtT: {
		position: 'absolute',
		fontSize: smartFont * 50,
		fontWeight: 'bold'
	},
	viewCheck: {
		position: 'absolute',
		bottom: - smartScreenHeight * 12,
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonCheck: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#00283A',
		marginBottom: smartScreenHeight * 2,
		borderRadius: (width - (smartScreenHeight * 6)) / 2,
		width: width - (smartScreenHeight * 6),
		height: smartScreenHeight * 6
	},
	viewCheckRd: {
		position: 'absolute',
		bottom: smartScreenHeight,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	viewBtnRd: {
		width: '50%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonRedo: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#00283A',
		marginBottom: smartScreenHeight * 2,
		borderRadius: (width - (smartScreenHeight * 6)) / 2,
		height: smartScreenHeight * 6,
		width: smartScreenHeight * 20
	},
	textNumberTrue: {
		marginTop: smartScreenHeight,
		color: "white",
		fontWeight: "600",
		fontSize: smartFont * 50,
		fontFamily: 'iCielSoupofJustice'
	},
	imageClose: {
		width: smartScreenHeight * 5,
		height: smartScreenHeight * 5,
		resizeMode: "contain"
	},
	closeModal: {
		position: 'absolute',
		left: smartScreenWidth * 40,
		top: - smartScreenHeight * 2.5
	},
	viewEx: {
		position: 'absolute',
		bottom: - smartScreenHeight * 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	webView: {
		flex: 1,
		zIndex: 100000,
		position: 'absolute',
		height: smartScreenHeight * 35,
		width: smartScreenWidth * 85,
		backgroundColor: '#fff',
	},
	btnCloseWebView: {
		width: smartScreenWidth * 8,
		height: smartScreenWidth * 8,
		position: 'absolute',
		backgroundColor: '#000',
		borderRadius: smartScreenWidth * 8,
		zIndex: 100000,
		justifyContent: 'center',
		alignItems: 'center',
		top: smartScreenWidth,
		right: smartScreenWidth
	},
	view_next_back: {
		position: 'absolute',
		top: Platform.OS === 'ios' ? SmartScreenBase.smPercenHeight * 32 : SmartScreenBase.smPercenHeight * 27,
		width: '100%',
	},
	btnpn: {
		position: 'absolute',
		top: -SmartScreenBase.smPercenHeight,
	},
	view_next_back_f6: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingTop: SmartScreenBase.smPercenHeight,
		paddingHorizontal: SmartScreenBase.smPercenWidth * 10,
	},
})
