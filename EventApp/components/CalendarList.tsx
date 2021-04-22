import React, { useState, useEffect } from "react";
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { Agenda, Calendar } from "react-native-calendars";
import IEvent from "../models/IEvent.interface";
import HolidayService from "../services/holiday";
import LocalCalendarService from "../services/localCalendar";
import EventDetails from "./EventDetails";
import { Database } from "expo-sqlite";
import * as SQLite from "expo-sqlite";
import { FAB } from "react-native-paper";
import colors from "../utils/colors";
import AgendaEntryDetail from "./AgendaEntryDetail";
import utils from "../utils/utils";

const db = SQLite.openDatabase("events-db.db");

const CalendarList = ({ navigation, route }) => {
  const [items, setItems] = useState<{ [key: string]: IEvent[] }>({});
  const [selectedDay, setSelectedDay] = useState<string>("");
  const [value, setValue] = useState<string>("");
  const [eventList, setEvents] = useState<{ [key: string]: IEvent[] }>({});
  const [error, showError] = useState<Boolean>(false);
  const [refreshing, setRefreshing] = useState(false);

  const load = async () => {
    let holidayService = new HolidayService();
    try {
      let response = await holidayService.getHolidays("ro", 2021);
      let data = await response.json();
      let itemsObject = {};
      if (data && data.response) {
        for (let holiday of data.response.holidays) {
          let date = holiday.date.iso;
          if (!itemsObject[date]) {
            itemsObject[date] = [];
          }
          itemsObject[date].push({
            name: holiday.name,
            description: holiday.description,
            date: date,
          });
        }
      }

      (await db).transaction((tx) => {
        tx.executeSql(`select * from events;`, [], (_, { rows }) => {
          for (let event of rows["_array"]) {
            if (itemsObject[event.date]) {
              itemsObject[event.date].push(event);
            } else {
              itemsObject[event.date] = [event];
            }
          }

          let currentDay = utils.dateToString(new Date());
          if (itemsObject[currentDay] === undefined) {
            itemsObject[currentDay] = [];
          }

          setItems(itemsObject);
          setRefreshing(false);
        });
      });
    } catch (e) {
      console.log(e);
    }
  };
  const initializeCurrentDay = () => {

  }
  const loadMonthItems = (day) => {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = utils.timeToString(time);
        if (!items[strTime]) {
          items[strTime] = [];
        }
      }
      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 1000);
  };

  useEffect(() => {
    setRefreshing(true);
    load();
    initializeCurrentDay();
  }, []);

  const [show, setShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState();
  const [markedDay, setMarkedDay] = useState({});

  const getShow = () => {
    return show;
  };

  const getSelectedItem = () => {
    return selectedItem;
  };

  const getMarkedDay = () => {
    return markedDay;
  };

  const openPopup = (item) => {
    setShow(true);
    setSelectedItem(item);
    let markedDay = {};
    markedDay[item.date] = {
      selected: true,
      marked: true,
      selectedColor: colors.coral,
    };
    setMarkedDay(markedDay);
    console.log("openPopup function called for item:", item);
  };

  const dayPress = (day) => {
    //selected day -> ultima zi selectata
    if (selectedDay && selectedDay != utils.dateToString(new Date())) {
      if (items[selectedDay] !== undefined) {
        if (items[selectedDay].length == 0) {
          items[selectedDay] = undefined;
        }
      }
    }
    setSelectedDay(day.dateString);
    if (items[day.dateString] === undefined) {
      items[day.dateString] = [];
    }
  };

  const handleSubmit = (): void => {
    if (value.trim()) {
      let itemsObject = items;
      let date = selectedDay;
      if (!itemsObject[date]) {
        itemsObject[date] = [];
      }
      itemsObject[date].push({
        name: value,
        description: "",
        date,
      });

      setItems(itemsObject);
    } else showError(true);
    setValue("");
  };

  const renderEmptyDate = () => {
    return (
      <View style={styles.emptyDate}>
        <Text>No events for this day...</Text>
      </View>
    );
  };

  const renderItem = (item: IEvent) => {
    return (
      <TouchableOpacity onPress={() => openPopup(item)}>
        <View style={styles.itemContainer}>
          <Text>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground
    source={require('../assets/fundal5.jpg')}
        style={styles.background}>
    <SafeAreaView style={styles.safe}>
      <Agenda
        items={items}
        //loadItemsForMonth={loadMonthItems.bind(this)}
        renderItem={renderItem}
        renderEmptyDate={renderEmptyDate}
        refreshing={refreshing}
        onRefresh={() => {
          console.log("refreshing...");
          load();
        }}
        onDayPress={dayPress}
      />
      <FAB
        style={styles.fab}
        small
        icon="plus"
        onPress={() => navigation.navigate("Add", { name: "Add a new event" })}
      />
      <AgendaEntryDetail
        show={getShow()}
        markedDay={getMarkedDay()}
        selectedItem={getSelectedItem()}
        hideFunc={() => {
          setShow(false);
        }}
        reloadList={() => {
          navigation.popToTop();
          navigation.navigate("Agenda", { name: "Agenda" });
        }}
        goToEdit={() => {
            setShow(false);
            navigation.navigate("Edit", { selectedItem: selectedItem });
          }}
        />
      </SafeAreaView>
    </ImageBackground>
  );
};

export default CalendarList;

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%'
  },
  safe: {
    margin: 30,
    justifyContent: "center",
    alignContent: "center",
    flex: 1,
    borderRadius: 10
  },
  itemContainer: {
    backgroundColor: "white",
    margin: 5,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    padding: 25,
    position: "relative",
    top: 15,
  },

  addEventContainer: {
    padding: 35,
    alignItems: "center",
  },
  title: {
    fontSize: 40,
    marginBottom: 40,
  },
  addButton: {
    alignItems: "flex-end",
  },
  inputWrapper: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  inputBox: {
    width: 200,
    borderRadius: 3,
    borderWidth: 1,
    paddingLeft: 8,
  },
  error: {
    color: "red",
  },
  fab: {
    position: "absolute",
    marginRight: 25,
    marginBottom: 50,
    right: 0,
    bottom: 0,
    backgroundColor: colors.coral,
    color: "white"
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 50,
  },
});
