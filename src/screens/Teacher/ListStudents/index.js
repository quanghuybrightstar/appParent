// Xóa file này
// import React, {Component} from 'react';
// import SmartScreenBase from '../../../base/SmartScreenBase';
// import {
//     Text,
//     View,
//     FlatList,
//     Dimensions,
//     Button,
//     StyleSheet,
//     TouchableOpacity,
//     Image, Modal, ImageBackground, Alert
// } from 'react-native';
// import LoadingScreen from '../../../component/Loading';

// SmartScreenBase.baseSetup();
// import API from '../../../API/APIConstant';
// import axios from 'axios';

// export default class index extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             Data: [],
//             isChoiceAll: false,
//             isAccept: false,
//             visible: false,
//             isLoading:true

//         };
//     }

//     async componentDidMount(): void {
//         await this.props.navigation.addListener('willFocus', payload => {
//             this._getLitStudents();
//         });
//     }

//     _getLitStudents = async () => {
//         const url = API.baseurl + API.getListStudents;
//         const header = {
//             'Content-Type': 'application/json',
//             'jwt_token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImFkbWluIiwidGltZV9sb2dpbiI6MTU3ODkwNzQyM30.CFZyO9a-qBmyI8Q25AqGNd1nxWn1SO5TMC_yBxjgWCA',
//             'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
//             'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
//         };
//         await axios({method: 'get', url: url, headers: header})
//             .then((response) => {
//                 this.setState({Data: response.data.data});
//             })
//             .catch((error) => {
//                 console.log(error.message);
//                 if (error.message === 'Network Error') {
//                     Alert.alert('Thông Báo', 'Vui lòng kiểm tra kết nối Internet', [
//                         {text: 'Đồng ý', style: 'cancel'}
//                     ]);
//                 }
//                 this.setState({isLoading: false});
//             }).finally((f)=>{
//                 this.setState({isLoading:false})
//             });
//     };
//     _renderItem = ({item, index}) => {
//         return (
//             <View style={{
//                 width: '100%',
//                 height: SmartScreenBase.smPercenWidth * 20,
//                 backgroundColor: 'white',
//                 flexDirection: 'row',
//             }}>
//                 <View style={{justifyContent: 'center', width: '10%'}}>
//                     <Text style={{
//                         fontWeight: 'bold',
//                         color: 'black',
//                         fontSize: SmartScreenBase.smPercenWidth * 5,
//                     }}>{index + 1}</Text>
//                 </View>
//                 <View style={{alignItems: 'center', width: '25%', justifyContent: 'center'}}>
//                     <Image source={{uri: 'gv_liststudent_12'}} style={{
//                         width: SmartScreenBase.smPercenWidth * 18,
//                         height: SmartScreenBase.smPercenWidth * 18,
//                         resizeMode: 'contain',
//                     }}/>
//                 </View>
//                 <View style={{justifyContent: 'center', marginLeft: SmartScreenBase.smPercenWidth * 3}}>
//                     <Text style={{
//                         fontWeight: '600',
//                         color: 'black',
//                         fontSize: SmartScreenBase.smPercenWidth * 5,
//                     }}>{item.username}</Text>
//                 </View>
//             </View>
//         );
//     };
//     _informationClass = () => {
//         this.setState({visible: false});
//         this.props.navigation.navigate('ClassDetailScreen');
//     };
//     _onDelete = () => {
//         this.setState({visible: false});
//         this.props.navigation.navigate('DeleteStudents');
//     };
//     _addStudent = () => {
//         this.setState({visible: false});
//         this.props.navigation.navigate('AddStudentScreen');
//     };

//     render() {
//         return (
//             <ImageBackground source={{uri: 'imagebackground'}} style={{
//                 flex: 1,
//                 resizeMode: 'stretch',
//             }}>
//                 {
//                     this.state.isLoading == true
//                     ?
//                         <LoadingScreen/>
//                         :
//                         <View style={{flex: 1}}>
//                             <View style={{
//                                 justifyContent: 'space-between',
//                                 alignItems: 'center',
//                                 flex: 1,
//                                 backgroundColor: 'rgba(0,0,0,0.3)',
//                                 flexDirection: 'row',
//                                 paddingHorizontal: SmartScreenBase.smPercenWidth * 5,
//                             }}>
//                                 <Text style={{
//                                     color: 'white',
//                                     fontWeight: '800',
//                                     fontSize: SmartScreenBase.smPercenWidth * 5,
//                                 }}>Lớp 12A15</Text>
//                                 <TouchableOpacity onPress={() => {
//                                     this.setState({visible: true});
//                                 }}>
//                                     <Image style={{
//                                         width: SmartScreenBase.smPercenWidth * 8,
//                                         height: SmartScreenBase.smPercenWidth * 8,
//                                         transform: [{rotate: '90deg'}],
//                                     }}
//                                            resizeMode={'contain'}
//                                            source={{uri: 'student_skill_image10'}}/>
//                                 </TouchableOpacity>

