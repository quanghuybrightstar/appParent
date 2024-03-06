import React from 'react';
import {View,Text,TouchableOpacity,ImageBackground,StyleSheet,Image, Platform} from 'react-native';
import SmartScreenBase from '../../base/SmartScreenBase';
import font from '../../base/FontBase';
import Icon from 'react-native-vector-icons/AntDesign';
import Carousel from 'react-native-snap-carousel';
import apiBase from '../../base/APIBase';
import API from '../../API/APIConstant';
import {LoadingScreen2} from '../../screens/LoadingScreen';
import LinearGradient from 'react-native-linear-gradient';

const getDanhHieu = (m)=>{
    const n = String(m).toLowerCase();
    return n == 'a' ? 'tt_chamchi' : (n == 'b' ? 'tt_cancu' : 'tt_chamchap');
};
const getHocSinh = (n)=>{
    const m = String(n).toLowerCase();
    return m == 'a' ? 'HỌC SINH GIỎI'
        : m == 'b' ? 'HỌC SINH KHÁ'
            : m == 'c' ? 'HỌC SINH TB'
                : m == 'd' ? 'HỌC SINH YẾU'
                    : m == 'e' ? 'HỌC SINH KÉM'
                    : 'CHƯA CÓ';
};
const AClass = ({onPress,item})=>{
    return <View style={styles.main}>
        <View style={styles.main2}>
            <LinearGradient
                style={styles.classHeader}
                colors={['#00e1a0', '#00b9b7']}
                start={{x: 0, y: 1}} end={{x: 0.5, y: 0.5}}
            >
                <Text numberOfLines={2} style={styles.className}>
                    {item.class_name}
                </Text>
            </LinearGradient>
            <Text style={styles.title}>CHUYÊN CẦN</Text>
            <View style={styles.row}>
                <Text style={styles.lb}>Danh hiệu:</Text>
                {item.diligence_medal ? <Image style={styles.img} source={{uri:getDanhHieu(item.diligence_medal)}}/>
                : <Text style={styles.danhhieu}>{"CHƯA CÓ"}</Text>}
            </View>
            <View style={styles.row}>
                <Text style={styles.lb}>Số buổi nghỉ:</Text>
                <Text style={styles.vl}>{item.number_absent}/{item.total_session}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.lb}>Số buổi đến muộn:</Text>
                <Text style={styles.vl}>{item.number_late}/{item.total_session}</Text>
            </View>
            <Text style={styles.title}>HỌC TẬP</Text>
            <View style={styles.row}>
                <Text style={styles.lb}>Danh hiệu:</Text>
                <Text style={styles.danhhieu}>
                    {getHocSinh(item.learning_medal)}
                </Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.lb}>Điểm trung bình:</Text>
                <Text style={styles.vl}>{item.avg_score == '' ? 'Đang cập nhật' : item.avg_score}</Text>
            </View>
            <View style={styles.row}>
                <Text style={styles.lb}>Điểm thành phần:</Text>
                <TouchableOpacity
                    onPress={onPress}
                    style={styles.btnDetail} >
                    <Text style={styles.vl2}>Chi tiết</Text>
                    <Icon name="right" color="#00b9b7" size={18} />
                </TouchableOpacity>
            </View>
        </View>
    </View>;
};


const AchievementOfflineScreen = ({navigation})=>{
    const [loading,setLoading] = React.useState(true);
    const [data,setData] = React.useState([]);
    const listener = React.useRef();

    React.useEffect(()=>{

        const init = async () => {
           await getData();
        };
        init();
        if (!listener.current) {
          listener.current = navigation.addListener('didFocus', getData);
      }
      return () => {
          listener.current.remove();
      };
    },[]);

    const getData = async () => {
        apiBase.postDataJson('get',`${API.baseurl}${API.offlineachievements}`)
        .then(res=>{
            setLoading(false);
            console.log("=====getData DATAOFF",res.data);
            if (res.data.status){
                setData(res.data.data);
            }
        }).catch(e=>{
            console.log(e);
            setLoading(false);
        });
    };

    return <ImageBackground
        style={styles.container}
        source={{ uri: 'bgtt_2' }}>
        {
            data.length > 0 && <View style={styles.content}>
                <Carousel
                    data={data}
                    renderItem={({ item, index }) => <AClass item={item}
                        onPress={()=>{
                            navigation.navigate('AchivementOfflineDetail',{item:item});
                        }}
                        item={item}
                    />}
                    sliderWidth={SmartScreenBase.smPercenWidth * 100}
                    itemWidth={SmartScreenBase.smPercenWidth * 80}
                    layout={'default'}
                    removeClippedSubviews={false}
                />
            </View>
        }
        {
            !loading && data.length == 0 && <View style={styles.noClass}>
                <View style={styles.noClassCon}>
                    <Image source={{uri:'anhddht'}}
                        resizeMode="contain"
                        style={styles.noClassImg}/>
                    <Text style={styles.noClassTxt}>Bạn chưa có lớp học Offline nào!</Text>
                </View>
            </View>
        }
        {
            loading && <LoadingScreen2/>
        }
    </ImageBackground>;
};

