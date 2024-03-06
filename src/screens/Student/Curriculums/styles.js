import { StyleSheet } from "react-native";
import base from '../../../base/SmartScreenBase';
import font from '../../../base/FontBase';

export default StyleSheet.create({
    container:{
        flex:1,
    },
    itemImgBV:{
        width:base.smPercenWidth*20,
        height:base.smPercenWidth*20,
        marginLeft: -base.smPercenWidth*10,
        backgroundColor:'#fff',
        borderRadius:base.smPercenWidth*10,
        justifyContent:'center',
        alignItems:'center',
        shadowColor: "#000",
		shadowOffset: {
			width: 2,
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
    },
    itemImgB:{
        width:'90%',
        height:'90%',
        resizeMode:'contain'
    },
    itemImgS:{
        width:base.smPercenWidth*8,
        height:base.smPercenWidth*8,
        margin:base.smPercenWidth*2,
        resizeMode:'contain'
    },
    itemCon:{
        backgroundColor:'#fff',
        marginVertical:base.smPercenHeight,
        paddingVertical:base.smPercenHeight*2,
        marginRight:base.smPercenWidth*6,
        marginLeft:base.smPercenWidth*14,
        borderRadius:base.smPercenWidth*4,
        borderWidth:1,
        borderColor:'#dcdcdc',
        shadowColor: "#000",
		shadowOffset: {
			width: 6,
			height: 6
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
        backgroundColor: '#fff',
        flexDirection:'row',
        alignItems:'center'
    },
    itemTxt:{
        fontSize:base.smFontSize * 50,
        fontFamily:font.MyriadPro_Bold,
        flex:1,
        textAlign:'center'
    }
})