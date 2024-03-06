import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import StyleApp from '../../styleApp/stylesApp';
import * as Animatable from 'react-native-animatable';
import SmartScreenBase from '../../base/SmartScreenBase'
import FontBase from '../../base/FontBase';
const styles = StyleApp;

const Header = (props) => {

    const {title, showBack, bold, backgroundColor} = props;

    return (
        <Animatable.View animation={'slideInDown'} style={{zIndex: 1000}}>
            <View style={{...styles.view_header, backgroundColor: backgroundColor ?? 'rgba(0,0,0,0.3)', padding: 10}}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: Platform.OS === 'ios' ? SmartScreenBase.smPercenHeight * 3 : 0,
                }}>
                    {
                        showBack
                            ?
                            <TouchableOpacity
                            style={{
                                padding: 10, 
                                justifyContent: 'center', 
                                alignSelf: 'center'
                            }}
                                onPress={() => props.goBack()}
                            >
                                <Image
                                    style={styles.img_back}
                                    resizeMode={'contain'}
                                    source={{uri: 'imageback'}}/>
                            </TouchableOpacity>
                            :
                            null
                    }
                    <Text style={{...styles.title, fontFamily: bold ? FontBase.MyriadPro_Bold : FontBase.MyriadPro_Regular}}>{title}</Text>
                </View>
            </View>
        </Animatable.View>
    );
};

export default Header;
