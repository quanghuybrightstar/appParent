import { LOAD_API_INBOX_DETAIL_HV } from "../../actions/Student/types";
const data = {
    isLoading: true,
    ListInbox:null
}
export default function (state = data, action) {
    switch (action.type) {
        case LOAD_API_INBOX_DETAIL_HV:
            return {
                isLoading: false,
                InboxDetail:action.data
            };
        default:
            return state;
    }
}