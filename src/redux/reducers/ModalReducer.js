import Types from '../types';

const initialState = {
  modalVisible: false,
};

const ModalReducer = (state = initialState, action) => {
  const {type, payload} = action;
  //console.log('type', type);
  //console.log('payload', payload);
  switch (type) {
    case Types.MODAL_VISIBLE:
      return {
        ...state,
        modalVisible: payload,
      };
    default:
      return state;
  }
};

export default ModalReducer;
