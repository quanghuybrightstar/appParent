import { Dimensions, StyleSheet } from 'react-native';
import SmartScreenBase from '../../base/SmartScreenBase';
import { FontSize, FontWeight } from '../../styleApp/font';
const { width, height } = Dimensions.get('window');
export default StyleSheet.create({
    container: {
        backgroundColor: '#22222265',
        height,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15
    },
    viewScript: {
        backgroundColor: '#fff',
        borderRadius: 25,
        // height: height / 5,
        padding: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
        width: SmartScreenBase.smPercenWidth * 65,
    },
    buttonClose: {
        width: 35,
        height: 35,
        position: 'absolute',
        top: 5,
        right: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: FontSize.size45Font,
        ...FontWeight.Regular
    },
    buttonCamera: {
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        height: 45,
        width: '100%'
    },
    cancel: {
        justifyContent: 'center',
        alignItems: 'center',
        height: 45,
        width: width / 1.5
    }
})