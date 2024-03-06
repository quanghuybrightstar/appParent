import Types from '../types';


const initState = {
  data_answer:[]
};

const readingF6Reducer = (state = initState, action) => {
  const {type, payload} = action;
  switch (type) {
    case Types.READINGF6:
      return {
        data_answer: payload ,
      };
    default:
      return state;
  }
};

export default readingF6Reducer;