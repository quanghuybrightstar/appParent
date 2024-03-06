import React, {Component} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {sliderWidth, itemWidth} from './styles/SliderEntry.style';
import SliderEntry from './Component/SliderEntry';
import styles, {colors} from './styles/index.style';
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
export default class example extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hour: 0,
      minus: 0,
    };
  }

  _renderItemWithParallax({item, index}, parallaxProps) {
    return (
      <SliderEntry
        data={item}
        even={choose}
        parallax={true}
        parallaxProps={parallaxProps}
      />
    );
  }

  mainExample(number, title) {
    const {hour, minus} = this.state;

    return (
      <View
        style={{
          width: '100%',
          height: '50%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text>
          {this.state.hour}: {this.state.minus}
        </Text>
        <View style={styles.exampleContainer}>
          <View style={{width: '45%', height: '100%', position: 'relative'}}>
            <Carousel
              ref={c => (this._slider1Ref = c)}
              data={data}
              renderItem={this._renderItemWithParallax}
              sliderHeight={sliderWidth / 1.4}
              itemHeight={itemWidth / 3}
              vertical={true}
              useScrollView={true}
              enableMomentum={true}
              activeAnimationType={'spring'}
              inactiveSlideOpacity={0.3}
              inactiveSlideScale={0.5}
              onSnapToItem={index => {
                this.setState({hour: index});
                choose = index;
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
              sliderHeight={sliderWidth / 1.4}
              itemHeight={itemWidth / 3}
              vertical={true}
              useScrollView={true}
              enableMomentum={true}
              inactiveSlideOpacity={0.3}
              inactiveSlideScale={0.5}
              activeAnimationType={'spring'}
              onSnapToItem={index => this.setState({minus: index})}
            />
          </View>
        </View>
      </View>
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

  render() {
    const example1 = this.mainExample(
      1,
      'Default layout | Loop | Autoplay | Parallax | Scale | Opacity | Pagination with tappable dots',
    );

    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>{example1}</View>
      </SafeAreaView>
    );
  }
}
