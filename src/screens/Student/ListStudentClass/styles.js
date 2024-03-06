import {StyleSheet} from 'react-native';
import SmartScreenBase from "../../../base/SmartScreenBase";
import font from '../../../base/FontBase';
import { Colors } from '../../../styleApp/color';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    containerContent: {
        flex: 1,
        margin: SmartScreenBase.smPercenWidth * 5,
        backgroundColor: '#fff',
        borderRadius: SmartScreenBase.smPercenWidth * 3,
        paddingVertical: SmartScreenBase.smPercenHeight * 3,
        paddingHorizontal: SmartScreenBase.smPercenWidth * 5
    },
    titleContent: {
        marginBottom: SmartScreenBase.smPercenWidth*5,
        color: '#000',
        fontFamily: font.MyriadPro_Bold,
        fontSize: SmartScreenBase.smFontSize * 40
    },
    viewItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: SmartScreenBase.smPercenHeight * 2
    },
    textIndexItem: {
        color: '#000',
        fontFamily: font.MyriadPro_Bold,
        fontSize: SmartScreenBase.smFontSize * 45
    },
    avatarItem: {
        width: SmartScreenBase.smPercenWidth * 15,
        height: SmartScreenBase.smPercenWidth * 15,
        borderRadius: 1000,
        resizeMode: 'cover',
        marginHorizontal: SmartScreenBase.smPercenWidth * 4,
        borderColor: Colors.Orange,
        borderWidth: SmartScreenBase.smBaseWidth*5
    },
    textNameItem: {
        color: '#000',
        fontFamily: font.MyriadPro_Light,
        fontSize: SmartScreenBase.smFontSize * 45,
        flex: 1
    }
});

export default styles;
