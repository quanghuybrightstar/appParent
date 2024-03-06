import React, {useState, useEffect, useMemo} from 'react';
import {
    View,
    Text,
    ImageBackground,
    ScrollView,
    TouchableOpacity,
    Image,
} from 'react-native';
import stylesApp from '../../../styleApp/stylesApp';
import SmartScreenBase from '../../../base/SmartScreenBase';
import Loading from '../../../component/LoadingScreen';
import {stylesExam, stylesHistory} from './styles';
import QuestionTrueFalse from '../../../component/StydyForTest/QuestionTrueFalse';
import QuestionMultipleChoice from '../../../component/StydyForTest/QuestionMultipleChoice';
import QuestionFillTheBlank from '../../../component/StydyForTest/QuestionFillTheBlank';
import AnswerTheQuestion from '../../../component/StydyForTest/AnswerTheQuestion';
import RewriteWithTheGivenWords from '../../../component/StydyForTest/RewriteWithTheGivenWords';
import QuestionFillTheSentence from '../../../component/StydyForTest/QuestionFillTheSentence';
import {ButtonGradien} from '../../../commons/Button';
import HeaderGradient from '../../../commons/HeaderGradient';
import {QuestionHeaderFillInBlank,QuestionHeader,QuestionHeaderListen} from '../../../component/StydyForTest/QuestionHeader';
import FontBase from '../../../base/FontBase';
import LogBase from '../../../base/LogBase';
import stringUtils from '../../../utils/stringUtils';
import { AppHeader } from '../../../componentBase/AppHeader';

const styles = stylesExam;

