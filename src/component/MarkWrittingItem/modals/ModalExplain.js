import React, {useState} from 'react';
import {Button, StyleSheet, Text, View , TouchableOpacity , ScrollView , TextInput , Image } from 'react-native';
import Modal from 'react-native-modal';
import SmartScreenBase from '../../../base/SmartScreenBase';
import LinearGradient from 'react-native-linear-gradient';
import {SmallCheckBox} from '../../../componentBase/SmallCheckBox';
import FontBase from '../../../base/FontBase';


export const ModalExplain = ({ isModalVisible , wordExplain , wordChoose , hideWord , wordOldData , ...props}) => {

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
            fontWeight : 'bold'},
        wordText:{
            color:'#1ecec9',
            fontSize : SmartScreenBase.smFontSize*50,
            fontFamily : FontBase.MyriadPro_Bold,
            fontWeight: 'bold'
        },
        titleText:{
            color:'#4e5453',
            fontSize : SmartScreenBase.smFontSize*45,
            fontFamily : FontBase.MyriadPro_Bold,
            fontWeight: 'bold',
            marginTop : 15
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
            borderWidth: 1
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
        {label: 'Thêm phía sau', value: 0 },
        {label: 'Thêm phía trước', value: 1 }

    ];

    const [word, setWord] = useState('');
    const [textChoose, setTextChoose] = useState('');
    const [textExplain, setTextExplain] = useState(wordExplain);
    const [isSelect, setIsSelect] = useState(hideWord);
    const [posFix, setPosFix] = useState(0);
    const [wordOld, setWordOld] = useState(wordOldData);


    return (
        <Modal isVisible={isModalVisible}  onModalShow = {() => {
            // console.log(wordOldData) ;
                    // setWordOld(wordOldData) ;
                    setWord(wordOldData[0].text) ;
                    setPosFix(wordOldData[0].type) ;
                    setIsSelect(wordOldData[0].isHide);
                    setTextExplain(wordOldData[1].explain);
                    setTextChoose(wordOldData[1].fixed.toString().trim());
        }}>
            <View style={styles.container}>
                <View style = {styles.content}>
                    <View style = {styles.subContent1}>
                        <ScrollView keyboardShouldPersistTaps='handled'>

                            <Text style={styles.titleText}>Từ chọn : </Text>
                            <Text style={styles.wordText}>{word}</Text>
                            <View style={{flexDirection: "row", alignItems: "flex-end"}}>
                                <Text style={styles.titleText}>Xóa từ đã chọn</Text>
                                <SmallCheckBox style={{marginLeft: SmartScreenBase.smPercenWidth*2}}
                                    onPress={() => setIsSelect(!isSelect)}
                                    isNotify={isSelect}/>
                            </View>
                            {/* <CheckBox
                                onClick={()=>{
                                    setIsSelect(!isSelect)
                                }}
                                isChecked={isSelect}
                                checkBoxColor = {"#000"}
                                leftText={'Xóa từ đã chọn :'}
                                leftTextStyle={styles.titleText}
                                checkedImage={<Image source={ic_check} style = {{width : normalize(25) , height : normalize(25)}}/>}
                            /> */}
                            <Text style={styles.titleText}>Thêm : </Text>
                            <TextInput style = {styles.input}
                                       underlineColorAndroid = "transparent"
                                       placeholder = "Thêm từ của bạn"
                                       placeholderTextColor = "#8c9494"
                                       autoCapitalize = "none"
                                       value = {textChoose}
                                       onChangeText = {(value) => {setTextChoose(value)}}/>

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
                                    props.onPressComplete(textChoose , textExplain , isSelect , posFix) }}
                            underlayColor='#fff'>
                            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#00E0A0', '#00CEAA', '#00BEB3']}    style={styles.submit} >
                            <Text style={[styles.submitText]}>Cập Nhật</Text>
                            </LinearGradient>

                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => { props.onPressUndo() }}
                            underlayColor='#fff'>
                            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#00E0A0', '#00CEAA', '#00BEB3']}    style={styles.submit} >
                            <Text style={[styles.submitText]}>Hoàn Tác</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                </View>

                <TouchableOpacity
                    style = {[{ position: 'absolute', top : SmartScreenBase.smPercenWidth*1, right : SmartScreenBase.smPercenWidth*3, width: SmartScreenBase.smPercenWidth*11, height: SmartScreenBase.smPercenWidth*11, alignItems: 'center', justifyContent: 'center'} ]}
                    onPress={() => {
                        props.onPressModal()
                    }}
                    underlayColor='#fff'>
                    <Image source={{uri: "lesson_image3"}} style={{width: SmartScreenBase.smPercenWidth*5, height: SmartScreenBase.smPercenWidth*5, tintColor: '#898989'}}/>
                </TouchableOpacity>

            </View>
        </Modal>
    );
}

