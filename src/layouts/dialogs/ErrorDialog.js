import React, { Component } from "react";
import { Image, View, Text, TouchableWithoutFeedback } from "react-native";
import { Navigation } from "react-native-navigation";
import SmartScreenBase from '../../base/SmartScreenBase';
import MDialog from '../MDialog';
import MButton from '../../items/MButton';
import styles from '../../screens/LoginScreen/Login/styles'

// mWidth
// mHeight
// bgColor
// tittle
// textColor
// textBody

class ErrorDialog extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
        isHide: false
    }
    SmartScreenBase.comIdErrorDialog = this.props.componentId;
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
    SmartScreenBase.hideErrDialog();
}

DialogBtnAct = () => {
    SmartScreenBase.hideErrDialog();
}

    render() {
    
        return (
            <MDialog ref={(c) => this.dialog=c} bgClick={this.darkBgClick} mWidth={SmartScreenBase.smPercenWidth*78} mHeight={SmartScreenBase.smPercenWidth*48}
            bgColor={'#fff3fa'} textColor={'#000000'} tittle={'Thông báo'} textBody={this.props.body} active
            render={
                <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <View style={[styles.btnViewChungSty,{marginTop: SmartScreenBase.smPercenWidth*8, width: SmartScreenBase.smPercenWidth*40}]}>
                        <MButton mText={'Đóng'} mBgColor={styles.btnBgColor1} mTextColor={styles.btnTextColor1}  onPress={this.DialogBtnAct}></MButton>
                    </View>
                </View>   
            }> 
            </MDialog>
          )
    }    
  }
  
  export default ErrorDialog;