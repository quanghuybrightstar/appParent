import React, { memo } from 'react';
import { useRef } from 'react';
import { useCallback } from 'react';
import { useMemo } from 'react';
import { Image, StyleSheet, TouchableOpacity, View, Text, Animated, Dimensions } from 'react-native';
import SmartScreenBase from '../../base/SmartScreenBase';
import { Colors } from '../../styleApp/color';
export const PLAN_TYPE = {
    GREEN: Colors.SuccessGreen,
    ORANGE: Colors.Orange,
    BLUE: 'blue',
    PURPLE: 'purple'
}

/**
 * @summary The plan component.
 * 
 * @param {object} props 
 * @property {string} text: The string will be display
 * @property {Component} middleComponent: The information component
 * @property {Component} rightComponent: The right component
 * @property {string} type: Color of the plan
 * @property {ViewStyle} containerStyle
 * @property {function} onPress
 * 
 * @returns {Component}
 */

export const PlanItem = memo((props) => {
    let { middleComponent, type, rightComponent, containerStyle, onPress } = props
    return (
        <View
            style={[styles.itemPlan, {
                ...containerStyle
            }]}>
            <TouchableOpacity
                onPress={onPress}
                activeOpacity={!!onPress ? 0.5 : 1}
                style={styles.content}>
                <View style={[styles.status, {
                    backgroundColor: type,
                }]} />
                {!!middleComponent && middleComponent()}
                {!!rightComponent && rightComponent()}
            </TouchableOpacity>
        </View>
    )
})


const styles = StyleSheet.create({
    itemPlan: {
        shadowColor: Colors.Black,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: "white",
        marginBottom: SmartScreenBase.smPercenWidth * 2,
        borderRadius: 8,
        // overflow: 'hidden'
    },
    content: {
        flexDirection: "row",
        alignItems: 'center',
        width: "100%",
        overflow: 'hidden',
        minHeight: SmartScreenBase.smBaseHeight * 100,
    },
    status: {

        width: SmartScreenBase.smBaseWidth * 60,
        borderTopLeftRadius: SmartScreenBase.smPercenWidth * 2,
        borderBottomLeftRadius: SmartScreenBase.smPercenWidth * 2,
        height: '100%'
    }
})