import React from 'react';
import {Alert} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {ActionDataClass} from '../../../../redux/actions/ActionDataClass';
import {ActionLogin} from '../../../../redux/actions/ActionLogin';
import {FavoriteCurriculum} from '../../../../redux/actions/FavoriteCurriculum';
import deviceContr from '../../../../utils/device';
import APIBase from '../../../../base/APIBase';
import LogBase from '../../../../base/LogBase';
import API from '../../../../API/APIConstant';
import {ICON_CURRICULUM_MORE} from '../../../../assets';
import {ParentText} from '../../../../stringJSON/ParentTextJson';
import { ActionSelectedChild } from '../../../../redux/actions/Parent/ActionChildren';

/**
 * Other Menu logic handler
 * @param {object} props props from redux and navigation
 * @returns {Component}
 */
export const OtherSettingMethod = props => {
  const [isShowLogout, setShowLogout] = React.useState(false);

  const dispatch = useDispatch();

  const language = useSelector(state => state.LanguageStackReducer.language);
  const AllFunction = [
    {
      id: 1,
      name: language.FunctionTeacherScreen.ProfileBt,
      image: 'classes_icon',
      screen: 'TeacherProfile',
    },
    {
      id: 2,
      name: language.FunctionTeacherScreen.WorkCalendarBt,
      image: 'working_plan',
      screen: 'WorkMenu',
    },
    {
      id: 3,
      name: language.FunctionTeacherScreen.StudyGuideBt,
      image: 'study_guide',
      screen: 'StudyGuide',
    },
    {
      id: 4,
      name: language.FunctionTeacherScreen.ManagerHomeworkBt,
      image: 'grammar_manage',
      screen: 'ManageAssign',
    },
    {
      id: 5,
      name: language.FunctionTeacherScreen.SettingBt,
      image: 'setting',
      screen: 'SettingTeacher',
    },
    // { id: 6, name: language.FunctionTeacherScreen.UpgradeBt, image: 'upgrade_account', screen: "" }
  ];

  const AllFunctionParent = [
    {
      id: 1,
      name: ParentText.FunctionParentScreen.ClassesPr,
      image: 'classes_icon',
      screen: 'ClassScreen',
    },
    {
      id: 2,
      name: ParentText.FunctionParentScreen.ProfilePr,
      image: 'profile_icon',
      screen: 'TeacherProfile',
    },
    {
      id: 3,
      name: ParentText.FunctionParentScreen.SettingPr,
      image: 'setting',
      screen: 'SettingTeacher',
    },
    {
      id: 4,
      name: ParentText.FunctionParentScreen.ExerciseManagerPr,
      image: 'grammar_manage',
      screen: 'ManageAssign',
    },
    {
      id: 5,
      name: ParentText.FunctionParentScreen.CurriculumPr,
      image: ICON_CURRICULUM_MORE,
      screen: 'CourseListTCScreen',
    },
    {
      id: 5,
      name: ParentText.FunctionParentScreen.AssociatePr,
      image: 'link_icon',
      screen: 'AssociateParent',
    },
    // { id: 6, name: language.FunctionTeacherScreen.UpgradeBt, image: 'upgrade_account', screen: "" }
  ];

  /**
   * log out function
   */
  const logOut = async () => {
    await props.dispatch(ActionLogin({}));
    await props.dispatch(ActionDataClass({jwt_token: ''}));
    await props.dispatch(ActionSelectedChild({id: '', email: ''}));
    dispatch(FavoriteCurriculum([]));
    LogBase.log('=====Logout');
    var url = API.baseurl + API.logout;
    let form = new URLSearchParams();
    form.append('device_id', String(deviceContr.getDeviceID()));
    var data = {
      device_id: deviceContr.getDeviceID(),
    };
    var res = APIBase.tokenAPI('post', url, form, {
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    LogBase.log('=====deviceID', deviceContr.getDeviceID());
    LogBase.log('=====bye bye', res.data);
    props.navigation.navigate('LoginApp');
  };

  const callLogOut = () => {
    logOut();
  };

  /**
   * handle onPress of each function
   * @param {number} id id of the function
   */

  return {
    AllFunctionParent,
    AllFunction,
    language,
    callLogOut,
    isShowLogout,
    setShowLogout,
  };
};
