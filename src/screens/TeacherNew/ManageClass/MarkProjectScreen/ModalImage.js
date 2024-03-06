import React, {useCallback, useState} from 'react';
import {Image, Platform, TouchableOpacity, View} from 'react-native';
import Orientation from 'react-native-orientation';
import {useDispatch, useSelector} from 'react-redux';
import {IC_ROTATE, IC_ZOOM_OUT} from '../../../../assets/icon';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import {setModalVisible} from '../../../../redux/actions/ModalImage';
import Modal from 'react-native-modal';
import {Colors} from '../../../../styleApp/color';
import {isIphoneX} from 'react-native-iphone-x-helper';

const ModalImage = ({url}) => {
  const dispatch = useDispatch();
  //Kiểm tra ảnh đang là dọc hay ngang
  const [isPortrait, setIsPortrait] = useState(true);
  //Lưu trạng thái phóng to thu nhỏ
  const {modalVisible} = useSelector((state) => state.ModalReducer);
  console.log('modal', modalVisible);

  //Xoay ngang dọc image
  const rotate = useCallback(() => {
    if (isPortrait) {
      console.log('isPortrait.true', isPortrait);
      setIsPortrait(false);
      if (Platform.OS === 'android') {
        Orientation.lockToLandscapeLeft();
      } else {
        Orientation.lockToLandscapeRight();
      }
    } else {
      console.log('isPortrait.false', isPortrait);
      setIsPortrait(true);
      Orientation.lockToPortrait();
    }
    dispatch(setModalVisible(true));
  }, [dispatch, isPortrait]);

  //Thu nhỏ image
  const closeModal = useCallback(() => {
    Orientation.lockToPortrait();
    setIsPortrait(true);
    dispatch(setModalVisible(false));
  }, [dispatch]);

  return (
    <Modal
      isVisible={modalVisible}
      onBackdropPress={closeModal}
      backdropOpacity={1}
      backdropColor={Colors.White}
      style={{
        width: '100%',
        flex: 1,
        height: SmartScreenBase.smPercenHeight * 100,
        margin: 0,
        // marginLeft: -SmartScreenBase.smBaseWidth * 5,
      }}
      supportedOrientations={[
        'portrait',
        'landscape',
        'landscape-left',
        'landscape-right',
      ]}>
      <View
        style={{
          // alignSelf: 'flex-end',
          position: 'absolute',
          top: isPortrait
            ? isIphoneX()
              ? SmartScreenBase.smPercenHeight * 5
              : SmartScreenBase.smPercenHeight * 3
            : SmartScreenBase.smPercenHeight * 3,
          right: SmartScreenBase.smPercenWidth * 5,
          flexDirection: 'row',
          zIndex: 100000,
        }}>
        <TouchableOpacity onPress={rotate}>
          <Image
            source={IC_ROTATE}
            style={{
              width: SmartScreenBase.smBaseWidth * 105,
              height: SmartScreenBase.smBaseWidth * 105,
              marginRight: SmartScreenBase.smPercenWidth * 2,
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={closeModal}>
          <Image
            source={IC_ZOOM_OUT}
            style={{
              width: SmartScreenBase.smBaseWidth * 105,
              height: SmartScreenBase.smBaseWidth * 105,
              marginBottom: SmartScreenBase.smPercenWidth * 2,
            }}
          />
        </TouchableOpacity>
      </View>
      <View>
        {/* <ImageZoom
          cropWidth={Dimensions.get('window').width}
          cropHeight={Dimensions.get('window').height}
          imageWidth={Dimensions.get('window').width}
          imageHeight={Dimensions.get('window').height}>
          <Image
            style={{
              width: '100%',
              height: isPortrait
                ? SmartScreenBase.smPercenHeight * 100
                : SmartScreenBase.smPercenWidth * 100,
            }}
            source={{
              uri: url,
            }}
            resizeMode={'contain'}
          />
        </ImageZoom> */}
        <Image
          style={{
            width: '100%',
            height: isPortrait
              ? SmartScreenBase.smPercenHeight * 100
              : SmartScreenBase.smPercenWidth * 100,
          }}
          source={{
            uri: url,
          }}
          resizeMode={'contain'}
        />
      </View>
    </Modal>
  );
};

export default ModalImage;
