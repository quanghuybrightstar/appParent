import React, {PureComponent} from 'react';
import {
    View,
    Text,
    ScrollView,
    TextInput,
    TouchableOpacity,
    Alert,
    Keyboard,
    Dimensions,
    FlatList, Image, ImageBackground,
} from 'react-native';
import {firebaseApp} from '../../../FirebaseConfig';
const {width, height} = Dimensions.get('window');
import {connect} from 'react-redux';
import SmartScreenBase from '../../base/SmartScreenBase';
import StyleLesson from '../learn/Lesson/StyleLesson';
import stylesApp from '../styleApp/stylesApp';
import Icon from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import base64 from 'react-native-base64';
import Iconcheck1 from 'react-native-vector-icons/AntDesign';
import API from '../../API/APIConstant';

class HomeChatScreen extends PureComponent {
    constructor(props) {
        super(props);
        this.itemRef = firebaseApp.database();
        this.state = {
            data:[],
        };
    }
   componentDidMount(): void {
       const url =
           API.baseurl+'api_inbox/inbox?from_user_id=0';
       const header = {
           'Content-Type': 'application/x-www-form-urlencoded',
           jwt_token:
               'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjkiLCJ1c2VybmFtZSI6IlRoYXlCYSIsInRpbWVfbG9naW4iOjE1OTQzNzQ2NDh9.JQGMwvkCWdqdeYUFId4VibLz4C105GhXOjcRyT0jonc',
           'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
               Authorization: 'Basic ' + base64.encode('gek_admin:gek_admin_password'),
       };
       axios({method: 'get', url: url, headers: header})
           .then(response => {
                //console.log(response.data.data);
                this.setState({data: response.data.data});
           })
           .catch(error => {
               console.log(error.message);
               if (error.message === 'Network Error') {
                   Alert.alert('Thông Báo', 'Vui lòng kiểm tra kết nối Internet');
               }
           });
   }
    componentWillMount() {
        this.listenForItem(this.itemRef);
    }
    listenForItem = itemRef => {
        this.setState({isLoading: true});
        var usersRef = this.itemRef.ref('mes');
        console.log(usersRef.child);
        itemRef
            .ref('mes')
            .on('child_added', dataSnapshot => {
                console.log(dataSnapshot.val());
            });
    };
    _Render_Item = ({item,index}) => {
        let day = item.created_at.split(' ')[1].split(':');
        //console.log(item);
        return (
            <TouchableOpacity
                onPress={()=>{
                    this.props.methodScreen(item.to_user_id, item.to_username);

                }}
                style={{marginBottom:10, flexDirection:'row', height:height*0.13,width,justifyContent:'center',alignItems:'center'}}>
                <View style={{width:'90%', height:'100%', flexDirection:'row'}}>
                    <View style={{width:'10%', height:'100%'}}></View>
                    <View style={{width:'90%', height:'100%',backgroundColor:'#FFF',borderRadius:10, }}>
                        <View style={{width:'100%', height:'70%', justifyContent:'center', flexDirection:'row'}}>
                            <View style={{width:'70%', height:'100%',justifyContent:'center',}}>
                                <Text style={{color: "#000", fontSize:20, fontWeight: 'bold',marginLeft:'30%'}}>{item.to_username}</Text>
                            </View>
                            <View style={{width:'30%', height:'100%',justifyContent:'center',}}>
                                <Text style={{color: "#000", fontSize:15,marginLeft:'20%'}}>{day[0]}:{day[1]}</Text>
                            </View>
                        </View>
                        <View style={{width:'100%', height:'30%'}}>
                            <Text style={{color: "#00000050", fontSize:15,marginLeft:'20%'}}>{item.content}</Text>
                        </View>
                    </View>
                    <View style={{width:'25%', height:'100%', position:'absolute',justifyContent:'center',alignItems:'center'}}>
                        <Image
                            source={{uri: 'gv_liststudent_11'}}
                            style={{  width: width* 0.2,
                                height: width* 0.2,
                                resizeMode: 'contain',}}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        );
    };
    render() {
        return (
            <ImageBackground
                source={{uri: 'imagebackgroundlesson'}}
                imageStyle={[stylesApp.ImageBackGround,]}
                style={{width,height}}>
                <TouchableOpacity
                    onPress={()=>{
                        this.props.newMess();
                    }}
                    style={{position: 'absolute',zIndex:2, marginTop:height*0.65, marginLeft:width*0.8}}>
                    <Icon name="pluscircle" size={50} color="#00000080" />
                </TouchableOpacity>
                <View style={{
                        width,
                        height:height*0.75,
                        justifyContent:'center',
                        alignItems:'center',
                        marginBottom:height*0.05,
                        marginTop:height*0.02,
                    }}>
                    <FlatList
                        data={this.state.data}
                        renderItem={(item, index) => this._Render_Item(item,index)}
                        extraData={this.state.data}
                        keyExtractor={(item, index) => index.toString()}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </ImageBackground>
        );
    }
}

function mapStateToProps(state) {
    return {
        data_answer: state.readingD11Reducer,
        data_login:state.AuthStackReducer.dataLogin
    };
}
export default connect(mapStateToProps)(HomeChatScreen);

