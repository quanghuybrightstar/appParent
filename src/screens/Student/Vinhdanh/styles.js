import {StyleSheet} from 'react-native';
import FontBase from '../../../base/FontBase';
import SmartScreenBase from "../../../base/SmartScreenBase";
import { Colors } from '../../../styleApp/color';
const AVATAR_SIZE = SmartScreenBase.smPercenWidth * 30

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    containerContain: {
        flex: 1,
        marginLeft: SmartScreenBase.smPercenWidth * 3,
        marginVertical: SmartScreenBase.smPercenHeight * 4,
    },
    viewItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SmartScreenBase.smPercenHeight * 4,
        paddingLeft: SmartScreenBase.smBaseWidth * 5,
        paddingTop: SmartScreenBase.smBaseHeight * 5,
    },
    viewLeftItem: {
        backgroundColor: 'white',
        width: SmartScreenBase.smPercenWidth * 60,
        // height: 100,
        paddingHorizontal: SmartScreenBase.smPercenWidth,
        paddingVertical: SmartScreenBase.smBaseHeight * 10,
        borderRadius: SmartScreenBase.smPercenWidth * 4
    },
    viewAvatar: {
        width: '100%',
        alignItems: 'center',
    },
    imageAvatar: {
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
        resizeMode: 'cover',
        borderRadius: AVATAR_SIZE,
        borderWidth: SmartScreenBase.smBaseWidth * 5,
        borderColor: Colors.Orange,
        // overflow: 'hidden',
    },
    viewName: {
        position: 'absolute',
        bottom: 0,
        width: '80%',
        borderRadius: SmartScreenBase.smPercenWidth * 4,
        alignItems: 'center',
        paddingVertical: SmartScreenBase.smPercenWidth * 1.5
    },
    textName: {
        fontFamily: FontBase.MyriadPro_Bold,
        color: '#fff',
        fontSize: SmartScreenBase.smFontSize * 50,
        textAlign: 'center',
    },
    viewTextAchievement: {
        marginTop: SmartScreenBase.smPercenWidth * 2,
        width: '100%',
        backgroundColor: '#fff',
        borderBottomLeftRadius: SmartScreenBase.smPercenWidth * 4,
        borderBottomRightRadius: SmartScreenBase.smPercenWidth * 4,
        alignItems: 'center',
        paddingVertical: SmartScreenBase.smPercenWidth * 1.5
    },
    textAchievement: {
        fontFamily: FontBase.MyriadPro_Bold,
        color: '#000',
        fontSize: SmartScreenBase.smFontSize * 40
    },
    viewRightItem: {
        flex: 1,
        justifyContent: 'center',
    },
    imageAchievement: {
        flex: 1
    }
});

export default styles;
