import React, {useState, useEffect, useMemo, useCallback} from 'react';
import {
    View,
    ImageBackground,
    TouchableOpacity,
    Image, Alert, PermissionsAndroid,Platform,Linking,StyleSheet,Text
} from 'react-native';
import stylesApp from '../../../styleApp/stylesApp';
import SmartScreenBase from '../../../base/SmartScreenBase';
import axios from 'axios';
import {useSelector} from 'react-redux';
import Header from './Header';
import RecordAudio from "./RecordAudio";
import AudioRecord from "react-native-audio-record";
import DocumentPicker from 'react-native-document-picker';
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'rn-fetch-blob';
import API from "../../../API/APIConstant";
import LoadingScreen from "../../LoadingScreen";
import TextDocument from "./TextDocument";
import Content from "./Content";
import ModalSelect from "./ModalSelect";
import ModalFilter from "./ModalFilter";
import ModalCreateFile from "./ModalCreateFile";
import ModalDelete from "./ModalDelete";
import FileViewer from 'react-native-file-viewer';
import APIBase from "../../../base/APIBase";
import FilePickerManager from 'react-native-file-picker';
import FontBase from '../../../base/FontBase';
import {ButtonMedium} from '../../../commons/Button';
import {SmPopup} from '../../../componentBase/SmPopup/SmPopup';
import { StudentGrammarJson } from '../../../stringJSON/StudentGrammarJson'
import { CommonJson } from "../../../stringJSON";
import { AppHeader } from "../../../componentBase/AppHeader/AppHeader"
import { Colors } from '../../../styleApp/color';
import cloneDeep from 'lodash/cloneDeep';
import LogBase from '../../../base/LogBase';
import { FullScreenLoadingIndicator } from '../../../componentBase/indicator/FullScreenLoadingIndicator';
import recordSetting from '../../../utils/recordSetting';

var Sound = require('react-native-sound');
Sound.setCategory('Playback');

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}  

const _supportType=[
    'mp3','mp4','pdf','ppt','pptx','doc','docx','png','jpg','jpeg','wav','mov','xlsx','gdoc','webm','heic'
]

