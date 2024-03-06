import React from 'react';
import { StyleSheet, Dimensions, Platform, Modal } from 'react-native';
import SmartScreenBase from '../../../../base/SmartScreenBase';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    header: {
        backgroundColor: '#00000050',
        height: '8%',
        width: width,
        flexDirection: 'row'
    },
    headertitle: {
        justifyContent: "center",
        width: width - width * 0.15,

    },
    styleclassname: {
        fontSize: 16,
        color: '#FFF',
        marginLeft: '5%',
        fontFamily: 'iCielSoupofJustice'
    },
    headerRight: {
        justifyContent: 'center',
    },
    bodyheard: {
        height:'10%',
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center',
    },
    body: {
        backgroundColor: '#fff',
        borderRadius: 10,
        marginTop: '2%',
        height: '85%',
        marginHorizontal: width * 0.05
    },
    styleclasslist: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#000',
        marginLeft: '3%',
        fontFamily: 'iCielSoupofJustice'
    },
    renderItemstuden: {
        marginVertical: '3%',
        alignItems: 'center',
        marginLeft: '3%',
        flexDirection: 'row',
    },
    styleclassSTT: {
        textAlign: 'center',
        width:SmartScreenBase.smPercenWidth * 10,
        fontWeight: 'bold',
        fontSize: 20,
        color: '#000',
        fontFamily: 'iCielSoupofJustice'
    },
    styleAvatar: {
        height:SmartScreenBase.smPercenWidth * 13,
        width: SmartScreenBase.smPercenWidth * 13,
    },
    fullname: {
        width: '55%',
    },
    styleshow: {
        height: height,
        width: width,
        backgroundColor: '#00000065',
    },
    styleViewshow: {
        position: 'absolute',
        zIndex: 100,
        bottom: 0,
        height: '50%',
        width: width,
        backgroundColor: '#fff',
    },
    editstudent: {
        minHeight: height / 25,
        marginHorizontal: width / 20,
        marginVertical: SmartScreenBase.smPercenHeight,
        flexDirection: 'row',
    },
    style_itemEdit: {
        minHeight: height / 20,
        justifyContent: 'center'
    },
    txttitle: {
        left: width / 30,
        justifyContent: 'center',
        textAlign: 'center',
    },
    icon_style: {
        height: 30,
        width: 31
    },
    icon_style_edit: {
        height: 32,
        width: 30
    },
    icon_style_delete: {
        height: 32,
        width: 30
    },
    CheckBoxs: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    deleteStudent: {
        justifyContent:'center',
        alignItems:'center',
        borderRadius:width/35,
        width:width/3.5,
        height:height/20,
        backgroundColor:'#F7AC16',
    },
    Itembodyheard: {
        marginTop:'3%',
        width:'80%',
        justifyContent:'space-around',
        flexDirection: 'row',
    },
    /// style AddStudentScreen

    container: {
        flex: 1,
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
        borderBottomColor:'#fff',
        borderBottomWidth:1,
        justifyContent:'center'
    },
    TextBody:{
        color: 'white' ,
        fontWeight:"bold",
        fontSize:SmartScreenBase.smPercenWidth*3.5
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
        backgroundColor:'#F08B01',
        borderRadius:SmartScreenBase.smPercenWidth*2,
        alignItems:'center',
        justifyContent:'center'
    },
    TextFilterModal:{
        color: '#fff' ,
        fontWeight:"bold",
        fontSize:SmartScreenBase.smPercenWidth*4,
    },
    ButtonCancel:{
        height:'50%',
        width:'40%',
        backgroundColor:'#ED8A22',
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center'
    },
    stylemodal: {
        height: SmartScreenBase.smPercenHeight*30,
        width: SmartScreenBase.smPercenWidth*80,
        backgroundColor: '#FFFFFF',
        borderRadius: SmartScreenBase.smPercenWidth*5,
        alignItems:'center'
    },
    styleAvataradd: {
        top:-SmartScreenBase.smPercenHeight*25/5,
        position: 'absolute',
        alignSelf: 'center',
        zIndex: 10,
        height:SmartScreenBase.smPercenWidth * 20,
        width: SmartScreenBase.smPercenWidth * 20,
    },
    styleTouchableOpacity: {
        height: SmartScreenBase.smPercenHeight*10,
        width: SmartScreenBase.smPercenWidth*70,
        flexDirection: "row",
        alignItems:"center",
        justifyContent: 'space-around',
    },
    txtinfornatin: {
        marginTop:SmartScreenBase.smPercenWidth * 13,
    },
    txtfullname: {
        textAlign:'center',
        width: SmartScreenBase.smPercenWidth*80,
        fontWeight:'bold',
    },
    txtegmail: {
        marginVertical:SmartScreenBase.smPercenWidth * 3,
        textAlign:'center',
        width: SmartScreenBase.smPercenWidth*80,
    },
    viewphone: {
        width: SmartScreenBase.smPercenWidth*80,
        flexDirection: "row",
        alignItems:"center",
        justifyContent:"center",
    },
    txtphone: {
        textAlign:'center',
    },
    Image_phoneNumber:{
        height:20,
        width:30,
    },


})
