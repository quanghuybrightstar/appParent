import React, {memo} from 'react';
import {Text, View} from 'react-native';
import {useStyleTopic} from './styles';

const _Topic = ({topic, name}) => {
  const styles = useStyleTopic();
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.txtTitle}>{topic}</Text>
        <View style={styles.answer}>
          <Text style={styles.txtAnswer}>{name}</Text>
        </View>
      </View>
    </View>
  );
};

export default memo(_Topic);
