import React from "react";
import { ActivityIndicator, StyleSheet, Dimensions, View } from "react-native";

const { width, height } = Dimensions.get('window');

const LoadingScreen = (props) => (
  <View style={[styles.container, styles.horizontal, props.height && {height: props.height}]}>
    <ActivityIndicator size="large" />
  </View>
);

export const LoadingScreen2 = (props) => (
  <View style={{
    backgroundColor:'rgba(0,0,0,0)',
    position:'absolute',
    left:0,
    top:0,
    bottom:0,
    right:0,
    justifyContent:'center',
    alignItems:'center',
    ...props.style
  }}>
    <ActivityIndicator size="large" color='#fff' />
  </View>
);

const styles = StyleSheet.create({
  container: {
    height: height,
    width: width,
    justifyContent: "center",
    backgroundColor: '#ffffff60',
    position: 'absolute',
    top: 0,
    zIndex:10000000
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});

export default LoadingScreen;
