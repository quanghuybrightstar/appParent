import React, {useCallback} from 'react';
import {View, Text, StatusBar} from 'react-native';
import Modal from 'react-native-modal';
import {MyButton} from '../../../componentBase/Button';
import {TextBox} from '../../../componentBase/TextBox';
import styles from './style';
const ComponentModal = ({
  message,
  isVisible,
  onClose,
  noButton,
  style,
  errorSize,
}) => {
  //đóng modal
  const _onClose = useCallback(() => {
    if (onClose) {
      onClose();
    }
  }, [onClose]);
  const fontSize = errorSize;
  return (
    <Modal
      isVisible={isVisible}
      style={{
        margin: -10, // This is the important style you need to set
        height: '110%',
      }}
      animationIn="bounceIn">
      <View style={[styles.modalContainer, style]}>
        <Text style={[styles.close, fontSize && {fontSize}]}>{message}</Text>
        {!noButton ? (
          <MyButton
            hasBackground
            style={styles.buttonSave}
            text={'Đóng'}
            textStyles={styles.titleSave2}
            onPress={_onClose}
          />
        ) : (
          <View />
        )}
      </View>
    </Modal>
  );
};
export default ComponentModal;
