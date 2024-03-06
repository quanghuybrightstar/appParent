import { LOAD_SKILL_UNIT, LOAD_API_IMPROVEMENT, LOAD_HOMEWORK_HISTORY} from "../../actions/Student/types";
const data = {
    Skill_Unit: {
        isLoading: true,
        Data: null
    },
    Imporvement: {
        isLoading: true,
        Data: null
    },
    homeworkExercises: [],
    lessonData: null
};
export default function (state = data, action) {
    switch (action.type) {
        case LOAD_SKILL_UNIT:
            data.Skill_Unit.isLoading=false;
            data.Skill_Unit.Data=action.data;
            return {
                ...state,
                Skill_Unit: {
                    isLoading: false,
                    Data: action.data
                }

            }
        case LOAD_API_IMPROVEMENT:
            data.Imporvement.isLoading=false;
            data.Imporvement.Data=action.data;
            return {
                ...state,
                Imporvement: {
                    isLoading: false,
                    Data: action.data
                }
            }
        case LOAD_HOMEWORK_HISTORY:
            return {
                ...state,
                lessonData: action.data.lessonData,
                homeworkExercises: action.data.homeworkExercises,
                }
        default:
            return state;
    }
}