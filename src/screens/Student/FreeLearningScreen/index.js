import React, { Component } from 'react';
import { SafeAreaView, View, Text, FlatList, ImageBackground, Image, TouchableOpacity } from 'react-native';
import HeaderScreen from '../../../component/HeaderScreen';
import StyleStudent from '../StyleStudent';
import ViewImage from '../../../component/ViewImage';
import SmartScreenBase from '../../../base/SmartScreenBase';
import Carousel from 'react-native-snap-carousel';
import DataAPI from '../../../component/DataAPI';
import MyData from '../../../component/MyData';
import base64 from 'react-native-base64';
import { connect } from 'react-redux';
import * as action from '../../../ReduxStudent/actions/Student';
import Header from '../../../component/Header';
import API from '../../../API/APIConstant';
import APIBase from '../../../base/APIBase';

class FreeLearningSreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ListFree: [{ name: 'test' }],
            responseresult: [],
            checkFinish: 0,
        }
    }
    ListImage = ['hv_freelearn_13', 'hv_freelearn_19', 'hv_freelearn_14', 'hv_freelearn_17', 'hv_freelearn_21', 'hv_freelearn_16', 'hv_freelearn_24', 'hv_freelearn_18', 'hv_freelearn_18', 'hv_freelearn_19', 'hv_freelearn_20', 'hv_freelearn_21',];
    ListSkill = ['Grammar', 'Writing', 'Speaking', 'Vocabulary', 'Reading', 'Listening', 'Pronunciation', 'Test'];
    ListImageSkill = ['hv_freelearn_04', 'hv_freelearn_03', 'hv_freelearn_06', 'hv_freelearn_02', 'hv_freelearn_05', 'hv_freelearn_04', 'hv_freelearn_03', 'hv_freelearn_08'];
    componentDidMount() {
        this.props.loadapifreelearning(2);
    }

    LoadApIMiniTest() {
        return fetch(API.baseurl + DataAPI.UrlMiniTest + '?id=' + MyData.TokenUser.id, {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-API-KEY': '8c3a30506d9633a8b202cb5a91873efa',
                'jwt_token': '' + APIBase.jwt_token,
                'Authorization': 'Basic ' + base64.encode('gek_admin:gek_admin_password'),
            }
        }).then(response => response.json()).then((responseJson) => {
            this.DataMiniTest = responseJson.data;
            //  console.log(responseJson);
            this.ListFree.push(this.DataMiniTest);
        }).catch((err) => {
            console.log('err', err)
        });
    }

    render() {
        //console.log(this.props.data.ListPronunciation);
        return (
            <ImageBackground source={{ uri: "imagebackground" }}
                             style={StyleStudent.Sty_ImageBackground}
                             imageStyle={StyleStudent.Sty_ImageBackground}>
                <Header showBack={true} title={'Học tự do'} goBack={() => this.props.navigation.goBack()}/>
                {/*<HeaderScreen navigation={this.props.navigation} title={'Học tự do'} />*/}
                <View >
                    <Carousel
                        ref={(c) => { this._carousel = c; }}
                        data={this.ListSkill}
                        renderItem={this._RenderItemContent}
                        sliderWidth={SmartScreenBase.smPercenWidth * 100}
                        itemWidth={SmartScreenBase.smPercenWidth * 100}
                        horizontal
                        firstItem={2}
                        enableSnap={true}
                        scrollEnabled={false}
                        extraData={this.props.data}
                        //loop={true}
                    />
                </View>

                <View style={{ marginTop: SmartScreenBase.smPercenHeight * 5 }}>
                    <Carousel
                        ref={(c) => { this._CarouselIcon = c; }}
                        data={this.ListSkill}
                        renderItem={this._renderItemSkill}
                        sliderWidth={SmartScreenBase.smPercenWidth * 100}
                        itemWidth={SmartScreenBase.smPercenWidth * 20}
                        horizontal
                        firstItem={2}
                        enableSnap={true}
                        extraData={this.props.data}
                        //loop={true}
                    />
                </View>
            </ImageBackground>
        )
    }

    _continue = (item) => {
        let data = {};
        data['lesson_type'] = item.lesson_type;
        data['question_type'] = item.question_type;
        data['lesson_name'] = item.name;
        data['lesson_id'] = item.lesson_id;
        if (item.lesson_type === 'mini_test') {
            props.navigation.navigate('ExamStudyForTest',{
                id:data.lesson_id,
                name:data.lesson_name,
                type:'mini_test',
                lessonInfo:data,
            })
        } else {
            this.props.navigation.navigate('ListLesson', {
                data: data,
            });
        }
    }

    Render_Item_content = ({ item, index }) => {
        return (
            <TouchableOpacity
                onPress={() => this._continue(item)}
            >
                <View style={[StyleStudent.ViewComponent, {
                    alignItems: "center", backgroundColor: "white",
                    paddingHorizontal: SmartScreenBase.smPercenWidth * 7,
                    width: SmartScreenBase.smPercenWidth * 85
                }]}>
                    <Text style={StyleStudent.text}>{item.name}</Text>
                    {item.status_learning != 'new' ? (
                        <View style={{ position: "absolute", right: -SmartScreenBase.smPercenWidth * 3 }}>
                            <ViewImage Height={90} Width={94} Name={'gv_56'} />
                        </View>
                    ) : null}
                </View>
            </TouchableOpacity>
        )
    }

    _renderItemSkill = ({ item, index }) => {
        return (
            <View >
                <TouchableOpacity onPress={() => {
                    this._carousel.snapToItem(index);
                    this._CarouselIcon.snapToItem(index);
                    this.props.loadapifreelearning(index);
                }}>
                    <ViewImage Height={162} Width={162} Name={this.ListImage[index]} />
                </TouchableOpacity>
            </View>
        );
    }

    _RenderItemContent = ({ item, index }) => {

        return (
            <View style={{ alignSelf: "center" }}>
                <View style={[StyleStudent.ViewComponent,
                {
                    flexDirection: "row", alignItems: "center",
                    paddingHorizontal: SmartScreenBase.smPercenWidth * 2,
                    backgroundColor: 'rgba(255,255,255,0.85)'
                }]}>
                    <ViewImage Width={461} Height={328} Name={this.ListImageSkill[index]} />
                    <View style={{ alignItems: "center", width: SmartScreenBase.smPercenWidth * 50 }}>
                        <Text style={[StyleStudent.txt_title, {
                            color: "#0C568E",
                            // fontFamily: 'UTMAmericanSans',
                            fontSize: SmartScreenBase.smPercenWidth * 6,
                        }]}>{this.ListSkill[index].toUpperCase()}</Text>
                    </View>
                </View>
                <View style={{ height: SmartScreenBase.smPercenHeight * 55 }}>
                    {this._RenderExercise(index)}
                </View>
            </View>
        )
    }
    _RenderExercise = (index) => {
        let data = null;
        switch (index) {
            case 0:
                data = this.props.data.ListGrammar;
                break;
            case 1:
                data = this.props.data.ListWriting;
                break;
            case 2:
                data = this.props.data.ListSpeaking;
                break;
            case 3:
                data = this.props.data.ListVocabulary;
                break;
            case 4:
                data = this.props.data.ListReading;
                break;
            case 5:
                data = this.props.data.ListListening;
                break;
            case 6:
                data = this.props.data.ListPronunciation;
                break;
            case 7:
                data = this.props.data.ListMiniTest;
                break;
            default:
                data = null;
                break;
        }
        if (data !== null) {
            return (
                <FlatList
                    extraData={data}
                    data={data}
                    initialNumToRender={8}
                    keyExtractor={(item, index) => item.id}
                    renderItem={this.Render_Item_content}
                    contentContainerStyle={{ alignItems: "center", paddingBottom: SmartScreenBase.smPercenHeight * 5 }}
                />
            )
        } else {
            return (
                <View style={{ width: "100%", marginTop: SmartScreenBase.smPercenHeight * 20, alignItems: "center" }} >
                    <Image source={require('../../../assets/eloading.gif')}
                        style={{
                            width: 100,
                            height: 100,
                            resizeMode: "contain"
                        }} />
                </View>
            )
        }
    }
}

const mapStateToProps = state => ({
    data: state.LoadAPIFreeLearningHV
});
export default connect(mapStateToProps, action)(FreeLearningSreen);
