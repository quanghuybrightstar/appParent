import {StyleSheet} from 'react-native';
import SmartScreenBase from "../../base/SmartScreenBase";
import { Colors } from '../../styleApp/color';

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.White,
        flex: 1,
        alignItems: 'center',
        paddingTop: SmartScreenBase.smPercenHeight * 30
    },
    viewLogo: {
        width: SmartScreenBase.smPercenWidth * 50,
        height: SmartScreenBase.smPercenHeight * 15,
        alignItems: 'center',
        justifyContent: 'center',
        // marginBottom: SmartScreenBase.smPercenHeight * 8,
    },
    viewLoading: {
        width: SmartScreenBase.smPercenWidth * 50,
        height: SmartScreenBase.smPercenHeight * 1,
        backgroundColor: '#ffffff80',
        borderRadius: SmartScreenBase.smPercenWidth * 3
    },
    imgLogo: {
        width: '100%',
        height: '100%', zIndex: 1
    },
    imgDotLight: {
        position: 'absolute',
        top: -SmartScreenBase.smPercenWidth * 35,
        left: -SmartScreenBase.smPercenWidth * 40 + SmartScreenBase.smPercenWidth * 5,
        width: SmartScreenBase.smPercenWidth * 80,
        height: SmartScreenBase.smPercenWidth * 80,
        tintColor: '#ffffff88'
    },
    imgLineLight: {
        marginTop: SmartScreenBase.smPercenHeight * 4,
        width: SmartScreenBase.smPercenWidth * 60,
        height: SmartScreenBase.smPercenHeight * 2
    }
});

export default styles;
