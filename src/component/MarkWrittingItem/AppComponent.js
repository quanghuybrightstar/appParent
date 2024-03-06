// import React from 'react';
// import {AsyncStorage, View, Alert} from 'react-native';
// import _ from 'lodash';

// export default class AppComponent extends React.PureComponent {


//   state = {
//     refreshing: false,
//     isLoading: true,
//     startId: '',
//     propsData: undefined,
//     data: [],
//   };


//   getScreenData = () => {};

//   goBack = () => {
//     if (this.props.navigation) {
//       this.props.navigation.goBack();
//     }
//   };

//   // tryToGetDataAgain = () => {
//   //   this.page = 1;
//   //   this.setState({isLoading: true}, () => {
//   //     setTimeout(() => this.getScreenData(), config.settings.timeoutTryAgain);
//   //   });
//   // };

//   navigateToScreen = (routeName, params) => () => {
//     const {navigation} = this.props;
//     if (navigation) {
//       navigation.navigate(routeName, params);
//     }
//   };

//   logThis = (str1, str2) => {
//     consoleLog(str1, str2);
//   };



//   unableToConnectServer() {
//     Alert.alert('Thông báo', 'Không thể kết nối tới máy chủ');
//   }




// }
