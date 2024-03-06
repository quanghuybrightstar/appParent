import DeviceInfo from 'react-native-device-info';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MyData from '../component/MyData';
import {
    Dimensions,Platform
} from 'react-native';

const getBuildNumber = () => {
    return DeviceInfo.getBuildNumber();
} 

const getVersion = () => {
    return DeviceInfo.getVersion();
} 

const getDeviceID = () => { 
    var myDeviceID = '';
    try {
        myDeviceID = DeviceInfo.getUniqueId();
    } catch {
        myDeviceID = DeviceInfo.getFirstInstallTime();
    } 
    return myDeviceID
}

const getFCMtoken = async () => {
    return await AsyncStorage.getItem('@fcm_token');
} 

const getDataDevice = async (mAccess_token, userInfo, mIdentityToken ,mOrganization_id, username, password) => {

    const device_name = await DeviceInfo.getDeviceName().then(deviceName => deviceName);
    const scaleF = DeviceInfo.getFontScaleSync();
    const build_name = getVersion();
    const resolution = Dimensions.get('window').width + "x" + Dimensions.get('window').height;
    const api_level = DeviceInfo.getApiLevelSync();
    const battery_level = DeviceInfo.getBatteryLevelSync();
    const freeDiskStorage = DeviceInfo.getFreeDiskStorageSync();
    const fontScale = DeviceInfo.getFontScaleSync();
    const isEmulator = DeviceInfo.isEmulatorSync();
    const deviceType = DeviceInfo.isTablet() ? "Tablet" : "Phone";
    const model = DeviceInfo.getModel();
    const fcm_token = await getFCMtoken();
    const data = {
        'username': (username || '').trim(),
        'password': password,
        'platform_app_id': MyData.platform_app_id,
        'device_id': getDeviceID(),
        'fcm_token': fcm_token,
        'device_name': device_name,
        'resolution': resolution,
        'build_number': getBuildNumber(),
        'build_name': build_name,
        'api_level': api_level,
        'os': Platform.OS,
        'battery_level': battery_level,
        'language': '',
        'language_version': 1,
        'FreeDiskStorage': freeDiskStorage,
        'FontScale': fontScale,
        'isEmulator': isEmulator,
        'DeviceType': deviceType,
        'model': model,
        'device_version': Platform.Version,
        'organization_id' : mOrganization_id,
        'access_token' : mAccess_token,
        'userInfo' : JSON.stringify(userInfo),
        'identityToken' : mIdentityToken
    };
    return data
}

const getDataDeviceNormal = async (username, password) => { return getDataDevice("","","","", username, password) }

const getDataDeviceFace = async (access_token, username, password) => { return getDataDevice(access_token,"","","", username, password) }

const getDataDeviceGoogle = async (access_token, userInfo, username, password) => { return getDataDevice(access_token,userInfo,"","", username, password) }

const getDataDeviceApple = async (identityToken, organization_id, username, password) => { return getDataDevice("","",identityToken,organization_id, username, password) }

export default {
    getBuildNumber,
    getDeviceID,
    getVersion,
    getDataDevice,
    getDataDeviceNormal,
    getDataDeviceFace,
    getDataDeviceGoogle,
    getDataDeviceApple,
    getFCMtoken
};
