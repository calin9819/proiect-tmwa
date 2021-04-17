import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Agenda } from 'react-native-calendars';
import HolidayService from '../services/holiday';

type Item = {
    name: string;
    description: string;
}

const CalendarList = () => {
    const [items, setItems] = useState<{[key: string]: Item[]}>({});

    const load = async () => {
        let holidayService = new HolidayService();
        try {
            let response = await holidayService.getHolidays('ro', 2021);
            let data = await response.json();
            if (data && data.response) {
                let itemsObject = {};
                for (let holiday of data.response.holidays) {
                    let date = holiday.date.iso;
                    if (!itemsObject[date]) {
                        itemsObject[date] = [];
                    }
                    itemsObject[date].push({
                        name: holiday.name,
                        description: holiday.description
                    });
                }
                
                setItems(itemsObject);
            }
        }
        catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        load();
    }, []);
 
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
