import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
    View,
    Text,
    Image,
    ImageBackground,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    StyleSheet,
    Animated,
    ImagePropTypes,
    FlatList,
    Platform,
} from 'react-native';
const {width, height} = Dimensions.get('window');
import styles from './style';
import VirusAchievement from '../../component/VirusAchievement';
import LinearGradient from 'react-native-linear-gradient';
import ComponentLesson from './ComponentLesson';
import API from '../../API/APIConstant';
import FontBase from '../../base/FontBase';
import {constants} from 'buffer';
import {useSelector, useDispatch} from 'react-redux';
import SmartScreenBase from '../../base/SmartScreenBase';
import Icon from 'react-native-vector-icons/AntDesign';
import apiBase from '../../base/APIBase';
import StudyDiary from './StudyDiary';
import ActivityDiary from './ActivityDiary';
import { fixedStringNumber } from '../../utils/stringUtils';
import LogBase from '../../base/LogBase';
import { Colors } from '../../styleApp/color';

const Circle = ({isActive, text, show}) => {
    return (
        <View style={mStyles.circle}>
            {show ? (
                <Image source={{uri: 'tt_na'}} style={mStyles.circleImg} />
            ) : (
                <View style={mStyles.circleView} />
            )}
            <View
                style={{
                    ...mStyles.circleMid,
                    backgroundColor: isActive ? '#00e1a0' : '#dcdcdc',
                }}
            />
            <Text style={mStyles.circleTxt}>{text}</Text>
        </View>
    );
};

const Circle2 = ({isActive, text, show}) => {
    return (
        <View style={mStyles.circle2}>
            {show ? (
                <Image source={{uri: 'tt_na2'}} style={mStyles.circle2Img} />
            ) : (
                <View style={mStyles.circle2View} />
            )}
            <View
                style={{
                    ...mStyles.circle2Mid,
                    backgroundColor: isActive ? '#00e1a0' : '#dcdcdc',
                }}
            />
            <Text style={mStyles.circle2Txt}>{text}</Text>
        </View>
    );
};
export const Diamond = ({isActive, text}) => {
    return (
        <View style={mStyles.diamond}>
            <Text
                style={{
                    color: isActive ? 'black' : '#dcdcdc',
                    ...mStyles.diamondTxt,
                }}>
                {text}
            </Text>
            <Image
                source={{
                    uri: 'diamong_tt',
                }}
                style={mStyles.diamondImg}
            />
        </View>
    );
};

const _getLv = (score, medals) => {
    if (medals.length == 0) {
        return 0;
    }
    for (let i = medals.length - 1; i >= 0; i--) {
        if (score >= medals[i].required_score) {
            return i;
        }
    }
    return 0;
};
const _getPercen = (score, lv, medals) => {
    if (lv == 0 || medals.length == 0) {
        return 0;
    }
    const tLv = medals.length - 1;
    if (lv >= tLv) {
        return 100;
    }

    return (
        lv * (100 / tLv) +
    ((score - medals[lv].required_score) * (100 / tLv)) /
      (medals[lv + 1].required_score - medals[lv].required_score)
    );
};

