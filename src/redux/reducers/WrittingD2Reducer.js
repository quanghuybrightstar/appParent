import Types from '../types';


const initState = {
    data_answer:[]
};

const WrittingD2Reducer = (state = initState, action) => {
    const {type, payload} = action;
    switch (type) {
        case Types.WRITTINGD2:
            return {
                data_answer: payload ,
            };
        default:
            return state;
    }
};

export default WrittingD2Reducer;
