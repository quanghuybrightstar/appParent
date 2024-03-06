import React, {useState} from 'react';
import {Button, StyleSheet, Text, View , TouchableOpacity , ScrollView , TextInput , Image } from 'react-native';
import Modal from 'react-native-modal';
import SmartScreenBase from '../../../base/SmartScreenBase';
import LinearGradient from 'react-native-linear-gradient';
import {SmallCheckBox} from '../../../componentBase/SmallCheckBox';
import {RadioButtonBox} from '../../../componentBase/RadioButtonBox';
import FontBase from '../../../base/FontBase';
import { Colors } from '../../../styleApp/color';
import { ShortMainButton } from '../../../componentBase/ShortMainButton';
import HTML from "react-native-render-html";

export const ModalTutorial = ({ isModalVisible , type , ...props}) => {

    const styles = StyleSheet.create({
        container: {
            justifyContent: "center",
            alignItems: "center",
            padding: 10
        },
        content: {
            width: SmartScreenBase.smPercenWidth*80,
            height: type == 'full' ? SmartScreenBase.smPercenWidth*92 : SmartScreenBase.smPercenWidth*68,
            backgroundColor: "#FFFFFF",
            borderRadius:20,
        },
        subContent1: {
            flex : 5,
            justifyContent: "center",
            flexDirection: 'column',
            paddingLeft : SmartScreenBase.smPercenWidth*5,
            paddingRight : SmartScreenBase.smPercenWidth*5,
            paddingTop : SmartScreenBase.smPercenWidth*3,
        },
        subContent2: {
            justifyContent: "center",
            flexDirection: 'row',
            paddingLeft : SmartScreenBase.smPercenWidth*15,
            paddingRight : SmartScreenBase.smPercenWidth*15,
        },
        submit:{
            width : SmartScreenBase.smPercenWidth*40,
            height : SmartScreenBase.smPercenWidth*11,
            marginRight:40,
            marginLeft:40,
            backgroundColor:'#00DAA4',
            borderRadius: SmartScreenBase.smPercenWidth*6,
            borderWidth: 1,
            borderColor: '#fff',
            justifyContent: "center",
        },
        submitDisable:{
            width : SmartScreenBase.smPercenWidth*40,
            height : SmartScreenBase.smPercenWidth*11,
            marginRight:40,
            marginLeft:40,
            backgroundColor:'#808080',
            borderRadius:10,
            borderWidth: 1,
            borderColor: '#fff',
            justifyContent: "center",
        },
        submitText:{
            color:'#fff',
            fontSize : SmartScreenBase.smFontSize*45,
            fontFamily : FontBase.MyriadPro_Bold,
            textAlign:'center',
            fontWeight : 'bold'
        }
        ,
        wordText:{
            marginTop : SmartScreenBase.smPercenWidth*2,
            color: Colors.NearBlack,
            fontSize : SmartScreenBase.smFontSize*50,
            fontFamily : FontBase.MyriadPro_Regular,
            marginBottom : SmartScreenBase.smPercenWidth*3, 
            paddingLeft : 10, 
            paddingRight : 10
        },

        boldText:{
            fontFamily : FontBase.MyriadPro_Bold
        }
        ,
        titleText:{
            color:'#4e5453',
            fontSize : SmartScreenBase.smFontSize*55,
            fontFamily: FontBase.MyriadPro_Bold,
            textAlign : 'center',
            marginTop : SmartScreenBase.smPercenWidth*2.5
        }
        ,
        instructions: {
            textAlign: "center",
            color: "#333333",
            marginBottom: 5,
            color: "#0000FF"
        },
        input: {
            height: 40,
            paddingLeft : 20,
            marginTop : 15,
            borderRadius:5,
            borderColor: '#bbc7c7',
            borderWidth: 1
        },
        checkbox: {
            alignSelf: "center",
        },
        checkboxContainer: {
            flexDirection: "row",
            marginBottom: 20,
        },
        tinyLogo: {
            width: SmartScreenBase.smPercenWidth*71.5,
            height: SmartScreenBase.smPercenWidth*71.5,
        },
    });

    var htmlBody = type == 'full' ? `<p style="text-align:justify">Nhấn giữ, bôi đen và chọn sửa từ hoặc cụm từ cần sửa. Xuất hiện popup cho phép <b>Xóa</b>, <b>Sửa</b> và thêm <b>Giải thích</b>.</p><p></p><p style="text-align:justify">Đối với những từ hoặc cụm từ đã sửa, nhấn vào từ hoặc cụm từ để xem lại các thông tin được lưu từ lần sửa cuối cùng. Chọn <b>"Hoàn tác"</b> để hủy lỗi hoặc chọn <b>"Cập nhật"</b> để lưu các nội dung đã thay đổi.</p>`
                                  : `<p style="text-align:justify">Đối với những từ hoặc cụm từ đã sửa, nhấn vào từ hoặc cụm từ để xem lại các thông tin được lưu từ lần sửa cuối cùng. Chọn <b>"Hoàn tác"</b> để hủy lỗi hoặc chọn <b>"Cập nhật"</b> để lưu các nội dung đã thay đổi.</p>`;
    return (
            <Modal  style={{
                flex: 1,
            }}
                    isVisible={isModalVisible}
                    backdropOpacity={0.40}
                    onBackdropPress={() => { props.onPressModal() } }>
                <View style={styles.container}>
                    <View style = {styles.content}>
                        <View style = {styles.subContent1}>
                            <Text style={[styles.titleText , {marginBottom : SmartScreenBase.smPercenWidth*3}]}>Hướng dẫn</Text>
                            <ScrollView vertical keyboardShouldPersistTaps="always">

                                <HTML source={{ html: htmlBody }} contentWidth={SmartScreenBase.smPercenWidth*50} 
                                    tagsStyles={{
                                        p: {fontSize: SmartScreenBase.smFontSize*50, fontFamily: FontBase.MyriadPro_Regular, color: Colors.NearBlack},
                                        b: {fontSize: SmartScreenBase.smFontSize*50, fontFamily: FontBase.MyriadPro_Bold, color: Colors.NearBlack}}}/>
                               {/* <Text style={styles.wordText}>
                                   Ấn giữ và bôi đen từ hoặc cụm từ cần sửa{"\n"}{"\n"}
                                   Sau đó sẽ xuất hiện pop up với công cụ <Text style={styles.boldText}>"Sửa"</Text>. Giáo viên chọn xóa, sửa và giải thích theo nhu cầu.{"\n"}{"\n"}
                                   Đối với những từ và cụm từ đã sửa, giáo viên chỉ cần nhấn vào từ thì hiện lên pop up với các thông tin được lưu từ lần cuối giáo viên sửa. Giáo viên có thể <Text style={styles.boldText}>"Hoàn tác"</Text> hoặc <Text style={styles.boldText}>"Cập nhật"</Text> thêm nội dung cần sửa
                               </Text> */}
                            </ScrollView>


                        </View>

                        <View style = {[styles.subContent2 , {marginBottom : 10}]}>
                            <ShortMainButton type={1} text={'Đóng'} widthType={'mini'}
                                onPress={()=>{props.onPressModal()}}/>
                        </View>

                    </View>
                </View>
            </Modal>
    );
}

