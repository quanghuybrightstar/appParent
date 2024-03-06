import APIBase from '../../../base/APIBase';
import DataAPI from '../../../component/DataAPI';
import API from '../../../API/APIConstant';

export const getListMasterUnit = async (classId, status, page) => {
    //page start from 1
    try {
        const url = API.baseurl + DataAPI.UrlImprovement + '?class_id=' + classId + '&status=' + status + '&limit=10' + '&offset=' + (page - 1) * 10;
        const res = await APIBase.postDataJson('get', url);
        console.log(res)
        if (res.data.status) {
            const lastPage = Math.ceil(res.data.total / 10);
            return {
                data: res.data.list_looking_back,
                lastPage: lastPage,
                status: true,
            };
        } else {
            return {
                status: false,
            };
        }
    } catch (e) {
        return {
            status: false,
        };
    }
};
