import React, { memo } from 'react';
import {
    View,
    Text,
    Animated, Keyboard,
    TextInput,
    Dimensions,
    ImageBackground,
    Image,
    TouchableOpacity,
} from 'react-native';

const {width, height} = Dimensions.get('window');
import SmartScreenBase from '../../../base/SmartScreenBase';
import styles from './style';
import LinearGradient from 'react-native-linear-gradient';
import styleButton from '../../../styleApp/stylesApp';
import { AppHeader } from '../../../componentBase/AppHeader';
import { Colors } from '../../../styleApp/color';
import { ShortMainButton } from '../../../componentBase/ShortMainButton';
import ModalRegistrationClass from './ModalRegistrationClass';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import useLogic from './logic';
import FontBase from '../../../base/FontBase';
import { FullScreenLoadingIndicator } from '../../../componentBase/indicator/FullScreenLoadingIndicator';
import { ComponentLoadingIndicator } from '../../../componentBase/indicator/ComponentLoadingIndicator';


const AddStudentScreen = ({navigation}) => {

    const {
        fadeAnim,
        classKey,
        setClassKey,
        error,
        setError,
        studentInformation,
        setStudentInformation,
        notification,
        addInformation,
        startTime,
        onValidateClass,
        onAddClass,
        onClosedRegistration,
        errorText,
        setErrorText,
        setLoading,
        loading
    } = useLogic(navigation);

    return (
        <View style={styles.container}>
            <AppHeader
                title={'Đăng ký vào lớp'}
                leftIconOnPress={() => {
                    navigation.pop();
                }}
            />
            <KeyboardAwareScrollView directionalLockEnabled={true} style={{backgroundColor: '#fff'}}>
                <View style={{flex: 1}}>
                    <ImageBackground style={{
                        width: '100%',
                        height: width * 833 / 1088,
                    }}
                    resizeMode={'cover'}
                    source={require('../../../assets/image/bg_add_class.png')}
                    >
                        <LinearGradient colors={['#ffffff10', '#ffffff50', '#FFFFFF']}
                            style={{
                                marginTop: (width * 833 / 1088) * 2 / 3,
                                height: (width * 833 / 1088) / 3,
                                width: width,
                            }} />
                    </ImageBackground>
                    <View style={{
                        height: height / 3,
                        backgroundColor: '#ffffff',
                    }}>
                        <Text style={styles.contentTxt}>
                            Nhập mã lớp học mà bạn muốn tham gia.
                        </Text>
                        <Text style={styles.contentTxt}>
                            Yêu cầu gia nhập của bạn sẽ được giáo viên xét duyệt
                        </Text>
                        <View style={{flex: 1, alignItems: 'center'}}>
                            <View style={[{
                                width: SmartScreenBase.smPercenWidth * 80,
                                height: SmartScreenBase.smBaseHeight * 60,
                                borderRadius: SmartScreenBase.smPercenWidth * 7,
                                borderWidth: 1,
                                flexDirection: 'row',
                                borderColor: Colors.DarkCyan,
                                marginTop: SmartScreenBase.smBaseHeight * 30,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }, error && {borderColor: 'red'}]}>
                                <View style={{
                                    width: SmartScreenBase.smBaseHeight * 80,
                                    height: '100%',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <Image
                                        style={{width: 30, height: 26, tintColor: '#6E6E6E'}}
                                        source={{uri: 'footer_sutdent_03'}}
                                        resizeMode={'contain'}
                                    />
                                </View>

                                <TextInput style={{
                                    height: '100%',
                                    width: '60%',
                                    fontWeight: '400',
                                    fontSize: 16,
                                    color: '#000',
                                    padding: 0,
                                    fontFamily: FontBase.MyriadPro_Regular,
                                }}
                                placeholder="Nhập mã lớp"
                                underlineColorAndroid="transparent"
                                placeholderTextColor={"gray"}
                                onChangeText={(newClassKey) => {
                                    setClassKey(newClassKey);
                                    setErrorText('');
                                    setError(false);

                                }}
                                onFocus={() => {
                                    setError(false);
                                    setErrorText('');
                                }}
                                />
                                <View style={{
                                    width: 70,
                                    height: '100%',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    {error &&
                                <Image style={{
                                    width: SmartScreenBase.smBaseHeight * 25,
                                    height: SmartScreenBase.smBaseHeight * 25,
                                    tintColor: 'red',
                                }}
                                resizeMode={'contain'}
                                source={{uri: 'mhchung_icon_11'}}
                                />
                                    }
                                </View>
                            </View>
                            {
                                error &&
                            <View style={{alignItems: 'center', marginTop: SmartScreenBase.smBaseHeight * 30}}>
                                <Text style={{
                                    color: 'red',
                                    fontSize: 14,
                                    marginHorizontal: 20,
                                    textAlign: 'center',
                                    fontFamily: FontBase.MyriadPro_Regular,
                                }}>{errorText}</Text>
                            </View>
                            }
                        </View>


                    </View>
                    <View style={{alignItems: 'center'}}>
                        {!loading ? <ShortMainButton
                            type={1}
                            widthType={'full'}
                            // style={styleButton.Sty_Button}
                            text="Kiểm tra"
                            onPress={() => {
                                onValidateClass();
                            }}
                            isDisabled={classKey.trim() == ''}
                        /> 
                        : 
                        <View style={{height: SmartScreenBase.smPercenWidth*12, alignItems: 'center'}}>
                            <ComponentLoadingIndicator visible={loading}/>
                        </View>}
                    </View>
                </View>
                {/* <View style={{
                    bottom: SmartScreenBase.smBaseHeight * 10,
                    height: SmartScreenBase.smBaseHeight * 60,
                    width: width,
                    alignItems: 'center',
                    justifyContent: 'center',
                }} /> */}
            </KeyboardAwareScrollView>

            <ModalRegistrationClass
                visible={studentInformation}
                notification={notification}
                startTime={startTime }
                addInformation={addInformation}
                closedRegistration={onClosedRegistration}
                setStudentInformation={setStudentInformation}
                addClass={onAddClass}
            />
            {/* <FullScreenLoadingIndicator visible={loading}/> */}
        </View>
    );
};

export default memo(AddStudentScreen);
