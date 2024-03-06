import React, {memo} from 'react';
import {View, Text, Image} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import API from '../../../API/APIConstant';
import SmartScreenBase from '../../../base/SmartScreenBase';
import {Colors} from '../../../styleApp/color';
import stringUtils, {fixedStringNumber} from '../../../utils/stringUtils';
import styles from './styles';

const ItemContent = ({item, index}) => {
  const isRankUp = item.rank_change_status == 'up';
  const iconName = isRankUp ? 'chevron-up' : 'chevron-down';
  const iconColor = isRankUp ? Colors._6EBF49 : Colors._BE1E2D;
  const rankChanged = `${isRankUp ? '+' : ''}${item.rank_change}`;
  const totalScore = fixedStringNumber(item.total_score, 1);

  return (
    <View style={styles.viewItemContent}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          flex: 12,
        }}>
        <Text style={styles.textRank}>{item.rank}</Text>
        <Image
          resizeMode="cover"
          source={{
            uri: !item.avatar ? item.gender : API.image_base_url + item.avatar,
          }}
          style={{...styles.avatarViewContent, resizeMode: 'cover'}}
        />
        <Text
          ellipsizeMode="tail"
          numberOfLines={1}
          style={styles.textNameViewContent}>
          {item.fullname}
        </Text>
      </View>

      <View style={styles.itemRankContainer}>
        <View style={styles.itemRankBox}>
          {item.rank_change != 0 && (
            <View style={styles.itemRankChangeBox}>
              <Icon
                name={iconName}
                color={iconColor}
                size={SmartScreenBase.smBaseHeight * 36}
              />
              <Text style={[styles.itemRankChangeTxt, {color: iconColor}]}>
                {rankChanged}
              </Text>
            </View>
          )}

          <View style={styles.totalScoreContainer}>
            <Text style={styles.totalScoreTxt}>{stringUtils.roundOne(totalScore)}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default memo(ItemContent);
