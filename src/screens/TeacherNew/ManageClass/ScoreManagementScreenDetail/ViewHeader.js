
import * as React from 'react';
import { View, Text, Dimensions, StyleSheet, Image, TouchableOpacity } from 'react-native';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import moment from 'moment';
import { SelectDateModal } from '../../../../componentBase/SelectDateModal';
import { FontSize, FontWeight } from '../../../../styleApp/font';
import FontBase from '../../../../base/FontBase';
import { Colors } from '../../../../styleApp/color';
import ModalScoreManagement from '../../../../componentBase/ModalScoreManagement';
import LogBase from '../../../../base/LogBase';
const width = Dimensions.get('window').width;

/**
 * 
 * @param {object} props 
 * @property {Date} date Date
 * @property {function} onChangeValue Action when changing score textinput
 * @property {String} name Name of Score Ticket
 * @property {Number} scorePercent Selected score percent
 * @property {Number} type Selected score type
 * @property {Number} semester Selected semester
 * @property {Object} data_drop Data of drop down (semester, exam type, score type)
 * @returns {Component}
 */
const ViewHeader = (props) => {
    const { data_drop, date, name, scorePercent, semester, type, onChangeValue } = props
    //visible of date modal
    const [visible, setVisible] = React.useState(false)
    //score modal visible
    const [modal, showModal] = React.useState(false)
    //chosen date
    const [changeDate, setChangeDate] = React.useState()
    React.useEffect(() => {
        setChangeDate(date)
    }, [date])

    /**
     * Create score ticket
    */
    const createScore = (text, idExam, idScore, idSemester) => {
        const value = {
            exam_name: text,
            date_test: `${moment(changeDate).format('YYYY-MM-DD')} ${moment().format('HH:mm:ss')}`,
            type: idExam,
            score_percent: idScore,
            semester: idSemester
        }
        onChangeValue(value)
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => showModal(true)} style={styles.viewItem}>
                <View >
                    <View style={styles.viewIcontxt}>
                        <Image source={{ uri: 'icon_book' }} style={styles.iconBook} />
                        <Text style={[styles.txtBox, { ...FontWeight.Bold }]}>
                            {props.name}
                        </Text>
                    </View>
                    <View
                        style={[
                            styles.viewIcontxt,
                            { marginTop: SmartScreenBase.smBaseWidth * 36.6 },
                        ]}>
                        <Image source={{ uri: 'ic_date' }} style={styles.iconCalendar} />
                        <Text style={styles.txtBox}>{moment(date).format('DD/MM/YYYY')}</Text>
                    </View>
                </View>
                <View style={styles.viewRing}>
                    <Image source={{ uri: 'right' }} style={styles.icon} />
                </View>
            </TouchableOpacity>
            <ModalScoreManagement modalVisible={modal}
                closeModal={() => { showModal(false) }}
                closeWithOpen={(text, idExam, idScore, idSemester) => {
                    createScore(text, idExam, idScore, idSemester)
                    showModal(false)
                    setVisible(true)
                }}
                listExamType={data_drop.listExamType}
                listScoreType={data_drop.listScoreType}
                date={changeDate}
                nameScore={name}
                scorePercent={scorePercent}
                type={type}
                semester={semester}
                dataSemester={data_drop.dataSemester}
                onConfirm={(text, idExam, idScore, idSemester) => createScore(text, idExam, idScore, idSemester)}
            />
            <SelectDateModal
                rangeDate={changeDate}
                isVisible={visible}
                requestClose={(date) => {
                    setVisible(false)
                    setTimeout(() => {
                        showModal(true)
                    }, 400)
                }}
                onSave={(date) => {
                    const updateAt = `${moment(date).format('YYYY-MM-DD')} ${moment().format('HH:mm:ss')}`
                    if (!!date) {
                        setChangeDate(updateAt)
                        setVisible(false)
                        setTimeout(() => {
                            showModal(true)
                        }, 400)
                    }
                }}
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        width: width - 20,
        marginTop: SmartScreenBase.smBaseHeight * 20,
    },
    viewItem: {
        width: width - 40,
        backgroundColor: Colors._F3FFFF,
        paddingVertical: SmartScreenBase.smBaseWidth * 36.6,
        paddingHorizontal: SmartScreenBase.smBaseWidth * 55.4,
        borderRadius: SmartScreenBase.smBaseWidth * 40,
        shadowColor: Colors.Black,
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        flexDirection: 'row',
        alignItems: 'center'
    },
    viewRing: {
        width: SmartScreenBase.smBaseWidth * 120,
        height: SmartScreenBase.smBaseWidth * 120,
        borderRadius: SmartScreenBase.smBaseWidth * 120,
        backgroundColor: Colors._00A69C,
        position: 'absolute',
        right: -SmartScreenBase.smBaseWidth * 60,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: SmartScreenBase.smBaseWidth * 30,
        height: SmartScreenBase.smBaseWidth * 50,
    },
    viewIcontxt: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconBook: {
        width: SmartScreenBase.smBaseWidth * 60,
        height: SmartScreenBase.smBaseWidth * 70,
    },
    iconCalendar: {
        width: SmartScreenBase.smBaseWidth * 70,
        height: SmartScreenBase.smBaseWidth * 70,
    },
    txtBox: {
        marginLeft: SmartScreenBase.smBaseWidth * 40,
        fontSize: FontSize.size60Font,
        fontFamily: FontBase.MyriadPro_Regular,
        width: '90%'
    },
});
export default ViewHeader;