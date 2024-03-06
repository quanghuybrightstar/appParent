import { StyleSheet, Dimensions, Platform } from 'react-native';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import FontBase from '../../../../base/FontBase';

//const { width, height } = Dimensions.get('window');

const smartScreen = SmartScreenBase.smPercenHeight;
const smartScreenWidth = SmartScreenBase.smPercenWidth;

export default StyleSheet.create({
	container: {
		flex: 1
	},
	containerLq: {
		flex: 1,
		marginBottom: smartScreen * 10,
	},
	Viewchampion: {
        width: '100%',
        height: '70%',
        paddingTop: SmartScreenBase.smPercenWidth*1.5,
    },
	viewPronunciation: {
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonFormat: {
		width: '90%',
		height: '6%',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'blue',
		marginBottom: smartScreen * 1.5,
		borderRadius: smartScreen * 1.5 / 2,
	},
	viewListAnswerF5: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: smartScreen,
	},
	viewListAnswer: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: smartScreen * 3,
	},

	buttonAnswer: {
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: smartScreen * 1.5,
		borderRadius: smartScreen * 1.5 / 2,
		width: SmartScreenBase.smPercenWidth*100 - (smartScreen * 6),
		height: smartScreen * 6
	},
	buttonAnswerF2: {
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: smartScreen * 1.5,
		borderRadius: smartScreen * 1.5,
		width: SmartScreenBase.smPercenWidth*100 - (smartScreen * 6),
		height: smartScreen * 7
	},
	backgroundColorNoChoose: {
		backgroundColor: '#fff',
	},
	backgroundColorChoose: {
		backgroundColor: '#F9E815',
	},
	styleSlider: {
		width: SmartScreenBase.smPercenWidth*100 - (smartScreen * 6),
	},
	styleViewSlider: {
		marginBottom: SmartScreenBase.smPercenHeight * 2,
		marginTop: SmartScreenBase.smPercenHeight * 3,
	},
	viewCheck: {
		position: 'absolute',
		bottom: smartScreen * 3,
		paddingHorizontal: smartScreen * 3,
		justifyContent: 'center',
		alignItems: 'center',
	},
	buttonCheck: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#00283A',
		marginBottom: smartScreen * 3,
		borderRadius: (SmartScreenBase.smPercenWidth*100 - (smartScreen * 6)) / 2,
		width: SmartScreenBase.smPercenWidth*100 - (smartScreen * 6),
		height: smartScreen * 6
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: SmartScreenBase.smPercenHeight*100 / 2,
	},
	modalView: {
		margin: 15,
		backgroundColor: "white",
		borderRadius: 20,
		padding: 15,
		alignItems: "center",
		width: SmartScreenBase.smPercenWidth*100 - (smartScreen * 6),
		borderWidth: 5,
	},
	openButton: {
		backgroundColor: "#F194FF",
		borderRadius: 20,
		padding: 10,
		elevation: 2
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center"
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center"
	},
	imageError: {
		width: smartScreen * 12,
		height: smartScreen * 12
	},
	viewContentModal: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		alignItems: 'center'
	},
	viewTextModal: {
		width: '70%',
		justifyContent: 'center',
		alignItems: 'center'
	},
	closeModal: {
		position: 'absolute',
		top: - (smartScreen * 8) / 2,
	},
	closeModalF2: {
		position: 'absolute',
		top: - smartScreen * 3,
	},
	imageClose: {
		width: smartScreen * 8,
		height: smartScreen * 8
	},
	imageCloseF2: {
		width: smartScreen * 6,
		height: smartScreen * 6
	},
	modalPopup: {
		backgroundColor: '#00000060',
		position: 'absolute',
		width: SmartScreenBase.smPercenWidth*100,
		height: SmartScreenBase.smPercenHeight*100,
		zIndex: 1000
	},
	imageSound: {
		width: smartScreen * 8,
		height: smartScreen * 8,
		marginTop: smartScreen * 7
	},
	viewRenderItemF4: {
		width: SmartScreenBase.smPercenWidth*100 - smartScreen * 6,
		backgroundColor: '#eaf4f7',
		borderRadius: smartScreen * 2,
		marginBottom: smartScreen * 3,
		justifyContent: 'center',
		alignItems: 'center',
	},
	textHeader: {
		fontWeight: 'bold',
		fontSize: smartScreen * 2,
		color: '#000',
		padding: smartScreen * 3,
	},
	textHeaderF4: {
		fontWeight: 'bold',
		color: '#000',
		padding: smartScreen * 3,
	},
	iconAudioF5: {
		// position: 'absolute',
		// top: smartScreen * 1.5,
		// right: smartScreen * 1.5,
		backgroundColor: '#5293CA',
		borderRadius: smartScreen * 1000,
		// tintColor: '#5293CA'
	},
	iconAudio: {
		position: 'absolute',
		top: smartScreen * 1.5,
		right: smartScreen * 1.5,
		backgroundColor: '#5293CA',
		borderRadius: smartScreen * 3
	},
	imageAudio: {
		width: SmartScreenBase.smPercenWidth*10,
		height: SmartScreenBase.smPercenWidth*10,

	},
	viewStress: {
		flexDirection: 'row',
		marginBottom: smartScreen,
		marginTop: smartScreen,
	},
	viewStrCh: {
		width: '33%',
		// paddingHorizontal: smartScreen,
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	buttonCkF4: {
		borderWidth: 2,
		borderRadius: smartScreen * 1.5,
		paddingLeft: smartScreen * 4.8,
		paddingRight: smartScreen * 4.8,
		paddingTop: smartScreen,
		paddingBottom: smartScreen,
		// justifyContent: 'center',
		// height: smartScreen * 5
	},
	buttonCk: {
		borderWidth: 2,
		borderRadius: smartScreen * 1.5,
		// paddingLeft: smartScreen * 5,
		// paddingRight: smartScreen * 5,
		// paddingTop: smartScreen * 1.5,
		// paddingBottom: smartScreen * 1.5,
		justifyContent: 'center',
		height: SmartScreenBase.smPercenWidth * 9
	},
	viewCheckF4: {
		position: 'absolute',
		bottom: smartScreen,
		paddingHorizontal: smartScreen * 3,
		justifyContent: 'center',
		alignItems: 'center',
	},
	viewCheckD6: {
		position: 'absolute',
		width:SmartScreenBase.smPercenWidth*100,
		paddingHorizontal: smartScreen * 3,
		justifyContent: 'center',
		alignItems: 'center',
	},
	viewCheckF9: {
		// bottom: smartScreen,
		// marginTop: smartScreen * 5,
		paddingHorizontal: smartScreen * 3,
		justifyContent: 'center',
		alignItems: 'center',
	},
	viewShowScore: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginTop: smartScreen * 4,
		marginBottom: smartScreen * 10,
		paddingHorizontal: smartScreen / 2,
	},
	viewScore: {
		width: '33%',
		paddingHorizontal: smartScreen / 2,
		justifyContent: 'center',
	},
	viewSco: {
		backgroundColor: '#eaf3f6',
		height: smartScreen * 45,
		borderRadius: smartScreen * 2
	},
	viewItemCheck: {
		borderWidth: 2,
		borderRadius: 100,
		paddingTop: smartScreen * 1.5,
		paddingBottom: smartScreen * 1.5,
		alignItems: 'center',
		justifyContent: 'center',
		margin: smartScreen * 0.3,
	},
	imageModal: {
		width: SmartScreenBase.smPercenWidth*100,
		height: smartScreen * 20
	},
	centeredViewCheck: {
		justifyContent: "center",
		alignItems: "center",
		position: 'absolute',
		bottom: smartScreen * 7,
		left: - smartScreen
	},
	centeredViewCheckF4: {
		justifyContent: "center",
		alignItems: "center",
		position: 'absolute',
		bottom: smartScreen * 10,
		left: - smartScreen
	},
	textIsScore: {
		fontWeight: 'bold',
		fontSize: smartScreen * 2,
		paddingTop: smartScreen * 3,
		padding: smartScreen,
		color: '#fff'
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
		marginBottom: smartScreen * 4,
		borderRadius: (SmartScreenBase.smPercenWidth*100 - (smartScreen * 6)) / 2,
		height: smartScreen * 6,
		width: smartScreen * 20
	},
	viewCheckRd: {
		position: 'absolute',
		bottom: smartScreen,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	viewCheckF9: {
		// position: 'absolute',
		bottom: smartScreen,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	viewStrChF5: {
		// paddingHorizontal: smartScreen,
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	viewStressF5: {
		// flexDirection: 'row',
		marginBottom: smartScreen * 1.5,
		marginTop: SmartScreenBase.smPercenWidth*5,
		alignItems: 'center',
		// backgroundColor: 'red'
	},
	textHeaderF5: {
		fontFamily: FontBase.MyriadPro_Bold,
		fontSize: SmartScreenBase.smFontSize*45,
		color: '#000',
		padding: SmartScreenBase.smPercenWidth*3.5,
	},
	viewRenderItemF5: {
		width: SmartScreenBase.smPercenWidth*100 - smartScreen * 3,
		backgroundColor: '#eaf4f7',
		borderRadius: smartScreen * 2,
		marginBottom: smartScreen * 3,
	},
	viewRenderF9: {
		flexDirection: 'row',
		alignItems: 'center',
		flexWrap: 'wrap',
	},
	viewRenderItemF9: {
		width: SmartScreenBase.smPercenWidth*100 - smartScreen * 6,
		backgroundColor: '#eaf4f7',
		borderRadius: smartScreen * 2,
		marginBottom: smartScreen * 5,
		paddingTop: smartScreen * 3,
		paddingBottom: smartScreen * 6,
		padding: smartScreen,
		borderWidth: 2,
		flexWrap: 'wrap',
		flexDirection: 'row',
		alignItems: 'center'
	},
	viewInputF9: {
		maxWidth: SmartScreenBase.smPercenWidth * 80,
		minWidth: SmartScreenBase.smPercenWidth * 20,
		height: smartScreen * 7,
		borderRadius: smartScreen * 4,
		borderWidth: 2,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
	},
	textInput: {
		width: smartScreen * 10,
		// height: smartScreen/2,
		textAlign: 'center',
		fontWeight: 'bold',
		zIndex: 10,
		padding: 0
	},
	positionImageF9: {
		position: 'absolute',
		top: -smartScreen * 3,
		left: smartScreen * 2,
		zIndex: 1000,
	},
	styImgF9: {
		width: smartScreen * 6,
		height: smartScreen * 6
	},
	centeredViewCheckF9: {
		justifyContent: "center",
		alignItems: "center",
		position: 'absolute',
		bottom: smartScreen * 15,
		left: - smartScreen
	},
	viewListAnswerF9: {
		flexDirection: 'row',
		alignItems: 'center',
		// paddingHorizontal: SmartScreenBase.smPercenWidth * 1,
		marginTop: SmartScreenBase.smPercenHeight * 6,
		marginBottom: SmartScreenBase.smPercenHeight * 3,
	},
	imageSoundF9: {
		width: smartScreen * 6,
		height: smartScreen * 6,
	},
	styleSliderF9: {
		width: SmartScreenBase.smPercenWidth*100 - (smartScreen * 13),
		marginLeft: smartScreen / 2,
	},
	questionContent: {
		flexDirection: 'row',
		color: '#fff',
		marginBottom: smartScreen * 3,
	},
	textListNumber: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: smartScreen * 3,
	},
	textListNumber2: {
		fontSize: smartScreen * 2.5
	},
	backgroundColorNoChooseF10: {
		backgroundColor: '#fff',
		borderColor: '#BBD54E',
		borderWidth: 2
	},
	backgroundColorChooseF10: {
		backgroundColor: '#F9E815',
		borderColor: '#fff',
		borderWidth: 2
	},
	buttonAnswerF10: {
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: smartScreen * 1.5,
		borderRadius: smartScreen * 1.5,
		width: SmartScreenBase.smPercenWidth*100 - (smartScreen * 6),
		height: smartScreen * 6
	},
	checkNoF10: {
		backgroundColor: '#EE5555',
		borderColor: '#fff',
		borderWidth: 2
	},
	checkF10: {
		backgroundColor: '#BBD54E',
		borderColor: '#fff',
		borderWidth: 2
	},
	centeredViewCheckF10: {
		justifyContent: "center",
		alignItems: "center",
		position: 'absolute',
		bottom: smartScreen * 11,
		left: - smartScreen
	},
	viewListAnswerF10: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: smartScreen * 4,
	},
	styleViewSliderF10: {
		marginBottom: SmartScreenBase.smPercenHeight,
		marginTop: SmartScreenBase.smPercenHeight * 2,
	},
	playSoundF10: {
		marginTop: - smartScreen * 3,
	},
	styleSliderF10: {
		...Platform.select({
			ios: {
				width: smartScreenWidth * 87,
			},
			default: {
				width: smartScreenWidth * 95,
			}
		}),
	},
	textHeaderF11: {
		fontWeight: 'bold',
		fontSize: smartScreen * 4,
		color: '#fff',
		// padding: smartScreen * 2,
	},
	viewListAnswerF11: {
		// justifyContent: 'center',
		// alignItems: 'center',
		paddingHorizontal: SmartScreenBase.smPercenWidth * 4,
	},
	viewHeaderF11: {
		margin: 0,
		// backgroundColor: '#000'
	},
	viewStressF11: {
		// flexDirection: 'row',
		marginBottom: smartScreen * 1.5,
		// marginTop: smartScreen/2,
	},
	viewStrChF11: {
		// paddingHorizontal: smartScreen * 1,
		// justifyContent: 'space-between',
		// alignItems: 'center',
		marginBottom: smartScreen,
		width: '50%',
		alignItems: 'center',
		justifyContent: 'center'
	},
	buttonCkF11: {
		borderWidth: 2,
		borderRadius: smartScreen * 2,
		paddingLeft: smartScreen * 4,
		paddingRight: smartScreen * 4,
		paddingTop: smartScreen * 1.5,
		paddingBottom: smartScreen * 1.5,
		width: '90%',
		height: smartScreen * 7,
		alignItems: 'center',
		justifyContent: 'center'
	},
	buttonCheckF11: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#00283A',
		marginBottom: smartScreen * 2,
		borderRadius: (SmartScreenBase.smPercenWidth*100 - (smartScreen * 6)) / 2,
		width: '32%',
		height: smartScreen * 6
	},
	viewCheckF11: {
		position: 'absolute',
		bottom: smartScreen,
		paddingHorizontal: smartScreen * 3,
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
	},
	btnNb: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#00283A',
		marginBottom: smartScreen * 2,
		borderRadius: (SmartScreenBase.smPercenWidth*100 - (smartScreen * 6)) / 2,
		width: '32%',
		height: smartScreen * 6
	},
	explainF11: {
		marginBottom: smartScreen * 35,
		justifyContent: 'center',
		alignItems: 'center',
	},
	textExplainF11: {
		color: '#fff',
		fontSize: smartScreen * 3
	},
	centeredViewF11: {
		flex: 1,
		paddingHorizontal: smartScreen * 2,
		marginTop: smartScreen * 3
	},
	modalViewF11: {
		backgroundColor: "white",
		borderRadius: 20,
		marginTop: smartScreen * 3,
		width: SmartScreenBase.smPercenWidth*100 - (smartScreen * 6),
		borderWidth: 5,
		paddingHorizontal: smartScreen * 3
	},
	closeMoF11: {
		justifyContent: 'center',
		alignItems: 'center',
		// width: width - (smartScreen * 6),
	},
	closeModalF11: {
		position: 'absolute',
		top: - (smartScreen * 8) / 2,
	},
	viewContentModalF11: {
		marginTop: smartScreen * 4,
		flexDirection: 'row',
		borderBottomWidth: 1,
		borderBottomColor: '#000',
		paddingBottom: smartScreen,
		alignItems: 'center',
	},
	imgExplainF11: {
		width: SmartScreenBase.smBaseWidth * 60,
		height: SmartScreenBase.smBaseWidth * 60,
	},
	viewDetailsExplainF11: {
		marginTop: smartScreen * 3,
		marginBottom: smartScreen * 3,
	},
	btnNbExplain: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#00283A',
		marginBottom: smartScreen * 2,
		borderRadius: (SmartScreenBase.smPercenWidth*100 - (smartScreen * 6)) / 2,
		width: '48%',
		height: smartScreen * 6
	},
	viewRenderItemF6: {
		width: SmartScreenBase.smPercenWidth*100 - smartScreen * 12,
		backgroundColor: '#eaf4f7',
		borderRadius: smartScreen * 2,
		marginBottom: smartScreen * 3,
		height: smartScreen * 15,
		borderWidth: 2
		// justifyContent: 'center',
		// alignItems: 'center'
	},
	iconAudioF6: {
		position: 'absolute',
		top: smartScreen * 4,
		right: smartScreen * 1.1,
		backgroundColor: '#5293CA',
		borderRadius: smartScreen * 3
	},
	viewLaF6: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		marginLeft:smartScreen * 2,
	},
	txtRdF6: {
		fontFamily: FontBase.MyriadPro_Bold,
		fontSize: SmartScreenBase.smFontSize*50
	},
	closeModalF6: {
		position: 'absolute',
		top: smartScreen * 5,
		left: smartScreen * 6,
		zIndex: 100
	},
	imageCloseF6: {
		width: smartScreen * 6,
		height: smartScreen * 6
	},
	viewListAnswerF6: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	viewLa2F6: {
		flex: 1,
		justifyContent: 'center',
		marginLeft: smartScreen * 10
	},
	containerLqF11: {
		flex: 1,
		marginBottom: smartScreen * 15,
	},
	viewRenderItemF8: {
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: smartScreen * 1.5
	},
	buttonCheckF11C: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#00283A',
		marginBottom: smartScreen * 2,
		borderRadius: (SmartScreenBase.smPercenWidth*100 - (smartScreen * 6)) / 2,
		width: '90%',
		height: smartScreen * 6
	},
	btnNbF11: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#00283A',
		marginBottom: smartScreen * 2,
		borderRadius: (SmartScreenBase.smPercenWidth*100 - (smartScreen * 6)) / 2,
		width: '48%',
		height: smartScreen * 6
	},
	imageSoundD8: {
		height:smartScreen * 6,
		width:smartScreen * 6,
	},
	viewModalF4: {
		position: 'absolute', bottom: 0, width: '100%'
	}
});
