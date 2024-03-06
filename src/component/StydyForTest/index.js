import React, {useState, useEffect, useRef} from 'react';
import {
    View,
    Text,
    Alert,
    TouchableOpacity,
    Image,
    FlatList,
    Modal,
    TouchableWithoutFeedback,
    Platform,
} from 'react-native';
// import StyleLesson from '../StyleLesson';
import SmartScreenBase from '../../base/SmartScreenBase';
import axios from 'axios';
import {useSelector} from 'react-redux';
import {TabView} from 'react-native-tab-view';
import API from '../../API/APIConstant';
import MyData from '../../component/MyData';
import {styles} from './styles';
import APIBase from '../../base/APIBase';

const StudyForTest = (props) => {

    const [listAddress, setListAddress] = useState([]);
    const [listGrade, setListGrade] = useState([]);
    const [showGrade, setShowGrade] = useState(false);
    const [showAddress, setShowAddress] = useState(false);
    const [address, setAddress] = useState('');
    const [grade, setGrade] = useState('');
    const grateBtn = React.useRef(null);
    const [marginTop,setMarginTop] = React.useState(0);

    useEffect(() => {
        _getListAddress();
        _getGrade();
    }, []);

    const _getListAddress = async () => {
        const url = API.baseurl + API.getListAddress;
        const headers = {
            'Content-Type': 'application/json',
            'jwt_token': APIBase.jwt_token,
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
        };
        try {
            const res = await axios({method: 'get', url, headers});
            //console.log('res',res)
            let data = res.data;
            if (data.status) {
                let list_address = [{id:'0',address:'Chọn Tỉnh/TP'},...data.list_address]
                setListAddress(list_address);
                setAddress(list_address[0].address);
            }
        } catch (error) {
            Alert.alert('Thông báo', error.response.data, [
                {text: 'Đồng ý', style: 'cancel'},
            ]);
            console.log(error.response.data);
        }
    };

    const _getGrade = async () => {
        const url = API.baseurl + API.getGrade;
        const headers = {
            'Content-Type': 'application/json',
            'jwt_token': APIBase.jwt_token,
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
        };
        try {
            const res = await axios({method: 'get', url, headers});
            //console.log('res',res)
            let data = res.data;
            if (data.status) {
                let list_grade = [{id:'0',name:'Chọn khối'},...data.list_grade]
                setListGrade(list_grade);
                setGrade(list_grade[0].name);
            }
        } catch (error) {
            Alert.alert('Thông báo', error.response.data, [
                {text: 'Đồng ý', style: 'cancel'},
            ]);
            console.log(error.response.data);
        }
    };

    const _renderAddress = ({item}) => {
        return (
            <TouchableOpacity
                style={{...styles._r_i_a}}
                onPress={() => {
                    setAddress(item.address);
                    props.setAddressId(item.id);
                    setShowAddress(false);
                }}
            >
                <Text style={styles.addressTxt}>{item.address}</Text>
            </TouchableOpacity>
        );
    };

    const _renderGrade = ({item}) => {
        return (
            <TouchableOpacity
                style={{...styles._r_i_a}}
                onPress={() => {
                    setGrade(item.name);
                    props.setGradeId(item.id);
                    setShowGrade(false);
                }}
            >
                <Text style={styles.addressTxt}>{item.name}</Text>
            </TouchableOpacity>
        );
    };

    const _onPressGrade = () => {
        setShowAddress(false);
        setShowGrade(!showGrade);
    };

    const _onPressAddress = () => {
        setShowAddress(!showAddress);
        setShowGrade(false);
    };

    const _renderModalGrade = () => {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={showGrade}
            >
                <TouchableWithoutFeedback
                    onPress={() => setShowGrade(false)}
                >
                    <View style={{flex: 1}}>
                        <View style={[{
                                top: marginTop,
                                left: SmartScreenBase.smPercenWidth * 4 - 1,  
                            },styles.btnModal]}>
                                <View style={{
                                    overflow:'hidden',
                                    flex:1,
                                    borderRadius:SmartScreenBase.smPercenWidth*6,
                                }}>
                                    <TouchableOpacity
                                        style={styles.btnTouch}
                                        onPress={() => setShowGrade(false)}
                                    >
                                        <View style={styles._v_d_d}>
                                            <Image
                                                source={{uri: 'muitenxuongluyenthi'}}
                                                resizeMode={'contain'}
                                                style={[styles._s_img, {transform: [{rotate: '180deg'}]}]}
                                            />
                                        </View>
                                        <View style={styles._v_d_c}>
                                            <Text style={styles.defaultText}>{grade}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <FlatList
                                        data={listGrade}
                                        renderItem={_renderGrade}
                                        keyExtractor={(item,index) => String(item.id)}
                                        contentContainerStyle={{...styles._view_fl}}
                                    />
                                </View>
                            </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    };

    const _renderModalAddress = () => {
        return (
            <Modal
                animationType="fade"
                transparent={true}
                visible={showAddress}
            >
                <TouchableWithoutFeedback
                    onPress={() => setShowAddress(false)}
                >
                    <View style={{flex: 1}}>
                        <View style={[{
                                top: marginTop,
                                left: SmartScreenBase.smPercenWidth * 51 + 1,  
                            },styles.btnModal]}>
                            <View style={{
                                    overflow:'hidden',
                                    flex:1,
                                    borderRadius:SmartScreenBase.smPercenWidth*6,
                                }}>
                                <TouchableOpacity
                                    style={styles.btnTouch}
                                    onPress={() => setShowAddress(false)}
                                >
                                    <View style={styles._v_d_d}>
                                        <Image
                                            source={{uri: 'muitenxuongluyenthi'}}
                                            resizeMode={'contain'}
                                            style={[styles._s_img, {transform: [{rotate: '180deg'}]}]}
                                        />
                                    </View>
                                    <View style={styles._v_d_c}>
                                        <Text style={styles.defaultText}>{address}</Text>
                                    </View>
                                </TouchableOpacity>
                                <FlatList
                                    data={listAddress}
                                    renderItem={_renderAddress}
                                    keyExtractor={(item, index) => String(item.id)}
                                    contentContainerStyle={styles._view_fl}
                                />
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        );
    };

    return (
        <View style={styles._v_f}>
            {_renderModalGrade()}
            {_renderModalAddress()}
            <View style={styles._v_f_c} 
            onLayout={()=>{
                setTimeout(()=>{
                    grateBtn.current.measure((x, y, width, height, pageX, pageY)=>{
                        setMarginTop(pageY)
                    })
                },1000)
            }}
            ref={grateBtn}
            >
                <TouchableOpacity
                    style={styles._v_f_c_c}
                    onPress={() => _onPressGrade()}
                >
                    <View style={styles._v_d_d}>
                        <Image
                            source={{uri: 'muitenxuongluyenthi'}}
                            resizeMode={'contain'}
                            style={styles._s_img}
                        />
                    </View>
                    <View style={styles._v_d_c}>
                        <Text style={styles.defaultText}>{grade}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles._v_f_c_c}
                    onPress={() => _onPressAddress()}
                >
                    <View style={styles._v_d_d}>
                        <Image
                            source={{uri: 'muitenxuongluyenthi'}}
                            resizeMode={'contain'}
                            style={styles._s_img}
                        />
                    </View>
                    <View style={styles._v_d_c}>
                        <Text style={styles.defaultText}>{address}</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default StudyForTest;
