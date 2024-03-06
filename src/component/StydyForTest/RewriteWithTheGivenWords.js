import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    TextInput,
    Image
} from 'react-native';
import SmartScreenBase from '../../base/SmartScreenBase';
import stylesApp from '../styleApp/stylesApp';
import StyleLesson from '../learn/Lesson/StyleLesson';
import Utils from '../../utils/stringUtils';
import FontBase from '../../base/FontBase';

const RewriteWithTheGivenWords = (props) => {

    const {dataQuestion, type, answer, dataAns,beginNum} = props;

    const [textInput, setTextInput] = useState([]);
    const [userChose,setUserChose] = useState([]);

    useEffect(() => {
        if (type === 'result') {
            setUserChose(JSON.parse(answer))
        } else {
            if (dataAns) {
                var res = []
                var curr = dataAns.find(c=>c.question_id === dataQuestion.question_id);
                if(curr){
                    res = curr.detail_user_turn.map(c=>c.user_choice||'')
                }
                setTextInput(res)
            }
        }
    }, [dataQuestion]);

    const _onChangeText = (text, index) => {
        let txtInput = [...textInput];
        txtInput[index] = text;
        setTextInput(txtInput);
        props.dataAnswer(index, text);
    };

    const _renderResult = (index) => {
        const chose = userChose[index];
        return (
            <View style={{marginLeft: SmartScreenBase.smPercenWidth * 1}}>
                {
                    chose?.user_choice != "" ?
                        <Text style={{
                            ...stylesApp.txt,
                            fontSize: SmartScreenBase.smFontSize * 50,
                            color: chose?.score==1 ? '#62B440' : '#C22D39'
                        }}>{dataQuestion.list_option[index].hint} {chose?.user_choice}</Text>
                        : null

                }
                {
                    chose?.score!=1 &&
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center'

                    }}>
                        <Image
                            source={{uri: 'lesson_grammar_image3'}}
                            style={[
                                StyleLesson.Image_Explain,
                                {
                                    marginRight: SmartScreenBase.smPercenWidth * 2,
                                    alignSelf:'flex-start'
                                },
                            ]}
                        />
                        <Text style={{
                            ...stylesApp.txt,
                            fontSize: SmartScreenBase.smFontSize * 50,
                            color: '#62B440',
                            width: SmartScreenBase.smPercenWidth*75
                        }}>{dataQuestion.list_option[index].hint} {dataQuestion.list_option[index].match_option_text[0]}</Text>
                    </View>
                }
            </View>
        )
    };

    return (
        dataQuestion.list_option.map((item, index) => {
            return (

                <View key={index}>
                    <Text
                        style={{
                            ...stylesApp.txt,
                            fontSize: SmartScreenBase.smFontSize * 50,
                            paddingVertical: SmartScreenBase.smPercenHeight * 2,
                        }}
                    >{beginNum + index + 1}. {item.question_content}</Text>
                    {
                        type === 'result'
                            ?
                            _renderResult(index)
                            :
                            <View style={{flexDirection: 'column'}}>
                                <Text
                                    style={{
                                        ...stylesApp.txt,
                                        marginLeft: SmartScreenBase.smPercenWidth*2,
                                        fontSize: SmartScreenBase.smFontSize * 50,
                                        paddingVertical: SmartScreenBase.smPercenHeight * 2,
                                        fontFamily: FontBase.MyriadPro_Bold,
                                    }}
                                >{"=> "+item.hint+"_____________"}</Text>
                                <TextInput
                                    multiline
                                    style={{
                                        marginVertical: 0,
                                        paddingTop: SmartScreenBase.smPercenWidth*2.5,
                                        fontSize: SmartScreenBase.smFontSize * 50,
                                        fontFamily: FontBase.MyriadPro_Regular,
                                        paddingHorizontal: SmartScreenBase.smPercenWidth * 3,
                                        borderWidth: 1,
                                        borderRadius: SmartScreenBase.smPercenWidth * 2,
                                        marginLeft: SmartScreenBase.smPercenWidth,
                                        minHeight: SmartScreenBase.smPercenHeight * 6,
                                        color:'black'
                                    }}
                                    value={textInput[index]}
                                    autoCapitalize='none'
                                    placeholder={'Nhập câu trả lời...'}
                                    placeholderTextColor={'#888888'}
                                    onChangeText={(text => _onChangeText(text, index))}
                                />
                            </View>
                    }
                </View>
            );
        })
    );
};

export default RewriteWithTheGivenWords;
