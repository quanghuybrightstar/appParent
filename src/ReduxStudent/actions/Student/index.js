import {
    LOAD_API_LOGIN,
    LOAD_API_HOMESCREEN,
    LOAD_API_CLASSSCREEN,
    LOAD_API_RANKSCREEN,
    LOAD_API_UNITSCREEN,
    LOAD_API_RANK_HV,
    LOAD_API_LIST_HV,
    LOAD_API_EXERCISE_HV,
    LOAD_API_HONORS_HV,
    LOAD_API_DETAIL_CLASS_HV,
    LOAD_API_INBOX_HV,
    LOAD_API_INBOX_DETAIL_HV,
    LOAD_SKILL_UNIT,
    CHOICECLASS,
    LOAD_PROFILE_HV,
    LOAD_SKILL_READING,
    LOAD_SKILL_LISTENING,
    LOAD_SKILL_GRAMMAR,
    LOAD_SKILL_WRITING,
    LOAD_SKILL_SPEAKING,
    LOAD_SKILL_VOCABULARY,
    LOAD_API_LICENSE_HV,
    LOAD_API_SETTING_HV,
    LOAD_SKILL_PRONUNCIATION,
    LOAD_SKILL_MINITEST,
    LOAD_API_IMPROVEMENT,
    START_CALL_API,
    LOAD_API_INBOX_SYSTEM,
    LOAD_HOMEWORK_HISTORY,
    LOAD_SETTING_APP

} from "./types";
import { Alert } from 'react-native';
import DataAPI from "../../../component/DataAPI";
import MyData from "../../../component/MyData";
import base64 from "react-native-base64";
import APIBase from "../../../base/APIBase";
import API from '../../../API/APIConstant';
import {mapHomeworkDetail} from '../../../utils';
import LogBase from "../../../base/LogBase";

export const loadapiimprovement = (id) => {
    return async dispatch => {
        try {
            await dispatch({ type: START_CALL_API })
            await LoadAPIImprovementFunc(id, dispatch);
        } catch (error) {
            console.log(error);
        }
    }
}

export const loadapilicense = () => {
    return async dispatch => {
        try {
            LoadAPILicenseHV(dispatch);
        } catch (error) {
            console.log(error);
        }
    }
}
export const loadapiSetting = () => {
    return async dispatch => {
        try {
            LoadAPISettingHV(dispatch);
        } catch (error) {
            console.log(error);
        }
    }
}

