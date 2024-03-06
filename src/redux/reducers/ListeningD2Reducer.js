import Types from '../types';


const initState = {
    data_answer:[]
};

const ListeningD2Reducer = (state = initState, action) => {
    const {type, payload} = action;
    switch (type) {
        case Types.LISTENINGD2:
            return {
                data_answer: payload ,
            };
        default:
            return state;
    }
};

export default ListeningD2Reducer;
