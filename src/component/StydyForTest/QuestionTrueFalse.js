import React, {useState, useEffect, useRef} from 'react';
import {
    View,
    Text,
    ImageBackground,
    Animated,
    TouchableOpacity,
    Image,
    FlatList,
    Slider,
    Modal,
    StyleSheet,
} from 'react-native';
// import StyleLesson from '../StyleLesson';
import SmartScreenBase from '../../base/SmartScreenBase';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {TabView} from 'react-native-tab-view';
import API from '../../API/APIConstant';
import MyData from '../../component/MyData';
import {styles, stylesTrueFalse} from './styles';
import FontBase from '../../base/FontBase';

const Radio=({color})=>{
    return <View style={[stylesTrueFalse.viewRadio,{
        justifyContent:'center',alignItems:'center'
    }]}>
        <View style={{
            width:SmartScreenBase.smPercenWidth *3.5,
            height:SmartScreenBase.smPercenWidth *3.5,
            borderRadius:SmartScreenBase.smPercenWidth *1.8,
            backgroundColor:color
        }}></View>
    </View>
}

const QuestionTrueFalse = (props) => {

    const {dataQuestion, type, answer, dataAns,beginNum} = props;
    const dataRender = [true, false];

    const [dataChoice, setDataChoice] = useState(-1);
    const [dataSuccess, setDataSuccess] = useState(-1);

    useEffect(() => {
        if (type === 'result') {
            let answerO = JSON.parse(answer);
            if (answerO[0].user_choice === 'T') {
                setDataChoice(0);
            } else if (answerO[0].user_choice === 'F') {
                setDataChoice(1);
            } else {
                setDataChoice(-1);
            }
            dataQuestion.list_option.forEach((item, index) => {
                if (item.match_option_text[0] === 'T') {
                    setDataSuccess(0);
                } else if (item.match_option_text[0] === 'F') {
                    setDataSuccess(1);
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
                if (final_user_choice === 'T') {
                    setDataChoice(0);
                } else if ((final_user_choice === 'F')) {
                    setDataChoice(1);
                } else {
                    setDataChoice(-1);
                }
            }
        }
    }, [dataQuestion]);

    const _onPress = (index, item) => {
        setDataChoice(index);
        let answer = item ? 'T' : 'F';
        props.dataAnswer(answer);
    };

    const _renderColor = (index) => {
        if (type === 'result') {
            if ((dataChoice === dataSuccess) && (dataSuccess === index)) {
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
            if ((dataChoice === dataSuccess) && (dataSuccess === index)) {
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
        let color = _renderColor(index);
        return (
            <TouchableOpacity
                disabled={type==='result'}
                key={index}
                style={stylesTrueFalse.view_item_tf}
                onPress={() => _onPress(index, item)}
            >
                {
                    type === 'result'
                        ?
                        (dataChoice === dataSuccess) && (dataSuccess === index)
                            ?<Radio color={color}/>
                            :
                            dataChoice === index
                                ?
                                <Radio color={color}/>
                                :
                                index === dataSuccess
                                    ?
                                    <Radio color={color}/>
                                    :
                                    <View style={stylesTrueFalse.viewRadio}></View>
                        :
                        dataChoice === index
                            ?
                            <Radio color='#00BAB7'/>
                            :
                            <View style={stylesTrueFalse.viewRadio}></View>
                }
                <Text style={{
                    ...stylesTrueFalse.txt,
                    color: color,
                    fontFamily: _renderFontWeight(index)==='bold'?FontBase.MyriadPro_Bold:FontBase.MyriadPro_Regular,
                }}>{item ? 'TRUE' : 'FALSE'}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={{flex: 1}}>
            <Text style={{
                fontSize:SmartScreenBase.smFontSize*50,
                fontFamily:FontBase.MyriadPro_Regular
            }}>{beginNum + 1}. {dataQuestion.list_option[0].question_content}</Text>
            <View>
                {
                    dataRender.map((e,i)=>{
                        return <RenderItem item={e} index={i} key={i}/>
                    })
                }
            </View>
        </View>
    );
};

export default QuestionTrueFalse;
