import React, { useEffect } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    FlatList,
    TouchableOpacity,
    Dimensions,
    RefreshControl
} from 'react-native';
import { styles } from './ScoreManagementScreen.styles';
import { AppHeader } from '../../../../componentBase/AppHeader';
import { useSelector } from 'react-redux';
import { useModel } from './ScoreManagementScreen.logic';
import { ShortMainButton } from '../../../../componentBase/ShortMainButton';
import { TextBox } from '../../../../componentBase/TextBox';
import LinearGradient from 'react-native-linear-gradient';
import ModalScoreManagement from '../../../../componentBase/ModalScoreManagement';
import { SelectDateModal } from '../../../../componentBase/SelectDateModal';
import { FullScreenLoadingIndicator } from '../../../../componentBase/indicator/FullScreenLoadingIndicator';
import moment from 'moment';
import { Colors } from "../../../../styleApp/color";
import { SmPopup } from '../../../../componentBase/SmPopup/SmPopup';
const width = Dimensions.get('window').width;

/**
 * ScoreManagementScreen Screen
 * @param {object} props props from redux and navigation
 * @returns {Component}
 */
export const ScoreManagementScreen = (props) => {
    const language = useSelector((state) => state.LanguageStackReducer.language);
    const { ScoreManagementScreen } = language;
    const { scoreManagmentList, modal, showModal, fetchListScore, loading, listExamType, listScoreType, dataSemester, refreshing, isDateModalVisible, callDelete,
        setDateModalVible, selectedDate, setSelectedDate, callApiCreateScore, renderType, list_data, infoClass, setisShowPopup, isShowPopup, setcurIitem } = useModel(props);
    useEffect(() => {
        fetchListScore();
    }, [])

    /**
     * Create Score list
     * @param {string} text 
     * @param {number} idExam 
     * @param {number} idScore 
     * @param {number} idSemester 
     */
    const createScore = (text, idExam, idScore, idSemester) => {
        const value = {
            exam_name: text,
            date_test: selectedDate,
            type: idExam,
            score_percent: idScore,
            semester: idSemester
        }
        callApiCreateScore(value)
    }
    return (
        <View style={styles.container}>
            <AppHeader
                title={ScoreManagementScreen.Header}
                leftIconOnPress={() => {
                    props.navigation.pop();
                }}
            />
            <View style={styles.container}>
                { !loading ? <>
                {(scoreManagmentList <= 0) ? null : <View style={styles.width}>
                    <TextBox
                        text={ScoreManagementScreen.TittleList}
                        style={styles.txtHearderList}
                        numberOfLines={null}
                    />
                </View>}
                <ScrollView 
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => fetchListScore()}
                    />
                }>
                    <FlatList
                        indicatorStyle={'black'}
                        data={scoreManagmentList}
                        renderItem={({ item, index }) => (
                            <TouchableOpacity
                                style={styles.buttonItem}
                                onPress={() => {
                                    props.navigation.navigate('ScoreManagementScreenDetail', { param: item, list_data, infoClass, card_id: item.card_id });
                                }}
                            >
                                <LinearGradient
                                    colors={[Colors._green04, Colors._darkgreen]}
                                    start={{ x: 0, y: 0.5 }}
                                    end={{ x: 1, y: 0.5 }}
                                    style={styles.viewDateTime}>
                                    <View style={styles.viewIconTxt}>
                                        <Image
                                            source={{ uri: 'calendar_icon' }}
                                            style={styles.clockIcon}
                                        />
                                        <TextBox style={styles.calendarText} text={moment(item.origin_date_test).format('DD/MM/YYYY')} />
                                    </View>
                                    <View style={[styles.viewIconTxt, styles.marginTopItem]}>
                                        <Image
                                            source={{ uri: 'luyenthiact' }}
                                            style={styles.clockIcon}
                                        />
                                        <TextBox style={styles.typeSty} text={renderType(item.type)} />
                                    </View>
                                    <View style={[styles.viewIconTxt, styles.marginTopItem]}>
                                        <Image
                                            source={{ uri: 'clock_icon' }}
                                            style={styles.clockIcon}
                                        />
                                        <TextBox style={styles.typeSty} text={"Học kỳ "+(item.semester == 2 ? "II" : "I")} />
                                    </View>
                                </LinearGradient>
                                <View style={styles.viewContent}>
                                    <TextBox numberOfLines={3} style={styles.titleContent} text={item.exam_name} />
                                    <TouchableOpacity style={styles.deleteLay} 
                                        onPress={() => {
                                            setcurIitem(item)
                                            setisShowPopup(true)
                                        }}>
                                        <Image source={{ uri: 'delete_icon' }} style={styles.clockIcon}/>
                                    </TouchableOpacity>
                                </View>
                            </TouchableOpacity>
                        )}
                        ListEmptyComponent={
                            scoreManagmentList <= 0 ? (
                                <View style={styles.emptyView}>
                                    <Image source={{ uri: 'attendence_empty' }} style={styles.emptyImage} resizeMode="contain" />
                                    <TextBox numberOfLines={2} text={ScoreManagementScreen.EmptyListText} style={styles.emptyText} />
                                </View>
                            ) : null
                        }
                        scrollEnabled={false}
                    />
                </ScrollView>
                <ShortMainButton type={1} style={styles.button}
                    onPress={() => { showModal(true) }}
                    widthType={'full'}
                    isDisabled={loading}
                >
                    <View style={styles.row}>
                        <Image
                            source={{ uri: 'plus_icon' }}
                            style={styles.clockIcon}
                            resizeMode="contain"
                        />
                        <TextBox
                            numberOfLines={1}
                            text={ScoreManagementScreen.CreateBt}
                            style={styles.buttonText}
                        />
                    </View>
                </ShortMainButton>
                </> : <FullScreenLoadingIndicator visible={loading}/> 
                }
            </View>

            <ModalScoreManagement modalVisible={modal}
                closeModal={() => { showModal(false), setSelectedDate(new Date()) }}
                closeWithOpen={() => {
                    showModal(false)
                    setDateModalVible(true)
                }}
                listExamType={listExamType}
                listScoreType={listScoreType}
                date={selectedDate}
                dataSemester={dataSemester}
                onConfirm={(text, idExam, idScore, idSemester) => createScore(text, idExam, idScore, idSemester)}
            />
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
            <SelectDateModal
                rangeDate={selectedDate}
                isVisible={isDateModalVisible}
                requestClose={(date) => {
                    setDateModalVible(false)
                    setTimeout(() => {
                        showModal(true)
                    }, 400)
                }}
                onSave={(date) => {
                    setSelectedDate(date)
                    setDateModalVible(false)
                    setTimeout(() => {
                        showModal(true)
                    }, 400)
                }}
            />
        </View>
    );
};