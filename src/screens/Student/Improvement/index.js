import React, { Component } from 'react';
import { SafeAreaView, ImageBackground, FlatList, View, Text, TouchableOpacity } from 'react-native';
import HeaderScreen from '../../../component/HeaderScreen';
import StyleStudent from '../StyleStudent';
import SmartScreenBase from '../../../base/SmartScreenBase';
import ViewImage from '../../../component/ViewImage';
import Loading from '../../../component/LoadingScreen';
import * as action from '../../../ReduxStudent/actions/Student';
import { connect } from "react-redux";
class ListImprovement extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    render() {
        return (
            <SafeAreaView>
                <ImageBackground source={{ uri: 'hv_map_01' }}
                    imageStyle={StyleStudent.Sty_ImageBackground}
                    style={StyleStudent.Sty_ImageBackground} >
                    <HeaderScreen navigation={this.props.navigation} title={'Học bổ trợ'} />
                    {this.props.data.isLoading == false ? (
                        <View style={{ marginTop: SmartScreenBase.smPercenHeight * 5 }}>
                            {console.log(this.props.data.Data)}
                            <Text style={[StyleStudent.TextBold, { marginLeft: SmartScreenBase.smPercenWidth * 5, color: "black" }]}>Học bổ trợ:</Text>
                            <View style={{ height: SmartScreenBase.smPercenHeight * 30,marginTop:SmartScreenBase.smPercenHeight*2 }}>
                                <FlatList
                                    data={this.props.data.Data.list_improvement}
                                    keyExtractor={(item, index) => "item" + index}
                                    renderItem={this.RendenImprovement}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                />
                            </View>
                            <Text style={[StyleStudent.TextBold, { marginLeft: SmartScreenBase.smPercenWidth * 5, color: 'black' }]}>Nhắc nhở: </Text>
                            <View style={{ height: SmartScreenBase.smPercenHeight * 30,marginTop:SmartScreenBase.smPercenHeight*2 }}>
                                <FlatList
                                    data={this.props.data.Data.list_remind}
                                    keyExtractor={(item, index) => "item" + index}
                                    renderItem={this.RendenImprovement}
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                />
                            </View>
                        </View>
                    ) : <Loading />}

                </ImageBackground>
            </SafeAreaView>
        )
    }
    RendenImprovement = ({ item, index }) => {
        return (
            <TouchableOpacity>
                <View style={[StyleStudent.ViewComponent, {
                    width: SmartScreenBase.smPercenWidth * 60,
                    marginHorizontal: SmartScreenBase.smPercenWidth * 5,
                    height: SmartScreenBase.smPercenWidth * 40,
                }]}>
                    <View style={{alignSelf:"center"}}>
                        <ViewImage Width={200} Height={200} Name={'hv_freelearn_21'} />
                    </View>
                    <View style={{ width: SmartScreenBase.smPercenWidth * 55, alignItems: "center", alignSelf: "center" }}>
                        <Text style={[StyleStudent.txt_title, { textAlign: "center" }]}>{item.lesson_name}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
}

const mapStateToProps = state => ({
    data: state.LoadAPISkillUnitHV.Imporvement
});
export default connect(mapStateToProps, action)(ListImprovement);
