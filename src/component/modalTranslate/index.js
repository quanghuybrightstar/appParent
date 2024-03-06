import React, { useEffect, useState } from 'react';
import {
    Modal,
    View,
    TouchableOpacity,
    Text,
    Dimensions,
} from 'react-native';
import styles from './style';
import { WebView } from 'react-native-webview';
import EventBus from 'react-native-event-bus'
import LoadingScreen from '../../screens/LoadingScreen';
import SmartScreenBase from '../../base/SmartScreenBase';
const { width, height } = Dimensions.get('window')
const modalTranSlate = () => {
    const [url, setUrl] = useState('https://vtudien.com/anh-viet/dictionary/nghia-cua-tu-');
    const [string, setSting] = useState('');
    const [html, setHtml] = useState(false);
    const [baseUrl, setBaseUrl] = useState('');
    const [visible, setVisible] = useState(false);
    const [id, setId] = useState(1);
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        EventBus.getInstance().addListener("modalTranslate", async (data) => {
            await setSting(data.modal);
            await setUrl(data.url)
            await setBaseUrl(url + data.modal)
            await setVisible(true);
           
        })
    },[]);
    useEffect(() => {
        setBaseUrl(url + string)
    }, [url,string]);
    const _tranSlate = async (id) => {
        await setHtml(false);
        await setUrl("https://vtudien.com/anh-viet/dictionary/nghia-cua-tu-");
        await setId(id)
    };
    const _tranSlate1 = async (id) => {
        await setHtml(false);
        await setUrl("https://dictionary.cambridge.org/dictionary/english/");
        // await setBaseUrl(url + string);
        await setId(id)
    };
    // const _tranSlate2 = async (id) => {
    //     await setHtml(true);
    //     await setUrl("http://tratu.coviet.vn/hoc-tieng-anh/tu-dien/lac-viet/A-V/");
    //     await setId(id)
    // };
    // const _tranSlate3 = async (id) => {
    //     await setHtml(false);
    //     await setUrl("https://www.oxfordlearnersdictionaries.com/definition/english/");
    //     await setId(id)
    // };

    return (
        <Modal visible={visible} animationType={'slide'} transparent={true} >
            <View style={{flex:1,justifyContent:'flex-end'}}>
            <View style={styles.container}>
                <View style={styles.viewSearch}>
                    <Text style={styles.titleHeader}>Tra từ</Text>
                    <Text style={styles.titleHeader}>{string}</Text>
                    <TouchableOpacity style={styles.buttonClose} onPress={() => { setVisible(false); setIsLoading(true) }}>
                        <Text>X</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.viewMenu}>
                    <TouchableOpacity style={[styles.buttonTranslate, {
                        borderBottomWidth: id == 1 ? 2 : 0,
                        borderColor: id == 1 ? '#303030' : '',
                    }]} onPress={() => _tranSlate(1)}>
                        <Text style={[styles.titleTextTranslate, {
                            opacity: id == 1 ? 1 : 0.8,
                            fontWeight: id == 1 ? '700' : 'normal'
                        }]}>Anh - Việt</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.buttonTranslate, {
                        borderBottomWidth: id == 2 ? 2 : 0,
                        borderColor: id == 2 ? '#303030' : '',

                    }]} onPress={() => _tranSlate1(2)}>
                        <Text style={[styles.titleTextTranslate, {
                            opacity: id == 2 ? 1 : 0.8,
                            fontWeight: id == 2 ? '700' : 'normal'
                        }]}>Anh - Anh</Text>
                    </TouchableOpacity>

                    {/* <TouchableOpacity style={[styles.buttonTranslate, {
                        borderBottomWidth: id == 3 ? 2 : 0,
                        borderColor: id == 3 ? '#303030' : '',
                    }]} onPress={() => _tranSlate2(3)}>
                        <Text style={[styles.titleTextTranslate, {
                            opacity: id == 3 ? 1 : 0.8,
                            fontWeight: id == 3 ? '700' : 'normal'
                        }]}>Từ điển 2</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.buttonTranslate, {
                        borderBottomWidth: id == 4 ? 2 : 0,
                        borderColor: id == 4 ? '#303030' : '',
                    }]} onPress={() => _tranSlate3(4)}>
                        <Text style={[styles.titleTextTranslate, {
                            opacity: id == 4 ? 1 : 0.8,
                            fontWeight: id == 4 ? '700' : 'normal'
                        }]}>Từ điển 3</Text>
                    </TouchableOpacity> */}
                </View>
                <View style={styles.viewWed}>
                    <WebView
                        originWhitelist={['*']}
                        source={{
                            uri: baseUrl 
                            // + `${html ? '.html' : ''}`
                        }}
                        onLoadStart={() => { setIsLoading(true) }}
                        onLoad={() => { setIsLoading(false) }}
                        style={styles.viewWed}
                    />

                </View>
                {
                    isLoading &&
                    <View style={{ position: 'absolute', justifyContent: 'center', alignItems: 'center', width, height, backgroundColor: '#fff' }}>
                        <LoadingScreen height={SmartScreenBase.smPercenHeight*50}/>
                    </View>
                }
            </View>
            </View>
        </Modal >
    )
}
export default modalTranSlate