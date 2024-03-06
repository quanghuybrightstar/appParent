import {StatusBar, ImageBackground, View, Alert, Keyboard   , Text , StyleSheet , ScrollView , Button , FlatList , TextInput , TouchableOpacity , UIManager , LayoutAnimation , Platform ,Image } from 'react-native';
import SmartScreenBase from '../../../base/SmartScreenBase'
import API from "../../../API/APIConstant";
import LinearGradient from 'react-native-linear-gradient';
import {AppHeader} from "../../../componentBase/AppHeader";
import React, {useState, useEffect, useRef} from 'react';
import styles from "./styles";
import {Colors} from "../../../styleApp/color";
import ScoreWrittingBox from './ScoreWrittingBox';
import APIBase from '../../../base/APIBase'
import FontBase from '../../../base/FontBase';
import {AppTextInput} from '../../../componentBase/AppTextInput'
import {SelectableTextComponent} from '../../../component/MarkWrittingItem/SelectableText';
import MarkWrittingBox from './MarkWrittingBox'
import {ShortMainButton} from '../../../componentBase/ShortMainButton';
import {ModalCriterial} from '../../../component/MarkWrittingItem/modals/ModalCriterial'
import AppData from '../../../data/AppData'
import cloneDeep from 'lodash/cloneDeep';
import {TextBoxModal} from '../../../componentBase/TextBoxModal'
import {ModalCofirm1} from '../../../component/MarkWrittingItem/modals/ModalConfirm1'
import {ModalTutorial} from '../../../component/MarkWrittingItem/modals/ModalTutorial'
import {FullScreenLoadingIndicator} from '../../../componentBase/indicator/FullScreenLoadingIndicator';
import MarkData from './MarkData';
import {useDispatch, useSelector} from 'react-redux';
import {setReload} from '../../../redux/actions/Filter';
import LogBase from '../../../base/LogBase';

