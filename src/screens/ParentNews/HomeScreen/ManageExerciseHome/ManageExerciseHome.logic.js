import {useState, useEffect} from 'react';
import API from '../../../../API/APIConstant';
import APIBase from '../../../../base/APIBase';
import {useSelector} from 'react-redux';

export const manageExerciseHomeLogic = props => {
  const [loading, setLoading] = useState(false);
  const childSelected = useSelector(
    state => state.ManageChildrenReducer.childSelected,
  );

  const [dataExercise, setDataExercise] = useState([]);

  // Fetch data list children
  const getDataReportExercise = async () => {
    setLoading(true);
    let url = API.baseurl + API.reportManageExercise + childSelected?.id;
    try {
      let response = await APIBase.postDataJson('get', url);
      setLoading(false);
      if (!!response && !!response.data && !!response.data.data) {
        const data = response.data.data;
        setDataExercise(data);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataReportExercise();
  }, []);

  return {dataExercise, loading};
};
