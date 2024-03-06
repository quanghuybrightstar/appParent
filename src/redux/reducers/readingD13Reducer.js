import Types from '../types';


const initState = {
  data_answer:[]
};

const readingD13Reducer = (state = initState, action) => {
  const {type, payload} = action;
  switch (type) {
    case Types.READINGD13:
      return {
        data_answer: payload ,
      };
    default:
      return state;
  }
};

export default readingD13Reducer;
// import Types from '../types'

// const initState = {
//     reading:{}
// }
// const reading13Reducer = (state=initState, action ) =>{
//     const {payload, type} = action;
//     switch (type){
//         case Types.READINGD13:
//             return{
//                 reading:payload
//             }
//         default:
//             return state
//     }
// }
// export default reading13Reducer
