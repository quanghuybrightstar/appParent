import * as React from 'react';
import {useEffect, useState, useCallback} from 'react';
import {
  Image,
  View,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Platform,
} from 'react-native';
import {TabView, TabBar, TabBarItem} from 'react-native-tab-view';
import LinearGradient from 'react-native-linear-gradient';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import {AppHeader} from '../../../../componentBase/AppHeader';
import {styles} from './MarkScreen.styles';
import {CLOCK} from '../../../../assets/image';
import {Colors} from '../../../../styleApp/color';
import API from '../../../../API/APIConstant';
import APIBase from '../../../../base/APIBase';
import moment from 'moment';
import Loading from '../../../../component/LoadingScreenFull';
import {BG_2, EMPTY_IMG} from '../../../../assets/icon';
import {TextBox} from '../../../../componentBase/TextBox';
import {useDispatch, useSelector} from 'react-redux';
import {setReload} from '../../../../redux/actions/Filter';
import FontBase from '../../../../base/FontBase';
import stringUtils from '../../../../utils/stringUtils';
import LogBase from '../../../../base/LogBase';

const smartScreenWidth = SmartScreenBase.smPercenWidth;
export const MarkDetailScreen = (props) => {
  const dispatch = useDispatch();
  //Lưu danh sách dữ liệu
  const [list, setList] = useState(null);
  //Hiển thị loading
  const [loading, setLoading] = useState(false);
  //Lưu index của tab
  const [index, setIndex] = useState(0);

  //Kiểm tra xem có reload hay không
  const {reload} = useSelector((state) => state.FilterReducer);

  let item = props.navigation.getParam('item');

  const TAB = React.useMemo(
    () => [
      {key: 'first', title: `ĐÃ CHẤM (${list?.total_mark || 0})`},
      {
        key: 'second',
        title: `CHƯA CHẤM (${list?.total_not_mark || 0})`,
      },
    ],
    [list?.total_mark, list?.total_not_mark],
  );

  //console.log('props', props);
  // console.log(
  //   '🚀 ~ file: index.js ~ line 32 ~ ClassDetailTeacherScreen ~ item',
  //   item,
  // );

  //Lấy dữ liệu
  const getData = useCallback(async () => {
    setLoading(true);
    const url = `${
      API.baseurl +
      API.getDetailsExerciseClass(item.class_id, item.exercise_id, item.library)
    }`;
    try {
      let exercises = await APIBase.tokenAPI('get', url);
      setList(exercises.data);
      console.log("=====getData",exercises.data)
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoading(false);
    }
  }, [item.class_id, item.exercise_id, item.library]);

  //Kiểm tra nếu biến reload = true thì reload lại dữ liệu
  useEffect(() => {
    console.log("=====reload",reload)
    if (reload) {
      setIndex(0)
      getData();
    }
  }, [getData, reload]);

  //chạy lần đầu để lấy dữ liệu từ api
  useEffect(() => {
    getData();
  }, [getData]);

  //Hiển thị mỗi tiêu đề của tab
  const renderTabBarItem = useCallback(
    (props) => {
      //console.log('props', props);
      let bold =
        props.key === TAB[index].key
          ? {
              fontFamily: FontBase.MyriadPro_Bold,
            }
          : {fontFamily: FontBase.MyriadPro_Regular};
      let border = props.key === TAB[index].key ? 0 : 1;
      function renderLabel({route, focused, color}) {
        return (
          <TextBox style={[color, styles.labelStyle, bold]}>
            {route.title}
          </TextBox>
        );
      }
      return (
        <TabBarItem
          {...props}
          style={{borderBottomWidth: border, borderBottomColor: Colors.Gray}}
          labelStyle={[bold, styles.labelStyle]}
          renderLabel={renderLabel}
        />
      );
    },
    [TAB, index],
  );

  //Hiển thị tiêu đề của tab
  const renderTabBar = useCallback(
    (props) => {
      //console.log('props', props);
      return (
        <TabBar
          {...props}
          style={[styles.tabBarContainer]}
          renderTabBarItem={renderTabBarItem}
          indicatorStyle={styles.tabBar}
          activeColor={'#414141'}
          inactiveColor={'#414141'}
        />
      );
    },
    [renderTabBarItem],
  );

  //modify dữ liệu tab đầu tiên
  const dataFirst = React.useMemo(() => {
    const data = list?.data?.filter((item) => {
      if (index === 0 && item?.status && +item?.status) {
        return item;
      }
    });
    console.log('dataFirst', data);
    return data;
  }, [index, list?.data]);

  //modify dữ liệu tab thứ 2
  const dataSecond = React.useMemo(() => {
    const data = list?.data?.filter((item) => {
      if (index === 1 && item?.status && !+item?.status) {
        return item;
      }
    });
    console.log('dataSecond', data);
    return data;
  }, [index, list?.data]);

  //Hiển thị giao diện tương ứng mỗi item
  const renderItem = useCallback(
    ({item}) => {
      // console.log("==========renderItem",item)
      const timeSubmit = moment(item?.create_submit_time).format(
        'HH:mm, DD/MM/YYYY',
      );
      const avatar = {uri: API.domain + item?.to_avatar};
      function onPressItem() {
        if (item.exercise_type == 'writing') {
          props.navigation.navigate('MarkWrittingScreen', {
            item: {
              ...item,
            },
            isTeacher: true
          });
          dispatch(setReload(false));
        } else {
          props.navigation.navigate('MarkProjectScreen', {
            item: {
              ...item,
            },
          });
          dispatch(setReload(false));
        }
      }
      return (
        <TouchableOpacity
          onPress={onPressItem}
          style={{
            marginBottom: smartScreenWidth * 5,
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.15,
            shadowRadius: 3.84,
            elevation: 2,
          }}>
          <View style={styles.itemContainer}>
            <View
              style={[
                styles.avatarContainer,
                {
                  borderColor: index === 0 ? Colors.BaseGreen : Colors.Gray,
                  overflow: 'hidden',
                },
              ]}>
              <Image source={avatar} style={styles.avatar} />
            </View>
            <View style={styles.detailContainer}>
              <View
                style={{width: '80%', height: SmartScreenBase.smPercenWidth*12}}>
                <TextBox numberOfLines={2} style={styles.name}>{item?.to_fullname || ''}</TextBox>
              </View>
              <View style={styles.submitContainer}>
                <Image source={CLOCK} style={styles.clock} />
                <TextBox style={styles.time}>Nộp bài: {timeSubmit}</TextBox>
              </View>
            </View>
          </View>
          {index === 0 ? (
            <LinearGradient
              colors={[Colors.LightGreen, Colors.BaseGreen]}
              start={{x: 0.2, y: 0.2}}
              style={styles.pointContainer}
              end={{x: 1, y: 0.2}}>
              <TextBox style={styles.score}>
                {item?.score}{' '}
              </TextBox>
              <TextBox style={styles.score2}>đ</TextBox>
            </LinearGradient>
          ) : (
            <View />
          )}
        </TouchableOpacity>
      );
    },
    [dispatch, index, props.navigation],
  );

  //Hiển thị giao diện tab đầu tiên khi dữ liệu bị trống
  const renderEmptyComponent = useCallback(() => {
    return (
      <View style={styles.emptyContainer}>
        <Image
          source={EMPTY_IMG}
          style={styles.emptyImage}
          resizeMode="contain"
        />
        <TextBox
          style={[
            styles.emptyText,
          ]}
          numberOfLines={3}>
          Chưa có bài nào được chấm.
        </TextBox>
      </View>
    );
  }, []);

  //Hiển thị giao diện tab thứ 2 khi dữ liệu bị trống
  const renderEmptyComponentSecond = useCallback(() => {
    return (
      <View style={styles.emptyContainer}>
        <Image
          source={EMPTY_IMG}
          style={styles.emptyImage}
          resizeMode="contain"
        />
        <TextBox
          style={[
            styles.emptyText,
          ]}
          numberOfLines={3}>
          Tuyệt vời! Đã hết bài cần chấm!
        </TextBox>
      </View>
    );
  }, []);

  //Hiển thị giao diện các tab
  const renderScene = useCallback(
    ({route}) => {
      switch (route.key) {
        case 'first':
          return (
            <FlatList
              renderItem={renderItem}
              data={dataFirst}
              contentContainerStyle={{
                paddingTop: smartScreenWidth * 5,
                paddingBottom: smartScreenWidth,
              }}
              ListEmptyComponent={renderEmptyComponent}
            />
          );
        case 'second':
          return (
            <FlatList
              renderItem={renderItem}
              data={dataSecond}
              contentContainerStyle={{
                paddingTop: smartScreenWidth * 5,
                paddingBottom: smartScreenWidth,
              }}
              ListEmptyComponent={renderEmptyComponentSecond}
            />
          );
        default:
          return null;
      }
    },
    [
      dataFirst,
      dataSecond,
      renderEmptyComponent,
      renderEmptyComponentSecond,
      renderItem,
    ],
  );
  console.log(
    'list?.min_score',
    +list?.min_score >= 0
      ? list?.min_score.length > 2
        ? parseFloat(list?.min_score?.toString().replace(',', '.')).toFixed(2)
        : parseInt(list?.min_score?.toString().replace(',', '.'), 10)
      : 0.0,
  );
  //Hiển thị giao diện điểm min, max
  const _renderMarked = () => {
    return (
      <View style={styles.markedContainer}>
        <View style={styles.maxScore}>
          <TextBox style={styles.score4}>Điểm cao nhất: </TextBox>
          <TextBox style={styles.score3}>
            {
              stringUtils.roundOne(list?.max_score)
            }
          </TextBox>
        </View>
        <View style={styles.barie} />
        <View style={styles.maxScore}>
          <TextBox style={styles.score4}>Điểm thấp nhất: </TextBox>
          <TextBox style={styles.score3}>
            {stringUtils.roundOne(list?.min_score)}
          </TextBox>
        </View>
      </View>
    );
  };

  //Quay lại màn hình trước
  const goBack = useCallback(() => {
    dispatch(setReload(false));
    props.navigation.pop();
  }, [dispatch, props.navigation]);

  return (
    <ImageBackground source={BG_2} style={{width: '100%', height: '100%'}}>
      <AppHeader
        title={item.exercise_name}
        leftIconOnPress={goBack}
        styleTitle={styles.title}
      />

      {loading ? (
        <Loading />
      ) : (
        <>
          <TabView
            navigationState={{index, routes: TAB}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            renderTabBar={renderTabBar}
            style={{
              shadowOffset: {height: 0, width: 0},
              shadowColor: 'transparent',
              shadowOpacity: 0,
              elevation: 0,
            }}
          />
          {index === 0 && list?.total_mark > 0 && _renderMarked()}
        </>
      )}
    </ImageBackground>
  );
};
