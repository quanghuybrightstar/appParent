import * as React from 'react'
import { FlatList, Image, ImageBackground, Platform, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { useSelector } from 'react-redux'
import { styles } from "./AttendancePaperTeacherScreen.styles";
import { useModel } from './AttendancePaperTeacherScreen.logic'
import { AppHeader } from '../../../../componentBase/AppHeader';
import moment from 'moment'
import SmartScreenBase from '../../../../base/SmartScreenBase';
import { TextBox } from '../../../../componentBase/TextBox';
import { RoundAvatar } from '../../../../componentBase/RoundAvatar';
import { SmallCheckBox } from '../../../../componentBase/SmallCheckBox';
import { ShortMainButton } from '../../../../componentBase/ShortMainButton';
import { BorderSelectBox } from '../../../../componentBase/BorderSelectBox';
import { TextBoxModal } from '../../../../componentBase/TextBoxModal';
import Modal from 'react-native-modal'
import FontBase from '../../../../base/FontBase';
import { SmPopup } from '../../../../componentBase/SmPopup/SmPopup';
import { Colors } from '../../../../styleApp/color';
import SelectByModal from '../../../../componentBase/SelectModal/SelectByModal';

/**
 * CommentBox Component
 * @param {object} item object contain comment field
 * @param {string} generalComment General comment
 * @returns {Component}
 */
const CommentBox = ({ item, generalComment }) => {
    const [isShowFull, setShowFull] = React.useState(false)
    const language = useSelector(state => state.LanguageStackReducer.language)
    const { AttendancePaperTeacherScreen } = language
    return (
        <TouchableOpacity activeOpacity={0.8} onPress={() => setShowFull(!isShowFull)}>
            <TextBox style={styles.commentTextLabel} numberOfLines={isShowFull ? undefined : 3}>
                {!!item.comment ? AttendancePaperTeacherScreen.PrivateComment : AttendancePaperTeacherScreen.PublicComment}: <TextBox style={styles.commentText}>{!!item.comment ? item.comment : generalComment}</TextBox></TextBox>
        </TouchableOpacity>
    )
}
/**
 * AttendancePaperTeacherScreen Screen
 * @param {object} props props from redux and navigation
 * @returns {Component}
 */
export const AttendancePaperTeacherScreen = (props) => {
    const language = useSelector(state => state.LanguageStackReducer.language)
    const { listStudent, loading, baseUrl, status, modalTitle, isProcess, isShowSendOption, setShowSendOption, onPreSave, isHasPrivate,
        selectedStudent, errorMessage, isCommentVisible, onCancelModal, focusStudent, onSave, selectedSendOption, setSelectedSendOption,
        isSelectAll, onSelectItem, onSelectAll, onToggleCommentModal, generalComment, onSubmitComment, onStatusChange, setshowModalSelect, 
        showModalSelect , onShowSelect, curSelect, isComfirmVisible, isSavePri, setSavePri, onCancelComfirm, onOKComfirm} = useModel(props)
    const { AttendancePaperTeacherScreen } = language

    const dataSend = [
        { title: 'Gửi thông tin từng cá nhân', value: 'student' },
        { title: 'Gửi thông tin cả lớp', value: 'class' },
    ]

    return (
        <View style={[styles.container, { backgroundColor: Colors._F3FFFF, }]}>
            <AppHeader title={moment(props.navigation.state.params.date).format('DD/MM/YYYY')} leftIconOnPress={() => {
                props.navigation.pop()
            }} rightComponent={() => (
                <TouchableOpacity style={styles.rightHeaderComponent} onPress={() => {onToggleCommentModal()}}>
                    <TextBox style={styles.rightHeaderText}>{AttendancePaperTeacherScreen.HeaderBt}</TextBox>
                </TouchableOpacity>
            )} />
            <View style={styles.container}>
                <ScrollView showsVerticalScrollIndicator={false} refreshControl={<RefreshControl refreshing={loading} />}>
                    {listStudent.length > 0 && <View style={[styles.row, styles.headerInfoBox]}>
                        <TextBox style={styles.amountText} text={`${AttendancePaperTeacherScreen.PopulationText}: ${listStudent.filter(a => a.status === status[0].value || a.status === status[1].value).length}/${listStudent.length}`} />
                        {/* <TouchableOpacity activeOpacity={0.9} style={styles.selectAllButton} onPress={onSelectAll}>
                            <TextBox text={AttendancePaperTeacherScreen.SendAllText} style={styles.selectAllText} />
                            <SmallCheckBox
                                onPress={onSelectAll}
                                isNotify={isSelectAll}
                            />
                        </TouchableOpacity> */}
                    </View>}
                    <FlatList
                        indicatorStyle={'black'}
                        style={[styles.listView, listStudent.length === 0 ? styles.padding0 : {}]}
                        data={listStudent}
                        scrollEnabled={false}
                        keyExtractor={(item, index) => `student-${item.id}-${index.toString()}`}
                        renderItem={({ item, index }) => (
                            <View style={[styles.itemBox, styles.boxShadow,]}>
                                <View>
                                    <RoundAvatar avatar={item.avatar ? `${baseUrl}${item.avatar}` : null} gender={item.gender} width={SmartScreenBase.smBaseHeight * 100} height={SmartScreenBase.smBaseHeight * 100} />
                                </View>
                                <View style={styles.infoContainer}>
                                    <View style={[styles.infoBox, styles.nameBox]}>
                                        <TextBox text={item.fullname} style={styles.nameText} />
                                        {/* <SmallCheckBox
                                            onPress={() => onSelectItem(item.id)}
                                            isNotify={selectedStudent.includes(item.id)}
                                        /> */}
                                    </View>
                                    {(!!generalComment || !!item.comment) && <View>
                                        <CommentBox item={item} generalComment={generalComment} />
                                    </View>}
                                    <View style={styles.infoBox}>
                                        <View style={styles.container}>
                                            {/* <ShortMainButton textNormal={true} onPress={() => {
                                                onToggleCommentModal(item)
                                            }} type={1} style={styles.acceptButton} textStyles={styles.buttonText}
                                                widthType={'mini'}
                                                text={(!!item.comment || !!generalComment) ? AttendancePaperTeacherScreen.FixCommentBt : AttendancePaperTeacherScreen.CommentBt} /> */}
                                                <TouchableOpacity onPress={() => {onToggleCommentModal(item)}} style={{width: '100%', paddingVertical: SmartScreenBase.smPercenWidth*2, justifyContent: 'center', alignItems: 'center'}}>
                                                    <TextBox style={{color: Colors.BaseGreen, textDecorationLine: 'underline'}} text={(!!item.comment || !!generalComment) ? AttendancePaperTeacherScreen.FixCommentBt : AttendancePaperTeacherScreen.CommentBt}/>
                                                </TouchableOpacity>
                                        </View>
                                        <SelectByModal selected={item.status} item={status} 
                                            onShowSelect={()=>onShowSelect(item.id)} 
                                            borderColor={status.find(a => a.value === item.status).color} 
                                            buttonStyles={{width: SmartScreenBase.smPercenWidth*40}}/>
                                        {/* <BorderSelectBox selected={item.status} onChange={onStatusChange(item)} item={status} borderColor={status.find(a => a.value === item.status).color} backgroundColor={Colors.Black} /> */}
                                    </View>
                                </View>
                            </View>
                        )}

                    />
                </ScrollView>
                <View style={styles.bottomButtonBox}>
                    <ShortMainButton
                        onPress={onPreSave}
                        text={AttendancePaperTeacherScreen.SaveBt2}
                        type={1}
                        widthType={'full'}
                        loading={isProcess}
                        isDisabled={isProcess}
                        textStyles={styles.bottomButtonText}
                        style={styles.bottomButton} />
                </View>
                <TextBoxModal
                    isVisible={isCommentVisible}
                    title={modalTitle}
                    mChild={()=>(
                    <View>
                    { isHasPrivate() && !focusStudent && <View style={styles.childModal}>
                        <SmallCheckBox style={{marginRight: SmartScreenBase.smPercenWidth*2}}
                            onPress={() => setSavePri(!isSavePri)}
                            isNotify={isSavePri}/>
                        <TextBox text={"Giữ lại nhận xét riêng đã soạn trước đó"}/>
                    </View>}
                    </View>)}
                    defaultValue={!!focusStudent ? (!!focusStudent.comment ? focusStudent.comment : generalComment) : generalComment}
                    onCancel={onCancelModal}
                    submitText={AttendancePaperTeacherScreen.SaveBt}
                    onSubmit={onSubmitComment}
                    textInputStyles={styles.textInputStyles}
                    placeholderText={AttendancePaperTeacherScreen.TextHoderPopup} />
                <SmPopup 
                    visible={isComfirmVisible} 
                    message={"Bạn có muốn giữ lại nhận xét riêng đã soạn trước đó."}
                    confirmOnpress={() => onOKComfirm()} confirmText={"Có"} 
                    cancelOnpress={() => onCancelComfirm()} cancelText={"Không"}/>
                <Modal
                    isVisible={isShowSendOption}
                    style={styles.viewModal}
                >
                    <View style={styles.modal}>
                        <TouchableOpacity onPress={() => setShowSendOption(false)} style={styles.btnClose}>
                            <Image source={{ uri: 'icon_close' }} style={styles.icon_close} />
                        </TouchableOpacity>
                        <TextBox text={'Gửi điểm danh'} style={styles.txtTitleModal} />
                        <View style={styles.attendanceOptionBox}>
                            {dataSend.map(item => {
                                return (
                                    <TouchableOpacity onPress={() => setSelectedSendOption(item.value)} style={[styles.rowSelection, styles.marginBottom15]}>
                                        <View style={styles.viewDot} >
                                            {selectedSendOption === item.value && <Image source={{ uri: 'ic_dot' }} style={styles.ic_dot} />}
                                        </View>
                                        <TextBox text={item.title} style={styles.txtValue} />
                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                        <ShortMainButton
                            onPress={onSave}
                            type={1}
                            text={'Gửi'}
                            widthType="popup"
                            style={styles.btnSend}
                            loading={isProcess}
                            isDisabled={isProcess}
                            textStyles={styles.txtbtn}
                        />

                    </View>
                </Modal>
                <SmPopup visible={!!errorMessage}
                    message={errorMessage}
                    cancelText={null}
                    confirmText={null}
                    containerStyles={styles.viewPopup}
                    messageStyle={styles.txtMessage}
                />
            </View>
            {showModalSelect && <SelectModal close={()=>setshowModalSelect(false)} isShow={showModalSelect} datalist={status} onChange={onStatusChange}/>}
        </View >
    )
}
