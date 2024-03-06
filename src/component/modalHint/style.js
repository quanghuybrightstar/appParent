import { StyleSheet, Dimensions } from 'react-native';
import SmartScreenBase from '../../base/SmartScreenBase';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex:1,
    },
    viewBodyContainer: {
        marginTop: height / 7,
        width,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconLinght: {
        height: 50,
        width: 50,
        resizeMode: 'contain'
    },
    viewHint: {
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center'
    },
    titleCheering: {
        // width: '80%',
        flex: 1,
        paddingHorizontal: 20,
        fontSize: 17,
        color: '#fff'
    },
    viewContentHint: {
        padding: 15,
        backgroundColor: '#ffffff80',
        marginTop: 20,
        paddingHorizontal: SmartScreenBase.smPercenWidth*5,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleHint: {
        fontSize: 17,
    },
    bodyContentContainer: {
        height: SmartScreenBase.smPercenHeight*65,
        width: '100%',
    },
    viewTitleHint: {
        backgroundColor: '#F7AC16',
        borderRadius: 15,
        borderWidth: 2,
        borderColor: "#fff",
        marginHorizontal: 3,
        marginVertical: 3,
    },
    viewValueHintContainer: {
        width: '100%',
        backgroundColor: '#ffffff80',
        padding: 22,
        borderRadius: 25,
        marginTop:50
    },
    buttonBottom: {
        marginTop: 20,
        width: width / 1.3,
        height: width / 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 25,
        backgroundColor: '#01283A',
    },
    viewNumber: {
        backgroundColor: '#fff',
        width: 50, height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#F7AC16',
        borderRadius: 50,
        position: 'absolute',
        top: -30,
        left: '50%'
    },
    titleButton: {
        fontSize: 20,
        fontWeight: '700'
    },
    titleQuestion:{
        width: '100%',
        fontSize: 18
    },
    viewAnswerContent:{
        marginTop: 20,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        justifyContent: 'space-between'
    },
    inputAnswer:{
        fontSize: 17,
        fontWeight: '700',
        borderBottomWidth: 1,
        borderBottomColor: '#303030',
        color: '#8E1C76',
        width: '80%',
        paddingBottom: 2,
        alignItems:'flex-start'
    },
    imagePencil: {
        marginRight: 5,
        width: width / 7,
        height: width / 7,
        resizeMode: 'contain'
    },
})