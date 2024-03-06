import {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import APIBase from '../../../../base/APIBase';
import API from '../../../../API/APIConstant';
import {ActionListChildren} from '../../../../redux/actions/Parent/ActionChildren';

export const associateParentLogic = props => {
  const listChildren = useSelector(
    state => state.ManageChildrenReducer.listChildren,
  );
  const [loading, setLoading] = useState(false);
  const [dataChildren, setDataChildren] = useState(listChildren);
  const [dataPendingChildren, setDataPendingChildren] = useState([]);

  const [typePopup, setTypePopup] = useState('');

  const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);

  const [msgAlert, setMsgAlert] = useState('');

  const [studentSelected, setStudentSelected] = useState('');

  // Fetch data list children
  const getDataChildren = async () => {
    setLoading(true);
    let url = API.baseurl + API.getListChildren;
    try {
      let response = await APIBase.postDataJson('get', url);
      setLoading(false);
      if (!!response && !!response.data && !!response.data.data) {
        const data = response.data.data;
        setDataChildren(data);
        _dispatch(ActionListChildren(data));
      }
    } catch (error) {
      setLoading(false);
      console.log('000000errr', error);
    }
  };

  // Fetch data list pending children
  const getDataPendingChildren = async () => {
    setLoading(true);
    let url = API.baseurl_pay + API.getListPendingChildren;
    try {
      let response = await APIBase.callPaySV('get', url);
      setLoading(false);
      if (!!response && !!response.data && !!response.data) {
        setDataPendingChildren(response.data.data.request_list);
      }
    } catch (error) {
      setLoading(false);
      console.log('000000errr', error);
    }
  };

  useEffect(() => {
    dataChildren.length <= 0 && getDataChildren();
    // getDataPendingChildren();
  }, [props]);

  // Handle Check Action
  const handleCheckAction = (type, item) => {
    setTypePopup(type);
    console.log('=====type', type);
    setStudentSelected(item);
  };

  // Handle Check Agree Action
  const handleAgreeAction = async (type, student) => {
    try {
      switch (type) {
        case 'deleteChild':
          let url =
            API.baseurl +
            API.deleteChildAction +
            '?student_id=' +
            studentSelected.id +
            'type=1';

          const res = await APIBase.postDataJson('GET', url);
          if (res?.data.status) {
            setMsgAlert(res?.data?.msg?.replace(/\s+/g, ' '));
            setTypePopup('alertApi');
            return;
            // getDataChildren();
          }
          break;
        case 'acceptChildPending':
          break;
        case 'deleteChildPending':
          break;
        case 'deleteChildSent':
          break;
        case 'alertApi':
          getDataChildren();
          break;
        default:
          break;
      }
    } catch (e) {}
    setTypePopup('');
    setStudentSelected({});
  };

  // Handle Delete Child
  const handleDeleteChild = (type, item) => {
    console.log(item);
  };

  return {
    loading,
    dataChildren,
    typePopup,
    studentSelected,
    dataPendingChildren,
    msgAlert,
    setMsgAlert,
    setStudentSelected,
    setTypePopup,
    handleDeleteChild,
    handleCheckAction,
    handleAgreeAction,
  };
};
