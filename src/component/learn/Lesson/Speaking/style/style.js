import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import SmartScreenBase from '../../../../base/SmartScreenBase';

const { width, height } = Dimensions.get('window');

const smartScreen = SmartScreenBase.smPercenHeight;

export default StyleSheet.create({
    container: {
        flex: 1
    },
    containerLq: {
        flex: 1,
        marginBottom: smartScreen * 10,
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
        marginTop: smartScreen * 2.5,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: smartScreen * 3,
    },
    buttonAnswer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: smartScreen * 1.5,
        borderColor: '#C6E50E',
        borderWidth: 1,
        borderRadius: smartScreen * 1.7,
        width: '45%',
        margin:'2%',
        height: smartScreen * 6,
        flexDirection: 'row',
    },

    styleSlider: {
        width: width - (smartScreen * 6),
    },
    styleViewSlider: {
        marginBottom: SmartScreenBase.smPercenHeight * 4,
        marginTop: SmartScreenBase.smPercenHeight * 2,
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
        marginTop: smartScreen * 2
    },
    viewRenderItemF4: {
        width: width - smartScreen * 6,
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
    iconAudio: {
        position: 'absolute',
        top: smartScreen * 1.5,
        right: smartScreen * 1.5,
    },
    imageAudio: {
        width: smartScreen * 6,
        height: smartScreen * 6,
        backgroundColor: '#5293CA',
        borderRadius: 50
    },
    viewStress: {
        flexDirection: 'row',
        marginBottom: smartScreen,
        marginTop: smartScreen,
    },
    viewStrCh: {
        width: '30%',
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
        bottom: smartScreen,
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
        height: height * 0.5,
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
        height: smartScreen * 5,
        borderRadius: smartScreen * 4,
        borderWidth: 2,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    textInput: {
        width: smartScreen * 10,
        textAlign: 'center',
        fontWeight: 'bold'
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
        bottom: smartScreen * 20,
        left: - smartScreen
    },
    viewListAnswerF9: {
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
    styleSliderF9: {
        width: width - (smartScreen * 13),
        marginLeft: smartScreen/2,
    },
})
