import React, {useState, useEffect, useRef, createRef} from 'react';
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
    Button,
    ScrollView,
    FlatList,
    Platform,
    Alert
} from 'react-native';
import stylesApp from '../styleApp/stylesApp';
import SmartScreenBase from '../base/SmartScreenBase';
import Header from './Header';
import API from '../../API/APIConstant';
import axios from 'axios';
import LoadingScreen from '../../screens/LoadingScreen';
import StyleLesson from '../learn/Lesson/StyleLesson';
import {useSelector} from 'react-redux';
import styles from './styles';
import HeaderNew from './HeaderNew';
import APIBase from '../../base/APIBase';

let commentTxt = '', userExerciseId, indexIssue = 0, textIssue, score = [];

const WritingNew = ({navigation}) => {

    // const { id, exercise_name, type } = route.params
    const id = navigation.getParam('id');
    const exercise_name = navigation.getParam('exercise_name');
    const type = navigation.getParam('type');
    const [textAnswer, setTextAnswer] = useState('');
    const [showText, setShowText] = useState(true);
    const [selected, setSelected] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [modalVisibleIssue, setModalVisibleIssue] = useState(false);
    const [totalScore, setTotalScore] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [comment, setComment] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [modalVisibleTeaching, setModalVisibleTeaching] = useState(false);
    const [modalVisibleCriteria, setModalVisibleCriteria] = useState(false);
    const [criteria, setCriteria] = useState([]);
    const [proportion, setProportion] = useState([]);
    const [proportionModal, setProportionModal] = useState([]);
    const [applyOnly, setApplyOnly] = useState(true);
    const [applyAll, setApplyAll] = useState(false);
    const [dataAnswer, setDataAnswer] = useState('');
    const [dataAnswerArr, setDataAnswerArr] = useState([]);
    const [aiWriting, setAIWriting] = useState(false);
    const [showBtn, setShowBtn] = useState(false);
    const [listIssue, setListIssue] = useState([]);
    const [dataSplit, setDataSplit] = useState([]);
    const [selection, setSelection] = useState(0);

    useEffect(() => {
        _getDetailsExam();
        _getCriteria();
    }, []);

    const _getDetailsExam = async () => {
        const url = API.baseurl + API.homeworkDetail + id;
        const headers = {
            'Content-Type': 'application/json',
            'jwt_token': APIBase.jwt_token,
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
        };
        try {
            const res = await axios({method: 'get', url, headers});
            let data = res.data;
            setIsLoading(false);
            if (data.status) {
                setComment(data.user_exercise_answer.comment);
                let dataA = 'Often considered the best player in the world and widely regarded as one of the greatest players of all time';
                setDataAnswer(dataA);
                let dataS = [...dataSplit];
                dataA.split('').forEach((item, index) => {
                    let dataP = {};
                    dataP['text'] = item;
                    dataP['position'] = index;
                    dataP['deleted'] = false;
                    index++;
                    dataS.push(dataP);
                });
                setDataSplit(dataS);
                userExerciseId = data.user_exercise_answer.user_exercise_id;
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

    const _sendStudent = async () => {
        setIsLoading(true);
        const url = API.baseurl + API.saveMarkWriting;
        const headers = {
            'Content-Type': 'application/json',
            'jwt_token': APIBase.jwt_token,
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
        };
        let data = {};
        data['exercise_id'] = applyAll ? 0 : id;
        let dataC = [];
        for (let i = 0; i < criteria.length; i++) {
            let dataP = {};
            dataP['text'] = criteria[i];
            dataP['proportion'] = proportion[i];
            dataP['score'] = score[i];
            dataC.push(dataP);
        }
        data['user_exercise_id'] = userExerciseId;
        data['score'] = totalScore;
        data['comment'] = comment;
        try {
            const res = await axios({method: 'get', url, headers});
            let data = res.data;
            setIsLoading(false);
            // if (data.status) {
            //     setComment(data.user_exercise_answer.comment);
            //     setDataAnswer(data.resource_data.content);
            // } else {
            //     alert(data.msg);
            // }
        } catch (error) {
            setIsLoading(false);
            console.log(error);
        }
    };

    const _getCriteria = async () => {
        const url = API.baseurl + API.getCriteria + id;
        const headers = {
            'Content-Type': 'application/json',
            'jwt_token': APIBase.jwt_token,
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
        };
        try {
            const res = await axios({method: 'get', url, headers});
            let dataReturn = res.data;
            setIsLoading(false);
            // console.log('dataReturn', dataReturn);
            if (dataReturn.status) {
                let c = [];
                let p = [];
                let pM = [];
                let s = [];
                dataReturn.data_criteria.forEach((item) => {
                    c.push(item.text);
                    p.push(parseInt(item.proportion));
                    score.push(0);
                });
                pM = p;
                setCriteria(c);
                setProportion(p);
                setProportionModal(pM);
            }
        } catch (error) {
            Alert.alert('Thông báo', error.response.data.msg, [
                {text: 'Đồng ý', style: 'cancel'}
            ]);
            setIsLoading(false);
            console.log(error);
        }
    };

    const _aiCheckWriting = async () => {
        setIsLoading(true);
        const url = API.baseurl + API.aiCheckWriting;
        const headers = {
            'Content-Type': 'application/json',
            'jwt_token': APIBase.jwt_token,
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
        };
        let data = {};
        data['content'] = dataAnswer;
        try {
            const res = await axios({method: 'post', url, headers, data});
            let dataReturn = res.data;
            setIsLoading(false);
            // console.log('dataReturn', dataReturn);
            let listIssues = dataReturn.data_check.list_issues;
            let listIs = [...listIssue];
            setListIssue(listIssues);
            let dataAnswerN = dataAnswer;
            let i = 0;
            let dataDemo = [];
            listIssues.forEach(item => {
                let dataP = {};
                let offset = item.offset;
                let length = item.length;
                dataP['first'] = dataAnswer.slice(i, offset);
                i = offset + length;
                dataP['text'] = dataAnswer.slice(offset, i);
                dataP['suggestions'] = item.suggestions;
                dataP['explain'] = item.explain;
                dataP['type'] = item.type;
                dataP['selected'] = item.suggestions[0];
                dataP['accept'] = false;
                dataDemo.push(dataP);
            });
            let dataPs = {};
            dataPs['first'] = dataAnswer.slice(i, dataAnswer.length);
            dataDemo.push(dataPs);
            let dataA = [...dataAnswerArr];
            dataA = dataDemo;
            setDataAnswerArr(dataA);
            setAIWriting(true);
        } catch (error) {
            Alert.alert('Thông báo', error.response.data.msg, [
                {text: 'Đồng ý', style: 'cancel'}
            ]);
            setIsLoading(false);
            console.log(error);
        }
    };

    const _renderItem = ({item, index}) => {
        return (
            <Text style={{
                fontSize: SmartScreenBase.smFontSize * 45,
                padding: SmartScreenBase.smPercenHeight,
            }}>{item}</Text>
        );
    };

    const _renderData = (width, data) => {
        return (
            <View style={{
                ...styles._tc_tt_d,
                width: width,
                height: SmartScreenBase.smPercenHeight * 23,
                backgroundColor: '#fff',
            }}
            >
                <FlatList
                    data={data}
                    renderItem={_renderItem}
                    keyExtractor={(index) => index.toString()}
                    contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
                />
            </View>
        );
    };

    const _renderDataModalCriteria = (width, data) => {
        return (
            <View style={{
                ...styles._tc_tt_d,
                width: width,
                height: SmartScreenBase.smPercenHeight * 23,
                backgroundColor: '#e6e7e8',
                borderRadius: SmartScreenBase.smPercenWidth * 5,
            }}
            >
                <FlatList
                    data={data}
                    renderItem={_renderItem}
                    keyExtractor={(index) => index.toString()}
                    contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
                />
            </View>
        );
    };

    const _renderDataModalProportion = (width, data) => {
        return (
            <View style={{
                ...styles._tc_tt_d,
                width: width,
                height: SmartScreenBase.smPercenHeight * 23,
                backgroundColor: '#e6e7e8',
                borderRadius: SmartScreenBase.smPercenWidth * 5,
            }}
            >
                <FlatList
                    data={proportionModal}
                    renderItem={_renderItemModalCriteria}
                    keyExtractor={(index) => index.toString()}
                    contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
                />
            </View>
        );
    };

    const _onChangeTextCriteria = (text, index) => {
        let c = [...proportionModal];
        c[index] = text ? parseInt(text) : 0;
        setProportionModal(c);
    };

    const _onSubmitEditing = () => {
        let c = [...proportionModal];
        let p = 0;
        c.forEach((item) => {
            p += parseInt(item);
        });
        if (p < 100 || p > 100) {
            c = proportion;
            setProportionModal(c);
            Alert.alert('Thông báo', 'Tổng tỷ trọng phải bằng 100', [
                {text: 'Đồng ý', style: 'cancel'}
            ]);
            return false;
        }
        return true;
    };

    const _renderItemModalCriteria = ({item, index}) => {
        return (
            <TextInput
                style={{
                    width: SmartScreenBase.smPercenWidth * 10,
                    textAlign: 'center',
                    paddingBottom: SmartScreenBase.smPercenHeight * 2,
                }}
                onChangeText={(text) => _onChangeTextCriteria(text, index)}
                value={item ? item.toString() : '0'}
                keyboardType={'numeric'}
                returnKeyType={'done'}
            />

        );
    };

    const _renderViewTc = (text, width) => {
        return (
            <View style={{...styles._tc_tt_d, width}}>
                <Text style={styles.text}>{text}</Text>
            </View>
        );
    };

    const _renderScore = (width, data) => {
        return (
            <View style={{
                ...styles._tc_tt_d,
                width: width,
                height: SmartScreenBase.smPercenHeight * 23,
                backgroundColor: '#fff',
            }}
            >
                <FlatList
                    data={data}
                    // extraData={data}
                    renderItem={_renderItemScore}
                    keyExtractor={(index) => index.toString()}
                    contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}
                />
            </View>
        );
    };

    const _onChangeScore = (text, index) => {
        let c = [...score];
        if (text) {
            if (parseInt(text) < 0 || parseInt(text) > 10) {
                Alert.alert('Thông báo', 'Điểm phải lớn hơn 0 và nhỏ hơn 10', [
                    {text: 'Đồng ý', style: 'cancel'}
                ]);
            } else {
                c[index] = parseInt(text);
                let ttS = 0;
                c.forEach((item, i) => {
                    ttS += item * proportion[i] / 100;
                });
                setTotalScore(ttS);
            }
        } else {
            c[index] = 0;
            let ttS = 0;
            c.forEach((item, i) => {
                ttS += item * proportion[i] / 100;
            });
            setTotalScore(ttS);
        }
        // setScore(c);
    };

    const _renderItemScore = ({item, index}) => {
        return (
            <TextInput
                style={{
                    width: SmartScreenBase.smPercenWidth * 10,
                    textAlign: 'center',
                    padding: SmartScreenBase.smPercenHeight,
                    fontSize: SmartScreenBase.smFontSize * 45,
                }}
                onSubmitEditing={(event) => _onChangeScore(event.nativeEvent.text, index)}
                defaultValue={item ? item.toString() : '0'}
                keyboardType={'numeric'}
                returnKeyType={'done'}
            />

        );
    };

    const _renderButton = (text) => {
        return (
            <View style={styles._btn}>
                <Text style={{fontSize: SmartScreenBase.smFontSize * 45, color: '#fff'}}>{text}</Text>
            </View>
        );
    };

    const _renderIssues = (score, text, borderLeftWidth) => {
        return (
            <View style={{width: '50%', alignItems: 'center', borderLeftWidth}}>
                <Text style={{
                    fontSize: SmartScreenBase.smFontSize * 150,
                    fontWeight: '800',
                    color: '#00283a',
                }}>{score}</Text>
                <Text style={{fontSize: SmartScreenBase.smFontSize * 50}}>{text}</Text>
            </View>
        );
    };

    const _renderButtonModal = (text, backgroundColor) => {
        return (
            <View style={{...styles._btnModal, backgroundColor}}>
                <Text
                    style={{fontSize: SmartScreenBase.smFontSize * 45, color: '#fff', fontWeight: 'bold'}}>{text}</Text>
            </View>
        );
    };

    const _changeInput = () => {
        commentTxt = comment;
        setModalVisible(false);
    };

    const _closeModal = () => {
        setComment(commentTxt);
        setModalVisible(false);
    };

    const _changeCriteria = async () => {
        let rt = _onSubmitEditing();
        if (!rt) {
            return false;
        }
        setModalVisibleCriteria(false);
        setIsLoading(true);
        const url = API.baseurl + API.updateCriteria;
        const headers = {
            'Content-Type': 'application/json',
            'jwt_token': APIBase.jwt_token,
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
        };
        let data = {};
        data['exercise_id'] = applyAll ? 0 : id;
        let dataC = [];
        for (let i = 0; i < criteria.length; i++) {
            let dataP = {};
            dataP['text'] = criteria[i];
            dataP['proportion'] = proportionModal[i];
            dataC.push(dataP);
        }
        data['json_criteria'] = JSON.stringify(dataC);
        try {
            const res = await axios({method: 'put', url, headers, data});
            let dataReturn = res.data;
            setIsLoading(false);
            if (dataReturn.status) {
                let p = [];
                let pM = [];
                dataReturn.data_criteria.forEach((item) => {
                    p.push(parseInt(item.proportion));
                });
                pM = p;
                setProportion(p);
                setProportionModal(pM);
            } else {
                Alert.alert('Thông báo', dataReturn.msg, [
                    {text: 'Đồng ý', style: 'cancel'}
                ]);
            }
        } catch (error) {
            Alert.alert('Thông báo', error.response.data.msg, [
                {text: 'Đồng ý', style: 'cancel'}
            ]);
            setIsLoading(false);
            console.log(error);
        }
    };

    const _renderModal = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={{flex: 1}}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={{
                                fontSize: SmartScreenBase.smFontSize * 60,
                                padding: SmartScreenBase.smPercenHeight,
                            }}>Nhận xét</Text>
                            <View style={styles._b_v}>
                                <TextInput
                                    style={styles._c_t_i}
                                    multiline={true}
                                    placeholder={'Nhận xét của bạn'}
                                    onChangeText={(text) => setComment(text)}
                                    value={comment}
                                />
                            </View>
                            <View style={styles._b_v_2}>
                                <TouchableOpacity onPress={() => _changeInput()}>
                                    {_renderButtonModal('Xong', '#00283a')}
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => _closeModal()}>
                                    {_renderButtonModal('Huỷ', '#ed8a22')}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </Modal>
        );
    };

    const _confirmSuggestion = (item) => {
        let dataDemo = [...dataAnswerArr];
        dataDemo[indexIssue]['selected'] = item;
        dataDemo[indexIssue]['accept'] = true;
        setDataAnswerArr(dataDemo);
        setModalVisibleIssue(false);
        setShowBtn(true);
        setAIWriting(false);
    };

    const _deleteSuggestion = () => {
        setIsLoading(true);
        let listIssues = [...listIssue];
        listIssues.splice(indexIssue, 1);
        indexIssue = listIssues.length ? 0 : -1;
        setListIssue(listIssues);
        let i = 0;
        let dataDemo = [];
        listIssues.forEach(item => {
            let dataP = {};
            let offset = item.offset;
            let length = item.length;
            if (offset && length) {
                dataP['first'] = dataAnswer.slice(i, offset);
                i = offset + length;
                dataP['text'] = dataAnswer.slice(offset, i);
                dataP['suggestions'] = item.suggestions;
                dataP['explain'] = item.explain;
                dataP['type'] = item.type;
                dataP['selected'] = item.suggestions[0];
                dataP['accept'] = false;
                dataDemo.push(dataP);
            }
        });
        let dataPs = {};
        dataPs['first'] = dataAnswer.slice(i, dataAnswer.length);
        dataDemo.push(dataPs);
        let dataA = [...dataAnswerArr];
        dataA = [];
        dataA = dataDemo;
        setDataAnswerArr(dataA);
        setModalVisibleIssue(false);
        setIsLoading(false);
    };

    const _renderModalIssue = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisibleIssue}
            >
                <View style={styles.centeredView}>
                    {
                        dataAnswerArr.length && listIssue.length && dataAnswerArr[indexIssue] && indexIssue !== -1
                            ?
                            <View style={{...styles.modalView_2, paddingVertical: SmartScreenBase.smPercenHeight}}>
                                <View
                                    style={{
                                        width: '95%',
                                        height: SmartScreenBase.smPercenHeight * 7,
                                        backgroundColor: '#017ca4',
                                        borderRadius: SmartScreenBase.smPercenWidth * 2,
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        flexDirection: 'row',
                                        paddingHorizontal: SmartScreenBase.smPercenWidth * 2,
                                    }}
                                >
                                    <Text style={{
                                        color: '#fff',
                                        fontSize: SmartScreenBase.smFontSize * 50,
                                    }}>{dataAnswerArr[indexIssue]['text']}</Text>
                                    <TouchableOpacity onPress={() => _deleteSuggestion()}>
                                        <Image source={{uri: 'wr6'}} resizeMode={'contain'} style={{
                                            width: SmartScreenBase.smPercenWidth * 5,
                                            height: SmartScreenBase.smPercenWidth * 5,
                                        }}/>
                                    </TouchableOpacity>
                                </View>
                                <Text style={{
                                    fontSize: SmartScreenBase.smFontSize * 40,
                                    padding: SmartScreenBase.smPercenWidth * 5,
                                }}>
                                    {dataAnswerArr[indexIssue]['explain']}
                                </Text>
                                <View style={{marginBottom: SmartScreenBase.smPercenHeight * 3}}>
                                    {
                                        dataAnswerArr[indexIssue]['suggestions'].length
                                            ?
                                            dataAnswerArr[indexIssue]['suggestions'].map(item => {
                                                return (
                                                    <View style={{
                                                        flexDirection: 'row',
                                                        width: '80%',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-around',
                                                        marginTop: SmartScreenBase.smPercenHeight,
                                                    }}>
                                                        <Image source={{uri: 'wr5'}}
                                                               resizeMode={'contain'}
                                                               style={{
                                                                   width: SmartScreenBase.smPercenWidth * 10,
                                                                   height: SmartScreenBase.smPercenHeight * 5,
                                                               }}/>
                                                        <TouchableOpacity
                                                            onPress={() => _confirmSuggestion(item)}
                                                            style={{
                                                                width: SmartScreenBase.smPercenWidth * 50,
                                                                height: SmartScreenBase.smPercenHeight * 5,
                                                                justifyContent: 'center',
                                                                borderRadius: SmartScreenBase.smPercenWidth * 40,
                                                                backgroundColor: '#00283a',
                                                            }}
                                                        >
                                                            <Text style={{
                                                                paddingLeft: SmartScreenBase.smPercenWidth * 5,
                                                                fontWeight: 'bold',
                                                                fontSize: SmartScreenBase.smFontSize * 45,
                                                                color: '#f9ed32',
                                                            }}>{item}</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                );
                                            })
                                            :
                                            null
                                    }
                                </View>
                            </View>
                            :
                            null
                    }
                </View>
            </Modal>
        );
    };

    const _renderBtnTeaching = (text) => {
        return (
            <View style={styles._v_btn_t}>
                <Text style={{color: '#fff', fontSize: SmartScreenBase.smFontSize * 45}}>{text}</Text>
            </View>
        );
    };

    const _renderModalTeaching = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisibleTeaching}
            >
                <View style={styles.centeredView}>
                    <View style={styles._v_m_t}>
                        <View style={{
                            paddingHorizontal: SmartScreenBase.smPercenWidth * 10,
                            paddingVertical: SmartScreenBase.smPercenWidth * 5,
                        }}>
                            <Text style={{textAlign: 'center', fontSize: SmartScreenBase.smFontSize * 45}}>
                                Bạn có muốn thêm phần giảng dạy không?
                            </Text>
                        </View>
                        <View style={{
                            width: '100%',
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            marginBottom: SmartScreenBase.smPercenWidth * 5,
                        }}>
                            <TouchableOpacity onPress={() => {
                                setModalVisibleTeaching(false);
                                navigation.navigate('Teaching');
                            }}>
                                {_renderBtnTeaching('Thêm')}
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setModalVisibleTeaching(false)}>
                                {_renderBtnTeaching('Không')}
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    };

    const _applyAll = () => {
        if (!applyAll) {
            setApplyOnly(false);
        } else {
            setApplyOnly(true);
        }
        setApplyAll(!applyAll);
    };

    const _applyOnly = () => {
        if (!applyOnly) {
            setApplyAll(false);
        } else {
            setApplyAll(true);
        }
        setApplyOnly(!applyOnly);
    };

    const _renderModalCriteria = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisibleCriteria}
            >
                <View style={{...styles.centeredView}}>
                    <View style={{...styles._v_c, height: SmartScreenBase.smPercenHeight * 60}}>
                        <View style={styles._v_f_1}>
                            <View style={{margin: SmartScreenBase.smPercenWidth * 2.5, flex: 1}}>
                                <View style={styles._v_tc_tt_d}>
                                    {_renderViewTc('Tiêu chí', '64%')}
                                    {_renderViewTc('Tỷ trọng', '34%')}
                                </View>
                                <View style={{...styles._v_tc_tt_d, marginTop: SmartScreenBase.smPercenHeight}}>
                                    {_renderDataModalCriteria('64%', criteria)}
                                    {_renderDataModalProportion('34%', proportionModal)}
                                </View>
                                <View style={styles._v_a_b}>
                                    <Image source={{uri: 'gv_109'}} resizeMode={'contain'} style={{
                                        width: SmartScreenBase.smPercenWidth * 5,
                                        height: SmartScreenBase.smPercenWidth * 5,
                                    }}/>
                                </View>
                                <View style={{...styles._v_a_b_t, marginTop: SmartScreenBase.smPercenHeight}}>
                                    <View style={styles._v_a_b_t_c}>
                                        <Text style={{fontSize: SmartScreenBase.smFontSize * 40}}>Chỉ áp dụng cho bài
                                            viết này</Text>
                                        <TouchableOpacity
                                            onPress={() => _applyOnly()}
                                        >
                                            <Image source={{uri: 'gv_55'}}
                                                   resizeMode={'contain'}
                                                   style={{
                                                       width: SmartScreenBase.smPercenWidth * 5,
                                                       height: SmartScreenBase.smPercenWidth * 5,
                                                       tintColor: '#000',
                                                   }}/>
                                            {
                                                applyOnly
                                                    ?
                                                    <Image source={{uri: 'gv_56'}}
                                                           resizeMode={'contain'}
                                                           style={{
                                                               width: SmartScreenBase.smPercenWidth * 6,
                                                               height: SmartScreenBase.smPercenWidth * 6,
                                                               position: 'absolute',
                                                               bottom: SmartScreenBase.smPercenWidth,
                                                           }}/>
                                                    :
                                                    null
                                            }
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{...styles._v_a_b_t_c, marginTop: SmartScreenBase.smPercenHeight * 2}}>
                                        <Text style={{fontSize: SmartScreenBase.smFontSize * 40}}>Áp dụng cho tất cả các
                                            bài viết khác</Text>
                                        <TouchableOpacity
                                            onPress={() => _applyAll()}
                                        >
                                            <Image source={{uri: 'gv_55'}}
                                                   resizeMode={'contain'}
                                                   style={{
                                                       width: SmartScreenBase.smPercenWidth * 5,
                                                       height: SmartScreenBase.smPercenWidth * 5,
                                                       tintColor: '#000',
                                                   }}/>
                                            {
                                                applyAll
                                                    ?
                                                    <Image source={{uri: 'gv_56'}}
                                                           resizeMode={'contain'}
                                                           style={{
                                                               width: SmartScreenBase.smPercenWidth * 6,
                                                               height: SmartScreenBase.smPercenWidth * 6,
                                                               position: 'absolute',
                                                               bottom: SmartScreenBase.smPercenWidth,
                                                           }}/>
                                                    :
                                                    null
                                            }
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{...styles._v_a_b_t, marginTop: SmartScreenBase.smPercenHeight * 3}}>
                                    <TouchableOpacity
                                        style={styles._b_t_n_s}
                                        onPress={() => _changeCriteria()}
                                    >
                                        <Text style={styles._t_s}>Lưu</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
        );
    };

    const _ignoreAll = () => {
        setAIWriting(false);
        let dataAn = [...dataAnswerArr];
        dataAn = [];
        setDataAnswerArr(dataAn);
    };

    const _acceptAll = () => {
        let dataDemo = [...dataAnswerArr];
        dataDemo.forEach((item, index) => {
            dataDemo[index]['accept'] = true;
        });
        setDataAnswerArr(dataDemo);
        setAIWriting(false);
    };

    const _chooseSuggestions = (index, text) => {
        indexIssue = index;
        textIssue = text;
        setModalVisibleIssue(true);
    };

    const _ignoreEdit = () => {
        let dataDemo = [...dataAnswerArr];
        dataDemo.forEach((item, index) => {
            dataDemo[index]['accept'] = false;
        });
        setDataAnswerArr(dataDemo);
        setShowBtn(false);
        setAIWriting(true);
    };

    const _acceptEdit = () => {
        let dataDemo = [...dataAnswerArr];
        dataDemo.forEach((item, index) => {
            dataDemo[index]['accept'] = true;
        });
        setDataAnswerArr(dataDemo);
        setShowBtn(false);
        setAIWriting(false);
    };

    const _showEdit = () => {
        setShowEdit(true);
    };

    const scrollViewRef = useRef();

    const keyboardVerticalOffset = - SmartScreenBase.smPercenHeight * 15;

    const _renderTextInput = (item, index) => {
        return (
            <Text style={{
                fontSize: SmartScreenBase.smFontSize * 45,
                color: item.deleted ? 'red' : item.new ? 'green' : '#000',
                textDecorationLine:  item.deleted ? 'line-through' : 'none',
            }}>{item.text}</Text>
        );
    };

    const _onKeyPress = async (e) => {
        let dataS = [...dataSplit];
        if (e.nativeEvent.key === 'Backspace') {
            await dataS.forEach((item, index) => {
                if (index === selection.end - 1) {
                    if (dataS[index]['new']) {
                        dataS.splice(index, 1);
                        return false;
                    } else {
                        dataS[index]['deleted'] = true;
                        return false;
                    }
                }
            });
        } else {
            let dataP = {};
            dataP['text'] = e.nativeEvent.key === 'Enter' ? '\n' : e.nativeEvent.key;
            dataP['position'] = selection.end ;
            dataP['deleted'] = false;
            dataP['new'] = true;
            dataS.splice(selection.end, 0, dataP);
        }
        await setDataSplit(dataS);
    };

    return (
        <ImageBackground
            source={{uri: 'imagebackgroundlesson'}}
            imageStyle={stylesApp.ImageBackGround}
            style={{flex: 1}}>
            <HeaderNew title={'Lionel Danh'} goBack={() => navigation.goBack}
                       showModalCriteria={() => setModalVisibleCriteria(true)}/>
            {isLoading ? <LoadingScreen/> : null}
            <ScrollView
                ref={scrollViewRef}
            >
                <KeyboardAvoidingView
                    behavior={'position'}
                    keyboardVerticalOffset={keyboardVerticalOffset}
                >
                    <View style={styles._v_c_f}>
                        <View style={styles._v_c_f_h}>
                            <View style={styles._v_c_f_c}>
                                {_renderIssues('0', 'GRAMMAR ISSUES', 0)}
                                {_renderIssues('0', 'SPELLING ISSUES', 1)}
                            </View>
                        </View>
                    </View>
                    <View style={styles._v_c}>
                        <View style={styles._v_f}>
                            <View style={{margin: SmartScreenBase.smPercenWidth * 2.5, flex: 1}}>
                                <View style={styles._v_tc_tt_d}>
                                    {_renderViewTc('Tiêu chí', '45%')}
                                    {_renderViewTc('Tỷ trọng', '26%')}
                                    {_renderViewTc('Điểm', '26%')}
                                </View>
                                <View style={{...styles._v_tc_tt_d, marginTop: SmartScreenBase.smPercenHeight}}>
                                    {_renderData('45%', criteria)}
                                    {_renderData('26%', proportion)}
                                    {_renderScore('26%', score)}
                                </View>
                                <View style={{...styles._v_tc_tt_d, marginTop: SmartScreenBase.smPercenHeight}}>
                                    <View style={{...styles._tc_tt_d_2, width: '72%'}}>
                                        <Text style={{
                                            fontSize: SmartScreenBase.smFontSize * 45,
                                            fontWeight: 'bold',
                                        }}>Điểm</Text>
                                    </View>
                                    <View style={{...styles._tc_tt_d_2, width: '26%', alignItems: 'center'}}>
                                        <Text style={{fontSize: SmartScreenBase.smFontSize * 45}}>{totalScore}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    <View style={styles._v_c_2}>
                        <TouchableOpacity
                            onPress={() => setModalVisible(true)}
                            style={{flexDirection: 'row', alignItems: 'flex-end'}}
                        >
                            <Text style={{
                                fontSize: SmartScreenBase.smFontSize * 45,
                                color: '#fff', fontWeight: 'bold',
                            }}>
                                Nhận xét
                            </Text>
                            <Image source={{uri: 'wr3'}} resizeMode={'contain'}
                                   style={{
                                       width: SmartScreenBase.smPercenWidth * 10,
                                       height: SmartScreenBase.smPercenWidth * 5,
                                   }}
                            />
                        </TouchableOpacity>
                        <View style={{
                            maxHeight: SmartScreenBase.smPercenHeight * 15,
                            paddingTop: SmartScreenBase.smPercenHeight,
                        }}>
                            <ScrollView contentContainerStyle={{flexWrap: 'wrap', flexDirection: 'row'}}>
                                <Text style={{fontSize: SmartScreenBase.smFontSize * 45}}>{comment}</Text>
                            </ScrollView>
                        </View>
                    </View>
                    <View style={{
                        ...styles._v_c_3,
                        backgroundColor: aiWriting || showBtn || showEdit ? '#ffffff90' : '#fff',
                    }}>
                        {
                            aiWriting || showBtn || showEdit
                                ?
                                null :
                                <TouchableOpacity
                                    style={{zIndex: 1000}}
                                    onPress={() => _aiCheckWriting()}
                                >
                                    <Image source={{uri: 'buttonctd'}} style={styles._img} resizeMode={'contain'}/>
                                </TouchableOpacity>
                        }
                        {
                            aiWriting || showBtn || showEdit
                                ?
                                null :
                                <TouchableOpacity
                                    style={{zIndex: 1000}}
                                    onPress={() => _showEdit()}
                                >
                                    <Image source={{uri: 'wr3'}} style={styles._img_2} resizeMode={'contain'}/>
                                </TouchableOpacity>
                        }
                        <View style={{...styles._footer}}>
                            <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                                {
                                    dataAnswerArr.length
                                        ?
                                        dataAnswerArr.map((item, index) => {
                                            return (
                                                <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
                                                    <Text
                                                        style={{fontSize: SmartScreenBase.smFontSize * 45}}>{item.first}</Text>
                                                    {
                                                        item.text ?
                                                            aiWriting
                                                                ?
                                                                <TouchableOpacity
                                                                    onPress={() => _chooseSuggestions(index, item.text)}
                                                                >
                                                                    <Text style={{
                                                                        color: item.accept ? '#be1e2d' : item.type === 'grammar' ? '#00283a' : '#000',
                                                                        fontSize: SmartScreenBase.smFontSize * 45,
                                                                        textDecorationLine: item.accept ? 'line-through' : item.type === 'grammar' ? 'underline' : 'none',
                                                                        fontWeight: item.type === 'grammar' ? 'bold' : 'normal',
                                                                        backgroundColor: item.accept ? 'transparent' : item.type === 'grammar' ? 'transparent' : '#ed8a22',
                                                                    }}>{item.text}</Text>
                                                                </TouchableOpacity>
                                                                :
                                                                <View>
                                                                    <Text style={{
                                                                        color: '#be1e2d',
                                                                        fontSize: SmartScreenBase.smFontSize * 45,
                                                                        textDecorationLine: 'line-through',
                                                                        fontWeight: 'bold',
                                                                    }}>{item.text}</Text>
                                                                </View>
                                                            :
                                                            null
                                                    }
                                                    {
                                                        item.selected && item.accept ?
                                                            <Text style={{
                                                                color: '#39b54a',
                                                                fontSize: SmartScreenBase.smFontSize * 45,
                                                                fontWeight: 'bold',
                                                            }}>{item.selected}</Text>
                                                            :
                                                            null
                                                    }
                                                </View>
                                            );
                                        })
                                        :
                                        showEdit
                                            ?
                                            <View>
                                                <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
                                                    {
                                                        dataSplit.map((item, index) => {
                                                            return (
                                                                _renderTextInput(item, index)
                                                            );
                                                        })
                                                    }
                                                </View>
                                                <TextInput
                                                    style={{flex: 1, flexWrap: 'wrap'}}
                                                    multiline={true}
                                                    onSelectionChange={(event) => setSelection(event.nativeEvent.selection)}
                                                    onKeyPress={(e) => _onKeyPress(e)}
                                                >
                                                    {
                                                        dataSplit.map((item, index) => {
                                                            return (
                                                                _renderTextInput(item, index)
                                                            );
                                                        })
                                                    }
                                                </TextInput>
                                            </View>
                                            :
                                            <Text
                                                style={{fontSize: SmartScreenBase.smFontSize * 45}}>{dataAnswer}</Text>
                                }
                            </View>
                        </View>
                        {
                            aiWriting
                                ?
                                <View style={styles._footer_2}>
                                    <TouchableOpacity
                                        onPress={() => _ignoreAll()}
                                    >
                                        {_renderButton('Ignore All')}
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => _acceptAll()}
                                    >
                                        {_renderButton('Accept All')}
                                    </TouchableOpacity>
                                </View>
                                :
                                showBtn
                                    ?
                                    <View style={styles._footer_2}>
                                        <TouchableOpacity
                                            onPress={() => _ignoreEdit()}
                                        >
                                            {_renderButton('Từ chối sửa')}
                                        </TouchableOpacity>
                                        <TouchableOpacity
                                            onPress={() => _acceptEdit()}
                                        >
                                            {_renderButton('Đồng ý sửa')}
                                        </TouchableOpacity>
                                    </View>
                                    :
                                    showEdit
                                        ?
                                        <View style={styles._footer_2}>
                                            <TouchableOpacity
                                                onPress={() => setShowEdit(false)}
                                            >
                                                {_renderButton('Xong')}
                                            </TouchableOpacity>
                                        </View>
                                        :
                                        <View style={styles._footer_2}>
                                            <TouchableOpacity
                                                onPress={() => setModalVisibleTeaching(true)}
                                            >
                                                {_renderButton('Hướng dẫn dạy')}
                                            </TouchableOpacity>
                                            <TouchableOpacity
                                                onPress={() => _sendStudent()}
                                            >
                                                {_renderButton('Gửi học sinh')}
                                            </TouchableOpacity>
                                        </View>
                        }
                    </View>
                </KeyboardAvoidingView>
            </ScrollView>
            {_renderModal()}
            {_renderModalTeaching()}
            {_renderModalCriteria()}
            {_renderModalIssue()}
        </ImageBackground>
    );
};

export default WritingNew;
