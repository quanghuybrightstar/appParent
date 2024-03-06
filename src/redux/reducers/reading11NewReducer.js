import Types from '../types';

const initState = {
    data_answer: {}
};

const Reading11NewReducer = (state = initState, action) => {
    const { type, payload } = action;
    switch (type) {
        case Types.READINGD11NEW:
            return {
                data_answer: payload
            }
        default:
            return state
    }
};
export default Reading11NewReducer;