import React, { Component } from "react";
import { ImageBackground, View, Text, TouchableOpacity } from "react-native";
import SmartScreenBase from '../base/SmartScreenBase'

class MButton extends Component {
  
  constructor(props) {
    super(props);
  }
  btnAction()
  {
    if(this.props.pressLogin!=undefined)
      this.props.pressLogin();
    else if(this.props._onpressRegister!=undefined){
      this.props._onpressRegister();
    }
    else if(this.props._onpressSendEmail!=undefined)
      this.props._onpressSendEmail();  
    if(this.props.mText == 'Quay về')   {
      this.props.navigation.goBack()
    }
  }

    render() {
      return (
        <TouchableOpacity style={{flex: 1,flexDirection: 'row',alignItems: 'center',justifyContent: 'center', backgroundColor: this.props.mBgColor!==null?this.props.mBgColor:"#01283A", borderRadius: SmartScreenBase.smPercenWidth*3}} 
           onPress={() =>  {
            this.btnAction()
        }}>
          <Text style={{textAlignVertical: "center", textAlign: "center", color: this.props.mTextColor!=null?this.props.mTextColor:'#ffffff', fontWeight: 'bold', fontSize: SmartScreenBase.smPercenWidth*4.4}}>{this.props.mText}</Text>
        </TouchableOpacity>
      );
    }
  }
  
  export default MButton;