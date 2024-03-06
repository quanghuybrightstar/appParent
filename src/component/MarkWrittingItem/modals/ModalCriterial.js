import React, {useState , useRef} from 'react';
import {Button, StyleSheet, Text, View , TouchableOpacity  , ScrollView , TextInput , Image } from 'react-native';
import Modal from 'react-native-modal';
import SmartScreenBase from '../../../base/SmartScreenBase';
import LinearGradient from 'react-native-linear-gradient';
import {SmallCheckBox} from '../../../componentBase/SmallCheckBox';
import {RadioButtonBox} from '../../../componentBase/RadioButtonBox';
import FontBase from '../../../base/FontBase';
import { Colors } from '../../../styleApp/color';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {SmPopup} from '../../../componentBase/SmPopup/SmPopup';

export const ModalCriterial = ({ isModalVisible , wordChoose , data , isCriAll, ...props}) => {

    const [dataCriteria, setDataCriteria] = useState([]);
    const [showMesPopup, setShowMesPopup] = useState(false);
    const [showNamePopup, setShowNamePopup] = useState(false);
    const [isSelect, setIsSelect] = useState(false);
    const [posFix, setPosFix] = useState(isCriAll ? 1 : 0);

    const ItemView = (item, key) => {
        return (
            // Flat List Item
            <View key={key} >
                <View  style = {{flex : 1, flexDirection : 'row'}}>
                    <View  style = {{flex : 85 , flexDirection : 'row' }}>
                        <View style = {{flex : 65 , justifyContent: "center", marginLeft: SmartScreenBase.smPercenWidth*3}}>
                            <TextInput
                                onChangeText = { (text) => {
                                    let markers = [ ...dataCriteria ];
                                    markers[key].text = text.toString()
                                    setDataCriteria(markers)
                                }}
                                placeholder={"Tên tiêu chí"}
                                style={styles.itemStyle}>
                                { dataCriteria[key] === undefined ? '0' : dataCriteria[key].text }
                            </TextInput>

                        </View>
                        <View style = {{flex : 35 , justifyContent: "center",alignItems: "stretch",flexDirection : 'row' }}>
                            <TextInput
                                maxLength = {3}
                                keyboardType={'numeric'}
                                value={dataCriteria[key] === undefined ? '0' : dataCriteria[key].proportion.toString()}
                                onChangeText = { (text) => {
                                    const textData = text.replace('%','')
                                    if(text <= 100){
                                        const num = textData.trim().length === 0 ? 0 : parseInt(textData)
                                        let markers = [ ...dataCriteria ];
                                        markers[key].proportion = num.toString()
                                        setDataCriteria(markers )
                                    }
                                }}
                                style={[styles.itemStyle,styles.tyTrongItemSt]}/>
                            <Text style={[styles.itemStyle1]}>%</Text>
                        </View>
                    </View>
                    <View  style = {{flex : 15 , flexDirection : 'row',justifyContent: "center",alignItems: "center" }}>
                        <TouchableOpacity
                            onPress={() => {
                                let markers = [ ...dataCriteria ];
                                markers.splice(key, 1);
                                setDataCriteria(markers)
                            }}
                            activeOpacity={1}
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                width: SmartScreenBase.smPercenWidth*11,
                                height: SmartScreenBase.smPercenWidth*11,
                            }}
                        >
                            <Image
                                style={[styles.tinyLogo]}
                                source={{uri: "trash_icon"}}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{marginLeft: SmartScreenBase.smPercenWidth, backgroundColor: '#999999', height: 1, width: SmartScreenBase.smPercenWidth*78}}/>
            </View>
        );
    };

    const getTotalPoint = () => {
        let total = 0
        dataCriteria.map((item ) => {
            total += parseInt(item.proportion ? item.proportion : 0)
        })
        return parseInt(total);
    }

    const checkNameTC = () => {
        var isNull = false
        dataCriteria.map((item ) => {
            if(item.text == ""){
                isNull = true
            }
        })
        return isNull;
    }

    return (
            <Modal style = {{margin: 0}} isVisible={isModalVisible}
                   onModalShow = {() => { setDataCriteria(data?data:[]) , setPosFix(isCriAll ? 1 : 0) , setIsSelect(false) ;}}>
              <KeyboardAwareScrollView>
                <View style={styles.container}>
                    <View style = {styles.content}>
                        <View style = {styles.subContent3}>
                            <View style={{flex: 1.5, flexDirection: 'row'}}>
                                <View style={[{flex: 85, justifyContent: "center", flexDirection: 'row' }, styles.itemRound]}>
                                    <View style={[{flex: 55, justifyContent: "center",alignItems: "center"}]}>
                                        <Text style={{fontFamily: FontBase.MyriadPro_Bold, color : '#ffffff', fontSize: SmartScreenBase.smFontSize*50}}>Tiêu Chí</Text>
                                    </View>
                                    <View style={[{flex: 45, justifyContent: "center",alignItems: "center",}]}>
                                        <Text style={{fontFamily: FontBase.MyriadPro_Bold, color : '#ffffff', fontSize: SmartScreenBase.smFontSize*50 , marginRight : SmartScreenBase.smPercenWidth*(-1.5) }}>Tỷ Trọng</Text>
                                    </View>

                                </View>
                                <View style={[{flex: 15, justifyContent: "center"}]}>
                                </View>
                            </View>
                        </View>

                        <View style = {styles.subContent1}>
                            <View style={styles.bgScrollCri}></View>
                                <View style={[styles.scrollSty]}>

                                    <View style={{width: SmartScreenBase.smPercenWidth*95, height: SmartScreenBase.smPercenWidth*53,flexDirection: 'row'}}>
                                        <ScrollView>
                                            {dataCriteria.map(ItemView)}
                                        </ScrollView>
                                    </View>


                                    <TouchableOpacity onPress = {() => {
                                            let newData = [{"text": "", "proportion": 0},...dataCriteria]//[{"text": "New", "proportion": 0}, ...dataCriteria]
                                            // newData.push({"text": "New", "proportion": 0});
                                            setDataCriteria(newData)}}  style={styles.congButton}>
                                        <Image 
                                            source={{uri: 'wr4'}} style={{width: SmartScreenBase.smPercenWidth*5, height: SmartScreenBase.smPercenWidth*5}}/>
                                    </TouchableOpacity>

                                </View>
                        </View>

                        <View style = {styles.subContent3}>
                            <View style={{flex: 1.5, flexDirection: 'row'}}>
                                <View style={[{flex: 85, justifyContent: "center", flexDirection: 'row'} , styles.itemRound1]}>
                                    <View style={[{flex: 75, justifyContent: "center",alignItems: "flex-start", paddingLeft : SmartScreenBase.smPercenWidth*4}]}>
                                        <Text style={{fontFamily: FontBase.MyriadPro_Bold, fontSize: SmartScreenBase.smFontSize*50}}>Tổng tỷ trọng</Text>
                                    </View>
                                    <View style={[{flex: 25, justifyContent: "center",alignItems: "center",}]}>
                                        <Text style={{fontFamily: FontBase.MyriadPro_Bold, fontSize: SmartScreenBase.smFontSize*50}}>{getTotalPoint()}%</Text>
                                    </View>

                                </View>
                                <View style={[{flex: 15, justifyContent: "center"}]}>
                                </View>
                            </View>
                        </View>

                        <View style = {[styles.subContent2,{flexDirection: 'column'}]}>
                            <Text style={[styles.itText,{marginLeft: SmartScreenBase.smPercenWidth}]}>{"Lưu ý: Tổng tỷ trọng cần bằng 100%"}</Text>
                            <View style={{flexDirection: 'column', marginTop: SmartScreenBase.smPercenWidth*2}}>
                                    <TouchableOpacity style={{flexDirection: "row", alignItems: "center", height: SmartScreenBase.smPercenWidth*9}}
                                        onPress={() => setPosFix(0)}>
                                        <RadioButtonBox
                                            isNotify={posFix==0} onPress={() => setPosFix(0)}/>
                                        <Text style={[styles.radioText,{marginLeft: SmartScreenBase.smPercenWidth}]}>{"Chỉ áp dụng vào bài viết này"}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{flexDirection: "row", alignItems: "center", height: SmartScreenBase.smPercenWidth*9}}
                                        onPress={() => setPosFix(1)}>
                                        <RadioButtonBox
                                            isNotify={posFix==1} onPress={() => setPosFix(1)}/>
                                        <Text style={[styles.radioText,{marginLeft: SmartScreenBase.smPercenWidth}]}>{"Áp dụng cho tất cả các bài viết khác"}</Text>
                                    </TouchableOpacity>
                                </View>
                        </View>

                        <View style = {[styles.buttonLayout , {marginBottom : SmartScreenBase.smPercenWidth*4 , marginTop : SmartScreenBase.smPercenWidth*6}]}>
                            <TouchableOpacity
                                style={styles.submit1}
                                onPress={() => {
                                    props.onPressCancelModal()
                                }}
                                transparent >
                                <Text style={[styles.submitText1]}>Hủy</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => {
                                     if(getTotalPoint() != 100){
                                        setShowMesPopup(true)
                                     }else if(checkNameTC()){
                                        setShowNamePopup(true)
                                     }else if(!isSelect){
                                            setIsSelect(true)
                                            props.onPressModal(dataCriteria , posFix==0?props.idCriteria:0)
                                     }
                                }}
                                underlayColor='#fff'>
                                <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#00E0A0', '#00CEAA', '#00BEB3']} style={ styles.submit}>
                                <Text style={[styles.submitText]}>Lưu</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>

                    </View>
                </View>
                </KeyboardAwareScrollView>
                <SmPopup visible={showMesPopup} message={"Tổng tỷ trọng luôn phải bằng 100%"}
                confirmOnpress={() => {setShowMesPopup(false)}} confirmText={"Đã hiểu"} cancelText={null}/>
                <SmPopup visible={showNamePopup} message={"Tên tiêu chí không được để trống"}
                confirmOnpress={() => {setShowNamePopup(false)}} confirmText={"Đã hiểu"} cancelText={null}/>
            </Modal>
    );
}

