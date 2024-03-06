import React, { Component } from "react";
import { Text, View, TextInput} from "react-native";
import SmartScreenBase from "../../../../base/SmartScreenBase";
import stylesApp from "../../../../styleApp/stylesApp";

export default class ItemReadingD12 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ""
        }
    }
    render() {
        const { index } = this.props;
        return (
            <View style={this.props.style}>
                <Text style={[stylesApp.txt, {
                    borderRightWidth: 1, borderColor: "gray",
                    marginHorizontal: SmartScreenBase.smPercenWidth
                }]}>
                    {this.props.index} </Text>
                    <TextInput placeholder={"Default"} placeholderTextColor={'rgba(255,255,255,0)'}
                    style={{marginVertical:0,paddingVertical:0,fontSize:SmartScreenBase.smPercenWidth*3,fontWeight:"400",color:"black"}}
                    value={this.state.text}
                    onChangeText={(text)=>{this.setState({text:text});this.props.screen._OnChangeText(text,index)}}
                    onSubmitEditing={()=>{}}
                     />
            </View>
        )
    }
}