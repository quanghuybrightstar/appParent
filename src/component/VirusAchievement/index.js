import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Animated, StyleSheet, TouchableOpacity, Image, Dimensions, Easing } from 'react-native';
const { width, height } = Dimensions.get('window');
const VirusAchienement = (props) => {
    const Size = new Animated.Value(0);
    const timer1 = useRef();
    const timer2 = useRef();
    
    // const [remove, setRemove] = useState(false)
    useEffect(() => {
        remove = false
        if (props.location % 2 !== 0) {
            timer1.current = setInterval(() => {
                _showAnimation()
            }, 5000);
            // _hideAnimation()
        } else {
            timer2.current = setInterval(() => {
                _hideAnimation2()
            }, 7000);
        }
        return () => {
            clearTimeout(timer1.current)
            clearTimeout(timer2.current)
        }
    });
    const _hideAnimation = () => {
        Animated.timing(
            Size, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start();
    };

    const _showAnimation = () => {
        // Size.setValue(30)
        Animated.timing(
            Size, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
        }).start(() => { if (!remove) { _hideAnimation() } });
    };
    const _showAnimation2 = () => {
        Animated.timing(
            Size, {
            toValue: 0,
            duration: 3000,
            useNativeDriver: true,
        }).start();
    };
    const _hideAnimation2 = () => {
        // Size.setValue(0)
        Animated.timing(
            Size, {
            toValue: 1,
            duration: 3200,
            useNativeDriver: true,
        }).start(() => { if (!remove) { _showAnimation2() } });
    };
    const _setLocationLet = (value) => {
        switch (value) {
            case 0:
                return width / 4.1;
            case 1:
                return width / 2.6;
            case 2:
                return width / 3.7;
            case 3:
                return width / 2.025;
            case 4:
                return width / 1.43;
            case 5:
                return width / 1.6;
            case 6:
                return width / 2.12;
            case 7:
                return width / 1.74;
        }
    }
    const _setLocationTop = (value) => {
        switch (value) {
            case 0:
                return width / 2.4;
            case 1:
                return width / 4.3;
            case 2:
                return width / 3;
            case 3:
                return width / 4.2;
            case 4:
                return width / 2.95;
            case 5:
                return width / 4.05;
            case 6:
                return width / 2.7;
            case 7:
                return width / 2.35;
        }
    }
    return (
        <View style={{ position: 'absolute', left: _setLocationLet(props.location), top: _setLocationTop(props.location), justifyContent: 'center', alignItems: 'center', width: 30, height: 30 }}>
            <Animated.Image source={{ uri: 'vikhuantt' }} style={{ ...styles.icon, width: 30,  height: 30, transform:[{scale:Size}]}} />
        </View>
    )
};
const styles = StyleSheet.create({
    icon: {

        width: 30,
        resizeMode: 'contain'
    }
});
export default VirusAchienement;
