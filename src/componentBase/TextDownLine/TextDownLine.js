import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Platform } from 'react-native'
import SmartScreenBase from '../../base/SmartScreenBase'
import { Colors } from '../../styleApp/color'
import stringUtils from '../../utils/stringUtils'
import FontBase from '../../base/FontBase';
import LogBase from '../../base/LogBase';
import StyleLesson from '../../component/learn/Lesson/StyleLesson';
import LessonBase from '../../base/LessonBase';

export default TextDownLine = (props) => {

    const { 
        textBody, // text gốc
        textDL, // text đã qua toTextDownLine()
        styleBox, // style box ngoài
        statusFillList, // trạng thái đúng hay sai của ô nhập 
        isResult, // có phải đang hiển thị kết quả hay ko
        placeToFill, // render phần tử đặc biệt (thường là input hoặc select)
        indexQ, // số thứ tự câu hỏi 
        showNumber, // có show số thứ tự ko
        lineSpace // khoảng cách dòng
    } = props

    const [textList, setTextList] = useState(textDL || []);

    useEffect(() => {
        if (textBody && !textDL) {
            var strList = stringUtils.toListDownLine(textBody)
            setTextList(strList)
        }
    }, [textBody])

    var countFillKey = -1

    return (
        <View style={[{ height: 'auto', width: '100%', flexDirection: 'column'}, styleBox]}>
            {
                textList.map((monoText, rootkey) => {
                    return (
                        <View style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: SmartScreenBase.smPercenWidth*1.5}}>
                            {rootkey == 0 && showNumber && <Text style={[{fontSize: SmartScreenBase.smFontSize*50, fontFamily: FontBase.MyriadPro_Bold, marginTop: Platform.OS == "ios" ? SmartScreenBase.smPercenWidth : SmartScreenBase.smPercenWidth*1.2, color: Colors.Black}]}>
                                {indexQ + 1}.{' '}
                            </Text>}
                            {
                                monoText.split(' ').map((ques, key) => {
                                    if(ques.search((/\{([^}]+)\}/)) !== -1){
                                        return (
                                                <View style={{flexDirection: 'row'}}>
                                                    <Text
                                                        style={{
                                                            fontFamily: FontBase.MyriadPro_Bold,
                                                            fontSize: SmartScreenBase.smFontSize * 50,
                                                        }}> {"("+ques.match((/\{([^}]+)\}/))[1]+")"}</Text>
                                                    <View style={{
                                                        width: SmartScreenBase.smPercenHeight * 10,
                                                        borderBottomWidth: 1,
                                                        borderBottomColor: '#000',
                                                    }}></View>
                                                </View>
                                        );
                                    }else 
                                    if(stringUtils.removeSpecialWord(ques) == '________'){
                                        countFillKey = countFillKey + 1
                                        // LogBase.log("=====props.statusFillList[countFillKey]",props.statusFillList[countFillKey])
                                        // LogBase.log("=====props.indexQ",props.indexQ)
                                    return (
                                            <>
                                            {placeToFill(statusFillList[countFillKey] ,countFillKey, indexQ, isResult, key)}
                                            </>
                                    );            
                                    }else
                                        return (
                                        <TouchableOpacity onLongPress={() => LessonBase.goTranslate(ques)}>
                                            <Text style={{ fontSize: SmartScreenBase.smFontSize*50, color: Colors.Black, fontFamily: FontBase.MyriadPro_Regular, marginTop: lineSpace}}>
                                                {ques+" "}
                                            </Text>
                                        </TouchableOpacity>
                                    );
                                })
                            }
                        </View>
                    );
                })
            }
        </View>
    )
}



