import { StyleSheet, Dimensions, Platform, TextInput } from 'react-native';
import SmartScreenBase from '../../../base/SmartScreenBase';
import StyleLesson from '../../../component/learn/Lesson/StyleLesson';
import { Colors } from '../../../styleApp/color';
import { FontSize, FontWeight } from '../../../styleApp/font';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1
    },
    insideContainer: { flex: 1, alignItems: 'center', paddingTop: SmartScreenBase.smBaseHeight * 25, paddingBottom: SmartScreenBase.smBaseHeight * 13 },
    instructionItem: {
        width: width - SmartScreenBase.smBaseWidth * 40 * 2,
    },
    row: { flexDirection: 'row' },
    instructionItemBox: {
        paddingHorizontal: SmartScreenBase.smBaseWidth * 40,
        // width: '100%'
    },
    instructionImage: {
        width: '100%',
        height: SmartScreenBase.smPercenHeight * 30,
        borderRadius: SmartScreenBase.smBaseWidth * 25,
    },
    instructionText: {
        marginTop: SmartScreenBase.smBaseHeight * 20,
        marginHorizontal: SmartScreenBase.smBaseHeight * 20,
        flexDirection: 'row' ,
        flexWrap: 'wrap'
    },
    instructionPagination: {
        width: '100%', justifyContent: 'center', alignItems: 'center', marginTop: SmartScreenBase.smBaseHeight * 14
    },
    paginationDot: {
        width: SmartScreenBase.smBaseWidth * 40, height: SmartScreenBase.smBaseWidth * 40, borderRadius: SmartScreenBase.smBaseWidth * 20, borderWidth: 1, borderColor: Colors.BaseGreen, marginRight: SmartScreenBase.smBaseWidth * 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    paginationDotInside: {
        width: SmartScreenBase.smBaseWidth * 26, height: SmartScreenBase.smBaseWidth * 26,
        borderRadius: SmartScreenBase.smBaseWidth * 13,
    },
    submitBtn: {
        borderRadius: SmartScreenBase.smBaseWidth * 500,
        width: SmartScreenBase.smBaseWidth * 420
    },
    answerInput: {
        textAlignVertical: 'top',
        height: SmartScreenBase.smBaseHeight * 180,
        fontStyle: 'normal',
        ...FontWeight.LightItalic,
        fontSize: FontSize.size50Font,
        elevation: 0,
        borderWidth: 1,
        borderColor: Colors._127opacity04,
        borderRadius: SmartScreenBase.smBaseWidth * 15,
        shadowColor: Colors.White,
    },
    submitModal: {
        paddingHorizontal: SmartScreenBase.smPercenWidth * 3,
        paddingTop: SmartScreenBase.smBaseHeight * 30,
        borderRadius: SmartScreenBase.smBaseWidth * 30,
        paddingBottom: SmartScreenBase.smBaseHeight * 30
    },
    submitLabel: {
        textAlign: 'left',
        width: '100%',
        ...FontWeight.Regular,
        marginTop: SmartScreenBase.smBaseHeight * 20,
        fontSize: FontSize.size65Font,
        paddingLeft: SmartScreenBase.smBaseWidth * 30
    },
    questionBox: {
        marginLeft: SmartScreenBase.smBaseWidth * 80,
        fontSize: FontSize.size50Font,
        color: 'white',
        textAlign: 'center',
        ...FontWeight.Bold
        // marginTop: 10
    },
    loadingView: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: Colors._black03,
        justifyContent: 'center',
        alignItems: 'center'
    },
    ImageBackGround: {
        width: SmartScreenBase.smPercenWidth * 100,
        height: SmartScreenBase.smPercenHeight * 100,
        resizeMode: 'cover',
    },
    loading: { flex: 1, position: 'absolute', zIndex: 1000 },
    instructionBox: { flex: 9, width: '100%', paddingHorizontal: SmartScreenBase.smBaseWidth * 40, justifyContent: 'center', alignItems: 'center' },
    instructionDetailBox: {
        borderRadius: SmartScreenBase.smBaseWidth * 45,
        width: '100%',
        height: '90%',
        backgroundColor: 'white',
        paddingVertical: SmartScreenBase.smBaseHeight * 20
    },
    instructionLabel: { fontSize: FontSize.size55Font,
         ...FontWeight.Bold, marginHorizontal: SmartScreenBase.smBaseWidth * 40, marginBottom: SmartScreenBase.smBaseHeight * 20 },
    submitBox: { flex: 2, width: '100%', justifyContent: 'center', alignItems: 'center' },
    trashBtn: { position: 'absolute', width: SmartScreenBase.smBaseWidth * 130, height: SmartScreenBase.smBaseWidth * 130, justifyContent: 'center', alignItems: 'center', right: SmartScreenBase.smBaseWidth * 24 },
    trashImage: { height: SmartScreenBase.smBaseWidth * 80, width: SmartScreenBase.smBaseWidth * 80, resizeMode: 'contain', tintColor: Colors._00cbad },
    mediaBox: { flex: 1, paddingHorizontal: '15%', justifyContent: 'center', alignItems: 'center', width: '100%' },
    mediaItem: { flexDirection: "row", height: SmartScreenBase.smBaseWidth * 115, borderRadius: SmartScreenBase.smBaseWidth * 115, width: '100%', backgroundColor: Colors.White, alignItems: 'center' },
    mediaName: {
        fontSize: FontSize.size50Font,
        // paddingHorizontal: SmartScreenBase.smBaseWidth * 25,
        paddingLeft: SmartScreenBase.smBaseWidth * 15,
        flex: 1,
        paddingRight: SmartScreenBase.smBaseWidth * 25,
    },
    mediaIcon: { marginLeft: 4, width: SmartScreenBase.smBaseWidth * 95, height: SmartScreenBase.smBaseWidth * 95, borderRadius: SmartScreenBase.smBaseWidth * 50, backgroundColor: Colors.GrayB6, justifyContent: 'center', alignItems: 'center' },
    mediaImage: { width: SmartScreenBase.smBaseWidth * 45, height: SmartScreenBase.smBaseWidth * 45, resizeMode: 'contain', tintColor: Colors.Gray },
    viewBack: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between'
    },
    modalBox: {
        paddingBottom: SmartScreenBase.smBaseHeight * 40,
        paddingTop: SmartScreenBase.smBaseHeight * 40,
    },
    messageDeleteStyle: {
        marginBottom: 0,
        paddingBottom: 0
    },
    notifyBox: {
        width: SmartScreenBase.smPercenWidth * 90, 
        height: SmartScreenBase.smPercenWidth * 13,
        justifyContent: 'center',
        alignItems: 'center', 
        borderRadius: SmartScreenBase.smPercenWidth*2,
        backgroundColor: Colors.White, 
        paddingHorizontal: SmartScreenBase.smPercenWidth*2
    },
    messageModalStyle: {
        marginBottom: SmartScreenBase.smBaseHeight * 20,
        color: Colors.Black,
        fontSize: FontSize.size55Font,
        lineHeight: SmartScreenBase.smBaseHeight * 40
    },
    messageSuccessModalText: {
        paddingTop: 0,
        paddingBottom: 0,
        color: Colors.Black,
        marginBottom: 0,
        lineHeight: SmartScreenBase.smBaseHeight * 30
    },
    messageSuccessModalBox: {
        paddingTop: SmartScreenBase.smPercenHeight * 4,
        paddingBottom: SmartScreenBase.smPercenHeight * 2,
    },
    messageSuccessModal: {
        paddingHorizontal: SmartScreenBase.smPercenWidth * 8
    },
    containerView: {
        height: SmartScreenBase.smBaseWidth * 265,
        marginTop: 0,
        paddingHorizontal: SmartScreenBase.smPercenWidth * 3,
        justifyContent: 'center',
        width: SmartScreenBase.smPercenWidth * 85,
        borderRadius: SmartScreenBase.smPercenWidth * 6,
        backgroundColor: Colors._00000020,
    },
    quesWrapper: {
        justifyContent: 'center',
        // paddingVertical: SmartScreenBase.smPercenHeight * 1.5,
    },
    outerContainer: {
        height: SmartScreenBase.smPercenHeight * 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgWrapper: {
        ...StyleLesson.Position_ImageType1,
        top: SmartScreenBase.smPercenHeight * 7 - SmartScreenBase.smBaseWidth * 199 / 2,
        left: -SmartScreenBase.smPercenWidth * 8,
        zIndex: 100,
    },
    btnWrapper: {
        ...StyleLesson.Position_ImageType2,
        right: -SmartScreenBase.smPercenWidth * 6,
        bottom: -SmartScreenBase.smPercenWidth * 1,
    },
    videoContainer: {
        height: SmartScreenBase.smPercenHeight * 26
    },
    questionContainer: { paddingVertical: SmartScreenBase.smPercenHeight, justifyContent: 'center' }
})