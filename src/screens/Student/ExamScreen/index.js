import React, {useState, useEffect, useRef} from 'react';
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Dimensions, Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import style from './style';
import styleButton from '../../../styleApp/stylesApp';
const {height, width} = Dimensions.get('window');

const ExamScreen = (props) => {
    return (
        <ImageBackground source={{uri: 'map_07'}} style={{flex: 1}}>
            <View style={{flex: 1}}>
                <LinearGradient colors={['#FFFFFF','#FFFFFF','#FFFFFF','#ffffff30']}
                                style={{
                                    height: (height / 2),
                                    width: width,
                                }}>
                    <View style={style.header_1}>
                        <Text style={style.fontFamilyText}>
                            BẠN ĐÃ HOÀN THÀNH BÀI TEST
                        </Text>
                    </View>
                </LinearGradient>
                <View style={style.levelAchieved}>
                    <Text style={style.fontFamilyText3}>Bạn dừng ở mức: </Text>
                    <Text style={style.fontFamilyText2}>TRUNG BÌNH</Text>


                </View>
                <View style={style.styleBody}>
                    <View style={style.Result}>
                        <View style={style.Resultpoint}>
                            <Text style={style.fontFamilyText3}>Số câu đúng</Text>
                        </View>
                        <View style={style.sty_Resultpoint}>
                            <Text style={style.fontFamilyText3}>10/10</Text>
                        </View>
                    </View>
                    <View style={style.Result}>
                        <View style={style.Resultpoint}>
                            <Text style={style.fontFamilyText3}>Điểm</Text>
                        </View>
                        <View style={style.sty_Resultpoint}>
                            <Text style={style.fontFamilyText3}>10</Text>
                        </View>
                    </View>
                    <View style={style.Result}>
                        <View style={style.Resultpoint}>
                            <Text style={style.fontFamilyText3}>Thời gian</Text>
                        </View>
                        <View style={style.sty_Resultpoint}>
                            <Text style={style.fontFamilyText3}>15:00</Text>
                        </View>
                    </View>
                    <View style={style.styleTime}>
                        <TouchableOpacity
                            style={styleButton.Sty_Button}>
                            <Text style={styleButton.Sty_Text_Button}>Vào thi </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
};
export default ExamScreen;
