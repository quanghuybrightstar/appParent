import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    FlatList,
} from 'react-native';
import {stylesTrueFalse} from './styles';
import styleApp from '../../styleApp/stylesApp';
import SmartScreenBase from '../../base/SmartScreenBase';
import FontBase from '../../base/FontBase';
import StyleLesson from '../learn/Lesson/StyleLesson';
import stringUtils from '../../utils/stringUtils';

const Radio=({color, isHand})=>{
    return <View style={stylesTrueFalse.moViewRadioSty}>
        <Image
            source={{uri: 'lesson_grammar_image3'}}
            style={[
                StyleLesson.Image_Explain,
                {opacity: isHand ? 1 : 0}
            ]}/>        
        <View style={[stylesTrueFalse.viewRadio,{
        justifyContent:'center',alignItems:'center'
    }]}>
            <View style={{
                width:SmartScreenBase.smPercenWidth *3.5,
                height:SmartScreenBase.smPercenWidth *3.5,
                borderRadius:SmartScreenBase.smPercenWidth *1.8,
                backgroundColor:color
            }}></View>
        </View>
    </View>
}

const QuestionMultipleChoice = (props) => {
    const {dataQuestion, type, answer, dataAns,answerChoose,beginNum} = props;
    const [dataChoice, setDataChoice] = useState(-1);
    const [dataSuccess, setDataSuccess] = useState(-1);
    const answerUser = answerChoose

    console.log('dataChoice',dataChoice)

    useEffect(() => {
        if (type === 'result') {
            let answerO = JSON.parse(answer);
            setDataChoice(-1)
            console.log("=====dataQuestion",dataQuestion.list_option)
            dataQuestion.list_option.forEach((item, index) => {
                if (item.match_option_text[0] === answerO[0].user_choice) {
                    console.log('found',index)
                    setDataChoice(index);
                }
                if (parseInt(item.score) === 1) {
                    setDataSuccess(index);
                }
            });
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
                dataQuestion.list_option.forEach((item, index) => {
                    if (item.match_option_text[0] === final_user_choice) {
                        setDataChoice(index);
                    }
                });
            }
        }
    }, [type,dataQuestion]);



    useEffect(()=>{
        if (type === 'result') return;
        if(answerUser != null){
            let quesId = dataQuestion.question_id;
            var currentAns = answerUser.find(e=>e.ques_id == dataQuestion.question_id);
            setDataChoice(currentAns ? currentAns.ans : -1)
        }else{
            setDataChoice(-1)
        }
    },[dataQuestion])

    const _onPress = (index) => {
        let choice =  answerUser.find(e=>e.ques_id == dataQuestion.question_id);
        if(choice != undefined){
            let indexChoice = answerUser.indexOf(choice);
            choice.ans = index
            answerUser[indexChoice] = choice;
        }else{

            let obj = {};
            obj.ques_id = dataQuestion.question_id;
            obj.ans = index;
            answerUser.push(obj)
        }


        setDataChoice(index);
        props.dataAnswer(index);
    };

    const _renderColor = (index) => {
        if (type === 'result') {
            if ((dataChoice === dataSuccess) && (dataSuccess  === index)) {
                return '#25A047';
            } else if (dataChoice === index) {
                return '#C63842';
            } else if (index === dataSuccess) {
                return '#25A047';
            } else {
                return '#000';
            }
        }
    };

    const _renderFontWeight = (index) => {
        if (type === 'result') {
            if ((dataChoice === dataSuccess) && (dataSuccess  === index)) {
                return 'bold';
            } else if (dataChoice === index) {
                return 'bold';
            } else if (index === dataSuccess) {
                return 'bold';
            } else {
                return 'normal';
            }
        }
    };

    const RenderItem = ({item, index}) => {
        let textConvert = _convertText(item.match_option_text[0]);
        let color = _renderColor(index);
        return (
            <TouchableOpacity
                style={stylesTrueFalse.view_item_tf}
                onPress={() => _onPress(index)}
                disabled={type === 'result'}
            >
                {
                    type === 'result'
                        ?
                        (dataChoice === dataSuccess) && (dataSuccess  === index)
                            ?
                            <Radio color={color} isHand={false}/>
                            :
                            dataChoice === index
                                ?
                                <Radio color={color} isHand={false}/>
                                :
                                index === dataSuccess
                                    ?
                                    <Radio color={color} isHand={true}/>
                                    :
                                    <Radio color={"#fff"} isHand={false}/>
                                    // <View style={stylesTrueFalse.viewRadio}></View>
                        :
                        dataChoice === index
                            ?
                            <Radio color='#00BAB7'/>
                            :
                            <Radio color={"#fff"}/>
                }
                {
                    textConvert.str
                        ?
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{
                                ...stylesTrueFalse.txt,
                                color: color,
                                fontFamily: _renderFontWeight(index)==='bold'?FontBase.MyriadPro_Bold:FontBase.MyriadPro_Regular
                                }}
                                >{textConvert.str}</Text>
                        </View>
                        :
                        <View style={{flexDirection: 'row'}}>
                            <Text style={stylesTrueFalse.txt}>{textConvert.str1}</Text>
                            <View style={{borderBottomWidth: 1, borderColor: "#000"}}>
                                <Text style={{
                                    ...stylesTrueFalse.txt_def,
                                    // textDecorationLine: 'underline',
                                }}>{textConvert.str2}</Text>
                            </View>
                            <Text style={stylesTrueFalse.txt_def}>{textConvert.str3}</Text>
                        </View>
                }
            </TouchableOpacity>
        );
    };

    const _convertText = (myString) => {
        let itemM = myString.match(/\[(.*?)\]/);
        let indices = {};
        if (itemM) {
            let indexOf = myString.indexOf(itemM[0]);
            let str1 = myString.slice(0, indexOf);
            let str2 = itemM[1];
            let str3 = myString.slice(indexOf + itemM[0].length, myString.length);
            indices['str1'] = str1;
            indices['str2'] = str2;
            indices['str3'] = str3;
        } else {
            indices['str'] = myString;
        }
        return indices;
    };
    const extractData=(s)=>{
        var matchs = s.match(/\[(.*?)\]/g);
        if(!matchs){
            return [{
                txt: s
            }]
        }
        matchs.forEach(e=>{

        })
    }
    const renderUnderLine=(s)=>{
        var matchs = s.match(/\[(.*?)\]/g);
        matchs.forEach(e=>{
            s = s.replace(e,' ____ ')
        })
        let c = 0;
        var bodyT = stringUtils.toListDownLine(s)
        return(
    <View style={{flexDirection:'column'}}>
        {
            bodyT.map((mono, mKey) => {
                return(
                    <View style={{flexDirection:'row',flexWrap:'wrap'}}>
                    { mKey == 0 && <View style={{
                                height: SmartScreenBase.smPercenWidth*6,
                                justifyContent:'center',
                                marginTop:SmartScreenBase.smPercenWidth
                            }}>
                                <Text style={styleApp.txt_Title}>{beginNum + 1}. </Text>
                            </View>}
                    {
                        mono.split(' ').map((e,k)=>{
                            return <View style={{
                                borderBottomWidth:e==='____'?1:0,
                                height: SmartScreenBase.smPercenWidth*6,
                                justifyContent:'center',
                                marginTop:SmartScreenBase.smPercenWidth,
                                marginRight:2
                            }}>
                                {
                                    e==='____'?<Text key={mKey+"_"+k} style={{
                                        ...styleApp.txt_Title}}>{matchs[c++].replace(/[\[\]]/g,'')}</Text>:
                                        <Text style={{...styleApp.txt_Title,marginRight:2}}  key={mKey+"-"+k}>{e}</Text>
                                }
                            </View>
                        })
                    }
                </View>
                )
            })
        }
    </View>
)}
    return (
        <View style={{flex: 1,marginTop:10}}>
            {
                dataQuestion.list_option[0].question_content.indexOf('[')>=0
                &&dataQuestion.list_option[0].question_content.indexOf(']')>=0?
                renderUnderLine(dataQuestion.list_option[0].question_content)
                :
                <Text style={{
                    fontSize: SmartScreenBase.smFontSize * 50,
                    color: 'black',
                    fontFamily:FontBase.MyriadPro_Regular
                }}>
                    {/* {beginNum + 1}.  */}
                    {dataQuestion.list_option[0].question_content}
                </Text>
            }
            <View>
                {
                    dataQuestion.list_option.map((e,i)=>{
                        return <RenderItem index={i} item={e} key={i}/>
                    })
                }
            </View>
        </View>
    );
};

export default QuestionMultipleChoice;
