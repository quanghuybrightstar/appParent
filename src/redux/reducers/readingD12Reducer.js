import Types from '../types';


const initState = {
  data_answer:[]
};

const readingD12Reducer = (state = initState, action) => {
  const {type, payload} = action;
  switch (type) {
    case Types.READINGD12:
      return {
        data_answer: payload ,
      };
    default:
      return state;
  }
};

export default readingD12Reducer;