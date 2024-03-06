import Types from '../types';

const initialState = {
    dataStudent: [],
    currentStudent: null
};

const ListStudentReducer = (state = initialState, action) => {
    const {type, param} = action;
    switch (type) {
        case Types.SAVELISTSTUDENT:
            return {
                ...state,
                dataStudent: param,
            };
        case Types.CHOOSESTUDENT:
            return {
                ...state,
                currentStudent: param
            };
        default:
            return state;
    }
};

export default ListStudentReducer;
