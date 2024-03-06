import Types from '../types';


const initState = {
  listening:[]
};

const Listening9Reducer = (state = initState, action) => {
  const {type, payload} = action;
  switch (type) {
    case Types.LISTENING9:
      return {
        listening: payload,
      };
    case Types.CLEAR_USER:
      return initState;
    default:
      return state;
  }
};

export default Listening9Reducer;