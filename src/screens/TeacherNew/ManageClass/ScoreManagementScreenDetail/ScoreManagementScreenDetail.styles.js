import { StyleSheet, Dimensions, Platform } from 'react-native';
import FontBase from '../../../../base/FontBase';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import { Colors } from '../../../../styleApp/color';
import { FontSize, FontWeight } from '../../../../styleApp/font';
import stylesApp from '../../../../styleApp/stylesApp';
const { width, height } = Dimensions.get('window');
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors._F3FFFF,
        alignItems: 'center',
    },
    buttonText: {
        color: Colors.White,
        ...FontWeight.Bold,
        marginLeft: SmartScreenBase.smBaseWidth * 20,
    },
    button: {
        alignSelf: 'center',
        marginVertical: SmartScreenBase.smBaseHeight * 20,
        borderRadius: SmartScreenBase.smBaseWidth * 100
    },
    buttonItem: {
        flexDirection: 'row',
        paddingVertical: SmartScreenBase.smBaseWidth * 70,
        borderBottomWidth: 1, borderColor: Colors._DDDDDD,
        borderRadius: SmartScreenBase.smBaseWidth * 40,
        marginHorizontal: SmartScreenBase.smBaseWidth * 20
    },
    flatlist: {
        // flex: 1,
        backgroundColor: Colors.White,
        // borderRadius: SmartScreenBase.smBaseWidth * 40,
        width: SmartScreenBase.smPercenWidth * 100 - SmartScreenBase.smBaseWidth * 40,
        // ...stylesApp.shadow

    },
    viewAvatar: {
        width: SmartScreenBase.smBaseWidth * 150,
    },
    viewContent: {
        flex: 1,
        paddingLeft: SmartScreenBase.smBaseWidth * 30,
        paddingRight: SmartScreenBase.smBaseWidth * 15,
    },
    viewPoint: {
        width: SmartScreenBase.smPercenWidth * 19,
    },
    avatar: {
        width: SmartScreenBase.smBaseWidth * 150,
        height: SmartScreenBase.smBaseWidth * 150,
        borderRadius: SmartScreenBase.smBaseWidth * 150, borderColor: Colors.Red,
        borderWidth: 1
    },
    txtName: {
        fontSize: FontSize.size55Font,
        color: Colors.Black,
        fontFamily: FontBase.MyriadPro_Regular
    },
    txtNote: {
        fontSize: FontSize.size35Font,
        // ...FontWeight.Bold,
        fontFamily: FontBase.MyriadPro_Regular
    },
    linear: {
        width: SmartScreenBase.smBaseWidth * 300,
        height: SmartScreenBase.smBaseHeight * 40, marginTop: SmartScreenBase.smBaseHeight * 15,
        borderRadius: SmartScreenBase.smBaseWidth * 100,
        justifyContent: 'center', alignItems: 'center'
    },
    txtButtonLinear: {
        color: Colors.White,
        fontSize: FontSize.size40Font,
        fontFamily: FontBase.MyriadPro_Light,
    },
    viewContentPoint: {
        width: SmartScreenBase.smBaseWidth * 200,
        height: SmartScreenBase.smBaseWidth * 200, borderRadius: SmartScreenBase.smBaseWidth * 60,
        justifyContent: 'center', alignItems: 'center'
    },
    txtPointCT: {
        color: Colors._00A69C,
        fontSize: FontSize.size35Font,
        ...FontWeight.Light,
        marginTop: Platform.OS === 'android' ? SmartScreenBase.smBaseHeight * 5 : 0
    },
    txtPoint: {
        color: Colors._00A69C,
        fontSize: FontSize.size65Font,
        fontFamily: FontBase.MyriadPro_Regular,
        width: SmartScreenBase.smBaseWidth * 200,
        textAlign: 'center',
        fontStyle: 'normal',
        paddingVertical: Platform.OS === 'android' ? SmartScreenBase.smBaseHeight * 5 : 0
    },
    modal: {
        backgroundColor: Colors.White,
        borderRadius: SmartScreenBase.smBaseWidth * 30,
        padding: SmartScreenBase.smBaseHeight * 30,
        marginHorizontal: SmartScreenBase.smBaseWidth * 30
    },
    icon_close: {
        width: SmartScreenBase.smBaseWidth * 40,
        height: SmartScreenBase.smBaseWidth * 40,
    },
    btnClose: {
        alignSelf: 'flex-end'
    },
    txtTitleModal: {
        fontSize: SmartScreenBase.smFontSize * 70,
        marginBottom: SmartScreenBase.smBaseHeight * 40,
        ...FontWeight.Bold
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    btnAssign: {
        // flex: 1,
        alignSelf: 'center',
        marginBottom: SmartScreenBase.smPercenHeight * 2
    },
    viewBotCv: {
        height: SmartScreenBase.smPercenWidth * 20
    },
    btnDone: {
        alignItems: 'center',
        width: '100%',
    },
    ic_dot: {
        width: SmartScreenBase.smBaseWidth * 35,
        height: SmartScreenBase.smBaseWidth * 35,
    },
    viewDot: {
        borderWidth: 1,
        borderColor: Colors._7F7F7F,
        width: SmartScreenBase.smBaseWidth * 50,
        height: SmartScreenBase.smBaseWidth * 50,
        marginRight: SmartScreenBase.smBaseWidth * 15,
        borderRadius: SmartScreenBase.smPercenWidth * 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    txtValue: {
        fontSize: FontSize.size55Font,
        fontFamily: FontBase.MyriadPro_Regular
    },
    btnSend: {
        width: SmartScreenBase.smPercenWidth * 30,
        alignSelf: 'center',
        marginTop: SmartScreenBase.smBaseHeight * 20,
        borderRadius: SmartScreenBase.smBaseWidth * 100,
        width: SmartScreenBase.smBaseWidth * 350
    },
    textInputStyles: {
        height: SmartScreenBase.smBaseHeight * 200,
        paddingTop: SmartScreenBase.smBaseHeight * 15,
        ...FontWeight.Regular,
        color: Colors._00000070,
        borderRadius: SmartScreenBase.smBaseWidth * 10,
        elevation: 0,
        shadowOpacity: 0,
        borderWidth: 0.3,
        borderColor: Colors._7F7F7F,
        paddingHorizontal: SmartScreenBase.smBaseHeight * 15
    },
    commentText: {
        fontSize: FontSize.size35Font,
        fontFamily: FontBase.MyriadPro_Regular
    },
    viewModal: {
        margin: 0,
        backgroundColor: Colors._00000090
    },
    marginBottom15: { marginBottom: SmartScreenBase.smBaseHeight * 25 },
    txtSave: { ...FontWeight.Bold, fontSize: FontSize.size55Font }
});