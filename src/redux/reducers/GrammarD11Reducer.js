import Types from '../types';


const initState = {
    data_answer:[]
};

const GrammarD11Reducer = (state = initState, action) => {
    const {type, payload} = action;
    switch (type) {
        case Types.GRAMMARD11:
            return {
                data_answer: payload ,
            };
        default:
            return state;
    }
};

export default GrammarD11Reducer;
