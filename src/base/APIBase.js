import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob';
import LogBase from './LogBase';
import API from '../API/APIConstant';
import device from '../utils/device';
import { store } from '../redux/store';
import Types from '../redux/types';
import { ActionLogin } from '../redux/actions/ActionLogin';
import { ActionDataClass } from '../redux/actions/ActionDataClass';
import MyData from '../component/MyData';
import CodePush from 'react-native-code-push';
import { showAlert } from '../componentBase/BaseAlert';
import {
    Alert,
    Text,
    TouchableOpacity,
} from "react-native";
import * as React from 'react'

class APIBase{

    static jwt_token = ''; // xác thực cho tất cả các api
    static Authorization = 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==';
    static x_api_key = '8c3a30506d9633a8b202cb5a91873efa';

    static access_token = ''; // xác thực cho các api thanh toán

    static facebookRelogin = 0;

    static Type = {
        ID_Pass : 'id_pass',
        Facebook : 'face',
        Google : 'google',
        Apple : 'apple'
    };

    // data để auto login
    static dataLogin = {
        type: 0,
        userName: "",
        pass: "",
        token: "",
        tokenId: ""
    };

    static updateJWT(token){
        APIBase.jwt_token = token;
    }

    static updateAccess_token(token){
        APIBase.access_token = token;
    }

    static fillDataLogin(response, loginDataCache){

        let dataRedux = response.data.data_user;
        dataRedux.jwt_token = response.data.jwt_token;
        dataRedux.dataToLogin = loginDataCache;

        store.dispatch(ActionLogin(dataRedux));

        APIBase.dataLogin = loginDataCache;
        APIBase.updateJWT(response.data.jwt_token);
        APIBase.updateAccess_token(response.data.access_token);

        MyData.TokenUser.id = response.data.data_user.id;
        MyData.UserLogin = response.data.data_user;   
    }  

    static async checkTokenExpired(r){
        var isCheck = true
        if(r.data && r.data.token_state == 0){
            LogBase.log("=====checkTokenExpired 1",APIBase.dataLogin)
            try {
                var isCallDone = false
                if(APIBase.dataLogin.type == APIBase.Type.ID_Pass){
                    const rootData = await device.getDataDeviceNormal(APIBase.dataLogin.userName, APIBase.dataLogin.pass);
                    var qs = require('qs');
                    const data = qs.stringify(rootData);
                    const url = API.baseurl + API.login_Id_Pass;
                    const response = await APIBase.nonTokenAPI('put', url, data);
                    if (response.data.status) {
                        isCallDone = true
                        APIBase.fillDataLogin(response, APIBase.dataLogin)
                    }else{
                        APIBase.callPopup(response)
                    }
                }else if(APIBase.dataLogin.type == APIBase.Type.Facebook){
                    const rootData = await device.getDataDeviceFace(APIBase.dataLogin.token,'', '');
                    var qs = require('qs');
                    const data = qs.stringify(rootData);
                    const url = API.baseurl + API.loginFacebook;
                    const response = await APIBase.nonTokenAPI('post', url, data);
                    if (response.data.status) {
                        isCallDone = true
                        APIBase.fillDataLogin(response, APIBase.dataLogin)
                    }else{
                        APIBase.callPopup(response)
                    }
                }else if(APIBase.dataLogin.type == APIBase.Type.Google){
                    const rootData = await device.getDataDeviceGoogle(APIBase.dataLogin.token, APIBase.dataLogin.tokenId,'', '');
                    var qs = require('qs');
                    const data = qs.stringify(rootData);
                    const url = API.baseurl + API.loginGoogle;
                    const response = await APIBase.nonTokenAPI('post', url, data);
                    if (response.data.status) {
                        isCallDone = true
                        APIBase.fillDataLogin(response, APIBase.dataLogin)
                    }else{
                        APIBase.callPopup(response)
                    }
                }else if(APIBase.dataLogin.type == APIBase.Type.Apple){
                    const rootData = await device.getDataDeviceApple(APIBase.dataLogin.token,1,'', '');
                    var qs = require('qs');
                    const data = qs.stringify(rootData);
                    const url = API.baseurl + API.loginApple;
                    const response = await APIBase.nonTokenAPI('post', url, data);
                    if (response.data.status) {
                        isCallDone = true
                        APIBase.fillDataLogin(response, APIBase.dataLogin)
                    }else{
                        APIBase.callPopup(response)
                    }
                }
            } catch (error) {
                LogBase.log("=====checkTokenExpired",error)
                
            }
        }else{
            isCheck = false
        }
        return isCheck
    }

