import React, {PureComponent} from 'react';
import {FlatList, Image, Modal, Text, TouchableOpacity, View, TouchableWithoutFeedback} from 'react-native';
import Styles from '../../screens/Parent/workDeliveredTeacherScreen/workDeliveredTeacherScreenStyles';
import SmartScreenBase from '../../base/SmartScreenBase';
import ItemFilterExercises from '../ItemListFilterExercises';
import ItemFilter from '../ItemFilter';

class ModalFilterMarking extends PureComponent {
    constructor() {
        super();
        this.state = {
            visibleModalFilter: false,
            dataFilter: [
                {
                    id: 0,
                    name: 'Unit',
                },
                {
                    id: 1,
                    name: 'Kỹ Năng',
                },
            ],
            dataFilterEx: [
                {
                    id: 0,
                    name: 'Speaking',
                },
                {
                    id: 1,
                    name: 'Writting',
                },
                {
                    id: 2,
                    name: 'Listening',
                },
                {
                    id: 3,
                    name: 'Reading',
                },
                {
                    id: 4,
                    name: 'Vocabulary',
                },
                {
                    id: 5,
                    name: 'Grammar',
                },
                {
                    id: 6,
                    name: 'Test',
                },
            ],
        };
    }

    _openModal = () => {
        this.setState({
            visibleModalFilter: true,
        });
    };

    _closeModal = () => {
        this.setState({
            visibleModalFilter: false,
        });
    };

    _chooseItemFilterExercise = (item) => {
        const {dataFilterEx} = this.state;
        this.setState({
            dataFilterEx: dataFilterEx.map(data => {
                if (data === item) {
                    if (!data.isChecked) {
                        data.isChecked = true;
                    } else {
                        delete data.isChecked;
                    }
                }
                return data;
            }),
        });
    };

