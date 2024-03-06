import * as React from 'react';
import { View, StyleSheet, Dimensions, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import SmartScreenBase from '../../../../base/SmartScreenBase';
import ViewImage from '../../../../component/ViewImage';
import StyleStudent from '../../StyleStudent';
import Modal from 'react-native-modal';


export default class TabViewExample extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            routes: [
                { key: 'first', title: 'BÀI NÓI' },
                { key: 'second', title: 'BÀI VIẾT' },
            ],
            refresh: false,
            visible: false,
            data:this.props.data.resources
        };
    }

    render() {
        return (
            <TabView
                navigationState={this.state}
                renderScene={SceneMap({
                    first: () => {
                        return (
                            <View style={[styles.scene]} >
                                <FlatList
                                    data={this.state.data.file}
                                    extraData={this.state.visible}
                                    keyExtractor={(item, index) => 'item' + index}
                                    renderItem={this.RenderFirstItem}
                                    contentContainerStyle={{ alignItems: "center" }}
                                />
                                <Modal isVisible={this.state.visible}
                                    onSwipeCancel={() => { this.setState({ visible: false }) }}
                                    onBackdropPress={() => { this.setState({ visible: false }) }}
                                    swipeDirection={['up', 'right', 'left', 'down']}
                                    style={{ justifyContent: "flex-end", flex: 1 }}
                                >
                                    <View style={StyleStudent.modalContent}>
                                        <Text style={[StyleStudent.txt_title, { textAlign: "left" }]}>Chọn người gửi:</Text>
                                        <View style={{
                                            flexDirection: "row",
                                            alignItems: 'center',
                                            justifyContent: "center",
                                            marginVertical: SmartScreenBase.smPercenHeight * 3,
                                            borderWidth: 1, borderColor: 'gray',
                                            borderRadius: SmartScreenBase.smPercenWidth * 5
                                        }}>
                                            <ViewImage Width={85} Height={86} Name={'student_managerfile_image4'} />
                                            <TextInput style={{ width: SmartScreenBase.smPercenWidth * 70 }}
                                                placeholder={'Tìm kiếm...'} />
                                        </View>
                                        <View style={{ width: SmartScreenBase.smPercenWidth * 100, flexDirection: "row", justifyContent: "space-evenly" }}>
                                            <TouchableOpacity onPress={() => {
                                                this.setState({ visible: false })
                                            }}>
                                                <View style={StyleStudent.Sty_Buttom}>
                                                    <Text style={StyleStudent.Sty_txt_Buttom}>HỦY</Text>
                                                </View>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => {
                                                this.setState({ visible: false })
                                            }}>
                                                <View style={StyleStudent.Sty_Buttom}>
                                                    <Text style={StyleStudent.Sty_txt_Buttom}>GỬI</Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </Modal>
                            </View>
                        )
                    },
                    second: () => {
                        return (
                            <View style={[styles.scene]} >
                                <FlatList
                                    data={this.state.data.writing}
                                    keyExtractor={(item, index) => 'item' + index}
                                    renderItem={this.RenderSecondItem}
                                    contentContainerStyle={{ alignItems: "center" }}

                                />
                            </View>
                        ) 
                    },
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

        );
    }
    RenderFirstItem = ({ item }) => {
        return (
            <View style={[StyleStudent.ViewComponent, { flexDirection: "row", alignItems: "center" }]}>
                <View style={{
                    width: SmartScreenBase.smPercenWidth * 70,
                    marginLeft: SmartScreenBase.smPercenWidth * 5
                }}>
                    <Text style={[StyleStudent.text, { fontWeight: "bold", textAlign: "left" }]}>
                        {item.title}</Text>
                    <View style={{ flexDirection: "row", alignItems: 'flex-end', marginVertical: SmartScreenBase.smPercenHeight / 2 }}>
                        <ViewImage Width={60} Height={63} Name={'student_managerfile_image1'} />
                        <Text style={[StyleStudent.text, {
                            marginLeft: SmartScreenBase.smPercenWidth * 3
                        }]}>Ngày tạo: {item.created_at}</Text>
                    </View>
                    {/* <View style={{ flexDirection: "row", alignItems: 'flex-end' }}>
                        <ViewImage Width={69} Height={69} Name={'student_managerfile_image2'} />
                        <Text style={[StyleStudent.text, {
                            marginLeft: SmartScreenBase.smPercenWidth * 3
                        }]}>Thời lương: 0p</Text>
                    </View> */}
                </View>
                {/* <View>
                    {item.score !== null ? (
                        <View >
                            <Text style={StyleStudent.text}>ĐIỂM</Text>
                            <Text style={[StyleStudent.txt_title, { color: "red", fontWeight: "bold" }]} >{item.score}/10</Text>
                        </View>
                    ) : (
                            <View>
                                {this.state.visible == false ? (
                                    <TouchableOpacity onPress={() => {
                                        this.setState({ visible: !this.state.visible })
                                    }}>
                                        <View style={{
                                            borderWidth: 1, borderRadius: SmartScreenBase.smPercenWidth * 2,
                                        }}>
                                            <Text style={[StyleStudent.text, {
                                                padding: SmartScreenBase.smPercenWidth * 3
                                            }]}>Gửi</Text>
                                        </View>
                                    </TouchableOpacity>
                                ) : (
                                        <Text style={[StyleStudent.txt_title, { color: 'lightgray' }]}>Đã gửi</Text>
                                    )}
                            </View>
                        )}
                </View> */}
                <View>

                </View>
            </View>
        );
    }
    RenderSecondItem = ({ item }) => {
        return (
            <View style={[StyleStudent.ViewComponent, { flexDirection: "row", alignItems: "center" }]}>
                <View style={{
                    width: SmartScreenBase.smPercenWidth * 70,
                    marginLeft: SmartScreenBase.smPercenWidth * 5
                }}>
                    <Text style={[StyleStudent.text, { fontWeight: "bold", textAlign: "left" }]}>
                        {item.title}</Text>
                    <View style={{ flexDirection: "row", alignItems: 'flex-end', marginVertical: SmartScreenBase.smPercenHeight / 2 }}>
                        <ViewImage Width={60} Height={63} Name={'student_managerfile_image1'} />
                        <Text style={[StyleStudent.text, {
                            marginLeft: SmartScreenBase.smPercenWidth * 3
                        }]}>Ngày tạo: {item.created_at}</Text>
                    </View>
                </View>
                {/* <View>
                    {item.score !== null ? (
                        <View >
                            <Text style={StyleStudent.text}>ĐIỂM</Text>
                            <Text style={[StyleStudent.txt_title, { color: "red", fontWeight: "bold" }]} >{item.score}/10</Text>
                        </View>
                    ) : (
                            <View>
                                {this.state.visible == false ? (
                                    <TouchableOpacity onPress={() => {
                                        this.setState({ visible: !this.state.visible })
                                    }}>
                                        <View style={{
                                            borderWidth: 1, borderRadius: SmartScreenBase.smPercenWidth * 2,
                                        }}>
                                            <Text style={[StyleStudent.text, {
                                                padding: SmartScreenBase.smPercenWidth * 3
                                            }]}>Gửi</Text>
                                        </View>
                                    </TouchableOpacity>
                                ) : (
                                        <Text style={[StyleStudent.txt_title, { color: 'lightgray' }]}>Đã gửi</Text>
                                    )}
                            </View>
                        )}
                </View> */}
                <View>

                </View>
            </View>
        );
    }
}


const Data = {
    speak: [
        {
            id: 0,
            NameLesson: 'Bài nói số 2',
            time: '12/1/2020',
            time_lesson: 9,
            score: 9
        },
        {
            id: 1,
            NameLesson: 'Bài nói số 4',
            time: '12/1/2020',
            time_lesson: 9,
            score: null
        },
        {
            id: 2,
            NameLesson: 'Bài nói số 5',
            time: '12/1/2020',
            time_lesson: 9,
            score: null
        },
    ],
    write: [
        {
            id: 0,
            NameLesson: 'Bài viet số 2',
            time: '12/1/2020',
            score: 9
        },
        {
            id: 0,
            NameLesson: 'Bài viet số 2',
            time: '12/1/2020',
            score: null
        },
        {
            id: 0,
            NameLesson: 'Bài viet số 2',
            time: '12/1/2020',
            score: null
        },
    ]
}


const styles = StyleSheet.create({
    scene: {
        flex: 1,
    },
});