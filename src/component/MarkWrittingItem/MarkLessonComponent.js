// import React, { useState, useCallback } from 'react';
// import {StatusBar, ImageBackground, View, Image, Alert, Keyboard , Button , Text , StyleSheet , ScrollView , TouchableOpacity , AsyncStorage  } from 'react-native';
// import {SelectableTextComponent} from "../../component/MarkWrittingItem/SelectableText";
// import API from "../../API/APIConstant";
// import {combineHighlights} from "../helper/Utils";
// import SmartScreenBase from '../../base/SmartScreenBase';
// import APIBase from '../../base/APIBase';



// export default MarkLessonComponent = ({onSelection, onHighlightPress, textValueProp, value, TextComponent, textComponentProps , onAILoaded, ...props}) => {

//     const [firstTime, setfirstTime] = useState(false);
//     const [startSelect, setStartSelect] = useState(-1);
//     const [endSelect, setEndSelect] = useState(-1);
//     const [objWordSelect, setObjWordSelect] = useState([]);
//     const [word, setWord] = useState('');
//     const [wordID, setWordID] = useState(''); // id text bi loi
//     const [explain, setExplain] = useState('');
//     const [explainID, setExplainID] = useState(''); // id text da sua
//     const [text, setText] = useState(props.data.toString().trim());
//     const [textCache, setTextCache] = useState(props.data.toString().trim());
//     const [fixTextArray, setFixTextArray] = useState([]);
//     const [errTextArray, setErrTextArray] = useState([]);
//     const [modalVisible, setModalVisible] = useState(false);
//     const [modalTutVisible, setModalTutVisible] = useState(false);
//     const [modalConfirmVisible, setModalConfirmVisible] = useState(false);
//     const [modalConfirmVisible1, setModalConfirmVisible1] = useState(false);
//     const [modalCancelVis, setMmodalCancelVis] = useState(false);
//     const [checkAI, setCheckAI] = useState(false);
//     const [AIData, setAIData] = useState([]);
//     const [modalExplainVisible, setModalExplainVisible] = useState(false);
//     const listHightLight = []


//     const getAI = async () => {

//         const data = {
//             content : text
//         }

//         setModalConfirmVisible(false)

//         props.onAILoading()
//         var url = API.baseurl+API.aiCheckWriting
//         var res = await APIBase.tokenAPI('post', url, data)
//         if(res.data.data_check.result_content){
//             // setAIData( response.data.data_check.result_content)
//             onAILoaded(response.data.data_check.number_grammar , response.data.data_check.number_spelling);
//             convertResultDatatoArr(response.data.data_check.result_content)
//         }
//     }


//     const cancelAI = () => {
//         setCheckAI(false)
//         // setTextCache(text);

//         let dataSortArrStringErr = combineHighlights(errTextArray);
//         let dataSortArrStringFixed = combineHighlights(fixTextArray);

//         // if(dataSortArrStringErr && dataSortArrStringErr.length > 0)
//         //     dataSortArrStringErr = dataSortArrStringErr.filter(item => item.ai === false);
//         //
//         // if(dataSortArrStringFixed && dataSortArrStringFixed.length > 0)
//         //     dataSortArrStringFixed = dataSortArrStringFixed.filter(item => item.ai === false);

//         let valErr = 0;
//         let newText = textCache;


//         dataSortArrStringErr.map((item ) => {
//             if(item.ai === true){
//                 valErr += item.fixed.toString().length
//             }
//             else{
//                 item.id = (item.start - valErr) + '_' + (item.end - valErr)
//                 item.start = (item.start - valErr)
//                 item.end = (item.end - valErr)

//             }


//         })

//         valErr = 0;

//         dataSortArrStringFixed.map((item ) => {
//             if(item.ai === true){
//                 newText = [newText.slice(0, item.start - valErr) , newText.slice(item.end - valErr)].join('')
//                 valErr += item.fixed.toString().length
//             }
//             else{
//                 item.idErr = (parseInt(item.idErr.split("_")[0]) - valErr) + '_' + (parseInt(item.idErr.split("_")[1]) - valErr)
//                 item.id = (item.start - valErr) + '_' + (item.end - valErr)
//                 item.start = (item.start - valErr)
//                 item.end = (item.end - valErr)
//             }
//         })

