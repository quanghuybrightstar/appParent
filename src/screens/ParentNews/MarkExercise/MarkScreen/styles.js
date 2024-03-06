import {Platform, StyleSheet} from 'react-native';
import FontBase from '../../../../base/FontBase';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import {Colors} from '../../../../styleApp/color';
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: Colors.BlackOpacity,
    margin: 0,
  },
  containerContent: {
    backgroundColor: Colors.White,
    width: '100%',
    padding: SmartScreenBase.smPercenWidth * 2,
  },
  viewButtonCancel: {
    alignItems: 'flex-end',
    width: '100%',
    paddingRight: SmartScreenBase.smPercenWidth * 5,
    marginBottom: SmartScreenBase.smPercenHeight * 2,
  },
  buttonCancel: {
    minWidth: SmartScreenBase.smPercenWidth * 10,
    minHeight: SmartScreenBase.smPercenHeight * 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textCancel: {
    fontFamily: FontBase.MyriadPro_Bold,
    color: Colors.Black,
    fontSize: SmartScreenBase.smFontSize * 48,
  },
  viewLeftContentModalFilter: {
    width: '40%',
    alignItems: 'flex-end',
  },
  viewRightContentModalFilter: {
    width: '40%',
    alignItems: 'flex-start',
  },
  texTitleModalFilter: {
    fontFamily: FontBase.MyriadPro_Bold,
    color: Colors.Black,
    fontSize: SmartScreenBase.smFontSize * 48,
    marginVertical: SmartScreenBase.smPercenHeight,
  },
  viewContent: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  viewItemModalFilter: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SmartScreenBase.smPercenWidth * 1.2,
  },
  txtAll: {
    borderRadius: SmartScreenBase.smPercenWidth * 2,
    width: SmartScreenBase.smPercenWidth * 27,
    height: SmartScreenBase.smPercenWidth * 9,
  },
  txtButtonHead: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SmartScreenBase.smPercenWidth * 3,
  },
  viewIconBoxModalFilter: {
    width: SmartScreenBase.smPercenWidth * 5,
    height: SmartScreenBase.smPercenWidth * 5,
    marginRight: SmartScreenBase.smPercenWidth * 2,
    alignItems: 'center',
  },
  iconBoxModalFilter: {
    position: 'absolute',
    bottom: SmartScreenBase.smPercenWidth,
    width: SmartScreenBase.smPercenWidth * 5,
    height: SmartScreenBase.smPercenWidth * 5,
    resizeMode: 'contain',
  },
  iconTickModalFilter: {
    position: 'absolute',
    bottom: SmartScreenBase.smPercenWidth * 2,
    width: SmartScreenBase.smPercenWidth * 5,
    height: SmartScreenBase.smPercenWidth * 5,
    resizeMode: 'contain',
    left: 1.5,
  },
  textItemModalFilter: {
    fontFamily: FontBase.MyriadPro_Light,
    color: Colors.Black,
    fontSize: SmartScreenBase.smPercenWidth * 4,
  },
  viewButton: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: SmartScreenBase.smPercenWidth * 6,
    justifyContent: 'center',
    marginVertical: SmartScreenBase.smPercenHeight * 2,
  },
  buttonDeleteFilter: {
    width: '40%',
    paddingVertical: SmartScreenBase.smPercenWidth * 2,
    alignItems: 'center',
    borderRadius: SmartScreenBase.smPercenWidth * 8,
    borderWidth: 1,
    borderColor: Colors.StrongCyan,
    justifyContent: 'center',
  },
  buttonConfirm: {
    width: '40%',
  },
  gradientButtonConfirm: {
    width: '100%',
    paddingVertical: SmartScreenBase.smPercenWidth * 3,
    alignItems: 'center',
    borderRadius: SmartScreenBase.smPercenWidth * 8,
  },
  textButton: {
    fontFamily: FontBase.MyriadPro_Light,
    fontSize: SmartScreenBase.smFontSize * 42,
    textAlign: 'center',
    marginTop: Platform.OS === 'android' ? 0 : SmartScreenBase.smBaseHeight * 5,
  },
});

export default styles;
