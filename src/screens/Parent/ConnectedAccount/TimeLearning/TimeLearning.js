import React, {useMemo, useCallback} from 'react';
import {Text, View, FlatList, ImageBackground} from 'react-native';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import Dash from "react-native-dash";

SmartScreenBase.baseSetup();

const TimeLearning = (props) => {
    const _background = useMemo(() => {
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#00000070',
                borderTopLeftRadius: SmartScreenBase.smPercenWidth * 2,
                borderTopRightRadius: SmartScreenBase.smPercenWidth * 2
            }}>
                <View style={{
                    flex: 1, paddingTop: SmartScreenBase.smPercenHeight * 4,
                    paddingBottom: SmartScreenBase.smPercenHeight * 2
                }}>
                    <View style={{flex: 1, justifyContent: 'space-between'}}>
                        <View style={{
                            position: 'absolute',
                            top: -SmartScreenBase.smPercenHeight * 2,
                            alignItems: 'center',
                            left: 0,
                            height: SmartScreenBase.smPercenHeight * 4,
                            right: 0,
                            paddingHorizontal: SmartScreenBase.smPercenWidth * 2,
                            justifyContent: 'center',
                            flexDirection: 'row',
                        }}>
                            <Dash style={{width: SmartScreenBase.smPercenWidth * 2}} dashColor={'#ffffff50'}
                                  dashStyle={{height: SmartScreenBase.smPercenHeight * 0.15}}/>
                            <ImageBackground
                                style={{
                                    alignItems: 'center',
                                    paddingRight: SmartScreenBase.smPercenWidth * 2,
                                    paddingLeft: SmartScreenBase.smPercenWidth
                                }}
                                source={{uri: 'icon_chart'}}
                                resizeMode={'contain'}
                            >
                                <Text style={{color: '#fff', fontSize: SmartScreenBase.smPercenWidth * 4
                                }}>{props.maxValue + `'`}</Text>
                            </ImageBackground>
                            <Dash style={{flex: 1}} dashColor={'#ffffff50'}
                                  dashStyle={{height: SmartScreenBase.smPercenHeight * 0.15}}/>
                        </View>
                        <View style={{
                            position: 'absolute',
                            bottom: -SmartScreenBase.smPercenHeight * 2,
                            alignItems: 'center',
                            left: 0,
                            height: SmartScreenBase.smPercenHeight * 4,
                            right: 0,
                            paddingHorizontal: SmartScreenBase.smPercenWidth * 2,
                            justifyContent: 'center',
                            flexDirection: 'row',
                        }}>
                            <Dash style={{width: SmartScreenBase.smPercenWidth * 2}} dashColor={'#ffffff50'}
                                  dashStyle={{height: SmartScreenBase.smPercenHeight * 0.15}}/>
                            <View style={{
                                alignItems: 'center', paddingRight: SmartScreenBase.smPercenWidth * 2,
                                paddingLeft: SmartScreenBase.smPercenWidth
                            }}>
                                <Text style={{color: '#2d2d2d', fontSize: SmartScreenBase.smPercenWidth * 4}}>
                                    {props.maxValue / 2 + `'`}</Text>
                            </View>
                            <Dash style={{flex: 1}} dashColor={'#ffffff50'}
                                  dashStyle={{height: SmartScreenBase.smPercenHeight * 0.15}}/>
                        </View>
                    </View>
                    <View style={{flex: 1}}/>
                </View>

                <View style={{
                    backgroundColor: '#d4e2ea',
                    height: SmartScreenBase.smPercenHeight * 7,
                    justifyContent: 'center',
                    paddingLeft: SmartScreenBase.smPercenWidth * 3
                }}>
                    <Text style={{fontSize: SmartScreenBase.smPercenWidth * 4, fontWeight: '700'}}>NGÀY</Text>
                </View>

            </View>
        )
    }, [props.maxValue]);

    const _keyExtractor = useCallback((item, index) => index.toString(), []);

    const _renderItem = useCallback(({item}) => {
        const date = new Date(item.time);
        const time = `${date.getDate()}/${(date.getMonth() + 1).toString().length === 1 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}`;
        const heightColumn = Math.round(parseInt(item.value) / props.maxValue * 100 * 1000) / 1000 < 5 ? '5%' :
            `${Math.round(parseInt(item.value) / props.maxValue * 100 * 1000) / 1000}%`;
        return (
            <View style={{height: '100%', marginRight: SmartScreenBase.smPercenWidth * 4}}>
                <View style={{
                    flex: 1, paddingTop: SmartScreenBase.smPercenHeight * 4,
                    paddingBottom: SmartScreenBase.smPercenHeight * 2, justifyContent: 'flex-end', alignItems: 'center',
                    height: '100%'
                }}
                >
                    <Text style={{color: '#fff', fontSize: SmartScreenBase.smPercenWidth * 3}}>{item.value + `'`}</Text>
                    <View style={{
                        width: SmartScreenBase.smPercenWidth * 3, backgroundColor: '#fbeb3e',
                        height: heightColumn,
                        marginTop: SmartScreenBase.smPercenHeight * 0.8, borderRadius: SmartScreenBase.smPercenWidth,
                    }}/>
                </View>
                <View style={{
                    height: SmartScreenBase.smPercenHeight * 7,
                    justifyContent: 'center',
                }}>
                    <View style={{
                        width: SmartScreenBase.smPercenHeight * 6, height: SmartScreenBase.smPercenHeight * 6,
                        backgroundColor: '#2d2d2d', borderRadius: SmartScreenBase.smPercenHeight * 100,
                        alignItems: 'center', justifyContent: 'center'
                    }}>
                        <Text style={{color: '#fff', fontSize: SmartScreenBase.smPercenWidth * 3}}>{time}</Text>
                    </View>
                </View>
            </View>
        )
    }, [props.timeLearning, props.maxValue]);

    const _chart = () => {
        return (
            <View style={{position: 'absolute', top: 0, bottom: 0, right: 0, left: SmartScreenBase.smPercenWidth * 22}}>
                <FlatList
                    data={props.timeLearning}
                    keyExtractor={_keyExtractor}
                    renderItem={_renderItem}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        )
    };

    return (
        <View style={{
            flex: 1,
            marginHorizontal: SmartScreenBase.smPercenWidth * 2,
            marginTop: SmartScreenBase.smPercenHeight
        }}>
            {_background}
            {_chart()}
        </View>
    );
};

export default TimeLearning;
