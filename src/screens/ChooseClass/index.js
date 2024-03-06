import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Alert,
  Dimensions,
  FlatList,
  ImageBackground,
  Image,
  Platform,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');
import {useSelector, useDispatch} from 'react-redux';
import APIBase from '../../../src/base/APIBase';
import SmartScreenBase from '../../base/SmartScreenBase';
import API from '../../API/APIConstant';
import FontBase from '../../base/FontBase';
import MyData from '../../component/MyData';
import DotBadge from '../../componentBase/NotifyBadge/DotBadge'
import { FullScreenLoadingIndicator } from '../../componentBase/indicator/FullScreenLoadingIndicator';
import LogBase from '../../base/LogBase';

const ChooseClass = (props) => {
  const [loading, setloading] = useState(true);
  const [dataClass, setdataClass] = useState([]);
  const listener = React.useRef();

  useEffect(() => {
    const init = async () => {
      await _getDataQuestion();
  };
  init();
  if (!listener.current) {
    listener.current = props.navigation.addListener('didFocus', _getDataQuestion);
}
return () => {
    listener.current.remove();
};
  }, []);

  const _getDataQuestion = async () => {
    const url = `${API.baseurl}${API.getStudentMyClass}`;
    try {
      setloading(true);
      const res = await APIBase.postDataJson('GET', url);
      let data = res.data;
      if (data.status) {
        var listClass = []
        data.data.forEach(element => {
          if(element.number_student > 0){
            listClass.push(element)
          }
        });
        setdataClass(listClass);
      } else {
        Alert.alert(data.msg);
      }
      setloading(false);

    } catch (error) {
      setloading(false);
      LogBase.log(error.message);
      if (error.message === 'Network Error') {
        Alert.alert('Thông Báo', 'Vui lòng kiểm tra kết nối Internet');
      }
    }
  };

  const _renderItem = ({item, index}) => {
    // console.log("=====chose",item)
    const classAvatarUrl = item?.class_avatar
      ? `${API.image_base_url}${item.class_avatar}`
      : 'asset2';
    return (
      <TouchableOpacity
        style={styles.touchSty}
        onPress={() =>
          props.navigation.navigate('NewChatScreen', {
            class_id: item.id,
            class_name: item.class_name,
            class_sum_Student: dataClass[index].count_student,
          })
        }>
        <View style={{padding: 10}}>
          <ImageBackground
            source={{uri: classAvatarUrl}}
            resizeMode="cover"
            imageStyle={{borderRadius: SmartScreenBase.smBaseWidth * 25}}
            style={{
              width: height / 6,
              height: height / 7,
            }}
          />
        </View>
        <View
          style={{
            marginTop: 15,
            flex: 1,
            paddingRight: 10,
          }}>
          <LinearGradient
            style={{
              paddingVertical: SmartScreenBase.smBaseHeight * 10,
              paddingHorizontal: SmartScreenBase.smBaseWidth * 20,
              borderRadius: SmartScreenBase.smBaseWidth * 50,
            }}
            colors={['#00e1a0', '#00b9b7']}
            start={{x: 0, y: 1}}
            end={{x: 0.5, y: 0.5}}>
            <Text
              numberOfLines={1}
              ellipsizeMode={'tail'}
              style={{
                fontFamily: FontBase.MyriadPro_Bold,
                fontSize: SmartScreenBase.smFontSize * 50,
                color: '#fff',
              }}>
              {item.class_name}
            </Text>
          </LinearGradient>
          <Text
            style={{
              fontFamily: FontBase.MyriadPro_Regular,
              fontSize: SmartScreenBase.smFontSize * 45,
              marginTop: SmartScreenBase.smPercenHeight,
            }}>
            Lớp{' '}
            <Text
              style={{
                color:
                  item.type.toLowerCase() == 'online' ? '#00A69C' : '#BE1E2D',
                  fontFamily: FontBase.MyriadPro_Bold,
                  fontSize: SmartScreenBase.smFontSize * 50,
              }}>
              {item.type.toUpperCase()}
            </Text>
          </Text>

          <View
            style={{
              flexDirection: 'row',
              position: 'absolute',
              bottom: 0,
              right: 0,
            }}>
            <View
              style={{
                padding: 5,
              }}>
              <Image
                source={{uri: 'chat1'}}
                style={{width: 30, height: 30, resizeMode: 'contain'}}
              />
              {/* {console.log("=====item12",item.report_data)} */}
              <DotBadge visiable={item.number_msg_new > 0} />
            </View>
            <View
              style={{
                padding: 5,
              }}>
              <Image
                source={{uri: 'chuong1'}}
                style={{width: 30, height: 30, resizeMode: 'contain'}}
              />
              <DotBadge visiable={item.number_system_new > 0} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <ImageBackground source={{uri: 'bghome'}} style={{flex: 1}}>
      <Image source={{ uri: 'logo_gv' }} style={styles.imgLogo}/>
        <View
          style={{
            width: width,
            height: SmartScreenBase.smPercenHeight * 67,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: SmartScreenBase.smPercenHeight * 4,
          }}>
          {!loading ? <FlatList
            data={dataClass}
            width="90%"
            renderItem={_renderItem}
            keyExtractor={(index) => index.toString()}
            scrollEnabled={true}
            ListEmptyComponent={
              <View style={{width: '100%', alignItems: 'center', marginTop: 40}}>
                <Text style={{fontFamily: FontBase.MyriadPro_Regular, fontSize: SmartScreenBase.smFontSize * 55, textAlign: 'center'}}>{'Bạn chưa có lớp học online nào.\nHãy tạo lớp mới và thêm học sinh để tạo cuộc trò chuyện.'}</Text>
              </View>
            }
          /> : null}
        </View>
      <FullScreenLoadingIndicator visible={loading}/>
    </ImageBackground>
  );
};

export default ChooseClass;

export const styles = StyleSheet.create({

  touchSty: {
    flexDirection: 'row',
    borderRadius: SmartScreenBase.smBaseHeight * 20,
    marginBottom: 30,
    backgroundColor: 'white',
    shadowColor: '#c1c1c1',
    borderWidth: 1,
    borderColor: '#ececec',
    shadowOpacity: 1,
    shadowRadius: 2,
    shadowOffset: {
      width: SmartScreenBase.smBaseWidth * 4,
      height: SmartScreenBase.smBaseHeight * 4,
    },
    elevation: 5,
    marginRight: SmartScreenBase.smBaseWidth * 10,
  },

  imgLogo: {
      width: SmartScreenBase.smBaseWidth * 380,
      height: SmartScreenBase.smBaseHeight * 150,
      marginTop: SmartScreenBase.smPercenHeight * 3,
  }
})
