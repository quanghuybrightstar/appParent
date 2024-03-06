import React, {useState} from 'react';
import {Button, StyleSheet, Text, View , TouchableOpacity , ScrollView , TextInput , Image, CheckBox } from 'react-native';
import Modal from 'react-native-modal';
import SmartScreenBase from '../../../base/SmartScreenBase';
import LinearGradient from 'react-native-linear-gradient';
import {SmallCheckBox} from '../../../componentBase/SmallCheckBox';
import {RadioButtonBox} from '../../../componentBase/RadioButtonBox';
import FontBase from '../../../base/FontBase';
import { Colors } from '../../../styleApp/color';

//wordChoose : text select
//type = 1 : select first time, type = 2 : edit after


export const ModalFixWordErr = ({ isModalVisible , wordChoose, type , ...props}) => {

    const styles = StyleSheet.create({
        container: {
            justifyContent: "center",
            alignItems: "center",
        },
        content: {
            width: SmartScreenBase.smPercenWidth*86,
            height: SmartScreenBase.smPercenWidth*111.5,
            backgroundColor: "#F5FCFF",
            borderRadius: SmartScreenBase.smPercenWidth*4,


        },
        subContent1: {
            flex : 5,
            justifyContent: "center",
            flexDirection: 'column',
            paddingLeft : SmartScreenBase.smPercenWidth*6,
            paddingRight : SmartScreenBase.smPercenWidth*6,
            paddingTop : SmartScreenBase.smPercenWidth,


        },
        subContent2: {
            flex : 1,
            justifyContent: "space-between",
            flexDirection: 'row',
            paddingLeft : SmartScreenBase.smPercenWidth*5,
            paddingRight : SmartScreenBase.smPercenWidth*5,

        },
        submit:{
            width : SmartScreenBase.smPercenWidth*35,
            height : SmartScreenBase.smPercenWidth*11,
            // marginRight:SmartScreenBase.smPercenWidth*4,
            // marginLeft:SmartScreenBase.smPercenWidth,
            marginTop:SmartScreenBase.smPercenWidth,
            backgroundColor:'#00DAA4',
            borderRadius: SmartScreenBase.smPercenWidth*7.5,
            borderWidth: 1,
            borderColor: '#fff',
            justifyContent: "center",
        },
        submitDisable:{
            width : SmartScreenBase.smPercenWidth*55,
            height : SmartScreenBase.smPercenWidth*16,
            // marginRight:SmartScreenBase.smPercenWidth,
            // marginLeft:SmartScreenBase.smPercenWidth,
            marginTop:SmartScreenBase.smPercenWidth,
            backgroundColor:'#808080',
            borderRadius:SmartScreenBase.smPercenWidth*7.5,
            borderWidth: 1,
            borderColor: '#fff',
            justifyContent: "center",
        },
        submitText:{
            color:'#fff',
            textAlign:'center',
            fontSize : SmartScreenBase.smFontSize*45,
            fontFamily : FontBase.MyriadPro_Bold,
        },
        wordText:{
            color: Colors.BaseGreen,
            fontSize : SmartScreenBase.smFontSize*50,
            fontFamily : FontBase.MyriadPro_Bold,
        },
        titleText:{
            color:'#4e5453',
            fontSize : SmartScreenBase.smFontSize*45,
            fontFamily : FontBase.MyriadPro_Bold,
            marginTop: SmartScreenBase.smPercenWidth*2
        },
        deleteText:{
            color:'#4e5453',
            fontSize : SmartScreenBase.smFontSize*45,
            fontFamily : FontBase.MyriadPro_Bold,
        },
        radioText:{
            color:'#4e5453',
            fontSize : SmartScreenBase.smFontSize*45,
            fontFamily : FontBase.MyriadPro_Regular,
            width: SmartScreenBase.smPercenWidth*34
        },
        instructions: {
            textAlign: "center",
            color: "#333333",
            marginBottom: 5,
            color: "#0000FF"
        },
        input: {
            height: SmartScreenBase.smPercenWidth*10,
            width : '100%',
            paddingLeft : 20,
            marginTop : 15,
            borderRadius:5,
            borderColor: '#bbc7c7',
            borderWidth: 1,
            fontFamily: FontBase.MyriadPro_Regular,
            fontSize: SmartScreenBase.smFontSize*45,
        },
        checkbox: {
            alignSelf: "center",
        },
        checkboxContainer: {
            flexDirection: "row",
            marginBottom: 20,
        }
    });

    var radio_props = [
        {label: 'Thêm \n phía sau', value: 0 },
        {label: 'Thêm \n phía trước', value: 1 }

    ];

    const [word, setWord] = useState('');
    const [textChoose, setTextChoose] = useState('');
    const [textExplain, setTextExplain] = useState('');
    const [isSelect, setIsSelect] = useState(false);
    const [posFix, setPosFix] = useState(1);


    return (
            <Modal isVisible={isModalVisible}  onModalShow = {() => {
                 if(type == 1) {setWord(wordChoose) ,setPosFix(posFix) ; setIsSelect(false) ; setTextChoose('') ; setTextExplain('')}
                 else if(type == 2) {setWord(wordChoose[0].text) ; setPosFix(wordChoose[0].type) ; setIsSelect(wordChoose[0].isHide); 
                    setTextExplain(wordChoose[1].explain); setTextChoose(wordChoose[1].fixed.toString().trim()); console.log("======wordChoose",wordChoose)} }}>
                
                <View style={styles.container}>
                    <View style = {styles.content}>
                        <View style = {styles.subContent1}>
                            <ScrollView keyboardShouldPersistTaps="always" >

                            <Text style={styles.titleText}>Từ chọn : </Text>
                            <Text style={styles.wordText}>{word?word:''}</Text>
                            <View style={{flexDirection: "row", alignItems: "center", marginTop: SmartScreenBase.smPercenWidth*3, marginBottom: SmartScreenBase.smPercenWidth*3}}>
                                <Text style={styles.deleteText}>Xóa từ đã chọn</Text>
                                <View style={{marginLeft: SmartScreenBase.smPercenWidth*1.5}}>
                                    <SmallCheckBox onPress={() => setIsSelect(!isSelect)} isNotify={isSelect}/>
                                </View>
                            </View>
                            <Text style={styles.titleText}>Thêm : </Text>
                                <TextInput style = {styles.input}
                                           underlineColorAndroid = "transparent"
                                           placeholder = "Thêm từ của bạn"
                                           placeholderTextColor = "#8c9494"
                                           autoCapitalize = "none"
                                           value = {textChoose}
                                           onChangeText = {(value) => {setTextChoose(value)}}/>
                                <View style={{flexDirection: 'row', marginTop: SmartScreenBase.smPercenWidth*2, marginBottom: SmartScreenBase.smPercenWidth*2}}>
                                    <View style={{flexDirection: "row", alignItems: "center"}}>
                                        <RadioButtonBox
                                            onPress={() => setPosFix(1)}
                                            isNotify={posFix==1}/>
                                        <Text style={[styles.radioText,{marginLeft: SmartScreenBase.smPercenWidth}]}>{"Thêm\nphía trước"}</Text>
                                    </View>
                                    <View style={{flexDirection: "row", alignItems: "center"}}>
                                        <RadioButtonBox
                                            onPress={() => setPosFix(0)}
                                            isNotify={posFix==0}/>
                                        <Text style={[styles.radioText,{marginLeft: SmartScreenBase.smPercenWidth}]}>{"Thêm\nphía sau"}</Text>
                                    </View>
                                </View>
                                {/* <RadioForm
                                    buttonColor = "#7F7F7F"
                                    buttonOuterColor = "#DADADA"
                                    buttonInnerColor = "#DADADA"
                                    selectedButtonColor = "#7F7F7F"
                                    style ={{marginTop : 15 ,
                                        justifyContent: "space-around",
                                        alignItems: "center",}}
                                    wrapStyle ={{padding : 15}}
                                    buttonSize = {normalize(10)}
                                    radio_props={radio_props}
                                    initial={posFix}
                                    formHorizontal={true}
                                    onPress={(value) => { setPosFix(parseInt(value))}}
                                /> */}

                                <Text style={styles.titleText}>Giải thích : </Text>
                                <TextInput style = {styles.input}
                                           underlineColorAndroid = "transparent"
                                           placeholder = "Giải thích của bạn"
                                           placeholderTextColor = "#8c9494"
                                           autoCapitalize = "none"
                                           value = {textExplain}
                                           onChangeText = {(value) => {setTextExplain(value)}}/>


                            </ScrollView>


                        </View>

                        <View style = {styles.subContent2}>
                            <TouchableOpacity
                                onPress={() => {
                                              props.onPressLeftBt()
                                }}
                                underlayColor='#fff'>
                                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#00E0A0', '#00CEAA', '#00BEB3']}    style={styles.submit} >
                                <Text style={[styles.submitText]}>{type==1?"Đóng":"Hoàn tác"}</Text>
                                </LinearGradient>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => {
                                    if ( textChoose.toString().trim().length > 0 || isSelect )
                                         props.onPressComplete(textChoose , textExplain , isSelect , posFix) }}
                                underlayColor='#fff'>
                                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={textChoose.toString().trim().length > 0 || isSelect ?['#00E0A0', '#00CEAA', '#00BEB3'] : ['#808080','#808080','#808080']}    style={styles.submit} >
                                <Text style={[styles.submitText]}>{type==1?"Xong":"Cập nhật"}</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                        
                        <TouchableOpacity
                            style = {[{ position: 'absolute', top : SmartScreenBase.smPercenWidth*1, right : SmartScreenBase.smPercenWidth*3, width: SmartScreenBase.smPercenWidth*11, height: SmartScreenBase.smPercenWidth*11, alignItems: 'center', justifyContent: 'center'} ]}
                            onPress={() => {
                                props.onCloseModal()
                            }}
                            underlayColor='#fff'>
                            <Image source={{uri: "lesson_image3"}} style={{width: SmartScreenBase.smPercenWidth*5, height: SmartScreenBase.smPercenWidth*5, tintColor: '#898989'}}/>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>
    );
}

