import React from 'react'
import {View,TouchableOpacity,Image,Text, Platform} from 'react-native'
import style from '../styleApp/stylesApp';
import SmartScreenBase from '../base/SmartScreenBase';
import DeviceInfo from 'react-native-device-info';
import LinearGradient from "react-native-linear-gradient";
import FontBase from '../base/FontBase';

const HeaderGradient = ({title,goBack,rightBtn}) => {

    return (
        <LinearGradient
                style={{
                    flexDirection:'row',
                    paddingVertical:SmartScreenBase.smPercenHeight,
                    paddingTop: DeviceInfo.hasNotch()?SmartScreenBase.smPercenHeight*4:SmartScreenBase.smPercenHeight*2,
                    alignItems:'center'
                }}
                colors={['#00b9b7','#00e1ae']}
                start={{x: 0, y: 1}} end={{x: 0.5, y: 0.5}}
            >
                <TouchableOpacity
                    style={{
                        padding: 10, 
                        justifyContent: 'center', 
                        alignSelf: 'center'
                    }}
                    onPress={() => goBack()}
                >
                <Image
                    style={{
                        width: SmartScreenBase.smPercenWidth * 5,
                        height: SmartScreenBase.smPercenWidth * 5,
                    }}
                    resizeMode={'contain'}
                    source={{uri: 'imageback'}}/>
            </TouchableOpacity>
            <Text style={{
                color: 'white',
                fontSize: SmartScreenBase.smFontSize * 60,
                fontFamily:FontBase.MyriadPro_Regular,
                flex:1,
            }} 
            ellipsizeMode='tail'
            numberOfLines={1}>{title}</Text>
            {
                !!rightBtn&&rightBtn()
            }
        </LinearGradient>
    );
};
export default HeaderGradient