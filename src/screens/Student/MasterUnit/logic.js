import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import DataAPI from '../../../component/DataAPI';
import APIBase from '../../../base/APIBase';
import API from '../../../API/APIConstant';

const useLogic = (classId) => {
    const [data, setData] = useState([]);
    console.log('🚀 ~ file: logic.js ~ line 10 ~ useLogic ~ data', data);
    const [loading, setLoading] = useState(true);
    const [index, setIndex] = useState(0);


    const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);

    const fetchData = useCallback(async()=> {
        try {
            setLoading(true);
            const url = API.baseurl + DataAPI.UrlImprovement + '?class_id=' + classId;
            // const headers = {...API.header, jwt_token: dataLogin.jwt_token};
            const res = await APIBase.postDataJson('get', url);
            if (res.data.status) {
                setData(res.data.list_looking_back);
            } else {
                setData([]);
            }
            setLoading(false);
        } catch (e) {
            setData([]);
            setLoading(false);
        }
    }, []);


    useEffect(()=> {
        if (classId) {
            fetchData();
        }
    }, [classId]);


    return {
        data, setData,
        index, setIndex,
        loading, setLoading,
    };
};

export default useLogic;
