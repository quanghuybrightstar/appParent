import Types from '../types';


const initState = {
  data_answer:[]
};

const readingD7Reducer = (state = initState, action) => {
  const {type, payload} = action;
  switch (type) {
    case Types.READINGD7:
      return {
        data_answer: payload ,
      };
    default:
      return state;
  }
};

export default readingD7Reducer;
// import Types from '../types'

// const initState = {
//     reading:{}
// }
// const reading7Reducer = (state=initState, action ) =>{
//     const {payload, type} = action;
//     switch (type){
//         case Types.READINGD7:
//             return{
//                 reading:payload
//             }
//         default:
//             return state
//     }
// }
// export default reading7Reducer
