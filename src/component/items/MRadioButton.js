import React, { Component } from "react";
import { ImageBackground, View, Text, TouchableWithoutFeedback, Image, Alert } from "react-native";
import SmartScreenBase from '../base/SmartScreenBase'

class MRadioButton extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
        isChoose: false
    }
    this.active.bind(this)
  }

active()
{
    this.setState({
        isChoose: true,
    });
}

disable()
{
    this.setState({
      isChoose: false
    })
}

whenClick()
{
  this.props.callbackFromParent(this.props.name);
}

    render() {
      return (
            <TouchableWithoutFeedback style={{flex: 1}} 
            onPress={() =>  this.whenClick()}>
                <View style={{flex: 1, flexDirection: 'row',alignItems: 'center',justifyContent: 'center'}}>
                    <Image style={{width: SmartScreenBase.smBaseWidth*55, height: SmartScreenBase.smBaseHeight*55, resizeMode: 'contain'}} source={{uri: this.state.isChoose?'mhchung_icon_10':'mhchung_icon_08'}}></Image>
                    <Text style={{textAlignVertical: "center", textAlign: "center", color: this.props.mTextColor, fontSize: SmartScreenBase.smPercenWidth*4.4, marginLeft: SmartScreenBase.smPercenWidth*3}}>{this.props.mText}</Text>
                    {console.log("render")}
                </View>
            </TouchableWithoutFeedback>
      );
    }
  }
  
  export default MRadioButton;