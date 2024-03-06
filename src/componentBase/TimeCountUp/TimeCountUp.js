import * as React from 'react'
import { Platform, Text, StyleSheet, View } from 'react-native'
import SmartScreenBase from '../../base/SmartScreenBase'
import { Colors } from '../../styleApp/color'
import { FontSize, FontWeight } from '../../styleApp/font'
import FontBase from '../../base/FontBase'
import { useState } from 'react'
import dateTimeHelper from '../../utils/dateTimeHelper'
import { useRef, forwardRef, useImperativeHandle,useEffect} from 'react'

/**
 * @summary The text component with app's font family and default font size.
 * 
 * @param {object} props 
 * @property {string} text: The string will be display
 * @property {Component} children: The children component
 * @property {TextStyle} style: Style of the text
 * @property {string} color: Color of the text
 * 
 * @returns {Component}
 */

export const TimeCountUp = forwardRef((props, ref ) => {
    const { visible, curTime} = props

    const [ctime, setCtime] = useState(curTime || 0)
    const timer = useRef()
    var sum = 0

    useEffect(()=>{
        start()
    },[])

    useImperativeHandle(ref, () => ({
        start, stop
      }));

      const start = () => {
        console.log("=====start")
        timer.current = setTimeout(() => {
            run()
          }, 1000)
      }

      const run = () => {
        sum = sum + 1
        console.log("=====run1",sum)
        setCtime(sum)
        timer.current = setTimeout(() => {
            run()
          }, 1000)
    }

      const stop = () => {
        setCtime(0)
        clearTimeout(timer.current);
    }

    return (
        <View
            style={[styles.container,{opacity: visible ? 1 : 0}]}>
            <Text style={styles.textSt}>{dateTimeHelper.convertSecondToMM_SS(ctime)}</Text>
        </View>
    )
})

const styles = StyleSheet.create({

    container: {
        justifyContent: 'center',
        alignItems: 'center',
        width: SmartScreenBase.smPercenWidth * 20,
        height: SmartScreenBase.smPercenWidth * 7,
        resizeMode: 'contain',
    },

    textSt: {
        fontSize: SmartScreenBase.smFontSize * 50,
        fontFamily: FontBase.MyriadPro_Bold,
        color: '#5fb296',
    },

})