import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { Alert, Image, ImageBackground, SafeAreaView, View, TouchableOpacity, TouchableWithoutFeedback, Modal } from 'react-native';
import { useSelector } from 'react-redux';
import SmartScreenBase from '../../../component/base/SmartScreenBase';
import Loading from '../../../component/LoadingScreen';
import { AppHeader } from '../../../componentBase/AppHeader';
import { MyButton } from '../../../componentBase/Button';
import { MyLongMainButton } from '../../../componentBase/LongMainButton';
import { TextBox } from '../../../componentBase/TextBox';
import { CommonJson } from '../../../stringJSON';
import { FontSize, FontWeight } from '../../../styleApp/font';
import stylesApp from '../../../styleApp/stylesApp';
import { styles } from './styles';
import { FullScreenLoadingIndicator } from '../../../componentBase/indicator/FullScreenLoadingIndicator';


/**
 * Working Plan Menu - Lịch làm việc
 * @param {object} props props from redux and navigation
 * @returns {Component}
 */
export const WorkMenu = (props) => {
    const language = useSelector(state => state.LanguageStackReducer.language)
    console.log('language', language)
    let [visible, setVisible] = useState(true);
    useEffect(() => {
        setTimeout(() => {
            setVisible(false)
        }, 200)
    }, [])
    /**
     * Render item section
     * @param {string} text title of section
     * @param {string} screen Screen will be navigate to
     * @returns {Component}
     */
    const renderItem = (text, screen) => {
        return (
            <TouchableWithoutFeedback
                activeOpacity={1}
                onPress={() => {
                    console.log('press')
                    props.navigation.navigate(screen)
                }}
            >
                <View style={styles.itemContainer}>
                    <View style={styles.textContainer}>
                        <TextBox
                            numberOfLines={2}
                            style={styles.text} >{text}</TextBox>
                    </View>
                    <View style={styles.imageContainer}>
                        <Image
                            style={styles.image}
                            source={{ uri: "calendar_circle" }}
                        />
                    </View>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    return (
        <>
            <ImageBackground source={{ uri: "bg_working" }}
                style={stylesApp.ImageBackGround}>
                <AppHeader title={language.WorkCalendarScreen.Header}
                    leftIconOnPress={() => {
                        props.navigation.pop()
                    }}
                />
                {!visible && <>
                <View style={styles.spacing} />
                {/* {renderItem(language.WorkCalendarScreen.TeachCalendarBt, 'WorkSchedule')} */}
                {renderItem(language.WorkCalendarScreen.TeachCalendarBt, 'WorkTimeTable')}
                <View style={styles.spacing} />
                {renderItem(language.WorkCalendarScreen.DateCalendarBt, 'WorkingByDay')}
                <View style={styles.spacing} />
                {renderItem(language.WorkCalendarScreen.YearCalendarBt, 'WorkSchedule')}
                </>}
            </ImageBackground>
            <FullScreenLoadingIndicator visible={visible}/>
            {/* <Modal visible={visible}>
                <ImageBackground
                    source={{ uri: 'imagebackground' }}
                    imageStyle={stylesApp.ImageBackGround}
                    style={styles.loading}>
                    <Loading />
                </ImageBackground>
            </Modal> */}
        </>
    )
}