//                             </View>
//                             <View style={{flex: 12, padding: SmartScreenBase.smPercenWidth * 6}}>
//                                 <View style={{
//                                     flex: 1,
//                                     backgroundColor: '#fff',
//                                     borderRadius: SmartScreenBase.smPercenWidth * 4,
//                                     paddingTop: SmartScreenBase.smPercenWidth * 6,
//                                     paddingHorizontal: SmartScreenBase.smPercenWidth * 4,
//                                 }}>
//                                     <Text style={{
//                                         fontWeight: 'bold',
//                                         color: 'black',
//                                         fontSize: SmartScreenBase.smPercenWidth * 5,
//                                     }}>Danh sách lớp</Text>
//                                     <FlatList data={this.state.Data} renderItem={this._renderItem}
//                                               keyExtractor={(item, index) => {
//                                                   return item.toString() + index.toString();
//                                               }}
//                                               showsVerticalScrollIndicator={false}
//                                               extraData={this.state}/>
//                                 </View>
//                                 <Modal visible={this.state.visible} animated={true} transparent={true} onRequestClose={()=>{this.setState({visible:false})}}>
//                                     <View style={{
//                                         flex: 1,
//                                         backgroundColor: 'rgba(52, 52, 52, 0.8)',
//                                         justifyContent: 'flex-end',
//                                     }}>
//                                         <View style={{
//                                             flex: 1 / 4,
//                                             backgroundColor: '#fff',
//                                             paddingVertical: SmartScreenBase.smPercenWidth * 5,
//                                         }}>
//                                             <TouchableOpacity style={{
//                                                 flexDirection: 'row',
//                                                 alignItems: 'center',
//                                                 flex: 1,
//                                             }}
//                                                               onPress={() => {
//                                                                   this._informationClass();
//                                                               }}
//                                             >
//                                                 <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//                                                     <Image style={{
//                                                         width: SmartScreenBase.smPercenWidth * 6,
//                                                         height: SmartScreenBase.smPercenWidth * 6,
//                                                     }}
//                                                            resizeMode={'contain'}
//                                                            source={{uri: 'gv_liststudent_13'}}/>
//                                                 </View>
//                                                 <View style={{flex: 3, justifyContent: 'center'}}>
//                                                     <Text style={{
//                                                         fontWeight: '400',
//                                                         color: 'black',
//                                                         fontSize: SmartScreenBase.smPercenWidth * 4,
//                                                     }}>Chi tiết thông tin lớp</Text>
//                                                 </View>
//                                             </TouchableOpacity>
//                                             <TouchableOpacity style={{
//                                                 flexDirection: 'row',
//                                                 alignItems: 'center',
//                                                 flex: 1,
//                                             }}
//                                                               onPress={() => {
//                                                                   this._addStudent();
//                                                               }}
//                                             >
//                                                 <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//                                                     <Image style={{
//                                                         width: SmartScreenBase.smPercenWidth * 7,
//                                                         height: SmartScreenBase.smPercenWidth * 7,
//                                                     }}
//                                                            resizeMode={'contain'}
//                                                            source={{uri: 'gv_liststudent_14'}}/>
//                                                 </View>
//                                                 <View style={{flex: 3, justifyContent: 'center'}}>
//                                                     <Text style={{
//                                                         fontWeight: '400',
//                                                         color: 'black',
//                                                         fontSize: SmartScreenBase.smPercenWidth * 4,
//                                                     }}>thêm học viên</Text>
//                                                 </View>
//                                             </TouchableOpacity>
//                                             <TouchableOpacity style={{
//                                                 flexDirection: 'row',
//                                                 alignItems: 'center',
//                                                 flex: 1,
//                                             }}
//                                                               onPress={() => {
//                                                                   this._onDelete();
//                                                               }}
//                                             >
//                                                 <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//                                                     <Image style={{
//                                                         width: SmartScreenBase.smPercenWidth * 7,
//                                                         height: SmartScreenBase.smPercenWidth * 7,
//                                                     }}
//                                                            resizeMode={'contain'}
//                                                            source={{uri: 'gv_liststudent_15'}}/>
//                                                 </View>
//                                                 <TouchableOpacity style={{flex: 3, justifyContent: 'center'}}
//                                                                   onPress={() => {
//                                                                       this._onDelete();
//                                                                   }}
//                                                 >
//                                                     <Text style={{
//                                                         fontWeight: '400',
//                                                         color: 'black',
//                                                         fontSize: SmartScreenBase.smPercenWidth * 4,
//                                                     }}>Xóa học viên</Text>
//                                                 </TouchableOpacity>
//                                             </TouchableOpacity>

//                                         </View>
//                                     </View>
//                                 </Modal>
//                             </View>
//                         </View>
//                 }
//             </ImageBackground>
//         );

//     }

// }
