import React from 'react';
import {Text, View, Image} from "react-native";
import styles from "./styles";
import LinearGradient from "react-native-linear-gradient";
import FontBase from '../../base/FontBase';

const Item = (props) => {
    const {item} = props;

    return (
        <View style={styles.containerItem}>
            <LinearGradient
                colors={['#00e1a0', '#00b9b7']}
                start={{x: 0, y: 1}} end={{x: 0.5, y: 0.5}}
                style={styles.viewSkill}
            >
                <Text style={styles.textSkill}>Pronunciation</Text>
                <View style={styles.viewScore1}>
                    <View style={styles.viewScore2}>
                        <Text style={styles.textScore1}>9</Text>
                        <Text style={styles.textScore2}>Điểm</Text>
                    </View>
                </View>
            </LinearGradient>
            <View style={styles.viewContentItem}>
                <Text style={styles.textTopic}>Passive voice with the present simple</Text>
                <Text style={styles.textNameLesson}>Answer the question</Text>
                <Text style={styles.textUnit}>Unit6: The first university in Vietnam</Text>
                <Text style={styles.textLastTime}>Làm bài gần nhất <Text
                    style={{fontFamily: FontBase.MyriadPro_Bold}}>22/12/2020</Text></Text>
                <View style={styles.viewLastLine}>
                    <Text style={styles.textLevel}>Số lần làm: 2</Text>
                    <View style={styles.viewLevel}>
                        <Text style={styles.textLevel}>medium</Text>
                        <Image style={styles.iconLevel} source={{uri: 'master_unit_medium'}}/>
                    </View>
                </View>
            </View>
        </View>
    )
};

export default Item;
