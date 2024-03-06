import React, {memo, useCallback} from 'react';
import {Image, Text, View} from 'react-native';
import {AppHeader} from '../../../componentBase/AppHeader';
import {useStyleContact} from './styles';

const data = [
  {
    icon: 'class_icon',
    name: '',
  },
  {
    icon: 'phone',
    name: '',
  },
  {
    icon: 'mail',
    name: '',
  },
  {
    icon: 'icon_maps1',
    name:
      '',
  },
];
const _ContactScreen = ({navigation}) => {
  const styles = useStyleContact();
  const onBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);
  return (
    <View style={styles.container}>
      <AppHeader title={'Liên hệ'} leftIconOnPress={onBack} />
      {data.map((value, index) => {
        return (
          <View style={styles.item}>
            <View style={styles.imageContainer}>
              <Image
                resizeMode="contain"
                style={styles.icon}
                source={{uri: value.icon}}
              />
            </View>
            <View style={styles.body}>
              <Text>{value.name}</Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

export default memo(_ContactScreen);
