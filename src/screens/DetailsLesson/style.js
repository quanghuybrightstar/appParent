import { StyleSheet, Dimensions } from 'react-native';
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
        alignItems: 'flex-end',
        justifyContent: 'space-between'
    },
    viewBack: {
        flexDirection: 'row',
        alignItems: 'flex-end',
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
        fontWeight: 'bold'
    },
    viewBodyContainer:{
        marginTop:width/7,
        width,
        justifyContent:'center',
        alignItems:'flex-end',
        paddingHorizontal:'50%'
    },
    bodyContainer:{
        width,
        flex:1
    },
    viewDetails:{
        backgroundColor:'#fff',
        width,
        height:width
    },

})
