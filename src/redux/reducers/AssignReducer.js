
import Types from '../types';

const initialState = {
  listAssign: {},
  managingTutorial: []
};
/**
 * Assigning homework Reducer
 * @param {object} state current state
 * @param {object} action data from dispatch
 * @returns object
 */
const AssignReducer = (state = initialState, action) => {
  const { type, param } = action;
  switch (type) {
    case Types.ASSIGN: {
      return {
        ...state,
        listAssign: param,
      }
    }
    case Types.MANAGINGTUTORIAL: {
      return {
        ...state,
        managingTutorial: param

      }
    }
    default: {
      return state;
    }
  }
};

export default AssignReducer;