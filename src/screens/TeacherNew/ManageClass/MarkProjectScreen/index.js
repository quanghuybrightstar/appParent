import * as React from 'react';
import {useEffect} from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  Keyboard,
  Platform,
  ScrollView,
  Text,
  View,
  ActivityIndicator
} from 'react-native';
import {AppHeader} from '../../../../componentBase/AppHeader';
import {Colors} from '../../../../styleApp/color';
import API from '../../../../API/APIConstant';
import APIBase from '../../../../base/APIBase';
import {TextInput} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useCallback} from 'react';
import styles from './styles';
import {useState} from 'react';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import Loading from '../../../../component/LoadingScreenFull';
import {
  BG_2,
  QUESTION_MARK,
  BG_MARK,
  IC_ZOOM_IN,
} from '../../../../assets/icon';
import {STUDENT} from '../../../../assets/image';
import FontBase from '../../../../base/FontBase';
import ComponentModal from '../../../Teacher/ChangePassword/componentModal';
import VideoPlayer from '../../../../component/ComponentDetailStudyGuide/VideoPlayer';
import {setReload} from '../../../../redux/actions/Filter';
import {useDispatch} from 'react-redux';
import AudioPlayer from '../../../../componentBase/AudioPlayer/component';
import {ShortMainButton} from '../../../../componentBase/ShortMainButton';
import ModalImage from './ModalImage';
import {setModalVisible} from '../../../../redux/actions/ModalImage';
import {TextBox} from '../../../../componentBase/TextBox';
import AutoHeightImage from 'react-native-auto-height-image';
import VideoDocument from '../../../../component/ComponentDetailStudyGuide/VideoDocument';
import LogBase from '../../../../base/LogBase';

