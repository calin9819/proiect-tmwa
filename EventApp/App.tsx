import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CalendarList from './components/CalendarList';
import CurrentDay from './components/CurrentDay';
import * as SQLite from 'expo-sqlite';

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
        tx.executeSql('insert into events values (0, ?, ?, ?)', ['Event test', 'This is a test event', '2021-04-18']);
        tx.executeSql('select * from events', [], (_, { rows }) =>
          console.log(JSON.stringify(rows))
        );
      }
    );
  }, []);


  return (
    <View style={styles.container}>
      <CalendarList/>
      {/* <CurrentDay/> */}
    </View>
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
