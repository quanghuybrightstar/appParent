import React, { PureComponent } from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import SmartScreenBase from "../../base/SmartScreenBase";


class ItemFilter extends PureComponent {
    render() {
        const item = this.props.Data;
        const index = this.props.index;
        const Selected = this.props.index === this.props.indexSelected?true:false;
        return (
            <View style={{flex:1,flexDirection:'row',marginVertical:SmartScreenBase.smPercenWidth*3,paddingHorizontal:SmartScreenBase.smPercenWidth*5}}>
                <TouchableOpacity style={{flex:1,flexDirection:'row',alignItems:'center'}}
                    onPress={()=>{this.props._onChangeRadioButton(index)}}
                >
                    {Selected?
                        <Image source={{ uri: "gv_liststudent_16" }} style={{
                        width: SmartScreenBase.smBaseWidth * 45,
                        height: SmartScreenBase.smBaseWidth * 45,
                        resizeMode: "contain",
                        marginHorizontal: SmartScreenBase.smPercenWidth
                    }} />
                    :
                        <Image source={{ uri: "gv_liststudent_17" }} style={{
                            width: SmartScreenBase.smBaseWidth * 45,
                            height: SmartScreenBase.smBaseWidth * 45,
                            resizeMode: "contain",
                            marginHorizontal: SmartScreenBase.smPercenWidth
                        }} />
                    }

                    <Text style={{
                        color: '#000' ,
                        fontSize:SmartScreenBase.smPercenWidth*4,
                        marginLeft:SmartScreenBase.smPercenWidth*5
                    }}>{item.name}</Text>
                </TouchableOpacity>

            </View>
        );
    }
}

export default ItemFilter;
