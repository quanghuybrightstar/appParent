import Types from '../types';


const initState = {
    data_answer:[]
};

const hoanthanhReducer = (state = initState, action) => {
    const {type, payload} = action;
    switch (type) {
        case Types.HOANTHANH:
            let data = {...state};
            let dataAnswer = [...data.data_answer];
            dataAnswer = payload;
            data.data_answer = dataAnswer;
            return data;
        default:
            return state;
    }
};


export default hoanthanhReducer;
