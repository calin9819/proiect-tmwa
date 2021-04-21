import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, ImageBackground } from "react-native";
import { Button } from "react-native-paper";
import colors from '../utils/colors';

const HomeScreen = ({ navigation }) => {

  return (
    <ImageBackground
    source={require('../assets/fundal5.jpg')}
        style={styles.background}>
    <View style={styles.container}>
      <View style={styles.centeredView}>
        <Text style={styles.title}>Welcome!</Text>
        <Text style={styles.subtitle}>What's the plan for today?</Text>
        <Button
          style={styles.buttonStyle}
          color={colors.primaryColor}
          onPress={() => navigation.navigate('Agenda', { name: 'Agenda' })}>Go to agenda</Button>
      </View>
    </View>
    </ImageBackground>

  );
}
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  
  },
  inputWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30
  },
  inputBox: {
    width: 200,
    borderRadius: 3,
    borderWidth: 1,
    paddingLeft: 8
  },
  title: {
    fontSize: 40,
    marginBottom: 40,
    color: colors.accentColor,
    fontFamily: 'bebas-neue'
  },
  subtitle: {
    fontSize: 20,
    marginBottom: 20,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 10
  },
  button: {
    alignItems: "flex-end",
    backgroundColor: colors.coral
  },
  event: {
    width: 200
  },
  error: {
    color: "red"
  },
  buttonStyle: {
    backgroundColor: colors.coral,
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    fontWeight: "bold",
    margin: 10,
  },
  background: {
    width: '100%',
    height: '100%'
  }
});