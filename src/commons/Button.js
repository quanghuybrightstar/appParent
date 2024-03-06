import React from 'react';
import {
    TouchableOpacity,
    Text,
    Platform,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import style from '../styleApp/stylesApp';
import SmartScreenBase from '../base/SmartScreenBase';
import FontBase from '../base/FontBase';

const Button = ({title,onPress,isShort,outline,isSmall,txtStyle})=>{

    if (outline){
        return <TouchableOpacity
            style={[isSmall ? style.Sty_SmallButton : isShort ? style.Sty_ShortButton : style.Sty_Button,
                {
                    backgroundColor:'transparent',
                    borderWidth:2,
                    borderColor:'#00b9b7',
                    paddingVertical:isSmall ? (SmartScreenBase.smPercenHeight - 2) : (SmartScreenBase.smPercenWidth * 3 - 2),
                }]}
            onPress={onPress}>
            <Text style={[style.Sty_Text_Button, txtStyle, {color:'#00b9b7'}]}>{title}</Text>
        </TouchableOpacity>;
    }

    return <TouchableOpacity onPress={onPress}>
        <LinearGradient
            style={[isSmall ? style.Sty_SmallButton : isShort ? style.Sty_ShortButton : style.Sty_Button]}
            colors={['#00e1a0', '#00b9b7']}
            start={{x: 0, y: 1}} end={{x: 0.5, y: 0.5}}
        >
            <Text style={[style.Sty_Text_Button, txtStyle]}>{title}</Text>
        </LinearGradient>
    </TouchableOpacity>;
};

export const ButtonGradien = ({onPress,disabled,children})=>{
    return <TouchableOpacity
        style={{}}
        onPress={onPress}
        disabled={disabled}>
        <LinearGradient
            style={{
                borderRadius:SmartScreenBase.smPercenWidth * 10,
                paddingHorizontal:SmartScreenBase.smPercenWidth,
                paddingVertical:SmartScreenBase.smPercenWidth / 2,
            }}
            colors={disabled ? ['#dcdcdc','#acacac'] : ['#00e1a0', '#00b9b7']}
            start={{x: 0, y: 1}} end={{x: 0.5, y: 0.5}}
        >
            {children}
        </LinearGradient>
    </TouchableOpacity>;
};

export const ButtonMedium = ({title,onPress,isShort,outline,isSmall,mstyle})=>{
    if (outline){
        return <TouchableOpacity
            style={[isSmall ? style.Sty_MediumButton : isShort ? style.Sty_ShortButton : style.Sty_Button,
                {
                    backgroundColor:'transparent',
                    borderWidth:2,
                    borderColor:'#00b9b7',
                    paddingVertical:isSmall ? (SmartScreenBase.smPercenHeight - 2) : (SmartScreenBase.smPercenWidth * 3 - 2),
                }]}
            onPress={onPress}>
            <Text style={{
                color:'#00b9b7',
                fontSize: SmartScreenBase.smFontSize * 50,
                fontFamily:FontBase.MyriadPro_Bold,
                // paddingTop:Platform.OS === 'ios' ? 5 : 0,
            }}>{title}</Text>
        </TouchableOpacity>;
    }
    return <TouchableOpacity onPress={onPress}>
        <LinearGradient
            style={[isSmall ? style.Sty_MediumButton : isShort ? style.Sty_ShortButton : style.Sty_Button,mstyle]}
            colors={['#00e1a0', '#00b9b7']}
            start={{x: 0, y: 1}} end={{x: 0.5, y: 0.5}}
        >
            <Text style={{
                fontSize: SmartScreenBase.smFontSize * 50,
                color: 'white',
                fontFamily:FontBase.MyriadPro_Bold,
                // paddingTop:Platform.OS === 'ios' ? 5 : 0,
            }}>{title}</Text>
        </LinearGradient>
    </TouchableOpacity>;
};

export default Button;
