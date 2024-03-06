import React, { useState, useEffect } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    processColor,
    LayoutAnimation,
    Dimensions,
    Image,
    TouchableOpacity,
    LogBox,
} from 'react-native';
// import update from 'immutability-helper'
const { width, height } = Dimensions.get('window');
import { LineChart } from 'react-native-charts-wrapper';
import FontBase from '../../base/FontBase';
import SmartScreenBase from '../../base/SmartScreenBase';
import LogBase from '../../base/LogBase';

const LineChartScreen = (props) => {
    const [color,setColor] = useState('#47a49d90');
    const [status,setStatus] = useState(false);
    const [data, setData] = useState({
        dataSets: [
            {
                values: props.data,
                label: '',
                config: {
                    mode: false,
                    drawValues: true,
                    lineWidth: 2,
                    drawCircles: true,
                    circleColor: processColor(color),
                    drawCircleHole: false,
                    circleRadius: 3,
                    color: processColor(color),
                    drawFilled: true,
                    fillGradient: {
                        colors: [processColor('#c9e4ef80'), processColor('#c9e4ef80')],
                        positions: [0, 1],
                        angle: 90,
                        orientation: 'TOP_BOTTOM',
                    },
                    fillAlpha: 300,
                    valueTextSize: 12,
                },
            },
        ],
    });
    useEffect(()=>{
        LogBase.log("=====dataChart",props.data)
        let dataChart =  {
            dataSets: [
                {
                    values: props.data.map(d =>Math.ceil(d)),
                    label: '',
                    config: {
                        mode: false,
                        drawValues: true,
                        lineWidth: 2,
                        drawCircles: true,
                        circleColor: processColor(props.color),
                        drawCircleHole: false,
                        circleRadius: 3,
                        color: processColor(props.color),
                        drawFilled: true,
                        valueFormatter:'#',
                        fillGradient: {
                            colors: [processColor('#c9e4ef80'), processColor('#c9e4ef80')],
                            positions: [0, 1],
                            angle: 90,
                            orientation: 'TOP_BOTTOM',
                        },
                        fillAlpha: 300,
                        valueTextSize: 12,
                        digits:0,
                        textSize: SmartScreenBase.smFontSize * 32,
                        fontFamily:FontBase.MyriadPro_Regular,
                    },
                },
            ],
        };
        setData(dataChart);
    },[props.index,props.data]);

    const newData = props.data.map(d => Math.ceil(d));
    const maxValue = newData.length > 0 ? Math.max(...newData) : 0;
    const minValue = newData.length > 0 ? Math.min(...newData) : 0;
    const avgData = Math.ceil((maxValue - minValue) / 5);
    return (
        <View style={styles.container}>
            {
                props.showLabel && <Text style={{ marginTop: 10, color: '#acacac',marginLeft:5,fontSize:12, fontFamily: FontBase.MyriadPro_Regular}}>
          Đơn vị: Phút
                </Text>
            }
            <View style={{overflow: 'hidden'}}>
                <LineChart
                    style={[styles.chart, {marginTop: props.showLabel ? 0 : 30}]}
                    data={data}
                    chartDescription={{ text: '' }}
                    legend={{
                        enabled: false,
                    }}
                    xAxis={{
                        enabled: true,
                        granularity: 1,
                        digits:3,
                        drawLabels: true,
                        position: 'BOTTOM',
                        drawAxisLine: true,
                        drawGridLines: true,
                        textSize: SmartScreenBase.smFontSize * 32,
                        fontFamily:FontBase.MyriadPro_Regular,
                        textColor: processColor('gray'),
                        valueFormatter: props.label,
                        // labelRotationAngle:-45,
                        avoidFirstLastClipping:true,
                    }}
                    yAxis={{
                        left: {
                            enabled: true,
                            // position: 'OUTSIDE_CHART',
                            textColor: processColor('gray'),
                            axisMaximum: maxValue < 5 ? 5 : maxValue + avgData,
                            axisMinimum: 0,
                            // minWidth: 100,
                            centerAxisLabels: true,
                            valueFormatter: '  #       ',
                            textSize: SmartScreenBase.smFontSize * 40,
                            fontFamily:FontBase.MyriadPro_Regular,
                            labelCount: 5,
                            inverted: false,
                        },
                        right: {
                            enabled: false,
                        },
                    }}
                    autoScaleMinMaxEnabled
                    animation={{
                        durationX: 0,
                        durationY: 1500,
                    }}
                    drawGridBackground={false}
                    drawBorders={false}
                    touchEnabled={false}
                    dragEnabled={true}
                    scaleEnabled={false}
                    scaleXEnabled={false}
                    scaleYEnabled={false}
                    pinchZoom={false}
                    doubleTapToZoomEnabled={false}
                    dragDecelerationEnabled={false}
                    keepPositionOnRotation={false}
                    valueFormatter="#"
                />
            </View>
        </View>
    );

};

const styles = StyleSheet.create({
    container: {
        borderRadius: 25,
        backgroundColor: '#f1f2f2',
        paddingBottom: 20,
        // paddingHorizontal: 10,
        width: '100%',
    },
    chart: {
        width: '99%',
        height: height / 2,
    },
});

export default LineChartScreen;
