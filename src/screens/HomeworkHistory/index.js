import React, {memo, useCallback} from 'react';
import {useEffect} from 'react';
import {FlatList, ImageBackground, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import ItemHistory from '../../componentBase/HomeworkHistory/ItemHistory';
import Topic from '../../componentBase/HomeworkHistory/Topic';
import {useStyleHomeworkHistory} from './styles';
import {loadHistoryExercises, loadHistoryMasterUnitExercises} from './../../ReduxStudent/actions/Student';
import {mapperHomeworkExcercises} from '../../utils/student.helper';
import {useMemo} from 'react';
import Loading from '../../component/LoadingScreenFull';
import stylesApp from '../../styleApp/stylesApp';
import {stylesHistory} from '../Student/StudyForTest/styles';
import {useState} from 'react';
import {AppHeader} from '../../componentBase/AppHeader';

const _HomeworkHistory = ({navigation}) => {
  
  // todo: lấy lesson hiện tại
  const {lesson, class_id} = navigation.state.params;

  // todo: lấy các bài tập đã làm, dữ liệu bài học
  const {homeworkExercises, lessonData} = useSelector(
    (state) => state.LoadAPISkillUnitHV,
  );
  // todo: map dữ liệu từ api để view lên UI
  const homeworks = useMemo(() => {
    return mapperHomeworkExcercises(homeworkExercises, lesson.lesson_type);
  }, [homeworkExercises]);

  // todo: style màn hình này
  const styles = useStyleHomeworkHistory();
  const dispatch = useDispatch();

  // todo: loading khi call api
  const [isLoading, setIsLoading] = useState(true);

  // todo: quay lại màn hình trước
  const onBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  // todo: render bài tập vê nhà
  const renderItem = useCallback(
    ({item, index}) => {
      const isFirst = index === 0;
      const isLast = index === homeworks.length - 1;
      // console.log("=====renderItem: ",item)
      return <ItemHistory {...{item, index, isFirst, isLast, navigation}} />;
    },
    [homeworks.length, navigation],
  );

  // todo: load bài tập về nhà
  const _loadHistoryExercises = useCallback(async () => {
    console.log("=====_loadHistoryExercises",lesson)
    try {
      setIsLoading(true);
      if(lesson.isMasterUnit){
        await dispatch(loadHistoryMasterUnitExercises(lesson));
      }else{
        await dispatch(loadHistoryExercises(lesson.lesson_id, lesson.lesson_type, class_id));
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, lesson.lesson_id]);

  // todo: load bài tập về nhà
  useEffect(() => {
    _loadHistoryExercises();
  }, [_loadHistoryExercises]);

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.container} source={{uri: 'bgmap'}}>
        <AppHeader
          title={'Lịch sử làm bài'}
          leftIconOnPress={onBack}
          styleTitle={styles.titleHeader}
        />
        {isLoading ? <Loading/> :
        <>
          <Topic topic={lessonData?.topic} name={lessonData?.name} />
          <FlatList
            showsVerticalScrollIndicator={false}
            style={styles.list}
            data={homeworks}
            {...{renderItem}}
          />
        </>}
      </ImageBackground>
    </View>
  );
};

export default memo(_HomeworkHistory);
