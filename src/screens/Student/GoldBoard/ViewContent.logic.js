
import apiBase from '../../../base/APIBase';
import DataAPI from '../../../component/DataAPI';
import API from '../../../API/APIConstant';


const fetchStudentsRankBoard = async (page, limit, classId) => {
  try {
    const offset = (page - 1) * limit + 3
    const url = API.baseurl + DataAPI.UrlRank + `?type=class&class_id=${classId}&limit=${limit}&offset=${offset}&type=class`;
    const response = await apiBase.postDataJson('get',url)
    const data = response?.data?.data?.top_users || []
    const totalPagesCount = Math.ceil((response?.data?.data?.total_user_rank || 0) / limit)
    const nextPage = totalPagesCount <= page ? undefined : page + 1
    return {
      data: data,
      pagination: {
        current_page: page,
        next_page: nextPage,
        total_pages_count: totalPagesCount,
      }
    };
  } catch (error) {
    console.warn('fetchStudentsRankBoard failed', {error});
    return { data: [], pagination: {} };
  }
};

export default {
  fetchStudentsRankBoard
};
