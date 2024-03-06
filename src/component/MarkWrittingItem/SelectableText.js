import React from 'react'
import { Text, requireNativeComponent, Platform , View , TouchableOpacity } from 'react-native'
import { v4 } from 'uuid'
import FontBase from '../../base/FontBase'
import SmartScreenBase from '../../base/SmartScreenBase'

const RNSelectableText = requireNativeComponent('RNSelectableText')

/**
 * numbers: array({start: int, end: int, id: string})
 */
const combineHighlights = (numbers => {
    return numbers
        .sort((a, b) => a.start - b.start || a.end - b.end)
        .reduce(function(combined, next) {
            if (!combined.length || combined[combined.length - 1].end < next.start) combined.push(next)
            else {
                var prev = combined.pop()
                combined.push({
                    start: prev.start,
                    end: Math.max(prev.end, next.end),
                    id: next.id,
                })
            }
            return combined
        }, [])
})

/**
 * value: string
 * highlights: array({start: int, end: int, id: any , fixed: any})
 */
const mapHighlightsRanges = (value, valueCache , highlights , highlightFixeds , isSort ) => {
    
    const combinedHighlights = isSort ? combineHighlights(highlights) : highlights;
    const combinedFixedHighlights = isSort ?  combineHighlights(highlightFixeds) : highlightFixeds;
    console.log("=====combinedHighlights",combinedHighlights)
    console.log("=====highlightFixeds",highlightFixeds)
    // console.log(combinedHighlights);
    // console.log("highlights "+ JSON.stringify(highlights));
    // console.log("highlightFixeds "+JSON.stringify(highlightFixeds));
    // console.log(combinedFixedHighlights);
    // console.log('---------------------------------------');
    // console.log(combinedFixedHighlights);

    if (combinedHighlights.length === 0 || combinedFixedHighlights.length === 0 ) return [{ isHighlight: false, text: valueCache }]



    const data = [{ isHighlight: false, text: value.slice(0, combinedHighlights[0].type === 0 ? combinedHighlights[0].start : combinedFixedHighlights[0].start) }]

    combinedHighlights.forEach(({ start, end , fixed , type , id , isHide , explain}, idx) => {

        if(!explain){
            explain = ""
        }

        if (combinedHighlights[idx] && combinedFixedHighlights[idx] ) {
            if (type === 0) {
                data.push({
                    id: id,
                    isHighlight: true,
                    isHighlightFixed: false,
                    text: valueCache.slice(start, end),
                    textFixed: fixed,
                    isHide: isHide,
                    lExplain: combinedFixedHighlights[idx].explain ? combinedFixedHighlights[idx].explain.length>0 ? true : null : null
                })

                data.push({
                    id: combinedFixedHighlights[idx].id,
                    isHighlight: false,
                    isHighlightFixed: true,
                    text: valueCache.slice(combinedFixedHighlights[idx].start, combinedFixedHighlights[idx].end),
                    textFixed: fixed,
                    isHide: isHide,
                    lExplain: combinedFixedHighlights[idx].explain ? combinedFixedHighlights[idx].explain.length>0 ? true : null : null

                })

                if (combinedHighlights[idx + 1] && combinedFixedHighlights[idx + 1]) {
                    if (combinedHighlights[idx + 1].type === 0)
                        data.push({
                            isHighlight: false,
                            isHighlightFixed: false,
                            text: valueCache.slice(combinedFixedHighlights[idx].end, combinedHighlights[idx + 1].start),
                            isHide: isHide,
                            lExplain: combinedFixedHighlights[idx].explain ? combinedFixedHighlights[idx].explain.length>0 ? true : null : null
                        })
                    else
                        data.push({
                            isHighlight: false,
                            isHighlightFixed: false,
                            text: valueCache.slice(combinedFixedHighlights[idx].end, combinedFixedHighlights[idx + 1].start),
                            isHide: isHide,
                            lExplain: combinedFixedHighlights[idx].explain ? combinedFixedHighlights[idx].explain.length>0 ? true : null : null
                        })
                }
            }
            else {
                data.push({
                    id: combinedFixedHighlights[idx].id,
                    isHighlight: false,
                    isHighlightFixed: true,
                    text: valueCache.slice(combinedFixedHighlights[idx].start, combinedFixedHighlights[idx].end),
                    textFixed: fixed,
                    isHide: isHide,
                    lExplain: combinedFixedHighlights[idx].explain ? combinedFixedHighlights[idx].explain.length>0 ? true : null : null
                })

                data.push({
                    id : id,
                    isHighlight: true,
                    isHighlightFixed: false,
                    text: valueCache.slice(start, end),
                    textFixed: fixed,
                    isHide: isHide,
                    lExplain: combinedFixedHighlights[idx].explain ? combinedFixedHighlights[idx].explain.length>0 ? true : null : null
                })

                if (combinedHighlights[idx + 1] && combinedFixedHighlights[idx + 1]) {
                    if (combinedHighlights[idx + 1].type === 0)
                        data.push({
                            isHighlight: false,
                            isHighlightFixed: false,
                            text: valueCache.slice(combinedHighlights[idx].end, combinedHighlights[idx + 1].start),
                            isHide: isHide,
                            lExplain: combinedFixedHighlights[idx].explain ? combinedFixedHighlights[idx].explain.length>0 ? true : null : null
                        })
                    else
                        data.push({
                            isHighlight: false,
                            isHighlightFixed: false,
                            text: valueCache.slice(combinedHighlights[idx].end, combinedFixedHighlights[idx + 1].start),
                            isHide: isHide,
                            lExplain: combinedFixedHighlights[idx].explain ? combinedFixedHighlights[idx].explain.length>0 ? true : null : null
                        })
                }

            }


            // totalLenghtInsert += (combinedFixedHighlights[idx].end - combinedFixedHighlights[idx].start) - 1
        }

    })

    if (combinedHighlights[combinedHighlights.length - 1].type === 0)
        data.push({
            isHighlight: false,
            isHighlightFixed: false,
            text: valueCache.slice(combinedFixedHighlights[combinedFixedHighlights.length - 1].end, valueCache.length),
            isHide: false,
            // lExplain: combinedFixedHighlights[combinedFixedHighlights.length - 1].explain ? combinedFixedHighlights[combinedFixedHighlights.length - 1].explain.length>0 : false
            lExplain: combinedFixedHighlights[combinedFixedHighlights.length - 1].explain ? combinedFixedHighlights[combinedFixedHighlights.length - 1].explain.length>0 ? true : null : null
        })
     else
        data.push({
            isHighlight: false,
            isHighlightFixed: false,
            text: valueCache.slice(combinedHighlights[combinedHighlights.length - 1].end, valueCache.length),
            isHide: false,
            // lExplain: combinedHighlights[combinedHighlights.length - 1].explain ? combinedHighlights[combinedHighlights.length - 1].explain.length>0 : false
            lExplain: combinedFixedHighlights[combinedFixedHighlights.length - 1].explain ? combinedFixedHighlights[combinedFixedHighlights.length - 1].explain.length>0 ? true : null : null
        })


    console.log("=====DataFF",data);
    return data.filter(x => x.text)
}

