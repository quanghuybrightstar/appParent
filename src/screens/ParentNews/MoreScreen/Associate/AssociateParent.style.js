import {StyleSheet, Dimensions} from 'react-native';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import FontBase from '../../../../base/FontBase';
import {Colors} from '../../../../styleApp/color';
import {FontSize, FontWeight} from '../../../../styleApp/font';
const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors._F3FFFF,
  },
  flex1: {flex: 1},
  flatlist: {
    flex: 1,
    paddingHorizontal: SmartScreenBase.smBaseWidth * 45,
    marginBottom: 10,
  },
  associate_base_box: {
    paddingVertical: SmartScreenBase.smBaseWidth * 45,
    borderBottomWidth: 1,
    borderBottomColor: '#C4C4C4',
  },
  viewAdd: {
    height: 'auto',
    borderRadius: SmartScreenBase.smBaseHeight * 45,
    marginVertical: SmartScreenBase.smBaseHeight * 15,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  textSty: {
    fontSize: FontSize.size55Font,
    ...FontWeight.Bold,
    color: Colors.White,
  },
  baseTitle: {
    color: Colors.BaseGreen,
    ...FontWeight.Bold,
    fontSize: FontSize.size60Font,
    paddingBottom: 5,
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
  },
  flexRow: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  trashIcon: {
    height: SmartScreenBase.smBaseWidth * 50,
    width: SmartScreenBase.smBaseHeight * 50,
    resizeMode: 'contain',
  },
  boxShadow: {
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: 1.5,
    },
    shadowOpacity: 0.5,
    shadowColor: Colors.Black,
    elevation: 3,
  },
  item_student: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 3,
    paddingVertical: SmartScreenBase.smBaseWidth * 20,
  },
  item_student_infor: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  item_student_desc: {
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingLeft: 30 * SmartScreenBase.smBaseWidth,
  },
  item_student_name: {
    ...FontWeight.Bold,
    fontSize: FontSize.size50Font,
    color: Colors.TextLight,
    paddingBottom: 3,
  },
  item_student_email: {
    fontSize: FontSize.size45Font,
    color: Colors.TextLight,
    paddingTop: 3,
  },
  borderRadius30: {borderRadius: SmartScreenBase.smPercenWidth * 30},
  deleteText: {
    fontSize: FontSize.size45Font,
    textAlign: 'center',
  },
  deleteNameText: {
    fontSize: FontSize.size50Font,
    ...FontWeight.Bold,
    textAlign: 'center',
    paddingVertical: 10,
  },
});
