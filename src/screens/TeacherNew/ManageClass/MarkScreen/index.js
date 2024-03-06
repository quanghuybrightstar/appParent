import * as React from 'react';
import {useEffect, useState, useCallback} from 'react';
import {
  FlatList,
  Image,
  View,
  RefreshControl,
  TouchableOpacity,
  ImageBackground,
  BackHandler,
} from 'react-native';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import {AppHeader} from '../../../../componentBase/AppHeader';
import {styles} from './MarkScreen.styles';
import {ICON_FILTER} from '../../../../assets/image';
import {Colors} from '../../../../styleApp/color';
import API from '../../../../API/APIConstant';
import APIBase from '../../../../base/APIBase';
import ModalFilter from './ModalFilter';
import {TextBox} from '../../../../componentBase/TextBox';
import Loading from '../../../../component/LoadingScreenFull';
import {useDispatch, useSelector} from 'react-redux';
import {
  BG,
  EMPTY,
  EMPTY_IMG,
  IC_SPEAK,
  IC_TEST,
  IC_PRON,
  IC_GRAMMAR,
  IC_WRITE,
  IC_VOCAB,
  IC_READING,
  IC_PROJECT,
  IC_LISTEN,
} from '../../../../assets/icon';
import {
  FilterActionLevel,
  FilterActionSkill,
} from '../../../../redux/actions/Filter';
import VideoPlayer from '../../../../component/ComponentDetailStudyGuide/VideoPlayer';
import AudioPlayer from '../../../../componentBase/AudioPlayer';
import LogBase from '../../../../base/LogBase';

