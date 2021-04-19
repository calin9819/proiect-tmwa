import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import colors from '../utils/colors';

const HomeScreen = ({navigation}) => {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <Text style={styles.subtitle}>What's the plan for today?</Text>
      <Button title="Go to agenda"
      onPress={() =>
        navigation.navigate('Agenda', { name: 'Agenda' })
      }
    />
    </View>
  );
}
export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    width:"100%",
    padding: 35,
    alignItems: "center",
    backgroundColor: colors.primaryColor
  },
  inputWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20
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
    backgroundColor:colors.coral
  },
  event: {
    width: 200
  },
  error: {
    color: "red"
  }
});