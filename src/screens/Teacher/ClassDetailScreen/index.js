// xóa file này
// import React, {PureComponent} from 'react';
// import {
//     View,
//     Text,
//     ScrollView,
//     TextInput,
//     TouchableOpacity,
//     Dimensions,
//     ImageBackground,
//     Image, Alert,
//     Modal,
// } from 'react-native';

// const {width, height} = Dimensions.get('window');
// import API from '../../../API/APIConstant';

// import Header from '../../../component/Header/Header';
// import SmartScreenBase from '../../../base/SmartScreenBase';
// import axios from 'axios';

// export default class ClassDetailScreen extends PureComponent {
//     state = {
//         StudentName: '',
//         ParentEmail: '',
//         visible: false,
//         Data: '',
//         startTime: '',
//         endTime: '',
//         Name:'Tiếng anh 12',
//         changeDate:false
//     };

//     async componentDidMount(): void {
//         await this._getClass();
//     }

//     _getClass = async () => {
//         const url = API.baseurl + API.getClass;
//         const header = {
//             'Content-Type': 'application/json',
//             'jwt_token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImFkbWluIiwidGltZV9sb2dpbiI6MTU3ODkwNzQyM30.CFZyO9a-qBmyI8Q25AqGNd1nxWn1SO5TMC_yBxjgWCA',
//             'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
//             'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
//         };
//         await axios({method: 'get', url: url, headers: header})
//             .then((response) => {
//                 console.log(response.data.data);
//                 this.setState({
//                     Data: response.data.data,
//                     startTime: response.data.data.start_time.slice(0, 10),
//                     endTime: response.data.data.end_time.slice(0, 10),
//                 });
//             })
//             .catch((error) => {
//                 console.log(error.message);
//                 if (error.message === 'Network Error') {
//                     Alert.alert('Thông Báo', 'Vui lòng kiểm tra kết nối Internet', [
//                         {text: 'ĐỒng ý', style: 'cancel'}
//                     ]);
//                 }
//                 this.setState({isLoading: false});
//             });
//     };
//     _onChangeDate = () =>{
//         this.setState({
//             changeDate: true,
//         });
//         this.TextInputChangeDate.focus();
//     }
//     render() {
//         return (
//             <ImageBackground source={{uri: 'imagebackground'}} style={{
//                 flex: 1,
//                 resizeMode: 'stretch',
//             }}>
//                 <Header navigation={this.props.navigation} title={'Thông tin lớp học'}/>
//                 <View style={{
//                     flex: 12,
//                     paddingVertical: SmartScreenBase.smPercenWidth * 5,
//                     paddingHorizontal:SmartScreenBase.smPercenWidth * 7,
//                     justifyContent: 'center',
//                     alignItems: 'center',

//                 }}>
//                     <View style={{
//                         position: 'absolute',
//                         top: SmartScreenBase.smPercenWidth * 34,
//                         backgroundColor: '#fff',
//                         width: width - SmartScreenBase.smPercenWidth * 8,
//                         zIndex: 10,
//                         borderRadius: 15,
//                         alignItems: 'center',
//                         justifyContent: 'center',
//                         shadowColor: '#000',
//                         shadowOffset: {
//                             width: 0,
//                             height: 6,
//                         },
//                         shadowOpacity: 0.39,
//                         shadowRadius: 8.30,

//                         elevation: 13,
//                     }}>
//                         <Text style={{
//                             color: 'red',
//                             fontWeight: 'bold',
//                             fontSize: SmartScreenBase.smPercenWidth * 5,
//                             paddingVertical: 3,
//                         }}>{this.state.Data.class_name}</Text>
//                     </View>
//                     <View style={{
//                         width: '100%',
//                         height: '100%',
//                         zIndex: 1,
//                         backgroundColor: '#fff',
//                         borderRadius: 10,
//                     }}>

//                         <ImageBackground style={{
//                             width: '100%',
//                             height: SmartScreenBase.smPercenWidth * 28,
//                         }}
//                                          resizeMode={'stretch'}
//                                          source={{uri: 'newclass'}}/>

