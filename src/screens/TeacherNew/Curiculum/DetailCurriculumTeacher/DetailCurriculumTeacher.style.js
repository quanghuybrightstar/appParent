import { Dimensions, StyleSheet } from "react-native";
import SmartScreenBase from "../../../../base/SmartScreenBase";
import { DetailSkillJson } from "../../../../stringJSON";
import { Colors } from "../../../../styleApp/color";
import { FontWeight } from "../../../../styleApp/font";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    Bg: {
        paddingTop: SmartScreenBase.smPercenHeight * 2, flex: 1, backgroundColor: Colors._2B9A8E,
        marginBottom: -SmartScreenBase.smBaseHeight * 1
    },
    // viewDrop: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     backgroundColor: Colors.White,
    //     width: SmartScreenBase.smPercenWidth * 70,
    //     borderRadius: 20,
    //     paddingVertical: SmartScreenBase.smPercenHeight
    // },
    iconDrop: {
        width: SmartScreenBase.smBaseWidth * 50,
        height: SmartScreenBase.smBaseHeight * 18,
    },
    viewBorder: {
        borderRightWidth: 1,
        borderColor: Colors.Black,
        height: SmartScreenBase.smBaseHeight * 30,
        marginRight: SmartScreenBase.smBaseWidth * 24,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: SmartScreenBase.smBaseHeight * 24,
        paddingHorizontal: SmartScreenBase.smBaseWidth * 24
    },
    iconBack: {
        width: SmartScreenBase.smBaseWidth * 50,
        height: SmartScreenBase.smBaseHeight * 30,
        marginRight: SmartScreenBase.smBaseWidth * 30
    },
    iconList: {
        width: SmartScreenBase.smBaseWidth * 51,
        height: SmartScreenBase.smBaseHeight * 25
    },
    iconMaps: {
        width: SmartScreenBase.smBaseWidth * 33,
        height: SmartScreenBase.smBaseWidth * 30
    },
    viewIconList: {
        backgroundColor: Colors.White,
        width: SmartScreenBase.smBaseWidth * 105,
        height: SmartScreenBase.smBaseWidth * 105,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: SmartScreenBase.smBaseWidth * 52,
        marginLeft: SmartScreenBase.smBaseWidth * 25,

    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    viewIconMaps: {
        right: -(SmartScreenBase.smBaseWidth * 60),
        backgroundColor: Colors._CFD1D2,
        width: SmartScreenBase.smBaseWidth * 81,
        height: SmartScreenBase.smBaseWidth * 81,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: SmartScreenBase.smBaseWidth * 52,
        position: 'absolute'
    },
    drop: {
        width: SmartScreenBase.smPercenWidth * 69,
        borderRadius: SmartScreenBase.smBaseWidth * 30,
        alignItems: 'center',
        marginTop: -SmartScreenBase.smPercenHeight * 5,
        maxHeight: SmartScreenBase.smPercenHeight * 52
    },
    txtbox: { width: SmartScreenBase.smPercenWidth * 55, alignSelf: 'center', ...FontWeight.SemiBold },
    rightHeader: {
        width: '30%',
        height: SmartScreenBase.smPercenHeight * 100 / 19,
        alignItems: 'center',
        flexDirection: 'row',
    },
    btnmap: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        marginLeft: SmartScreenBase.smBaseWidth * 35
    },
    icmap: { width: '50%', height: '100%', resizeMode: 'contain' },
    flex: { flex: 1 },
    viewDrop: {
        padding: SmartScreenBase.smPercenWidth * 2,
        flexDirection: "row",
        backgroundColor: Colors.White,
        borderRadius: SmartScreenBase.smBaseWidth * 30,
        alignItems: 'center',
        width: SmartScreenBase.smPercenWidth * 68,
        alignSelf: 'center'
    },
    viewDropList: {
        padding: SmartScreenBase.smPercenWidth * 2,
        height: SmartScreenBase.smBaseHeight * 60,
        backgroundColor: "#fff",
        borderRadius: SmartScreenBase.smBaseWidth * 30,
    },
    paddingVertical0: { paddingVertical: 0, width: SmartScreenBase.smPercenWidth * 68, }
})