import Types from '../types';


const initState = {
    data_answer:[]
};

const GrammarD1Reducer = (state = initState, action) => {
    const {type, payload} = action;
    switch (type) {
        case Types.GRAMMARD1:
            return {
                data_answer: payload ,
            };
        default:
            return state;
    }
};

export default GrammarD1Reducer;
