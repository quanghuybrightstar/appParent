import React, { useState } from 'react';
import { Dimensions, FlatList, Image, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import { useSelector } from 'react-redux';
import SmartScreenBase from '../../../../../base/SmartScreenBase';
import { SelectDateModal } from '../../../../../componentBase/SelectDateModal';
import { TextBox } from '../../../../../componentBase/TextBox';
import { CurriculumTeacherJson } from '../../../../../stringJSON';
import { Colors } from '../../../../../styleApp/color';
import { FontSize, FontWeight } from '../../../../../styleApp/font';
import moment from 'moment'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ShortMainButton } from '../../../../../componentBase/ShortMainButton';
const { height, width } = Dimensions.get('window')

/**
 * Filter Modal
 * @param {Object} props props from redux and navigation
 * @returns {Component}
 */
export const ModalFilter = (props) => {
    let { visible, hideModal, onFilter } = props
    const [skill, setSkill] = useState([])
    const dataSkill = ['Pronunciation', 'Vocabulary', 'Speaking', 'Grammar', 'Writing', 'Reading', 'Project', 'Listening', 'Mini_Test',]
    const language = useSelector(state => state.LanguageStackReducer.language)
    let [modalVisible, setModalVisible] = useState(false)
    let [modalEndDate, setModalEndDate] = useState(false)
    let [startDate, setStartDate] = useState(moment().toDate())
    let [endDate, setEndDate] = useState(moment(startDate).add(2, 'day').toDate())

    /**
     * check or uncheck an item
     * @param {Object} item choosable item
     */
    const checkbox = (item) => {
        let temp = Array.from(skill)
        if (temp.includes(item)) {
            temp = temp.filter(b => b !== item)
        } else if (!temp.includes(item)) {
            temp.push(item)
        }
        setSkill(temp)
    }

    /**
     * Render item skill
     * @param {object} param0 skill
     * @returns {Component}
     */
    const renderItemSkill = ({ item }) => {
        return (
            <View style={styles.viewItem}>
                <TouchableOpacity onPress={() => checkbox(item)}>
                    <Image source={{ uri: skill.includes(item) ? 'iconcheck' : 'iconuncheck' }} resizeMode={'contain'} style={styles.iconCheck} />
                </TouchableOpacity>
                <TextBox style={styles.txtItem}>{item === 'Mini_Test' ? "Test" : item}</TextBox>
            </View>
        )
    }

    /**
     * Clear filter
     */
    const onClean = () => {
        if (skill.length > 0
            || moment(startDate).format('DDMMYYYY') !== moment().format('DDMMYYYY')
            || moment(endDate).format('DDMMYYYY') !== moment().add(2, 'day').format('DDMMYYYY')
        ) {
            setSkill([])
            setStartDate(moment().toDate())
            setEndDate(moment().add(2, 'day'))
        } else {
            hideModal()
            onFilter('')
        }

    }

    /**
     * apply filter method
     */
    const onApply = () => {
        let urlskill = ''
        skill.map(item => {
            urlskill = urlskill + 'skill[]=' + item + '&'
        })
        let url = `?start_time=${moment(startDate).format('YYYY-MM-DD')}&${urlskill}end_time=${moment(endDate).format('YYYY-MM-DD')}`
        hideModal()
        onFilter(url)
    }

    const [size, setSize] = useState({
        height: 0,
        width: 0
    })

    /**
     * Clear filter
     */
    const onCancel = () => {
        onFilter('')
        setSkill([])
        setStartDate(moment().toDate())
        setEndDate(moment().add(2, 'day'))
        hideModal()
    }
    return (
        <Modal isVisible={visible}
            style={{
                margin: 0,
                justifyContent: 'flex-end',
                backgroundColor: Colors._00000070
            }}
        >
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
                <View style={[{
                    height: height - size.height - (Platform.OS === 'ios' ? 0 : 0),
                }, styles.viewHeader]} />
                <View style={styles.modal} onLayout={(e) => {
                    setSize(e.nativeEvent.layout)
                }}>
                    <TouchableOpacity onPress={onCancel} style={styles.btnCancel}>
                        <TextBox style={styles.txtCancel}>{language.FilterModal.CloseBt}</TextBox>
                    </TouchableOpacity>
                    <View>
                        <View style={[styles.row]}>
                            <View style={styles.width45}>
                                <TextBox style={styles.txtStartDate}>{language.FilterModal.FromDate}</TextBox>
                            </View>
                            <View style={styles.width45}>
                                <TextBox style={styles.txtStartDate}>{language.FilterModal.ToDate}</TextBox>
                            </View>
                        </View>
                        <LinearGradient
                            style={[styles.row, styles.borderRadius30]}
                            colors={[Colors._98F1D7, Colors._7AE1D4]}
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                            <TouchableOpacity onPress={() => {
                                setModalVisible(true)
                            }}>
                                <LinearGradient
                                    style={styles.viewDate}
                                    colors={[Colors.LightGreen, Colors.BaseGreen,]}
                                    start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                                    <TextBox style={styles.date}>{moment(startDate).format('DD/MM/YYYY')}</TextBox>
                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => {
                                setModalEndDate(true)
                            }} style={styles.viewDate}>
                                <TextBox style={styles.date}>{moment(endDate).format('DD/MM/YYYY')}</TextBox>
                            </TouchableOpacity>
                        </LinearGradient>
                        <View style={styles.marginTop10}>
                            <FlatList
                                indicatorStyle={'black'}
                                data={dataSkill}
                                renderItem={renderItemSkill}
                                keyExtractor={index => index.toString()}
                                numColumns={2}
                                contentContainerStyle={styles.flatlist}
                            />
                        </View>
                    </View>
                    <View style={styles.footer}>
                        <ShortMainButton
                            type={2}
                            style={styles.cleanFilter}
                            textStyles={styles.txtClean}
                            onPress={onClean}
                            text={language.FilterModal.DeleteFilterBt}
                            widthType={'popup'}
                        />
                        <ShortMainButton
                            type={1}
                            style={styles.btnAssign}
                            textStyles={styles.txtAssign}
                            onPress={onApply}
                            text={language.FilterModal.FilterBt}
                            isDisabled={skill.length > 0 ? false : true}
                            widthType={'popup'}
                        />

                    </View>
                    <SelectDateModal rangeDate={startDate} isVisible={modalVisible}
                        onSave={(date) => {
                            if (!!date) {
                                setStartDate(date)
                                setEndDate(moment(date).add(2, 'day'))
                            }
                        }}
                        requestClose={() => {
                            setModalVisible(false)
                        }} />
                    <SelectDateModal rangeDate={endDate} isVisible={modalEndDate}
                        onSave={(date) => {
                            if (!!date) {
                                setEndDate(date)
                            }
                        }}
                        minimunDate={startDate}
                        requestClose={() => {
                            setModalEndDate(false)
                        }} />
                </View>
            </KeyboardAwareScrollView>
        </Modal >
    )
}
export const styles = StyleSheet.create({
    flatlist: { flexWrap: 'wrap-reverse' },
    marginTop10: { marginTop: 10, },
    borderRadius30: { borderRadius: SmartScreenBase.smBaseWidth * 30 },
    width45: { width: SmartScreenBase.smPercenWidth * 45 },
    viewHeader: {
        backgroundColor: 'transparent',
        width: '100%',
    },
    modal: {
        backgroundColor: 'white',
        paddingVertical: SmartScreenBase.smBaseHeight * 20,
        paddingHorizontal: SmartScreenBase.smBaseWidth * 40
    },
    btnCancel: {
        alignItems: 'flex-end'
    },
    txtCancel: {
        fontSize: FontSize.size55Font,
        ...FontWeight.Bold,
    },
    txtFilter: {
        fontSize: FontSize.size55Font,
        ...FontWeight.Bold
    },
    viewIp: {
        borderWidth: 1,
        borderColor: Colors.LightGray,
        borderRadius: 20,
        marginTop: 10
    },
    iconCheck: {
        width: SmartScreenBase.smBaseWidth * 52,
        height: SmartScreenBase.smBaseWidth * 54,
        marginRight: SmartScreenBase.smBaseWidth * 40
    },
    viewCheck: {
        marginTop: SmartScreenBase.smBaseHeight * 30,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SmartScreenBase.smPercenWidth * 5
    },
    txtHeader: {
        fontSize: FontSize.size55Font,
        ...FontWeight.Light,
        marginBottom: 5
    },
    viewItem: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        width: SmartScreenBase.smPercenWidth * 45
    },
    txtItem: {
    },
    btnAssign: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: SmartScreenBase.smBaseWidth * 65,
        marginBottom: SmartScreenBase.smPercenHeight * 2,
        width: SmartScreenBase.smPercenWidth * 45
    },
    txtAssign: {
        color: Colors.White,
        fontSize: FontSize.size55Font,
        ...FontWeight.Regular,

    },
    txtClean: {
        color: Colors._00B9B6,
        fontSize: FontSize.size55Font,
        ...FontWeight.Regular,


    },
    footer: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    cleanFilter: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: SmartScreenBase.smBaseWidth * 65,
        marginBottom: SmartScreenBase.smPercenHeight * 2,
        width: SmartScreenBase.smPercenWidth * 45,
        borderWidth: 1,
        borderColor: Colors._00B9B6,
    },
    txtStartDate: {
        fontSize: FontSize.size55Font,
        alignSelf: 'center',
        ...FontWeight.Bold,
    },
    viewDate: {
        paddingVertical: SmartScreenBase.smBaseHeight * 35,
        width: SmartScreenBase.smPercenWidth * 45,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: SmartScreenBase.smBaseWidth * 30
    },
    iconRight: {
        width: SmartScreenBase.smBaseWidth * 52,
        height: SmartScreenBase.smBaseWidth * 52,
    },
    date: {
        fontSize: FontSize.size55Font
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: SmartScreenBase.smBaseHeight * 5
    }
})