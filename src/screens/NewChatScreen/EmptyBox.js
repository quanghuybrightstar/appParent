




























import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import FontBase from '../../base/FontBase'

const EmptyBox = () => {
  return (
    <View style={styles.container}>
      <Image
        resizeMode="contain"
        resizeMethod="auto"
        style={styles.image}
        source={require('../../assets/image/empty_messages_box.png')}
          />
          <Text style={styles.textBold}>
            Bạn chưa có tin nhắn mới
          </Text>
          <Text style={styles.textContent}>
            Ấn + để tạo tin nhắn mới
          </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 320,
    height: 300,
    alignItems: 'center',
    alignSelf: 'center'
  },
  image: {
    width: 320,
    height: 200,
    resizeMode:  'contain'
  },
  textBold: {
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 30,
    fontFamily: FontBase.MyriadPro_Bold
  },
  textContent: {
    fontSize: 16,
    textAlign: 'center',
    fontFamily: FontBase.MyriadPro_Regular

  }
})

export default EmptyBox
