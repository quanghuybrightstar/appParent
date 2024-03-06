import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    bodyContainer: {
        paddingTop: '2%',
        width: '100%',
    },
    buttonBottom: {
        marginTop: height / 300,
        height: height / 14,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: width / 20,
        borderRadius: height / 13 / 2,
        backgroundColor: '#09283a'
    },
    boderViewEnd: {
        backgroundColor: '#fff',
        marginHorizontal: 10,
        marginBottom: 20,
        paddingHorizontal: 15,
        paddingVertical: 15,
        borderWidth: 3,
        borderRadius: 15,
        marginTop: 30
    },
    imageSuccess: {
        height: width / 3.6,
        width: width / 3.6,
        resizeMode: 'contain',
        position: 'absolute',
        top: -height / 25
    },
    imageTrueFalse: {
        height: 50,
        width: 50,
        resizeMode: 'contain',
        position: 'absolute',
        top: -32,
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
        color: "#72B228"
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
        fontFamily: 'iCielSoupofJustice'
    }
})