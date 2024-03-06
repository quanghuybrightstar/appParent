import { StyleSheet, Dimensions } from 'react-native';
import SmartScreenBase from '../../../../../base/SmartScreenBase';
import FontBase from '../../../../../base/FontBase';
const { width, height } = Dimensions.get('window')
export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginBottom: 20
    },
    viewLeft: {
        backgroundColor: '#fff',
        borderRadius: 10,
        height: height / 6,
        width: width / 2.2,
        padding:15,
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    viewRight: {
        backgroundColor: '#fff',
        borderRadius: 10,
        minHeight: height / 6,
        width: width / 2.2,
        padding: 10,
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    viewItemFlasList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center'
    },
    titleQuestion: {
        fontSize: 15,
        fontWeight: '500'
    },
    viewTextInput: {
        flexDirection: 'row',
        borderRadius: SmartScreenBase.smPercenWidth*2,
        maxWidth: '100%',
        paddingLeft: 10
    },
    viewNumber: {
        borderRightColor: 'gray',
        borderRightWidth: 3,
        height: SmartScreenBase.smPercenWidth*5.5,
        paddingRight: SmartScreenBase.smPercenWidth,
        paddingTop: SmartScreenBase.smPercenWidth*0.5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    input: {
        minWidth: width / 18,
        marginTop: -SmartScreenBase.smPercenWidth*0.6,
        maxWidth: '100%',
        marginRight: 10,
        fontSize: SmartScreenBase.smFontSize*45,
        fontFamily: FontBase.MyriadPro_Bold,
        height: '100%',
        paddingHorizontal:5,
        ...Platform.select({
            android: {
              padding:0
            },
            default: {
              // other platforms, web for example
            
            }
          })
    },
    titleInput: {
        fontSize: SmartScreenBase.smFontSize*45,
        fontFamily: FontBase.MyriadPro_Bold,
        color: '#000',
        height: '100%'
    }
})