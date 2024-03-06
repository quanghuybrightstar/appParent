import React, {useEffect} from 'react';
import WebView from "react-native-webview";

const FileDocument = (props) => {
    const {path} = props;
    const uri = 'https://documenter.getpostman.com/view/2606786/SzRw2r9u?version=latest#bdb61e02-e6d6-46e6-80e7-5b841b713ec9';

    // useEffect(() => {
    //     const date = new Date();
    //     const {config, fs} = RNFetchBlob;
    //     const {dirs} = fs;
    //     const dirsDownload = dirs.DocumentDir;
    //     const options = {
    //         fileCache: true,
    //         path: dirsDownload + `/data/` + Math.floor(date.getTime() + date.getSeconds() / 2) + '.ppt',
    //     };
    //     config(options).fetch('GET', url).then(async (res) => {
    //         console.log('download', res);
    //         FileViewer.open('file://' + res.data, {showAppsSuggestions: true, showOpenWithDialog: true}).then(() => {
    //             // success
    //         })
    //             .catch(error => {
    //                 console.log(error)
    //                 // error
    //             });
    //         // const stream = await fs.readStream('file://' + res.data, "base64");
    //         // let data = ''
    //         // stream.open()
    //         // stream.onData((chunk) => {
    //         //     data += chunk
    //         // })
    //         // stream.onEnd(() => {
    //         //     console.log('data', data)
    //         // })
    //         // console.log(stream)
    //     }).catch((e) => console.log('download', e));
    // }, []);
    return (
        <WebView source={{uri: path}} />
    )
};

export default FileDocument;
