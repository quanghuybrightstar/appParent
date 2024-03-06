import React, { Component } from "react";
import { View, SafeAreaView, ImageBackground } from "react-native";
import TabViewCheckEx from './Component/TabViewCheckEx';
import StyleStudent from "../StyleStudent";
import HeaderScreen from "../../../component/HeaderScreen";
export default class CheckExserciseScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }


    _startLesson(data) {
        this.props.navigation.navigate('ListLesson', {data: data});
    }

    render() {
        return (
            <SafeAreaView>
                <ImageBackground source={{ uri: 'imagebackground' }}
                    imageStyle={StyleStudent.Sty_ImageBackground}
                    style={StyleStudent.Sty_ImageBackground} >
                    <HeaderScreen navigation={this.props.navigation} title={this.props.navigation.getParam('title')} />
                    <TabViewCheckEx startLesson={(data) => this._startLesson(data)} NumberEx = {[5,5,5]}/>
                </ImageBackground>
            </SafeAreaView>
        )
    }
}
