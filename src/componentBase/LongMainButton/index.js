import * as React from 'react';
import {Image, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from '../../styleApp/color';
import {TextBox} from '../TextBox';
import SmartScreenBase from '../../base/SmartScreenBase';
import stylesApp from '../../styleApp/stylesApp';
/**
 * @summary The MyLongMainButton component
 *
 * @param {object} props
 * @property {style} props.style: Style of the btn
 * @property {textStyles} props.textStyles: Style of the text
 * @property {text} props.text: text
 * @property {string} props.image: image url
 * @property {number} props.numberOfLines: number Of Line
 * @property {style} props.imageStyle: style of image
 * @property {object} other: others props of TouchableOpacity
 *
 * @returns {Component}
 */
export const MyLongMainButton = props => {
  const {
    text,
    image,
    children,
    style,
    imageStyle,
    textStyles,
    numberOfLines = 2,
    ...others
  } = props;

  return (
    <TouchableOpacity {...others} style={[styles.button, style]}>
      {!!image && (
        <Image
          source={typeof image == 'string' ? {uri: image} : image}
          style={[styles.image, imageStyle]}
          resizeMode="contain"
        />
      )}
      <TextBox numberOfLines={numberOfLines} style={[styles.text, textStyles]}>
        {text}
      </TextBox>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: SmartScreenBase.smPercenWidth * 30,
    height: SmartScreenBase.smPercenWidth * 30,
    borderRadius: SmartScreenBase.smBaseWidth * 20,
    ...stylesApp.shadow,
    backgroundColor: Colors.White,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  text: {
    textAlign: 'center',
    height: SmartScreenBase.smPercenWidth * 12,
  },
  image: {
    width: SmartScreenBase.smPercenWidth * 12,
    height: SmartScreenBase.smPercenWidth * 12,
  },
});
