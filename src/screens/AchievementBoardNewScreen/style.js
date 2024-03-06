import { StyleSheet, Dimensions } from 'react-native';
import FontBase from '../../base/FontBase';
import SmartScreenBase from '../../base/SmartScreenBase';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
    },
    ViewHeaderContainer: {
        width,
        backgroundColor: '#22222280',
        paddingTop: height / 30,
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 10,
        paddingRight: 25,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    viewBack: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    iconBack: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
        marginRight: 15
    },
    titleHeader: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
        fontFamily: FontBase.MyriadPro_Bold,
    },
    viewContentHeader: {
        width,
        alignItems: 'center',
    },
    Caidau: {
        height: width,
        width: width / 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconRankHeader: {
        width: width / 5,
        height: width / 5,
        resizeMode: 'contain',
    },
    viewBottomHeader: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 5,
        justifyContent: 'space-between',
        marginBottom: width / 18,

    },
    V_C_B_H: {
        width: width / 3,
        borderRadius: 50,
        backgroundColor: '#fff',
        paddingHorizontal: '3%',
        paddingVertical: '2%',
        alignItems:'flex-end'
    },
    titleScore: {
        textAlign: 'center',
        color: '#2d3b8b',
        fontSize: 18,
        fontFamily: FontBase.MyriadPro_Bold,
    },
    title_B_H: {
        color: '#2d3b8b',
        fontSize: 12,
        textAlign: 'center',
        fontFamily: FontBase.MyriadPro_Regular,
    },
    iconBTH: {
        width: '100%',
        height:'100%',
        resizeMode: 'contain',

    },
    view_IBTH: {
        backgroundColor: '#fff',
        padding: 7,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: -width / 20,
        top:-width/110
    },
    view_IBTH2: {
        width: width / 7.6,
        height: width / 7.6,
        backgroundColor: '#dcdcdc',
        borderRadius: 50,
        padding:'15%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    viewLesson: {
        width,
        alignItems: 'center',
    },
    gradient:{
        paddingVertical:20,
        width
    },
    V_LS:{
        width,
        height:50,
        marginVertical:12,
        justifyContent:'center',
        alignItems:'center'
    },
    V_animationC:{
        position:'absolute',
        flexDirection:'row',
        justifyContent:'flex-end',
        alignItems:'center',
        width,
        paddingHorizontal:20
    },
    viewAnimation:{
        alignItems:'flex-end',
        justifyContent:'center',
        width:width/1.7,
        backgroundColor:'#f7f7f7',
        borderRadius:50,
        paddingVertical:5,
        position:'absolute',
        left:width/12,
        height:width/12
    },
    ViewScrore: {
        width:width/4,
        height:width/12,
        backgroundColor:'#fff',
        borderRadius:50,
        padding:5,
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row',
    },
    iconLesson:{
        height:'100%',
        width:'100%',
        resizeMode:'contain'
    },
    iconPhatquang:{
        width,
        height:width,
        justifyContent:'center',
        alignItems:'center'
    },
    iconRank:{
        height:width/2,
        width:width/2,
        resizeMode:'contain'
    },
    viewSliderTotal:{
        justifyContent:'space-between',
        width,
        paddingHorizontal:20,
        alignItems:'center',
        flexDirection:'row',
        position:'absolute',
        bottom:0
    },
    iconRankSlider:{
        width:width/6,
        height:width/6,
        resizeMode:'contain'
    },
})
