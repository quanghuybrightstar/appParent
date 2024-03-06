import Types from '../types';


const initState = {
    data_answer:[]
};

const ListeningD1Reducer = (state = initState, action) => {
    const {type, payload} = action;
    switch (type) {
        case Types.LISTENINGD1:
            return {
                data_answer: payload ,
            };
        default:
            return state;
    }
};

export default ListeningD1Reducer;
