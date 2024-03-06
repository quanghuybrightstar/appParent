import * as React from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  Image,
  Platform,
  ImageBackground,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Modal,
  Alert,
} from 'react-native';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import API from '../../../../API/APIConstant';
import apiBase from '../../../../base/APIBase';

import FontBase from '../../../../base/FontBase';
import MyData from '../../../../component/MyData';
import {Colors} from '../../../../styleApp/color';
import {TextBox} from '../../../../componentBase/TextBox';
import styles from './ManageListScore.style';
import {AppHeader} from '../../../../componentBase/AppHeader';
import {manageListScoreLogic} from './ManageListScore.logic';
import ModalFilter from '../../../Teacher/StudyGuide/ModalFilter';
import LinearGradient from 'react-native-linear-gradient';
import stylesApp from '../../../../styleApp/stylesApp';
import {star_rank_icon, increase_white_avg_icon} from '../../../../assets/icon';
import {useSelector} from 'react-redux';

export const ManageListScore = props => {
  let {
    visibleModalFilter,
    history,
    handleModalFilter,
    dataGrade,
    dataType,
    dataSkill,
    isFiltered,
    _isByFilter,
    _cancelModalFilter,
    _handleFilter,
    _handleDeleteFilter,
    _handleItem,
    loading,
    setLoading,
  } = manageListScoreLogic(props);

  const {navigation} = props;

  const {typeAvg, title} = navigation.state.params;
  const itemChoice = navigation.getParam('item');
  const [curIndex, setCurIndex] = React.useState(0);
  const [items, setItems] = React.useState([]);
  const childSelected = useSelector(
    state => state.ManageChildrenReducer.childSelected,
  );

  React.useEffect(() => {
    console.log('=====useEffect MyData.isDoneExe = ', MyData.isDoneExe);
    if (MyData.isDoneExe) {
      console.log('=====MyData.isDoneExe = ', MyData.isDoneExe);
      setCurIndex(1);
      MyData.isDoneExe = false;
    }
  }, [MyData.isDoneExe]);

  const checkUrlGetData = () => {
    return typeAvg == 'exam' ? 1 : 0;
  };

  const getData = isDone => {
    console.log('=====homework_by_teacher getData');
    if (itemChoice?.type === 'cu') {
    } else {
      setLoading(true);
      apiBase
        .postDataJson(
          'get',
          `${API.baseurl}${API.listExerciseMarked}?student_id=${
            childSelected?.id
          }&type=${checkUrlGetData()}`,
        )
        .then(r => {
          console.log('r========', r?.data);
          if (r.data.status) {
            // console.log('=====homework_by_teacher', r.data);
            // r.data.data.forEach(element => {
            //   if (element.exercise_type == 'pronunciation')
            //     console.log('=====logMinitest', element);
            // });
            // const d = [];
            // r.data.data.forEach(e => {
            //   if (!e.lesson_type) e.lesson_type = e.exercise_type;
            //   if (!e.lesson_name) e.lesson_name = e.exercise_name;
            //   e.myStatus = 1;
            //   d.push(e);
            // });
            // r.data.data.forEach(e => {
            //   if (!e.lesson_type) e.lesson_type = e.exercise_type;
            //   if (!e.lesson_name) e.lesson_name = e.exercise_name;
            //   e.myStatus = 0;
            //   d.push(e);
            // });

            setItems(r.data.data); // nhớ sửa lại
          } else Alert.alert(r.data.msg);
          setLoading(false);
        })
        .catch(e => {
          setLoading(false);
          console.log(e);
        });
    }
  };

  React.useEffect(() => {
    MyData.isDoneExe = false;
    childSelected?.id && getData();
  }, []);

  const AdjustLabel = ({fontSize, text, style, numberOfLines}) => {
    const [currentFont, setCurrentFont] = React.useState(fontSize);

    return (
      <Text
        numberOfLines={numberOfLines}
        adjustsFontSizeToFit
        style={[style, {fontSize: currentFont}]}
        onTextLayout={e => {
          const {lines} = e.nativeEvent;
          if (lines.length > numberOfLines) {
            setCurrentFont(currentFont - 1);
          }
        }}>
        {text}
      </Text>
    );
  };

  const getDealine = s => {
    if (!s) return s;
    return s.split(' ')[0]?.split('-').reverse().join('/');
  };
  const getColor = s => {
    switch (s) {
      case 'easy':
        return '#6cc049';
      case 'hard':
        return '#ba202a';
      default:
        return '#f6b145';
    }
  };
  const checkDead = s => {
    if (!s) return false;
    var now = new Date();
    var d = s.split('/');
    var dd = new Date(parseInt(d[2]), parseInt(d[1]) - 1, parseInt(d[0]));
    var noww = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    return noww > dd;
  };
  const convertTime = s => {
    if (!s) return s;
    var dd = s.split(' ');
    return `${dd[1].substr(0, 5)} ${dd[0].split('-').reverse().join('/')}`;
  };
  const AnItem = ({onPress, item, setRemind}) => {
    const dead = getDealine(item.deadline);
    const idDead = checkDead(dead);

    return (
      <TouchableOpacity style={styles.item}>
        <View style={{marginRight: SmartScreenBase.smPercenWidth * 2}}>
          <Image
            style={{
              width: SmartScreenBase.smPercenWidth * 18,
              height: SmartScreenBase.smPercenWidth * 18,
              resizeMode: 'contain',
            }}
            source={{uri: 'history_' + item.exercise_type}}
          />
        </View>
        <View style={{flex: 1, paddingTop: 2}}>
          <View
            style={{
              borderRadius: 10,
              flexDirection: 'row',
              flexWrap: 'wrap',
              marginBottom: SmartScreenBase.smPercenHeight,
              alignItems: 'center',
            }}>
            <View
              style={{
                backgroundColor: getColor(item.level?.toLowerCase()),
                borderRadius: 6,
                paddingHorizontal: 5,
                justifyContent: 'center',
                marginRight: SmartScreenBase.smPercenWidth,
              }}>
              <Text
                style={{
                  fontSize: SmartScreenBase.smFontSize * 50,
                  color: '#fff',
                  fontFamily: FontBase.MyriadPro_Bold,
                }}>
                {item.level?.toLowerCase() === 'normal' ? 'medium' : item.level}
              </Text>
            </View>
            {!!item.topic &&
              item.topic.split(' ').map((e, i) => {
                return (
                  <Text style={styles.topic} key={i}>
                    {e}{' '}
                  </Text>
                );
              })}
          </View>
          <Text style={styles.name}>{item.lesson_name}</Text>
          <View
            style={{
              flexDirection: 'row',
              marginTop: SmartScreenBase.smPercenHeight,
              justifyContent: 'space-between',
            }}>
            <>
              <View
                style={{
                  // flex:1,
                  borderWidth: 1,
                  borderColor: 'orange',
                  borderRadius: 20,
                  paddingHorizontal: 8,
                  alignItems: 'center',
                  // marginRight:20
                }}>
                <AdjustLabel
                  text={`Đã nộp: ${convertTime(item.utilize_end_time)}`}
                  numberOfLines={1}
                  fontSize={SmartScreenBase.smFontSize * 40}
                  style={{
                    fontFamily: FontBase.MyriadPro_Bold,
                    color: 'orange',
                  }}
                />
              </View>
              <View
                style={{
                  backgroundColor: item.status == 1 ? '#84c041' : Colors.Orange,
                  borderRadius: 20,
                  paddingHorizontal: 8,
                  // minWidth:SmartScreenBase.smPercenWidth*20,
                  alignItems: 'center',
                  marginLeft: 4,
                }}>
                <AdjustLabel
                  text={item.status == 1 ? item.score + ' điểm' : 'Chờ chấm'}
                  numberOfLines={1}
                  fontSize={SmartScreenBase.smFontSize * 40}
                  style={{
                    fontFamily: FontBase.MyriadPro_Bold,
                    color: '#fff',
                  }}
                />
              </View>
            </>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const ATab = ({data, onPress, setRemind, type}) => {
    return (
      <View style={{flex: 1}}>
        {data && data.length == 0 && !loading ? (
          <View
            style={{
              width: SmartScreenBase.smPercenWidth * 100,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: SmartScreenBase.smPercenHeight * 8,
            }}>
            <TextBox
              style={{fontSize: SmartScreenBase.smFontSize * 50}}
              text={'Con chưa hoàn thiện bài tập nào'}
            />
          </View>
        ) : (
          <FlatList
            data={data}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => 'item' + index}
            renderItem={({item, index}) => (
              <AnItem setRemind={setRemind} onPress={onPress} item={item} />
            )}
          />
        )}
      </View>
    );
  };

  // Footer Manage To GoldBoard
  const FooterInforRank = () => {
    return (
      <LinearGradient
        style={{
          flexDirection: 'row',
          paddingVertical: SmartScreenBase.smPercenHeight,
          // paddingTop: DeviceInfo.hasNotch()
          //   ? SmartScreenBase.smPercenHeight * 4
          //   : SmartScreenBase.smPercenHeight * 2,
          alignItems: 'center',
        }}
        colors={['#00b9b7', '#00e1ae']}
        start={{x: 0, y: 1}}
        end={{x: 0.5, y: 0.5}}>
        <View
          style={[
            stylesApp.flexJusBetween,
            {
              width: '100%',
              paddingHorizontal: SmartScreenBase.smPercenWidth * 4,
            },
          ]}>
          <View style={stylesApp.flexAlignCenter}>
            <Image
              style={{
                width: SmartScreenBase.smBaseWidth * 110,
                height: SmartScreenBase.smBaseWidth * 110,
                resizeMode: 'contain',
                marginRight: SmartScreenBase.smPercenWidth * 2.5,
              }}
              source={star_rank_icon}
            />
            <Text style={styles.textRankFooter}>Hạng 125</Text>
            <View
              style={[
                stylesApp.flexAlignCenter,
                {
                  marginLeft: SmartScreenBase.smPercenWidth * 4,
                },
              ]}>
              <Image
                style={{
                  width: SmartScreenBase.smBaseWidth * 35,
                  height: SmartScreenBase.smBaseWidth * 48.5,
                  resizeMode: 'contain',
                  marginRight: SmartScreenBase.smBaseWidth * 8,
                }}
                source={increase_white_avg_icon}
              />
              <Text style={styles.textChangeRank}>126</Text>
            </View>
          </View>

          <Text style={styles.textViewDetail}>Xem chi tiết</Text>
        </View>
      </LinearGradient>
    );
  };

  return (
    <ImageBackground
      source={{uri: 'bg_guide_study'}}
      style={{flex: 1, position: 'relative'}}>
      <AppHeader
        title={title}
        leftIconOnPress={() => {
          navigation.pop();
        }}
        // rightIcon={
        //   (_isByFilter.current || dataStudy.length > 0) && isFiltered
        //     ? 'filter1'
        //     : 'loctopick'
        // }
        rightIcon={_isByFilter.current && isFiltered ? 'filter1' : 'loctopick'}
        rightIconOnPress={handleModalFilter}
        styleHeaderRight={{tintColor: Colors.White}}
      />
      <ATab
        type={'complete'}
        // setRemind={setRemind}
        data={items}
        // onPress={onPress}
      />
      <FooterInforRank />
      {loading && (
        <View
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <ActivityIndicator color="#fff" />
        </View>
      )}

      <ModalFilter
        visible={visibleModalFilter}
        _cancelModalFilter={_cancelModalFilter}
        dataGrade={dataGrade}
        dataType={dataType}
        dataSkill={dataSkill}
        _handleFilter={_handleFilter}
        _handleItem={_handleItem}
        _handleDeleteFilter={_handleDeleteFilter}
      />
    </ImageBackground>
  );
};
