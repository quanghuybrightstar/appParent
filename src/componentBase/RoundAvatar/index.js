import React, { useEffect } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions, Image, Platform, Alert, FlatList } from 'react-native'
import SmartScreenBase from '../../base/SmartScreenBase'
import { Colors } from '../../styleApp/color'
import LogBase from '../../base/LogBase'

/**
 * @summary The RoundAvatar component 
 * 
 * @param {object} props 
 * @property {string} props.avatar: image url
 * @property {number} props.width
 * @property {number} props.height
 * @property {number} props.borderRadius
 * @property {style} props.style: style of the container
 * @property {string} props.gender: male or female
 * 
 * @returns {Component}
 */
export const RoundAvatar = (props) => {
    const { avatar, width, height, borderRadius, style, gender = 'male', isTeacher = false } = props
    const radius = borderRadius || width / 2
    return (
        <View style={[styles.container, { width: width, height: height, borderRadius: radius }, style]}>
            <Image source={{ uri: !!avatar ? avatar : (isTeacher ? gender === 'male' ? 'gv_liststudent_07' : 'gv_liststudent_09' : gender === 'male' ? 'phu_huynh_05' : 'phu_huynh_04') }} style={{ width: width, height: height, borderRadius: radius }} resizeMode="cover" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: SmartScreenBase.smBaseWidth * 6,
        borderColor: Colors._E7AE38,
        overflow: 'hidden',
        alignItems: "center",
        justifyContent: 'center',
    }
})