import React, { Component } from "react";
import {
    Text, View, Dimensions, TouchableOpacity, Image, FlatList, Alert,
} from 'react-native';
import StyleLesson from "../StyleLesson";
import TypeExercise from "../Component/TypeExercise";
import SmartScreenBase from "../../../base/SmartScreenBase";
import stylesApp from "../../../styleApp/stylesApp";
import axios from 'axios';
import API from "../../../../API/APIConstant";

var Sound = require('react-native-sound');
Sound.setCategory('Playback');
let dataNew = [];
let DataObject1 = new Object();
let DataObject2 = new Object();
export default class SpeakingScreenD3 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data : [],
            refresh: false,
            checkResuilt: null,
            Resuilt: 0,
            ShowCheck: 0,
            ShowResuilt: false,
            showClien:false,
            idText:0,
            idExam:0,
            sound:'',
            idmap:[0],
            checkShowClient:[]
        }
    }
    componentWillMount(): void {
        //DataObject1 = new Object();
        debugger;
        let arr;
        dataNew = [];
        const url =
            API.baseurl+'student/api_student_lesson/lesson?id=281';
        const header = {
            'Content-Type': 'application/json',
            jwt_token:
                'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImFkbWluIiwidGltZV9sb2dpbiI6MTU3ODkwNzQyM30.CFZyO9a-qBmyI8Q25AqGNd1nxWn1SO5TMC_yBxjgWCA',
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            Authorization: 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
        };
        axios({method: 'get', url: url, headers: header})
            .then(response => {
                console.log(response)
                for (let i = 0; i < response.data.data_question.length ; i += 1) {
                    DataObject2 = new Object();
                    arr = [];
                    for( let j = 0 ; j < JSON.parse(response.data.data_question[i].list_option[0].option_text).length ; j++ ){
                        DataObject1 = new Object();
                        DataObject1.Boss = JSON.parse(response.data.data_question[i].list_option[0].option_text)[j];
                        DataObject1.client = JSON.parse(response.data.data_question[i].list_option[0].match_option_text)[j];
                        arr.push(DataObject1);
                        this.state.checkShowClient.push(false);
                    }
                    DataObject2.id = i;
                    DataObject2.data = arr
                    dataNew.push(DataObject2);
                    this.setState({sound:'https://setest.gkcorp.com.vn'+ dataNew[0].data[0].Boss.audio})
                    console.log(API.domain + dataNew[this.state.idExam].data[0].Boss.audio)
                }
                this.setState({data:dataNew})
                console.log('datanew',dataNew);
                this.play(API.domain + dataNew[this.state.idExam].data[0].Boss.audio);
                //console.log(dataNew);
            })
            .catch(error => {
                console.log(error.message);
                if (error.message === 'Network Error') {
                    Alert.alert('Thông Báo', 'Vui lòng kiểm tra kết nối Internet');
                }
            });

    }

    render() {
        let ar = this.state.data[0];
        //console.log('ar', ar.data);
        return (
            <View style={{justifyContent: 'space-between', flex: 1}}>
                <View style={{flex: 1}}>
                    <View style={{
                        alignSelf: 'center',
                        width: SmartScreenBase.smPercenWidth * 85,
                        borderRadius: SmartScreenBase.smPercenWidth * 6,
                        backgroundColor: 'rgba(0,0,0,0.3)',
                        height: SmartScreenBase.smPercenHeight * 8,
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: SmartScreenBase.smPercenHeight * 2,
                    }}>
                        <View style={{
                            position: 'absolute',
                            left: -SmartScreenBase.smPercenWidth * 5,
                            top: -SmartScreenBase.smPercenHeight,
                        }}>
                            <Image source={{uri: 'lesson_image1'}}
                                   style={StyleLesson.Sty_ImageTyle_1}
                            />
                        </View>
                        <Text style={{
                            fontSize: SmartScreenBase.smPercenWidth * 4,
                            color: 'white',
                            textAlign: 'left',
                            fontWeight: '500',
                            marginLeft: SmartScreenBase.smPercenWidth * 15,
                            marginVertical: SmartScreenBase.smPercenHeight * 2,
                            marginRight: SmartScreenBase.smPercenWidth,
                        }}>
                            Answer the questions to make a conversation</Text>
                        <View style={{
                            position: 'absolute',
                            right: -SmartScreenBase.smPercenWidth * 3,
                            bottom: -SmartScreenBase.smPercenWidth * 3,
                        }}>
                            <TouchableOpacity>
                                <Image source={{uri: 'lesson_image2'}}
                                       style={StyleLesson.Sty_ImageTyle_2}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{
                        width: SmartScreenBase.smPercenWidth * 100, alignSelf: 'center', alignItems: 'center',
                        // height: SmartScreenBase.smPercenHeight * 65,
                        marginTop: SmartScreenBase.smPercenHeight * 2,
                        flex: 1,
                    }}>
                        <View style={{position: 'absolute', top: 0}}>
                            <Image source={{uri: 'student_home_image13'}}
                                   style={[StyleLesson.Sty_ImageList, {transform: [{rotate: '180deg'}]}]}
                            />
                        </View>
                        <View style={{
                            // height: SmartScreenBase.smPercenHeight * 60
                            flex: 1,
                        }}>
                                        <FlatList
                                            data={this.state.data}
                                            keyExtractor={(item, index) => 'item' + index}
                                            renderItem={this._Render_Item}
                                            showsVerticalScrollIndicator={false}
                                        />


                        </View>
                        {this.state.ShowResuilt == true ? (
                            <View style={{
                                height: SmartScreenBase.smPercenHeight * 65,
                                width: SmartScreenBase.smPercenWidth * 100,
                                backgroundColor: 'rgba(0,0,0,0.6)',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'absolute',
                            }}>
                                <Image source={{uri: this._ShowIconResuilt()}}
                                       style={{
                                           width: SmartScreenBase.smPercenWidth * 60,
                                           height: SmartScreenBase.smPercenWidth * 20,
                                           resizeMode: 'contain',
                                       }}
                                />
                            </View>
                        ) : null}
                    </View>
                </View>
                {this._ShowCheckFooter()}
            </View>
        );
    }

    _ShowCheckFooter() {
        if (this.state.ShowCheck == 0) {
            return (
                <View style={{
                    alignItems: 'center',
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    height: SmartScreenBase.smPercenHeight * 10,
                    width: SmartScreenBase.smPercenWidth * 100,
                    marginTop: SmartScreenBase.smPercenHeight * 5,
                    justifyContent: 'center',
                }}>
                    <TouchableOpacity onPress={() => {
                        this.setState({ShowCheck: 1});
                    }}
                    >
                        <Image source={{uri: 'lesson_vocab_image12'}}
                               style={{
                                   width: SmartScreenBase.smPercenWidth * 25,
                                   height: SmartScreenBase.smPercenHeight * 25,
                                   resizeMode: 'contain',
                                   marginBottom: SmartScreenBase.smPercenHeight * 4,
                               }}
                        />
                    </TouchableOpacity>
                </View>
            );
        } else if (this.state.ShowCheck == 1) {
            return (
                <View style={{
                    alignItems: 'center',
                    backgroundColor: 'rgba(255,255,255,0.65)',
                    height: SmartScreenBase.smPercenHeight * 10,
                    width: SmartScreenBase.smPercenWidth * 100,
                    marginTop: SmartScreenBase.smPercenHeight * 3,
                    justifyContent: 'space-around',
                    flexDirection: 'row',
                }}>
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({ShowCheck: 3});

                        }}
                        style={[stylesApp.Sty_Button, {
                            width: SmartScreenBase.smPercenWidth * 45,
                            height: SmartScreenBase.smPercenWidth * 10,
                        }]}
                    >

                        <Text style={stylesApp.Sty_Text_Button}>NGHE LẠI</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => {
                            this.setState({ShowCheck: 2});
                        }}
                        style={[stylesApp.Sty_Button, {
                            width: SmartScreenBase.smPercenWidth * 45,
                            height: SmartScreenBase.smPercenWidth * 10,
                        }]}
                    >

                        <Text style={stylesApp.Sty_Text_Button}>TRỢ GIÚP</Text>
                    </TouchableOpacity>
                </View>
            );
        } else {
            return (
                <View style={{
                    alignItems: 'center',
                    backgroundColor: 'rgba(255,255,255,0.65)',
                    height: SmartScreenBase.smPercenHeight * 10,
                    width: SmartScreenBase.smPercenWidth * 100,
                    marginTop: SmartScreenBase.smPercenHeight * 3,
                    flexDirection: 'row',
                    justifyContent: 'space-evenly',
                }}>
                    <TouchableOpacity
                        onPress={() => {
                            this.checkResuilt();
                        }}
                        style={[stylesApp.Sty_Button, {width: SmartScreenBase.smPercenWidth * 90}]}
                    >
                        <Text
                            style={stylesApp.Sty_Text_Button}>{this.state.checkResuilt == true ? 'TIẾP TỤC' : 'KIỂM TRA'}</Text>
                    </TouchableOpacity>
                </View>
            );
        }
    }
    onSliderEditStart = () => {
        this.sliderEditing = true;
    };
    onSliderEditEnd = () => {
        this.sliderEditing = false;
    };
    onSliderEditing = value => {
        if (this.sound) {
            this.sound.setCurrentTime(value);
            this.setState({playSeconds: value});
        }
    };
    componentDidMount() {
        this.timeout = setInterval(() => {
            if (
                this.sound &&
                this.sound.isLoaded() &&
                this.state.playState == 'playing' &&
                !this.sliderEditing
            ) {
                this.sound.getCurrentTime((seconds, isPlaying) => {
                    this.setState({playSeconds: seconds});
                });
            }
        }, 100);
    }
    play = async (link) => {
        console.log('link',link)
        if (this.sound) {
            this.sound.play(this.playComplete);
            this.setState({playState: 'playing'});
        } else {
            this.sound = new Sound(
                link,
                null,
                error => {
                    if (error) {
                        console.log('failed to load the sound', error);
                        Alert.alert('Notice', 'audio file error. (Error code : 1)');
                        this.setState({playState: 'paused'});
                    } else {
                        this.setState({
                            playState: 'playing',
                            duration: this.sound.getDuration(),
                        });
                        this.sound.play(this.playComplete);
                    }
                },
            );
        }
    };
    play1 = async (link) => {
        this.sound = new Sound(
            link,
            null,
            error => {
                if (error) {
                    console.log('failed to load the sound', error);
                    Alert.alert('Notice', 'audio file error. (Error code : 1)');
                    this.setState({playState: 'paused'});
                } else {
                    this.setState({
                        playState: 'playing',
                        duration: this.sound.getDuration(),
                    });
                    this.sound.play(this.playComplete);
                }
            },
        );
    };
    playComplete = success => {
        if (this.sound) {
            if (success) {
                console.log('successfully finished playing');

            } else {
                console.log('playback failed due to audio decoding errors');
                Alert.alert('Notice', 'audio file error. (Error code : 2)');
            }
            this.state.checkShowClient[this.state.idText] = true;
            console.log(this.state.checkShowClient);
            this.setState({playState: 'paused', playSeconds: 0});
            this.sound.setCurrentTime(0);
            this.setState({showClien : true});
            this.timeout = setInterval(() => {
                if (
                    this.sound &&
                    this.sound.isLoaded() &&
                    this.state.playState == 'playing' &&
                    !this.sliderEditing
                ) {
                    this.sound.getCurrentTime((seconds, isPlaying) => {
                        this.setState({playSeconds: seconds});
                    });
                }
            }, 100);
        }
    };

    pause = () => {
        if (this.sound) {
            this.sound.pause();
        }

        this.setState({playState: 'paused'});
    };

    _Render_Item = ({item}) => {
        console.log('ahihi',this.state.checkShowClient[item.id]);
            return (
                <View>
                    {
                        this.state.idmap.map((icon,index)=>{
                            return(
                              <View>
                                  {
                                      item.id === this.state.idExam?
                                          <View style={{
                                              flexDirection: 'row',
                                              alignItems: 'center',
                                              marginTop: SmartScreenBase.smPercenHeight * 2,
                                              justifyContent: 'flex-start',
                                              width: '100%',
                                          }}>
                                              <View style={{
                                                  alignItems: 'center',
                                                  width: SmartScreenBase.smPercenWidth * 18,
                                                  justifyContent: 'center',
                                              }}>
                                                  <Image source={{uri: 'lesson_speaking_image6'}}
                                                         style={{
                                                             width: SmartScreenBase.smPercenWidth * 12,
                                                             height: SmartScreenBase.smPercenWidth * 12,
                                                             resizeMode: 'contain',
                                                         }}
                                                  />
                                              </View>
                                              <View style={[StyleLesson.Sty_View_Border, {
                                                  backgroundColor: '#fff',
                                                  width: SmartScreenBase.smPercenWidth * 70,
                                                  marginTop: 0,
                                              }]}>
                                                  <Text>{item.data[index].Boss.text}</Text>
                                              </View>
                                          </View>
                                          :null
                                  }
                                  {
                                      this.state.checkShowClient[index] == true?

                                          item.id === this.state.idExam?
                                              <View style={{
                                                  flexDirection: 'row',
                                                  alignItems: 'center',
                                                  marginTop: SmartScreenBase.smPercenHeight * 2,
                                                  justifyContent: 'flex-end',
                                                  width: '100%',
                                                  paddingRight: SmartScreenBase.smPercenWidth * 5,
                                              }}>
                                                  <TouchableOpacity
                                                      onPress={()=>{
                                                          this.state.idmap.push(1)
                                                          this.setState({idText: this.state.idText + 1});
                                                          this.setState({showClien : false});
                                                          console.log('ahuhu',this.state.data[this.state.idExam].data[this.state.idText + 1].Boss.audio)
                                                          this.play1(API.domain+'assets/audio/p4.mp3');
                                                      } }
                                                      style={{
                                                          alignItems: 'center',
                                                          margin: this.state.ShowCheck !== 3 ? SmartScreenBase.smPercenWidth * 2 : 0,
                                                          justifyContent: 'center',
                                                      }}>
                                                      <Image source={{uri: 'lesson_speaking_image5'}}
                                                             style={{
                                                                 width: SmartScreenBase.smPercenWidth * 10,
                                                                 height: SmartScreenBase.smPercenWidth * 10,
                                                                 resizeMode: 'contain',
                                                             }}
                                                      />
                                                  </TouchableOpacity>
                                                  {
                                                      this.state.ShowCheck === 3 &&
                                                      <TouchableOpacity style={{
                                                          alignItems: 'center',
                                                          marginHorizontal: SmartScreenBase.smPercenWidth * 2,
                                                          justifyContent: 'center',
                                                      }}>
                                                          <Image source={{uri: 'lesson_vocab_image12'}}
                                                                 style={{
                                                                     width: SmartScreenBase.smPercenWidth * 10,
                                                                     height: SmartScreenBase.smPercenWidth * 10,
                                                                     resizeMode: 'contain',
                                                                 }}
                                                          />
                                                      </TouchableOpacity>
                                                  }
                                                  <View style={[StyleLesson.Sty_View_Border, {
                                                      backgroundColor: 'rgba(0,0,0,0.7)',
                                                      width: SmartScreenBase.smPercenWidth * 67,
                                                      marginTop: 0,
                                                  }]}>
                                                      <Text style={[stylesApp.txt, {color: 'white'}]}>{item.data[index].client.text}</Text>
                                                  </View>
                                              </View>
                                              :null
                                              :null

                                  }
                              </View>
                            );
                        })
                    }

                </View>

            );

    };

    checkResuilt() {
        if (this.state.checkResuilt == true) {
            if (this.state.Resuilt >= 3) {
                this.props.methodScreen(4);
            } else {
                this.setState({
                    Resuilt: this.state.Resuilt + 1,
                });
            }
        } else {
            this.setState({
                checkResuilt: true,
                ShowResuilt: true,
            });
        }
    }

    _ShowIconResuilt() {
        switch (this.state.Resuilt) {
            case 0:
                return 'lesson_vocab_image15';
            case 1:
                return 'lesson_vocab_image16';
            case 2:
                return 'lesson_vocab_image17';
            default:
                return 'lesson_vocab_image15';
        }
    }
}
