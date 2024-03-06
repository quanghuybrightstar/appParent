import React, {Component} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {ParallaxImage} from 'react-native-snap-carousel';
import styles from '../styles/SliderEntry.style';

export default class SliderEntry extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    even: PropTypes.bool,
    parallax: PropTypes.bool,
    parallaxProps: PropTypes.object,
  };

  render() {
    const {
      data: {subtitle},
      even,
    } = this.props;
    return (
      <TouchableOpacity activeOpacity={1} style={styles.slideInnerContainer}>
        <View style={[styles.textContainer]}>
          <Text style={[styles.subtitle]}>{subtitle}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}
