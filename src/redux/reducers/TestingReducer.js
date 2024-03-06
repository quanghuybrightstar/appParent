import Types from '../types';
const initState = {
    testing: 'homeword'
};

const TesttingReducer = (state = initState, action) => {
    const { type, payload } = action;
    switch (type) {
        case Types.TESTING:
            return {
                testing: payload
            }
        default:
            return state;
    }
};
export default TesttingReducer
