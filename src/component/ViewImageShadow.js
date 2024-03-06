import React, { Component } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import SmartScreenBase from '../base/SmartScreenBase';
import API from '../API/APIConstant'
export default class ViewImageShadow extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let { Width, Height, Name, BorderRadius } = this.props;
        return (
            <View>
                <View style={{
                    width: SmartScreenBase.smBaseWidth * Width,
                    height: SmartScreenBase.smBaseWidth * Height,
                    backgroundColor: "rgba(0,0,0,0.2)",
                    position: "absolute",
                    borderRadius: BorderRadius == undefined ? 0 : SmartScreenBase.smBaseWidth * BorderRadius,
                    bottom: -SmartScreenBase.smBaseWidth * 8,
                    right: -SmartScreenBase.smBaseWidth * 10

                }} />
                <View style={{
                    width: SmartScreenBase.smBaseWidth * Width,
                    height: SmartScreenBase.smBaseWidth * Height,
                    borderRadius: BorderRadius == undefined ? 0 : SmartScreenBase.smBaseWidth * BorderRadius,
                    overflow: "hidden"
                }}>
                    <View style={{position:"absolute"}}>
                        <Image style={{
                            width: SmartScreenBase.smBaseWidth * Width,
                            height: SmartScreenBase.smBaseWidth * Height,
                            resizeMode: 'cover',
                            borderRadius: BorderRadius == undefined ? 0 : SmartScreenBase.smBaseWidth * BorderRadius,
                        }}
                            source={{uri:'gv_liststudent_08'}}
                        />
                    </View>
                    <Image style={{
                        width: SmartScreenBase.smBaseWidth * Width,
                        height: SmartScreenBase.smBaseWidth * Height,
                        resizeMode: 'cover',
                        borderRadius: BorderRadius == undefined ? 0 : SmartScreenBase.smBaseWidth * BorderRadius,
                    }}
                        source={{ uri: Name == '' ? 'gv_liststudent_08' : Name == (API.image_base_url+'null') ? 'gv_liststudent_08' : Name == undefined ? 'gv_liststudent_08' : Name == null ? "gv_liststudent_08" : Name }}
                    />
                </View>
            </View>
        )
    }
}
