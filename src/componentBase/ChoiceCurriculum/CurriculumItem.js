/* eslint-disable react/display-name */
import React, {forwardRef, useImperativeHandle, useState} from 'react';
import {useCallback} from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch} from 'react-redux';
import FontBase from '../../base/FontBase';
import SmartScreenBase from '../../base/SmartScreenBase';
import {Colors} from '../../styleApp/color';
import stylesApp from '../../styleApp/stylesApp';
import {alertError, alertInfo} from '../../utils';
import {dispatchDeleteCurriculum} from './../../redux/actions/FavoriteCurriculum';

const CurriculumItem = forwardRef(
  (
    {
      item,
      index,
      isFirst,
      isLast,
      isFavorite,
      onPress,
      hasIcon = true,
      hasDelete = true,
      classDetail,
      showDelete,
      cancelDelete,
      getClassDetail,
      setClassDetail,
      hasCreateAt = true,
    },
    ref,
  ) => {
    const dispatch = useDispatch();
    //todo: nếu delete thì xuất hiện loading
    const [isDeleted, setIsDeleted] = useState(false);
    //todo: nếu delete giáo trình call api
    const onDelete = useCallback(async () => {
      try {
        cancelDelete();
        setIsDeleted(true);
        const result = await dispatch(
          dispatchDeleteCurriculum(classDetail?.id, item?.id),
        );
        if (result.status) {
          setClassDetail(undefined);
          getClassDetail();
        }
      } catch (error) {
        alertError();
      } finally {
        setIsDeleted(false);
      }
    }, [
      cancelDelete,
      classDetail?.id,
      dispatch,
      getClassDetail,
      item?.id,
      setClassDetail,
    ]);

    //todo: render button delete
    const renderDelete = useCallback(() => {
      return (
        <TouchableOpacity disabled={isDeleted} onPress={showDelete} style={styles.delete}>
          <Image
            resizeMode="contain"
            style={styles.deleteIcon}
            source={{uri: 'small_trash_icon'}}
          />
        </TouchableOpacity>
      );
    }, [isDeleted, showDelete]);

    //todo: truyền vào ref hàm ondelete
    useImperativeHandle(ref, () => ({
      onDelete,
    }));

    //todo: nếu là giáo trình đc chọn thì sáng lên
    return isFavorite ? (
      <View
        style={{
          marginTop: isFirst ? SmartScreenBase.smPercenHeight * 2 : 0,
        }}>
        <View
          style={[
            styles.imageContainer, stylesApp.shadow,
            {
              top: !hasCreateAt
                ? SmartScreenBase.smPercenHeight +
                  SmartScreenBase.smPercenWidth * 2
                : SmartScreenBase.smPercenHeight +
                  SmartScreenBase.smPercenWidth * 5,
            },
          ]}>
          <Image
            style={{
              width: '100%',
              height: '100%',
            }}
            resizeMode={'contain'}
            source={{uri: 'curriculum'}}
          />
        </View>
        <TouchableOpacity activeOpacity={1} {...{onPress}}>
          <LinearGradient
            colors={['#fff', '#00E2A0', '#fff']}
            style={[styles.container]}
            start={{x: -1.5, y: 16}}
            end={{x: 8.5, y: 10}}>
            <View style={styles.icon} />
            <View style={styles.content}>
              <Text allowFontScaling={false} style={styles.name}>
                {item.name}
              </Text>
              <Text allowFontScaling={false} style={styles.grade}>
                {item.grade || 'Khối'}
              </Text>
              <Text allowFontScaling={false} style={styles.unit}>
                Số lượng unit: {item.unitAmount}
              </Text>
              {hasCreateAt && (
                <Text allowFontScaling={false} style={styles.time}>
                  Ngày tạo: {item.createAt}
                </Text>
              )}
            </View>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    ) : (
      <View
        style={{
          marginTop: isFirst ? SmartScreenBase.smPercenHeight * 2 : 0,
        }}>
        {hasIcon && (
          <View style={[styles.imageContainer, stylesApp.shadow]}>
            <Image
              style={{
                width: '100%',
                height: '100%',
              }}
              resizeMode={'contain'}
              source={{uri: 'curriculum'}}
            />
          </View>
        )}
        <TouchableOpacity
          activeOpacity={1}
          {...{onPress}}
          style={[
            styles.container,
            // {},
          ]}>
          {hasIcon ? (
            <View style={styles.icon} />
          ) : (
            <View style={{flex: 1 / 10}} />
          )}
          <View style={styles.content}>
            <Text allowFontScaling={false} style={styles.name}>
              {item.name}
            </Text>
            <Text allowFontScaling={false} style={styles.grade}>
              {item.grade || 'Khối'}
            </Text>
            <Text allowFontScaling={false} style={styles.unit}>
              Số lượng unit: {item.unitAmount}
            </Text>
            {hasCreateAt && (
              <Text allowFontScaling={false} style={styles.time}>
                {'Ngày tạo:'} {item.createAt}
              </Text>
            )}
          </View>
          {/* {hasDelete && renderDelete()} */}
        </TouchableOpacity>
      </View>
    );
  },
);

export default CurriculumItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.White,
    marginHorizontal: SmartScreenBase.smPercenHeight * 4,
    flexDirection: 'row',
    marginBottom: SmartScreenBase.smPercenHeight * 2,
    ...stylesApp.shadow,
    paddingVertical: SmartScreenBase.smPercenHeight * 2,
    borderRadius: SmartScreenBase.smPercenHeight * 2,
  },
  icon: {
    flex: 2 / 10,
    justifyContent: 'center',
  },
  content: {
    flex: 8 / 10,
  },
  imageContainer: {
    borderRadius: SmartScreenBase.smPercenWidth * 10,
    borderColor: Colors.White,
    borderWidth: 1,
    width: SmartScreenBase.smPercenWidth * 20,
    height: SmartScreenBase.smPercenWidth * 20,
    top: SmartScreenBase.smPercenHeight + SmartScreenBase.smPercenWidth * 2,
    zIndex: 999,
    position: 'absolute',
    left: SmartScreenBase.smPercenHeight,
  },
  name: {
    fontFamily: FontBase.MyriadPro_Bold,
    fontSize: SmartScreenBase.smFontSize * 50,
    paddingRight: SmartScreenBase.smPercenHeight,
  },
  grade: {
    fontFamily: FontBase.MyriadPro_Regular,
    color: Colors.Black,
    paddingVertical: SmartScreenBase.smPercenHeight,
  },
  unit: {
    fontFamily: FontBase.MyriadPro_Regular,
    color: Colors.Black,
  },
  delete: {
    position: 'absolute',
    right: SmartScreenBase.smPercenHeight,
    bottom: SmartScreenBase.smPercenHeight * 2,
  },
  time: {
    marginTop: SmartScreenBase.smPercenHeight,
    color: Colors.Black,
    fontFamily: FontBase.MyriadPro_Regular,
  },
  deleteIcon: {
    width: SmartScreenBase.smPercenHeight * 3,
    height: SmartScreenBase.smPercenHeight * 3,
  },
});
