import React, {useEffect, useState} from 'react';
import {View, Image, useWindowDimensions, ActivityIndicator} from 'react-native';
import styles from "./styles";
import { Colors } from '../../../styleApp/color';
import SmartScreenBase from '../../../base/SmartScreenBase';

const ImageDocument = (props) => {
    const {rotateImage, path} = props;
    const {width, height} = useWindowDimensions();
    const [widthImage, setWidthImage] = useState(1);
    const [heightImage, setHeightImage] = useState(1);

    useEffect(() => {
        // _getSizeImage();
    }, [rotateImage, path]);

    const _getSizeImage = () => {
        Image.getSize(path, (widthImg, heightImg) => {
            setWidthImage(widthImg);
            setHeightImage(heightImg);
            console.log("=====_getSizeImage",widthImg,heightImg)
        });
    };

    const _styleImage = () => {
        if (rotateImage) {
            if (heightImage > widthImage) {
                return {width: height * widthImage / heightImage, height: width, transform: [{rotate: '90deg'}]}
            } else {
                return {
                    width: height * 80 / 100, height: width * heightImage / widthImage * 80 / 100,
                    transform: [{rotate: '90deg'}],
                }
            }
        } else {
            return {width, flex: 1}
        }
    };

    return (
        <View style={styles.container}>
            <ActivityIndicator color={Colors.White} size="small" style={{position: 'absolute', top: SmartScreenBase.smPercenHeight*45, left: SmartScreenBase.smPercenWidth*46.5}} />
            <Image source={{uri: path}} style={_styleImage()} resizeMode={'contain'}/>
        </View>
    )
};

export default ImageDocument;
