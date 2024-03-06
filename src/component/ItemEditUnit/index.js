import React, { PureComponent } from 'react';
import { View, Text, TouchableOpacity, Image, TextInput } from 'react-native';
import SmartScreenBase from "../../base/SmartScreenBase";
// import { TextInput } from 'react-native-gesture-handler';


class ItemEditCourse extends PureComponent {
    render() {
        const item = this.props.Data;
        return (
            <View style={{
                flex: 1,
                height: SmartScreenBase.smPercenWidth * 28,
                padding: SmartScreenBase.smPercenWidth * 2,
                paddingHorizontal: SmartScreenBase.smPercenWidth * 3,
                backgroundColor: "white",
                borderRadius: SmartScreenBase.smPercenWidth * 3,
            }}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <Image style={{
                        width: SmartScreenBase.smPercenWidth * 6,
                        height: SmartScreenBase.smPercenWidth * 6,
                    }}
                        resizeMode={'contain'}
                        source={{ uri: "gv_102" }} />
                    <TextInput
                        style={{
                            fontWeight: "bold",
                            color: "#000",
                            marginLeft: SmartScreenBase.smPercenWidth * 2,
                            fontSize: SmartScreenBase.smPercenWidth * 4,paddingLeft:5,
                            width:'80%'
                        }}
                        value={item.unit_name}
                        onChangeText={this.props.changeName}
                    />
                    <TouchableOpacity style={{
                        position: 'absolute',
                        right: 0,
                        width: SmartScreenBase.smPercenWidth * 6,
                        height: SmartScreenBase.smPercenWidth * 6,
                    }}>
                        <Image style={{
                            position: 'absolute',
                            right: 0,
                            width: SmartScreenBase.smPercenWidth * 6,
                            height: SmartScreenBase.smPercenWidth * 6,
                        }}
                            resizeMode={'contain'}
                            source={{ uri: "gv_110" }} />
                    </TouchableOpacity>

                </View>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    <Image style={{
                        width: SmartScreenBase.smPercenWidth * 6,
                        height: SmartScreenBase.smPercenWidth * 6,
                    }}
                        resizeMode={'contain'}
                        source={{ uri: "student_managerfile_image1" }} />
                    <TouchableOpacity onPress={()=>{this.props.changDateStart(item.start_date)}}>
                        <Text style={{
                            fontWeight: "400",
                            color: "#000",
                            marginLeft: SmartScreenBase.smPercenWidth * 2,
                            fontSize: SmartScreenBase.smPercenWidth * 4
                        }}>{item.start_date}</Text>
                    </TouchableOpacity>
                    <Text style={{
                        fontWeight: "400",
                        color: "#000",
                        marginLeft: SmartScreenBase.smPercenWidth * 2,
                        fontSize: SmartScreenBase.smPercenWidth * 4
                    }}>-</Text>
                    <TouchableOpacity onPress={()=>{this.props.changDateEnd(item.end_date)}}>
                        <Text style={{
                            fontWeight: "400",
                            color: "#000",
                            marginLeft: SmartScreenBase.smPercenWidth * 2,
                            fontSize: SmartScreenBase.smPercenWidth * 4
                        }}>{item.end_date}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        position: 'absolute',
                        right: 0,
                        width: SmartScreenBase.smPercenWidth * 6,
                        height: SmartScreenBase.smPercenWidth * 6,
                    }}>
                        <Image style={{
                            position: 'absolute',
                            right: 0,
                            width: SmartScreenBase.smPercenWidth * 6,
                            height: SmartScreenBase.smPercenWidth * 6,
                        }}
                            resizeMode={'contain'}
                            source={{ uri: "gv_110" }} />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default ItemEditCourse;
