import Types from '../types';

const initialState = {
  // auth_stack: {
  dataLogin: {},
  dataClass: {},
  itemClass: [],
  deviceId: '',
  dataToLogin: {},
  // }
};

const AuthStackReducer = (state = initialState, action) => {
  const {type, param} = action;
  switch (type) {
    case Types.SAVELOGIN: {
      return {
        ...state,
        dataLogin: param,
      };
    }
    case Types.SAVEDATACLASS: {
      return {
        ...state,
        dataClass: param,
      };
    }
    case Types.ITEMCLASS: {
      return {
        ...state,
        itemClass: param,
      };
    }
    case Types.SET_DEVICE_ID: {
      return {
        ...state,
        deviceId: param.deviceId,
      };
    }
    case Types.SET_VERSION_IGO: {
      return {
        ...state,
        version_igo: param.version_igo,
      };
    }
    // case Types.LOGIN_DATA: {
    //   return {
    //     ...state,
    //     dataToLogin: param,
    //   };
    // }
    // Default
    default: {
      return state;
    }
  }
};

export default AuthStackReducer;
