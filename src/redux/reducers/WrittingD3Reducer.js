import Types from '../types';


const initState = {
    data_answer:[]
};

const WrittingD3Reducer = (state = initState, action) => {
    const {type, payload} = action;
    switch (type) {
        case Types.WRITTINGD3:
            return {
                data_answer: payload ,
            };
        default:
            return state;
    }
};

export default WrittingD3Reducer;
