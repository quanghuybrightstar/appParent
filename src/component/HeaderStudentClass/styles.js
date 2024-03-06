import {StyleSheet} from 'react-native';
import SmartScreenBase from "../base/SmartScreenBase";

const styles = StyleSheet.create({
    container: {
        width: SmartScreenBase.smPercenWidth * 100,
        backgroundColor: '#00000070',
        paddingHorizontal: SmartScreenBase.smPercenWidth * 3,
        paddingVertical: SmartScreenBase.smPercenHeight * 1.7,
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonBack: {
        width: SmartScreenBase.smPercenWidth * 8,
        height: SmartScreenBase.smPercenWidth * 8,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: SmartScreenBase.smPercenWidth * 2.5
    },
    iconBack: {
        width: SmartScreenBase.smPercenWidth * 6,
        height: SmartScreenBase.smPercenWidth * 6,
        resizeMode: 'contain'
    },
    textTitle: {
        flex: 1,
        color: '#fff',
        fontFamily: 'Myriadpro_light',
        fontSize: SmartScreenBase.smFontSize * 45
    }
});

export default styles;
