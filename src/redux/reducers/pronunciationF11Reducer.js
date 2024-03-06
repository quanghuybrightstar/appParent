import Types from '../types';


const initState = {
  data_question:[]
};

const pronunciationF11Reducer = (state = initState, action) => {
  const {type, payload} = action;
  switch (type) {
    case Types.PRONUNCIATIONF11:
      return {
        data_question: payload ,
      };
    default:
      return state;
  }
};

export default pronunciationF11Reducer;