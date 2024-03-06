import {useMemo} from 'react';
import {Dimensions, StyleSheet} from 'react-native';
import SmartScreenBase from '../../../base/SmartScreenBase';
import {Colors} from '../../../styleApp/color';
const {width, height} = Dimensions.get('window');
export const useStyleLanguageSetting = () => {
  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
        },
        button: {
          padding: SmartScreenBase.smPercenHeight * 2,
          borderBottomWidth: 1,
          marginHorizontal: SmartScreenBase.smPercenHeight,
          borderBottomColor: Colors.GrayB6,
        },
      }),
    [],
  );
};
