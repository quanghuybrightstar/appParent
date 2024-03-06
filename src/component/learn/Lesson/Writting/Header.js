import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, Animated, TouchableOpacity, Image } from 'react-native';
import StyleLesson from '../StyleLesson';
import stylesApp from '../../../styleApp/stylesApp';
import SmartScreenBase from '../../../../base/SmartScreenBase';

const Header = (props) => {

    const { navigation } = props;

    let width = props.total ? ((props.index + 1) * SmartScreenBase.smPercenWidth * 80 / props.total) : 0;

    return (
        <View style={{ alignSelf: 'center', alignItems: 'center', marginTop: SmartScreenBase.smPercenHeight * 2 }}>
            <View
                style={{
                    width: SmartScreenBase.smPercenWidth * 100,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: SmartScreenBase.smPercenHeight * 3
                }}>
                <View style={{
                    width: SmartScreenBase.smPercenWidth * 80,
                    height: SmartScreenBase.smPercenHeight * 2.5,
                    borderRadius: (SmartScreenBase.smPercenHeight * 2.5) / 2,
                    alignItems: 'flex-start',
                    justifyContent: 'center',
                    backgroundColor: 'rgba(255,255,255,0.4)',
                }}>
                    <Animated.View
                        style={{
                            height: SmartScreenBase.smPercenHeight * 2.5 - 2,
                            borderRadius: (SmartScreenBase.smPercenHeight * 2.5) / 2,
                            backgroundColor: 'rgba(255,255,255,0.9)',
                            width: width ?? 0 }}
                    />
                </View>
                <View
                    style={{
                        width: SmartScreenBase.smPercenWidth * 10,
                        alignItems: 'center',
                    }}>
                    <TouchableOpacity>
                        <View>
                            <Image
                                source={{ uri: 'lesson_image3' }}
                                style={StyleLesson.ImageExit}
                            />
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ marginRight: SmartScreenBase.smPercenWidth * 2 }}>
                <Text
                    style={{
                        fontSize: SmartScreenBase.smPercenWidth * 4,
                        fontWeight: '700',
                        color: 'white',
                    }}>
                    {props.index + 1}/{props.total}
                </Text>
            </View>
        </View>
    );
};

export default Header;
