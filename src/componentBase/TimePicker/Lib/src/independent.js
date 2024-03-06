/*
 * @Author: xuwei
 * @Date: 2021-02-01 18:17:39
 * @LastEditTime: 2021-02-05 16:23:12
 * @LastEditors: xuwei
 * @Description:
 */

import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import { SingleSlide } from './single';
export class IndependentPicker extends PureComponent {
  constructor(props) {
    super(props);
    // this._initData();
  }

  _initData = () => {
    const { dataSource } = this.props;
    dataSource.forEach((element, index) => {
      this.props.setResult(index, element[0]);
    });
  };

  componentDidUpdate() {
  }

  _done = (dataindex, parindex) => {
    const { dataSource, onceChange } = this.props;
    const list = dataSource[parindex];
    this.props.setResult(parindex, list[dataindex]);
    onceChange && onceChange();
  };
  

  render() {
    const { dataSource, pickerStyle, textProps, defaultValueIndexes } = this.props;
    return (
      <View style={sts.all}>
        {dataSource.map((list, index) => (
          <SingleSlide
            list={list}
            key={index}
            inparindex={index}
            done={this._done}
            textProps={textProps}
            defaultIndex={defaultValueIndexes ? defaultValueIndexes[index] : 0}
            {...pickerStyle}
          />
        ))}
      </View>
    );
  }
}
const sts = StyleSheet.create({
  all: {
    flexDirection: 'row',
    overflow: 'hidden',
  },
});
