import { StyleSheet } from 'react-native';
import FontBase from '../../../base/FontBase';
import SmartScreenBase from '../../../base/SmartScreenBase';


export default StyleSheet.create({
    container: {
        flex: 1,
    },
    // contentTxt: {
    //     textAlign: 'center',
    //     fontSize: SmartScreenBase.smFontSize * 45,
    //     lineHeight: SmartScreenBase.smFontSize * 70,
    // },
    actionGroupContainer: {
        marginVertical: SmartScreenBase.smBaseHeight * 20,
        flexDirection: "row",
        alignItems:"center",
        justifyContent: 'space-around',
    },
    actionButton: {
        paddingHorizontal: SmartScreenBase.smBaseWidth * 40,
        borderWidth:1
    },
    classTitleTxt: {
        textAlign:'center',
        fontFamily: FontBase.MyriadPro_Bold,
        fontSize: SmartScreenBase.smFontSize * 63,
    },
    iconImg:{
        height:SmartScreenBase.smBaseWidth * 90,
        width:SmartScreenBase.smBaseWidth * 90,
        marginRight: SmartScreenBase.smBaseWidth * 30
    },
    contentBox: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SmartScreenBase.smBaseWidth * 50,
        marginVertical: SmartScreenBase.smBaseHeight * 5,
    },
    contentTxt: {
        fontSize: SmartScreenBase.smFontSize * 45,
        fontFamily: FontBase.MyriadPro_Light,
        textAlign: 'center'
        
    },
    alertMessageTxt: {
        textAlign: 'center',
        fontSize: SmartScreenBase.smFontSize * 40,
        lineHeight: SmartScreenBase.smFontSize * 60,
        fontFamily: FontBase.MyriadPro_Light,
    },
})
