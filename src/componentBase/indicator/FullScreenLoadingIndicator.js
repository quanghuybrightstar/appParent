import { useEffect, useState, memo, useRef } from "react";
import React from 'react';
import { Modal, ActivityIndicator, View, StyleSheet } from 'react-native';
import SmartScreenBase from '../../base/SmartScreenBase';
import { Colors } from '../../styleApp/color';
import MyData from '../../component/MyData';

/**
 * @summary The Loading component 
 * 
 * @param {object} props
 * @property {boolean} visible: visible of the Loading
 * 
 * @returns {Component}
 */
const _FullScreenLoadingIndicator = (
  props,
) => {
  var timeLoading = 10000; //thời gian tự tắt loading
  const timeout = useRef(null);
  let [isVisiable, setVisiable] = useState(props.visible)

  useEffect(() => {
    setVisiable(props.visible)
    if(props.visible){
      clearTimeout(timeout.current);
      timeout.current = setTimeout(() => {
        setVisiable(false)
      }, timeLoading)
    }
  }, [props.visible])

  useEffect(() => {
    return () => {
      clearTimeout(timeout.current);
    };
  }, [])

  return (
    <Modal visible={isVisiable} animationType="fade" transparent>
      <View style={_styles.container}>
        <View style={_styles.box}>
          <ActivityIndicator color={Colors.DarkGrayish} size="large" />
        </View>
      </View>
    </Modal>
  );
};

const _styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.IndicatorBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: SmartScreenBase.smBaseWidth * 120,
    height: SmartScreenBase.smBaseWidth * 120,
    borderRadius: 8,
    //backgroundColor: Colors._272b32,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export const FullScreenLoadingIndicator = memo(
  _FullScreenLoadingIndicator,
);