export const loadapilogin = () => {
    return async dispatch => {
        try {
            LoginApp(dispatch);
        } catch (error) {
            console.log(error);
        }
    }
};
export const LoadRank = () => {
    return async dispatch => {
        try {
            LoadAPIProcess(dispatch)
        } catch (error) {
            console.log(error);
        }
    }
};
export const loadapifreelearning = (id) => {
    return async dispatch => {
        try {
            LoginAPIFreeLearning(id, dispatch);
        } catch (error) {
            console.log(error);
        }
    }
};
export const loadapiinboxsystem = () => {
    return dispatch => {
        try {
            return fetch(API.baseurl + DataAPI.UrlLoadInboxSystem, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-API-KEY': '8c3a30506d9633a8b202cb5a91873efa',
                    'jwt_token': '' + APIBase.jwt_token,
                    'Authorization': 'Basic ' + base64.encode('gek_admin:gek_admin_password'),
                }
            }).then(response => response.json()).then((responseJson) => {
                dispatch({ type: LOAD_API_INBOX_SYSTEM, data: responseJson.data })
            }).catch((err) => {
                console.log('err', err)
            });
        } catch (error) {
            console.log(error);
        }
    }
}
export const loadapiinboxhv = () => {
    return dispatch => {
        try {
            APIBase.postDataJson('GET',API.baseurl + DataAPI.UrlLoadInbox).then(responseJson=>{
                if(responseJson.data.status==true){
                    dispatch({ type: LOAD_API_INBOX_HV, data: responseJson.data });
                }else{
                    Alert.alert(responseJson.data.msg)
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
}
export const SendAPIIbox = (data) => {
    try {
        return fetch(DataAPI.UrlLoadSendInbox, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-API-KEY': '8c3a30506d9633a8b202cb5a91873efa',
                'jwt_token': '' + APIBase.jwt_token,
                'Authorization': 'Basic ' + base64.encode('gek_admin:gek_admin_password'),
            },
            body: JSON.stringify(data)
        }).then(response => response.json()).then((responseJson) => {
            console.log(responseJson);
        }).catch((err) => {
            console.log('err', err)
        });
    } catch (error) {
        console.log(error);
    }
}
export const GetInboxDetail = (id) => {
    return dispatch => {
        try {
            return fetch(API.baseurl + DataAPI.UrlLoadInboxDetail + '?id=' + id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-API-KEY': '8c3a30506d9633a8b202cb5a91873efa',
                    'jwt_token': '' + APIBase.jwt_token,
                    'Authorization': 'Basic ' + base64.encode('gek_admin:gek_admin_password'),
                }
            }).then(response => response.json()).then((responseJson) => {
                dispatch({ type: LOAD_API_INBOX_DETAIL_HV, data: responseJson });
            }).catch((err) => {
                console.log('err', err)
            });
        } catch (error) {
            console.log(error);
        }
    }
}
export const LoadUpdateInbox = (data) => {
    return dispatch => {
        return fetch(DataAPI.UrlLoadUpdateInbox, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-API-KEY': '8c3a30506d9633a8b202cb5a91873efa',
                'jwt_token': '' + APIBase.jwt_token,
                'Authorization': 'Basic ' + base64.encode('gek_admin:gek_admin_password'),
            },
            body: JSON.stringify({
                inbox_id: data.inbox_id,
                seen_status: data.seen_status,
                is_marked: data.is_marked
            })
        }).then(response => response.json()).then((responseJson) => {
             console.log(responseJson);

            if (responseJson.status == false) {
                Alert.alert(responseJson.msg)
            } else {
                loadapiinboxhv();
            }
        }).catch((err) => {
            console.log('err', err)
        });
    }
}
export const loadapiskillunit = (data) => ({ type: LOAD_SKILL_UNIT, data })
export const loadapilisthv = (id) => {
    return async dispatch => {
        try {
            await loadAPIListHVByClass(id, dispatch);
        } catch (error) {
            console.log(error);
        }
    }
};
export const loadapiexercisehv = (id) => {
    return async dispatch => {
        try {
            await loadExerciseByClass(id, dispatch);
        } catch (error) {
            console.log(error);
        }
    }
};
export const loadapirankhv = (id) => {
    return async dispatch => {
        try {
            await loadAPIRankHVByClass(id, dispatch);
        } catch (error) {
            console.log(error);
        }
    }
};
export const loadapihonorshv = (id) => {
    return async dispatch => {
        try {
            await loadAPIAchievementsByClass(id, dispatch);
        } catch (error) {
            console.log(error);
        }
    }
};
export const loadapidetailclasshv = (id) => {
    return async dispatch => {
        try {
            await loadAPIDetailByClass(id, dispatch);
        } catch (error) {
            console.log(error);
        }
    }
};
export const LoadingUnitScreen = (id, index) => {
    return async dispatch => {
        try {
            await LoadAPIUnitByClass(id, dispatch, index);
        } catch (error) {
            console.log(error);
        }
    }
};
export const loadapiprofilehv = () => {
    return async dispatch => {
        try {
            await LoadAPIFrofileHV(dispatch);
        } catch (error) {
            console.log(error);
        }
    }
};
export const LoadapiUpdateInforUser = (data) => {
    return async dispatch => {
        try {
            return fetch(API.baseurl + DataAPI.UrlUpdateInfoUser, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'X-API-KEY': '8c3a30506d9633a8b202cb5a91873efa',
                    'jwt_token': '' + APIBase.jwt_token,
                    'Authorization': 'Basic ' + base64.encode('gek_admin:gek_admin_password'),
                },
                body: JSON.stringify({
                    user_id: MyData.UserLogin.id,
                    gender: data.gender,
                    school: data.school,
                    fullname: data.fullname,
                    class: data.class
                })
            }).then(response => response.json()).then((responseJson) => {
                console.log(responseJson);
                if (responseJson.status == false) {
                    CallAPIError(responseJson.msg);
                } else {
                    LoadAPIFrofileHV(dispatch);
                }
            }).catch((err) => {
                console.log('err', err)
            });
        } catch (error) {

        }
    }
}
function LoadAPIUnitByClass(id, dispatch, index) {
    return fetch(API.baseurl + DataAPI.UrlMapUnitClass + '?class_id=' + id, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-API-KEY': '8c3a30506d9633a8b202cb5a91873efa',
            'jwt_token': '' + APIBase.jwt_token,
            'Authorization': 'Basic ' + base64.encode('gek_admin:gek_admin_password'),
        }
    }).then(response => response.json()).then((responseJson) => {
        // console.log(responseJson);

        if (responseJson.status == false) {
            Alert.alert(responseJson.msg)
        } else {
            dispatch({ type: CHOICECLASS, data: responseJson.data, index });
        }
    }).catch((err) => {
        console.log('err', err)
    });
}
function LoadAPIFrofileHV(dispatch) {
    console.log("=====LoadAPIFrofileHV")
    return fetch(API.baseurl + DataAPI.UrlProfile + '?id=' + MyData.TokenUser.id, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-API-KEY': '8c3a30506d9633a8b202cb5a91873efa',
            'jwt_token': '' + APIBase.jwt_token,
            'Authorization': 'Basic ' + base64.encode('gek_admin:gek_admin_password'),
        }
    }).then(response => response.json()).then((responseJson) => {
        console.log("=====ResPro", responseJson)
        if (responseJson.status == false) {
            Alert.alert(responseJson.msg)
        } else {
            console.log("=====ResAva", responseJson.data)
            dispatch({ type: LOAD_PROFILE_HV, data: responseJson });
        }
    }).catch((err) => {
        console.log('err', err)
    });
}
function loadExerciseByClass(id, dispatch) {
    return fetch(API.baseurl + DataAPI.UrlExerciseClass + '?class_id=' + id, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-API-KEY': '8c3a30506d9633a8b202cb5a91873efa',
            'jwt_token': '' + APIBase.jwt_token,
            'Authorization': 'Basic ' + base64.encode('gek_admin:gek_admin_password'),
        }
    }).then(response => response.json()).then((responseJson) => {

        if (responseJson.status == false) {
            Alert.alert(responseJson.msg)
        } else {
            dispatch({ type: LOAD_API_EXERCISE_HV, data: responseJson.data });
        }
    }).catch((err) => {
        console.log('err', err)
    });
}
function loadAPIRankHVByClass(id, dispatch) {
    return fetch(API.baseurl + DataAPI.UrlRank + '?type=class&class_id=' + id, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-API-KEY': '8c3a30506d9633a8b202cb5a91873efa',
            'jwt_token': '' + APIBase.jwt_token,
            'Authorization': 'Basic ' + base64.encode('gek_admin:gek_admin_password'),
        }
    }).then(response => response.json()).then((responseJson) => {

        if (responseJson.status == false) {
            Alert.alert(responseJson.msg)
        } else {
            dispatch({ type: LOAD_API_RANK_HV, data: responseJson.data });
        }
    }).catch((err) => {
        console.log('err', err)
    });
}

