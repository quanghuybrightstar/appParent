import Types from '../types';


const initState = {
    data_answer:[]
};

const GrammarD2Reducer = (state = initState, action) => {
    const {type, payload} = action;
    switch (type) {
        case Types.GRAMMARD2:
            return {
                data_answer: payload ,
            };
        default:
            return state;
    }
};

export default GrammarD2Reducer;
