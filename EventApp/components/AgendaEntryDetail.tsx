import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button, Modal, TouchableHighlight } from "react-native";
import colors from "../utils/colors";
import { Calendar } from "react-native-calendars";
import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabase("events-db.db");

const AgendaEntryDetail = (props) => {
    const redirectToEdit = () => {
        console.log("redirect to edit")
    };

    const redirectToDelete = async() => {
        console.log("redirect to delete")
          try {
            (await db).transaction((tx) => {
              tx.executeSql("delete from events where id = ?;", [
                props.selectedItem.id
              ]);
            }, (error)=>{console.log(error)}, () => {
             
            });
          } catch (e) {
            console.log(e);
          }
        console.log(props.selectedItem)
        props.hideFunc();
    };

    const closeShowDetails = () => {
        props.hideFunc();
    }

    const [isEditAvaible] = props.selectedItem? props.selectedItem.id ? useState(true) : useState(false) : useState(false)
    

    return (
        props.show &&
        <View style={styles.container}>
            <Modal animationType="fade" transparent={false} visible={props.show}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.title}>{props.selectedItem.name}</Text>
                        <Calendar
                            current={props.selectedItem.date} 
                            markedDates={props.markedDay}/>
                        <Text style={styles.subtitle}>Description: {props.selectedItem.description}</Text>
                         { isEditAvaible ? (
                        <View style={{ flexDirection: 'row', margin: 10 }}>
                            <View style={styles.editButton}>
                                <Button title="Edit" onPress={redirectToEdit} color={colors.green} />
                            </View> 
                           
                            <View style={styles.deleteButton}>
                                <Button title="Delete" onPress={redirectToDelete} color={colors.red} />
                            </View>
                        </View> ) : null }

                        <Button title="Close" onPress={closeShowDetails} />
                    </View>
                </View>
            </Modal>
        </View>
    );
}
export default AgendaEntryDetail;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.primaryColor
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalView: {
        width: '90%',
        height: '80%',
        backgroundColor: 'white',
        borderRadius: 5,
        alignItems: 'center',
        shadowColor: '#000',
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
        fontFamily: 'bebas-neue'
    },
    subtitle: {
        fontSize: 15,
        marginBottom: 20,
        fontFamily: 'open-sans',
        textAlign: 'justify',
        padding: 5,
        margin: 5
    },
    editButton: {
        backgroundColor: colors.green,
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        fontWeight: 'bold',
        margin: 10
    },
    deleteButton: {
        backgroundColor: colors.red,
        borderRadius: 5,
        padding: 10,
        elevation: 2,
        fontWeight: 'bold',
        margin: 10
    },
    textStyleButton: {
        color: colors.primaryColor,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});