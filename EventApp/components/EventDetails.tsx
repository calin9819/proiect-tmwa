import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import CalendarList from './CalendarList';
import IEvent from '../models/IEvent.interface'
import { dateToString } from '../utils/utils'
import LocalCalendarService from '../services/localCalendar';

const EventDetails = (props) => {

  const [value, setValue] = useState<string>("");
  const [eventList, setEvents] = useState<IEvent[]>([]);
  const [error, showError] = useState<Boolean>(false);

  let calendarService = new LocalCalendarService();
  const handleSubmit = (): void => {
    if (value.trim()) {
      setEvents([...eventList, { text: value, completed: false, date: props.selectedDay }]);
      calendarService.addCalendarEvent({ text: value, completed: false, date: dateToString(new Date()) })
    }
    else showError(true);
    setValue("");
  };
  const removeItem = (index: number): void => {
    const newEventList = [...eventList];
    newEventList.splice(index, 1);
    setEvents(newEventList);
  };

  const toggleComplete = (index: number): void => {
    const newEventList = [...eventList];
    newEventList[index].completed = !newEventList[index].completed;
    setEvents(newEventList);
  };

  const saveEvents=()=>{
    const newEvents = [...eventList]
  }
  useEffect(()=>{
    //props.eventList.setParams({save: saveEvents});
  })

  return (
    <View style={styles.container}>
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
      <Text style={styles.subtitle}>Your events for today:</Text>
      {eventList.length === 0 && <Text>No events available</Text>}
      {eventList.map((event: IEvent, index: number) => (
        <View style={styles.listItem} key={`${index}_${event.text}`}>
          <Text
            style={[
              styles.event,
              { textDecorationLine: event.completed ? "line-through" : "none" }
            ]}
          >
            {event.text}
          </Text>
          <Button
            title={event.completed ? "Done" : "Complete"}
            onPress={() => toggleComplete(index)}
          />
          <Button title="X" onPress={() => removeItem(index)} color="crimson" />
        </View>
      ))}
    </View>
  );
}
export default EventDetails;

const styles = StyleSheet.create({
  container: {
    padding: 35,
    alignItems: "center"
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
  addButton: {
    alignItems: "flex-end"
  },
  event: {
    width: 200
  },
  error: {
    color: "red"
  }
});