import Types from '../types'

const initState = {
    reading:{}
}
const reading10Reducer = (state=initState, action ) =>{
    const {payload, type} = action;
    switch (type){
        case Types.READINGD10:
            return{
                reading:payload
            }
        default:
            return state
    }
}
export default reading10Reducer