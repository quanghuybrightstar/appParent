
import Types from '../types';

const initialState = {
  listAssignManagent: [],
};


/**
 * Homework Assigned Management Reducer
 * @param {object} state current state
 * @param {object} action data from dispatch
 * @returns object
 */
const AssignManagentReducer = (state = initialState, action) => {
  const { type, param } = action;
  switch (type) {
    case Types.ASSIGNMANAGENT: {
      return {
        ...state,
        listAssignManagent: param,
      }
    }
    default: {
      return state;
    }
  }
};

export default AssignManagentReducer;