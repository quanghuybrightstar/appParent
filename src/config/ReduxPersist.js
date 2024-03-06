import  AsyncStorage  from '@react-native-async-storage/async-storage';

const ReduxPersist = {
    active: true,
    reducerVersion: '0.5',
    storeConfig: {
      key: 'primary',
      storage: AsyncStorage,
      whitelist: ['AuthStackReducer', 'ManageChildrenReducer'],
    },
  };
  
  export default ReduxPersist;
  