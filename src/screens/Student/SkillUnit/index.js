import React, { Component } from 'react';
import { SafeAreaView, ImageBackground, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import StyleStudent from '../StyleStudent';
import HeaderScreen from '../../../component/HeaderScreen';
import ViewImage from '../../../component/ViewImage';
import SmartScreenBase from '../../../base/SmartScreenBase';
import Loading from '../../../component/LoadingScreen';
import * as action from '../../../ReduxStudent/actions/Student';
import { connect } from "react-redux";
import DataAPI from '../../../component/DataAPI';
import MyData from '../../../component/MyData';
import base64 from 'react-native-base64';
import API from '../../../API/APIConstant';
import APIBase from '../../../base/APIBase';
class SkillUnit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            listDocument: []
        };
    }
    RenderStatus(score) {
        if (score >= 100) {
            return {
                width: 68,
                name: 'hv_map_11'
            }
        } else {
            let num = Math.floor(score / 10);
            if (num == 9) {
                return {
                    width: 106,
                    name: 'hv_map_' + (num + 1)
                }
            } else {
                return {
                    width: 106,
                    name: 'hv_map_0' + (num + 2)
                }
            }
        }
    }
    componentDidMount() {
        this.LoadAPI();
    }
    LoadAPI() {
        let id = this.props.navigation.getParam('id');
        return fetch(API.baseurl + DataAPI.UrlSkillUnitMap + '?unit_id=' + id, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-API-KEY': '8c3a30506d9633a8b202cb5a91873efa',
                'jwt_token': '' + APIBase.jwt_token,
                'Authorization': 'Basic ' + base64.encode('gek_admin:gek_admin_password'),
            }
        }).then(response => response.json()).then((responseJson) => {
            this.setState({listDocument: responseJson.data[0].list_document});
            this.props.loadapiskillunit(responseJson);
        }).catch((err) => {
            console.log('err', err)
        });
    }
    _renderImageSkill(name) {
        switch (name) {
            case "VOCABULARY":
                return 'hv_freelearn_15';
            case "PRONUNCIATION":
                return 'hv_freelearn_24';
            case "GRAMMAR":
                return 'hv_freelearn_13';
            case "READING":
                return 'hv_freelearn_21';
            case "SPEAKING":
                return 'hv_freelearn_22';
            case "LISTENING":
                return 'hv_freelearn_16';
            case "WRITING":
                return 'hv_freelearn_19';
            case "MINITEST":
                return 'hv_freelearn_18';
            default:
                break;
        }
    }
    render() {
        return (
            <SafeAreaView>
                <ImageBackground source={{ uri: 'imagebackground' }}
                    imageStyle={StyleStudent.Sty_ImageBackground}
                    style={StyleStudent.Sty_ImageBackground} >
                    <HeaderScreen navigation={this.props.navigation} title={this.props.navigation.getParam('name_unit')} />
                    {this.props.data.isLoading == false ? (
                        <View >
                            <ScrollView contentContainerStyle={{
                                alignItems:"center",
                                paddingBottom:SmartScreenBase.smPercenHeight*30
                            }}>
                                {this.props.data.Data.data.map((item, key) => {
                                    item.list_skill.forEach(ele => {
                                        if(ele.skill == 'listening'){
                                            console.log('=====item '+item.stt, ele.lesson_in_skill);
                                        }
                                    });
                                    return (
                                        <TouchableOpacity key = {key}
                                            onPress={() => this._nextUnit(item, key)}
                                        >
                                            {key == 0 ? (
                                                <View style={{
                                                }}>
                                                    <View style={[StyleStudent.ViewComponent, { alignItems: "center" }]}>
                                                        <ViewImage Width={205} Height={205} Name={this._renderImageSkill(item.skill.toUpperCase())} />
                                                        <Text style={StyleStudent.txt_title}>{item.skill.toUpperCase()}</Text>
                                                        <View style={{
                                                            marginVertical: SmartScreenBase.smPercenHeight * 1.5,
                                                        }}>
                                                            {/* <View style={{
                                                                position: "absolute",
                                                                top: - SmartScreenBase.smBaseWidth * 70,
                                                                left: SmartScreenBase.smBaseWidth * (747 / 100 * item.process_learn - 50)
                                                            }}>
                                                                <ViewImage Width={343} Height={70} Name={'student_home_image4'} />
                                                            </View> */}
                                                            <ViewImage Width={749} Height={32} Name={'gv_choiceclass_03'} />
                                                            <View style={{
                                                                position: "absolute",
                                                                top: SmartScreenBase.smBaseWidth,
                                                                left: SmartScreenBase.smBaseWidth,
                                                                width: SmartScreenBase.smBaseWidth * (747 / 100 * item.process_learn),
                                                                borderRadius: SmartScreenBase.smBaseWidth * 15,
                                                                overflow: "hidden"
                                                            }}>
                                                                <ViewImage Width={747} Height={30} Name={'student_home_image6'} />
                                                            </View>
                                                            <View style={{
                                                                position: "absolute",
                                                                bottom: -SmartScreenBase.smBaseWidth * 50,
                                                                left: SmartScreenBase.smBaseWidth * (747 / 100 * item.process_learn - 25)
                                                            }}>
                                                                <Text>{item.process_learn} %</Text>
                                                            </View>
                                                        </View>
                                                        <View style={{ height: SmartScreenBase.smPercenHeight }} />
                                                    </View>
                                                </View>
                                            ) : (
                                                    <View style={{ justifyContent: "center" }}>
                                                        <View style={[StyleStudent.ViewComponent, {
                                                            flexDirection: 'row',
                                                            alignItems: "center",
                                                            paddingVertical: SmartScreenBase.smPercenHeight * 2,
                                                            justifyContent: "center",
                                                        }]}>
                                                            <ViewImage Width={185} Height={185} Name={this._renderImageSkill(item.skill.toUpperCase())} />
                                                            <View style={{ width: SmartScreenBase.smPercenWidth * 65, alignItems: "center" }}>
                                                                <Text style={StyleStudent.text}>{item.skill.toUpperCase()}</Text>
                                                            </View>
                                                            <View style={{ width: SmartScreenBase.smPercenWidth * 15 }} />
                                                        </View>
                                                        <View style={{ alignItems: "center", justifyContent: "center", position: 'absolute', right: SmartScreenBase.smPercenWidth * 3 }}>
                                                            {item.process_learn == 100 ? null : <Text style={[StyleStudent.text, { position: "absolute" }]}>{item.process_learn}</Text>}
                                                            <ViewImage Width={this.RenderStatus(item.process_learn).width} Height={this.RenderStatus(item.process_learn).width} Name={this.RenderStatus(item.process_learn).name} />
                                                        </View>
                                                    </View>
                                                )}
                                        </TouchableOpacity>
                                    )
                                })}
                            </ScrollView>
                        </View>
                    ) : <Loading />}
                </ImageBackground>
            </SafeAreaView>
        )
    }

    _nextUnit = (item, index) => {
        console.log({
            id: index,
            name_skill: item.skill,
            ListExercise: item.list_lesson,
            listDocument: this.state.listDocument,
            unit_id: this.props.navigation.getParam('id'),
            class_id: this.props.navigation.getParam('class_id'),
            curriculum_id: this.props.navigation.getParam('curriculum_id'),
        });
        this.props.navigation.navigate('ExerciseUnit', {
            id: index,
            name_skill: item.skill,
            ListExercise: item.list_lesson,
            listDocument: this.state.listDocument,
            unit_id: this.props.navigation.getParam('id'),
            class_id: this.props.navigation.getParam('class_id'),
            curriculum_id: this.props.navigation.getParam('curriculum_id'),
        })
    }

}
const mapStateToProps = state => ({
    data: state.LoadAPISkillUnitHV.Skill_Unit
});
export default connect(mapStateToProps, action)(SkillUnit);
