import { Dimensions, StyleSheet } from "react-native";
import SmartScreenBase from '../../../../base/SmartScreenBase';
import FontBase from "../../../../base/FontBase";
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
   ViewRender:{
       alignSelf: 'center',
       flex: 1,
       justifyContent: 'space-between',
   },
    ViewLoading:{
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        flexDirection: 'row',
        position: 'absolute',
        zIndex: 1500,
        //justifyContent: "space-around",
        padding: 10,
        backgroundColor: '#FFFFFF60',
    },
    ViewFlatlist:{
        alignSelf: 'center',
        // height: SmartScreenBase.smPercenHeight * 60,
        marginTop: SmartScreenBase.smPercenHeight * 2,
        flex: 1,
    },
    ViewBaoButton:{
        alignItems: 'center',
        height: SmartScreenBase.smPercenHeight * 10,
        justifyContent: 'center',
    },
    ViewRenderItem:{
        width: SmartScreenBase.smPercenWidth * 100,
        marginBottom: SmartScreenBase.smPercenHeight,
    },
    styleViewImage:{
        position: 'absolute', top: 0
    },
    styleViewQues:{
        marginTop: SmartScreenBase.smPercenHeight ,
        width: SmartScreenBase.smPercenWidth * 90,
        alignSelf: 'center',
    },
    styleViewQuesText:{
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
    styleNumberQues:{
        color: '#FFF', 
        fontFamily: FontBase.MyriadPro_Bold,
        fontSize:SmartScreenBase.smFontSize*50
    },
    styleListOption:{
        marginTop: SmartScreenBase.smPercenHeight,
        alignItems: 'center',
    },
    styleTexxtQues:{
        marginTop: SmartScreenBase.smPercenHeight * 2,
        alignItems: 'flex-start',
        paddingLeft: SmartScreenBase.smPercenWidth * 4,
        borderWidth: SmartScreenBase.smPercenWidth / 2,
        paddingVertical: SmartScreenBase.smPercenWidth * 3,
    },
    styleViewShowResuilt:{
        alignSelf: 'center', alignItems: 'center', flex: 1
    },
    styleViewText:{
        alignSelf: 'center', alignItems: 'center'
    },
    styleViewSound:{
        height: SmartScreenBase.smBaseWidth * 400,
        width:"100%",
        justifyContent:'center',
        alignItems:'center',
    },
    styleText:{
        marginTop: SmartScreenBase.smPercenHeight,
        fontWeight: '600',
        marginVertical: SmartScreenBase.smPercenHeight,
        color: '#fff',
        fontSize: 20,
        fontFamily: 'iCielSoupofJustice',
        margin: SmartScreenBase.smPercenHeight * 2,
    },
    styleViewFlat:{
        width: SmartScreenBase.smPercenWidth * 100,
        alignItems: 'center',
        flex: 1,
    },
    styleViewFlaResuilt:{
        marginTop: SmartScreenBase.smPercenHeight * 3,
        flex: 1,
    },
    styleRenderItemResuilt:{
        alignItems: 'flex-start',
        borderWidth: SmartScreenBase.smPercenWidth / 2,
        marginTop: SmartScreenBase.smBaseWidth * 80,
    },
    styleTextIndexQues:{
        flexDirection: 'row',
        marginTop: SmartScreenBase.smPercenHeight * 2,
        paddingRight: SmartScreenBase.smPercenWidth * 2,
    },
    styleQues:{
        fontSize: SmartScreenBase.smPercenWidth * 3,
    },
    styleImageView:{
        margin: SmartScreenBase.smPercenHeight,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    styleTextindex:{
        marginLeft: SmartScreenBase.smPercenWidth * 3,
        fontSize: SmartScreenBase.smPercenWidth * 4,
        fontWeight: 'bold',
    },
    styleImage:{
        position: 'absolute',
        top: -SmartScreenBase.smBaseWidth * 56,
        alignSelf: 'center',
    },
    styleViewelse:{
        alignItems: 'flex-start',
        marginTop: SmartScreenBase.smBaseWidth * 80,
        borderWidth: SmartScreenBase.smPercenWidth / 2,
    },
    styleViewTextindex:{
        flexDirection: 'row',
        marginTop: SmartScreenBase.smPercenHeight * 2,
        paddingRight: SmartScreenBase.smPercenWidth,
        width: SmartScreenBase.smPercenWidth * 70
    },
    styleView:{
        margin: SmartScreenBase.smPercenHeight,
        flexDirection: 'row',
        alignItems: 'center',
    },
    styleView1:{
        width: SmartScreenBase.smBaseWidth * 50,
        height: SmartScreenBase.smBaseWidth * 50,
    },
    styleTxtIndex:{
        marginLeft: SmartScreenBase.smPercenWidth * 5,
        fontSize: SmartScreenBase.smPercenWidth * 4,
        fontWeight: 'bold',
        color: '#e8425a',
    } ,
    styleViewans:{
        margin: SmartScreenBase.smPercenHeight,
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    styleTextAns:{
        marginLeft: SmartScreenBase.smPercenWidth * 5,
        fontSize: SmartScreenBase.smPercenWidth * 4,
        fontWeight: 'bold',
        color: 'rgba(198,229,14,0.95)',
    },
    styleAfterView:{
        marginTop: SmartScreenBase.smPercenHeight,
        marginBottom: SmartScreenBase.smPercenHeight,
    },
    styleTextGT:{
        fontWeight: 'bold',
        fontSize: SmartScreenBase.smPercenWidth * 4,
    },
    styleViewGTelse:{
        marginBottom: SmartScreenBase.smPercenHeight,
        width: SmartScreenBase.smBaseWidth * 900,
        paddingTop: 5,
    },
    styleExplain:{
        fontStyle: 'italic', marginLeft: 30
    } ,
    styleViewImageAns:{
        position: 'absolute',
        top: -SmartScreenBase.smBaseWidth * 56,
        alignSelf: 'center',
    },
    styleshowScript:{
        width: SmartScreenBase.smBaseWidth * 1080,
        height: SmartScreenBase.smBaseHeight * 1080,
        backgroundColor: '#00000030',
        position: 'absolute',
        zIndex: 1000,
        justifyContent: 'center',
        alignItems: 'center',
    },
    styleShowScreipt1:{
        width: SmartScreenBase.smBaseWidth * 970,
        height: SmartScreenBase.smBaseHeight * 600,
        backgroundColor: '#FFF',
        alignItems: 'center',
        borderRadius: 20,
    },
    styleViewNull:{
        width: '100%',
        height: '20%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    styleTextScript:{
        marginTop: 20, marginLeft: 20
    },
    styleViewScript:{
        width: '100%', height: '80%'
    }
})
