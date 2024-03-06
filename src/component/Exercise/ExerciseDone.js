import React, {useCallback, memo} from 'react';
import {Text, View, FlatList, Image} from 'react-native';
import SmartScreenBase from "../../base/SmartScreenBase";
import API from "../../API/APIConstant";

const ExerciseDone = memo((props) => {
    const _renderItem = useCallback(({item}) => {
        const time = item.update_submit_time ? item.update_submit_time.split(' ') : item.create_submit_time ? item.create_submit_time.split(' ') : '';
        let date = new Date(time[0] + 'T' + time[1]);
        const avatar = item.to_avatar ? API.urlAvatar + item.to_avatar : item.male ? 'gv_liststudent_07' : 'gv_liststudent_09';
        return (
            <View style={{
                width: '100%',
                padding: SmartScreenBase.smPercenWidth * 2,
                backgroundColor: "white",
                borderRadius: SmartScreenBase.smPercenWidth * 3,
                flexDirection: "row",
                marginTop: SmartScreenBase.smPercenHeight,
                paddingVertical: SmartScreenBase.smPercenHeight * 2.5
            }}>
                <View style={{alignItems: "center", width: SmartScreenBase.smPercenWidth * 25}}>
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
                        <Text style={{
                            fontWeight: "600",
                            color: "black",
                            fontSize: SmartScreenBase.smPercenWidth * 5
                        }}>{item.to_fullname || item.to_username}</Text>
                    </View>
                    <View style={{flex: 1}}>
                        {
                            (item.update_submit_time || item.create_submit_time) &&
                            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                                <Image style={{
                                    width: SmartScreenBase.smPercenWidth * 5,
                                    height: SmartScreenBase.smPercenWidth * 5,
                                }}
                                       resizeMode={'contain'}
                                       source={{uri: "student_home_image5"}}/>
                                <Text style={{
                                    fontWeight: "400",
                                    color: "#737373",
                                    marginLeft: SmartScreenBase.smPercenWidth * 2,
                                    fontSize: SmartScreenBase.smPercenWidth * 3.5
                                }}>Nộp
                                    vào {`${date.getHours()}h${date.getMinutes()}' - ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`}</Text>
                            </View>
                        }
                    </View>

                </View>
            </View>
        )
    }, []);

    const _keyExtractor = useCallback((item, index) => {
        return item.toString() + index.toString();
    }, []);

    const _renderFlatList = () => {
        return (
            <FlatList data={props.dataExerciseDone} renderItem={_renderItem}
                      keyExtractor={_keyExtractor}
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
    return prevProps.dataExerciseDone === nextProps.dataExerciseDone
});

export default ExerciseDone;
