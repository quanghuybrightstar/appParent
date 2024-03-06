import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import SmartScreenBase from "../../../../base/SmartScreenBase";
import StyleLesson from "../../StyleLesson";
import stylesApp from "../../../../styleApp/stylesApp";
import EventBus from 'react-native-event-bus';
import Utils from '../../../../../utils/stringUtils';
import FontBase from "../../../../../base/FontBase";
export default class ItemReadingD9 extends Component {
    option = "abcdefghijklmnopqrstuvwxyz".split('');;
    constructor(props) {
        super(props);
        this.state = {
            Choose: -1,
        }
        this._OnpressChoose = this._OnpressChoose.bind(this);
    }
    _OnpressChoose(key, index) {
        this.setState({
            Choose: key
        });
        this.props.screen._OnpressAnswer(key, index);
    }
    _moveWebView = (value) => {
        let title = value.split('.').join().split('“').join().split('”').join().replace(/(,)/g, '')
        EventBus.getInstance().fireEvent("modalTranslate", {
            modal: title.toLowerCase(),
            url: 'https://glosbe.com/en/vi/'
        })
    }
    trimQuestion = (str) => {
        let indices = {};
        indices['data'] = [];
        let count = 0;
        str.split('/').forEach(element => {
            count++;
            let searchStr = '}';
            let startIndex = 0, index;
            let c = false;
            let data = {};
            while ((index = element.indexOf(searchStr, startIndex)) > -1) {
                let str1 = element.slice(startIndex, index + 1).match(/\{([^}]+)\}/);
                if (str1) {
                    c = true;
                    str1 = str1[1];
                    data['text2'] = element.slice(str1.length + 2, element.length)
                    data['text'] = str1;
                    indices['data'].push(data);
                    startIndex = index + 1;
                } else {
                    startIndex = index + 1;
                    data['text2'] = element
                    data['text'] = '';
                    indices['data'].push(data);
                }
            }
            if (!c) {
                data['text2'] = element
                data['text'] = '';
                indices['data'].push(data);
            }
        });
        return indices;
    };

    componentDidMount(){
        // let { item, index } = this.props;
        // item.option = Utils.shuffleArray(item.option);
    }

    render() {
        let { item, index } = this.props;
        // console.log('9Q',item.question);
        const res = this.trimQuestion(item.question);
        return (
            <View style={[StyleLesson.Sty_View_Border, {}]}>
                <View style={{ 
                    flexDirection: 'row', 
                    justifyContent: 'center', 
                    paddingHorizontal: 5, 
                    paddingHorizontal: '5%' 
                }}>
                    <Text style={{ fontSize: SmartScreenBase.smFontSize*45, fontWeight: 'bold', paddingRight: 5, }}>{index + 1}.</Text>
                    <View style={{}}>
                        {res.data.map((item, index) => {
                            return (
                                <View  style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                    {
                                        item.text2.trim().split(' ').map((string, number) => {
                                            return (
                                                <TouchableOpacity 
                                                    onLongPress={() => this._moveWebView(string)}>
                                                    <Text style={{ fontSize: SmartScreenBase.smFontSize*45, fontFamily: FontBase.MyriadPro_Regular}} >{string} </Text>
                                                </TouchableOpacity>
                                            )
                                        })
                                    }
                                </View>
                            )
                        })}
                    </View>
                </View>
                <View style={{ alignSelf: "center", alignItems: "center", marginTop: 20 }}>
                    {item.option.map((option, key) => {
                        return (
                            <TouchableOpacity key={key} onPress={() => {
                                this._OnpressChoose(key, index)
                            }} disabled={item.disable} >
                                <View style={[StyleLesson.Sty_View_Border, {
                                    alignItems: "flex-start",
                                    backgroundColor: item.key == key ? 'yellow' : "rgba(216,216,216,0.95)",
                                    width: SmartScreenBase.smPercenWidth * 80,
                                    marginBottom: 10
                                }]}>
                                    <Text style={[stylesApp.txt, { padding: SmartScreenBase.smPercenWidth * 2, fontSize: SmartScreenBase.smFontSize*45 }]}>
                                        <Text style={{ fontWeight: "bold" }}>{this.option[key].toLocaleUpperCase()}.
                                    </Text> {option}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                </View>
            </View>
        )
    }
}