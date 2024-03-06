import Types from '../types'

const initState = {
    reading:{}
}
const reading9Reducer = (state=initState, action ) =>{
    const {payload, type} = action;
    switch (type){
        case Types.READINGD9:
            return{
                reading:payload
            }
        default:
            return state
    }
}
export default reading9Reducer