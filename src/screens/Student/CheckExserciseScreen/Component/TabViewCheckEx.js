import * as React from 'react';
import { View, StyleSheet, Dimensions, Text, FlatList, TouchableOpacity } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import ViewImage from '../../../../component/ViewImage';
import StyleStudent from '../../StyleStudent';

export default class TabViewExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          index:0,
            routes: [
                { key: 'first', title: 'CHƯA LÀM ' },
                { key: 'second', title: 'CÓ ĐIỂM' },
                { key: 'third', title: 'CHƯA CÓ ĐIỂM' },
            ],
            refresh: false,
            visible: false
        };
    }
    ListImage = ['hv_freelearn_02', 'hv_freelearn_03', 'hv_freelearn_04', 'hv_freelearn_05', 'hv_freelearn_06'];
    data = [
        {
            id: 0,
            lesson: "Reading",
            class: "Tiếng anh lớp 12",
            unit: "5",
            start_time: "17/02/2020",
            end_time: "20/10/2020",
            number: 0,
            total: 30,
            outoftime: true,
            remind: true,
            score: 5,
            lesson_type: 'pronunciation',
            question_type: '5',
            lesson_name: 'Lionel Danh',
            lesson_id: '165'
        },
        {
            id: 1,
            lesson: "Reading",
            class: "Tiếng anh lớp 12",
            unit: "5",
            start_time: "17/02/2020",
            end_time: "20/10/2020",
            number: 10,
            total: 30,
            outoftime: true,
            remind: false,
            score: null,
            lesson_type: 'pronunciation',
            question_type: '5',
            lesson_name: 'Lionel Danh',
            lesson_id: '165'
        },
        {
            id: 2,
            lesson: "Reading",
            class: "Tiếng anh lớp 12",
            unit: "5",
            start_time: "17/02/2020",
            end_time: "20/10/2020",
            number: 20,
            total: 30,
            outoftime: false,
            remind: false,
            score: null,
            lesson_type: 'pronunciation',
            question_type: '5',
            lesson_name: 'Lionel Danh',
            lesson_id: '165'
        },
        {
            id: 3,
            lesson: "Reading",
            class: "Tiếng anh lớp 12",
            unit: "5",
            start_time: "17/02/2020",
            end_time: "20/10/2020",
            number: 30,
            total: 30,
            outoftime: false,
            remind: false,
            score: null,
            lesson_type: 'pronunciation',
            question_type: '5',
            lesson_name: 'Lionel Danh',
            lesson_id: '165'
        },
        {
            id: 4,
            lesson: "Reading",
            class: "Tiếng anh lớp 12",
            unit: "5",
            start_time: "17/02/2020",
            end_time: "20/10/2020",
            number: 30,
            total: 30,
            outoftime: false,
            remind: false,
            score: null,
            lesson_type: 'pronunciation',
            question_type: '5',
            lesson_name: 'Lionel Danh',
            lesson_id: '165'
        },
    ]
    render() {
        return (
            <TabView
                navigationState={this.state}
                renderScene={SceneMap({
                    first: () => {
                        return (
                            <View style={[styles.scene]} >
                                <FlatList
                                    data={this.data}
                                    // keyExtractor={(item, index) => 'item' + index}
                                    renderItem={this.RenderFirstItem}
                                    contentContainerStyle={{ alignItems: "center",paddingBottom:SmartScreenBase.smPercenHeight*10 }}
                                />
                            </View>
                        )
                    },
                    second: () => {
                        return (
                            <View style={[styles.scene]} >
                                <FlatList
                                    data={this.data}
                                    // keyExtractor={(item, index) => 'item' + index}
                                    renderItem={this.RenderSecondItem}
                                    contentContainerStyle={{ alignItems: "center" ,paddingBottom:SmartScreenBase.smPercenHeight*10}}

                                />
                            </View>
                        )
                    },
                    third: () => {
                        return (
                            <View style={[styles.scene]} >
                                <FlatList
                                    data={this.data}
                                    // keyExtractor={(item, index) => 'item' + index}
                                    renderItem={this.RenderthirdItem}
                                    contentContainerStyle={{ alignItems: "center" ,paddingBottom:SmartScreenBase.smPercenHeight*10}}
                                />
                            </View>
                        )
                    },
                })}
                onIndexChange={index => this.setState({index:index})}
                initialLayout={{ width: Dimensions.get('window').width }}
                renderTabBar={props => <TabBar
                    {...props}
                    indicatorStyle={{
                        backgroundColor: 'yellow',
                        width: SmartScreenBase.smPercenWidth * 30

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
                    labelStyle={{ fontSize: SmartScreenBase.smPercenWidth * 3.3, fontWeight: 'bold', textAlign: "center" }}
                />}
            />

        );
    }

    _startLesson(item) {
        let data = {};
        data['lesson_type'] = item.lesson_type;
        data['question_type'] = item.question_type;
        data['lesson_name'] = item.lesson_name;
        data['lesson_id'] = item.lesson_id;
        this.props.startLesson(data);
    }

    RenderFirstItem = ({ item }) => {
        return (
            <TouchableOpacity
                style={[StyleStudent.ViewComponent, { flexDirection: "row", alignItems: "center" }]}
                onPress={() => this._startLesson(item)}
            >
                <View style={{ marginHorizontal: SmartScreenBase.smPercenWidth * 2 }}>
                    <ViewImage Width={440} Height={300} Name={this.ListImage[item.id]} />
                </View>
                <View style={{ marginLeft: SmartScreenBase.smPercenWidth * 2, width: SmartScreenBase.smPercenWidth * 50 }}>
                    <Text style={[StyleStudent.text, { fontWeight: "bold", textAlign: "left" }]}>{item.lesson}  {item.id + 1}</Text>
                    <Text style={[StyleStudent.text, { textAlign: "left" }]}>{item.class} unit {item.unit}</Text>
                    <View style={{ marginTop: SmartScreenBase.smPercenHeight * 3 }}>
                        {item.outoftime == false ? (
                            <Text style={[StyleStudent.text, { fontWeight: "bold", color: 'rgb(17,50,84)', textAlign: "left" }]}> Ngày nộp {item.end_time}</Text>
                        ) : (
                                <Text style={[StyleStudent.text, { fontWeight: "bold", color: 'rgb(222,69,48)', textAlign: "left" }]}> Quá hạn từ {item.end_time}</Text>
                            )}
                    </View>
                </View>
                {item.remind == true ? (
                    <View style={{
                        position: "absolute",
                        top: -SmartScreenBase.smPercenHeight / 2,
                        right: SmartScreenBase.smPercenWidth * 5
                    }}>
                        <ViewImage Width={237} Height={63} Name={'hv_02'} />
                    </View>
                ) : null}
            </TouchableOpacity>
        );
    }
    RenderSecondItem = ({ item}) => {
        return (
            <TouchableOpacity
                style={[StyleStudent.ViewComponent, { flexDirection: "row", alignItems: "center" }]}
                onPress={() => this._startLesson(item)}
            >
                <View style={{ marginHorizontal: SmartScreenBase.smPercenWidth * 2 }}>
                    <ViewImage Width={440} Height={300} Name={this.ListImage[item.id]} />
                </View>
                <View style={{ marginLeft: SmartScreenBase.smPercenWidth * 2, width: SmartScreenBase.smPercenWidth * 50 }}>
                    <Text style={[StyleStudent.text, { fontWeight: "bold", textAlign: "left" }]}>{item.lesson}  {item.id + 1}</Text>
                    <Text style={[StyleStudent.text, { textAlign: "left" }]}>{item.class} unit {item.unit}</Text>
                    <View style={{ marginTop: SmartScreenBase.smPercenHeight * 3 }}>
                        <Text style={[StyleStudent.text, { fontWeight: "bold", color: 'rgb(17,50,84)', textAlign: "left" }]}> Ngày nộp {item.end_time}</Text>
                    </View>
                </View>
                {item.remind == true ? (
                    <View style={{
                        position: "absolute",
                        top: -SmartScreenBase.smPercenHeight / 2,
                        right: SmartScreenBase.smPercenWidth * 5,
                        alignItems: 'center',
                        justifyContent: "center"
                    }}>
                        <ViewImage Width={224} Height={78} Name={'hv_03'} />
                        <View style={{ position: 'absolute', flexDirection: "row", alignItems: "flex-end" }}>
                            <Text style={{
                                fontSize: SmartScreenBase.smPercenWidth * 5,
                                color: 'white',
                                fontWeight: "bold"
                            }}> {item.score}/10</Text>
                            <Text style={{
                                fontSize: SmartScreenBase.smPercenWidth * 2.5,
                                color: 'white', marginBottom: SmartScreenBase.smPercenHeight / 2,
                                marginLeft: 4
                            }}>Điểm</Text>
                        </View>
                    </View>
                ) : null}
            </TouchableOpacity>
        );
    }

    RenderthirdItem = ({ item }) => {
        return (
            <View style={[StyleStudent.ViewComponent, { flexDirection: "row", alignItems: "center" }]}>
                <View style={{ marginHorizontal: SmartScreenBase.smPercenWidth * 2 }}>
                    <ViewImage Width={440} Height={300} Name={this.ListImage[item.id]} />
                </View>
                <View style={{ marginLeft: SmartScreenBase.smPercenWidth * 2, width: SmartScreenBase.smPercenWidth * 50 }}>
                    <Text style={[StyleStudent.text, { fontWeight: "bold", textAlign: "left" }]}>{item.lesson}  {item.id + 1}</Text>
                    <Text style={[StyleStudent.text, { textAlign: "left" }]}>{item.class} unit {item.unit}</Text>
                    <View style={{ marginTop: SmartScreenBase.smPercenHeight * 3 }}>
                        <Text style={[StyleStudent.text, { fontWeight: "bold", color: 'rgb(17,50,84)', textAlign: "left" }]}> Ngày nộp {item.end_time}</Text>
                    </View>
                </View>
                {item.remind == true ? (
                    <View style={{
                        position: "absolute",
                        top: -SmartScreenBase.smPercenHeight / 2,
                        right: SmartScreenBase.smPercenWidth * 5,
                        alignItems: 'center',
                        justifyContent: "center"
                    }}>
                        <ViewImage Width={224} Height={78} Name={'hv_03'} />
                        <View style={{ position: 'absolute', flexDirection: "row", alignItems: "flex-end" }}>
                            <Text style={{
                                fontSize: SmartScreenBase.smPercenWidth * 5,
                                color: 'white',
                                fontWeight: "bold"
                            }}> {item.score}/10</Text>
                            <Text style={{
                                fontSize: SmartScreenBase.smPercenWidth * 2.5,
                                color: 'white', marginBottom: SmartScreenBase.smPercenHeight / 2,
                                marginLeft: 4
                            }}>Điểm</Text>
                        </View>
                    </View>
                ) : null}
            </View>
        );
    }
}




const styles = StyleSheet.create({
    scene: {
        flex: 1,
    },
});
