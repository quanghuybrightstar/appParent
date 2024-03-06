
import * as React from 'react';
import { useCallback } from 'react';
import { ActivityIndicator, Alert, FlatList, Image, ImageBackground, Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import { AppHeader } from '../../../../componentBase/AppHeader';
import { TextBox } from '../../../../componentBase/TextBox';
import { FontSize, FontWeight } from '../../../../styleApp/font';
import stylesApp from '../../../../styleApp/stylesApp';
import { styles } from './ClassDetailTeacherScreen.styles';
import { FunctionBtn } from './FunctionBtn';
import moment from 'moment';
import { SmPopup } from '../../../../componentBase/SmPopup';
import APIBase from '../../../../base/APIBase';
import API from '../../../../API/APIConstant';

/**
 * Function return format date as string
*/
const handleTime = (start, end) => {
    if (!!start && !!end) {
        return moment(start).format('DD/MM/YYYY') + ' - ' + moment(end).format('DD/MM/YYYY');
    } else if (start) {
        return moment(start).format('DD/MM/YYYY');
    } else if (end) {
        return moment(end).format('DD/MM/YYYY');
    } else {
        return '';
    }

};

/**
 * ClassDetailTeacherScreen Screen - Quản lý lớp
 * @param {object} props props from redux and navigation
 * @returns {Component}
 */
export const ClassDetailTeacherScreen = (props) => {
    const language = useSelector(state => state.LanguageStackReducer.language);
    var changeData = props.navigation.getParam('changeData')
    let reload = props.navigation.getParam('reload');
    let paramItem = props.navigation.getParam('item');
    let [item, setItem] = React.useState(paramItem);
    let baseUrl = props.navigation.getParam('baseUrl');
    let [modalVisible, setVisible] = React.useState(false);
    let [numOfStu, setStudent] = React.useState(item?.count_student || 0);
    const [loadingStu, setLoadingStu] = React.useState(false);
    
    React.useEffect(() => {
        const listener = props.navigation.addListener('didFocus', async () => {
            const url = item.type === 'online' ? API.baseurl + API.GetClassMember + `?class_id=${item.id}` : API.baseurl + API.listStudentByClassId + `${item.id}`;
            try {
                setLoadingStu(true);
                const res = await APIBase.postDataJson('get', url);
                if (item.type === 'online') {
                    setStudent(res?.data?.data?.length || 0);
                } else {
                    setStudent(res?.data?.class_info?.list_student?.length || 0);
                }

            } catch (error) {
                setStudent(0);
                console.log('setStudent----error', error);
                setTimeout(() => {
                    Alert.alert('', error);
                }, 500);
            } finally {
                setLoadingStu(false);
            }
        });
        return () => {
            listener.remove();
        };
    }, []);

    React.useEffect(() => {
        if(changeData){
            setItem(changeData)
        }
    }, [props.navigation.getParam('changeData')]);

    const OnlineFunction = [
        {
            title: language.ClassDetailTeacherScreen.MarkingBt, image: 'caculate_point_icon', onPress: () => {
                if (Number(numOfStu || 0) > 0) {
                    props.navigation.navigate('MarkScreen', {
                        item: item,
                        title: language.ClassDetailTeacherScreen.MarkingBt,
                    });
                    return;
                }
                setVisible(true);
            }, screen: '',
        },
        {
            title: language.ClassDetailTeacherScreen.GiveHomeworkBt, image: 'give_book_icon', onPress: () => {
                if (Number(numOfStu || 0) > 0) {
                    props.navigation.navigate('ManagingAssignmentsParentScreen', {
                        dataClass: item,
                    });
                    return;
                }
                setVisible(true);
            }, screen: 'ManagingAssignmentsParentScreen', params: { dataClass: item },
        },
        {
            title: language.ClassDetailTeacherScreen.StudyReportBt, image: 'analyze_study_icon', onPress: () => {
                if (Number(numOfStu || 0) > 0) {
                    props.navigation.navigate('StudyReportTeacherScreen', {
                        id: item.id,
                        item: item,
                    });
                    return;
                }
                setVisible(true);
            }, screen: 'StudyReportTeacherScreen', params: { id: item.id },
        },
        {
            title: language.ClassDetailTeacherScreen.AchievementsBt, image: 'class_point_icon', onPress: () => {
                if (Number(numOfStu || 0) > 0) {
                    props.navigation.navigate('GoldBoard', { id: item.id });
                    return;
                }
                setVisible(true);
                console.log('=====GoldBoard');

            }, screen: 'GoldBoard', params: { id: item.id },
        },
    ];
    const OfflineFunction = [
        {
            title: language.ClassDetailTeacherScreen.Attendance, image: 'attendance_icon', onPress: () => {
                if (Number(numOfStu || 0) > 0) {
                    props.navigation.navigate('AttendanceManagementTeacherScreen', {
                        id: item.id,
                        item: item,
                    });
                    return;
                }
                setVisible(true);
            }, screen: 'AttendanceManagementTeacherScreen',
        },
        {
            title: language.ClassDetailTeacherScreen.ScoreBoard, image: 'point_list', onPress: () => {
                if (Number(numOfStu || 0) > 0) {
                    props.navigation.navigate('ScoreManagementScreen', {
                        id: item.id,
                        item: item,
                    });
                    return;
                }
                setVisible(true);
            }, screen: 'ScoreManagementScreen',
        },
    ];

    /**
     * Function Render function button depends on type of class
    */
    const renderFunction = () => {
        let Arr = item.type === 'online' ? OnlineFunction : OfflineFunction;
        return (
            <View style={styles.function}>
                {Arr.map((a) => <FunctionBtn
                    title={a.title}
                    image={a.image}
                    onPress={() => {
                        if (a.onPress) {
                            a.onPress();
                            return;
                        }
                        !!a.screen && props.navigation.navigate(a.screen, {
                            item: item,
                            ...a.params,
                            dataClass: props.navigation.getParam('item'),
                        });
                    }}
                />)}
            </View>
        );
    };

    const navigateToCuriculum = useCallback(() => {
        props.navigation.navigate('CurriculumClassTeacherScreen', {
            classInfo: item,
            reload: (data) => {
                setItem({
                    ...item,
                    ...data,
                });
            },
            delReload: reload
        });

    }, [item, props.navigation]);

    /**
     * Function Render course button
    */
    const renderCourse = () => {
        return (
            <View style={styles.itemOuter}>
                <TouchableOpacity style={styles.sectionContainer} onPress={navigateToCuriculum}>
                    <TextBox style={styles.title}>{language.ClassDetailTeacherScreen.ClassCourse}</TextBox>
                    <View style={styles.row}>
                        <Image source={{ uri: 'book_icon' }}
                            resizeMode="contain"
                            style={styles.sectionItem} />
                        <TextBox style={styles.sectionText}>{item.curriculum_name}</TextBox>
                        <Image source={{ uri: 'icon_back' }}
                            resizeMode="contain"
                            style={styles.iconNext} />
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    /**
     * Function Render Class list button
    */
    const renderClass = () => {
        return (
            <View style={[styles.itemOuter, styles.classOuter]}>
                <TouchableOpacity style={styles.sectionContainer} onPress={() => props.navigation.navigate('StudentListTeacherScreen', {
                    item: item,
                    reload: () => { },
                })}>
                    <TextBox style={styles.title}>{language.ClassDetailTeacherScreen.Student}</TextBox>
                    <View style={styles.row}>
                        <Image source={{ uri: 'people_icon' }}
                            resizeMode="contain"
                            style={styles.sectionItem} />
                        <TextBox style={styles.sectionText}>{numOfStu > 0 ? (numOfStu + '') : '0'}</TextBox>
                        <Image source={{ uri: 'icon_back' }}
                            resizeMode="contain"
                            style={styles.iconNext} />
                    </View>
                </TouchableOpacity>
            </View>
        );
    };
    const stylesText = !!item.type && item.type === 'offline' ? styles.offline : styles.online;
    return (
        <View style={styles.container}>
            <AppHeader
                title={item.class_name}
                leftIconOnPress={() => {
                    props.navigation.pop();
                    !!reload && reload();
                }}
                rightComponent={() => (
                    <TouchableOpacity onPress={() => props.navigation.navigate('EditClassTeacherScreen', {
                        reload: (data) => {
                            setItem({
                                ...item,
                                ...data,
                            });
                        },
                        data: item,
                        delReload: reload,
                    })}>
                        <Image
                            source={{ uri: 'hv_edit_profile' }}
                            style={styles.rightHeader}
                            resizeMode="contain"
                        />
                    </TouchableOpacity>
                )}
                styleHeaderRight={styles.rightHeader}
            />
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.itemOuter}>
                    <View style={styles.itemContainer}>
                        <Image source={item?.localImg ? item.localImg : {
                            uri: item.class_avatar ?
                                (baseUrl + item.class_avatar) :
                                (item.avatar ? (baseUrl + item.avatar) : 'img_defaul_class'),
                        }} style={styles.imgClass} />
                        <View style={styles.itemInfo}>
                            <TextBox style={[styles.classFullName, stylesText]}>{item.type ? item.type.toUpperCase() : ''}</TextBox>
                            {!!item.organization_name && <View style={[styles.infoContainer, { alignItems: 'flex-start' }]}>
                                <Image source={{ uri: 'school_icon' }}
                                    resizeMode="contain"
                                    style={styles.infoImg} />
                                <TextBox numberOfLines={null} style={[styles.infoText, { marginTop: SmartScreenBase.smBaseHeight * 15 }]}>{item.organization_name}</TextBox>
                            </View>}

                            {/* <View style={styles.infoContainer}>
                                <Image source={{ uri: 'time_icon' }}
                                    resizeMode="contain"
                                    style={styles.infoImg} />
                                <TextBox numberOfLines={null} style={styles.infoText}>{handleTime(item.start_time, item.end_time)}</TextBox>
                            </View> */}

                            <View style={styles.infoContainer}>
                                <Image source={{ uri: 'code_icon' }}
                                    resizeMode="contain"
                                    style={styles.infoImg} />
                                <TextBox style={styles.codeText}>{item.class_code}</TextBox>
                            </View>
                        </View>
                    </View>
                </View>
                {item.type === 'online' && renderCourse()}
                {renderClass()}
            </ScrollView>
            {renderFunction()}
            <SmPopup
                confirmOnpress={() => {
                    setVisible(false);
                    props.navigation.navigate('AddStudentOnlineScreen', { item: item });
                }}
                visible={modalVisible}
                onClose={() => setVisible(false)}
                cancelText={language.ClassDetailTeacherScreen.RejectBt}
                confirmText={language.ClassDetailTeacherScreen.AddBt}
                message={'Bạn chưa có học sinh nào. Hãy thêm học sinh để thực hiện chức năng này!'}
            />
        </View>
    );
};
