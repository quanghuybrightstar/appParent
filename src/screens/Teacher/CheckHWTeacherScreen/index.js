import React, {Component} from 'react';
import {Text, View, TouchableOpacity, FlatList, ImageBackground, Image, Modal, Dimensions} from 'react-native';
import SmartScreenBase from '../../../base/SmartScreenBase';

SmartScreenBase.baseSetup();
import Checked from '../../../component/CheckHWTeacher/Checked';
import Check from '../../../component/CheckHWTeacher/Check';
import Pending from '../../../component/CheckHWTeacher/Pending';
import {SceneMap, TabView, TabBar} from 'react-native-tab-view';
import Header from '../../../component/Header/Header';


const initialLayout = {width: Dimensions.get('window').width};

export default function TabViewExample({navigation}) {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        {key: 'first', title: 'ĐÃ CHẤM'},
        {key: 'second', title: 'CHƯA CHẤM'},
        {key: 'third', title: 'CHỜ DUYỆT'},
    ]);

    const renderTabBar = props => (
        <TabBar
            {...props}
            style={{
                borderBottomWidth: 1, borderBottomColor: '#fff',
                backgroundColor: 'transparent',
                shadowColor: '#000',
                shadowOffset: {
                    width: 0,
                    height: 0,
                },
                shadowOpacity: 0,
                shadowRadius: 0,
                elevation: 0,
            }}
        />
    );
    const _onChecked = (item) => {
        navigation.navigate('Checked', {item: item});
    };
    const _onCheck = (item) => {
        navigation.navigate('Check', {item: item});
    };
    const _onPending = (item) => {
        navigation.navigate('Waiting', {item: item});
    };
    const renderScene = ({route}) => {
        switch (route.key) {
            case 'first':
                return <Checked _onChecked={(item) => _onChecked(item)}/>;
            case 'second':
                return <Check _onCheck={(item) => _onCheck(item)}/>;
            case 'third':
                return <Pending _onPending={(item) => _onPending(item)}/>;
            default:
                return null;
        }
    };

    return (
        <ImageBackground source={{uri: 'imagebackground'}} style={{
            flex: 1,
            paddingBottom: 50,
        }}>
            <Header navigation={navigation} title={'Chấm bài'}/>
            <View style={{flex: 12}}>
                <TabView
                    renderTabBar={renderTabBar}
                    navigationState={{index, routes}}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    initialLayout={initialLayout}
                />
            </View>
        </ImageBackground>

    );
}

