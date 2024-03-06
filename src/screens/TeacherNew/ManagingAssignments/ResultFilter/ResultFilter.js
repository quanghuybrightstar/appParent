import React from 'react';
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import { AppHeader } from '../../../../componentBase/AppHeader';
import { ImageLesson } from '../../../../componentBase/ImageLesson';
import { FullScreenLoadingIndicator } from '../../../../componentBase/indicator/FullScreenLoadingIndicator';
import { ModalFilterCommon } from '../../../../componentBase/ModalFilter';
import { ShortMainButton } from '../../../../componentBase/ShortMainButton';
import { SmallCheckBox } from '../../../../componentBase/SmallCheckBox';
import { TextBox } from '../../../../componentBase/TextBox';
import { DetailSkillJson, ResultFilterJson } from '../../../../stringJSON';
import { Colors } from '../../../../styleApp/color';
import { FontSize } from '../../../../styleApp/font';
import { ResultFilterMethod } from './ResultFilter.logic';
import { styles } from './ResultFilter.style';
import LessonBase from '../../../../base/LessonBase';

/**
 * Result Filter screen
 * @param {object} props props from redux and navigation
 * @returns {Component}
 */
export const ResultFilter = (props) => {
    let { Favorite, AssignCurriculum, isLoading, loading, dataFilter, onAssign, routerGradle, onLoad, listAssign, onFilter } = ResultFilterMethod(props);
    /**
   * Function that return color depends on level
   */
    const CheckLevel = (value) => {
        if (value === 'easy') {
            return Colors._6EBF49;
        } else if (value === 'normal') {
            return Colors.Orange;
        } else if (value === 'hard') {
            return Colors._BE1E2D;
        }
    };
    const [visible, setVisible] = React.useState(false);

    /**
   * lesion on click method
   * @param {Object} item lession
   */
    const clickLesson = (item) => {
        var dataR = item
        dataR.unit_id = 184
        LessonBase._moveLessonHS(dataR, props.navigation, true)
    };

    /**
   * Render lession
   * @param {object} param0 lession
   * @returns {component}
   */
    const renderItem = ({ item, index }) => {
        return (
            <View style={{ marginTop: 10 }} >
                <TextBox numberOfLines={null} style={styles.txtCurriculum}>{item.curriculum_name}</TextBox>
                <FlatList

                    bounces={false}
                    indicatorStyle={'black'}
                    data={item.list_lesson}
                    renderItem={(data) => {
                        return (
                            <TouchableOpacity onPress={() => clickLesson(data.item)} style={[styles.viewItem, { borderBottomWidth: index + 1 === dataFilter.length && data.index + 1 === item.list_lesson.length ? 0 : 1 }]}>
                                <View style={styles.contentItem}>
                                    <Image source={{ uri: ImageLesson(data.item.lesson_type, data.item.sub_lesson_type) }} style={styles.itemImg} />
                                    <View >
                                        <TextBox numberOfLines={null} style={styles.txtTopic}>
                                            {`${data.item.level === 'normal' ? 'medium' : (data.item.level || '')}` + `${data.item.level ? '    ' : ''}` + `${data.item.topic}`}
                                        </TextBox>
                                        <View
                                            style={[styles.viewLevel, { backgroundColor: CheckLevel(data.item.level) }]}>
                                            <TextBox style={styles.txtLevel}>{data.item.level === 'normal' ? 'medium' : data.item.level}</TextBox>
                                        </View>
                                        <TextBox style={styles.ls_name} numberOfLines={null}>
                                            {data.item.lesson_name}
                                        </TextBox>
                                        <TextBox numberOfLines={null} style={styles.ttx_unit_name}>{data.item.unit_name}</TextBox>
                                    </View>
                                </View>
                                <View style={styles.footerItem}>
                                    <TouchableOpacity onPress={() => Favorite(data.item)} style={styles.favTouch}>
                                        <Image source={{ uri: data.item.is_in_wishlist ? 'favorite' : 'unfavorite' }} resizeMode={'contain'} style={styles.iconFavoite} />
                                    </TouchableOpacity>
                                    <SmallCheckBox
                                        onPress={() => AssignCurriculum(data.item)}
                                        isNotify={!!props.listAssignManagent && props.listAssignManagent.findIndex(i => i.lesson_id === data.item.lesson_id) !== -1}
                                        size={SmartScreenBase.smBaseWidth * 57}
                                    />
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                    keyExtractor={(item, index) => item.lesson_id + '-lesson' + index.toString()}
                />
            </View>
        );
    };

    return (
        <>
            <AppHeader
                navigation={props.navigation}
                title={ResultFilterJson.sundayEnglish}
                leftIconOnPress={() => {
                    props.navigation.pop();
                }}
                styleTitle={styles.txtHeader}
                rightIcon={'filter1'}
                styleHeaderRight={styles.txtRightHeader}
                rightIconOnPress={() => setVisible(true)}

            />

            <LinearGradient
                style={styles.flex1}
                colors={[Colors._E1FEF0, Colors._E1FEF0, Colors.White]}
                start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }}>
                {
                    loading ?
                        <View style={styles.viewLoading}>
                            <View style={styles.box}>
                                <ActivityIndicator color={'white'} size="large" />
                            </View>
                        </View>
                        :
                        <>
                            <FlatList
                                bounces={false}
                                contentContainerStyle={styles.flatlist}
                                data={dataFilter}
                                renderItem={renderItem}
                                keyExtractor={item => item.curriculum_id + '-curriculum'}
                                ListEmptyComponent={() =>
                                    <>
                                        {!loading && < View style={styles.viewEmpty}>
                                            <TextBox>{DetailSkillJson.Nodata}</TextBox>
                                        </View>}
                                    </>
                                }
                            />
                            {dataFilter.length > 0 &&

                <ShortMainButton
                    type={1}
                    onPress={onAssign}
                    text={DetailSkillJson.assign}
                    style={styles.btnAssign}
                    textStyles={styles.txtAssign}
                    isDisabled={listAssign.length > 0 ? false : true}
                    widthType={'full'}
                />
                            }
                        </>
                }
            </LinearGradient>
            <ModalFilterCommon
                visible={visible}
                hideModal={() => setVisible(false)}
                dataGrade={routerGradle}
                showKeyword={true}
                showLevel={true}
                showGrade={true}
                onFilter={(param) => onFilter(param)}
                params={props.navigation.getParam('param')}
                cancel={true}
            />
            <FullScreenLoadingIndicator
                visible={isLoading}
            />
        </>
    );
};
