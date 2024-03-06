import React, { useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { AppHeader } from '../../../../componentBase/AppHeader';
import { TextBox } from '../../../../componentBase/TextBox';
import { FontSize } from '../../../../styleApp/font';
import { ManagingTutorialMethod } from './ManagingTutorial.logic';
import { styles } from './ManagingTutorial.style';
import { ManagingTutorialJson } from '../../../../stringJSON/AssignManagentJson';
import moment from 'moment';
import { SelectDateModal } from '../../../../componentBase/SelectDateModal';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import { Colors } from '../../../../styleApp/color';
import FontBase from '../../../../base/FontBase';
import { CommonJson } from '../../../../stringJSON';
import { useSelector } from 'react-redux';

/**
 * Tutorial Management Screen
 * @param {Object} props props from redux and navigation
 * @returns {Component}
 */
export const ManagingTutorial = (props) => {
    let { dataParam,
        startDate, setStartDate, removeTutorial,
        endDate, setEndDate, tutorial, errorDate,
        onClear, renderagain
    } = ManagingTutorialMethod(props);

    let [modalVisible, setModalVisible] = useState(false);
    let [modalEndDate, setModalEndDate] = useState(false);
    const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);
    /**
   * Render tutorial item
   * @param {object} param0 tutorial
   * @returns {Component}
   */

    const renderItem = ({ item }) => {
        return (
            <View style={[styles.horizontal, styles.viewItem]}>
                <Image source={{ uri: 'icon_file' }} style={styles.iconFile} />
                <TextBox style={styles.nameItem}>{item.title}</TextBox>
                <TouchableOpacity onPress={() => removeTutorial(item)}>
                    <Image source={{ uri: 'icon_delete' }} style={styles.iconDel} />
                </TouchableOpacity>
            </View>
        );
    };
    return (
        <>
            <AppHeader
                navigation={props.navigation}
                title={'Chi tiết bài'}
                leftIconOnPress={() => {
                    onClear();
                    props.navigation.pop();
                }}
                rightComponent={() => {
                    return <TouchableOpacity
                        onPress={() => {
                            var savef = props.navigation.getParam('saveListfile')
                            if(savef) savef(props.navigation.getParam('stuIndex'), props.navigation.getParam('index'))
                            props.navigation.pop();
                        }}
                        style={{paddingVertical: 8, paddingHorizontal: 32, borderRadius: 9999, backgroundColor: '#fff'}}>
                        <Text style={{fontFamily: FontBase.MyriadPro_Bold, color: '#02dda3', fontSize: SmartScreenBase.smFontSize * 40}}>{CommonJson.Save}</Text>
                    </TouchableOpacity>;
                }}
                styleTitle={styles.txtHeader}
            />
            <LinearGradient
                style={styles.flex1}
                colors={[Colors._E1FEF0, Colors._E1FEF0, Colors.White]}
                start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}>
                <View style={styles.body}>
                    {console.log("=====dataParam",dataParam)}
                    <TextBox numberOfLines={null} style={styles.nameLesson}>
                        {dataParam.lesson_topic || dataParam.lesson_name}
                    </TextBox>
                    <TextBox style={styles.txtTimeWork}>{ManagingTutorialJson.timeWork}</TextBox>

                    <View style={[styles.row, styles.marginBottom10]}>
                        <View style={styles.width49}>
                            <TextBox style={styles.txtStartDate}>{ManagingTutorialJson.start_time}</TextBox>
                        </View>
                        <View style={styles.width49}>
                            <TextBox style={styles.txtStartDate}>{ManagingTutorialJson.end_time}</TextBox>
                        </View>
                    </View>
                    <LinearGradient
                        style={[styles.row, styles.borderRadius30]}
                        colors={[Colors._98F1D7, Colors._7AE1D4]}
                        start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                        <TouchableOpacity onPress={() => {
                            setModalVisible(true);
                        }}>
                            <LinearGradient
                                style={styles.viewDate}
                                colors={[Colors.LightGreen, Colors.BaseGreen]}
                                start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                                <TextBox style={styles.date}>{moment(startDate).format('DD/MM/YYYY')}</TextBox>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            setModalEndDate(true);
                        }} style={styles.viewDate}>
                            <TextBox style={styles.date}>{moment(endDate).format('DD/MM/YYYY')}</TextBox>
                        </TouchableOpacity>
                    </LinearGradient>
                    {!!errorDate && <TextBox numberOfLines={null} style={styles.errText}>{errorDate}</TextBox>}
                    {dataLogin.role != 'parent' &&
                    <>
                    <View style={[styles.horizontal, styles.marginTop25]}>
                        <TextBox style={styles.txtFileTutorial}>{ManagingTutorialJson.FileTutorial}</TextBox>
                        <TouchableOpacity onPress={() => props.navigation.navigate('ListToturial', { id: props.navigation.getParam('item').lesson_id, renT: '-1', renderagain})}>
                            <TextBox style={styles.txtAddTutorial}>{ManagingTutorialJson.AddTutorial}</TextBox>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.flex1}>
                        {!!tutorial && <FlatList
                            bounces={false}
                            indicatorStyle={'black'}
                            data={tutorial.file}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                        />}
                    </View>
                    </>
                    }
                </View>
            </LinearGradient>

            {
                startDate && (
                    <SelectDateModal rangeDate={startDate} isVisible={modalVisible}
                        minimunDate={moment(new Date(), 'YYYY-MM-DD HH:mm:ss').toDate()}
                        onSave={(date) => {
                            if (date) {
                                setStartDate(date);
                            }
                        }}
                        requestClose={() => {
                            setModalVisible(false);
                        }} />
                )
            }
            {
                endDate && (
                    <SelectDateModal rangeDate={endDate} isVisible={modalEndDate}
                        minimunDate={startDate}
                        onSave={(date) => {
                            if (date) {
                                setEndDate(date);
                            }
                        }}
                        requestClose={() => {
                            setModalEndDate(false);
                        }} />
                )
            }
        </>
    );
};
