import React, { Component } from "react";
import { Image, View, Text, TouchableWithoutFeedback } from "react-native";
import SmartScreenBase from '../base/SmartScreenBase';
import MDarkBg from '../layouts/MDarkBg';
import MButton from '../items/MButton';

// mWidth
// mHeight
// bgColor
// tittle
// textColor
// textBody

class MDialog extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
        isHide: true
    }
  }

hide()
{
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
            <MDarkBg onCancel={this.darkBgClick}
            render={
                <View style={{width: this.props.mWidth, height: this.props.mHeight, backgroundColor: this.props.bgColor, borderRadius: SmartScreenBase.smPercenWidth*3, 
                flexDirection: 'column', alignItems: 'center', padding: SmartScreenBase.smPercenWidth*5}}>
                    <Text style={{fontSize: SmartScreenBase.smPercenWidth*6, color: this.props.textColor}}>{this.props.tittle}</Text>
                    <Text style={{fontSize: SmartScreenBase.smPercenWidth*4, color: this.props.textColor, marginTop: SmartScreenBase.smPercenWidth*5, textAlign: 'center'}}>{this.props.textBody}</Text>
                    {this.props.render}
                    {console.log('RenderDia')}
                </View>
            }>
            </MDarkBg>
          )
    }    
    }
  }
  
  export default MDialog;