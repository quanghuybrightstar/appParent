import React, {Component} from 'react';
import {View, Text, TextInput, Image} from 'react-native';
import SmartScreenBase from '../base/SmartScreenBase';


//mWidth : width input
//mHeight : mHeight input (default SmartScreenBase.smPercenWidth*10)
//iconRender : Icon render
//mTypeInput : type input (default username)
//mPlaceHolder : placeHolder
//mColor: TextColor

class MInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mText: '',

        }
    }

    InPutPathRender(inputWidth) {
        //this.state.mText=this.props.chu;
        return (
            <TextInput
                autoCapitalize={'none'}
                autoCorrect={false}
                selectionColor={'#fff'}
                secureTextEntry={this.props.mTextStyle == 'password' ? true : false}
                autoCompleteType={this.props.mTypeInput != null ? this.props.mTypeInput : 'username'}
                placeholder={this.props.mPlaceHolder != null ? this.props.mPlaceHolder : ""}
                placeholderTextColor={'rgba(255,255,255,0.7)'}
                style={{
                    height: '55%',
                    width: inputWidth,
                    borderWidth: 0,
                    paddingVertical: 0,
                    color: this.props.mColor != null ? this.props.mColor : '#ffffff',
                    marginLeft: SmartScreenBase.smPercenWidth * 4,
                    fontSize: SmartScreenBase.smPercenWidth * 4.4
                }}
                onChangeText={(text) => {
                    this.props.onPressInput.changeText(text, this.props.id);
                }
                }
                value={
                    //this.props.chu!=''?this.props.chu:this.state.mText
                    this.props.chu
                }
            >
            </TextInput>
        )
    }

    IconPathRender() {
        if (this.props.iconRender != null) {
            return (
                <View style={{
                    width: SmartScreenBase.smBaseWidth * 56,
                    height: SmartScreenBase.smBaseWidth * 55,
                    alignItems: 'center',
                    marginBottom: SmartScreenBase.smPercenWidth * 1,
                    marginLeft: SmartScreenBase.smPercenWidth * 2
                }}>
                    {this.props.iconRender}
                    <View style={{
                        width: SmartScreenBase.smBaseWidth * 56,
                        height: SmartScreenBase.smBaseWidth * 5
                    }}/>
                </View>
            )
        } else {
            return (
                <View/>
            )
        }
    }

    IconWarnPathRender() {
        if (this.props.isWarn != null) {
            return (
                <View style={{
                    width: '100%',
                    height: '100%',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    flexDirection: 'row',
                    justifyContent: 'flex-end'
                }}>
                    <Image style={{
                        width: SmartScreenBase.smBaseWidth * 76,
                        height: SmartScreenBase.smBaseWidth * 67,
                        resizeMode: 'contain',
                        marginTop: SmartScreenBase.smPercenWidth * 3
                    }} source={{uri: 'mhchung_icon_11'}}/>
                </View>
            )
        } else {
            return (
                <View/>
            )
        }
    }

    render() {
        return (
            <View style={{
                width: this.props.mWidth,
                height: this.props.mHeight != null ? this.props.mHeight : SmartScreenBase.smPercenWidth * 10,
                flexDirection: 'column', alignItems: 'center', justifyContent: 'center'
            }}>
                <View style={{
                    width: '100%',
                    height: SmartScreenBase.smPercenHeight * 7,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    {this.IconPathRender()}
                    {this.InPutPathRender(this.props.mWidth - SmartScreenBase.smBaseWidth * 56 - SmartScreenBase.smPercenWidth * 2)}
                    {this.IconWarnPathRender()}
                </View>
            </View>
        )
    }
}

export default MInput;
