import React, { Component } from "react";
import { View, Text, ImageBackground, SafeAreaView, FlatList } from "react-native"
import * as actions from '../../../ReduxStudent/actions/Student/index';
import { connect } from "react-redux";
import StyleStudent from "../StyleStudent";
import SmartScreenBase from "../../../base/SmartScreenBase";
import ViewImage from "../../../component/ViewImage";
import ViewImageShadow from '../../../component/ViewImageShadow';
import { ScrollView } from "react-native-gesture-handler";
import HeaderScreen from "../../../component/HeaderScreen";
import DataAPI from "../../../component/DataAPI";
import MyData from "../../../component/MyData";
import base64 from "react-native-base64";
import Loading from "../../../component/LoadingScreen";
import Header from '../../../component/Header';
import API from "../../../API/APIConstant";
import APIBase from "../../../base/APIBase";


class leaderboardscreen extends Component {
    static options() {
        return {
            topBar: {
                title: {
                    text: "Xep hang"
                },
                visible: false,
                animate: false,
                drawBehind: true
            }
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            DataAPI: null,
            isLoading: false
        }
    }
    data = this.props.data;
    componentDidMount() {
        this.LoadAPIRank();
    }
    LoadAPIRank() {
        return fetch(API.baseurl + DataAPI.UrlRank + '?type=total', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'X-API-KEY': '8c3a30506d9633a8b202cb5a91873efa',
                'jwt_token': '' + APIBase.jwt_token,
                'Authorization': 'Basic ' + base64.encode('gek_admin:gek_admin_password'),
            }
        }).then(response => response.json()).then((responseJson) => {
            this.setState({
                DataAPI: responseJson.data,
                isLoading: true
            })
        }).catch((err) => {
            console.log('err', err)
        });
    }
    RenderIconRank(score) {
        if (score >= 2200) {
            return {
                width:80,
                height:100,
                name:'student_achievements_image8'
            }
        } else if (score >= 1500) {
            return {
                width:80,
                height:100,
                name:'student_achievements_image7'
            }
        } else if (score >= 1000) {
            return {
                width:80,
                height:100,
                name:'student_achievements_image6'
            }
        } else if (score >= 600) {
            return {
                width:80,
                height:100,
                name:'student_achievements_image5'
            }
        } else if (score >= 300) {
            return {
                width:80,
                height:100,
                name:'student_achievements_image4'
            }
        } else {
            return {
                width:60,
                height:75,
                name:'student_achievements_image3'
            }
        }

    }
    render() {
        return (
            <ImageBackground source={{ uri: 'imagebackground' }}
                             imageStyle={StyleStudent.Sty_ImageBackground}
                             style={StyleStudent.Sty_ImageBackground} >
                <Header showBack={true} title={'Bảng xếp hạng'} goBack={() => this.props.navigation.goBack()}/>
                {/*<HeaderScreen navigation={this.props.navigation} title={'Bảng xếp hạng'} />*/}
                {this.state.isLoading == true ? (
                    <View>
                        <View style={{ flexDirection: "row" }}>
                            <View style={{
                                width: SmartScreenBase.smPercenWidth * 40, alignItems: "center",
                                marginVertical: SmartScreenBase.smPercenHeight * 2
                            }}>
                                <ViewImageShadow
                                    Width={270}
                                    Height={270}
                                    BorderRadius={135}
                                    Name={MyData.UserLogin.avatar} />
                            </View>
                            <View style={{ width: SmartScreenBase.smPercenWidth * 60, paddingTop: SmartScreenBase.smPercenHeight }}>
                                <Text style={[StyleStudent.txt_title, { color: 'white', fontWeight: "500", textAlign: "left" }]} >
                                    {MyData.UserLogin.fullname}
                                </Text>
                                <View style={{ flexDirection: "row", alignItems: "center" }} >
                                    <View>
                                        <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                                            <Text style={[StyleStudent.txt_title, { fontWeight: '600', fontSize: SmartScreenBase.smPercenWidth * 5 }]}>Hạng </Text>
                                            <Text style={[StyleStudent.txt_title, { color: "#FDED3F", fontSize: SmartScreenBase.smPercenWidth * 6 }]}>
                                                {this.state.DataAPI != null ? this.state.DataAPI.current_rank.user_rank : 0}
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                                            <Text style={[StyleStudent.txt_title, { fontWeight: '600', fontSize: SmartScreenBase.smPercenWidth * 5 }]}>Điểm </Text>
                                            <Text style={[StyleStudent.txt_title, { color: "#FDED3F", fontSize: SmartScreenBase.smPercenWidth * 6 }]}>
                                                {this.state.DataAPI != null ? this.state.DataAPI.current_rank.total_score : 0}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ marginLeft: SmartScreenBase.smPercenWidth * 10 }}>
                                        <ViewImage Width={200} Height={220} Name={this.RenderIconRank(this.state.DataAPI.current_rank.total_score).name} />
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View>
                            <View style={{ transform: [{ rotate: '180deg' }], position: "absolute", top: 0 }}>
                                <ViewImage Width={1081} Height={80} Name={'student_home_image13'} />
                            </View>
                            <ScrollView style={{ height: SmartScreenBase.smPercenHeight * 68 }}>
                                <View style={[StyleStudent.ViewComponent, { flexDirection: "row", alignSelf: "center", marginTop: SmartScreenBase.smPercenHeight, paddingTop: 0 }]}>
                                    <View style={{ alignItems: "center" }}>
                                        <View style={{ alignItems: "center", justifyContent: "center", marginTop: SmartScreenBase.smPercenHeight * 2 }}>
                                            <View style={StyleStudent.ViewBoxTT}>
                                                <Text style={[StyleStudent.text, { fontWeight: 'bold' }]}>
                                                    {this.state.DataAPI.top_users[1].total_score != null ? this.state.DataAPI.top_users[1].total_score : this.state.DataAPI.top_users[1].rank}
                                                </Text>
                                            </View>
                                            <View style={{ position: "absolute", bottom: SmartScreenBase.smBaseWidth * 90 }}>
                                                <ViewImageShadow
                                                    Width={150}
                                                    Height={150}
                                                    BorderRadius={500}
                                                    Name={this.state.DataAPI.top_users[1].avatar != "" ? this.state.DataAPI.top_users[1].avatar : 'student_leaderboard_image2'}
                                                />
                                            </View>
                                            <ViewImage Width={290} Height={290} Name={'class_st01'} />
                                            <View style={{ position: "absolute",bottom:-SmartScreenBase.smBaseWidth*40 }}>
                                                <ViewImage Width={150} Height={170} Name={this.RenderIconRank(this.state.DataAPI.top_users[1].total_score).name} />
                                            </View>
                                        </View>
                                        <View style={{
                                            marginTop: SmartScreenBase.smPercenHeight,
                                            width: SmartScreenBase.smPercenWidth * 26
                                        }}>
                                            <Text style={StyleStudent.text}>
                                                {this.state.DataAPI.top_users[1].fullname}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ alignItems: "center" }}>
                                        <View style={[StyleStudent.ViewBoxTT, {
                                            backgroundColor: "#FDED3F",
                                            marginBottom: SmartScreenBase.smPercenHeight,
                                            marginTop: SmartScreenBase.smPercenHeight / 2
                                        }]}>
                                            <Text style={[StyleStudent.text, { fontWeight: 'bold' }]}>
                                                {this.state.DataAPI.top_users[0].total_score != null ? this.state.DataAPI.top_users[0].total_score : this.state.DataAPI.top_users[0].rank}
                                            </Text>
                                        </View>
                                        <View style={{ alignItems: "center", justifyContent: "center" }}>
                                            <View style={{ position: "absolute", bottom: SmartScreenBase.smBaseWidth * 100 }}>
                                                <ViewImageShadow
                                                    Width={200}
                                                    Height={200}
                                                    BorderRadius={500}
                                                    Name={this.state.DataAPI.top_users[0].avatar != "" ? this.state.DataAPI.top_users[0].avatar : 'student_profile_image1'}
                                                />
                                            </View>
                                            <ViewImage Width={411} Height={412} Name={'class_st02'} />
                                            <View style={{ position: "absolute",bottom:-SmartScreenBase.smBaseWidth*40 }}>
                                                <ViewImage Width={200} Height={220} Name={this.RenderIconRank(this.state.DataAPI.top_users[0].total_score).name} />
                                            </View>
                                        </View>
                                        <View style={{ width: SmartScreenBase.smPercenWidth * 35 }}>
                                            <Text style={StyleStudent.text}>
                                                {this.state.DataAPI.top_users[0].fullname}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={{ alignItems: "center" }}>
                                        <View style={{ alignItems: "center", justifyContent: "center", marginTop: SmartScreenBase.smPercenHeight * 2 }}>
                                            <View style={[StyleStudent.ViewBoxTT, {
                                                backgroundColor: "#CCCCCC"
                                            }]}>
                                                <Text style={[StyleStudent.text, { fontWeight: 'bold' }]}>
                                                    {this.state.DataAPI.top_users[2].total_score != null ? this.state.DataAPI.top_users[2].total_score : this.state.DataAPI.top_users[2].rank}
                                                </Text>
                                            </View>
                                            <View style={{ position: "absolute", bottom: SmartScreenBase.smBaseWidth * 90 }}>
                                                <ViewImageShadow
                                                    Width={150}
                                                    Height={150}
                                                    BorderRadius={500}
                                                    Name={this.state.DataAPI.top_users[2].avatar != "" ? this.state.DataAPI.top_users[2].avatar : 'student_leaderboard_image4'}
                                                />
                                            </View>
                                            <ViewImage Width={290} Height={290} Name={'class_st03'} />
                                            <View style={{ position: "absolute",bottom:-SmartScreenBase.smBaseWidth*40 }}>
                                                <ViewImage Width={150} Height={170} Name={this.RenderIconRank(this.state.DataAPI.top_users[2].total_score).name} />
                                            </View>
                                        </View>
                                        <View style={{
                                            marginTop: SmartScreenBase.smPercenHeight,
                                            width: SmartScreenBase.smPercenWidth * 26
                                        }}>
                                            <Text style={StyleStudent.text}>
                                                {this.state.DataAPI.top_users[2].fullname}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                                <View>
                                    <ScrollView scrollEnabled={false}>
                                        {this.state.DataAPI.top_users.map((item, key) => {
                                            if (key > 2) {
                                                return (this.RenderItem(item, key))
                                            }
                                        })}
                                    </ScrollView>

                                    {/* <FlatList
                                    scrollEnabled={false}
                                    data={this.data}
                                    keyExtractor={(item,index)=>'item'+index}
                                    renderItem={.bind(this)}
                                /> */}
                                </View>
                                <View style={{ height: SmartScreenBase.smPercenHeight * 10 }} />
                            </ScrollView>
                        </View>
                    </View>
                ) : (
                    <Loading Screen={'Main'} />
                )}
            </ImageBackground>
        )
    }
    RenderItem(item, index) {
        return (
            <View key={index} style={{ flexDirection: "row", alignItems: "center" }} >
                <View style={{
                    width: SmartScreenBase.smPercenWidth * 10,
                    alignItems: "center",
                    marginRight: SmartScreenBase.smPercenWidth * 5
                }}>
                    <Text style={StyleStudent.Sty_txt_Buttom}>{index + 1}</Text>
                </View>
                <View style={[StyleStudent.ViewComponent, {
                    width: SmartScreenBase.smPercenWidth * 82,
                    alignItems: 'center',
                    flexDirection: "row",
                    marginTop: SmartScreenBase.smPercenHeight,
                }]}>
                    <View style={{
                        position: "absolute",
                        left: -SmartScreenBase.smBaseWidth * 80,
                    }}>
                        <ViewImageShadow
                            Width={150}
                            Height={150}
                            BorderRadius={500}
                            Name={item.avatar}
                        />
                    </View>
                    <View style={{
                        marginLeft: SmartScreenBase.smPercenWidth * 10,
                        paddingVertical: SmartScreenBase.smPercenHeight * 2,
                        width: SmartScreenBase.smPercenWidth * 45
                    }}>
                        <Text numberOfLines={1} ellipsizeMode="tail"
                            style={[StyleStudent.text, { textAlign: "left" }]}>{item.fullname}</Text>
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "flex-end", width: SmartScreenBase.smPercenWidth * 20 }}>
                        <Text style={[StyleStudent.text, { fontWeight: "bold", textAlign: "right" }]}>{item.total_score != null ? item.total_score : 0}</Text>
                        <View style={{ marginHorizontal: 4 ,marginTop:SmartScreenBase.smPercenWidth}} >
                            <ViewImage Width={30} Height={31} Name={item.rank_change_status == 'up' ? 'student_02' : 'student_03'} />
                        </View>

                    </View>
                    <View style={{width:SmartScreenBase.smBaseWidth*80,alignItems:"center"}}>
                        <ViewImage Width={this.RenderIconRank(item.total_score).width} Height={this.RenderIconRank(item.total_score).height} Name={this.RenderIconRank(item.total_score).name} />
                    </View>

                </View>
            </View>
        )
    }
}
const mapStatetoProps = state => ({
    data: state.RankingStudentReducer
})
export default connect(mapStatetoProps, actions)(leaderboardscreen)
