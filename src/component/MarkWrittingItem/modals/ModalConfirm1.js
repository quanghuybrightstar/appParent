import React, {useState} from 'react';
import {Button, StyleSheet, Text, View , TouchableWithoutFeedback , ScrollView , TextInput , TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import {scaleScreen, verticalScale, moderateScale , normalize} from '../../base/SmartScreenBase'
import SmartScreenBase from '../../../base/SmartScreenBase';
import LinearGradient from 'react-native-linear-gradient';
import FontBase from '../../../base/FontBase';
import { Colors } from '../../../styleApp/color';
import { ShortMainButton } from '../../../componentBase/ShortMainButton';

export const ModalCofirm1 = ({ isModalVisible , wordExplain , child, ...props}) => {

    const styles = StyleSheet.create({
        container: {
            justifyContent: "center",
            alignItems: "center",
            padding: SmartScreenBase.smPercenWidth*3
        },
        content: {
            width: SmartScreenBase.smPercenWidth*80,
            height: SmartScreenBase.smPercenWidth*58,
            backgroundColor: "#FFFFFF",
            borderRadius: SmartScreenBase.smPercenWidth*4,

        },
        subContent1: {
            height: SmartScreenBase.smPercenWidth*40,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: 'column',
            paddingLeft : SmartScreenBase.smPercenWidth*3,
            paddingRight : SmartScreenBase.smPercenWidth*3,


        },
        subContent2: {
            height: SmartScreenBase.smPercenWidth*18,
            justifyContent: "space-between",
            flexDirection: 'row',
            paddingLeft : SmartScreenBase.smPercenWidth*3,
            paddingRight : SmartScreenBase.smPercenWidth*3,

        },
        submit:{
            width : SmartScreenBase.smPercenWidth*30,
            height : SmartScreenBase.smPercenWidth*10,
            marginRight: SmartScreenBase.smPercenWidth*5,
            marginLeft: SmartScreenBase.smPercenWidth*5,
            backgroundColor:'#00DAA4',
            borderRadius: SmartScreenBase.smPercenWidth*7,
            borderWidth: 1,
            borderColor: '#fff',
            justifyContent: "center",
        },
        submit1:{
            width : SmartScreenBase.smPercenWidth*30,
            height : SmartScreenBase.smPercenWidth*10,
            marginRight: SmartScreenBase.smPercenWidth*5,
            marginLeft: SmartScreenBase.smPercenWidth*5,
            backgroundColor:'#FFF',
            borderRadius: SmartScreenBase.smPercenWidth*7,
            borderWidth: 1,
            borderColor: '#00DAA4',
            justifyContent: "center",
        },
        submitDisable:{
            width : SmartScreenBase.smPercenWidth*40,
            height : SmartScreenBase.smPercenWidth*10,
            marginRight: SmartScreenBase.smPercenWidth*10,
            marginLeft: SmartScreenBase.smPercenWidth*10,
            backgroundColor:'#808080',
            borderRadius: SmartScreenBase.smPercenWidth*7,
            borderWidth: 1,
            borderColor: '#fff',
            justifyContent: "center",
        },
        submitText:{
            color: Colors.White,
            textAlign:'center',
            fontSize: SmartScreenBase.smFontSize*45,
            fontFamily: FontBase.MyriadPro_Bold  
        },
        submitText1:{
            color: Colors.BaseGreen,
            textAlign:'center',
            fontSize: SmartScreenBase.smFontSize*45,
            fontFamily: FontBase.MyriadPro_Bold  
        }
        ,
        wordText:{
            color:'#1ecec9',
            fontSize : SmartScreenBase.smPercenWidth*5,
            fontWeight: 'bold'
        }
        ,
        contentText:{
            color:'#4e5453',
            fontSize : SmartScreenBase.fontSize*45,
            fontStyle : 'italic',
            textAlign : 'center',
            fontWeight: '300',
            marginTop : SmartScreenBase.smPercenWidth*5
        }
        ,
        instructions: {
            textAlign: "center",
            color: "#333333",
            marginBottom: SmartScreenBase.smPercenWidth*1.5,
            color: "#0000FF"
        },
        input: {
            height: SmartScreenBase.smPercenWidth*13,
            paddingLeft : SmartScreenBase.smPercenWidth*6,
            marginTop : SmartScreenBase.smPercenWidth*5,
            borderRadius: SmartScreenBase.smPercenWidth*4,
            borderColor: '#bbc7c7',
            borderWidth: 1
        },
        checkbox: {
            alignSelf: "center",
        },
        checkboxContainer: {
            flexDirection: "row",
            marginBottom: SmartScreenBase.smPercenWidth*6,
        }
    });

    return (
        <Modal  style={{
            flex: 1,
        }}
                isVisible={isModalVisible}
                backdropOpacity={0.40}
                onModalShow = {() => {}} >

            <View style={styles.container}>
                <View style = {styles.content}>
                    <View style = {styles.subContent1}>
                        {child}
                    </View>
                    <View style = {styles.subContent2}>

                        <ShortMainButton text={"Không"} widthType={'mini'}
                            onPress={()=>{props.onPressNoModal()}}/>
                        <ShortMainButton text={"Có"} widthType={'mini'} type={1}
                            onPress={()=>{props.onPressYesModal()}}/>
                        {/* <TouchableOpacity
                            style={ styles.submit1}
                            onPress={() => { props.onPressNoModal()}}
                            underlayColor='#fff'>
                            <Text style={[styles.submitText1]}>Không</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => { props.onPressYesModal()}}
                            underlayColor='#fff'>
                            <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#00E0A0', '#00CEAA', '#00BEB3']}    style={styles.submit} >
                            <Text style={[styles.submitText]}>Có</Text>
                            </LinearGradient>
                        </TouchableOpacity> */}
                    </View>

                </View>
            </View>
        </Modal>
    );
}

