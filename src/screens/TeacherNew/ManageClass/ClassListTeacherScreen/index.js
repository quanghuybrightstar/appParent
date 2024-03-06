
import * as React from 'react';
import { useCallback } from 'react';
import { FlatList, Image, ImageBackground, RefreshControl, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import API from '../../../../API/APIConstant';
import APIBase from '../../../../base/APIBase';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import { ShortMainButton } from '../../../../componentBase/ShortMainButton';
import { TextBox } from '../../../../componentBase/TextBox';
import { FontSize, FontWeight } from '../../../../styleApp/font';
import stylesApp from '../../../../styleApp/stylesApp';
import { styles } from './ClassListTeacherScreen.styles';
import Loading from '../../../../component/LoadingScreen';
import { Colors } from '../../../../styleApp/color';
import MyData from '../../../../component/MyData';
import { FullScreenLoadingIndicator } from '../../../../componentBase/indicator/FullScreenLoadingIndicator'

/**
 * ClassListTeacherScreen Screen - Danh sách lớp (Giáo viên)
 * @param {object} props props from redux and navigation
 * @returns {Component}
 */
export const ClassListTeacherScreen = (props) => {
    const language = useSelector(state => state.LanguageStackReducer.language);
    const [list, setList] = useState([]);
    const [baseUrl, setBaseUrl] = useState('');
    const [loading, setLoading] = useState(false);
    let [firstLoading, setFirstLoad] = useState(true);
    const listener = React.useRef();

    useEffect(() => {
        const init = async () => {
            await getData();
            setFirstLoad(false);
        };
        init();
        if (!listener.current) {
            listener.current = props.navigation.addListener('didFocus', getData);
        }
        return () => {
            listener.current.remove();
        };
    }, []);

    /**
     * Function get data list of class including online and offline
    */
    const getData = async () => {
        console.log('------getData');
        setLoading(true);
        let offlineURL = API.baseurl + API.listClassOffline;
        let onlineURL = API.baseurl + API.my_classes;
        try {
            let offline = await APIBase.postDataJson('get', offlineURL);
            let online = await APIBase.postDataJson('get', onlineURL);
            setBaseUrl(offline.data.base_url);
            let concatList = online.data.data.map((item) => ({
                ...item,
                key: 'online-' + item.id,
            })).concat(offline.data.data.map((item) => ({
                ...item,
                key: 'offline-' + item.id,
            })));
            console.log('=====concatList', concatList);
            setList(concatList);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    /**
     * Function Render Empty component
    */
    const renderEmpty = () => {
        return (
            <View style={styles.emptyContainer}>
                <Image source={{ uri: 'class_empty' }}
                    style={styles.emptyImage}
                    resizeMode="cover"
                />
                <TextBox
                    numberOfLines={2}
                    style={styles.emptyText}
                >{language.ClassListTeacherScreen.EmptyClassList}</TextBox>
            </View>
        );
    };

    /**
     * Function Render Class Item component in Flatlist
    */
    const renderItem = ({ item, index }) => {
        const stylesText = !!item.type && item.type === 'offline' ? styles.offline : styles.online;
        return (
            <View style={styles.itemOuter}>
                <TouchableOpacity style={styles.itemContainer} onPress={() => {
                    MyData.classID = item.id;
                    props.navigation.navigate('ClassDetailTeacherScreen', {
                        item: item,
                        baseUrl: baseUrl,
                        reload: getData,
                    });
                }}>
                    <Image source={{
                        uri: item.class_avatar ?
                            (baseUrl + item.class_avatar) :
                            (item.avatar ? (baseUrl + item.avatar) : 'img_defaul_class'),
                    }} style={styles.imgClass} />
                    <View style={styles.itemInfo}>
                        <LinearGradient
                            style={styles.classNameContainer}
                            colors={[Colors.LightGreen, Colors.BaseGreen]}
                            start={{ x: 0, y: 0.5 }} end={{ x: 1, y: 0 }}>
                            <TextBox numberOfLines={2} textBreakStrategy="simple" style={styles.className}>{item?.class_name?.length > 32 ? `${item.class_name.substring(0, 32)}...` : item?.class_name}</TextBox>
                        </LinearGradient>
                        <View style={styles.marginTop}>
                            {!!item.organization_name && <TextBox style={styles.classFullName}>{item.organization_name}</TextBox>}
                            <Text >
                                <TextBox style={[styles.normalText]}>{language.ClassListTeacherScreen.Class + '  '}</TextBox>
                                <TextBox style={[styles.classFullName, stylesText]}>{item.type ? item.type.toUpperCase() : ''}</TextBox>
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
        );
    };
    // if (firstLoading) {
    //     return (
    //         <ImageBackground
    //             source={{ uri: 'imagebackground' }}
    //             imageStyle={stylesApp.ImageBackGround}
    //             style={styles.loading}>
    //             <Loading />
    //         </ImageBackground>
    //     );
    // }
    return (
        <View style={styles.container}>
            <ImageBackground source={{ uri: 'banner_curriculum' }} resizeMethod="resize" style={[stylesApp.ImageBackGround, styles.flex1]}>
                <FullScreenLoadingIndicator visible={firstLoading}/>
                <Image source={{ uri: 'logo_gv' }} style={styles.imgLogo} />
                {!firstLoading ? <FlatList
                    indicatorStyle={Colors.Black}
                    refreshControl={<RefreshControl
                        refreshing={loading}
                        onRefresh={getData}
                    />}
                    style={styles.flatlist}
                    data={list}
                    keyExtractor={(item, index) => item.key + index.toString()}
                    renderItem={renderItem}
                    ListEmptyComponent={renderEmpty}
                /> : <View style={styles.flatlist} />}
                <ShortMainButton
                    onPress={() => {
                        var h = MyData.isRefreshMes + 1;
                        MyData.isRefreshMes = h;
                        console.log("=====isRefreshMes",MyData.isRefreshMes)
                        props.navigation.navigate('CreateClassTeacherScreen', {
                            reload: getData,
                        });
                    }}
                    type={1}
                    style={styles.viewAdd}
                    widthType={'full'}
                >
                    <Image
                        source={{ uri: 'plus_icon' }}
                        style={styles.plus}
                    />
                    <TextBox
                        text={language.ClassListTeacherScreen.CreateClassButton}
                        style={[styles.textSty]} />
                </ShortMainButton>
            </ImageBackground>
        </View>
    );
};
