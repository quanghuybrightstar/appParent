import React, { Component } from 'react';
import { Image, StyleSheet,View } from 'react-native';
import SmartScreenBase from '../base/SmartScreenBase';
export default class ViewImage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { Width, Height, Name, BorderRadius } = this.props;
        return (
                <Image style={{
                    width: SmartScreenBase.smBaseWidth * Width,
                    height: SmartScreenBase.smBaseWidth * Height,
                    resizeMode: 'contain',
                    borderRadius:BorderRadius==undefined?0:SmartScreenBase.smBaseWidth*BorderRadius
                }}
                    source={{ uri: Name == '' ? 'gv_liststudent_08' : Name == null ? 'gv_liststudent_08' : Name == undefined ? 'gv_liststudent_08' : Name }}
                />
        )
    }
}
