import React, { useEffect, useState, useRef } from 'react';
import { FlatList, Image, ImageBackground, Platform, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './DetailCurriculumTeacher.style'
import stylesApp from '../../../../styleApp/stylesApp'
import ModalDropdown from 'react-native-modal-dropdown';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import { TextBox } from '../../../../componentBase/TextBox';
import MapList from './mapList';
import Loading from '../../../../component/LoadingScreen';
import { stylesHistory } from '../../../Student/StudyForTest/styles';
import { DetailCurriculumMetod } from './DetailCurriculumTeacher.logic';
import { FontWeight } from '../../../../styleApp/font';

/**
 * DetailCurriculumTeacher Screen - Chi tiết giáo trình giáo viên
 * @param {object} props props from redux and navigation
 * @returns {Component}
 */
export const DetailCurriculumTeacher = (props) => {
    const [maplist, setMapList] = useState(false);
    let { _renderItem,
        isLoading, listCurriculum,
        dataMapList, dataLesson, selectDrop, defaultValue, setDefaultValue, curriculumName
    } = DetailCurriculumMetod(props)
    const [showmodal, setShowmodal] = useState(true)
    const mapRef = useRef()

    /**
     * Function render Item in drop list
     */
    const renderDrop = (option, index, isSelected) => {
        return (
            <View style={styles.viewDropList}>
                <TextBox>
                    {option.name}
                </TextBox>
            </View>
        );
    }
    return (
        <View style={styles.container}>
            {
                isLoading && <ImageBackground
                    source={{ uri: 'imagebackground' }}
                    imageStyle={stylesApp.ImageBackGround}
                    style={stylesHistory.loading}>
                    <Loading />
                </ImageBackground>
            }
            {
                !!dataLesson &&
                <ImageBackground style={styles.Bg} resizeMode={'cover'} source={{ uri: 'bg_detail_curruculum' }}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => props.navigation.goBack()}>
                            <Image source={{ uri: "icon_back" }} style={styles.iconBack} />
                        </TouchableOpacity>
                        <ModalDropdown
                            // defaultValue={defaultValue}
                            options={listCurriculum}
                            renderRow={renderDrop}
                            onSelect={(index, item) => {
                                selectDrop(item.type)
                                setDefaultValue(item.name)
                                mapRef.current?.scrollToOffset({ offset: 0, animated: false })
                            }}
                            onDropdownWillShow={() => setShowmodal(false)}
                            onDropdownWillHide={() => setShowmodal(true)}
                            showsVerticalScrollIndicator={false}
                            dropdownStyle={[styles.drop, { height: SmartScreenBase.smBaseHeight * 60 * listCurriculum.length }]}
                        >
                            {showmodal ? <View style={styles.viewDrop}>
                                <TextBox style={styles.txtbox}>{defaultValue}</TextBox>
                                <View style={styles.viewBorder} />
                                <Image source={{ uri: "icondrop" }} style={styles.iconDrop} />
                            </View>
                                : <View style={[styles.viewDrop, styles.paddingVertical0]}></View>}
                        </ModalDropdown>
                        <View style={styles.rightHeader}>
                            <TouchableOpacity
                                style={styles.btnmap}
                                onPress={() => {
                                    setMapList(!maplist);
                                }}>
                                <Image source={{ uri: !maplist ? 'Giaotrinhgiaovien2' : 'Giaotrinhgiaovien1' }}
                                    style={styles.icmap} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.flex}>
                        {
                            maplist ?
                                <MapList
                                    data={dataMapList}
                                    navigation={props.navigation}
                                    curriculumName={curriculumName}
                                />
                                :
                                <FlatList
                                    ref={mapRef}
                                    showsVerticalScrollIndicator={false}
                                    showsHorizontalScrollIndicator={false}
                                    data={dataLesson}
                                    renderItem={_renderItem}
                                    horizontal={true}
                                    keyExtractor={(item, index) => index.toString()}
                                    style={{ zIndex: 0, marginLeft: -5*SmartScreenBase.smPercenHeight }}
                                />
                        }
                    </View>
                </ImageBackground>
            }
        </View>
    )
}