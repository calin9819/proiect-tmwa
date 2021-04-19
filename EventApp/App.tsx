import { StatusBar } from 'expo-status-bar';
import React, { useEffect,useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';
import * as SQLite from 'expo-sqlite';
import CalendarNavigator from './navigation/CalendarNavigator';
import AppLoading from 'expo-app-loading';

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  });
};

export default function App() {
  const db = SQLite.openDatabase('events-db.db');

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE if not exists events (id	INTEGER primary key not null, name text, description text, date text)'
      );
    });

    db.transaction(
      tx => {
        tx.executeSql('insert into events values (0, ?, ?, ?)', ['Event test', 'This is a test event', '2021-04-19']);
        tx.executeSql('select * from events', [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      }
    );
  }, []);

  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={console.warn}
      />
    );
  }

  return (
      <CalendarNavigator/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
