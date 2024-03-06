import * as React from 'react'
import { FlatList, Image, ImageBackground, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import stylesApp from '../../../../styleApp/stylesApp'
import { TextBox } from '../../../../componentBase/TextBox';
import { CurriculumTeacherJson } from '../../../../stringJSON';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import { TabView, SceneMap } from 'react-native-tab-view'
import LinearGradient from 'react-native-linear-gradient';
import { ModalAddCurriculum } from './ModalAddCurriculum';
import { FullScreenLoadingIndicator } from '../../../../componentBase/indicator/FullScreenLoadingIndicator';
import { useSelector } from 'react-redux';
import { CourseListTCScreenMethod } from './CourseListTCScreen.logic';
import { styles } from './CourseListTCScreen.style'
import { FontSize } from '../../../../styleApp/font';
import { Colors } from '../../../../styleApp/color';
import { ModalFilterCommon } from '../../../../componentBase/ModalFilter'
import { AppHeader } from '../../../../componentBase/AppHeader';

/**
 * CourseListTCScreen Screen
 * @param {object} props props from redux and navigation - footer Giáo trình
 * @returns {Component}
 */
export const CourseListTCScreen = (props) => {

    let { routerGradle, curriculumSunday, loading, myCurriculum, tabview, setTabview, onFilter, visible, setVisible } = CourseListTCScreenMethod(props)
    const language = useSelector(state => state.LanguageStackReducer.language)
    const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);
    //Route for tabbar
    const [routesMyCurriculum] = React.useState([
        { key: 0, title: language.CourseListTCScreen.Course, count: 0 },
        { key: 1, title: language.CourseListTCScreen.Favorite, count: 0 },
    ]);
    //Number index of sunday english
    const [indexSunday, setIndex] = React.useState(0);
    //Number index of normal curriculum
    const [indexMyCurriculum, setIndexMyCurriculum] = React.useState(0);
    //Show modal add curriculum
    const [modalAddCurriculum, setModalAddCurriculum] = React.useState(false)

    /**
     * Function render Scene for Sunday English Curriculum
     */
    const _renderScene = () => {
        return (
            <View style={styles.scene}>
                <FlatList
                    indicatorStyle={'black'}
                    horizontal
                    data={curriculumSunday.filter(item => item.grade_id === tabview)}
                    renderItem={({ item }) => _renderItem(item, curriculumSunday)}
                    keyExtractor={(item, index) => item.id + index.toString()}
                    contentContainerStyle={styles.flatlist}
                />
            </View>
        );
    };

    /**
     * Function render Scene for My Curriculum
     */
    const _renderScene2 = () => {
        if (indexMyCurriculum === 1) {
            return (
                <View style={[styles.scene, styles.viewFav]}>
                    <TouchableOpacity onPress={() => props.navigation.navigate('FavouriteLesson')} style={styles.renderItem}>
                        <Image source={{ uri: 'img_curriculum' }} style={styles.imgItem} />
                        <TextBox numberOfLines={2} style={styles.txtNameItem}>{CurriculumTeacherJson.FavLessonTitle}</TextBox>
                    </TouchableOpacity>
                </View>
            )
        }
        return (
            <View style={styles.scene}>
                <FlatList
                    horizontal
                    indicatorStyle={'black'}
                    data={myCurriculum}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => _renderItem(item, myCurriculum)}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.flatlist}
                    ListEmptyComponent={<TextBox style={styles.txtEmpty} numberOfLines={null}>Bạn chưa có giáo trình nào. Hãy tạo giáo trình của mình!</TextBox>}
                />
            </View>
        );
    };

    /**
     * Function render curriculum item in Flat List
    */
    const _renderItem = (item, data) => {
        return (
            <TouchableOpacity onPress={() => props.navigation.navigate('DetailCurriculumTeacher', { id: item.id, dataCurriculum: data })} style={styles.renderItem}>
                <Image source={{ uri: 'img_curriculum' }} style={styles.imgItem} />
                <TextBox style={styles.txtNameItem} numberOfLines={2}>{item.name}</TextBox>
                <TextBox style={styles.txtNumberCount}>{item.num_unit} {language.CourseListTCScreen.Unit}</TextBox>
            </TouchableOpacity>
        )
    }

    /**
    * Function render Tab bar for Sunday English Curriculum
    */
    const _renderItemTabbar = ({ item }) => {
        return (
            <View style={[styles.renderItemTabbar, { borderBottomWidth: indexSunday === item.key ? 3 : 0, ...styles.width4 }]}>
                <TouchableOpacity
                    style={styles.btnTab}
                    onPress={() => {
                        setIndex(item.key)
                        setTabview(item.count)
                    }}
                >
                    <TextBox style={{ color: Colors.Black }}>{`${item.title}`}</TextBox >
                </TouchableOpacity>
            </View>
        )
    }

    /**
    * Function render Tab bar for My Curriculum
    */
    const _renderItemTabbarMyCurriculum = ({ item }) => {
        return (
            <View style={[styles.renderItemTabbar, { borderBottomWidth: indexMyCurriculum === item.key ? 3 : 0, ...styles.width2 }]}>
                <TouchableOpacity
                    style={styles.btnTab}
                    onPress={() => setIndexMyCurriculum(item.key)}
                >
                    <TextBox style={{ color: '#000' }}>{`${item.title}`}</TextBox >
                </TouchableOpacity>
            </View >
        )
    }

    /**
    * Function render Tab bar
    */
    const renderTabbar = (value) => {
        return (
            <View style={styles.renderTabbar} >
                <FlatList
                    indicatorStyle={'black'}
                    data={value == 'SundayEnglish' ? routerGradle : routesMyCurriculum}
                    renderItem={value == 'SundayEnglish' ? _renderItemTabbar : _renderItemTabbarMyCurriculum}
                    keyExtractor={(index) => index.toString()}
                    scrollEnabled={false}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        )

    }
    return (
        <View style={styles.container}>
            <ImageBackground source={{ uri: dataLogin.role != 'parent' ? "banner_curriculum" : 'bgtuvung' }} style={[stylesApp.ImageBackGround, styles.flex1]}>
                {dataLogin.role != 'parent' ? 
                <Image source={{ uri: "logo_gv" }} style={styles.imgLogo} />
                : 
                <AppHeader
                    title={'Giáo trình'}
                    leftIconOnPress={() => {
                            props.navigation.pop()
                    }}
                />
                }
                <View style={styles.scrollview}>
                <ScrollView>
                    <View style={styles.content}>
                    <View style={styles.body}>
                        <View style={styles.horizontal}>
                            <TextBox style={styles.txtCurriSundayEnglish}>{language.CourseListTCScreen.TittleTopList}</TextBox>
                            <TouchableOpacity onPress={() => setVisible(true)} style={styles.viewFilter}>
                                <Image source={{ uri: "filter" }} style={styles.iconFilter} resizeMode={'contain'} />
                                <View style={styles.border} />
                                <TextBox style={styles.txtFilter}>{language.CourseListTCScreen.FilterBt}</TextBox>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.tabview1}>
                        <TabView
                            navigationState={{ index: indexSunday, routes: routerGradle }}
                            renderScene={_renderScene}
                            onIndexChange={setIndex}
                            renderTabBar={() => renderTabbar('SundayEnglish')}
                            swipeEnabled={false}
                        />
                    </View>
                    {dataLogin.role != 'parent' &&
                    <View style={styles.body}>
                        <View style={styles.horizontal}>
                            <TextBox style={styles.txtCurriSundayEnglish}>{CurriculumTeacherJson.MyCurriculum}</TextBox>
                            <TouchableOpacity onPress={() => setModalAddCurriculum(true)}>
                                <LinearGradient
                                    style={styles.viewAdd}
                                    colors={[Colors.LightGreen, Colors.BaseGreen,]}
                                    start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0 }}>

                                    <Image source={{ uri: "add" }} style={styles.iconadd} resizeMode={'contain'} />
                                    <TextBox style={styles.txtAdd}>{language.CourseListTCScreen.CreateBt}</TextBox>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>

                    </View>
                    }
                    
                    {dataLogin.role != 'parent' &&
                    <View style={styles.tabview2}>
                        <TabView
                            navigationState={{ index: indexMyCurriculum, routes: routesMyCurriculum }}
                            renderScene={_renderScene2}
                            onIndexChange={setIndexMyCurriculum}
                            renderTabBar={() => renderTabbar('MyCurriculum')}
                            swipeEnabled={false}
                        />
                    </View>
                    }
                    </View>
                </ScrollView>
                </View>
            </ImageBackground>
            <ModalFilterCommon
                visible={visible}
                hideModal={() => setVisible(false)}
                dataGrade={routerGradle}
                showKeyword={true}
                showLevel={true}
                showGrade={true}
                onFilter={(param) => onFilter(param)}
                clearData={true}
                cancel={true}
            />
            <ModalAddCurriculum
                visible={modalAddCurriculum}
                hideModal={() => setModalAddCurriculum(false)}
            />
            <FullScreenLoadingIndicator
                visible={loading}
            />
        </View >
    )
}
