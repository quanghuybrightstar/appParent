import Types from '../types';


const initState = {
    data_answer:[]
};

const timegiaobai = (state = initState, action) => {
    const {type, payload} = action;
    switch (type) {
        case Types.TIMEGIAOBAI:
            return {
                data_answer: payload ,
            };
        default:
            return state;
    }
};

export default timegiaobai;
