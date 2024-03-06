import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    TextInput,
    Image,
    StyleSheet,
    Platform
} from 'react-native';
import SmartScreenBase from '../../base/SmartScreenBase';
import stylesApp from '../styleApp/stylesApp';
import StyleLesson from '../learn/Lesson/StyleLesson';
import Utils from '../../utils/stringUtils';
import FontBase from '../../base/FontBase';

const Component = (props) => {

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
            <>
            <View style={styles.result}>
                {
                    chose?.user_choice != "" ? 
                        <Text style={{
                            color: chose?.score==1 ? '#62B440' : '#C22D39',
                            ...styles.resultTxt
                        }}>{!!dataQuestion.list_option[index].hint&&`${dataQuestion.list_option[index].hint} `}{chose?.user_choice}</Text>
                        : null
                }
                {
                    chose?.score!=1 &&
                    <>
                        <Image source={{uri: 'lesson_grammar_image3'}}
                            style={styles.imgHand}
                        />
                        <Text style={styles.res}>
                            {!!dataQuestion.list_option[index].hint&&`${dataQuestion.list_option[index].hint} `}{dataQuestion.list_option[index].match_option_text[0]}
                        </Text>
                    </>
                }
            </View>
            {
                !!dataQuestion.list_option[index]?.option_explain&&<View
                style={styles.foot}
                >
                    <Text style={styles.lb}>Giải thích:</Text>
                    <Text style={styles.txt2}>{dataQuestion.list_option[index]?.option_explain}</Text>
                </View>
            }
            </>
        )
    };

    return (
        dataQuestion.list_option.map((item, index) => {
            return (
                <View key={index}>
                    <View style={styles.sens}>
                        <View style={styles.txtCon} >
                            <Text style={styles.title}
                            >{beginNum + index + 1}.</Text>
                        </View>
                        {
                            item.question_content.replace(/\{.+?}/g, " ______ ").split(' ').map((e,i)=>{
                                if(e.indexOf('______')>=0){
                                    return <TextInput
                                        editable={type!='result'}
                                        key={i}
                                        style={[styles.input,{
                                            fontSize: SmartScreenBase.smFontSize * (!textInput[index]?40:50),
                                        }]}
                                        value={textInput[index]}
                                        autoCapitalize='none'
                                        placeholder={'Nhập câu trả lời...'}
                                        placeholderTextColor={'#888888'}
                                        onChangeText={(text => _onChangeText(text, index))}
                                        placeholderTextColor='#dcdcdc'
                                    />
                                }
                                return <View key={i} style={styles.txtCon} >
                                    <Text style={styles.txt3}>{e}</Text>
                                </View>
                            })
                        }
                    </View>
                    {
                        type === 'result'
                            ?
                            _renderResult(index)
                            :
                            <View style={{alignItems: 'center', flexDirection: 'row'}}>
                                <Text style={styles.txt}
                                >{item.hint}</Text>
                            </View>
                    }
                </View>
            );
        })
    );
};
const styles = StyleSheet.create({
    txt3:{
        fontFamily:FontBase.MyriadPro_Regular,
        fontSize: SmartScreenBase.smFontSize * 50,
        paddingTop:Platform.OS==='ios'?8:0,
    },
    title:{
        fontFamily:FontBase.MyriadPro_Regular,
        fontSize: SmartScreenBase.smFontSize * 50,
        paddingTop:Platform.OS==='ios'?8:0,
    },
    txt:{
        fontSize: SmartScreenBase.smFontSize * 45,
        paddingVertical: SmartScreenBase.smPercenHeight * 2,
        fontFamily:FontBase.MyriadPro_Bold,
        color:'black'
    },
    txt2:{
        fontSize:SmartScreenBase.smFontSize*50,
        fontFamily:FontBase.MyriadPro_Regular
    },
    txtCon:{
        marginVertical:2,
        marginRight:5,
        justifyContent:'center'
    },
    sens:{
        flexDirection:'row',
        flexWrap:'wrap',
        marginTop:SmartScreenBase.smPercenHeight*2
    },
    input:{
        marginRight: SmartScreenBase.smPercenWidth*2,
        paddingVertical: 0,
        paddingHorizontal: SmartScreenBase.smPercenWidth * 2,
        height:SmartScreenBase.smPercenHeight*4,
        borderWidth: 1,
        borderRadius: SmartScreenBase.smPercenWidth * 2,
        minWidth:SmartScreenBase.smPercenWidth * 20,
        color:'black',
        borderColor:'#dcdcdc',
        fontFamily:FontBase.MyriadPro_Regular
    },
    result:{
        marginLeft: SmartScreenBase.smPercenWidth * 1,
        marginTop:SmartScreenBase.smPercenHeight*2,
        flexDirection:'row',
        flexWrap:'wrap'
    },
    resultTxt:{
        fontFamily:FontBase.MyriadPro_Regular,
        fontSize: SmartScreenBase.smFontSize * 50,
        paddingTop:Platform.OS==='ios'?6:0
    },
    imgHand:{
        marginHorizontal: SmartScreenBase.smPercenWidth * 2,
        width: SmartScreenBase.smBaseWidth * 50,
        height: SmartScreenBase.smBaseWidth * 50,
        resizeMode: 'contain',
        marginTop:SmartScreenBase.smBaseWidth*8,
    },
    res:{
        fontSize: SmartScreenBase.smFontSize * 50,
        color: '#62B440',
        fontFamily:FontBase.MyriadPro_Regular,
        paddingTop:Platform.OS==='ios'?6:0
    },
    lb:{fontSize:SmartScreenBase.smFontSize*50,fontFamily:FontBase.MyriadPro_Bold},
    foot:{marginTop:SmartScreenBase.smBaseHeight*6}
})
export default Component;
