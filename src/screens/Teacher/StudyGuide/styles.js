import {StyleSheet, Platform} from 'react-native';
import SmartScreenBase from '../../../base/SmartScreenBase';
import Device from 'react-native-device-info'
import { Colors } from '../../../styleApp/color';
import fontbase from '../../../base/FontBase';
import FontBase from '../../../base/FontBase';

const styles = StyleSheet.create({
    header: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        paddingBottom: SmartScreenBase.smPercenHeight,
        paddingHorizontal: SmartScreenBase.smPercenWidth,
        paddingTop:SmartScreenBase.smPercenHeight*(Device.hasNotch()?4:3)
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonBack: {
        width: SmartScreenBase.smPercenWidth * 10,
        alignItems: 'center',
        justifyContent: 'center',
        height: SmartScreenBase.smPercenWidth * 10
    },
    iconBack: {
        width: '60%',
        height: '60%',
        resizeMode: 'contain'
    },
    title: {
        color: 'white',
        fontSize: SmartScreenBase.smPercenWidth * 5,
        marginLeft: SmartScreenBase.smPercenWidth * 2,
        fontFamily: FontBase.MyriadPro_Light,
        fontWeight: 'normal'
    },
    buttonFilter: {
        width: SmartScreenBase.smPercenWidth * 10,
        height: SmartScreenBase.smPercenWidth * 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconFilter: {
        width: '60%',
        height: '60%',
        resizeMode: 'contain'
    },
    content: {
        flex: 1,
        paddingVertical: SmartScreenBase.smPercenHeight * 4,
    },
    viewItemSeparatorComponent: {
        height: SmartScreenBase.smPercenHeight * 2
    },
    viewItem: {
        flex: 1,
        alignItems: 'flex-end',
        marginHorizontal: SmartScreenBase.smPercenWidth * 2.5,
    },
    viewContentItem: {
        width: SmartScreenBase.smPercenWidth * 95 * 0.9,
        backgroundColor: '#fff',
        borderRadius: SmartScreenBase.smPercenWidth * 4,
        paddingVertical: SmartScreenBase.smPercenHeight * 1.5,
        paddingHorizontal: SmartScreenBase.smPercenWidth * 14,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
        opacity: 0.95
    },
    viewIconType: {
        position: 'absolute',
        top: 0, bottom: 0,
        left: 0,
        justifyContent: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.50,
        shadowRadius: 5.46,
        elevation: 9,
    },
    iconType: {
        width: SmartScreenBase.smPercenWidth * 20,
        height: SmartScreenBase.smPercenWidth * 20,
        resizeMode: 'contain',
    },
    textNameFile: {
        fontFamily: fontbase.MyriadPro_Bold,
        color: Colors.Black,
        fontSize: SmartScreenBase.smPercenWidth * 4
    },
    textCreatedOn: {
        fontFamily: FontBase.MyriadPro_Light,
        color: Colors.Black,
        fontSize: SmartScreenBase.smPercenWidth * 3.5
    },
    textSkill: {
        fontFamily: FontBase.MyriadPro_Light,
        color: Colors._00A79D,
        fontSize: SmartScreenBase.smPercenWidth * 3.5
    },
    buttonDeleteItem: {
        width: SmartScreenBase.smPercenWidth * 10,
        height: SmartScreenBase.smPercenWidth * 10,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        bottom: SmartScreenBase.smPercenWidth,
        right: SmartScreenBase.smPercenWidth * 2,
    },
    iconDeleteItem: {
        width: '80%',
        height: '80%',
        resizeMode: 'contain'
    },
    containerModalSelect: {
        flex: 1,
        backgroundColor: '#00000070',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerContentModalSelect: {
        width: SmartScreenBase.smPercenWidth * 80,
        padding: SmartScreenBase.smPercenWidth * 5,
        backgroundColor: Colors.White,
        borderRadius: SmartScreenBase.smPercenWidth * 5,
    },
    borderModalSelect: {
        borderWidth: 0.5,
        borderColor: '#a6a6a6',
        marginHorizontal: SmartScreenBase.smPercenWidth
    },
    itemModalSelect: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: SmartScreenBase.smPercenWidth * 2.5,
        width: '100%',
    },
    textItemModalSelect: {
        fontSize: SmartScreenBase.smPercenWidth * 4,
        color: '#424143',
        fontFamily: FontBase.MyriadPro_Bold,
    },
    containerModalFilter: {
        flex: 1,
        backgroundColor: '#00000070',
        justifyContent: 'flex-end',
    },
    containerContentModalFilter: {
        backgroundColor: Colors.White,
        width: SmartScreenBase.smPercenWidth * 100,
    },
    viewContentModalFilter: {
        flexDirection: 'row',
        paddingVertical: SmartScreenBase.smPercenWidth * 3
    },
    viewLeftContentModalFilter: {
        flex: 1,
        paddingLeft: SmartScreenBase.smPercenWidth * 4
    },
    texTitleModalFilter: {
        fontFamily: fontbase.MyriadPro_Bold,
        color: Colors.Black,
        fontSize: SmartScreenBase.smPercenWidth * 4.5,
        marginVertical: SmartScreenBase.smPercenWidth
    },
    viewItemModalFilter: {
        flexDirection: 'row',
        paddingLeft: SmartScreenBase.smPercenWidth * 2,
        alignItems: 'center',
        marginVertical: SmartScreenBase.smPercenWidth
    },
    viewIconBoxModalFilter: {
        width: SmartScreenBase.smPercenWidth * 5,
        height: SmartScreenBase.smPercenWidth * 5,
        marginRight: SmartScreenBase.smPercenWidth * 2,
        alignItems: 'center'
    },
    iconBoxModalFilter: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    iconTickModalFilter: {
        position: 'absolute',
        bottom: SmartScreenBase.smPercenWidth,
        width: SmartScreenBase.smPercenWidth * 5,
        height: SmartScreenBase.smPercenWidth * 5,
        resizeMode: 'cover'
    },
    textItemModalFilter: {
        fontFamily: fontbase.MyriadPro_Light,
        color: Colors.Black,
        fontSize: SmartScreenBase.smPercenWidth * 4
    },
    viewButton: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: SmartScreenBase.smPercenWidth * 4,
        marginBottom: SmartScreenBase.smPercenWidth * 3
    },
    buttonModalFilter: {
        backgroundColor: '#ED8A22',
        paddingHorizontal: SmartScreenBase.smPercenWidth * 5,
        paddingVertical: SmartScreenBase.smPercenWidth * 1.5,
        borderRadius: SmartScreenBase.smPercenWidth * 3,
        marginHorizontal: SmartScreenBase.smPercenWidth
    },
    textButtonModalFilter: {
        color: Colors.White,
        fontSize: SmartScreenBase.smPercenWidth * 4,
        fontFamily: FontBase.MyriadPro_Bold,
    },
    containerModalCreateFile: {
        flex: 1,
        backgroundColor: '#00000070',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerContentModalCreateFile: {
        width: SmartScreenBase.smPercenWidth * 80,
        padding: SmartScreenBase.smPercenWidth * 5,
        backgroundColor: Colors.White,
        borderRadius: SmartScreenBase.smPercenWidth * 3,
    },
    textTitleCreateFile: {
        color: '#000',
        fontSize: SmartScreenBase.smPercenWidth * 4,
        fontFamily: fontbase.MyriadPro_Bold,
    },
    viewInputCreateFile: {
        width: '100%',
        height: SmartScreenBase.smPercenWidth * 10,
        borderWidth: 0.5,
        borderColor: '#a6a6a6',
        borderRadius: SmartScreenBase.smPercenWidth * 4,
        marginVertical: SmartScreenBase.smPercenHeight * 1.5,
        paddingHorizontal: SmartScreenBase.smPercenWidth * 3
    },
    textInputCreateFile: {
        fontFamily: FontBase.MyriadPro_Regular,
        padding: 0,
        flex: 1,
        fontSize: SmartScreenBase.smPercenWidth * 4,
        color: Colors.Black
    },
    viewSelectModalCreateFile: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        height: SmartScreenBase.smPercenWidth * 10,
        marginVertical: SmartScreenBase.smPercenHeight * 1.5,
        borderRadius: SmartScreenBase.smPercenWidth * 8
    },
    titleSelectModalCreateFile: {
        color: Colors.White,
        fontFamily:fontbase.MyriadPro_Bold,
        fontSize:SmartScreenBase.smFontSize*50,
        paddingTop:Platform.OS==='ios'?5:0
    },
    iconSelectModalCreateFile: {
        position: 'absolute',
        right: SmartScreenBase.smPercenWidth * 4,
        width: SmartScreenBase.smPercenWidth * 5,
        height: SmartScreenBase.smPercenWidth * 5,
        resizeMode: 'contain',
    },
    viewButtonModalCreateFile: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: SmartScreenBase.smPercenHeight * 2.5
    },
    gradientButtonModalCreateFile: {
        width: '48%',
        borderRadius: SmartScreenBase.smPercenWidth * 5,
    },
    buttonModalCreateFile: {
        width: '100%',
        paddingVertical: SmartScreenBase.smPercenWidth * 2.2,
        alignItems: 'center'
    },
    textButtonModalCreateFile: {
        fontFamily: FontBase.MyriadPro_Light,
        //fontWeight: '700',
        color: Colors.White
    },
    viewListModalCreateFile: {
        position: 'absolute',
        zIndex: 1,
        maxHeight: SmartScreenBase.smPercenWidth * 60,
        backgroundColor: Colors.White,
        borderRadius: SmartScreenBase.smPercenWidth * 5,
        paddingBottom: SmartScreenBase.smPercenWidth * 2,
        shadowColor: Colors.Black,
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
    },
    viewItemListModalCreateFile: {
        flex: 1,
        marginVertical: SmartScreenBase.smPercenWidth * 2,
        alignItems: 'center'
    },
    textItemListModalCreateFile: {
        fontFamily: fontbase.MyriadPro_Bold,
        color: Colors.Black
    },
    containerModalDelete: {
        flex: 1,
        backgroundColor: '#00000070',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerContentModalDelete: {
        width: SmartScreenBase.smPercenWidth * 80,
        paddingHorizontal: SmartScreenBase.smPercenWidth * 4,
        paddingTop: SmartScreenBase.smPercenWidth * 5,
        backgroundColor: Colors.White,
        borderRadius: SmartScreenBase.smPercenWidth * 3,
    },
    textContentModalDelete: {
        fontFamily: FontBase.MyriadPro_Regular,
        color: '#424143',
        fontSize: SmartScreenBase.smFontSize * 50,
        textAlign: 'center'
    },
    viewButtonModalDelete: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: SmartScreenBase.smPercenWidth * 5,
        marginBottom: SmartScreenBase.smPercenWidth * 3
    },
    buttonModalDelete: {
        width: '48%',
    },
    gradientButtonModalDelete: {
        width: '100%',
        alignItems: 'center',
        borderRadius: SmartScreenBase.smPercenWidth * 5,
        paddingVertical: SmartScreenBase.smPercenWidth * 2
    },
    textButtonModalDelete: {
        color: Colors.White,
        fontFamily: FontBase.MyriadPro_Bold,
        fontSize: SmartScreenBase.smPercenWidth * 4
    },
    btnClose:{
        alignSelf:'flex-end',
        paddingVertical:SmartScreenBase.smPercenHeight*1,
        paddingHorizontal:SmartScreenBase.smPercenWidth*1,
    },

    txtAll: {
        borderRadius: SmartScreenBase.smPercenWidth*2,
        width: SmartScreenBase.smPercenWidth*27,
        height: SmartScreenBase.smPercenWidth*9,
      },
      txtButtonHead: {
        paddingTop: SmartScreenBase.smPercenWidth*3,
        paddingHorizontal: SmartScreenBase.smPercenWidth*3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SmartScreenBase.smPercenWidth*3
      },
});

export default styles