function loadAPIListHVByClass(id, dispatch) {
    return fetch(API.baseurl + DataAPI.UrlListStudentClass + '?class_id=' + id, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-API-KEY': '8c3a30506d9633a8b202cb5a91873efa',
            'jwt_token': '' + APIBase.jwt_token,
            'Authorization': 'Basic ' + base64.encode('gek_admin:gek_admin_password'),
        }
    }).then(response => response.json()).then((responseJson) => {


        if (responseJson.status == false) {
            Alert.alert(responseJson.msg)
        } else {
            dispatch({ type: LOAD_API_LIST_HV, data: responseJson.data });
        }
    }).catch((err) => {
        console.log('err', err)
    });
};

function loadAPIDetailByClass(id, dispatch) {
    return fetch(API.baseurl + DataAPI.UrlDetailClass + '?id=' + id, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-API-KEY': '8c3a30506d9633a8b202cb5a91873efa',
            'jwt_token': '' + APIBase.jwt_token,
            'Authorization': 'Basic ' + base64.encode('gek_admin:gek_admin_password'),
        }
    }).then(response => response.json()).then((responseJson) => {

        if (responseJson.status == false) {
            Alert.alert(responseJson.msg)
        } else {
            dispatch({ type: LOAD_API_DETAIL_CLASS_HV, data: responseJson.data });
        }
    }).catch((err) => {
        console.log('err', err)
    });
}

