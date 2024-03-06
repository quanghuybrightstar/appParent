import Types from '../types'

const initState = {
    listening:{}
}
const Listening8Reducer = (state=initState, action ) =>{
    const {payload, type} = action;
    switch (type){
        case Types.LISTENING8:
            return{
                listening:payload
            }
        default:
            return state
    }
}
export default Listening8Reducer