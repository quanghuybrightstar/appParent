import React, { Component } from 'react';
import { Text, View, TextInput } from "react-native";

export default class ViewInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: this.props.text
        }
        this.onChangeText = this.onChangeText.bind(this)
    }
    onChangeText(text, index, keyIndex) {
        this.props.screen._OnTextChange(text, index, keyIndex);
        this.setState({ text: text });
    }
    render() {
        let { keyIndex, index, Editable, placeholder, placeholderTextColor, style } = this.props;
        return (
            <View>
                <TextInput
                    editable={Editable}
                    value={this.state.text}
                    placeholder={placeholder}
                    placeholderTextColor={placeholderTextColor}
                    onChangeText={(text) => { this.onChangeText(text, index, keyIndex) }}
                    style={style}
                    underlineColorAndroid={'transparent'}
                />
            </View>
        )
    }
}
