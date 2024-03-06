import {
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Alert,
    Keyboard,
    Dimensions,
    FlatList, Image,
    ImageBackground
} from 'react-native';
import React, { Component } from "react";
export default class FooterTabs extends Component {
    render () {
        return (
            <ImageBackground
                style={{width: '100%', height: 50}}
                source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/3/36/Hopetoun_falls.jpg' }}>
            </ImageBackground>
        )
    }
}
