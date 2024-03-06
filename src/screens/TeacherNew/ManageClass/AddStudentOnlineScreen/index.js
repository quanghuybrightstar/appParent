import React, { useEffect } from 'react';
import { ScrollView, StyleSheet, TextInput, TouchableOpacity, View, Dimensions, Image, Platform, Alert, FlatList, RefreshControl } from 'react-native';
import { useSelector } from 'react-redux';
import { AppHeader } from '../../../../componentBase/AppHeader';
import { SmPopup as AlertPopup } from '../../../../componentBase/SmPopup/SmPopup';
import { ConfirmModal } from './ConfirmModal';
import { ShortMainButton } from '../../../../componentBase/ShortMainButton';
import { styles } from './AddStudentOnlineScreen.styles';
import { useModel } from './AddStudentOnlineScreen.logic';
import { TextBox } from '../../../../componentBase/TextBox';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../../../styleApp/color';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import {ADD_STUDENT_THUMBNAIL} from '../../../../assets/index';
import { FullScreenLoadingIndicator } from '../../../../componentBase/indicator/FullScreenLoadingIndicator';

/**
 * AddStudentOnlineScreen Screen
 * @param {object} props props from redux and navigation
 * @returns {Component}
 */
export const AddStudentOnlineScreen = (props) => {


    const language = useSelector(state => state.LanguageStackReducer.language);
    const { AddStudentOfflineScreen, SmPopup } = language;

    const { isResultVisible, setResultVisible, isConfirmVisible, setConfirmVisible, err, setErr, parent, setParent, message,
        onSendRequest, onValidateCode, code, setCode, loading } = useModel(props);

    return (
        <View style={[styles.container]}>
            <AppHeader title={'Thêm học sinh'} leftIconOnPress={() => {
                props.navigation.pop();
            }}
            />
            <View style={styles.container}>
                <KeyboardAwareScrollView contentContainerStyle={styles.flexGrow1} enableOnAndroid={false} bounces={false}>
                    <View style={styles.flex1}>
                        <View style={{alignItems: 'center'}}>
                            <Image source={ADD_STUDENT_THUMBNAIL} style={styles.imgHeader} resizeMode="stretch"/>
                            <LinearGradient colors={[Colors.TransparentWhite, Colors.White]} style={styles.gradient} />
                        </View>
                        <View style={styles.body}>
                            <TextBox text={AddStudentOfflineScreen.AddCodeText} style={styles.title} />
                            {/* <TextBox text={''} style={styles.subTitle} /> */}
                            <View style={[styles.textInputBox, !!err && { borderColor: Colors._E41E27 }]}>
                                <Image source={{ uri: 'avtlk1' }} style={styles.imgCode} />
                                <TextInput placeholder={AddStudentOfflineScreen.TextHoder} style={styles.textInput} value={code}
                                    onFocus={() => setErr('')}
                                    onBlur={()=> {setCode(code.trim());}}
                                    placeholderTextColor={Colors._ccc}
                                    onChangeText={setCode} />
                                {!!err && <Image source={{ uri: 'canhbao1' }} style={styles.imgcanhbao} />}
                            </View>
                            {!!err && <TextBox numberOfLines={undefined} text={err} style={styles.errText} />}
                        </View>
                    </View>
                    <View style={{ alignItems: 'center' }}>
                        <ShortMainButton
                            isDisabled={(()=> {
                                if (loading){
                                    return true;
                                }
                                if (!code) {
                                    return true;
                                }
                                if (!code.trim()){
                                    return true;
                                }
                            })()}
                            onPress={onValidateCode}
                            type={1}
                            text={AddStudentOfflineScreen.CheckBt}
                            style={styles.btnLink}
                            widthType={'full'}
                        />
                    </View>
                </KeyboardAwareScrollView>
            </View>
            <FullScreenLoadingIndicator
                visible={loading}
            />
            <AlertPopup
                visible={isResultVisible}
                confirmText={SmPopup.Yes}
                confirmOnpress={() => {
                    setResultVisible(false);
                    props.navigation.pop();
                }}
                message={message}
                cancelText={null}
            />
            <ConfirmModal
                parent={parent}
                visible={isConfirmVisible}
                requestClose={() => setConfirmVisible(false)}
                onSendRequest={onSendRequest} />
        </View >
    );
};
