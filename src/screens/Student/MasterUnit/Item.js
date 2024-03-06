import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import styles from './styles';
import LinearGradient from 'react-native-linear-gradient';
import FontBase from '../../../base/FontBase';
import {ICON_PASS, ICON_FAIL} from '../../../../src/assets/index';
import SmartScreenBase from '../../../base/SmartScreenBase';
import LogBase from '../../../base/LogBase';

const Item = ({item, onPressItem, navigation, class_id}) => {

    const getTypeName = (type) => {
        if(type=="grammar"){
            return "Phần ngữ pháp"
        }else if(type=="vocabulary"){
            return "Phần từ vựng"
        }else{
            return "Chưa định nghĩa"
        }
    }

    return (
        <TouchableOpacity onPress={()=>{onPressItem(item);}} style={styles.containerItem}>
            {/* <View style={styles.containerItem}> */}
                <View
                    style={[styles.viewSkill]}
                >
                    <View style={[styles.skillBox, {backgroundColor: item.type === 'improvement' ?  '#F084AD' : '#988cf4' }]}>
                        <Text style={[styles.textSkill]}>{item.type === 'improvement' ? 'Cải thiện' : 'Ôn luyện'}</Text>
                    </View>

                    <View style={styles.viewItemHeaderRight}>
                        <View style={styles.viewResult}>
                            {
                                item.total_attempt > 0 && (
                                    <Image
                                        source={item.learning_result === 'pass' ? ICON_PASS : ICON_FAIL}
                                        style={{width: SmartScreenBase.smPercenWidth * 18,height: SmartScreenBase.smPercenHeight *  4}}
                                        resizeMode="contain"
                                    />
                                )
                            }
                        </View>
                    </View>
                </View>

                <View style={styles.viewContentItem}>
                    <Text style={styles.textTopic}>{item.topic}</Text>
                    <Text style={styles.textNameLesson}>{item.type === 'improvement' ? item.lesson_name : getTypeName(item.looking_back_type)}</Text>
                    {
                        item.type === 'improvement' ? (
                            <Text style={styles.textUnit}>{'Unit ' + item.unit + ' > ' + item.lesson_type + ' > ' + (item.level === 'normal' ? 'medium' : item.level)}</Text>
                        ) : null
                    }
                    <View style={styles.viewLastLine}>
                        <TouchableOpacity style={{height: SmartScreenBase.smPercenWidth*10, width: SmartScreenBase.smPercenWidth*30, justifyContent: "center"}} 
                        disabled={item.total_attempt == 0}
                        onPress={()=>{
                            LogBase.log("=====item",item)
                            var lesson = {
                                lesson_id: item.id,
                                type: item.type,
                                isMasterUnit: true
                            }
                            console.log("=====lesson",lesson)
                            navigation.navigate('HomeworkHistory', {lesson, class_id: class_id});
                        }}
                        >
                            <Text style={[styles.textLevel, { textDecorationLine: item.total_attempt > 0 ? 'underline' : 'none'} ]}>{'Số lần làm: ' + item.total_attempt}</Text>
                        </TouchableOpacity>
                        <View style={styles.viewLevel}>
                            <Text style={styles.textScore}>{'Điểm: ' + (item.score || item.total_attempt > 0 ? item.score : '___')}</Text>
                        </View>
                    </View>
                </View>
            {/* </View> */}
        </TouchableOpacity>
    );
};

export default Item;
