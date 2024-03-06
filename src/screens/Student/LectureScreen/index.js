import React, {useMemo, useCallback} from 'react';
import {SafeAreaView, ImageBackground} from 'react-native';
import styles from "./style";
import HeaderLecture from "./HeaderLecture";
import TextLecture from "./TextLecture";
import VideoLecture from "./VideoLecture";

const LectureScreen = (props) => {
    const {params} = props.navigation.state;
    const _header = useMemo(() => <HeaderLecture navigation={props.navigation} title={params.data.document_name || 'Bài giảng'}/>, []);
    const _video = useMemo(() => <VideoLecture sourceVideo={params.data.video}/>, []);
    const _text = useMemo(() => <TextLecture text={params.data.text}/>, []);

    return (
        <SafeAreaView style={styles.container}>
            <ImageBackground source={{uri: 'imagebackground'}} style={styles.container}>
                {_header}
                {_video}
                {_text}
            </ImageBackground>
        </SafeAreaView>
    )
};

export default LectureScreen
