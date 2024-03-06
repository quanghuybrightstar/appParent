import React, {useRef, useState, useEffect} from 'react';
import Carousel, {ParallaxImage} from 'react-native-snap-carousel';
import {
    View,
    Text,
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    Platform,
    Image,
    ImageBackground,
    FlatList, Alert, AsyncStorage
} from 'react-native';
import stylesApp from '../styleApp/stylesApp';

const {width, height} = Dimensions.get('window');
import SmartScreenBase from '../../base/SmartScreenBase';
import IconNext from 'react-native-vector-icons/AntDesign';
import style from '../../screens/Parent/ConnectedAccount/listStudentScreen/style';
import {connect} from 'react-redux';

let index = 0;
const {width: screenWidth} = Dimensions.get('window');
const {height: screenHeight} = Dimensions.get('window');
const MyCarousel = (props) => {
    const {navigation} = props;
    const [entries, setEntries] = useState(navigation.getParam('entries'));
    const [dataPH, setdataPH] = useState(navigation.getParam('dataPH'));
    const [ind, seind] = useState(0);
    const [type, setType] = useState(false);
    const [upIndex, setupIndex] = useState(0);
    const [typeSend, settypeSend] = useState('Gửi cho học viên');
    const carouselRef = useRef(null);
    const updateIndex = (item) => {
        setupIndex(item);
    };
    useEffect(() => {
        console.log('entries', entries);
        console.log('data_login', props.data_login)
        console.log('dataPH', dataPH)
        for (let i = 0; i < entries.length; i++) {
            for (let j = 0; j < dataPH.length; j++) {
                if (dataPH[j].class_id !== undefined) {
                    if (dataPH[j].class_id === entries[i].id) {
                        let copi = entries.slice('');
                        if (dataPH[j].user_role === 'student') {
                            copi[i].dataHV.push(dataPH[j]);
                            setEntries(copi);
                        } else if (dataPH[j].user_role === 'student') {
                            copi[i].dataPH.push(dataPH[j]);
                            setEntries(copi);
                        }
                        console.log('copi', copi);
                    }
                }
            }
        }

    }, [ind]);
    const renderItem = ({item, index}, parallaxProps) => {
        return (
            <View
                style={{
                    width: screenWidth - 60,
                    height: screenHeight * 0.2,
                    backgroundColor: '#00000030',
                    borderRadius: 10,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <View
                    style={{
                        width: '50%',
                        height: '100%',
                        borderRadius: screenWidth / 6,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <Image
                        style={{
                            width: '80%',
                            height: '80%',
                            borderRadius: 10,
                            overflow: 'hidden',
                        }}
                        source={{uri: item.illustration}}
                    />
                </View>
                <View
                    style={{
                        width: '50%',
                        height: '100%',
                        justifyContent: 'center',
                    }}>
                    <View
                        style={{
                            width: width * 0.4,
                            height: height * 0.04,
                            backgroundColor: '#FFF',
                            borderRadius: height * 0.02,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}>
                        <Text style={{color: 'red', fontSize: 18, fontWeight: 'bold'}}>
                            {item.title}
                        </Text>
                    </View>
                    <Text style={{color: '#FFF', marginTop: 8}}>{item.subtitle}</Text>
                    <Text
                        style={{
                            color: '#FFF',
                            marginTop: 10,
                            fontSize: 18,
                            fontWeight: 'bold',
                        }}>
                        {item.classLesson}
                    </Text>
                </View>
            </View>
        );
    };
    const _renderItem = ({item, index}) => {
        return (
            <View>
                {
                    item.fullname !== null ?
                        <TouchableOpacity

                            style={{
                                borderBottomWidth: 1,
                                borderBottomColor: '#00000030',
                                alignItems: 'center',
                                flexDirection: 'row',
                                marginTop: 5,
                            }}>
                            <View style={{marginHorizontal: '3%', marginBottom: 5}}>
                                <ImageBackground
                                    source={{uri: 'gv_liststudent_08'}}
                                    imageStyle={{
                                        borderRadius: 30,
                                        borderWidth: 1,
                                        borderColor: '#E5B007',
                                    }}
                                    style={{height: 60, width: 60}}
                                />
                            </View>
                            <View style={style.fullname}>
                                <Text style={style.txtName}>
                                    {item.fullname}
                                </Text>
                            </View>
                        </TouchableOpacity>
                        : null
                }
            </View>
        );
    };
    return (
        <ImageBackground
            source={{uri: 'imagebackgroundlesson'}}
            imageStyle={[stylesApp.ImageBackGround]}
            style={{width, height}}>
            <View
                style={{
                    height: SmartScreenBase.smPercenWidth * 10,
                    backgroundColor: "rgba(0,0,0,0.3)",
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                <TouchableOpacity
                    style={{height: '100%', alignItems: 'center', justifyContent: 'center'}}
                    onPress={() => props.navigation.goBack()}
                >
                    <Image
                        style={{
                            width: SmartScreenBase.smPercenWidth * 5,
                            height: SmartScreenBase.smPercenWidth * 5,
                        }}
                        resizeMode={'contain'}
                        source={{uri: 'imageback'}}
                    />
                </TouchableOpacity>
                <Text
                    style={{
                        color: 'white',
                        marginLeft: SmartScreenBase.smPercenWidth * 2,
                        fontWeight: '800',
                        fontSize: SmartScreenBase.smPercenWidth * 5,
                    }}>
                    Chọn người nhận
                </Text>
            </View>
            <View style={{height: height * 0.2, marginTop: height * 0.1}}>
                <Carousel
                    sliderWidth={screenWidth}
                    sliderHeight={screenWidth}
                    itemWidth={screenWidth - 70}
                    data={entries}
                    renderItem={renderItem}
                    layoutCardOffset={18}
                    onSnapToItem={(item) => {
                        updateIndex(item);
                    }}
                />
            </View>
            <View style={{height: height * 0.1, width,}}>
                {type === false ? (
                    <View
                        style={{
                            height: height * 0.04,
                            width: width * 0.5,
                            backgroundColor: '#ffffff50',
                            marginLeft: width * 0.05,
                            marginTop: 10,
                            borderRadius: 5,
                            flexDirection: 'row',
                        }}>
                        <TouchableOpacity
                            onPress={() => {
                                settypeSend('Gửi cho học viên');
                                setType(!type);
                            }}
                            style={{
                                width: '80%',
                                height: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Text style={{color: '#FFF', fontWeight: 'bold'}}>
                                {typeSend}
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setType(!type);
                            }}
                            style={{
                                width: '20%',
                                height: '100%',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <IconNext name="down-square-o" color="#FFF" size={20}/>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={{height: height * 0.08}}>
                        <View
                            style={{
                                height: height * 0.04,
                                width: width * 0.5,
                                backgroundColor: '#ffffff',
                                marginLeft: width * 0.05,
                                marginTop: 10,
                                borderTopRightRadius: 5,
                                borderTopLeftRadius: 5,
                                borderBottomWidth: 1,
                                borderBottomColor: '#00000030',
                            }}>
                            <View style={{flexDirection: 'row'}}>
                                <TouchableOpacity
                                    onPress={() => {
                                        settypeSend('Gửi cho học viên');
                                        setType(!type);
                                    }}
                                    style={{
                                        width: '80%',
                                        height: '100%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    <Text style={{color: '#000', fontWeight: 'bold'}}>
                                        Gửi cho học viên
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        setType(!type);
                                    }}
                                    style={{
                                        width: '20%',
                                        height: '100%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    <IconNext name="down-square-o" color="#000" size={20}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View
                            style={{
                                height: height * 0.04,
                                width: width * 0.5,
                                backgroundColor: '#ffffff',
                                marginLeft: width * 0.05,
                                borderBottomLeftRadius: 5,
                                borderBottomRightRadius: 5,
                            }}>
                            <View style={{flexDirection: 'row'}}>
                                <TouchableOpacity
                                    onPress={() => {
                                        settypeSend('Gửi cho giáo viên');
                                        setType(!type);
                                    }}
                                    style={{
                                        width: '80%',
                                        height: '100%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    <Text style={{color: '#000', fontWeight: 'bold'}}>
                                        Gửi cho giáo viên
                                    </Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        setType(!type);
                                    }}
                                    style={{
                                        width: '20%',
                                        height: '100%',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    <IconNext name="down-square-o" color="#FFF" size={20}/>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
            </View>
            <View
                style={{
                    height: height * 0.4,
                    width: width,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <View
                    style={{
                        height: height * 0.4,
                        width: width * 0.9,
                        backgroundColor: '#FFFFFF',
                        borderRadius: 20,
                    }}>
                    <FlatList
                        data={typeSend === 'Gửi cho học viên' ? entries[upIndex].dataHV : entries[upIndex].dataPH}
                        keyExtractor={(item, index) => 'item' + index}
                        renderItem={_renderItem}
                        showsVerticalScrollIndicator={false}
                    />
                </View>
            </View>
            <View
                style={{
                    height: height * 0.2,
                    width: width,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
            </View>
        </ImageBackground>
    );
};
function mapStateToProps(state) {
    return {
        data_answer: state.readingD11Reducer,
        data_login:state.AuthStackReducer.dataLogin
    };
}
export default connect(mapStateToProps)(MyCarousel);

