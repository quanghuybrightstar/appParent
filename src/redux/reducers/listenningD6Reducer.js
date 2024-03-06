import Types from '../types';


const initState = {
    data_answer:[]
};

const listenningD6Reducer = (state = initState, action) => {
    const {type, payload} = action;
    switch (type) {
        case Types.READINGD6:
            return {
                data_answer: payload ,
            };
        default:
            return state;
    }
};

export default listenningD6Reducer;
