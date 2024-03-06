import Types from '../types';


const initState = {
  data_question:{}
};

const readingF4Reducer = (state = initState, action) => {
  const {type, payload} = action;
  switch (type) {
    case Types.READINGF4:
      return {
        data_question: payload ,
      };
    default:
      return state;
  }
};

export default readingF4Reducer;