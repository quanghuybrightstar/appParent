import React from 'react';
import { Modal, TouchableOpacity, View, StyleSheet, FlatList} from 'react-native';
import SmartScreenBase from '../../base/SmartScreenBase';
import { Colors } from '../../styleApp/color';
import { TextBox } from '../TextBox';
import FontBase from '../../base/FontBase';

/**
 * @summary Select modal
 * 
 * @param {object} props
 * @property {boolean} visible: visible of the Loading
 * 
 * @returns {Component}
 */
export default SelectModal = (
  props
) => {

    const { onChange } = props

    if(props.isShow){
        return (
        <TouchableOpacity onPress={props.close} style={_styles.background}>
            <View style={[_styles.container, {...props.style}]}>
                {/* {console.log("=====data",props.datalist)} */}
                      <FlatList
                          data={props.datalist}
                          keyExtractor={(item, index) => item.id + index.toString()}
                          renderItem={({ item, index }) => (
                                      <TouchableOpacity 
                                      onPress={() => onChange(index)} 
                                      style={_styles.item}>
                                          {console.log("=====data",item.value)}
                                          <TextBox style={{fontSize: SmartScreenBase.smFontSize*50 ,fontFamily: FontBase.MyriadPro_Bold, color: item.color ? item.color : Colors.Red_BE1}} text={item.label ? item.label : "Vì sao mà khó thế"}/>
                                      </TouchableOpacity>
                              )
                          }
                      />
            </View>
        </TouchableOpacity>
        );
    }  else { return (null);}
};

const _styles = StyleSheet.create({
    background: {
        width: SmartScreenBase.smPercenWidth*100,
        height: SmartScreenBase.smPercenHeight*100,
        position: 'absolute',
        bottom : 0,
        backgroundColor: "#00000070",
        justifyContent: "flex-end"
      },
  container: {
    width: SmartScreenBase.smPercenWidth*100,
    backgroundColor: Colors.White,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
      width: SmartScreenBase.smPercenWidth*100,
      height: SmartScreenBase.smPercenWidth*12, 
      alignItems: 'center', 
      justifyContent: 'center'
    }

});

