import Types from '../types';

const setModalVisible = (payload) => {
  //console.log('payload', payload);
  return {
    type: Types.MODAL_VISIBLE,
    payload,
  };
};
export {setModalVisible};
