import {Dimensions, Platform, StyleSheet} from 'react-native';
import SmartScreenBase from '../../../../base/SmartScreenBase';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    Loading:{
        width,
        height,
        justifyContent: 'center',
        flexDirection: 'row',
        position: 'absolute',
        zIndex: 1500,
        padding: 10,
        backgroundColor: '#FFFFFF60',
    },
    showWebViewBody:{
        position: 'absolute',
        width: '90%',
        height: '60%',
        left: 12,
        backgroundColor: '#fff',
        zIndex: 1000,
        marginTop: '20%',
        borderRadius: 20,
    },
    showWebViewTou:{
        width: 35,
        height: 35,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        position: 'absolute',
        top: -10,
        zIndex: 100,
        left: -10,
    },
    showWebViewText:{
        fontSize: 18, fontWeight: 'bold', color: 'red'
    },
    RenderQuestionView:{
        width:width*0.9,backgroundColor:'#FFF', borderRadius:10,marginLeft:width*0.05, marginTop:10,
    },
    RenderQuestionView1:{
        alignItems: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
        zIndex: 0,
        padding: SmartScreenBase.smPercenHeight,
        width: width * 0.9,
        marginTop: 10,
    },
    StyleText:{
        fontWeight: 'bold', fontSize: 15
    },
    RenderQuestionView2:{
        marginBottom: 5, flexDirection: 'row',alignItems:'center'
    },
    styleImage:{
        width: SmartScreenBase.smBaseWidth * 112,
        height: SmartScreenBase.smBaseWidth * 112,
        marginLeft: SmartScreenBase.smPercenHeight,
        resizeMode: 'contain',
        marginRight:2
    },
    stylePlat:{
        width: width * 0.7,marginBottom:Platform.OS === 'ios' ? 20 : 0
    },
    styleViewAns:{
        height: SmartScreenBase.smBaseWidth * 112,
        justifyContent: 'center',
    },
    styleTexxt1:{
        fontStyle: 'italic', color: '#8E1C76'
    },
    styleInput:{
        margin: SmartScreenBase.smPercenHeight,
        justifyContent: 'flex-start',
        borderBottomColor: '#00000050',
        borderBottomWidth: 0.5,
        fontStyle: 'italic',
        fontSize: 15,
        color: '#8E1C76',
    },
    styleShowHintQuestion:{
        width: width, height: height * 0.57,marginBottom:30
    },
    styleViewFlat:{
        height: height * 0.57,
        width: width,
        marginTop:20
    },
    styleItemHintQuestion:{
        alignItems: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
        zIndex: 0,
        padding: SmartScreenBase.smPercenHeight,
        width: width * 0.9,
        marginTop: 10,
    },
    styleTexxt2:{
        fontWeight: 'bold', fontSize: 15
    },
    styleViewImage:{
        marginBottom: 5, flexDirection: 'row',alignItems:'center'
    },
    styleImage2:{
        width: SmartScreenBase.smBaseWidth * 112,
        height: SmartScreenBase.smBaseWidth * 112,
        marginLeft: SmartScreenBase.smPercenHeight,
        resizeMode: 'contain',
        marginRight:2
    },
    styleView:{
        width: width * 0.7,marginBottom:Platform.OS === 'ios' ? 20 : 0
    },
    styleTexView:{
        height: SmartScreenBase.smBaseWidth * 112,
        justifyContent: 'center',
    },
    styleArr:{
        fontStyle: 'italic', color: '#8E1C76'
    },
    styleView4:{
        position: 'absolute',
        top: -SmartScreenBase.smBaseWidth * 30,
        right: -SmartScreenBase.smBaseWidth * 5,
    },
    OnShowWordHintDetailView:{
        alignItems: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
        zIndex: 0,
        width: SmartScreenBase.smPercenWidth * 90,
        borderRadius: SmartScreenBase.smPercenWidth * 3,
        padding: SmartScreenBase.smPercenHeight,
        alignSelf: 'center',
        marginTop: SmartScreenBase.smPercenHeight * 2,
    },
    Stylee:{
        zIndex: 0,
        backgroundColor: '#F7AC16',
        marginRight: 10,
        borderRadius: SmartScreenBase.smPercenWidth*3,
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#FFF',
        paddingVertical:5,
        minWidth: SmartScreenBase.smPercenWidth * 15,
        paddingHorizontal: SmartScreenBase.smPercenWidth * 2
    },
    StyleTou:{
        width:SmartScreenBase.smPercenWidth * 10,
        zIndex: 0,
        backgroundColor: '#F7AC16',
        marginRight: 10,
        borderRadius: SmartScreenBase.smPercenWidth*3,
        marginTop: 5,
        justifyContent: 'center',
        alignItems: 'center',
        padding:5
    },
    styleAudioHint:{
        width: width * 0.9, 
        marginBottom: 5
    },
    styleViewAudioHint:{
        flexDirection: 'row', alignItems: 'center'
    },
    styleViewImage1:{
        width: SmartScreenBase.smBaseWidth * 112,
        height: SmartScreenBase.smBaseWidth * 112,
        marginLeft: SmartScreenBase.smPercenHeight,
        resizeMode: 'contain',
    },
    styleShowHintDetailQuestion:{
        width: width,
        height:Platform.OS === 'ios' ? height * 0.60 : height * 0.56 ,
    },
    styleShowHintDetailQuestion1:{
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        width: width * 0.9,
        height: height * 0.1,
    },
    styleShowHintDetailQuestion2:{
        alignItems: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap',
        zIndex: 0,
        marginTop: 10,
    }

})