//         // console.log(newText.toString().length)
//         // console.log(newText.toString())
//         //
//         //
//         // console.log(dataSortArrStringFixed.filter(item => item.ai === false))
//         // console.log(dataSortArrStringErr.filter(item => item.ai === false))

//         // dataSortArrStringFixed.map((item) => {
//         //
//         // })

//         setTextCache(newText)
//         setErrTextArray(dataSortArrStringErr.filter(item => item.ai === false));
//         setFixTextArray(dataSortArrStringFixed.filter(item => item.ai === false));

//         onAILoaded('-1' ,'-1');


//     }


//     //convert data AI to arr

//     const convertResultDatatoArr = (dataAI) => {

//         if(!checkAI) {

//             setCheckAI(true);

//             let data = '';
//             let position = 0;
//             let lenghtAdd = 0;
//             let dataFixArr = [];
//             let dataErrArr = [];

//             dataAI.forEach(({text, status, fix_text}, idx) => {

//                 text = text + " "
//                 fix_text = fix_text !== undefined ? fix_text + " " : ""
//                 data += text + fix_text;

//                 if (status === 'error') {
//                     dataErrArr = [{
//                         id: (position) + '_' + (position + text.length),
//                         start: position,
//                         end: (position + text.length),
//                         type: 0,
//                         text : text,
//                         ai : true,
//                         fixed: fix_text,
//                         isHide : true
//                     }, ...dataErrArr]

//                     dataFixArr = [{
//                         idErr: (position) + '_' + (position + text.length),
//                         id: (position + text.length) + '_' + (position + text.length + fix_text.length),
//                         start: (position + text.length),
//                         end: (position + text.length + fix_text.length),
//                         ai : true,
//                         isHide : true,
//                         fixed: fix_text,
//                         explain: ''

//                     }, ...dataFixArr]

//                     // console.log(idx +" - " + position + " - "+fix_text)

//                 }

//                 lenghtAdd = fix_text.length
//                 position += text.length + lenghtAdd

//             })

//             // console.log(dataErrArr)
//             // console.log(dataFixArr)


//             setTextCache(data);
//             setErrTextArray(dataErrArr.reverse());
//             setFixTextArray(dataFixArr.reverse());
//         }


//     }

//     // Kiem tra diem dau va diem cuoi co bi trung voi 1 chuoi da sua truoc do?

//     const checkStringIsContain = ( startC , endC , content ) => {

//         let isCheck1 = true, isCheck2 = true,isCheck3 = true, isCheck4 = true, isCheck5 = true, isCheck6 = true, isCheck7 = true, isCheck8 = true , isCheck9 = true

//         // console.log(errTextArray)

//         errTextArray.forEach(({start , end , type} , idx) => {
//               const sIndex = parseInt(type === 0 ? start : fixTextArray[idx].start)
//               const eIndex = parseInt(type === 0 ? fixTextArray[idx].end : end)

//             // console.log(sIndex +" - "+eIndex)

//             if(startC === sIndex || endC === eIndex ) {
//                   // console.log("EQUAL")
//                 isCheck1 =  false;
//             }
//             if(startC < sIndex) {
//                 if(endC < eIndex && endC > sIndex) isCheck2 =  false;
//                 if(endC > eIndex ) isCheck3 =  false;
//                 if(endC < eIndex && endC < sIndex) isCheck4 = true;
//             }
//             if(startC > sIndex) {
//                 // if(start >= eIndex) isCheck8 = true;
//                 if(startC < eIndex) isCheck5 =  false;
//             }
//             if(startC < eIndex) {
//                 if(startC > sIndex) isCheck6 =  false;
//             }
//             if(startC >= eIndex) {
//                 isCheck7 = true;
//             }
//             // if(end <= sIndex) {
//             //     isCheck9 = true;
//             // }
//         })

//         return (isCheck1 && isCheck2 && isCheck3 && isCheck4 && isCheck5 && isCheck6 && isCheck7 );


//     }


//     const undoTextFixed = () => {

//         setModalExplainVisible(false);

//         let dataSortArrStringErr = errTextArray;
//         let dataSortArrStringFixed = fixTextArray;
//         const startErr = parseInt(explainID.split("_")[0]);
//         const endErr = parseInt(explainID.split("_")[1]);
//         // const type = errTextArray.find(element => element.id === explainID).type;

