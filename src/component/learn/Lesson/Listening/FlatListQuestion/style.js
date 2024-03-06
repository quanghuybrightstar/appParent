import { StyleSheet, Dimensions,Platform } from 'react-native';
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
        width: width / 2.2,
        height:'100%',
        padding:15,
    },
    viewRight: {
        width: width / 2.2,
        justifyContent: 'center',
        // flexWrap: 'wrap',
    },
    viewItemFlasList: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent:'flex-start',
        // paddingHorizontal:8,
        paddingRight:12
    },
    titleQuestion: {
        fontSize: SmartScreenBase.smFontSize*45,
        fontFamily: FontBase.MyriadPro_Regular,
    },
    viewTextInput: {
        // backgroundColor:'yellow',
        flexDirection: 'row',
        maxWidth: '100%',
        minHeight:width/17,
        // paddingLeft:5,
        borderRadius:5,
        marginRight:3,
        marginTop:2
    },
    viewNumber: {
        borderRightColor: 'gray',
        borderRightWidth: 2,
        height: SmartScreenBase.smPercenWidth*6.5,
        width: SmartScreenBase.smPercenWidth*4.5,
        paddingLeft: SmartScreenBase.smPercenWidth*0.75,
        justifyContent: 'center',
        alignItems: 'center',
        // backgroundColor: "#f00"
    },

    input: {
        minWidth: SmartScreenBase.smPercenWidth*15,
        maxWidth: SmartScreenBase.smPercenWidth*35,
        // marginRight: 10,
        fontSize: SmartScreenBase.smFontSize*45,
        fontFamily: FontBase.MyriadPro_Bold,
       
        ...Platform.select({
            android: {
              padding:0,
              paddingHorizontal:5,
            },
            default: {
                padding:0,
                paddingHorizontal:5,
            }
          })
    },

    textBox: {
        minWidth: SmartScreenBase.smPercenWidth*15,
        maxWidth: SmartScreenBase.smPercenWidth*39,
        // marginRight: 10,
        fontSize: SmartScreenBase.smFontSize*45,
        fontFamily: FontBase.MyriadPro_Bold,
       
        ...Platform.select({
            android: {
              padding:0,
              paddingHorizontal:5,
            },
            default: {
                padding:0,
                paddingHorizontal:5,
            }
          })
    },

    titleInput: {
        fontSize: SmartScreenBase.smFontSize*45,
        fontFamily: FontBase.MyriadPro_Bold
    }
})