import { StyleSheet, Dimensions, Platform } from 'react-native';
import SmartScreenBase from '../../../../base/SmartScreenBase';
const { width, height } = Dimensions.get('screen');

export default StyleSheet.create({
  container: {
    flex: 1,
  },
  hearder: {
    alignItems:'center',
    flexDirection:'row',
    height: height / 6,
    width: width,
    marginBottom: height / 40,
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 12,
  },
  Image_hearder: {
    justifyContent:'center',
    alignItems:'center',
    width: height / 5,
  },
  Information_hearder: {
    justifyContent:'center',
    width:width - height/6,
    height: height / 5,
  },
  style_phoneNumber:{
    marginTop: height / 50,
    flexDirection:'row',
  },
  Image_phoneNumber:{
    height:20,
    width:30,
  },
  body: {
    height: height - height / 6,
    width: width,
  },
  listCategory: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    height: height / 8,
    marginBottom: height / 20,
    marginHorizontal: width / 9
  },
  listCategorybottom: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    height: height / 8,
    marginHorizontal: width / 9
  },
  Image_categore1: {
    height:SmartScreenBase.smBaseHeight * 140,
    width: SmartScreenBase.smBaseHeight * 140,
  },
  Image_categore: {
    height: height / 5,
    width: height / 5,
  },
  styleBotton: {
    height: height / 15,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: height / 9,
  },
  styleTouchable: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00283A',
    borderRadius: width/4,
    width: width/2,
    height: height / 20,
  }
});
