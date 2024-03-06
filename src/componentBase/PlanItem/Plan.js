import React, { useCallback, useEffect, useState } from 'react';
import { Image, Platform, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import SmartScreenBase from '../../base/SmartScreenBase';
import { PlanItem, PLAN_TYPE } from '.';
import { FontWeight } from '../../styleApp/font';
import { CommonJson } from '../../stringJSON';
import { TextBox } from '../TextBox';
import { Colors } from '../../styleApp/color';
import LinearGradient from 'react-native-linear-gradient';
import { styles } from '../../screens/Student/StudyPlan/StudyPlan.styles';
import moment from "moment";
import SwipeableItem, { OpenDirection } from 'react-native-swipeable-item';

/**
 * @summary The Plan component 
 * 
 * @param {object} props 
 * @property {any} props.item: Plan object
 * @property {number} props.index: index of plan
 * @property {ref} props.itemRefs: reference of the item list
 * @property {Component} props.HiddenItem: Hidden Component
 * @property {function} props.onPress: 
 * 
 * @returns {Component}
 */
export const Plan = (planItemProps) => {
    let { item, index, itemRefs, HiddenItem, onPress } = planItemProps
    const [isOpen, setIsOpen] = useState(false)
    /**
     * Check type of plan
     * @returns string
     */
    const checkType = () => {
        if (item.type === 'personal') {
            return Colors.SuccessGreen
        } else if (item.type === 'teaching_work') {
            return Colors._00AEEF
        } else if (item.type === 'professional_activities') {
            return Colors.Orange
        } else if (item.type === 'test_evaluation') {
            return Colors._C367F4
        } else if (item.type === 'other') {
            return Colors._BE1E2D
        } else return Colors.SuccessGreen
    }

    useEffect(() => {
        return () => {
            itemRefs.delete(item.id)
        }
    }, [])
    return (
        <>
            <SwipeableItem
                activationThreshold={Platform.OS === 'ios' ? 20 : 10}
                ref={(ref) => {
                    if (ref && !itemRefs.get(item.id)) {
                        itemRefs.set(item.id, ref);
                    }
                }}
                renderUnderlayLeft={() => <HiddenItem data={{ item }} />}
                // swipeEnabled
                onChange={({ open }) => {
                    if (open) {
                        // Close all other open items
                        [...itemRefs.entries()].forEach(([key, ref]) => {
                            if (key !== item.id && ref) ref.close();
                        });
                    }
                    setIsOpen(!!open)
                }}


                overSwipe={20}
                snapPointsLeft={[175]}
            >
                <PlanItem
                    onPress={onPress}
                    containerStyle={{ marginHorizontal: SmartScreenBase.smPercenWidth * 5 }}
                    type={checkType()}
                    middleComponent={() => (
                        <View style={styles.viewPlan}>
                            <TextBox style={[styles.planInfo, FontWeight.SemiBold]} >{moment(item.start_time).format("HH:mm")}</TextBox>
                            <TextBox style={[styles.planInfo, FontWeight.SemiBold]}>{(item.type == 'teaching_work' ? "Giảng dạy tại lớp " : "")+ item.title}</TextBox>
                            <TextBox numberOfLines={2} style={styles.planInfo}>{item.content}</TextBox>
                            {item.status === 'done' && <View style={[styles.viewDone, { right: -20 }]}>
                                <Image
                                    source={{ uri: 'success_tick_icon' }}
                                    style={styles.iconSucces}
                                />
                                <TextBox style={[styles.planInfo, styles.txtComplete]}>{CommonJson.Completed}</TextBox>
                            </View>}
                            {item.status === 'over_time' && <View style={styles.viewDone}>
                                <Image
                                    source={{ uri: 'overtime_icon' }}
                                    style={styles.iconSucces}
                                />
                                <TextBox style={[styles.planInfo, styles.txtOverTime]}>{CommonJson.Overtime}</TextBox>
                            </View>}
                            {item.status === "upcoming" && <View style={styles.viewDone}>
                                <Image
                                    source={{ uri: 'upcoming' }}
                                    style={styles.iconSucces}
                                />
                                <TextBox style={[styles.planInfo, styles.txtUpcoming]}>{CommonJson.UpComing}</TextBox>
                            </View>}
                        </View>
                    )}
                    rightComponent={() => (
                        <TouchableOpacity onPress={() => {
                            if (!isOpen) {
                                itemRefs.get(item.id).open(OpenDirection.LEFT)
                            } else itemRefs.get(item.id).close()
                        }} style={styles.btnMoreContainer}>
                            <LinearGradient
                                style={styles.btnMore}
                                colors={[Colors.LightGreen, Colors.BaseGreen]}
                                start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }}>
                                <Image
                                    source={{ uri: 'imageback' }}
                                    style={isOpen ? styles.imageForward : styles.imageBack}
                                />
                            </LinearGradient>
                        </TouchableOpacity>
                    )}
                />
            </SwipeableItem>
        </>
    )
}
