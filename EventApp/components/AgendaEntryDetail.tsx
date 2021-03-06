import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Modal,
  TouchableHighlight,
  ImageBackground,
} from "react-native";
import colors from "../utils/colors";
import { Calendar } from "react-native-calendars";
import * as SQLite from "expo-sqlite";
import { Button } from "react-native-paper";
const db = SQLite.openDatabase("events-db.db");

const AgendaEntryDetail = (props) => {
  const [deleteDialogVisible, setDeleteDialogVisible] = useState(false);

  const showDialog = () => setDeleteDialogVisible(true);

  const hideDialog = () => setDeleteDialogVisible(false);

  const redirectToEdit = () => {
    console.log("redirect to edit");
    props.goToEdit();
  };

  const redirectToDelete = async () => {
    console.log("redirect to delete");
    try {
      (await db).transaction(
        (tx) => {
          tx.executeSql("delete from events where id = ?;", [
            props.selectedItem.id,
          ]);
        },
        (error) => {
          console.log(error);
        },
        () => {
          props.reloadList();
          hideDialog();
        }
      );
    } catch (e) {
      console.log(e);
    }
    console.log(props.selectedItem);
    props.hideFunc();
  };

  const closeShowDetails = () => {
    props.hideFunc();
  };

  return (
    props.show && (
      <ImageBackground
      source={require('../assets/fundal5.jpg')}
          style={styles.background}>
        <View style={styles.container}>
          <Modal animationType="fade" transparent={false} visible={props.show}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.title}>{props.selectedItem.name}</Text>
                <Calendar
                  current={props.selectedItem.date}
                  markedDates={props.markedDay}
                />
                <Text style={styles.subtitle}>
                  Description: {props.selectedItem.description}
                </Text>
                {props.selectedItem.id >= 0 ? (
                  <View style={{ flexDirection: "row", margin: 10 }}>
                    <Button
                      onPress={redirectToEdit}
                      style={styles.editButton}
                      color={colors.primaryColor}
                    >
                      Edit
                    </Button>

                    <Button
                      onPress={redirectToDelete}
                      style={styles.deleteButton}
                      color={colors.primaryColor}
                    >
                      Delete
                    </Button>
                  </View>
                ) : null}

                <Button onPress={closeShowDetails}>Close</Button>
              </View>
            </View>
          </Modal>
        </View>
        </ImageBackground>
    )
  );
};
export default AgendaEntryDetail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "95%",
    height: "80%",
    borderRadius: 5,
    alignItems: "center",
    shadowColor:  colors.grey,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 30,
    marginTop: 30,
    marginBottom: 40,
    color: colors.accentColor,
    fontFamily: "bebas-neue",
  },
  subtitle: {
    fontSize: 15,
    marginBottom: 20,
    fontFamily: "open-sans",
    textAlign: "justify",
    padding: 5,
    margin: 5,
  },
  editButton: {
    backgroundColor: colors.accentColor,
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    fontWeight: "bold",
    margin: 10,
  },
  deleteButton: {
    backgroundColor: colors.coral,
    borderRadius: 5,
    padding: 10,
    elevation: 2,
    fontWeight: "bold",
    margin: 10,
  },
  textStyleButton: {
    color: colors.primaryColor,
    fontWeight: "bold",
    textAlign: "center",
  },
  background: {
    width: '100%',
    height: '100%'
  }
});
