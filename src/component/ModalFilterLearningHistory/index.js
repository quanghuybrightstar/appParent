import * as React from 'react';
import {
    View, Text, TouchableOpacity, FlatList, TouchableWithoutFeedback
} from 'react-native';
import Modal from 'react-native-modal';
import moment from 'moment';
import SmartScreenBase from '../../base/SmartScreenBase';
import StyleStudent from '../../screens/Student/StyleStudent';
import ViewImage from '../ViewImage';
export default class ModalFilter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            dataSkillFilter: [
                { Name: 'Pronunciation', status: false },
                { Name: 'Listening', status: false },
                { Name: 'Vocabulary', status: false },
                { Name: 'Speaking', status: false },
                { Name: 'Grammar', status: false },
                { Name: 'Writing', status: false },
                { Name: 'Reading', status: false },
                { Name: 'Test', status: false },
            ],
            refresh: false
        }
    }
    _OnchangeVisiable() {
        this.setState({
            isModalVisible: !this.state.isModalVisible
        })
    }
    _OnPressFilter() {
        this.props.onpressFilter(this.state.dataSkillFilter);
        this.setState({ isModalVisible: false });
    }
    _OnpressDeleteFilter() {
        for (let index = 0; index < this.state.dataSkillFilter.length; index++) {
            this.state.dataSkillFilter[index].status = false;
        }
        this.setState({ refresh: !this.state.refresh });
    }
    render() {
        return (
            <View >
                <Modal
                    isVisible={this.state.isModalVisible}
                    deviceWidth={SmartScreenBase.smPercenWidth * 100}
                    deviceHeight={SmartScreenBase.smPercenHeight * 100}
                    onBackdropPress={() => this.setState({ isModalVisible: false })}
                    animationIn='bounceInUp'
                    swipeDirection={['up', 'down']}
                    style={{ alignItems: "flex-end", justifyContent: "flex-end" }}
                >
                    <View style={StyleStudent.modalContent}>
                        <View style={{ flexDirection: "row", width: SmartScreenBase.smPercenWidth * 80 }}>
                            <Text style={StyleStudent.txt_title}>Từ ngày</Text>
                            <View style={{ width: SmartScreenBase.smPercenWidth * 25 }} />
                            <Text style={StyleStudent.txt_title}>Đến ngày</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <View style={[StyleStudent.ViewComponent, {
                                width: SmartScreenBase.smPercenWidth * 38,
                                borderRadius: 0,
                                borderTopLeftRadius: SmartScreenBase.smPercenWidth,
                                borderBottomLeftRadius: SmartScreenBase.smPercenWidth,
                                backgroundColor: 'rgba(0,226,160,0.6)', alignItems: "center"
                            }]}>
                                <Text style={StyleStudent.txt_title}>31/12/2020</Text>
                            </View>
                            <View style={[StyleStudent.ViewComponent, {
                                width: SmartScreenBase.smPercenWidth * 38,
                                borderRadius: 0,
                                borderTopRightRadius: SmartScreenBase.smPercenWidth,
                                borderBottomRightRadius: SmartScreenBase.smPercenWidth,
                                backgroundColor: 'rgba(0,226,160,0.3)', alignItems: "center"
                            }]}>
                                <Text style={StyleStudent.txt_title}>{moment().format('DD/MM/YYYY')}</Text>
                            </View>
                        </View>
                        <View style={{ height: SmartScreenBase.smPercenHeight * 25 }}>
                            <FlatList
                                data={this.state.dataSkillFilter}
                                keyExtractor={(item, index) => "item" + index}
                                renderItem={this._RenderItemFilter}
                                numColumns={2}
                                scrollEnabled={false}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ alignItems: "center" }}
                            />
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                            <TouchableOpacity onPress={() => this._OnpressDeleteFilter()}>
                                <View style={[StyleStudent.Sty_Buttom, {
                                    height: SmartScreenBase.smPercenHeight * 5.5,
                                    backgroundColor: null, borderWidth: 2,
                                    borderColor: 'rgba(0,226,160,1)'
                                }]}>
                                    <Text style={[StyleStudent.Sty_txt_Buttom, { color: 'rgba(0,226,160,1)' }]}>Xóa lọc</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={{ width: SmartScreenBase.smPercenWidth * 5 }} />
                            <TouchableOpacity onPress={() => this._OnPressFilter()}>
                                <View style={[StyleStudent.Sty_Buttom, {
                                    height: SmartScreenBase.smPercenHeight * 5.5,
                                    backgroundColor:'rgba(0,226,160,1)'
                                }]}>
                                    <Text style={StyleStudent.Sty_txt_Buttom}>Lọc</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        )
    }
    _RenderItemFilter = ({ item, index }) => {
        return (
            <View style={{ marginTop: SmartScreenBase.smPercenHeight * 2 }}>
                <TouchableWithoutFeedback onPress={() => {
                    this.state.dataSkillFilter[index].status = !this.state.dataSkillFilter[index].status;
                    this.setState({ refresh: !this.state.refresh })
                }}>
                    <View style={{ flexDirection: "row", width: SmartScreenBase.smPercenWidth * 40, alignItems: "center" }}>
                        <View style={{ marginHorizontal: SmartScreenBase.smPercenWidth * 3 }}>
                            <ViewImage Width={56} Height={56} Name={'teacher_huongdanbaigiang_btn_box'} />
                            {item.status == true ? (
                                <View style={{
                                    position: "absolute",
                                    top: -SmartScreenBase.smBaseWidth * 10,
                                    left: SmartScreenBase.smBaseWidth * 5
                                }}>
                                    <ViewImage Width={55} Height={57} Name={'teacher_huongdanbaigiang_icon_tick'} />
                                </View>
                            ) : null}
                        </View>
                        <Text style={StyleStudent.txt}>{item.Name}</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}