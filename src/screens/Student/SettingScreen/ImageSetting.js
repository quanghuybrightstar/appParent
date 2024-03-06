import React, { Component } from 'react';
import {TouchableWithoutFeedback,Image} from 'react-native';
import SmartScreenBase from '../../../base/SmartScreenBase';
export default class ImageSetting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Setting: 0,
            refresh:false
        }
        this.state.Setting = this.props.DataSetting;
    }
    render() {
        return (
            <TouchableWithoutFeedback onPress={() => {
                if(this.state.Setting == 0){
                    this.state.Setting = 1;
                }else{
                    this.state.Setting = 0;
                }
                this.setState({
                    refresh:!this.state.refresh
                });
                this.props._onPress();
            }}>
                <Image style={{
                    width: SmartScreenBase.smBaseWidth * 159,
                    height: SmartScreenBase.smBaseWidth * 99,
                    resizeMode: 'contain'
                }}
                    source={{ uri: this.state.Setting == 0 ? 'student_setting_image1' : 'student_setting_image2' }} />
            </TouchableWithoutFeedback>
        )
    }
}