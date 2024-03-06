// xóa file này
import * as React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Image, Text, ImageBackground } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import SunDay from '../../../component/ChooseCourseTeacher/Sunday';
// import Curriculum from '../../../component/ChooseCourseTeacher/Curriculum';
import SchoolBook from '../../../component/ChooseCourseTeacher/SchoolBook';
import Styles from '../workDeliveredTeacherScreen/workDeliveredTeacherScreenStyles';
import SmartScreenBase from '../../../base/SmartScreenBase';

const initialLayout = { width: Dimensions.get('window').width };

export default function TabViewExample({ navigation }) {
    console.log('navigation', navigation);
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'first', title: 'Sunday' },
        { key: 'second', title: 'Sách Giáo Khoa' },
        { key: 'third', title: 'Giáo Trình Riêng' },
    ]);
    const _onGo = (id) => {
    };

    const renderScene = ({ route }) => {
        switch (route.key) {
            case 'first':
                return <SunDay _onGo={(id) => _onGo(id)}/>;
            case 'second':
                return <SchoolBook _onGo={(id) => _onGo(id)} />;
            // case 'third':
            //     return <Curriculum _onClickCurriculum={(id) => _onGo(id)} />;
            default:
                return null;
        }
    };
    const renderTabBar = props => (
        <TabBar
            {...props}
            style={{
                borderBottomWidth: 1, borderBottomColor: '#fff', backgroundColor: 'transparent',
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 0,
                },
                shadowOpacity: 0,
                shadowRadius: 0,
                elevation: 0
            }}
        />
    );

    return (
        <ImageBackground source={{ uri: 'imagebackground' }} style={Styles.container}>
            <View style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                flex: 1,
                backgroundColor: 'rgba(0,0,0,0.3)',
                flexDirection: 'row',
            }}>
                <View style={{
                    marginLeft: SmartScreenBase.smPercenWidth * 2,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <TouchableOpacity
                        style={{
                            width: SmartScreenBase.smPercenWidth * 5,
                            height: SmartScreenBase.smPercenWidth * 5,
                        }}
                        onPress={() => {
                            navigation.goBack();
                        }}
                    >
                        <Image style={{
                            width: SmartScreenBase.smPercenWidth * 5,
                            height: SmartScreenBase.smPercenWidth * 5,
                        }}
                            resizeMode={'contain'}
                            source={{ uri: 'imageback' }} />
                    </TouchableOpacity>

                    <Text style={{
                        color: 'white',
                        marginLeft: SmartScreenBase.smPercenWidth * 5,
                    }}>Chọn giáo trình</Text>
                </View>
            </View>
            <View style={{ flex: 10, paddingHorizontal: SmartScreenBase.smPercenWidth * 2 }}>
                <TabView
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={initialLayout}
                    renderTabBar={renderTabBar}
                />
            </View>
            <View style={{
                flex: 2,
                alignItems: 'center',
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: SmartScreenBase.smPercenWidth * 3,
            }}>
                <TouchableOpacity style={{
                    width: '48%',
                    height: 50,
                    backgroundColor: '#00283A',
                    borderRadius: 25,
                    paddingHorizontal: SmartScreenBase.smPercenWidth * 3,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                    onPress={() => {
                        navigation.navigate('ChooseFromSaveScreen');
                    }}
                >
                    <Text style={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: SmartScreenBase.smPercenWidth * 4,
                    }}>Chọn từ</Text>
                    <Text style={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: SmartScreenBase.smPercenWidth * 4,
                    }}>danh sách yêu thích</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{
                    width: '48%',
                    height: 50,
                    backgroundColor: '#00283A',
                    borderRadius: 25,
                    paddingHorizontal: SmartScreenBase.smPercenWidth * 3,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                >
                    <Text style={{
                        color: 'white',
                        fontWeight: 'bold',
                        fontSize: SmartScreenBase.smPercenWidth * 5,
                    }}>Tiếp Tục</Text>

                </TouchableOpacity>
            </View>
        </ImageBackground>

    );
}

