import Axios from "axios";
import { useEffect, useRef, useState} from "react"
import API from "../../../API/APIConstant";
import APIBase from "../../../base/APIBase";
import MyData from "../../../component/MyData";
import { useSelector } from 'react-redux';
/**
 * grammar logic hanlder
 * @param {object} props 
 * @returns object
 */
export const grammarMethod = (props) => {
    const videoRef = useRef()
    const [grammar, setGrammar] = useState({})
    const [loading, setLoading] = useState(false);
    const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);
    useEffect(() => {
        getGrammar()
    }, [])

    /**
     * get grammar information
     */
    const getGrammar = async () => {
        let params = props.navigation.state.params
        setLoading(true)
        const url = dataLogin.role === 'student' ?
        API.baseurl + API.studentLesson(params.data.lesson_id, params.data.class_id) :
        API.baseurl + API.teacherLesson + params.data.lesson_id;
        try {

            const res = await APIBase.postDataJson('get', url)
            setLoading(false)
            if (!!res.data) {
                return setGrammar(res.data)
            }
        } catch (error) {
            console.log('err', error.response);
            console.log('err', error.request);
            setLoading(false)
            return Promise.reject(error)
        }
    }
    return {
        videoRef,
        grammar,
        loading
    }
}