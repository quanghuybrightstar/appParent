import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    ImageBackground,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Image,
    Modal,
    Keyboard,
    StyleSheet,
    TextInput,
    Alert,
    ScrollView
} from 'react-native';
import stylesApp from '../styleApp/stylesApp';
import SmartScreenBase from '../base/SmartScreenBase';
import Header from './Header';
import API from '../../API/APIConstant';
import axios from "axios";
import LoadingScreen from '../../screens/LoadingScreen';
import StyleLesson from '../learn/Lesson/StyleLesson';
import {useSelector} from "react-redux";
import APIBase from '../../base/APIBase';

const smartScreenHeight = SmartScreenBase.smPercenHeight;
const smartScreenWidth = SmartScreenBase.smPercenWidth;
const smartFont = SmartScreenBase.smFontSize;

const Writing = ({navigation, route}) => {

    // const { id, exercise_name, type } = route.params
    const id = navigation.getParam('id');
    const exercise_name = navigation.getParam('exercise_name');
    const type = navigation.getParam('type');
    const [textAnswer, setTextAnswer] = useState('');
    const [showText, setShowText] = useState(true);
    const [selected, setSelected] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [dialog, setDialog] = useState(false);
    const [comment, setComment] = useState('');
    const [score, setScore] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [nameExercise, setNameExercise] = useState('');
    const [typeEx, setTypeEx] = useState('');

    useEffect(() => {
        Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.addListener("keyboardDidHide", _keyboardDidHide);

        // cleanup function
        return () => {
            Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
            Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
        };
    }, []);

    const _keyboardDidShow = () => {
        setShowText(false)
    };

    const _keyboardDidHide = () => {
        setShowText(true)
    };

    useEffect(() => {
        setTypeEx(type);
        _getDetailsExam();
    }, [])

    useEffect(() => {
        if (typeEx === 2) {
            setSelected(false);
        } else {
            setSelected(true);
        }
    }, [typeEx])

    const _getDetailsExam = async () => {
        const url = API.baseurl + API.homeworkDetail + id;
        const headers = {
            'Content-Type': 'application/json',
            'jwt_token': APIBase.jwt_token,
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA=='
        };
        try {
            const res = await axios({method: 'get', url, headers});
            let data = res.data;
            setIsLoading(false);
            if (data.status) {
                let sc = data.exercise_data.score ?? '';
                let cm = data.user_exercise_answer.comment ?? '';
                let dataExercise = data.user_exercise_answer.data_exercise;
                dataExercise = JSON.parse(dataExercise);
                setNameExercise(dataExercise.data_question[0].list_option[0].group_content);
                setScore(sc);
                setComment(cm);
                setTextAnswer(data.resource_data.content);
            } else {
                Alert.alert('Thông báo', data.msg, [
                    {text: 'Đồng ý', style: 'cancel'}
                ]);
            }
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    };

    const _setSelected = () => {
        if (!selected && !dialog) {
            setShowModal(true);
        }
        setSelected(!selected);
    }

    const _saveResultHomework = async () => {
        setIsLoading(true)
        const url = API.baseurl + API.saveResultHomework;
        const headers = {
            'Content-Type': 'application/json',
            'jwt_token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImFkbWluIiwidGltZV9sb2dpbiI6MTU3ODkwNzQyM30.CFZyO9a-qBmyI8Q25AqGNd1nxWn1SO5TMC_yBxjgWCA',
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA=='
        };
        try {
            let data = {};
            data['user_exercise_id'] = id;
            data['score'] = score;
            data['comment'] = comment;
            const res = await axios({method: 'put', url, headers, data});
            let dataReturn = res.data;
            setIsLoading(false);
            if (dataReturn.status) {
                navigation.navigate('BottomTeacher');
            } else {
                Alert.alert('Thông báo', dataReturn.msg, [
                    {text: 'Đồng ý', style: 'cancel'}
                ]);
            }
        } catch (error) {
            setIsLoading(false);
            Alert.alert('Thông báo', error.response.data.msg, [
                {text: 'Đồng ý', style: 'cancel'}
            ]);
            console.log(error);
        }
    };

    const _renderBtnWait = () => {
        return (
            <View style={{
                width: smartScreenWidth * 100,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row'
            }}>
                <TouchableOpacity style={{
                    margin: smartScreenHeight * 3,
                    width: smartScreenWidth * 35,
                    backgroundColor: '#01283a',
                    borderRadius: smartScreenWidth * 15
                }}
                                  onPress={() => setTypeEx(2)}
                >
                    <Text style={{
                        color: '#fff',
                        textAlign: 'center',
                        padding: smartScreenHeight * 2,
                        fontWeight: 'bold'
                    }}>Chấm lại</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{
                    margin: smartScreenHeight * 3,
                    width: smartScreenWidth * 35,
                    backgroundColor: '#01283a',
                    borderRadius: smartScreenWidth * 15
                }}
                                  onPress={() => _acceptAmicaResult()}
                >
                    <Text style={{
                        color: '#fff',
                        textAlign: 'center',
                        padding: smartScreenHeight * 2,
                        fontWeight: 'bold'
                    }}>Đồng ý</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const _renderBtnNotMark = () => {
        return (
            <View style={{width: smartScreenWidth * 100, justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity style={{
                    margin: smartScreenHeight * 3,
                    width: smartScreenWidth * 35,
                    backgroundColor: '#01283a',
                    borderRadius: smartScreenWidth * 15
                }}
                                  onPress={() => _confirm()}
                >
                    <Text style={{
                        color: '#fff',
                        textAlign: 'center',
                        padding: smartScreenHeight * 2,
                        fontWeight: 'bold'
                    }}>Xong</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const _renderMarked = () => {
        return (
            <View style={{width: smartScreenWidth * 100, justifyContent: 'center', alignItems: 'center'}}>
                <TouchableOpacity style={{
                    margin: smartScreenHeight * 3,
                    width: smartScreenWidth * 35,
                    backgroundColor: '#01283a',
                    borderRadius: smartScreenWidth * 15
                }}
                                  onPress={() => setTypeEx(2)}
                >
                    <Text style={{
                        color: '#fff',
                        textAlign: 'center',
                        padding: smartScreenHeight * 2,
                        fontWeight: 'bold'
                    }}>Sửa</Text>
                </TouchableOpacity>
            </View>
        )
    }

    const _confirm = () => {
        if (type === 1 || type === 3) {
            _saveResultHomework();
        } else {
            if (!selected) {
                _saveResultHomework();
            } else {
                _requestAmica();
            }
        }
    }

    const _requestAmica = async () => {
        setIsLoading(true);
        const url = API.baseurl + API.requestAmica;
        const headers = {
            'Content-Type': 'application/json',
            'jwt_token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImFkbWluIiwidGltZV9sb2dpbiI6MTU3ODkwNzQyM30.CFZyO9a-qBmyI8Q25AqGNd1nxWn1SO5TMC_yBxjgWCA',
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA=='
        };
        try {
            let data = {};
            let checkBox = [];
            checkBox.push(id);
            data['user_exercise_id'] = JSON.stringify(checkBox);
            const res = await axios({method: 'put', url, headers, data});
            let dataRt = res.data;
            if (dataRt.status) {
                navigation.goBack();
            } else {
				Alert.alert('Thông báo', dataRt.msg, [
					{text: 'Đồng ý', style: 'cancel'}
				]);
            }
            // console.log(dataRt);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            console.log(error.response.data);
        }
    }

    return (
        <ImageBackground
            source={{uri: 'imagebackgroundlesson'}}
            imageStyle={stylesApp.ImageBackGround}
            style={{flex: 1}}>
            {
                showModal
                    ?
                    <View style={{
                        flex: 1,
                        backgroundColor: '#00000060',
                        position: 'absolute',
                        zIndex: 11,
                        height: smartScreenHeight * 100,
                        width: smartScreenWidth * 100
                    }}></View>
                    :
                    null
            }
            <Header goBack={() => navigation.goBack()} exercise_name={exercise_name} name_exercise={nameExercise}/>
            {
                isLoading
                    ?
                    <LoadingScreen/>
                    :
                    null
            }
            <KeyboardAvoidingView
                behavior={Platform.OS == "ios" ? "padding" : "height"}
                style={styles.container}
            >
                <View style={styles.inner}>
                    <View style={{flex: 3}}>
                        <ScrollView style={{flex: 1, backgroundColor: '#e8f6f8', borderRadius: smartScreenWidth * 5}}>
                            <Text style={{padding: smartScreenWidth * 3}}>
                                {textAnswer}
                            </Text>
                        </ScrollView>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row', marginTop: smartScreenHeight * 2}}>
                        <View style={{
                            flex: 1.5,
                            backgroundColor: '#e8f6f8',
                            borderRadius: smartScreenWidth * 5,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            {
                                showText
                                    ?
                                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                        <Text style={{fontWeight: 'bold'}}>
                                            Điểm :
                                        </Text>
                                    </View>
                                    :
                                    null
                            }
                            <View style={{flex: 1.5}}>
                                <View style={{
                                    borderBottomColor: '#000',
                                    borderBottomWidth: typeEx === 2 ? 1 : 0,
                                    marginBottom: smartScreenHeight
                                }}>
                                    <TextInput
                                        style={{
                                            color: '#dd0a0a',
                                            fontSize: smartFont * 70,
                                            textAlign: 'center',
                                            width: smartScreenWidth * 25,
                                            fontWeight: 'bold', ...Platform.select({android: {padding: -SmartScreenBase.smPercenHeight}})
                                        }}
                                        value={score}
                                        onChangeText={(text) => setScore(text)}
                                        editable={!selected ? true : false}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{
                            flex: 2.5,
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                            justifyContent: 'flex-end'
                        }}>
                            {
                                type === 2
                                    ?
                                    <TouchableWithoutFeedback onPress={() => _setSelected()}>
                                        <View style={{
                                            width: SmartScreenBase.smPercenWidth * 6,
                                            height: SmartScreenBase.smPercenWidth * 6,
                                            marginRight: SmartScreenBase.smPercenWidth * 3,
                                        }}>
                                            <Image style={{
                                                width: SmartScreenBase.smPercenWidth * 6,
                                                height: SmartScreenBase.smPercenWidth * 6,
                                                tintColor: '#fff'
                                            }}
                                                   resizeMode={'contain'}
                                                   source={{uri: 'gv_55'}}/>
                                            {
                                                selected
                                                    ?
                                                    <Image
                                                        style={{
                                                            width: SmartScreenBase.smPercenWidth * 6,
                                                            height: SmartScreenBase.smPercenWidth * 6,
                                                            position: 'absolute',
                                                            bottom: 3,
                                                        }}
                                                        resizeMode={'contain'}
                                                        source={{uri: 'gv_56'}}
                                                    />
                                                    :
                                                    null
                                            }
                                        </View>
                                    </TouchableWithoutFeedback>
                                    : null
                            }
                            {
                                type === 2
                                    ?
                                    <Text style={{color: '#fff', fontSize: smartFont * 50}}>Nhờ Amica Chấm</Text>
                                    :
                                    type === 3
                                        ?
                                        <View style={{
                                            borderWidth: 1,
                                            borderColor: '#d9e021',
                                            borderRadius: smartScreenWidth
                                        }}>
                                            <Text style={{
                                                color: '#d9e021',
                                                fontSize: smartFont * 50,
                                                padding: smartScreenWidth,
                                                fontWeight: 'bold'
                                            }}>Amica đã chấm</Text>
                                        </View>
                                        :
                                        null
                            }
                        </View>
                    </View>
                    <View style={{
                        flex: 2,
                        marginTop: smartScreenHeight * 2,
                        backgroundColor: '#e8f6f8',
                        borderRadius: smartScreenWidth * 5
                    }}>
                        <TextInput
                            placeholder='Lời nhận xét'
                            multiline
                            numberOfLines={4}
                            style={{margin: smartScreenHeight * 2}}
                            value={comment}
                            onChangeText={(text) => setComment(text)}
                            editable={!selected ? true : false}
                        />

                    </View>
                </View>
            </KeyboardAvoidingView>
            {
                typeEx === 1
                    ?
                    _renderMarked()
                    :
                    typeEx === 2
                        ?
                        _renderBtnNotMark()
                        :
                        _renderBtnWait()
            }
            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
            >
                <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{
                        width: smartScreenWidth * 80,
                        backgroundColor: '#fff',
                        borderRadius: smartScreenWidth * 5
                    }}>
                        <View style={{justifyContent: 'center', alignItems: 'center', margin: smartScreenHeight * 3}}>
                            <Text style={{fontWeight: 'bold', fontSize: smartFont * 60}}>Thông báo</Text>
                            <Text style={{
                                textAlign: 'center',
                                paddingTop: smartScreenHeight * 3,
                                paddingBottom: smartScreenHeight * 3
                            }}>Bài tập này đã chuyển cho Amica chấm xin hãy chờ</Text>
                            <TouchableOpacity
                                style={{
                                    width: smartScreenWidth * 30,
                                    borderRadius: smartScreenWidth * 2,
                                    backgroundColor: '#ed8a22',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}
                                onPress={() => setShowModal(false)}
                            >
                                <Text style={{color: '#fff', padding: smartScreenHeight, fontWeight: 'bold'}}>
                                    Đồng ý
                                </Text>
                            </TouchableOpacity>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'flex-end',
                                marginTop: smartScreenHeight * 3
                            }}>
                                <TouchableWithoutFeedback onPress={() => setDialog(!dialog)}>
                                    <View style={{
                                        width: SmartScreenBase.smPercenWidth * 6,
                                        height: SmartScreenBase.smPercenWidth * 6,
                                        marginRight: SmartScreenBase.smPercenWidth * 3,
                                    }}>
                                        <Image style={{
                                            width: SmartScreenBase.smPercenWidth * 6,
                                            height: SmartScreenBase.smPercenWidth * 6,
                                        }}
                                               resizeMode={'contain'}
                                               source={{uri: 'gv_55'}}/>
                                        {
                                            dialog
                                                ?
                                                <Image
                                                    style={{
                                                        width: SmartScreenBase.smPercenWidth * 6,
                                                        height: SmartScreenBase.smPercenWidth * 6,
                                                        position: 'absolute',
                                                        bottom: 3,
                                                    }}
                                                    resizeMode={'contain'}
                                                    source={{uri: 'gv_56'}}
                                                />
                                                :
                                                null
                                        }
                                    </View>
                                </TouchableWithoutFeedback>
                                <Text>Không nhắc lại dialog này nữa!</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: smartScreenHeight * 5
    },
    inner: {
        flex: 1,
        paddingHorizontal: smartScreenHeight * 3
    },
});

export default Writing;
