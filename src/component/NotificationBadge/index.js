import React from 'react';
import {View, StyleSheet} from 'react-native';

const NotificationBadge = () => {
  return <View
  style={StyleSheet.absoluteFill}
  ><View style={styles.container} /></View>;
};

const styles = StyleSheet.create({
  container: {
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: '#BE2E2D',
    overflow: 'hidden',
    position: 'absolute',
    bottom: 5,
    right: 5
  },
});

export default NotificationBadge;
