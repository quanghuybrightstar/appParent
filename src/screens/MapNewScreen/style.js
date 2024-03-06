import { StyleSheet} from 'react-native';
import FontBase from '../../base/FontBase';
import SmartScreenBase from "../../base/SmartScreenBase";

const styles = StyleSheet.create({
    containerModalMasterUnit:{
        flex: 1,
        backgroundColor: '#22222280',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerContentModalMU: {
        backgroundColor: '#fff',
        width: SmartScreenBase.smPercenWidth * 75,
        height: SmartScreenBase.smPercenHeight * 27,
        borderRadius: SmartScreenBase.smPercenWidth * 5
    },
    textContentModalMU: {
        fontFamily: FontBase.MyriadPro_Bold,
        fontSize: SmartScreenBase.smFontSize * 50,
        textAlign: 'center',
        color: '#424143'
    },
    viewButtonModalMU: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: SmartScreenBase.smPercenWidth * 6,
        justifyContent: 'space-between',
        marginBottom: SmartScreenBase.smPercenHeight * 2
    },
    buttonCancelModalMU: {
        width: '47%',
        paddingVertical: SmartScreenBase.smPercenWidth * 2,
        alignItems: 'center',
        borderRadius: SmartScreenBase.smPercenWidth * 8,
        borderWidth: 1,
        borderColor: '#00b9b6'
    },
    buttonConfirmModalMU: {
        width: '47%',
    },
    gradientButtonConfirmModalMU: {
        width: '100%',
        paddingVertical: SmartScreenBase.smPercenWidth * 2,
        alignItems: 'center',
        borderRadius: SmartScreenBase.smPercenWidth * 8
    },
    textButtonModalMU: {
        fontFamily: FontBase.MyriadPro_Light,
        fontSize: SmartScreenBase.smFontSize * 42,
        textAlign: 'center'
    }
});

export default styles;
