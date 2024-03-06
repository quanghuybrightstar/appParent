import {useState, useEffect, useRef} from 'react';
import cloneDeep from 'lodash/cloneDeep';
import APIBase from '../../../../base/APIBase';
import API from '../../../../API/APIConstant';
import {useSelector} from 'react-redux';
import {Alert} from 'react-native';

export const manageListScoreLogic = props => {
  const [visibleModalFilter, setVisibleModalFilter] = useState(false);
  const [history, setHistory] = useState();
  const [dataGrade, setDataGrade] = useState([]);
  const {jwt_token} = useSelector(state => state.AuthStackReducer.dataLogin);
  const [isFiltered, setIsFiltered] = useState(false);
  const _isByFilter = useRef(false);
  const [loading, setLoading] = useState(false);

  const handleModalFilter = () => {
    console.log('=====filter', visibleModalFilter);
    setVisibleModalFilter(true);
  };

  // Data Type For Filter
  const [dataType, setDataType] = useState([
    {name: 'Video', value: 'video', choose: false},
    {name: 'Âm thanh', value: 'audio', choose: false},
    {name: 'Văn bản', value: 'writing', choose: false},
    {name: 'Hình ảnh', value: 'img', choose: false},
  ]);

  // Data Skill For Filter
  const [dataSkill, setDataSkill] = useState([
    {name: 'Pronunciation', choose: false},
    {name: 'Vocabulary', choose: false},
    {name: 'Grammar', choose: false},
    {name: 'Reading', choose: false},
    {name: 'Listening', choose: false},
    {name: 'Speaking', choose: false},
    {name: 'Writing', choose: false},
    {name: 'Project', choose: false},
    {name: 'Test', choose: false},
  ]);

  const _getGrade = async () => {
    const url = API.baseurl + API.getGradeNew;
    const headers = {...API.header, jwt_token};
    try {
      const res = await APIBase.postDataJson('GET', url);
      if (res.data.status) {
        setDataGrade(res.data.list_grade);
      } else {
        Alert.alert(res.data.msg);
        setDataGrade([]);
      }
      //setLoading(false);
    } catch (e) {
      setDataGrade([]);
    }
  };

  useEffect(() => {
    if (visibleModalFilter) {
      var hisData = {
        dataSkill: cloneDeep(dataSkill),
        dataType: cloneDeep(dataType),
        dataGrade: cloneDeep(dataGrade),
      };
      console.log('=====hisData', hisData);
      setHistory(hisData);
    }
  }, [visibleModalFilter]);

  useEffect(() => {
    _getGrade();
  }, [jwt_token]);

  const _cancelModalFilter = () => {
    setDataSkill(history?.dataSkill);
    setDataType(history.dataType);
    setDataGrade(history.dataGrade);
    setVisibleModalFilter(false);
  };

  const _handleFilter = () => {
    setVisibleModalFilter(false);
    const type = dataType.filter(ele => ele.choose).map(ele => ele.value);
    const grade = dataGrade.filter(ele => ele.choose).map(ele => ele.id);
    const skill = dataSkill.filter(ele => ele.choose).map(ele => ele.name);
    _isByFilter.current = true;
    var mIsFilter = false;
    // if (checkIsFilter()) {
    //   mIsFilter = true;
    // } else {
    //   mIsFilter = false;
    // }
    // _getDataStudy(type, grade, skill, mIsFilter);
  };

  const _handleDeleteFilter = () => {
    dataType.forEach(e => {
      e.choose = false;
    });
    dataGrade.forEach(e => {
      e.choose = false;
    });
    dataSkill.forEach(e => {
      e.choose = false;
    });
    setDataSkill([...dataSkill]);
    // _handleFilter();
  };

  const _handleItem = (index, data) => {
    const copy = [...data];
    copy[index].choose = !copy[index].choose;
    if (data === dataGrade) {
      setDataGrade(copy);
    } else if (data === dataType) {
      setDataType(copy);
    } else if (data === dataSkill) {
      setDataSkill(copy);
    }
  };

  return {
    visibleModalFilter,
    handleModalFilter,
    dataType,
    dataSkill,
    history,
    dataGrade,
    dataType,
    dataSkill,
    isFiltered,
    _isByFilter,
    _cancelModalFilter,
    _handleFilter,
    _handleDeleteFilter,
    _handleItem,
    loading,
    setLoading,
  };
};
