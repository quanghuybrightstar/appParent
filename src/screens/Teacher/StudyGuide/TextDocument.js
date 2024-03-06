import React from 'react';
import {Modal, Text, TextInput, TouchableOpacity, View,Keyboard,Platform} from "react-native";
import FontBase from '../../../base/FontBase';
import SmartScreenBase from "../../../base/SmartScreenBase";
import Button from '../../../commons/Button';
import { ShortMainButton } from '../../../componentBase/ShortMainButton';

const TextDocument = (props) => {

    const [keyboardShow,setKeyboardShow] = React.useState(false);
    const _keyboardDidShow = () => {
        if(Platform.OS==='ios')
            setKeyboardShow(true);
    };

    const _keyboardDidHide = () => {
        setKeyboardShow(false);
    };


    React.useEffect(() => {
        Keyboard.addListener("keyboardDidShow", _keyboardDidShow);
        Keyboard.addListener("keyboardDidHide", _keyboardDidHide);
        return () => {
          Keyboard.removeListener("keyboardDidShow", _keyboardDidShow);
          Keyboard.removeListener("keyboardDidHide", _keyboardDidHide);
        };
      }, []);

    return (
        <Modal animationType="slide"
         transparent={true} visible={true}>
            <View style={{
                flex: 1,
                backgroundColor: '#00000070',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <View
                    style={[{
                        width: SmartScreenBase.smPercenWidth * 90,
                        backgroundColor: '#fff',
                        borderRadius: SmartScreenBase.smPercenWidth * 5,
                        padding: SmartScreenBase.smPercenWidth * 5
                    },
                    keyboardShow&&{
                        marginBottom:SmartScreenBase.smPercenWidth*60
                    }
                ]}
                >
                    <Text style={{fontSize: SmartScreenBase.smPercenWidth * 4, fontFamily:  FontBase.MyriadPro_Regular}}>Nội dung văn bản:</Text>
                    <TextInput style={{
                        fontFamily: FontBase.MyriadPro_Regular,
                        padding: 0, width: '100%', borderWidth: 1,
                        marginTop: SmartScreenBase.smPercenHeight,
                        paddingVertical: SmartScreenBase.smPercenHeight,
                        borderRadius: SmartScreenBase.smPercenWidth * 3,
                        borderColor: '#5a5a5a', paddingHorizontal: SmartScreenBase.smPercenWidth * 2,
                        textAlignVertical: "top", height: SmartScreenBase.smPercenHeight * 30
                    }}
                        placeholder={"Nhập nội dung"}
                        multiline={true}
                        value={props.contentTextDocument}
                        onChangeText={props._onChangeText}
                    />
                    <View style={{
                        flexDirection: 'row', width: '100%', justifyContent: 'space-between',
                        marginTop: SmartScreenBase.smPercenHeight * 2
                    }}>
                        <ShortMainButton text={"Hủy"} widthType={'mini'}
                            onPress={props._cancelTextDocument}/>
                        <ShortMainButton text={"Lưu"} widthType={'mini'} type={1} isDisabled={props.contentTextDocument.trim().length == 0}
                            onPress={props._saveTextDocument}/>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default TextDocument;
