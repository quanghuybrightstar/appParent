import Types from '../types';

/**
 * Assign homework action
 * @param {any} param params to Assign homework
 * @returns object
 */
const ActionAssign = (param) => ({
  type: Types.ASSIGN,
  param
});

/**
 * convert tutorial to stored data form
 * @param {any} param params to manage tutorial
 * @returns object
 */
const ActionManagingTutorial = (param) => ({
  type: Types.MANAGINGTUTORIAL,
  param
})

export { ActionAssign, ActionManagingTutorial }