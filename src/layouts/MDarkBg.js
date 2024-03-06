import React, { Component } from "react";
import { ImageBackground, View, Text, TouchableWithoutFeedback } from "react-native";
import SmartScreenBase from '../base/SmartScreenBase'

class MDarkBg extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
        isHide: false
    }
  }

cancel()
{
    this.props.onCancel();
}

show()
{
    this.setState({
        isHide: false
    })
    console.log('Show')
}

    render() {

    if(this.state.isHide){
        return(
            <View></View>
        )
    }else{
        return (
            <View style={{width: '100%', height: '100%', position: 'absolute', zIndex:2}}>
                {console.log('bgRender')}
                <TouchableWithoutFeedback style={{width: '100%', height: '100%',flexDirection: 'column',alignItems: 'center',justifyContent: 'center', 
                position: 'absolute'}} onPress={() =>  this.cancel()}>
                <View style={{width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.85)'}}></View>
                </TouchableWithoutFeedback>
                <View style={{width: SmartScreenBase.smPercenWidth*100, height: SmartScreenBase.smPercenHeight*100, position: 'absolute', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    {this.props.render}
                </View>
            </View>
          )
    }    
    }
  }
  
  export default MDarkBg;