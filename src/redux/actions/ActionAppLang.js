import API from '../../API/APIConstant';
import APIBase from '../../base/APIBase';
import Types from '../types';
import {Alert} from 'react-native';
import MyData from '../../component/MyData';
import jsonLangBackup from '../../stringJSON/JsonLangBackup';
import LogBase from '../../base/LogBase';
/**
 * Get text for all of app
 * @param {function} callback callback after call API
 * @returns null
 */
export const getAppLanguage = (callback) => {
    return dispatch => {
        try {
            let url = API.baseurl + API.appLanguage
            return APIBase.nonTokenAPI('get', url).then((responseJson) => {
                if(responseJson?.data?.data_lang){
                    console.log("-----load lang online");
                    dispatch({ type: Types.LANGUAGE, payload: responseJson.data.data_lang });
                    MyData.loadLanguageStatus = true;
                    MyData.ipTest = responseJson.data.server_test?.ip_server
                }else{
                    console.log("-----load lang offline");
                    dispatch({ type: Types.LANGUAGE, payload: jsonLangBackup });
                    MyData.loadLanguageStatus = false;
                    MyData.ipTest = 'http://192.168.0.144/gek-admin'
                }
                callback && callback()
            }).catch((err) => {
                console.log('err', err)
                console.log("-----load lang offline when error");
                dispatch({ type: Types.LANGUAGE, payload: jsonLangBackup });
                MyData.loadLanguageStatus = false;
                MyData.ipTest = 'http://192.168.1.99/gek-admin'
                callback && callback()
                // Alert.alert('','Không thể kết nối đến server, xin vui lòng kiểm tra kết nối internet', [
                //     {text: 'Thử lại', onPress: () => {console.log("haha 1")}}
                // ]);
                console.log("=====lỗi message language");
            });
        } catch (error) {
            console.log('error', error)
            MyData.loadLanguageStatus = false;
            callback && callback()
            console.log("=====lỗi mạng từ gọi language");
        }
    }
}