export const MarkScreen = (props) => {
  const dispatch = useDispatch();
  //Lưu dữ liệu
  const [list, setList] = useState([]);
  //Hiển thị loading
  const [loading, setLoading] = useState(false);
  //Kiểm tra xem có phải filter hay không
  const [isPressFilter, setIsPressFilter] = useState(false);
  //Kiểm tra xem có phải filter hay không
  const [isFilter, setIsFilter] = useState(false);
  //Hiển thị modal filter
  const [modalVisible, setModalVisible] = useState(false);
  //Lưu dữ liệu filter
  const {listSkill, listLevel} = useSelector((state) => state.FilterReducer);

  //param truyền từ màn hình trước đó sang
  let itemProps = props.navigation.getParam('item');
  let title = props.navigation.getParam('title');

  const listener = React.useRef();

  //Lấy dữ liệu ứng với mỗi điều kiện
  const getData = async (pressed, isDeletedFilter, dataLevel, dataSkill, filtered) => {
      if (pressed) {
        console.log('listSkill.getData', dataLevel);
        console.log('listLevel.getData', dataSkill);
        setLoading(true);
        let skills = '';
        let levels = '';
        if (dataSkill) {
          dataSkill?.map((item) => {
            if (item?.choose) {
              skills += '&skill[]=';
              skills += item?.name.toLowerCase();
            }
          });
          console.log('skills', skills);
        }
        if (dataLevel) {
          dataLevel?.map((item) => {
            if (item?.choose) {
              levels += '&level[]=';
              levels += item?.name?.toLowerCase();
            }
          });
        }
        let url = '';
        if (isDeletedFilter) {
          url = `${API.baseurl + API.ManageAssign}?class_id=${itemProps?.id}&type=class_mark`;
        } else {
          url = `${API.baseurl + API.ManageAssign}?class_id=${
            itemProps?.id
          }&type=class_mark${skills}${levels}`;
        }
        try {
          let exercises = await APIBase.tokenAPI('get', url);
          LogBase.log('=====exercises', exercises.data);
          setList(exercises?.data?.data);
          if(filtered) 
            setIsFilter(true)
          else 
            setIsFilter(false)
        } catch (error) {
          console.log('error', error);
        } finally {
          setLoading(false);
        }
        // setIsPressFilter(false);
      }
    }

  //Chạy lần đầu để lấy dữ liệu
  useEffect(() => {
    clearFilter();
    // getData(true, true, listLevel, listSkill);
    const init = async () => {
      await getData(true, true, listLevel, listSkill, true);
      };
      init();
      if (!listener.current) {
        listener.current = props.navigation.addListener('didFocus', getData);
    }
    return () => {
        listener.current.remove();
    };
  }, []);

  //Hiển thị khi dữ liệu bị trống
  const renderEmptyComponent = useCallback(() => {
    return (
      <View style={styles.emptyContainer}>
        <Image
          source={EMPTY_IMG}
          style={styles.emptyImage}
          resizeMode="contain"
        />
        <TextBox style={styles.emptyText} numberOfLines={3}>
          Không có bài tập
        </TextBox>
      </View>
    );
  }, []);

  //Hiển thị khi dữ liệu bị trống sau khi filter
  const renderEmptyComponentFilter = useCallback(() => {
    return (
      <View style={styles.emptyContainer}>
        <Image source={EMPTY} style={styles.emptyImage} resizeMode="contain" />
        <TextBox style={styles.emptyText} numberOfLines={3}>
          Không có kết quả phù hợp
        </TextBox>
      </View>
    );
  }, []);

  //Hiển thị giao diện đối với từng item trong list
  const renderItem = useCallback(
    ({item, index}) => {
      let renderColor = '';
      switch (item?.level) {
        case 'easy':
          renderColor = Colors.SuccessGreen;
          break;
        case 'normal':
          renderColor = Colors.Orange;
          break;
        case 'hard':
          renderColor = Colors.Red_BE1;
          break;
      }
      function onPressItem() {
        props.navigation.navigate('MarkDetailScreen', {
          item: {
            ...item,
            class_id: itemProps?.id,
          },
        });
      }
      let img = '';
      switch (item?.skill) {
        case 'reading':
          img = IC_READING;
          break;
        case 'listening':
          img = IC_LISTEN;
          break;
        case 'speaking':
          img = IC_SPEAK;
          break;
        case 'mini_test':
          img = IC_TEST;
          break;
        case 'vocabulary':
          img = IC_VOCAB;
          break;
        case 'grammar':
          img = IC_GRAMMAR;
          break;
        case 'writing':
          img = IC_WRITE;
          break;
        case 'project':
          img = IC_PROJECT;
          break;
        case 'pronunciation':
          img = IC_PRON;
          break;
        default:
          img = IC_TEST;
          break;
      }
      return (
        <TouchableOpacity onPress={onPressItem}>
          <View style={styles.itemContainer}>
            <View style={styles.child20}>
              <Image
                source={img}
                style={{
                  width: SmartScreenBase.smBaseWidth * 200,
                  height: SmartScreenBase.smBaseWidth * 200,
                  borderRadius: SmartScreenBase.smBaseWidth * 20,
                }}
              />
            </View>
            <View style={styles.child75}>
              <View
                style={[
                  styles.levelContainer,
                  {
                    backgroundColor: renderColor,
                  },
                ]}>
                <TextBox
                  numberOfLines={10}
                  allowFontScaling={false}
                  style={styles.level}>
                  {item?.level === 'normal' ? 'medium' : item?.level}
                </TextBox>
              </View>
              <TextBox numberOfLines={10} style={styles.exerciseTopic}>
                {'                        '}
                {item?.exercise_topic}
              </TextBox>
              <TextBox numberOfLines={10} style={styles.exerciseName}>
                {item?.exercise_name}
              </TextBox>
              <TextBox numberOfLines={10} style={styles.curriculumName}>
                {item?.curriculum_name}
              </TextBox>
              <View style={styles.container1}>
                <View style={styles.submit}>
                  <TextBox numberOfLines={10} style={styles.submitNumber}>
                    HS đã làm: {item?.number_submit}/{item?.number_assign}
                  </TextBox>
                </View>
                <View style={styles.remark}>
                  <TextBox numberOfLines={10} style={styles.submitNumber2}>
                    Đã chấm: {item?.number_mark}/{item?.number_submit}
                  </TextBox>
                </View>
              </View>
            </View>
          </View>
          {list && index === list.length - 1 ? (
            <View style={styles.hr1} />
          ) : (
            <View style={styles.hr} />
          )}
        </TouchableOpacity>
      );
    },
    [itemProps?.id, list?.length, props.navigation],
  );

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', clearFilter);
  }, [clearFilter]);

  //xoá filter trong modal
  const clearFilter = useCallback(() => {
    dispatch(
      FilterActionLevel([
        {name: 'Easy', choose: false},
        {name: 'Normal', choose: false},
        {name: 'Hard', choose: false},
      ]),
    );
    dispatch(
      FilterActionSkill([
        {name: 'Speaking', choose: false},
        {name: 'Writing', choose: false},
        {name: 'Project', choose: false},
      ]),
    );
  }, [dispatch]);

  //Quay lại màn hình trước
  const goBack = useCallback(() => {
    props.navigation.pop();
  }, [props.navigation]);

  //Mở modal filter
  const openFilter = useCallback(() => {
    setModalVisible(true);
  }, []);

  //Kiểm tra xem có chứa dữ liệu filter hay không
  const hasFilter = React.useMemo(() => {
    let flag = false;
    console.log('listLevel.hasFilter', listLevel);
    console.log('listSkill.hasFilter', listSkill);
    listLevel?.map((item) => {
      if (item.choose) {
        flag = true;
      }
    });
    listSkill?.map((item) => {
      if (item.choose) {
        flag = true;
      }
    });
    return flag;
  }, [listLevel, listSkill]);

  //Đóng modal filter
  const closeFilter = useCallback(() => setModalVisible(false), []);
  return (
    <ImageBackground source={BG} style={{width: '100%', height: '100%'}}>
      <AppHeader
        title={title}
        leftIconOnPress={goBack}
        rightIconOnPress={openFilter}
        rightIcon={isFilter ? 'filter1' : 'loctopick'}
        styleHeaderRight={{ tintColor: Colors.White }}
        //rightIcon={hasFilter && 'filter1'}
        styleTitle={styles.title}
      />
      {loading ? (
        <Loading />
      ) : (
        <FlatList
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={getData} />
          }
          style={{
            paddingHorizontal: SmartScreenBase.smPercenWidth * 5,
            paddingVertical: SmartScreenBase.smPercenWidth * 5,
          }}
          contentContainerStyle={{
            paddingBottom: SmartScreenBase.smBaseHeight * 30,
          }}
          data={list}
          renderItem={renderItem}
          ListEmptyComponent={
            isPressFilter ? renderEmptyComponentFilter : renderEmptyComponent
          }
        />
      )}
      {modalVisible && (
        <ModalFilter
          _showModalFilter={closeFilter}
          _applyFilter={getData}
          setIsPressFilter={setIsPressFilter}
          isPressFilter={isPressFilter}
        />
      )}
    </ImageBackground>
  );
};