export const MarkProjectScreen = (props) => {
  const dispatch = useDispatch();
  let item = props.navigation.getParam('item');
  //Hiển thị loading
  const [loading, setLoading] = useState(false);
  //Lưu dữ liệu
  const [list, setList] = useState(false);
  //Kiểm tra editable của comment
  const [isEditable, setIsEditable] = useState(false);
  //Lưu điểm
  const [score, setScore] = useState('');
  //Lưu đánh giá
  const [comment, setComment] = useState('');
  //Hiển thị modal message
  const [isVisible, setIsVisible] = useState(false);
  //Lưu lỗi
  const [error, setError] = useState('');
  //Kiểm tra ảnh đang quay dọc hay ngang
  const [imagePortrait, setImagePortrait] = useState(true);
  //Đã load xong ảnh chưa
  const [imgLoadDone, setImgLoadDone] = useState(false);

  //Set disable nhập đánh giá
  useEffect(() => {
    setIsEditable(item.status === '1');
  }, [item.status]);

  //lưu dữ liệu điểm và đánh giá vào biến
  useEffect(() => {
    if(item.status != 1 && list?.exercise_data?.score == 0){
      setScore('')
    }else{
      setScore(list?.exercise_data?.score?.replace(',', '.'));
    }
    setComment(list?.old_result ? list?.old_result?.comment?.trim() : list?.exercise_data?.comment);
  }, [list]);

  //Làm tròn điểm mỗi khi ẩn bàn phím
  const roundScore = useCallback(() => {
    let score2 = score;
    if (score?.includes(',')) {
      score2 = score?.replace(',', '.');
    }
    if (score?.includes('-')) {
      score2 = score?.replace('-', '.');
    }
    if (score2) {
      if (parseFloat(score2) === parseInt(score2, 10)) {
        setScore(parseInt(score2, 10).toString());
      } else {
        setScore(parseFloat(score2).toString());
      }
    } else {
      setScore('');
    }
  }, [score]);
  useEffect(() => {
    Keyboard.addListener('keyboardDidHide', roundScore);

    // return Keyboard.removeListener('keyboardDidHide', roundScore);

    // return () => {
    //   Keyboard.removeListener('keyboardDidHide', () => {
    //     let score2 = score;
    //     if (score2) {
    //       if (parseFloat(score2) === parseInt(score2, 10)) {
    //         setScore(parseInt(score2, 10).toString());
    //       } else {
    //         setScore(parseFloat(score2).toString());
    //       }
    //     } else {
    //       setScore('');
    //     }
    //   });
    // };
  }, [roundScore]);

  //Lấy và lưu dữ liệu
  const getData = useCallback(async () => {
    setLoading(true);
    const url = `${
      API.baseurl +
      API.getExerciseDetail(
        item?.user_exercise_id,
        item?.library,
        item?.exercise_type,
      )
    }`;
    try {
      let exercises = await APIBase.tokenAPI('get', url);
      LogBase.log('=====exercises', exercises);
      setList(exercises?.data);
    } catch (error1) {
      console.log(error1);
    } finally {
      setLoading(false);
    }
  }, [item?.exercise_type, item?.library, item?.user_exercise_id]);

  useEffect(() => {
    getData();
  }, [getData]);

  //Quay về màn hình cũ
  const goBack = useCallback(() => {
    props.navigation.goBack();
    dispatch(setReload(true));
  }, [dispatch, props.navigation]);

  //Khi ấn nút chấm lại
  const reMark = useCallback(() => {
    setIsEditable(false);
  }, []);

  //Tắt modal message
  const onClose = useCallback(() => {
    setIsVisible(false);
  }, [setIsVisible]);

  //Khi ấn nút chấm điểm
  const onSubmit = useCallback(async () => {
    if (score > 10) {
      Alert.alert('Điểm không hợp lệ');
      return;
    }
    const qs = require('qs');
    let body = qs.stringify({
      json_criteria_score: {},
      user_exercise_id: item.user_exercise_id,
      score,
      comment,
      json_writing_check: {},
      library: item.library,
      exercise_type: item.exercise_type,
    });
    body += '&json_criteria_score=&json_writing_check=';
    console.log('body', body);
    setLoading(true);
    const url = `${API.baseurl + API.saveMarkExercise}`;
    let exercises;
    try {
      exercises = await APIBase.tokenAPI('put', url, body);
      console.log('exercises', exercises);
      setIsVisible(true);
      setError(exercises?.data?.msg);
      setTimeout(() => {
        setIsVisible(false);
        if (exercises?.data?.status) {
          goBack();
        }
      }, 2000);
      if (!exercises?.data?.status) {
        return;
      }
      return;
    } catch (error1) {
      console.log('error1', error1);
      setIsVisible(true);
      setError('Chấm bài không thành công');
      setTimeout(() => {
        setIsVisible(false);
      }, 2000);
      return;
    } finally {
      setLoading(false);
    }
  }, [
    comment,
    goBack,
    item.exercise_type,
    item.library,
    item.user_exercise_id,
    score,
  ]);

  //Lưu điểm vào biến score
  const onChangeScore = useCallback((value) => {
    if(!(value>10) && value != "10," && value != "10."){
      setScore(value);
    }
  }, []);

  //Tính toán max length của score
  const maxLength = React.useMemo(() => {
    if (score) {
      let scoreNumber = score;
      if (score?.includes(',')) {
        scoreNumber = score?.replace(',', '.');
      }
      if (score?.includes('-')) {
        scoreNumber = score?.replace('-', '.');
      }
      const scoreFloat = parseFloat(scoreNumber).toString();
      if (scoreFloat?.length <= 2) {
        return 5;
      }
      return 4 + (scoreNumber?.length - scoreFloat?.length);
    } else {
      return 4;
    }
  }, [score]);

  //Lưu đánh giá vào comment
  const onChangeComment = useCallback((value) => {
    setComment(value);
  }, []);

  //Lấy url video, audio, image
  const url = React.useMemo(() => {
    return (
      API.domain + (list?.resource_data?.path || list?.resource_data?.file)
    );
  }, [list?.resource_data?.file, list?.resource_data?.path]);

  //Phóng to image
  const openModal = useCallback(() => {
    dispatch(setModalVisible(true));
  }, [dispatch]);

  useEffect(() => {
    Image.getSize(url, (width, height) => {
      if (height > width) {
        setImagePortrait(false);
      } else {
        setImagePortrait(true);
      }
    });
  }, [url]);

  //Hiển thị giao diện tuỳ vào resource là video, audio hay image
  const renderResource = React.useMemo(() => {
    let type = '';
    if (item?.exercise_type === 'project') {
      type = list?.resource_data?.file_type;
    } else if (item?.exercise_type === 'speaking') {
      type = list?.resource_data?.type;
    }
    switch (type) {
      case 'video':
        return (
          <View
            style={{
              marginTop: SmartScreenBase.smPercenHeight,
              marginBottom: SmartScreenBase.smPercenHeight * 3,
              height: SmartScreenBase.smPercenHeight * 30,
              width: '100%',
              backgroundColor: 'transparent',
            }}>
            {/* <VideoDocument {...props} path={url}/> */}
            <VideoPlayer path={url} />
          </View>
        );
      case 'img':
        return (
          <>
            <View
              style={{
                backgroundColor: !imagePortrait
                  ? Colors.DarkGray2
                  : Colors.White,
                marginBottom: SmartScreenBase.smPercenHeight * 3,
                borderRadius: SmartScreenBase.smBaseWidth * 40,
                overflow: !imagePortrait ? 'hidden' : 'visible',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ActivityIndicator color={Colors.White} size="small" style={{position: 'absolute', top: SmartScreenBase.smPercenWidth*20, left: SmartScreenBase.smPercenWidth*43}} />
              {imagePortrait ? (
                <>
                  <Image
                    resizeMode={'contain'}
                    style={{
                      // backgroundColor: "#fff",
                      borderRadius: SmartScreenBase.smBaseWidth * 40,
                      width: SmartScreenBase.smPercenWidth * 90,
                      height: SmartScreenBase.smPercenWidth * 60,
                    }}
                    source={{uri: url}}
                  />
                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      zIndex: 10000000,
                    }}
                    onPress={openModal}>
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
                </>
              ) : (
                <ImageBackground
                  style={{
                    width: '100%',
                    height: SmartScreenBase.smPercenHeight * 25,
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                  }}
                  resizeMode="contain"
                  source={{
                    uri: url,
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
              )}
              <ModalImage url={url} />
            </View>
          </>
        );
      case 'audio':
        return (
          <View
            style={{
              marginBottom: SmartScreenBase.smPercenHeight * 3,
              width: '100%',
              backgroundColor: 'transparent',
            }}>
            <AudioPlayer source={url} onBack={goBack} />
          </View>
        );
    }
  }, [
    goBack,
    imagePortrait,
    item?.exercise_type,
    list?.resource_data?.file_type,
    list?.resource_data?.type,
    openModal,
    url,
  ]);

  // const onFocus = useCallback(() => {
  //   if (score === '0') {
  //     setScore('');
  //   }
  // }, [score]);

  return (
    <>
      <ComponentModal
        isVisible={isVisible}
        onClose={onClose}
        message={error}
        noButton
        style={{
          height: SmartScreenBase.smPercenHeight * 15,
        }}
        errorSize={SmartScreenBase.smFontSize * 60}
      />
      <ImageBackground source={BG_2} style={{width: '100%', height: '100%'}}>
        <AppHeader
          title={item.to_fullname}
          leftIconOnPress={goBack}
          styleTitle={styles.title2}
        />
        {loading ? (
          <Loading />
        ) : (
          <KeyboardAwareScrollView
            extraHeight={
              Platform.OS === 'ios' ? SmartScreenBase.smBaseHeight * 140 : 0
            }
            showsVerticalScrollIndicator={false}>
            <View style={styles.paddingBody}>
              {item?.exercise_type === 'project' ||
              item?.exercise_type === 'speaking' ? (
                <View style={styles.body2} />
              ) : (
                <View style={styles.body}>
                  <View
                    style={[
                      styles.avatarContainer,
                      {
                        overflow: 'hidden',
                      },
                    ]}>
                    <Image source={STUDENT} style={styles.avatar} />
                  </View>
                  <ImageBackground
                    source={BG_MARK}
                    style={styles.titleContainer}>
                    <View style={styles.titleView}>
                      <TextBox style={styles.title} numberOfLines={2}>
                        {item?.exercise_name}
                      </TextBox>
                    </View>
                  </ImageBackground>
                  <Image source={QUESTION_MARK} style={styles.mark} />
                </View>
              )}

              {renderResource}

              <View
                style={[
                  styles.scoreTable,
                  {
                    shadowColor: Colors.Black,
                    shadowOffset: {
                      width: 0,
                      height: SmartScreenBase.smBaseHeight * 1.6,
                    },
                    shadowOpacity: 0.15,
                    shadowRadius: 3.84,
                    elevation: 2,
                  },
                ]}>
                <View style={styles.scoreContainer}>
                  <Text
                    style={{
                      fontFamily: FontBase.MyriadPro_Regular,
                      fontSize: SmartScreenBase.smFontSize * 55,
                      paddingTop:
                        Platform.OS === 'android'
                          ? 0
                          : SmartScreenBase.smBaseHeight * 5,
                    }}>
                    Điểm
                  </Text>
                  <TextInput
                    style={[
                      styles.score,
                      Platform.OS === 'android' && {
                        fontStyle: 'normal',
                        fontWeight: 'normal',
                      },
                    ]}
                    keyboardType="numeric"
                    value={score}
                    // onFocus={onFocus}
                    allowFontScaling={false}
                    editable={!isEditable}
                    maxLength={maxLength || 4}
                    onChangeText={onChangeScore}
                  />
                </View>
                <View style={styles.reviewContainer}>
                  <Text
                    style={{
                      fontFamily: FontBase.MyriadPro_Regular,
                      fontSize: SmartScreenBase.smFontSize * 55,
                      marginTop:
                        Platform.OS === 'android'
                          ? 0
                          : SmartScreenBase.smBaseHeight * 5,
                    }}>
                    Nhận xét
                  </Text>
                  {Platform.OS === 'ios' ? (
                    <TextInput
                      placeholder="Viết nhận xét"
                      style={[
                        styles.review,
                        Platform.OS === 'android' && {
                          paddingTop: 0,
                          fontStyle: 'normal',
                          fontWeight: 'normal',
                        },
                      ]}
                      multiline
                      allowFontScaling={false}
                      onChangeText={onChangeComment}
                      value={comment}
                      scrollEnabled
                      editable={!isEditable}
                    />
                  ) : !isEditable ? (
                    <TextInput
                      placeholder="Viết nhận xét"
                      style={[
                        styles.review,
                        {
                          fontStyle: 'normal',
                          fontWeight: 'normal',
                        },
                      ]}
                      multiline
                      allowFontScaling={false}
                      onChangeText={onChangeComment}
                      value={comment}
                      scrollEnabled
                    />
                  ) : (
                    <ScrollView
                      scrollEnabled
                      nestedScrollEnabled
                      style={styles.review1}>
                      <Text allowFontScaling={false} style={styles.review2}>
                        {comment}
                      </Text>
                    </ScrollView>
                  )}
                </View>
              </View>
            </View>
            <ShortMainButton
              isDisabled={!score}
              type={1}
              style={[styles.btnContainer]}
              onPress={isEditable ? reMark : onSubmit}
              text={isEditable ? 'Chấm lại' : 'Gửi học sinh'}>
            </ShortMainButton>
          </KeyboardAwareScrollView>
        )}
      </ImageBackground>
    </>
  );
};
