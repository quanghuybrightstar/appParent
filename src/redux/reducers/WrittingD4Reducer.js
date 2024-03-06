import Types from '../types';


const initState = {
    data_answer:[]
};

const WrittingD4Reducer = (state = initState, action) => {
    const {type, payload} = action;
    switch (type) {
        case Types.WRITTINGD4:
            return {
                data_answer: payload ,
            };
        default:
            return state;
    }
};

export default WrittingD4Reducer;
