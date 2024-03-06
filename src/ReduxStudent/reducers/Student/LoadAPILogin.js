import {
    LOAD_API_LOGIN,
    CHOICECLASS,
    LOAD_API_HOMESCREEN,
    LOAD_API_CLASSSCREEN,
    LOAD_API_UNITSCREEN,
    LOAD_API_RANKSCREEN,
    START_CALL_API
} from "../../actions/Student/types";
const data = {
    HomeScreen: null,
    ClassScreen: {
        Class: null,
        Choice: 0,
        isLoading: true
    },
    DataUnit: null,
    ProcessScreen: null,
    isLoading: true,
    isLoadingProcess: true
}
export default function LoginMain(state = data, action) {
    switch (action.type) {
        case LOAD_API_LOGIN:
            return {
                ...state,
                isLoading: false
            };
        case LOAD_API_HOMESCREEN:
            data.HomeScreen = action.data;
            return {
                ...state,
                HomeScreen: action.data,
                isLoading: false
            };
        case LOAD_API_CLASSSCREEN:
            data.ClassScreen = action.data;
            return {
                ...state,
                ClassScreen: {
                    Class: action.data,
                    Choice: 0,
                    isLoading: false
                }
            };
        case LOAD_API_UNITSCREEN:
            data.DataUnit = action.data;
            return {
                ...state,
                DataUnit: action.data,
                isLoading: false,
            }
        case LOAD_API_RANKSCREEN:
            data.ProcessScreen = action.data;
            return {
                ...state,
                ProcessScreen: action.data,
                isLoadingProcess: false
            }
        case CHOICECLASS:
            data.DataUnit = action.data;
            data.ClassScreen.Choice = action.index;
            return {
                ...state,
                DataUnit:action.data,
                isLoading:false
            }
        case START_CALL_API:{
            data.isLoading = true;
            console.log('call class unit');
            return{
                ...state,
                isLoading:true
            }
        }
        default:
            return state;
    }
}