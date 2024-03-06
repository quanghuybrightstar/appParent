import {StyleSheet} from 'react-native';
import SmartScreenBase from "../../base/SmartScreenBase";
import font from '../../../base/FontBase';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: SmartScreenBase.smPercenWidth * 4,
        marginVertical: SmartScreenBase.smPercenHeight * 4,
        backgroundColor: '#fff',
        borderRadius: SmartScreenBase.smPercenWidth * 4,
        padding: SmartScreenBase.smPercenWidth * 3
    },
    text: {
        fontFamily: font.MyriadPro_Light,
        fontSize: SmartScreenBase.smFontSize * 42
    }
});

export default styles;
