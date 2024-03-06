import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import API from "../../../../API/APIConstant"
import APIBase from "../../../../base/APIBase"
import { Colors } from "../../../../styleApp/color"

/**
 * ViewAttendanceTeacherScreen Screen logic handler
 * @param {object} props navigation props
 * @returns 
*/
export const useModel = (props) => {

    const language = useSelector(state => state.LanguageStackReducer.language)
    const { AttendancePaperTeacherScreen } = language
    //Loading Flag
    const [loading, setLoading] = useState(false)
    //attendance data object
    const [attendanceItem] = useState(props.navigation.state.params.item)
    //Class data object
    const [classItem] = useState(props.navigation.state.params.classItem)
    //Attendance data
    const [attendanceDetail, setAttendanceDetail] = useState()
    //base url for img
    const [baseUrl, setBaseUrl] = useState('')
    //status of attendance
    const [status, setStatus] = useState([{
        label: AttendancePaperTeacherScreen.OnTimeSt,
        value: 0,
        color: [Colors.LightGreen, Colors.BaseGreen],
        body_value: 'intime'
    }, {
        label: AttendancePaperTeacherScreen.LateSt,
        value: 1,
        color: [Colors._ED8A22, Colors._ED8A22],
        body_value: 'late'
    }, {
        label: AttendancePaperTeacherScreen.DropoutSt,
        value: 2,
        color: [Colors._BE1E2D, Colors._BE1E2D],
        body_value: 'absence_not_allowed'
    }, {
        label: AttendancePaperTeacherScreen.TakeLeaveSt,
        value: 3,
        color: [Colors._BE1E2D, Colors._BE1E2D],
        body_value: 'absence_allowed'
    }])
    useEffect(() => {
        const listener = props.navigation.addListener('didFocus', getData)
        return () => {
            listener.remove();
        }
    }, [])

    /**
     * Function get detail information of attendance ticket
    */
    const getData = async () => {
        const url = API.baseurl + API.detailsAttendance + `${attendanceItem.id}`
        try {
            setLoading(true)
            const res = await APIBase.postDataJson('get', url)
            let data = res.data;
            console.log('🚀 ~ file: ViewAttendanceTeacherScreen.logic.js ~ line 23 ~ getData ~ data', res)
            setLoading(false)
            if (data.hasOwnProperty('data')) {
                setBaseUrl(data.base_url)
                setAttendanceDetail(data.data)
            } else {
                setAttendanceDetail(null)
            }

        } catch (error) {
            setLoading(false)
            // Alert.alert('', error.response.data);
        } finally {
        }
    }


    return {
        attendanceDetail,
        status, classItem, loading, baseUrl
    }
}