//         const lenghtWordFix = endErr - startErr;
//         const WordHiddenFixLenght = 0;//(errTextArray[wordID] && errTextArray[wordID].isHide) ? errTextArray[wordID].text.toString().length : 0;

//         // console.log(errTextArray);
//         // console.log(fixTextArray);


//         if(errTextArray && errTextArray.length > 0) {
//             dataSortArrStringErr = dataSortArrStringErr.filter(item => item.id !== wordID)
//             dataSortArrStringErr.map((item) => {
//                 const val = (item.start >= endErr ? lenghtWordFix : 0)
//                 const val1 = (item.start >= endErr ? + WordHiddenFixLenght : 0)

//                     item.id = (item.start - val + val1) + '_' + (item.end - val + val1)
//                     item.start = (item.start - val + val1)
//                     item.end = (item.end - val + val1)
//                     if(item.ai === true) item.numberIncre  = item.numberIncre - val + val1
//             })
//         }
//         //
//         if(fixTextArray && fixTextArray.length > 0) {
//             dataSortArrStringFixed = dataSortArrStringFixed.filter(item => item.id !== explainID)
//             dataSortArrStringFixed.map((item) => {
//                 const val = (item.start >= endErr ? lenghtWordFix : 0)
//                 const val1 = (item.start >= endErr ? + WordHiddenFixLenght : 0)

//                     item.id = (item.start - val + val1) + '_' + (item.end - val + val1)
//                     item.idErr = (parseInt(item.idErr.split("_")[0]) - val + val1) + '_' + (parseInt(item.idErr.split("_")[1]) - val + val1),
//                     item.start = (item.start - val + val1)
//                     item.end = (item.end - val + val1)
//                     if(item.ai === true)  item.numberIncre  = item.numberIncre - val + val1
//             })
//         }

//         setTextCache([textCache.slice(0, startErr) , textCache.slice(endErr)].join(''));
//         setFixTextArray(dataSortArrStringFixed);
//         setErrTextArray(dataSortArrStringErr);

//     }

//     const onUpdateTextFixed = ( newWord ,explain , type , isDeleteWrongWord ) => {

//         setModalExplainVisible(false) ;

//         const content = " "+ newWord + " ";

//         const oldWord = objWordSelect[1].fixed;
//         const startPos = (parseInt(explainID.toString().split("_")[0]));
//         const endPos = (parseInt(explainID.toString().split("_")[1]));

//         const lenghtErrWord = (content.toString().length - oldWord.toString().length);
//         const dataSortArrStringErr = errTextArray;
//         const dataSortArrStringFixed = fixTextArray;


//         // console.log(newWord+" - "+oldWord)
//         console.log(isDeleteWrongWord)
//         console.log(objWordSelect)


//         // const idWordFixed = explainID;

//         if(dataSortArrStringErr && dataSortArrStringErr.length > 0 )
//             dataSortArrStringErr.map((item) => {
//                 if(item.id === wordID) {
//                     if(item.type === 1)
//                         item.id = (item.start + lenghtErrWord ) + '_' + (item.end + lenghtErrWord )
//                         // item.text = content
//                         item.isHide = isDeleteWrongWord
//                 }
//                 if(item.start >= endPos) {
//                         item.id = (item.start + lenghtErrWord ) + '_' + (item.end + lenghtErrWord )
//                         item.start = (item.start + lenghtErrWord )
//                         item.end = (item.end + lenghtErrWord )
//                         // item.type = type,
//                         // item.text = content
//                         // item.isHide = isDeleteWrongWord
//                 }
//             })

//         if(dataSortArrStringFixed && dataSortArrStringFixed.length > 0)
//             dataSortArrStringFixed.map((item) => {
//                 if(item.idErr === wordID) {
//                         item.id = (item.start ) + '_' + (item.end + lenghtErrWord )
//                         if(item.type === 1)
//                             item.idErr = (parseInt(item.idErr.split("_")[0]) + lenghtErrWord ) + '_' + (parseInt(item.idErr.split("_")[1]) + lenghtErrWord),
//                         item.start = (item.start )
//                         item.end = (item.end + lenghtErrWord )
//                         item.explain = explain
//                         item.fixed = content
//                 }

