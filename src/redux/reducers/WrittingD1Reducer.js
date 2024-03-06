import Types from '../types';


const initState = {
    data_answer:[]
};

const WrittingD1Reducer = (state = initState, action) => {
    const {type, payload} = action;
    switch (type) {
        case Types.WRITTINGD1:
            return {
                data_answer: payload ,
            };
        default:
            return state;
    }
};

export default WrittingD1Reducer;
