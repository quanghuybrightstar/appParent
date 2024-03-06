import React, {Component} from 'react';
import {View, Image} from 'react-native';
import SmartScreenBase from '../base/SmartScreenBase';
export default class Loading extends Component {
  render() {
    return (
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.3)',
          position: 'absolute',
          zIndex: 10000,
          width: '100%',
          height: '100%',
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
