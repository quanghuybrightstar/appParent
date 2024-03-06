import { Dimensions, StyleSheet } from 'react-native';
import screenBase from '../../base/SmartScreenBase';
import SmartScreenBase from '../../base/SmartScreenBase';

export default StyleSheet.create({
    container: {
        backgroundColor: '#00000060',
        height: SmartScreenBase.smPercenHeight*115,
        width : SmartScreenBase.smPercenWidth*100,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingBottom: SmartScreenBase.ratio < 1.8 ? SmartScreenBase.smPercenHeight*15 : 0,
        position:'absolute',
        left:0,
        bottom: -SmartScreenBase.smPercenHeight*15,
        elevation: 5,
        zIndex: 10
    },
    viewScript: {
        backgroundColor: '#fff',
        borderRadius: SmartScreenBase.smPercenWidth*4,
        height: SmartScreenBase.smPercenHeight*66,
        padding: SmartScreenBase.smPercenWidth*7,
        paddingTop: SmartScreenBase.smPercenWidth*15,
        paddingBottom: SmartScreenBase.smPercenWidth*10,
    },
    buttonClose: {
        width: SmartScreenBase.smPercenWidth*12,
        height: SmartScreenBase.smPercenWidth*12,
        position: 'absolute',
        top: 5,
        right: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        color: 'red',
        fontSize: 24,
    },
    content:{
        flexDirection:'row',
        flexWrap:'wrap',
        marginTop:5,
    },
    text:{
        fontSize:40*screenBase.smFontSize,
        marginRight:3,
        marginTop:1,
    }
})