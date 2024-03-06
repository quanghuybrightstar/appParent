import React from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';
import SmartScreenBase from '../../../../../base/SmartScreenBase';

const { width, height } = Dimensions.get('window');

const smartScreen = SmartScreenBase.smPercenHeight;
const smartFont = SmartScreenBase.smFontSize;

export default StyleSheet.create({
    container: {
        flex: 1
    },
    containerLq: {
        flex: 1,
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
        width: width - (smartScreen * 6),
        height: smartScreen * 6
    },
    backgroundColorNoChoose: {
        backgroundColor: '#fff',
    },
    backgroundColorChoose: {
        backgroundColor: '#F9E815',
    },
    styleSlider: {
        width: width - (smartScreen * 6),
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
        borderRadius: (width - (smartScreen * 6)) / 2,
        width: width - (smartScreen * 6),
        height: smartScreen * 6
    },
    buttonCheckD8: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00283A',
        marginBottom: smartScreen * 2,
        borderRadius: (width - (smartScreen * 6)) / 2,
        width: width - (smartScreen * 6),
        height: smartScreen * 6
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: height / 2,
    },
    modalView: {
        margin: 15,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 15,
        alignItems: "center",
        width: width - (smartScreen * 6),
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
    imageClose: {
        width: smartScreen * 8,
        height: smartScreen * 8
    },
    modalPopup: {
        backgroundColor: '#00000060',
        position: 'absolute',
        width: width,
        height: height,
        zIndex: 1000
    },
    imageSound: {
        width: smartScreen * 8,
        height: smartScreen * 8,
        marginTop: smartScreen * 7
    },
    viewRenderItemD6: {
        width: width - smartScreen * 6,
        backgroundColor: '#eaf4f7',
        borderRadius: smartScreen * 2,
        marginBottom: smartScreen * 3,
        justifyContent: 'center',
    },
    textHeaderD6: { 
        fontSize: smartFont * 45,
        fontWeight: '600',
    },

    textHeader: {
        fontWeight: 'bold',
        fontSize: smartScreen * 2,
        color: '#000',
        padding: smartScreen * 3,
    },
    iconAudio: {
        position: 'absolute',
        top: smartScreen * 1.5,
        right: smartScreen * 1.5,
        backgroundColor: '#5293CA',
        borderRadius: smartScreen * 3
    },
    imageAudio: {
        width: smartScreen * 6,
        height: smartScreen * 6,
        
    },
    viewStress: {
        flexDirection: 'row',
        marginBottom: smartScreen*1,
        marginTop: smartScreen*1,
        justifyContent:'space-evenly',
        alignContent:'center'
    },
    viewStrCh: {
        width: SmartScreenBase.smPercenWidth*45,
        paddingHorizontal: smartScreen * 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    buttonCk: {
        borderWidth: 2,
        borderRadius: smartScreen * 1.5,
        paddingLeft: smartScreen * 4,
        paddingRight: smartScreen * 4,
        paddingTop: smartScreen * 1.5,
        paddingBottom: smartScreen * 1.5,
    },
    viewCheckF4: {
        position: 'absolute',
        bottom: -smartScreen*2,
        paddingHorizontal: smartScreen * 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewCheckD8: {
        paddingHorizontal: smartScreen * 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewShowScore: {
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: smartScreen * 4,
        marginBottom: smartScreen * 10,
        paddingHorizontal: smartScreen / 2,
    },
    viewScore: {
        width: '90%',
        paddingHorizontal: smartScreen / 2,
        justifyContent: 'center',
    },
    viewSco: {
        marginTop: smartScreen,
        backgroundColor: '#eaf3f6',
        borderRadius: smartScreen * 2
    },
    viewItemCheck: {
        borderWidth: 2,
        borderRadius: 100,
        paddingTop: smartScreen * 1.5,
        paddingBottom: smartScreen * 1.5,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
    },
    imageModal: {
        width: width,
        height: smartScreen * 20
    },
    centeredViewCheck: {
        justifyContent: "center",
        alignItems: "center",
        position: 'absolute',
        bottom: smartScreen * 7,
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
        marginBottom: smartScreen * 2,
        borderRadius: (width - (smartScreen * 6)) / 2,
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
    viewStrChF5: {
        paddingHorizontal: smartScreen * 1,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    viewStressF5: {
        flexDirection: 'row',
        marginBottom: smartScreen * 1.5,
        marginTop: smartScreen,
    },
    textHeaderF5: {
        fontWeight: 'bold',
        fontSize: smartScreen * 2,
        color: '#000',
        padding: smartScreen * 2,
    },
    viewRenderItemF5: {
        width: width - smartScreen * 6,
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
        width: width - smartScreen * 6,
        backgroundColor: '#eaf4f7',
        borderRadius: smartScreen * 2,
        marginBottom: smartScreen * 5,
        paddingTop: smartScreen * 3,
        paddingBottom: smartScreen * 3,
        padding: smartScreen,
        borderWidth: 2, 
        flexWrap: 'wrap', 
        flexDirection: 'row', 
        alignItems: 'center'
    },
    viewInputF9: {
        width: smartScreen * 15,
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
    centeredViewCheckD8: {
        justifyContent: "center",
        alignItems: "center",
        position: 'absolute',
        bottom: smartScreen * 15,
        left: - smartScreen
    },
    centeredViewCheckD9: {
        justifyContent: "center",
        alignItems: "center",
        position: 'absolute',
        bottom: smartScreen * 15,
        left: - smartScreen
    },
    viewListAnswerF9: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: smartScreen * 3,
        marginTop: smartScreen * 6,
        marginBottom: smartScreen * 3,
    },
    viewListAnswerD8: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: smartScreen * 3,
        marginTop: smartScreen * 6,
        marginBottom: smartScreen * 3,
    },
    imageSoundF9: {
        width: smartScreen * 6,
        height: smartScreen * 6,
    },
    imageSoundD8: {
        width: smartScreen * 6,
        height: smartScreen * 6,
    },
    styleSliderF9: {
        width: width - (smartScreen * 13),
        marginLeft: smartScreen/2,
    },
    styleSliderD8: {
        width: width - (smartScreen * 13),
        marginLeft: smartScreen/2,
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
        width: width - (smartScreen * 6),
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
        width: width - (smartScreen * 8),
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
        paddingHorizontal: smartScreen * 5,
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
        borderRadius: (width - (smartScreen * 6)) / 2,
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
        borderRadius: (width - (smartScreen * 6)) / 2,
        width: '32%',
        height: smartScreen * 6
    },
    explainF11: {
        marginBottom: smartScreen * 25,
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
        width: width - (smartScreen * 6),
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
        borderBottomWidth:1,
        borderBottomColor: '#000',
        paddingBottom: smartScreen,
        alignItems: 'center'
    },
    imgExplainF11: {
        width: smartScreen * 3,
        height: smartScreen * 3
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
        borderRadius: (width - (smartScreen * 6)) / 2,
        width: '48%',
        height: smartScreen * 6
    },
    viewRenderItemF6: {
        width: width - smartScreen * 15,
        backgroundColor: '#eaf4f7',
        borderRadius: smartScreen * 2,
        marginBottom: smartScreen * 3,
        height: smartScreen * 10,
        borderWidth: 2
        // justifyContent: 'center',
        // alignItems: 'center'
    },
    iconAudioF6: {
        position: 'absolute',
        top: smartScreen * 2,
        right: smartScreen * 1.5,
        backgroundColor: '#5293CA',
        borderRadius: smartScreen * 3
    },
    viewLaF6: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: smartScreen * 2.5
    },
    txtRdF6: {
        fontWeight: 'bold',
        fontSize: smartScreen * 2.5
    },
    closeModalF6: {
        position: 'absolute',
        top: smartScreen * 2,
        left: smartScreen * 5,
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
        marginLeft: smartScreen * 3
    },
    containerLqF11: {
        flex: 1,
        marginBottom: smartScreen * 15,
    }
})