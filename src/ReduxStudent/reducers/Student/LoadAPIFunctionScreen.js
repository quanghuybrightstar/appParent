import {
    LOAD_API_SETTING_HV,
    LOAD_API_LICENSE_HV,
    LOAD_SETTING_APP
} from "../../actions/Student/types";
const data = {
    Setting: {
        isLoading: true,
        DataSetting: null
    },
    License: {
        isLoading: true,
        DataLicense: null
    },
    settingApp: null
};
export default function (state = data, action) {
    switch (action.type) {
        case LOAD_API_LICENSE_HV:
            data.License.isLoading =false,
            data.License.DataLicense=action.data;
            return {
                ...state,
                License: {
                    isLoading: false,
                    DataLicense: action.data
                }
            }
        case LOAD_API_SETTING_HV:
            data.Setting.isLoading =false,
            data.Setting.DataSetting=action.data;
            return {
                ...state,
                Setting: {
                    isLoading: false,
                    DataSetting: action.data
                }
            }
        case LOAD_SETTING_APP:
            return {
                ...state,
                settingApp: action.data,
            };
        default:
            return state;
    }
}