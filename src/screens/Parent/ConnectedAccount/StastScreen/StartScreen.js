import React from 'react';
import {
    Text, TouchableOpacity, View, ImageBackground, SafeAreaView
} from 'react-native';
import HeaderOnlyBack from '../../../../Header/HeaderOnlyBack';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import Header from '../../../../component/Header';

const StartScreen = (props) => {
    const {params} = props.navigation.state;
    const _goToListUnit = () => {
        props.navigation.navigate('ListUnit');
    };

    const _goToCreateConnect = () => {
        props.navigation.navigate('CreateConnect');
    };
    return (
        <ImageBackground
            source={{uri: !params ? 'imagebackground' : 'base_bg'}}
            style={{flex: 1}}>

            {
                !params ?
                    <Header showBack={true} title={'Quản lý liên kết'} goBack={() => props.navigation.goBack()}/>
                    // <HeaderOnlyBack
                    //     title={'Quản lý liên kết'}
                    //     navigation={props.navigation}
                    // />
                    :
                    <View style={{height: SmartScreenBase.smPercenWidth * 7,}}/>
            }
            <View style={{alignItems: 'center'}}>
                {
                    params ?
                        <View style={{alignItems: 'center'}}>
                            <Text style={{
                                color: '#9ceafe', fontSize: SmartScreenBase.smPercenWidth * 5.5,
                                marginTop: SmartScreenBase.smPercenHeight * 5
                            }}>CHÀO MỪNG BẠN ĐẾN
                                VỚI</Text>
                            <Text
                                style={{color: '#fff', fontSize: SmartScreenBase.smPercenWidth * 7, fontWeight: '700'}}>SUNDAY
                                ENGLISH</Text>
                        </View> :
                        <View style={{height: SmartScreenBase.smPercenHeight * 8}}/>
                }

                <Text style={{
                    paddingHorizontal: SmartScreenBase.smPercenWidth * 10,
                    color: '#9ceafe',
                    fontSize: SmartScreenBase.smPercenWidth * 4,
                    textAlign: 'center',
                    marginTop: SmartScreenBase.smPercenHeight * 7,
                }}>
                    Vui lòng liên kết với tài khoản của học viên để có thể sử dụng các tính năng quản lý.
                </Text>

                <TouchableOpacity onPress={_goToListUnit}>
                    <ImageBackground
                        style={{
                            width: SmartScreenBase.smPercenWidth * 80,
                            height: SmartScreenBase.smPercenHeight * 12,
                            marginTop: SmartScreenBase.smPercenHeight * 10,
                            paddingTop: SmartScreenBase.smPercenHeight * 2,
                            paddingHorizontal: SmartScreenBase.smPercenWidth * 7
                        }}
                        source={require('../../../../assets/image/PHUHUYNH-06.png')}
                        resizeMode={'stretch'}
                    >
                        <Text style={{
                            textAlign: 'center',
                            color: '#f6f7f7',
                            fontWeight: '700',
                            fontSize: SmartScreenBase.smPercenWidth * 4,
                        }}>{`Bạn nhận được một mã liên kết và muốn kết nối với người gửi`}</Text>
                    </ImageBackground>
                </TouchableOpacity>

                <TouchableOpacity onPress={_goToCreateConnect}>
                    <ImageBackground
                        style={{
                            width: SmartScreenBase.smPercenWidth * 80,
                            height: SmartScreenBase.smPercenHeight * 12,
                            marginTop: SmartScreenBase.smPercenHeight * 5,
                            paddingTop: SmartScreenBase.smPercenHeight * 2,
                            paddingHorizontal: SmartScreenBase.smPercenWidth * 7
                        }}
                        source={require('../../../../assets/image/PHUHUYNH-07.png')}
                        resizeMode={'stretch'}
                    >
                        <Text style={{
                            textAlign: 'center',
                            color: '#f6f7f7',
                            fontWeight: '700',
                            fontSize: SmartScreenBase.smPercenWidth * 4,
                        }}>{`Bạn muốn kết nối với người khác bằng cách gửi một mã liên kết`}</Text>
                    </ImageBackground>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

export default StartScreen;
