import React from 'react';

import {
    View,
    ScrollView,
    Text,
    StyleSheet,
    PanResponder,
    Animated,
    Easing,
    InteractionManager
} from 'react-native';
import SmartScreenBase from '../../base/SmartScreenBase';
let value;

class SelectPicker extends React.Component {
    constructor (props) {
        super(props);
        /* 存储 scrollview y 轴偏移*/
        this.scrollY = 0;
        this.scrollYMAX = 0;
        this.scrollYMIN = 0;
        this.LastTimestamp = -1;

        this.state = {
            animateValue: new Animated.Value(0)
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.defaultValue != nextProps.defaultValue) {
            this.scrollToItem(nextProps.defaultValue)
        }
    }

    componentWillMount () {
        this._panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => {
                return true;
            },
            onStartShouldSetPanResponderCapture: (evt, gestureState) => {
                return true;
            },
            onMoveShouldSetPanResponder: (evt, gestureState) => {
                return true;
            },
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => {
                return true;
            },
            onPanResponderMove: (evt, gestureState) => {
                this._onMoving(gestureState);
                this.LastTimestamp = evt.nativeEvent.timestamp;
            },
            onPanResponderTerminationRequest: (evt, gestureState) => true,
            onPanResponderRelease: (evt, gestureState) => {
                this._onScrollEnd(gestureState, evt.nativeEvent.timestamp);
            }
        });
    }

    _scrollTo = ({
                     y
                 }) => {
        Animated.timing(
            this.state.animateValue,
            {
                toValue: y,
                duration: 0,
                easing: Easing.linear,
                useNativeDriver: true
            }
        ).start();
    }

    componentDidMount () {
        requestAnimationFrame(() => {
            this.scrollToItem(this.props.defaultValue);
        });
    }

    getMinScrollY = () => {
        var {itemHeight, wrapHeight, data} = this.props;
        var topSpace = (wrapHeight - itemHeight ) / 2;
        return - (data.length -1 ) * itemHeight;
    }

    /* onMoving */
    _onMoving = (gestureState) => {
        var scrollY = this.scrollY + (gestureState.moveY - gestureState.y0);

        var minY = this.getMinScrollY();
        if (scrollY > 0 ) {
            scrollY = 0;
        }

        if (scrollY < minY) {
            scrollY = minY;
        }

        this._scrollTo({
            x: 0,
            y: scrollY,
            animated: false
        });
    }

    getScrollYByCompelteItem = (y) => {
        var {itemHeight} = this.props;

        var index =  Math.abs(parseInt(y / itemHeight));
        var restPx = Math.abs(y % itemHeight);

        if (restPx > (itemHeight / 2)) {
            index++
        }

        return {
            y: - itemHeight * index,
            index: index
        };
    }

    _onScrollEnd = (gestureState, endTimestamp) => {
        var scrollY = this.scrollY + (gestureState.moveY - gestureState.y0);
        if (this.LastTimestamp > 0) {
            var speedY = scrollY + gestureState.vy * (endTimestamp - this.LastTimestamp) * 10;
            scrollY = speedY;
        }

        if (gestureState.moveY == 0 ){
            scrollY = this.scrollY;
        }

        var minY = this.getMinScrollY();
        if (scrollY > 0 ) {
            scrollY = 0;
        }

        if (scrollY < minY) {
            scrollY = minY;
        }


        var resObj = this.getScrollYByCompelteItem(scrollY);

        scrollY = resObj.y;
        this.scrollY = scrollY;
        Animated.timing(
            this.state.animateValue,
            {
                toValue: scrollY,
                duration: 200,
                easing: Easing.ease,
                useNativeDriver: true
            }
        ).start();

        this.LastTimestamp = -1;
        requestAnimationFrame(() => {
            this.props.onValueChange(this.props.data[resObj.index], resObj.index);
            value = this.props.data[resObj.index];
        });
    }

    scrollToItem = (value) => {
        var index = 0;
        var {data, itemHeight} = this.props;
        for (var i = 0; i < data.length; i++) {
            if (value === data[i]) {
                index = i;
                break;
            }
        }

        this._scrollTo({
            x: 0,
            y: - itemHeight * index,
            animated: false
        });

        this.scrollY = - itemHeight * index;
    }

    componentDidUpdate () {

        this.scrollToNomalPx();
    }

    scrollToNomalPx = () => {
        scrollY = this.scrollY;
        var minY = this.getMinScrollY();
        if (scrollY > 0 ) {
            scrollY = 0;
        }

        if (scrollY < minY) {
            scrollY = minY;
        }

        var resObj = this.getScrollYByCompelteItem(scrollY);

        scrollY = resObj.y;
        if (scrollY === this.scrollY) {
            return;
        }

        this.scrollY = scrollY;
        Animated.timing(
            this.state.animateValue,
            {
                toValue: scrollY,
                duration: 200,
                easing: Easing.ease,
                useNativeDriver: true
            }
        ).start();

        InteractionManager.runAfterInteractions(() => {
            this.props.onValueChange(this.props.data[resObj.index], resObj.index);
        });
    }

    render () {
        const {wrapHeight, wrapWidth, itemHeight, data, fontColor, fontSize, wrapStyle, maskercolor, borderStyle, fontSizeValue} = this.props;
        const maskItemHeight = (wrapHeight - itemHeight) / 2;

        return (
            <View style={[styles.wrap, {height: wrapHeight, width: wrapWidth}, wrapStyle]}>

                <Animated.View
                    style={[{
                        overflow: 'hidden',
                        transform:[{translateY: this.state.animateValue}]
                    }]}

                >
                    <View style={{height: maskItemHeight, width: wrapWidth}} ></View>
                    {
                        data.map((item, index) => {
                            return <Item fontSize={item === this.props.defaultValue ? fontSizeValue : fontSize} fontColor={fontColor} style={{alignItems: 'center', justifyContent: 'center' ,height: itemHeight, width: wrapWidth}} item={item} key={index} />
                        })
                    }
                    <View style={{height: maskItemHeight , width: wrapWidth}} ></View>
                </Animated.View>

                <View style={[styles.masker]} {...this._panResponder.panHandlers}>

                    <View style={[styles.topItem, {height: maskItemHeight, width: wrapWidth, backgroundColor: maskercolor}, borderStyle]}></View>

                    <View style={[styles.bottomItem,{height: maskItemHeight, width: wrapWidth, backgroundColor: maskercolor}, borderStyle]}></View>

                </View>
            </View>
        )
    }
}

class Item extends React.Component {
    render () {
        var {item, style, fontColor, fontSize} = this.props
        return (
            <View style={style}>
                <Text style={{ textAlign: 'center', color: fontColor, fontSize:  fontSize}}>{item}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    wrap: {
        height: 100,
        width: 50,
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'transparent'
    },
    scrollContainer: {
        alignItems: 'center' ,
        justifyContent: 'center'
    },
    masker: {
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        right: 0,
        backgroundColor: 'transparent'
    },
    topItem: {
        flex: 1,
        position: 'absolute',
        top: 0,
        right: 0,
        left: 0,
        borderBottomColor: 'rgba(0,0,0,0.2)',
    },
    bottomItem: {
        right: 0,
        left: 0,
        position: 'absolute',
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderTopColor: 'rgba(0,0,0,0.2)'
    }
});

SelectPicker.defaultProps = {
    wrapHeight: 300,
    wrapWidth: null,
    itemHeight: 100,
    data: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
    fontColor: '#444',
    fontSize: 18,
    defaultValue:'',
    wrapStyle:{},
    borderStyle: {},
    maskercolor: 'rgba(255, 255, 255, 0.5)',
    onValueChange: function (item, index) {},
};

export default SelectPicker;