    static callPopup(res){
         const messgage = (res?.data?.msg || "Chức năng này đang gặp vấn đề").replace(/\t/g,'');
        //  showAlert('',messgage, {text: 'Về đăng nhập'}, {renderBottom: APIBase.renderBottomAlert});
        Alert.alert('Thông báo',messgage, [
            { text: 'Đồng ý', style: 'cancel', onPress: () => APIBase.resetApp() }
        ]);
    }

    static async resetApp(){
        await store.dispatch(ActionLogin({}));
        CodePush.restartApp()
    }

    static renderBottomAlert(){
        return (
            <TouchableOpacity
                onPress={()=>APIBase.resetApp()}
            >
            </TouchableOpacity>
        );
    }

    // ko dùng
    static postDataForm(url,data,header){
        return new Promise((resolve,reject)=>{
            const headers = {
                'Content-Type': 'application/x-www-form-urlencoded',
                'jwt_token': APIBase.jwt_token,
                'x-api-key': APIBase.x_api_key,
                'Authorization': APIBase.Authorization
            };
            var formData = new FormData();
            for(let f in data){
                formData.append(f,data[f])
            }
            var requestOptions = {
                method: 'POST',
                headers: header||headers,
                body: formData,
                redirect: 'follow'
              };
            fetch(url,requestOptions).
            then(r=>r.json())
            .then(r=>{
                resolve(r)
            })
            .catch(e=>{
                reject(e)
            })
        })
    }

    static postDataJson(method, url, data, otherHeaders) {
        return new Promise((resolve, reject) => {
            const headers = {
                'Content-Type': 'application/json',
                'jwt_token': APIBase.jwt_token,
                'x-api-key': APIBase.x_api_key,
                'Authorization': APIBase.Authorization
            };
            axios({ method: method, url: url, headers: { ...headers, ...otherHeaders }, data })
                .then(r => {
                    LogBase.log("=====jwt:", APIBase.jwt_token);
                    LogBase.log("=====API:", url);
                    LogBase.log("=====API res:", r);
                    APIBase.checkTokenExpired(r).then(isExp => {
                        resolve(isExp ? {} : r)
                    })               
                }).catch(e => {
                    LogBase.log("----e", e);
                    LogBase.log("Link API lỗi: ", url);
                    reject(e)
                    if (e.message === 'Network Error') {
                        Alert.alert('Thông Báo', 'Vui lòng kiểm tra kết nối Internet', [
                            { text: 'Đồng ý', style: 'cancel' }
                        ]);
                    } else {
                        Alert.alert('Thông Báo', 'Có vấn đề xảy ra khi kết nối với server', [
                            { text: 'Đồng ý', style: 'cancel' }
                        ]);
                    }
                })
        })

    }

    static deleteWithData(url, data) {
        return new Promise((resolve, reject) => {
            axios.delete(url, {
                headers: {
                    'Content-Type': 'application/json',
                    'jwt_token': APIBase.jwt_token,
                    'x-api-key': APIBase.x_api_key,
                    'Authorization': APIBase.Authorization
                },
                data: data
            })
                .then(r => {
                    LogBase.log("=====API:", url);
                    APIBase.checkTokenExpired(r).then(isExp => {
                        resolve(isExp ? {} : r)
                    }) 
                }).catch(e => {
                    LogBase.log("Link API lỗi: ", url);
                    reject(e)
                    if (e.message === 'Network Error') {
                        Alert.alert('Thông Báo', 'Vui lòng kiểm tra kết nối Internet', [
                            { text: 'Đồng ý', style: 'cancel' }
                        ]);
                    }
                })
        })
    }

    static uploadFile(url,data){
        return new Promise((resolve,reject)=>{
            RNFetchBlob.fetch('POST', url, {
                    'Content-Type': 'multipart/form-data',
                    'jwt_token': APIBase.jwt_token,
                    'x-api-key': APIBase.x_api_key,
                    'Authorization': APIBase.Authorization
                }, data).then((r) => {
                    LogBase.log("=====API:", url);
                    APIBase.checkTokenExpired(r).then(isExp => {
                        resolve(isExp ? {} : r.data)
                    }) 
                }).catch(e=>{
                    LogBase.log("Link API lỗi: ", url);
                    reject(e)
                })
        })
    }

