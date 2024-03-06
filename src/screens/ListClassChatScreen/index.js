import React, { useCallback, useState } from 'react';
import { View, Text, ImageBackground, Image, FlatList, } from 'react-native';
import { styles, width, height } from './style';
import LinearGradient from 'react-native-linear-gradient';
const ListClassChatScreen = () => {
    const [dataListClass, setDataListClass] = useState([{ classname: 'asdas', image: '', school: '', class: '', status: false }, { classname: 'asdas', image: '', school: '', class: '', status: true }])

    const _renderItem = ({ item, index }) => {
        return (
            <View style={{
                borderRadius: 25,
                height: height / 6,
                backgroundColor: '#fff',
                marginBottom: 15,
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 5,
                justifyContent: 'center',
                marginHorizontal: 5,
                padding: 10
            }}>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Image source={{ uri: 'ngv_64' }} style={{ width: '40%', height: '100%', resizeMode: 'contain', borderRadius: 15, }} />
                    <View style={{ height: '100%', width: '55%', justifyContent: 'space-between' }}>
                        <LinearGradient start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }} colors={['#00B9B7', '#00E2A0']} style={{ width: '100%', padding: 10, borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#fff', width: "85%", textAlign: 'center', textTransform: 'uppercase' }} numberOfLines={1}>Lop 8A15</Text>
                        </LinearGradient>
                        <View>
                            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Truong TH S LE LOI</Text>
                            <Text style={{ fontSize: 16 }}>Lop <Text style={{ fontWeight: 'bold', fontSize: 16, color: item.status ? '#00A69C' : '#BE1E2D', textTransform: 'uppercase' }}>{item.status ? 'online' : 'offline'}</Text></Text>
                        </View>
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-end' }}>
                            <ImageBackground source={{ uri: 'chuong1' }} style={{ width: width / 14, resizeMode: 'contain', height: width / 14, marginRight: 10 }}>
                                <View style={{ backgroundColor: '#BE1E2D', width: width / 30, height: width / 30, borderRadius: 50, position: 'absolute', bottom: 0, right: -width / 60 }}>

                                </View>
                            </ImageBackground>
                            <ImageBackground source={{ uri: 'chat1' }} style={{ width: width / 14, resizeMode: 'contain', height: width / 14 }}>
                                <View style={{ backgroundColor: '#BE1E2D', width: width / 30, height: width / 30, borderRadius: 50, position: 'absolute', bottom: 0, right: -width / 60 }}>

                                </View>
                            </ImageBackground>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
    return (
        <ImageBackground style={styles.container} source={{ uri: 'bghome' }}>
            <Image source={{ uri: 'logo_gv' }} style={{ width: width / 2, height: width / 2, resizeMode: 'contain', position: 'absolute', top: -width / 20, left: -width / 30, }} />
            <View style={{ flex: 1, marginTop: height / 4.2, width, paddingHorizontal: 20 }}>
                <FlatList
                    data={dataListClass}
                    renderItem={_renderItem}
                />
            </View>
        </ImageBackground>
    );
}
export default ListClassChatScreen