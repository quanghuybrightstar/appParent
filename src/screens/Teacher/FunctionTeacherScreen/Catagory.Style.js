import {StyleSheet, Dimensions, Platform} from 'react-native';
import SmartScreenBase from '../../../base/SmartScreenBase';
const {width, height} = Dimensions.get('screen');

export default StyleSheet.create({
  container: {
    flex: 1,
    // resizeMode: 'stretch',
  },
  ViewHeader:{
    height:height/3.5,
    flexDirection:'row',
    // paddingVertical:SmartScreenBase.smPercenWidth*4,
    alignItems:'center',
    justifyContent:'center',
    width,
  },
  ViewSlide:{
    width:SmartScreenBase.smPercenWidth*6,
    justifyContent:'center',
  },
  Slide:{
    width:'70%',
    height:'70%',
    backgroundColor:'#00000030',
    borderRadius:4
  },
  ViewBodyHeader:{
    height:SmartScreenBase.smPercenHeight*20,
    backgroundColor:'#00000030',
    width:SmartScreenBase.smPercenWidth*88,
    borderRadius:10,
    flexDirection:'row',
    justifyContent:'space-around'
  },
  ViewImageHeader:{
    width:'40%',
    height:'100%',
    borderRadius:5
  },
  ImageHeader:{
    width: '100%',
    height: '100%',
  },
  ViewClass:{
    width:'55%',
    height:'100%',
    borderRadius:5,
    justifyContent:'center'
  },
  TextClassName:{
    color: 'red',
    fontWeight: 'bold',
    fontSize: SmartScreenBase.smPercenWidth*5,
    paddingHorizontal:5,
    width:'95%',
    textAlign:'center',
    backgroundColor:'#fff',
    height:SmartScreenBase.smPercenWidth*8,
    textAlignVertical:'center',
    borderRadius:SmartScreenBase.smPercenWidth*4,

    width:'90%'
  },
  TextTime:{
    color: '#fff',
    fontWeight: '400',
    fontSize: SmartScreenBase.smPercenWidth*3.5,
    width:'100%',
    textAlign:'center',
    height:SmartScreenBase.smPercenWidth*7,
    textAlignVertical:'center',
    paddingTop:5
  },
  TextClass:{
    color: '#fff',
    fontWeight: '800',
    fontSize: SmartScreenBase.smPercenWidth*4,
    width:'100%',
    textAlign:'center',
    height:SmartScreenBase.smPercenWidth*7,
    textAlignVertical:'center',
  },
  ViewSlideRight:{
    width:SmartScreenBase.smPercenWidth*6,
    justifyContent:'center',
    alignItems:'flex-end'
  },
  ViewWapBody:{
    height:height/1.5,
    paddingHorizontal:SmartScreenBase.smPercenWidth*5,
    backgroundColor:'#fff',
    paddingBottom:height/11,
  },
  ButtonItem:{
    flex:1/8,
    flexDirection:'row',
    borderBottomWidth:1,
    borderBottomColor:'#00000030'
  },
  ViewImageMenu:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  ImageMenu:{
    width: '50%',
    height: '50%',
  },
  ViewTextMenu:{
    flex:4,
    justifyContent:'center',
    paddingLeft:10
  },
  TextMenu:{
    color: '#000',
    fontWeight: '400',
    fontSize: SmartScreenBase.smPercenWidth*4,
    textAlignVertical:'center',
  }

});
