import React, {useMemo, useCallback, memo} from 'react';
import {
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Image, ActivityIndicator
} from 'react-native';
import SmartScreenBase from '../../base/SmartScreenBase';
import API from "../../API/APIConstant";

const ExerciseNotDoneYet = memo((props) => {
    const _renderItem = useCallback(({item, index}) => {
        const time = item.update_submit_time ? item.update_submit_time.split(' ') : item.create_submit_time ? item.create_submit_time.split(' ') : '';
        let date = new Date(time[0] + 'T' + time[1]);
        const avatar = item.to_avatar ? API.urlAvatar + item.to_avatar : item.male ? 'gv_liststudent_07' : 'gv_liststudent_09';
        return (
            <View
                style={{
                    width: '100%',
                    padding: SmartScreenBase.smPercenWidth * 2,
                    backgroundColor: 'white',
                    borderRadius: SmartScreenBase.smPercenWidth * 3,
                    flexDirection: 'row',
                    marginTop: SmartScreenBase.smPercenHeight,
                    paddingVertical: SmartScreenBase.smPercenHeight * 2.5
                }}>
                <View
                    style={{
                        alignItems: 'center',
                        width: SmartScreenBase.smPercenWidth * 25,
                    }}>
                    <Image
                        source={{uri: avatar}}
                        style={{
                            width: SmartScreenBase.smPercenWidth * 18,
                            height: SmartScreenBase.smPercenWidth * 18,
                            borderRadius: SmartScreenBase.smPercenWidth * 100
                        }}
                    />
                </View>
                <View style={{width: SmartScreenBase.smPercenWidth * 60}}>
                    <View style={{flex: 1}}>
                        <Text
                            style={{
                                fontWeight: '600',
                                color: 'black',
                                fontSize: SmartScreenBase.smPercenWidth * 5,
                            }}>
                            {item.to_fullname || item.to_username}
                        </Text>
                    </View>
                    <View style={{flex: 1}}>
                        {
                            (item.update_submit_time || item.create_submit_time) &&
                            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                                <Image
                                    style={{
                                        width: SmartScreenBase.smPercenWidth * 5,
                                        height: SmartScreenBase.smPercenWidth * 5,
                                    }}
                                    resizeMode={'contain'}
                                    source={{uri: 'lesson_vocab_image11'}}
                                />
                                <Text
                                    style={{
                                        fontWeight: '400',
                                        color: 'gray',
                                        marginLeft: SmartScreenBase.smPercenWidth * 2,
                                        fontSize: SmartScreenBase.smPercenWidth * 4,
                                    }}>
                                    Nộp
                                    vào {`${date.getHours()}h${date.getMinutes()}' - ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}
                                </Text>
                            </View>
                        }
                    </View>
                </View>
                <View
                    style={{
                        position: 'absolute',
                        top: SmartScreenBase.smPercenHeight,
                        right: SmartScreenBase.smPercenWidth * 2,
                    }}>
                    {item.sending ?
                        <View style={{margin: SmartScreenBase.smPercenHeight * 2}}>
                            <ActivityIndicator/>
                        </View>
                        :
                        item.remind == false ?
                            <TouchableOpacity
                                onPress={() => props._sendToRemindStudent(item.user_received_id, item.id, index)}
                                style={{
                                    width: SmartScreenBase.smPercenWidth * 17,
                                    padding: SmartScreenBase.smPercenWidth * 1.2,
                                    alignItems: 'center',
                                    borderRadius: 5,
                                    backgroundColor: '#dc4630',
                                    marginTop: SmartScreenBase.smPercenHeight * 1.5
                                }}
                            >
                                <Text
                                    style={{
                                        fontSize: SmartScreenBase.smPercenWidth * 2.8,
                                        fontWeight: '500',
                                        color: 'white',
                                    }}>
                                    Nhắc nhở
                                </Text>
                            </TouchableOpacity> :
                            <Image
                                source={{uri: 'teacher_reminded'}}
                                style={{
                                    width: SmartScreenBase.smPercenWidth * 20,
                                    height: SmartScreenBase.smPercenWidth * 10
                                }}
                                resizeMode={'contain'}
                            />
                    }
                </View>
            </View>
        );
    },[]);

    const _renderFlatList = () => {
        return (
            <FlatList
                data={props.dataExerciseNotDone}
                renderItem={_renderItem}
                keyExtractor={(item, index) => {
                    return item.toString() + index.toString();
                }}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            />
        )
    };

    return (
        <View style={{
            flex: 1,
            paddingHorizontal: SmartScreenBase.smPercenWidth * 5,
            paddingVertical: SmartScreenBase.smPercenHeight * 2
        }}>
            {_renderFlatList()}
        </View>
    );
}, (prevProps, nextProps) => {
    return prevProps.dataExerciseNotDone === nextProps.dataExerciseNotDone
});

export default ExerciseNotDoneYet;
