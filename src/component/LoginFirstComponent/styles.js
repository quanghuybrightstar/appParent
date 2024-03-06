import {StyleSheet} from 'react-native';
import SmartScreenBase from '../base/SmartScreenBase';

export const styles = StyleSheet.create({
    logo: {
        width: SmartScreenBase.smPercenWidth * 40,
        height: SmartScreenBase.smPercenWidth * 40,
        position: 'absolute',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    anh22: {
        width: SmartScreenBase.smPercenWidth * 100,
        height: SmartScreenBase.smPercenWidth * 100,
        top: -SmartScreenBase.smPercenHeight * 10,
    },
    anh222: {
        width: SmartScreenBase.smPercenWidth * 100,
        height: SmartScreenBase.smPercenWidth * 70,
        top: -SmartScreenBase.smPercenHeight * 10,
    },
    viewTxt: {
        position: 'absolute',
        top: SmartScreenBase.smPercenHeight * 62,
        paddingHorizontal: SmartScreenBase.smPercenWidth * 5,
    },
    txt: {
        color: '#fff',
        textAlign: 'center',
        fontSize: SmartScreenBase.smFontSize * 50,
    },
    btnContact: {
        width: SmartScreenBase.smPercenWidth * 55,
        height: SmartScreenBase.smPercenHeight * 6,
        backgroundColor: '#002839',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: SmartScreenBase.smPercenWidth * 55,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#00000080',
    },
    modalView: {
        width: SmartScreenBase.smPercenWidth * 85,
        height: SmartScreenBase.smPercenHeight * 55,
        backgroundColor: '#fff',
        borderRadius: SmartScreenBase.smPercenWidth * 5,
        alignItems: 'center',
    },
    titleStudent: {
        fontSize: SmartScreenBase.smFontSize * 50,
        paddingTop: SmartScreenBase.smPercenHeight * 5,
    },
    btnUnit: {
        width: SmartScreenBase.smPercenWidth * 70,
        height: SmartScreenBase.smPercenHeight * 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#EC8A23',
        marginTop: SmartScreenBase.smPercenHeight * 2,
        borderRadius: SmartScreenBase.smPercenWidth * 70,
        paddingHorizontal: SmartScreenBase.smPercenWidth * 5,
    },
    viewFlat: {
        marginTop: SmartScreenBase.smPercenHeight * 5,
    },
    txtUnit: {
        fontWeight: 'bold',
        fontSize: SmartScreenBase.smFontSize * 50,
        color: '#fff',
        textTransform: 'uppercase',
        textAlign: 'center',
    },
});
