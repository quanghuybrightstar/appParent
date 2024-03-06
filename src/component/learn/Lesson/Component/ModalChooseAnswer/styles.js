import {StyleSheet} from 'react-native'
import SmartScreenBase from "../../../../../base/SmartScreenBase";
import font from '../../../../../base/FontBase';
import { Colors } from '../../../../../styleApp/color';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: SmartScreenBase.smPercenWidth * 100,
        height: SmartScreenBase.smPercenHeight * 100,
        backgroundColor: '#00000070',
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerContent: {
        width: SmartScreenBase.smPercenWidth * 60,
        backgroundColor: '#fff',
        alignItems: 'center',
        borderRadius: SmartScreenBase.smPercenWidth * 4,
        paddingHorizontal: SmartScreenBase.smPercenWidth * 6,
        paddingVertical: SmartScreenBase.smPercenHeight
    },
    buttonAnswer: {
        width: '100%',
        alignItems: 'center',
        borderColor: '#9e9b9c',
        paddingVertical: SmartScreenBase.smPercenHeight
    },
    textItem: {
        fontFamily: font.MyriadPro_Bold,
        fontSize: SmartScreenBase.smFontSize * 50,
        color: Colors.Black
    }
});

export default styles;
