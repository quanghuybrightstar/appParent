import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    Dimensions,
    TouchableOpacity
} from 'react-native';
import LessonBase from '../../../../../base/LessonBase';
const { width, height } = Dimensions.get('window');
import styles from './style';

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
                            let tran = item.replace(/(?:\r\n|\r|\n)/g, ' ');
                            // console.log(tran);
                            return (

                                <TouchableOpacity 
                                key={index}
                                onLongPress={() => LessonBase.goTranslate(item)}>
                                    <Text style={styles.titleQuestion}>{tran} </Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>

            </View>
            <View style={styles.viewLeft}>
                <View style={styles.viewRight}>
                    {
                        props.checkTest != 'làm lại' ?
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                {
                                    props.item.data.map((value, number) => {
                                        
                                        return (
                                            <View 
                                            key={number}
                                            style={styles.viewItemFlasList}>
                                                {
                                                    value.text2.map((item, index) => {
                                                        if (item != '') {
                                                            return (
                                                                <TouchableOpacity 
                                                                key={index}
                                                                onLongPress={() => LessonBase.goTranslate(item)}>
                                                                    <Text style={styles.titleQuestion}> {item} </Text>
                                                                </TouchableOpacity>
                                                            )
                                                        }
                                                    })
                                                }
                                                {console.log("=====value", number,value)}
                                                {
                                                    !value.disabled ?
                                                        <View style={[styles.viewTextInput, { backgroundColor: value.color }]}>
                                                            <View style={styles.viewNumber}>
                                                    <Text style={styles.titleInput}>{props.index+1}</Text>
                                                </View>
                                                            <TextInput
                                                                style={[styles.input]}
                                                                multiline={true}
                                                                returnKeyType="done"
                                                                blurOnSubmit={true}
                                                                autoCorrect={false}
                                                                onChangeText={(text) => { _changeText(props.index, text, number) }}
                                                                value={value.value ? value.value : ''}
                                                            />
                                                        </View>
                                                        :
                                                        <View style={[styles.viewTextInput, { backgroundColor: value.color }]}>
                                                            {/* <View style={styles.viewNumber}>
                                                    <Text style={styles.titleInput}>{value.text}</Text>
                                                </View> */}
                                                            <Text style={[styles.textBox, { paddingTop: 5 }]}>{value.value}</Text>
                                                        </View>
                                                }
                                                {/* <View style={{flexDirection:'row'}}> */}
                                                {
                                                    props.item.text3.map((item, index) => {
                                                        return (
                                                            <TouchableOpacity onLongPress={() => LessonBase.goTranslate(item)}>
                                                                <Text style={styles.titleQuestion}>{item} </Text>
                                                            </TouchableOpacity>
                                                        )
                                                    })
                                                }
                                                {/* </View> */}
                                            </View>
                                        )
                                    })
                                }

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
                                                            <TouchableOpacity >
                                                                <Text style={styles.titleQuestion}> {item} </Text>
                                                            </TouchableOpacity>
                                                        )
                                                    })
                                                }
                                                <View style={[styles.viewTextInput, { backgroundColor: value.color }]}>
                                                    {/* <View style={styles.viewNumber}>
                                                    <Text style={styles.titleInput}>{value.text}</Text>
                                                </View> */}
                                                    <Text style={[styles.textBox, { paddingTop: 5 }]}>{value.value}</Text>
                                                </View>
                                                {
                                                    props.item.text3.map((item, index) => {
                                                        return (
                                                            <TouchableOpacity >
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

                                </View> */}
                            </View>
                    }
                </View>
            </View>

        </View>
    )
}
export default FlatListQuestion