export const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        paddingTop: (SmartScreenBase.smPercenHeight*100 - SmartScreenBase.smPercenWidth*138),
    },
    content: {
        paddingTop : 10,
        width: SmartScreenBase.smPercenWidth*100,
        height: SmartScreenBase.smPercenWidth*138,
        backgroundColor: "#fff",

    },
    subContent3: {
        flex : 0.7,
        justifyContent: "center",
        flexDirection: 'row',
        paddingLeft : SmartScreenBase.smPercenWidth*1.5,
        paddingRight : SmartScreenBase.smPercenWidth*1.5,

    },
    subContent1: {
        height: SmartScreenBase.smPercenWidth*63,
        width: SmartScreenBase.smPercenWidth*98,
        justifyContent: "center",
        flexDirection: 'column',
    },
    bgScrollCri: {
        backgroundColor: "#E6E7E8",
        borderRadius: 10,
        width: SmartScreenBase.smPercenWidth*80,
        height: '100%',
        marginLeft: SmartScreenBase.smPercenWidth*3
    },
    subContent2: {
        flex : 1,
        flexDirection: 'row',
        marginTop: SmartScreenBase.smPercenWidth*2,
        paddingLeft : SmartScreenBase.smPercenWidth*3,
        paddingRight : SmartScreenBase.smPercenWidth*3,
    },
    buttonLayout: {
        flex : 1,
        flexDirection: 'row',
        paddingLeft : SmartScreenBase.smPercenWidth*3,
        paddingRight : SmartScreenBase.smPercenWidth*3,
        alignItems : 'center',
        justifyContent: 'space-evenly'
    },
    scrollSty: {
        width: SmartScreenBase.smPercenWidth*95,
        height: '100%',
        flexDirection: 'column',
        position: "absolute",
        top: 0,
        left: SmartScreenBase.smPercenWidth*3,
    },
    submit1:{
        width : SmartScreenBase.smPercenWidth*40,
        height : SmartScreenBase.smPercenWidth*11,
        marginRight:20,
        marginLeft:20,
        marginTop:20,
        backgroundColor:'#FFF',
        borderRadius: SmartScreenBase.smPercenWidth*7,
        borderWidth: 1,
        borderColor: '#00DAA4',
        justifyContent: "center",
    },
    submit:{
        width : SmartScreenBase.smPercenWidth*40,
        height : SmartScreenBase.smPercenWidth*11,
        marginRight:20,
        marginLeft:20,
        marginTop:20,
        backgroundColor:'#00DAA4',
        borderRadius: SmartScreenBase.smPercenWidth*7,
        borderWidth: 1,
        borderColor: '#fff',
        justifyContent: "center",
    },
    submitDisable:{
        width : SmartScreenBase.smPercenWidth*40,
        height : SmartScreenBase.smPercenWidth*11,
        marginRight:20,
        marginLeft:20,
        marginTop:20,
        backgroundColor:'#808080',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff',
        justifyContent: "center",
    },
    submitText:{
        color:'#fff',
        textAlign:'center',
        fontSize : SmartScreenBase.smFontSize*45,
        fontFamily : FontBase.MyriadPro_Bold},
    submitText1:{
        color:'#1ecec9',
        textAlign:'center',
        fontSize : SmartScreenBase.smFontSize*45,
        fontFamily : FontBase.MyriadPro_Bold},
    wordText:{
        color:'#1ecec9',
        fontSize : SmartScreenBase.smFontSize*50,
        fontFamily : FontBase.MyriadPro_Bold,
        fontWeight: 'bold'
    },
    titleText:{
        color:'#4e5453',
        fontSize : SmartScreenBase.smFontSize*45,
        fontFamily : FontBase.MyriadPro_Bold,
        fontWeight: 'bold',
        marginTop : 15
    },
    radioText:{
        color:'#4e5453',
        fontSize : SmartScreenBase.smFontSize*50,
        fontFamily : FontBase.MyriadPro_Regular,
        width: SmartScreenBase.smPercenWidth*74
    },
    itText:{
        color:'#4e5453',
        fontSize : SmartScreenBase.smFontSize*45,
        fontFamily : FontBase.MyriadPro_It,
        width: SmartScreenBase.smPercenWidth*74
    },
    instructions: {
        textAlign: "center",
        color: "#333333",
        marginBottom: 5,
        color: "#0000FF"
    },
    itemRound: {
        backgroundColor: "#08A59C",
        borderRadius:10,
        marginBottom : 2,
        marginTop : 2,
        marginLeft : 5,
        marginRight : 5,
        justifyContent: "center",
        alignItems: "center",
    },
    itemRound1: {
        backgroundColor: "#E6E7E8",
        borderRadius:10,
        marginBottom : 2,
        marginTop : 2,
        marginLeft : 5,
        marginRight : 5,
        justifyContent: "center",
        alignItems: "center",
    },
    input: {
        height: 40,
        paddingLeft : 20,
        marginTop : 15,
        borderRadius:5,
        borderColor: '#bbc7c7',
        borderWidth: 1
    },
    checkbox: {
        alignSelf: "center",
    },
    checkboxContainer: {
        flexDirection: "row",
        marginBottom: 20,
    },
    itemStyle: {
        paddingVertical: 10,
        fontFamily: FontBase.MyriadPro_Regular,
        fontSize: SmartScreenBase.smFontSize*50,
        color : Colors.NearBlack
    },
    tyTrongItemSt: {
        textAlign: 'right'
    },
    itemStyle1: {
        paddingTop: 10,
        marginTop: SmartScreenBase.smPercenWidth*0.7,
        fontFamily: FontBase.MyriadPro_Regular,
        fontSize: SmartScreenBase.smFontSize*50,
        color : Colors.NearBlack
    },
itemSeparatorStyle: {
    height: 0.5,
        width: '100%',
        backgroundColor: '#a4aead',
},
    tinyLogo: {
        width: SmartScreenBase.smPercenWidth*5,
        height: SmartScreenBase.smPercenWidth*6,
    },
    congButton:{
        width: SmartScreenBase.smPercenWidth*50, 
        height: SmartScreenBase.smPercenWidth*10,
        marginLeft: SmartScreenBase.smPercenWidth*15,
        flexDirection: "column",
        justifyContent: 'center', 
        alignItems: 'center',
    }
});