function loadAPIAchievementsByClass(id, dispatch) {
    return fetch(API.baseurl + DataAPI.UrlAchievements + '?id=' + id, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-API-KEY': '8c3a30506d9633a8b202cb5a91873efa',
            'jwt_token': '' + APIBase.jwt_token,
            'Authorization': 'Basic ' + base64.encode('gek_admin:gek_admin_password'),
        }
    }).then(response => response.json()).then((responseJson) => {

        if (responseJson.status == false) {
            Alert.alert(responseJson.msg)
        } else {
            dispatch({ type: LOAD_API_HONORS_HV, data: responseJson.data });
        }
    }).catch((err) => {
        console.log('err', err)
    });
}


function LoginApp(dispatch) {
    LoadAPIHome(dispatch);
    LoadAPIClass(dispatch);
    LoadAPIProcess(dispatch);

}

function LoadAPIHome(dispatch) {
    return fetch(API.baseurl + DataAPI.UrlHomeScreen, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-API-KEY': '8c3a30506d9633a8b202cb5a91873efa',
            'jwt_token': '' + APIBase.jwt_token,
            'Authorization': 'Basic ' + base64.encode('gek_admin:gek_admin_password'),
        }
    }).then(response => response.json()).then((responseJson) => {
        if (responseJson.status == false) {
            //Alert.alert(responseJson.msg)
            CallAPIError(responseJson.status);
        } else {
            dispatch({ type: LOAD_API_HOMESCREEN, data: responseJson });
        }
    }).catch((err) => {
        console.log('err', err)
    });
}

function LoadAPIProcess(dispatch) {
    return fetch(API.baseurl + DataAPI.UrlProcess + '?student_id=' + MyData.UserLogin.id, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-API-KEY': '8c3a30506d9633a8b202cb5a91873efa',
            'jwt_token': '' + APIBase.jwt_token,
            'Authorization': 'Basic ' + base64.encode('gek_admin:gek_admin_password'),
        }
    }).then(response => response.json()).then((responseJson) => {
        dispatch({ type: LOAD_API_RANKSCREEN, data: responseJson.data });
    }).catch((err) => {
        console.log('err', err)
    });
}

function LoadAPIClass(dispatch) {
    return fetch(API.baseurl + DataAPI.UrlClass, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-API-KEY': '8c3a30506d9633a8b202cb5a91873efa',
            'jwt_token': '' + APIBase.jwt_token,
            'Authorization': 'Basic ' + base64.encode('gek_admin:gek_admin_password'),
        }
    }).then(response => response.json()).then((responseJson) => {
        dispatch({ type: LOAD_API_CLASSSCREEN, data: responseJson.data });
        LoadAPIUnit(responseJson.data, dispatch);
    }).catch((err) => {
        console.log('err', err)
    });
}
function LoadAPIUnit(data, dispatch) {
    let id = data[0].id;
    return fetch(API.baseurl + DataAPI.UrlMapUnitClass + '?class_id=' + id, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-API-KEY': '8c3a30506d9633a8b202cb5a91873efa',
            'jwt_token': '' + APIBase.jwt_token,
            'Authorization': 'Basic ' + base64.encode('gek_admin:gek_admin_password'),
        }
    }).then(response => response.json()).then((responseJson) => {
        dispatch({ type: LOAD_API_UNITSCREEN, data: responseJson.data });
    }).catch((err) => {
        console.log('err', err)
    });
}
function LoginAPIFreeLearning(id, dispatch) {
    switch (id) {
        case 0: LoadAPISkill(dispatch, 'Grammar', LOAD_SKILL_GRAMMAR); break;
        case 1: LoadAPISkill(dispatch, 'Writing', LOAD_SKILL_WRITING); break;
        case 2: LoadAPISkill(dispatch, 'Speaking', LOAD_SKILL_SPEAKING); break;
        case 3: LoadAPISkill(dispatch, 'Vocabulary', LOAD_SKILL_VOCABULARY); break;
        case 4: LoadAPISkill(dispatch, 'Reading', LOAD_SKILL_READING); break;
        case 5: LoadAPISkill(dispatch, 'Listening', LOAD_SKILL_LISTENING); break;
        case 6: LoadAPISkill(dispatch, 'Pronunciation', LOAD_SKILL_PRONUNCIATION); break;
        case 7: LoadAPISkill(dispatch, 'mini_test', LOAD_SKILL_MINITEST); break;
        default: return null;
    }
}

