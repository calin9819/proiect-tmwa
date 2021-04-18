import React, { useState, useEffect } from 'react';
import { Alert, Button, SafeAreaView, StyleSheet, Text, TextInput, View } from 'react-native';
import { Agenda, Calendar } from 'react-native-calendars';
import IEvent from '../models/IEvent.interface';
import HolidayService from '../services/holiday';
import LocalCalendarService from '../services/localCalendar';
import { dateToString } from '../utils/utils';
import CurrentDay from './CurrentDay';
type Item = {
    name: string;
    description: string;
}

const CalendarList = () => {
    const [items, setItems] = useState<{ [key: string]: Item[] }>({});
    const [selectedDay, setSelectedDay] = useState<string>("");
    const [value, setValue] = useState<string>("");
    const [eventList, setEvents] = useState<IEvent[]>([]);
    const [error, showError] = useState<Boolean>(false);
    const load = async () => {
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

    const handleSubmit = (): void => {
        if (value.trim()) {
            let itemsObject = {};
            Object.keys(items).forEach((key) => {
                itemsObject[key] = items[key];
            });
            let date = selectedDay;
            if (!itemsObject[date]) {
                itemsObject[date] = [];
            }
            itemsObject[date].push({
                name: value,
                description: ''
            });

            setItems(itemsObject);
        }
        else showError(true);
        setValue("");
    };

    return (
        <SafeAreaView style={styles.safe}>

            <View style={styles.addEventContainer}>
                <Text style={styles.title}>Event List</Text>
                <View style={styles.inputWrapper}>
                    <TextInput
                        placeholder="Enter your event title..."
                        value={value}
                        onChangeText={e => { setValue(e); }}
                        style={styles.inputBox}
                    />
                    <Button title="Add event" onPress={handleSubmit} />
                </View>
                {error && (
                    <Text style={styles.error}>Error: Input field is empty...</Text>
                )}
            </View>
            <Agenda
                items={items}
                renderItem={renderItem}
                onDayPress={day => { setSelectedDay(day.dateString) }} />
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

    addEventContainer: {
        padding: 35,
        alignItems: "center"
    },
    title: {
        fontSize: 40,
        marginBottom: 40,
    },
    addButton: {
        alignItems: "flex-end"
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
    error: {
        color: "red"
    }
})
