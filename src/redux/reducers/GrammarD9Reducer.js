import Types from '../types';


const initState = {
    data_answer:[]
};

const GrammarD9Reducer = (state = initState, action) => {
    const {type, payload} = action;
    switch (type) {
        case Types.GRAMMARD9:
            return {
                data_answer: payload ,
            };
        default:
            return state;
    }
};

export default GrammarD9Reducer;
