import * as React from 'react'
import { FlatList, Image, TouchableWithoutFeedback, Platform, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import { AppHeader } from '../../../../componentBase/AppHeader';
import { TextBox } from '../../../../componentBase/TextBox';
import { styles } from "./AttendanceManagementTeacherScreen.styles";
import { useModel } from './AttendanceManagementTeacherScreen.logic'
import { ShortMainButton } from '../../../../componentBase/ShortMainButton'
import Modal from 'react-native-modal'
import { SelectDateModal } from '../../../../componentBase/SelectDateModal';
import moment from 'moment'
import FontBase from '../../../../base/FontBase';
import { Colors } from '../../../../styleApp/color';
import { SmPopup } from '../../../../componentBase/SmPopup/SmPopup';

/**
 * AttendanceManagementTeacherScreen Screen
 * @param {object} props props from redux and navigation
 * @returns {Component}
 */
export const AttendanceManagementTeacherScreen = (props) => {
    const language = useSelector(state => state.LanguageStackReducer.language)
    const { AttendanceManagementTeacherScreen } = language
    const { attendanceList, loading,
        isModalVisible, onToggleModalPress, setModalVisible, classItem, setcurIitem, setisShowPopup, curIitem, isShowPopup, callDelete,
        isDateModalVisible, setDateModalVible, selectedDate, setSelectedDate, onSaveDate, onAddNewAttendance } = useModel(props)
    return (
        <View style={styles.container}>
            <AppHeader title={AttendanceManagementTeacherScreen.Header} leftIconOnPress={() => {
                props.navigation.pop()
            }} />
            <View style={styles.container}>
                <ScrollView refreshControl={<RefreshControl refreshing={loading} />}>
                    {attendanceList.length > 0 && <TextBox text={AttendanceManagementTeacherScreen.TittleList} style={styles.titleText} />}
                    <FlatList
                        indicatorStyle={'black'}
                        style={styles.listView}
                        data={attendanceList}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity onPress={() => props.navigation.navigate('ViewAttendanceTeacherScreen', {
                                item: item,
                                class: classItem
                            })} activeOpacity={0.7} style={[styles.row, styles.itemBox, styles.boxShadow]}>
                                <View style={styles.itemInfoBox}>
                                    <View style={styles.row}>
                                        <Image source={{ uri: 'calendar_icon' }} style={styles.clockIcon} />
                                        <TextBox text={moment(item.date,"MM/DD/YYYY").format('DD/MM/YYYY')} style={styles.calendarText} />
                                    </View>
                                    {/* <View style={styles.row}>
                                        <Image source={{ uri: 'clock_icon' }} style={styles.clockIcon} />
                                        <TextBox text={moment(item.created_at).format('HH:mm')} style={styles.calendarText} />
                                    </View> */}
                                </View>
                                <View style={[styles.row, styles.itemInfoBox, styles.attendanceBox]}>
                                    <Image source={{ uri: 'people_icon' }} style={styles.peopleIcon} resizeMode="contain" />
                                    <TextBox text={`${Number(item.total_student) - Number(item.number_absence)}/${item.total_student}`} style={styles.attendanceText} />
                                </View>
                                <TouchableOpacity style={styles.deleteLay} 
                                        onPress={() => {
                                            setcurIitem(item)
                                            setisShowPopup(true)
                                        }}>
                                        <Image source={{ uri: 'delete_icon' }} style={styles.clockIconDel}/>
                                </TouchableOpacity>
                            </TouchableOpacity>
                        )}
                        ListEmptyComponent={<View style={styles.emptyView}>
                            {!loading && <>
                                <Image source={{ uri: 'attendence_empty' }} style={styles.emptyImage} resizeMode="contain" />
                                <TextBox numberOfLines={2} text={AttendanceManagementTeacherScreen.EmptyListText} style={styles.emptyText} />
                            </>}
                        </View>}
                    />
                </ScrollView>
                <ShortMainButton
                    type={1}
                    onPress={onToggleModalPress}
                    style={styles.button}
                    widthType="full"
                >
                    <View style={styles.row}>
                        <Image source={{ uri: 'plus_icon' }} style={styles.clockIcon} resizeMode="contain" />
                        <TextBox numberOfLines={1} text={AttendanceManagementTeacherScreen.CreateBt} style={styles.buttonText} />
                    </View>
                </ShortMainButton>
                <SelectDateModal animationIn="fadeIn" animationOut="fadeOut" rangeDate={selectedDate} isVisible={isDateModalVisible} requestClose={(date) => {
                    setDateModalVible(false)
                    onSaveDate(date)
                }}
                    onSave={onSaveDate} />
            </View>
            <SmPopup
                confirmOnpress={() => {
                    setisShowPopup(false);
                    callDelete()
                }}
                visible={isShowPopup}
                onClose={() => setisShowPopup(false)}
                cancelText={"Không"}
                confirmText={"Có"}
                message={'Bạn có chắc chắn muốn xoá bảng điểm này'}
            />
            {!!isModalVisible && <TouchableOpacity
                activeOpacity={1}
                style={styles.btnModal} onPress={() => {
                    setModalVisible(false)
                    setSelectedDate(new Date())
                }}>
                <View style={styles.modalBox}>
                    <TextBox text={AttendanceManagementTeacherScreen.TittleModal} style={styles.modalTitleText} />
                    <View style={styles.flex}>
                        <TouchableOpacity onPress={() => {
                            setDateModalVible(true)
                        }} style={styles.dateButton}>
                            <Image source={{ uri: 'calendar_black_icon' }} style={[styles.clockIcon, styles.calendarSelectIcon]} resizeMode="contain" />
                            <TextBox text={moment(selectedDate).format('DD/MM/YYYY')} style={styles.dateText} />
                        </TouchableOpacity>
                    </View>
                    <ShortMainButton
                        onPress={onAddNewAttendance}
                        text={AttendanceManagementTeacherScreen.ComfirmBt}
                        type={1}
                        style={styles.button}
                        widthType="popup"
                    />
                    <TouchableOpacity onPress={() => {
                        setSelectedDate(new Date())
                        setModalVisible(false)
                    }} style={styles.closeButton}>
                        <Image source={{ uri: 'close_icon' }} style={styles.closeIcon} />
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>}
        </View>
    )
}