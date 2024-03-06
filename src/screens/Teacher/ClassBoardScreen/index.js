import React, {PureComponent} from 'react';
import {Image, ImageBackground, Text, TouchableOpacity, View, FlatList} from 'react-native';
import SmartScreenBase from '../../../base/SmartScreenBase';

class ClassBoard extends PureComponent {
    constructor() {
        super();
        this.state = {
            data: [
                {
                    id: 1,
                    avatar: 'gv_liststudent_09',
                    name: 'Phạm Thu Thủy',
                    imageAchievement: 'lesson_vocab_image4',
                    achievement: 'Hoàn thành bài tập trong 2h30p',
                },
                {
                    id: 1,
                    avatar: 'gv_liststudent_09',
                    name: 'Phạm Thu Thủy',
                    imageAchievement: 'lesson_vocab_image4',
                    achievement: 'Đạt 1500 Exp',
                },
                {
                    id: 1,
                    avatar: 'gv_liststudent_09',
                    name: 'Phạm Thu Thủy',
                    imageAchievement: 'lesson_vocab_image4',
                    achievement: 'Đạt 1500 Exp',
                },
                {
                    id: 1,
                    avatar: 'gv_liststudent_09',
                    name: 'Phạm Thu Thủy',
                    imageAchievement: 'lesson_vocab_image4',
                    achievement: 'Đạt 1500 Exp',
                },
                {
                    id: 1,
                    avatar: 'gv_liststudent_09',
                    name: 'Phạm Thu Thủy',
                    imageAchievement: 'lesson_vocab_image4',
                    achievement: 'Đạt 1500 Exp',
                },
                {
                    id: 1,
                    avatar: 'gv_liststudent_09',
                    name: 'Phạm Thu Thủy',
                    imageAchievement: 'lesson_vocab_image4',
                    achievement: 'aaaa',
                },
            ],
        };
    }

    _renderAchievement = ({item}) => {
        return (
            <View style={{
                flexDirection: 'row',
                marginVertical: SmartScreenBase.smPercenHeight * 2,
                marginLeft: SmartScreenBase.smPercenHeight * 2,
            }}>
                <View style={{
                    flex: 1,
                    backgroundColor: '#ffffff90',
                    borderRadius: SmartScreenBase.smPercenWidth * 3,
                }}>
                    <View style={{alignItems: 'center', flex: 1, marginTop: SmartScreenBase.smPercenHeight}}>
                        <Image
                            source={{uri: item.avatar}}
                            style={{
                                width: '100%',
                                height: '100%',
                            }}
                            resizeMode={'contain'}
                        />
                        <View style={{
                            position: 'absolute',
                            backgroundColor: '#ee4833',
                            bottom: 0,
                            paddingVertical: SmartScreenBase.smPercenWidth,
                            width: '80%',
                            borderRadius: SmartScreenBase.smPercenWidth * 3,
                        }}>
                            <Text style={{
                                textAlign: 'center',
                                color: '#fff',
                                fontSize: SmartScreenBase.smPercenWidth * 4.5,
                            }}>{item.name}</Text>
                        </View>
                    </View>
                    <View
                        style={{
                            backgroundColor: '#ffffff90',
                            borderBottomRightRadius: SmartScreenBase.smPercenWidth * 3,
                            borderBottomLeftRadius: SmartScreenBase.smPercenWidth * 3,
                            margin: SmartScreenBase.smPercenWidth,
                        }}
                    >
                        <Text style={{textAlign: 'center', fontWeight: '700',paddingVertical:5}}>{item.achievement}</Text>
                    </View>
                </View>

                <Image
                    source={{uri: item.imageAchievement}}
                    style={{
                        width: SmartScreenBase.smPercenWidth * 32,
                        height: SmartScreenBase.smPercenWidth * 40,
                    }}
                    // resizeMode={'contain'}
                />
            </View>
        );
    };

    render() {
        const {data} = this.state;
        return (
            <ImageBackground source={{uri: 'imagebackground'}} style={{
                flex: 1,
                resizeMode: 'stretch',
            }}>
                <View style={{
                    width: SmartScreenBase.smPercenWidth * 100,
                    height: SmartScreenBase.smPercenWidth * 12,
                    backgroundColor: 'rgba(0,0,0,0.3)',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingHorizontal: SmartScreenBase.smPercenWidth * 5,
                }}>
                    <View style={{flexDirection: 'row', alignItems: 'center', height: '100%'}}>
                        <TouchableOpacity style={{
                            width: SmartScreenBase.smPercenWidth * 5,
                            height: '100%',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Image style={{
                                width: SmartScreenBase.smPercenWidth * 5,
                                height: SmartScreenBase.smPercenWidth * 5,
                            }}
                                   resizeMode={'contain'}
                                   source={{uri: 'imageback'}}
                            />
                        </TouchableOpacity>
                        <Text style={{
                            color: '#d7d7d7',
                            marginLeft: SmartScreenBase.smPercenWidth * 5,
                            fontSize: SmartScreenBase.smPercenWidth * 5,
                        }}>Bảng thành tích</Text>
                    </View>
                    <Text style={{color: '#fff', fontWeight: '700', fontSize: SmartScreenBase.smPercenWidth * 5}}>Lớp
                        12A7</Text>
                </View>

                <FlatList
                    data={data}
                    renderItem={this._renderAchievement}
                    keyExtractor={(item, index) => {
                        return item.toString() + index.toString();
                    }}
                />
            </ImageBackground>
        );
    }
}

export default ClassBoard;
