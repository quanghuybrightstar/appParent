import React, {PureComponent} from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import SmartScreenBase from "../../base/SmartScreenBase";


class ItemFilterExercises extends PureComponent {

    render() {
        const item = this.props.Data;
        const index = this.props.index;
        return (
            <View style={{
                flex: 1,
                flexDirection: 'row',
                marginVertical: SmartScreenBase.smPercenWidth * 2,
                paddingHorizontal: SmartScreenBase.smPercenWidth * 5
            }}>
                <TouchableOpacity style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}
                                  onPress={() => {
                                      this.props._onChangeExercises(index)
                                  }}
                >
                    {item.isChecked?<Image source={{ uri: "gv_56" }} style={{
                        position:'absolute',
                        top:0,
                        width: SmartScreenBase.smBaseWidth * 60,
                        height: SmartScreenBase.smBaseWidth * 60,
                        resizeMode: "contain",
                        marginHorizontal: SmartScreenBase.smPercenWidth
                    }} />
                    :
                    null}
                    <Image source={{uri: "gv_55"}} style={{
                        width: SmartScreenBase.smBaseWidth * 60,
                        height: SmartScreenBase.smBaseWidth * 60,
                        resizeMode: "contain",
                        marginHorizontal: SmartScreenBase.smPercenWidth
                    }}/>
                    <Text style={{
                        color: '#000',
                        fontSize: SmartScreenBase.smFontSize * 50,
                        marginLeft: SmartScreenBase.smPercenWidth * 5
                    }}>{item.name}</Text>
                </TouchableOpacity>

            </View>
        );
    }
}

export default ItemFilterExercises;
