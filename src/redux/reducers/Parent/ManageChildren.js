import Types from '../../types';

const initialState = {
  listChildren: [],
  childSelected: {
    id: '',
    email: '',
  },
};

/**
 * Homework Assigned Management Reducer
 * @param {object} state current state
 * @param {object} action data from dispatch
 * @returns object
 */
const ManageChildrenReducer = (state = initialState, action) => {
  const {type, param} = action;
  switch (type) {
    case Types.GET_LIST_CHILDREN: {
      return {
        ...state,
        listChildren: param,
      };
    }
    case Types.GET_CHILD_SELECTED: {
      return {
        ...state,
        childSelected: param,
      };
    }
    default: {
      return state;
    }
  }
};

export default ManageChildrenReducer;
