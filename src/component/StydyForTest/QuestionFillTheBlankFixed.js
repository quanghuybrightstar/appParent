import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    Keyboard,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
} from 'react-native';
import SmartScreenBase from '../../base/SmartScreenBase';
import { stylesFillTheBlank } from './styles';
import StyleLesson from '../learn/Lesson/StyleLesson';
import stylesApp from '../../styleApp/stylesApp';
import FontBase from '../../base/FontBase';

const AnAnswer = ({idx,item,onChange,vl})=>{

    return <View style={{
        flexDirection:'row',
        marginTop:SmartScreenBase.smPercenHeight,
        paddingBottom:SmartScreenBase.smPercenHeight,
        paddingTop:SmartScreenBase.smPercenHeight * 2,
        paddingHorizontal:SmartScreenBase.smPercenWidth * 5,
        alignItems:'center',
        borderTopWidth:1,
        borderTopColor:'#ececec',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: -1,
        },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 0,
        backgroundColor:'#fff',
        marginHorizontal:-SmartScreenBase.smPercenWidth * 5,
        marginBottom:-SmartScreenBase.smPercenHeight * 2,
    }}>
        <Text style={stylesApp.txt_Title}>{idx}. </Text>
        <TextInput
            onChangeText={onChange}
            value={vl}
            autoCapitalize="none"
            autoCorrect={false}
            multiline={true}
            style={[{
                borderWidth:1,
                flex:1,
                padding:SmartScreenBase.smPercenWidth * 3,
                borderColor:'#dcdcdc',
                borderRadius:SmartScreenBase.smPercenWidth * 2,
                fontSize:SmartScreenBase.smFontSize * 50,
                color:'black',
                maxHeight:SmartScreenBase.smPercenHeight * 30,
                fontFamily:FontBase.MyriadPro_Regular,
            },Platform.OS === 'ios' && {
                paddingTop:SmartScreenBase.smPercenHeight * 1.5,
            }]}
            placeholderTextColor={'#888888'}
            placeholder={'Nhập câu trả lời...'} />
    </View>;
};

const QuestionFillTheBlank = ({ dataQuestion, type, dataAns, answer,beginNum,dataAnswer,header,onKeyboard }) => {

    const [textInput, setTextInput] = useState([]);
    const [userChose,setUserChose] = useState([]);

    useEffect(() => {
        if (type === 'result') {
            setUserChose(JSON.parse(answer));
        } else {
            if (dataAns) {
                var res = [];
                var curr = dataAns.find(c=>c.question_id === dataQuestion.question_id);
                if (curr){
                    res = curr.detail_user_turn.map(c=>c.user_choice || '');
                }
                setTextInput(res);
            }
        }
    }, [dataQuestion]);
    const _onChangeText = (text, key) => {
        textInput[key] = text;
        setTextInput([...textInput]);
        dataAnswer(key, text);
    };
    const formatScript = (s)=>{
        if (!s) {return '';}
        let idx = 1;
        return s.replace(/{.+?}/g,function(a,v){
            return `______(${beginNum + idx++})`;
        });
    };

    if (!dataQuestion){
        return null;
    }

    return (
        <KeyboardAvoidingView
            style = {{ flex: 1 }}
            keyboardVerticalOffset={SmartScreenBase.smPercenHeight * 21}
            behavior={Platform.OS === 'ios' ? 'padding' : null}>
            <View style={{flex:1}}>
                <ScrollView style={{flex:1,paddingHorizontal: SmartScreenBase.smPercenWidth * 3}}>
                    <View style={{
                        flex:1,backgroundColor: '#fff',
                    }}>
                        {
                            !!header && header()
                        }
                        {
                            dataQuestion.suggestWords ? (
                                <View style={{
                                    flexDirection:'row',
                                    flexWrap:'wrap',
                                    borderRadius:SmartScreenBase.smPercenWidth,
                                    borderWidth:1,
                                    borderColor:'gray',
                                    padding:SmartScreenBase.smPercenWidth,
                                    marginTop:SmartScreenBase.smPercenWidth,
                                }}>
                                    {
                                        dataQuestion.suggestWords.map((e,i)=>{
                                            return <Text style={[stylesApp.txtContent,{margin:SmartScreenBase.smPercenWidth * 2}]}>
                                                {e}
                                            </Text>;
                                        })
                                    }
                                </View>
                            ) : null
                        }
                        <View style={[stylesFillTheBlank.viewQuestion,{
                        }]}>
                            <Text style={{
                                fontSize: SmartScreenBase.smFontSize * 50,
                                color: 'black',
                                marginTop:SmartScreenBase.smPercenHeight,
                                textAlign:'justify',
                                fontFamily:FontBase.MyriadPro_Regular,
                            }}>{formatScript(dataQuestion.list_option[0].question_content)}</Text>
                        </View>
                    </View>
                </ScrollView>
                <AnAnswer
                    onKeyboard={onKeyboard}
                    onChange={(t)=>_onChangeText(t,0)}
                    vl={textInput[0]}
                    item={dataQuestion.list_option[0]}
                    idx={beginNum + 1} />
            </View>
        </KeyboardAvoidingView>
    );
};

export default QuestionFillTheBlank;
