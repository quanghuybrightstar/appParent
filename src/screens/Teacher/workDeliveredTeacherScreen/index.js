import React, { Component } from 'react';
import {
    Text,
    View,
    FlatList,
    Dimensions,
    TouchableOpacity, Modal, ImageBackground,
    Alert
} from 'react-native';
import SmartScreenBase from "../../../base/SmartScreenBase";
import ItemFilter from '../../../component/ItemFilter/index'
import ItemFilterExercises from '../../../component/ItemListFilterExercises/index';
import ItemListWorkDelivered from "../../../component/ItemListWorkDelivered";
import Styles from './workDeliveredTeacherScreenStyles'
import API from "../../../API/APIConstant";
import axios from "axios";
const { width, height } = Dimensions.get("screen");
SmartScreenBase.baseSetup();
let dataFilterEx=[
        {
            id: 0,
            name:'Speaking',
            isChecked:false
        },
        {
            id: 1,
            name:'Writing',
            isChecked:false
        },
        {
            id: 2,
            name:'Listening',
            isChecked:false
        },
        {
            id: 3,
            name:'Reading',
            isChecked:false
        },
        {
            id: 4,
            name:'Vocabulary',
            isChecked:false
        },
        {
            id: 5,
            name:'Gramma',
            isChecked:false
        },
    ];
