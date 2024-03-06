import * as React from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import SmartScreenBase from '../../../base/SmartScreenBase';
import { FlatList, Directions, TouchableOpacity } from 'react-native-gesture-handler';
import MyData from '../../../component/MyData';
import DataAPI from '../../../component/DataAPI';
import base64 from 'react-native-base64';
import Loading from '../../../component/LoadingScreen';
import ViewImage from '../../../component/ViewImage';
import StyleStudent from '../StyleStudent';
import * as action from '../../../ReduxStudent/actions/Student';
import { connect } from "react-redux";
import moment from 'moment';
import ViewImageShadow from '../../../component/ViewImageShadow';
import API from '../../../API/APIConstant';
class TabViewInbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            routes: [
                { key: 'first', title: 'TIN NHẮN CHÍNH' },
                { key: 'second', title: 'TINH NHẮN HỆ THỐNG' },
            ],
            refresh: false,
            visible: false,
            isloading: true,
            DataSystem: null,
        }
    }
    componentDidMount() {
        this.props.loadapiinboxsystem();
    }
    render() {
        if (this.props.data.isLoading == false) {
            return (
                <TabView
                    navigationState={this.state}
                    renderScene={SceneMap({
                        first: () => {
                            return (
                                <View style={[styles.scene]} >
                                    <FlatList
                                        data={this.props.data.ListInbox.data.reverse()}
                                        extraData={this.state.refresh}
                                        keyExtractor={(item, index) => 'item' + index}
                                        renderItem={this.RenderFirstItem}
                                        contentContainerStyle={{
                                            alignItems: "center",
                                            paddingBottom: SmartScreenBase.smPercenWidth * 20
                                        }}
                                    />
                                </View>
                            )
                        },
                        second: () => {
                            return (
                                <View style={[styles.scene]} >
                                    <FlatList
                                        data={this.props.data.ListInboxSystem}
                                        extraData={this.state.refresh}
                                        keyExtractor={(item, index) => 'item' + index}
                                        renderItem={this.RenderSecondItem}
                                        contentContainerStyle={{
                                            alignItems: "center"
                                            , paddingBottom: SmartScreenBase.smPercenWidth * 20
                                        }}

                                    />
                                </View>
                            )
                        }
                    })}
                    onIndexChange={index => this.setState({ index })}
                    initialLayout={{ width: Dimensions.get('window').width }}
                    renderTabBar={props => <TabBar
                        {...props}
                        indicatorStyle={{
                            backgroundColor: 'yellow',
                            width: SmartScreenBase.smPercenWidth * 45

                        }}
                        style={{
                            backgroundColor: 'transparent', borderBottomWidth: 1, borderBottomColor: "#fff",
                            shadowColor: "#000",
                            shadowOffset: {
                                width: 0,
                                height: 0,
                            },
                            shadowOpacity: 0,
                            shadowRadius: 0,
                            elevation: 0,
                            width: SmartScreenBase.smPercenWidth * 90,
                            alignSelf: "center"
                        }}
                        labelStyle={{ fontSize: SmartScreenBase.smPercenWidth * 3.5, fontWeight: '800' }}
                    />}
                />
            )
        }
    }
    RenderFirstItem = ({ item, index }) => {
        return (
            <View>
                <TouchableOpacity onPress={() => MyData.Navigation.navigate('InboxDetailsScreen', { name: item.from_fullname, id: item.id })}>
                    <View style={{
                        width: SmartScreenBase.smPercenWidth * 90,
                        backgroundColor: "white",
                        marginTop: SmartScreenBase.smPercenHeight,
                        padding: SmartScreenBase.smPercenHeight,
                        borderRadius: SmartScreenBase.smPercenWidth * 3,
                        flexDirection: "row",
                        alignItems: "center",
                        marginLeft: SmartScreenBase.smPercenWidth * 8

                    }}>
                        <View style={{
                            position: "absolute",
                            left: -SmartScreenBase.smBaseWidth * 80
                        }}>
                            <ViewImageShadow Width={170} Height={170} BorderRadius={1000}
                                Name={this.props.data.ListInbox.base_url + item.from_avatar} />
                        </View>
                        <View style={{ marginLeft: SmartScreenBase.smPercenWidth * 10, width: SmartScreenBase.smPercenWidth * 60 }}>
                            <Text ellipsizeMode='tail' numberOfLines={1}
                                style={[StyleStudent.text, { textAlign: "left", fontWeight: "bold" }]}>{item.from_fullname}</Text>
                            <Text ellipsizeMode='tail' numberOfLines={1}
                                style={[StyleStudent.text, { textAlign: "left", fontWeight: "bold" }]}>{item.subject}</Text>
                            <Text ellipsizeMode='tail' numberOfLines={1}
                                style={[StyleStudent.text, { textAlign: "left", color: "gray" }]}>{item.content}</Text>
                        </View>
                        <View>
                            <View style={{ alignItems: "center" }}>
                                <Text style={[StyleStudent.text, { textAlign: "left", fontWeight: "bold" }]}>
                                    {moment(item.updated_at).format('HH:MM') !== 'Invalid date' ? moment(item.updated_at).format('HH:MM') : moment().format('HH:MM')}
                                </Text>
                                <View style={{height:SmartScreenBase.smBaseWidth*80}}/>
                            </View>
                        </View>

                    </View>
                </TouchableOpacity>
                <View style={{
                    position: "absolute",
                    right: SmartScreenBase.smPercenWidth * 9,
                    top: SmartScreenBase.smPercenHeight * 7
                }}>
                    <TouchableOpacity onPress={() => {
                        let data = {
                            inbox_id: item.id,
                            seen_status:item.seen_status,
                            is_marked: item.is_marked == 1?0:1
                        }
                           this.props.LoadUpdateInbox(data);
                    }}
                        style={{ marginTop: SmartScreenBase.smPercenHeight }} >
                        <ViewImage Width={70} Height={70} Name={item.is_marked == null?'student_inbox_image10':item.is_marked == 0?'student_inbox_image10':'student_inbox_image8'} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    RenderSecondItem = ({ item, index }) => {
        return (
            <View style={{
                width: SmartScreenBase.smPercenWidth * 90,
                backgroundColor: "white",
                marginTop: SmartScreenBase.smPercenHeight,
                padding: SmartScreenBase.smPercenHeight,
                borderRadius: SmartScreenBase.smPercenWidth * 3,
                flexDirection: "row",
                alignItems: "center",
                marginLeft: SmartScreenBase.smPercenWidth * 8

            }}>

                <View style={{
                    position: "absolute",
                    left: -SmartScreenBase.smBaseWidth * 80
                }}>
                    <ViewImageShadow Width={170} Height={170} BorderRadius={1000} Name={API.baseurl + item.from_avatar} />
                </View>
                <View style={{ marginLeft: SmartScreenBase.smPercenWidth * 10, width: SmartScreenBase.smPercenWidth * 60 }}>
                    <Text ellipsizeMode='tail' numberOfLines={1}
                        style={[StyleStudent.text, { textAlign: "left", fontWeight: "bold" }]}>{item.to_fullname}</Text>
                    <Text ellipsizeMode='tail' numberOfLines={1}
                        style={[StyleStudent.text, { textAlign: "left", fontWeight: "bold" }]}>{item.subject}</Text>
                    <Text ellipsizeMode='tail' numberOfLines={1}
                        style={[StyleStudent.text, { textAlign: "left", color: "gray" }]}>{item.content}</Text>
                </View>
                <View>
                    <View style={{ alignItems: "center" }}>
                        <Text style={[StyleStudent.text, { textAlign: "left", fontWeight: "bold" }]}>{moment(item.created_at).format('HH:MM')}</Text>
                        <TouchableOpacity style={{ marginTop: SmartScreenBase.smPercenHeight }} >
                            <ViewImage Width={50} Height={50} Name={'student_inbox_image8'} />
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        );
    }
}
const styles = StyleSheet.create({
    scene: {
        flex: 1,
    },
});
const mapStateToProps = state => ({
    data: state.LoadAPIInboxHV
});
export default connect(mapStateToProps, action)(TabViewInbox);