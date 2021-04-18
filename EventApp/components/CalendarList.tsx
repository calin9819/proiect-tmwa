import React, { useState, useEffect } from 'react';
import { Alert, Button, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Agenda,Calendar } from 'react-native-calendars';
import HolidayService from '../services/holiday';
import LocalCalendarService from '../services/localCalendar';
import { dateToString } from '../utils/utils';
import CurrentDay from './CurrentDay';
type Item = {
    name: string;
    description: string;
}

const CalendarList = () => {
    const [items, setItems] = useState<{[key: string]: Item[]}>({});
    const [selectedDay, setSelectedDay] = useState<string>("");
    const load = async () => {
        let localCalendars = new LocalCalendarService();
        let localItems = await localCalendars.listCalendars();

        let holidayService = new HolidayService();
        try {
            let response = await holidayService.getHolidays('ro', 2021);
            let data = await response.json();
            if (data && data.response) {
                let itemsObject = {};
                Object.keys(items).forEach((key) => {
                    itemsObject[key] = items[key];
                  });
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
            <CurrentDay/>
            <Agenda 
            items={items} 
            renderItem={renderItem}
            onDayPress={day=>{setSelectedDay(day.dateString)}}/>
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