//                 if(item.start >= endPos) {
//                         item.id = (item.start + lenghtErrWord ) + '_' + (item.end + lenghtErrWord )
//                         item.idErr = (parseInt(item.idErr.split("_")[0]) + lenghtErrWord ) + '_' + (parseInt(item.idErr.split("_")[1]) + lenghtErrWord)
//                         item.start = (item.start + lenghtErrWord )
//                         item.end = (item.end + lenghtErrWord )
//                         // item.explain = explain
//                 }
//             })

//         console.log(dataSortArrStringErr)

//         setTextCache([textCache.slice(0, startPos), content, textCache.slice(endPos)].join(''));
//         setFixTextArray(dataSortArrStringFixed);
//         setErrTextArray(dataSortArrStringErr);


//     }

//     /*
//     type = 0 : back fix word , = 1 : front fix word

//      */

//     const onSelectionTextFixed = (word , explain, selectionStart, selectionEnd , type , isDeleteWrongWord) => {
//         const content = " "+ word + " ";
//         if(checkStringIsContain(selectionStart, selectionEnd , content)) {

//             const dataSortArrStringErr = errTextArray;
//             const dataSortArrStringFixed = fixTextArray;

//             if(dataSortArrStringErr && dataSortArrStringErr.length > 0)
//             dataSortArrStringErr.map((item) => {
//                 if(item.start >= selectionEnd) {
//                     item.id = (item.start + content.toString().length ) + '_' + (item.end + content.toString().length );
//                     item.start = (item.start + content.toString().length );
//                     item.end = (item.end + content.toString().length );
//                     if(item.ai === true)
//                         item.numberIncre  += content.toString().length
//                 }
//             })

//             if(dataSortArrStringFixed && dataSortArrStringFixed.length > 0)
//                 dataSortArrStringFixed.map((item) => {
//                 if(item.start >= selectionEnd) {
//                         item.id = (item.start + content.toString().length ) + '_' + (item.end + content.toString().length ),
//                         item.idErr = (parseInt(item.idErr.split("_")[0]) + content.toString().length ) + '_' + (parseInt(item.idErr.split("_")[1]) + content.toString().length);
//                         item.start = (item.start + content.toString().length );
//                         item.end = (item.end + content.toString().length );
//                         if(item.ai === true)
//                             item.numberIncre  += content.toString().length
//                 }
//             })



//             const wordErr = textCache.toString().substring(selectionStart,selectionEnd);

//             if(type === 0) {

//                 setTextCache([textCache.slice(0, selectionEnd), content, textCache.slice(selectionEnd)].join(''));

//                 setErrTextArray([...dataSortArrStringErr, {
//                     id: selectionStart + '_' + selectionEnd,
//                     start: selectionStart,
//                     end: selectionEnd,
//                     type: type,
//                     text : wordErr,
//                     ai : false,
//                     isHide : isDeleteWrongWord,
//                     numberIncre : 0

//                 }]);

//                 setFixTextArray([...dataSortArrStringFixed, {
//                     idErr: selectionStart + '_' + selectionEnd,
//                     id: (selectionEnd) + '_' + (selectionEnd + content.toString().length),
//                     start: (selectionEnd),
//                     end: (selectionEnd + content.toString().length),
//                     fixed: content,
//                     type: type,
//                     ai : false,
//                     explain: explain,
//                     numberIncre : 0
//                 }]);


//             }
//             else {
//                 setTextCache([textCache.slice(0, selectionStart), content, textCache.slice(selectionStart)].join(''));

//                 setErrTextArray([...dataSortArrStringErr, {
//                     id: (selectionStart + content.toString().length )+ '_' + ( selectionEnd + content.toString().length),
//                     start: selectionStart + content.toString().length,
//                     end: selectionEnd + content.toString().length,
//                     type: type,
//                     text : wordErr,
//                     ai : false,
//                     isHide : isDeleteWrongWord,
//                     numberIncre : 0

//                 }]);

