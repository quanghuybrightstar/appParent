import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, ImageBackground, Alert } from 'react-native'
import Header from '../../../../component/Header';
import styles from './style';
import ComponentSetting from './componentSetting';
import axios from 'axios';
import { useSelector } from 'react-redux';
import API from '../../../../API/APIConstant'
import LoadingScreen from '../../../LoadingScreen'
import APIBase from '../../../../base/APIBase';
const SettingScreen = (props) => {
  const [dataPost, setDataPost] = useState([]);
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState({
    WhenthereMessage: 1,
    AmicaMarkedComplete: 1,
    ParentsHomework: 1,
    OutOfDate: 1,
    BackgroundMusic: 1
  });
  const DataLogin = useSelector(state => state.AuthStackReducer.dataLogin);
  useEffect(() => {
    _getData()
  }, []);
  const _getData = async () => {
    const url = API.baseurl + API.settingUser;
    const headers = {
      'Content-Type': 'application/json',
      'jwt_token': APIBase.jwt_token,
      'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
      'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA=='
    };
    try {
      const response = await axios({ method: 'get', headers, url });
      let setting = await JSON.parse(response.data.user_data.data_setting_notify)
      setStatus(setting[setting.length - 1])
      setLoading(false)
    }
    catch (error) {
      console.log(error)
    }
  }
  const _checkTrue = (value) => {
    let data = { ...status }
    switch (value) {
      case 'WhenthereMessage':
        data.WhenthereMessage === 1 ? data.WhenthereMessage = 0 : data.WhenthereMessage = 1;
        break;
      case 'AmicaMarkedComplete':
        data.AmicaMarkedComplete === 1 ? data.AmicaMarkedComplete = 0 : data.AmicaMarkedComplete = 1;
        break;
      case 'ParentsHomework':
        data.ParentsHomework === 1 ? data.ParentsHomework = 0 : data.ParentsHomework = 1;
        break;
      case 'OutOfDate':
        data.OutOfDate === 1 ? data.OutOfDate = 0 : data.OutOfDate = 1;
        break;
      case 'BackgroundMusic':
        data.BackgroundMusic === 1 ? data.BackgroundMusic = 0 : data.BackgroundMusic = 1;
        break;
    }
    setStatus(data)
  }
  const _onSave = async () => {
    setLoading(true)
    let array = [...dataPost];
    array.push(status)
    const url = API.baseurl + API.saveSettingUser
    const data = {
      can_notify: 1,
      data_setting_notify: JSON.stringify(array),
      user_id: DataLogin.id
    }
    const headers = {
      'Content-Type': 'application/json',
      'jwt_token': APIBase.jwt_token,
      'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
      'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA=='
    };
    console.log(data);
    try {
      const response = await axios({ method: 'put', url, headers, data });
      if (response.data.status) {
        setLoading(false)
        Alert.alert('Thông báo', `${response.data.msg}`)
      }
    }
    catch (error) {
      setLoading(false)
      console.log(error.response.data)
    }
  }
  return (
    !loading?
    <ImageBackground source={{ uri: 'imagebackground' }} style={{ flex: 1 }}>
      <Header showBack={true} title={'Cài đặt'} goBack={() => props.navigation.goBack()}/>
      {/*<Header*/}
      {/*  title='Cài đặt'*/}
      {/*  navigation={props.navigation}*/}
      {/*/>*/}
      <View style={styles.container}>
        <View style={styles.viewTop}>
          <Text style={styles.titleNotification}>Thông báo</Text>
          <ComponentSetting title="Khi Có tin nhắn" image={props.navigation.getParam('type') != 'teacher'?'phu_huynh_68':'athu'} status={status.WhenthereMessage} checkTrue={_checkTrue} type='WhenthereMessage' />
          <ComponentSetting title="Khi Amica hoàn thành chấm bài" image={props.navigation.getParam('type') != 'teacher'?'phu_huynh_68':'ames'} status={status.AmicaMarkedComplete} checkTrue={_checkTrue} type='AmicaMarkedComplete' />
          {
            props.navigation.getParam('type') != 'teacher' &&
            <View>
              <ComponentSetting title="Khi còn hoàn thành hết bài tập phụ huynh giao" image={'phu_huynh_68'} status={status.ParentsHomework} checkTrue={_checkTrue} type='ParentsHomework' />
              <ComponentSetting title="Khi con để quá hạn" image={'phu_huynh_68'} status={status.OutOfDate} checkTrue={_checkTrue} type='OutOfDate' />
            </View>
          }

        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.viewTop}>
          <Text style={styles.titleNotification}>Âm thanh</Text>
          <ComponentSetting title="Nhạc nền" image={'student_setting_image8'} status={status.BackgroundMusic} checkTrue={_checkTrue} type='BackgroundMusic' />
        </View>
      </View>
      <View style={styles.viewBottomContainer}>
        <TouchableOpacity style={styles.buttonSave} onPress={_onSave}>
          <Text style={styles.titleSave}>Lưu Thay đổi</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
    :
      <LoadingScreen />
  )


}
export default SettingScreen;
