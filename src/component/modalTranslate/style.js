import { StyleSheet, Dimensions,Platform} from 'react-native';
const { width, height } = Dimensions.get('window');
export default StyleSheet.create({
    container: {
        height: height*0.7,
        width,
        backgroundColor: "#fff",
        alignItems: 'center',
        // justifyContent:'flex-end',
        // paddingTop: Platform.OS == 'ios'? height/40:0,
    },
    viewSearch:{
        flexDirection:'row',
        height:70,
        width:width,
        backgroundColor:'#235581',
        marginBottom:10,
        paddingHorizontal:10,
        justifyContent:'space-between',
        alignItems:'center'
    },
    titleHeader:{
        fontSize:17,
        color:'#fff',
        fontWeight:'700'
    },
    buttonClose:{
        borderRadius:50,
        height:30,
        width:30,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#fff',

    },
    viewMenu: {
        width: '100%',
        justifyContent: 'space-around',
        flexDirection: 'row',
        paddingHorizontal:5,
        backgroundColor:'#fff'
    },
    buttonTranslate: {
        // backgroundColor: '#01283A',
        // padding: 10,
        // borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        height: 50
    },
    titleTextTranslate: {
        color: '#303030',
        fontSize: 17,
        fontWeight: '700'
    },
    viewWed: {
        marginTop: 5,
        width: width / 1.01,
        height: height*0.65,
        backgroundColor: '#fff'
    }
})