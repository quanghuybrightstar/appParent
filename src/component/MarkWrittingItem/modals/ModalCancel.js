import React, {useState} from 'react';
import {Button, StyleSheet, Text, View , TouchableWithoutFeedback , ScrollView , TextInput , TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import {scaleScreen, verticalScale, moderateScale , normalize} from '../../base/SmartScreenBase'
import LinearGradient from 'react-native-linear-gradient';

export const ModalCancel = ({ isModalVisible , wordExplain , ...props}) => {

    const styles = StyleSheet.create({
        container: {
            justifyContent: "center",
            alignItems: "center",
            padding: 10
        },
        content: {
            width: scaleScreen(280),
            height: scaleScreen(170),
            backgroundColor: "#FFFFFF",
            borderRadius:20,

        },
        subContent1: {
            flex : 3,
            justifyContent: "center",
            alignItems: "center",
            flexDirection: 'column',
            paddingLeft : normalize(10),
            paddingRight : normalize(10),


        },
        subContent2: {
            flex : 1,
            justifyContent: "center",
            flexDirection: 'row',
            paddingLeft : normalize(10),
            paddingRight : normalize(10),

        },
        submit:{
            width : normalize(100),
            height : normalize(35),
            marginRight:20,
            marginLeft:20,
            backgroundColor:'#00DAA4',
            borderRadius:normalize(20),
            borderWidth: 1,
            borderColor: '#fff',
            justifyContent: "center",
        },
        submit1:{
            width : normalize(100),
            height : normalize(35),
            marginRight:20,
            marginLeft:20,
            backgroundColor:'#FFF',
            borderRadius:normalize(20),
            borderWidth: 1,
            borderColor: '#00DAA4',
            justifyContent: "center",
        },
        submitDisable:{
            width : normalize(120),
            height : normalize(35),
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
            textAlign:'center',
     fontWeight : 'bold'   },
        submitText1:{
            color:'#1ecec9',
            textAlign:'center',
        }
        ,
        wordText:{
            color:'#1ecec9',
            fontSize : normalize(15),
            fontWeight: 'bold'
        }
        ,
        titleText:{
            color:'#4e5453',
            fontSize : normalize(14),
            textAlign : 'center',
            fontWeight: '400',
            marginTop : 15
        },
        contentText:{
            color:'#4e5453',
            fontSize : normalize(12),
            fontStyle : 'italic',
            textAlign : 'center',
            fontWeight: '300',
            marginTop : 15
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
        }
    });

    const [textChoose, setTextChoose] = useState('');
    const [textChoose1, setTextChoose1] = useState('');


    return (
        <Modal  style={{
            flex: 1,
        }}
                isVisible={isModalVisible}
                backdropOpacity={0.40}
                onModalShow = {() => { setTextChoose(props.value) , setTextChoose1(props.valueContent)}} >

            <View style={styles.container}>
                <View style = {styles.content}>
                    <View style = {styles.subContent1}>

                            <Text style={styles.titleText}>Bạn có muốn hủy chức năng
                                <Text style={{fontWeight : 'bold'}}> Chấm AI </Text>
                                không?</Text>

                    </View>
                    <View style = {styles.subContent2}>

                        <TouchableOpacity
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
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
        </Modal>
    );
}

