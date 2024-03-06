import { LOAD_API_INBOX_HV,LOAD_API_INBOX_SYSTEM } from "../../actions/Student/types";
const data = {
    isLoading: true,
    ListInbox:null,
    ListInboxSystem:null
}
export default function (state = data, action) {
    switch (action.type) {
        case LOAD_API_INBOX_HV:
            data.isLoading=false,
            data.ListInbox=action.data
            return {
                ...state,
                isLoading: false,
                ListInbox:action.data
            };
        case LOAD_API_INBOX_SYSTEM:
            data.ListInboxSystem=action.data;
            return{
                ...state,
                ListInboxSystem:action.data
            }
        default:
            return state;
    }
}