import Types from '../types'

const initState = {
    reading:{}
}
const reading13NewReducer = (state=initState, action ) =>{
    const {payload, type} = action;
    switch (type){
        case Types.READINGD13NEW:
            return{
                reading:payload
            }
        default:
            return state
    }
}
export default reading13NewReducer