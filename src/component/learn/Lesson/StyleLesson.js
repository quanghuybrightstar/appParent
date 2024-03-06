import {StyleSheet, Dimensions} from 'react-native';
import SmartScreenBase from '../../../base/SmartScreenBase';
import FontBase from '../../../base/FontBase';
import { Colors } from '../../../styleApp/color';

//const {width, height} = Dimensions.get('window');
SmartScreenBase.baseSetup();
export default StyleSheet.create({
    text_explain: {
        fontSize: SmartScreenBase.smFontSize * 55,
        color: '#000000',
        fontWeight: 'bold',
    },
    question_content: {
        marginTop: SmartScreenBase.smPercenHeight * 2,
        marginBottom: SmartScreenBase.smPercenHeight * 3
    },
    script_text: { // text script listening
        fontFamily: FontBase.MyriadPro_Regular,
        fontSize: SmartScreenBase.smFontSize * 42,
        color: '#000000',
    },
    explain_text: { // text nội dung giải thích
        // fontFamily: 'myriadpro_light_italic',
        fontSize: SmartScreenBase.smFontSize * 42,
        color: '#000000',
        fontStyle: 'italic',
    },
    question_text: { // text đoạn văn các dạng có đoạn văn
        // fontFamily: 'myriadpro_regular',
        fontSize: SmartScreenBase.smFontSize * 45,
        // color: '#000000',
        // lineHeight: SmartScreenBase.smPercenHeight * 2
    },
    question_text_2: { // câu đề bài của các dạng viết lại câu hoặc trả lời câu hỏi
        fontFamily: FontBase.MyriadPro_Regular,
        fontSize: SmartScreenBase.smFontSize * 46,
        color: '#000000',
    },
    input_text: { // text input của các dạng viết lại câu hoặc trả lời câu hỏi
        fontFamily: FontBase.MyriadPro_Regular,
        fontSize: SmartScreenBase.smFontSize * 42,
        color: '#8E1C76',
    },
    answer_text: {
        fontSize: SmartScreenBase.smFontSize * 50,
        fontFamily: FontBase.MyriadPro_Bold,
    },
    answerTrue_text: { // câu trả lời đúng của các dạng viết lại câu hoặc trả lời câu hỏi
        fontFamily: FontBase.MyriadPro_Bold,
        fontSize: SmartScreenBase.smFontSize * 42,
        color: Colors.TrueGreen,
    },
    answerFalse_text: { // câu trả lời sai của các dạng viết lại câu hoặc trả lời câu hỏi
        fontFamily: FontBase.MyriadPro_Bold,
        fontSize: SmartScreenBase.smFontSize * 42,
        color: Colors.FalseRed,
    },
    text_answer: {
        fontSize: SmartScreenBase.smFontSize * 60,
        marginTop: SmartScreenBase.smPercenHeight,
        color: 'white',
        fontWeight: '600',
        fontFamily: 'iCielSoupofJustice',
        paddingBottom: SmartScreenBase.smPercenHeight * 2
    },
    HeightExercise: {
        height: '90%',
        // alignSelf: 'center',
        // backgroundColor:'red',
        width: SmartScreenBase.smPercenWidth*100,
        paddingHorizontal: 20,
    },
    Sty_Width_Screen: {
        width: SmartScreenBase.smPercenWidth * 100,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    View_Process: {
        width: SmartScreenBase.smPercenWidth * 80,
        height: SmartScreenBase.smPercenHeight * 2.5,
        borderRadius: (SmartScreenBase.smPercenHeight * 2.5) / 2,
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: 'rgba(255,255,255,0.4)',
    },
    Process: {
        height: SmartScreenBase.smPercenHeight * 2.5 - 2,
        borderRadius: (SmartScreenBase.smPercenHeight * 2.5) / 2,
        backgroundColor: 'rgba(255,255,255,0.9)',
    },
    Sty_Tyle_Lesson: {
        alignSelf: 'center',
        width: SmartScreenBase.smPercenWidth * 85,
        borderRadius: SmartScreenBase.smPercenWidth * 6,
        backgroundColor: 'rgba(0,0,0,0.3)',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginTop: SmartScreenBase.smPercenHeight * 2,
    },
    Sty_Text_Type_Lesson: {
        fontSize: SmartScreenBase.smPercenWidth * 4,
        color: 'white',
        textAlign: 'center',
        fontWeight: '500',
        marginLeft: SmartScreenBase.smPercenWidth * 15,
        marginVertical: SmartScreenBase.smPercenHeight * 2,
        marginRight: SmartScreenBase.smPercenWidth,
    },
    Sty_ImageTyle_1: {
        width: SmartScreenBase.smBaseWidth * 207,
        height: SmartScreenBase.smBaseWidth * 199,
        resizeMode: 'contain',
    },
    Sty_ImageTyle_2: {
        width: SmartScreenBase.smBaseWidth * 95,
        height: SmartScreenBase.smBaseWidth * 95,
        resizeMode: 'contain',
    },
    Position_ImageType1: {
        position: 'absolute',
        left: -SmartScreenBase.smPercenWidth * 5,
        top: -SmartScreenBase.smPercenHeight,
    },
    Position_ImageTypeD1: {
        position: 'absolute',
        left: -SmartScreenBase.smPercenWidth * 5,
        top: -SmartScreenBase.smPercenHeight,
    },
    Position_ImageType2: {
        position: 'absolute',
        right: -SmartScreenBase.smPercenWidth * 0,
        bottom: -SmartScreenBase.smPercenWidth * 3,
        width: SmartScreenBase.smBaseWidth * 100,
        height: SmartScreenBase.smBaseWidth * 100,
    },
    Text_Title: {
        fontWeight: 'bold',
        fontSize: SmartScreenBase.smPercenWidth * 4.5,
        color: 'white',
    },
    Sty_Image_Notify: {
        width: SmartScreenBase.smBaseWidth * 903,
        height: SmartScreenBase.smBaseWidth * 306,
        resizeMode: 'contain',
    },
    Sty_ImageList: {
        width: SmartScreenBase.smBaseWidth * 1081,
        height: SmartScreenBase.smBaseWidth * 80,
        resizeMode: 'contain',
    },
    Sty_View_Border: {
        width: SmartScreenBase.smPercenWidth * 90,
        borderRadius: SmartScreenBase.smPercenWidth * 3,
        backgroundColor: 'rgba(255,255,255,0.95)',
        padding: SmartScreenBase.smPercenHeight,
        marginVertical: SmartScreenBase.smPercenHeight/3,
        alignSelf: 'center',
        alignItems: 'center',
        // marginTop: SmartScreenBase.smPercenHeight * 2,

    },
    Sty_Image_Small_Answer: {
        width: SmartScreenBase.smBaseWidth * 112,
        height: SmartScreenBase.smBaseWidth * 112,
        resizeMode: 'contain',
    },
    Sty_ViewChooseSendTo: {
        height: SmartScreenBase.smPercenHeight * 3,
        width: SmartScreenBase.smPercenWidth * 80,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: SmartScreenBase.smPercenWidth * 3,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    ImageExit: {
        width: SmartScreenBase.smBaseWidth * 54,
        height: SmartScreenBase.smBaseWidth * 54,
        resizeMode: 'contain',
    },
    Sty_Image_Large_Answer: {
        width: SmartScreenBase.smBaseWidth * 281,
        height: SmartScreenBase.smBaseWidth * 324,
        resizeMode: 'contain',
    },
    Image_reuilt: {
        width: SmartScreenBase.smBaseWidth * 130,
        height: SmartScreenBase.smBaseWidth * 130,
        resizeMode: 'contain',
    },
    Image_CheckPlaySound: {
        width: SmartScreenBase.smBaseWidth * 97,
        height: SmartScreenBase.smBaseWidth * 97,
        resizeMode: 'contain',
    },
    Image_Sound: {
        width: SmartScreenBase.smBaseWidth * 118,
        height: SmartScreenBase.smBaseWidth * 118,
        resizeMode: 'contain',
    },
    Image_Explain: {
        width: SmartScreenBase.smBaseWidth * 50,
        height: SmartScreenBase.smBaseWidth * 50,
        resizeMode: 'contain',
    },
    ImageHint: {
        width: SmartScreenBase.smBaseWidth * 120,
        height: SmartScreenBase.smBaseWidth * 120,
        resizeMode: 'contain',
    },
    ImageRecorder: {
        width: SmartScreenBase.smBaseWidth * 590,
        height: SmartScreenBase.smBaseWidth * 590,
        resizeMode: 'contain',
    },
    ImageListenRecorder: {
        width: SmartScreenBase.smBaseWidth * 128,
        height: SmartScreenBase.smBaseWidth * 128,
        resizeMode: 'contain',
    },
    Border_View: {
        marginHorizontal: SmartScreenBase.smPercenWidth * 2,
        paddingHorizontal: SmartScreenBase.smPercenWidth * 2,
        borderWidth: SmartScreenBase.smPercenWidth / 2,
        borderRadius: SmartScreenBase.smPercenWidth * 3,
        marginTop: SmartScreenBase.smPercenHeight,
    },
    Sty_ImageTyle_Pronunciation1: {
        width: SmartScreenBase.smBaseWidth * 100,
        height: SmartScreenBase.smBaseWidth * 100,
        resizeMode: 'contain',
        marginLeft: 10,
    },
    Sty_ImageTyle_1_1_2D1: {
        width: SmartScreenBase.smBaseWidth * 100,
        height: SmartScreenBase.smBaseWidth * 100,
        resizeMode: 'contain',
    },
    microPronunciationD1: {
        position: 'absolute',
        zIndex: 1,
        marginTop: SmartScreenBase.smPercenHeight * 50,
        justifyContent: 'center',
        alignItems: 'center',
        width: SmartScreenBase.smPercenWidth * 85,
    },
    micro2: {
        justifyContent: 'center',
        alignItems: 'center',
        width: SmartScreenBase.smPercenWidth * 100,
    },
    Sty_ImageTyle_1_4_3: {
        width: SmartScreenBase.smBaseWidth * 700,
        height: SmartScreenBase.smBaseWidth * 300,
        resizeMode: 'contain',
    },
    showmodal_PronunciationD1: {
        alignItems: 'center',
        height: SmartScreenBase.smPercenHeight * 35,
        width: '90%',
        borderRadius: 20,
        backgroundColor: '#FFFFFF',
    },
});
