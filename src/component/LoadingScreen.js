import React, {Component} from 'react';
import {View, Image, Dimensions} from 'react-native';
import SmartScreenBase from '../base/SmartScreenBase';
// const {width, height} = Dimensions.get('window');
export default class Loading extends Component {
  render() {
    return (
      <View
        style={{
          width: SmartScreenBase.smPercenWidth*100,
          height: SmartScreenBase.smPercenHeight*100,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.3)',
          position: 'absolute',
          top:
            this.props.Screen == 'Main' ||
            this.props.Screen === 'ChoiceCurriculum'
              ? 0
              : SmartScreenBase.smPercenWidth * 12,
          zIndex: 999,
        }}>
        <Image
          source={require('../assets/eloading.gif')}
          style={{
            width: 100,
            height: 100,
            resizeMode: 'contain',
          }}
        />
      </View>
    );
  }
}
