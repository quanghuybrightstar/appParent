import { Platform } from "react-native"
import FontBase from "../base/FontBase"
import SmartScreenBase from "../base/SmartScreenBase"

export const FontSize = {
    size35Font: SmartScreenBase.smFontSize * 35,
    size37Font: SmartScreenBase.smFontSize * 37,
    size40Font: SmartScreenBase.smFontSize * 40,
    size45Font: SmartScreenBase.smFontSize * 45,
    size50Font: SmartScreenBase.smFontSize * 50,
    size55Font: SmartScreenBase.smFontSize * 55,
    size60Font: SmartScreenBase.smFontSize * 60,
    size65Font: SmartScreenBase.smFontSize * 65,
    size70Font: SmartScreenBase.smFontSize * 70,
    size75Font: SmartScreenBase.smFontSize * 75,
    size80Font: SmartScreenBase.smFontSize * 80,
    size85Font: SmartScreenBase.smFontSize * 85,
}

export const FontWeight = {
    Regular: {
        fontFamily: FontBase.MyriadPro_Regular,
    },
    Light: {
        fontFamily: FontBase.MyriadPro_Light,
    },
    Bold: {
        fontFamily: FontBase.MyriadPro_Bold,
    },
    SemiBold: {
        fontFamily: FontBase.MyriadPro_Bold,
    },
    LightItalic: {
        fontFamily: FontBase.MyriadPro_LightIt,
    }
}