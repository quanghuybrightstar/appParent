import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Dimensions, TouchableOpacity, Animated } from 'react-native';
const { width, height } = Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient';
const GradientDetails = (props) => {
    let heightValue = ((height / 3.3) / 10) * props.item.value
    const value = useRef(new Animated.Value(0)).current;
    const [change, setChange] = useState(false);
    useEffect(() => {
        Animated.timing(
            value,
            {
                toValue: heightValue,
                duration: 2000,
            }
        ).start();
    }, [props.item.checked])
    return (
        <View style={{ position: 'absolute', alignItems: 'center', bottom: 10, left: width / 7 * (props.index + 1), justifyContent: 'space-between' }}>
            <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }} colors={['#65b0e950', '#ada1f850']} style={{ borderRadius: 50, height: height / 3.3, width: width / 22, marginBottom: height / 40, }} >
                <View style={{ height: height / 3.3, justifyContent: 'flex-end' }}>
                    <LinearGradient start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }} colors={['#65b0e9', '#ada1f8']} style={{ borderRadius: 50, width: width / 22, }} >
                        <Animated.View style={{ height: value, }}></Animated.View>
                    </LinearGradient>
                </View>
            </LinearGradient>
            <TouchableOpacity style={{ padding: 5, borderRadius: 50, backgroundColor: props.item.checked?'#333333': undefined}} onPress={()=>props.Checked(props.index)}>
                <Text style={{ color: '#7f8080', paddingHorizontal: 4 }}>Tuần</Text>
                <Text style={{ color: '#7f8080', textAlign: 'center' }}>{props.item.day}</Text>
            </TouchableOpacity>
        </View>
    )
}
export default GradientDetails;