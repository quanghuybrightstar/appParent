import React from 'react';
import {View, FlatList, Image, Text} from 'react-native';
import stylesApp from '../../../styleApp/stylesApp';
import styles from "./styles";
import stringUtils from '../../../utils/stringUtils';
import MarqueeText from 'react-native-marquee';

const Content = (props) => {
    const {data} = props;

    const _returnColorViewName = (type) => {
        if (type === 'top_1') {
            return "#DC4630"
        } else if (type === 'top_completed') {
            return '#1B75BB'
        } else if (type === 'top_change_rank') {
            return '#355602'
        } else if (type === 'top_speed') {
            return "#064F44"
        } else if(type === 'top_expired'){
            return '#6D1D02'
        }
    };

    const _returnTextAchievement = (item) => {
        if (item.type === 'top_1') {
            return "Điểm TBC "+stringUtils.roundTwo(item.avg_score)+" điểm"
        } else if (item.type === 'top_completed') {
            return "Đã hoàn thành " + item.number_completed + ' bài tập'
        } else if (item.type === 'top_change_rank') {
            return "Leo lên " + item.number_rank_change + ' bậc'
        } else if (item.type === 'top_speed') {
            return "Hoàn thành trong "+Math.ceil(item.duration/60)+" phút"
        } else if(item.type === 'top_expired'){
            return "Để quá hạn " + item.total_expired + ' bài tập'
        }
    };

    const _returnImageAchievement = (type) => {
        if (type === 'top_1') {
            return "vodich"
        } else if (type === 'top_completed') {
            return "caycuoc"
        } else if (type === 'top_change_rank') {
            return "leoranh"
        } else if (type === 'top_speed') {
            return "thangio"
        } else if(type === 'top_expired'){
            return "luoibieng"
        }
    };

    const _renderItem = ({item, index}) => {

    if (!item?.username) return null;

        return (
            <View style={styles.viewItem}>
                <View style={[styles.viewLeftItem, stylesApp.shadow]}>
                    {/* avatar */}
                    <View style={styles.viewAvatar}>
                        <Image
                            resizeMode="cover"
                            source={{uri: stringUtils.convertUrlMedia(item.avatar)}} style={styles.imageAvatar}/>
                        <View style={{...styles.viewName, backgroundColor: _returnColorViewName(item.type)}}>
                            <MarqueeText
                                duration={3000}
                                marqueeOnStart
                                loop
                                marqueeDelay={0}
                                marqueeResetDelay={1000}
                            >
                                <Text numberOfLines={1} ellipsizeMode={'clip'} style={styles.textName}>{item.fullname}</Text>
                            </MarqueeText>
                        </View>
                    </View>
                    <View style={styles.viewTextAchievement}>
                        <Text style={styles.textAchievement}>{_returnTextAchievement(item)}</Text>
                    </View>
                </View>

                <View style={styles.viewRightItem}>
                    <Image source={{uri: _returnImageAchievement(item.type)}} style={styles.imageAchievement} />
                </View>
            </View>
        )
    };

    return (
        <View style={styles.containerContain}>
            <FlatList
                data={data}
                renderItem={_renderItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </View>
    )
};

export default Content;
