import Types from '../types';

const StatusTestingAciton = (payload) => ({
    type: Types.TESTING,
    payload
});

export { StatusTestingAciton };