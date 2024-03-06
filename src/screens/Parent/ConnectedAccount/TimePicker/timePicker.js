import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  Platform,
  TextInput,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {Component} from 'react';
import {SafeAreaView} from 'react-native';
import IconBack from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {sliderWidth, itemWidth} from '../test/styles/SliderEntry.style';
import SliderEntry from '../test/Component/SliderEntry';
import styles, {colors} from '../test/styles/index.style';
let data = [
  {
    subtitle: '00',
  },
  {
    subtitle: '01',
  },
  {
    subtitle: '02',
  },
  {
    subtitle: '03',
  },
  {
    subtitle: '04',
  },
  {
    subtitle: '05',
  },
  {
    subtitle: '06',
  },
  {
    subtitle: '07',
  },
  {
    subtitle: '08',
  },
  {
    subtitle: '09',
  },
  {
    subtitle: '10',
  },
  {
    subtitle: '11',
  },
  {
    subtitle: '12',
  },
  {
    subtitle: '13',
  },
  {
    subtitle: '14',
  },
  {
    subtitle: '15',
  },
  {
    subtitle: '16',
  },
  {
    subtitle: '17',
  },
  {
    subtitle: '18',
  },
  {
    subtitle: '19',
  },
  {
    subtitle: '20',
  },
  {
    subtitle: '21',
  },
  {
    subtitle: '22',
  },
  {
    subtitle: '23',
  },
];
let data1 = [
  {
    subtitle: '00',
  },
  {
    subtitle: '01',
  },
  {
    subtitle: '02',
  },
  {
    subtitle: '03',
  },
  {
    subtitle: '04',
  },
  {
    subtitle: '05',
  },
  {
    subtitle: '06',
  },
  {
    subtitle: '07',
  },
  {
    subtitle: '08',
  },
  {
    subtitle: '09',
  },
  {
    subtitle: '10',
  },
  {
    subtitle: '11',
  },
  {
    subtitle: '12',
  },
  {
    subtitle: '13',
  },
  {
    subtitle: '14',
  },
  {
    subtitle: '15',
  },
  {
    subtitle: '16',
  },
  {
    subtitle: '17',
  },
  {
    subtitle: '18',
  },
  {
    subtitle: '19',
  },
  {
    subtitle: '20',
  },
  {
    subtitle: '21',
  },
  {
    subtitle: '22',
  },
  {
    subtitle: '23',
  },
  {
    subtitle: '24',
  },
  {
    subtitle: '25',
  },
  {
    subtitle: '26',
  },
  {
    subtitle: '27',
  },
  {
    subtitle: '28',
  },
  {
    subtitle: '29',
  },
  {
    subtitle: '30',
  },
  {
    subtitle: '31',
  },
  {
    subtitle: '32',
  },
  {
    subtitle: '33',
  },
  {
    subtitle: '34',
  },
  {
    subtitle: '35',
  },
  {
    subtitle: '36',
  },
  {
    subtitle: '37',
  },
  {
    subtitle: '38',
  },
  {
    subtitle: '39',
  },
  {
    subtitle: '40',
  },
  {
    subtitle: '41',
  },
  {
    subtitle: '42',
  },
  {
    subtitle: '43',
  },
  {
    subtitle: '44',
  },
  {
    subtitle: '45',
  },
  {
    subtitle: '46',
  },
  {
    subtitle: '47',
  },
  {
    subtitle: '48',
  },
  {
    subtitle: '49',
  },
  {
    subtitle: '50',
  },
  {
    subtitle: '51',
  },
  {
    subtitle: '52',
  },
  {
    subtitle: '53',
  },
  {
    subtitle: '54',
  },
  {
    subtitle: '55',
  },
  {
    subtitle: '56',
  },
  {
    subtitle: '57',
  },
  {
    subtitle: '58',
  },
  {
    subtitle: '59',
  },
];
const {width, height} = Dimensions.get('screen');
import {Calendar, LocaleConfig} from 'react-native-calendars';
import moment from 'moment';
class timePicker extends Component {
  static navigationOptions = ({navigation}) => {
    const {params = {}} = navigation.state;
    return {
      header: null,
    };
  };
  constructor(props) {
    super(props);
    this.state = {
      time: '',
      CheckWeek: true,
      CheckMonth: false,
      CheckOther: false,
      isShowDate: false,
      selectedStartDate: null,
      checkday: 'from',
      count: 0,
      money: null,
      endDay: '',
      hour: 0,
      minus: 0,
      startDay: '',
      markedDates: {},
      dateSelectFrom: 'Bắt đầu',
      dateSelectTo: 'Kết thúc',
      isCalendaTo: false,
      corlorTextfrom: '#fff',
      corlorTextTo: '#a5a5a5ff',
      ShowAlert: false,
      Message: '',
      search: '',
    };
  }
  _renderItemWithParallax({item, index}, parallaxProps) {
    return (
      <SliderEntry data={item} parallax={true} parallaxProps={parallaxProps} />
    );
  }
  get gradient() {
    return (
      <LinearGradient
        colors={[colors.background1, colors.background2]}
        startPoint={{x: 1, y: 0}}
        endPoint={{x: 0, y: 1}}
        style={styles.gradient}
      />
    );
  }
  componentDidMount(): void {}
  _onDayPress = day => {
    let date = {};
    date[`${day.dateString}`] = {selected: true, selectedColor: '#000'};
    if (this.state.isCalendaTo) {
      if (day.dateString < this.state.dateSelectFrom) {
        return this.setState({
          ShowAlert: true,
          Message: 'Vui lòng chọn lại ngày',
        });
      }
      this.setState({
        markedDates: date,
        dateSelectTo: day.dateString,
        corlorTextTo: '#a5a5a5ff',
      });
    } else {
      if (day.dateString > this.state.dateSelectTo) {
        return this.setState({
          ShowAlert: true,
          Message: 'Vui lòng chọn lại ngày',
        });
      }
      this.setState({
        markedDates: date,
        dateSelectFrom: day.dateString,
        corlorTextfrom: '#a5a5a5ff',
        corlorTextTo: '#FFF',
        checkday: 'to',
        isCalendaTo: true,
      });
    }
  };
  _onCheckDateFrom = () => {
    this.setState({
      checkday: 'from',
      isCalendaTo: false,
      markedDates: {},
      corlorTextfrom: '#fff',
      corlorTextTo: '#a5a5a5ff',
    });
  };
  onCancel() {
    this.TimePicker.close();
  }
  _onCheckDateTo = () => {
    this.setState({
      checkday: 'to',
      isCalendaTo: true,
      markedDates: {},
      corlorTextTo: '#fff',
      corlorTextfrom: '#a5a5a5ff',
    });
  };

