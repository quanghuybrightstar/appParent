import React, {useState, useEffect} from 'react';
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
} from 'react-native';
// import update from 'immutability-helper'
import {LineChart} from 'react-native-charts-wrapper';
import FontBase from '../../base/FontBase';
import SmartScreenBase from '../../base/SmartScreenBase';
import LogBase from '../../base/LogBase';
import {Colors} from '../../styleApp/color';

const LineChartInforLearned = props => {
  const [color, setColor] = useState('#47a49d90');
  // Remove duplicate labels
  const uniqueLabels = Array.from(new Set(props.label));

  // Limit the number of labels to display
  const maxLabelsToDisplay = 5;
  const slicedLabels = uniqueLabels.slice(0, maxLabelsToDisplay);

  // Map data values corresponding to the sliced labels
  // Map data values corresponding to the sliced labels
  const slicedData = slicedLabels.map(label => {
    const dataIndex = props.label.indexOf(label);
    return dataIndex !== -1 ? Math.ceil(props.data[dataIndex]) : 0;
  });
  const [data, setData] = useState({
    dataSets: [
      {
        values: slicedData,
        label: '',
        config: {
          mode: false,
          drawValues: true,
          lineWidth: 1,
          drawCircles: true,
          circleColor: processColor(Colors.Orange_F8),
          drawCircleHole: false,
          circleRadius: 3,
          color: processColor(Colors.Black),
          drawFilled: true,
          fillGradient: {
            colors: [processColor('transparent'), processColor('transparent')],
            positions: [0, 1],
            angle: 90,
            orientation: 'TOP_BOTTOM',
          },
          fillAlpha: 300,
          valueTextSize: SmartScreenBase.smFontSize * 40,
          fontFamily: FontBase.MyriadPro_Bold,
        },
      },
    ],
  });
  useEffect(() => {
    LogBase.log('=====dataChart', props.data);
    let dataChart = {
      dataSets: [
        {
          values: slicedData,
          label: '',
          config: {
            mode: false,
            drawValues: true,
            lineWidth: 1,
            drawCircles: true,
            circleColor: processColor(Colors.Orange_F8),
            drawCircleHole: false,
            circleRadius: 3,
            color: processColor(Colors.Black),
            drawFilled: true,
            valueFormatter: '#',
            fillGradient: {
              colors: [
                processColor('transparent'),
                processColor('transparent'),
              ],
              positions: [0, 1],
              angle: 90,
              orientation: 'TOP_BOTTOM',
            },
            fillAlpha: 300,
            digits: 0,
            valueTextSize: SmartScreenBase.smFontSize * 40,
            fontFamily: FontBase.MyriadPro_Bold,
          },
        },
      ],
    };
    setData(dataChart);
  }, [props.index, props.data]);

  const newData = props.data.map(d => Math.ceil(d));
  const maxValue = newData.length > 0 ? Math.max(...newData) : 0;
  const minValue = newData.length > 0 ? Math.min(...newData) : 0;
  const avgData = Math.ceil((maxValue - minValue) / 5);

  return (
    <View style={styles.container}>
      <View>
        <LineChart
          style={[styles.chart]}
          data={data}
          chartDescription={{text: ''}}
          legend={{
            enabled: false,
          }}
          xAxis={{
            enabled: true,
            granularityEnabled: true,
            granularity: 1,
            digits: 3,
            drawLabels: true,
            position: 'BOTTOM',
            drawAxisLine: true,
            drawGridLines: true,
            textSize: SmartScreenBase.smFontSize * 33,
            fontFamily: FontBase.MyriadPro_Regular,
            textColor: processColor(Colors.Black),
            valueFormatter: props.label,
            // labelRotationAngle:-45,
            avoidFirstLastClipping: true,
            // axisLabelCount: 3,
            // labelCount: 3, // Max number of labels to display initially
            // horizontalScroll: true, // Enable horizontal scrolling
            yOffset: 35 * SmartScreenBase.smBaseWidth,
            labelCount: Math.min(slicedLabels.length, 5), // Use slicedLabels here
            horizontalScroll: true,
            valueFormatter: slicedLabels,
          }}
          yAxis={{
            left: {
              enabled: true,
              drawAxisLine: true,
              drawGridLines: true,
              drawLabels: value => value != 0 && value > 0,
              //   position: 'OUTSIDE_CHART',
              textColor: processColor(Colors.Black),
              axisMaximum: maxValue < 5 ? 5 : maxValue + avgData,
              axisMinimum: 0,
              // minWidth: 100,
              //   centerAxisLabels: true,
              //   valueFormatter: '#',
              textSize: SmartScreenBase.smFontSize * 33,
              fontFamily: FontBase.MyriadPro_Regular,
              labelCount: 5,
              inverted: false,
              axisLabelCount: 5,
              valueFormatter: '#     ',
              axisMinimum: 0,
              drawZeroLine: false,
            },
            right: {
              enabled: false,
            },
          }}
          autoScaleMinMaxEnabled
          animation={{
            durationX: 0,
            durationY: 1200,
          }}
          drawGridBackground={false}
          drawBorders={false}
          touchEnabled={true}
          dragEnabled={true}
          scaleEnabled={true}
          //   scaleXEnabled={true}
          //   scaleYEnabled={true}
          pinchZoom={false}
          doubleTapToZoomEnabled={false}
          dragDecelerationEnabled={false}
          keepPositionOnRotation={false}
          valueFormatter="#"
          //   markerLineConfig={markerLineConfig}
          scaleXEnabled={true} // enable scaling of the x-axis
          scaleYEnabled={true} // enable scaling of the y-axis
          onSelect={event => props.handleSelectPoint(event.nativeEvent)}
          //   highlightPerTapEnabled={false} // Disable highlighting on tap
          // highlightPerDragEnabled={false}
        />

        <Text style={styles.yAxisLabelTop}>Phút</Text>
        <Text style={styles.xAxisLabelTop}>Tháng</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    backgroundColor: Colors.White,
    paddingBottom: SmartScreenBase.smBaseWidth * 10,
    // paddingHorizontal: 10,
    width: '100%',
  },
  chart: {
    width: '100%',
    height: SmartScreenBase.smPercenWidth * 40,
  },
  yAxisLabelTop: {
    position: 'absolute',
    top: -8 * SmartScreenBase.smBaseWidth,
    left: 8 * SmartScreenBase.smBaseWidth,
    fontSize: SmartScreenBase.smFontSize * 35,
    color: Colors.Black,
  },
  xAxisLabelTop: {
    position: 'absolute',
    bottom: -8 * SmartScreenBase.smBaseWidth,
    left: 0 * SmartScreenBase.smBaseWidth,
    fontSize: SmartScreenBase.smFontSize * 35,
    color: Colors.Black,
  },
});

export default LineChartInforLearned;
