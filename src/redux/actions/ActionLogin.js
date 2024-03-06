import Types from '../types';

const ActionLogin = (param) => ({
  type: Types.SAVELOGIN,
  param,
});

const setDeviceId = (deviceId) => ({
  type: Types.SET_DEVICE_ID,
  param: {
    deviceId,
  },
});

const setVersionIgo = (version_igo) => ({
  type: Types.SET_VERSION_IGO,
  param: {
    version_igo,
  },
});

export {ActionLogin, setDeviceId, setVersionIgo};
