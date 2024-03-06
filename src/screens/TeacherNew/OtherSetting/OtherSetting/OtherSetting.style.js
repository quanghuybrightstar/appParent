import { StyleSheet } from "react-native";
import SmartScreenBase from "../../../../base/SmartScreenBase";
import { FontSize, FontWeight } from "../../../../styleApp/font";

export const styles = StyleSheet.create({
    btnLogout: {
        //marginTop: SmartScreenBase.smPercenHeight * 5,
        alignSelf: 'center',
        paddingVertical: SmartScreenBase.smPercenHeight * 1.5,
        height: 'auto',
        width: 'auto',
        borderRadius: SmartScreenBase.smPercenWidth * 15,
        fontSize: FontSize.size60Font,
        ...FontWeight.Bold,
    },
    btnLay: {
        height: SmartScreenBase.smPercenWidth * 15,
        width: SmartScreenBase.smPercenWidth * 100,
        alignItems: 'center',
        justifyContent: 'center'
    },
    viewOption: { 
        flexDirection: 'row', 
        //marginTop: SmartScreenBase.smPercenHeight * -1, 
        flexWrap: 'wrap', 
        alignItems: "center", 
        justifyContent: "center" },
    txtBtn: { marginTop: SmartScreenBase.smBaseHeight * 10, width: '65%' },
    imgLogo: {
        width: SmartScreenBase.smBaseWidth * 380,
        height: SmartScreenBase.smBaseHeight * 150,
        marginTop: SmartScreenBase.smPercenHeight * 3,
    }
})