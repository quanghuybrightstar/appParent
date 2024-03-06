import React, { Component } from "react";
import { Image, View, Text, TouchableWithoutFeedback } from "react-native";
import { Navigation } from "react-native-navigation";
import SmartScreenBase from '../base/SmartScreenBase';
import MDarkBg from '../layouts/MDarkBg';
import MButton from '../items/MButton';

// mWidth
// mHeight
// bgColor
// tittle
// textColor
// textBody

class MLoading extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
        isHide: false
    }
    SmartScreenBase.comIdMLoading = this.props.componentId;
    setTimeout( () => {
        Navigation.dismissModal(this.props.componentId);
    },5000);
  }

hide()
{
    console.log("hide");
    this.setState({
        isHide: true
    })
}

show()
{
    this.setState({
        isHide: false
    })
}

darkBgClick = () => {
    this.hide();
}


    render() {

    if(this.state.isHide){
        return(
            <View></View>
        )
    }else{
        return (
            <MDarkBg
            render={
                <Image style={{width: SmartScreenBase.smBaseWidth*254, height: SmartScreenBase.smBaseWidth*197, resizeMode: 'contain'}} source={require('../assets/eloading.gif')}/>
            }
            >
            </MDarkBg>
          )
    }    
    }
  }
  
  export default MLoading;