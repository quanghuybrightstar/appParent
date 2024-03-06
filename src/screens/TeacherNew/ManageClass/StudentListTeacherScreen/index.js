import React, { useEffect } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions, Image, Platform, Alert, FlatList, RefreshControl } from 'react-native'
import { useSelector } from 'react-redux'
import SmartScreenBase from '../../../../base/SmartScreenBase';
import { AppHeader } from "../../../../componentBase/AppHeader";
import { RoundAvatar } from '../../../../componentBase/RoundAvatar';
import { ShortMainButton } from '../../../../componentBase/ShortMainButton';
import { SmallCheckBox } from '../../../../componentBase/SmallCheckBox';
import { SmPopup as AlertPopup } from '../../../../componentBase/SmPopup/SmPopup';
import { TextBox } from '../../../../componentBase/TextBox';
import { Colors } from '../../../../styleApp/color';
import { useModel } from './StudentListTeacherScreen.logic';
import { styles } from "./StudentListTeacherScreen.styles";
import stylesApp from "../../../../styleApp/stylesApp";

/**
 * StudentListTeacherScreen Screen
 * @param {object} props props from redux and navigation
 * @returns {Component}
 */
export const StudentListTeacherScreen = (props) => {

    const language = useSelector(state => state.LanguageStackReducer.language)
    const { StudentListTeacherScreen, SmPopup } = language
    const { classItem, alertVisible, setAlertVisible,
        onDelete,
        onConfirmDelete, listStudent, loading, onFocus, selectedStudent, listEnrollment, messageVisible, setMessageVisible, message, setMessage,
        baseUrl } = useModel(props)

    return (
        <View style={[styles.container, styles.background]}>
            <AppHeader title={classItem.class_name} leftIconOnPress={() => {
                props.navigation.pop()
            }}
            />
            <View style={styles.container}>
                <View style={[styles.row, styles.headerBox]}>
                    <TextBox text={StudentListTeacherScreen.StudentList} style={styles.headerText} />
                    <View style={styles.row}>
                        <TouchableOpacity style={styles.iconBtn} onPress={() => {
                            if (listEnrollment.length > 0) {
                                props.navigation.navigate('ManageClassEnrollmentScreen', { item: classItem, enrollmentList: listEnrollment, baseUrl: baseUrl })
                            } else {
                                setMessage('Không có yêu cầu vào lớp nào')
                                setMessageVisible(true)
                            }
                        }}>
                            <Image source={{ uri: "request_student" }} style={styles.icon} />
                            {listEnrollment.length > 0 && <View style={styles.countBox}>
                                <TextBox text={listEnrollment.length} style={styles.countText} />
                            </View>}
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconBtn} onPress={() => props.navigation.navigate('AddStudentOnlineScreen', { item: classItem })}>
                            <Image source={{ uri: "invite_student" }} style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={[styles.listView]}>
                    <FlatList
                        bounces={false}
                        refreshControl={<RefreshControl refreshing={loading} onRefresh={onFocus} />}
                        indicatorStyle={Colors.Black}
                        // contentContainerStyle={[styles.listView]}
                        data={listStudent}
                        renderItem={({ item, index }) => (
                            <View style={[styles.itemBox, index === 0 ? styles.borderTopWidth : {}]}>
                                <TextBox text={index + 1} style={styles.indexText} />
                                <View style={styles.marginLeft40}>
                                    <RoundAvatar avatar={!!item.avatar ? `${baseUrl}${item.avatar}` : item.avatar} gender={item.gender} width={SmartScreenBase.smBaseHeight * 100} height={SmartScreenBase.smBaseHeight * 100} />
                                </View>
                                <View style={styles.infoContainer}>
                                    <View style={styles.infoBox}>
                                        <TextBox text={item.fullname} style={styles.nameText} />
                                    </View>
                                </View>
                                <TouchableOpacity onPress={() => onDelete(item)}>
                                    <Image source={{ uri: 'small_trash_icon' }} style={styles.trashIcon} resizeMode="contain" />
                                </TouchableOpacity>
                            </View>
                        )}
                        ListEmptyComponent={<View style={styles.emptyView}>
                            {!loading && <>
                                <Image source={{ uri: "group_student" }} style={styles.emptyImage} resizeMode="contain" />
                                <TextBox text={StudentListTeacherScreen.EmptyStudentList} style={styles.emptyText} />
                            </>}
                        </View>}
                    />
                </View>
            </View>
            <AlertPopup visible={alertVisible}
                // message={StudentListTeacherScreen.DeleteStudent1}
                cancelText={SmPopup.No}
                confirmText={SmPopup.Yes}
                cancelOnpress={() => setAlertVisible(false)}
                confirmOnpress={onConfirmDelete}
                cancelTextStyle={styles.borderRadius30}
                confirmTextStyle={styles.borderRadius30}
            >
                <TextBox text={StudentListTeacherScreen.DeleteStudent1} style={styles.deleteText} />
                {!!selectedStudent && <TextBox numberOfLines={null} text={selectedStudent.fullname} style={styles.deleteNameText} />}
                <TextBox text={`${StudentListTeacherScreen.DeleteStudent2}?`} style={styles.deleteText} />
            </AlertPopup>
            <AlertPopup visible={messageVisible}
                message={message}
                cancelText={null}
                confirmText={'Xong'}
                confirmOnpress={() => setMessageVisible(false)}
            />
        </View >
    )
}