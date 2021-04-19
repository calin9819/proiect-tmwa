import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";

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
            <Text style={styles.title}>Name: {props.selectedItem.name}</Text>
            <Text style={styles.subtitle}>Description: {props.selectedItem.description}</Text>
            <Text style={styles.subtitle}>Date: {props.selectedItem.date}</Text>
            <Button title="Close" onPress={closeShowDetails} />
            <Button title="Edit" onPress={redirectToEdit} />
            <Button title="Delete" onPress={redirectToDelete} />
        </View>
    );
}
export default AgendaEntryDetail;

const styles = StyleSheet.create({
    container: {
        padding: 35,
        alignItems: "center"
    },
    title: {
        fontSize: 40,
        marginBottom: 40,
    },
    subtitle: {
        fontSize: 20,
        marginBottom: 20,
    }
});