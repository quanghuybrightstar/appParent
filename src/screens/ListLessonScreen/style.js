import { StyleSheet, Dimensions, Platform } from 'react-native';
const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        position:'relative'
    },
    headerContainer: {
        height: height / 11,
        backgroundColor: '#52b7b5',
        width,
        flexDirection: 'row',
        alignItems: 'center',
        ...Platform.select({
            ios: {
                paddingTop: height / 28
            }
        })
    },
    buttonBack: {
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        width: 50,
    },
    iconBack: {
        width: width / 17,
        resizeMode: 'contain',
        height: width / 17,
    },
    titleHeader: {
        color: '#fff',
        fontSize: 19,
        textTransform:'capitalize'
    },
    
})
export { styles, width, height }