export const NewAchievement = ({score, titleHeader}) => {
    const [showMore, setShowMore] = React.useState(false);
    const dataLogin = useSelector((state) => state.AuthStackReducer.dataLogin);
    const [medals, setMedal] = React.useState([]); 
    const childSelected = useSelector(
        state => state.ManageChildrenReducer.childSelected,
    );

    const checkUrlGetAchievement = () => {
        return (dataLogin?.role == 'parent' ? childSelected?.id : dataLogin?.id)
    }

    React.useEffect(() => {
        apiBase
            .postDataJson('GET', `${API.baseurl}${API.listAchivement}${checkUrlGetAchievement()}`)
            .then((r) => {
                if (r.data.status) {
                    const tmp = r.data.list_medal;
                    tmp.forEach((e) => {
                        e.required_score = parseInt(e.required_score);
                    });
                    setMedal(tmp);
                }
            })
            .catch((e) => {});
    }, [dataLogin.id]);

    const lv = _getLv(score, medals);

    return (
        <View style={dataLogin.role != 'parent' && mStyles.achive}>
           {dataLogin.role != 'parent' ?  <LinearGradient
                style={mStyles.achiveHeader}
                colors={['#00e1a0', '#00b9b7']}
                start={{x: 0, y: 0}}
                end={{x: 0.5, y: 0.5}}>
                <Text style={mStyles.achiveHTxt}>DANH HIỆU</Text>
            </LinearGradient> :
                titleHeader
            }
            <View style={mStyles.achiveCon}>
                <View style={mStyles.achiveMd}>
                    <View
                        style={{
                            ...mStyles.achiveIndi,
                            width: `${_getPercen(score, lv, medals)}%`,
                        }}
                    />
                </View>
                <View style={mStyles.achiveCi}>
                    {medals.map((e, i) => {
                        return (
                            <Circle
                                key={i}
                                text={e.name}
                                show={i === lv}
                                isActive={i <= lv}
                            />
                        );
                    })}
                </View>
            </View>
            <View style={mStyles.achiveBot}>
                <TouchableOpacity
                    style={mStyles.achiveBtn}
                    onPress={() => setShowMore(!showMore)}>
                    <Text style={mStyles.achiveMore}>Danh hiệu</Text>
                    <Icon name={!showMore ? 'down' : 'up'} size={16} />
                </TouchableOpacity>
            </View>
            {showMore && (
                <View style={mStyles.achiveMoreCon}>
                    <View style={mStyles.achiveMoreCon2}>
                        <View
                            style={{
                                ...mStyles.achiveIndi2,
                                height: `${_getPercen(score, lv, medals)}%`,
                            }}
                        />
                    </View>
                    <View style={mStyles.achiveLeft}>
                        {medals.map((e, i) => {
                            return (
                                <Circle2
                                    key={e.name}
                                    text={e.name}
                                    show={i === lv}
                                    isActive={i <= lv}
                                />
                            );
                        })}
                    </View>
                    <View style={mStyles.diamondCon}>
                        {medals.map((e, i) => {
                            return (
                                <Diamond
                                    i={i}
                                    key={i}
                                    text={e.required_score}
                                    isActive={i <= lv}
                                />
                            );
                        })}
                    </View>
                </View>
            )}
        </View>
    );
};