/**
 * Props
 * ...TextProps
 * onSelection: ({ content: string, eventType: string, selectionStart: int, selectionEnd: int }) => void
 * children: ReactNode
 * highlights: array({ id, start, end })
 * highlightColor: string
 * onHighlightPress: string => void
 * onHighlightPressFixed: string => void
 * textValueProp: string
 * TextComponent: ReactNode
 * textComponentProps: object
 */
export const SelectableTextComponent = ({
                                            onSelection, onHighlightPress , textValueProp, value , valueCache, TextComponent,
                                            textComponentProps, ...props
                                        }) => {


    const usesTextComponent = !TextComponent;
    TextComponent = TextComponent || Text;
    textValueProp = textValueProp || 'children';  // default to `children` which will render `value` as a child of `TextComponent`
    const onSelectionNative = ({
                                   nativeEvent: { content, eventType, selectionStart, selectionEnd },
                               }) => {
        onSelection && onSelection({ content, eventType, selectionStart, selectionEnd })
    }

    const onHighlightPressNative = onHighlightPress
        ? Platform.OS === 'ios'
            ? ({ nativeEvent: { clickedRangeStart, clickedRangeEnd } }) => {

                if (!props.highlights || props.highlights.length === 0) return

                const mergedHighlights = combineHighlights(props.highlights)
                const mergedFixHighlights = combineHighlights(props.highlightFixeds)


                const hightlightInRange = mergedHighlights.find(
                    ({ start, end }) => clickedRangeStart >= start - 1 && clickedRangeEnd <= end + 1,
                )

                const hightlightFixInRange = mergedFixHighlights.find(
                    ({ start, end }) => clickedRangeStart >= start - 1 && clickedRangeEnd <= end + 1,
                )

                if (hightlightInRange) {
                    onHighlightPress(hightlightInRange.id , 0)
                }

                if (hightlightFixInRange) {
                    onHighlightPress(hightlightFixInRange.id , 1)
                }

            }
            :  onHighlightPress
        : () => {}


    // highlights feature is only supported if `TextComponent == Text`

    let textValue = value;
    console.log("=====wordData", value)
    if (usesTextComponent) {
        textValue = (
            props.highlights && props.highlights.length > 0
                ? mapHighlightsRanges(value , valueCache , props.highlights , props.highlightFixeds, props.isSort).map(({ id, isHighlight, text , textFixed , isHighlightFixed , isHide , lExplain}) => (

                    <Text
                        key={v4()}
                        selectable
                        style={
                            isHide && isHighlight
                                ? lExplain ? {
                                        color: props.highlightColor,
                                        // textDecorationLine: 'line-through',
                                        textDecorationLine: 'line-through',
                                        fontFamily: FontBase.MyriadPro_Bold,
                                        backgroundColor: "#FFE699",
                                        // textDecorationStyle: 'solid',
                                        textAlign: 'left',
                                    } : {
                                        color: props.highlightColor,
                                        textDecorationLine: 'line-through',
                                        fontFamily: FontBase.MyriadPro_Regular,
                                        textDecorationStyle: 'solid',
                                        textAlign: 'left',
                                    }
                                : isHighlightFixed ? lExplain ?
                                    {
                                        color: props.highlightFixedColor,
                                        // textDecorationStyle: 'solid',
                                        fontFamily: FontBase.MyriadPro_Bold,
                                        backgroundColor: "#FFE699",
                                        // textDecorationLine: 'underline',
                                        textAlign: 'left',
                                    } : {
                                        color: props.highlightFixedColor,
                                        fontFamily: FontBase.MyriadPro_Regular,
                                        textDecorationStyle: 'solid',
                                        textAlign: 'left',
                                    }
                                : {
                                    textAlign: 'left',
                                    color : '#000000',
                                }
                        }

                        onPress={() => {
                            if (isHide && isHighlight) {
                                  onHighlightPress(id , 0)
                            }
                            else if(isHighlightFixed)
                                onHighlightPress(id , 1)
                        }}

                    >
                        {text}
                    </Text>

                ))
                : [value]
        );
        if (props.appendToChildren) {
            textValue.push(props.appendToChildren);
        }
    }

    return (
        <RNSelectableText
            {...props}
            onHighlightPress={onHighlightPressNative}
            selectable
            onSelection={onSelectionNative}
        >
            <TextComponent 
                style={{textAlign: 'left',
                        color : '#000'}}
                key={v4()}
                {...{[textValueProp]: textValue, ...textComponentProps}}
            />
        </RNSelectableText>
    )
}
