import React from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import SmartScreenBase from '../../../base/SmartScreenBase';

const Header = (props) => {

    const {title} = props;

    return (
        <View style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.3)',
            flexDirection: 'row',
        }}>
            <View style={{
                marginLeft: SmartScreenBase.smPercenWidth * 2,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: SmartScreenBase.smPercenHeight * 3,
            }}>
                <TouchableOpacity
                    style={{
                        width: SmartScreenBase.smPercenWidth * 5,
                        height: SmartScreenBase.smPercenWidth * 5,
                    }}
                    onPress={() => props.goBack()}
                >
                    <Image style={{
                        width: SmartScreenBase.smPercenWidth * 5,
                        height: SmartScreenBase.smPercenWidth * 5,
                    }}
                           resizeMode={'contain'}
                           source={{uri: 'imageback'}}/>
                </TouchableOpacity>

                <Text style={{
                    color: 'white',
                    marginLeft: SmartScreenBase.smPercenWidth * 5,
                    fontSize: SmartScreenBase.smPercenWidth * 5,
                }}>{title}</Text>
            </View>
        </View>
    );
};

export default Header;
