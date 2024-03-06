import {StyleSheet, Dimensions, Platform} from 'react-native';
import SmartScreenBase from '../../../../base/SmartScreenBase';
const {width, height} = Dimensions.get('screen');

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Platform.OS === 'ios' ? 35 : 0,
  },
  wrapBody: {
    width: '100%',
    height: '5%',
    backgroundColor: '#00000070',
    justifyContent: 'center',
  },
  wrapCart: {
    width: '100%',
    height: '22%',
    backgroundColor: '#00000030',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  styleText: {
    fontSize: 25,
    color: '#ffffff',
    marginLeft: '5%',
  },
  wrapIdCart: {
    width: '12%',
    height: '70%',
  },
  wrapTextCart: {
    width: '80%',
    height: '100%',
    backgroundColor: '#00000030',
    borderRadius: 10,
  },

  wrapText: {
    width: '12%',
    height: '70%',
    flexDirection: 'row-reverse',
  },

  wrapText1: {
    width: '100%',
    height: '70%',
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapAccountNumber: {
    width: '88%',
    height: '60%',
    backgroundColor: '#FFF',
  },
  text1: {
    width: '100%',
    height: height * 0.08,
    borderBottomColor: '#F5F5F5',
    borderBottomWidth: 1,
    flexDirection: 'row',
  },

  wrapCopy: {
    width: '25%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapCopy2: {
    width: SmartScreenBase.smBaseWidth * 100,
    height: SmartScreenBase.smBaseWidth * 100,
    resizeMode: 'contain',
  },
  wrapView: {
    width: '75%',
    height: '100%',
    justifyContent: 'center',
  },
  text2: {
    width: '100%',
    height: height * 0.09,
    borderBottomColor: '#F5F5F5',
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
  wrapText2: {
    width: '25%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  text3: {
    width: '100%',
    height: height * 0.09,
    borderBottomColor: '#F5F5F5',
    borderBottomWidth: 1,
    flexDirection: 'row',
  },
});
