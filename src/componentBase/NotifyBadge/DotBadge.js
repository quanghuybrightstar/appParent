import React from 'react';
import {View, StyleSheet} from 'react-native';
import SmartScreenBase from '../../base/SmartScreenBase';
import { Colors } from '../../styleApp/color';

const DotBadge = (props) => {
  return(
    <View style={styles.father}>
       {props.visiable && <View style={styles.container}/>}
    </View>
  ) 

};

const styles = StyleSheet.create({
   father: {
        position: 'absolute',
        top: SmartScreenBase.smBaseWidth*14,
        right: SmartScreenBase.smBaseWidth*14,
      },
  container: {
    width: SmartScreenBase.smBaseWidth*28,
    height: SmartScreenBase.smBaseWidth*28,
    borderRadius: SmartScreenBase.smBaseWidth*48,
    backgroundColor: Colors.Red_BE1,
  },
});

export default DotBadge;
