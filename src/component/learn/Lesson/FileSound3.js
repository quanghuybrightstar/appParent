import React, {Component} from 'react';
import {Image, Animated, View, Dimensions} from 'react-native';
import SmartScreenBase from '../../base/SmartScreenBase';
import Video from 'react-native-video';
import {RightAnswer, WrongAnswer} from '../../../assets/sound';
import MyData from '../../MyData';

export default class FileSound3 extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
        this.state = {
            animatedValue: new Animated.Value(0),
        };
    }

    animate() {
        Animated.timing(
            this.state.animatedValue,
            {
                toValue: 1,
                duration: 2000,
            },
        ).start();
    }

    componentDidMount() {
        this.animate();
    }

    _ShowIconResuilt() {
        if (this.state.Resuilt == 0) {
            return 'lesson_vocab_image15';
        } else if (this.state.Resuilt == 1) {
            return 'lesson_vocab_image16';
        } else {
            return 'lesson_vocab_image17';
        }
    }

    _Playradiorigh = () => {
        return (
            <View>
                {console.log("=====MyData.isDisableSound 3",MyData.isDisableSound)}
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
        );
    };

    render() {
        const spin = this.state.animatedValue.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [SmartScreenBase.smBaseWidth * 450, SmartScreenBase.smBaseWidth * 500, SmartScreenBase.smBaseWidth * 450],
        });
        return (
            <View>
                <Animated.Image
                    source={{
                        uri: this.props.showImage === 'true' ? 'lesson_vocab_image15' : this.props.showImage === 'false' ? 'lesson_vocab_image16' : 'lesson_vocab_image117',
                    }}
                    style={{resizeMode: 'contain', height: spin, width: spin}}
                />
                {
                    MyData.isDisableSound ? null : this.props.showImage === 'true' ?
                        <Video source={RightAnswer}
                               ref={this.props.player}
                               paused={false}
                               audioOnly={true}
                        />
                        :
                        <Video source={WrongAnswer}
                               ref={this.props.player}
                               paused={false}
                               audioOnly={true}/>
                }
            </View>
        );
    }
}
