
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
            mText: "",
        }
    }

    InPutPathRender(inputWidth)
    {
        return(
            <TextInput autoCompleteType={this.props.mTypeInput!=null?this.props.mTypeInput:'username'} placeholder={this.props.mPlaceHolder!=null?this.props.mPlaceHolder:""} 
            placeholderTextColor={'rgba(255,255,255,0.7)'}
            style={{ height: '55%', width: inputWidth, borderWidth: 0, paddingVertical: 0, color: this.props.mColor!=null?this.props.mColor:'#ffffff', 
            marginLeft: SmartScreenBase.smPercenWidth*4, fontSize: SmartScreenBase.smPercenWidth*4.4}}
            onChangeText={text => {this.setState({mText: text})}}
            value={this.state.mText}>
            </TextInput>
        )
    }

    FootPathRender()
    {
        return(
            <View style={{width: '100%', height: SmartScreenBase.smPercenWidth*0.1, position: 'absolute', 
            bottom: SmartScreenBase.smPercenWidth*1.5, backgroundColor: 'rgba(255,255,255,0.7)'}}>                 
            </View>
        )
    }

    IconPathRender()
    {
        if(this.props.iconRender!=null){
            return(
                <View style={{width: SmartScreenBase.smBaseWidth*56, height: SmartScreenBase.smBaseWidth*55, alignItems: 'center', 
                marginBottom: SmartScreenBase.smPercenWidth*1, marginLeft: SmartScreenBase.smPercenWidth*2}}>
                    {/* <Image style={{width: SmartScreenBase.smBaseWidth*47, height: SmartScreenBase.smBaseWidth*50, resizeMode: 'contain'}} source={{uri:'mhchung_icon_01'}}></Image> */}
                    {this.props.iconRender}
                    <View style={{width: SmartScreenBase.smBaseWidth*56, height: SmartScreenBase.smBaseWidth*5}}></View>
                </View>
            )
        }else{
            return(
                <View></View>
            )            
        }
    }

    IconWarnPathRender()
    {
        if(this.props.isWarn!=null){
            return(
                <View style={{width: '100%', height: '100%', position: 'absolute', bottom: 0, left: 0, flexDirection: 'row', justifyContent: 'flex-end'}}>
                    <Image style={{width: SmartScreenBase.smBaseWidth*76, height: SmartScreenBase.smBaseWidth*67, resizeMode: 'contain', marginTop: SmartScreenBase.smPercenWidth*3}} source={{uri:'mhchung_icon_11'}}></Image>
                </View>
            )
        }else{
            return(
                <View></View>
            )            
        }
    }

    render() {
        return (
            <View style={{width: this.props.mWidth, 
            height: this.props.mHeight!=null?this.props.mHeight:SmartScreenBase.smPercenWidth*10, 
            flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <View style={{width: '100%', height: SmartScreenBase.smPercenHeight*7, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    {this.IconPathRender()}
                    {this.InPutPathRender(this.props.mWidth-SmartScreenBase.smBaseWidth*56-SmartScreenBase.smPercenWidth*2)}
                    {this.IconWarnPathRender()}
                </View>
                {this.FootPathRender()}
            </View>
        )
    }
}

export default MInput;