import React from 'react';
import {
    Image,
    ImageBackground,
    Text,
    TouchableOpacity,
    View,
    FlatList,
    ActivityIndicator
} from 'react-native';
import stylesApp from '../styleApp/stylesApp';
import Device from 'react-native-device-info';
import Button from '../../commons/Button';
import ContentGuide from "../../component/ComponentDetailStudyGuide/Content";
import FileViewer from 'react-native-file-viewer';
import RNFetchBlob from 'rn-fetch-blob';
import SmartScreenBase from '../../base/SmartScreenBase';
import API from '../../API/APIConstant';
import Content from '../../screens/Teacher/StudyGuide/Content';
import LogBase from '../../base/LogBase';

const StudentGuide = ({ data, navigation, onPressDo }) => {
    const showOne = React.useMemo(() => {
        if (data.length == 1 &&
            (data[0].type !== 'document' || data[0].path.indexOf('.pdf') > 0)
        ) {
            return true;
        }
        return false;
    }, [])
    const [title, setTitle] = React.useState(showOne ? data[0].title : 'Hướng dẫn học tập')
    const [viewItem, setViewItem] = React.useState(showOne ? data[0] : null);
    const [loading, setLoading] = React.useState(false);
    const [showRotate, setShowRotate] = React.useState(showOne && data[0].type === 'img');
    const [rotateImage, setRotate] = React.useState(false);

    const itemPress = (item) => {
        if (item.type === 'document' && item.path.indexOf('.pdf') < 0) {
            const url = encodeURI(`${API.domain}${item.path}`)
            const { config, fs } = RNFetchBlob;
            const { dirs } = fs;
            let options = {
                fileCache: true,
                path: `${dirs.DocumentDir}/data/temp_${Date.now()}${item.path.substr(item.path.lastIndexOf('.'))}`
            };
            setLoading(true)
            config(options).fetch('GET', url).then((res) => {
                setLoading(false)
                FileViewer.open(options.path, { showOpenWithDialog: true, showAppsSuggestions: true })
                    .then(() => {
                        // success
                    })
                    .catch(error => {
                        console.log(error);
                        /* */
                    });
            }).catch(() => setLoading(false));
            return;
        }
        if (item.type === 'img') {
            setShowRotate(true);
        }
        setViewItem(item)
        //setTitle(item.title)
        setTitle("Hướng dẫn học tập giáo viên")
    }
    const _handleRotateImage = () => {
        setRotate(!rotateImage);
    }

    const _handleResource = (item) => {
        LogBase.log("=====_handleResource",item)
        const {title, type, path, content} = item;
        const mEditPath = API.domain + path
        const check = mEditPath && mEditPath.slice(mEditPath.length - 6, mEditPath.length);
        if (type !== 'document' || check.includes('pdf')) {
            navigation.navigate('DetailStudyGuide', {title: title, type: type, path: mEditPath, content: content});
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
            console.log('go here',mEditPath)
            config(options).fetch('GET', encodeURI(mEditPath)).then((res) => {
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

    return <ImageBackground
        source={{ uri: 'bgmap' }}
        imageStyle={stylesApp.ImageBackGround}
        imageStyle={{resizeMode: 'cover'}}
        style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
            <View style={{
                backgroundColor: '#00b9b7',
                height: Device.hasNotch() ? 100 : 70,
                paddingTop: Device.hasNotch() ? 30 : 15,
                justifyContent: 'center',
                alignItems: 'center',
                paddingLeft: SmartScreenBase.smPercenWidth,
                flexDirection: 'row'
            }}>
                <TouchableOpacity style={{
                    padding: SmartScreenBase.smPercenWidth * 2
                }}
                    onPress={() => {
                        if (showOne || !viewItem) {
                            navigation.goBack();
                        }
                        else {
                            setShowRotate(false);
                            setViewItem(null)
                            setTitle('Hướng dẫn học tập')
                        }
                    }}
                >
                    <Image style={{
                        marginTop: SmartScreenBase.smPercenHeight,
                        width: SmartScreenBase.smPercenWidth * 5,
                        height: SmartScreenBase.smPercenWidth * 5,
                    }}
                        resizeMode={'contain'}
                        source={{ uri: "imageback" }} />
                </TouchableOpacity>
                <Text
                    numberOfLines={1}
                    ellipsizeMode={'tail'}
                    style={{
                        color: '#fff',
                        fontSize: SmartScreenBase.smFontSize * 50,
                        flex: 1,
                        marginTop: SmartScreenBase.smPercenHeight
                    }}>{"Hướng dẫn học tập"}</Text>
                {
                    showRotate && <TouchableOpacity style={{
                        width: SmartScreenBase.smPercenWidth * 8,
                        height: SmartScreenBase.smPercenWidth * 8,
                        marginRight: SmartScreenBase.smPercenWidth * 2
                    }} onPress={_handleRotateImage}>
                        <Image style={{
                            width: '100%',
                            height: '100%',
                            resizeMode: 'contain'
                        }}
                            source={{ uri: 'rotate_image_study_guide' }} />
                    </TouchableOpacity>
                }
            </View>
            <Content dataStudy={data} _handleResource={_handleResource} isStudent={true}/>
            {/* {
                loading ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator size={'large'} />
                </View>
                //  : viewItem == null ?
                //     <FlatList
                //         style={{ flex: 1 }}
                //         data={data}
                //         renderItem={({ item }) => {
                //             return <GuidItem item={item}
                //                 onPress={itemPress} />
                //         }}
                //         keyExtractor={(item, index) => index.toString()}
                //     /> 
                    : <View style={{ flex: 1 }}>
                        {
                            showOne && <Text style={{
                                fontSize: SmartScreenBase.smFontSize * 44,
                                fontWeight: '600',
                                margin: SmartScreenBase.smPercenWidth * 2,
                                marginTop: SmartScreenBase.smPercenWidth * 6,
                                color: '#fff'
                            }}>
                                {viewItem.title}
                            </Text>
                        }
                        <ContentGuide
                            rotateImage={rotateImage}
                            type={viewItem.type}
                            path={`${API.domain}${viewItem.path}`}
                            content={viewItem.content}
                        />
                    </View>
            } */}
            <View style={{ alignItems: 'center', marginVertical: SmartScreenBase.smPercenHeight * 4 }}>
                <Button title={'LÀM BÀI'} onPress={onPressDo} />
            </View>
        </View>
    </ImageBackground>
}

export default StudentGuide;