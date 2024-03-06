import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    Keyboard,
    Platform
} from 'react-native';
import SmartScreenBase from '../../base/SmartScreenBase';
import { stylesFillTheBlank } from './styles';
import StyleLesson from '../learn/Lesson/StyleLesson';
import stylesApp from '../../styleApp/stylesApp';
import FontBase from '../../base/FontBase';

const AnAnswer=({idx,item,onChange,vl})=>{
    return <View style={{
            flexDirection:'row',
            marginVertical:SmartScreenBase.smPercenHeight,
            alignItems:'center'
        }}>
        <Text style={stylesApp.txt_Title}>{idx}. </Text>
        <TextInput
            onChangeText={onChange}
            value={vl}
            autoCapitalize='none'
            autoCorrect={false}
            style={{
                borderWidth:1,
                flex:1,
                fontFamily: FontBase.MyriadPro_Regular,
                padding:SmartScreenBase.smPercenWidth*3,
                borderColor:'grey',
                borderRadius:SmartScreenBase.smPercenWidth*2,
                fontSize:SmartScreenBase.smFontSize*50,
                color:'black'
            }}
            placeholderTextColor={'#888888'}
            placeholder={'Nhập câu trả lời...'} />
    </View>
}

const QuestionFillTheBlank = (props) => {
    const { dataQuestion, type, dataAns, answer,beginNum } = props;

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


    const _onChangeText = (text, key) => {
        textInput[key] = text;
        setTextInput([...textInput])
        props.dataAnswer(key, text);
    };

    const _renderResult = (quest,index) => {
        const chose = userChose[index];
        
        return (
            <View style={{
                marginRight: SmartScreenBase.smPercenWidth * 5,
                flexDirection:'row',
                paddingTop: SmartScreenBase.smPercenHeight,
            }}>
                <Text style={{
                    fontFamily:FontBase.MyriadPro_Bold,
                    fontSize:SmartScreenBase.smFontSize*50,
                    paddingTop:Platform.OS==='ios'?5:0
                }}>{beginNum+ index + 1}. </Text>
                <View style={{flex:1}}>
                    <View style={{
                        flexDirection:'row',
                        paddingLeft:SmartScreenBase.smPercenWidth,
                        flexWrap:'wrap'
                    }}>
                        {
                            chose?.user_choice != "" ?
                            <Text style={{
                                fontFamily:FontBase.MyriadPro_Regular,
                                fontSize:SmartScreenBase.smFontSize*50,
                                color: chose?.score==1 ? '#62B440' : '#C22D39',
                                paddingTop:Platform.OS==='ios'?5:0
                            }}>{chose?.user_choice}</Text>
                            :
                            null
                        }
                        {
                            chose?.score!=1 &&
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                                <Image
                                    source={{uri: 'lesson_grammar_image3'}}
                                    style={[
                                        StyleLesson.Image_Explain,
                                        {marginHorizontal: SmartScreenBase.smPercenWidth * 2},
                                    ]}
                                />
                                <Text style={{
                                    fontFamily:FontBase.MyriadPro_Regular,
                                    fontSize:SmartScreenBase.smFontSize*50,
                                    color: '#62B440',
                                    paddingTop:Platform.OS==='ios'?5:0
                                }}>{dataQuestion.list_option[index]?.match_option_text[0]}</Text>
                            </View>
                        }
                    </View>
                    {/* {
                        !!dataQuestion.list_option[index]?.question_explain.content_question_text&&<View
                        style={{marginTop:SmartScreenBase.smBaseHeight*6}}
                        >
                            <Text style={{fontSize:SmartScreenBase.smFontSize*50,fontFamily:FontBase.MyriadPro_Bold}}>Giải thích:</Text>
                            <Text style={{fontSize:SmartScreenBase.smFontSize*50,fontFamily:FontBase.MyriadPro_Regular}}>{dataQuestion.list_option[index]?.option_explain}</Text>
                        </View>
                    } */}
                </View>
            </View>
        );
    };

    const formatScript=(s)=>{
        if(!s)return '';
        let idx = 1;
        return s.replace(/{.+?}/g,function(a,v){
            return `______(${beginNum + idx++})`
        })
    }

    if(!dataQuestion){
        return null;
    }

    return (
        <View>
            {console.log("======dataQuestion",dataQuestion.list_option[0].jamming_answer)}
            {
                !!dataQuestion.list_option[0].jamming_answer?(
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
                            dataQuestion.list_option[0].jamming_answer.split(",").map((e,i)=>{
                                return <Text style={[stylesApp.txtContent,{margin:SmartScreenBase.smPercenWidth*2}]}>
                                    {e}
                                </Text>
                            })
                        }
                    </View>
                ):null
            }
            <View style={stylesFillTheBlank.viewQuestion}>
                <Text style={{
                    marginTop:SmartScreenBase.smPercenHeight,
                    fontFamily:FontBase.MyriadPro_Regular,
                    fontSize:SmartScreenBase.smFontSize*50,
                    textAlign:'justify'
                }}>{formatScript(dataQuestion.list_option[0].question_content)}</Text>
            </View>
            <View style={{marginTop:SmartScreenBase.smPercenHeight}}>
                {
                    type !== 'result'&&dataQuestion.list_option.map((e,i)=>{
                        return <AnAnswer
                            onChange={(t)=>_onChangeText(t,i)}
                            vl={textInput[i]}
                            key={i}
                            item={e}
                            idx={beginNum + i + 1} />
                    })
                }
            </View>
            <View style={{}}>
            {
                type === 'result' ?
                    dataQuestion.list_option.map((ques, key) => {
                        return (
                            <View key={key}>
                                {
                                    _renderResult(ques,key)
                                }
                            </View>
                        );
                    })
                    : null
            }
            </View>
        </View>
    );
};

export default QuestionFillTheBlank;
