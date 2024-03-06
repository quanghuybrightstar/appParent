import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, Animated, TouchableOpacity, Image } from 'react-native';
import styles from './styles';
import StyleLesson from '../StyleLesson';
import stylesApp from '../../../styleApp/stylesApp';
import SmartScreenBase from '../../../../base/SmartScreenBase';

const Header = (props) => {
    const { navigation } = props;
    return (
        <View style={{ alignSelf: 'center', alignItems: 'center', marginTop: SmartScreenBase.smPercenHeight * 2 }}>
            <View
                style={[
                    StyleLesson.Sty_Width_Screen,
                    { marginTop: SmartScreenBase.smPercenHeight * 2 },
                ]}>
                <View style={StyleLesson.View_Process}>
                    <Animated.View
                        style={[StyleLesson.Process]}
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