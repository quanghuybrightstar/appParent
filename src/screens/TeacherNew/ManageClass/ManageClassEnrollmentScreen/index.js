import React, { useEffect } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions, Image, Platform, Alert, FlatList } from 'react-native'
import { useSelector } from 'react-redux'
import SmartScreenBase from '../../../../base/SmartScreenBase';
import { AppHeader } from "../../../../componentBase/AppHeader";
import { RoundAvatar } from '../../../../componentBase/RoundAvatar';
import { ShortMainButton } from '../../../../componentBase/ShortMainButton';
import { SmallCheckBox } from '../../../../componentBase/SmallCheckBox';
import { TextBox } from '../../../../componentBase/TextBox';
import { useModel } from './ManageClassEnrollmentScreen.logic';
import { styles } from "./ManageClassEnrollmentScreen.styles";
import { SmPopup as AlertPopup } from '../../../../componentBase/SmPopup/SmPopup';
import { Colors } from '../../../../styleApp/color';
import { FullScreenLoadingIndicator } from '../../../../componentBase/indicator/FullScreenLoadingIndicator';

/**
 * ManageClassEnrollmentScreen Screen
 * @param {object} props props from redux and navigation
 * @returns {Component}
 */
export const ManageClassEnrollmentScreen = (props) => {

    const language = useSelector(state => state.LanguageStackReducer.language)
    const { ManageClassEnrollmentScreen, SmPopup } = language
    const { isSelectAll, setSelectAll, selectedItem, onSelectItem, listStudent, onSelectAll, baseUrl, acceptStudent, rejectStudent, isResultVisible, setResultVisible, message, loading } = useModel(props)

    return (
        <View style={[styles.container, styles.backgroundColor]}>
            <AppHeader title={ManageClassEnrollmentScreen.Header} leftIconOnPress={() => {
                props.navigation.pop()
            }}
            />
            <View style={styles.container}>
                <ScrollView
                    bounces={false}>
                    {listStudent.length > 0 && <TouchableOpacity style={styles.selectAllButton} onPress={onSelectAll}>
                        <TextBox text={ManageClassEnrollmentScreen.SelectAll} style={styles.selectAllText} />
                        <SmallCheckBox
                            style={styles.checkBox}
                            onPress={onSelectAll}
                            isNotify={isSelectAll}
                        />
                    </TouchableOpacity>}
                    <FlatList
                        bounces={false}
                        indicatorStyle={'black'}
                        style={[styles.listView, styles.boxShadow, listStudent.length === 0 ? styles.padding0 : {}]}
                        data={listStudent}
                        scrollEnabled={false}
                        renderItem={({ item, index }) => (
                            <View style={[styles.itemBox, index === 0 ? styles.borderTopWidth0 : {}]}>
                                <TextBox text={index + 1} style={styles.indexText} />
                                <View>
                                    <RoundAvatar avatar={`${baseUrl}${item.avatar}`} width={SmartScreenBase.smBaseHeight * 100} height={SmartScreenBase.smBaseHeight * 100} />
                                </View>
                                <View style={styles.infoContainer}>
                                    <View style={styles.infoBox}>
                                        <TextBox text={item.fullname} style={styles.nameText} />
                                        <SmallCheckBox
                                            style={styles.checkBox}
                                            onPress={() => onSelectItem(item.id)}
                                            isNotify={selectedItem.includes(item.id)}
                                        />
                                    </View>
                                    {/* <View style={styles.infoBox}>
                                        <ShortMainButton
                                            onPress={() => acceptStudent(item.id)}
                                            type={2} style={styles.acceptButton}
                                            textStyles={styles.buttonText}
                                            text={ManageClassEnrollmentScreen.SmallAgreeBt}
                                            widthType={'mini'}
                                        />
                                        <ShortMainButton
                                            onPress={() => rejectStudent(item.id)}
                                            type={2}
                                            style={styles.rejectButton}
                                            textStyles={styles.buttonText}
                                            text={ManageClassEnrollmentScreen.SmallRejectBt}
                                            widthType={'mini'}
                                        />
                                    </View> */}
                                </View>
                            </View>
                        )}

                    />
                </ScrollView>
                {listStudent.length > 0 && <View style={[styles.row, styles.bottomBox]}>
                    <ShortMainButton
                        text={ManageClassEnrollmentScreen.BigRejectBt}
                        type={1} textStyles={styles.confirmText}
                        style={styles.button} onPress={() => rejectStudent()}
                        widthType={'mini'}
                        isDisabled={selectedItem.length === 0} />
                    <ShortMainButton
                        text={ManageClassEnrollmentScreen.BigAgreeBt}
                        type={1}
                        textStyles={styles.confirmText}
                        style={styles.button} onPress={() => acceptStudent()}
                        widthType={'mini'}
                        isDisabled={selectedItem.length === 0} />
                </View>}
                <AlertPopup
                    visible={isResultVisible}
                    confirmText={'Đóng'}
                    confirmOnpress={() => {
                        setResultVisible(false)
                    }}
                    message={message}
                    cancelText={null}
                />
                <FullScreenLoadingIndicator visible={loading}/>
            </View>
        </View>
    )
}