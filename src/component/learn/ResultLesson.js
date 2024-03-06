import React, { useState, useRef } from 'react';
import {
  Modal,
  Image,
  ImageBackground,
  Platform,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
  Keyboard,
  Alert,
  TouchableWithoutFeedback
} from 'react-native';
import Sound from 'react-native-sound';
import FontBase from '../../base/FontBase';
import SmartScreenBase from '../../base/SmartScreenBase';
import {ButtonMedium} from '../../commons/Button';
import MyData from '../MyData';
import API from '../../API/APIConstant';
import APIBase from '../../base/APIBase';
import { ComponentLoadingIndicator } from '../../componentBase/indicator/ComponentLoadingIndicator';
import { ShortMainButton } from '../../componentBase/ShortMainButton';
import stringUtils from '../../utils/stringUtils';

const ResultExam = ({ isMasterUnit, goBack, skill, isHomework, data, isTeacher}) => {
  
  const special = skill=='vocabulary'||skill=='grammar';
  const text1 =
    data.score >= 10
      ? 'TUYỆT VỜI!'
      : data.score >= 8
      ? 'SẮP CHẠM TỚI ĐỈNH CAO RỒI!'
      : data.score >= (special?6:5)
      ? 'ĐỌC KỸ ĐỀ THÊM XÍU'
      : 'CỐ GẮNG THẬT NHIỀU';
    const text2 =
      data.score >= 10
        ? 'GIỮ VỮNG PHONG ĐỘ NÀY NHÉ!'
        : data.score >= 8
        ? ''
        : data.score >= (special?6:5)
        ? 'LÀ ĐƯỢC ĐIỂM CAO RỒI!'
        : 'CHO LẦN LÀM TỚI NHÉ!';
    var _isCup = false;
    if(isMasterUnit){
      _isCup = data.score >= 7
    }else if(special){
        _isCup = data.score >= 6
    }else{
        _isCup = data.score >= 5
    }

  const [modalVisible, setModalVisible] = useState(false);
  const [valueFeedback, setValueFeedback] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const textInput = useRef();

  React.useEffect(()=>{
    var sound = new Sound(_isCup?"cup_voice.mp3":"meu_voice.mp3", Sound.MAIN_BUNDLE, (e) => {
      console.log('error',e)
      if (e || MyData.isDisableSound) {
        return;
      }
      sound.play((su) => {
      });
    });
    return()=>{
      sound&&sound.release();
    }
  },[])
  
  const _feedBack = async () => {
    setModalVisible(false);
    setIsLoading(true);
    const url = API.baseurl + API.feedBack;
    let data = {};
    data['feedback_content'] = valueFeedback;
    try {
        const res = await APIBase.postDataJson('post', url, data);
        let dataReturn = res.data;
        setIsLoading(false);
        if (dataReturn.status) {
            Alert.alert('Thông báo', 'Gửi phản hồi thành công!', [
                { text: 'Đóng', style: 'cancel' },
            ]);
        }
    } catch (error) {
        Alert.alert('Thông báo', error.response.data.msg, [
            { text: 'Đồng ý', style: 'cancel' },
        ]);
        setIsLoading(false);
        setModalVisible(false);
        console.log(error);
    }
};

  const _renderModalFeedback = () => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingHorizontal: SmartScreenBase.smPercenWidth * 5,
                    backgroundColor: '#00000080',
                }}>
                    <View style={{
                        width: SmartScreenBase.smPercenWidth * 90,
                        backgroundColor: '#fff',
                        borderRadius: SmartScreenBase.smPercenWidth * 5,
                        justifyContent: 'center',
                        alignItems: 'center',
                        paddingHorizontal: SmartScreenBase.smPercenWidth * 5,
                    }}>
                      <Text style={{fontFamily: FontBase.MyriadPro_Bold, fontSize: SmartScreenBase.smFontSize*55, color: '#444444', marginVertical: SmartScreenBase.smPercenWidth*2}}>{"Phản hồi"}</Text>
                        <View style={{ width: '100%', marginBottom: SmartScreenBase.smPercenHeight }}>
                            <Text style={{ fontFamily: FontBase.MyriadPro_It, fontSize: SmartScreenBase.smFontSize*45, color: '#333333'}}>Hãy viết phản hồi của bạn</Text>
                        </View>
                        <TouchableWithoutFeedback onPress={() => textInput.current.focus()}>
                            <View style={{
                                width: '100%',
                                borderWidth: 1,
                                height: SmartScreenBase.smPercenHeight * 15,
                                borderColor: '#565656',
                                borderRadius: SmartScreenBase.smPercenWidth * 2,
                            }}>
                                <TextInput
                                    ref={textInput}
                                    style={{
                                        width: '100%',
                                        padding: SmartScreenBase.smPercenWidth * 2,
                                    }}
                                    onChangeText={(text) => setValueFeedback(text)}
                                    multiline={true}
                                />
                            </View>
                        </TouchableWithoutFeedback>
                        {/* {isLoading && <ComponentLoadingIndicator visible={true}/>} */}
                        <View style={{
                            width: '100%',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-around',
                            margin: SmartScreenBase.smPercenHeight * 2,
                        }}>
                            <ShortMainButton
                                type={0}
                                text={"Huỷ"} widthType={'smPopup'}
                                onPress={() => setModalVisible(false)}
                            />
                            <ShortMainButton
                                type={1}
                                text={"Gửi"} widthType={'smPopup'}
                                onPress={() => _feedBack()}
                            />
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Modal>
    );
};

  return (
    <ImageBackground source={{uri: 'rs_bg'}} style={{flex: 1,justifyContent:'center'}}>
          <TouchableOpacity
            style={{
              position: 'absolute',
              top: SmartScreenBase.smPercenHeight * 4,
              zIndex: 100,
              right: SmartScreenBase.smPercenWidth * 4,
            }}
            onPress={() => setModalVisible(true)}>
            <Image
              source={{ uri: 'phanhoianh' }} 
              style={{
                width: SmartScreenBase.smPercenWidth * 20,
                height: SmartScreenBase.smPercenHeight * 3}}
              resizeMode={'contain'}/>
          </TouchableOpacity>
      <View style={{
            alignItems:'center',
            justifyContent:'space-around',
        }}>
          <View style={styles.engarage}>
              <Text style={styles.title}>{text1}</Text>
              <Text  style={styles.title}>{text2}</Text>
          </View>
          <View style={{
              width:'100%',
              alignItems:'center',
              marginVertical:SmartScreenBase.smPercenHeight*4
          }}>
            <Image
                source={{uri:_isCup?'rs_cup':'rs_cry'}}
                style={{
                    width:SmartScreenBase.smPercenWidth*80,
                    height:SmartScreenBase.smPercenWidth*60,
                    resizeMode:'contain',
                    marginLeft:SmartScreenBase.smPercenWidth*(_isCup?5:2)
                }}
            />
            <View style={{
                flexDirection:'row',
                paddingHorizontal:SmartScreenBase.smPercenWidth*4,
                paddingVertical:SmartScreenBase.smPercenHeight*2,
                alignItems:'center'
            }}>
                    {!isTeacher && !isHomework && <View style={styles.shadow}>
                        <Image source={{uri:'rs_diamond'}} style={styles.img} />
                        <Text style={styles.dia}>+{data.diamond || 0}</Text>
                    </View>}
                    <View style={styles.diemV}>
                        <Text style={styles.exp}>{stringUtils.roundOne(data.score)}</Text>
                        <Text style={styles.diem}>Điểm</Text>
                    </View>
                    {!isTeacher && !isHomework && <View style={styles.shadow}>
                        <Image source={{uri:'rs_huanchuong'}} style={styles.img} />
                        <Text style={styles.dia}>+{data.medal || 0}</Text>
                    </View>}
            </View>
          </View>
          <ShortMainButton
            type={1}
            text={"Tiếp tục"} widthType={'full'}
            onPress={() => goBack()}
          />
      </View>
      {_renderModalFeedback()}
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  title: {
    fontFamily: 'iCielSoupofJustice',
    fontSize:SmartScreenBase.smFontSize*70,
    textAlign:'center',
    color:'#006e62'
  },
  engarage:{
      alignItems:'center'
  },
  img:{
      width:SmartScreenBase.smPercenWidth*12,
      height:SmartScreenBase.smPercenWidth*8,
      resizeMode:'contain'
  },
  diemV:{
    width:SmartScreenBase.smPercenWidth*26,
    height:SmartScreenBase.smPercenWidth*26,
    borderWidth:4,
    borderColor:'#00a89f',
    borderRadius:14,
    shadowColor: '#000',
    shadowOffset: {
        width: 2,
        height:2,
    },
    shadowOpacity: 0.29,
    shadowRadius: 1,
    elevation: 3,
    backgroundColor:'#fff',
    justifyContent:'center',
    alignItems:'center'
  },
  exp:{
    fontFamily: FontBase.MyriadPro_Bold,
    fontSize:SmartScreenBase.smFontSize*160,
    color:'#ca282b',
    marginBottom:Platform.OS=='ios'? -20:0,
  },
  diem:{
    fontSize: SmartScreenBase.smFontSize*45,
    fontFamily: FontBase.MyriadPro_Bold,
    marginTop: Platform.OS=='ios'? SmartScreenBase.smPercenWidth*3 : 0
  },
  dia:{
    color:'#3184be',
    fontSize:SmartScreenBase.smFontSize*60,
    fontFamily:FontBase.MyriadPro_Regular,
    paddingTop:Platform.OS==='ios'?5:0
  },
  shadow:{
    flexDirection:'row',
    shadowColor: '#000',
    shadowOffset: {
        width: 2,
        height:2,
    },
    shadowOpacity: 0.29,
    shadowRadius: 1,
    elevation: 3,
    borderWidth:1,
    borderColor:'#ececec',
    backgroundColor:'#fff',
    flex:1,
    marginHorizontal:SmartScreenBase.smPercenWidth*2,
    height:SmartScreenBase.smPercenWidth*13,
    borderRadius:SmartScreenBase.smPercenWidth*7,
    alignItems:'center',
    paddingLeft:SmartScreenBase.smPercenWidth
  }
});
export default ResultExam;
