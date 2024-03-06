import API from '../../API/APIConstant';
import APIBase from '../../base/APIBase';

const dispatchChangePassword = (body) => async () => {
  const result = await APIBase.postDataJson(
    'put',
    `${API.baseurl}${API.editProfile}`,
    JSON.stringify(body),
  );
  return result;
};

export {dispatchChangePassword};
