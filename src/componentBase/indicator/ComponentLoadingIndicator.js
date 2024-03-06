import React from 'react';
import { Modal, ActivityIndicator, View, StyleSheet } from 'react-native';
import SmartScreenBase from '../../base/SmartScreenBase';
import { Colors } from '../../styleApp/color';

/**
 * @summary The Loading component 
 * 
 * @param {object} props
 * @property {boolean} visible: visible of the Loading
 * @property {boolean} isBig: Big ActivityIndicator
 * @returns {Component}
 */
const _ComponentLoadingIndicator = (
  props
) => {
  return (
      <View style={[_styles.container, {...props.style}]}>
          <ActivityIndicator color={props.color ? props.color : Colors.DarkGray} size={props.isBig ? "large" : "small"} />
      </View>
  );
};

const _styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const ComponentLoadingIndicator = React.memo(
    _ComponentLoadingIndicator,
);
