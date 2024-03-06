import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text, FlatList, TouchableOpacity, Image,TextInput,
    ScrollView } from 'react-native';
const {width, height} = Dimensions.get('window');
import CountDown from 'react-native-countdown-component';
import SmartScreenBase from '../../base/SmartScreenBase';
import Iconcheck from 'react-native-vector-icons/AntDesign';
import Iconchoose from 'react-native-vector-icons/Feather';

const smartScreenHeight = SmartScreenBase.smPercenHeight;
const smartScreenWidth = SmartScreenBase.smPercenWidth;
const fakeData = [
    {
        type:'check',
        ques:'Tổng hợp 101 những câu tiếng Anh thông dụng nhất bạn cần biết',
        ans:[
            {
                id:0,
                ans:'có',
                choose:false
            },{
                id:1,
                ans:'tất nhiên là có',
                choose:false
            },{
                id:2,
                ans:'chuẩn',
                choose:false
            },{
                id:3,
                ans:'rất chuẩn',
                choose:false
            }],
        rightans:'tất nhiên là có'
    },
    {
        type:'text',
        text:'Hello, everyone! I’m glad to introduce my family. There are four people, ' +
            'including Mom, Dad, one brother and me. My mother’s name is Mai, and she is 50 ' +
            'years old. She is a beautiful woman with long black hair. My father’s name is Truong, ' +
            'and he is 55 years old. And my brother is Duy. He is 17 years old, and now he is a ' +
            'student of Minh Khai High School. I always love my family, even in my dream.',
        ques:'Tổng hợp 101 những câu tiếng Anh thông dụng nhất bạn cần biết',
        rightans:'tất nhiên là có'
    }
]
const LamBaiThi = ({ navigation, route }) => {
    const [idQues, setidQues] = useState(1);
    const [data, setdata] = useState(fakeData);

    const _onPresschoose = (index) => {
        const copyData = [...data]
        for(let i = 0 ; i < copyData[idQues].ans.length ; i++ ){
            if(i === index){
                copyData[idQues].ans[index].choose = !copyData[idQues].ans[index].choose;
            } else {
                copyData[idQues].ans[i].choose = false;
            }
        }
        setdata(copyData);
    }
    const renderItemText = () => {
        return(
            <ScrollView style={{width:width*0.9,height:height*0.55, backgroundColor:'#00000030', borderRadius:15,paddingHorizontal:10}}>
                <View style={{width:width*0.9,height:height*0.05, justifyContent:'center'}}>
                    <Text style={{fontWeight:'bold'}}>Câu {idQues+1}:</Text>
                </View>
                <View style={{width:width*0.9 - 15,marginTop:10}}>
                    <Text>{data[idQues].text}</Text>
                </View>
                <View style={{width:width*0.9 - 15,marginTop:10}}>
                    <Text>{data[idQues].ques}</Text>
                </View>
                <View style={{width:width*0.9 - 20,marginTop:10, backgroundColor:'#FFF', borderRadius:10,borderColor: 'gray', borderWidth: 1,}}>
                    <TextInput
                        multiline={true}
                        style={{width:width*0.9 - 20,  }}
                        //onChangeText={text => onChangeText(text)}
                    />
                </View>
            </ScrollView>
        )

    }
    const renderItemCheck=(item,index)=>{
        return(
            <View style={{flexDirection:'row',alignItems:'center', marginTop:10}}>
                {
                    item.item.choose === false ?
                        <TouchableOpacity
                            onPress={()=>{_onPresschoose(item.item.id)}}
                            style={{width:width*0.1}}>
                            <Iconchoose name="circle" color="#000" size={height*0.025} />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity
                            onPress={()=>{_onPresschoose(item.item.id)}}
                            style={{width:width*0.1}}>
                            <View style={{width:height*0.025, height : height*0.025, borderRadius:height*0.0125, borderColor: '#000',borderWidth: 1,justifyContent:'center',alignItems:'center'}}>
                                <View style={{width:height*0.018, height : height*0.018,borderRadius:height*0.009,backgroundColor:'#000'}}>
                                </View>
                            </View>
                        </TouchableOpacity>

                }
                <View>
                    <Text>{item.item.ans}</Text>
                </View>
            </View>
        );
    }
    const renderExamCheck = () =>{
        return(
            <ScrollView style={{width:width*0.9,height:height*0.55, backgroundColor:'#00000030', borderRadius:15,paddingHorizontal:10}}>
                <View style={{width:width*0.9,height:height*0.05, justifyContent:'center'}}>
                    <Text style={{fontWeight:'bold'}}>Câu {idQues+1}:</Text>
                </View>
                <View style={{width:width*0.9,marginTop:10}}>
                    <Text>{data[idQues].ques}</Text>
                </View>
                <View  style={{width:width*0.9,marginTop:10}}>
                    <FlatList
                        data={data[idQues].ans}
                        keyExtractor={(item, index) => 'item' + index}
                        renderItem={(item, index) => renderItemCheck(item,index)}
                    />
                </View>
            </ScrollView>
        );
    }
    return (
        <View style={{ flex: 1, backgroundColor: '#3279b9' }}>
            <View style={{
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: "rgba(0,0,0,0.3)",
                flexDirection: "row",
                height:height*0.06,
            }}>
                <View style={{
                    marginLeft: SmartScreenBase.smPercenWidth * 2,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Text style={{
                        color: 'white',
                        fontSize: SmartScreenBase.smPercenWidth * 4,
                        padding: smartScreenHeight,
                    }}>BÀI KIỂM TRA 15</Text>
                </View>
            </View>
            <View style={{width, height:height*0.15, justifyContent:'center',alignItems:'center'}}>
                <TouchableOpacity
                    onPress={()=>{}}
                    style={{width:width/2.5, height:height*0.05, backgroundColor:'#01283A', flexDirection:'row', borderRadius:height*0.025,justifyContent:'center',alignItems:'center'}}>
                    <View style={{width:width/4,justifyContent:'center',alignItems:'center',}}>
                        <Text style={{color:"#FFF",fontSize:12, fontWeight:'bold'}}>Nộp Bài</Text>
                    </View>
                </TouchableOpacity>
            </View>
            <View style={{width, height:height*0.72,backgroundColor:'#FFF', borderTopLeftRadius:15,borderTopRightRadius:15,justifyContent:'center',alignItems:'center'}}>
                <View style={{flexDirection:'row',width:width*0.9,height:height*0.07,justifyContent:'center',alignItems:'center'}}>
                    <View style={{width:width/4,height:height*0.05,justifyContent:'center',alignItems:'center', marginRight:width*0.4}}>
                        <Text style={{color:'#00000080'}}>Xem lại sau</Text>
                    </View>
                    <View style={{width:width/4, height:height*0.05,justifyContent:'center',alignItems:'center',borderRadius:height*0.025, backgroundColor:'#F7AC16'}}>
                        <Text style={{color:'#00000080'}}>1/20</Text>
                    </View>
                </View>
                {
                    data[idQues].type === 'check'?
                        renderExamCheck()
                        :
                        renderItemText()
                }
                <View style={{width:width*0.9,height:height*0.1,justifyContent:'center',alignItems:'center', flexDirection:'row'}}>
                    <TouchableOpacity style={{ width: width*0.1, height:height*0.03, borderRadius:7.5,backgroundColor:'#01283A',justifyContent:'center', alignItems:'center'}}>
                        <Iconcheck name="left" color="#FFF" size={height*0.02} />
                    </TouchableOpacity>
                    <View style={{width: width*0.25, height:height*0.05,borderWidth:1,borderRadius:height*0.01 , borderColor:'#000',justifyContent:'center', alignItems:'center', marginLeft:10, marginRight:10}}>
                        <CountDown
                            size={15}
                            until={60 * 15}
                            onFinish={() => alert('Finished')}
                            digitStyle={{backgroundColor: 'transparent'}}
                            digitTxtStyle={{color: '#000', fontSize:20,marginBottom:5}}
                            timeLabelStyle={{color: 'red', fontWeight: 'bold'}}
                            separatorStyle={{color: '#000',marginBottom:5}}
                            timeToShow={['M', 'S']}
                            timeLabels={{m: null, s: null}}
                            showSeparator
                        />
                    </View>
                    <TouchableOpacity style={{ width: width*0.1, height:height*0.03, borderRadius:7.5,backgroundColor:'#01283A',justifyContent:'center', alignItems:'center'}}>
                        <Iconcheck name="right" color="#FFF" size={height*0.02} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};



export default LamBaiThi;
