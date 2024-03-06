import React from 'react';
import {View, Image, Text} from 'react-native';
import {TextBox} from '../../../componentBase/TextBox';
import styles from './style';
const ComponentContact = ({icon, text, style}) => {
  return (
    <View style={styles.contactSetting}>
      <View style={styles.child20}>
        <Image source={icon} style={style} />
      </View>
      <View style={styles.child80}>
        <TextBox numberOfLines={10} style={styles.text}>
          {text}
        </TextBox>
      </View>
    </View>
  );
};
export default ComponentContact;
