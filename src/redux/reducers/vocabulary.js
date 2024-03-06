import Types from '../types';

const initState = {
    vocabulary: []
};
const vocabularyReducers = (state = initState, action) => {
    const { payload, type } = action;
    switch (type) {
        case Types.VOCABULARY:
            return {
                ...state,
               vocabulary: payload
            };
        case Types.CLEAR_USER:
            return initState;
        default:
            return state;
    }
};
export default vocabularyReducers;