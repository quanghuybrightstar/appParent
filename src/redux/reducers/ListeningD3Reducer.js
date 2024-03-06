import Types from '../types';


const initState = {
    data_answer:[]
};

const ListeningD3Reducer = (state = initState, action) => {
    const {type, payload} = action;
    switch (type) {
        case Types.LISTENINGD3:
            return {
                data_answer: payload ,
            };
        default:
            return state;
    }
};

export default ListeningD3Reducer;
