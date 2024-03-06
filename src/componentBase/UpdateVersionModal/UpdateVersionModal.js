import React, {useRef, useEffect, useState} from 'react';
import {View, Image, Modal, TouchableOpacity, StyleSheet, Animated, Platform, Linking} from 'react-native';
import SmartScreenBase from '../../base/SmartScreenBase';
import { Colors } from '../../styleApp/color';
import { TextBox } from '../TextBox';
import FontBase from '../../base/FontBase';
import { ShortMainButton } from '../ShortMainButton';
import APIBase from '../../base/APIBase';
import API from '../../API/APIConstant';
import LogBase from '../../base/LogBase';
import { connect } from 'react-redux';
import device from '../../utils/device';
import codePush from "react-native-code-push";
import LinearGradient from 'react-native-linear-gradient';

var gtUpdate = 0

const UpdateVersionModal = (props) => {

    const fadeAnim = useRef(new Animated.Value(0)).current;
    const timer = useRef();
    const { isVisible, isMust, onClose, dataUpdate } = props
    const [isDowning, setDowning] = useState(false)
    const [percen, setPercen] = useState(0)

    useEffect(() => {
      gtUpdate = 0
      return () => {
        clearTimeout(timer.current)
      }
  }, []);

  const runProgess = () => {
    timer.current = setInterval(() => {
      if(gtUpdate < 98){
        LogBase.log("=====timer", percen)
        var addPoi = gtUpdate > 84 ? 0.075 : gtUpdate > 72 ? 0.25 : gtUpdate > 60 ? 1 : 4
        gtUpdate = gtUpdate + addPoi
        setPercen(gtUpdate)
      }
    }, 200);
  }

    const cancelUpdate = async () => {
        // var url = API.baseurl + API.ignore_version
        // var res = await APIBase.postDataJson('post', url)
        // LogBase.log("=====cancelUpdate",res.data)
        // if(res.data.status){
        //   APIBase.updateJWT(res.data.jwt_token)
        //   await props.dispatch(ActionDataClass({ jwt_token: res.data.jwt_token }));
          onClose()
        // }else{
        //     Alert.alert("",res.msg)
        // }
    }

    const startUpdate = async () => {
        if(dataUpdate.version_number > device.getBuildNumber()){
          var url = Platform.OS == 'ios' ? "https://apps.apple.com/us/app/sunday-english/id1536078421" : "http://play.google.com/store/apps/details?id=gk.app.sunday";
          Linking.openURL(url); 
        }else{
          setDowning(true)
          runProgess()
          codePush.sync({
            updateDialog: false,
            installMode: codePush.InstallMode.IMMEDIATE
        });
        }
    }

  return(
    <Modal visible={isVisible}>
        <View style={styles.father}>
            <Image style={styles.imageCent}
                resizeMode={'contain'}
                source={{uri: 'new_update'}}/>
            <TextBox style={styles.firstText} text={"Sunday English đã có phiên bản mới"}/>
            <TextBox numberOfLines={2} style={styles.secondText} text={"Vui lòng cập nhật để trải nghiệm những tính năng tốt nhất!"}/>
            {!isDowning ? <ShortMainButton text={"Cập nhật"} onPress={()=>{startUpdate()}} type={1} widthType={'mini'}/>
            :<View style={{alignItems: 'center'}}>
              <TextBox style={styles.percenText} text={parseInt(percen)+"%"}/>
              <View style={styles.progessLay}>
                      <Animated.View style={{ ...styles.viewLoading, width: SmartScreenBase.smPercenWidth * (percen/2), overflow: 'hidden' }} >
                          <LinearGradient
                              colors={['#00E2A0','#F45FA4']}
                              start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}
                              style={{flex:1}}
                          />
                      </Animated.View>
              </View>
            </View>}
            {dataUpdate && dataUpdate.is_obligatory == 0 && <TouchableOpacity onPress={()=>{cancelUpdate()}} style={styles.textButton}>
                <TextBox style={styles.textIn} text={"Để sau"}/>
            </TouchableOpacity>}
        </View>
    </Modal>
  ) 

};

const styles = StyleSheet.create({
   father: {
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#f3ffff",
        height: SmartScreenBase.smPercenHeight*100,
        width: SmartScreenBase.smPercenWidth*100,
      },
    imageCent: {
        marginTop: SmartScreenBase.smPercenHeight*12,
        height: SmartScreenBase.smPercenWidth*60,
        width: SmartScreenBase.smPercenWidth*100,
      },
    firstText: {
        marginTop: SmartScreenBase.smPercenHeight*2,
        width: SmartScreenBase.smPercenWidth*100,
        fontFamily: FontBase.MyriadPro_Bold,
        fontSize: SmartScreenBase.smFontSize*50,
        color: Colors.NearBlack,
        textAlign: 'center'
      },
      secondText: {
        width: SmartScreenBase.smPercenWidth*70,
        fontSize: SmartScreenBase.smFontSize*50,
        color: Colors.NearBlack,
        textAlign: 'center',
        marginBottom: SmartScreenBase.smPercenHeight*5
      },
      textButton: {
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        bottom: SmartScreenBase.smPercenHeight*2,
        width: SmartScreenBase.smPercenWidth*40,
        height: SmartScreenBase.smPercenWidth*14
      },
      textIn: {
        width: SmartScreenBase.smPercenWidth*40,
        fontSize: SmartScreenBase.smFontSize*50,
        color: Colors.DarkGray,
        textAlign: 'center',
        textDecorationLine: 'underline'
      },
  container: {
    width: SmartScreenBase.smBaseWidth*28,
    height: SmartScreenBase.smBaseWidth*28,
    borderRadius: SmartScreenBase.smBaseWidth*48,
    backgroundColor: Colors.Red_BE1,
  },
  viewLoading: {
    width: SmartScreenBase.smPercenWidth * 50,
    height: SmartScreenBase.smPercenHeight * 1,
    backgroundColor: '#ffffff80',
    borderRadius: SmartScreenBase.smPercenWidth * 3,
},
progessLay: {
  width: SmartScreenBase.smPercenWidth * 50,
  height: SmartScreenBase.smPercenHeight*1 + 2,
  backgroundColor: '#ffffff80',
  borderRadius: SmartScreenBase.smPercenWidth * 3,
  borderWidth: 1,
  borderColor: Colors.Gray
},
downLay: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#ffffff80',
  borderRadius: SmartScreenBase.smPercenWidth * 3
},
percenText: {
  marginTop: SmartScreenBase.smPercenHeight*1,
  marginBottom: SmartScreenBase.smPercenHeight*1,
  width: SmartScreenBase.smPercenWidth*100,
  fontFamily: FontBase.MyriadPro_Bold,
  fontSize: SmartScreenBase.smFontSize*50,
  color: Colors.NearBlack,
  textAlign: 'center'
},
});

export default connect()(UpdateVersionModal);
