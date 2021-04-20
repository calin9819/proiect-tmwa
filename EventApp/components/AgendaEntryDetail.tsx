import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button, Modal, TouchableHighlight } from "react-native";
import colors from "../utils/colors";
import { Calendar } from "react-native-calendars";

const AgendaEntryDetail = (props) => {
    const redirectToEdit = () => {
        console.log("redirect to edit")
    };

    const redirectToDelete = () => {
        console.log("redirect to delete")
    };

    const closeShowDetails = () => {
        props.hideFunc();
    }

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
                        <View style={{ flexDirection: 'row', margin: 10 }}>
                            <View style={styles.closeButton}>
                                <Button title="Edit" onPress={redirectToEdit} color={colors.primaryColor} />
                            </View>
                            <View style={styles.closeButton}>
                                <Button title="Delete" onPress={redirectToDelete} color={colors.primaryColor} />
                            </View>
                        </View>

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
    closeButton: {
        backgroundColor: colors.peach,
        borderRadius: 10,
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