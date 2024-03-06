import React, {Component} from "react";
import {Image, Animated, View,Dimensions} from "react-native";
import SmartScreenBase from "../../base/SmartScreenBase";
import Sound from "react-native-sound";
import Video from "react-native-video";
import {RightAnswer, WrongAnswer} from '../../../assets/sound';
import MyData from "../../MyData";

export default class FileSound4 extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            animatedValue: new Animated.Value(0),
        }
    }

    animate() {
        Animated.timing(
            this.state.animatedValue,
            {
                toValue: 1,
                duration: 2000,
            }
        ).start()
    }

    componentDidMount() {
        this.animate();
    }
    render() {
        const spin = this.state.animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [SmartScreenBase.smBaseWidth * 550, SmartScreenBase.smBaseWidth * 600, SmartScreenBase.smBaseWidth * 550]
        })
        return (
            <View>
                {console.log("=====MyData.isDisableSound 4",MyData.isDisableSound)}
                {   MyData.isDisableSound ? null :
                    this.props.showImage === 'true'?
                        <Video source={RightAnswer}
                               ref={this.props.player}
                               paused={false}
                               audioOnly={true}
                        />
                        :
                        <Video source={WrongAnswer}
                               ref={this.props.player}
                               paused={false}
                               audioOnly={true}
                        />
                }
            </View>
        )
    }
}
