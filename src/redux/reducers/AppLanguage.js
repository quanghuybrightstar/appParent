import Types from '../types';

const initialState = {
    language: {}
};

/**
 * Language Reducer
 * @param {object} state current state
 * @param {object} action data from dispatch
 * @returns object
 */
export const LanguageStackReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case Types.LANGUAGE:
            return {
                language: payload,
            };
        default:
            return state;
    }
};