    _renderItemListFilterExercises = ({item, index}) => {
        return (
            <TouchableWithoutFeedback style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}
                                      onPress={() => {
                                          this._chooseItemFilterExercise(item);
                                      }}
            >
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    marginVertical: SmartScreenBase.smPercenWidth * 2,
                    paddingHorizontal: SmartScreenBase.smPercenWidth * 5,
                }}>
                    <View style={{
                        width: SmartScreenBase.smBaseWidth * 60,
                        height: SmartScreenBase.smBaseWidth * 60,
                    }}>
                        {item.isChecked ? <Image source={{uri: 'gv_56'}} style={{
                                position: 'absolute',
                                bottom: 5,
                                width: SmartScreenBase.smBaseWidth * 60,
                                height: SmartScreenBase.smBaseWidth * 60,
                                resizeMode: 'contain',
                                marginHorizontal: SmartScreenBase.smPercenWidth,
                            }}/>
                            :
                            null}
                        <Image source={{uri: 'gv_55'}} style={{
                            width: SmartScreenBase.smBaseWidth * 60,
                            height: SmartScreenBase.smBaseWidth * 60,
                            resizeMode: 'contain',
                            marginHorizontal: SmartScreenBase.smPercenWidth,
                        }}/>
                    </View>

                    <Text style={{
                        color: '#000',
                        fontWeight: '800',
                        fontSize: SmartScreenBase.smPercenWidth * 4,
                        marginLeft: SmartScreenBase.smPercenWidth * 5,
                    }}>{item.name}</Text>

                </View>
            </TouchableWithoutFeedback>
        );
    };

    _chooseItemFilter = (item) => {
        const {dataFilter} = this.state;
        this.setState({
            dataFilter: dataFilter.map(data => {
                if (data === item) {
                    data.isChecked = true;
                } else {
                    delete data.isChecked;
                }
                return data;
            }),
        });
    };

    _renderItemListFilter = ({item, index}) => {
        return (
            <TouchableWithoutFeedback style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}
                                      onPress={() => {
                                          this._chooseItemFilter(item);
                                      }}
            >
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    marginVertical: SmartScreenBase.smPercenWidth * 2,
                    paddingHorizontal: SmartScreenBase.smPercenWidth * 5,
                }}>

                    {item.isChecked ?
                        <Image source={{uri: 'gv_liststudent_16'}} style={{
                            width: SmartScreenBase.smBaseWidth * 45,
                            height: SmartScreenBase.smBaseWidth * 45,
                            resizeMode: 'contain',
                            marginHorizontal: SmartScreenBase.smPercenWidth,
                        }}/>
                        :
                        <Image source={{uri: 'gv_liststudent_17'}} style={{
                            width: SmartScreenBase.smBaseWidth * 45,
                            height: SmartScreenBase.smBaseWidth * 45,
                            resizeMode: 'contain',
                            marginHorizontal: SmartScreenBase.smPercenWidth,
                        }}/>
                    }

                    <Text style={{
                        color: '#000',
                        fontWeight: '800',
                        fontSize: SmartScreenBase.smPercenWidth * 4,
                        marginLeft: SmartScreenBase.smPercenWidth * 5,
                    }}>{item.name}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    };

    render() {
        const {dataFilter, dataFilterEx, visibleModalFilter} = this.state;
        return (
            <Modal visible={visibleModalFilter} animated={true} transparent={true}>
                <View style={Styles.ViewModal}>
                    <View style={{
                        width: SmartScreenBase.smPercenWidth * 100,
                        flexDirection: 'row',
                        backgroundColor: '#fff',
                        opacity: 1,
                    }}>
                        <View style={[Styles.ViewFlatListLeft, {marginVertical: SmartScreenBase.smPercenHeight * 2}]}>
                            <Text style={[Styles.TextFlatListLeft, {
                                marginVertical: SmartScreenBase.smPercenHeight * 3,
                                fontSize: SmartScreenBase.smPercenWidth * 6,
                                marginHorizontal: SmartScreenBase.smPercenWidth * 5,
                            }]}>Lọc theo</Text>
                            <FlatList
                                data={dataFilter}
                                renderItem={this._renderItemListFilter}
                                keyExtractor={(item, index) => {
                                    return item.toString() + index.toString();
                                }}
                                showsVerticalScrollIndicator={false}
                                extraData={this.state}
                            />
                            <View style={[Styles.ViewButton, {
                                marginBottom: SmartScreenBase.smPercenHeight,
                                justifyContent: 'space-around',
                            }]}>
                                <TouchableOpacity style={{
                                    backgroundColor: '#ED8A22',
                                    paddingVertical: SmartScreenBase.smPercenHeight,
                                    borderRadius: SmartScreenBase.smPercenWidth * 3,
                                    alignItems: 'center',
                                    width: '45%',
                                }}>
                                    <Text style={[Styles.TextFilterModal, {
                                        color: '#fff',
                                        fontWeight: '700',
                                        fontSize: SmartScreenBase.smPercenWidth * 5,
                                    }]}>Lọc</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={{
                                        backgroundColor: '#ED8A22',
                                        paddingVertical: SmartScreenBase.smPercenHeight,
                                        borderRadius: SmartScreenBase.smPercenWidth * 3,
                                        alignItems: 'center',
                                        width: '45%',
                                    }}
                                    onPress={() => {
                                        this.setState({visibleModalFilter: false});
                                    }}>
                                    <Text style={[Styles.TextFilterModal, {
                                        color: '#fff',
                                        fontWeight: '700',
                                        fontSize: SmartScreenBase.smPercenWidth * 5,
                                    }]}>Hủy</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View
                            style={{
                                flex: 1,
                                paddingVertical: SmartScreenBase.smPercenWidth * 4,
                            }}>
                            <FlatList
                                data={dataFilterEx}
                                renderItem={this._renderItemListFilterExercises}
                                keyExtractor={(item, index) => {
                                    return item.toString() + index.toString();
                                }}
                                showsVerticalScrollIndicator={false}
                                extraData={this.state}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        );
    }
}

export default ModalFilterMarking;
