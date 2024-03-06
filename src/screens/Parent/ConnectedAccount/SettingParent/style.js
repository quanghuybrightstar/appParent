import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        width,
        marginTop: height / 18,
        paddingHorizontal: 10
    },
    viewTop: {
        borderRadius: 25,
        width: '100%',
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 30
    },
    titleNotification: {
        fontSize: 24,
        fontWeight: 'bold'
    },
    viewSetting: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 15,
        // alignItems: 'center'
    },
    iconNotification: {
        width: 25,
        height: 25,
        resizeMode: 'contain',
        marginRight: 15
    },
    viewTitleSetting: {
        flexDirection: 'row',
        alignItems:'center'
    },
    titleSetting: {
        fontSize: 17,
        width: '75%'
    },
    buttonCheckSetting: {
        width: '20%',
        height: 35
    },
    iconSetting: {
        resizeMode: 'contain',
        width: '100%',
        height: '100%'
    },
    viewBottomContainer:{
        position:'absolute',
        width,
        alignItems:'center',
        bottom:height/12
    },
    buttonSave:{
        backgroundColor:'#01283A',
        width:width/1.5,
        justifyContent:"center",
        alignItems:'center',
        borderRadius:width/3,
        height:height/14
    },
    titleSave:{
        fontSize:20,
        color:'#fff',
        fontWeight:'bold'
    }
})