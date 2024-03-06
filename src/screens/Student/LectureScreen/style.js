import {StyleSheet} from 'react-native';
import SmartScreenBase from "../../../component/base/SmartScreenBase";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // marginBottom: SmartScreenBase.smPercenHeight * 15
    },
    header: {
        flexDirection: 'row',
        paddingVertical: SmartScreenBase.smPercenHeight * 2,
        backgroundColor: '#235481',
        paddingHorizontal: SmartScreenBase.smPercenWidth * 3,
        alignItems: 'center',
        minHeight: SmartScreenBase.smPercenHeight * 10
    },
    buttonBack: {
        width: SmartScreenBase.smPercenWidth * 8,
        height: SmartScreenBase.smPercenWidth * 5,
    },
    iconBack: {
        width: SmartScreenBase.smPercenWidth * 5,
        height: SmartScreenBase.smPercenWidth * 5,
    },
    viewTitle: {
        marginLeft: SmartScreenBase.smPercenWidth,
        width: SmartScreenBase.smPercenWidth * 50
    },
    title: {
        fontSize: SmartScreenBase.smPercenWidth * 4.5,
        color: '#fff'
    },
    text: {
        margin: SmartScreenBase.smPercenWidth * 5
    },
    containerVideo: {
        backgroundColor: '#fff',
        width: '100%',
        height: SmartScreenBase.smPercenHeight * 38,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 12,
    },
    viewVideo: {
        flex: 1,
        backgroundColor: '#000'
    },
    video: {
        width: '100%',
        height: '100%'
    },
    viewBottomVideo: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingHorizontal: SmartScreenBase.smPercenWidth * 6,
        paddingVertical: SmartScreenBase.smPercenHeight* 1.5
    },
    iconFull: {
        width: SmartScreenBase.smPercenWidth * 6,
        height: SmartScreenBase.smPercenWidth * 6,
        resizeMode: 'contain'
    },
    viewControl: {
        position: 'absolute',
        top:0, left: 0, right: 0, bottom: 0
    },
    viewTopControl: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewIconPlay: {
        width: SmartScreenBase.smPercenWidth * 20,
        height: SmartScreenBase.smPercenWidth * 20,
        borderRadius: SmartScreenBase.smPercenWidth * 100,
        backgroundColor: '#ffffff50',
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconPlay: {
        width: '35%',
        height: '35%',
        resizeMode: 'contain'
    },
    viewBottomControl: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: SmartScreenBase.smPercenHeight * 0.1,
        paddingHorizontal: SmartScreenBase.smPercenWidth * 3
    },
    textSecond: {
        color: '#fff',
        fontSize: SmartScreenBase.smPercenWidth * 4
    },
    viewSlider: {
        flex: 1,
        marginHorizontal: SmartScreenBase.smPercenWidth * 4,
    },
    trackStyleSlider: {
        height: SmartScreenBase.smPercenHeight * 1.2,
        borderRadius: SmartScreenBase.smPercenWidth * 3,
        backgroundColor: '#f1f2f2'
    },
    thumbStyleSlider: {
        width: SmartScreenBase.smPercenWidth * 5,
        height: SmartScreenBase.smPercenWidth * 5,
    },
    viewPositionIconNormal: {
        position: 'absolute',
        top: SmartScreenBase.smPercenWidth * 4,
        right: SmartScreenBase.smPercenHeight * 2
    }
});

export default styles
