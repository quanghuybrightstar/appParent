import React, { useState } from 'react';
import { Dimensions, FlatList, Image, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import { useSelector } from 'react-redux';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import { TextBox } from '../../../../componentBase/TextBox';
import { CurriculumTeacherJson } from '../../../../stringJSON';
import { Colors } from '../../../../styleApp/color';
import { FontSize, FontWeight } from '../../../../styleApp/font';
import { ShortMainButton } from '../../../../componentBase/ShortMainButton'
const { height, width } = Dimensions.get('window')

/**
 * Filter Modal
 * @param {Object} props props from redux and navigation
 * @returns {Component}
 */
export const ModalFilter = (props) => {
    let { visible, hideModal, dataGradle, onLoad, param, navigation } = props
    const [level, setLevel] = useState(!!param.level ? param.level : [])
    const [skill, setSkill] = useState(!!param.skill ? param.skill : [])
    const [classes, setClasses] = useState(!!param.classes ? param.classes : [])
    const [keyword, setKeyword] = useState(param.keyword)
    const dataLevel = ['easy', 'normal', 'hard']
    const dataSkill = ['pronunciation', 'vocabulary', 'grammar', 'reading', 'listening', 'speaking', 'writing', 'mini_test', 'project']
    const language = useSelector(state => state.LanguageStackReducer.language)
    const [err, setErr] = useState('')

    /**
     * check or uncheck an item
     * @param {Object} item choosable item
     */
    const checkbox = (item, value) => {
        if (value === 'Level') {
            let temp = Array.from(level)
            if (temp.includes(`"${item}"`)) {
                temp = temp.filter(b => b !== `"${item}"`)
            } else if (!temp.includes(`"${item}"`)) {
                temp.push(`"${item}"`)
            }
            setLevel(temp)
        }
        else if (value === 'Classes') {
            let temp = Array.from(classes)
            if (temp.includes(`"${item.count}"`)) {
                temp = temp.filter(b => b !== `"${item.count}"`)
            } else if (!temp.includes(`"${item.count}"`)) {
                temp.push(`"${item.count}"`)
            }
            setClasses(temp)
        }
        else if (value === 'Skill') {
            let temp = Array.from(skill)
            if (temp.includes(`"${item}"`)) {
                temp = temp.filter(b => b !== `"${item}"`)
            } else if (!temp.includes(`"${item}"`)) {
                temp.push(`"${item}"`)
            }
            setSkill(temp)
        }
    }

    /**
     * Cancel the filter
     */
    const onCancel = () => {
        setLevel(!!param.level ? param.level : [])
        setSkill(!!param.skill ? param.skill : [])
        setClasses(!!param.classes ? param.classes : [])
        setKeyword(param.keyword)
        hideModal()
    }
    const [size, setSize] = useState({
        height: 0,
        width: 0
    })

    /**
     * Render item level
     * @param {object} param0 level
     * @returns {Component}
     */
    const renderItemLevel = ({ item }) => {
        return (
            <View style={styles.viewItem}>
                <TouchableOpacity onPress={() => checkbox(item, 'Level')}>
                    <Image source={{ uri: level.includes(`"${item}"`) ? 'iconcheck' : 'iconuncheck' }} resizeMode={'contain'} style={styles.iconCheck} />
                </TouchableOpacity>
                <TextBox style={styles.txtItem}>{item}</TextBox>
            </View>
        )
    }

    /**
     * Render item Class
     * @param {object} param0 Class
     * @returns {Component}
     */
    const renderItemClasses = ({ item }) => {
        return (
            <View style={styles.viewItem}>
                <TouchableOpacity onPress={() => checkbox(item, 'Classes')}>
                    <Image source={{ uri: classes.includes(`"${item.count}"`) ? 'iconcheck' : 'iconuncheck' }} resizeMode={'contain'} style={styles.iconCheck} />
                </TouchableOpacity>
                <TextBox style={styles.txtItem}>{item.title}</TextBox>
            </View>
        )
    }

    /**
     * Render item skill
     * @param {object} param0 skill
     * @returns {Component}
     */
    const renderItemSkill = ({ item }) => {
        return (
            <View style={styles.viewItem}>
                <TouchableOpacity onPress={() => checkbox(item, 'Skill')}>
                    <Image source={{ uri: skill.includes(`"${item}"`) ? 'iconcheck' : 'iconuncheck' }} resizeMode={'contain'} style={styles.iconCheck} />
                </TouchableOpacity>
                <TextBox style={styles.txtItem}>{item === 'mini_test' ? 'test' : item}</TextBox>
            </View>
        )
    }

    /**
     * Clear filter
     */
    const onClean = () => {
        setKeyword('')
        setClasses([])
        setSkill([])
        setLevel([])
        hideModal()
        navigation.goBack()
    }

    /**
     * Checking if the keyword is entered
     */
    const checkFilter = () => {
        if (keyword.length > 0) {
            return true
        }
        return false
    }

    /**
     * Apply filter
     */
    const onApply = () => {
        if (keyword.length === 0) {
            setErr(CurriculumTeacherJson.Error)
        }
        else {
            const url = `topic=${keyword}&skill=[${skill}]&grade_id=[${classes}]&level=[${level}]`
            // console.log('url', url)
            onLoad(url)
            hideModal()
        }
    }
    return (
        <Modal isVisible={visible}
            style={styles.modalContainer}
        >
            <KeyboardAwareScrollView showsVerticalScrollIndicator={false} bounces={false}>
                <View style={[styles.container, {
                    height: height - size.height - (Platform.OS === 'ios' ? 0 : 20),
                }]} />
                <View style={styles.modal} onLayout={(e) => {
                    setSize(e.nativeEvent.layout)
                }}>
                    <TouchableOpacity onPress={onCancel} style={styles.btnCancel}>
                        <TextBox style={styles.txtCancel}>{language.CourseFilterModal.CloseBt}</TextBox>
                    </TouchableOpacity>
                    <View>
                        <TextBox style={styles.txtFilter}>{language.CourseFilterModal.TittleFilter}</TextBox>
                        <View style={styles.viewIp}>
                            <TextInput
                                placeholder={CurriculumTeacherJson.placeholderFilter}
                                style={Platform.OS === 'ios' ?
                                    styles.ipIos : styles.ipAndroid}
                                placeholderTextColor={Colors.Black}
                                onChangeText={(value) => {
                                    setKeyword(value)
                                    if (value.length > 0) {
                                        setErr('')
                                    }
                                }}
                                value={keyword}
                            />
                        </View>
                        {!!err && <TextBox style={styles.err}>{err}</TextBox>}
                        <View style={styles.viewCheck}>
                            <View>
                                <TextBox style={styles.txtHeader}>{language.CourseFilterModal.TittleLevel}</TextBox>
                                {dataLevel.map((item) => renderItemLevel({ item }))}
                                <TextBox style={styles.txtHeader}>{language.CourseFilterModal.TittleGrade}</TextBox>
                                {!!dataGradle && dataGradle.map((item) => renderItemClasses({ item }))}
                            </View>
                            <View>
                                <TextBox style={styles.txtHeader}>{language.CourseFilterModal.TittleSkill}</TextBox>
                                {dataSkill.map((item) => renderItemSkill({ item }))}
                            </View>
                        </View>
                    </View>

                    <View style={[styles.footer, checkFilter() ? styles.horizontal : {}]}>

                        {<ShortMainButton
                            onPress={onClean}
                            text={language.CourseFilterModal.DeleteFilterBt}
                            style={styles.cleanFilter}
                            textStyles={styles.txtClean}
                            widthType={'popup'}
                        />}
                        <ShortMainButton
                            type={1}
                            onPress={onApply}
                            text={language.CourseFilterModal.FilterBt}
                            style={styles.btnAssign}
                            textStyles={styles.txtAssign}
                            widthType={'popup'}
                        />

                    </View>
                </View>
            </KeyboardAwareScrollView>
        </Modal >
    )
}
export const styles = StyleSheet.create({
    ipAndroid: {
        flex: 1,
        ...FontWeight.LightItalic,
        height: 50,
        color: 'black',
        paddingHorizontal: 10,
    },
    ipIos: {
        flex: 1,
        ...FontWeight.LightItalic,
        marginVertical: 15,
        color: 'black',
        marginHorizontal: 20,
    },
    modalContainer: {
        margin: 0,
        justifyContent: 'flex-end',
        backgroundColor: Colors._00000070
    },
    modal: {
        backgroundColor: Colors.White,
        paddingVertical: SmartScreenBase.smBaseHeight * 20,
        paddingHorizontal: SmartScreenBase.smBaseWidth * 40
    },
    container: {
        backgroundColor: 'transparent',
        width: '100%',
    },
    btnCancel: {
        alignItems: 'flex-end'
    },
    txtCancel: {
        fontSize: FontSize.size55Font,
        ...FontWeight.Bold,
    },
    textInputIOS: {
        fontStyle: 'normal',
        ...FontWeight.Regular,
        marginVertical: SmartScreenBase.smBaseHeight * 19,
        color: Colors.Black,
        marginHorizontal: SmartScreenBase.smBaseWidth * 55,
    },
    textInputAndroid: {
        fontStyle: 'normal',
        ...FontWeight.Regular,
        height: SmartScreenBase.smBaseHeight * 62,
        color: Colors.Black,
        paddingHorizontal: SmartScreenBase.smBaseWidth * 25,
    },
    txtFilter: {
        fontSize: FontSize.size55Font,
        ...FontWeight.Bold,
    },
    viewIp: {
        borderWidth: 1,
        borderColor: Colors.LightGray,
        borderRadius: SmartScreenBase.smBaseWidth * 55,
        marginTop: SmartScreenBase.smBaseHeight * 13
    },
    iconCheck: {
        width: SmartScreenBase.smBaseWidth * 52,
        height: SmartScreenBase.smBaseWidth * 54,
        marginRight: SmartScreenBase.smBaseWidth * 40
    },
    viewCheck: {
        marginTop: SmartScreenBase.smBaseHeight * 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: SmartScreenBase.smPercenWidth * 5
    },
    txtHeader: {
        fontSize: FontSize.size55Font,
        marginBottom: SmartScreenBase.smBaseHeight * 8,
        ...FontWeight.SemiBold
    },
    viewItem: {
        marginBottom: SmartScreenBase.smBaseHeight * 12,
        flexDirection: 'row',
        alignItems: 'center'
    },
    txtItem: {
        textTransform: 'capitalize',
    },
    btnAssign: {
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // paddingVertical: SmartScreenBase.smBaseWidth * 30,
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
        paddingVertical: SmartScreenBase.smBaseHeight * 20,
        backgroundColor: Colors.White,
    },
    horizontal: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
    },
    cleanFilter: {
        justifyContent: 'center',
        alignItems: 'center',
        // paddingVertical: SmartScreenBase.smBaseWidth * 25,
        borderRadius: SmartScreenBase.smBaseWidth * 65,
        marginBottom: SmartScreenBase.smPercenHeight * 2,
        width: SmartScreenBase.smPercenWidth * 45,
        borderWidth: 1,
        borderColor: Colors._00B9B6,
    },
    err: {
        color: Colors.Red,
        paddingHorizontal: SmartScreenBase.smBaseWidth * 20,
        marginTop: SmartScreenBase.smBaseHeight * 8
    }
})