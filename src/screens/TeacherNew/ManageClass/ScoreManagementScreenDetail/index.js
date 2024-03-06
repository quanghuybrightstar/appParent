import * as React from 'react';
import { View, Text, ScrollView, FlatList, TouchableOpacity, Image, TextInput, Platform } from 'react-native';
import { styles } from './ScoreManagementScreenDetail.styles';
import { AppHeader } from '../../../../componentBase/AppHeader';
import { ShortMainButton } from '../../../../componentBase/ShortMainButton';
import { TextBox } from '../../../../componentBase/TextBox';
import { useModel } from './ScoreManagementScreenDetail.logic';
import ViewHeader from './ViewHeader';
import ViewCheckBox from './ViewCheckBox';
import LinearGradient from 'react-native-linear-gradient';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import { TextBoxModal } from '../../../../componentBase/TextBoxModal';
import { useSelector } from 'react-redux';
import Modal from 'react-native-modal'
import { FontSize, FontWeight } from '../../../../styleApp/font';
import FontBase from '../../../../base/FontBase';
import { Colors } from '../../../../styleApp/color';
import { FullScreenLoadingIndicator } from '../../../../componentBase/indicator/FullScreenLoadingIndicator';
import { KeyboardAwareFlatList, KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

/**
 * ScoreManagementScreenDetail Screen
 * @param {object} props props from redux and navigation
 * @returns {Component}
 */
export const ScoreManagementScreenDetail = (props) => {

    const { setModalText,
        modalText, name, setSendParent, onSubmitComment, onToggleCommentModal, modalTitle,
        note, listStudent, base_url, focusStudent, onSave, date, setDate,
        send, setSend, modal, setModal, isProcess, onChange, loading, onEdit, param, onPreSave, sendParent,
        scorePercent, type, semester, onChangeValue

    } = useModel(props);
    const [keyboardHeight, setKeyboardHeight] = React.useState(0);
    const language = useSelector(state => state.LanguageStackReducer.language)
    const dataSend = [
        { title: 'Gửi thông tin từng cá nhân', value: 'student' },
        { title: 'Gửi thông tin cả lớp', value: 'class' },
    ]
    const data_drop = props.navigation.getParam('list_data')

    /**
     * CommentBox Component
     * @param {object} item object contain comment field
     * @param {string} note note
     * @returns {Component}
     */
    const CommentBox = ({ item, note }) => {
        const [isShowFull, setShowFull] = React.useState(false)
        const { AttendancePaperTeacherScreen } = language
        return (
            <TouchableOpacity activeOpacity={0.8} onPress={() => setShowFull(!isShowFull)}>
                <TextBox style={styles.txtNote} numberOfLines={isShowFull ? undefined : 3}>
                    {!!item.comment ? AttendancePaperTeacherScreen.PrivateComment : AttendancePaperTeacherScreen.PublicComment}: <TextBox style={styles.commentText}>{!!item.comment ? item.comment : note}</TextBox>
                </TextBox>
            </TouchableOpacity>
        )
    }

    /**
     * list of student
     */
    const list = React.useMemo(() => {
        return !!listStudent && listStudent.map((item, index) => (
            <View
                key={item.id + item.score}
                style={[
                    styles.buttonItem,
                ]}>
                <View style={styles.viewAvatar}>
                    <Image source={{ uri: item?.avatar ? base_url + item?.avatar : '' }} style={styles.avatar} />
                </View>
                <View style={styles.viewContent}>
                    <TextBox style={styles.txtName}>{item.user_name}</TextBox>
                    {(!!note || !!item.comment) && <View>
                        <CommentBox item={item} note={note} />
                    </View>}
                    <TouchableOpacity onPress={() => {
                        onToggleCommentModal(item)
                    }}>
                        <LinearGradient
                            colors={[Colors.LightGreen, Colors.BaseGreen]}
                            start={{ x: 0, y: 0.5 }}
                            end={{ x: 1, y: 0.5 }}
                            style={styles.linear}>
                            {item.comment ? (
                                <TextBox style={styles.txtButtonLinear}>Sửa nhận xét</TextBox>
                            ) : (
                                <TextBox style={styles.txtButtonLinear}>{language.ScoreCardScreen.CommentBt}</TextBox>
                            )}
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
                <View style={styles.viewPoint}>
                    <LinearGradient
                        colors={[Colors._green04, Colors._darkgreen]}
                        start={{ x: 0, y: 0.5 }}
                        end={{ x: 1, y: 0.5 }}
                        style={styles.viewContentPoint}>
                        <Text style={styles.txtPointCT}>{language.ScoreCardScreen.ScoreText}</Text>
                        <ScoreComponent item={item} index={index} isEdit={false} onChange={onChange} />
                    </LinearGradient>
                </View>
            </View>
        ))
    }, [listStudent, language, onToggleCommentModal, onChange])

    return (
        <View style={styles.container}>
            <AppHeader
                title={language.ScoreCardScreen.Header}
                leftIconOnPress={() => {
                    props.navigation.pop();
                }}
                
            />
            <ViewHeader date={date} onChangeValue={onChangeValue} name={name} scorePercent={scorePercent} type={type} semester={semester} data_drop={data_drop} />
            <ViewCheckBox sendParent={sendParent} language={language} onChange={setSendParent} />
            {/* <View style={}> */}
            <KeyboardAwareScrollView
                // onKeyboardWillShow={(frames) => {
                //     Platform.OS === 'ios' && setKeyboardHeight(frames.endCoordinates.height)
                // }}
                // onKeyboardWillHide={(frames) => {
                //     Platform.OS === 'ios' && setKeyboardHeight(0)
                // }}
                style={styles.flatlist} showsVerticalScrollIndicator={false} >
                {list}
            </KeyboardAwareScrollView>
            <View style={[styles.btnDone]}>
                <ShortMainButton type={1} style={styles.button}
                    onPress={onPreSave}
                    text={language.ScoreCardScreen.SaveBt}
                    widthType={'full'}
                />
            </View>
            {/* </View> */}

            <TextBoxModal
                isVisible={modalText}
                title={modalTitle}
                defaultValue={!!focusStudent ? (!!focusStudent.comment ? focusStudent.comment : note) : ''}
                onCancel={() => setModalText(false)}
                submitText={language.ScoreCardScreen.ComfirmBt}
                onSubmit={onSubmitComment}
                placeholderText={language.ScoreCardScreen.TextHoderPopup}
                textInputStyles={styles.textInputStyles}
            />
            <Modal
                isVisible={modal}
                style={styles.viewModal}
            >
                <View style={styles.modal}>
                    <TouchableOpacity onPress={() => setModal(false)} style={styles.btnClose}>
                        <Image source={{ uri: 'icon_close' }} style={styles.icon_close} />
                    </TouchableOpacity>
                    <TextBox text={'Gửi phiếu điểm'} style={styles.txtTitleModal} />
                    {dataSend.map(item => {
                        return (
                            <TouchableOpacity onPress={() => setSend(item.value)} style={[styles.row, styles.marginBottom15]}>
                                <View style={styles.viewDot} >
                                    {send === item.value && <Image source={{ uri: 'ic_dot' }} style={styles.ic_dot} />}
                                </View>
                                <TextBox text={item.title} style={styles.txtValue} />
                            </TouchableOpacity>
                        )
                    })}
                    <ShortMainButton
                        onPress={props.navigation.getParam('card_id') ? onEdit : onSave}
                        type={1}
                        text={'Gửi'}
                        style={styles.btnSend}
                        widthType={'popup'}
                        loading={isProcess}
                        isDisabled={isProcess}
                        textStyles={{ fontFamily: FontBase.MyriadPro_Bold }}
                    />

                </View>
            </Modal>
            <FullScreenLoadingIndicator
                visible={isProcess || loading}
            />
        </View>
    );
};

/**
 * Function render Score Input Component
 */
const ScoreComponent = React.memo((props) => {
    const { item, onChange, index, isEdit} = props
    const [value, setValue] = React.useState(item.score);
    const [isAct, setAct] = React.useState(false);
    return (
        <>
        {!isAct ? <Text style={styles.txtPoint}
        onPress={()=>setAct(true)} >{item.score}</Text>
        : <TextInput
            value={value}
            style={styles.txtPoint}
            autoFocus={true}
            maxLength={4}
            placeholderTextColor={Colors._BBBDBF}
            keyboardType={'decimal-pad'}
            onChangeText={(input) => {
                let value = input
                if(value == "," || value == "." || value == "-" || value == " ") {
                    setValue("")
                    return
                }
                if (value.length > 0 && value[value.length - 1] === ',') {
                    value = value.substring(0, value.length - 1) + "."
                }
                try {
                    if (!value) {
                        setValue("")
                        const newItem = {
                            ...item,
                            score: "",
                        }
                        onChange(newItem, index)
                        return;
                    }
                    if (!(Number(value) !== 0 && !Number(value)) && Number(value) > 10) {
                        // setValue('10')
                        // const newItem = {
                        //     ...item,
                        //     score: '10',
                        // }
                        // onChange(newItem, index)
                    } else if (!(Number(value) !== 0 && !Number(value))) {
                        setValue(value)
                        const newItem = {
                            ...item,
                            score: value,
                        }
                        onChange(newItem, index)
                    }
                } catch (error) {

                }
            }}
            onBlur={() => {
                if (!value || (Number(value) !== 0 && !Number(value))) {
                    if (!value) {
                        const newItem = {
                            ...item,
                            score: "",
                        }
                        onChange(newItem, index)
                    };
                    return
                }
                let saveValue = Math.round((Number(value)) * 100) / 100
                console.log("-----saveValue", saveValue);
                setValue(`${saveValue}`)
                const newItem = {
                    ...item,
                    score: saveValue,
                }
                onChange(newItem, index)
            }}
        />
        }
        </>
    )
})