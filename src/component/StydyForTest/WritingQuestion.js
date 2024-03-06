import React from 'react';
import {
    View,
    Text,
    Image,
    TextInput,
    Keyboard,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet
} from 'react-native';
import SmartScreenBase from '../../base/SmartScreenBase';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view'
import FontBase from '../../base/FontBase';

const Component=({header,dataQuestion,dataAnswer,dataAns,type})=>{
    const _scroll = React.useRef(null);
    const data = dataQuestion.list_option[0]
    const [text,setText] = React.useState('');

    React.useEffect(() => {
        if (type === 'result') {
            
        } else {
            if (dataAns) {
                var curr = dataAns.find(c=>c.question_id === dataQuestion.question_id);
                if(curr){
                    setText(curr.detail_user_turn[0]?.user_choice)
                }
            }
        }
    }, [dataQuestion]);

    const _onChangeText = (text) => {
        setText(text);
        dataAnswer(0, text);
    };

    return <KeyboardAwareScrollView 
                style={styles.view_question}
                enableOnAndroid={true}
                nestedScrollEnabled
                ref={_scroll}
                extraHeight={200}
            >
                <View>
                    {
                        !!header&&header()
                    }
                    <Text style={styles.text}>Gợi ý:</Text>
                    <Text style={styles.text}>{data?.hint||data?.option_text}</Text>
                    <TextInput
                        style={styles.input}
                        value={text}
                        onChangeText={(t)=>_onChangeText(t)}
                        placeholder={'Nhập câu trả lời'}
                        placeholderTextColor={'#888888'}
                        autoCorrect={false}
                        multiline={true}
                    />
                </View>
            </KeyboardAwareScrollView>
}

const styles =StyleSheet.create({
    text:{
        fontSize:SmartScreenBase.smFontSize*50,
        fontFamily:FontBase.MyriadPro_Regular,
        marginTop:SmartScreenBase.smPercenHeight,
    },
    input:{
        marginTop:SmartScreenBase.smPercenHeight*2,
        borderWidth:1,
        borderColor:'#dcdcdc',
        color:'black',
        paddingVertical:SmartScreenBase.smPercenWidth*3,
        paddingHorizontal:SmartScreenBase.smPercenWidth*3,
        fontSize:SmartScreenBase.smFontSize*50,
        borderRadius:SmartScreenBase.smPercenWidth*4,
        minHeight:SmartScreenBase.smPercenHeight*20,
        textAlignVertical:'top',
        fontFamily:FontBase.MyriadPro_Regular,
    },view_question:{
        paddingHorizontal:SmartScreenBase.smPercenWidth*4
    }
})

export default Component;