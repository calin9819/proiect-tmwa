import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, SafeAreaView, ImageBackground } from "react-native";
import { TextInput, HelperText, Button, Snackbar } from "react-native-paper";
import colors from "../utils/colors";
import * as SQLite from "expo-sqlite";
import utils from "../utils/utils";
import { Database } from 'expo-sqlite';

const db = SQLite.openDatabase("events-db.db");

const EventDetails = ({ navigation, route }) => {
  const [id, setId] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(utils.dateToString(new Date()));
  const [errorMessage, setErrorMessage] = useState("Name is required!");
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  console.log(route);

  useEffect(() => {
    if (route && route.params && route.params.selectedItem) {
      let item = route.params.selectedItem;
      setIsEdit(true);
      setId(item.id);
      setName(item.name);
      setDescription(item.description);
      setDate(item.date);
    }
  }, [])

  const checkForErrors = () => {
    if (name === "") {
      setErrorMessage("Name is required!");
      setSnackbarVisible(true);
      return true;
    } else if (description === "") {
      setErrorMessage("Description is required!");
      setSnackbarVisible(true);
      return true;
    } else if (date === "") {
      setErrorMessage("Date is required!");
      setSnackbarVisible(true);
      return true;
    } else {
      if (!/([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/.test(date)) {
        setErrorMessage('Date format must be "YYYY-MM-DD"!');
        setSnackbarVisible(true);
        return true;
      }
    }

    setErrorMessage("");
    setSnackbarVisible(false);
    return false;
  };

  const addEvent = async () => {
    let hasErrors = checkForErrors();
    if (!hasErrors) {
      try {
        (await db).transaction((tx) => {
          tx.executeSql("insert into events (name, description, date) values (?, ?, ?)", [
            name,
            description,
            date,
          ]);
        }, (error)=>{console.log(error)}, () => {
          navigation.popToTop();
          navigation.navigate("Agenda", {name: "Agenda"});
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  const editEvent = async () => {
    let hasErrors = checkForErrors();
    if (!hasErrors) {
      try {
        (await db).transaction((tx) => {
          tx.executeSql("update events set name = ?, description = ?, date = ? where id = ?", [
            name,
            description,
            date,
            id
          ]);
        }, (error)=>{console.log(error)}, () => {
          navigation.popToTop();
          navigation.navigate("Agenda", {name: "Agenda"});
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <ImageBackground
    source={require('../assets/fundal5.jpg')}
        style={styles.background}>
    <SafeAreaView style={styles.safe}>
      
      <View style={styles.centeredView}>
      <TextInput
        style={styles.inputWrapper}
        label="Event name"
        value={name}
        onChangeText={(text) => setName(text)}
        selectionColor={colors.accentColor}
        underlineColor={colors.coral}
        underlineColorAndroid={colors.coral}
        left={<TextInput.Icon name="pencil" color={colors.coral} />}
        theme={{colors:{accent:colors.accentColor, primary: colors.accentColor}}}
      />
      <TextInput
        style={styles.inputWrapper}
        label="Event description"
        value={description}
        onChangeText={(text) => setDescription(text)}
        selectionColor={colors.accentColor}
        underlineColor={colors.coral}
        underlineColorAndroid={colors.coral}
        multiline={true}
        left={<TextInput.Icon name="pencil" color={colors.coral} onPress={() => {}} />}
        theme={{colors:{accent:colors.accentColor, primary: colors.accentColor}}}
      />
      <TextInput
        style={styles.inputWrapper}
        label="Date"
        value={date}
        selectionColor={colors.accentColor}
        underlineColor={colors.coral}
        underlineColorAndroid={colors.coral}
        onChangeText={(text) => setDate(text)}
        left={<TextInput.Icon name="calendar" color={colors.coral} onPress={() => {}} />}
        theme={{colors:{accent:colors.accentColor, primary: colors.accentColor}}}
      />
      <HelperText style={styles.helperText} type="info">
        Date format must be "YYYY-MM-DD"
      </HelperText>


      <Button style={styles.button} onPress={isEdit ? editEvent : addEvent} color="#ffffff">
        {isEdit ? "Save changes" : "Add event"}
      </Button>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => {
          setSnackbarVisible(false);
        }}
        style={styles.errorMessage}
      >
        {errorMessage}
      </Snackbar>
      </View>
    </SafeAreaView>
    </ImageBackground>
  );
};
export default EventDetails;

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%'
  },
  safe: {
    margin:30,
    justifyContent:"center",
    alignContent: "center",
    flex: 1,
    borderRadius:10,
  },
  container: {
    padding: 35,
    alignItems: "center",
    width: "100%",
  },
  button: {
    backgroundColor: colors.accentColor,
    margin: 15,
  },
  centeredView: {
    flex: 1,
    marginTop:60
  
  },
  errorMessage: {
    marginBottom: 750,
  },
  helperText: {
    marginLeft: 15,
  },
  inputWrapper: {
    margin: 15,
    marginTop: 20,
    marginBottom: 0,
    backgroundColor: colors.grey,
    shadowOpacity:0.1,
  },
  inputBox: {
    width: 200,
    borderRadius: 3,
    borderWidth: 1,
    paddingLeft: 8,
  },
  title: {
    fontSize: 40,
    marginBottom: 40,
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
    marginBottom: 10,
  },
  addButton: {
    alignItems: "flex-end",
  },
  event: {
    width: 200,
  },
  error: {
    color: "red",
  },
});