const MarkWrittingScreen = (props) => {

    let myItem = props.navigation.getParam('item');
    let isTeacher = props.navigation.getParam('isTeacher');
    const [dataCriteria, setDataCriteria] = useState();
    const [data_criBU, setData_criBU] = useState();
    const [exercise_id, setExercise_id] = useState();
    const [commentText, setCommentText] = useState('');
    const [excText, setExcText] = useState("");
    const [aiCheckData, setAiCheckData] = useState('');
    const [markedData, setMarkedData] = useState();
    const [checkMarked, setCheckMarked] = useState(false);
    const [grammarScore, setGrammarScore] = useState(0);
    const [spellingScore, setSpellingScore] = useState(0);
    const [isMarkAI, setIsMarkAI] = useState(false);
    const [isOpenModalFixWordErr, setIsOpenModalFixWordErr] = useState(false);
    const [modalCriVisible, setModalCriVisible] = useState(false);
    const [showInputModal, setShowInputModal] = useState(false);
    const [modalMarkAIReq, setModalMarkAIReq] = useState(false);
    const [modalConfirmVisible1, setModalConfirmVisible1] = useState(false);
    const [modalTutVisible, setModalTutVisible] = useState(false);
    const [modalHDSVisible, setModalHDSVisible] = useState(false);
    const [loadingIndicator, setLoadingIndicator] = useState(false); 
    const [isCriAll, setIsCriAll] = useState(false);
    const [firstload, setFirstload] = useState(false);
    const [isDisBtn, setIsDisBtn] = useState(true);
    const [library, setlibrary] = useState('');
    const [class_id, setclass_id] = useState('');

    const dataLogin = useSelector(state => state.AuthStackReducer.dataLogin);
    const dispatch = useDispatch();

    useEffect(() => {
        getData();
    }, [])

    const CallDataEx = async (id, library, typeExe) => {
        const url = API.baseurl+API.getMarkWritting(id, library, typeExe)
        try {
            var res = await APIBase.tokenAPI('get', url);
            console.log("==========Data_CallDataEx",url);
            console.log("==========+CallDataEx",res.data);
            if(res.data.status){
                setclass_id(res.data.exercise_data.class_id)
                setExercise_id(res.data.exercise_data.exercise_id)
                if(res.data.old_result){
                    setlibrary(res.data.old_result.library)
                    if(res.data.resource_data.content && res.data.resource_data.content.toString().length > 0){
                        setExcText(res.data.resource_data.content.replace(/\s+/g, ' ').trim())
                    }
                    setCommentText(res.data.old_result.comment)
                    setMarkedData(JSON.parse(res.data.old_result.json_writing_check));
                    setDataCriteria(JSON.parse(res.data.old_result.json_criteria_score))
                    setData_criBU(cloneDeep(JSON.parse(res.data.old_result.json_criteria_score)));
                }else{
                    if(res.data.resource_data.content && res.data.resource_data.content.toString().length > 0){
                        setExcText(res.data.resource_data.content.replace(/\s+/g, ' ').trim())
                    }
                    CallDataCriteria(exercise_id);
                }
            }else{
                console.log("==========Error",res.data);
            }
        } catch (error) {
        }
    }

    const CallDataCriteria = async (idExercise) => {
        const url = API.baseurl+API.getCriteria(idExercise)
        //console.log("==========CallDataCriteria_url",url);
        var res = await APIBase.tokenAPI('get', url)
        console.log("==========CallDataCriteria",res.data);
        if(res.data.status){
            setDataCriteria(res.data.data_criteria)
            setData_criBU(cloneDeep(res.data.data_criteria));
        }
    }

    const getData = async () => {
        MarkData.curScoreList = []
        LogBase.log("=====CallDataEx",myItem)
        if(isTeacher){
            await CallDataEx(myItem.user_exercise_id, myItem.library, myItem.exercise_type);
        }else{
            await CallDataEx(myItem.userExerciseId, myItem.library, myItem.exerciseType);
        }
        setLoadingIndicator(false)
    }

    const firstTimeSelect = () => {
        setModalConfirmVisible1(true)
    }
    
    const rejectAI = () => {
        console.log("==========rejectAI")
        setIsMarkAI(false)
        setCheckMarked(false)       
    }
    
    const getAIClick = () => {
        console.log("==========getAIClick")
        setCheckMarked(true)
    }

    const getAICheck= async () => {
        console.log("===ModalCofirm2===")
        const data = {
            content : excText,
            user_id : dataLogin.user_id,
            library : library,
            user_exercise_id : myItem.user_exercise_id,
            class_id : class_id
        }
        setLoadingIndicator(true)
        var url = API.baseurl+API.aiCheckWriting
        var res = await APIBase.postDataJson('post', url, data)
        setLoadingIndicator(false)
        if(res.data.data_check.result_content){
            //console.log('==========++res.data.data_check.result_content',res.data.data_check.result_content)
            setAiCheckData(res.data.data_check.result_content);
            setGrammarScore(res.data.data_check.number_grammar);
            setSpellingScore(res.data.data_check.number_spelling);
            setIsMarkAI(true)
        }
    }

    const putCriteriaToSV = async (mData , id ) => {
        var upList = []
        mData.forEach(element => {
            var mono={
                text: element.text,
                proportion: element.proportion
            }
            upList.push(mono)
        });
        const reqData = {
            json_criteria : JSON.stringify(upList),
            exercise_id : id
        }
        setIsCriAll(id == 0 ? true : false)
        console.log("=====reqData",reqData)
        const url = API.baseurl+API.updateCriteria
        setLoadingIndicator(true)
        var res = await APIBase.postDataJson('put', url, reqData)
        setLoadingIndicator(false)
                if(res.data.status){
                    setDataCriteria(res.data.data_criteria)
                    setModalCriVisible(false);
                }
                else{
                    Alert(res.data.msg)
                }
    }

    const sendMarkResult = async () => {
        var sDataCrit = createDataCrit(dataCriteria, MarkData.curScoreList)
        if(!sDataCrit) {
            Alert("Bạn cần tạo tiêu chí chấm bài trước khi gửi học sinh") 
            return
        }

        setLoadingIndicator(true)

        const reqData = {
            json_criteria_score : JSON.stringify(sDataCrit),
            user_exercise_id : myItem.user_exercise_id,
            score : MarkData.totalScore,
            comment : commentText,
            json_writing_check : JSON.stringify(
               MarkData.curMarkListsData
            //{"cachesList": "Pluto is a dwarf planet locates of the Kuiper Belt. Pluto really is small compare with another planets at the solar system. It’s about 2380 km width. It’s been only two third the wide of our moon. It’s an fascinated world. It has blue skies, five moon, mountains, and snowy. But snow on Pluto is red which is different with snow here. Like other planets, Pluto’s orbit is both elliptical between tilted. It take Pluto 248 year finishing one journey around the Sun. One day on Pluto is 153 hour. Because its far distance, the average temperature in this place is around -228 to – 238 degrees Celsius. It’s far too hot to sustain life. But who knows. What if there is a kind of alien that is unable to fight this extreme cold. Some scientists thinks that there could be a ocean deep inside. And this ocean might contained life ingredients. So far, we have only know a little about these dwarf planet. Astronomers hope we could explore it one day and reach out to the new horizon. ", "errList": [], "fixList": []}   
                // [{"status": "origin", "text": "Pluto"},
                // {"status": "origin", "text": "is"}, {"status": "origin", "text": "a"}, {"status": "origin", "text": "dwarf"}, 
                // {"status": "origin", "text": "planet"}, {"status": "origin", "text": "locates of"}, {"status": "origin", "text": "the"}, {"status": "origin", "text": "Kuiper"}, {"status": "origin", "text": "Belt."}, {"status": "origin", "text": "Pluto"}, {"status": "origin", "text": "really"}, {"status": "origin", "text": "is"}, {"status": "origin", "text": "small"}, {"status": "origin", "text": "compare"}, {"status": "origin", "text": "with"}, {"status": "origin", "text": "another"}, {"status": "origin", "text": "planets"}, {"status": "origin", "text": "at"}, {"status": "origin", "text": "the"}, {"status": "origin", "text": "solar"}, {"status": "origin", "text": "system."}, {"status": "origin", "text": "It’s"}, {"status": "origin", "text": "about"}, {"status": "origin", "text": "2380"}, {"status": "origin", "text": "km"}, {"status": "origin", "text": "width."}, {"status": "origin", "text": "It’s"}, {"status": "origin", "text": "been"}, {"status": "origin", "text": "only two third"}, {"status": "origin", "text": "the"}, {"status": "origin", "text": "wide"}, {"status": "origin", "text": "of"}, {"status": "origin", "text": "our"}, {"status": "origin", "text": "moon."}, {"status": "origin", "text": "It’s"}, {"status": "origin", "text": "an"}, {"status": "origin", "text": "fascinated"}, {"status": "origin", "text": "world."}, {"status": "origin", "text": "It"}, {"status": "origin", "text": "has"}, {"status": "origin", "text": "blue"}, {"status": "origin", "text": "skies,"}, {"status": "origin", "text": "five"}, {"status": "origin", "text": "moon,"}, {"status": "origin", "text": "mountains,"}, {"status": "origin", "text": "and"}, {"status": "origin", "text": "snowy."}, {"status": "origin", "text": "But"}, {"status": "origin", "text": "snow"}, {"status": "origin", "text": "on"}, {"status": "origin", "text": "Pluto"}, {"status": "origin", "text": "is"}, {"status": "origin", "text": "red"}, {"status": "origin", "text": "which"}, {"status": "origin", "text": "is"}, {"status": "origin", "text": "different"}, {"status": "origin", "text": "with"}, {"status": "origin", "text": "snow"}, {"status": "origin", "text": "here."}, {"status": "origin", "text": "Like"}, {"status": "origin", "text": "other"}, {"status": "origin", "text": "planets,"}, {"status": "origin", "text": "Pluto’s"}, {"status": "origin", "text": "orbit"}, {"status": "origin", "text": "is"}, {"status": "origin", "text": "both"}, {"status": "origin", "text": "elliptical"}, {"status": "origin", "text": "between"}, {"status": "origin", "text": "tilted."}, {"status": "origin", "text": "It"}, {"status": "origin", "text": "take"}, {"status": "origin", "text": "Pluto"}, {"status": "origin", "text": "248"}, {"status": "origin", "text": "year"}, {"status": "origin", "text": "finishing"}, {"status": "origin", "text": "one"}, {"status": "origin", "text": "journey"}, {"status": "origin", "text": "around"}, {"status": "origin", "text": "the"}, {"status": "origin", "text": "Sun."}, {"status": "origin", "text": "One"}, {"status": "origin", "text": "day"}, {"status": "origin", "text": "on"}, {"status": "origin", "text": "Pluto"}, {"status": "origin", "text": "is"}, {"status": "origin", "text": "153"}, {"status": "origin", "text": "hour."}, {"status": "origin", "text": "Because"}, {"status": "origin", "text": "its"}, {"status": "origin", "text": "far"}, {"status": "origin", "text": "distance,"}, {"status": "origin", "text": "the"}, {"status": "origin", "text": "average"}, {"status": "origin", "text": "temperature"}, {"status": "origin", "text": "in"}, {"status": "origin", "text": "this"}, {"status": "origin", "text": "place"}, {"status": "origin", "text": "is"}, {"status": "origin", "text": "around"}, {"status": "origin", "text": "-228"}, {"status": "origin", "text": "to"}, {"status": "origin", "text": "–"}, {"status": "origin", "text": "238"}, {"status": "origin", "text": "degrees"}, {"status": "origin", "text": "Celsius."}, {"status": "origin", "text": "It’s"}, {"status": "origin", "text": "far"}, {"status": "origin", "text": "too"}, {"status": "origin", "text": "hot"}, {"status": "origin", "text": "to"}, {"status": "origin", "text": "sustain"}, {"status": "origin", "text": "life."}, {"status": "origin", "text": "But"}, {"status": "origin", "text": "who"}, {"status": "origin", "text": "knows."}, {"status": "origin", "text": "What"}, {"status": "origin", "text": "if"}, {"status": "origin", "text": "there"}, {"status": "origin", "text": "is"}, {"status": "origin", "text": "a"}, {"status": "origin", "text": "kind"}, {"status": "origin", "text": "of"}, {"status": "origin", "text": "alien"}, {"status": "origin", "text": "that"}, {"status": "origin", "text": "is"}, {"status": "origin", "text": "unable"}, {"status": "origin", "text": "to"}, {"status": "origin", "text": "fight"}, {"status": "origin", "text": "this"}, {"status": "origin", "text": "extreme"}, {"status": "origin", "text": "cold."}, {"status": "origin", "text": "Some"}, {"status": "origin", "text": "scientists"}, {"status": "origin", "text": "thinks"}, {"status": "origin", "text": "that"}, {"status": "origin", "text": "there"}, {"status": "origin", "text": "could"}, {"status": "origin", "text": "be"}, {"status": "origin", "text": "a"}, {"status": "origin", "text": "ocean"}, {"status": "origin", "text": "deep"}, {"status": "origin", "text": "inside."}, {"status": "origin", "text": "And"}, {"status": "origin", "text": "this"}, {"status": "origin", "text": "ocean"}, {"status": "origin", "text": "might"}, {"status": "origin", "text": "contained"}, {"status": "origin", "text": "life"}, {"status": "origin", "text": "ingredients."}, {"status": "origin", "text": "So"}, {"status": "origin", "text": "far,"}, {"status": "origin", "text": "we"}, {"status": "origin", "text": "have"}, {"status": "origin", "text": "only"}, {"status": "origin", "text": "know"}, {"status": "origin", "text": "a"}, {"status": "origin", "text": "little"}, {"status": "origin", "text": "about"}, {"status": "origin", "text": "these"}, {"status": "origin", "text": "dwarf"}, {"status": "origin", "text": "planet."}, {"status": "origin", "text": "Astronomers"}, {"status": "origin", "text": "hope"}, {"status": "origin", "text": "we"}, {"status": "origin", "text": "could"}, {"status": "origin", "text": "explore"}, {"status": "origin", "text": "it"}, {"status": "origin", "text": "one"}, {"status": "origin", "text": "day"}, {"status": "origin", "text": "and"}, {"status": "origin", "text": "reach"}, {"status": "origin", "text": "out"}, {"status": "origin", "text": "to"}, {"status": "origin", "text": "the"}, {"status": "origin", "text": "new"}, {"status": "origin", "text": "horizon."}]
            ),
            library : myItem.library,
            exercise_type : 'writing'
        }
        const url = API.baseurl+API.saveMarkExercise
        var res = await APIBase.postDataJson('put', url, reqData)
        console.log("============Data_sendMarkResult",reqData)
        //console.log("============sendMarkResult",res.data)
        if(res.data.status){
            setLoadingIndicator(false)
            await dispatch(setReload(true));
            console.log('=====dispatch')
            props.navigation.navigate('MarkDetailScreen');
        }
        else{
            setLoadingIndicator(false)
            Alert(res.data.msg)
        }
    }

    const createDataCrit = (mDataCriteria, mScoreList) => {
        if(!mDataCriteria) return
        var mDataListCri = []
        for(var i=0;i<mDataCriteria.length;i++){
            var mono = {proportion: mDataCriteria[i].proportion,
                        text: mDataCriteria[i].text,
                        score: mScoreList[i]}
            mDataListCri.push(mono)
        }
        console.log("===========createDataCrit",mDataListCri)
        return mDataListCri
    }

    const countWord = (mData) => {
        var mList = mData.split(' ')
        var mCount = []
        mList.forEach(element => {
            if(element != ""){
                mCount.push(element)
            }
        });
        return mCount.length
    }

    const keepDataCri = (buData, curData) => {
        var resuList = [...buData]
        resuList.forEach(element => {
            var curIndex = curData.findIndex(c => c.text = element.text)
            if(curIndex >= 0){
                element.score = curData[curIndex].score
            }
        });
        return resuList
    }

    const renderHeader = () => {
        if(isTeacher){
            return myItem.to_fullname ? myItem.to_fullname : myItem.to_username
        }
        return "Bài giáo viên chấm"
    }

    const reusultAIRender = (grammarSc, spellingSc) => {
        return(
        <LinearGradient 
        colors={[Colors.LightGreen, Colors.BaseGreen]}
                start={{ x: 0.1, y: 0.2 }} end={{ x: 0.9, y: 0.8 }}
                style={styles.reusultAIBox}>
            <View style={styles.reusultAIMono}>
                <Text style={styles.TextAIScore}>{grammarSc}</Text>
                <Text style={styles.TextAISkill}>GRAMMAR ISSUES</Text>
            </View>
            <View style={{height: '80%', width: 1, backgroundColor: Colors.White}}></View>
            <View style={styles.reusultAIMono}>
                <Text style={styles.TextAIScore}>{spellingSc}</Text>
                <Text style={styles.TextAISkill}>SPELLING ISSUES</Text>
            </View>
        </LinearGradient>
        )
    }

    const commentRender = () => {
        return(
        <View style={styles.commentView}>
            <View style={{height: SmartScreenBase.smPercenWidth*10, flexDirection: 'row' ,alignItems: 'center'}}>
                <Text style={[styles.TextSize,{fontFamily: FontBase.MyriadPro_Bold}]}>Nhận xét</Text>
                {isTeacher ? <TouchableOpacity onPress={() => setShowInputModal(true)} style={[styles.smallIconBt,{marginLeft: SmartScreenBase.smPercenWidth*2}]}>
                    <Image source={{uri: 'iconbutchi'}} resizeMode={'contain'}
                        style={{width: SmartScreenBase.smPercenWidth*4, height: SmartScreenBase.smPercenWidth*4}}/>
                </TouchableOpacity> : null}
            </View>
            <View style={{marginTop: SmartScreenBase.smPercenWidth, marginLeft: SmartScreenBase.smPercenWidth*2}}>
                <Text style={[styles.TextSize,{fontFamily: FontBase.MyriadPro_Regular}]}>{commentText}</Text>
            </View>
        </View>
        )
    }

    const ExcRender = () => {
        return(
        <View style={styles.ExcView}>
            {isTeacher ? <View style={styles.ExcTop}>
                <TouchableOpacity onPress={() => isMarkAI ? rejectAI() : getAIClick()} style={[styles.bigIconBt,{marginLeft: SmartScreenBase.smPercenWidth*2}]}>
                    {!isMarkAI && <Image source={{uri: 'iconviet'}} resizeMode={'contain'}
                        style={{width: SmartScreenBase.smPercenWidth*9, height: SmartScreenBase.smPercenWidth*9, marginLeft: SmartScreenBase.smPercenWidth*1}}/>}
                    <Text style={[styles.TextSize,{color: Colors.White, marginLeft: SmartScreenBase.smPercenWidth*2, fontFamily: FontBase.MyriadPro_Bold, fontSize: SmartScreenBase.smFontSize*50}]}>{isMarkAI?" Hủy chấm AI":"Chấm AI"}</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setModalTutVisible(true)} style={[styles.smallIconBt,{marginLeft: SmartScreenBase.smPercenWidth*40}]}>
                    <Image source={{uri: 'dauhoi'}} resizeMode={'contain'}
                        style={{width: SmartScreenBase.smPercenWidth*4, height: SmartScreenBase.smPercenWidth*4}}/>
                </TouchableOpacity>
            </View> : null}
            <View style={[styles.ExcBody,{paddingTop: isTeacher ? SmartScreenBase.smPercenWidth*7 : SmartScreenBase.smPercenWidth*3}]}>
                <Text style={styles.textSum}>{"Tổng số từ : " + countWord(excText)}</Text>
                <MarkWrittingBox
                    data={excText}
                    isTeacher={isTeacher}
                    marked={markedData}
                    aiData={aiCheckData}
                    isCancelAI={!isMarkAI}
                    checkMarked={checkMarked}
                    openPopupAskAI={()=>{setModalMarkAIReq(true)}}
                    getAI={getAICheck}
                    isOpenModalFixWordErr={isOpenModalFixWordErr}
                    firstTimeSelect={firstTimeSelect}
                    openPopupHDS={()=>{console.log("=====HD","minh") ;setModalHDSVisible(true)}}
                />
            </View>
        </View>
        )
    }

    const BotButtonRender = () => {
        if(isTeacher){
            LogBase.log("=====MarkData",MarkData.curScoreList)
            return(
            <View style={styles.BotButton}>
                <ShortMainButton text={"Gửi học sinh"} type={1} widthType={'full'} isDisabled={isDisBtn}
                    onPress={()=>{sendMarkResult()}}/>
            </View>
            )
        }else return
    }

    return (
            <View style={{flex: 1}}>
                <AppHeader rightImage={isTeacher ? {uri: 'addstuden2'} : null} rightIconOnPress={() => {setModalCriVisible(true)}} title={renderHeader()} leftIconOnPress={() => {
                props.navigation.pop();
            }}/>
                <ImageBackground
                    source={{uri: 'background111'}} style={styles.centerLayout}>

                    {/* {<FullScreenLoadingIndicator visible={firstload}/> */}
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <ScoreWrittingBox isTeacher={isTeacher} data={dataCriteria} setIsDisBtn={setIsDisBtn} 
                            style={{marginLeft: SmartScreenBase.smPercenWidth*4,marginTop: SmartScreenBase.smPercenWidth*3}}/>
                        {commentRender()}
                        {/* {isMarkAI && reusultAIRender(grammarScore,spellingScore)} */}
                        {ExcRender()}
                        {BotButtonRender()}
                    </ScrollView>
                </ImageBackground>
                <ModalCriterial
                    isModalVisible = {modalCriVisible}
                    isCriAll = {isCriAll}
                    data = {dataCriteria}
                    idCriteria = {exercise_id}
                    onPressModal = {(value , id) => {
                        console.log("id" +id)
                        putCriteriaToSV(value , id )
                    }}
                    onPressCancelModal = {() => {setModalCriVisible(false)}}
                />
                <ModalCofirm1 isModalVisible = {modalMarkAIReq}
                    onPressYesModal = {() => {
                        setModalMarkAIReq(false) ;
                        setCheckMarked(false)
                        getAICheck()
                    }}
                    onPressNoModal = {() => {
                        setModalMarkAIReq(false)
                        setCheckMarked(false)
                    }}
                    child={
                        <View>
                            <Text style={styles.modalTitleText}>Bạn muốn chấm lại bằng chức năng
                                <Text style={[styles.modalTitleText,{fontFamily : FontBase.MyriadPro_Bold}]}> Chấm AI </Text>
                            không?</Text>
                            <Text style={styles.modalBodyText}>Bài chấm sẽ khôi phục về ban đầu!</Text>
                        </View>
                    }/>
                <ModalCofirm1 isModalVisible = {modalConfirmVisible1}
                        onPressYesModal = {() => {
                            setCheckMarked(false)
                            setModalConfirmVisible1(false);
                            getAICheck();                            
                        }}
                        onPressNoModal = {() => {
                            setCheckMarked(false)
                            setModalConfirmVisible1(false) ;
                            setIsOpenModalFixWordErr(true);
                    }}
                    child={
                        <Text style={styles.modalTitleText}>Bạn có muốn sử dụng chức năng
                        <Text style={[styles.modalTitleText,{fontFamily : FontBase.MyriadPro_Bold}]}> Chấm AI </Text>
                        không?</Text>
                    }
                />
                <ModalTutorial type={'full'} isModalVisible = {modalTutVisible}  onPressModal = {() => {  setModalTutVisible(false)}}/>
                <ModalTutorial type={'lite'} isModalVisible = {modalHDSVisible}  onPressModal = {() => {  setModalHDSVisible(false)}}/>
                <TextBoxModal isVisible={showInputModal} title={"Nhận xét"} placeholderText={"Nhận xét của bạn"} 
                submitText={"Xong"} onSubmit={(value) => {setCommentText(value) ;setShowInputModal(false)}}
                onCancel={()=>setShowInputModal(false)} 
                textInputStyles={{height: SmartScreenBase.smPercenWidth*40, elevation: 4}}
                defaultValue={commentText} onCancel={() => {setShowInputModal(false)}}       
                />
                <FullScreenLoadingIndicator visible={loadingIndicator}/>
            </View>
    );
};

export default MarkWrittingScreen;