function LoadAPISkill(dispatch, NameSkill, typeSkill) {
    console.log(NameSkill);
    return fetch(DataAPI.UrlFreeLearning + '?skill=' + NameSkill, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-API-KEY': '8c3a30506d9633a8b202cb5a91873efa',
            'jwt_token': '' + APIBase.jwt_token,
            'Authorization': 'Basic ' + base64.encode('gek_admin:gek_admin_password'),
        }
    }).then(response => response.json()).then((responseJson) => {
        dispatch({ type: typeSkill, data: responseJson.data });
    }).catch((err) => {
        console.log('err', err)
    });
}

function CallAPIError(er) {
    console.log(er);
    Alert.alert(
        'Thông báo',
        '' + er,
        [
            {
                text: 'OK', onPress: async () => {
                    await MyData.Navigation.dispatch(ActionLogin({}));
                    MyData.Navigation.navigation.navigate('LoginApp');
                }
            },
        ],
    )
}

function LoadAPILicenseHV(dispatch) {
    console.log('call license');
    return fetch(API.baseurl + DataAPI.UrlLicense, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-API-KEY': '8c3a30506d9633a8b202cb5a91873efa',
            'jwt_token': '' + APIBase.jwt_token,
            'Authorization': 'Basic ' + base64.encode('gek_admin:gek_admin_password'),
        }
    }).then(response => response.json()).then((responseJson) => {
        dispatch({ type: LOAD_API_LICENSE_HV, data: responseJson })
    }).catch((err) => {
        console.log('err', err)
    });
}
function LoadAPISettingHV(dispatch) {
    return fetch(API.baseurl + DataAPI.UrlSetting, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-API-KEY': '8c3a30506d9633a8b202cb5a91873efa',
            'jwt_token': '' + APIBase.jwt_token,
            'Authorization': 'Basic ' + base64.encode('gek_admin:gek_admin_password'),
        }
    }).then(response => response.json()).then((responseJson) => {
        dispatch({ type: LOAD_API_SETTING_HV, data: responseJson.data })
    }).catch((err) => {
        console.log('err', err)
    });
}

function LoadAPIImprovementFunc(id, dispatch) {
    return fetch(API.baseurl + DataAPI.UrlImprovement + '?class_id=' + id, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'X-API-KEY': '8c3a30506d9633a8b202cb5a91873efa',
            'jwt_token': '' + APIBase.jwt_token,
            'Authorization': 'Basic ' + base64.encode('gek_admin:gek_admin_password'),
        }
    }).then(response => response.json()).then((responseJson) => {
        if (responseJson.status == true) {
            dispatch({ type: LOAD_API_IMPROVEMENT, data: responseJson });
        } else {
            CallAPIError(responseJson.msg);
        }
    }).catch((err) => {
        console.log('err', err)
    });
}

export const loadHistoryMasterUnitExercises = (lesson) => async (
    dispatch,
    getState,
  ) => {
    const result = await APIBase.postDataJson(
      'get',
      `${API.baseurl}${API.getMasterUnitLessonHistory(lesson.lesson_id, lesson.type)}`,
    );
    console.log("======loadHistoryMasterUnitExercises",result.data)
    dispatch({
      type: LOAD_HOMEWORK_HISTORY,
      data: {
        homeworkExercises: result.data.data_log,
        lessonData: result.data.lesson_data,
      },
    });
  };

