import Types from '../types';


const initState = {
  data_answer:[]
};

const readingF14Reducer = (state = initState, action) => {
  const {type, payload} = action;
  switch (type) {
    case Types.READINGF14:
      return {
        data_answer: payload ,
      };
    default:
      return state;
  }
};

export default readingF14Reducer;