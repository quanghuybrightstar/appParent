import Types from '../types';


const initState = {
    data_answer:[]
};

const ListeningD5Reducer = (state = initState, action) => {
    const {type, payload} = action;
    switch (type) {
        case Types.LISTENINGD5:
            return {
                data_answer: payload ,
            };
        default:
            return state;
    }
};

export default ListeningD5Reducer;
