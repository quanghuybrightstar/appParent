import {StyleSheet, Dimensions, Platform, Image} from 'react-native';
import SmartScreenBase from "../../../base/SmartScreenBase";
import React from "react";

export default StyleSheet.create({
    container: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 35 : 0
    },
    WrapView:{
        width:SmartScreenBase.smPercenWidth*100,
        height:SmartScreenBase.smPercenWidth*12,
        backgroundColor:"rgba(0,0,0,0.3)",
        flexDirection:"row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    ViewHeader:{
        height:'100%',
        marginLeft: SmartScreenBase.smPercenWidth * 2 ,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center'
    },
    ButtonMenu:{
        width: SmartScreenBase.smPercenWidth * 10,
        height: '100%',
        alignItems:'center',
        justifyContent:'center'
    },
    ImageMenu:{
        width: SmartScreenBase.smPercenWidth * 5,
        height: SmartScreenBase.smPercenWidth * 5,
    },
    TextTitle:{
        color: 'white' ,
        marginLeft: SmartScreenBase.smPercenWidth * 5,
        fontWeight:"800",
        fontSize:SmartScreenBase.smPercenWidth*5
    },
    TextFilter:{
        color: 'white' ,
        marginLeft: SmartScreenBase.smPercenWidth * 5,
        fontWeight:"800",
        fontSize:SmartScreenBase.smPercenWidth*5
    },
    ViewBody:{
        width:SmartScreenBase.smPercenWidth*100,
        height:SmartScreenBase.smPercenWidth*10,
        justifyContent:'center',
        paddingHorizontal:SmartScreenBase.smPercenWidth * 5,
    },
    ViewTextBody:{
        width:'100%',
        height:SmartScreenBase.smPercenWidth*6,
        justifyContent:'center'
    },
    TextBody:{
        color: 'white' ,
        fontWeight:"800",
        fontSize:SmartScreenBase.smPercenWidth*4
    },
    ViewFlatList:{
        width:SmartScreenBase.smPercenWidth*100,
        height:'70%',
        justifyContent:'center',
        paddingHorizontal:SmartScreenBase.smPercenWidth * 5,
    },
    ViewFooter:{
        position: "absolute",
        bottom: 0
    },
    ImageFooter:{
        width: SmartScreenBase.smBaseWidth * 1080,
        height: SmartScreenBase.smBaseWidth * 200, resizeMode: 'cover'
    },
    ViewModal:{
        flex:1,
        backgroundColor: 'rgba(52, 52, 52, 0.8)',
        justifyContent:'flex-end'
    },
    ViewBodyModal:{
        width:SmartScreenBase.smPercenWidth*100,
        height:SmartScreenBase.smPercenHeight*40,
        flexDirection:'row',
        backgroundColor:'#fff',
        opacity:1
    },
    ViewFlatListLeft:{
        flex:1,
        borderRightWidth:1,
        borderRightColor:'gray'
    },
    ViewTextFlatListLeft:{
        height:'25%',
        justifyContent:'center',
        paddingHorizontal:SmartScreenBase.smPercenWidth*5
    },
    TextFlatListLeft:{
        color: '#000' ,
        fontWeight:"bold",
        fontSize:SmartScreenBase.smPercenWidth*5
    },
    ViewButton:{
        height:'20%',
        alignItems:'center',
        flexDirection:'row',
        justifyContent:'space-around',
        width:'100%'
    },
    ButtonFilter:{
        height:'50%',
        width:'40%',
        backgroundColor:'#ED8A22',
        borderRadius:SmartScreenBase.smPercenWidth*2,
        alignItems:'center',
        justifyContent:'center'
    },
    TextFilterModal:{
        color: '#000' ,
        fontWeight:"800",
        fontSize:SmartScreenBase.smPercenWidth*4,
    },
    ButtonCancel:{
        height:'50%',
        width:'40%',
        backgroundColor:'#ED8A22',
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center'
    }

});
