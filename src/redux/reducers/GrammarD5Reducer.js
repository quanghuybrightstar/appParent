import Types from '../types';


const initState = {
    data_answer:[]
};

const GrammarD5Reducer = (state = initState, action) => {
    const {type, payload} = action;
    switch (type) {
        case Types.GrammarD5:
            return {
                data_answer: payload ,
            };
        default:
            return state;
    }
};

export default GrammarD5Reducer;
