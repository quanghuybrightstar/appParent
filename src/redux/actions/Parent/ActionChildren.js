import Types from '../../types';
/**
 * convert assigned homework to stored data form
 * @param {any} param
 * @returns object
 */
const ActionListChildren = param => ({
  type: Types.GET_LIST_CHILDREN,
  param,
});

const ActionSelectedChild = param => ({
  type: Types.GET_CHILD_SELECTED,
  param,
});

export {ActionListChildren, ActionSelectedChild};
