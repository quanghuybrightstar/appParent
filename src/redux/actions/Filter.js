import Types from '../types';

const FilterActionSkill = (payload) => ({
  type: Types.FILTER_SKILL,
  payload,
});
const FilterActionLevel = (payload) => ({
  type: Types.FILTER_LEVEL,
  payload,
});
const setReload = (payload) => ({
  type: Types.RELOAD_DATA,
  payload,
});

export {FilterActionSkill, FilterActionLevel, setReload};
