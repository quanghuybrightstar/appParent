import React, {useState} from 'react';
import {SafeAreaView, ImageBackground} from 'react-native';
import styles from "./styles";
import Header from "../../component/ComponentDetailStudyGuide/Header";
import Content from "../../component/ComponentDetailStudyGuide/Content";
import { AppHeader } from '../../componentBase/AppHeader/AppHeader';
import { Colors } from '../../styleApp/color';

const DetailStudyGuide = (props) => {
    const {navigation} = props;
    const {params} = navigation.state;
    const {title, type, path, content} = params;
    const [rotateImage, setRotateImage] = useState(false);

    const _handleRotateImage = () => {
        setRotateImage(!rotateImage);
    };

    return (
        
            <ImageBackground source={{uri: 'bgmap'}} style={styles.container}>
                {/* <Header navigation={navigation} title={title} type={type}
                        _handleRotateImage={_handleRotateImage}/> */}
                <AppHeader title={title} leftIconOnPress={()=>{ props.navigation.goBack()}}
                    rightIcon={type == 'img' ? 'rotate_image_study_guide' : null} rightIconOnPress={_handleRotateImage} styleHeaderRight={{tintColor: Colors.White}}/>
                {console.log("=====DetailStudyGuide",type, path)}
                <Content rotateImage={rotateImage} type={type} path={path} content={content}/>
            </ImageBackground>
    )
};

export default DetailStudyGuide;