const AchievementOnlineScreen = (props) => {
    const [dataVirusAchievement, setDataVirusAchievement] = useState([
        0, 1, 2, 3, 4, 5, 6, 7,
    ]);
    const [dataLesson, setDataLesson] = useState([]);
    const [data, setData] = useState({});

    const [animation, setAnimation] = useState(1);
    const [totalScore, setTotalScore] = useState(0);
    const [averageScore, setAverageScore] = useState(0);
    const [testScore, setTestScore] = useState(0);
    const [score, setScore] = useState(0);
    const [iconRankFrom, setIcomnRankFrom] = useState('');
    const [iconRankTo, setIconRankTo] = useState('');
    const Value = useRef(new Animated.Value(0)).current;
    const Scrollrefs = useRef();
    const studyRef = useRef();

    const dataLogin = useSelector((state) => state.AuthStackReducer.dataLogin);
    const [id, setId] = useState(dataLogin.id);
    const listener = React.useRef();

    useEffect(() => {
        const init = async () => {
            await _getDataOnline();
        };
        init();
        if (!listener.current) {
          listener.current = props.navigation.addListener('didFocus', _getDataOnline);
      }
      return () => {
          listener.current.remove();
      };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const _getDataOnline = async () => {
        const url = API.baseurl + API.student_assessment + id;
        try {
            const response = await apiBase.postDataJson('get', url);
            console.log('======Thanhtichonline', response.data);
            setData(response.data);
            setTotalScore(response.data.data_assessment?.total_diamond);
            setAverageScore(response.data.data_assessment.learning_score)
            setTestScore(response.data.data_assessment.test_score)
            let dataLesson = await _convertDataLesson(response.data.data_assessment);
            setDataLesson(dataLesson);
            setScore(dataLesson[dataLesson.length - 1]?.scoretotal || 0);
            await _checkScore(response.data.data_assessment?.total_diamond);
        } catch (error) {
            console.log('api ' + url);
            console.log(error);
        }
        console.log("=====studyRef.current")
        if(studyRef.current){
            console.log("=====studyRef.current on")
            studyRef.current.callData()
        }
    };

    const _convertDataLesson = (value) => {
        if (!value) {
            return [];
        }
        let array = [
            {
                scoretotal: value.grammar_score,
                image: 'icontt3',
                lessson: 'Grammar',
            },
            {
                scoretotal: value.reading_score,
                image: 'icontt4',
                lessson: 'Reading',
            },
            {
                scoretotal: value.speaking_score,
                image: 'icontt5',
                lessson: 'Speaking',
            },
            {
                scoretotal: value.listening_score,
                image: 'icontt6',
                lessson: 'Listening',
            },
            {
                scoretotal: value.writing_score,
                image: 'icontt7',
                lessson: 'Writing',
            },
        ];

        return array;
    };

    const _checkScore = async (totalScore) => {
        let widthSlider;
        if (totalScore <= 200) {
            let b = (totalScore / 200) * 100;
            widthSlider = ((await (width / 2)) / 100) * b;
            setIcomnRankFrom('rank5');
            setIconRankTo('rank6');
        }
        if (totalScore > 200 && totalScore <= 1000) {
            let b = (totalScore / 1000) * 100;
            widthSlider = ((await (width / 2)) / 100) * b;
            setIcomnRankFrom('rank6');
            setIconRankTo('rank5');
        }
        if (totalScore > 1000 && totalScore <= 5000) {
            let b = (totalScore / 5000) * 100;
            widthSlider = ((await (width / 2)) / 100) * b;
            setIcomnRankFrom('rank5');
            setIconRankTo('rank4');
        }
        if (totalScore > 5000 && totalScore <= 10000) {
            let b = (totalScore / 10000) * 100;
            widthSlider = ((await (width / 2)) / 100) * b;
            setIcomnRankFrom('rank4');
            setIconRankTo('rank3');
        }
        if (totalScore > 10000 && totalScore <= 15000) {
            let b = (totalScore / 15000) * 100;
            widthSlider = ((await (width / 2)) / 100) * b;
            setIcomnRankFrom('rank3');
            setIconRankTo('rank2');
        }
        if (totalScore > 15000 && totalScore <= 25000) {
            let b = (totalScore / 25000) * 100;
            widthSlider = ((await (width / 2)) / 100) * b;
            setIcomnRankFrom('rank2');
            setIconRankTo('rank1');
        }
        if (totalScore > 25000) {
            widthSlider = (await width) / 2;
            setIcomnRankFrom('rank1');
            setIconRankTo('');
        }
        await _animation(widthSlider);
    };

    const _animation = (value) => {
        Animated.timing(Value, {
            toValue: value,
            duration: 2000,
        }).start();
    };

    const _showViewBotomHeader = (image, text, score) =>
        text == 'Từ đạt được' ? (
            <View
                style={{
                    ...styles.V_C_B_H,
                    marginLeft: text == 'Từ đạt được' ? width / 14 : 0,
                }}>
                <TouchableOpacity
                    onPress={() => props.navigation.navigate('VocabScreen', props)}>
                    <TouchableOpacity style={mStyles.word}
                        onPress={() => props.navigation.navigate('VocabScreen', props)}>
                        <View style={styles.view_IBTH2}>
                            <Image source={{uri: image}} style={styles.iconBTH} />
                        </View>
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.titleScore}>{score || 0}</Text>
                        <Text style={[styles.title_B_H, {fontFamily: FontBase.UTM_AVO}]}>
                            {text}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        ) : (
            <View style={{...styles.V_C_B_H, marginHorizontal: width / 32}}>
                <View style={styles.view_IBTH}>
                    <View style={styles.view_IBTH2}>
                        <Image source={{uri: image}} style={styles.iconBTH} />
                    </View>
                </View>
                <View>
                    <Text style={styles.titleScore}>{score || 0}</Text>
                    <Text style={[styles.title_B_H, {fontFamily: FontBase.UTM_AVO}]}>
                        {text}
                    </Text>
                </View>
            </View>
        );

    const _goDetailsLesson = (item) => {
        props.navigation.navigate('DetailsLessonStudent', {item});
    };

    const _renderLesson = () => {
        return dataLesson.map((item, index) => {
            return (
                <TouchableOpacity
                    key={index}
                    disabled={true}
                    onPress={() => {
                        _goDetailsLesson(item);
                    }}>
                    <ComponentLesson index={index} item={item} />
                </TouchableOpacity>
            );
        });
    };

    const _Score = (title, score) => (

        <View style={mStyles.scoreVV}>
            <LinearGradient style={mStyles.scoreV}
                colors={['#00e1ae','#00b9b7']}
                start={{x: 0, y: 1}} end={{x: 0.5, y: 0.5}}
            >
                <Text style={mStyles.scoreTitle}>{title}</Text>
            </LinearGradient>

            <Text style={mStyles.score}>{score || "..."}</Text>
        </View>
    );
    const _tb = (dataLesson) => {
        let data = 0;
        for (let i = 0; i < dataLesson.length - 1; i++) {
            data = data + parseInt(dataLesson[i]?.scoretotal);
        }
        return isNaN(data / dataLesson.length) ? 0 : data / dataLesson.length;
    };
    return (
        <ImageBackground source={{uri: 'bgtt_2'}} style={styles.container}>
            <ScrollView style={{flex: 1}} ref={Scrollrefs}>
                <View style={styles.viewContentHeader}>
                    <ImageBackground
                        source={{uri: 'caidau'}}
                        style={styles.Caidau}
                        imageStyle={{resizeMode: 'contain'}}>
                        {dataVirusAchievement.map((item, index) => {
                            return (
                                <VirusAchievement
                                    key={index}
                                    animation={animation}
                                    location={index}
                                />
                            );
                        })}
                    </ImageBackground>

                    <View style={styles.viewBottomHeader}>
                        {_showViewBotomHeader('icontt1', 'Từ đạt được', data.number_vocab)}
                        {_showViewBotomHeader('icontt2', 'Huân chương', data.number_medal)}
                    </View>
                </View>

                <View style={styles.viewLesson}>{_renderLesson()}</View>
                <View style={mStyles.average}>
                    {_Score('Điểm trung bình', averageScore)}
                    {/* {_Score('Điểm trung bình', fixedStringNumber(_tb(dataLesson)))} */}
                    {/* {_Score('Điểm thi trung bình', fixedStringNumber(score, 1))} */}
                    {_Score('Điểm thi trung bình', testScore)}
                </View>
                <NewAchievement score={totalScore} />
                <StudyDiary ref={studyRef}/>
                <View style={{width, padding: SmartScreenBase.smPercenHeight}}>
                    <ActivityDiary navigation={props.navigation} />
                </View>
            </ScrollView>
        </ImageBackground>
    );
};

export default AchievementOnlineScreen;

const mStyles = StyleSheet.create({
    scoreVV: {
        width: '45%',
        borderRadius: 25,
        padding: 5,
        backgroundColor: '#fff',
        margin: 5,
    },
    scoreV: {
        backgroundColor: '#327ba0',
        borderRadius: 50,
        padding: 7,
        paddingHorizontal: '5%',
        alignItems: 'center',
    },
    scoreTitle: {
        color: '#fff',
        fontSize: SmartScreenBase.smFontSize * 45,
        textAlign: 'center',
        width: '70%',
        fontFamily: FontBase.MyriadPro_Bold,
    },
    score: {
        margin: 15,
        textAlign: 'center',
        fontSize: SmartScreenBase.smFontSize * 50,
        color: '#303e8d',
        fontFamily: FontBase.MyriadPro_Bold,
    },
    average: {width, padding: 30, flexDirection: 'row', justifyContent: 'center'},
    wordRank: {
        position: 'relative',
        justifyContent: 'center',
        alignItems: 'center',
        width: width / 6,
        height: width / 5,
    },
    circle: {
        width: SmartScreenBase.smPercenWidth * 12,
        alignItems: 'center',
    },
    circleImg: {
        width: SmartScreenBase.smPercenWidth * 6,
        height: SmartScreenBase.smPercenWidth * 6,
        marginBottom: SmartScreenBase.smPercenWidth * 2,
        resizeMode: 'contain',
    },
    circleView: {
        width: SmartScreenBase.smPercenWidth * 6,
        height: SmartScreenBase.smPercenWidth * 6,
        marginBottom: SmartScreenBase.smPercenWidth * 2,
    },
    circleMid: {
        width: SmartScreenBase.smPercenWidth * 6,
        height: SmartScreenBase.smPercenWidth * 6,
        borderRadius: SmartScreenBase.smPercenWidth * 3,
    },
    circleTxt: {
        fontSize: SmartScreenBase.smFontSize * 40,
        width: '100%',
        textAlign: 'center',
        marginTop: SmartScreenBase.smPercenHeight,
        fontFamily: FontBase.MyriadPro_Regular,
    },
    circle2: {
        height: SmartScreenBase.smPercenHeight * 6,
        alignItems: 'flex-start',
        flexDirection: 'row',
    },
    circle2Img: {
        width: SmartScreenBase.smPercenWidth * 5,
        height: SmartScreenBase.smPercenWidth * 6,
        resizeMode: 'contain',
        marginRight: SmartScreenBase.smPercenWidth * 1,
    },
    circle2View: {
        width: SmartScreenBase.smPercenWidth * 6,
        height: SmartScreenBase.smPercenWidth * 6,
    },
    circle2Mid: {
        width: SmartScreenBase.smPercenWidth * 3,
        height: SmartScreenBase.smPercenWidth * 3,
        borderRadius: SmartScreenBase.smPercenWidth * 1.5,
        marginTop: SmartScreenBase.smPercenHeight / 2,
    },
    circle2Txt: {
        fontSize: SmartScreenBase.smFontSize * 40,
        marginLeft: SmartScreenBase.smPercenWidth * 2,
        fontFamily: FontBase.MyriadPro_Regular,
        paddingTop: Platform.OS === 'android' ? 0 : 2,
    },
    diamond: {
        height: SmartScreenBase.smPercenHeight * 6,
        alignItems: 'flex-start',
        flexDirection: 'row',
        fontSize: SmartScreenBase.smFontSize * 40,
        justifyContent: 'flex-end',
    },
    diamondTxt: {
        marginRight: SmartScreenBase.smPercenWidth * 2,
        fontFamily: FontBase.MyriadPro_Bold,
        paddingTop: Platform.OS === 'android' ? 0 : 3,
    },
    diamondImg: {
        width: SmartScreenBase.smPercenWidth * 5,
        height: SmartScreenBase.smPercenWidth * 5,
        resizeMode: 'contain',
    },
    achive: {
        backgroundColor: '#fff',
        padding: SmartScreenBase.smPercenWidth * 2,
        margin: SmartScreenBase.smPercenWidth * 4,
        borderRadius: SmartScreenBase.smPercenWidth * 4,
    },
    achiveHeader: {
        borderRadius: SmartScreenBase.smPercenWidth * 5,
        paddingHorizontal: SmartScreenBase.smPercenWidth * 4,
        paddingVertical: SmartScreenBase.smPercenWidth * 2,
    },
    achiveHTxt: {
        fontSize: SmartScreenBase.smFontSize * 50,
        fontFamily: FontBase.MyriadPro_Bold,
        color: '#fff',
    },
    achiveCon: {
        marginBottom: SmartScreenBase.smPercenHeight,
        paddingHorizontal: SmartScreenBase.smPercenWidth * 2,
        marginTop: SmartScreenBase.smPercenHeight * 6,
    },
    achiveMd: {
        height: SmartScreenBase.smPercenWidth * 3,
        marginHorizontal: SmartScreenBase.smPercenWidth * 4,
        backgroundColor: '#dcdcdc',
    },
    achiveMdParent: {
        height: SmartScreenBase.smPercenWidth * 3,
        marginHorizontal: SmartScreenBase.smPercenWidth * 4,
        backgroundColor: '#dcdcdc',
    },
    achiveIndi: {
        height: '100%',
        backgroundColor: '#00e1a0',
        borderRadius: SmartScreenBase.smPercenWidth * 4,
    },
    achiveCi: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: -SmartScreenBase.smPercenWidth * 12.5,
    },
    achiveBot: {
        marginVertical: SmartScreenBase.smPercenHeight,
        paddingHorizontal: SmartScreenBase.smPercenWidth * 4,
    },
    achiveMore: {
        fontSize: SmartScreenBase.smFontSize * 45,
        fontFamily: FontBase.MyriadPro_Regular,
        color: Colors.TextLight
    },
    achiveBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-end',
    },
    achiveMoreCon: {
        flexDirection: 'row',
        padding: SmartScreenBase.smPercenWidth * 4,
    },
    achiveMoreCon2: {
        height: SmartScreenBase.smPercenHeight * 31,
        width: SmartScreenBase.smPercenWidth,
        backgroundColor: '#dcdcdc',
        marginVertical: SmartScreenBase.smPercenHeight / 2,
        marginLeft: SmartScreenBase.smPercenWidth * 6,
    },
    achiveIndi2: {
        width: '100%',
        backgroundColor: '#00e1a0',
        borderRadius: SmartScreenBase.smPercenWidth,
    },
    achiveLeft: {
        height: SmartScreenBase.smPercenHeight * 30,
        marginLeft: -SmartScreenBase.smPercenWidth * 8,
    },
    diamondCon: {flex: 1, height: SmartScreenBase.smPercenHeight * 30},
    word: {
        backgroundColor: '#fff',
        padding: 7,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        left: -width / 6,
        top: -width / 40,
    },
});
