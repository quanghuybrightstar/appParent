import {StyleSheet} from 'react-native';
import SmartScreenBase from '../../../base/SmartScreenBase';

const styles = StyleSheet.create({
    viewHeader: {
        width: SmartScreenBase.smPercenWidth * 100,
        height: SmartScreenBase.smPercenWidth * 12,
        backgroundColor: 'rgba(0,0,0,0.3)',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    buttonBack: {
        width: SmartScreenBase.smPercenWidth * 10,
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    iconBack: {
        width: SmartScreenBase.smPercenWidth * 5,
        height: SmartScreenBase.smPercenWidth * 5,
    },

    titleHeader: {
        color: 'white',
        marginLeft: SmartScreenBase.smPercenWidth * 5,
        fontSize: SmartScreenBase.smPercenWidth * 5,
    },

    viewBody: {
        paddingVertical: SmartScreenBase.smPercenWidth * 5,
        paddingHorizontal: SmartScreenBase.smPercenWidth * 2,
        flex: 1
    },

    viewTest: {
        backgroundColor: '#ffffff90',
        borderRadius: SmartScreenBase.smPercenWidth * 5,
        padding: SmartScreenBase.smPercenWidth * 3,
    },

    textTitleViewTest: {
        fontWeight: '700',
        color: 'black',
        fontSize: SmartScreenBase.smPercenWidth * 5,
    },

    viewConditionTest: {
        paddingHorizontal: SmartScreenBase.smPercenWidth * 3,
        paddingVertical: SmartScreenBase.smPercenHeight,
        flexDirection: 'row',
    },

    viewIconLock: {
        paddingHorizontal: SmartScreenBase.smPercenWidth * 3,
    },

    iconLock: {
        width: SmartScreenBase.smPercenWidth * 4,
        height: SmartScreenBase.smPercenWidth * 7,
    },

    viewChooseCondition: {
        flex: 1,
        marginLeft: SmartScreenBase.smPercenWidth * 5,
    },

    textCondition: {
        fontSize: SmartScreenBase.smPercenWidth * 5,
    },

    iconSetting: {
        width: SmartScreenBase.smPercenWidth * 6,
        height: SmartScreenBase.smPercenWidth * 7,
    },

    viewSettingHighScore: {
        flex: 1,
        marginLeft: SmartScreenBase.smPercenWidth * 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    iconChooseSettingScore: {
        width: SmartScreenBase.smPercenWidth * 10,
        height: SmartScreenBase.smPercenWidth * 8,
    },

    iconPassingScore: {
        width: SmartScreenBase.smPercenWidth * 6,
        height: SmartScreenBase.smPercenWidth * 7,
    },

    viewSelectScore: {
        flexDirection: 'row', backgroundColor: '#fff',
        justifyContent: 'space-between',
        height: SmartScreenBase.smPercenWidth * 6,
    },

    viewValueScore: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: SmartScreenBase.smPercenWidth,
    },

    textInputScore: {
        textAlignVertical: 'top',
        paddingTop: 0,
        paddingBottom: 0,
        color: '#ff9e41',
    },

    buttonIncrease: {
        backgroundColor: '#1d2534',
        alignItems: 'center',
        justifyContent: 'center',
        height: '48%',
    },

    iconIncrease: {
        width: SmartScreenBase.smPercenHeight * 3,
        height: '100%',
        transform: [{rotate: '90deg'}],
    },

    buttonDecrease: {
        backgroundColor: '#1d2534',
        alignItems: 'center',
        justifyContent: 'center',
        height: '48%',
    },

    iconDecrease: {
        width: SmartScreenBase.smPercenHeight * 3,
        height: '100%',
        transform: [{rotate: '270deg'}],
    },

    viewConditionUnit: {
        paddingHorizontal: SmartScreenBase.smPercenWidth * 3,
        paddingVertical: SmartScreenBase.smPercenHeight,
        flexDirection: 'row',
    },

    viewButtonSave: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    buttonSave: {
        paddingHorizontal: SmartScreenBase.smPercenWidth * 8,
        paddingVertical: SmartScreenBase.smPercenWidth * 2,
        backgroundColor: '#00283a',
        borderRadius: SmartScreenBase.smPercenWidth * 8,
    },

    textSave: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: SmartScreenBase.smPercenWidth * 5,
    },

    viewItemRadio: {
        flexDirection: 'row',
        marginTop: SmartScreenBase.smPercenHeight * 2,
    },

    borderButtonRadio: {
        borderRadius: SmartScreenBase.smPercenWidth * 10,
        borderWidth: 1,
        padding: 2,
        width: SmartScreenBase.smPercenWidth * 4,
        height: SmartScreenBase.smPercenWidth * 4,
        marginTop: SmartScreenBase.smPercenWidth,
    },

    backgroundButtonRadio: {
        width: '100%',
        height: '100%',
        backgroundColor: 'black',
        borderRadius: SmartScreenBase.smPercenWidth * 10,
    },

    viewTextRadio: {
        marginLeft: SmartScreenBase.smPercenWidth * 6,
    },

    textRadio: {
        color: '#313131',
        fontSize: SmartScreenBase.smPercenWidth * 4
    },
});

export default styles;
