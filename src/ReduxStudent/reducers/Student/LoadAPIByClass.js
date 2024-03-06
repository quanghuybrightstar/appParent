import {
    LOAD_API_LIST_HV,
    LOAD_API_DETAIL_CLASS_HV,
    LOAD_API_EXERCISE_HV,
    LOAD_API_HONORS_HV,
    LOAD_API_RANK_HV
} from "../../actions/Student/types";
const data = {
    isLoading: true,
    ListHV: null,
    ExerciseHV: null,
    RankHV: null,
    HonorsHV: null,
    DetailCalss: null

};
export default function (state = data, action) {
    switch (action.type) {
        case LOAD_API_DETAIL_CLASS_HV:
            data.DetailCalss = action.data;
            return {
                ...state,
                isLoading: false,
                DetailCalss: action.data
            }
        case LOAD_API_LIST_HV:
            data.ListHV = action.data;
            return {
                ...state,
                isLoading: false,
                ListHV: action.data
            }
        case LOAD_API_EXERCISE_HV:
            data.ExerciseHV = action.data;
            return {
                ...state,
                isLoading: false,
                ExerciseHV: action.data,
            }
        case LOAD_API_HONORS_HV:
            data.HonorsHV = action.data;
            return {
                ...state,
                isLoading: false,
                HonorsHV: action.data,
            }
        case LOAD_API_RANK_HV:
            data.RankHV = action.data;
            return {
                ...state,
                isLoading: false,
                RankHV: action.data,
            }
        default:
            return state;
    }
}