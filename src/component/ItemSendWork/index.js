import React, { PureComponent } from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import SmartScreenBase from "../../base/SmartScreenBase";


class ItemSendWork extends PureComponent {

    render() {
        const item = this.props.Data;
        const index = this.props.index;
        return (
            <View style={ {
                flex:1,
                height:SmartScreenBase.smPercenHeight*15,
                backgroundColor:"#fff",
                flexDirection:"row",
                alignItems: "center",
                marginVertical:SmartScreenBase.smPercenWidth*2,
                paddingHorizontal:SmartScreenBase.smPercenWidth*5,
                borderRadius:SmartScreenBase.smPercenWidth*2,

            }}>
                <View style={{flex:8,height:'100%',justifyContent:'center'}}>
                    <Text style={{
                        color: '#000' ,
                        fontWeight:"bold",
                        fontSize:SmartScreenBase.smPercenWidth*5
                    }}>{item.name}</Text>
                    <Text style={{
                        color: '#000' ,
                        fontWeight:"400",
                        fontSize:SmartScreenBase.smPercenWidth*3.5
                    }}>{item.class}</Text>
                    <Text style={{
                        color: '#45c5ff' ,
                        fontWeight:"400",
                        fontStyle: 'italic',
                        fontSize:SmartScreenBase.smPercenWidth*3.5
                    }}>{item.import}</Text>
                    <View style={{
                        width:'100%',
                        alignItems:'center',
                        flexDirection:'row',
                    }}>
                        <Text style={{
                            color: '#113254' ,
                            fontWeight:"bold",
                            fontSize:SmartScreenBase.smPercenWidth*3.5
                        }}>{item.start_time}</Text>
                        <Image source={{ uri: "gv_51" }} style={{
                            width: SmartScreenBase.smBaseWidth * 38,
                            height: SmartScreenBase.smBaseWidth * 40,
                            resizeMode: "contain",
                            marginHorizontal: SmartScreenBase.smPercenWidth*2
                        }} />
                        <Text style={{
                            color: '#113254' ,
                            fontWeight:"bold",
                            fontSize:SmartScreenBase.smPercenWidth*3.5
                        }}>{item.end_time}</Text>
                    </View>
                </View>
                <View style={{flex:2,height:'100%',paddingVertical:SmartScreenBase.smPercenWidth * 5}}>
                    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                        <Image style={{
                            width: SmartScreenBase.smPercenWidth * 8,
                            height: SmartScreenBase.smPercenWidth * 8,}}
                               resizeMode={'contain'}
                               source={{uri:"gv_28"}}/>
                    </View>
                    <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                        <Image style={{
                            width: SmartScreenBase.smPercenWidth * 8,
                            height: SmartScreenBase.smPercenWidth * 8,}}
                               resizeMode={'contain'}
                               source={{uri:"gv_29"}}/>
                    </View>
                </View>
            </View>
        );
    }
}

export default ItemSendWork;