    static async tokenAPI(mMethod, mUrl, data) {
        var header = {
            'X-API-KEY': APIBase.x_api_key,
            'jwt_token': APIBase.jwt_token,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': APIBase.Authorization
        };
        var response = await axios({ method: mMethod, url: mUrl, headers: header, data })
            .catch(error => {
                LogBase.log("Link API lỗi: ", mUrl);
                if (error.message === 'Network Error') {
                    Alert.alert('Thông Báo', 'Vui lòng kiểm tra kết nối Internet', [
                        { text: 'Đồng ý', style: 'cancel' }
                    ]);
                } else {
                    Alert.alert('Thông Báo', 'Có vấn đề xảy ra khi kết nối với server', [
                        { text: 'Đồng ý', style: 'cancel' }
                    ]);
                }
                LogBase.log("call API fail : ", error)
                return false;
            })
            LogBase.log("=====API:", mUrl);
            LogBase.log("=====API res:", response);
            var isExp = await APIBase.checkTokenExpired(response)               
            return isExp ? {} : response 
    }
    static async tokenAPIFormData(mMethod, mUrl, data) {
        var header = {
            'X-API-KEY': APIBase.x_api_key,
            'jwt_token': APIBase.jwt_token,
            'Content-Type': 'multipart/form-data',
            'Authorization': APIBase.Authorization
        };
        var response = await axios({ method: mMethod, url: mUrl, headers: header, data })
            .catch(error => {
                LogBase.log("Link API lỗi: ", mUrl);
                if (error.message === 'Network Error') {
                    Alert.alert('Thông Báo', 'Vui lòng kiểm tra kết nối Internet', [
                        { text: 'Đồng ý', style: 'cancel' }
                    ]);
                } else {
                    Alert.alert('Thông Báo', 'Có vấn đề xảy ra khi kết nối với server', [
                        { text: 'Đồng ý', style: 'cancel' }
                    ]);
                }
                LogBase.log("call API fail : ", error)
                return false;
            })
            LogBase.log("=====API:", mUrl, response);
            var isExp = await APIBase.checkTokenExpired(response)               
            return isExp ? {} : response
    }
    static async nonTokenAPI(mMethod, mUrl, data) {
        const header = {
            "x-api-key": APIBase.x_api_key,
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": APIBase.Authorization
        };
        var response = await axios({ method: mMethod, url: mUrl, headers: header, data })
            .catch(error => {
                LogBase.log("Link API lỗi: ", mUrl);
                if (error.message === 'Network Error') {
                    Alert.alert('Thông Báo', 'Vui lòng kiểm tra kết nối Internet', [
                        { text: 'Đồng ý', style: 'cancel' }
                    ]);
                } else {
                    Alert.alert('Thông Báo', 'Có vấn đề xảy ra khi kết nối với server', [
                        { text: 'Đồng ý', style: 'cancel' }
                    ]);
                }
                LogBase.log("call API fail : ", error)
                return false;
            })
            LogBase.log("=====API:", mUrl);
        return response;
    }
    static async formDataAPI(mMethod, mUrl, data) {
        var header = {
            "Authorization": APIBase.Authorization,
            "Content-Type": "multipart/form-data",
            "jwt_token": APIBase.jwt_token,
            "x-api-key": APIBase.x_api_key
        };
        const response = await RNFetchBlob.fetch(mMethod, mUrl, header, data)
            .catch(error => {
                LogBase.log("Link API lỗi: ", mUrl);
                LogBase.log("API lỗi: ", error);
                if (error.message === 'Network Error') {
                    Alert.alert('Thông Báo', 'Vui lòng kiểm tra kết nối Internet', [
                        { text: 'Đồng ý', style: 'cancel' }
                    ]);
                } else {
                    Alert.alert('Thông Báo', 'Có vấn đề xảy ra khi kết nối với server', [
                        { text: 'Đồng ý', style: 'cancel' }
                    ]);
                }
                return false;
            })
            LogBase.log("=====API:", mUrl);
            APIBase.checkTokenExpired(response)
        return response;
    }

    static callPaySV(method, url, data, HeaderSpe) {
    return new Promise((resolve, reject) => {
        const headers = {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + APIBase.access_token
        };
        LogBase.log("=====HeaderSpe", HeaderSpe ? HeaderSpe : headers)
        axios({ method: method, url: url, headers: HeaderSpe ? HeaderSpe : headers, data })
            .then(r => {
                LogBase.log("=====jwt:", APIBase.jwt_token);
                LogBase.log("=====API:", url);
                LogBase.log("=====API res:", r);
                APIBase.checkTokenExpired(r).then(isExp => {
                    resolve(isExp ? {} : r)
                })               
            }).catch(e => {
                LogBase.log("----e", e);
                LogBase.log("Link API lỗi: ", url);
                reject(e)
                if (e.message === 'Network Error') {
                    Alert.alert('Thông Báo', 'Vui lòng kiểm tra kết nối Internet', [
                        { text: 'Đồng ý', style: 'cancel' }
                    ]);
                } else {
                    Alert.alert('Thông Báo', 'Có vấn đề xảy ra khi kết nối với server', [
                        { text: 'Đồng ý', style: 'cancel' }
                    ]);
                }
            })
    })

}
}

export default APIBase;