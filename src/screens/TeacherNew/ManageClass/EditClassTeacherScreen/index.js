import * as React from 'react';
import {
  Alert,
  Image,
  ImageBackground,
  Platform,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import {AppHeader} from '../../../../componentBase/AppHeader';
import {TextBox} from '../../../../componentBase/TextBox';
import stylesApp from '../../../../styleApp/stylesApp';
import {styles} from './EditClassTeacherScreen.styles';
import moment from 'moment';
import API from '../../../../API/APIConstant';
import APIBase from '../../../../base/APIBase';
import {useEffect, useState} from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Loading from '../../../../component/LoadingScreen';
import {Colors} from '../../../../styleApp/color';
import {AppTextInput} from '../../../../componentBase/AppTextInput';
import {SelectDateModal} from '../../../../componentBase/SelectDateModal';
import {SelectImageModal} from '../../../../componentBase/SelectImageModal';
import {ShortMainButton} from '../../../../componentBase/ShortMainButton';
import {FullScreenLoadingIndicator} from '../../../../componentBase/indicator/FullScreenLoadingIndicator';
import {CommonJson} from '../../../../stringJSON';
import {TeacherTextJson} from '../../../../stringJSON/TeacherTextJson';
import {SmPopup} from '../../../../componentBase/SmPopup';
import LogBase from '../../../../base/LogBase';

/**
 * EditClassTeacherScreen Screen
 * @param {object} props props from redux and navigation
 * @returns {Component}
 */
export const EditClassTeacherScreen = props => {
  const language = useSelector(state => state.LanguageStackReducer.language);
  const data = props.navigation.getParam('data');
  const reload = props.navigation.getParam('reload');
  const delReload = props.navigation.getParam('delReload');
  //Error for date
  let [errorDate, setErrorDate] = useState('');
  //First render flag
  let [firstLoading, setFirstLoad] = useState(false);
  //Loading flag
  let [loading, setLoading] = useState(false);
  //Class type list
  let [delModal, setDelModal] = useState(false);
  //is Left Date check
  let [isLeftDate, setLeftDate] = useState(true);
  //Class name
  let [className, setName] = useState(data?.class_name || '');
  //school text
  let [school, setSchool] = useState(data?.organization_name || '');
  //start date modal visible
  let [modalStartDate, setModalStartDate] = useState(false);
  //end date modal visible
  let [modalEndDate, setModalEndDate] = useState(false);
  //start date value
  let [startDate, setStartDate] = useState(
    !!data?.start_time
      ? moment(data?.start_time, 'YYYY-MM-DD HH:mm:ss').toDate()
      : moment().toDate(),
  );
  //end date value
  let [endDate, setEndDate] = useState(
    !!data?.end_time
      ? moment(data?.end_time, 'YYYY-MM-DD HH:mm:ss').toDate()
      : moment().toDate(),
  );
  //image of class
  let [image, setImage] = useState(
    !!data?.localImg
      ? data?.localImg
      : !!data?.class_avatar
      ? {uri: API.image_base_url + data.class_avatar}
      : null,
  );
  //img picker visible
  let [imagePickerVisible, setPickerVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const checkStartDate = moment(
      moment(startDate).format('YYYY-MM-DD'),
    ).format('X');
    const checkEndDate = moment(moment(endDate).format('YYYY-MM-DD')).format(
      'X',
    );
    if (checkEndDate < checkStartDate) {
      setErrorDate('Ngày kết thúc không được nhỏ hơn ngày bắt đầu');
    } else {
      setErrorDate('');
    }
  }, [startDate, endDate]);

  /**
   * Function update class infomation
   */
  const onCreate = async () => {
    LogBase.log('=====EditClassTeacherScreen', data);
    setLoading(true);
    let url = API.baseurl + API.UpdateClass;
    let form = new FormData();
    // let start = moment(startDate).toDate().getTime();
    // let end = moment(endDate).toDate().getTime();
    // if (end < start) {
    //     setLoading(false)
    //     Alert.alert("Ngày kết thúc không được nhỏ hơn ngày bắt đầu.")
    //     return;
    // }
    form.append('class_id', data.id);
    form.append('class_name', className);
    // form.append("start_time", moment(startDate).format('YYYY-MM-DD HH:mm:ss'))
    // form.append("end_time", moment(endDate).format('YYYY-MM-DD HH:mm:ss'))
    form.append('organization_name', school ? school + '' : '');
    !!image && !!image.name && !!image.uri && form.append('file', image);
    try {
      LogBase.log('=====data req', form);
      let res = await APIBase.tokenAPIFormData('post', url, form);
      setLoading(false);
      if (!!res && !!res.data && !!res.data.class_id) {
        props.navigation.pop();
        try {
          !!reload &&
            reload({
              organization_name: school,
              class_name: className,
              start_time: moment(startDate).format('YYYY-MM-DD HH:mm:ss'),
              end_time: moment(endDate).format('YYYY-MM-DD HH:mm:ss'),
              localImg: image,
            });
        } catch (error) {}
      } else {
        setTimeout(() => {
          Alert.alert('', res.data.msg, [{text: 'OK', style: 'cancel'}]);
        }, 500);
      }
    } catch (error) {
      setLoading(false);
      setTimeout(() => {
        Alert.alert('', error, [{text: 'OK', style: 'cancel'}]);
      }, 500);
      console.log('----error', error);
    }
  };

  /**
   * Function delete class
   */
  const onDelete = async () => {
    let url = API.baseurl + API.DelClass;
    let form = new URLSearchParams();
    form.append('class_id', data.id);
    try {
      let res = await APIBase.tokenAPI('delete', url, form);
      if (!!res && !!res.data && !!res.data.class_id) {
        props.navigation.navigate('ClassListTeacherScreen');
        try {
          delReload();
        } catch (error) {
          console.log('----error', error);
        }
      } else {
        setTimeout(() => {
          Alert.alert('', res.data.msg, [{text: 'OK', style: 'cancel'}]);
        }, 500);
      }
    } catch (error) {
      setTimeout(() => {
        Alert.alert('', error, [{text: 'OK', style: 'cancel'}]);
      }, 500);
      console.log('----error', error);
    }
  };

  if (firstLoading) {
    return (
      <ImageBackground
        source={{uri: 'imagebackground'}}
        imageStyle={stylesApp.ImageBackGround}
        style={styles.loading}>
        <Loading />
      </ImageBackground>
    );
  }

  return (
    <View style={styles.container}>
      <AppHeader
        title={TeacherTextJson.EditClassTeacherScreen.Header}
        leftIconOnPress={() => {
          props.navigation.pop();
        }}
      />
      <KeyboardAwareScrollView
        style={{flex: 1}}
        onKeyboardWillShow={frames => {
          Platform.OS === 'ios' &&
            setKeyboardHeight(frames.endCoordinates.height);
        }}
        onKeyboardWillHide={frames => {
          Platform.OS === 'ios' && setKeyboardHeight(0);
        }}>
        <View style={styles.spacing} />
        <AppTextInput
          titleStyle={styles.title}
          title={
            <>
              {language.CreateClassTeacherScreen.ClassName}
              <TextBox style={styles.required}>*</TextBox>
            </>
          }
          value={className}
          placeholder={language.CreateClassTeacherScreen.EnterClass}
          onChangeText={setName}
          style={styles.inputContainer}
        />
        <View style={styles.spacing} />
        <AppTextInput
          titleStyle={styles.title}
          title={language.CreateClassTeacherScreen.SchoolName}
          value={school}
          placeholder={language.CreateClassTeacherScreen.SchoolEnter}
          onChangeText={setSchool}
          style={styles.inputContainer}
        />

        {/* <View style={[styles.row, styles.marginTop30]}>
                    <TextBox style={[styles.title, styles.titlePadding, styles.width40]}>{language.CreateClassTeacherScreen.StartDay}<TextBox style={styles.required}>*</TextBox></TextBox>
                    <View style={styles.space} />
                    <TextBox style={[styles.title, styles.titlePadding, styles.width40]}>{language.CreateClassTeacherScreen.EndDay}<TextBox style={styles.required}>*</TextBox></TextBox>
                </View> */}
        {/* <View style={[styles.row, styles.bgGreen]}>
                    <TouchableOpacity onPress={() => {
                        setModalStartDate(true)
                        setLeftDate(true)
                    }} >
                        <LinearGradient
                            style={styles.viewDate}
                            colors={[Colors.LightGreen, Colors.BaseGreen]}
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                            <TextBox style={styles.date}>{moment(startDate).format('DD/MM/YYYY')}</TextBox>
                        </LinearGradient>
                    </TouchableOpacity>
                    <Image source={{ uri: 'icon_right' }} style={styles.iconRight} />
                    <TouchableOpacity onPress={() => {
                        setModalEndDate(true)
                        setLeftDate(false)
                    }} >
                        <LinearGradient
                            style={styles.viewDate}
                            colors={[Colors._7AE1D4, Colors._7AE1D4]}
                            start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
                            <TextBox style={styles.date}>{moment(endDate).format('DD/MM/YYYY')}</TextBox>
                        </LinearGradient>
                    </TouchableOpacity>
                </View> */}
        {!!errorDate && (
          <TextBox numberOfLines={null} style={styles.errText}>
            {errorDate}
          </TextBox>
        )}
        <View style={styles.imgContainer}>
          <TextBox style={[styles.title, styles.titlePadding]}>
            {language.CreateClassTeacherScreen.Avatar}
          </TextBox>
          <TouchableOpacity
            style={styles.imgPicker}
            onPress={() => {
              setPickerVisible(true);
            }}>
            {!image ? (
              <View style={styles.imgPlaceholder}>
                <Image
                  source={{uri: 'empty_image_icon'}}
                  resizeMode="contain"
                  style={styles.imgHolderIcon}
                />
                <TextBox style={styles.addImageTxt}>
                  {language.CreateClassTeacherScreen.AddImage}
                </TextBox>
              </View>
            ) : (
              <Image
                source={image}
                resizeMode="contain"
                style={styles.choosenImage}
              />
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.btnDone}>
          <ShortMainButton
            isDisabled={!className || !!errorDate}
            onPress={onCreate}
            type={1}
            text={CommonJson.Save}
            style={styles.viewAdd}
            widthType={'full'}
          />
          <TouchableOpacity onPress={() => setDelModal(true)}>
            <TextBox numberOfLines={null} style={styles.DelClassBtn}>
              {TeacherTextJson.EditClassTeacherScreen.DeleteClass}
            </TextBox>
          </TouchableOpacity>
        </View>
      </KeyboardAwareScrollView>
      <SmPopup
        visible={delModal}
        cancelText={CommonJson.No}
        cancelOnpress={() => setDelModal(false)}
        confirmText={CommonJson.Yes}
        confirmOnpress={() => {
          setDelModal(false);
          setTimeout(onDelete, 200);
        }}>
        <TextBox numberOfLines={null} style={styles.DelClassTitle}>
          {TeacherTextJson.EditClassTeacherScreen.DeleteTitle}
        </TextBox>
        <TextBox numberOfLines={null} style={styles.DelClassMess}>
          {TeacherTextJson.EditClassTeacherScreen.DeleteMess}
        </TextBox>
      </SmPopup>

      <SelectDateModal
        rangeDate={startDate}
        isVisible={modalStartDate}
        // minimunDate={moment().toDate()}
        onSave={date => {
          if (!!date) {
            setStartDate(date);
            // setEndDate(date)
            setModalStartDate(false);
          }
        }}
        requestClose={() => {
          setModalStartDate(false);
        }}
      />
      <SelectDateModal
        rangeDate={endDate}
        isVisible={modalEndDate}
        minimunDate={startDate}
        onSave={date => {
          if (!!date) {
            setEndDate(date);
            setModalEndDate(false);
          }
        }}
        requestClose={() => {
          setModalEndDate(false);
        }}
      />
      <SelectImageModal
        visible={imagePickerVisible}
        onDone={setImage}
        onCancel={() => {
          setPickerVisible(false);
        }}
      />
      <FullScreenLoadingIndicator visible={loading} />
    </View>
  );
};
