import React, { Component } from "react";
import { ImageBackground, View, Text, TouchableOpacity } from "react-native";
import SmartScreenBase from '../base/SmartScreenBase'

class MButton extends Component {
  
  constructor(props) {
    super(props);

  }

  btnAction()
  {
    this.props.onPress();
  }

    render() {
      return (
        
        <TouchableOpacity style={{flex: 1,flexDirection: 'row',alignItems: 'center',justifyContent: 'center', backgroundColor: this.props.mBgColor!==null?this.props.mBgColor:"#01283A", borderRadius: SmartScreenBase.smPercenWidth*3}} 
          onPress={() =>  this.btnAction()}>
          <Text style={{textAlignVertical: "center", textAlign: "center", color: this.props.mTextColor!=null?this.props.mTextColor:'#ffffff', fontWeight: 'bold', fontSize: SmartScreenBase.smPercenWidth*4.4}}>{this.props.mText}</Text>
        </TouchableOpacity>
      );
    }
  }
  
  export default MButton;