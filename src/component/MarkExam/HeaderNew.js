import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import SmartScreenBase from '../base/SmartScreenBase';

const smartScreenHeight = SmartScreenBase.smPercenHeight;

const HeaderNew = (props) => {

    const {title} = props;

    return (
        <View style={{
            justifyContent: 'space-between',
            alignItems: 'center',
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
                <TouchableOpacity style={{
                    width: SmartScreenBase.smPercenWidth * 5,
                    height: SmartScreenBase.smPercenWidth * 5,
                    // backgroundColor: '#fff',
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
                    padding: smartScreenHeight,
                }}>{title}</Text>
            </View>
            <TouchableOpacity
                style={{
                    marginTop: SmartScreenBase.smPercenHeight * 3,
                }}
                onPress={() => props.showModalCriteria()}
            >
                <Image source={{uri: 'wr2'}} resizeMode={'contain'}
                       style={{
                           width: SmartScreenBase.smPercenWidth * 10,
                           height: SmartScreenBase.smPercenWidth * 5,
                       }}
                />
            </TouchableOpacity>
        </View>
    );
};

export default HeaderNew;
