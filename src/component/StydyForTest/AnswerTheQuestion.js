import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    Platform,
} from 'react-native';
import SmartScreenBase from '../../base/SmartScreenBase';
import { stylesAnswerTheQuestion } from './styles';
import stylesApp from '../styleApp/stylesApp';
import StyleLesson from '../learn/Lesson/StyleLesson';
import Utils from '../../utils/stringUtils';
import FontBase from '../../base/FontBase';
import stringUtils from '../../utils/stringUtils';
import LogBase from '../../base/LogBase';

const AnswerTheQuestion = (props) => {

    const {dataQuestion, type, answer, dataAns, beginNum, isRandom} = props;
    const [answerText, setAnswerText] = useState("");
    const [textInput, setTextInput] = useState([]);
    const [userChose,setUserChose] = useState([]);

    useEffect(() => {
        LogBase.log("=====dataExam",dataQuestion)
        if (type === 'result') {
            setUserChose(JSON.parse(answer))
        } else {
            if (dataAns) {
                let dataAw = {};
                dataAns.forEach((item) => {
                    if (item.question_id === dataQuestion.question_id) {
                        dataAw = item;
                        return false;
                    }
                });
                let final_user_choice = dataAw.final_user_choice;
                let txtInput = [...textInput];
                txtInput[0] = final_user_choice;
                setTextInput(txtInput);
            }
        }
        if(isRandom){
            LogBase.log("=====randomXuocText","")
            setAnswerText(stringUtils.randomXuocText(dataQuestion.list_option[0].question_content))
        }else{
            setAnswerText(dataQuestion.list_option[0].question_content)
        } 
        console.log('dQ',dataQuestion);
        console.log('anS',answer);
    }, [dataQuestion, type, answer, dataAns]);

    // useEffect(() => {
    //     setTextInput('');
    // }, [props.dataQuestion.question_id]);

    const _onChangeText = (text, index) => {
        let txtInput = [...textInput];
        txtInput[index] = text;
        setTextInput(txtInput);
        props.dataAnswer(index, text);
    };

    const _renderResult = (item, index) => {
        
        const chose = userChose[index];
        console.log('fuck',chose)
        return (
            !!chose ?
            <View>
               
                {
                    chose.user_choice != "" ? 
                    <Text style={{
                        fontSize: SmartScreenBase.smFontSize * 50,
                        color: chose?.score==1 ? '#62B440' : '#C22D39',
                        fontFamily:FontBase.MyriadPro_Regular
                    }}>{chose.user_choice}</Text>
                    : null
                }


                {
                    chose?.score!=1 &&
                    <View style={{
                        flexDirection: 'row',
                    }}>
                        <Image
                            source={{uri: 'lesson_grammar_image3'}}
                            style={[
                                StyleLesson.Image_Explain,
                                {
                                    marginRight: SmartScreenBase.smPercenWidth * 2,
                                    // marginTop:SmartScreenBase.smBaseWidth*8,
                                    // alignSelf:'center'
                                },
                            ]}
                        />
                        <Text style={{
                            fontSize: SmartScreenBase.smFontSize * 50,
                            color: '#62B440',
                            flex: 1,
                            fontFamily:FontBase.MyriadPro_Regular
                        }}>{dataQuestion.list_option[index]?.match_option_text[0]||dataQuestion.list_option[index]?.option_text}</Text>
                    </View>
                }
            </View>
			:
			null
        );
    };

    return (
        <View>
            {
                dataQuestion.list_option.map((item, index) => {
                    return (
                        <View key={index}>
                                <Text
                                    style={{
                                        fontFamily:FontBase.MyriadPro_Regular,
                                        fontSize: SmartScreenBase.smFontSize * 50,
                                        paddingVertical: SmartScreenBase.smPercenHeight * 1,
                                    }}
                                >{answerText}</Text>
                                {
                                    type === 'result'
                                        ?
                                        _renderResult(item, index)
                                        :
                                        <TextInput
                                            autoCorrect={false}
                                            style={{
                                                marginVertical: SmartScreenBase.smPercenHeight,
                                                color:'black',
                                                fontSize: SmartScreenBase.smFontSize * 50,
                                                minHeight: SmartScreenBase.smPercenHeight * 7,
                                                paddingHorizontal: SmartScreenBase.smPercenWidth * 3,
                                                borderWidth: 1,
                                                borderRadius: SmartScreenBase.smPercenWidth * 2,
                                                paddingTop:SmartScreenBase.smPercenHeight * 2 + (Platform.OS==='ios'?5:0),
                                                paddingBottom:SmartScreenBase.smPercenHeight * 2,
                                                textAlignVertical:'top',
                                                fontFamily:FontBase.MyriadPro_Regular
                                            }}
                                            multiline={true}
                                            autoCapitalize='none'
                                            placeholder={'Nhập câu trả lời...'}
                                            placeholderTextColor={'#888888'}
                                            onChangeText={(text => _onChangeText(text, index))}
                                            value={textInput[index]}
                                        />
                                }
                            </View>
                    );
                })
            }
        </View>
    );
};

export default AnswerTheQuestion;
