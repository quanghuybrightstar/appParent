// import React, {useState} from 'react';
// import {Button, StyleSheet, Text, View , TouchableWithoutFeedback , ScrollView , TextInput , TouchableOpacity } from 'react-native';
// import Modal from 'react-native-modal';
// import {scaleScreen, verticalScale, moderateScale , normalize} from '../../base/SmartScreenBase'

// export const ModalLoading = ({ isModalVisible , wordExplain , ...props}) => {

//     const styles = StyleSheet.create({
//         container: {
//             justifyContent: "center",
//             alignItems: "center",
//             padding: 10
//         },
//         content: {
//             width: scaleScreen(350),
//             height: scaleScreen(280),
//             backgroundColor: "#FFFFFF00",
//             borderRadius:20,

//         },
//         subContent1: {
//             flex : 5,
//             justifyContent: "center",
//             flexDirection: 'column',
//             paddingLeft : normalize(10),
//             paddingRight : normalize(10),
//             paddingTop : normalize(10),


//         },
//         subContent2: {
//             justifyContent: "center",
//             flexDirection: 'row',
//             paddingLeft : normalize(50),
//             paddingRight : normalize(50),

//         },
//         submit:{
//             width : normalize(120),
//             height : normalize(35),
//             marginRight:40,
//             marginLeft:40,
//             backgroundColor:'#00DAA4',
//             borderRadius:10,
//             borderWidth: 1,
//             borderColor: '#fff',
//             justifyContent: "center",
//         },
//         submitDisable:{
//             width : normalize(120),
//             height : normalize(35),
//             marginRight:40,
//             marginLeft:40,
//             backgroundColor:'#808080',
//             borderRadius:10,
//             borderWidth: 1,
//             borderColor: '#fff',
//             justifyContent: "center",
//         },
//         submitText:{
//             color:'#fff',
//             textAlign:'center',
//      fontWeight : 'bold'   }
//         ,
//         wordText:{
//             color:'#1ecec9',
//             fontSize : normalize(15),
//             fontWeight: 'bold'
//         }
//         ,
//         titleText:{
//             color:'#4e5453',
//             fontSize : normalize(15),
//             textAlign : 'center',
//             fontWeight: 'bold',
//             marginTop : 15
//         }
//         ,
//         instructions: {
//             textAlign: "center",
//             color: "#333333",
//             marginBottom: 5,
//             color: "#0000FF"
//         },
//         input: {
//             height: 40,
//             paddingLeft : 20,
//             marginTop : 15,
//             borderRadius:5,
//             borderColor: '#bbc7c7',
//             borderWidth: 1
//         },
//         checkbox: {
//             alignSelf: "center",
//         },
//         checkboxContainer: {
//             flexDirection: "row",
//             marginBottom: 20,
//         }
//     });


//     return (
//         <Modal  style={{
//             flex: 1,
//         }}
//                 isVisible={isModalVisible}
//                 backdropOpacity={0.40}>

//             <View style={styles.container}>
//             </View>
//         </Modal>
//     );
// }

