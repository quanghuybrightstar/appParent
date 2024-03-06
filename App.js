/* eslint-disable react-hooks/exhaustive-deps */

import 'react-native-gesture-handler';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import codePush from 'react-native-code-push';
import {TextInput, Text, Platform} from 'react-native';
import {useEffect, useRef, createRef} from 'react';
import AppNavigation from './src/navigation/AppNavigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Provider} from 'react-redux';
import {store, persistor} from './src/redux/store';
import {fcmService} from './src/Notification/FCMService';
import {PersistGate} from 'redux-persist/integration/react';
import {localNotification} from './src/Notification/LocalNotification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import Orientation from 'react-native-orientation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useSelector} from 'react-redux';
import BaseAlertManager from './src/componentBase/BaseAlert/Manager';
import BaseAlert from './src/componentBase/BaseAlert/BaseAlert';
import SplashScreen from 'react-native-splash-screen';
import {enableScreens} from 'react-native-screens';
enableScreens();
let codePushOptions = {checkFrequency: codePush.CheckFrequency.MANUAL};

const navigationRef = createRef();

Icon.loadFont();

// interface TextWithDefaultProps extends Text {
//     defaultProps?: { allowFontScaling?: boolean };
//   }

// interface TextInputWithDefaultProps extends TextInput {
//     defaultProps?: { allowFontScaling?: boolean };
//   }

const App = () => {
  const refAlert = useRef();
  useEffect(() => {
    Orientation.lockToPortrait();
    Platform.OS == 'android' && SplashScreen.hide();
  }, []);

  useEffect(() => {
    BaseAlertManager.register(refAlert.current);
    return () => {
      BaseAlertManager.unregister(refAlert.current);
    };
  }, []);

  // useEffect(async () => {
  //     fcmService.registerAppWithFCM();
  //     fcmService.register(onRegister, onNotification, onNotificationLocal, onOpenNotification);
  //     localNotification.configure();

  //     async function onRegister(token) {
  //         console.log('onRegister', token);
  //     }

  //     async function onNotificationLocal(notify) {
  //         console.log('notify local', notify);
  //         localNotification.showNotification(notify);
  //     }

  //     async function onNotification(remoteMessage) {
  //         console.log('remoteMessage', remoteMessage);
  //     }

  //     function onOpenNotification(notify) {
  //         console.log('notify', notify);
  //         // props.navigation.navigate('NotificationScreen');
  //     }

  //     return () => localNotification.unregister();
  // }, []);

  useEffect(() => {
    TextInput.defaultProps = TextInput.defaultProps || {};
    TextInput.defaultProps.allowFontScaling = false;

    // ((TextInput as unknown) as TextInputWithDefaultProps).defaultProps = ((TextInput as unknown) as TextInputWithDefaultProps).defaultProps || {};
    // ((TextInput as unknown) as TextInputWithDefaultProps).defaultProps!.allowFontScaling = false;
    // ((Text as unknown) as TextWithDefaultProps).defaultProps = ((Text as unknown) as TextWithDefaultProps).defaultProps || {};
    // ((Text as unknown) as TextWithDefaultProps).defaultProps!.allowFontScaling = false;

    Text.defaultProps.allowFontScaling = false;
    Text.defaultProps = Text.defaultProps || {};
    try {
      fcmService.registerAppWithFCM();
      fcmService.register(
        onRegister,
        onNotification,
        onNotificationLocal,
        onOpenNotification,
      );
      localNotification.configure(onOpenNotification);
    } catch {
      // console.log('Ko sử dụng được notification do test trên máy ảo');
    }

    async function onRegister(token) {
      await AsyncStorage.setItem('@fcm_token', token);
    }

    async function onNotificationLocal(notify) {
      console.log('notify local', notify);

      localNotification.showNotification(notify);
    }

    async function onNotification(remoteMessage) {
      console.log('remoteMessage', remoteMessage);
    }

    function onOpenNotification(notify) {
      console.log('notify', notify);

      // if(notify){
      //     if (dataLogin.role === 'teacher') {
      //         navigationRef.current?.navigate('TeacherApp');
      //     } else if (dataLogin.role === 'parent') {
      //         navigationRef.current?.navigate('ListenParentchild');
      //     } else if (dataLogin.role === 'student') {
      //         navigationRef.current?.navigate('StudentApp');
      //     }
      // }
    }

    return () => {
      console.log('APP unregister');
      fcmService.unRegister();
      localNotification.unregister();
    };
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppNavigation />
        </PersistGate>
        <BaseAlert ref={refAlert} />
      </Provider>
    </GestureHandlerRootView>
  );
};

export default codePush(codePushOptions)(App);
