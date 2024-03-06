import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    ImageBackground,
    Platform,
    FlatList,
    Alert, BackHandler,
} from 'react-native';
const {width, height} = Dimensions.get('screen');
import React, {Component} from 'react';
import Header from '../../../../Header/Header';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import axios from 'axios';
import base64 from 'react-native-base64';
import API from '../../../../API/APIConstant';
const Diary = [
  {
    title: 'Học không giới hạn',
    mes: '20/11/2020',
  },
  {
    title: 'Giáo viên chấm bài',
    mes: '20/11/2020',
  },
];
class License extends Component {
  _onShowAlert = () => {
  };

  componentDidMount(): void {
    this._getLicense();
  }

  _getLicense = () => {
      const header = {
          'Content-Type': 'application/json',
          jwt_token:
              'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImFkbWluIiwidGltZV9sb2dpbiI6MTU3ODkwNzQyM30.CFZyO9a-qBmyI8Q25AqGNd1nxWn1SO5TMC_yBxjgWCA',
          'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
          Authorization: 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
      };
      const url =
          API.baseurl+'student/api_homework/homework_history?id=1';
      axios({method: 'get', url: url, headers: header})
          .then(response => {
              console.log(response);
          })
          .catch(error => {
              console.log(error.message);
              if (error.message === 'Network Error') {
                  Alert.alert('Thông Báo', 'Vui lòng kiểm tra kết nối Internet');
              }
              this.setState({isLoading: false});
          });
  };

  _renderItem = ({item, index}) => {
    const sizelenght = Diary.length;
    console.log(item);
    return (
      <View
        style={{
          flex: 1,
        }}>
        <View
          style={{
            width: '100%',
            zIndex: 1,
            height: SmartScreenBase.smPercenHeight * 13,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 10,
          }}>
          <View
            style={{
              width: '90%',
              height: '100%',
              flexDirection: 'row',
              borderBottomWidth: 1,
              borderBottomColor: index === sizelenght - 1 ? '#FFF' : 'gray',
            }}>
            <View
              style={{
                width: '20%',
                height: '100%',
              }}>
              <View
                style={{
                  width: '100%',
                  height: '50%',
                  justifyContent: 'center',
                }}>
                {index === sizelenght - 1 ? (
                  <Image
                    style={{
                      width: SmartScreenBase.smPercenWidth * 11,
                      height: SmartScreenBase.smPercenWidth * 11,
                      resizeMode: 'contain',
                    }}
                    source={{uri: 'phu_huynh_67'}}
                  />
                ) : (
                  <Image
                    style={{
                      width: SmartScreenBase.smPercenWidth * 11,
                      height: SmartScreenBase.smPercenWidth * 11,
                      resizeMode: 'contain',
                    }}
                    source={{uri: 'student_setting_image6'}}
                  />
                )}
              </View>
              <View
                style={{
                  width: '100%',
                  height: '50%',
                }}
              />
            </View>
            <View
              style={{
                width: '80%',
                height: '100%',
              }}>
              <View
                style={{
                  width: '100%',
                  height: '50%',
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontSize: SmartScreenBase.smPercenWidth * 5,
                    fontWeight: '800',
                  }}>
                  {item.title}
                </Text>
              </View>
              <View
                style={{
                  width: '100%',
                  height: '50%',
                  justifyContent: 'center',
                }}>
                <Text style={{fontSize: SmartScreenBase.smPercenWidth * 4}}>
                  Hạn sử dụng đến ngày: {item.mes}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    );
  };

    _goBack = () => {
        this.props.navigation.goBack();
    };

  render() {
    return (
      <ImageBackground
          source={{uri: 'imagebackground'}}
        style={{
          flex: 1,
          marginTop: Platform.OS === 'ios' ? 35 : 0,
        }}>
        {/*<Header title={'License'} />*/}
          <View style={{
              justifyContent: 'space-between',
              alignItems: 'center',
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.3)',
              flexDirection: 'row',
          }}>
              <View style={{
                  marginLeft: SmartScreenBase.smPercenWidth * 2,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
              }}>
                  <TouchableOpacity
                      onPress={this._goBack}
                  >
                      <Image style={{
                          width: SmartScreenBase.smPercenWidth * 5,
                          height: SmartScreenBase.smPercenWidth * 5,
                      }}
                             resizeMode={'contain'}
                             source={{uri: 'imageback'}}/>
                  </TouchableOpacity>

                  <Text style={{
                      color: 'white',
                      marginLeft: SmartScreenBase.smPercenWidth * 5,
                      fontWeight: '800',
                      fontSize: SmartScreenBase.smPercenWidth * 5,
                  }}>License</Text>
              </View>
          </View>
        <View
          style={{
            width: '100%',
            flex: 12,
            backgroundColor: '#FFF',
            alignItems: 'center',
          }}>
          <View style={{width: '90%', height: '10%', justifyContent: 'center'}}>
            <Text style={{fontSize: 25, fontWeight: 'bold'}}>
              Danh sách License
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              height: '70%',
              justifyContent: 'center',
            }}>
            <FlatList
              data={Diary}
              renderItem={this._renderItem}
              keyExtractor={(item, index) => {
                return item.toString() + index.toString();
              }}
              showsVerticalScrollIndicator={false}
              extraData={this.state}
            />
          </View>
          <View
            style={{
              width: '100%',
              height: '20%',
              justifyContent: 'center',
              bottom: 0,
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => {
                this._onShowAlert();
              }}
              style={{
                width: width * 0.5,
                height: height * 0.05,
                justifyContent: 'center',
                backgroundColor: '#000',
                borderRadius: width * 0.25,
                alignItems: 'center',
              }}>
              <Text style={{color: '#FFF', fontSize: 20, fontWeight: '600'}}>
                Add License
              </Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text
                style={{
                  color: 'blue',
                  fontSize: 15,
                  fontWeight: 'bold',
                  marginTop: 5,
                  textDecorationLine: 'underline',
                }}>
                Bạn chưa có License, click vào đây
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    );
  }
}
export default License;
