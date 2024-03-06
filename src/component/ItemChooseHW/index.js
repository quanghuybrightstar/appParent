import React, {PureComponent} from 'react';
import {View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import SmartScreenBase from '../../base/SmartScreenBase';
import {hoanthanh} from '../../redux/actions/hoanthanh';
import {connect} from 'react-redux';
import ItemAttenDance from '../ItemAttenDance';

let arrChoose = [];

class ItemChooseHW extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            DataLesson: this.props.DataLesson,
            dataList: [],
            select: '',
            type: [false, false, false, false, false],
            chooseList: [],
        };
    }

    componentWillMount(): void {
        const {time} = this.props;
        let arr = [];
        let ar = [...this.state.type];
        for (let i = 0; i < this.props.dataList.length; i++) {
            let ob = new Object();
            ob.item = this.props.dataList[i];
            ob.status = false;
            ob.start = time.start;
            ob.end = time.end;
            ob.file = '';
            arr.push(ob);
        }
        this.setState({dataList: arr});
        this.setState({type: ar});
    }

    componentDidMount(): void {
        const {data_answer} = this.props;
        let ar = [...this.state.type];
        for (let i = 0; i < this.props.dataList.length; i++) {
            data_answer.forEach((item) => {
                if (this.props.dataList[i].lesson_id === item.item.lesson_id) {
                    ar[i] = true;
                    return false;
                }
            })
        }
        this.setState({type: ar});
    }

    _chooseData = (index) => {
        let ar = [...this.state.type];
        ar[index] = !ar[index];
        this.setState({type: ar});
    };

    _chooseItem = (index1, item) => {
        let copyAr = this.state.dataList.slice('');
        copyAr[index1].status = !copyAr[index1].status;
        this.setState({dataList: copyAr});
        if (!copyAr[index1].status) {
            this.props.removeData(item);
        } else {
            this.props.changeData(item);
        }
    };

    _renderItemItems = ({item, index}) => {
        return (
            <View>
                <TouchableOpacity
                    style={{
                        width: '100%',
                        height: SmartScreenBase.smPercenWidth * 12,
                        backgroundColor: '#00000060',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderBottomColor: '#FFFFFF',
                        borderBottomWidth: 0.5,
                        borderBottomLeftRadius: 8,
                        borderBottomRightRadius: 8,
                    }}
                    onPress={() => this._chooseData(index)}>
                    <View
                        style={{
                            width: '85%',
                            justifyContent: 'center',
                        }}
                    >
                        <Text
                            style={{
                                color: '#FFFFFF',
                                fontWeight: '400',
                                fontSize: SmartScreenBase.smPercenWidth * 4,
                                paddingLeft: SmartScreenBase.smPercenWidth * 10,
                            }}>
                            {item}
                        </Text>
                    </View>
                    <View
                        style={{
                            height: SmartScreenBase.smPercenWidth * 8,
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '15%',
                        }}
                    >
                        {
                            this.state.type[index]
                                ?
                                <Image
                                    style={{
                                        width: SmartScreenBase.smPercenWidth * 7,
                                        height: SmartScreenBase.smPercenWidth * 7,
                                    }}
                                    resizeMode={'contain'}
                                    source={{uri: 'muitenlen'}}
                                />
                                :
                                <Image
                                    style={{
                                        width: SmartScreenBase.smPercenWidth * 7,
                                        height: SmartScreenBase.smPercenWidth * 7,
                                    }}
                                    resizeMode={'contain'}
                                    source={{uri: 'muitenxuong'}}
                                />
                        }
                    </View>
                </TouchableOpacity>
                {this.state.type[index] === true ? (
                    <View>
                        {this.state.dataList.map((i, index1) =>
                            i.item.lesson_type === item &&
                            i.item.unit_name === this.state.select ? (
                                <TouchableOpacity
                                    style={{
                                        width: '100%',
                                        height: SmartScreenBase.smPercenWidth * 12,
                                        backgroundColor: '#00000020',
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                    }}
                                    onPress={() => this._chooseItem(index1, i)}
                                >
                                    <View style={{
                                        width: '85%',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <Text
                                            style={{
                                                color: '#FFFFFF',
                                                fontWeight: '400',
                                                fontSize: SmartScreenBase.smPercenWidth * 4,
                                                textAlign: 'center',
                                            }}>
                                            {i.item.lesson_name}
                                        </Text>
                                    </View>
                                    <View
                                        style={{
                                            height: SmartScreenBase.smPercenWidth * 8,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: '15%',
                                        }}
                                    >
                                        <Image
                                            style={{
                                                width: SmartScreenBase.smPercenWidth * 5,
                                                height: SmartScreenBase.smPercenWidth * 5,
                                                color: '#fff',
                                            }}
                                            // mhchung_icon_09
                                            resizeMode={'contain'}
                                            source={{
                                                uri: 'mhchung_icon_08',
                                            }}/>
                                        {
                                            i.status
                                                ?
                                                <Image
                                                    style={{
                                                        width: SmartScreenBase.smPercenWidth * 2,
                                                        height: SmartScreenBase.smPercenWidth * 2,
                                                        color: '#fff',
                                                        position: 'absolute',
                                                    }}
                                                    // mhchung_icon_09
                                                    resizeMode={'contain'}
                                                    source={{
                                                        uri: 'chamvang',
                                                    }}
                                                />
                                                : null
                                        }

                                    </View>
                                </TouchableOpacity>
                            ) : null,
                        )}
                    </View>
                ) : null}
            </View>
        );
    };

    render() {
        const item = this.props.Data;
        const index = this.props.index;
        const indexSelected = this.props.indexSelected;
        const Selected = index === indexSelected ? true : false;
        return (
            <View
                style={{
                    flex: 1,
                    width: '100%',
                    paddingHorizontal: SmartScreenBase.smPercenWidth * 5,
                }}>
                <TouchableOpacity
                    style={{
                        width: '100%',
                        height: SmartScreenBase.smPercenWidth * 12,
                        backgroundColor: '#fff',
                        marginTop: SmartScreenBase.smPercenWidth * 2,
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderRadius: SmartScreenBase.smPercenWidth * 2,
                    }}
                    onPress={() => {
                        this.props._HideMenu(index);
                        this.setState({select: item.unit_name});
                    }}>
                    <View style={{width: '85%', justifyContent: 'center'}}>
                        <Text
                            style={{
                                paddingLeft: SmartScreenBase.smPercenWidth * 3,
                                color: '#000',
                                fontWeight: '400',
                                fontSize: SmartScreenBase.smPercenWidth * 4,
                            }}>
                            {item.unit_name}
                        </Text>
                    </View>
                    <View style={{width: '15%', alignItems: 'center', justifyContent: 'center'}}>
                        {
                            Selected
                                ?
                                <Image
                                    style={{
                                        width: SmartScreenBase.smPercenWidth * 8,
                                        height: SmartScreenBase.smPercenWidth * 8,
                                    }}
                                    resizeMode={'contain'}
                                    source={{uri: 'minus'}}
                                />
                                :
                                <Image
                                    style={{
                                        width: SmartScreenBase.smPercenWidth * 8,
                                        height: SmartScreenBase.smPercenWidth * 8,
                                    }}
                                    resizeMode={'contain'}
                                    source={{uri: 'plus'}}
                                />
                        }
                    </View>
                </TouchableOpacity>
                {Selected ? (
                    <View style={{backgroundColor: '#00000030'}}>
                        <FlatList
                            data={this.state.DataLesson}
                            renderItem={this._renderItemItems}
                            keyExtractor={(item, index) => {
                                return item.toString() + index.toString();
                            }}
                            showsVerticalScrollIndicator={false}
                            extraData={this.state}
                        />
                    </View>
                ) : null}
            </View>
        );
    }
}

function mapStateToProps(state) {
    return {
        data_answer: state.hoanthanhReducer.data_answer,
        time: state.timegiaobai.data_answer,
    };
}

export default connect(mapStateToProps)(ItemChooseHW);