const styles = StyleSheet.create({
    noClass:{
        alignItems:'center',
        justifyContent:'center',
        flex:1,
    },
    noClassImg:{
        width:SmartScreenBase.smPercenWidth * 80,
        height:SmartScreenBase.smPercenWidth * 60,
    },
    noClassTxt:{
        fontFamily:font.MyriadPro_Light,
        marginTop:SmartScreenBase.smPercenHeight * 2,
        fontSize:SmartScreenBase.smFontSize * 50,
    },
    noClassCon:{
        backgroundColor:'#fff',
        alignItems:'center',
        padding:SmartScreenBase.smPercenWidth * 5,
        borderRadius:SmartScreenBase.smPercenWidth * 4,
    },
    container:{flex:1,justifyContent:'center'},
    content:{
        height:SmartScreenBase.smPercenHeight * 70,
    },
    bonus:{
        width:SmartScreenBase.smPercenWidth * 6,
        backgroundColor:'rgba(255,255,255,0.2)',
        marginVertical:'20%',
        borderRadius:SmartScreenBase.smPercenWidth,
    },
    main:{
        flex:1,
        justifyContent:'center',
    },
    main2:{
        backgroundColor:'#fff',
        borderRadius:SmartScreenBase.smPercenWidth * 5,
        paddingHorizontal:SmartScreenBase.smPercenWidth * 4,
        paddingVertical:SmartScreenBase.smPercenHeight * 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title:{
        fontSize:SmartScreenBase.smFontSize * 50,
        fontFamily:font.MyriadPro_Bold,
        marginTop:SmartScreenBase.smPercenHeight * 2,
        color:'#00b9b7',
    },
    row:{
        flexDirection:'row',
        justifyContent: 'space-between',
        paddingVertical:SmartScreenBase.smPercenHeight,
        alignItems:'center',
        height:SmartScreenBase.smPercenHeight * 7,
    },
    lb:{
        flex:1,
        paddingLeft:SmartScreenBase.smPercenWidth * 2,
        fontSize:SmartScreenBase.smFontSize * 45,
        color:'black',
        fontFamily:font.MyriadPro_Regular,
        paddingTop:Platform.OS === 'ios' ? 5 : 0,
    },
    vl:{
        flex:1,
        textAlign:'center',
        fontFamily:font.MyriadPro_Bold,
        color:'#00b9b7',
        fontSize:SmartScreenBase.smFontSize * 50,
    },
    vl2:{
        textAlign:'center',
        fontFamily:font.MyriadPro_Bold,
        color:'#00b9b7',
        fontSize:SmartScreenBase.smFontSize * 50,
        marginRight:SmartScreenBase.smPercenWidth,
        textDecorationLine:'underline',
    },
    img:{
        width:SmartScreenBase.smPercenWidth * 35,
        height:SmartScreenBase.smPercenHeight * 8,
        resizeMode:'contain',
    },
    danhhieu:{
        color:'orange',
        fontSize:SmartScreenBase.smFontSize * 50,
        fontFamily:font.UTM_FB_B,
        flex:1,
        textAlign:'center',
        marginBottom:8,
    },
    classHeader:{
        alignItems:'center',
        paddingHorizontal: SmartScreenBase.smPercenWidth * 3,
        paddingVertical:SmartScreenBase.smPercenHeight,
        borderRadius:SmartScreenBase.smPercenWidth * 4,
    },
    className:{
        fontSize:SmartScreenBase.smFontSize * 55,
        color:'#fff',
        fontFamily:font.MyriadPro_Bold,
        marginTop:2,
        paddingTop:Platform.OS === 'ios' ? 5 : 0,
    },
    btnDetail:{
        flex:0.75,
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'center',
    },
});

export default AchievementOfflineScreen;
