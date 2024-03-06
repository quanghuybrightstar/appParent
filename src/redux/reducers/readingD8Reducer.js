import Types from '../types'

const initState = {
    reading:{}
}
const reading8Reducer = (state=initState, action ) =>{
    const {payload, type} = action;
    switch (type){
        case Types.READINGD8:
            return{
                reading:payload
            }
        default:
            return state
    }
}
export default reading8Reducer