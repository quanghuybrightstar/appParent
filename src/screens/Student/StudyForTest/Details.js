import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    ImageBackground,
    ScrollView,
    TouchableOpacity,
    Image,
    Alert,
} from 'react-native';
// import StyleLesson from '../StyleLesson';
import stylesApp from '../../../styleApp/stylesApp';
import SmartScreenBase from '../../../base/SmartScreenBase';
import axios from 'axios';
import {useSelector} from 'react-redux';
import Header from './Header';
import {TabView} from 'react-native-tab-view';
import API from '../../../API/APIConstant';
import Loading from '../../../component/LoadingScreen';
import MyData from '../../../component/MyData';
import {stylesDetails} from './styles';
import APIBase from '../../../base/APIBase';
import FontBase from '../../../base/FontBase';

const smartScreenHeight = SmartScreenBase.smPercenHeight;
const smartScreenWidth = SmartScreenBase.smPercenWidth;
const smartFont = SmartScreenBase.smFontSize;

const styles = stylesDetails;

const StudyForTestDetail = ({navigation}) => {

    const id = navigation.getParam('id');
    const purpose = navigation.getParam('purpose');
    const name = navigation.getParam('name');
    const [isLoading, setIsLoading] = useState(true);
    const [dataMock, setDataMock] = useState({});

    useEffect(() => {
        _getDetailsMockTest();
    }, []);

    const _getDetailsMockTest = async () => {
        const url = API.baseurl + API.getDetailsMockTest + id;
        const header = {
            'Content-Type': 'application/json',
            'jwt_token': APIBase.jwt_token,
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA==',
        };
        try {
            const res = await APIBase.postDataJson('GET',url);
            let data = res.data;
            if (data.status) {
                setDataMock(data.mock_test_data);
            } else {
                Alert.alert('Thông báo', data.msg, [
                    {text: 'Đồng ý', style: 'cancel'},
                ]);
            }
        } catch (error) {
            Alert.alert('Thông báo', error.response.data.msg, [
                {text: 'Đồng ý', style: 'cancel'},
            ]);
            console.log(error.response.data);
        } finally {
            setIsLoading(false);
        }
    };

    const _renderTutorial = (uri, text1, text2, text3, check) => {
        return (
            <View style={styles._item_hdht}>
                <View style={styles._item_img}>
                    <Image source={{uri: uri}} resizeMode={'contain'} style={{
                        width: check ? smartScreenWidth * 10 : smartScreenWidth * 5,
                        height: check ? smartScreenWidth * 7 : smartScreenWidth * 5,
                    }}/>
                </View>
                <View style={styles._item_content}>
                    <Text style={styles.tutorialText}>
                        <Text>{`${text1} `}</Text>
                        <Text
                            style={styles.tutorialTextBold}>
                            {`${text2} `}
                        </Text>
                        <Text>{text3}</Text>
                    </Text>
                </View>
            </View>
        );
    };

    return (
        isLoading ?
            <ImageBackground
                source={{uri: 'bg_exam'}}
                imageStyle={stylesApp.ImageBackGround}
                style={{flex: 1, position: 'absolute'}}>
                <Loading/>
            </ImageBackground>
            :
            <ImageBackground
                source={{uri: 'bg_exam'}}
                imageStyle={stylesApp.ImageBackGround}
                style={{flex: 1}}>
                <Header
                    title={purpose === 'mock_15' ? 'Bài kiểm tra 15 phút' : purpose === 'mock_45' ? 'Bài kiểm tra 45 phút' : purpose === 'mock_60' ? 'Bài kiểm tra học kỳ' : 'Bài kiểm tra lớp 10'}
                    showBack={true}
                    goBack={() => navigation.goBack()}
                    icon={false}
                />
                <View style={styles._v_f}>
                    <Text style={styles.title}>{dataMock.exam_name}</Text>
                    <Text style={{...styles.title2, paddingTop: smartScreenHeight * 2}}>Trường
                        : {dataMock.school}</Text>
                    <Text style={styles.title2}>Năm học : {dataMock.school_year}</Text>
                </View>
                <View style={styles._v_c}>
                    <View style={styles._v_header}>
                        <View style={styles._v_row}>
                            <Text style={styles.tutorialText}>{dataMock.number_question} câu hỏi</Text>
                        </View>
                        <View style={styles._v_row}>
                            <Text style={styles.tutorialText}>{dataMock.duration} phút</Text>
                        </View>
                        <View style={styles._v_row}>
                            <Text style={styles.tutorialText}>{dataMock.number_attempt} lượt thi</Text>
                        </View>
                    </View>
                    <View style={styles._v_content}>
                        <View style={styles._v_c_t}>
                            <ScrollView
                                contentContainerStyle={{
                                    alignItems: 'center'
                                }}
                            >
                                <Text style={{
                                    padding: smartScreenHeight * 2,
                                    fontSize: smartFont * 50,
                                    fontFamily: FontBase.MyriadPro_Regular,
                                    fontWeight: '400',
                                    color: '#1b75bc',
                                }}>HƯỚNG DẪN LÀM BÀI</Text>
                                <View style={styles._c_h_d_h_t}>
                                    {_renderTutorial('radioanh', 'Chọn câu trả lời đúng', '', '', false)}
                                    {_renderTutorial('textboxthi', 'Viết câu trả lời đúng', '', '', true)}
                                    {_renderTutorial('checkboxanh', 'Đánh dấu câu hỏi khi muốn', 'Xem lại sau', '', false)}
                                    {_renderTutorial('nextthi', 'Chuyển qua', 'Câu kế tiếp', '', true)}
                                    {_renderTutorial('backthi', 'Chuyển qua', 'Câu trước', '', true)}
                                </View>
                                <View style={styles.notes}>
                                    <Text style={styles.tutorialTextSmall}>Lưu ý</Text>
                                    <Text style={styles.tutorialTextSmall}>- Những câu chưa chọn đáp án được tính là câu sai</Text>
                                    <Text style={styles.tutorialTextSmall}>- Nếu bạn thoát ra trong lúc chưa hết thời gian
                                        làm bài thì kết quả sẽ không được tính</Text>
                                    <Text style={styles.tutorialTextSmall}>- Nếu bạn làm chưa xong bài mà thời gian hết thì bài sẽ tự động thu</Text>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                    <View style={styles._v_footer}>
                        <TouchableOpacity
                            style={styles._btn}
                            onPress={() => 
                            //     navigation.navigate('ExamStudyForTest', {
                            //     id: id,
                            //     name: name,
                            //     purpose,
                            //     doAgain: navigation.getParam('doAgain'),
                            //     draw:navigation.getParam('draw')
                            // })
                            navigation.dispatch(
                                navigation.replace('ExamStudyForTest', {
                                id: id,
                                name: name,
                                purpose,
                                doAgain: navigation.getParam('doAgain'),
                                draw:navigation.getParam('draw')
                                })
                              )
                        }
                        >
                            <Text style={{fontSize: smartFont * 50, color: '#fff', fontFamily: FontBase.MyriadPro_Bold}}>Bắt đầu</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ImageBackground>
    );
};

export default StudyForTestDetail;
