import {StyleSheet} from 'react-native';
import FontBase from '../../../../base/FontBase';
import SmartScreenBase from "../../../../base/SmartScreenBase";
import { Colors } from '../../../../styleApp/color';
import { FontSize } from '../../../../styleApp/font';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    containerContent: {
        flex: 1,
        marginBottom: SmartScreenBase.smPercenHeight * 2
    },
    viewItem: {
        flex: 1,
        marginTop: SmartScreenBase.smPercenWidth * 6,
        marginHorizontal: SmartScreenBase.smPercenWidth * 4,
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.50,
        shadowRadius: 5.46,
        elevation: 9,
        borderRadius: SmartScreenBase.smPercenWidth * 2,
        flexDirection: 'row',
        padding: SmartScreenBase.smPercenWidth * 2
    },
    exerciseThumbnailBox: {
        overflow: 'hidden'
    },
    imageToAvatar: {
        width: SmartScreenBase.smPercenWidth * 30,
        height: SmartScreenBase.smPercenWidth * 25,
        resizeMode: 'contain',
    },
    buttonDoExercise: {
        width: '100%',
        position: 'absolute',
        bottom: 0,
        left: 0,
        alignItems: 'center',
        paddingVertical: SmartScreenBase.smPercenWidth,
        backgroundColor: '#ed8a22',
        borderRadius: SmartScreenBase.smPercenWidth * 2
    },
    textDoExercise: {
        color: '#fff',
        fontFamily: FontBase.MyriadPro_Bold,
        fontSize: SmartScreenBase.smFontSize * 40
    },
    viewRightItem: {
        flex: 1,
        marginLeft: SmartScreenBase.smPercenWidth * 8,
        marginTop: SmartScreenBase.smPercenHeight * 2,
        marginBottom: SmartScreenBase.smPercenHeight * 1,
        justifyContent: 'space-between'
    },
    textUnitName: {
        color: '#000',
        fontFamily: FontBase.MyriadPro_Bold,
        fontSize: SmartScreenBase.smFontSize * 48
    },
    textCurriculumName: {
        color: Colors.Black,
        width: SmartScreenBase.smPercenWidth*48,
        fontFamily: FontBase.MyriadPro_Regular,
        fontSize: SmartScreenBase.smFontSize * 45,
        marginTop: SmartScreenBase.smBaseHeight * 10,
    },
    viewDate: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    iconDate: {
        width: SmartScreenBase.smPercenWidth * 4,
        height: SmartScreenBase.smPercenWidth * 4,
        resizeMode: 'contain',
        marginHorizontal: SmartScreenBase.smPercenWidth * 1.2
    },
    textDate: {
        color: '#113254',
        fontFamily: FontBase.MyriadPro_Bold,
        fontSize: SmartScreenBase.smFontSize * 40
    },
    iconStatus: {
        width: SmartScreenBase.smPercenWidth * 6,
        height: SmartScreenBase.smPercenWidth * 6,
        resizeMode: 'contain',
        position: 'absolute',
        top: -SmartScreenBase.smPercenWidth * 2.5,
        left: -SmartScreenBase.smPercenWidth * 2.5,
        zIndex: 1
    },
    viewCount: {
        position: 'absolute',
        height: SmartScreenBase.smPercenWidth * 7,
        borderRadius: SmartScreenBase.smPercenWidth * 2,
        width: SmartScreenBase.smPercenWidth * 22,
        top: - SmartScreenBase.smPercenWidth * 2.2,
        right: SmartScreenBase.smPercenWidth * 4,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: "#555",
		shadowOffset: {
			width: 1,
			height: 2
		},
		shadowOpacity: 0.7,
		shadowRadius: 0.5,
		elevation: 2,
    },
    textCount: {
        color: '#fff',
        fontFamily: FontBase.MyriadPro_Bold,
        fontSize: SmartScreenBase.smFontSize * 40
    },
    modalBox: {
        paddingBottom: SmartScreenBase.smBaseHeight * 20,
        paddingTop: SmartScreenBase.smBaseHeight * 40,
    },
    messageModalStyle: {
        marginBottom: SmartScreenBase.smBaseHeight * 20,
        color: Colors.Black,
        fontSize: FontSize.size55Font,
        lineHeight: SmartScreenBase.smBaseHeight * 40
    },
    messageDeleteStyle: {
        marginBottom: 0,
        paddingBottom: 0
    },
});

export default styles;
