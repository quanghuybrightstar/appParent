import { StyleSheet, Dimensions, Platform } from 'react-native';
import FontBase from '../../../../base/FontBase';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import { Colors } from '../../../../styleApp/color';
import { FontSize, FontWeight } from '../../../../styleApp/font';
const { width, height } = Dimensions.get('window');
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors._F3FFFF,
        alignItems: 'center'
    },
    clockIcon: {
        width: SmartScreenBase.smBaseWidth * 50,
        height: SmartScreenBase.smBaseWidth * 60,
        resizeMode: 'contain',
        marginRight: SmartScreenBase.smBaseWidth * 20
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonText: {
        color: Colors.White,
        marginLeft: SmartScreenBase.smBaseWidth * 20,
        fontSize: FontSize.size55Font,
        ...FontWeight.Bold
    },
    button: {
        alignSelf: 'center',
        marginVertical: SmartScreenBase.smBaseHeight * 20,
        borderRadius: 30
    },
    listView: {
        marginHorizontal: SmartScreenBase.smBaseWidth * 30,
    },
    emptyView: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: SmartScreenBase.smBaseHeight * 100,
    },
    emptyImage: {
        width: '100%',
        height: SmartScreenBase.smBaseHeight * 400
    },
    emptyText: {
        fontSize: FontSize.size55Font,
        textAlign: 'center',
        lineHeight: SmartScreenBase.smBaseHeight * 40,
        ...FontWeight.Bold,
        marginTop: SmartScreenBase.smBaseHeight * 30
    },
    buttonItem: {
        backgroundColor: Colors.White,
        borderRadius: SmartScreenBase.smBaseWidth * 40,
        marginVertical: SmartScreenBase.smBaseHeight * 10,
        marginHorizontal: SmartScreenBase.smBaseWidth * 20,
        flexDirection: 'row',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    viewDateTime: {
        width: '50%',
        paddingVertical: SmartScreenBase.smBaseHeight * 30,
        borderRadius: SmartScreenBase.smBaseWidth * 40,
        paddingHorizontal: SmartScreenBase.smBaseWidth * 59,
    },
    viewContent: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: SmartScreenBase.smBaseWidth * 10,
    },
    titleContent: {
        color: Colors.Black,
        ...FontWeight.Bold,
        lineHeight: 25,
        width: '90%',
    },
    viewIconTxt: {
        flexDirection: 'row',
    },
    calendarText: {
        fontSize: FontSize.size50Font,
        marginLeft: SmartScreenBase.smBaseWidth * 25,
        ...FontWeight.SemiBold
    },
    typeSty: {
        fontSize: FontSize.size50Font,
        marginLeft: SmartScreenBase.smBaseWidth * 25,
        ...FontWeight.Regular
    },
    marginTopItem: {
        marginTop: SmartScreenBase.smBaseHeight * 8,
    },
    txtHearderList: {
        marginHorizontal: SmartScreenBase.smBaseWidth * 60,
        paddingBottom: Platform.OS === 'ios' ? (SmartScreenBase.smBaseWidth * 30) : SmartScreenBase.smBaseWidth * 40,
        paddingTop: SmartScreenBase.smBaseWidth * 50,
        // backgroundColor: 'red',
        fontSize: FontSize.size65Font,
        ...FontWeight.SemiBold,
    },
    width: { width: width },
    deleteLay: {
        position: 'absolute',
        width: SmartScreenBase.smPercenWidth*11,
        height: SmartScreenBase.smPercenWidth*11,
        bottom: SmartScreenBase.smPercenWidth*0,
        right: SmartScreenBase.smPercenWidth*0,
        alignItems: 'center',
        justifyContent: 'center',
    },
});