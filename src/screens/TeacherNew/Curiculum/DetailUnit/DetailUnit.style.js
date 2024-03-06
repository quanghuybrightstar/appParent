import { StyleSheet, Dimensions, Platform } from 'react-native';
import FontBase from '../../../../base/FontBase';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import { Colors } from '../../../../styleApp/color';
import { FontSize, FontWeight } from '../../../../styleApp/font';

const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        backgroundColor: Colors._52b7b5,
        width: SmartScreenBase.smPercenWidth * 100,
        flexDirection: 'row',
        alignItems: 'center',
        ...Platform.select({
            ios: {
                paddingTop: SmartScreenBase.smPercenHeight * 100 / 28,
                height: SmartScreenBase.smPercenHeight * 10,
            },
            android: {
                height: SmartScreenBase.smPercenHeight * 8,
            }
        }),
    },
    buttonBack: {
        justifyContent: 'center',
        alignItems: 'center',
        width: SmartScreenBase.smBaseWidth * 140,
    },
    iconBack: {
        width: SmartScreenBase.smPercenWidth * 100 / 17,
        resizeMode: 'contain',
        height: SmartScreenBase.smPercenWidth * 100 / 17,
    },
    titleHeader: {
        color: Colors.White,
        fontSize: FontSize.size60Font,
        width: SmartScreenBase.smPercenWidth*80
    },
    item0: {
        backgroundColor: Colors.White,
        borderRadius: SmartScreenBase.smPercenWidth * 5,
        height: SmartScreenBase.smPercenWidth * 100 / 3.5,
        marginTop: SmartScreenBase.smPercenHeight * 100 / 10,
        padding: SmartScreenBase.smBaseWidth * 60,
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginBottom: SmartScreenBase.smBaseHeight * 25,
    },
    iconSkill: {
        padding: 4,
        width: SmartScreenBase.smPercenWidth * 100 / 4,
        height: SmartScreenBase.smPercenWidth * 100 / 4,
        backgroundColor: Colors.White,
        position: 'absolute',
        top: -SmartScreenBase.smPercenWidth * 100 / 8,
        borderRadius: SmartScreenBase.smPercenWidth * 100 / 3,
        shadowColor: Colors.Black,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,

        elevation: 7,
    },
    title0: {
        color: Colors._52b7b5,
        fontSize: FontSize.size55Font,
        textTransform: 'uppercase',
    },
    item: {
        width: '100%',
        height: SmartScreenBase.smPercenHeight * 10,
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginBottom: SmartScreenBase.smPercenHeight * 2,
    },
    titleItem: {
        fontSize: SmartScreenBase.smFontSize * 50,
        ...FontWeight.Bold,
        textTransform: 'uppercase',
    },
    viewIconItem: {
        position: 'absolute',
        padding: 5,
        borderRadius: SmartScreenBase.smPercenHeight * 11,
        height: SmartScreenBase.smPercenHeight * 11,
        width: SmartScreenBase.smPercenHeight * 11,
        backgroundColor: Colors.White,
        left: SmartScreenBase.smPercenWidth,
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        zIndex: 30,
        elevation: 7,
    },
    iconCheckSkill: {
        width: '100%', height: '100%', resizeMode: 'contain',
        borderRadius: SmartScreenBase.smPercenWidth * 100 / 4
    },
    viewOption: {
        width: '100%', alignItems: 'center', justifyContent: 'center', flexDirection: 'row'
    },
    imgSkill: {
        height: SmartScreenBase.smPercenWidth * 100 / 10,
        width: SmartScreenBase.smPercenWidth * 100 / 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: SmartScreenBase.smPercenWidth * 3
    },

    viewSkill: {
        width: '96%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.White,
        borderRadius: SmartScreenBase.smPercenWidth * 5,
    },
    viewFlatlist: { flex: 1, alignItems: 'center', width, paddingHorizontal: SmartScreenBase.smPercenWidth * 5, flexGrow: 1 },
    txtHeader: {
        ...FontWeight.Bold

    },
    flatlist: { width: '100%', flex: 1 },
    txtSkill1: { fontFamily: FontBase.UTM_AVO, color: Colors._00A79C },
    txtSkill2: { fontFamily: FontBase.UTM_AVO, color: Colors._231F20, }
});
export { styles, width, height };
