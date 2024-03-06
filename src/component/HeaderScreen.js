import { Text, View, Dimensions, TouchableOpacity, Image } from "react-native";
import React, { Component } from "react";
import SmartScreenBase from "../base/SmartScreenBase";
import * as Animatable from 'react-native-animatable';

export default class HeaderScreen extends Component {
    render() {
        return (
            <Animatable.View animation={'slideInDown'}>
                <View style={{
                    backgroundColor: "rgba(0,0,0,0.3)",
                    height: SmartScreenBase.smPercenWidth * 12,
                    flexDirection: "row", alignItems: "center"
                }}>
                    {this.props.bgHeader == undefined ? null : (
                        <View style={{ position: 'absolute' }}>
                            <Image style={{ width: SmartScreenBase.smPercenWidth * 100, height: SmartScreenBase.smPercenWidth * 12, resizeMode: "cover" }}
                                source={{ uri: this.props.bgHeader }} />
                        </View>
                    )}
                    <View style={{ marginLeft: SmartScreenBase.smPercenWidth * 3 }}>
                        <TouchableOpacity onPress={() => {
                            this.props.navigation.goBack();
                        }}
                        >
                            <Image style={{ width: SmartScreenBase.smPercenWidth * 7, height: SmartScreenBase.smPercenWidth * 7, resizeMode: "contain" }}
                                source={{ uri: 'imageback' }} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginLeft: SmartScreenBase.smPercenWidth * 6 }}>
                        <Text style={{ fontWeight: "400", fontSize: SmartScreenBase.smPercenWidth * 5, color: "white" }}>{this.props.title}</Text>
                    </View>

                </View>
            </Animatable.View>
        )
    }
}