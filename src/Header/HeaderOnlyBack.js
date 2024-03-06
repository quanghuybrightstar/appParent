import {View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';
const {width, height} = Dimensions.get('screen');
import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import IconBack from 'react-native-vector-icons/AntDesign';
const backAction = NavigationActions.back({
  key: null,
});
class HeaderOnlyBack extends Component {
  render() {
    return (
      <View
        style={{
          width: width,
          height: height * 0.07,
          backgroundColor: '#00000080',
          flexDirection: 'row',
        }}>
        <TouchableOpacity
          style={{
            width: width * 0.15,
            height: height * 0.07,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            this.props.navigation.goBack();
          }}>
            <IconBack name="left" size={25} color="#a5a5a5ff" />
        </TouchableOpacity>
        <View
          style={{
            width: width * 0.8,
            height: height * 0.07,
            justifyContent: 'center',
          }}>
          <Text style={{color: '#FFFFFF', fontSize: 20, fontWeight: '400'}}>
            {this.props.title}
          </Text>
        </View>
      </View>
    );
  }
}
export default HeaderOnlyBack;
