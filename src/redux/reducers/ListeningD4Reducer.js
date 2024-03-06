import Types from '../types';


const initState = {
    data_answer:[]
};

const ListeningD4Reducer = (state = initState, action) => {
    const {type, payload} = action;
    switch (type) {
        case Types.LISTENINGD4:
            return {
                data_answer: payload ,
            };
        default:
            return state;
    }
};

export default ListeningD4Reducer;
