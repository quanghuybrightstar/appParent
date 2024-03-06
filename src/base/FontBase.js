import {Platform} from 'react-native';
class FontBase{

    static MyriadPro_Light = Platform.OS === 'ios' ? 'MyriadPro-Light' : 'MyriadPro-Light';

    static MyriadPro_LightIt = Platform.OS === 'ios' ? 'MyriadPro-LightIt' : 'MyriadPro-LightIt';

    static MyriadPro_Semibold = Platform.OS === 'ios' ? 'MyriadPro-SemiBold' : 'Myriad_pro_semibold';

    static MyriadPro_Regular = Platform.OS === 'ios' ? 'MyriadPro-Regular' : 'Myriad_pro_regular'

    static MyriadPro_Bold = Platform.OS === 'ios' ? 'MyriadPro-Bold' : 'myriadpro_bold';

    static MyriadPro_It = Platform.OS === 'ios' ? 'MyriadPro-It' : 'MyriadPro-It';

    static MyriadPro_Bold_It = Platform.OS === 'ios' ? 'MyriadPro-BoldIt' : 'Myriadpro_Bold_It';

    static UTM_AVO = Platform.OS == 'ios' ? 'utm-avo' : 'utm-avo';

    static UTM_FB_B = Platform.OS == 'ios' ? 'UTMFACEBOOKK&TITALIC' : 'UTM FACEBOOKB';
}
export default FontBase;