class index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible:false,
            Data : [],
            dataFilter:[
                {
                    id: 1,
                    name:'Kỹ Năng',
                    isChecked:true
                },
                {
                    id: 2,
                    name:'Học Viên',
                    isChecked:false
                },
            ],
            dataFilterEx:[
                {
                    id: 0,
                    name:'Speaking',
                    isChecked:false
                },
                {
                    id: 1,
                    name:'Writing',
                    isChecked:false
                },
                {
                    id: 2,
                    name:'Listening',
                    isChecked:false
                },
                {
                    id: 3,
                    name:'Reading',
                    isChecked:false
                },
                {
                    id: 4,
                    name:'Vocabulary',
                    isChecked:false
                },
                {
                    id: 5,
                    name:'Gramma',
                    isChecked:false
                },
            ],
            indexSelected:0,
            DataFiltered:[],
            FilterStudents:[]
        };
    }
    componentDidMount(): void {
        this._getExercisesDelivered()
    }

    _getExercisesDelivered =  () => {
        const url = API.baseurl + API.getExercisesDelivered;
        const header = {
            'Content-Type': 'application/json',
            'jwt_token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6IjEiLCJ1c2VybmFtZSI6ImFkbWluIiwidGltZV9sb2dpbiI6MTU3ODkwNzQyM30.CFZyO9a-qBmyI8Q25AqGNd1nxWn1SO5TMC_yBxjgWCA',
            'x-api-key': '8c3a30506d9633a8b202cb5a91873efa',
            'Authorization': 'Basic Z2VrX2FkbWluOmdla19hZG1pbl9wYXNzd29yZA=='
        };
        axios({method: 'get', url: url, headers: header})
            .then((response) => {
                const not_mark = response.data.data.not_mark;
                const waiting = response.data.data.waiting;
                const marked = response.data.data.marked;
                let DataSum = not_mark.concat(marked,waiting);
                this.state.Data.concat(not_mark);
                this.setState({
                    isLoading: false,
                    Data:DataSum
                });
                let Data = [];
                Data = this.state.Data.map((e)=>{return e.to_username});
                let FilterStudents = [];
                Data.map((e)=>{
                    FilterStudents.push({name:e,isChecked:false})
                });
                this.setState({DataFiltered:this.state.Data,FilterStudents:FilterStudents})
            })
            .catch((error) => {
                console.log(error.message);
                if (error.message === "Network Error") {
                    Alert.alert('Thông Báo', 'Vui lòng kiểm tra kết nối Internet', [
                        {text: 'Đồng ý', style: 'cancel'}
                    ]);
                }
                this.setState({isLoading: false});
            });
    };
    _onChangeRadioButton = (index) =>{
        if (index == 0){
            this.setState({dataFilter:[...this.state.dataFilter],indexSelected:index,dataFilterEx:dataFilterEx});
        }else {
            this.setState({dataFilter:[...this.state.dataFilter],indexSelected:index,dataFilterEx:this.state.FilterStudents});
        }

    };
    _onGoToDetail = (exercise_id,exercise_name) =>{
        console.log(exercise_id);
    }
    _renderItem =({item,index})=>{
        return(
            <ItemListWorkDelivered Data={item} _onGoToDetail={(exercise_id,exercise_name)=>this._onGoToDetail(exercise_id,exercise_name)}/>
        )
    };
    _onChangeExercises = (index) =>{
        const copied = [...this.state.dataFilterEx];
        copied[index].isChecked = !copied[index].isChecked;
        this.setState({dataFilterEx:copied});
    };
    _onFilter=()=>{
        let DataFake = this.state.dataFilterEx.filter((e)=>(e.isChecked == true));
        console.log(DataFake);
        if (DataFake.length>0 && this.state.indexSelected == 0){
            let DataFilter =[];
            DataFake.map((e,index)=>{
                let i = 0;
                for (i; i < this.state.DataFiltered.length; i++) {
                    if (this.state.DataFiltered[i].exercise_type == e.name.toLowerCase()) {
                        DataFilter[i] =  this.state.DataFiltered[i];
                    }
                }
            });
            this.setState({Data:DataFilter.filter(Boolean)});
        }else if (DataFake.length>0 && this.state.indexSelected == 1) {
            let DataFilter =[];
            DataFake.map((e,index)=>{
                let i = 0;
                for (i; i < this.state.DataFiltered.length; i++) {
                    if (this.state.DataFiltered[i].to_username == e.name.toLowerCase()) {
                        DataFilter[i] =  this.state.DataFiltered[i];
                    }
                }
            });
            this.setState({Data:DataFilter.filter(Boolean)});
            console.log(this.state.Data);
        }else {
            this.setState({Data:this.state.DataFiltered})
        }


        this.setState({visible:false})
    }
    _renderItemListFilterExercises =({item,index})=>{
        return(
            <ItemFilterExercises indexSelected={this.state.indexSelected} Data={item} _onChangeExercises={()=>this._onChangeExercises(index)} index={index}/>
        )
    };
    _renderItemListFilter =({item,index})=>{
        return(
            <ItemFilter indexSelected={this.state.indexSelected} Data={item} _onChangeRadioButton={()=>this._onChangeRadioButton(index)} index={index}/>
        )
    };
    render() {
        return (
            <ImageBackground source={{ uri: 'imagebackground' }} style={{
                flex: 1,
                paddingBottom:20
            }}>
                <View style={Styles.WrapView}>
                    <View style={Styles.ViewHeader}>
                        {/*<TouchableOpacity style={Styles.ButtonMenu}>*/}
                        {/*    <Image style={Styles.ImageMenu}*/}
                        {/*           resizeMode={'contain'}*/}
                        {/*           source={{uri:"imageback"}}/>*/}
                        {/*</TouchableOpacity>*/}
                        <Text style={Styles.TextTitle}>Giao bài</Text>
                    </View>
                    <TouchableOpacity onPress={() => {
                        this.setState({visible:true})
                    }}>
                        <View style={{ marginRight: SmartScreenBase.smPercenWidth * 2 }}>
                            <Text style={Styles.TextFilter}>Lọc</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={Styles.ViewBody}>
                    <View style={Styles.ViewTextBody}>
                        <Text style={Styles.TextBody}>BÀI ĐÃ GIAO</Text>
                    </View>
                </View>
                <View style={Styles.ViewFlatList}>
                    <FlatList data={this.state.Data} renderItem={this._renderItem}
                              keyExtractor={(item, index) => {
                                  return item + index;
                              }}
                              showsVerticalScrollIndicator={false}
                              extraData={this.state}/>
                </View>
                <View style={{
                    width:SmartScreenBase.smPercenWidth*100,
                    height:'10%',
                    justifyContent:'center',
                    alignItems:'center',
                }}>
                    <TouchableOpacity
                        style={{
                            backgroundColor:'#00283A',
                            width:SmartScreenBase.smPercenWidth*50,
                            height:SmartScreenBase.smPercenWidth*10,
                            borderRadius:20,
                            alignItems:'center',
                            justifyContent:'center'
                        }}
                        >
                        <Text style={{
                            color: '#fff' ,
                            fontWeight:"bold",
                            fontSize:SmartScreenBase.smPercenWidth*5,
                            textAlign:'center',
                            textAlignVertical:'center'
                        }}>Giao Bài</Text>
                    </TouchableOpacity>

                </View>
                <Modal visible={this.state.visible} animated={true} transparent={true} onBackdropPress={() => this.setState({ visible: false })} >
                        <View style={Styles.ViewModal} onStartShouldSetResponder={() => this.setState({ visible: false })}>
                            <View style={Styles.ViewBodyModal}>
                                <View style={Styles.ViewFlatListLeft}>
                                    <View style={Styles.ViewTextFlatListLeft}>
                                        <Text style={Styles.TextFlatListLeft}>Lọc theo</Text>
                                    </View>
                                    <FlatList data={this.state.dataFilter} renderItem={this._renderItemListFilter}
                                              keyExtractor={(item, index) => {
                                                  return item.toString() + index.toString();
                                              }}
                                              showsVerticalScrollIndicator={false}
                                              extraData={this.state}/>
                                    <View style={Styles.ViewButton}>
                                        <TouchableOpacity style={Styles.ButtonFilter}
                                                          onPress={()=>{this._onFilter()}}
                                        >
                                            <Text style={Styles.TextFilterModal}>Lọc</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={Styles.ButtonCancel}
                                                          onPress={()=>{this.setState({visible:false})}}
                                        >
                                            <Text style={Styles.TextFilterModal}>Hủy</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={{flex:1,paddingVertical:SmartScreenBase.smPercenWidth*4,}}>
                                    <FlatList data={this.state.dataFilterEx} renderItem={this._renderItemListFilterExercises}
                                              keyExtractor={(item, index) => {
                                                  return item.toString() + index.toString();
                                              }}
                                              showsVerticalScrollIndicator={false}
                                              extraData={this.state}/>
                                </View>
                            </View>
                    </View>
                </Modal>
            </ImageBackground>
        );
    }
}
export default  index ;
