import Types from '../types'

const initState = {
    reading:{}
}
const reading7ReducerNew = (state=initState, action ) =>{
    const {payload, type} = action;
    switch (type){
        case Types.READINGD7NEW:
            return{
                reading:payload
            }
        default:
            return state
    }
}
export default reading7ReducerNew