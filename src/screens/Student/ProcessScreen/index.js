import React, { Component } from "react";
import { connect } from "react-redux";
import * as action from '../../../ReduxStudent/actions/Student';
import { Text, View, ImageBackground, Dimensions, SafeAreaView, ScrollView, FlatList, Animated, TouchableOpacity } from "react-native";
import styles from "./styles";
import StyleStudent from "../StyleStudent";
import SmartScreenBase from "../../../base/SmartScreenBase";
import ViewImage from "../../../component/ViewImage";
import * as Animatable from 'react-native-animatable';
import moment from 'moment';
const BaseWidth = Dimensions.get('screen').width / 100;
const BaseHeight = Dimensions.get("window").height / 100;
const process_Skill = [

  {
    title: "Listening", process: 90, color: "#FF0033", name: 'listening'
  },
  {
    title: "Speaking", process: 55, color: "#66CCFF", name: 'speaking'
  },
  {
    title: "Reading", process: 23, color: "#FF00FF", name: 'reading'
  },
  {
    title: "Writing", process: 70, color: "#0066CC", name: 'writing'
  },
]
const ListImageRank = [
  {
    width: 198,
    height: 223,
    nameImage: 'student_achievements_image3'
  },
  {
    width: 285,
    height: 222,
    nameImage: 'student_achievements_image4'
  },
  {
    width: 289,
    height: 224,
    nameImage: 'student_achievements_image5'
  },
  {
    width: 296,
    height: 232,
    nameImage: 'student_achievements_image6'
  },
  {
    width: 325,
    height: 237,
    nameImage: 'student_achievements_image7'
  },
  {
    width: 388,
    height: 253,
    nameImage: 'student_achievements_image8'
  },
];
class processScreen extends Component {
  Chart_Week = [80, 9, 291, 159, 16, 7, 22, 200, 122, 130, 250];
  constructor(props) {
    super(props);
    this.state = {
      time_last: 0,
      data_recieve: null,
      listSkill: [],
      WidthChart: [],
      ResponseData: null
    }
    for (let index = 0; index < 4; index++) {
      this.state.WidthChart.push(new Animated.Value(0))
    }
    this.CheckAnimate = 0;
    this.ID_Image = 5;
    this.handleViewRef = ref => this.view = ref;
    this.bounce = () => this.view.fadeInUpBig(800).then(endState => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));
    process_Skill[0].process = this.props.data.skill_result.listening.result;
    process_Skill[1].process = this.props.data.skill_result.speaking.result;
    process_Skill[2].process = this.props.data.skill_result.reading.result;
    process_Skill[3].process = this.props.data.skill_result.writing.result;
    this.ListTimeChart = Object.keys(this.props.data.time_learning_report);
    this.ValueListTimeChart = Object.values(this.props.data.time_learning_report);
  }
  ContenOffSet(positionY) {
    if (positionY >= 250) {
      if (this.CheckAnimate == 0) {
        this.CheckAnimate = 1;
      }
    } else {
      this.CheckAnimate = 0;
    }
  }
  componentDidMount() {
    this.Fuc_WidthChart();
  }
  Fuc_WidthChart() {
    for (let index = 0; index < process_Skill.length; index++) {
      Animated.timing(this.state.WidthChart[index], {
        toValue: BaseWidth * 55 / 100 * process_Skill[index].process,
        duration: 2000
      }).start();
    }
  }
  RenderIconRank(score) {
    if (score >= 2200) {
      return 5;
    } else if (score >= 1500) {
      return 4;
    } else if (score >= 1000) {
      return 3;
    } else if (score >= 600) {
      return 2;
    } else if (score >= 300) {
      return 1;
    } else {
      return 0;
    }

  }
  render() {
    let DataRes = this.props.data;
    return (
      <SafeAreaView>
        <ImageBackground source={{ uri: "imagebackground" }}
          imageStyle={StyleStudent.Sty_ImageBackground}
          style={StyleStudent.Sty_ImageBackground} >
          <View style={{
            backgroundColor: "rgba(0,0,0,0.3)",
            height: SmartScreenBase.smPercenWidth * 15,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: SmartScreenBase.smPercenWidth * 5
          }}>
            <Text style={[StyleStudent.txt_title, { color: 'white' }]}>Thành Tích</Text>
            <View>
              <TouchableOpacity onPress={() => {
                this.props.navigation.navigate('RankScreen');
              }}>
                <ViewImage Width={393} Height={77} Name={'student_29'} />
              </TouchableOpacity>
            </View>
          </View>
          <ScrollView style={{ alignSelf: "center" }}
            showsVerticalScrollIndicator={false}
            onScroll={(s) => this.ContenOffSet(s.nativeEvent.contentOffset.y)}
            contentContainerStyle={{
              width: SmartScreenBase.smPercenWidth * 95
            }}>
            <View style={{ marginLeft: SmartScreenBase.smPercenWidth * 2, marginVertical: SmartScreenBase.smPercenHeight * 1.5 }}>
              <Text style={[StyleStudent.txt_title, { color: 'white' }]} >THÔNG TIN CHUNG</Text>
            </View>
            {/* Thông tin chung */}
            <View style={{
              backgroundColor: "rgba(0,0,0,0.2)",
              borderRadius: SmartScreenBase.smPercenWidth * 2,
              paddingVertical: SmartScreenBase.smPercenHeight * 2
            }} >
              <View style={{
                flexDirection: "row",
                alignSelf: "center",
                alignItems: "center",
                justifyContent: "space-evenly",
                width: SmartScreenBase.smPercenWidth * 95,
              }}>
                <View style={{
                  justifyContent: "center", alignItems: "center",
                  width: SmartScreenBase.smBaseWidth * 190,
                }}>
                  <Animatable.View animation={'zoomInDown'} direction="alternate" delay={300} >
                    <ViewImage Width={148} Height={144} Name={'student_achievements_image1'} />
                  </Animatable.View>
                </View>
                <View style={{
                  justifyContent: "center", alignItems: "center",
                  width: SmartScreenBase.smPercenWidth*37
                }}>
                  <Animatable.View animation={'zoomInDown'} direction="alternate" delay={300}>
                    <ViewImage
                      Width={ListImageRank[this.RenderIconRank(DataRes.total_score)].width}
                      Height={ListImageRank[this.RenderIconRank(DataRes.total_score)].height}
                      Name={ListImageRank[this.RenderIconRank(DataRes.total_score)].nameImage} />
                  </Animatable.View>
                </View>
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                  <Animatable.View animation={'zoomInDown'} direction="alternate" delay={300}>
                    <ViewImage Width={179} Height={165} Name={'student_achievements_image2'} />
                  </Animatable.View>
                </View>
              </View>
              <View style={{
                flexDirection: "row",
                alignSelf: "center",
                alignItems: "center",
                justifyContent: "space-evenly",
                width: SmartScreenBase.smPercenWidth * 95,
              }}>
                <View style={{
                  width: SmartScreenBase.smBaseWidth * 190, alignItems: "center",
                  marginRight: SmartScreenBase.smPercenWidth * 1
                }}>
                  <Text style={{ fontWeight: "500", fontSize: SmartScreenBase.smPercenWidth * 3.5 }}>Kim cương</Text>
                  <Text style={StyleStudent.TextBold}>{DataRes.total_diamond}</Text>
                </View>
                <View style={{
                  width: SmartScreenBase.smBaseWidth * ListImageRank[this.ID_Image].width,
                  alignItems: "center",
                }}>
                  <Text style={{ fontWeight: "500", fontSize: SmartScreenBase.smPercenWidth * 3.5 }}>Hạng</Text>
                  <Text style={StyleStudent.TextBold}>{DataRes.student_rank}</Text>
                </View>
                <View style={{
                  width: SmartScreenBase.smBaseWidth * 179, alignItems: "center",
                }}>
                  <Text style={{ fontWeight: "500", fontSize: SmartScreenBase.smPercenWidth * 3.5 }}>Exp</Text>
                  <Text style={StyleStudent.TextBold}>{DataRes.total_score}</Text>
                </View>
              </View>
            </View>
            <View style={{ marginLeft: SmartScreenBase.smPercenWidth * 2, marginVertical: SmartScreenBase.smPercenHeight * 1.5 }}>
              <Text style={[StyleStudent.txt_title, { color: 'white' }]} >KỸ NĂNG</Text>
            </View>
            {/* Kỹ năng */}
            <View style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginTop: SmartScreenBase.smPercenHeight * 5
            }}>
              <View style={{
                width: SmartScreenBase.smPercenWidth * 40,
                borderRadius: SmartScreenBase.smPercenWidth * 7,
                backgroundColor: "rgba(0,0,0,0.2)",
                alignItems: "center",
                paddingTop: SmartScreenBase.smPercenHeight * 7
              }}>
                <Text style={{
                  fontWeight: "500",
                  fontSize: SmartScreenBase.smPercenWidth * 3,
                  color: "white"
                }}>TỪ VỰNG HOÀN THÀNH</Text>
                <Text style={{
                  fontWeight: "bold",
                  fontSize: SmartScreenBase.smPercenWidth * 7,
                  color: "#FFFF00",
                  textAlign: "center"
                }}>{DataRes != null ? DataRes.no_grammar_complete : 0}</Text>

                <View style={{ position: "absolute", top: -SmartScreenBase.smBaseWidth * 120 }}>
                  <Animatable.View animation={'zoomInDown'} direction="alternate" delay={300} >
                    <ViewImage Width={237} Height={237} Name={'student_achievements_image9'} />
                  </Animatable.View>
                </View>
              </View>
              <View style={{
                width: SmartScreenBase.smPercenWidth * 40,
                borderRadius: SmartScreenBase.smPercenWidth * 7,
                backgroundColor: "rgba(0,0,0,0.2)",
                alignItems: "center",
                paddingTop: SmartScreenBase.smPercenHeight * 7
              }}>
                <Text style={{
                  fontWeight: "500",
                  fontSize: SmartScreenBase.smPercenWidth * 3,
                  color: "white"
                }}>NGỮ PHÁP HOÀN THÀNH</Text>
                <Text style={{
                  fontWeight: "bold",
                  fontSize: SmartScreenBase.smPercenWidth * 7,
                  color: "#FFFF00",
                  textAlign: "center"
                }}>{DataRes != null ? DataRes.no_vocab_complete : 0}</Text>
                <View style={{ position: "absolute", top: -SmartScreenBase.smBaseWidth * 120 }}>
                  <Animatable.View animation={'zoomInDown'} direction="alternate" delay={300} >
                    <ViewImage Width={237} Height={237} Name={'student_achievements_image10'} />
                  </Animatable.View>
                </View>
              </View>
            </View>
            <View style={{ alignSelf: "center", alignItems: "center" }}>
              {process_Skill.map((item, key) => {
                return (
                  <View key={key} style={{ width: BaseWidth * 80, flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: BaseHeight * 2 }} >
                    <Text style={StyleStudent.txt_title}>{item.title}</Text>
                    <View style={styles.Sty_Process_Skill}>
                      <Animated.View style={{ backgroundColor: "yellow", width: this.state.WidthChart[key], height: BaseWidth * 3, borderRadius: BaseWidth }} />
                    </View>
                  </View>
                )
              })}
            </View>
            <View style={{ marginLeft: SmartScreenBase.smPercenWidth * 2, marginVertical: SmartScreenBase.smPercenHeight * 1.5 }}>
              <Text style={[StyleStudent.txt_title, { color: 'white' }]} >Thời gian học</Text>
            </View>
            <View style={{ alignSelf: "center" }}>
              <ViewImage Width={1022} Height={530} Name={'student_achievements_image11'} />
              <View style={{ position: "absolute", bottom: 5, width: SmartScreenBase.smPercenWidth * 75, right: 0 }}>
                <FlatList horizontal={true}
                  data={this.ValueListTimeChart}
                  keyExtractor={(item, index) => 'item' + index}
                  inverted
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item, index }) => {
                    return (
                      <View style={{ alignItems: "center", justifyContent: "flex-end", width: SmartScreenBase.smPercenWidth * 12.5 }}>
                        <Text style={StyleStudent.text}>{item}p</Text>
                        <Animatable.View ref={this.handleViewRef}>
                          <View style={{
                            width: BaseWidth * 2.5, borderRadius: BaseWidth * 2,
                            height: this.ProcessTimeChart(item), backgroundColor: "yellow"
                          }} />
                        </Animatable.View>
                        <View style={{ height: SmartScreenBase.smPercenHeight * 2 }} />
                        <View style={{ alignItems: "center" }}>
                          <ViewImage Width={81} Height={81} Name={'student_achievements_image12'} />
                          <Text style={{
                            textAlign: "center",
                            position: "absolute", color: "white", marginTop: SmartScreenBase.smPercenWidth * 2,
                            fontSize: SmartScreenBase.smPercenWidth * 2.5
                          }}>{moment(this.ListTimeChart[this.ListTimeChart.length - index - 1]).format('DD/MM')}</Text>
                        </View>
                      </View>
                    )
                  }}
                />
              </View>
              <View style={{ position: "absolute", left: SmartScreenBase.smPercenWidth * 4 }} >
                <View style={{ marginTop: SmartScreenBase.smPercenHeight * 2 }}>
                  <Text style={{ color: "white" }}>{this.ProcessMax()}</Text>
                </View>
                <View style={{ height: SmartScreenBase.smPercenHeight * 5.5 }} />
                <View>
                  <Text style={{ color: "white" }}>{this.ProcessMax() / 2}</Text>
                </View>
              </View>
            </View>
            {/* Padding */}
            <View style={{ height: SmartScreenBase.smPercenHeight * 15 }} />
          </ScrollView>
        </ImageBackground>
      </SafeAreaView>

    )
  }
  ProcessTimeChart(time) {
    let heightprocess = BaseHeight * 15 / 100;
    let NumberMax = Math.max.apply(Math, this.Chart_Week);
    let RateTime = time / NumberMax * 100;
    let NumberMaxC = Math.ceil(NumberMax / 10) * 10;
    let RateChart = NumberMax / NumberMaxC;
    if (RateTime <= 10) {
      return heightprocess * 10;
    } else {
      return heightprocess * RateTime * RateChart;
    }
  }
  ProcessMax() {
    let NumberMaxChart = Math.max.apply(Math, this.Chart_Week);
    let NumberMax = Math.ceil(NumberMaxChart / 10) * 10;
    return NumberMax;
  }
}

const mapStateToProps = state => ({
  data: state.LoadAPILogin.ProcessScreen,
  dataLogin: state.AuthStackReducer.dataLogin
});
export default connect(mapStateToProps)(processScreen);