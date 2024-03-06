import React from 'react';
import {View, ImageBackground, Image, Text} from 'react-native';
import styles from './styles';
import SmartScreenBase from '../../../base/SmartScreenBase';
import { Colors } from '../../../styleApp/color';
import API from '../../../API/APIConstant';
import stylesApp from '../../../styleApp/stylesApp';
import stringUtils from '../../../utils/stringUtils';


const ViewTop = (props) => {
    const {data} = props;
    const _renderRankFirst = () => {
        const item = data.find(ele => parseInt(ele.rank) === 1);
        if (item) {
            return (
                <>
                    <ImageBackground source={{uri: 'student_24'}} style={styles.backgroundScore}
                        imageStyle={styles.backgroundScore}>
                        <Text style={styles.textScore}>{stringUtils.roundOne(item.total_score)}</Text>
                    </ImageBackground>

                    <View style={{
                        width: SmartScreenBase.smPercenWidth * 35,
                        height: SmartScreenBase.smPercenWidth * 35,
                    }}>
                        <Image
                            resizeMode="cover"
                            resizeMethod="auto"
                            borderRadius={20}
                            source={{uri: API.image_base_url + item.avatar}}
                            style={{
                                ...styles.imageAvatar,
                                width: '46%',
                                height: '46%',
                                top: '28%',
                                left: '27%',
                            }}
                        />
                        <Image
                            source={{uri: 'class_st05'}}
                            style={{
                                ...styles.imageWreath,
                                width: '50%', height: '50%', top: '26%', left: '25%',
                            }}/>
                        <Image
                            source={{uri: 'class_st02'}}
                            style={{width: '100%', height: '100%', resizeMode: 'contain'}}/>

                        <View style={[styles.numberContainer, {borderColor: Colors.VividOrange}]}>
                            <Text style={styles.numberTxt}>{'1'}</Text>
                        </View>
                    </View>
                </>
            );
        }
    };

    const _renderRankSecond = () => {
        const item = data.find(ele => parseInt(ele.rank) === 2);
        if (item){
            return (
                <>
                    <ImageBackground source={{uri: 'student_23'}} style={styles.backgroundScore}
                        imageStyle={styles.backgroundScore}>
                        <Text style={styles.textScore}>{stringUtils.roundOne(item.total_score)}</Text>
                    </ImageBackground>
                    <View style={styles.backgroundImageAchieve}>
                        <Image
                            resizeMode="cover"
                            resizeMethod="auto"
                            borderRadius={20}
                            source={{uri: API.image_base_url + item.avatar}}
                            style={styles.imageAvatar}
                        />
                        <Image source={{uri: 'class_st04'}} style={styles.imageWreath}/>
                        <Image source={{uri: 'class_st01'}}
                            style={{width: '100%', height: '100%', resizeMode: 'contain'}}/>
                        <View style={[styles.numberContainer, styles.smallNumberContainer, {borderColor: Colors.GrayishBlue}]}>
                            <Text style={[styles.numberTxt, styles.smallTopTxt]}>{'2'}</Text>
                        </View>
                    </View>
                </>
            );
        }
    };

    const _renderRankThird = () => {
        const item = data.find(ele => parseInt(ele.rank) === 3);
        if (item){
            return (
                <>
                    <ImageBackground source={{uri: 'student_25'}} style={styles.backgroundScore}
                        imageStyle={styles.backgroundScore}>
                        <Text style={styles.textScore}>{stringUtils.roundOne(item.total_score)}</Text>
                    </ImageBackground>
                    <View style={styles.backgroundImageAchieve}>
                        <Image
                            resizeMode="cover"
                            resizeMethod="auto"
                            borderRadius={20}
                            source={{uri: API.image_base_url + item.avatar}}
                            style={styles.imageAvatar}/>
                        <Image source={{uri: 'class_st06'}} style={styles.imageWreath}/>
                        <Image source={{uri: 'class_st03'}}
                            style={{width: '100%', height: '100%', resizeMode: 'contain'}}/>
                        <View style={[styles.numberContainer, styles.smallNumberContainer, {borderColor: Colors._559BB1}]}>
                            <Text style={[styles.numberTxt, styles.smallTopTxt]}>{'3'}</Text>
                        </View>
                    </View>
                </>
            );
        }
    };

    const _renderName = (rank) => {
        const item = data.find(ele => parseInt(ele.rank) === rank);
        // if(item)
            return (
                <View style={{alignItems: 'center', flex: 1, marginHorizontal: SmartScreenBase.smPercenWidth * 5}}>
                    {item && <Text style={styles.textFullName}>{(item.fullname || '').trim()}</Text>}
                </View>
            );
    };

    return (
        <View style={[styles.containerViewTop, stylesApp.shadow]}>
            <View style={styles.viewAchievement}>
                <View style={{alignItems: 'center', flex: 1}}>
                    {_renderRankSecond()}
                </View>
                <View style={{alignItems: 'center', flex: 1}}>
                    {_renderRankFirst()}
                </View>
                <View style={{alignItems: 'center', flex: 1}}>
                    {_renderRankThird()}
                </View>
            </View>
            <View style={{...styles.viewAchievement, marginBottom: SmartScreenBase.smPercenHeight * 2}}>
                {_renderName(2)}
                {_renderName(1)}
                {_renderName(3)}
            </View>
        </View>
    );
};

export default ViewTop;
