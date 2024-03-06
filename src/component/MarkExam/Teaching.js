import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    ImageBackground,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Image,
    Modal,
    Keyboard,
    StyleSheet,
    TextInput,
    Button,
    ScrollView,
    FlatList,
    Platform,
} from 'react-native';
import stylesApp from '../styleApp/stylesApp';
import SmartScreenBase from '../base/SmartScreenBase';
import Header from './Header';
import API from '../../API/APIConstant';
import axios from 'axios';
import LoadingScreen from '../../screens/LoadingScreen';
import StyleLesson from '../learn/Lesson/StyleLesson';
import {useSelector} from 'react-redux';
import styles from './styles';
import HeaderNew from './HeaderNew';

const Teaching = ({navigation}) => {

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(['Task response', 'Grammar', 'Vocab', 'Coherence and Cohension']);

    const _renderViewTc = (text, width) => {
        return (
            <View style={{...styles._tc_tt_d, width, alignItems: 'flex-start'}}>
                <Text style={{...styles.text, paddingLeft: SmartScreenBase.smPercenWidth * 5}}>{text}</Text>
            </View>
        );
    };

    const _renderBtnAdd = (text, width) => {
        return (
            <View style={{...styles._tc_tt_d, width, backgroundColor: '#ffffff80', height: SmartScreenBase.smPercenHeight * 8}}>
                <Image source={{uri: 'gv_109'}} resizeMode={'contain'} style={{width: SmartScreenBase.smPercenWidth * 5, height: SmartScreenBase.smPercenWidth * 5}} />
            </View>
        );
    };

    const _renderValue = (text, borderLeftWidth) => {
        return (
            <View style={{width: '50%', alignItems: 'center', borderLeftWidth}}>
                <Text style={{
                    fontSize: SmartScreenBase.smFontSize * 50,
                    color: '#00283a',
                }}>{text}</Text>
                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: SmartScreenBase.smPercenHeight}}>
                    <Image source={{uri:'mat1'}} resizeMode={'contain'} style={{width: SmartScreenBase.smPercenWidth * 8, height: SmartScreenBase.smPercenWidth * 8, marginRight: SmartScreenBase.smPercenHeight}}/>
                    <Image source={{uri:'butchi1'}} resizeMode={'contain'} style={{width: SmartScreenBase.smPercenWidth * 8, height: SmartScreenBase.smPercenWidth * 8}}/>
                </View>
            </View>
        );
    };

    return (
        <ImageBackground
            source={{uri: 'imagebackgroundlesson'}}
            imageStyle={stylesApp.ImageBackGround}
            style={{flex: 1}}>
            <HeaderNew title={'Giảng dạy'} goBack={() => navigation.goBack()}/>
            {isLoading ? <LoadingScreen/> : null}
            <View style={{padding: SmartScreenBase.smPercenWidth * 2.5}}>
                <View style={{
                    backgroundColor: '#ffffff80',
                    maxHeight: SmartScreenBase.smPercenHeight * 80,
                    borderRadius: SmartScreenBase.smPercenWidth * 5,
                    paddingHorizontal: SmartScreenBase.smPercenWidth * 2
                }}>
                    <View style={{...styles._v_tc_tt_d, marginTop: SmartScreenBase.smPercenHeight}}>
                        {_renderViewTc('Lý thuyết', '49%')}
                        {_renderViewTc('Bài tập', '49%')}
                    </View>
                    <View style={{
                        borderRadius: SmartScreenBase.smPercenWidth * 5,
                        alignItems: 'center',
                        justifyContent: 'center', backgroundColor: '#fff',
                        height: SmartScreenBase.smPercenHeight * 12,
                        marginTop: SmartScreenBase.smPercenHeight,
                        marginBottom: SmartScreenBase.smPercenHeight,
                    }}>
                        <View style={styles._v_c_f_c}>
                            {_renderValue('Thì hiện tại đơn', 0)}
                            {_renderValue('Thì hiện tại đơn', 1)}
                        </View>
                    </View>
                </View>
                <View style={{...styles._v_tc_tt_d, marginTop: SmartScreenBase.smPercenHeight}}>
                    {_renderBtnAdd('', '49%')}
                    {_renderBtnAdd('', '49%')}
                </View>
            </View>
            <View style={styles._v_b_t}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    marginBottom: SmartScreenBase.smPercenHeight * 2,
                }}>
                    <Text style={{color: '#fff', fontSize: SmartScreenBase.smFontSize * 45}}>Đặt làm bài tập</Text>
                    <View style={{marginLeft: SmartScreenBase.smPercenWidth * 5}}>
                        <Image source={{uri: 'gv_55'}} resizeMode={'contain'} style={{width: SmartScreenBase.smPercenWidth * 6, height:  SmartScreenBase.smPercenWidth * 6, tintColor: '#fff' }} />
                        <Image source={{uri: 'gv_56'}} resizeMode={'contain'} style={{width: SmartScreenBase.smPercenWidth * 8, height:  SmartScreenBase.smPercenWidth * 7, position: 'absolute', top: - SmartScreenBase.smPercenWidth * 2 }} />
                    </View>
                </View>
                <TouchableOpacity

                >
                    <TouchableOpacity style={styles._v_btn_t_c}
                        onPress={() => navigation.goBack()}
                    >
                        <Text style={{
                            color: '#fff',
                            fontSize: SmartScreenBase.smFontSize * 45,
                            fontWeight: 'bold',
                        }}>Xong</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

export default Teaching;
