import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Agenda } from 'react-native-calendars';

type Item = {
    name: string;
}

const CalendarList = () => {
    const [items, setItems] = useState<{[key: string]: Item[]}>({
        '2021-04-17': [{ name: 'test1' }, { name: 'test11' }],
        '2021-04-18': [{ name: 'test2' }],
        '2021-04-20': [{ name: 'test1' }, { name: 'test11' }],
        '2021-04-21': [{ name: 'test2' }]
    });
 
    const renderItem = (item: Item) => {
        return (
            <View style={styles.itemContainer}>
                <Text>{item.name}</Text>
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.safe}>
            <Agenda items={items} renderItem={renderItem}/>
        </SafeAreaView>
    );
}

export default CalendarList;

const styles = StyleSheet.create({
    safe: {
        width: '100%',
        flex: 1,
    },
    itemContainer: {
        backgroundColor: 'white',
        margin: 5,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        padding: 25,
        position: 'relative',
        top: 15
    },
})
