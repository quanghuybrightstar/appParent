import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import stylesApp from "../styleApp/stylesApp";

export default class ButtonCheck extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <View style={this.props.style != null ? this.props.style : stylesApp.Sty_Button}>
                <Text style={this.props.styleText != null ? this.props.styleText : stylesApp.Sty_Text_Button}>
                    {this.props.TextButton}</Text>
            </View>
        )
    }
}