import {useMemo} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import SmartScreenBase from '../../../../base/SmartScreenBase';
const {width, height} = Dimensions.get('window');
export const useStyleChoiceCurriculum = () => {
  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
        },
        buttonAdd: {
          marginVertical: SmartScreenBase.smPercenHeight * 2,
          marginHorizontal: SmartScreenBase.smPercenHeight * 2,
          borderRadius: SmartScreenBase.smPercenHeight * 4,
          width: SmartScreenBase.smPercenHeight * 20,
          alignSelf: 'center',
        },
        content: {
          flex: 1,
        },
      }),
    [],
  );
};
