import {isInteger} from 'lodash-es';
import React, {memo, useCallback, useMemo} from 'react';
import {Text, View} from 'react-native';
import SmartScreenBase from '../../base/SmartScreenBase';
import {useStyleTopic} from './styles';
import LogBase from '../../base/LogBase';
import moment from 'moment'
import dateTimeHelper from '../../utils/dateTimeHelper';
import stringUtils from '../../utils/stringUtils';

const _ItemHistory = ({item, index, isFirst, isLast, navigation}) => {
    const styles = useStyleTopic();
    const itemStyles = useMemo(() => {
        return [
            styles.itemContainer,
            {
                backgroundColor: '#fff',
                borderTopRightRadius: isFirst ? SmartScreenBase.smPercenHeight * 3 : 0,
                borderTopLeftRadius: isFirst ? SmartScreenBase.smPercenHeight * 3 : 0,
                borderBottomRightRadius: isLast
                    ? SmartScreenBase.smPercenHeight * 3
                    : 0,
                borderBottomLeftRadius: isLast ? SmartScreenBase.smPercenHeight * 3 : 0,
            },
        ];
    }, [isFirst, isLast, styles.itemContainer]);

    const onNavigateHomeworkDetail = useCallback(() => {
        LogBase.log("=====onNavigateHomeworkDetail",item)
        if(item.exerciseType == "writing"){
            navigation.navigate('StudentWrittingScreen', {item, isTeacher: false});
        }else{
            navigation.navigate('HomeworkDetail', {item});
        }
    }, [item, navigation]);

    return (
        <View style={itemStyles}>
            {LogBase.log("=====item his",item)}
            <View style={styles.itemHistory}>
                <View style={styles.time}>
                    <Text allowFontScaling={false} style={[styles.txtDate]}>
                        {item?.time ? moment(item?.time, "YYYY-MM-DD hh:mm:ss").format("DD/MM/YYYY HH:mm:ss") : ""}
                    </Text>
                    <Text allowFontScaling={false} style={styles.txtAnswer}>
            Thời gian làm:{' '}
                        <Text allowFontScaling={false} style={[styles.txtTimeToLive]}>
                            {item?.timeToLive ? dateTimeHelper.convertSecondToMinute(+item?.timeToLive) : ""}
                        </Text>
                    </Text>
                </View>
                {item?.isAuto ? (
                    <View style={styles.score}>
                        <Text allowFontScaling={false} style={[styles.txtScore]}>
                            {stringUtils.roundOne(item.score)}
                        </Text>
                    </View>
                ) : item?.isMark ? (
                    <View style={styles.score}>
                        <Text allowFontScaling={false} style={[styles.txtScore]}>
                            {stringUtils.roundOne(item.score)}
                        </Text>
                    </View>
                ) : (
                    <></>
                )}
            </View>
            {!item?.isAuto && (
                <View style={styles.markContainer}>
                    {item?.isMark ? (
                        <Text allowFontScaling={false} style={[styles.textMark]}>
              Đã chấm
                        </Text>
                    ) : (
                        <Text
                            allowFontScaling={false}
                            style={[styles.textMark, {color: 'orange'}]}>
              Chờ chấm
                        </Text>
                    )}
                    {item?.isMark && (
                        <Text
                            allowFontScaling={false}
                            onPress={onNavigateHomeworkDetail}
                            style={styles.textUnMark}>
              Xem bài chữa{' '}
                        </Text>
                    )}
                </View>
            )}
            {!isLast && (
                <View
                    style={[
                        styles.line,
                        {
                            marginBottom: isLast ? SmartScreenBase.smPercenHeight * 3 : 0,
                        },
                    ]}
                />
            )}
        </View>
    );
};

export default memo(_ItemHistory);
