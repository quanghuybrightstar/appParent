import React from 'react';
import TextDocument from "./TextDocument";
import AudioDocument from "./AudioDocument";
import VideoDocument from "./VideoDocument";
import PDFDocument from "./PDFDocument";
import ImageDocument from "./ImageDocument";
import LogBase from '../../base/LogBase';

const Content = (props) => {
    const { rotateImage, path, type, content, pauseTrigger, defaultStart, onZoomout, autoplayDisabled } = props;
    const _path = encodeURI(path);

    const _renderContent = () => {
        LogBase.log("=====_renderContent", type+"|"+path+"|"+content)
        switch (type) {
            case 'video':
                return <VideoDocument {...props} path={_path} pauseTrigger={pauseTrigger} autoplayDisabled={autoplayDisabled} onZoomout={onZoomout} defaultStart={defaultStart} />;
            case 'audio':
                return <AudioDocument path={_path} />;
            case 'writing':
                return <TextDocument content={content} />;
            case 'img':
                return <ImageDocument rotateImage={rotateImage} path={_path} />;
            case 'document':
                if (_path.indexOf('.pdf')) {
                    return <PDFDocument path={_path} />;
                } else {
                    return null;
                }
            default:
                return null
        }
    };

    return _renderContent();
};

export default Content;
