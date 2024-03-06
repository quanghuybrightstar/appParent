import { StyleSheet, Dimensions,Platform} from 'react-native';
const { width, height } = Dimensions.get('window');
export default StyleSheet.create({
    container: {
        height,
        width,
        backgroundColor: "#22222250",
        alignItems: 'center',
        paddingTop: Platform.OS == 'ios'? height/40:0,
        paddingHorizontal:10,
        justifyContent:'center'
    },
})