import * as React from 'react'
import { Text, TextInput, StyleSheet, View } from 'react-native'
import SmartScreenBase from '../../base/SmartScreenBase'
import { Colors } from '../../styleApp/color'
import { FontSize, FontWeight } from '../../styleApp/font'
import stylesApp from '../../styleApp/stylesApp'
import FontBase from '../../base/FontBase'

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

export const InputWithFixText = React.memo((props) => {
    const {
        onChangeText,
        style = {},
        containerStyle = {},
        textFix = "",
        ansText = "",
        status = false,
    } = props

    const [inputMode, setInputMode] = React.useState(true)
    const [curText, setCurText] = React.useState("")
    const [isFocus, setIsFocus] = React.useState(false)
    const inputRef = React.useRef()

    return (
        <View style={{
            flex:1,
            flexDirection:'row',
            alignItems:'center',
            flexWrap:'wrap',
            paddingLeft:SmartScreenBase.smPercenWidth
        }}>
            {textFix.split(' ').map((mono) => {
                return(
                    <Text style={styles.textS, styles.textFixS}>
                        {mono+" "}
                    </Text> 
                )
            })                          
            }
            {
                status === true ? (
                    <Text 
                        style={{fontStyle: 'italic',
                        color: '#8E1C76',
                        marginLeft:SmartScreenBase.smPercenWidth*2,
                        fontSize:SmartScreenBase.smFontSize*45}}
                    >
                        {ansText}
                    </Text>
                ) : (
                    <>
                    {inputMode || curText=="" ? <TextInput
                        ref={inputRef}
                        autoFocus={isFocus}
                        autoCorrect={false}
                        style={{
                            borderBottomColor: '#00000050',
                            borderBottomWidth: 0.5,
                            fontStyle: 'italic',
                            color: '#8E1C76',
                            fontSize: SmartScreenBase.smFontSize * 45,
                            marginLeft:SmartScreenBase.smPercenWidth*1,
                            minWidth:SmartScreenBase.smPercenWidth*20,
                            padding:0,
                            paddingBottom:4,
                        }}
                        value={curText}
                        placeholder={'Trả lời...'}
                        autoCapitalize={'none'}
                        multiline={true}
                        onChangeText={(text) => {
                            onChangeText(text);
                            setCurText(text)
                        }}
                        onEndEditing={(text)=>{
                            setInputMode(false)
                        }}
                    /> : 
                    <>
                    {
                        curText.split(' ').map((mono) => {
                            return(
                                <Text onPress={()=>{setInputMode(true); setIsFocus(true)}} style={styles.textS, styles.textFiniS}>
                                    {mono+" "}
                                </Text> 
                            )
                        })
                    }
                    </>}
                </>
            )}
        </View>
    )
})

const styles = StyleSheet.create({
    textFixS: {
        fontSize: SmartScreenBase.smFontSize*45,
        fontFamily: FontBase.MyriadPro_Bold,
        color: Colors.NearBlack
    },
    textFiniS: {
        fontSize: SmartScreenBase.smFontSize*45,
        fontFamily: FontBase.MyriadPro_Regular,
        color: Colors.Violet
    },
});