  render1() {
    const from =
      this.state.dateSelectFrom === 'Bắt đầu'
        ? 'Bắt đầu  '
        : moment(this.state.dateSelectFrom).format('DD-MM-YYYY');
    const to =
      this.state.dateSelectTo === 'Kết thúc'
        ? 'Kết thúc'
        : moment(this.state.dateSelectTo).format('DD-MM-YYYY');
    return (
      <View style={{flex: 1, marginTop: Platform.OS === 'ios' ? 35 : 0,}}>
        <View
          style={{
            width: '100%',
            height: '15%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '88%',
              height: '35%',
              backgroundColor: '#017CA4',
              flexDirection: 'row',
              borderRadius: 10,
            }}>
            <TouchableOpacity
              style={{
                height: '100%',
                width: '45%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={this._onCheckDateFrom}>
              <Text style={{color: this.state.corlorTextfrom, fontSize: 20}}>
                B.ĐẦU
              </Text>
            </TouchableOpacity>
            <View
              style={{
                height: '100%',
                width: '10%',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <IconBack name="right" size={25} color="#a5a5a5ff" />
            </View>
            <TouchableOpacity
              style={{
                height: '100%',
                width: '45%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={this._onCheckDateTo}>
              <Text style={{color: this.state.corlorTextTo, fontSize: 20}}>
                K.THÚC
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: '80%',
              height: '25%',
              justifyContent: 'center',
              marginTop: '2%',
              flexDirection: 'row',
            }}>
            {this.state.checkday === 'from' ? (
              <Text style={{fontSize: 15, fontWeight: 'bold'}}>{from} </Text>
            ) : (
              <Text style={{fontSize: 15, fontWeight: 'bold'}}>{to} </Text>
            )}
            <Text>{this.state.time}</Text>
          </View>
        </View>

        <View style={{paddingHorizontal: 20, height: '70%'}}>
          <Calendar
            markedDates={this.state.markedDates}
            theme={{
              arrowColor: '#000',
              todayTextColor: 'blue',
              selectedDayTextColor: '#FFF',
              monthTextColor: '#000',
              textMonthFontSize: 14,
              textDayFontSize: 15,
              textDayHeaderFontSize: 18,
            }}
            onDayPress={this._onDayPress}
          />
          <View
            style={{
              width: '100%',
              height: '50%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={styles.exampleContainer}>
              <View
                style={{width: '45%', height: '100%', position: 'relative'}}>
                <Carousel
                  ref={c => (this._slider1Ref = c)}
                  data={data}
                  renderItem={this._renderItemWithParallax}
                  sliderHeight={sliderWidth / 2.2}
                  itemHeight={itemWidth / 4.2}
                  vertical={true}
                  useScrollView={true}
                  enableMomentum={true}
                  activeAnimationType={'spring'}
                  inactiveSlideOpacity={0.3}
                  inactiveSlideScale={0.5}
                  onSnapToItem={index => {
                    this.setState({hour: index});
                  }}
                />
              </View>

              <View
                style={{
                  width: '10%',
                  height: '100%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 50, fontWeight: 'bold'}}>:</Text>
              </View>
              <View style={{width: '45%', height: '100%'}}>
                <Carousel
                  ref={c => (this._slider1Ref = c)}
                  data={data1}
                  renderItem={this._renderItemWithParallax}
                  sliderHeight={sliderWidth / 2.2}
                  itemHeight={itemWidth / 4.2}
                  vertical={true}
                  useScrollView={true}
                  enableMomentum={true}
                  inactiveSlideOpacity={0.3}
                  inactiveSlideScale={0.5}
                  activeAnimationType={'spring'}
                  onSnapToItem={index => {
                      this.setState({minus: index})
                  }
                  }
                />
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            height: '10%',
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              height: '60%',
              width: '60%',
              paddingHorizontal: 20,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: '#000022',
              borderRadius: width * 35,
            }}>
            <Text style={{fontSize: 25, color: '#FFF', fontWeight: 'bold'}}>
              Xong
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  render() {
    const {selectedStartDate} = this.state;
    const startDate = selectedStartDate ? selectedStartDate.toString() : '';
    return (
      <View
        style={{
          flex: 1,
          marginTop: Platform.OS === 'ios' ? 35 : 0,
          backgroundColor: '#fff',
        }}>
        {this.render1()}
      </View>
    );
  }
}

export default timePicker;
