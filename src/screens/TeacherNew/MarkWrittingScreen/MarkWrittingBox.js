import {StatusBar, ImageBackground, View, Alert, Keyboard   , Text , StyleSheet , ScrollView , Button , FlatList , TextInput , TouchableOpacity , UIManager , LayoutAnimation , Platform ,Image } from 'react-native';
import SmartScreenBase from '../../../base/SmartScreenBase'
import API from "../../../API/APIConstant";
import LinearGradient from 'react-native-linear-gradient';
import React, {useState, useEffect} from 'react';
import {Colors} from "../../../styleApp/color";
import APIBase from '../../../base/APIBase'
import FontBase from '../../../base/FontBase';
import {combineHighlights} from './Util'
import {SelectableTextComponent} from '../../../component/MarkWrittingItem/SelectableText';
import {ModalFixWordErr} from '../../../component/MarkWrittingItem/modals/ModalFixWordErr'
import MarkData from './MarkData'
import { updateLocale } from 'moment';
import LogBase from '../../../base/LogBase';
import { SmPopup } from '../../../componentBase/SmPopup/SmPopup';

const MarkWrittingBox = (props) => {

    const [firstTime, setfirstTime] = useState(false);
    const [startSelect, setStartSelect] = useState(-1);
    const [endSelect, setEndSelect] = useState(-1);
    const [objWordSelect, setObjWordSelect] = useState([]);
    const [word, setWord] = useState('');
    const [wordID, setWordID] = useState(''); // id text bi loi
    const [explain, setExplain] = useState('');
    const [explainID, setExplainID] = useState(''); // id text da sua
    const [textBody, setTextBody] = useState(props.data.toString().trim());
    const [textCache, setTextCache] = useState(props.data.toString().trim());
    const [fixTextArray, setFixTextArray] = useState([]);
    const [errTextArray, setErrTextArray] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [checkAI, setCheckAI] = useState(false);
    const [aiReq, setAiReq] = useState(false);
    const [modalExplainVisible, setModalExplainVisible] = useState(false);
    const [isModalExplainStu, setModalExplainStu] = useState(false);    

    useEffect(() => {
        setTextBody(props.data.toString().trim())
        setTextCache(props.data.toString().trim())
    }, [props.data])

    useEffect(() => {
        if(props.marked && props.marked.fixList && props.marked.fixList.length>0){
            //convertResultDatatoArr(props.marked, false);
            console.log("==========props.marked",props.marked)
            LogBase.log("=====UpdateMarkData 5")
            UpdateMarkData(props.marked.cachesList, props.marked.errList, props.marked.fixList)
            //MarkData.curMarkData = props.marked;
        }
    }, [props.marked])

    useEffect(() => {
        convertDataAItoArr (props.aiData);
        //MarkData.curMarkData = props.aiData;
    }, [props.aiData])

    useEffect(() => {
        if(props.isCancelAI && aiReq){
            console.log("=====isCancelAI")
            cancelAI();
        }else{
            console.log("=====setfirstTime")
            setfirstTime(true)
        }
    }, [props.isCancelAI])

    useEffect(() => {
        if(props.isOpenModalFixWordErr){
            if (checkStringIsContain(startSelect, endSelect, word)) {
                setTimeout(() =>  setModalVisible(true), 300)
            }
        }
    }, [props.isOpenModalFixWordErr])

    useEffect(() => {
        console.log('useEffect checkMarked')
        if (props.checkMarked){
            if(errTextArray.length > 0 && fixTextArray.length > 0){
                props.openPopupAskAI()
            }else{
                console.log('==========getAI')
                props.getAI()
                setAiReq(true)
            }
        }
    }, [props.checkMarked])

    // const getAI = async () => {

    //     const data = {
    //         content : textBody
    //     }

    //     setModalConfirmVisible(false)
    //     setfirstTime(true)

    //     props.onAILoading()
    //     var url = API.baseurl+API.aiCheckWriting
    //     var res = await APIBase.tokenAPI('post', url, data)
    //     if(res.data.data_check.result_content){
    //         // setAIData( response.data.data_check.result_content)
    //         onAILoaded(response.data.data_check.number_grammar , response.data.data_check.number_spelling);
    //         convertResultDatatoArr(response.data.data_check.result_content)
    //     }
    // }


    const cancelAI = () => {
        setCheckAI(false)

        let dataSortArrStringErr = combineHighlights(errTextArray);
        let dataSortArrStringFixed = combineHighlights(fixTextArray);

        let valErr = 0;
        let newText = textCache;


        dataSortArrStringErr.map((item ) => {
            if(item.ai === true){
                valErr += item.fixed.toString().length
            }
            else{
                item.id = (item.start - valErr) + '_' + (item.end - valErr)
                item.start = (item.start - valErr)
                item.end = (item.end - valErr)

            }


        })

        valErr = 0;

        dataSortArrStringFixed.map((item ) => {
            if(item.ai === true){
                newText = [newText.slice(0, item.start - valErr) , newText.slice(item.end - valErr)].join('')
                valErr += item.fixed.toString().length
            }
            else{
                item.idErr = (parseInt(item.idErr.split("_")[0]) - valErr) + '_' + (parseInt(item.idErr.split("_")[1]) - valErr)
                item.id = (item.start - valErr) + '_' + (item.end - valErr)
                item.start = (item.start - valErr)
                item.end = (item.end - valErr)
            }
        })
        LogBase.log("=====UpdateMarkData 6")
        UpdateMarkData(newText, dataSortArrStringErr.filter(item => item.ai === false), dataSortArrStringFixed.filter(item => item.ai === false))
        // setTextCache(newText)
        // setErrTextArray(dataSortArrStringErr.filter(item => item.ai === false));
        // setFixTextArray(dataSortArrStringFixed.filter(item => item.ai === false));

//        onAILoaded('-1' ,'-1');


    }

    const UpdateMarkData = (mTextCache, mErrTextArray, mFixTextArray) => {
        setTextCache(mTextCache)
        setErrTextArray(mErrTextArray);
        setFixTextArray(mFixTextArray);
        MarkData.curMarkListsData.cachesList = mTextCache;
        MarkData.curMarkListsData.errList = mErrTextArray;
        MarkData.curMarkListsData.fixList = mFixTextArray;
        console.log('=====mErrTextArray',mErrTextArray)
        console.log('=====mFixTextArray',mFixTextArray)
    }

    //convert data AI to arr

    const convertDataAItoArr = (dataAI) => {

        if(!dataAI) return;

        if(!checkAI) {
            setCheckAI(true);
            convertResultDatatoArr(dataAI, true)
        }
    }

    const convertResultDatatoArr = (dataAI, isMarkAI) => {

            let data = '';
            let position = 0;
            let lenghtAdd = 0;
            let dataFixArr = [];
            let dataErrArr = [];
            var isfirst = true;

            console.log("==========dataAI",dataAI)

            dataAI.forEach(({text, status, fix_text, isDelete, explain, isBehigh}, idx) => {
                

                if (status === 'error') {
                    text = text + " "
                    fix_text = fix_text !== undefined ? fix_text + " " : ""
                    data += text + fix_text;

                    console.log("start :"+(position + fix_text.length)+" end:"+(position + fix_text.length + text.length))
                    console.log("position:"+position+" fix_text.length:"+fix_text.length+" text.length:"+text.length)

                    dataErrArr = [{
                        id: (position) + '_' + (position + text.length),
                        start: position,
                        end: (position + text.length),
                        type: 0,
                        text : text,
                        ai : isMarkAI,
                        fixed: fix_text,
                        isHide : true,
                        explain: explain
                    }, ...dataErrArr]

                    dataFixArr = [{
                        idErr: (position) + '_' + (position + text.length),
                        id: (position + text.length) + '_' + (position + text.length + fix_text.length),
                        start: (position + text.length),
                        end: (position + text.length + fix_text.length),
                        ai : isMarkAI,
                        isHide : true,
                        fixed: fix_text,
                        explain: explain

                    }, ...dataFixArr]
                }else if(status === 'mark'){
                    console.log("==========isDelete",isDelete)
                    if(isBehigh){
                        text = text + " "
                        fix_text = fix_text !== undefined ? fix_text + " " : ""
                        data += text + fix_text;

                        console.log("start :"+(position + fix_text.length)+" end:"+(position + fix_text.length + text.length))
                        console.log("position:"+position+" fix_text.length:"+fix_text.length+" text.length:"+text.length)

                        dataErrArr = [{
                            id: (position) + '_' + (position + text.length),
                            start: position,
                            end: (position + text.length),
                            type: 0,
                            fixed: fix_text,
                            text : text,
                            ai : isMarkAI,
                            isHide : isDelete,
                            explain: explain
                        }, ...dataErrArr]
    
                        dataFixArr = [{
                            idErr: (position) + '_' + (position + text.length),
                            id: (position + text.length) + '_' + (position + text.length + fix_text.length),
                            start: (position + text.length),
                            end: (position + text.length + fix_text.length),
                            type: 1,
                            ai : isMarkAI,
                            fixed: fix_text,
                            explain: explain
    
                        }, ...dataFixArr]

                    }else{
                        text = text + " "
                        fix_text = fix_text !== undefined ? fix_text + " " : ""
                        data += fix_text + text;

                        console.log("start :"+(position + fix_text.length)+" end:"+(position + fix_text.length + text.length))
                        console.log("position:"+position+" fix_text.length:"+fix_text.length+" text.length:"+text.length)

                        dataErrArr = [{
                            id: (position + fix_text.length)+"_"+(position + fix_text.length + text.length - 1),
                            start: (position + fix_text.length),
                            end: (position + fix_text.length + text.length - 1),
                            type: 1,
                            text : text,
                            ai : isMarkAI,
                            isHide : isDelete,
                        }, ...dataErrArr]
    
                        dataFixArr = [{
                            idErr: (position + fix_text.length)+"_"+(position + fix_text.length + text.length),
                            id: position + '_' + (position + fix_text.length),
                            start: position,
                            end: (position + fix_text.length),
                            type: 1,
                            ai : isMarkAI,
                            fixed: fix_text,
                            explain: explain
    
                        }, ...dataFixArr]
                    }
                }else{
                    text = text + " "
                    fix_text = fix_text !== undefined ? fix_text + " " : ""
                    data += text + fix_text;
                }

                lenghtAdd = fix_text.length
                position += text.length + lenghtAdd
                LogBase.log("=====fix_text 1",text)
                if(isfirst){
                    position = position - 1
                    isfirst = false
                }
            })
            LogBase.log("=====UpdateMarkData 1")
            UpdateMarkData(data, dataErrArr.reverse(), dataFixArr.reverse())
            // setTextCache(data);
            console.log("==========dataErrArr",dataErrArr)
            console.log("==========dataFixArr",dataFixArr)
            // setErrTextArray(dataErrArr.reverse());
            // setFixTextArray(dataFixArr.reverse());
    }

    const changrMarkData = (word , explain, selectionStart, selectionEnd , type , isDeleteWrongWord) => {
        var kqlist = MarkData.curMarkData;

        var sumLength = 0;
        var indexStart = 0;
        var indexEnd = 0;
        for (var i=0;i<MarkData.curMarkData.length;i++){
            if(!MarkData.curMarkData[i].text) {
                console.log('loi o index ', i)
                continue 
            }

            sumLength = sumLength + MarkData.curMarkData[i].text.length + 1 + (MarkData.curMarkData[i].fix_text?MarkData.curMarkData[i].fix_text.length + 1 : 0);
            console.log('sumLength '+i+":", sumLength)

            if(sumLength>selectionStart){
                indexStart = i;
                break
            }
        }

        sumLength = 0;
        for (var i=0;i<MarkData.curMarkData.length;i++){

            sumLength = sumLength + MarkData.curMarkData[i].text.length + 1 + (MarkData.curMarkData[i].fix_text?MarkData.curMarkData[i].fix_text.length + 1 : 0);
            console.log('sumLength '+i+":", sumLength)

            if(sumLength>selectionEnd){
                indexEnd = i;
                break
            }
        }

        if(indexStart == indexEnd){
            var mono = {
                text: MarkData.curMarkData[indexStart].text,
                status: "mark",
                fix_text: word,
                explain: explain,
                isDelete: isDeleteWrongWord,
                isBehigh: type==0?true:false
            }
            kqlist[indexStart] = mono;
         //   console.log("++++++++++kqlist",kqlist)
            MarkData.curMarkData = kqlist;
        }
        // console.log("++++++++==selectionStart",selectionStart)
        // console.log("++++++++++selectionEnd",selectionEnd)
        // console.log("+++++++++=indexStart",indexStart)
        // console.log("++++++++++indexEnd",indexEnd)
        // console.log("++++++++++MarkData.curMarkData",MarkData.curMarkData)

        var resultList = []
        for (var i=0;i<=indexEnd-indexStart;i++){
            
        }
    }

    const convertDataFixAndErr = (mTextCache ,mFixTextArray, mErrTextArray, word , explain, selectionStart, selectionEnd , type , isDeleteWrongWord) => {
        
        var content = ""
        if(word.length == 0){
            content = ""+ word + "";
        }else{
            content = " "+ word + " ";
        }

        if(checkStringIsContain(selectionStart, selectionEnd , content)) {

            const dataSortArrStringErr = mErrTextArray;
            const dataSortArrStringFixed = mFixTextArray;

            var resultFixList = dataSortArrStringFixed;
            var resultErrList = dataSortArrStringErr;

            var result = {
                fixList: [],
                errList: []
            }

            if(dataSortArrStringErr && dataSortArrStringErr.length > 0)
            dataSortArrStringErr.map((item) => {
                if(item.start >= selectionEnd) {
                    item.id = (item.start + content.toString().length ) + '_' + (item.end + content.toString().length );
                    item.start = (item.start + content.toString().length );
                    item.end = (item.end + content.toString().length );
                    if(item.ai === true)
                        item.numberIncre  += content.toString().length
                }
            })

            if(dataSortArrStringFixed && dataSortArrStringFixed.length > 0)
                dataSortArrStringFixed.map((item) => {
                if(item.start >= selectionEnd) {
                        item.id = (item.start + content.toString().length ) + '_' + (item.end + content.toString().length ),
                        item.idErr = (parseInt(item.idErr.split("_")[0]) + content.toString().length ) + '_' + (parseInt(item.idErr.split("_")[1]) + content.toString().length);
                        item.start = (item.start + content.toString().length );
                        item.end = (item.end + content.toString().length );
                        if(item.ai === true)
                            item.numberIncre  += content.toString().length
                }
            })



            const wordErr = mTextCache.toString().substring(selectionStart,selectionEnd);

            if(type === 0) {

                resultErrList = [...dataSortArrStringErr, {
                    id: selectionStart + '_' + selectionEnd,
                    start: selectionStart,
                    end: selectionEnd,
                    type: type,
                    text : wordErr,
                    ai : false,
                    isHide : isDeleteWrongWord,
                    numberIncre : 0
                }]

                result.errList = resultErrList;

                resultFixList = [...dataSortArrStringFixed, {
                    idErr: selectionStart + '_' + selectionEnd,
                    id: (selectionEnd) + '_' + (selectionEnd + content.toString().length),
                    start: (selectionEnd),
                    end: (selectionEnd + content.toString().length),
                    fixed: content,
                    type: type,
                    ai : false,
                    explain: explain,
                    numberIncre : 0
                }];

                result.fixList = resultFixList;

            }
            else {

                resultErrList = [...dataSortArrStringErr, {
                    id: (selectionStart + content.toString().length )+ '_' + ( selectionEnd + content.toString().length),
                    start: selectionStart + content.toString().length,
                    end: selectionEnd + content.toString().length,
                    type: type,
                    text : wordErr,
                    ai : false,
                    isHide : isDeleteWrongWord,
                    numberIncre : 0
                }]

                result.errList = resultErrList;

                resultFixList = [...dataSortArrStringFixed, {
                    idErr: (selectionStart + content.toString().length )+ '_' + ( selectionEnd + content.toString().length),
                    id: (selectionStart) + '_' + (selectionStart + content.toString().length),
                    start: (selectionStart),
                    end: (selectionStart + content.toString().length),
                    type: type,
                    fixed: content,
                    ai : false,
                    explain: explain,
                    numberIncre : 0
                }]

                result.fixList = resultFixList;
        }
        }
        return result;
    }

    // Kiem tra diem dau va diem cuoi co bi trung voi 1 chuoi da sua truoc do?

    const checkStringIsContain = ( startC , endC , content ) => {

        let isCheck1 = true, isCheck2 = true,isCheck3 = true, isCheck4 = true, isCheck5 = true, isCheck6 = true, isCheck7 = true, isCheck8 = true , isCheck9 = true

        // console.log(errTextArray)

        errTextArray.forEach(({start , end , type} , idx) => {
              const sIndex = parseInt(type === 0 ? start : fixTextArray[idx].start)
              const eIndex = parseInt(type === 0 ? fixTextArray[idx].end : end)

            // console.log(sIndex +" - "+eIndex)

            if(startC === sIndex || endC === eIndex ) {
                  // console.log("EQUAL")
                isCheck1 =  false;
            }
            if(startC < sIndex) {
                if(endC < eIndex && endC > sIndex) isCheck2 =  false;
                if(endC > eIndex ) isCheck3 =  false;
                if(endC < eIndex && endC < sIndex) isCheck4 = true;
            }
            if(startC > sIndex) {
                // if(start >= eIndex) isCheck8 = true;
                if(startC < eIndex) isCheck5 =  false;
            }
            if(startC < eIndex) {
                if(startC > sIndex) isCheck6 =  false;
            }
            if(startC >= eIndex) {
                isCheck7 = true;
            }
            // if(end <= sIndex) {
            //     isCheck9 = true;
            // }
        })

        return (isCheck1 && isCheck2 && isCheck3 && isCheck4 && isCheck5 && isCheck6 && isCheck7 );


    }


    const undoTextFixed = () => {

        setModalExplainVisible(false);

        let dataSortArrStringErr = errTextArray;
        let dataSortArrStringFixed = fixTextArray;
        const startErr = parseInt(explainID.split("_")[0]);
        const endErr = parseInt(explainID.split("_")[1]);
        // const type = errTextArray.find(element => element.id === explainID).type;

        const lenghtWordFix = endErr - startErr;
        const WordHiddenFixLenght = 0;//(errTextArray[wordID] && errTextArray[wordID].isHide) ? errTextArray[wordID].text.toString().length : 0;

        // console.log(errTextArray);
        // console.log(fixTextArray);


        if(errTextArray && errTextArray.length > 0) {
            dataSortArrStringErr = dataSortArrStringErr.filter(item => item.id !== wordID)
            dataSortArrStringErr.map((item) => {
                const val = (item.start >= endErr ? lenghtWordFix : 0)
                const val1 = (item.start >= endErr ? + WordHiddenFixLenght : 0)

                    item.id = (item.start - val + val1) + '_' + (item.end - val + val1)
                    item.start = (item.start - val + val1)
                    item.end = (item.end - val + val1)
                    if(item.ai === true) item.numberIncre  = item.numberIncre - val + val1
            })
        }
        //
        if(fixTextArray && fixTextArray.length > 0) {
            dataSortArrStringFixed = dataSortArrStringFixed.filter(item => item.id !== explainID)
            dataSortArrStringFixed.map((item) => {
                const val = (item.start >= endErr ? lenghtWordFix : 0)
                const val1 = (item.start >= endErr ? + WordHiddenFixLenght : 0)

                    item.id = (item.start - val + val1) + '_' + (item.end - val + val1)
                    item.idErr = (parseInt(item.idErr.split("_")[0]) - val + val1) + '_' + (parseInt(item.idErr.split("_")[1]) - val + val1),
                    item.start = (item.start - val + val1)
                    item.end = (item.end - val + val1)
                    if(item.ai === true)  item.numberIncre  = item.numberIncre - val + val1
            })
        }
        LogBase.log("=====UpdateMarkData 2")
        UpdateMarkData([textCache.slice(0, startErr) , textCache.slice(endErr)].join(''), dataSortArrStringErr, dataSortArrStringFixed)
        // setTextCache([textCache.slice(0, startErr) , textCache.slice(endErr)].join(''));
        // setFixTextArray(dataSortArrStringFixed);
        // setErrTextArray(dataSortArrStringErr);

    }

    const onUpdateTextFixed = ( newWord ,explain , type , isDeleteWrongWord ) => {

        setModalExplainVisible(false) ;

        const content = " "+ newWord + " ";

        const oldWord = objWordSelect[1].fixed;
        const startPos = (parseInt(explainID.toString().split("_")[0]));
        const endPos = (parseInt(explainID.toString().split("_")[1]));

        const lenghtErrWord = (content.toString().length - oldWord.toString().length);
        const dataSortArrStringErr = errTextArray;
        const dataSortArrStringFixed = fixTextArray;


        // console.log(newWord+" - "+oldWord)
        console.log(isDeleteWrongWord)
        console.log(objWordSelect)


        // const idWordFixed = explainID;

        if(dataSortArrStringErr && dataSortArrStringErr.length > 0 )
            dataSortArrStringErr.map((item) => {
                if(item.id === wordID) {
                    if(item.type === 1)
                        item.id = (item.start + lenghtErrWord ) + '_' + (item.end + lenghtErrWord )
                        // item.text = content
                        item.isHide = isDeleteWrongWord
                }
                if(item.start >= endPos) {
                        item.id = (item.start + lenghtErrWord ) + '_' + (item.end + lenghtErrWord )
                        item.start = (item.start + lenghtErrWord )
                        item.end = (item.end + lenghtErrWord )
                        // item.type = type,
                        // item.text = content
                        // item.isHide = isDeleteWrongWord
                }
            })

        if(dataSortArrStringFixed && dataSortArrStringFixed.length > 0)
            dataSortArrStringFixed.map((item) => {
                if(item.idErr === wordID) {
                        item.id = (item.start ) + '_' + (item.end + lenghtErrWord )
                        if(item.type === 1)
                            item.idErr = (parseInt(item.idErr.split("_")[0]) + lenghtErrWord ) + '_' + (parseInt(item.idErr.split("_")[1]) + lenghtErrWord),
                        item.start = (item.start )
                        item.end = (item.end + lenghtErrWord )
                        item.explain = explain
                        item.fixed = content
                }

                if(item.start >= endPos) {
                        item.id = (item.start + lenghtErrWord ) + '_' + (item.end + lenghtErrWord )
                        item.idErr = (parseInt(item.idErr.split("_")[0]) + lenghtErrWord ) + '_' + (parseInt(item.idErr.split("_")[1]) + lenghtErrWord)
                        item.start = (item.start + lenghtErrWord )
                        item.end = (item.end + lenghtErrWord )
                        // item.explain = explain
                }
            })

        console.log(dataSortArrStringErr)
        LogBase.log("=====UpdateMarkData 3")
        UpdateMarkData([textCache.slice(0, startPos), content, textCache.slice(endPos)].join(''), dataSortArrStringErr, dataSortArrStringFixed)
        // setTextCache([textCache.slice(0, startPos), content, textCache.slice(endPos)].join(''));
        // setFixTextArray(dataSortArrStringFixed);
        // setErrTextArray(dataSortArrStringErr);

    }

    const fixStartEndforRoundText = (start, end, mTextcache) => {
        var fResult = {
            resStart: start,
            resEnd: end,
            resText: ""
        }

        var fIndexStart = start
        var fIndexEnd = end

        if(start > 0){

            for(var i=start;i>0;i--){
                var fNextWord = mTextcache.toString().substring(i-1,i);
                if(fNextWord == " " || fNextWord == ","){
                    fIndexStart = i;
                    break
                }else if(i == 1){
                    fIndexStart = 0
                }
            }
        }
        if(end < mTextcache.length){

            for(var i=end;i<mTextcache.length;i++){
                var fNextWord = mTextcache.toString().substring(i,i+1);
                if(fNextWord == " " || fNextWord == "," || fNextWord == "."){
                    fIndexEnd = i;
                    break
                }else if(i == mTextcache.length - 1){
                    fIndexEnd = mTextcache.length
                }
            }
        }
        fResult.resStart = fIndexStart;
        fResult.resEnd = fIndexEnd;
        fResult.resText = mTextcache.toString().substring(fIndexStart,fIndexEnd);

        console.log("fixStartEndforRoundText",fResult)

        return fResult;
    }
    /*
    type = 0 : back fix word , = 1 : front fix word

     */

    const onSelectionTextFixed = (mFixTextArray, mErrTextArray, word , explain, selectionStart, selectionEnd , type , isDeleteWrongWord) => {
        
        var content = ""
        if(word.length == 0){
            content = ""+ word + "";
        }else if(type == 0){
            content = " "+ word + "";
        }else if(type == 1){
            content = ""+ word + " ";
        }

        if(checkStringIsContain(selectionStart, selectionEnd , content)) {

            const dataSortArrStringErr = mErrTextArray;
            const dataSortArrStringFixed = mFixTextArray;

            var resultFixList = dataSortArrStringFixed;
            var resultErrList = dataSortArrStringErr;
            var mTextCache = []

            if(dataSortArrStringErr && dataSortArrStringErr.length > 0)
            dataSortArrStringErr.map((item) => {
                if(item.start >= selectionEnd) {
                    item.id = (item.start + content.toString().length ) + '_' + (item.end + content.toString().length );
                    item.start = (item.start + content.toString().length );
                    item.end = (item.end + content.toString().length );
                    if(item.ai === true)
                        item.numberIncre  += content.toString().length
                }
            })

            if(dataSortArrStringFixed && dataSortArrStringFixed.length > 0)
                dataSortArrStringFixed.map((item) => {
                if(item.start >= selectionEnd) {
                        item.id = (item.start + content.toString().length ) + '_' + (item.end + content.toString().length ),
                        item.idErr = (parseInt(item.idErr.split("_")[0]) + content.toString().length ) + '_' + (parseInt(item.idErr.split("_")[1]) + content.toString().length);
                        item.start = (item.start + content.toString().length );
                        item.end = (item.end + content.toString().length );
                        if(item.ai === true)
                            item.numberIncre  += content.toString().length
                }
            })



            const wordErr = textCache.toString().substring(selectionStart,selectionEnd);

            if(type === 0) {

                mTextCache = [textCache.slice(0, selectionEnd), content, textCache.slice(selectionEnd)].join('');

                resultErrList = [...dataSortArrStringErr, {
                    id: selectionStart + '_' + selectionEnd,
                    start: selectionStart,
                    end: selectionEnd,
                    type: type,
                    text : wordErr,
                    ai : false,
                    isHide : isDeleteWrongWord,
                    explain: explain,
                    numberIncre : 0
                }]

                resultFixList = [...dataSortArrStringFixed, {
                    idErr: selectionStart + '_' + selectionEnd,
                    id: (selectionEnd) + '_' + (selectionEnd + content.toString().length),
                    start: (selectionEnd),
                    end: (selectionEnd + content.toString().length),
                    fixed: content,
                    type: type,
                    ai : false,
                    explain: explain,
                    numberIncre : 0
                }];

            }
            else {
                mTextCache = [textCache.slice(0, selectionStart), content, textCache.slice(selectionStart)].join('');

                resultErrList = [...dataSortArrStringErr, {
                    id: (selectionStart + content.toString().length )+ '_' + ( selectionEnd + content.toString().length),
                    start: selectionStart + content.toString().length,
                    end: selectionEnd + content.toString().length,
                    type: type,
                    text : wordErr,
                    ai : false,
                    isHide : isDeleteWrongWord,
                    explain: explain,
                    numberIncre : 0
                }]

                resultFixList = [...dataSortArrStringFixed, {
                    idErr: (selectionStart + content.toString().length )+ '_' + ( selectionEnd + content.toString().length),
                    id: (selectionStart) + '_' + (selectionStart + content.toString().length),
                    start: (selectionStart),
                    end: (selectionStart + content.toString().length),
                    type: type,
                    fixed: content,
                    ai : false,
                    explain: explain,
                    numberIncre : 0
                }]
        }
        LogBase.log("=====UpdateMarkData 4")
            UpdateMarkData(mTextCache, resultErrList, resultFixList)
            // setTextCache(mTextCache);
            // setErrTextArray(resultErrList);
            // setFixTextArray(resultFixList);
            //changrMarkData(word , explain, selectionStart, selectionEnd , type , isDeleteWrongWord)
            LogBase.log("++++++++++resultErrList",resultErrList);
            LogBase.log("++++++++++resultFixList",resultFixList);
            LogBase.log("++++++++++mTextCache",mTextCache);
        }
    }

    return (
            <View>
                    {/* {console.log("=====errTextArray",errTextArray)}
                    {console.log("=====fixTextArray",fixTextArray)} */}
                    <SelectableTextComponent
                        selectable={ !checkAI ? true : false}
                        textValueProp = {""}
                        menuItems={props.isTeacher ? ["Sửa"] : []}
                        onSelection={({ eventType, content, selectionStart, selectionEnd }) => {

                            var fDataSelect = fixStartEndforRoundText(selectionStart, selectionEnd, textCache)
                            const wordChoose = fDataSelect.resText;
                            selectionStart = fDataSelect.resStart;
                            selectionEnd = fDataSelect.resEnd;

                            if(!firstTime){
                                setStartSelect(selectionStart)
                                setEndSelect(selectionEnd)
                                setWord(wordChoose)
                                setfirstTime(true)
                                props.firstTimeSelect()

                            }
                            else {
                                if (eventType.toString().trim().indexOf('Sửa') > -1) {
                                    if (checkStringIsContain(selectionStart, selectionEnd, wordChoose)) {
                                        setStartSelect(selectionStart)
                                        setEndSelect(selectionEnd)
                                        setWord(wordChoose)
                                        if(props.isTeacher){
                                            setModalVisible(true)
                                        }
                                    }else{
                                        props.openPopupHDS && props.openPopupHDS()
                                    }

                                }
                                else {
                                }
                            }
                        }}
                        highlights = {errTextArray}
                        highlightFixeds = {fixTextArray}
                        highlightColor = "#EE204E"
                        highlightFixedColor = "#149414"
                        onHighlightPress = { (id , type) => {  // word err click , 0 : err cross , 1 : word fixed

                              if(type === 0) {

                                  const dataFinded = errTextArray.find(element => element.id === id);
                                  {
                                   setObjWordSelect([errTextArray.find(element => element.id === id), fixTextArray.find(element => element.idErr === id)])
                                    var mExp = fixTextArray.find(element => element.idErr === id).explain
                                   setExplain(mExp)
                                   setExplainID(fixTextArray.find(element => element.idErr === id).id)

                                   setWordID(id)
                                   if(props.isTeacher){
                                        setModalExplainVisible(true)
                                    }else if(mExp && mExp.length > 0){
                                        setModalExplainStu(true)
                                    }
                               }
                              } else
                              if(type === 1) {
                                  const dataFinded = errTextArray.find(element => element.id === fixTextArray.find(element => element.id === id).idErr);
                                  {
                                      setObjWordSelect([errTextArray.find(element => element.id === fixTextArray.find(element => element.id === id).idErr), fixTextArray.find(element => element.id === id)])

                                    //   setExplain(fixTextArray.find(element => element.id === id).explain)
                                      var mExp = fixTextArray.find(element => element.id === id).explain
                                      setExplain(mExp)
                                      setExplainID(id)

                                      setWordID(fixTextArray.find(element => element.id === id).idErr)
                                      if(props.isTeacher){
                                            setModalExplainVisible(true)
                                        }else if(mExp && mExp.length > 0){
                                            setModalExplainStu(true)
                                        }
                                  }
                              }
                        }}
                        style={styles.instructions}
                        value= {textBody}
                        valueCache= {textCache}
                        isSort = {true}
                        isAI = {checkAI}
                    />
                <ModalFixWordErr
                    posWordFix = {0} type={1}
                    isModalVisible = {modalVisible}
                    onPressLeftBt = {() => {setModalVisible(false)}}
                    onPressComplete={(txtFixed , txtExplain , isSelect , posFix) => {
                        setModalVisible(false) ;
                        onSelectionTextFixed(fixTextArray, errTextArray, txtFixed , txtExplain, startSelect, endSelect , parseInt(posFix) , isSelect);}}
                    onCloseModal = {() => {setModalVisible(false)}}
                    wordChoose = {word}/>
            {/* <ModalExplain
                isModalVisible = {modalExplainVisible}
                onPressModal = {() => {  setModalExplainVisible(false)}}
                onPressComplete={(txtFixed , txtExplain , isSelect , posFix) => {
                    // newWord  , type , isDeleteWrongWord  , explain
                    onUpdateTextFixed(txtFixed , txtExplain , parseInt(posFix) , isSelect);}}
                onPressUndo = {() => {

                    undoTextFixed();
                }}
                wordOldData = {objWordSelect}/> */}
                <ModalFixWordErr
                    posWordFix = {0} type={2}
                    isModalVisible = {modalExplainVisible}
                    onPressLeftBt = {() => {undoTextFixed();}}
                    onPressComplete={(txtFixed , txtExplain , isSelect , posFix) => {
                        // newWord  , type , isDeleteWrongWord  , explain
                        onUpdateTextFixed(txtFixed , txtExplain , parseInt(posFix) , isSelect);}}
                    onCloseModal = {() => {setModalExplainVisible(false)}}
                    wordChoose = {objWordSelect}
                    />
                <SmPopup visible={isModalExplainStu} message={explain} tittleText={"Giải thích"}
                    confirmOnpress={() => {setModalExplainStu(false)}} confirmText={"Đóng"} cancelText={null}/>
            </View>
    );
};

export default MarkWrittingBox;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth : 0.5,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        padding: 10
    },
    welcome: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
        color: "#FF0000"
    },
    instructions: {
        textAlign: "left",
        color: "#333333",
        marginBottom: 5,
        fontSize: SmartScreenBase.smFontSize*50,
        fontFamily: FontBase.MyriadPro_Regular,
    },contentSelection: {
        padding : 10,
        marginBottom: SmartScreenBase.smPercenWidth*2

    },
    card: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 5
    },
    titleText:{
        color:'#4e5453',
        fontFamily : FontBase.MyriadPro_Regular,
        fontSize : SmartScreenBase.smPercenWidth*5,
        textAlign : 'center',
        fontWeight: '400',
        marginTop : SmartScreenBase.smPercenWidth*5
    },
    bodyText:{
        color:'#4e5453',
        fontFamily : FontBase.MyriadPro_It,
        fontSize : SmartScreenBase.smPercenWidth*5,
        textAlign : 'center',
        marginTop : SmartScreenBase.smPercenWidth*5
    },
});