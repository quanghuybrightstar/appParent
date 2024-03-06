import React from 'react';
import {useCallback} from 'react';
import {memo} from 'react';
import {Text, View} from 'react-native';
import {AppHeader} from '../../../../componentBase/AppHeader';
import {useStyleChoiceCurriculum} from './styles';
import {TabView, SceneMap, TabBar, TabBarItem} from 'react-native-tab-view';
import {useWindowDimensions} from 'react-native';
import {ImageBackground} from 'react-native';
import SundayEnglish from '../../../../componentBase/ChoiceCurriculum/SundayEnglish';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {
  dispatchChangeCurriculum,
  getCurriculumCoursesPersonal,
  getCurriculumCoursesSunday,
} from '../../../../redux/actions/FavoriteCurriculum';
import {ActionLogin} from '../../../../redux/actions/ActionLogin';
import {Alert} from 'react-native';
import Personal from '../../../../componentBase/ChoiceCurriculum/Personal';
import {useSelector} from 'react-redux';
import {useState} from 'react';
import {alertError} from '../../../../utils';
import {BACKGROUND, BG} from '../../../../assets/icon';
import {Colors} from '../../../../styleApp/color';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import {MyButton} from '../../../../componentBase/Button';
import FontBase from '../../../../base/FontBase';
import {FontSize} from '../../../../styleApp/font';
import Loading from '../../../../component/LoadingScreenFull';
import Types from '../../../../redux/types';

const _ChoiceCurriculum = ({navigation}) => {
  // todo: isAdd check có là thêm hay thay giáo trình, classDetail thông tin giáo trình
  const {isAdd, classDetail} = navigation.state.params;
  // todo: style màn hình này
  const styles = useStyleChoiceCurriculum();
  // todo: loading khi call api
  const [isLoading, setIsLoading] = useState(false);
  // todo: chứa tab index đang focus
  const [index, setIndex] = React.useState(0);
  // todo: nếu đã chọn giáo trình thì nút sẽ sáng lên
  const [isChange, setIsChange] = React.useState(false);
  const layout = useWindowDimensions();
  // todo: các tab
  const [routes] = React.useState([
    {key: 'first', title: 'SUNDAY ENGLISH'},
    {key: 'second', title: 'CÁ NHÂN'},
  ]);
  // todo: chứa giáo trình đã chọn
  const {choicedCurriculum} = useSelector(
    (state) => state.FavoriteCurriculumReducer,
  );
  // console.log(
  //   '🛠 LOG: 🚀 --> --------------------------------------------------------------------------------',
  // );
  // console.log(
  //   '🛠 LOG: 🚀 --> ~ file: index.js ~ line 34 ~ choicedCurriculum',
  //   choicedCurriculum,
  //   classDetail,
  // );
  // console.log(
  //   '🛠 LOG: 🚀 --> --------------------------------------------------------------------------------',
  // );

  const dispatch = useDispatch();

  // todo: quay lại màn hình trước
  const onBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  // todo: render tab sunday english
  const renderFirstRoute = useCallback(() => {
    console.log("=====courses 1")
    return <SundayEnglish />;
  }, []);

  // todo: render tab personal
  const renderSecondRoute = useCallback(() => {
    console.log("=====courses 2")
    return <Personal />;
  }, []);

  const renderScene = SceneMap({
    first: renderFirstRoute,
    second: renderSecondRoute,
  });

  // todo: custom tabbar
  const renderTabBarItem = useCallback(
    (props) => {
      let bold =
        props.key === routes[index].key
          ? {
              fontFamily: FontBase.MyriadPro_Bold,
            }
          : {fontFamily: FontBase.MyriadPro_Regular};
      let border = props.key === routes[index].key ? 0 : 1;
      return (
        <TabBarItem
          {...props}
          style={{borderBottomWidth: border, borderBottomColor: Colors.Gray}}
          labelStyle={[bold, styles.labelStyle]}
          renderLabel={({route, focused, color}) => {
            //console.log('props', props);
            return (
              <Text
                allowFontScaling={false}
                style={[
                  color,
                  bold,
                  styles.labelStyle,
                  {
                    fontSize: FontSize.size50Font,
                    marginVertical: SmartScreenBase.smBaseHeight * 5,
                  },
                ]}>
                {route.title}
              </Text>
            );
          }}
        />
      );
    },
    [routes, index, styles.labelStyle],
  );

  // todo: render tabbar
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      style={{
        shadowOffset: {height: 0, width: 0},
        shadowColor: 'transparent',
        shadowOpacity: 0,
        elevation: 0,
        backgroundColor: 'transparent',
        marginHorizontal: SmartScreenBase.smPercenHeight * 2,
      }}
      {...{renderTabBarItem}}
      indicatorStyle={{backgroundColor: Colors.Orange}}
      tabStyle={{borderBottomWidth: 1, borderColor: Colors.DarkGray}}
      activeColor={'#414141'}
      inactiveColor={'#414141'}
    />
  );

  // todo: call api thay hoặc thêm giáo trình
  const onAddCurriculum = useCallback(async () => {
    try {
      setIsChange(true);
      setIsLoading(true);
      await dispatch(
        dispatchChangeCurriculum(classDetail?.id, choicedCurriculum[0]?.id),
      );
    } catch (error) {
      alertError();
    } finally {
      navigation.goBack();
      setIsChange(false);
      setIsLoading(false);
    }
  }, [choicedCurriculum, classDetail?.id, dispatch, navigation]);

  // todo: nếu api unauthen thì logout
  const onLogOut = useCallback(() => {
    Alert.alert(
      'Đăng xuất',
      'Phiên đăng nhập hết hạn! Bạn có muốn đăng xuất tài khoản không?',
      [
        {
          text: 'Hủy',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Đồng ý',
          onPress: async () => {
            dispatch(ActionLogin({}));
            navigation.navigate('LoginApp');
          },
        },
      ],
      {cancelable: false},
    );
  }, [dispatch, navigation]);

  // todo: get về các giáo trình sẽ đc lựa chọn
  const getCurriculums = useCallback(async () => {
    try {
      setIsLoading(true);
      const result = await dispatch(getCurriculumCoursesSunday('sunday'));
      if (result.logout) {
        onLogOut();
      }
      await dispatch(getCurriculumCoursesPersonal('personal'));
    } catch (error) {
      alertError();
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, onLogOut]);

  // todo: lấy giáo trình
  useEffect(() => {
    getCurriculums();
    return () => {
      dispatch({
        type: Types.CHOICE_CURRICULUM_COURSE,
        data: {
          choicedCurriculum: [],
        },
      });
    };
  }, [getCurriculums, dispatch]);

  return (
    <>
      <AppHeader
        styleTitle={styles.titleHeader}
        title={'Chọn giáo trình'}
        leftIconOnPress={onBack}
      />
      {isLoading ? (
        <Loading />
      ) : (
        <View style={styles.container}>
          <ImageBackground style={styles.container} source={BACKGROUND}>
            <>
            {console.log("=====ngoai")}
              <TabView
                navigationState={{index, routes}}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{width: layout.width}}
                {...{renderTabBar}}
              />
              <MyButton
                hasBackground
                style={styles.buttonAddContainer}
                text={isAdd ? 'Thêm' : 'Thay'}
                textStyles={styles.textSty}
                isDisabled={!choicedCurriculum.length || isChange}
                onPress={onAddCurriculum}
              />
            </>
          </ImageBackground>
        </View>
      )}
    </>
  );
};

export default memo(_ChoiceCurriculum);