//                         <View style={{
//                             flex: 1,
//                             paddingTop: 40,
//                             paddingHorizontal: SmartScreenBase.smPercenWidth * 8,
//                         }}>
//                             <View style={{
//                                 flex: 2,
//                             }}>
//                                 <Text style={{
//                                     color: '#000',
//                                     fontWeight: 'bold',
//                                     fontSize: SmartScreenBase.smPercenWidth * 4,
//                                     paddingTop: SmartScreenBase.smPercenWidth * 2,
//                                 }}>Thông tin lớp</Text>
//                                 <View style={{
//                                     flexDirection: 'row',
//                                     width: '100%',
//                                     alignItems: 'center',
//                                     flex: 1,
//                                 }}>
//                                     <Image style={{
//                                         width: '12%',
//                                         height: '90%',
//                                     }}
//                                            resizeMode={'contain'}
//                                            source={{uri: 'gv_44'}}/>
//                                     <Text style={{
//                                         color: '#000',
//                                         fontWeight: '400',
//                                         fontSize: SmartScreenBase.smPercenWidth * 4,
//                                         marginLeft: 20,
//                                     }}>{this.state.Data.organization_name}</Text>
//                                 </View>
//                                 <View style={{
//                                     flexDirection: 'row',
//                                     width: '100%',
//                                     alignItems: 'center',
//                                     flex: 1,
//                                 }}>
//                                     <Image style={{
//                                         width: '12%',
//                                         height: '90%',
//                                     }}
//                                            resizeMode={'contain'}
//                                            source={{uri: 'gv_45'}}/>
//                                     <Text style={{
//                                         color: '#000',
//                                         fontWeight: '400',
//                                         fontSize: SmartScreenBase.smPercenWidth * 4,
//                                         marginLeft: 20,
//                                     }}>{this.state.startTime} - {this.state.endTime}</Text>
//                                 </View>
//                                 <View style={{
//                                     flexDirection: 'row',
//                                     width: '100%',
//                                     alignItems: 'center',
//                                     flex: 1,
//                                 }}>
//                                     <Image style={{
//                                         width: '12%',
//                                         height: '90%',
//                                     }}
//                                            resizeMode={'contain'}
//                                            source={{uri: 'gv_46'}}/>
//                                     <Text style={{
//                                         color: '#000',
//                                         fontWeight: '400',
//                                         fontSize: SmartScreenBase.smPercenWidth * 4,
//                                         marginLeft: 20,
//                                     }}>{this.state.Data.count_student}</Text>
//                                 </View>
//                             </View>
//                             <View style={{
//                                 flex: 2,
//                             }}>
//                                 <View style={{
//                                     flex: 0.8,
//                                     borderBottomColor: '#b1c2db',
//                                     borderBottomWidth: 1,
//                                     borderTopWidth: 1,
//                                     borderTopColor: '#b1c2db',
//                                 }}/>
//                                 <Text style={{
//                                     color: '#000',
//                                     fontWeight: 'bold',
//                                     fontSize: SmartScreenBase.smPercenWidth * 5,
//                                     paddingTop: SmartScreenBase.smPercenWidth * 2,
//                                 }}>Học tập</Text>
//                                 <View style={{
//                                     flex: 2,
//                                 }}>
//                                     <View style={{
//                                         flexDirection: 'row',
//                                         width: '100%',
//                                         alignItems: 'center',
//                                         flex: 1,

//                                     }}>
//                                         <Image style={{
//                                             width: '12%',
//                                             height: '100%',
//                                         }}
//                                                resizeMode={'contain'}
//                                                source={{uri: 'gv_47'}}/>
//                                         <Text style={{
//                                             color: '#000',
//                                             fontWeight: '400',
//                                             fontSize: SmartScreenBase.smPercenWidth * 4,
//                                             marginLeft: 20,
//                                         }}>15 Học sinh quá hạn làm bài tập</Text>
//                                     </View>
//                                     <View style={{
//                                         flexDirection: 'row',
//                                         width: '100%',
//                                         alignItems: 'center',
//                                         flex: 1,
//                                         borderBottomColor: '#b1c2db',
//                                         borderBottomWidth: 1,
//                                     }}>
//                                         <Image style={{
//                                             width: '12%',
//                                             height: '90%',
//                                         }}
//                                                resizeMode={'contain'}
//                                                source={{uri: 'gv_48'}}/>
//                                         <Text style={{
//                                             color: '#000',
//                                             fontWeight: '400',
//                                             fontSize: SmartScreenBase.smPercenWidth * 4,
//                                             marginLeft: 20,
//                                         }}>50 Bài tập chưa chấm</Text>
//                                     </View>
//                                 </View>
//                             </View>
//                             <View style={{
//                                 flex: 1,
//                             }}>
//                                 <Text style={{
//                                     color: '#000',
//                                     fontWeight: 'bold',
//                                     fontSize: SmartScreenBase.smPercenWidth * 5,
//                                     paddingTop: SmartScreenBase.smPercenWidth * 2,
//                                 }}>Khóa học</Text>
//                                 <View style={{
//                                     flexDirection: 'row',
//                                     width: '100%',
//                                     alignItems: 'center',
//                                     flex: 1,
//                                 }}>
//                                     <Image style={{
//                                         width: '10%',
//                                         height: '100%',
//                                     }}
//                                            resizeMode={'contain'}
//                                            source={{uri: 'gv_49'}}/>
//                                     <TextInput
//                                         multiline={true}
//                                         value={this.state.Name}
//                                         style={{
//                                             color: 'black',
//                                             fontWeight: '400',
//                                             fontSize: SmartScreenBase.smPercenWidth * 3.5,
//                                             textAlignVertical: 'top',
//                                         }}
//                                         editable={this.state.changeDate}
//                                         ref={refs => this.TextInputChangeDate = refs}
//                                         onChangeText={(Name)=>{this.setState({Name})}}
//                                         onEndEditing={() => {
//                                             this.setState({changeDate: false});
//                                         }}
//                                     />
//                                     <TouchableOpacity
//                                         style={{
//                                             position: 'absolute',
//                                             backgroundColor: '#00283A',
//                                             right: 0,
//                                             alignItems: 'center',
//                                             justifyContent: 'center',
//                                             borderRadius: 5,
//                                             height:30
//                                         }}
//                                         onPress={()=>{this._onChangeDate()}}
//                                     >
//                                         <Text style={{
//                                             color: '#fff',
//                                             fontWeight: '800',
//                                             fontSize: SmartScreenBase.smPercenWidth * 4,
//                                             paddingHorizontal: 20,
//                                         }}>Sửa</Text>
//                                     </TouchableOpacity>
//                                 </View>
//                             </View>
//                         </View>
//                     </View>

//                 </View>
//             </ImageBackground>
//         );
//     }
// }

