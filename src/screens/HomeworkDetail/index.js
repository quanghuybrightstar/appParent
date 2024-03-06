import React, {memo, useCallback, useEffect, useMemo, useState} from 'react';
import {
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {AppHeader} from '../../componentBase/AppHeader';
import AudioPlayer from '../../componentBase/AudioPlayer/component';
import SmartScreenBase from '../../base/SmartScreenBase';
import {useStyleHomeworkDetail} from './styles';
import {useDispatch} from 'react-redux';
import {loadHistoryHomeworkDetail} from '../../ReduxStudent/actions/Student';
import {alertError} from '../../utils';
import API from '../../API/APIConstant';
import {stylesHistory} from '../Student/StudyForTest/styles';
import Loading from '../../component/LoadingScreenFull';
import VideoPlayer from '../../component/ComponentDetailStudyGuide/VideoPlayer';
import {Colors} from '../../styleApp/color';
import {ImageBackground} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {IC_ZOOM_IN} from '../../assets/icon';
import ModalImage from '../TeacherNew/ManageClass/MarkProjectScreen/ModalImage';
import {setModalVisible} from '../../redux/actions/ModalImage';
const smartScreenHeight = SmartScreenBase.smPercenHeight;

const _HomeworkDetail = ({navigation}) => {
  // todo: lấy ra bài tập về nhà
  const {item} = navigation.state.params;
  // todo: chứa thông tin chi tiết bài tập về nhà
  const [homework, setHomework] = useState();
  // todo: loading khi call api
  const [isLoading, setIsLoading] = useState(false);

  // todo: lấy ra link video, audio, ảnh đính kèm
  const uri = useMemo(() => {
    const resourceData = homework?.resourceData;
    if (resourceData) {
      if (resourceData?.path) {
        return `${API.domain}${resourceData?.path}`;
      }
      if (resourceData?.file) {
        return `${API.domain}${resourceData?.file}`;
      }
    }
    return '';
  }, [homework]);
  console.log('uri', uri);

  // todo: lấy ra định dạng file
  const typeFile = useMemo(() => {
    const resourceData = homework?.resourceData;
    if (resourceData) {
      return resourceData?.type;
    }
    return '';
  }, [homework]);

  // todo: style màn hình này
  const styles = useStyleHomeworkDetail();
  const dispatch = useDispatch();

  // todo: quay lại màn hình trước
  const onBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  // todo: load chi tiết bài tập về nhà
  const _loadHistoryHomeworkDetail = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await dispatch(
        loadHistoryHomeworkDetail(
          item.userExerciseId,
          item.library,
          item.exerciseType,
        ),
      );
      setHomework(result);
      console.log("=====setHomework",result)
    } catch (error) {
      alertError();
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, item.exerciseType, item.library, item.userExerciseId]);

  // todo: load chi tiết bài tập về nhà
  useEffect(() => {
    _loadHistoryHomeworkDetail();
  }, [_loadHistoryHomeworkDetail]);

  // todo: view full screen ảnh hoặc video
  const openModal = useCallback(() => {
    dispatch(setModalVisible(true));
  }, [dispatch]);

  return (
    <View style={styles.container}>
      {isLoading && <Loading />}
      <AppHeader
        styleTitle={styles.titleHeader}
        title={'Bài chấm của giáo viên'}
        leftIconOnPress={onBack}
      />
      <KeyboardAwareScrollView
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={_loadHistoryHomeworkDetail}
          />
        }>
        <View style={styles.paddingBody}>
          {typeFile === 'audio' && uri ? (
            <View
              style={{
                marginTop: SmartScreenBase.smPercenHeight * 3,
              }}>
              <AudioPlayer source={uri} onBack={onBack} />
            </View>
          ) : (
            <></>
          )}
          {typeFile === 'img' && uri ? (
            <>
              <View
                style={{
                  backgroundColor: Colors.DarkGray2,
                  marginVertical: SmartScreenBase.smPercenHeight * 3,
                  borderRadius: SmartScreenBase.smBaseWidth * 40,
                }}>
                <ImageBackground
                  style={{
                    width: '100%',
                    height: SmartScreenBase.smPercenHeight * 25,
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                  }}
                  resizeMode="contain"
                  source={{
                    uri,
                  }}>
                  <TouchableOpacity onPress={openModal}>
                    <View
                      style={{
                        marginRight: SmartScreenBase.smBaseHeight * 10,
                        marginBottom: SmartScreenBase.smBaseWidth * 20,
                      }}>
                      <Image
                        source={IC_ZOOM_IN}
                        style={{
                          width: SmartScreenBase.smBaseWidth * 105,
                          height: SmartScreenBase.smBaseWidth * 105,
                        }}
                      />
                    </View>
                  </TouchableOpacity>
                </ImageBackground>
                <ModalImage url={uri} />
              </View>
            </>
          ) : (
            <></>
          )}
          {typeFile === 'video' && uri ? (
            <View
              style={{
                marginVertical: SmartScreenBase.smPercenHeight * 3,
                height: SmartScreenBase.smPercenHeight * 30,
                width: '100%',
                backgroundColor: 'transparent',
              }}>
              <VideoPlayer path={uri} />
            </View>
          ) : (
            <></>
          )}

          <View
            style={[
              styles.scoreTable,
              {
                marginVertical: smartScreenHeight * 3,
              },
            ]}>
            <View style={styles.scoreContainer}>
              <Text allowFontScaling={false} style={styles.txtScore}>
                Điểm
              </Text>
              <View style={styles.score}>
                <Text allowFontScaling={false} style={styles.txtScoreInput}>
                  {homework?.exerciseData?.score}
                </Text>
              </View>
            </View>
            <View style={styles.reviewContainer}>
              <Text allowFontScaling={false} style={styles.txtScore}>
                Nhận xét
              </Text>
              <View style={styles.review}>
                <Text allowFontScaling={false} style={styles.txtReviewInput}>
                  {homework?.exerciseData?.comment}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
};

export default memo(_HomeworkDetail);
