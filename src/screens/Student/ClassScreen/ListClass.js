import React, {useRef} from 'react';
import {View, Image, Text} from 'react-native';
import Carousel from "react-native-snap-carousel/src/carousel/Carousel";
import SmartScreenBase from "../../../base/SmartScreenBase";
import styles from "./styles";
import strUtils from '../../../utils/stringUtils';

const ListClass = (props) => {
    const {data, _onSnapCarousel, currentIndex,_onStartScrollCarousel} = props;
    const refCarouser = useRef();

    const _renderStringNumber = (number) => {
        //return (number.toString().length === 0 ? '0' : '') + number;
        return number>9?String(number):`0${number}`
    };

    const _renderItem = ({item, index}) => {
        console.log('item',item)
        const dateCreated = new Date(item.start_time.split(' ')[0]);
        const dateEnd = new Date(item.end_time.split(' ')[0]);
        return (
            <View style={styles.carouselContainer}>
            <View style={styles.itemCarouselHeader}>
                <Image source={{uri: strUtils.getLink(item.class_avatar)}}
                       style={[styles.imageItemCarouselHeader,{
                            resizeMode: 'cover',
                       }]}
                />
                <View style={styles.contentItemCarouselHeader}>
                    <View style={styles.viewNameClassItemCarouselHeader}>
                        <Text style={styles.textNameClassItemCarouselHeader} numberOfLines={3}>{item.class_name}</Text>
                    </View>
                    {/* <Text style={styles.textDateItemCarouselHeader} numberOfLines={1}>
                        {`${_renderStringNumber(dateCreated.getDate())}/${_renderStringNumber(dateCreated.getMonth() + 1)}/${dateCreated.getFullYear()} - ${_renderStringNumber(dateEnd.getDate())}/${_renderStringNumber(dateEnd.getMonth() + 1)}/${dateEnd.getFullYear()}`}
                    </Text> */}
                    <Text style={styles.textGradeItemCarouselHeader} numberOfLines={1}>{item.curriculum_name}</Text>
                </View>
            </View>
            </View>
        )
    };

    return (
        <View style={styles.containerHeader}>
            <Carousel
                ref={refCarouser}
                data={data}
                sliderWidth={SmartScreenBase.smPercenWidth * 100}
                itemWidth={SmartScreenBase.smPercenWidth * 85}
                renderItem={_renderItem}
                onBeforeSnapToItem={_onStartScrollCarousel}

                // onSnapToItem={_onEndScrollCarousel}
                onSnapToItem={_onSnapCarousel}
                currentIndex={currentIndex}
            />
        </View>
    )
};

export default ListClass;
