import {View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('screen');
import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
const backAction = NavigationActions.back({
  key: null,
});
class Header extends Component {
  render() {
    return (
      <View
        style={{
          width: width,
          height: height * 0.05,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            width: width * 0.9,
            height: height * 0.05,
            justifyContent: 'center',
          }}>
          <Text style={{color: '#FFFFFF', fontSize: 22, fontWeight: '400'}}>
            {this.props.title}
          </Text>
        </View>
      </View>
    );
  }
}
export default Header;
