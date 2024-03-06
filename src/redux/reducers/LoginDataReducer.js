import Types from '../types';

const initialState = {
    loginData: {},
};

/**
 * Language Reducer
 * @param {object} state current state
 * @param {object} action data from dispatch
 * @returns object
 */
export default LoginDataReducer = (state = initialState, action) => {
    const { type, param } = action;
    switch (type) {
        case Types.LOGIN_DATA :{
            return {
                ...state,
                loginData: param,
            };
        }
        default:
            return state;
    }
};