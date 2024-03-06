import messaging from '@react-native-firebase/messaging';
import { Platform } from 'react-native';

class FCMService {
    register = (onRegister, onNotification, onNotificationLocal, onOpenNotification) => {
        this.checkPermission(onRegister);
        this.createNotificationListeners(onRegister, onNotification, onNotificationLocal, onOpenNotification)
    };
    registerAppWithFCM = async () => {
        if (Platform.OS === 'ios') {
            // messaging().setBackgroundMessageHandler(async remoteMessage => {
            //     console.log('Message handled in the background!', remoteMessage);
            // });
            await messaging().registerDeviceForRemoteMessages();
            await messaging().setAutoInitEnabled(true);
        }
    };
    checkPermission = (onRegister) => {

        messaging().hasPermission()
            .then(enabled => {
                // user has permission
                if (enabled) {
                    this.getToken(onRegister)
                } else {
                    // user doesn't has permission
                    this.requestPermission(onRegister)
                }

            }).catch(e => {
                console.log("[FCMServices] Permission reject", e)
            })
    };

    getToken = async (onRegister) => {
        messaging().getToken()
            .then(fcmToken => {
                if (fcmToken) {
                    onRegister(fcmToken);
                    console.log("[FCMService] token", fcmToken)
                } else {
                    console.log("[FCMService] User does not have device token")
                }
            }).catch(e => {
                console.log('[FCMService] Get token rejected', e)
            })
    };
    requestPermission = (onRegister) => {
        messaging().requestPermission()
            .then(() => {
                this.getToken(onRegister)
            }).catch((e) => {
                console.log("[FCMService] Request Permission Rejected", e)
            })
    };
    deleteToken = () => {
        console.log("[FCMService] deleteToken");
        messaging().deleteToken()
            .catch((e) => {
                console.log("[FCMService] deleteToken error", e)
            })
    };
    createNotificationListeners = (onRegister, onNotification, onNotificationLocal, onOpenNotification) => {
        // messaging().setBackgroundMessageHandler(async remoteMessage => {
        //     if(remoteMessage){
        //         console.log('notification background', remoteMessage.notification);
        //         onNotification(remoteMessage.notification);
        //     }
        // });
        // when the app is running in background
        messaging().onNotificationOpenedApp(remoteMessage => {
            console.log("[FCMService] onNotificationOpenedApp Notification cause app to open in background");
            if (remoteMessage) {
                const notification = remoteMessage.notification;
                onOpenNotification(notification);
            }
        });
        // when the app is opened from a quit state
        messaging().getInitialNotification()
            .then((remoteMessage) => {
                console.log("[FCMService] onNotificationOpenedApp Notification cause app to open");
                if (remoteMessage) {
                    const notification = remoteMessage.notification;
                    onOpenNotification(notification);
                }
            });
        //ForeGround state message
        this.messageListener = messaging().onMessage(async remoteMessage => {
            console.log("[FCMService] A new FCM message arrived", remoteMessage);
            if (remoteMessage) {
                onNotificationLocal(remoteMessage.notification);
                onNotification(remoteMessage.data)
            }
        });
        //triggered when have new token
        messaging().onTokenRefresh(fcmToken => {
            console.log("[FCMService] new token refresh", fcmToken);
            onRegister(fcmToken)
        })
    };
    unRegister = () => {
        this.messageListener()
    }

}

export const fcmService = new FCMService();