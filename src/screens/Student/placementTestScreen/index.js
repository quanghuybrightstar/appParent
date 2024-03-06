import React, {useState, useEffect, useRef} from 'react';
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Dimensions, Image,
} from 'react-native';
import SmartScreenBase from '../../../base/SmartScreenBase';
import stylesApp from '../../../component/learn/Lesson/Writting/Style/styleD7/stylesApp';
import style from '../placementTestScreen/style';
import styleButton from '../../../styleApp/stylesApp';
const {height, width} = Dimensions.get('window');

const placementTestScreen = (props) => {
  return (
    <ImageBackground source={{uri: 'map_07'}} style={{flex: 1}}>
      <View style={{flex: 1}}>
        <View style={{
            alignItems: "center",
            justifyContent: "center",
            width:width,
            height: height/3}}>
          <Text style={style.fontFamilyText}>
              BÀI KIỂM TRA ĐẦU VÀO
          </Text>
            <View style={style.styleTime}>
                    <View
                        style={style.stylebutton}>
                        <Text style={stylesApp.Sty_Text_Button}>15:00</Text>
                    </View>
                    <View
                        style={style.stylebutton}>
                        <Text style={stylesApp.Sty_Text_Button}>40 câu</Text>
                    </View>
            </View>
        </View>
          <View style={style.styleBody}>
                <Text style={{fontWeight: "bold"}}>
                    Hướng dẫn làm bài:
                </Text>
                <View style={style.styleView}>
                    <TouchableOpacity>
                        <Image
                            style={{width: SmartScreenBase.smPercenWidth * 3, height: SmartScreenBase.smPercenWidth * 4, tintColor:'#6F6F6F'}}
                            source={{uri: 'imageback'}}
                            resizeMode={'stretch'}
                        />
                    </TouchableOpacity>
                    <Text style={{marginLeft:SmartScreenBase.smPercenWidth * 3}}>
                        Chuyển qua bài tiếp theo
                    </Text>
                </View>
              <View style={style.styleView}>
                  <TouchableOpacity>
                      <Image
                          style={{width: SmartScreenBase.smPercenWidth * 3, height: SmartScreenBase.smPercenWidth * 4, tintColor:'#6F6F6F'}}
                          source={{uri: 'imageback'}}
                          resizeMode={'stretch'}
                      />
                  </TouchableOpacity>
                  <Text style={{marginLeft:SmartScreenBase.smPercenWidth * 3}}>
                      Quay lại câu trước
                  </Text>
              </View>
              <View style={{
                  marginTop:SmartScreenBase.smPercenHeight *3,
                  alignItems: 'center',
                  flexDirection: "row",
                  width:'90%',}}>
                  <View
                      style={[style.stylebutton,{width: SmartScreenBase.smPercenWidth * 15,marginLeft: SmartScreenBase.smPercenWidth * 8,}]}>
                      <Text style={stylesApp.Sty_Text_Button}>15:00</Text>
                  </View>
                  <Text style={{marginLeft: SmartScreenBase.smPercenWidth * 4,}}>
                      Thời gian làm bài
                  </Text>
              </View>
              <View>
                  <Text style={{fontWeight: "bold",marginTop:SmartScreenBase.smPercenWidth * 2}}>
                      Lưu ý:
                  </Text>
                  <Text style={{marginLeft: SmartScreenBase.smPercenWidth * 4, marginTop:SmartScreenBase.smPercenWidth * 2}}>
                      - Những câu chưa chọn sẽ được tính là câu trả lời sai
                  </Text>
                  <Text style={{marginTop:SmartScreenBase.smPercenWidth * 2,marginLeft: SmartScreenBase.smPercenWidth * 4}}>
                     - Nếu bạn thoát ra trong lúc làm bài thi kết quả sẽ không được tính
                  </Text>
              </View>
          </View>
          <View style={style.styleTime}>
              <TouchableOpacity
                  style={styleButton.Sty_ShortButton}>
                  <Text style={styleButton.Sty_Text_Button}>Đóng</Text>
              </TouchableOpacity>
              <TouchableOpacity
                  style={styleButton.Sty_ShortButton}>
                  <Text style={styleButton.Sty_Text_Button}>Vào thi </Text>
              </TouchableOpacity>
          </View>
      </View>
    </ImageBackground>
  );
};
export default placementTestScreen;