const ResultStudy = ({navigation}) => {
    const listQ = navigation.getParam('listQuestion');
    const userChoice = navigation.getParam('userChoice');
    const isTeacher = navigation.getParam('isTeacher');
    const index = navigation.getParam('index');
    const name = navigation.getParam('name');
    const file_correct_exam = navigation.getParam('file_correct_exam');
    const [isLoading, setIsLoading] = useState(true);
    const [indexQuestion, setIndexQuestion] = useState(0);
    const [listQuestion, setListQuestion] = useState([]);
    const userExamResId = navigation.getParam('userExamResId');
    const _header = React.useRef(null);

    const _testType = navigation.getParam('type');

    useEffect(() => {
        _startMockTest();
    }, []);

    const _startMockTest = async () => {
        setIndexQuestion(index);

        // LogBase.log("setListQuestion index",index)
        // LogBase.log("setListQuestion goc",listQ[index])
        // LogBase.log("setListQuestion chon",userChoice[index])
        // LogBase.log("setListQuestion paser 1",JSON.parse(userChoice[index].user_choice))
        // LogBase.log("setListQuestion paser 2",JSON.parse(listQ[index].list_option[0].explain))

        setListQuestion(listQ);
        setIsLoading(false);
    };

    const getNumberQuest = (quest)=>{
        const {skill,question_type} = quest.list_option[0];
        if ((skill === 'reading' && question_type == 2) ||
            (skill === 'reading' && question_type == 3) ||
            (skill == 'grammar' && question_type == 1) ||
            (skill === 'writing' && question_type == 4) ||
            (skill === 'reading' && question_type == 11) ||
            (skill === 'writing' && question_type == 2) ||
            (skill === 'writing' && question_type == 3) ||
            (skill === 'writing' && question_type == 5) ||
            (skill === 'reading' && question_type == 12)
        ){
            return quest.list_option.length;
        }
        return 1;
    };

    const getCurrentNum = (idx)=>{
        var count = 0;
        for (let i = 0; i < idx; i++){
            count += getNumberQuest(listQuestion[i]);
        }
        return count;
    };

    const _showQuestion = () => {
        //console.log('listQuestion',listQuestion)
        let skill = listQuestion[indexQuestion].list_option[0].skill;
        let question_type = parseInt(listQuestion[indexQuestion].list_option[0].question_type);
        return (
            (skill === 'reading' && question_type === 2) ||
            (skill === 'reading' && question_type === 3) ||
            (skill == 'grammar' && question_type == 1) ||
            (skill == 'reading' && question_type == 4)
                ?
                <QuestionFillTheBlank
                    dataQuestion={listQuestion[indexQuestion]}
                    question_type={question_type}
                    type={'result'}
                    answer={userChoice[indexQuestion].user_choice}
                    beginNum={getCurrentNum(indexQuestion)}
                />
                :
                (skill === 'reading' && question_type === 6) ||
                (skill === 'reading' && question_type === 1) ||
                (skill === 'writing' && question_type === 8) ||
                (skill == 'pronunciation' && question_type == 11) ||
                (skill == 'grammar' && question_type == 9) ||
                //not sure here
                (skill == 'grammar' && question_type == 11) ||
                (skill === 'listening' && question_type == 3)
                    ?
                    <QuestionMultipleChoice
                        dataQuestion={listQuestion[indexQuestion]}
                        question_type={question_type}
                        type={'result'}
                        answer={userChoice[indexQuestion].user_choice}
                        beginNum={getCurrentNum(indexQuestion)}
                    />
                    :
                    (skill === 'reading' && question_type === 11) ||
                    (skill === 'writing' && question_type === 2) ||
                    (skill === 'writing' && question_type === 3) ||
                    (skill === 'writing' && question_type === 5) ||
                    (skill === 'listening' && question_type == 1) ||
                    (skill === 'listening' && question_type == 2)
                        ?
                        <AnswerTheQuestion
                            dataQuestion={listQuestion[indexQuestion]}
                            question_type={question_type}
                            type={'result'}
                            answer={userChoice[indexQuestion].user_choice}
                            beginNum={getCurrentNum(indexQuestion)}
                        />
                        :
                        (skill === 'reading' && question_type === 12) ||
                        (skill === 'listening' && question_type == 5)
                            ?
                            <QuestionTrueFalse
                                dataQuestion={listQuestion[indexQuestion]}
                                question_type={question_type}
                                type={'result'}
                                answer={userChoice[indexQuestion].user_choice}
                                beginNum={getCurrentNum(indexQuestion)}
                            />
                            :
                            (skill === 'writing' && question_type === 4)
                                ?
                                <RewriteWithTheGivenWords
                                    dataQuestion={listQuestion[indexQuestion]}
                                    question_type={question_type}
                                    type={'result'}
                                    answer={userChoice[indexQuestion].user_choice}
                                    beginNum={getCurrentNum(indexQuestion)}
                                />
                                :
                                (skill === 'reading' && question_type === 14) ||
                                (skill === 'listening' && question_type == 9)
                                    ?
                                    <QuestionFillTheSentence
                                        dataQuestion={listQuestion[indexQuestion]}
                                        question_type={question_type}
                                        type={'result'}
                                        answer={userChoice[indexQuestion].user_choice}
                                        beginNum={getCurrentNum(indexQuestion)}
                                    />
                                    :
                                    null
        );
    };

    const _goBack = () => {
        navigation.goBack();
    };
    const formatScript = (s)=>{
        if (!s) {return '';}
        return s.replace(/{.+?}/g,function(a,v){
            return `(${a.replace(/[{}]/g,'')})______`;
        });
    };
    const _renderContent = useMemo(() => {
        if (listQuestion.length == 0)
        {return null;}
        const quest = listQuestion[indexQuestion];
        let skill = quest.list_option[0].skill;
        let question_type = parseInt(quest.list_option[0].question_type);
        return (
            <ScrollView style={styles.content4}>
                <View style={{
                    marginVertical:SmartScreenBase.smPercenHeight,
                }}>
                    {/* <Text style={{
                        ...styles.text_def,
                        fontWeight: 'bold',
                    }}>{listQuestion.length ? listQuestion[indexQuestion].list_option[0].group_content : ''}</Text>
                    <Text style={{
                        ...styles.text_def,
                        fontWeight: 'bold',
                        paddingTop: SmartScreenBase.smPercenHeight * 1,
                    }}>{listQuestion.length ? listQuestion[indexQuestion].list_option[0].group_title : ''}</Text>
                    {
                        listQuestion.length>0&&!!listQuestion[indexQuestion].list_option[0].group_script&&<Text
                        style={[styles.text_def,{marginVertical:SmartScreenBase.smPercenHeight}]}
                            >{formatScript(listQuestion[indexQuestion].list_option[0].group_script)}</Text>
                    } */}
                    {
                        skill === 'listening' ?
                            <QuestionHeaderListen ref={_header} data={listQuestion[indexQuestion].list_option[0]}/>
                            :
                            (skill === 'reading' && question_type == 4) ?
                                <QuestionHeaderFillInBlank result  ref={_header} data={listQuestion[indexQuestion].list_option[0]}/>
                                :
                                <QuestionHeader result  ref={_header} data={listQuestion[indexQuestion].list_option[0]}/>
                    }

                    <View style={styles.view_question}>
                        {
                            listQuestion.length
                                ?
                                _showQuestion()
                                :
                                null
                        }
                        {
                            listQuestion.length &&
                            !!listQuestion[indexQuestion].list_option[0].explain &&
                            !! stringUtils.jsonParse(listQuestion[indexQuestion].list_option[0].explain)?.content_question_text
                            // JSON.parse(listQuestion[indexQuestion].list_option[0].explain)?.content_question_text
                                ?
                                <View>
                                    <Text
                                        style={{
                                            fontFamily:FontBase.MyriadPro_Bold,
                                            fontSize:SmartScreenBase.smFontSize * 50,
                                            paddingTop: SmartScreenBase.smPercenHeight * 2,
                                        }}
                                    >Giải thích:</Text>
                                    <Text
                                        style={{
                                            fontFamily:FontBase.MyriadPro_Regular,
                                            fontSize:SmartScreenBase.smFontSize * 50,
                                        }}
                                    >
                                        {listQuestion[indexQuestion].list_option[0].question_explain?.content_question_text}
                                    </Text>
                                </View>
                                :
                                null
                        }
                    </View>
                    <View style={{height:SmartScreenBase.smPercenHeight * 3}} />
                </View>
            </ScrollView>
        );
    }, [listQuestion, indexQuestion]);

    const _viewVideoExplain = ()=>{
        navigation.navigate('PracticeExplain',{path:file_correct_exam});
    };
    return (
        <ImageBackground
            source={{uri: 'bg_exam'}}
            imageStyle={stylesApp.ImageBackGround}
            style={{flex: 1}}>
            {
                isLoading ?
                    <ImageBackground
                        source={{uri: 'imagebackground'}}
                        imageStyle={stylesApp.ImageBackGround}
                        style={stylesHistory.loading}>
                        <Loading/>
                    </ImageBackground>
                    :
                    null
            }
            <AppHeader title={'Đáp án'} leftIconOnPress={() => navigation.goBack()} 
                rightComponent={()=>{
                    if (!file_correct_exam) {return null;}
                    return <ButtonVideo onPress={() => _viewVideoExplain()}/>;
                }}/>
            {/* <HeaderGradient
                title={'Đáp án'}
                goBack={() => _goBack()}
                rightBtn={()=>{
                    if (!file_correct_exam) {return null;}
                    return <ButtonVideo onPress={() => _viewVideoExplain()}/>;
                }}
            /> */}
            <View style={styles.contents}>
                <View style={styles.header_content}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate(isTeacher ? 'TeacherSeeTheAnswer' : 'SeeTheAnswer', {
                            user_exam_result_id: userExamResId,
                            name :name,
                            type:_testType,
                            questions: userChoice,
                            cb:(index)=>{
                                setIndexQuestion(index);
                            },
                        })}
                    >
                        <View style={styles.total_question}>
                            <Text
                                style={{...styles.text_def, padding: SmartScreenBase.smPercenWidth * 2}}>
                                {`${indexQuestion + 1 > 9 ? indexQuestion + 1 : `0${indexQuestion + 1}`}/${listQuestion.length > 9 ? listQuestion.length : `0${listQuestion.length}`}`}
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                {_renderContent}
                <View style={styles.footer}>
                    <ButtonGradien
                        disabled={indexQuestion === 0}
                        onPress={() => setIndexQuestion(indexQuestion => indexQuestion - 1)}
                    >
                        <Image
                            source={require('../../../assets/image/prev_2.png')}
                            resizeMode={'contain'} style={{...styles.img_nextback}}/>
                    </ButtonGradien>
                    <ButtonGradien
                        disabled={listQuestion.length - 1 === indexQuestion}
                        onPress={() => setIndexQuestion(indexQuestion => indexQuestion + 1)}
                    >
                        <Image source={require('../../../assets/image/next_2.png')}
                            resizeMode={'contain'} style={styles.img_nextback}/>
                    </ButtonGradien>
                </View>
            </View>
        </ImageBackground>
    );
};

const ButtonVideo = ({onPress})=>{
    return <TouchableOpacity
        onPress={onPress}
        style={{
            backgroundColor:'#fff',
            borderRadius:SmartScreenBase.smPercenWidth * 5,
            paddingVertical:SmartScreenBase.smPercenHeight / 2,
            paddingHorizontal:SmartScreenBase.smPercenWidth * 6,
            marginRight:SmartScreenBase.smPercenWidth * 4,
            borderColor:'#00b9b7',
            borderWidth:2,
        }}>
        <Text style={{color:'#00b9b7',fontSize: SmartScreenBase.smFontSize * 45, fontFamily: FontBase.MyriadPro_Bold}}>Video chữa bài</Text>
    </TouchableOpacity>;
};

export default ResultStudy;
