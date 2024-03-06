import {Alert} from 'react-native';
import moment from 'moment';

export const alertError = (callback) => {
  Alert.alert('Lỗi', 'Có lỗi xảy ra, vui lòng thử lại sau!', [
    {text: 'Đồng ý', style: 'cancel', onPress: callback ? callback : () => {}},
  ]);
};

export const comfirm = (title, body, onPress) => {
  Alert.alert(title, body, [
    {
      text: 'Hủy',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {
      text: 'Đồng ý',
      onPress,
    },
  ]);
};

export const alertInfo = (title, body, onPress) => {
  Alert.alert(title, body, [
    {
      text: 'OK',
      onPress,
    },
  ]);
};

export const convertSecondToMinute = (sec) => {
  var minS = parseInt(sec / 60);
  var secS = sec - minS*60;
  var str = "";
  if(minS>0){ str = str + minS + " phút " }
  if(secS>=0){ str = str + secS + " giây" }
  console.log("=====convertSecondToMinute "+sec+" | "+str)
  return str;
};

export const formatFloatNumber = (number) => {
  return Number(number).toFixed(0);
};

export const formatDate = (date) => {
  const ddmmyyyy = date.split(' ');
  const day = ddmmyyyy[0].split('-')[2];
  const month = ddmmyyyy[0].split('-')[1];
  const year = ddmmyyyy[0].split('-')[0];

  return day + '/' + month + '/' + year;
};

export const mapLevelHomeworkHistory = (level) => {
  switch (level) {
    case 'normal':
      return 'medium';

    default:
      return level;
  }
};
