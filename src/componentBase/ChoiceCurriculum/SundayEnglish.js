import React, {useCallback, useState} from 'react';
import {useEffect} from 'react';
import {useMemo} from 'react';
import {memo} from 'react';
import {FlatList, ImageBackground, View} from 'react-native';
import {useDispatch} from 'react-redux';
import {useSelector} from 'react-redux';
import {mapCurriculumCourses} from '../../utils/teacher.helper';
import CurriculumItem from './CurriculumItem';
import {useStyleChoiceCurriculum} from './styles';
import Types from './../../redux/types';
import {BACKGROUND} from '../../assets/icon';
const _SundayEnglish = ({navigation}) => {
  //todo: style của màn này
  const styles = useStyleChoiceCurriculum();
  //todo: lấy ra giáo trình đc chọn
  const [favorites, setFavorite] = useState([]);
  //todo: lấy ra giáo trình của sunday
  const {curriculumCourseSunday, choicedCurriculum} = useSelector(
    (state) => state.FavoriteCurriculumReducer,
  );
  const dispatch = useDispatch();

  //todo: map dữ liệu từ  api để đổ lên UI
  const courses = useMemo(() => {
    return mapCurriculumCourses(curriculumCourseSunday);
  }, [curriculumCourseSunday]);

  //todo: render giáo trình
  const renderItem = useCallback(
    ({item, index}) => {
      const isFirst = index === 0;
      const isLast = index === courses.length - 1;
      const isFavorite = favorites.includes(item);
      const onPress = () => {
        setFavorite((favoriteItems) => {
          console.log('favoriteItems', favoriteItems);

          const favorite = favoriteItems.includes(item);

          // todo: đẩy giáo trình đc chọn vào store
          if (favorite) {
            const result = favoriteItems.filter((title) => title !== item);
            dispatch({
              type: Types.CHOICE_CURRICULUM_COURSE,
              data: {
                choicedCurriculum: result,
              },
            });
            return result;
          } else {
            dispatch({
              type: Types.CHOICE_CURRICULUM_COURSE,
              data: {
                choicedCurriculum: [item],
              },
            });
            return [item];
          }
        });
      };
      return (
        <CurriculumItem
          {...{
            item,
            index,
            isFirst,
            isLast,
            isFavorite,
            onPress,
            hasDelete: false,
            hasCreateAt: false,
          }}
        />
      );
    },
    [courses.length, dispatch, favorites],
  );

  // todo: footer của list
  const ListFooterComponent = useCallback(() => {
    return <View style={styles.footer} />;
  }, [styles.footer]);

  useEffect(() => {
    if (
      choicedCurriculum.length &&
      choicedCurriculum[0]?.id !== favorites[0]?.id
    ) {
      setFavorite([]);
    }
  }, [choicedCurriculum]);

  return (
    <ImageBackground style={styles.container} source={BACKGROUND}>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={styles.list}
        data={courses}
        {...{renderItem}}
        extraData={favorites}
      />
    </ImageBackground>
  );
};

export default memo(_SundayEnglish);