const StudyGuide = (props) => {
    const {jwt_token} = useSelector(state => state.AuthStackReducer.dataLogin);
    const [dataStudy, setDataStudy] = useState([]);
    const [visibleModalSelect, setVisibleModalSelect] = useState(false);
    const [visibleModalFilter, setVisibleModalFilter] = useState(false);
    const [modalTextDocument, setModalTextDocument] = useState(false);
    const [visibleModalCreateFile, setVisibleModalCreateFile] = useState(false);
    const [visibleModalDelete, setVisibleModalDelete] = useState(-1);
    const [path, setPath] = useState('');
    const [title, setTitle] = useState('');
    const [loading, setLoading] = useState(true);
    const [modalRecordAudio, setModalRecordAudio] = useState(false);
    const [recoding, setRecoding] = useState(false);
    const [contentTextDocument, setContentTextDocument] = useState('');
    const [dataGrade, setDataGrade] = useState([]);
    const [showErrorModal, setErrorModal] = useState(false)
    const [mesCallErr, setMesCallErr] = useState(StudentGrammarJson.CallCameraRecoderError)
    const [history, setHistory] = useState()
    //Kiểm tra xem có phải filter hay không
    const [isFilter, setIsFilter] = useState(false);
    
    const _isByFilter = React.useRef(false);

    const [dataType, setDataType] = useState([
        {name: 'Video', value: 'video', choose: false},
        {name: 'Âm thanh', value: 'audio', choose: false},
        {name: 'Văn bản', value: 'writing', choose: false},
        {name: 'Hình ảnh', value: 'img', choose: false},
    ]);
    const [dataSkill, setDataSkill] = useState([
        {name: 'Pronunciation', choose: false},
        {name: 'Vocabulary', choose: false},
        {name: 'Grammar', choose: false},
        {name: 'Reading', choose: false},
        {name: 'Listening', choose: false},
        {name: 'Speaking', choose: false},
        {name: 'Writing', choose: false},
        {name: 'Project', choose: false},
        {name: 'Test', choose: false},
    ]);

    useEffect(() => {
        if(visibleModalFilter){
          var hisData = {
            dataSkill: cloneDeep(dataSkill),
            dataType: cloneDeep(dataType),
            dataGrade: cloneDeep(dataGrade),
          }
          console.log("=====hisData",hisData)
          setHistory(hisData)
        }
      }, [visibleModalFilter])

    useEffect(() => {
        _getDataStudy();
        _getGrade();
    }, [jwt_token]);

    const _getDataStudy = async (type, grade, skill, mFilter) => {
        setLoading(true);
        const url = API.baseurl + API.getStudyGuide + `?type=${JSON.stringify(type)}&grade_id=${JSON.stringify(grade)}&skill=${JSON.stringify(skill)}`;
        const headers = {...API.header, jwt_token};
        try {
            const res = await APIBase.postDataJson('GET',url);
            console.log("=====_getDataStudy",res.data)
            if (res.data.status) {
                setDataStudy(res.data.resources);
                //is go to from 'Giao bài' ?
                if(props.navigation.getParam('isGiaoBai')){
                    setVisibleModalSelect(true)
                }
                if(mFilter){
                    setIsFilter(true)
                }else{
                    setIsFilter(false)
                }
            } else {
                Alert.alert(res.data.msg);
                setDataStudy([]);
            }
            setLoading(false);
        } catch (e) {
            setDataStudy([]);
            setLoading(false);
        }
    };

    const _getGrade = async () => {
        const url = API.baseurl + API.getGradeNew;
        const headers = {...API.header, jwt_token};
        try {
            const res = await APIBase.postDataJson('GET',url);
            if (res.data.status) {
                setDataGrade(res.data.list_grade);
            } else {
                Alert.alert(res.data.msg);
                setDataGrade([]);
            }
            //setLoading(false);
        } catch (e) {
            setDataGrade([]);
        }
    };

    const _handleItem = (index, data) => {
        const copy = [...data];
        copy[index].choose = !copy[index].choose;
        if (data === dataGrade) {
            setDataGrade(copy);
        } else if (data === dataType) {
            setDataType(copy);
        } else if (data === dataSkill) {
            setDataSkill(copy);
        }
    };

    const checkIsFilter = () => {
        LogBase.log("=====dataGrade",dataGrade)
        LogBase.log("=====dataSkill",dataSkill)
        LogBase.log("=====dataType",dataType)
        var isAll = true
        var typeCheck = dataType[0].choose
        dataType.forEach(element => {
          if(element.choose != typeCheck)
            isAll = false
        });
        var gradeCheck = dataGrade[0].choose
        dataGrade.forEach(element => {
          if(element.choose != gradeCheck)
            isAll = false
        });
        var skillCheck = dataSkill[0].choose
        dataSkill.forEach(element => {
          if(element.choose != skillCheck)
            isAll = false
        });
        if(!gradeCheck) gradeCheck = false
        LogBase.log("=====checkIsAll",isAll+"|"+typeCheck+"|"+skillCheck+"|"+gradeCheck)
        LogBase.log("=====checkIsAll kq 1",(isAll && typeCheck == skillCheck && skillCheck == gradeCheck))
        LogBase.log("=====checkIsAll kq 2",!(isAll && typeCheck == skillCheck && skillCheck == gradeCheck))
        return !(isAll && typeCheck == skillCheck && skillCheck == gradeCheck)
    }

    const _handleFilter = () => {
        setVisibleModalFilter(false);
        const type = dataType.filter(ele => ele.choose).map(ele => ele.value);
        const grade = dataGrade.filter(ele => ele.choose).map(ele => ele.id);
        const skill = dataSkill.filter(ele => ele.choose).map(ele => ele.name);
        _isByFilter.current = true;
        var mIsFilter = false
        if(checkIsFilter()){
            mIsFilter = true
        }else{
            mIsFilter = false
        }
        _getDataStudy(type, grade, skill, mIsFilter);
    };

    const _handleDeleteFilter = () => {
        dataType.forEach(e=>{
            e.choose = false;
        })
        dataGrade.forEach(e=>{
            e.choose = false;
        })
        dataSkill.forEach(e=>{
            e.choose = false;
        })
        setDataSkill([...dataSkill]);
        // _handleFilter();
    };

    const _handleResource = (item) => {
        LogBase.log("=====_handleResource",item)
        const {title, type, path, content} = item;
        const check = path && path.slice(path.length - 6, path.length);
        if (type !== 'document' || check.includes('pdf')) {
            props.navigation.navigate('DetailStudyGuide', {title, type, path, content});
        } else {
            setLoading(true)
            const date = new Date();
            const {config, fs} = RNFetchBlob;
            const {dirs} = fs;
            let dirsDownload = dirs.DocumentDir;
            let options = {
                fileCache: true,
                path: dirsDownload + `/data/` + Math.floor(date.getTime() + date.getSeconds() / 2) + `.${check.split('.')[1]}`,
            };
            console.log('go here',path)
            config(options).fetch('GET', encodeURI(path)).then((res) => {
                console.log('get ',res)
                FileViewer.open('file://' + res.data, {showOpenWithDialog: true, showAppsSuggestions: true})
                    .then(() => {
                        // success
                    })
                    .catch(error => {
                        console.log(error);
                        /* */
                    });
                setLoading(false)
            }).catch((e) => {
                console.log('error1',e)
                setLoading(false)
            });
        }
    };

    const _handleFileLocal = async () => {
        if(Platform.OS==='ios'){
            try {
                const res = await DocumentPicker.pick({
                    readContent: false,
                    // type: _supportType
                });
                 var fex = res.name.substr(res.name.lastIndexOf('.') + 1).toLowerCase();
                 if(!_supportType.includes(fex)){
                    console.log("=====Đang ko hỗ trợ định dạng "+fex)
                    Alert.alert('Thông báo', 'Định dạng file '+fex+' không được hỗ trợ!',
                        [{text: "Đóng", onPress: () => console.log("OK Pressed")}],
                        {cancelable: false}
                    )
                     return;
                 }
                setPath(res.uri.replace('file://',''));
                setVisibleModalCreateFile(true);
            } catch (err) {
                if (DocumentPicker.isCancel(err)) {
                    console.log('Canceled from single doc picker');
                }else{
                        setMesCallErr(StudentGrammarJson.CallCameraShotError)
                        setErrorModal(true)
                        console.log("----er", err.message);
                }
            }
            setVisibleModalSelect(false);
        }else{
            FilePickerManager.showFilePicker(null, (response) => {
                if (response.didCancel) {
                  
                }
                else if (response.error) {
                    console.log("----er", response.error);
                    setMesCallErr(StudentGrammarJson.CallLibraryGuideError)
                    setErrorModal(true)
                }
                else {
                    var fex = response.fileName.substr(response.fileName.lastIndexOf('.') + 1).toLowerCase();
                    if(!_supportType.includes(fex.toLowerCase())){
                        Alert.alert('Thông báo', 'Định dạng file không hỗ trợ!',
                            [{text: "Đóng", onPress: () => console.log("OK Pressed")}],
                            {cancelable: false}
                        )
                         return;
                    }else{
                        setPath(response.path);
                        setVisibleModalCreateFile(true);
                    }
                }
                setVisibleModalSelect(false);
            });
        }
    };

    const _handleTextDocument = () => {
        setVisibleModalSelect(false);
        setModalTextDocument(true);
    };

    const _handleRecordAudio = () => {
        setVisibleModalSelect(false);
        setModalRecordAudio(true);
    };

    const _handleModalFilter = () => {
        setVisibleModalFilter(true);
    };

    const _recodeVideo = () => {
        setVisibleModalSelect(false);
        setTimeout(()=>{
            ImagePicker.openCamera({
                mediaType: "video"
            }).then((video) => {
                if(Platform.OS==='ios')
                    setPath(video.path.replace("file://",""));
                else
                    setPath(video.path);
                setVisibleModalCreateFile(true);
            }).catch(err => {
                console.log("----er", err.code);
                console.log("----er", err.message);
                setTimeout(() => {
                    if (err.code === "E_PERMISSION_MISSING" || err.code === 'E_PICKER_NO_CAMERA_PERMISSION'){
                        setMesCallErr(StudentGrammarJson.CallCameraRecoderError)
                        setErrorModal(true)
                    }
                }, 500)
            });
        },1000)
    };

    const _takePhoto = () => {
        setVisibleModalSelect(false);
        setTimeout(()=>{
            ImagePicker.openCamera({
                mediaType: "photo"
            }).then((photo) => {
                setPath(photo.path);
                setVisibleModalCreateFile(true);
            }).catch(err => {
                console.log("----er", err.code);
                console.log("----er", err.message);
                setTimeout(() => {
                    if (err.code === "E_PERMISSION_MISSING" || err.code === 'E_PICKER_NO_CAMERA_PERMISSION'){
                        setMesCallErr(StudentGrammarJson.CallCameraShotError)
                        setErrorModal(true)
                    }
                }, 500)
            });
        },1000)
    };

    const _renderModalRecode = () => {
        return <RecordAudio modalRecordAudio={modalRecordAudio} recoding={recoding} _handleRecode={_handleRecode}
                            path={path} _cancelModalRecord={_cancelModalRecord} _saveRecode={_saveRecode}/>
    };

    const _handleRecode = async () => {
        if(Platform.OS==='android' && !recoding){
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
                {
                  title: "",
                  message:"Ứng dụng cần quyền truy cập microphone",
                  buttonNeutral: "Hỏi lại sau",
                  buttonNegative: "Không",
                  buttonPositive: "Đồng ý"
                }
            );
            if(granted!==PermissionsAndroid.RESULTS.GRANTED){
                setMesCallErr(StudentGrammarJson.CallMicToRecoderError)
                setErrorModal(true)
                return;
            }
        }


        setRecoding(!recoding);
        const date = new Date();
        const {fs} = RNFetchBlob;
        const {dirs} = fs;
        const dirsDownload = dirs.DocumentDir;
        const pathFile = dirsDownload + '/' + Math.floor(date.getTime() + date.getSeconds() / 2) + '.mp3';
        if (!recoding) {
            setPath('');
            AudioRecord.init(recordSetting.optionRecord);
            AudioRecord.start();
        } else {
            const audioFile = await AudioRecord.stop();
            await sleep(1000)
            console.log('audioFile',audioFile)
            Sound.setCategory('Playback');
            setPath(audioFile);
            // fs.readFile(audioFile, 'base64')
            //     .then((data) => {
            //         // handle the data ..
            //         fs.createFile(pathFile, data, 'base64').then(res => {
            //             console.log('res',res)
            //             setPath(res);
            //         }).catch(e => console.log(e))
            //     })
            //     .catch(e => console.log(e))

        }
    };

    const _cancelModalRecord = async () => {
        setRecoding(false);
        setModalRecordAudio(false);
        setPath('');
        await AudioRecord.stop();
    };

    const _saveRecode = () => {
        if (!path) {
            Alert.alert('Thông báo', 'Chưa có file thu âm',
                [{text: "Đồng ý", onPress: () => console.log("OK Pressed")}],
                {cancelable: false}
            )
        } else {
            setModalRecordAudio(false);
            setVisibleModalCreateFile(true);
        }
    };

    const _renderModalTextDocument = () => {
        return <TextDocument modalTextDocument={modalTextDocument} contentTextDocument={contentTextDocument}
                             _onChangeText={setContentTextDocument} _cancelTextDocument={_cancelTextDocument}
                             _saveTextDocument={_saveTextDocument}/>
    };

    const _cancelTextDocument = () => {
        setContentTextDocument('');
        setModalTextDocument(false);
    };

    const _saveTextDocument = () => {
        if (!contentTextDocument) {
            Alert.alert('Thông báo', 'Bạn chưa nhập nội dung bài dạy.',
                [{text: "Đồng ý", onPress: () => console.log("OK Pressed")}],
                {cancelable: false}
            )
        } else {
            setModalTextDocument(false);
            setVisibleModalCreateFile(true);
        }
    };

    const _onChangeTitle = (text) => {
        setTitle(text);
    };

    const _cancelModalCreateFile = () => {
        setVisibleModalCreateFile(false);
        setPath('');
        setTitle('');
    };

    const _cancelModalSelect = () => {
        setVisibleModalSelect(false);
        if(props.navigation.getParam('isGiaoBai')){
            console.log("=====gio",new Date().getSeconds())
            props.navigation.navigate('ListToturial', {id: props.navigation.getParam('id'), renT: new Date().getSeconds()})
        }
    };

    const _cancelModalFilter = () => {

        console.log("=====_cancelModalFilter",history)
        console.log("=====_cancelModal",dataSkill,dataType,dataGrade)

        setDataSkill(history.dataSkill)
        setDataType(history.dataType)
        setDataGrade(history.dataGrade)
        setVisibleModalFilter(false);
    };

    const _deleteResource = async () => {
        setVisibleModalDelete(-1);
        setLoading(true);
        const url = API.baseurl + 'api_resources/resource';
        const headers = {...API.header, jwt_token, 'Content-Type': 'application/x-www-form-urlencoded'};
        const qs = require('qs');
        const data = qs.stringify({id: visibleModalDelete});
        try {
            LogBase.log("=====API",url)
            const res = await axios({method: 'delete', url, headers, data});
            console.log('delete resource', res.data);
            _isByFilter.current = false;
            _getDataStudy();
        } catch (e) {
            console.log('delete resource', e);
            setLoading(false);
        }
    };

    const _onSave = async (grade, skill) => {
        console.log("=====_onSave")
        if (!title) {
            Alert.alert('Thông báo', 'Chưa nhập tên file',
                [{text: "Đồng ý", onPress: () => console.log("OK Pressed")}],
                {cancelable: false}
            )
        } else {
            setVisibleModalCreateFile(false);
            setLoading(true);
            const url = API.baseurl + 'api_resources/upload_guide';

            const headers = {...API.header, jwt_token, 'Content-Type': 'multipart/form-data'};
            //console.log(data,path)
            const data = [
                {name: 'title', data: title.trim()},
                //{name: 'file', filename: path, data: RNFetchBlob.wrap(path)},
                {name: 'content_writing', data: contentTextDocument},
                {name: 'grade_id', data: grade},
                {name: 'skill', data: skill}
            ];
            console.log('path',path)
            if(!!path){
                data.push({name: 'file', filename: path, data: RNFetchBlob.wrap(decodeURIComponent(path))})
            }
            
            try {
                const res = await APIBase.formDataAPI('POST', url, data)
                console.log('upload resource', res);
                const r = JSON.parse(res.data);
                if(!r.status){
                    alert(r.msg)
                }
                setTitle('');
                setPath('');
                setContentTextDocument('');
                _handleDeleteFilter();
                _isByFilter.current = false;
                _getDataStudy();
                if(props.navigation.getParam('isGiaoBai')){
                    props.navigation.navigate('ListToturial', {id: props.navigation.getParam('id'), renT: new Date().getSeconds()})
                }
            } catch (e) {
                console.log('=====upload resource error', e);
                setLoading(false);
                setTitle('');
                setPath('');
                setContentTextDocument('');
            }
        }
    };

    const _handleDeleteItem = (id) => {
        setVisibleModalDelete(id);
    };

    return (
        <ImageBackground
            source={{uri: 'bg_guide_study'}}
            imageStyle={stylesApp.ImageBackGround}
            style={{flex: 1}}>
            {
                loading ? <FullScreenLoadingIndicator visible={loading}/> :
                    <View style={{flex: 1}}>
                        <AppHeader title={'Hướng dẫn học tập'} leftIconOnPress={()=>{ props.navigation.goBack()}}
                            rightIcon={(_isByFilter.current || dataStudy.length > 0) && isFilter ? 'filter1' : 'loctopick'} rightIconOnPress={_handleModalFilter} styleHeaderRight={{tintColor: Colors.White}}/>
                        {
                            !loading&&!_isByFilter.current&&dataStudy.length==0?<View style={{alignItems:'center'}}>
                                <Image source={{uri:'bg_teacher'}} style={{
                                    width:SmartScreenBase.smPercenWidth*80,
                                    height:SmartScreenBase.smPercenWidth*60,
                                    resizeMode:'contain',
                                    marginVertical:SmartScreenBase.smPercenHeight*2
                                }}/>

                                <Text style={styles.txt}>Bạn chưa tạo nội dung</Text>
                                <Text style={styles.txt}>hướng dẫn học tập nào</Text>
                                <Text style={styles.txt}>Chọn <Text style={{
                                    fontFamily:FontBase.MyriadPro_Bold
                                }}>Tạo mới</Text> để tạo hướng dẫn</Text>
                                <ButtonMedium 
                                    onPress={() => setVisibleModalSelect(true)}
                                    mstyle={{marginTop:SmartScreenBase.smPercenHeight*4}} title='Tạo mới'/>
                            </View>:<Content dataStudy={dataStudy} _handleResource={_handleResource}
                                 _handleDeleteItem={_handleDeleteItem}/>
                        }
                        {
                            !(!_isByFilter.current&&dataStudy.length==0)&&<TouchableOpacity
                                style={{
                                    position: 'absolute',
                                    bottom: SmartScreenBase.smPercenWidth * 3,
                                    right: SmartScreenBase.smPercenWidth * 3,
                                    width: SmartScreenBase.smPercenWidth * 18,
                                    height: SmartScreenBase.smPercenWidth * 18,
                                }}
                                onPress={() => setVisibleModalSelect(true)}
                            >
                                <Image
                                    source={{uri: 'plus_teacher'}}
                                    style={{width: '100%', height: '100%', resizeMode: 'contain'}}
                                />
                            </TouchableOpacity>
                        }
                        {visibleModalSelect &&
                        <ModalSelect _cancelModalSelect={_cancelModalSelect} _recodeVideo={_recodeVideo}
                                     _handleRecordAudio={_handleRecordAudio} _takePhoto={_takePhoto}
                                     _handleTextDocument={_handleTextDocument} _handleFileLocal={_handleFileLocal}/>}
                        
                        <ModalFilter visible={visibleModalFilter} _cancelModalFilter={_cancelModalFilter} dataGrade={dataGrade}
                                     dataType={dataType} dataSkill={dataSkill} _handleFilter={_handleFilter}
                                     _handleItem={_handleItem} _handleDeleteFilter={_handleDeleteFilter}/>
                        
                        {visibleModalCreateFile &&
                        <ModalCreateFile _cancelModalCreateFile={_cancelModalCreateFile} grades={dataGrade}
                                         _onChangeTitle={_onChangeTitle} title={title} _onSave={_onSave}/>
                        }
                        {visibleModalDelete >= 0 &&
                        <ModalDelete _handleDeleteItem={_handleDeleteItem} _deleteResource={_deleteResource}/>
                        }
                        {modalTextDocument && _renderModalTextDocument()}
                        {modalRecordAudio && _renderModalRecode()}
                        <SmPopup visible={showErrorModal}
                            message={mesCallErr}
                            cancelText={CommonJson.Cancel}
                            confirmText={CommonJson.Confirm}
                            contentStyles={styles.modalBox}
                            messageStyle={[styles.messageModalStyle, styles.messageDeleteStyle]}
                            cancelOnpress={() => setErrorModal(false)}
                            confirmOnpress={() => {
                                setErrorModal(false)
                                Linking.openSettings()
                            }}
                        />
                    </View>
            }
        </ImageBackground>
    );
};
const styles=StyleSheet.create({
    txt:{
        fontSize:SmartScreenBase.smFontSize*50,
        fontFamily:FontBase.MyriadPro_Regular
    }
})
export default StudyGuide;
