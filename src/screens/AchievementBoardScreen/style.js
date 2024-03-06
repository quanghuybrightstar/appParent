import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');
export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    header: {
        width: '100%',
        backgroundColor: '#22222250',
        height: height / 13,
        paddingHorizontal: 15,
        flexDirection: 'row',
        
        alignItems: 'center'
    },
    ViewBack: {
        flexDirection: 'row',
        height: '100%',
        alignItems: 'center',
        width
    },
    iconBack: {
        height: width/18,
        width: width/18,
        resizeMode: 'contain',
        marginRight:10
    },
    titleHeader: {
        fontSize: 24,
        color: '#fff',
        width:'82%',
    },
    viewFlasList: {
        marginBottom: height / 20,
        width,
        height: height / 4,
        paddingHorizontal: 20,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    viewInfo: {
        backgroundColor: '#ffffff95',
        borderRadius: 15,
        height: '100%',
        width: '65%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '2%'
    },
    viewIamge: {
        height: width / 3.5,
        width: width / 3.5,
        borderWidth: 2,
        borderColor: '#E9AF38',
        borderRadius: width / 3,
        justifyContent:'center',
        alignItems:'center'
    },
    imageAvatar: {
        height: width / 3.5,
        width: width / 3.5,
        // resizeMode:'contain',
        borderRadius: width / 3,
    }
})