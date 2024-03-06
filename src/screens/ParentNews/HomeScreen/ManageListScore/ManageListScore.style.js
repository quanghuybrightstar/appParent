import {StyleSheet} from 'react-native';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import FontBase from '../../../../base/FontBase';
import {FontSize, FontWeight} from '../../../../styleApp/font';
import {Colors} from '../../../../styleApp/color';

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
    marginHorizontal: SmartScreenBase.smPercenWidth * 4,
    borderBottomColor: '#dcdcdc',
    borderBottomWidth: 2,
    paddingVertical: SmartScreenBase.smPercenHeight,
  },
  topic: {
    fontFamily: FontBase.MyriadPro_Bold,
    fontSize: SmartScreenBase.smFontSize * 50,
    color: '#0fa294',
    paddingTop: 2,
    lineHeight: SmartScreenBase.smFontSize * 52,
  },
  name: {
    fontFamily: FontBase.MyriadPro_Light,
    fontSize: SmartScreenBase.smFontSize * 50,
    color: '#0fa294',
  },
  modalBox: {
    paddingBottom: SmartScreenBase.smBaseHeight * 40,
    paddingTop: SmartScreenBase.smBaseHeight * 40,
  },
  messageModalStyle: {
    marginBottom: SmartScreenBase.smBaseHeight * 20,
    color: Colors.Black,
    fontSize: FontSize.size55Font,
    lineHeight: SmartScreenBase.smBaseHeight * 40,
  },
  messageDeleteStyle: {
    marginBottom: 0,
    paddingBottom: 0,
  },
  textRankFooter: {
    fontSize: SmartScreenBase.smFontSize * 50,
    ...FontWeight.Bold,
    color: Colors.White,
  },
  textChangeRank: {
    fontSize: SmartScreenBase.smFontSize * 45,
    ...FontWeight.Bold,
    color: Colors.White,
  },
  textViewDetail: {
    textDecorationLine: 'underline',
    fontSize: SmartScreenBase.smFontSize * 45,
    color: Colors.White,
  },
});

export default styles;
