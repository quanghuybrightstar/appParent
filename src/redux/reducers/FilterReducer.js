import Types from '../types';

const initialState = {
  listSkill: [
    {name: 'Speaking', choose: false},
    {name: 'Writing', choose: false},
    {name: 'Project', choose: false},
  ],
  listLevel: [
    {name: 'Easy', choose: false},
    {name: 'Normal', choose: false},
    {name: 'Hard', choose: false},
  ],
  reload: false,
};

const FilterReducer = (state = initialState, action) => {
  const {type, payload} = action;
  switch (type) {
    case Types.FILTER_SKILL: {
      //console.log('payload', payload);
      return {
        ...state,
        listSkill: payload,
      };
    }
    case Types.FILTER_LEVEL: {
      //console.log('payload', payload);
      return {
        ...state,
        listLevel: payload,
      };
    }
    case Types.RELOAD_DATA: {
      //console.log('payload', payload);
      return {
        ...state,
        reload: payload,
      };
    }
    default: {
      return state;
    }
  }
};

export default FilterReducer;
