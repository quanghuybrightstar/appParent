import Types from '../types';


const initState = {
    data_answer:[]
};

const ListeningD7Reducer = (state = initState, action) => {
    const {type, payload} = action;
    switch (type) {
        case Types.LISTENINGD7:
            return {
                data_answer: payload ,
            };
        default:
            return state;
    }
};

export default ListeningD7Reducer;
