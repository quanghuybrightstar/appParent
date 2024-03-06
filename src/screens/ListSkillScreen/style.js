import {StyleSheet, Dimensions, Platform} from 'react-native';
import SmartScreenBase from '../../base/SmartScreenBase';
import FontBase from '../../base/FontBase';

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        backgroundColor: '#52b7b5',
        width,
        flexDirection: 'row',
        alignItems: 'center',
        ...Platform.select({
            ios: {
                paddingTop: height / 28,
                height: SmartScreenBase.smPercenHeight * 10,
            },
            android: {
                height: SmartScreenBase.smPercenHeight * 8,
            }
        }),
    },
    buttonBack: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
    },
    iconBack: {
        width: width / 17,
        resizeMode: 'contain',
        height: width / 17,
    },
    titleHeader: {
        color: '#fff',
        fontSize: SmartScreenBase.smFontSize*60,
    },
    item0: {
        width: '100%',
        backgroundColor: '#ffffff',
        borderRadius: SmartScreenBase.smPercenWidth * 5,
        height: width / 3.5,
        marginTop: height / 10,
        padding: 15,
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: 20,
    },
    imgSkill:{
        width: '100%', 
        height: '100%', 
        resizeMode: 'contain', 
        borderRadius: width / 4
    },
    iconSkill: {
        padding: 4,
        width: width / 4,
        height: width / 4,
        backgroundColor: '#fff',
        position: 'absolute',
        overflow:'hidden',
        top: -width / 8,
        borderRadius: width / 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    title0: {
        color: '#52b7b5',
        fontSize: SmartScreenBase.smFontSize*70,
        textTransform: 'uppercase',
    },
    item: {
        width: '100%',
        height: SmartScreenBase.smPercenHeight * 10,
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginBottom: SmartScreenBase.smPercenHeight * 2,
    },
    titleItem: {
        fontSize: SmartScreenBase.smFontSize * 60,
        textTransform: 'uppercase',
    },
    viewIconItem: {
        position: 'absolute',
        padding: 5,
        borderRadius: SmartScreenBase.smPercenHeight * 5.5,
        height: SmartScreenBase.smPercenHeight * 11,
        width: SmartScreenBase.smPercenHeight * 11,
        backgroundColor: '#fff',
        left:0,
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        zIndex: 30,
        elevation: 7,
        overflow:'hidden'
    },
    viewImg:{
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        borderRadius: width / 4
    }
});
export {styles, width, height};
