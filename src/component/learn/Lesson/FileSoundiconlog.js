import React, {Component} from "react";
import {Image, Animated, View,Dimensions} from "react-native";
import SmartScreenBase from "../../base/SmartScreenBase";
import Sound from "react-native-sound";
import Video from "react-native-video";
import {RightAnswer, WrongAnswer} from '../../../assets/sound';
import MyData from "../../MyData";

export default class FileSoundiconlog extends Component {
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

    _Playradiorigh = () => {
        return (
            <View>
                {console.log("=====MyData.isDisableSound 5",MyData.isDisableSound)}
                {   MyData.isDisableSound ? null :
                    this.props.showImage === 'true' ?
                        <Video source={require('../../../../src/assets/sound/rightanswers.mp3')}
                               ref={this.myRef}
                               paused={false}
                               audioOnly={true}
                        />
                        :
                        <Video source={require('../../../../src/assets/sound/wronganswers.mp3')}
                               ref={this.myRef}
                               paused={false}
                               audioOnly={true}
                        />
                }
            </View>

        )
    }

    render() {
        const spin = this.state.animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [SmartScreenBase.smBaseWidth * 350, SmartScreenBase.smBaseWidth * 400, SmartScreenBase.smBaseWidth * 350],
        })
        return (
            <View>
                <Animated.Image
                    source={{
                        uri: this.props.showImage === 'true' ? 'grammar2_1' : 'grammar2_2',
                    }}
                    style={{resizeMode: 'contain', height: spin, width: spin}}
                    />
                {
                    MyData.isDisableSound ? null : this.props.showImage === 'true'?
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