export const loadHistoryExercises = (lessonId, lesson_type, class_id) => async (
    dispatch,
    getState,
  ) => {
    console.log("======++loadHistoryExercises", lesson_type)
    const result = await APIBase.postDataJson(
      'get',
      `${API.baseurl}${API.getLessonHistory}?lesson_id=${lessonId}&lesson_type=${lesson_type}&class_id=${class_id}`,
    );
    console.log("======loadHistoryExercises",result.data)
    dispatch({
      type: LOAD_HOMEWORK_HISTORY,
      data: {
        homeworkExercises: result.data.data_log,
        lessonData: result.data.lesson_data,
      },
    });
  };
  
  export const loadHistoryHomeworkDetail = (
    exerciseId,
    library,
    exerciseType,
  ) => async (dispatch, getState) => {
    const result = await APIBase.postDataJson(
      'get',
      `${API.baseurl}${API.getExerciseDetail(exerciseId, library, exerciseType)}`,
    );
    return mapHomeworkDetail(result.data);
  };

  export const loadSettingAtHome = async (deviceId) => {
    LogBase.log('==========ReqloadSettingApp', `${API.baseurl + DataAPI.UrlSettingApp}?device_id=${deviceId}`);
    const responseJson = await APIBase.postDataJson(
      'get',
      `${API.baseurl + DataAPI.UrlSettingApp}?device_id=${deviceId}`,
    );
    LogBase.log('==========loadSettingAtHome', responseJson.data);
    if (!responseJson.data.status) {
      throw responseJson.data;
    }
    return responseJson;
  };

  export const loadSettingApp = (deviceId, token) => async (dispatch) => {
    LogBase.log('==========+ReqloadSettingApp', `${API.baseurl + DataAPI.UrlSettingApp}?device_id=${deviceId}`);
    const responseJson = await APIBase.postDataJson(
      'get',
      `${API.baseurl + DataAPI.UrlSettingApp}?device_id=${deviceId}`,
    );
    LogBase.log('==========loadSettingApp', responseJson.data);
    if (!responseJson.data.status) {
      throw responseJson.data;
    }
    dispatch({
      type: LOAD_SETTING_APP,
      data: {
        ...responseJson.data.data_setting,
        data_contact: responseJson.data.data_contact,
        userDeviceId: responseJson.data.user_device_id,
      },
    });
    return responseJson;
  };

  export const loadSettingAppParent = (deviceId, token) => async (dispatch) => {
    LogBase.log('==========+ReqloadSettingApp', `${API.baseurl + DataAPI.UrlSettingAppParent}?device_id=${deviceId}`);
    const responseJson = await APIBase.postDataJson(
      'get',
      `${API.baseurl + DataAPI.UrlSettingAppParent}?device_id=${deviceId}`,
    );
    LogBase.log('==========loadSettingAppParent', responseJson.data);
    if (!responseJson.data.status) {
      throw responseJson.data;
    }
    dispatch({
      type: LOAD_SETTING_APP,
      data: {
        ...responseJson.data.data_setting,
        data_contact: responseJson.data.data_contact,
        userDeviceId: responseJson.data.user_device_id,
      },
    });
    return responseJson;
  };

  export const saveSettingApp = (jsonSetting, userDeviceId, token) => async (
    dispatch,
  ) => {
    const responseJson = await APIBase.postDataJson(
      'put',
      `${API.baseurl + DataAPI.UrlSaveSettingApp}`,
      JSON.stringify({
        json_setting: JSON.stringify(jsonSetting),
        user_device_id: userDeviceId,
      }),
    );
    LogBase.log("=====jsonSetting",jsonSetting)
    LogBase.log("=====userDeviceId",userDeviceId)
    LogBase.log("=====report",responseJson.data)
    if (!responseJson.data.status) {
      throw responseJson.data.msg;
    }
    return responseJson.data;
  };

