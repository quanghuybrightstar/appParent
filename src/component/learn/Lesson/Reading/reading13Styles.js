import { StyleSheet, Dimensions } from 'react-native';
import SmartScreenBase from '../../../../base/SmartScreenBase';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex:1,
        alignItems: 'center',
        minHeight: height/2
    },
    bodyContainer: {
        paddingTop: '2%',
        width: '100%',
    },
    buttonBottom: {
        marginTop: 20,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        borderRadius: 25,
        backgroundColor: '#09283a'
    },
    boderViewEnd: {
        backgroundColor: '#fff',
        marginHorizontal: 10,
        marginBottom: 20,
        paddingHorizontal: 15,
        paddingVertical: 15,
        paddingTop: SmartScreenBase.smPercenWidth*8,
        borderWidth: 3,
        borderRadius: 15,
        marginTop: 30
    },
    imageSuccess: {
        height: width / 3.2,
        width: width / 3.2,
        resizeMode: 'contain'
    },
    imageTrueFalse: {
        height: 50,
        width: 50,
        resizeMode: 'contain',
        position: 'absolute',
        top: -25,
        left: width / 2 - 33,
        zIndex: 10
    },
    titleAnswer: {
        fontSize: 17,
        fontWeight: 'bold'
    },
    titleResult2: {
        fontSize: 17,
        fontWeight: 'bold',
        color: "#B9D546"
    },
    titleExplain: {
        fontSize: 17,
        fontStyle: 'italic',
        paddingLeft: 10
    },
    titleResult: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        fontFamily:'iCielSoupofJustice'
    }
})