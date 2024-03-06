import { LOAD_PROFILE_HV } from "../../actions/Student/types";
const data = {
    isLoading: true,
    Data:null

};
export default function (state = data, action) {
    switch (action.type) {
        case LOAD_PROFILE_HV:
            return {
                isLoading:false,
                Data:action.data
            }
        default:
            return state;
    }
}