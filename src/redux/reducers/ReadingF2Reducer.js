import Types from '../types';


const initState = {
  data_answer:[]
};

const readingF2Reducer = (state = initState, action) => {
  const {type, payload} = action;
  switch (type) {
    case Types.READINGF2:
      return {
        data_answer: payload ,
      };
    default:
      return state;
  }
};

export default readingF2Reducer;