//                 setFixTextArray([...dataSortArrStringFixed, {
//                     idErr: (selectionStart + content.toString().length )+ '_' + ( selectionEnd + content.toString().length),
//                     id: (selectionStart) + '_' + (selectionStart + content.toString().length),
//                     start: (selectionStart),
//                     end: (selectionStart + content.toString().length),
//                     type: type,
//                     fixed: content,
//                     ai : false,
//                     explain: explain,
//                     numberIncre : 0
//                 }]);

//             }
//         }


//     }

//     return (
//         <View  style = {styles.contentSelection}>
//             <View style = {{flex : 1 , height : SmartScreenBase.smPercenWidth*7 , flexDirection: 'row', justifyContent: 'space-between' , marginTop : SmartScreenBase.smPercenWidth ,  marginBottom : SmartScreenBase.smPercenWidth}}>
//             </View>
//             <View style = {{flex : 1 , height : SmartScreenBase.smPercenWidth*3.5}}>
//                 <Text style={{fontWeight : 'bold' , fontSize : SmartScreenBase.convertSize(50)}}>Tổng số từ : {text.trim().toString().split(" ").length}</Text>

//             </View>
//             <View style = {{flex : 6}}>
//                 <ScrollView vertical keyboardShouldPersistTaps="always">
//                     <SelectableTextComponent
//                         selectable={ !checkAI ? true : false}
//                         textValueProp = {""}
//                         menuItems={["Sửa"]}
//                         onSelection={({ eventType, content, selectionStart, selectionEnd }) => {

//                             if(firstTime === false){

//                                 setStartSelect(selectionStart)
//                                 setEndSelect(selectionEnd)
//                                 setWord(content)
//                                 setModalConfirmVisible1(true)

//                             }
//                             else {

//                                 if (eventType.toString().trim().indexOf('Sửa') > -1) {
//                                     if (checkStringIsContain(selectionStart, selectionEnd, content)) {
//                                         setStartSelect(selectionStart)
//                                         setEndSelect(selectionEnd)
//                                         setWord(content)
//                                         setModalVisible(true)
//                                     }

//                                 }
//                                 else {

//                                 }
//                             }
//                         }}
//                         highlights = {errTextArray}
//                         highlightFixeds = {fixTextArray}
//                         highlightColor = "#EE204E"
//                         highlightFixedColor = "#149414"
//                         onHighlightPress = { (id , type) => {  // word err click , 0 : err cross , 1 : word fixed

//                               if(type === 0) {

//                                   const dataFinded = errTextArray.find(element => element.id === id);
//                                   {
//                                    setObjWordSelect([errTextArray.find(element => element.id === id), fixTextArray.find(element => element.idErr === id)])

//                                    setExplain(fixTextArray.find(element => element.idErr === id).explain)
//                                    setExplainID(fixTextArray.find(element => element.idErr === id).id)

//                                    setWordID(id)
//                                    setModalExplainVisible(true)
//                                }
//                               } else
//                               if(type === 1) {
//                                   const dataFinded = errTextArray.find(element => element.id === fixTextArray.find(element => element.id === id).idErr);
//                                   {
//                                       setObjWordSelect([errTextArray.find(element => element.id === fixTextArray.find(element => element.id === id).idErr), fixTextArray.find(element => element.id === id)])

//                                       setExplain(fixTextArray.find(element => element.id === id).explain)
//                                       setExplainID(id)

//                                       setWordID(fixTextArray.find(element => element.id === id).idErr)
//                                       setModalExplainVisible(true)
//                                   }
//                               }
//                         }}
//                         style={styles.instructions}
//                         value= {text}
//                         valueCache= {textCache}
//                         isSort = {true}
//                         isAI = {checkAI}
//                     />
//                 </ScrollView>
//             </View>
//         </View>
//     );
// };

// export default MarkWrittingBox;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         borderWidth : 0.5,
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "#FFFFFF",
//         padding: 10
//     },
//     welcome: {
//         fontSize: 20,
//         textAlign: "center",
//         margin: 10,
//         color: "#FF0000"
//     },
//     instructions: {
//         textAlign: "center",
//         color: "#333333",
//         marginBottom: 5,
//         color: "#0000FF"
//     },contentSelection: {
//         padding : 10,
//         marginBottom: SmartScreenBase.smPercenWidth*2

//     },
//     card: {
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 3 },
//         shadowOpacity: 0.5,
//         shadowRadius: 5,
//         elevation: 5
//     }
// });