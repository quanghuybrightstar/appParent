import React, {useEffect, useMemo, useRef, useState} from 'react';
import {useCallback} from 'react';
import {memo} from 'react';
import {Alert, Image, ImageBackground} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {Text, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useDispatch} from 'react-redux';
import {BG_2} from '../../../../assets/icon';
import Loading from '../../../../component/LoadingScreenFull';
import {AppHeader} from '../../../../componentBase/AppHeader';
import CurriculumItem from '../../../../componentBase/ChoiceCurriculum/CurriculumItem';
import {ShortMainButton} from '../../../../componentBase/ShortMainButton';
import {SmPopup} from '../../../../componentBase/SmPopup';
import {dispatchGetClassDetail} from '../../../../redux/actions/FavoriteCurriculum';
import stylesApp from '../../../../styleApp/stylesApp';
import {alertError, formatDate} from '../../../../utils';
import {stylesHistory} from '../../../Student/StudyForTest/styles';
import {useStyleCurriculumClass} from './styles';

const _CurriculumClassTeacherScreen = ({navigation}) => {
  // class detail cũ
  const {classInfo, delReload} = navigation.state.params;
  const dispatch = useDispatch();
  const curriculumRef = useRef();
  // chứa thông tin class lấy từ API
  const [classDetail, setClassDetail] = useState();
  // loading khi call api
  const [isLoading, setIsLoading] = useState(true);
  // show confirm delete khi ấn vào button xoá
  const [isDelete, setIsDelete] = useState(false);

  // style màn hình này
  const styles = useStyleCurriculumClass();

  // quay lại màn hình trước và truyền thông tin class mới nhất sang
  const onBack = useCallback(() => {
    classDetail &&
      navigation.navigate('ClassDetailTeacherScreen', {
        changeData: classDetail,
      });
    try {
        delReload()
    } catch (error) {
        console.log("----error", error);
    }
  }, [classDetail, navigation]);

  // show confirm delete
  const showDelete = useCallback(() => {
    setIsDelete(true);
  }, []);

  // hide confirm delete
  const cancelDelete = useCallback(() => {
    setIsDelete(false);
  }, []);

  // đi sang màn hình thêm hoặc thay giáo trình
  const onAddCurriculum = useCallback(() => {
    navigation.navigate('ChoiceCurriculum', {isAdd: true, classDetail});
  }, [classDetail, navigation]);

  // đi sang màn hình thêm hoặc thay giáo trình
  const onChangCurriculum = useCallback(() => {
    navigation.navigate('ChoiceCurriculum', {isAdd: false, classDetail});
  }, [classDetail, navigation]);

  // render nút thêm mới giáo trình
  const renderEmptyCurriculum = useCallback(() => {
    return (
      <TouchableOpacity onPress={onAddCurriculum}>
        <LinearGradient
          colors={['#fff', '#00E2A0', '#fff']}
          style={styles.btnContainer}
          start={{x: -1.5, y: 2}}
          end={{x: 6.5, y: 0}}>
          <Image source={{uri: 'wr4'}} style={styles.imgLogo} />
          <Text allowFontScaling={false} style={styles.txtButton}>
            Thêm giáo trình
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    );
  }, [onAddCurriculum, styles.btnContainer, styles.imgLogo, styles.txtButton]);

  // render giáo trình
  const renderCurriculum = useCallback(() => {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <CurriculumItem
            ref={curriculumRef}
            {...{
              item: {
                id: classDetail?.curriculum_id,
                name: classDetail?.curriculum_name,
                grade: classDetail?.grade,
                unitAmount: classDetail?.curriculum_unit,
                createAt: formatDate(classDetail?.curriculum_assign),
              },
              index: 0,
              isFirst: true,
              isLast: false,
              hasIcon: false,
              hasDelete: true,
              classDetail,
              showDelete,
              cancelDelete,
              getClassDetail,
              setClassDetail,
            }}
          />
        </View>
        <ShortMainButton
          onPress={onChangCurriculum}
          type={1}
          text={'Thay giáo trình'}
          style={styles.buttonAdd}
          textStyles={styles.buttonText}
        />
      </View>
    );
  }, [
    cancelDelete,
    classDetail,
    getClassDetail,
    onChangCurriculum,
    showDelete,
    styles.buttonAdd,
    styles.buttonText,
    styles.container,
    styles.content,
  ]);

  // call api get class detail
  const getClassDetail = useCallback(async () => {
    setIsLoading(true);
    try {
      console.log('-----> check here 1111')
      const result = await dispatch(dispatchGetClassDetail(classInfo.id));
      console.log("🚀 ~ file: index.js ~ line 136 ~ getClassDetail ~ result", result)
      setClassDetail(result);
      console.log('-----> check here')
    } catch (error) {
      alertError();
    } finally {
      setIsLoading(false);
    }
  }, [classInfo.id, dispatch]);

  // nếu curriculum_id = null thì là ko có giáo trình
  const checkEmptyCurriculum = useMemo(() => {
    return !Number(classDetail?.curriculum_id);
  }, [classDetail?.curriculum_id]);

  // nếu curriculum_id != null thì là có giáo trình
  const checkHasCurriculum = useMemo(() => {
    return !!Number(classDetail?.curriculum_id);
  }, [classDetail?.curriculum_id]);

useEffect(()=> {
  getClassDetail();
}, [])

  // lắng nghe khi vào màn hình này
  useEffect(() => {
    const unsubscribe = navigation.addListener('willFocus', () => {
      // do something
      getClassDetail();
    });
    return () => {
      unsubscribe.remove();
    };
  }, [getClassDetail, navigation]);

  const deleteCu = async () => {
    setIsLoading(true)
    curriculumRef?.current?.onDelete()
  }

  return (
    <ImageBackground source={BG_2} style={styles.container}>
        <>
          <AppHeader
            styleTitle={styles.titleHeader}
            title={classInfo?.class_name}
            leftIconOnPress={onBack}
          />
          {isLoading ? <Loading /> : <>
            {checkEmptyCurriculum && renderEmptyCurriculum()}
            {checkHasCurriculum && renderCurriculum()}
          </>}
          <SmPopup
            visible={isDelete}
            confirmText={'Có'}
            confirmOnpress={()=>deleteCu()}
            message={'Bạn có chắc chắn muốn xoá Giáo trình của lớp?'}
            cancelText={'Không'}
            cancelOnpress={cancelDelete}
          />
        </>
    </ImageBackground>
  );
};

export default memo(_CurriculumClassTeacherScreen);
