import * as React from 'react'
import { FlatList, Image, ImageBackground, Platform, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import { styles } from "./ViewAttendanceTeacherScreen.styles";
import { useModel } from './ViewAttendanceTeacherScreen.logic'
import { AppHeader } from '../../../../componentBase/AppHeader';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import { ShortMainButton } from '../../../../componentBase/ShortMainButton';
import { TextBox } from '../../../../componentBase/TextBox';
import { RoundAvatar } from '../../../../componentBase/RoundAvatar';
import moment from 'moment'
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../../../styleApp/color';

/**
 * CommentBox Component
 * @param {object} item object contain comment field
 * @returns {Component}
 */
const CommentBox = ({ text }) => {
    const [isShowFull, setShowFull] = React.useState(false)
    const language = useSelector(state => state.LanguageStackReducer.language)
    const { AttendancePaperTeacherScreen } = language
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={() => setShowFull(!isShowFull)}>
            <TextBox style={styles.commentTextLabel} numberOfLines={isShowFull ? undefined : 3}>
                {AttendancePaperTeacherScreen.PrivateComment}: <TextBox style={styles.commentText}>{text}</TextBox></TextBox>
        </TouchableOpacity>
    )
}

/**
 * ViewAttendanceTeacherScreen Screen
 * @param {object} props props from redux and navigation
 * @returns {Component}
 */
export const ViewAttendanceTeacherScreen = (props) => {
    const language = useSelector(state => state.LanguageStackReducer.language)
    const { ViewAttendanceTeacherScreen, AttendancePaperTeacherScreen } = language
    const { attendanceDetail, status, classItem, loading, baseUrl } = useModel(props)
    return (
        <View style={[styles.container, { backgroundColor: Colors._F3FFFF }]}>
            <AppHeader title={!!attendanceDetail ? moment(attendanceDetail.date_roll_up, 'DD-MM-YYYY').format('DD/MM/YYYY') : ''} leftIconOnPress={() => {
                props.navigation.pop()
            }} />
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={loading} />}>
                    {!!attendanceDetail && <View style={styles.headerInfoBox}><TextBox style={styles.amountText} text={`${AttendancePaperTeacherScreen.PopulationText}: ${Number(attendanceDetail.total_student) - Number(attendanceDetail.number_absence)}/${attendanceDetail.total_student}`} /></View>}
                    {!!attendanceDetail && <FlatList
                        indicatorStyle={'black'}
                    bounces={false}
                        style={[styles.listView,]}
                        data={attendanceDetail.data_detail}
                        scrollEnabled={false}
                        keyExtractor={item => `student-${item.id}`}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={[styles.itemBox, styles.boxShadow,]}>
                                    <View>
                                        <RoundAvatar avatar={item.avatar ? `${baseUrl}${item.avatar}`: null} gender={item.gender} width={SmartScreenBase.smBaseHeight * 100} height={SmartScreenBase.smBaseHeight * 100} />
                                    </View>
                                    <View style={styles.infoContainer}>
                                        <View style={[styles.infoBox, styles.nameBox]}>
                                            <TextBox text={item.fullname} style={[styles.nameText, styles.container]} />
                                            {!!item.send_to_parent && < View style={[styles.row]}>
                                                <Image source={{ uri: 'tick_icon' }} style={styles.tickIcon} resizeMode="contain" />
                                                <TextBox text={'Đã gửi Phụ huynh'} style={styles.successText} />
                                            </View>}
                                        </View>
                                        {!!item.comment && <View>
                                            <CommentBox text={item.comment} />
                                        </View>}
                                        <View>
                                            <LinearGradient start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0.5 }} style={[styles.statusBox]} colors={status.find(a => a.body_value === item.status).color || [Colors.LightGreen, Colors.BaseGreen]}>
                                                <TextBox style={styles.statusText} text={status.find(a => a.body_value === item.status).label} />
                                            </LinearGradient>
                                        </View>
                                    </View>
                                </View>
                            )
                        }}

                    />}
                </ScrollView>
                <View style={styles.bottomButtonBox}>
                    <ShortMainButton
                        onPress={() => {
                            props.navigation.navigate('AttendanceCardTeacherScreen', {
                                attendanceDetail: attendanceDetail,
                                classItem: classItem,
                                baseUrl: baseUrl
                            })
                        }}
                        widthType="full"
                        text={ViewAttendanceTeacherScreen.FixBt}
                        type={1}
                        textStyles={styles.bottomButtonText}
                        style={styles.bottomButton} />
                </View>
            </View>
        </View >
    )
}