import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
import styles from './style';
import LessonBase from '../../../../../base/LessonBase';
import SmartScreenBase from '../../../../../base/SmartScreenBase';

const FlatListQuestion = (props) => {
    const [Question, setQuestion] = useState({});
    const [loading, setLoading] = useState(false);
    const [dataCheck, setDataCheck] = useState([])
    useEffect(() => {
        // let array = trimQuestion(props.item.row_2)
        setQuestion(props.item.data)
        setLoading(true)
    }, []);

    const _changeText = async (index, text, id) => {
        await props.checkValue(index, text, id)
    }
    return (
        loading &&
        <View style={styles.container}>
            <View style={styles.viewLeft}>
                <View style={styles.viewItemFlasList}>
                    {
                        props.item.textQ.map((item, index) => {
                            return (
                                <TouchableOpacity onLongPress={() => LessonBase.goTranslate(item)}>
                                    <Text style={styles.titleQuestion}>{item} </Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>

            </View>
            <View style={styles.viewRight} >
                {
                    props.checkTest != 'làm lại' ?
                        <View>
                            {
                                props.item.data.map((value, number) => {
                                    // console.log("=====value1:")
                                    // console.log(value)
                                    return (
                                        <View style={styles.viewItemFlasList} >
                                            {
                                                value.text2.map((item, index) => {
                                                    return (
                                                        <TouchableOpacity onLongPress={() => LessonBase.goTranslate(item)}>
                                                            <Text style={{...styles.titleQuestion}}>{item} </Text>
                                                        </TouchableOpacity>
                                                    )
                                                })
                                            }
                                            <View style={[styles.viewTextInput, { backgroundColor: props.item.color}]}>
                                                <View style={styles.viewNumber}>
                                                    <Text style={styles.titleInput}>{props.index+1} </Text>
                                                </View>
                                                <TextInput
                                                    editable={!props.item.status}
                                                    style={[styles.input,{color:'black', minWidth: SmartScreenBase.smPercenWidth*10}]}
                                                    multiline={true}
                                                    returnKeyType="done"
                                                    blurOnSubmit={true}
                                                    onChangeText={(text) => { 
                                                        _changeText(props.index, text, number); 
                                                    }}
                                                    value={value.value ? value.value : ''}
                                                />
                                            </View>
                                            {
                                                props.item.text3.map((item, index) => {
                                                    return (
                                                        <TouchableOpacity onLongPress={() => LessonBase.goTranslate(item)}>
                                                            <Text style={styles.titleQuestion}>{item} </Text>
                                                        </TouchableOpacity>
                                                    )
                                                })
                                            }
                                        </View>
                                    )
                                })
                            }
                            {/* <View style={styles.viewItemFlasList}>
                                {
                                    props.item.text3.map((item, index) => {
                                        return (
                                            <TouchableOpacity onLongPress={() => props.showHideWebView(item)}>
                                                <Text style={styles.titleQuestion}>{item} </Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View> */}
                        </View>
                        :
                        <View>
                            {
                                props.item.data.map((value, number) => {
                                    return (
                                        <View style={styles.viewItemFlasList}>
                                            {
                                                value.text2.map((item, index) => {
                                                    return (
                                                        <TouchableOpacity onLongPress={() => LessonBase.goTranslate(item)}>
                                                            <Text style={styles.titleQuestion}>{item} </Text>
                                                        </TouchableOpacity>
                                                    )
                                                })
                                            }
                                            <View style={[styles.viewTextInput, { backgroundColor: props.item.color }]}>
                                                <View style={styles.viewNumber}>
                                                    <Text style={styles.titleInput}>{props.index+1}</Text>
                                                </View>
                                                <Text style={[styles.input, { paddingTop: 5 }]}>{value.value}</Text>
                                            </View>
                                            {
                                                props.item.text3.map((item, index) => {
                                                    return (
                                                        <TouchableOpacity onLongPress={() => LessonBase.goTranslate(item)}>
                                                            <Text style={styles.titleQuestion}>{item} </Text>
                                                        </TouchableOpacity>
                                                    )
                                                })
                                            }
                                        </View>
                                    )
                                })
                            }
                            {/* <View style={styles.viewItemFlasList}>
                                {
                                    props.item.text3.map((item, index) => {
                                        return (
                                            <TouchableOpacity onLongPress={() => props.showHideWebView(item)}>
                                                <Text style={styles.titleQuestion}>{item} </Text>
                                            </TouchableOpacity>
                                        )
                                    })
                                }
                            </View> */}
                        </View>
                }
            </View>
        </View>
    )
}
export default FlatListQuestion