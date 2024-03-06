import {StyleSheet} from 'react-native';
import SmartScreenBase from "../../../base/SmartScreenBase";
import font from '../../../base/FontBase'
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: '#00000070'
    },
    containerContent: {
        backgroundColor: '#fff',
        width: '100%',
        padding: SmartScreenBase.smPercenWidth * 2
    },
    viewButtonCancel: {
        alignItems: 'flex-end',
        width: '100%',
        paddingRight: SmartScreenBase.smPercenWidth * 5,
        marginBottom: SmartScreenBase.smPercenHeight * 2
    },
    buttonCancel: {
        minWidth: SmartScreenBase.smPercenWidth * 10,
        minHeight: SmartScreenBase.smPercenHeight * 3,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textCancel: {
        fontFamily: font.MyriadPro_Light,
        fontWeight: '700',
        color: '#000',
        fontSize: SmartScreenBase.smFontSize * 48
    },
    viewLeftContentModalFilter: {
        flex: 1,
        paddingLeft: SmartScreenBase.smPercenWidth * 4,
    },
    texTitleModalFilter: {
        fontFamily: font.MyriadPro_Bold,
        color: '#000',
        fontSize: SmartScreenBase.smFontSize * 48,
        marginVertical: SmartScreenBase.smPercenHeight
    },
    viewContent: {
        width: '100%',
        flexDirection: 'row'
    },
    viewItemModalFilter: {
        flexDirection: 'row',
        paddingLeft: SmartScreenBase.smPercenWidth * 2,
        alignItems: 'center',
        marginVertical: SmartScreenBase.smPercenWidth * 1.2
    },
    viewIconBoxModalFilter: {
        width: SmartScreenBase.smPercenWidth * 6,
        height: SmartScreenBase.smPercenWidth * 6,
        marginRight: SmartScreenBase.smPercenWidth * 2,
        alignItems: 'center'
    },
    iconBoxModalFilter: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    iconTickModalFilter: {
        position: 'absolute',
        left: SmartScreenBase.smPercenWidth * 0.5,
        bottom: SmartScreenBase.smPercenWidth * 1,
        width: SmartScreenBase.smPercenWidth * 5.5,
        height: SmartScreenBase.smPercenWidth * 5.5,
        resizeMode: 'contain'
    },
    textItemModalFilter: {
        fontFamily: font.MyriadPro_Light,
        color: '#000',
        fontSize: SmartScreenBase.smPercenWidth * 4
    },
    viewButton: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: SmartScreenBase.smPercenWidth * 6,
        justifyContent: 'space-between',
        marginVertical: SmartScreenBase.smPercenHeight * 2
    },
    buttonDeleteFilter: {
        width: '47%',
        paddingVertical: SmartScreenBase.smPercenWidth * 2,
        alignItems: 'center',
        borderRadius: SmartScreenBase.smPercenWidth * 8,
        borderWidth: 1,
        borderColor: '#00b9b6'
    },
    buttonConfirm: {
        width: '47%',
    },
    gradientButtonConfirm: {
        width: '100%',
        paddingVertical: SmartScreenBase.smPercenWidth * 2,
        alignItems: 'center',
        borderRadius: SmartScreenBase.smPercenWidth * 8
    },
    textButton: {
        fontFamily: font.MyriadPro_Light,
        fontSize: SmartScreenBase.smFontSize * 42,
        textAlign: 'center'
    }
});

export default styles;
