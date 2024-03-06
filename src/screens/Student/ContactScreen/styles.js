import {useMemo} from 'react';
import {Dimensions, Platform, StyleSheet} from 'react-native';
import SmartScreenBase from '../../../base/SmartScreenBase';
import {Colors} from '../../../styleApp/color';
const {width, height} = Dimensions.get('window');

export const useStyleContact = () => {
  return useMemo(
    () =>
      StyleSheet.create({
        container: {
          flex: 1,
        },
        item: {
          flexDirection: 'row',
          borderBottomWidth: 1,
          marginHorizontal: SmartScreenBase.smPercenHeight,
          paddingVertical: SmartScreenBase.smPercenHeight * 2,
          borderBottomColor: Colors.GrayB6,
        },
        imageContainer: {
          flex: 1.5 / 10,
          alignItems: 'center',
          justifyContent: 'center',
        },
        body: {
          flex: 8.5 / 10,
        },
        icon: {
          width: SmartScreenBase.smPercenHeight * 5,
          height: SmartScreenBase.smPercenHeight * 5,
        },
      }),
    [],
  );
};
