import {View, Text, Image, TouchableOpacity, Dimensions} from 'react-native';

import React, {Component} from 'react';
import {NavigationActions} from 'react-navigation';
import SmartScreenBase from '../../base/SmartScreenBase';
//const {width,height} = Dimensions.get('window')
const backAction = NavigationActions.back({
  key: null,
});
class Header extends Component {
  render() {
    return (
        <View style={{
            justifyContent: "space-between",
            alignItems: "center" ,
            height:SmartScreenBase.smPercenHeight*100/12,
            backgroundColor:"rgba(0,0,0,0.3)",
            flexDirection:"row"
        }}>
            <View style={{ marginLeft: SmartScreenBase.smPercenWidth * 2 ,flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                <TouchableOpacity style={{
                    width: SmartScreenBase.smPercenWidth * 5,
                    height: SmartScreenBase.smPercenWidth * 5,}}
                    onPress={()=>this.props.navigation.goBack()}
                >
                    <Image style={{
                        width: SmartScreenBase.smPercenWidth * 5,
                        height: SmartScreenBase.smPercenWidth * 5,}}
                           resizeMode={'contain'}
                           source={{uri:"imageback"}}/>
                </TouchableOpacity>

                <Text style={{
                    color: 'white' ,
                    marginLeft: SmartScreenBase.smPercenWidth * 5,
                    fontWeight:"800",
                    fontSize:SmartScreenBase.smPercenWidth*5
                }}>{this.props.title}</Text>
            </View>
        </View>
    );
  }
}
export default Header;
