import {Platform, StyleSheet} from 'react-native';
import FontBase from '../../../../base/FontBase';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import {Colors} from '../../../../styleApp/color';
import {FontSize, FontWeight} from '../../../../styleApp/font';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerContent: {
    backgroundColor: Colors._F3FFFF,
    width: '100%',
    position: 'relative',
    // flex: 1,
    // padding: SmartScreenBase.smPercenWidth * 2,
    // marginTop: SmartScreenBase.smBaseHeight * 50,
  },
  flex1: {
    flex: 1,
  },
  containerLinear: {
    height: SmartScreenBase.smBaseHeight * 50,
  },
  flatlist: {
    flex: 1,
    paddingHorizontal: SmartScreenBase.smBaseWidth * 45,
    marginBottom: 10,
  },
  associate_base_box: {
    paddingVertical: SmartScreenBase.smBaseWidth * 45,
    borderBottomWidth: 1,
    borderBottomColor: Colors.BorderLight,
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
  arrowDownIcon: {
    width: SmartScreenBase.smBaseWidth * 70,
    height: SmartScreenBase.smBaseHeight * 70,
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
  listChildrenContainer: {
    zIndex: 9,
  },
  shadowBg: {
    backgroundColor: Colors._black02,
  },
  item_student: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: 30 * SmartScreenBase.smBaseWidth,
    paddingBottom: SmartScreenBase.smBaseWidth * 30,
    backgroundColor: Colors.White,
  },
  item_student_wrapper: {
    justifyContent: 'space-between',
    paddingTop: SmartScreenBase.smBaseWidth * 30,
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
  rotate180: {
    transform: [
      {
        rotate: '180deg',
      },
    ],
  },
  iconDownContainer: {},
  itemStudentRemaining: {
    borderTopWidth: 0.5,
    borderTopColor: Colors.DarkGrayish,
  },
  boxDashboard: {
    borderWidth: 1,
    borderColor: Colors.BorderLight,
    paddingTop: SmartScreenBase.smBaseWidth * 30,
    paddingBottom: SmartScreenBase.smBaseWidth * 30,
    paddingHorizontal: SmartScreenBase.smBaseWidth * 50,
    backgroundColor: Colors.White,
    marginBottom: SmartScreenBase.smPercenWidth * 4,
  },
  contentDashboard: {
    // borderTopWidth: 1,
    // borderTopColor: Colors.Gray_E5,
    paddingVertical: 3 * SmartScreenBase.smPercenWidth,
    paddingHorizontal: SmartScreenBase.smBaseWidth * 35,
  },
  positionAbs: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flex: 1,
    backgroundColor: Colors._black02,
  },
  positionRel: {
    position: 'relative',
  },
  titleBox: {
    fontSize: FontSize.size45Font,
    ...FontWeight.Bold,
  },
  detailExerciseLeft: {
    paddingRight: SmartScreenBase.smBaseWidth * 100,
  },
  textUnderlineDetail: {
    textDecorationLine: 'underline',
    color: Colors.PrimaryOrange,
    fontSize: FontSize.size40Font,
  },
  textOrange: {
    ...FontWeight.Bold,
    fontSize: FontSize.size85Font,
    color: Colors.PrimaryOrange,
  },
  textBlue: {
    ...FontWeight.Bold,
    fontSize: FontSize.size85Font,
    color: Colors.PrimaryBlue,
  },
  textRed: {
    ...FontWeight.Bold,
    fontSize: FontSize.size85Font,
    color: Colors.Red_EB5,
  },
  textPdTop: {
    paddingTop: SmartScreenBase.smPercenWidth * 3,
  },
  textTypeTimeAvg: {
    color: Colors.TextLight,
    fontSize: SmartScreenBase.smFontSize * 45,
  },
  textTypeSelectedTime: {
    color: Colors.PrimaryOrange,
    textDecorationLine: 'underline',
    ...FontWeight.Bold,
  },
  textComparation: {
    color: Colors.TextLight,
    fontSize: FontSize.size45Font,
    ...FontWeight.Bold,
    top: -SmartScreenBase.smBaseWidth * 13,
  },
  textOrangeBottom: {
    color: Colors.PrimaryOrange,
    fontSize: FontSize.size37Font,
    ...FontWeight.Bold,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.BorderLight,
    paddingVertical: SmartScreenBase.smBaseWidth * 12,
    marginBottom: SmartScreenBase.smBaseWidth * 5,
  },
  textOrange16: {
    color: Colors.PrimaryOrange,
    fontSize: FontSize.size45Font,
    ...FontWeight.Bold,
  },
  diamondTxt: {
    fontSize: FontSize.size45Font,
    color: Colors.PrimaryOrange,
    ...FontWeight.Bold,
    marginRight: SmartScreenBase.smPercenWidth * 1.5,
  },
  diamondImg: {
    width: SmartScreenBase.smPercenWidth * 6,
    height: SmartScreenBase.smPercenWidth * 6,
    resizeMode: 'contain',
  },
  skillAvgContainer: {
    // width: SmartScreenBase.smPercenWidth * 100,
    flexWrap: 'wrap',
    paddingTop: SmartScreenBase.smBaseWidth * 40,
    marginHorizontal: -SmartScreenBase.smBaseWidth * 170,
  },
});

export default styles;
