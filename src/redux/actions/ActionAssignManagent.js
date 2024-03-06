import Types from '../types';
/**
 * convert assigned homework to stored data form
 * @param {any} param
 * @returns object
 */
const ActionAssignManagent = (param) => ({
    type: Types.ASSIGNMANAGENT,
    param
});

export { ActionAssignManagent }