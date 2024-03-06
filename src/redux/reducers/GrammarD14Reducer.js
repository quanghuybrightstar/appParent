import Types from '../types';


const initState = {
    data_answer:[]
};

const GrammarD14Reducer = (state = initState, action) => {
    const {type, payload} = action;
    switch (type) {
        case Types.GRAMMARD14:
            return {
                data_answer: payload ,
            };
        default:
            return state;
    }
};

export default GrammarD14Reducer;
