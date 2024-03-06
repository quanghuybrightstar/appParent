import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Image,
    FlatList,
    Platform
} from 'react-native';
import { styles, width, height } from './DetailUnit.style';
import { detailUnitMethod } from './DetailUnit.logic';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import Loading from '../../../../component/LoadingScreen';
import { stylesHistory } from '../../../Student/StudyForTest/styles';
import stylesApp from '../../../../styleApp/stylesApp';
import { Colors } from '../../../../styleApp/color';
import { AppHeader } from '../../../../componentBase/AppHeader';
import lessonMath from '../../../../utils/lessonMath';

/**
 * DetailUnit Screen - Chi tiết Unit
 * @param {object} props props from redux and navigation
 * @returns {Component}
 */
const DetailUnit = (props) => {

    let {
        dataListSkill,
        isLoading,
        _checkImageStatus,
        _checkImage,
        _moveScreen
    } = detailUnitMethod(props)

    /**
     * Function render item of skill list
     */
    const _renderItem = ({ item, index }) => {
        return (
            index === 0 ?
                <TouchableOpacity style={styles.item0} onPress={() => _moveScreen(item)}>
                    <View style={styles.iconSkill}>
                        <Image source={{ uri: _checkImage(item.skill) }}
                            style={styles.iconCheckSkill} />
                    </View>
                    <View style={styles.viewOption}>
                        <Text style={{ ...styles.title0, ...styles.txtSkill1 }}>{lessonMath.convertSkill(item.skill)}</Text>
                    </View>
                </TouchableOpacity>
                :
                < TouchableOpacity style={styles.item} onPress={() => _moveScreen(item)}>
                    <View style={styles.viewIconItem}>
                        <Image source={{ uri: _checkImage(item.skill) }} style={styles.iconCheckSkill} />
                    </View>
                    <View style={styles.viewSkill}>
                        <Text style={{ ...styles.titleItem, ...styles.txtSkill2 }}>{lessonMath.convertSkill(item.skill)}</Text>
                    </View>
                </TouchableOpacity>
        );
    };
    return (
        <View style={styles.container}>
            {
                isLoading ?
                    <ImageBackground
                        source={{ uri: 'imagebackground' }}
                        imageStyle={stylesApp.ImageBackGround}
                        style={stylesHistory.loading}>
                        <Loading />
                    </ImageBackground>
                    :
                    null
            }
            <ImageBackground style={styles.container} source={{ uri: 'bgmap' }}>
                {/* <View style={styles.headerContainer}>
                    <TouchableOpacity style={styles.buttonBack} onPress={() => props.navigation.goBack()}>
                        <Image source={{ uri: 'imageback' }} style={styles.iconBack} />
                    </TouchableOpacity>
                    <Text numberOfLines={1} style={[styles.txtHeader, styles.titleHeader]}>{dataListSkill.unit_name}</Text>
                </View> */}
                <AppHeader title={dataListSkill.unit_name} leftIconOnPress={() => props.navigation.goBack()} />
                <View style={styles.viewFlatlist}>
                    <FlatList
                        indicatorStyle={'black'}
                        data={dataListSkill.list_skill}
                        renderItem={_renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        style={styles.flatlist}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </ImageBackground>
        </View>
    );

};
export default DetailUnit;
