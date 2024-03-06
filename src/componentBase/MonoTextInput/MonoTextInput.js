import React, {forwardRef,useImperativeHandle} from 'react'
import { StyleSheet, Text, TextInput, TextProps, View, Platform, FlatList } from 'react-native'
import SmartScreenBase from '../../base/SmartScreenBase'
import { Colors } from '../../styleApp/color'
import { FontSize, FontWeight } from '../../styleApp/font'
import stylesApp from '../../styleApp/stylesApp'
import { TextBox } from '../TextBox'
import { useState,useEffect,useRef } from 'react'
// import { FlatList } from 'react-native-gesture-handler'
import FontBase from '../../base/FontBase'
import LogBase from '../../base/LogBase'

/**
 * @summary The text input component with a title, app's font family and default font size.
 * 
 * @param {object} props 
 * @property {string} title: The title of the input
 * @property {TextStyle} titleStyle: Style of the title
 * @property {string} value: value of the input
 * @property {function} onChangeText
 * @property {TextInputStyle} style: Style of the input
 * @property {ViewStyle} containerStyle: Style of the container
 * 
 * @returns {Component}
 */

export const MonoTextInput = forwardRef((props,ref) => {

    const InputStatus = {
        Right : 'Right',
        Wrong : 'Wrong',
        UnCheck : 'UnCheck',
        Voice : 'Voice'
    }

    const [data, setData] = useState([]);
    const [editAble, setEditAble] = useState(true)
    const inputList = useRef([]);

    useEffect(()=>{
        createData()
    },[])

    useImperativeHandle(ref, () => ({
        showResult, createData
    }));

    showResult = (resList) => {
        LogBase.log("=====showResult",resList)
        var mData = [...data]
        var indk = 0
        for (let i = 0; i < mData.length; i++) {
            LogBase.log("=====mData[i]",mData[i])
            if(mData[i].status == InputStatus.Voice) continue
            else {
                mData[i].status = resList[indk].color
                indk = indk + 1
            }
        }
        setData(mData)
        setEditAble(false)
    }

    createData = () => {
        var curData = []
        props.data.forEach(element => {
            var mono = {}
            mono.mChar = ''
            if(element == ' '){
                mono.status = InputStatus.Voice
            }else{
                mono.status = InputStatus.UnCheck
            }
            curData.push(mono) 
        });
        setData(curData)
        setEditAble(true)
        if(inputList.current){
            inputList.current.forEach(element => {
                element.clear()
            });
        }
    }

    getColor = (status) => {
        // LogBase.log("=====getColor",status)
        var color = '#fff'
        switch (status) {
            case InputStatus.UnCheck:
                color = '#fff'
                break;
            case InputStatus.Right:
                color = '#388C02'
                break;
            case InputStatus.Wrong:
                color = '#D80B0B'
                break;
            default:
                break;
        }
        return color
    }

    downIndex = (index) => {
        var mIndex = index - 1
        var contin = true
       while (contin){
            if(mIndex > 0){
                if(data[mIndex].status == InputStatus.Voice){
                    mIndex = mIndex - 1
                }else{
                    contin = false
                }
            }else{
                contin = false
            }
        }
        return mIndex
    }

    upIndex = (index) => {
        var mIndex = index + 1
        var contin = true
       while (contin){
            if(mIndex < data.length-1){
                if(data[mIndex].status == InputStatus.Voice){
                    mIndex = mIndex + 1
                }else{
                    contin = false
                }
            }else{
                contin = false
            }
        }
        return mIndex
    }

    _changeText = (string, index) => {

        LogBase.log("=====inputList")
        
        var listCache = [...data]
        if(!string && !data[index].mChar){ return }
        if(string.length == 1){
            LogBase.log("string.length == 1",upIndex(index))
            if(index < data.length - 1 && listCache[upIndex(index)].mChar == ''){
                inputList.current && inputList.current[upIndex(index)].focus()
            }
            if(listCache[index].mChar.length == 0 && string != ' '){
                listCache[index].mChar = string
            }
            if(string.toLowerCase() == 'ư') listCache[index].mChar = 'w'
        }else if(string.length == 0 && Platform.OS == 'ios'){
            LogBase.log("string.length == 0",index)
            if(index > 0 && listCache[index].mChar == ''){
                listCache[downIndex(index)].mChar = ''
            }else{
                listCache[index].mChar = string
            }
            if(index > 0) inputList.current && inputList.current[downIndex(index)].focus()
        }else if(string.length > 1){
        }
        setData(listCache)
        props.updateText(listCache)
    }

    const mInput = ({item, index}) => {

        return (
        <TextInput
            ref={cInput => {
                inputList.current[`${index}`] = cInput
            }}
            editable={editAble}
            value={item.mChar.toUpperCase()}
            autoCorrect={false}
            maxLength={1}
            autoComplete={'off'}
            containerStyle={styles.container}
            style={[styles.textInput, {opacity: item.status == InputStatus.Voice ? 0 : 1, color: getColor(item.status)}]}
            onKeyPress={({ nativeEvent }) => {
                // LogBase.log("=====nativeEvent",nativeEvent)
                if(Platform.OS == 'ios'){
                    if (nativeEvent.key != ' ' && nativeEvent.key != 'Backspace' && (item.mChar && item.mChar != '') && (index < data.length - 1)) {
                        LogBase.log("=====nativeEvent",nativeEvent)
                        var listCache = [...data]
                        if(index < data.length - 1 && listCache[upIndex(index)].mChar == ''){
                            inputList.current && inputList.current[upIndex(index)].focus()
                        }
                        // _changeText(nativeEvent.key, upIndex(index))
                    }
                    else if(nativeEvent.key == 'Backspace' && (!item.mChar || (item.mChar && item.mChar == '')) && index > 0){
                        inputList.current && inputList.current[downIndex(index)].focus()
                    }
                }else{
                    if (nativeEvent.key != ' ' && nativeEvent.key != 'Backspace' && (index <= data.length - 1)) {
                    }else if(nativeEvent.key == 'Backspace' && index >= 0){
                        var listCache = [...data]
                        if(index > 0 && listCache[index].mChar == ''){
                            inputList.current && inputList.current[downIndex(index)].focus()
                            listCache[downIndex(index)].mChar = ''
                        }else{
                            listCache[index].mChar = ''
                        }
                        setData(listCache)
                        props.updateText(listCache)
                    }
                }
            }}
            onChangeText={(str) => _changeText(str, index)}
            // autoCapitalize={'characters'}
            selection={{start: 1, end: 1}}
            // selectTextOnFocus={true}
            // selectionColor={'#00000000'}
            // contextMenuHidden={true}
            // onBlur={(str)=> {
            //     _changeText(str, index)
            // }}
            // onEndEditing={onEndEditing}
        />
        )
    }

    return (
            <View style={{ flexDirection: "row"}}>
                <FlatList
                    data={data}
                    renderItem={(item, index) => mInput(item, index)}
                    horizontal={false}
                    // extraData={valueAnswer}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={8}
                    style={{ marginTop: 10, paddingVertical: 10, alignSelf: 'center' }}
                    />
                </View>
    )
})

const styles = StyleSheet.create({
    textInput: {
        fontSize: SmartScreenBase.smFontSize*65,
        fontFamily: FontBase.MyriadPro_Bold,
        marginRight: SmartScreenBase.smPercenWidth * 2,
        textAlign: 'center',
        width: SmartScreenBase.smPercenWidth * 8,
        height: SmartScreenBase.smPercenWidth * 12,
        borderBottomWidth: 2,
        marginBottom: SmartScreenBase.smPercenWidth * 2,
        borderColor: 'lightgray',
    },
    titleText: {
        color: Colors.Black,
        fontSize: FontSize.size50Font,
        ...FontWeight.Regular,
        paddingHorizontal: SmartScreenBase.smBaseWidth * 70,
    },
    errorText: {
        color: Colors.Red_BE1,
        fontSize: FontSize.size45Font,
        ...FontWeight.Regular,
        marginTop: SmartScreenBase.smPercenWidth,
        paddingHorizontal: SmartScreenBase.smBaseWidth * 70,
    },
    container: {
        width: '100%'
    }
})