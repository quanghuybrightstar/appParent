import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import SmartScreenBase from "../../../../base/SmartScreenBase";
import StyleLesson from "../../StyleLesson";
import stylesApp from "../../../../styleApp/stylesApp";
import EventBus from 'react-native-event-bus';
import Utils from '../../../../../utils/stringUtils';
export default class ItemReadingD8 extends Component {
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
    };
     _moveWebView = (value) => {
        let title = value.split('.').join().split('“').join().split('”').join().replace(/(,)/g,'')
        EventBus.getInstance().fireEvent("modalTranslate", {
            modal: title.toLowerCase(),
            url:'https://glosbe.com/en/vi/'
        })
    }

    componentDidMount(){
        //let { item, index } = this.props;
        //item.option = Utils.shuffleArray(item.option);
    }

    render() {
        let { item, index } = this.props;
        return (
            <View style={[StyleLesson.Sty_View_Border, {}]}>
                <View style={{flexDirection:'row',justifyContent:'center',paddingHorizontal:5,paddingHorizontal:'5%'}}>
                    <Text style={{fontSize:17,fontWeight:'bold',paddingRight:5}}>{index + 1}.</Text>
                    <View style={{flexWrap:'wrap',flexDirection:'row'}}>
                    {
                        item.question.split(' ').map((string,number)=>{
                                return(
                                    <TouchableOpacity onLongPress={()=>{this._moveWebView(string)}}>
                                        <Text style={{ fontSize:15}}>{string} </Text>
                                    </TouchableOpacity>
                                )
                        })
                    }
                     </View>
                </View>
                <View style={{ alignSelf: "center", alignItems: "center",marginTop:20 }}>
                    {item.option.map((option, key) => {
                        return (
                            <TouchableOpacity key={key} 
                            disabled={item.disable}
                            onPress={() => {
                                this._OnpressChoose(key, index)
                            }}>
                                <View style={[StyleLesson.Sty_View_Border, {
                                    alignItems: "flex-start",
                                    backgroundColor: item.key == key ? 'yellow' : "rgba(216,216,216,0.95)",
                                    width: SmartScreenBase.smPercenWidth * 80,
                                    marginBottom: 10
                                }]}>
                                    <Text style={[stylesApp.txt, { padding: SmartScreenBase.smPercenWidth * 2, fontSize:15 }]}>
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